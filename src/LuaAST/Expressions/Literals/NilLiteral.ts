import { Expression } from "../Expression";

export class NilLiteral extends Expression {
  getStringRepresentation() {
    return "nil";
  }
}