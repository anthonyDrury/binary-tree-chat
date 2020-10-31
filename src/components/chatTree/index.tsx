import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNode } from "../../client/server.client";
import { useNavigation } from "../../hooks/use-navigation";
import { updateChildNodeAtIndex } from "../../support/tree.support";
import { Actions, State } from "../../types/redux.types";
import NodeDisplay from "../node";

function ChatTreeExplorer() {
  const dispatch = useDispatch<Dispatch<Actions>>();
  const chatTree = useSelector((state: State) => state.chatTree);
  const [currentNode, setCurrentNode] = useState(chatTree);

  useEffect(() => {
    if (chatTree === undefined) {
      getNode().then((headNode) => {
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

  // Retrieve children of the current node from the BE
  useEffect(() => {
    if (
      currentNode?.children?.length &&
      currentNode.childNodes?.length !== currentNode?.children?.length
    ) {
      currentNode?.children.forEach((id, index) => {
        if (typeof id === "string") {
          getNode(id).then((node) => {
            dispatch({
              type: "ADD_NODE",
              payload: { node, parent: currentNode, childIndex: index },
            });

            setCurrentNode({
              ...currentNode,
              childNodes: updateChildNodeAtIndex(currentNode, index, node),
            });
          });
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

  if (currentNode === undefined) {
    return <></>;
  }

  return (
    <>
      <NodeDisplay onTextSubmit={updateText} node={currentNode}></NodeDisplay>
    </>
  );
}

export default ChatTreeExplorer;
