import React, { useState } from 'react';

const CreateRoom = (props) => {

    const [createRoomID, setCreateRoomID] = useState('');
    const [joinRoomID, setJoinRoomID] = useState('');

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1rem'}} >

            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Create New Room</h1>
            <input type='text' value={createRoomID} onChange={(e) => setCreateRoomID(e.target.value)}/>
            <button onClick={() => props.createRoom(createRoomID)} type="button">Confirm</button>

            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Join Room</h1>
            <input type='text' value={joinRoomID} onChange={(e) => setJoinRoomID(e.target.value)}/>
            <button onClick={() => props.joinRoom(joinRoomID)} type="button">Confirm</button>

        </div>
    );
}

export default CreateRoom;