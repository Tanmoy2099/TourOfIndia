
import { useSelector } from 'react-redux';

import classes from './TopTours.module.css';
import TourList from '../Tours/TourList';
import TourCards from '../../utils/TourCards/TourCards';

import LoadingBar from '../../utils/LoadingBar';

const TopTours = ({ isLoading }) => {

  const { states, top6Tours } = useSelector(state => state);
  const { top6 } = top6Tours;


  let tourDisplay = [];

  for (const tour of top6) {
    const stateId = states.states.find(value => value.name === tour.state);
    tourDisplay.push(<TourCards tour={tour} key={tour?._id} stateId={stateId?._id} />);
  }


  return <>
    <div className='container d-flex flex-column justify-content-center bg-transparent'
    
    >
      <p className={classes.heading}>Top {top6.length} Tours!</p>
    </div>
    <div className='' style={{ backdropFilter: `blur(2px)` }}>
      <div className='w-100 h-auto'>
        <TourList>
          <LoadingBar isLoading={isLoading} />
          {tourDisplay}
        </TourList>
      </div>
    </div>
  </>
}

export default TopTours;

