import {
  createRootNode,
  createStringLiteralNode,
  createNumberLiteralNode,
  createCallExpression,
} from "./ast";
import { Token, TokenTypes } from "./tokenizer";

export function parser(tokens: Token[]) {
  const root = createRootNode();

  let curIdx = 0;

  function walk() {
    let token = tokens[curIdx];

    if (token.type === TokenTypes.Number) {
      curIdx++;
      return createNumberLiteralNode(token.value);
    }

    if (token.type === TokenTypes.String) {
      curIdx++;
      return createStringLiteralNode(token.value);
    }

    // eg: (add 1 2)
    if (token.type === TokenTypes.Paren && token.value === "(") {
      token = tokens[++curIdx]; // ( -> jump -> add

      let node = createCallExpression(token.value);

      // add -> 1 2  上一个 token 已经使用完了  所以我们还需要在移动下位置
      token = tokens[++curIdx];
      // params
      while (!(token.type === TokenTypes.Paren && token.value === ")")) {
        node.params.push(walk()); // 这里做的参数变量的梳理 递归通过 `if (token.type === TokenTypes.Number)` 来做参数的判断
        token = tokens[curIdx]; // 移动指针 逻辑上复用了 `if (token.type === TokenTypes.Number)`
      }

      curIdx++; // 1 2 -> cur )
      return node;
    }

    throw new Error(`未知 token: ${token} !!!`);
  }

  // eg: (add 1 (mult 2 3)) 递归处理
  while (curIdx < tokens.length) {
    root.body.push(walk());
  }

  return root;
}
