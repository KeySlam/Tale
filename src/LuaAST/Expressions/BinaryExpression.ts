import { Expression } from "./Expression";
import { Operator } from "../Types/Operator";

export class BinaryExpression extends Expression {
  constructor(
    public operator: Operator,
    public left: Expression,
    public right: Expression
  ) {
    super();

    left.parent = this;
    right.parent = this;
  }

  getStringRepresentation() {
    const left = this.left.getStringRepresentation();
    const right = this.right.getStringRepresentation();

    return `${left} ${this.operator} ${right}`;
  }
}
