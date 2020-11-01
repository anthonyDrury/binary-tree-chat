import React, { Dispatch, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getNode } from "../../client/server.client";
import { useNavigation } from "../../hooks/use-navigation";
import { isDefined } from "../../support/support";
import { findNode, navigateNodes } from "../../support/tree.support";
import { BinaryNode, Directions } from "../../types/common.types";
import { Actions, State } from "../../types/redux.types";
import KeyboardOverlay from "../keyboardOverlay";
import NodeDisplay from "../node";

function ChatTreeExplorer() {
  const dispatch = useDispatch<Dispatch<Actions>>();
  const chatTree = useSelector((state: State) => state.chatTree, shallowEqual);
  const isHeadNodeLoading = useRef(false);
  const [currentNode, setCurrentNode] = useState(chatTree);

  useEffect(() => {
    if (chatTree === undefined && !isHeadNodeLoading.current) {
      isHeadNodeLoading.current = true;
      getNode().then((headNode) => {
        isHeadNodeLoading.current = false;
        dispatch({
          type: "UPDATE_NODE",
          payload: {
            node: headNode,
          },
        });
        setCurrentNode(headNode);
      });
    }
  }, [chatTree, dispatch]);

  // TODO: Make this more efficient, excess renders
  useEffect(() => {
    if (isDefined(currentNode) && isDefined(chatTree)) {
      const foundNode = findNode(currentNode.id, chatTree) || undefined;
      setCurrentNode(foundNode);
    }
  }, [chatTree]);

  // Retrieve children of the current node from the BE
  useEffect(() => {
    function setChildren(
      id: string,
      parent: BinaryNode,
      childIndex: number
    ): void {
      getNode(id).then((node) => {
        dispatch({
          type: "ADD_NODE",
          payload: { node, parent, childIndex },
        });
      });
    }

    if (
      currentNode?.children?.length &&
      currentNode.childNodes?.length !== currentNode?.children?.length
    ) {
      currentNode?.children.forEach((id, index) => {
        if (typeof id === "string") {
          setChildren(id, currentNode, index);
        }
      });
    }
  }, [currentNode, dispatch]);

  useNavigation(currentNode, setCurrentNode);

  function updateText(text: string): void {
    dispatch({
      type: "UPDATE_NODE",
      payload: { node: { ...currentNode!, text } },
    });
    setCurrentNode({ ...currentNode!, text });
  }

  function manualNavigation(direction: Directions): void {
    if (!isDefined(currentNode)) {
      return;
    }
    navigateNodes(direction, currentNode, setCurrentNode, chatTree);
  }

  if (currentNode === undefined) {
    return <></>;
  }

  return (
    <>
      <NodeDisplay
        onTextSubmit={updateText}
        node={currentNode}
        onNodeNavigation={manualNavigation}
      ></NodeDisplay>
      <KeyboardOverlay />
    </>
  );
}

export default ChatTreeExplorer;
