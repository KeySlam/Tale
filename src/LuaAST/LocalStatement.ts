import { Type, VariableDeclaration, Node } from "./Node";
import { Expression } from "./Expressions/Expression";

export class LocalStatement extends Node {
  constructor(public name: string, public type: Type, public expression?: Expression) {
    super();

    if (expression) expression.parent = this;
  }

  getVariables (): VariableDeclaration[] {
    return [{
      name: this.name,
      type: this.type
    }]
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