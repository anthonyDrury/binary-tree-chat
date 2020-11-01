import { BinaryNode, Directions } from "./common.types";

export type State = {
  chatTree?: BinaryNode;
  isSubmitPending: boolean;
  hasNavigationBegun: boolean | Directions;
};

export type Action = {
  type: AllActionTypes;
  payload?: AllPayloads;
};

export type Actions =
  | UpdateNodeAction
  | AddNodeAction
  | UpdateIsSubmitPending
  | SetNavigationBegun;

export interface UpdateNodeAction extends Action {
  type: "UPDATE_NODE";
  payload: { node: BinaryNode };
}

export interface AddNodeAction extends Action {
  type: "ADD_NODE";
  payload: { node: BinaryNode; parent: BinaryNode; childIndex: number };
}

export interface UpdateIsSubmitPending extends Action {
  type: "UPDATE_SUBMIT_PENDING";
  payload: {
    pending: boolean;
  };
}

export interface SetNavigationBegun extends Action {
  type: "SET_NAVIGATION";
  payload: { direction: Directions | boolean };
}

export type AllPayloads = Actions["payload"];

export type AllActionTypes = Actions["type"];
