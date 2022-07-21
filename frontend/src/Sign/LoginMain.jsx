import React, { lazy, Suspense, useEffect } from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Email = lazy(() => import('./Login/Email'));
const Password = lazy(() => import('./Login/Password'));
const IfNotSignIn = lazy(() => import('./Login/IfNotSignIn'));
const SignInButton = lazy(() => import('./Login/SignInButton'));
const SignInFormContainer = lazy(() => import('./Login/SignInFormContainer'));


const LoginMain = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.user);

useEffect(() => {
  setTimeout(() => {
    if (isLoggedIn) navigate('/')
  }, 1000);

  return () => {
    clearTimeout();
  };
}, [isLoggedIn]);


  return <>
    <Suspense fallback={
      <div className='centered'><LoadingSpinner /></div>}>
      <SignInFormContainer>
        {isLoggedIn ? <>
          <h3 className='text-align-center m-auto'>Successfully logged in !</h3>
        </> :
          <form >
            <Email />
            <Password />
            <SignInButton />
            <IfNotSignIn />
          </form>
        }
      </SignInFormContainer>
      
    </Suspense>
  </>

}

export default LoginMain;
