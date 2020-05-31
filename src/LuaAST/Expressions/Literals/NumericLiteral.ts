import { Expression } from "../Expression";

export class NumericLiteral extends Expression {
  value: number;
  
  constructor(value: number) {
    super();

    this.value = value;
  }

  getStringRepresentation() {
    return `${this.value}`;
  }
}