// Simple array shuffle
export const shuffle = <T>(input: ReadonlyArray<T>): ReadonlyArray<T> =>
  input
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const sample = <T>(input: ReadonlyArray<T>): T => shuffle(input)[0];

// Matches contents of arrays unsorted
export const arrayMatch = <T>(actual: ReadonlyArray<T>, expected: ReadonlyArray<T>): void => {
  expect(actual).toEqual(expect.arrayContaining(expected));
  expect(expected).toEqual(expect.arrayContaining(actual));
};
