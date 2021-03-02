import React from 'react';

const Navbar = (props) => {

    const createSignInModal = () => {
        props.createModal('Login/Sign Up', (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Username</h1>
            <input type='text' />

            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Password</h1>
            <input type='text' />

            <button>Confirm</button>
        </div>));
    }

    return (
        <div id='navbar'>
            <a href="/">Algo Clash</a>
            <a onClick={createSignInModal} >Login/Sign Up</a>
        </div>
    );
}

export default Navbar;