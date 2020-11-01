import { isDefined } from "../../support/support";
import { mapTree, updateChildNodeAtIndex } from "../../support/tree.support";
import { Actions, State } from "../../types/redux.types";
import { initialState } from "../store/store";

export default function reducer(
  state: State = initialState,
  action: Actions
): State {
  switch (action.type) {
    case "UPDATE_NODE":
      return {
        ...state,
        chatTree: state.chatTree
          ? mapTree(state.chatTree, (node) => {
              if (node.id === action.payload.node.id) {
                return { ...action.payload.node };
              }
              return node;
            })
          : action.payload.node,
      };
    case "ADD_NODE":
      return {
        ...state,
        chatTree: isDefined(state.chatTree)
          ? mapTree(state.chatTree, (node) => {
              if (node.id === action.payload.parent.id) {
                return {
                  ...node,
                  childNodes: updateChildNodeAtIndex(
                    node,
                    action.payload.childIndex,
                    action.payload.node
                  ),
                };
              }
              return { ...node };
            })
          : action.payload.node,
      };
    case "UPDATE_SUBMIT_PENDING": {
      return {
        ...state,
        isSubmitPending: action.payload.pending,
      };
    }
    case "SET_NAVIGATION": {
      return {
        ...state,
        hasNavigationBegun: action.payload.direction,
      };
    }
    default:
      return state;
  }
}
