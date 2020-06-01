import { Node } from "./Node";

export class ClassDeclaration extends Node {
  children: Node[] = [];

  constructor(public name: string) {
    super();
  }

  addChild(child: Node) {
    this.children.push(child);
    child.parent = this;
  }

  getStringRepresentation(): string {
    let out = "";

    out += `local ${this.name} = __ClassFactory()\n`;

    this.children.map((child) => child.getStringRepresentation()).join("\n");

    return out;
  }
}
