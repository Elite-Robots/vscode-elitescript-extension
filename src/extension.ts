import * as vscode from 'vscode';
import * as eliteHoverProvider from './EliteHoverProvider';
import * as eliteCompletionProvider from './EliteCompletionProvider'
import { CountryLanguage } from './Configure/config';
import * as eliteLoadFunction from './EliteFunctions/EliteLoadFunctions';

let g_functionList : any[] | undefined;
let g_currentLanguage : CountryLanguage = CountryLanguage.ENGLISH;
let g_hovPvd : vscode.Disposable;
let g_cmpPvd : vscode.Disposable;

/**
 * Load or update language. Will register Hover, Completion and more
 * @param context vecode context
 * @returns 
 */
async function  loadOrUpdateLanguage(context: vscode.ExtensionContext) {
    // Load elite robot function
    g_functionList = await eliteLoadFunction.loadEliteFunctions(g_currentLanguage);
    
    if(g_functionList == undefined) {
        return undefined;
    }

    if(g_hovPvd) {
        g_hovPvd.dispose();
    }

    // HoverProvider
    g_hovPvd = vscode.languages.registerHoverProvider(
        { language: 'elitescript' },
        new eliteHoverProvider.EliteFunctionsHoverProvider(g_functionList)
    )

    if(g_cmpPvd) {
        g_cmpPvd.dispose();
    }

    g_cmpPvd = vscode.languages.registerCompletionItemProvider(
        { language: 'elitescript' },
        new eliteCompletionProvider.EliteCompletionItemProvider(g_functionList)
    );
    context.subscriptions.push(g_cmpPvd, g_hovPvd);
}

// when plugin active
export async function activate(context: vscode.ExtensionContext) {
    // When active, load default language. Register hover, completion and more.
    await loadOrUpdateLanguage(context);
    
    // Register switch language command.
    const switchToChinese = vscode.commands.registerCommand('extension.switchLanguageToChinese', async () => {
        g_currentLanguage = CountryLanguage.CHINESE;
        loadOrUpdateLanguage(context);
        vscode.window.showInformationMessage('Elite Script extension switched to Chinese');
    });

    const switchToEnglish = vscode.commands.registerCommand('extension.switchLanguageToEnglish', async () => {
        g_currentLanguage = CountryLanguage.ENGLISH;
        loadOrUpdateLanguage(context);
        vscode.window.showInformationMessage('Elite Script extension switched to English');
    });

    context.subscriptions.push(switchToChinese, switchToEnglish);
}


export function deactivate() {}
