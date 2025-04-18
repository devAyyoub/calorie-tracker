import { ActionDispatch, createContext, ReactNode, useMemo, useReducer } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../redecurs/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: ActionDispatch<[action: ActivityActions]>;
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
  categoryName: (category: Activity["category"]) => string;
  isEmptyActivities: boolean;
};

export const ActivityContext = createContext<ActivityContextProps>(
  {} as ActivityContextProps
);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const caloriesConsumed = useMemo(
    () =>
        state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesBurned = useMemo(
    () =>
        state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [state.activities]
  );

  const categoryName = useMemo(
    () => (category: Activity["category"]) => {
      const categoryObj = categories.find((cat) => cat.id === category);
      return categoryObj ? categoryObj.name : "Desconocido";
    },
    [state.activities]
  );

  const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

  return (
    <ActivityContext.Provider value={{ state, dispatch, caloriesConsumed, caloriesBurned, netCalories, categoryName, isEmptyActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};
