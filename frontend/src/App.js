
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TourProtected from './components/Book Tour Protected/TourProtected';
import ErrorPage from './components/ErrorPage404/ErrorPage';
import LoggedInProtected from './components/LoggedInProtected/LoggedInProtected';

// import NavBar from './components/navBar/NavBar';
import LoadingSpinner from './utils/LoadingSpinner';

const Login = lazy(() => import('./Sign/LoginMain'));
const Signup = lazy(() => import('./Sign/SignupMain'));
const Tours = lazy(() => import('./components/Tours/Tours'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Places = lazy(() => import('./components/Places/Places'));
const NavBar = lazy(() => import('./components/navBar/NavBar'));
const AllTours = lazy(() => import('./components/AllTours/AllTours'));
const MainBody = lazy(() => import('./components/mainBody/MainBody'));
const ScrollToTop = lazy(() => import('./utils/ScrollToTop/ScrollToTop'));
const AdminProtected = lazy(() => import('./components/AdminProtected/AdminProtected'));
const ProfileProtected = lazy(() => import('./components/ProtectedRoute/ProfileProtected'));
const AdminProtectedModifyTour = lazy(() => import('./components/AdminOperations/AdminProtectedModifyTour/AdminProtectedModifyTour'));


const App = () => {


  return <>
    <Suspense fallback={ <div className='centered'><LoadingSpinner /></div> }>
      <NavBar />
      <ScrollToTop />

      <Routes>

        <Route path='/' element={ <Navigate to='/home' /> } />
        <Route path='/home' element={ <><MainBody /></> } />
        <Route path='/admin-access' element={ <AdminProtected /> } />
        <Route path='/admin-access/:tourId' element={ <AdminProtectedModifyTour /> } />
        <Route path='forgot-password' element={ <LoggedInProtected /> } />
        <Route path='/:Id/tour' element={ <><Tours /></> } />
        <Route path='/:Id/tour/:tourId' element={ <><Places /></> } />
        <Route path='/book-tour/:tourId' element={ <TourProtected /> } />
        <Route path='/my-profile' element={ <ProfileProtected /> } />
        <Route path='/all-tours' element={ <><AllTours /></> } />
        <Route path='/signup' element={ <><Signup /></> } />
        <Route path='/login' element={ <><Login /></> } />
        <Route path='/*' element={ <><ErrorPage /></> } />

      </Routes>
      <Footer />
    </Suspense>

  </>
};

export default App;

