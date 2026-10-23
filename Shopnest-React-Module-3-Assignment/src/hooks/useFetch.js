import { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Turns any Axios error into something safe to show to a shopper.
function toFriendlyError(err) {
  if (err.response?.status === 404) {
    return { status: 404, message: "We couldn't find what you were looking for." };
  }
  if (err.code === "ECONNABORTED") {
    return { status: null, message: "The server took too long to respond. Please try again." };
  }
  if (!err.response) {
    return {
      status: null,
      message: "We couldn't reach the server. Please check your connection and try again.",
    };
  }
  return { status: err.response.status, message: "Something went wrong while loading data. Please try again." };
}

/**
 * Runs `request(signal)` (an Axios call) inside useEffect and tracks
 * loading / error / data. Re-runs when `deps` change or `retry()` is called.
 */
export default function useFetch(request, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await request(controller.signal);
        if (controller.signal.aborted) return;
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err) || controller.signal.aborted) return;
        console.error("Request failed:", err);
        setData(null);
        setError(toFriendlyError(err));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort(); // cancel on unmount / re-run
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { data, loading, error, retry };
}
