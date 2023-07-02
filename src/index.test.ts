import { helloWorld } from './index';

test("hello world", () => {
  expect(helloWorld('Jai')).toBe('Hello Jai!');
});