import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className='row' style={{ marginTop: '70px' }}>
          <div className='col-lg-8 col-md-12 align-self-center'></div>
          <div className='col-lg-4 d-none d-lg-block'>
            <div style={{ position: 'fixed', width: '20%' }}>
              <div style={{ marginTop: '20px' }}>
                <div
                  className='row d-flex flex-row flex-nowrap'
                  style={{ maxHeight: ' 60px' }}
                >
                  <div
                    className='col-1 d-flex flex-row justify-content-center align-items-center align-items-md-center'
                    style={{
                      padding: ' auto',
                      paddingLeft: ' 42px',
                      paddingRight: ' 19px',
                    }}
                  >
                    <img
                      className='rounded-circle'
                      style={{ height: ' 56px', width: ' 56px' }}
                      src='https://media-exp1.licdn.com/dms/image/C4E0BAQHikN6EXPd23Q/company-logo_200_200/0/1595359131127?e=2159024400&v=beta&t=S5MNjBDjiH433VCWzjPeiopNDhxGwmfcMk4Zf1P_m_s'
                    />
                  </div>
                  <div
                    className='col-8 d-flex flex-column justify-content-center'
                    style={{ paddingLeft: '20px' }}
                  >
                    <p
                      style={{
                        marginBottom: ' 0px',
                        fontSize: ' 14px',
                        fontWeight: ' bold',
                        marginTop: ' 10px',
                      }}
                    >
                      rowanrow
                    </p>
                    <p style={{ marginTop: ' 0px', fontSize: ' 12px' }}>
                      Rowan Row
                    </p>
                  </div>
                  <div className='col-3 d-flex flex-row justify-content-start align-items-center'>
                    <a
                      className='btn'
                      type='button'
                      href='/profile/edit'
                      style={{ background: ' #ffffff', fontSize: ' 16px' }}
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
              {/*  */}
              <div>
                <div style={{ marginTop: '20px' }}>
                  <div
                    className='row d-flex flex-row flex-nowrap'
                    style={{ maxHeight: ' 60px' }}
                  >
                    <div
                      className='col-9 d-flex flex-column justify-content-center'
                      style={{ paddingLeft: '15px' }}
                    >
                      <p
                        style={{
                          marginBottom: ' 0px',
                          fontSize: ' 14px',

                          marginTop: ' 10px',
                        }}
                      >
                        Suggestions for you
                      </p>
                    </div>
                    <div className='col-3 d-flex flex-row justify-content-start align-items-center'>
                      <button
                        className='btn'
                        type='button'
                        style={{
                          background: ' #ffffff',
                          fontSize: ' 14px',
                          marginLeft: '20px',
                        }}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ marginTop: '5px' }}>
                  <div
                    className='row d-flex flex-row flex-nowrap'
                    style={{ maxHeight: ' 60px' }}
                  >
                    <div
                      className='col-1 d-flex flex-row justify-content-center align-items-center align-items-md-center'
                      style={{
                        padding: 'auto',
                        paddingLeft: ' 32px',
                      }}
                    >
                      <img
                        className='rounded-circle'
                        style={{ height: ' 36px', width: ' 36px' }}
                        src='https://media-exp1.licdn.com/dms/image/C4E0BAQHikN6EXPd23Q/company-logo_200_200/0/1595359131127?e=2159024400&v=beta&t=S5MNjBDjiH433VCWzjPeiopNDhxGwmfcMk4Zf1P_m_s'
                      />
                    </div>
                    <div
                      className='col-8 d-flex flex-column justify-content-center'
                      style={{ paddingLeft: '15px' }}
                    >
                      <p
                        style={{
                          marginBottom: ' 0px',
                          fontSize: ' 14px',
                          fontWeight: ' bold',
                          marginTop: ' 10px',
                        }}
                      >
                        rowanrow
                      </p>
                      <p style={{ marginTop: ' 0px', fontSize: ' 12px' }}>
                        Rowan Row
                      </p>
                    </div>
                    <div className='col-3 d-flex flex-row justify-content-start align-items-center'>
                      <button
                        className='btn'
                        type='button'
                        style={{ background: ' #ffffff', fontSize: ' 14px' }}
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
