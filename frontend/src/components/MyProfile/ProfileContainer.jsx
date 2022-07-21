
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import classes from './MyProfile.module.css';

const ProfileContainer = ({ children, show }) => {
  return <>
    <section className={` ${classes.mainSection}`}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 my-4 mt-5">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to='/home' className='text-decoration-none'
                >Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                User Profile
              </li>
            </ol>
          </nav>
          <div className="col col-lg-9 col-xl-7"
            style={{ minHeight: '25rem', background: 'white' }}
      >
            {children}

          </div>
        </div>
      </div>
          {show && <EditProfile />}
    </section>
  </>
}

export default ProfileContainer;