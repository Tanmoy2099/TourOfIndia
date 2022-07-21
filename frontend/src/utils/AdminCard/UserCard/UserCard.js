
import { useState, useEffect } from 'react';
import classes from './UserCard.module.css';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { useHttpClient } from '../../../custom-hooks/http-hook';
import ErrorModal from '../../ErrorModal';
import { useSelector } from 'react-redux';

import defaultImg from '../../../assets/user/default.jpg';

const UserCard = props => {
  const { name } = useSelector(state => state.user.data);

  const [userPhoto, setUserPhoto] = useState(defaultImg);
  const [show, setShow] = useState(false);
  // const [localError, setLocalError] = useState('');
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const changeRole = ['admin', 'user'].filter(val => val !== props.role);
  const renderChangeRole = changeRole.map(val => <span className={classes.changeRole} key={val}>{val}</span>)

  // console.log(changeRole);

  const sendChangeRoleRequest = () => {
    const url = process.env.REACT_APP_GET_ALL_USER + '/' + props._id;
    const body = JSON.stringify({ role: changeRole[0] })
    sendRequest(url, 'PATCH', body)
      .then(res => {
        if (res.status !== 'ok') {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))
  }

  




  useEffect(() => {
    const profileImg = async () => {
      if (props?.photo === 'default.jpg') {
        return
      }
      const url = process.env.REACT_APP_GET_USER_PHOTO;
      const body = JSON.stringify({ photo: props?.photo });
      const method = 'POST'
      const headers = { 'Content-Type': 'application/json' };
      try {
        const res = await fetch(url, { method, body, headers });
        const imgBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imgBlob)
        setUserPhoto(imageObjectURL);
      } catch (error) {
        console.log(error);
      }
    }


    profileImg()
    return () => {
      profileImg()
    }
  }, [props?.photo]);




  return <>
    <ErrorModal error={error} onClear={clearError} />
    <div className={classes.container}>
      <img src={userPhoto} alt="user" className={classes.image} />
      <hr />
      <h4>Name: {props.name}</h4>
      <hr />
      <h4>Email: {props.email}</h4>
      <hr />
      <h4 className='d-flex justify-content-between'>
        Role: {props.role}
        <button className='btn btn-success btn-lg'
          onClick={() => setShow(val => !val)}
          disabled={name === props.name ? true : false}
        >Change Role {show ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        </button>
      </h4>

      {show &&
        <button className='btn btn-danger btn-lg fs-4'
          onClick={sendChangeRoleRequest} >
          {isLoading? 'Loading... ' : renderChangeRole}
        </button>
      }
    </div>
  </>
}

export default UserCard;