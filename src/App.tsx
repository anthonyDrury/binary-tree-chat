import React, { useEffect, useState } from "react";
import "./App.scss";
import { getNode } from "./client/server.client";
import { BinaryNode } from "./types/common.types";

function App() {
  const [currentNode, setCurrentNode]: [
    BinaryNode | undefined,
    any
  ] = useState();

  useEffect(() => {
    if (currentNode?.text === undefined) {
      getNode().then((headNode) => {
        if (headNode?.children) {
          headNode.children.forEach((id) => getNode(id));
        }
        setCurrentNode(headNode);
      });
    }
  }, [currentNode]);

  return <div className="App">{currentNode?.text}</div>;
}

export default App;
