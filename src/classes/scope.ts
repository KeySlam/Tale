import { VariableDeclaration } from "ts-morph";

export default class Scope {
    variableDeclarations: VariableDeclaration[] = [];

    parent?: Scope = undefined;
    children: Scope[] = [];

    constructor(parent?: Scope) {
        this.parent = parent;
    }

    isInScope(targetName: string): boolean {
        for (let variableDeclaration of this.variableDeclarations) {
            if (variableDeclaration.getName() == targetName) {
                return true;
            }
        }
        
        return false;
    }

    isInUpperScope(targetName: string): boolean {
        if (this.parent !== undefined) {
            return this.parent.isInAnyScope(targetName);
        }

        return false;
    }

    isInAnyScope(targetName: string): boolean {
        return this.isInScope(targetName) || this.isInUpperScope(targetName);
    }
}