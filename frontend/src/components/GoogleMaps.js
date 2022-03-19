import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from '@react-google-maps/api';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const mapStyles = {
  width: '400px',
  height: '400px',
  margin: '50px auto',
  padding: 'auto',
};
const image =
  'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

const GOOGLE_MAP_LIBRARIES = ['places'];

function GoogleMaps({ tasks }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({});
  const [infoWindow, setInfoWindow] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        });

        setIsLoading(false);
      },
      (error) => console.log('error', error)
    );
  });

  return (
    <>
      {isLoading ? (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : currentPosition.lat && currentPosition.lng ? (
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          libraries={GOOGLE_MAP_LIBRARIES}
        >
          <GoogleMap
            zoom={10}
            mapContainerStyle={mapStyles}
            center={currentPosition}
          >
            <Marker
              icon={image}
              position={currentPosition}
              onClick={() =>
                setInfoWindow({
                  text: 'This is my home',
                  location: currentPosition,
                })
              }
            />

            {/* {tasks.map(task => (
                <Marker 
                  key={task.id}
                  position={{ lat: parseFloat(task.location.lat), lng: parseFloat(task.location.lng) }}
                  onClick={() => setInfoWindow(task)}
                  onDragEnd={(e) => onMarkerDragEnd(e)}
                  draggable={true}
                />  
              ))} */}

            {infoWindow.location && (
              <InfoWindow
                position={infoWindow.location}
                clickable={true}
                onCloseClick={() => setInfoWindow({})}
              >
                <p>{infoWindow.text}</p>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '50px',
            backgroundColor: 'white',
          }}
        >
          <div>
            There is something wrong with Google Maps API or I am out of free
            version.
          </div>
        </Box>
      )}
    </>
  );
}

export default GoogleMaps;
