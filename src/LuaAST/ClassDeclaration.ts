import { Node } from "./Node";

export class ClassDeclaration extends Node {
  name: String;

  constructor(name: String) {
    super();

    this.name = name;
  }

  getStringRepresentation(): string {
    let out = "";
    
    out += `local ${this.name} = __ClassFactory();\n`;

    this.children.forEach(child => {
      out += child.getStringRepresentation();
    });

    return out;
  }
}
