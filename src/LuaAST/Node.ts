import * as TsAST from "ts-morph";

export type Type = TsAST.Type<TsAST.ts.Type>;

export class Node {
  parent?: Node;

  getRootNode(): Node {
    let currentNode: Node = this;

    while (currentNode.parent != undefined) {
      currentNode = currentNode.parent;
    }

    return currentNode;
  }

  getVariables(): VariableDeclaration[] | undefined {
    return undefined;
  }

  getParentScope(): ScopedNode | undefined {
    let currentNode: Node | undefined = this.parent;

    while (currentNode !== undefined && !(currentNode instanceof ScopedNode)) {
      currentNode = currentNode.parent;
    }

    return currentNode;
  }

  getStringRepresentation(): string {
    return "";
  }
}

export interface VariableDeclaration {
  name: string;
  type: Type;
}

export class ScopedNode extends Node {
  children: Node[] = [];
  variableDeclarations = new Map<string, VariableDeclaration>();

  addChild(child: Node) {
    this.children.push(child);
    child.parent = this;

    child
      .getVariables()
      ?.forEach((variable) =>
        this.variableDeclarations.set(variable.name, variable)
      );
  }

  isInScope(targetName: string): boolean {
    return this.variableDeclarations.has(targetName);
  }

  isInUpperScope(targetName: string): boolean {
    return !!this.getParentScope()?.isInAnyScope(targetName);
  }

  isInAnyScope(targetName: string): boolean {
    return this.isInScope(targetName) || this.isInUpperScope(targetName);
  }
}
