import { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../utils/LoadingSpinner';

import HeroSection from '../mainBody/HeroSection';
import AdminLinkBar from './AdminLinkBar';

const AdminAllUsers = lazy(() => import('../AdminOperations/AdminAllUsers/AdminAllUsers'));
const AdminAllTours = lazy(() => import('../AdminOperations/AdminAllTours/AdminAllTours'));

const AdminProtected = () => {
  const [currentSection, setCurrentSection] = useState(<AdminAllTours />);
  const navigate = useNavigate();
  const { isLoggedIn, data } = useSelector(state => state.user);
  // const { isLoggedIn, data } = user;

  useEffect(() => {
    if (!isLoggedIn || data?.role !== "admin") navigate('/');
  }, [isLoggedIn, data?.role, navigate]);


  return <>
    <HeroSection />

    <AdminLinkBar />

    <div className='container d-flex justify-content-center my-4'>
      <button className='btn btn-outline-success btn-lg mx-2'
        onClick={() => setCurrentSection(<AdminAllUsers />)}
      >User Section
      </button>

      <button className='btn btn-outline-success btn-lg'
        onClick={() => setCurrentSection(<AdminAllTours />)}
      >Tour Section
      </button>
    </div>

    <Suspense
      fallback={<div className='centered'><LoadingSpinner /></div>}>    {currentSection}
    </Suspense>

  </>
}

export default AdminProtected;