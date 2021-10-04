import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreatePostScreen = () => {
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
        </h2>
        <div className='form-group row' style={{ marginBottom: '15px' }}>
          <label htmlFor='photo' className='col-sm-2 col-form-label'>
            Upload a picture for your post
          </label>
          <div className='col-sm-10'>
            <input
              type='file'
              className='shadow-none form-control'
              id='photo'
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
            />
          </div>
        </div>
        <div className='form-group row' style={{ marginBottom: '15px' }}>
          <label htmlFor='location' className='col-sm-2 col-form-label'>
            Location
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='shadow-none form-control'
              id='location'
              placeholder='Enter location'
            />
          </div>
        </div>
        <button
          className='btn btn-primary shadow-none py-0 mx-auto'
          style={{ marginTop: '10px' }}
        >
          Submit
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CreatePostScreen;
