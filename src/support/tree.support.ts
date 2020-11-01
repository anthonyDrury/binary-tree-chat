// Utilities relating to interacting with the binary tree

import { BinaryNode, Directions } from "../types/common.types";
import { isDefined } from "./support";

// Traverse tree in preorder looking for the node
export function findNode(id: string, node: BinaryNode): BinaryNode | false {
  if (node.id === id) {
    return node;
  }

  const leftChild = node.childNodes?.[0];
  const leftRes = isDefined(leftChild) ? findNode(id, leftChild) : false;

  if (leftRes !== false) {
    return leftRes;
  }

  const rightChild = node.childNodes?.[1];
  const rightRes = isDefined(rightChild) ? findNode(id, rightChild) : false;
  return rightRes;
}

function isChildNodesValid(
  nodes: Array<BinaryNode | undefined> | undefined
): boolean {
  if (!isDefined(nodes) || !nodes.length) {
    return false;
  }
  return nodes
    .map((prev, curr): boolean => isDefined(prev) && isDefined(curr))
    .reduce((x, y) => x && y);
}

// Map the tree into a new object
export function mapTree(node: BinaryNode, fn: (node: BinaryNode) => any): any {
  if (!isChildNodesValid(node.childNodes)) {
    return fn({ ...node });
  }

  // Recursively map all child nodes
  const childNodes = [
    childIsValidNode(node.childNodes?.[0])
      ? mapTree(node.childNodes![0], fn)
      : node.childNodes?.[0],
    childIsValidNode(node.childNodes?.[1])
      ? mapTree(node.childNodes![1], fn)
      : node.childNodes?.[1],
  ];
  return { ...node, childNodes };
}

export function childIsValidNode(
  node: BinaryNode | string | undefined
): node is BinaryNode {
  return isDefined(node) && typeof node !== "string";
}

export function updateChildNodeAtIndex(
  node: BinaryNode,
  childIndex: number,
  childNode: BinaryNode
): Array<BinaryNode | undefined> {
  if (!node.children?.length || node.children.length === 1) {
    return [childNode];
  }
  const newChildNodes = node.children.map((_, index) => {
    if (index === childIndex) {
      return childNode;
    }
    return node.childNodes?.[index] ?? undefined;
  });

  return newChildNodes;
}

export function navigateNodes(
  direction: Directions,
  node: BinaryNode,
  setNodeFn: (x: BinaryNode) => void,
  tree?: BinaryNode
) {
  switch (direction) {
    case "LEFT": {
      const leftNode = node.childNodes?.[0];
      if (isDefined(leftNode)) {
        setNodeFn(leftNode);
      }
      // TODO: Deal with no valid node (show message / prompt new node)
      break;
    }
    case "RIGHT": {
      const rightNode = node.childNodes?.[1];
      if (isDefined(rightNode)) {
        setNodeFn(rightNode);
      }
      // TODO: Deal with no valid node (show message / prompt new node)
      break;
    }
    case "UP": {
      if (!isDefined(tree)) {
        // Should never happen, add error case if it does
        return;
      }
      const parentNode = findNode(node.parentNode, tree);
      if (parentNode !== false) {
        setNodeFn(parentNode);
      }
      // TODO: Deal with no valid node (show message / prompt new node)
      break;
    }
    case "DOWN": {
      const downNode = node.childNodes?.[0] ?? node.childNodes?.[1];
      if (isDefined(downNode)) {
        setNodeFn(downNode);
      }
      // TODO: Deal with no valid node (show message / prompt new node)
      break;
    }
    default:
      break;
  }
}
