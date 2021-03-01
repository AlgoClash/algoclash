import React from 'react';

import CodeMirror from '@skidding/react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/lesser-dark.css';

const options = {
    lineNumbers: false,
    readOnly: true,
    mode: 'javascript',
    theme: 'lesser-dark',
};

const Console = (props) => {
    return (
        <CodeMirror options={options} value={props.value} />
    );
}

export default Console;