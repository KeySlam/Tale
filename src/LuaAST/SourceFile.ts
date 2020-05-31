import { Node } from "./Node";

export class SourceFile extends Node {
  name: string;
  path: string;

  requireClassFactory = false; 

  constructor(name: string, path: string) {
    super();

    this.name = name;
    this.path = path;
  }

  getStringRepresentation() {
    let out = "";

    if (this.requireClassFactory) {
      out += "local __ClassFactory = require(\"ClassFactory\");\n";
    }

    this.children.forEach(child => {
      out += child.getStringRepresentation();
      out += "\n";
    });

    return out;
  }
}
