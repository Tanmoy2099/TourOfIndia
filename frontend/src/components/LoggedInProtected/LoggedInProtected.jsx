import {useEffect} from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ForgotPassForm from './ForgotPassForm/ForgotPassForm';

const LoggedInProtected = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.user)
  useEffect(() => {
    if (isLoggedIn) navigate('/');

  }, [isLoggedIn]);



  return <>
    <ForgotPassForm />
  </>
}

export default LoggedInProtected;