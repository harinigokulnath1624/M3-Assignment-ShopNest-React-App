export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <i className="bi bi-exclamation-triangle"></i>
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="view-all-btn" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise"></i> Try Again
        </button>
      )}
    </div>
  );
}
