// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { keywords_to_upper } from './formatting_function/upper';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable : vscode.Disposable = vscode.commands.registerCommand('extension.SQLuppercase', () => {
		// The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if (editor !== undefined) {
            let document = editor.document;
            let text = document.getText();

            // upper yql keywords
			let newText = keywords_to_upper(text);
            //newText = set_indents(newText);

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

// This method is called when your extension is deactivated
export function deactivate() {}
