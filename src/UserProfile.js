import { useEffect, useReducer, useCallback } from "react";
import { reducer, initialState } from "./reducer";
import PropTypes from "prop-types";

// Custom hook for data fetching with retry logic
function useFetchUser(userId = 1, maxRetries = 3) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUser = useCallback(async (retryCount = 0) => {
    dispatch({ type: "FETCH_INIT" });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      if (err.name === "AbortError") {
        dispatch({ type: "FETCH_FAILURE", payload: "Request timeout" });
      } else if (retryCount < maxRetries) {
        // Exponential backoff retry
        setTimeout(() => fetchUser(retryCount + 1), Math.pow(2, retryCount) * 1000);
      } else {
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
    }
  }, [userId, maxRetries]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { state, refetch: fetchUser };
}

// Loading skeleton component
function UserProfileSkeleton() {
  return (
    <div className="user-profile-skeleton" aria-busy="true" aria-live="polite">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-name"></div>
      <div className="skeleton-email"></div>
    </div>
  );
}

// Error component with retry
function ErrorDisplay({ error, onRetry }) {
  return (
    <div role="alert" className="error-display">
      <p>Error: {error}</p>
      <button onClick={onRetry} type="button">
        Try Again
      </button>
    </div>
  );
}

ErrorDisplay.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default function UserProfile({ userId }) {
  const { state, refetch } = useFetchUser(userId);

  if (state.status === "loading") {
    return <UserProfileSkeleton />;
  }

  if (state.status === "rejected") {
    return <ErrorDisplay error={state.error} onRetry={refetch} />;
  }

  if (state.status === "resolved" && state.data) {
    return (
      <div className="user-profile" role="article">
        <h2>{state.data.name}</h2>
        <p>Email: {state.data.email}</p>
        <p>Username: {state.data.username}</p>
        {state.data.phone && <p>Phone: {state.data.phone}</p>}
        {state.data.website && (
          <p>
            Website: <a href={`https://${state.data.website}`}>{state.data.website}</a>
          </p>
        )}
      </div>
    );
  }

  return null;
}

UserProfile.propTypes = {
  userId: PropTypes.number,
};

UserProfile.defaultProps = {
  userId: 1,
};
