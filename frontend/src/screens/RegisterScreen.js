import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  return (
    <>
      <div
        className='container d-flex flex-row justify-content-center'
        style={{ marginTop: ' 40px', marginBottom: ' 40px' }}
      >
        <div style={{ marginTop: ' 30px' }}>
          <form
            style={{
              textAlign: ' center',
              border: ' 1px solid rgb(219,219,219)',
              borderBottomStyle: ' solid',
              background: ' #ffffff',
              padding: ' 15px',
              width: ' 350px',
              height: ' auto',
            }}
          >
            <img
              alt=''
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
              style={{
                width: ' 175px',
                marginTop: ' 5px',
                marginBottom: ' 10px',
              }}
            />
            <div>
              <p style={{ width: ' 258px', margin: ' auto' }}>
                Sign up to see photos and videos from your friends
              </p>
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
              placeholder='Mobile Number or email address'
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
                marginTop: ' 5px',
                width: ' 258px',
              }}
              placeholder='Full name'
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
                marginTop: ' 5px',
                width: ' 258px',
              }}
              placeholder='Username'
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
            >
              Log In
            </button>
            <div
              style={{
                fontSize: ' 12px',
                marginTop: ' 20px',
                marginBottom: ' 0px',
              }}
            >
              <span>
                By signing up, you agree to our Terms, Data Policy and Cookie
                Policy
              </span>
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
              <span>Have an account?</span>
              <span style={{ marginLeft: ' 5px' }}>
                <Link
                  to={`/login`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Login
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
                  alt=''
                  src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png'
                  style={{ width: ' 136px' }}
                />
              </span>
              <span style={{ marginLeft: ' 5px' }}>
                <img
                  alt=''
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

export default RegisterScreen;
