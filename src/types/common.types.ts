export type BinaryNode = {
  id: string;
  head: string;
  text: string;
  children?: Array<string | BinaryNode>;
};
