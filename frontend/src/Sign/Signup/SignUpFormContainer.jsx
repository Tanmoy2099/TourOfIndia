import React from 'react';

const SignUpFormContainer = ({ children }) => {
  return <>
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage: 'url("https://c0.wallpaperflare.com/preview/210/680/1018/autumn-red-foliage-colors.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        fontSize: '1.3rem'
      }}

    >
      <div className={`mask d-flex align-items-center h-100 `} >
        <div className="container h-100" >
          <div className="row d-flex justify-content-center align-items-center h-100" >
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ backgroundColor: 'white', backdropFilter: 'blur(10px)' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>
                  
                  {children}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default SignUpFormContainer;