import * as vscode from 'vscode';
import * as eliteHoverProvider from './EliteHoverProvider';
import * as eliteCompletionProvider from './EliteCompletionProvider'
import { CountryLanguage } from './Configure/config';
import * as eliteLoadFunction from './EliteFunctions/EliteLoadFunctions';

// when plugin active
export async function activate(context: vscode.ExtensionContext) {
    // Load elite robot function
    let functionList = await eliteLoadFunction.loadEliteFunctions(CountryLanguage.ENGLISH);
    if(functionList == undefined) {
        return;
    }
    // HoverProvider
    const hovPvd = vscode.languages.registerHoverProvider(
        { language: 'elitescript' },
        new eliteHoverProvider.EliteFunctionsHoverProvider(functionList)
    )

    const cmpPvd = vscode.languages.registerCompletionItemProvider(
        { language: 'elitescript' },
        new eliteCompletionProvider.EliteCompletionItemProvider(functionList),
        '#'
    );

    context.subscriptions.push(cmpPvd, hovPvd);
}


export function deactivate() {}
