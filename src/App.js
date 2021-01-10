import React from 'react';
import { render } from 'react-dom';
import Grid from '@material-ui/core/Grid';
import {  Map, TileLayer, Marker } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './config.js'

import './App.css'
import { iconGlasses, iconMaskhole, iconNoMask } from './icon';
import Emoji from './Emoji.js';
import glasses from './images/glasses.png'
import no_mask from './images/no_mask_red.png'
import maskhole from './images/maskhole_red.png'
import { nycdata } from './2020_maskhole_data';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { map_center : [40.762295, -73.968148],
                  mask_list : [], maskhole_list : [], nomask_list : []};
    this.showPosition = this.showPosition.bind(this)
    this.imageClick = this.imageClick.bind(this)

  }

  showPosition(position) {
      console.log("Logging at: " + position.coords.latitude.toString() +", "+ position.coords.longitude.toString());
      this.setState({latitude : position.coords.latitude, longitude : position.coords.longitude, map_center : [position.coords.latitude, position.coords.longitude]});
  }

  showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
  }

  getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  }

  componentDidMount() {
    this.getLocation()
  };


  imageClick(maskStatus) {

      let current_this = this
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {

              // log to database
              let body = {
                timestamp: new Date().toUTCString(),
                mask_status: maskStatus,
                latitude : position.coords.latitude,
                longitude : position.coords.longitude,
                accuracy: position.coords.accuracy,
              };

              firebaseApp.database().ref('/').push(body);
              console.log("Data Saved");

              if(maskStatus==0) {
                current_this.setState({mask_list: current_this.state.mask_list.concat([[position.coords.latitude, position.coords.longitude]])});
              }
              if(maskStatus==1) {
                current_this.setState({maskhole_list: current_this.state.maskhole_list.concat([[position.coords.latitude, position.coords.longitude]])});
              }
              if(maskStatus==2) {
                current_this.setState({nomask_list: current_this.state.nomask_list.concat([[position.coords.latitude, position.coords.longitude]])});
              }

              current_this.setState({map_center: [position.coords.latitude, position.coords.longitude]});


          });
      } else {
          alert("Geolocation error - please refresh page.");
      }
  }

render(){

  const {
    user,
    signOut,
    signInWithGoogle,
  } = this.props;

  if(user){

    return (


      <div className="App">

        <header className="App-header">
          <h1><center>MASK MAP</center></h1>
        </header>

        <br></br>

        <Grid container item xs={12} spacing={1}>

            <Emoji img={glasses} function = {() => this.imageClick(0)}></Emoji>
            <Emoji img={maskhole} function = {() => this.imageClick(1)}></Emoji>
            <Emoji img={no_mask} function = {() => this.imageClick(2)}></Emoji>


        </Grid>

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={4}>
            <p><center>{this.state.mask_list.length}</center></p>
          </Grid>
          <Grid item xs={4}>
            <p><center>{this.state.maskhole_list.length}</center></p>
          </Grid>
          <Grid item xs={4}>
            <p><center>{this.state.nomask_list.length}</center></p>
          </Grid>

        </Grid>

        <div className="leaflet-container">

          <Grid container item xs={12} spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                  <Map center={this.state.map_center} zoom={15}>
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />

                  {this.state.mask_list.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position} icon={ iconGlasses }>
                    </Marker>
                  )}

                  {this.state.maskhole_list.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position} icon={ iconMaskhole }>
                    </Marker>
                  )}

                  {this.state.nomask_list.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position} icon={ iconNoMask }>
                    </Marker>
                  )}


                  </Map>
            </Grid>
            <Grid item xs={2}></Grid>

          </Grid>
          </div>

        <br></br>


        <footer>
          <center>
          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in</button>
          }
          </center>
        </footer>

      </div>


    );
  }

  else{
    return(
      <div className="App">

        <header className="App-header">
          <h1><center>MASK MAP NYC</center></h1>
        </header>

        <br></br>

        <Grid container item xs={12} spacing={1}>

            <Emoji img={glasses}></Emoji>
            <Emoji img={maskhole} ></Emoji>
            <Emoji img={no_mask}></Emoji>

        </Grid>

        <br></br>

        <div className="leaflet-container">

          <Grid container item xs={12} spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                  <Map center={[40.760186, -73.972084]} zoom={12}>
                  <HeatmapLayer
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    max={1.0}
                    radius={15}
                    points={nycdata}
                    longitudeExtractor={m => m[1]}
                    latitudeExtractor={m => m[0]}
                    intensityExtractor={m => parseFloat(m[2])} />
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                  </Map>
            </Grid>
            <Grid item xs={2}></Grid>

          </Grid>
          </div>

          <br></br>

        <footer>
          <center>
          {
            user
              ? <h3> </h3>
              : <h3>Please sign in to log data.</h3>
          }
          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in</button>
          }
          </center>
        </footer>

      </div>
    );
  }
}

}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
