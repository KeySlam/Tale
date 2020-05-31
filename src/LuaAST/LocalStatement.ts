import { Node } from "./Node";
import { Expression } from "./Expressions/Expression";

export class LocalStatement extends Node {
  name: String;
  expression?: Expression;

  constructor(name: String, expression?: Expression) {
    super();

    this.name = name;
    this.expression = expression;
  }

  getStringRepresentation(): string {
    if (this.expression != undefined) {
      return `local ${this.name} = ${this.expression?.getStringRepresentation()};`;
    } else {
      return `local ${this.name};`;
    }
  }
}
