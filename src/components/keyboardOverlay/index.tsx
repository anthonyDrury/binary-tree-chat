import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isDefined } from "../../support/support";
import { Directions } from "../../types/common.types";
import { State } from "../../types/redux.types";
import "./style.scss";

function KeyboardOverlay() {
  const dispatch = useDispatch();
  const hasNavigationBegun = useSelector(
    (state: State) => state.hasNavigationBegun
  );
  const timer = useRef<null | NodeJS.Timeout>(null);
  const interval = useRef<null | NodeJS.Timeout>(null);
  const [opacity, setOpacity] = useState(10);

  useEffect(() => {
    if (hasNavigationBegun !== false && hasNavigationBegun !== true) {
      interval.current = setInterval(() => {
        setOpacity((opacity) => opacity - 1);
      }, 100);

      if (!isDefined(timer.current)) {
        timer.current = setTimeout(() => {
          dispatch({
            type: "SET_NAVIGATION",
            payload: { direction: true },
          });
        }, 3000);
      }
    }
    return () => {
      if (isDefined(timer.current)) {
        clearTimeout(timer.current);
      }
      if (isDefined(interval.current)) {
        clearTimeout(interval.current);
      }
    };
  }, [hasNavigationBegun, dispatch, opacity]);

  if (hasNavigationBegun === true) {
    return null;
  }

  function getActiveKeyClass(key: "w" | "a" | "s" | "d"): string {
    if (hasNavigationBegun === false || hasNavigationBegun === true) {
      return "";
    }

    switch (key) {
      case "w":
        return hasNavigationBegun === Directions.up
          ? `keyboardOverlay--active keyboardOverlay--opacity-${opacity}`
          : "";
      case "a":
        return hasNavigationBegun === Directions.left
          ? `keyboardOverlay--active keyboardOverlay--opacity-${opacity}`
          : "";
      case "s":
        return hasNavigationBegun === Directions.down
          ? `keyboardOverlay--active keyboardOverlay--opacity-${opacity}`
          : "";
      case "d":
        return hasNavigationBegun === Directions.right
          ? `keyboardOverlay--active keyboardOverlay--opacity-${opacity}`
          : "";
      default:
        return "";
    }
  }

  return (
    <div className="keyboardOverlay">
      <div
        className={`keyboardOverlay__key keyboardOverlay--first ${getActiveKeyClass(
          "w"
        )}`}
      >
        w
      </div>
      <div className={`keyboardOverlay__key ${getActiveKeyClass("a")}`}>a</div>
      <div className={`keyboardOverlay__key ${getActiveKeyClass("s")}`}>s</div>
      <div className={`keyboardOverlay__key ${getActiveKeyClass("d")}`}>d</div>
    </div>
  );
}

export default KeyboardOverlay;
