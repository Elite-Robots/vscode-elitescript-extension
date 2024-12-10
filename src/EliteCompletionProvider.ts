import * as vscode from 'vscode';
import {
    Function
} from './EliteFunctions/EliteFunctions';
import { EliteKeyWord } from './EliteFunctions/EliteKeyWord';

export class EliteCompletionItemProvider implements vscode.CompletionItemProvider {
    
    private functionCmpItems: vscode.CompletionItem[];
    private eliteKeywords: EliteKeyWord;

    constructor(funcsList: Function[]) {
        this.functionCmpItems = funcsList.map(
            func => {
                let cmpItem = new vscode.CompletionItem(func.name, vscode.CompletionItemKind.Method);
                cmpItem.detail = func.description;
                cmpItem.insertText = new vscode.SnippetString(func.name + "($1)");  // 修改为光标停留在括号中间
                cmpItem.commitCharacters = ['\t', '\n'];
                cmpItem.documentation = func.doc;
                cmpItem.sortText = 'm';
                return cmpItem;
            }
        );

        this.eliteKeywords = new EliteKeyWord;
    }

    public async provideCompletionItems(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        token: vscode.CancellationToken, 
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionList | undefined> {
        
        // 获取当前光标位置前的单词，判断用户输入的内容
        const wordRange = document.getWordRangeAtPosition(position);
        const currentWord = wordRange ? document.getText(wordRange) : '';
        
        if(currentWord) {
            return new vscode.CompletionList([
                ...this.functionCmpItems,
                ...this.eliteKeywords.keywordCmpItems,
                ...this.eliteKeywords.expKeywordCmpItems,
            ]);
        }
        return new vscode.CompletionList([
            ...this.functionCmpItems,
            ...this.eliteKeywords.keywordCmpItems,
            ...this.eliteKeywords.expKeywordCmpItems,
        ]);
    }
}
