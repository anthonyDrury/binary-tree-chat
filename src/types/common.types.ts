type BaseBinary = {
  id: string;
  head: string;
  text: string;
};

export type BinaryNode = BaseBinary & {
  children: string[];
};

export type BinaryList = BaseBinary & {
  children: BinaryNode[];
};
