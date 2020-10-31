import { Store, createStore } from "redux";
import { Actions, State } from "../../types/redux.types";
import reducer from "../reducers/reducer";

export function configureStore(state: State = {}): Store<State, Actions> {
  return createStore(
    reducer /* preloadedState, */,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
}
