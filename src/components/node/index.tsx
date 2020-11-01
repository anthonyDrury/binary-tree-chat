import React from "react";
import { BinaryNode, Directions } from "../../types/common.types";
import ChildNode from "../childNode";
import "./style.scss";

type NodeDisplayProps = {
  node: BinaryNode;
  onTextSubmit: (_: string) => void;
  onNodeNavigation: (_: Directions) => void;
};
function NodeDisplay(props: NodeDisplayProps) {
  return (
    <div className="node">
      <div>ARROW UP</div>
      <div>{props.node?.text}</div>
      <div className="node__child">
        <ChildNode
          node={props.node}
          childIndex={0}
          onNavigation={() => "LEFT"}
        />
        <ChildNode
          node={props.node}
          childIndex={1}
          onNavigation={() => "RIGHT"}
        />
      </div>
    </div>
  );
}

export default NodeDisplay;
