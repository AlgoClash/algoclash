import React from 'react';

<<<<<<< HEAD
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/lesser-dark.css';
=======
import CodeMirror from '@skidding/react-codemirror';
>>>>>>> e6672e2d59aa50ed61520fdb7036fa14270f2236

const options = {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'lesser-dark',
};

const Editor = (props) => {

    const handleChange = (value) => {
        props.onChange(value);
    }

    return (
        <div className='ide' >

            <div className='header'>
                {props.username}
                {props.user === 'challenger' ? '' : <button id='collapse' onClick={() => props.collapse(!props.collapsed)}>{props.collapsed ? `<<` : `>>`}</button>}
            </div>

            <div className={`editor ${props.user === 'challenger' ? 'challenger' : 'player'}`} >
                <CodeMirror onChange={handleChange} options={options} value={props.value} />
            </div>

        </div>
    );
}

export default Editor;