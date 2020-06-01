import { ScopedNode } from "./Node";

export class SourceFile extends ScopedNode {
  requireClassFactory = false;

  constructor(public name: string, public path: string) {
    super();
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
