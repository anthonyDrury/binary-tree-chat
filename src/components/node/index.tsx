import React, { useRef } from "react";
import { animated, useTransition } from "react-spring";
import { BinaryNode, Directions } from "../../types/common.types";
import ChildNode from "../childNode";
import "./style.scss";

type NodeDisplayProps = {
  node: BinaryNode;
  onTextSubmit: (_: string) => void;
  onNodeNavigation: (_: Directions) => void;
};
function NodeDisplay(props: NodeDisplayProps) {
  const directionClicked = useRef(Directions.left);
  const transitions = useTransition(props.node, (node) => node.id, {
    from: { opacity: 0, transform: "translate3d(0,100%,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0%,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-50%,0)" },
    onDestroyed: () => {
      // Trigger after animation here
    },
  });

  function onNavigate(direction: Directions): void {
    directionClicked.current = direction;
    props.onNodeNavigation(direction);
  }
  return (
    <>
      {transitions.map(({ item, props: styleProps, key }) => (
        <animated.div className="node" key={key} style={styleProps as any}>
          <div>^</div>
          <p className="node__text">{item?.text}</p>
        </animated.div>
      ))}
      <div className="childNodeContainer">
        <ChildNode
          node={props.node}
          childIndex={0}
          onNavigation={() => onNavigate(Directions.left)}
        />
        <ChildNode
          node={props.node}
          childIndex={1}
          onNavigation={() => onNavigate(Directions.right)}
        />
      </div>
    </>
  );
}

export default NodeDisplay;
