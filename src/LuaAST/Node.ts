export class Node {
  parent?: Node;

  constructor() {}

  getRootNode(): Node {
    let currentNode: Node = this;

    while (currentNode.parent != undefined) {
      currentNode = currentNode.parent;
    }

    return currentNode;
  }

  getStringRepresentation(): string {
    return "";
  }
}
