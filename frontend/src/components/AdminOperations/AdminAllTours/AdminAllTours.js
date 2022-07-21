
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHttpClient } from '../../../custom-hooks/http-hook';
import ErrorModal from '../../../utils/ErrorModal';
import AdminTourCard from '../../../utils/AdminCard/TourCard/AdminTourCard';


const AdminAllTours = () => {
  const { error, sendRequest, clearError } = useHttpClient();

  const [tour, setTour] = useState([]);
  const [query, setQuery] = useState('');
  const searchVal = useRef();

  const userQuery = useCallback(query => {
    const url = process.env.REACT_APP_GET_ALL_TOUR + '?' + query;
    sendRequest(url)
      .then(res => {
        if (res.status === 'ok') {
          setTour(res.data.data)
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))
  }, []);

  useEffect(() => {
    userQuery(query);
  }, [query]);


  const renderTourCard = tour.map((info) => <AdminTourCard key={info._id} tour={info} />)

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
      >All Tours
      </button>
      {/* <div className="form-group">
        <label htmlFor="attr">Select Attribute</label>

        <select name="attr" id="attr">

        </select>
      </div> */}

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
      {tour ? renderTourCard : <h4>No Tour</h4>}
    </div>
  </>

}

export default AdminAllTours;
