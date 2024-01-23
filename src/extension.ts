// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import SQLKeyWords from './keywords.json';

function special_split(text: String) {
    let arr = [];
    let current = "";
    let left = -1;
    let right = -1;
	//run before meet ', ", `, then add part before and start new part
    while (right < text.length) {
        right ++;
        if (['"', "'", "`"].includes(text[right])) {
            if (current == "") {
                current = text[right];
                arr.push(text.slice(left+1, right));
                left = right;
            } else if (text[right] == current) {
                current = "";
                arr.push(text.slice(left+1, right));
                left = right;
            }
        }
    }
	// add last part
    arr.push(text.slice(left+1, right));
    return arr;
}
;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable : vscode.Disposable = vscode.commands.registerCommand('extension.SQLuppercase', () => {
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
				if (index%2 != 1) {
					let part = " " + parts[index];
					for (let jndex = 0; jndex < SQLKeyWords.length; jndex++) {
						let pattern = new RegExp(`(?<=[ |\n|;|\(|\)])(${SQLKeyWords[jndex]})(?=[ |\n|;|\(|\)])`, 'ig');
						part = part.replace(pattern, SQLKeyWords[jndex].toUpperCase());
					};
					parts[index] = part.slice(1, part.length);
				};
			};
			
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

// This method is called when your extension is deactivated
export function deactivate() {}
