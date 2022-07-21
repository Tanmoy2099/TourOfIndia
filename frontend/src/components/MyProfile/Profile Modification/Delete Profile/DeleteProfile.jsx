import React from 'react'
import { useHttpClient } from '../../../../custom-hooks/http-hook'
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../Store/user-slice';
import ErrorModal from '../../../../utils/ErrorModal';

const DeleteProfile = () => {
  const dispatch = useDispatch();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();



  const deleteAccount = async () => {
    const url = process.env.REACT_APP_GET_ALL_USER + '/deleteMe';
    try {
      const res = await sendRequest(url, 'DELETE')
      if (res.status !== 'ok') {
        throw new Error(res.data)
      }
      dispatch(userActions.resetUser())
    } catch (error) {
      console.log(error);
    }
  }

  return <div className='container d-flex flex-column justify-content-center'
  style={{transition: 'all 300ms ease-in-out'}}
  >
    <ErrorModal error={error} onClear={clearError} />
    <h3 className='text-center'> If you Really want to delete your account Press the Delete Button</h3>
    <h4 className='text-center'> After pressing the delete button, account will not be recoverable</h4>
    <button className='btn btn-danger btn-lg my-5 mx-auto fs-4 w-25 '
      onClick={deleteAccount}
    >{isLoading ? 'Loading...' : 'DELETE'}</button>
  </div>
}

export default DeleteProfile;
