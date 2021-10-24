import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from 'react-bootstrap/Toast';

const CreatePostScreen = () => {
  const history = useHistory();
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(undefined);
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);
  const [tempData, setTempData] = useState('');

  useEffect(() => {
    if (url) {
      fetch('/createpost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          location,
          caption,
          image: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            setTempData(data.error);
            setShow(true);
          } else {
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url, caption, history, location]);
  const postDetail = () => {
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <div
        className='container mx-auto'
        style={{
          maxWidth: '932px',
          border: '1px solid rgb(219,219,219)',
          backgroundColor: 'white',
          padding: '2rem',
          marginTop: '70px',
        }}
      >
        <h2
          className='text-center'
          style={{ fontWeight: '200', marginTop: '15px', marginBottom: '50px' }}
        >
          Create Post
        </h2>{' '}
        <Toast
          style={{
            fontSize: '0.7rem',
            width: '258px',
            zIndex: '100',
            position: 'absolute',
            marginTop: '65px',
            marginLeft: '30px',
          }}
          bg='danger'
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
        <div className='form-group row' style={{ marginBottom: '15px' }}>
          <label htmlFor='photo' className='col-sm-2 col-form-label'>
            Upload a picture for your post
          </label>
          <div className='col-sm-10'>
            <input
              type='file'
              className='shadow-none form-control'
              id='photo'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className='form-group row' style={{ marginBottom: '15px' }}>
          <label htmlFor='caption' className='col-sm-2 col-form-label'>
            Enter a Caption
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='shadow-none form-control'
              id='caption'
              placeholder='Enter Caption'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>
        <div className='form-group row' style={{ marginBottom: '15px' }}>
          <label htmlFor='location' className='col-sm-2 col-form-label'>
            Location
          </label>
          <div className=' col-sm-10'>
            <input
              type='text'
              className='shadow-none form-control'
              id='location'
              placeholder='Enter location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <button
          className='btn btn-primary shadow-none py-0 mx-auto'
          style={{ marginTop: '10px' }}
          onClick={() => postDetail()}
        >
          Submit
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CreatePostScreen;
