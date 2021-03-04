import React from 'react';

import CodeMirror from '@skidding/react-codemirror';

const Console = (props) => {

    const options = {
        lineNumbers: false,
        lineWrapping: true,
        readOnly: true,
        mode: 'language',
        theme: 'colorforth',
    };

    return (
        <div className='console container'>
            <div className='header'>Console</div>
            <CodeMirror options={options} value={props.value} />
        </div>
    );
}

export default Console;