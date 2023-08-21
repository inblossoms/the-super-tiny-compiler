import { LETTERS, NUMBER, WHITESPACE } from "./constant";

export const enum TokenTypes {
  Paren,
  Name,
  Number,
}

interface Token {
  type: TokenTypes;
  value: string;
}

// (add 2 (subtract 4 2))

export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let current: number = 0,
    codeLen = code.length;

  while (current < codeLen) {
    let char = code[current];

    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (char === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }

    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char) && current < codeLen) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenTypes.Name,
        value,
      });
    }

    if (NUMBER.test(char)) {
      let value = "";
      while (NUMBER.test(char) && current < codeLen) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenTypes.Number,
        value,
      });
    }
  }

  return tokens;
}
