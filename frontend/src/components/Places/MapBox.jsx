import { useState, useEffect } from 'react'
import Map, { Marker } from 'react-map-gl';

const MapBox = ({ place = []}) => {
  // const initialState = { latitude: 21.5937, longitude: 78.9629 };
  // const [{ longitude, latitude }, setCoor] = useState(initialState);

  // useEffect(() => {

  //   setCoor({ lat: +place[0]?.coordinate.lat, long: +place[0]?.coordinate.long })
  // }, [place[0], setCoor]);
  
    // setCoor({ lat: +place[0]?.coordinate.lat, long: +place[0]?.coordinate.long })

  const randerMarker = place?.map(({ _id, coordinate }) => {
    return <Marker key={_id} longitude={coordinate.long} latitude={coordinate.lat} anchor="center" >
    </Marker>
  })



  return <>
    <div className='container mw-50'>

      <Map style={{
        width: '100%',
        height: '50rem',
        borderRadius: '1rem',
        boxShadow: '0.5rem 0.5rem 0.5rem #00000055'
      }}

        initialViewState={{
          longitude: 79,
          latitude: 21.6,
          zoom: 3.5
        }}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESSTOKEN}
      >
        {randerMarker}
      </Map>
    </div>
  </>
}

export default MapBox;