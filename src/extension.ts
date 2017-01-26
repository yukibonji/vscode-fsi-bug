'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as os from 'os'

var terminal : vscode.Terminal;

let isWin = os.type() === 'Windows_NT'

function getPath() {
    if (isWin) {
        return "C:\\Program Files (x86)\\Microsoft SDKs\\F#\\4.0\\Framework\\v4.0\\FsiAnyCPU.exe"
    }
    else {
        return "fsharpi"
    }
}

function startFsi() {
    let pp = getPath()
    if (isWin) {
        terminal = vscode.window.createTerminal("F# Interactive", pp, [ "--fsi-server-input-codepage:65001" ])
    }
    else {
        terminal = vscode.window.createTerminal("F# Interactive", pp)
    }
    terminal.show()
}

function send(msg : string) {
    let msgWithNewline = msg + "\n;;\n"
    terminal.show()
    terminal.sendText(msgWithNewline, false)
}

function sendSelection() {
    let editor = vscode.window.activeTextEditor
    let file = editor.document.fileName

    let r = new vscode.Range(editor.selection.anchor.line, editor.selection.anchor.character, editor.selection.active.line, editor.selection.active.character)
    let text = editor.document.getText(r)
    send(text)
}

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "test-fsi" is now active!');

    vscode.commands.registerCommand('extension.startFsi', () => {
        startFsi();
    });

    vscode.commands.registerCommand('extension.sendSelection', () => {
        sendSelection();
    });

}

export function deactivate() {
}