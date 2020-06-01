import { AssignStatement } from "./AssignStatement";
import { LocalStatement } from "./LocalStatement";

export class Node {
  parent?: Node;

  getRootNode(): Node {
    let currentNode: Node = this;

    while (currentNode.parent != undefined) {
      currentNode = currentNode.parent;
    }

    return currentNode;
  }

  getParentScope(): ScopedNode|undefined {
    let currentNode: Node|undefined = this.parent;

    while (currentNode !== undefined && !(currentNode instanceof ScopedNode)) {
      currentNode = currentNode.parent
    }

    return currentNode
  }

  getStringRepresentation(): string {
    return "";
  }
}

export class ScopedNode extends Node {
  children: Node[] = [];
  variableDeclarations = new Map<string, LocalStatement>();

  addChild (child: Node) {
    this.children.push(child);
    child.parent = this;

    if (child instanceof LocalStatement) {
      this.variableDeclarations.set(child.name, child)
    }
  }

  isInScope(targetName: string): boolean {
    return this.variableDeclarations.has(targetName)
  }

  isInUpperScope(targetName: string): boolean {
      return !!this.getParentScope()?.isInAnyScope(targetName)
  }

  isInAnyScope(targetName: string): boolean {
      return this.isInScope(targetName) || this.isInUpperScope(targetName);
  }
}