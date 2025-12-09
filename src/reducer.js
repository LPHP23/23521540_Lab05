// Action types for type safety
export const ActionTypes = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  RESET: "RESET",
};

// Status constants
export const Status = {
  IDLE: "idle",
  LOADING: "loading",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export const initialState = { 
  status: Status.IDLE, 
  data: null, 
  error: null 
};

/**
 * Reducer for handling async data fetching states
 * @param {Object} state - Current state
 * @param {Object} action - Action with type and optional payload
 * @returns {Object} New state
 */
export function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      // Only transition to loading from idle or rejected states
      if (state.status === Status.IDLE || state.status === Status.REJECTED) {
        return { 
          ...state, 
          status: Status.LOADING, 
          error: null 
        };
      }
      return state;

    case ActionTypes.FETCH_SUCCESS:
      // Only process success when in loading state
      if (state.status === Status.LOADING) {
        return { 
          status: Status.RESOLVED, 
          data: action.payload, 
          error: null 
        };
      }
      return state;

    case ActionTypes.FETCH_FAILURE:
      // Only process failure when in loading state
      if (state.status === Status.LOADING) {
        return { 
          status: Status.REJECTED, 
          data: null, 
          error: action.payload || "An unknown error occurred" 
        };
      }
      return state;

    case ActionTypes.RESET:
      return initialState;

    default:
      // Log warning for unknown action types in development
      if (process.env.NODE_ENV === "development") {
        console.warn(`Unknown action type: ${action.type}`);
      }
      return state;
  }
}

/**
 * Helper function to create typed actions
 */
export const createAction = (type, payload) => ({ type, payload });
