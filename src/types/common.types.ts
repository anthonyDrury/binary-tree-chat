export type BinaryNode = {
  id: string;
  head: string;
  children: string[];
  text: string;
};

export type BinaryList = BinaryNode & {
  children: BinaryNode[];
};
