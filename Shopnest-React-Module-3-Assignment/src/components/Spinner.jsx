export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <div className="spinner-border shopnest-spinner" aria-hidden="true"></div>
      <p>{label}</p>
    </div>
  );
}
