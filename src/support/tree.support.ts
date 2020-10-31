// Utilities relating to interacting with the binary tree

import { BinaryNode } from "../types/common.types";
import { isDefined } from "./support";

// Traverse tree in preorder looking for the node
export function findNode(id: string, node: BinaryNode): BinaryNode | false {
  if (node.id === id) {
    return node;
  }

  const leftRes =
    node.children && typeof node.children[0] !== "string"
      ? findNode(id, node.children[0] as BinaryNode)
      : false;

  if (leftRes !== false) {
    return leftRes;
  }

  const rightRes =
    node.children && typeof node.children[1] !== "string"
      ? findNode(id, node.children[1])
      : false;
  return rightRes;
}

// Map the tree into a new object
export function mapTree(node: BinaryNode, fn: (node: BinaryNode) => any): any {
  if (node.children?.length === 0) {
    return fn({ ...node });
  }

  // Recursively map all child nodes
  const children = [
    childIsValidNode(node.children?.[0])
      ? mapTree(node.children![0], fn)
      : node.children?.[0],
    childIsValidNode(node.children?.[1])
      ? mapTree(node.children![1], fn)
      : node.children?.[1],
  ];
  return { ...node, children };
}

export function childIsValidNode(
  node: BinaryNode | string | undefined
): node is BinaryNode {
  return isDefined(node) && typeof node !== "string";
}

export function updateChildAtIndex(
  node: BinaryNode,
  childIndex: number,
  childNode: BinaryNode
): Array<BinaryNode | string> {
  if (!node.children?.length || node.children.length === 1) {
    return [childNode];
  }

  return node.children.map((child, index) => {
    if (index === childIndex) {
      return childNode;
    }
    return child;
  });
}
