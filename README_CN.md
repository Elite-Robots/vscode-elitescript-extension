# Elite 机器人脚本语言

EliteScript 是艾利特机器人脚本编程语言，像任何其他编程语言一样，EliteScript 也有变量、类型、控制流语句、函数等。此外，EliteScript 有许多内置变量和函数，可监视并控制机器人的输入/输出和运动。

## 功能
- 关键字语法高亮。

- 内置函数代码补全。

- 内置函数悬停提示。

## 注意

本插件只提供了语法高亮，内置函数代码补全和悬停提示的功能， **不包含**下面的功能：
- 编译、运行、调试、语法检查功能，因此使用此插件写完代码后，需要放到机器人或仿真里校验正确性。
- 签名帮助、代码格式化、定义跳转，这几项功能在未来会逐渐支持。
- Language Server Protocol，即 LSP。


## 如何构建此插件
1. 下载安装 node.js：[node.js官网](https://nodejs.org)
2. 安装 Visual Studio Code Extension Manager：`npm install -g vsce`。
3. 安装本插件编译过程中需要的工具：`npm install`。
4. 如果修改过`.\syntaxes\src\`目录下的文件，需要执行：`./node_modules/.bin/syntaxdev build-plist --in ./syntaxes/src/elitescript.tmLanguage.yaml --out ./syntaxes/elitescript.tmLanguage` 。
5. 编译：`vsce package`。
6. 在vscode扩展中，通过.vsix安装此插件。

