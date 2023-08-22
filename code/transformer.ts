import { NodeTypes, RootNode } from "./ast";
import { traverser } from "./traverser";
export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeTypes.Program,
    body: [],
  };

  // 追加 ast.context 构建 ast - Program { body ...
  ast.context = newAst.body;

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression: any = {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: node.name,
            },
            arguments: [],
          };

          // 追加 node.context 建立 number_node 与父节点关系：
          node.context = expression.arguments;

          // dispose: root.parent -> expressionStatement
          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: "ExpressionStatement",
              expression,
            };
          }

          parent?.context?.push(expression);
        }
      },
    },

    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          const numberNode: any = {
            type: "NumberLiteral",
            value: node.value,
          };

          parent?.context?.push(numberNode);
        }
      },
    },
  });

  return newAst;
}
