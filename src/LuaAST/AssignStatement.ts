import { Node } from "./Node";
import { Expression } from "./Expressions/Expression";

export class AssignStatement extends Node {
  constructor(
    public object: string,
    public variable: string,
    public expression: Expression
  ) {
    super();

    expression.parent = this;
  }

  getStringRepresentation(): string {
    const value = this.expression.getStringRepresentation();

    return `${this.object}.${this.variable} = ${value}`;
  }
}
