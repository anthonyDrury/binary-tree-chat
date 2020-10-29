import { Actions, State } from "../../types/redux.types";

export default function reducer(state: State = {}, action: Actions): State {
  switch (action.type) {
    case "UPDATE_NODE":
      return {
        ...state,
        chatTree: { ...action.payload.node, children: [] },
      };
    default:
      return state;
  }
}
