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
    }
    return () => {
      if (isDefined(interval.current)) {
        clearTimeout(interval.current);
      }
    };
  }, [hasNavigationBegun, dispatch, opacity]);

  useEffect(() => {
    if (hasNavigationBegun !== false && hasNavigationBegun !== true) {
      timer.current = setTimeout(() => {
        dispatch({
          type: "SET_NAVIGATION",
          payload: { direction: true },
        });
      }, 1000);
    }
    return () => {
      if (isDefined(timer.current)) {
        clearTimeout(timer.current);
      }
    };
  }, [hasNavigationBegun, dispatch]);

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
          ? `keyboardOverlay--active`
          : "";
      case "a":
        return hasNavigationBegun === Directions.left
          ? `keyboardOverlay--active`
          : "";
      case "s":
        return hasNavigationBegun === Directions.down
          ? `keyboardOverlay--active`
          : "";
      case "d":
        return hasNavigationBegun === Directions.right
          ? `keyboardOverlay--active`
          : "";
      default:
        return "";
    }
  }

  return (
    <div className="keyboardOverlay">
      <div
        className={`keyboardOverlay__key keyboardOverlay--opacity-${opacity} keyboardOverlay--first ${getActiveKeyClass(
          "w"
        )}`}
      >
        w
      </div>
      <div
        className={`keyboardOverlay__key keyboardOverlay--opacity-${opacity} ${getActiveKeyClass(
          "a"
        )}`}
      >
        a
      </div>
      <div
        className={`keyboardOverlay__key keyboardOverlay--opacity-${opacity} ${getActiveKeyClass(
          "s"
        )}`}
      >
        s
      </div>
      <div
        className={`keyboardOverlay__key keyboardOverlay--opacity-${opacity} ${getActiveKeyClass(
          "d"
        )}`}
      >
        d
      </div>
    </div>
  );
}

export default KeyboardOverlay;
