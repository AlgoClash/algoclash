import React from 'react';

import CodeMirror from '@skidding/react-codemirror';

const options = {
    lineNumbers: false,
    lineWrapping: true,
    readOnly: true,
    mode: 'javascript',
    theme: 'colorforth',
};

const Console = (props) => {
    return (
        <>
            <div className='header'>Console</div>

            <CodeMirror options={options} value={props.value} />
        </>
    );
}

export default Console;