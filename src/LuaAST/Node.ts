export class Node {
  parent?: Node;
  children: Node[];

  constructor() {
    this.children = [];
  }

  addChild(child: Node) {
    // TODO: Check if child has parent. Remove from there if needed?

    this.children.push(child);
    child.parent = this;
  }

  setParent(parent: Node) {
    parent.addChild(parent);
  }

  getRootNode() : Node {
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
