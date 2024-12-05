import * as vscode from 'vscode';
import * as eliteFunctions from './EliteFunctions/EliteFunctions';

export class EliteFunctionsHoverProvider implements vscode.HoverProvider {

    functionList : eliteFunctions.Function[];

    constructor(funcList : eliteFunctions.Function[]) {
        this.functionList = funcList;
    }

    public async provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.Hover | undefined> {
        let fl = await this.functionList;
        if(fl == undefined) {
            return undefined;
        }
        const range = document.getWordRangeAtPosition(position);
        if (!range) {
            return undefined;
        }
        const word = document.getText(range);
        let func = fl.find(hovItem => hovItem.name === word);
        if(func != undefined) {
            const hoverContent = func.doc;
            return new vscode.Hover(hoverContent);
        }
        return undefined;
    }
}