"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const keywords_json_1 = __importDefault(require("./keywords.json"));
function special_split(text) {
    let arr = [];
    let current = "";
    let left = -1;
    let right = -1;
    //run before meet ', ", `, then add part before and start new part
    while (right < text.length) {
        right++;
        if (['"', "'", "`"].includes(text[right])) {
            if (current == "") {
                current = text[right];
                arr.push(text.slice(left + 1, right));
                left = right;
            }
            else if (text[right] == current) {
                current = "";
                arr.push(text.slice(left + 1, right));
                left = right;
            }
        }
    }
    // add last part
    arr.push(text.slice(left + 1, right));
    return arr;
}
;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.SQLuppercase', () => {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if (editor != undefined) {
            let document = editor.document;
            let text = document.getText();
            let newText = "";
            // split by ', ", `
            let parts = special_split(text);
            // format only parts not in ', ", `
            for (let index = 0; index < parts.length; index++) {
                if (index % 2 != 1) {
                    let part = " " + parts[index];
                    for (let jndex = 0; jndex < keywords_json_1.default.length; jndex++) {
                        let pattern = new RegExp(`(?<=[ |\n|;|\(|\)])(${keywords_json_1.default[jndex]})(?=[ |\n|;|\(|\)])`, 'ig');
                        part = part.replace(pattern, keywords_json_1.default[jndex].toUpperCase());
                    }
                    ;
                    parts[index] = part.slice(1, part.length);
                }
                ;
            }
            ;
            //join array
            newText = parts.join(`"`);
            //deletes old text and inserts new
            editor.edit(editBuilder => {
                editBuilder.delete(new vscode.Range(document.positionAt(0), document.positionAt(text.length)));
                let beginning = new vscode.Position(0, 0);
                editBuilder.insert(beginning, newText);
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map