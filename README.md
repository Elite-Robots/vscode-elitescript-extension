[中文](README_CN.md)
# EliteScript

EliteScript is the Elite Robots scripting language, like any other programming language, EliteScript has variables, types, control flow statements, functions, etc. Additionally, EliteScript has many built-in variables and functions to monitor and control robot input/output and motion.


## Feature
- Syntax highlighting

- Code completion.

- Hover prompt.

- Switch language command. (Chinese and English provide)

## Notice

This extension **NOT INCLUDE** following feature:
- Compiler, syntax check, debug, running. You should upload program to controller or simulator for compile and execute.
- Formatting, go to definition, completion and signatures. But support soon.
- Language Server Protocol(LSP).


## How to build
1. Download and install node.js：[node.js official](https://nodejs.org)
2. Install Visual Studio Code Extension Manager：`npm install -g vsce`。
3. Install the tools needed during the compilation of this extensions: `npm install`。
4. If you have modified the file in the '.\syntaxes\src\ 'directory, you need to execute it: `./node_modules/.bin/syntaxdev build-plist --in ./syntaxes/src/elitescript.tmLanguage.yaml --out ./syntaxes/elitescript.tmLanguage` 。
5. Compile: `vsce package`。
6. Open VSCode and Run the command Extensions: Install from VSIX..., choose the vsix file generated in the previous step
