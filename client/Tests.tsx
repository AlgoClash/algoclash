import React from 'react';

import CodeMirror from '@skidding/react-codemirror';

const options = {
    lineNumbers: true,
    lineWrapping: true,
    readOnly: true,
    mode: 'javascript',
    theme: 'base16-dark',
};

const Tests = (props) => {
    return (
        <>
            <div className='header'>Tests</div>

            <CodeMirror options={options} value={props.value} />
        </>
    );
}

export default Tests;