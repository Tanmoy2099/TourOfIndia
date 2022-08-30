

import {useState, useEffect} from 'react';
import classes from './ReviewCard.module.css';

import defaultImg from '../../assets/user/default.jpg';

const ReviewCard = ({ rating, review, user }) => {

  const [userPhoto, setUserPhoto] = useState(defaultImg);

  const profileImg = async () => {
    if (user?.photo === 'default.jpg') {
      return
    }
    const url = process.env.REACT_APP_GET_USER_PHOTO;
    const body = JSON.stringify({photo: user?.photo});
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'};
    try {
      const res = await fetch(url, { method, body, headers });
      const imgBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imgBlob)
      setUserPhoto(imageObjectURL);
    } catch (error) {
      console.log(error);
    }
  }


useEffect(() => {
  profileImg()
  
}, []);



  return <>
    <div className={classes.container}>
      <div className={classes.userInfo}>
        <img src={userPhoto} alt="userPic" className={classes.avatar} />
        <p> <strong> Name: </strong> {user?.name}</p>
        <p><strong>rating:</strong> {rating}</p>
      </div>
      <hr />
      <p className={classes.review}>
        <strong> review: </strong>
        <span>{review}</span>
      </p>

    </div>
  </>
}

export default ReviewCard;