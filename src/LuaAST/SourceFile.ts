import { Node } from "./Node";

export class SourceFile extends Node {
  name: string;
  path: string;

  constructor(name: string, path: string) {
    super();

    this.name = name;
    this.path = path;
  }
}
