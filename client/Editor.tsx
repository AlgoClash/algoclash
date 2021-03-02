import React from 'react';

import CodeMirror from '@skidding/react-codemirror';

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
            </div>

            <div className={`editor ${props.user === 'challenger' ? 'challenger' : 'player'}`} >
                <CodeMirror onChange={handleChange} options={options} value={props.value} />
            </div>

        </div>
    );
}

export default Editor;