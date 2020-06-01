import { Type, VariableDeclaration } from "./Node";
import { Expression } from "./Expressions/Expression";

export class LocalStatement extends VariableDeclaration {
  constructor(name: string, type: Type, public expression?: Expression) {
    super(name, type);

    if (expression) expression.parent = this;
  }

  getStringRepresentation(): string {
    if (this.expression != undefined) {
      const value = this.expression.getStringRepresentation();
      return `local ${this.name} = ${value}`;
    } else {
      return `local ${this.name}`;
    }
  }
}