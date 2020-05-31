import { Node } from "./Node";

export class VariableDeclaration extends Node {
  name: String;
  value?: String;

  constructor(parent: Node, name: String, value?: String) {
    super(parent);

    this.name = name;
    this.value = value;
  }

  getStringRepresentation(): string {
    return `local ${this.name} = ${this.value};`;
  }
}
