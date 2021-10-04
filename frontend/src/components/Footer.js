import React from 'react';

const Footer = () => {
  return (
    <>
      <footer
        className='d-flex flex-column justify-content-center'
        style={{
          position: 'relative',
          height: '20vh',
          marginBottom: '0px',
          marginTop: '70px',
          color: 'rgb(142,142,142)',
        }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col d-flex flex-row justify-content-center flex-wrap'>
              <span
                style={{ margin: '0px', marginRight: '10px', fontSize: '12px' }}
              >
                <a href='https://about.instagram.com/'>About</a>
              </span>
              <span
                style={{ margin: '0px', marginRight: '10px', fontSize: '12px' }}
              >
                <a href='https://about.instagram.com/blog/'>Blog</a>
              </span>
              <span
                style={{ margin: '0px', marginRight: '10px', fontSize: '12px' }}
              >
                <a href='https://www.instagram.com/about/jobs/'>Jobs</a>
              </span>
              <span
                style={{ margin: '0px', marginRight: '10px', fontSize: '12px' }}
              >
                <a href='https://help.instagram.com/'>Help</a>
              </span>
              <span
                style={{ margin: '0px', marginRight: '10px', fontSize: '12px' }}
              >
                <a href='https://developers.facebook.com/docs/instagram'>API</a>
              </span>
              <span
                style={{ margin: '0px', marginRight: '10px', fontSize: '12px' }}
              >
                <a href='https://www.instagram.com/legal/privacy/'>Privacy</a>
              </span>
              <span
                style={{
                  margin: ' 0px',
                  marginRight: '10px',
                  fontSize: '12px',
                }}
              >
                <a href='https://www.instagram.com/legal/terms/'>Terms</a>
              </span>
              <span
                style={{
                  margin: ' 0px',
                  marginRight: ' 10px',
                  fontSize: ' 12px',
                }}
              >
                <a href='https://www.instagram.com/directory/hashtags/'>
                  Hashtags
                </a>
              </span>
              <span
                style={{
                  margin: ' 0px',
                  marginRight: ' 10px',
                  fontSize: ' 12px',
                }}
              >
                <a href='https://www.instagram.com/explore/locations/'>
                  Locations
                </a>
              </span>
            </div>
          </div>
          <div className='row'>
            <div
              className='col d-flex justify-content-center flex-wrap'
              style={{ marginTop: ' 10px' }}
            >
              <span
                style={{
                  margin: ' 0px',
                  marginRight: ' 10px',
                  fontSize: ' 12px',
                }}
              >
                English (UK)
              </span>
              <span
                style={{
                  margin: ' 0px',
                  marginRight: ' 10px',
                  fontSize: ' 12px',
                }}
              >
                © 2021 Instagram&#39;s Clone by Rupesh
                <br />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
