export default function ErrorMessage({ message = "Something went wrong", onRetry }) {
  return (
    <div className="card p-6 text-center text-red-600 border-red-200">
      <p className="font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-outline mt-3 text-sm">
          Try Again
        </button>
      )}
    </div>
  );
}