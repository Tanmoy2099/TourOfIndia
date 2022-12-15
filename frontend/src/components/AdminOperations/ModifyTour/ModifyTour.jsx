import { useState } from 'react'
import classes from './ModifyTour.module.css';
// import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../../custom-hooks/http-hook';
import ErrorModal from '../../../utils/ErrorModal';

import allStatesName from '../../../assets/data/allStateNameArray';

const ModifyTour = () => {
  const initialData = {
    name: '',
    coverImage: '',
    duration: '',
    groupSizeMax: 0,
    groupSizeMin: 0,
    info: '',
    state: '',
    travelPackage: 0,
    monthToTravel: [],
    place: []
  }

  // const [curTour, setCurTour] = useState([]);
  const [modifiedTour, setModifiedTour] = useState(initialData);
  // const { tourId } = useParams();
  const { error, clearError } = useHttpClient();

  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // useEffect(() => {
  //   const url = process.env.REACT_APP_GET_ALL_TOUR + '/' + tourId
  //   sendRequest(url)
  //     .then(res => {
  //       if (res.status === 'ok') {
  //         setModifiedTour(res.data.data)
  //       } else {
  //         throw new Error(res.data);
  //       }
  //     }).catch(err => console.log(err.message))

  // }, [tourId]);

  // console.log(modifiedTour);

  const allStateNameRander = allStatesName.map(val => <option key={val}>{val}</option>)


  const changeTourData = (key, value) => {
    setModifiedTour(val => {
      return { ...val, key: value }
    })
  }
  // console.log(modifiedTour);

  return <>
    <ErrorModal error={error} onClear={clearError} />
    <div className={`${classes.container} `}>

<h1>NEED TO IMPLEMENT IT  (but later)</h1>
      <div className="form-group w-100">
        <label htmlFor="exampleFormControlInput1">Name</label>
        <input
          type="text"
          className={`form-control ${classes.input}`}
          id="exampleFormControlInput1"
          placeholder="Change name"
          value={modifiedTour.name}
          onChange={event => changeTourData('name', event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlSelect2">State</label>
        <select multiple=""
          className={`form-control ${classes.select}`}
          id="exampleFormControlSelect2"
          value={modifiedTour.state}
          onChange={event => changeTourData('state', event.target.value)}
        >
          {allStateNameRander}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Info</label>
        <textarea
          className="form-control fs-4"
          id="exampleFormControlTextarea1"
          rows={6}
          defaultValue={modifiedTour.info}
        />
      </div>

<button className='btn btn-outline-success btn-lg mt-5'>Submit</button>
    </div>
  </>
}

export default ModifyTour