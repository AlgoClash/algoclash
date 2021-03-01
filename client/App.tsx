import React, { useState, useEffect } from 'react';

import Editor from './Editor';

import '../public/styles.scss';

const App = () => {

    const [id, setID] = useState<string>('');
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        //Grab socket information
        setID('benji');
    }, []);

    return (
        <>

            <h1>Algo Clash!!!</h1>

            <div id='pane'>
                <Editor username={id} lanuage='js' value={code} onChange={setCode} />
            </div>

            <iframe
            title='output'
            sandbox='allow-scripts'
            frameBorder='0'
            width='100%'
            height='100%'
            />
        </>
    );
}

export default App;