import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNode } from "../../client/server.client";
import { BinaryNode } from "../../types/common.types";
import { Actions, State } from "../../types/redux.types";

function ChatTreeExplorer() {
  const dispatch = useDispatch<Dispatch<Actions>>();
  const chatTree = useSelector((state: State) => state.chatTree);

  const [currentNode, setCurrentNode]: [
    BinaryNode | undefined,
    any
  ] = useState();

  useEffect(() => {
    if (currentNode?.text === undefined) {
      getNode().then((headNode) => {
        dispatch({
          type: "UPDATE_NODE",
          payload: {
            node: headNode,
          },
        });
        // if (headNode?.children) {
        //   headNode.children.forEach((id) => getNode(id));
        // }
        setCurrentNode(headNode);
      });
    }
  }, [currentNode, dispatch]);

  return <>{chatTree?.text}</>;
}

export default ChatTreeExplorer;
