export type BinaryNode = {
  id: string;
  parentNode: string;
  text: string;
  children?: string[];
  childNodes?: Array<BinaryNode | undefined>;
};
