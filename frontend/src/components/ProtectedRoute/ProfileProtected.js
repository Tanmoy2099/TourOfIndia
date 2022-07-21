import React, { useEffect } from 'react'

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyProfile from '../MyProfile/MyProfile';

const ProfileProtected = () => {
  const { isLoggedIn } = useSelector(state => state.user);
const Navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) Navigate('/login')
  }, [isLoggedIn]);


  return <>
    <MyProfile />
  </>
}

export default ProfileProtected;