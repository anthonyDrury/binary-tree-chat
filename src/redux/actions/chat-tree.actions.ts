import { BinaryNode } from "../../types/common.types";
import { Action } from "../../types/redux.types";

export function updateNode(node: BinaryNode, parent?: BinaryNode): Action {
  return {
    type: "UPDATE_NODE",
    payload: { node, parent },
  };
}
