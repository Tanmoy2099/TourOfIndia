import { useEffect } from 'react';

import classes from "./NavBar.module.css";
import { NavLink, Link } from 'react-router-dom';

import { useFetch } from '../../custom-hooks/states-hook';
import { useFetchUser } from '../../custom-hooks/User-hook';
import { useSelector } from 'react-redux';
import { useLogout } from '../../custom-hooks/logout-hook';

import { useDispatch } from 'react-redux';
import { userActions } from '../../Store/user-slice';

import ErrorModal from '../../utils/ErrorModal';

const NavBar = () => {
  const { error, clearError, fetchStates } = useFetch();
  const { fetchUsers, fetchImg } = useFetchUser();
  const { isLoggedIn, data } = useSelector(state => state.user)
  const loggedOut = useLogout();
  const dispatch = useDispatch();

  const firstName = data?.name.split(' ')[0]

  useEffect(() => {
    fetchStates();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchImg()
  }, [isLoggedIn, data?.photo]);


  const logMeOut = () => {
    loggedOut();
    dispatch(userActions.resetUser());
  };

  return <>
    <ErrorModal error={error} onClear={clearError} />
    <div className={classes.mainNav}>
      <div className={classes.container}>
        <Link to='/' style={{ textDecoration: "none", margin: 'auto 0', textShadow: '5px 5px 5px black' }}>
          <h2 className='d-flex align-items-center m-auto py-3 px-2 text-light '
            style={{ color: '#3312c2' }}
          >TourIndia</h2>
        </Link>

        <div className={`d-flex align-items-center m-0 p-3 `}>

          {isLoggedIn ? <>

            {/* <!-- Drop down --> */}
            <div className="btn-group my-auto">
              <button type="button" className="btn btn-outline-light dropdown-toggle btn-lg" data-bs-toggle="dropdown" aria-expanded="false">
                Hi! {' ' + firstName}
              </button>
              <div className="dropdown-menu">
                <NavLink to='/my-profile'
                  className={({ isActive }) => ` d-flex align-items-center justify-content-center ${classes.navLink} ${isActive ? classes.active : ""}`} >
                  Profile
                </NavLink>

                {
                  data?.role === 'admin' && <>
                    <div className="dropdown-divider" />

                    <Link to='/admin-access' className={` d-flex align-items-center justify-content-center ${classes.navLink}`}
                    >Admin
                    </Link>
                  </>
                }

                <div className="dropdown-divider" />

                <h2 className={` d-flex align-items-center justify-content-center ${classes.navLink}`}
                  onClick={logMeOut}
                >Logout
                </h2>
              </div>
            </div>


            {/* <NavLink to='/my-profile'
            className={({ isActive }) => ` d-flex align-items-center my-0 py-3 px-2 text-light ${classes.navLink} ${isActive ? classes.active : ""}`} >
            <p>Hi! {' ' + firstName}</p>
          </NavLink> */}
          </> : <>
            <NavLink to="/login"
              className={({ isActive }) => ` align-items-center my-0 py-3 px-2 text-light ${classes.navLink} ${isActive ? classes.active : ""}`}>
              Login
            </NavLink>

            <NavLink to="/signup"
              className={({ isActive }) => ` align-items-center my-0 py-3 px-2 text-light ${classes.navLink} ${isActive ? classes.active : ""}`}>
              Signup
            </NavLink>
          </>
          }
        </div>
      </div>
    </div>
  </>
}

export default NavBar;
