import React, { useState } from "react";
import { BinaryNode } from "../../types/common.types";

type NodeDisplayProps = {
  node: BinaryNode;
  onTextSubmit: (_: string) => void;
};
function NodeDisplay(props: NodeDisplayProps) {
  const [textValue, setTextValue] = useState("");
  return (
    <div>
      {props.node?.text ? (
        props.node?.text
      ) : (
        <>
          <input
            onChange={(e) => setTextValue(e.target.value)}
            value={textValue}
            placeholder="Add your text here"
          />
          <button onClick={() => props.onTextSubmit(textValue)}>Submit</button>
        </>
      )}
    </div>
  );
}

export default NodeDisplay;
