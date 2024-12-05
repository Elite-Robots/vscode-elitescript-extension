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


        // // 如果用户没有输入任何内容，则不提供补全
        // if (!currentWord) {
        //     return undefined;
        // }

        // // 过滤出匹配当前输入的函数名
        // const matchingItems = this.functionCmpItems.filter(item => item.label.startsWith(currentWord));

        // // 如果有匹配的补全项，则返回
        // if (matchingItems.length > 0) {
        //     return new vscode.CompletionList(matchingItems, false);  // `false` means no further suggestions
        // }

        // // 如果没有匹配，返回 undefined，表示没有补全
        // return undefined;
    }
}
