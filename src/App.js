import React from 'react';
import { render } from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {  Map, TileLayer } from 'react-leaflet'
import './App.css'

import glasses from './images/glasses.png'
import mask from './images/mask.png'
import no_mask from './images/no_mask.png'
import maskhole from './images/maskhole.png'


class App extends React.Component {

HOME = 'Home';
MASK = '0';
MASKHOLE = '1';
NO_MASK = '2';

  constructor(props) {
    super(props);
    this.state = { pageStatus : this.HOME, latitude : 40.7631264, longitude : -73.95756}
  }

  imageClick = (maskStatus) => {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              console.log(maskStatus, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
              // log to database
              // let body = {maskStatus: maskStatus, position_dict: position, timestamp: timestamp}

          });
      } else {
          alert("Sorry, your browser does not support HTML5 geolocation.");
      }
  }

render(){

  return (
    <div className="App">

      <header className="App-header">
        <h1><center>MASK MAP</center></h1>
      </header>

      <br></br><br></br>

      <Grid container item xs={12} spacing={1}>

          <Grid item xs={4}>
            <div className="emoji-mask">
              <center><img src={glasses} onClick = {() => this.imageClick(this.MASK)} width="200" /></center>
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="emoji-maskhole">
              <center><img src={maskhole} onClick = {() => this.imageClick(this.MASKHOLE)} width="200"/></center>
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="emoji-mask">
              <center><img src={no_mask} onClick = {() => this.imageClick(this.NO_MASK)} width="200"/></center>
            </div>
          </Grid>

      </Grid>

      <br></br><br></br><br></br><br></br>


      <div className="leaflet-container">

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
                <Map center={[this.state.latitude, this.state.longitude]} zoom={13}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                </Map>
          </Grid>
          <Grid item xs={3}></Grid>

        </Grid>
        </div>

      <br></br><br></br><br></br><br></br>


      <Grid container item xs={12} spacing={1}>

        <Grid item xs={6}>
          <center><Button variant="contained" >Start Over</Button></center>
        </Grid>

        <Grid item xs={6}>
          <center><Button variant="contained" >Share Map</Button></center>
        </Grid>

      </Grid>

      <br></br><br></br>


    </div>
  );
}

}

export default App;
