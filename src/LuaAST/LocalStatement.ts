import { Node } from "./Node";
import { Expression } from "./Expressions/Expression";

export class LocalStatement extends Node {
  constructor(public name: string, public expression?: Expression) {
    super();

    if (expression) expression.parent = this;
  }

  getStringRepresentation(): string {
    if (this.expression != undefined) {
      return `local ${
        this.name
      } = ${this.expression.getStringRepresentation()}`;
    } else {
      return `local ${this.name}`;
    }
  }
}
