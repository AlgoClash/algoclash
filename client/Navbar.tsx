import React, {useState} from 'react';
import {GoogleLogin} from 'react-google-login'
import GitHubLogin from 'react-github-login';

import {refreshTokenSetup} from '../utils/refreshToken'
import {clientIdGoogle} from '../utils/googleAuth'
import {githubClientId, githubRedirectURL} from '../utils/githubAuth'

const googleClientID = clientIdGoogle

const ghClientId = githubClientId
const redirectURL = githubRedirectURL

const Navbar = (props) => {
    let username;
    let password;

    const usernameInput = (e) => {username = e.target.value}
    const passwordInput = (e) => {password = e.target.value}

    const submitButton = (e) => {
        e.preventDefault()
        const body = {username, password}

        fetch('/user/signup', { method: 'POST', headers: { 'Content-Type': 'Application/JSON' }, body: JSON.stringify(body) })
        .then(res => {
            if (res.status === 200) console.log('POSTED --------------', res.json())})
    }

    const onSuccessGoogle = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        refreshTokenSetup(res)
    }

    const onFailureGoogle = (res) => {
        console.log('[Login failed] res:', res);
    }

    const onSuccessGithub = (res) => {
        console.log('[Login Success] currentUser:', res);
    }
    
    const onFailureGithub = (res) => {
        console.log('[Login failed] res:', res);
    }

    const createSignInModal = () => {
        props.createModal('Login/Sign Up', (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}} >Username</h1>
            <input type='text' onChange={usernameInput}/>

            <h1 style={{fontFamily: 'monospace', fontSize: '16px', color: 'white'}}>Password</h1>
            <input type='text' onChange={passwordInput} />
            <button onClick={submitButton} type="button">Confirm</button>

            <GoogleLogin 
                clientId={googleClientID}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                onSuccess={onSuccessGoogle}
                onFailure={onFailureGoogle}
            />

            <GitHubLogin 
                clientId= {ghClientId}
                onSuccess={onSuccessGithub}
                onFailure={onFailureGithub}
                redirectUri={redirectURL}
            />
        </div>));
    }

    return (
        <div id='navbar'>
            <a href="/">Algo Clash</a>

            <div style={{display: 'flex'}} >
                <button onClick={() => props.createRoom('testroom')}>CREATE ROOM</button>
                <button onClick={props.joinRoom}>JOIN ROOM</button>
            </div>

            <div>
                <a onClick={createSignInModal} >Login/Sign Up</a>
                <a>{`≡`}</a>
            </div>
        </div>
    );
}

export default Navbar;