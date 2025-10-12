import type { UnionToTuple } from "type-fest";

export function fileNameWithAnotherExtension(
  fileName: string,
  extension: string
): string {
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  return `${baseName}.${extension}`;
}

export type EnumLike<T extends string | number | symbol> = { [K in T]: K };

export function enumFromUnion<T extends string | number | symbol>(
  ...keys: UnionToTuple<T>
): EnumLike<T> {
  const obj: EnumLike<T> = {} as EnumLike<T>;
  for (const key of keys) {
    // @ts-ignore
    obj[key] = key;
  }
  return obj as EnumLike<T>;
}
