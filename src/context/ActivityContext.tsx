import { ActionDispatch, createContext, ReactNode, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../redecurs/activity-reducer";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
    state: ActivityState,
    dispatch: ActionDispatch<[action: ActivityActions]>
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const  [state, dispatch]  = useReducer(activityReducer, initialState);

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  );
};
