import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isDefined } from "../support/support";
import { findNode } from "../support/tree.support";
import { BinaryNode } from "../types/common.types";
import { State } from "../types/redux.types";

export function useNavigation(
  node: BinaryNode | undefined,
  setCurrentNode: (_: BinaryNode) => void
): void {
  const chatTree = useSelector((state: State) => state?.chatTree);

  function navigationEvent(event: KeyboardEvent) {
    if (node === undefined) {
      return;
    }
    // TODO
    // Add screen press direction navigation
    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        {
          const bottomNode = node.childNodes?.[0] ?? node.childNodes?.[1];
          if (isDefined(bottomNode)) {
            setCurrentNode(bottomNode);
            console.log("DOWN");
          }
          // handle error if no child nodes
        }

        break;
      case "KeyW":
      case "ArrowUp": {
        if (chatTree === undefined) {
          // handle error if no parent node
          return;
        }
        const parentNode = findNode(node.parentNode, chatTree);
        if (parentNode !== false) {
          setCurrentNode(parentNode);
          console.log("UP");
        }

        break;
      }

      case "KeyA":
      case "ArrowLeft":
        const leftChildNode = node.childNodes?.[0];
        if (isDefined(leftChildNode)) {
          setCurrentNode(leftChildNode);
          console.log("LEFT");
        }
        // handle error if no left child node
        break;
      case "KeyD":
      case "ArrowRight":
        const rightChildNode = node.childNodes?.[1];
        if (isDefined(rightChildNode)) {
          setCurrentNode(rightChildNode);
          console.log("RIGHT");
        }
        // handle error if no right child node
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
