import { readFileSync } from "fs";
import * as ts from "typescript";

let printNodeASTRecursive = (node: ts.Node): void => {
    console.log(ts.SyntaxKind[node.kind]);
    
    node.getChildren().forEach(child => {
        printNodeASTRecursive(child);
    });
}


let fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
    let fullPath = (__dirname + "/" + fileName);

    let sourceFile = ts.createSourceFile(
        fileName,
        readFileSync(fullPath).toString(),
        ts.ScriptTarget.ES2015,
        true
    );

    let startNode: ts.Node = sourceFile;
    printNodeASTRecursive(startNode);
});

