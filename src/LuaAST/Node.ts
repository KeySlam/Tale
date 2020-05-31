export class Node {
  parent?: Node;
  children: Node[];

  constructor(parent?: Node) {
    this.parent = parent;
    this.children = [];
  }

  getStringRepresentation(): string {
    return "";
  }
}
