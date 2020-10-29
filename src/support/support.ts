import { BinaryList, BinaryNode } from "../types/common.types";

export function isDefined(x: any | null | undefined): boolean {
  return x !== undefined && x !== null;
}

export function binaryNodeToList(
  x: BinaryNode,
  children: BinaryNode[]
): BinaryList {
  return {
    ...x,
    children,
  };
}
