import React from 'react';
import { render } from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {  Map, TileLayer } from 'react-leaflet'
import './App.css'

import mask from './images/mask.png'
import no_mask from './images/no_mask.png'
import maskhole from './images/maskhole.png'

const position = [40.761927, -73.950093]

class App extends React.Component {

HOME = 0;

  constructor(props) {
    super(props);
    this.state = { pageStatus : this.HOME }
  }

render(){
  return (
    <div className="App">

      <header className="App-header">
        <h1><center>MASK MAPPING</center></h1>
      </header>

      <br></br><br></br>

      <Grid container item xs={12} spacing={1}>

          <Grid item xs={4}>
            <div className="emoji-mask">
              <center><img src={mask} width="200"/></center>
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="emoji-maskhole">
              <center><img src={maskhole} width="200"/></center>
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="emoji-mask">
              <center><img src={no_mask} width="200"/></center>
            </div>
          </Grid>

      </Grid>

      <br></br><br></br>

      <Grid container item xs={12} spacing={1}>

        <Grid item xs={6}>
          <center><Button variant="contained" >Clear Data</Button></center>
        </Grid>

        <Grid item xs={6}>
          <center><Button variant="contained" >View Map</Button></center>
        </Grid>

      </Grid>

      <br></br><br></br><br></br><br></br>


      <div className="leaflet-container">

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
                <Map center={position} zoom={13}>
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

    </div>
  );
}

}

export default App;
