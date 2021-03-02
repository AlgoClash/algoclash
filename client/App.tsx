import React, { useState, useEffect } from 'react';

import Editor from './Editor';
import Console from './Console';
import Question from './Question';
import Tests from './Tests';

import '../public/styles/global.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/dracula.css';

const App = () => {

    const [id, setID] = useState<string>('');

    const [playerCode, setPlayerCode] = useState<string>('');
    const [challengerCode, setChallengerCode] = useState<string>('const test = (arg) => { console.log("hello!"); }');

    const [js, writeJS] = useState<string>('');

    const [question, setQuestion] = useState<string>(``);
    const [tests, setTests] = useState<string>('');

    const [playerConsole, writeConsole] = useState<string>('');

    const srcDoc = `
        <html>
            <script>${js}</script>
        </html>
    `;

    useEffect(() => {
        //Grab socket information
        setID('benji');
    }, []);

    const writeToDom = () => {
        writeJS(playerCode);
    }

    const evaluateCode = () => {
        try {
            writeConsole(eval(playerCode)); 
        } catch (e) {
            if (e instanceof SyntaxError) {
                writeConsole(e.message);
            } else {
                throw e;
            }
        }
    }

    return (
        <div id='container'>

            <div id='questioncontainer'>
                <Question value={question} />
            </div>

            <div id='editorcontainer'>
                <Editor user='player' username={`${id} (You)`} lanuage='js' value={playerCode} onChange={setPlayerCode} />
                <Editor user='challenger' username={'challenger'} lanuage='js' value={challengerCode} onChange={setChallengerCode} />
            </div>
            
            <div id='testcontainer'>
                <Tests value={tests} />
            </div>

            <div id='consolecontainer'>
                <Console value={playerConsole} />
            </div>

            <div id='btncontainer'>
                <button id='testbtn' onClick={evaluateCode} >TEST</button>
                <button id='submitbtn' onClick={writeToDom} >SUBMIT</button>
            </div>

            <div id='terminal'>
                <iframe
                id='iframe'
                srcDoc={srcDoc}
                title='output'
                sandbox='allow-scripts'
                frameBorder='0'
                width='100%'
                height='100%'
                />
            </div>

        </div>
    );
}

export default App;