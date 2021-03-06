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
  const hasNavigationBegun = useSelector(
    (state: State) => state.hasNavigationBegun
  );
  const isSubmitPending = useSelector((state: State) => state.isSubmitPending);

  function displayKeypress(direction: Directions): void {
    if (hasNavigationBegun === false) {
      dispatch({
        type: "SET_NAVIGATION",
        payload: { direction },
      });
    }
  }

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
        displayKeypress(Directions.down);
        break;
      case "KeyW":
      case "ArrowUp":
        navigateNodes(Directions.up, node, setCurrentNode, chatTree);
        displayKeypress(Directions.up);
        break;
      case "KeyA":
      case "ArrowLeft":
        navigateNodes(Directions.left, node, setCurrentNode, chatTree);
        displayKeypress(Directions.left);
        break;
      case "KeyD":
      case "ArrowRight":
        navigateNodes(Directions.right, node, setCurrentNode, chatTree);
        displayKeypress(Directions.right);
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
