
import classes from './Decoration.module.css';
import rajasthan from '../../assets/img/rajasthan.jpg';
import kashmir from '../../assets/img/kashmir.jpg';
import kerala from '../../assets/img/kerala.jpg';
import manali from '../../assets/img/manali.jpg';
import Uttarakhand from '../../assets/img/Uttarakhand.jpg';

import Flip from 'react-reveal/Flip';

const Decoration = () => {
  return <>
  <div className='container d-flex justify-content-center my-3 '>
    <h2 className={classes.heading}>Popular Tourist Destination</h2>
  </div>


    <div className={classes.background}
    >
      <div className={classes.container} >

        <Flip right>
        <div className={classes.image} style={{ 
          backgroundImage: `url(${Uttarakhand})` }} 
          draggable='false' >
          <div>
            <p>Uttarakhand</p>
          </div>
        </div>
        </Flip>
          <Flip left>
        <div className={classes.image} style={{ 
          backgroundImage: `url(${kashmir})` }} 
          draggable='false' >
          <div>
            <p>Kashmir</p>
          </div>
        </div>
          </Flip>
            <Flip right>
        <div className={classes.image} style={{
          backgroundImage: `url(${rajasthan})`
        }} draggable='false' >
          <div>
            <p>Rajasthan</p>
          </div>
        </div>
            </Flip>
              <Flip left>
        <div className={classes.image} style={{
          backgroundImage: `url(${kerala})`
        }} draggable='false' >
          <div>
            <p>Kerala</p>
          </div>
        </div>
              </Flip>
                <Flip right>
        <div className={classes.image} style={{
          backgroundImage: `url(${manali})`
        }} draggable='false' >
          <div>
            <p>Manali</p>
          </div>
        </div>
                </Flip>

      </div>
    </div>
  </>
}

export default Decoration;
