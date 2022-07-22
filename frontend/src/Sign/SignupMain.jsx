import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingSpinner from '../utils/LoadingSpinner';

const Name = lazy(() => import('./Signup/Name'));
const Email = lazy(() => import('./Signup/Email'));
const Terms = lazy(() => import('./Signup/Terms'));
const Password = lazy(() => import('./Signup/Password'));
const SignupButton = lazy(() => import('./Signup/SignupButton'));
const IfNotSignedUp = lazy(() => import('./Signup/IfNotSignedUp'));
const SignUpFormContainer = lazy(() => import('./Signup/SignUpFormContainer'));


const Signup = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.user);

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) navigate(-1)
    }, 1000);

    return () => {
      clearTimeout();
    };
  }, [isLoggedIn]);


  return <>
    <Suspense
      fallback={<div className='centered'><LoadingSpinner /></div>}>
      <SignUpFormContainer>
        {isLoggedIn ? <>
          <h3 className='text-align-center m-auto'>Registration successful !</h3>
        </> :
        <form >
          <Name />
          <Email />
          <Password />
          <Terms />
          <SignupButton />
          <IfNotSignedUp />
        </form>
        }
      </SignUpFormContainer>
    </Suspense>
  </>
};

export default Signup;
