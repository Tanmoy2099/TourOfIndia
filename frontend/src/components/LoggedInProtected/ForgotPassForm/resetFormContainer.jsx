import React from 'react';
import classes from "./resetFormContainer.module.css";


const ResetFormContainer = ({ children }) => {
  return <>
    <section
      className={` bg-image ${classes.container}`}
    >
      <div className={`mask d-flex align-items-center h-100 `} >
        <div className="container h-100" >
          <div className="row d-flex justify-content-center align-items-center " style={{height:`100%`}} >
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" >
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    RESET PASSWORD FORM
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

export default ResetFormContainer;