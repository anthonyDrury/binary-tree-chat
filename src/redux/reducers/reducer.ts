import { isDefined } from "../../support/support";
import { mapTree, updateChildAtIndex } from "../../support/tree.support";
import { Actions, State } from "../../types/redux.types";

export default function reducer(state: State = {}, action: Actions): State {
  switch (action.type) {
    case "UPDATE_NODE":
      return {
        ...state,
        chatTree: { ...action.payload.node, children: [] },
      };
    case "ADD_NODE":
      return {
        ...state,
        chatTree: isDefined(state.chatTree)
          ? mapTree(state.chatTree, (node) => {
              if (node.id === action.payload.parent.id) {
                return {
                  ...node,
                  children: updateChildAtIndex(
                    node,
                    action.payload.childIndex,
                    action.payload.node
                  ),
                };
              }
            })
          : action.payload.node,
      };
    default:
      return state;
  }
}
