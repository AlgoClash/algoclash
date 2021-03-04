import React, { useState } from 'react';

const CreateRoom = (props) => {

    const [createRoomID, setCreateRoomID] = useState('');
    const [joinRoomID, setJoinRoomID] = useState('');

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1rem'}} >

            <h1 style={{fontFamily: 'monospace', fontSize: '16px'}} >Create a New Room</h1>
            <input type='text' value={createRoomID} placeholder='25 Characters Max' onChange={(e) => setCreateRoomID(e.target.value)} maxLength={25} />
            <br/>
            <button onClick={() => props.createRoom(createRoomID)} disabled={createRoomID.length < 3 ? true : false} >New Room</button>

            <br/><br/>

            <h1 style={{fontFamily: 'monospace', fontSize: '16px'}} >Join an Existing Room</h1>
            <input type='text' value={joinRoomID} placeholder='Enter a valid room ID' onChange={(e) => setJoinRoomID(e.target.value)} maxLength={25} />
            <br/>
            <button onClick={() => props.joinRoom(joinRoomID)} disabled={joinRoomID.length < 3 ? true : false} >Join Room</button>

        </div>
    );
}

export default CreateRoom;