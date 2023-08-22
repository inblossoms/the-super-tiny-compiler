import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from "./ast";

type ParentNode = RootNode | CallExpressionNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
  enter: MethodFn;
  exit?: MethodFn;
}
export interface Visitor {
  Program?: VisitorOption;
  NumberLiteral?: VisitorOption;
  CallExpression?: VisitorOption;
  StringLiteral?: VisitorOption;
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 1. 深度优先搜索
  /**
   *  tree
   * 					        root
   * 						callExpression...
   *  					 1		 		 (mult 1 2)
   *							mult: callExpression	 1		2
   *  eg:
   * 	enter
   */

  function traverserChildNodeTree(params: ChildNode[], parent: ParentNode) {
    params.forEach((node) => {
      traverserNodeTree(node, parent);
    });
  }
  /**
   * 遍历 AST
   * @param node ChildNode | RootNode
   */
  function traverserNodeTree(node: ChildNode | RootNode, parent?: ParentNode) {
    // console.log(node)
    // 2. 提供 curd 能力 - visitor : enter
    const methods = visitor[node.type];
    if (methods) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.NumberLiteral:
        console.log("number:", node); //
        break;
      case NodeTypes.CallExpression:
        traverserChildNodeTree(node.params, node); // child nodes
        break;
      case NodeTypes.Program:
        traverserChildNodeTree(node.body, node); // root node
        break;
      default:
        break;
    }
    // 2. visitor: exit
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverserNodeTree(rootNode);
}
