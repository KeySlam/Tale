import * as TsAST from "ts-morph";
import * as LuaAST from "./LuaAST";
import { VariableLikeDeclaration } from "typescript";
import fs from "fs";

// Load project
let projectName = process.argv.slice(2);

let projectOptions: TsAST.ProjectOptions = {}
projectOptions.tsConfigFilePath = `tests/${projectName}/tsconfig.json`;

let project = new TsAST.Project(projectOptions);

// Check for compile time errors
let diagnostics = project.getPreEmitDiagnostics();
if (diagnostics.length > 0) {
    console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
    
    // Probably stop execution now?
}

// function getScope(node: TsAST.StatementedNode, parent?: Scope) : Scope {
//     let scope = new Scope(parent);

//     node.getVariableDeclarations().forEach(variableDeclaration => {
//         scope.variableDeclarations.push(variableDeclaration);
//     });

//     return scope;
// }

function buildExpression(expression: TsAST.Expression) : LuaAST.Expression{
    if (TsAST.TypeGuards.isBinaryExpression(expression)) {
        const binaryExpression = expression as TsAST.BinaryExpression;

        const token = binaryExpression.getOperatorToken().getText() as LuaAST.Operator; // TODO: Make this conversion more explicit?
        const left = binaryExpression.getLeft();
        const right = binaryExpression.getRight();

        return new LuaAST.BinaryExpression(token, buildExpression(left), buildExpression(right));
    } else if (TsAST.TypeGuards.isNumericLiteral(expression)) {
        const numericLiteral = expression as TsAST.NumericLiteral;

        const value = numericLiteral.getLiteralValue();

        return new LuaAST.NumericLiteral(value);
    }

    return new LuaAST.NilLiteral();
}

function buildClass(parent: LuaAST.ScopedNode, classDeclaration: TsAST.ClassDeclaration) : LuaAST.ClassDeclaration {
    const className = classDeclaration.getName()!; // TODO: This can be undefined, annonymous classes are a thing

    //TODO: get rid of this, in Lua there is no ClassDeclaration
    // We can turn this into a LocalStatement, with an FunctionCallExpression as value
    let luaClassDeclaration = new LuaAST.ClassDeclaration(className);

    //TODO: use classDeclaration.getChildren().forEach() instead of this
    // This will require to support building static, public, properties, methods, getters and setters.
    classDeclaration.getStaticProperties().forEach(classStaticProperty => {
        const propertyName = classStaticProperty.getName();
        
        // TODO: Can be PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration

        if (TsAST.TypeGuards.isPropertyDeclaration(classStaticProperty)) {
            let propertyDeclaration = classStaticProperty as TsAST.PropertyDeclaration;

            const initializer = propertyDeclaration.getInitializer();

            let luaAssignStatement : LuaAST.AssignStatement;

            if (initializer != undefined) {
                const expression = buildExpression(initializer);

                luaAssignStatement = new LuaAST.AssignStatement(className, propertyName, expression);

                luaClassDeclaration.addChild(luaAssignStatement);
            } else {
                // This can happen, but it only serves as a type definition
                // No need to turn this node into Lua
            }

            classStaticProperty.forget();
        }
    });

    return luaClassDeclaration;
}

function buildLuaAST(sourceFile: TsAST.SourceFile) : LuaAST.SourceFile {
    const luaSourceFile = new LuaAST.SourceFile("test.lua", sourceFile.getFilePath()); // TODO: Get file name
    
    sourceFile.getDescendants().forEach(descendant => {
        if (descendant.wasForgotten()) {
            return;
        }

        if (TsAST.TypeGuards.isVariableDeclaration(descendant)) {
            let variableDeclaration = descendant as TsAST.VariableDeclaration;

            const name = variableDeclaration.getName()
            const initializer = variableDeclaration.getInitializer();

            let luaLocalStatement : LuaAST.LocalStatement;

            if (initializer != undefined) {
                const expression = buildExpression(initializer);
                
                luaLocalStatement = new LuaAST.LocalStatement(name, expression);
                
                luaSourceFile.children.push(luaLocalStatement);
            } else {
                luaLocalStatement = new LuaAST.LocalStatement(name);

                luaSourceFile.children.push(luaLocalStatement);
            }

            descendant.forget();
            return;
        }

        if (TsAST.TypeGuards.isClassDeclaration(descendant)) {
            let classDeclaration = descendant as TsAST.ClassDeclaration;

            
            let luaClassDeclaration = buildClass(luaSourceFile, classDeclaration);

            luaSourceFile.addChild(luaClassDeclaration);

            descendant.forget();
            return;
        }
    });

    return luaSourceFile;
}

let sourceFiles = project.getSourceFiles();
sourceFiles.forEach(sourceFile => {
    console.log(`File: ${sourceFile.getFilePath()}`);

    const luaFileOutput = buildLuaAST(sourceFile).getStringRepresentation();

    console.log(luaFileOutput);

    // Temp output file
    fs.writeFile("tests/base/output/main.lua", luaFileOutput, () => {

    });

    /*
    sourceFile.getClasses().forEach(classDeclaration => {
        classDeclaration.getMethods().forEach(methodDeclaration => {
            let methodScope = getScope(methodDeclaration, rootScope);
            //console.log(methodScope);
        });
    });
    */
});