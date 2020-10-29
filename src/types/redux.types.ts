import { BinaryList, BinaryNode } from "./common.types";

export type State = {
  chatTree?: BinaryList;
};

export type Action = {
  type: AllActionTypes;
  payload?: AllPayloads;
};

export type Actions = UpdateNodeAction;

export interface UpdateNodeAction extends Action {
  type: "UPDATE_NODE";
  payload: { node: BinaryNode };
}

export type AllPayloads = Actions["payload"];

export type AllActionTypes = Actions["type"];
