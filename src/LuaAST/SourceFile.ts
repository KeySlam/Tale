import { Node } from "./Node";

export class SourceFile extends Node {
  children: Node[] = [];

  requireClassFactory = false;

  constructor(public name: string, public path: string) {
    super();
  }

  addChild(child: Node) {
    this.children.push(child);
    child.parent = this;
  }

  getStringRepresentation() {
    let out = "";

    if (this.requireClassFactory) {
      out += 'local __ClassFactory = require("ClassFactory")\n';
    }

    this.children.forEach((child) => {
      out += child.getStringRepresentation();
      out += "\n";
    });

    return out;
  }
}
