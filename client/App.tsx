import React, { useState, useEffect } from 'react';

import Editor from './Editor';
import Console from './Console';

import '../public/styles/global.scss';

const App = () => {

    const [id, setID] = useState<string>('');

    const [playerCode, setPlayerCode] = useState<string>('');
    const [challengerCode, setChallengerCode] = useState<string>('');

    useEffect(() => {
        //Grab socket information
        setID('benji');
    }, []);

    return (
        <>

            <div id='questioncontainer'>
                This is a question!
            </div>

            <div id='editors'>
                <Editor user='player' username={id} lanuage='js' value={playerCode} onChange={setPlayerCode} />
                <Editor user='challenger' username={'challenger'} lanuage='js' value={challengerCode} onChange={setChallengerCode} />
            </div>

            
            <div id='testcontainer'>
                These are our tests!
            </div>

            <div id='consolecontainer'><Console /></div>
{/* 
            <div id='terminal'>
                <iframe
                title='output'
                sandbox='allow-scripts'
                frameBorder='0'
                width='100%'
                height='100%'
                />
            </div> */}
        </>
    );
}

export default App;