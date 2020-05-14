import { Project, ProjectOptions } from "ts-morph";

// Load project
let projectName = process.argv.slice(2);

let projectOptions: ProjectOptions = {}
projectOptions.tsConfigFilePath = `tests/${projectName}/tsconfig.json`;

let project = new Project(projectOptions);

// Check for compile time errors
let diagnostics = project.getPreEmitDiagnostics();
if (diagnostics.length > 0) {
    console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
    
    // Probably stop execution now?
}

let sourceFiles = project.getSourceFiles();
sourceFiles.forEach(sourceFile => {
    console.log(`File: ${sourceFile.getFilePath()}`);

    sourceFile.getDescendants().forEach(node => {
        console.log(node.getKindName());
    });
});

/*
class Scope {
    variableDeclarations: VariableDeclaration[] = [];

    parent?: Scope = undefined;
    children: Scope[] = [];

    constructor(parent?: Scope) {
        this.parent = parent;
    }


    isInScope(targetName: string): boolean {
        for (let variableDeclaration of this.variableDeclarations) {
            if (variableDeclaration.name == targetName) {
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

class VariableDeclaration {
    name: string;
    identifier: ts.Identifier;

    constructor(name: string, identifier: ts.Identifier) {
        this.name = name;
        this.identifier = identifier;
    }
}

let parseTypescriptAST = (node: ts.Node, scope: Scope): void => {
    node.getChildren().forEach(child => {
        switch (child.kind) {
            case ts.SyntaxKind.VariableDeclarationList:
                let variableDeclarationList = child as ts.VariableDeclarationList;

                variableDeclarationList.declarations.forEach(declaration => {
                    let identifier = declaration.name as ts.Identifier;

                    let variableName = identifier.escapedText as string;

                    if (scope.isInScope(variableName)) {
                        console.log(`Hiding '${variableName}' in this scope`);
                    } else if (scope.isInAnyScope(variableName)) {
                        console.log(`Hiding '${variableName}' in upper scope`);
                    }

                    let variableDeclaration = new VariableDeclaration(variableName, identifier);
                    scope.variableDeclarations.push(variableDeclaration);
                });

                break;
            case ts.SyntaxKind.Block:
                let block = child as ts.Block;

                let blockScope = new Scope(scope);
                scope.children.push(blockScope);

                parseTypescriptAST(child, blockScope);

                break;
            default:
                parseTypescriptAST(child, scope);

                break;
        }
    });
}
*/