import React from 'react'

const ChangePassContainer = ({children, heading}) => {
    return <div className="row d-flex justify-content-center align-items-center" style={{ height: `100%` }} >
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" >
                <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                        
                        {heading}
                    </h2>

                    {children}

                </div>
            </div>
        </div>
    </div>
}

export default ChangePassContainer;