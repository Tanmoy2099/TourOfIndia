import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import classes from './SliderCard.module.css';
import StateCard from '../../utils/Cards/stateCard';
import LoadingBar from '../../utils/LoadingBar';



//Slider for states in main body

const SliderCard = props => {

  const [inputValue, setInputValue] = useState('');

  let stateRegex = new RegExp(inputValue, 'g');
  let stateValue = [];

  for (const valObj of props?.data) {
    const stateNamePresent = !!(_.lowerCase(valObj.name).match(stateRegex));
    if (stateNamePresent) stateValue.push(valObj);
  }


  const dataArray = stateValue.length ? stateValue.map(value => <Link to={ `/${value?._id}/tour` } key={ value._id } style={ { textDecoration: 'none' } }>
    <StateCard { ...value } />
  </Link>) : undefined;



  return <div className='container d-flex flex-column justify-content-center'
    style={ { borderRadius: `1rem`, boxShadow: '0.5rem 0.5rem 0.5rem #0000004b', backdropFilter: `blur(5px)`, backgroundColor: ' #eeeeeeb0' } }
  >
    <label htmlFor='searchState' className={ classes.heading }>Select the State you want to visit!</label>

    <div className={ classes.input }>
      <input id='searchState'
        type="text"
        placeholder='Enter State name'
        autoComplete='on'
        value={ inputValue }
        onChange={ (event) => setInputValue(_.lowerCase(event.target.value)) }
      />
      <button className={ `btn btn-outline-success fs-4 btn-lg rounded` }
        onClick={ () => setInputValue('') }
      >clear</button>
    </div>

    <div className={ `${classes.cardContainer} ` }>
      { props.isLoading ? <LoadingBar /> : (stateValue.length > 0 ? dataArray : <h2>Not Found</h2>) }
    </div>
  </div>

}

export default SliderCard;

