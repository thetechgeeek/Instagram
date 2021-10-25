import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../App';
import Loader from '../components/loader';
import Toast from 'react-bootstrap/Toast';

const EditProfileScreen = () => {
  const { state, dispatch } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [tempData, setTempData] = useState('');
  const [name, setName] = useState(state ? state.name : '');
  const [username, setUsername] = useState(state ? state.username : '');
  const [bio, setBio] = useState(state ? state.bio : '');
  const [image, setImage] = useState('');
  const [submission, setSubmission] = useState(false);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'instagram');
      data.append('cloud_name', 'thetechgeeek');
      fetch('	https://api.cloudinary.com/v1_1/thetechgeeek/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch('/updateprofilepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              image: data.url,
              bio: bio,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  ...state,
                  image: result.image,
                  bio: result.bio,
                })
              );
              dispatch({
                type: 'UPDATE_PROFILE_PIC',
                payload: result.image,
              });
              setTempData('Profile Picture Updated');
              setShow(true);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (submission) {
      fetch('/updateprofile', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          bio: bio,
          name: name,
          username: username,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...state,
              bio: result.bio,
              name: result.name,
              username: result.username,
            })
          );
          dispatch({
            type: 'UPDATE_PROFILE',
            payload: {
              bio: result.bio,
              name: result.name,
              username: result.username,
            },
          });
          setTempData('Successfully Updated');
          setShow(true);
          setSubmission(false);
        })
        .catch((err) => {
          setTempData(err);
          setShow(true);
          console.log(err);
        });
    }
  }, [image, state, dispatch, submission]);
  const updateProfilePic = (file) => {
    setImage(file);
  };
  return (
    <>
      <Header />
      {state ? (
        <div className='container'>
          {/* {setName(state.name) && setUsername(state.username)} */}
          <div
            className='d-flex align-items-start flex-wrap flex-md-nowrap'
            style={{
              border: ' 1px solid rgb(219,219,219)',
              maxWidth: '932px',
              margin: '80px auto',
              backgroundColor: 'white',
            }}
          >
            <div
              className='nav flex-column nav-pills me-3'
              id='v-pills-tab'
              role='tablist'
              aria-orientation='vertical'
            >
              <button
                className='nav-link active'
                id='v-pills-editprofile-tab'
                data-bs-toggle='pill'
                data-bs-target='#v-pills-editprofile'
                type='button'
                role='tab'
                aria-controls='v-pills-editprofile'
                aria-selected='true'
                style={{
                  padding: '15px',
                  paddingLeft: '30px',
                  paddingRight: '30px',
                  width: '236px',
                }}
              >
                Edit Profile
              </button>
              <button
                className='nav-link'
                id='v-pills-changepassword-tab'
                data-bs-toggle='pill'
                data-bs-target='#v-pills-changepassword'
                type='button'
                role='tab'
                aria-controls='v-pills-changepassword'
                aria-selected='false'
                style={{
                  padding: '15px',
                  paddingLeft: '30px',
                  paddingRight: '30px',
                }}
              >
                Change Password
              </button>
              {/* <button
              className='nav-link'
              id='v-pills-messages-tab'
              data-bs-toggle='pill'
              data-bs-target='#v-pills-messages'
              type='button'
              role='tab'
              aria-controls='v-pills-messages'
              aria-selected='false'
              style={{
                padding: '15px',
                paddingLeft: '30px',
                paddingRight: '30px',
              }}
            >
              Messages
            </button>
            <button
              className='nav-link'
              id='v-pills-settings-tab'
              data-bs-toggle='pill'
              data-bs-target='#v-pills-settings'
              type='button'
              role='tab'
              aria-controls='v-pills-settings'
              aria-selected='false'
              style={{
                padding: '15px',
                paddingLeft: '30px',
                paddingRight: '30px',
              }}
            >
              Settings
            </button> */}
            </div>
            <div
              className='tab-content'
              id='v-pills-tabContent'
              style={{
                padding: '1.5rem',
                // borderTop: '1px solid rgb(219,219,219)',
                width: '100%',
              }}
            >
              <div
                className='tab-pane fade show active'
                id='v-pills-editprofile'
                role='tabpanel'
                aria-labelledby='v-pills-editprofile-tab'
              >
                <div>
                  <div
                    className='form-group row'
                    style={{ marginBottom: '15px' }}
                  >
                    <label htmlFor='photo' className='col-sm-2 col-form-label'>
                      Photo
                    </label>
                    <div className='col-sm-10'>
                      <input
                        autoComplete='off'
                        type='file'
                        className='shadow-none form-control'
                        id='photo'
                        onChange={(e) => updateProfilePic(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div
                    className='form-group row'
                    style={{ marginBottom: '15px' }}
                  >
                    <label htmlFor='name' className='col-sm-2 col-form-label'>
                      Name
                    </label>
                    <div className='col-sm-10'>
                      <input
                        autoComplete='off'
                        type='text'
                        className='shadow-none form-control'
                        id='name'
                        value={name}
                        placeholder='Enter name'
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className='form-text'>
                        Help people discover your account by using the name that
                        you're known by: either your full name, nickname or
                        business name. <br />
                        You can only change your name twice within 14 days.
                      </div>
                    </div>
                  </div>
                  <div
                    className='form-group row'
                    style={{ marginBottom: '15px' }}
                  >
                    <label
                      htmlFor='username'
                      className='col-sm-2 col-form-label'
                    >
                      Username
                    </label>
                    <div className='col-sm-10'>
                      <input
                        autoComplete='off'
                        type='text'
                        className='shadow-none form-control'
                        id='username'
                        placeholder='Enter Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <div className='form-text'>
                        In most cases, you'll be able to change your username
                        back to original for another 14 days.
                      </div>
                    </div>
                  </div>

                  <div
                    className='form-group row'
                    style={{ marginBottom: '15px' }}
                  >
                    <label htmlFor='bio' className='col-sm-2 col-form-label'>
                      Bio
                    </label>
                    <div className='col-sm-10'>
                      <input
                        autoComplete='off'
                        type='textarea'
                        className='shadow-none form-control'
                        id='bio'
                        value={bio}
                        placeholder='Enter Bio'
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <div className='form-text'>
                        Personal information Provide your personal information,
                        even if the account is used for a business, pet or
                        something else. This won't be part of your public
                        profile.
                      </div>
                    </div>
                  </div>
                  <div
                    className='form-group row'
                    style={{ marginBottom: '15px' }}
                  >
                    <label htmlFor='email' className='col-sm-2 col-form-label'>
                      Email
                    </label>
                    <div className='col-sm-10'>
                      <input
                        autoComplete='off'
                        type='email'
                        className='shadow-none form-control'
                        id='email'
                        placeholder='Enter Email'
                      />
                    </div>
                  </div>

                  <button
                    className='btn-sm btn-primary shadow-none py-1'
                    onClick={() => setSubmission(true)}
                  >
                    Submit
                  </button>
                  <Toast
                    style={{
                      fontSize: '0.7rem',
                      width: '258px',
                      zIndex: '100',
                      position: 'absolute',
                      marginTop: '10px',
                    }}
                    bg='success'
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    position='top-center'
                    autohide
                  >
                    <Toast.Header>
                      <strong className='me-auto'>{tempData}</strong>
                    </Toast.Header>
                  </Toast>
                </div>
              </div>
              <div
                className='tab-pane fade'
                id='v-pills-changepassword'
                role='tabpanel'
                aria-labelledby='v-pills-changepassword-tab'
              >
                <div>
                  <div
                    className='form-group row'
                    style={{ marginBottom: '15px', fontSize: '16px' }}
                  >
                    <label
                      htmlFor='oldpassword'
                      className='col-sm-2 col-form-label'
                    >
                      Old Password
                    </label>
                    <div className='col-sm-10'>
                      <input
                        autoComplete='off'
                        type='password'
                        className='shadow-none form-control'
                        id='oldpassword'
                        placeholder='Enter Old Password'
                      />
                    </div>
                  </div>
                  <form>
                    <div
                      className='form-group row'
                      style={{ marginBottom: '15px' }}
                    >
                      <label
                        htmlFor='newpassword'
                        className='col-sm-2 col-form-label'
                      >
                        New Password
                      </label>
                      <div className='col-sm-10'>
                        <input
                          autoComplete='off'
                          type='password'
                          className='shadow-none form-control'
                          id='newpassword'
                          placeholder='Enter New Password'
                        />
                      </div>
                    </div>
                    <div
                      className='form-group row'
                      style={{ marginBottom: '15px' }}
                    >
                      <label
                        htmlFor='confirmpassword'
                        className='col-sm-2 col-form-label'
                      >
                        Confirm Password
                      </label>
                      <div className='col-sm-10'>
                        <input
                          autoComplete='off'
                          type='password'
                          className='shadow-none form-control'
                          id='confirmpassword'
                          placeholder='Confirm Password'
                        />
                      </div>
                    </div>
                    <button className='btn-sm btn-primary shadow-none py-1'>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <div
                className='tab-pane fade'
                id='v-pills-messages'
                role='tabpanel'
                aria-labelledby='v-pills-messages-tab'
              >
                Messages Tab. <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
              <div
                className='tab-pane fade'
                id='v-pills-settings'
                role='tabpanel'
                aria-labelledby='v-pills-settings-tab'
              >
                Settings Tab. <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '5rem' }}>
          <Loader />
        </div>
      )}

      <Footer />
    </>
  );
};

export default EditProfileScreen;
