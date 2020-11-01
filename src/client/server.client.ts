import { isDefined } from "../support/support";
import { BinaryNode } from "../types/common.types";

const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
const HEAD_NODE = "HEAD_NODE";

export async function getNode(id?: string): Promise<BinaryNode> {
  const response: Response = await fetch(
    `${API_URL}/dev/getNode?nodeId=${isDefined(id) ? id : HEAD_NODE}`,
    {
      method: "GET",
    }
  );
  const body: Promise<BinaryNode> = response.json();

  if (response.status !== 200) {
    throw Error((body as any).message);
  }
  return body;
}

export async function addNode(
  parentId: string,
  text: string
): Promise<BinaryNode> {
  const response: Response = await fetch(`${API_URL}/dev/createNode`, {
    method: "POST",
    body: JSON.stringify({ headId: parentId, bodyText: text }),
  });
  const body: Promise<BinaryNode> = response.json();

  if (response.status !== 200) {
    throw Error((body as any).message);
  }
  return body;
}
