import { Node } from "./Node";
import { Expression } from "./Expressions/Expression";

export class AssignStatement extends Node {
  object: String;
  variable: String;
  expression: Expression;

  constructor(object: String, variable: String, expression: Expression) {
    super();

    this.object = object;
    this.variable = variable;
    this.expression = expression;
  }

  getStringRepresentation(): string {
    return `${this.object}.${this.variable} = ${this.expression?.getStringRepresentation()};\n`;
  }
}
