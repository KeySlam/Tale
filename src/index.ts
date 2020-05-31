import Scope from "./classes/scope";

import * as TsAST from "ts-morph";
import * as LuaAST from "./LuaAST";

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

function getScope(node: TsAST.StatementedNode, parent?: Scope) : Scope {
    let scope = new Scope(parent);

    node.getVariableDeclarations().forEach(variableDeclaration => {
        scope.variableDeclarations.push(variableDeclaration);
    });

    return scope;
}

function buildLuaAST(sourceFile: TsAST.SourceFile) : LuaAST.SourceFile {
    const luaSourceFile = new LuaAST.SourceFile("test.lua", sourceFile.getFilePath()); // TODO: Get file name
    
    sourceFile.getVariableDeclarations().forEach(variableDeclaration => { 
        const name = variableDeclaration.getName()
        const expression = variableDeclaration.getInitializer()?.getText();

        const luaVariableDeclaration = new LuaAST.VariableDeclaration(luaSourceFile, name, expression);

        luaSourceFile.children.push(luaVariableDeclaration);
    });

    return luaSourceFile;
}

function outputLuaFile(luaSourceFile : LuaAST.SourceFile) : string {
    let output : string = "";

    luaSourceFile.children.forEach(child => {
        output += child.getStringRepresentation();
        output += "\n";
    });

    return output;
}

let sourceFiles = project.getSourceFiles();
sourceFiles.forEach(sourceFile => {
    console.log(`File: ${sourceFile.getFilePath()}`);

    const luaSourceFile = buildLuaAST(sourceFile);
    const luaFileOutput = outputLuaFile(luaSourceFile);

    console.log(luaFileOutput);

    /*
    sourceFile.getClasses().forEach(classDeclaration => {
        classDeclaration.getMethods().forEach(methodDeclaration => {
            let methodScope = getScope(methodDeclaration, rootScope);
            //console.log(methodScope);
        });
    });
    */
});