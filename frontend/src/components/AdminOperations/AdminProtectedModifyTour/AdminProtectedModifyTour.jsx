import { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../utils/LoadingSpinner';
import AdminUserUpdateLinkBar from '../../AdminProtected/AdminUserUpdateLinkBar';
import HeroSection from '../../mainBody/HeroSection';
const ModifyTour = lazy(() => import('../ModifyTour/ModifyTour'));



const AdminProtectedModifyTour = () => {
    const navigate = useNavigate();
    const { isLoggedIn, data } = useSelector(state => state.user);
    // const { isLoggedIn, data } = user;

    useEffect(() => {
        if (!isLoggedIn || data?.role !== "admin") navigate('/');
    }, [isLoggedIn, data?.role, navigate]);






    return <>
        <HeroSection />
        <AdminUserUpdateLinkBar />

        <Suspense
            fallback={<div className='centered'><LoadingSpinner /></div>}>
            <ModifyTour />
        </Suspense>

    </>
}

export default AdminProtectedModifyTour;