import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "../code/tokenizer";
test.skip("tokenizer", () => {
  const code = `(add 2 (subtract 4 2))`;

  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  expect(tokenizer(code)).toEqual(tokens);
});

test("left paren", () => {
  const code = `(`,
    tokens = [
      {
        type: TokenTypes.Paren,
        value: "(",
      },
    ];

  expect(tokenizer(code)).toEqual(tokens);
});

test("right paren", () => {
  const code = `)`,
    tokens = [
      {
        type: TokenTypes.Paren,
        value: ")",
      },
    ];

  expect(tokenizer(code)).toEqual(tokens);
});
test("add", () => {
  const code = `add`,
    tokens = [
      {
        type: TokenTypes.Name,
        value: "add",
      },
    ];

  expect(tokenizer(code)).toEqual(tokens);
});

test("number", () => {
  const code = `2`,
    tokens = [
      {
        type: TokenTypes.Number,
        value: "2",
      },
    ];

  expect(tokenizer(code)).toEqual(tokens);
});

test("(add 1 1)", () => {
  const code = `(add 1 1)`;

  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "1" },
    { type: TokenTypes.Number, value: "1" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  expect(tokenizer(code)).toEqual(tokens);
});
