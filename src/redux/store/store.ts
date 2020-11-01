import { Store, createStore } from "redux";
import { Actions, State } from "../../types/redux.types";
import reducer from "../reducers/reducer";

export const initialState: State = {
  isSubmitPending: false,
  hasNavigationBegun: false,
};

export function configureStore(
  state: State = initialState
): Store<State, Actions> {
  return createStore(
    reducer /* preloadedState, */,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
}
