import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNode } from "../../client/server.client";
import { updateChildAtIndex } from "../../support/tree.support";
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

  useEffect(() => {
    if (currentNode?.children?.length) {
      currentNode?.children.forEach((id, index) => {
        if (typeof id === "string") {
          getNode(id).then((node) => {
            dispatch({
              type: "ADD_NODE",
              payload: { node, parent: currentNode, childIndex: index },
            });

            setCurrentNode({
              ...currentNode,
              children: updateChildAtIndex(currentNode, index, node),
            });
          });
        }
      });
    }
  }, [currentNode, dispatch]);

  if (currentNode === undefined) {
    return <></>;
  }

  return (
    <>
      <NodeDisplay node={currentNode}></NodeDisplay>
    </>
  );
}

export default ChatTreeExplorer;
