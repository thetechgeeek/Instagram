import React, { useState } from 'react';
import Footer from '../components/Footer';
import { Link, useHistory } from 'react-router-dom';

const LoginScreen = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      console.log('Invalid Email.');
      return;
    }
    fetch('/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className='container d-flex flex-row justify-content-center'
        style={{ marginTop: ' 40px' }}
      >
        <div>
          <img
            className='d-none d-md-block'
            src='https://i.ibb.co/5rWN32Q/welcome.png'
            style={{ height: ' 618px', marginRight: ' 29px' }}
          />
        </div>
        <div style={{ marginTop: ' 30px' }}>
          <form
            style={{
              textAlign: ' center',
              border: ' 1px solid rgb(219,219,219)',
              borderBottomStyle: ' solid',
              background: ' #ffffff',
              padding: ' 15px',
              width: ' 350px',
              height: ' 377.8px',
            }}
          >
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
              style={{
                width: ' 175px',
                marginTop: ' 5px',
                marginBottom: ' 30px',
              }}
            />

            <input
              type='text'
              className='shadow-none form-control'
              style={{
                borderStyle: ' solid',
                borderColor: ' rgb(219,219,219)',
                background: ' rgb(249,249,249)',
                color: ' rgb(142,142,142)',
                fontSize: ' 12px',
                margin: ' auto',
                marginTop: ' 10px',
                width: ' 258px',
              }}
              placeholder='Phone number, username or email address'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type='password'
              className='shadow-none form-control'
              style={{
                color: ' rgb(142,142,142)',
                background: ' rgb(250,250,250)',
                borderStyle: ' solid',
                borderColor: ' rgb(219,219,219)',
                fontSize: ' 12px',
                margin: ' auto',
                marginTop: ' 5px',
                width: ' 258px',
              }}
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className='btn btn-primary shadow-none'
              type='button'
              style={{
                marginTop: ' 10px',
                width: ' 258px',
                background: ' #0095f6',
                height: ' 29.6px',
                paddingTop: ' 0px',
                fontSize: ' 13px',
              }}
              onClick={() => PostData()}
            >
              Log In
            </button>
            <div
              style={{
                color: ' rgb(142,142,142)',
                fontSize: ' 13px',
                margin: ' auto',
                marginTop: ' 15px',
                width: ' 258px',
              }}
            >
              <span style={{ marginRight: ' 5px' }}>------------------</span>
              <span style={{ marginRight: ' 5px' }}>OR</span>
              <span style={{ marginLeft: ' 5px' }}>
                -------------------
                <br />
              </span>
            </div>
            <button
              className='btn'
              type='button'
              style={{
                marginTop: ' 15px',
                width: ' 258px',
                background: ' #ffffff',
                height: ' 29.6px',
                paddingTop: ' 0px',
                color: ' #385185',
                borderTopStyle: ' none',
                fontSize: ' 14px',
                fontWeight: ' bold',
              }}
            >
              Log in with Facebook
            </button>
            <div
              style={{
                fontSize: ' 12px',
                marginTop: ' 5px',
                marginBottom: ' 0px',
              }}
            >
              <span>Forgotten your Password?</span>
            </div>
          </form>
          <form
            style={{
              textAlign: ' center',
              border: ' 1px solid rgb(219,219,219)',
              borderBottomStyle: ' solid',
              background: ' #ffffff',
              padding: ' 15px',
              width: ' 350px',
              height: ' 62.6px',
              marginTop: ' 10px',
            }}
          >
            <div
              style={{
                fontSize: ' 14px',
                marginTop: ' 5px',
                marginBottom: ' 0px',
              }}
            >
              <span>Don't have an account?</span>
              <span style={{ marginLeft: ' 5px' }}>
                <Link
                  to={`/register`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
          <form
            style={{
              textAlign: ' center',
              background: ' rgb(250,250,250)',
              padding: ' 7px',
              width: ' 350px',
              height: ' 100.8px',
              marginTop: ' 10px',
              border: ' 0px none rgb(219,219,219) ',
              borderTopStyle: ' none',
              borderBottomStyle: ' none',
            }}
          >
            <div
              style={{
                fontSize: ' 14px',
                marginTop: ' 5px',
                marginBottom: ' 0px',
              }}
            >
              <p>Get the app.</p>
              <span>
                <img
                  src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png'
                  style={{ width: ' 136px' }}
                />
              </span>
              <span style={{ marginLeft: ' 5px' }}>
                <img
                  src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png'
                  style={{ width: ' 136px' }}
                />
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginScreen;
