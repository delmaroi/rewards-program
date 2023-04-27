import { useLocation } from "react-router-dom";

export const ErrorFallback = () => {
  const location = useLocation();

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-rift-red-500"
      role="alert"
    >
      <h2 className="text-2xl font-semibold">Ooops, something went wrong</h2>
      <button
        className="mt-4"
        onClick={() => window.location.assign(location.pathname)}
      >
        Refresh
      </button>
    </div>
  );
};
