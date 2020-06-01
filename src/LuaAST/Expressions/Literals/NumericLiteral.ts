import { Expression } from "../Expression";

export class NumericLiteral extends Expression {
  constructor(public value: number) {
    super();
  }

  getStringRepresentation() {
    return `${this.value}`;
  }
}
