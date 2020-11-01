export type BinaryNode = {
  id: string;
  parentNode: string;
  text: string;
  children?: string[];
  childNodes?: Array<BinaryNode | undefined>;
};

export enum Directions {
  left = "LEFT",
  right = "RIGHT",
  up = "UP",
  down = "DOWN",
}
