import React from 'react'
import { Link } from 'react-router-dom';
import ErrorImg from '../../assets/img/404.png';
const ErrorPage = () => {


  const style = {
    zIndex: '-1',
    width: '100%',
    height: '90vh',
    position: 'absolute',
    top: '0',
    legt: '0'
  }
  return <>
    <img style={style} src={ErrorImg} alt='404' />
    <div className='container fs-2' style={{ minHeight: '80vh', width: '100%', marginTop: '7rem' }}>
      <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 my-4 mt-5">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to='/home' className='text-decoration-none'
            >Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            404 Error
          </li>
        </ol>
      </nav>
    </div>
  </>
}

export default ErrorPage;