
import { useState, useReducer } from 'react'
import ChangePassContainer from '../Change Password/ChangePassContainer';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../Store/user-slice';
import MessageModal from '../../../../utils/MessageModal';
import { useNavigate } from 'react-router-dom';




const UpdateProfile = () => {
  const Navigate = useNavigate();
  const { user } = useSelector(state => state)
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const reducer = (state, action) => {
    switch (action.type) {
      case 'setName': return { ...state, name: action.payload };
      case 'setEmail': return { ...state, email: action.payload };
      case 'setImageUpload': return { ...state, imageUpload: action.payload };
      default:
        break;
    }
  }


  const initialState = { name: '', email: '', imageUpload: null };
  const [state, dispatchState] = useReducer(reducer, initialState);

  const sendResetPassword = async (e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_GET_ALL_USER + '/updateMe';

    const data = new FormData()
    if (state.name) data.append('name', state.name);
    if (state.email) data.append('email', state.email);
    if (state.imageUpload) data.append('photo', state.imageUpload);

    if (state.name || state.email || state.imageUpload) {
      try {
        setIsLoading(true)

        const res = await fetch(url, { method: 'PATCH', body: data });
        if (res.status !== 'ok') {
          throw new Error(res.data)
        }
        dispatch(userActions.resetUser());
        dispatch(userActions.setUser(res.data.user));
        setMessage('Successfully Updated');
        Navigate('/')

      } catch (error) {
        setMessage(error.message)
      }
      setIsLoading(false)
    }
  }


  return <>

    <MessageModal message={message} header={message} onClear={() => setMessage('')} />
    <ChangePassContainer heading={'UPDATE PROFILE'}>
      <form >
        {/* name */}
        <div className="form-outline mb-4">
          <label className="form-label fs-4" htmlFor="form3Example1cg"> Your Full Name </label>
          <input type="text" id="form3Example1cg"
            className="form-control form-control-lg "
            autoComplete='on'
            placeholder='Enter Your Fullname'
            value={state.name}
            onChange={(e) => dispatchState({ type: 'setName', payload: e.target.value })} />
        </div>


        {/* email */}
        <div className="form-outline mb-4">
          <label className="form-label fs-4"
            htmlFor="form3Example1cg"> Your Email </label>

          <input type="email"
            id="form3Example1cg"
            className={`form-control form-control-lg `}
            autoComplete='on'
            placeholder='Enter Your Full Name'
            value={state.email}
            onChange={(e) => dispatchState({ type: 'setEmail', payload: e.target.value })} />
        </div>

        {/* image upload */}
        <div className="form-outline mb-4">
          <label className="form-label fs-4 w-100" htmlFor="profileImage">Upload your Image</label>

          <input type="file" alt="proImg"
            className='fs-5 '
            accept='image/*'
            name='photo'
            onChange={e => dispatchState({ type: 'setImageUpload', payload: e.target.files[0] })} />
          {state.imageUpload && <><img src={URL.createObjectURL(state.imageUpload)} alt="tempProImage"
            style={{ height: '10rem', width: "10rem", fontSize: "1rem", borderRadius: '5px', margin: '1.5rem auto' }}
          />
            <button className='btn btn-danger'
              onClick={() => dispatchState({ type: 'setImageUpload', payload: null })}
            >x</button>
          </>
          }
        </div>


        {/* Submit button */}
        <div className="d-flex justify-content-center" style={{ color: '#fff' }}>
          <button
            type="button"
            onClick={event => sendResetPassword(event)}
            disabled={isLoading}
            className={`btn btn-primary btn-block btn-lg w-100`}>
            {isLoading ? 'Loading...' : 'SUBMIT'}
          </button>
        </div>
        {/* ------------------------------------------------- */}
      </form>
    </ChangePassContainer>
  </>
}

export default UpdateProfile;