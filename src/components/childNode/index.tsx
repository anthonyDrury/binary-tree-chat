import { BinaryNode, Directions } from "../../types/common.types";
import React, { Dispatch, useState } from "react";
import { isDefined } from "../../support/support";
import { useDispatch, useSelector } from "react-redux";
import { addNode } from "../../client/server.client";
import { Actions, State } from "../../types/redux.types";

type ChildNodePropTypes = {
  node: BinaryNode;
  childIndex: number;
  onNavigation: (x: Directions) => void;
};
function ChildNode(props: ChildNodePropTypes) {
  const dispatch = useDispatch<Dispatch<Actions>>();
  const isSubmitPending = useSelector((state: State) => state.isSubmitPending);
  const [textValue, setTextValue] = useState("");
  const [addNodeModalIsOpen, setAddNodeModalIsOpen] = useState(false);

  function dispatchIsPending(pending: boolean) {
    dispatch({
      type: "UPDATE_SUBMIT_PENDING",
      payload: {
        pending,
      },
    });
  }

  function navigate() {
    if (isSubmitPending) {
      return;
    }
    props.onNavigation(
      props.childIndex === 0 ? Directions.left : Directions.right
    );
  }
  function submitNewNode() {
    if (isSubmitPending) {
      return;
    }
    dispatchIsPending(true);
    addNode(props.node.id, textValue).then((newNode) => {
      dispatchIsPending(false);
      dispatch({
        type: "ADD_NODE",
        payload: {
          node: newNode,
          parent: props.node,
          childIndex: props.childIndex,
        },
      });
      setTextValue("");
      navigate();
    });
  }

  if (!isDefined(props.node.childNodes?.[props.childIndex])) {
    return (
      <>
        {addNodeModalIsOpen ? (
          <div>
            <input
              disabled={isSubmitPending}
              onChange={(e) => setTextValue(e.target.value)}
              value={textValue}
              placeholder="Add your text here"
            />
            <button disabled={isSubmitPending} onClick={() => submitNewNode()}>
              Submit
            </button>
          </div>
        ) : (
          <button
            disabled={isSubmitPending}
            onClick={() => setAddNodeModalIsOpen(!addNodeModalIsOpen)}
          >
            Add comment
          </button>
        )}
      </>
    );
  }

  return (
    <div onClick={navigate}>{props.childIndex === 0 ? "LEFT" : "RIGHT"}</div>
  );
}

export default ChildNode;
