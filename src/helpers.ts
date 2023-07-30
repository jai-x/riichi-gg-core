export const removeFirstInstance = <T>(input: ReadonlyArray<T>, elem: T): ReadonlyArray<T> => {
  const idx = input.indexOf(elem);
  if (idx < 0) {
    return input;
  }
  return input.filter((_, i) => i !== idx);
}

export const arrayCmp = <T>(a: ReadonlyArray<T>, b: ReadonlyArray<T>): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

