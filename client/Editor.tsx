import React from 'react';

import CodeMirror from '@skidding/react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/lesser-dark.css';

const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'lesser-dark',
};

const Editor = (props) => {

    const handleChange = (editor, data, value) => {
        props.onChange(value);
    }

    return (
        <div className='editorcontainer'>
            <div className='editorheader'>
                {props.username}
            </div>

            <div className={`${props.user === 'challenger' ? 'challenger' : 'player'}`} ><CodeMirror onChange={handleChange} options={options} value={props.value} /></div>

        </div>
    );
}

export default Editor;