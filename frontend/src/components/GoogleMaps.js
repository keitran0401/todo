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

function GoogleMaps(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({});
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        });

        setIsLoading(false);
      },
      (error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    );
  });

  return (
    <>
      {isLoading ? (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : errorMessage ? (
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '50px',
            backgroundColor: 'white',
          }}
        >
          <div>{errorMessage}</div>
        </Box>
      ) : (
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          libraries={GOOGLE_MAP_LIBRARIES}
        >
          <GoogleMap
            zoom={10}
            mapContainerStyle={mapStyles}
            center={currentPosition}
          >
            {currentPosition.lat && (
              <Marker
                icon={image}
                position={currentPosition}
                onClick={() =>
                  setInfoWindow({
                    title: 'Current Position',
                    location: {
                      name: 'This is my home',
                      ...currentPosition,
                    },
                  })
                }
              />
            )}

            {props.todoList.map((todo) => (
              <Marker
                key={todo.id}
                position={{
                  lat: parseFloat(todo.location.lat),
                  lng: parseFloat(todo.location.lng),
                }}
                onClick={() => setInfoWindow(todo)}
              />
            ))}

            {infoWindow && (
              <InfoWindow
                position={{
                  lat: parseFloat(infoWindow.location.lat),
                  lng: parseFloat(infoWindow.location.lng),
                }}
                clickable={true}
                onCloseClick={() => setInfoWindow(null)}
              >
                <>
                  <h6>{infoWindow.title}</h6>
                  <p>{infoWindow.location.name}</p>
                </>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
}

export default GoogleMaps;
