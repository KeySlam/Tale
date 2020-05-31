import { Expression } from "./Expression";
import { Operator } from "../Types/Operator";

export class BinaryExpression extends Expression {
  operator: Operator
  left: Expression;
  right: Expression;

  constructor(operator: Operator, left: Expression, right: Expression) {
    super();
    
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  getStringRepresentation() {
    return `${this.left.getStringRepresentation()} ${this.operator} ${this.right.getStringRepresentation()}`; 
  }
}