import * as vscode from 'vscode';

export class EliteKeyWord {
    private keywordsArray:string[] = [
        "False", "None", "True", "and", "as", "assert", "async", "await", "break", 
        "class", "continue", "def", "del", "elif", "else", "except", "finally", 
        "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", 
        "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"
    ];

    public keywordCmpItems: vscode.CompletionItem[];
    public expKeywordCmpItems: vscode.CompletionItem[] = [];

    constructor() {
        // Keyword completion items
        this.keywordCmpItems = this.keywordsArray.map(keyword => {
            let cmpItem = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
            cmpItem.detail = `Keyword: ${keyword}`;
            cmpItem.insertText = new vscode.SnippetString(keyword);
            cmpItem.sortText = 'k';  // Sort keywords higher
            return cmpItem;
        });

        this.expKeywordRegister("if", 'if ${1:exp}:\n\t${2}', vscode.CompletionItemKind.Snippet);
        this.expKeywordRegister("elif", 'elif ${1:exp}:\n\t${2}', vscode.CompletionItemKind.Snippet);
        this.expKeywordRegister("else", 'else:\n\t${1}\n\t${2}', vscode.CompletionItemKind.Snippet);
        this.expKeywordRegister("while", 'while${1:exp}:\n\t${2}', vscode.CompletionItemKind.Snippet);
        this.expKeywordRegister("try", 'try:\n\t${1}\nexcept ${2:error}:\n\t${3}\nfinally:\n\t${4}', vscode.CompletionItemKind.Snippet);
        this.expKeywordRegister("def", 'def ${1:function}(${2}) -> ${3:type}:\n\t${4}', vscode.CompletionItemKind.Function);
        this.expKeywordRegister("class", "class ${1:name}:\n\t${2}", vscode.CompletionItemKind.Class);
        
    }

    private expKeywordRegister(name: string, instertText: string, kind: vscode.CompletionItemKind) {
        let cmpItem = new vscode.CompletionItem(name, kind);
        cmpItem.detail = `Keyword: ${name}`;
        cmpItem.insertText = new vscode.SnippetString(instertText);
        cmpItem.sortText = 'km';  // Sort keywords higher
        this.expKeywordCmpItems.push(cmpItem);
    }


};



