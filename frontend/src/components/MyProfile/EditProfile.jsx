
import { useReducer } from 'react';
import classes from './EditProfile.module.css';
import ChangePassword from './Profile Modification/Change Password/ChangePassword';
import DeleteProfile from './Profile Modification/Delete Profile/DeleteProfile';
import UpdateProfile from './Profile Modification/Update Profile/UpdateProfile';

const EditProfile = () => {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'profile':
        return <UpdateProfile />
      case 'password':
        return <ChangePassword />
      case 'delete':
        return <DeleteProfile />
    
      default:
        return
    }
  }

const [state, dispatch] = useReducer(reducer, '')



  const btnClass = 'btn btn-warning btn-lg my-3';
  return <>
    <div className={` ${classes.container}`}>
      <div className={classes.buttonContainer}>
        <button className={btnClass}
          onClick={() => dispatch({ type: 'profile' })}> Update Profile </button>

        <button className={btnClass}
          onClick={() => dispatch({ type: 'password' })}> Change Password </button>

        <button className={btnClass}
          onClick={() => dispatch({ type: 'delete' })}> Delete Profile </button>
      </div>
<hr />
      {state}
    </div>
  </>
}

export default EditProfile;