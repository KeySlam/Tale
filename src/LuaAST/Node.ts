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

export class VariableDeclaration extends Node {
  constructor(public name: string, public type: Type) {
    super();
  }
}

export class ScopedNode extends Node {
  children: Node[] = [];
  variableDeclarations = new Map<string, VariableDeclaration>();

  addChild(child: Node) {
    this.children.push(child);
    child.parent = this;

    if (child instanceof VariableDeclaration) {
      this.variableDeclarations.set(child.name, child);
    }
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
