import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigateNodes } from "../support/tree.support";
import { BinaryNode, Directions } from "../types/common.types";
import { Actions, State } from "../types/redux.types";

export function useNavigation(
  node: BinaryNode | undefined,
  setCurrentNode: (_: BinaryNode) => void
): void {
  const dispatch = useDispatch<Dispatch<Actions>>();
  const chatTree = useSelector((state: State) => state?.chatTree);
  const isSubmitPending = useSelector((state: State) => state.isSubmitPending);

  function navigationEvent(event: KeyboardEvent) {
    if (node === undefined || isSubmitPending) {
      return;
    }
    // TODO
    // Add screen press direction navigation
    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        navigateNodes(Directions.down, node, setCurrentNode, chatTree);
        dispatch({
          type: "SET_NAVIGATION",
          payload: { direction: Directions.down },
        });
        break;
      case "KeyW":
      case "ArrowUp":
        navigateNodes(Directions.up, node, setCurrentNode, chatTree);
        dispatch({
          type: "SET_NAVIGATION",
          payload: { direction: Directions.up },
        });
        break;
      case "KeyA":
      case "ArrowLeft":
        navigateNodes(Directions.left, node, setCurrentNode, chatTree);
        dispatch({
          type: "SET_NAVIGATION",
          payload: { direction: Directions.left },
        });
        break;
      case "KeyD":
      case "ArrowRight":
        navigateNodes(Directions.right, node, setCurrentNode, chatTree);
        dispatch({
          type: "SET_NAVIGATION",
          payload: { direction: Directions.right },
        });
        break;
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", navigationEvent);

    return function cleanup() {
      document.removeEventListener("keydown", navigationEvent);
    };
  });

  return;
}
