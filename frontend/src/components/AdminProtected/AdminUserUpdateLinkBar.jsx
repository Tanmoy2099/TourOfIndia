import React from 'react';
import { Link } from 'react-router-dom';

const AdminUserUpdateLinkBar = () => {
  return <>
    <div className="container">
      <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4 fs-3">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to='/home' className='text-decoration-none'
            >Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to='/admin-access' className='text-decoration-none'
            >Admin Control</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Modify Tour
          </li>
        </ol>
      </nav>
    </div>
  </>
}

export default AdminUserUpdateLinkBar;