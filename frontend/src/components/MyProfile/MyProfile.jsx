import { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './MyProfile.module.css';
import ProfileContainer from './ProfileContainer';

import profileImg from '../../assets/user/default.jpg';

const MyProfile = () => {
  const { data, actualPhoto } = useSelector(state => state.user);
  const [show, setShow] = useState(false);


  return <>
    <ProfileContainer show={show}>
      
      <div className="card">
        <div
          className={`rounded-top text-white d-flex flex-row ${classes.MainImage}`}
        >
          <div
            className="ms-4 mt-5 d-flex flex-column"
            style={{ width: 150 }}
          >
            {/* Profile image */}
            <img
              src={actualPhoto || profileImg}
              alt="profile image"
              className="img-fluid img-thumbnail mt-4 mb-2"
              style={{ width: 150, zIndex: 1 }}
              draggable='false'
            />
            <button
              type="button"
              className="btn btn-success mt-2 fs-4"
              data-mdb-ripple-color="dark"
              style={{ zIndex: 1 }}
              onClick={() => setShow(bool => !bool)}
            >
              Edit profile
            </button>
          </div>
          <div className={`ms-4 ${classes.profileInfo}`}>
            <p>{data?.name}</p>
            <p>{data?.email}</p>
            <p>{data?.role}</p>
          </div>
        </div>
        <div
          className="p-4 text-black"
          style={{ backgroundColor: "#f8f9fa" }}
        >

        </div>
      </div>
    </ProfileContainer>

  </>
}

export default MyProfile;