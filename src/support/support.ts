export function isDefined<T>(x: T | null | undefined): x is T {
  return x !== undefined && x !== null;
}
