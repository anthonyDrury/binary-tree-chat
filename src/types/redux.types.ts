import { BinaryNode } from "./common.types";

export type State = {
  chatTree?: BinaryNode;
};

export type Action = {
  type: AllActionTypes;
  payload?: AllPayloads;
};

export type Actions = UpdateNodeAction | AddNodeAction;

export interface UpdateNodeAction extends Action {
  type: "UPDATE_NODE";
  payload: { node: BinaryNode };
}

export interface AddNodeAction extends Action {
  type: "ADD_NODE";
  payload: { node: BinaryNode; parent: BinaryNode; childIndex: number };
}

export type AllPayloads = Actions["payload"];

export type AllActionTypes = Actions["type"];
