import React from "react";
import { BinaryNode } from "../../types/common.types";

type NodeDisplayProps = {
  node: BinaryNode;
};
function NodeDisplay(props: NodeDisplayProps) {
  return <>{props.node?.text}</>;
}

export default NodeDisplay;
