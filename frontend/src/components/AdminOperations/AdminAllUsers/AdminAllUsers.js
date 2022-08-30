
import { useEffect, useRef, useState } from 'react';
import UserCard from '../../../utils/AdminCard/UserCard/UserCard';
import { useHttpClient } from '../../../custom-hooks/http-hook';
import ErrorModal from '../../../utils/ErrorModal';
import LoadingBar from '../../../utils/LoadingBar';


const AllUsers = () => {
  const { error, sendRequest, clearError } = useHttpClient();

  const [user, setUser] = useState([]);
  const [query, setQuery] = useState('');
  const searchVal = useRef();

  const userQuery = (query) => {
    const url = process.env.REACT_APP_GET_ALL_USER + '?' + query;
    sendRequest(url)
      .then(res => {
        if (res.status === 'ok') {
          setUser(res.data.data)
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))
  };

  useEffect(() => {
    userQuery(query);
  }, [query]);


  const renderUserCard = user.map((info) => <UserCard key={info._id} {...info} />)

  const searchQuery = () => {
    setQuery(searchVal.current)
    searchVal.current = ''
  }


  const buttonClass = 'btn btn-outline-success fs-4 mx-1 mb-5';
  return <>
    <ErrorModal onClear={clearError} error={error} />

    <div className='container d-flex flex-wrap justify-content-center'>

      {/* All Profiles */}
      <button className={buttonClass}
        onClick={() => setQuery(``)}
      >All Profiles
      </button>

      {/* Only User */}
      <button className={buttonClass}
        onClick={() => setQuery(`role=user`)}
      >User
      </button>

      {/* Only Admin */}
      <button className={buttonClass}
        onClick={() => setQuery(`role=admin`)}
      >Admin
      </button>

      {/* Active Account */}
      <button className={buttonClass}
        onClick={() => setQuery(`active=true`)}
      >Active
      </button>

      {/* Deactive Account */}
      <button className={buttonClass}
        onClick={() => setQuery(`active=false`)}
      >Deactive
      </button>


      {/* Search */}
        <input type="text"
          className='w-25 mb-5 fs-4 ml-2'
          style={{ minWidth: '15rem' }}
          value={searchVal.current}
          placeholder='Enter Search Query'
          onChange={event => searchVal.current = event.target.value} />
        <button className={buttonClass}
          onClick={searchQuery}
        >search
        </button>
    </div>


    <div className='container d-flex flex-wrap justify-content-center '>
    {/* <LoadingBar /> */}
      {user? renderUserCard: <h4>No User</h4> }
    </div>
  </>

}

export default AllUsers;
