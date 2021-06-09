import React from 'react';

//Firebase
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './config.js'

//Internal Classes
import Emojis from './Emojis.js';
import HeatMap from './HeatMap.js'
import PathMap from './PathMap.js'
import EmojiMap from './EmojiMap.js'
// import { mask_rates, maskhole_rates, nomask_rates } from './data/nyc_020621';
import { mask_gps, maskhole_gps, nomask_gps } from './data/latlon_above75_022721';
import DWChart from "react-datawrapper-chart";

//Styling
import './App.css'
import Grid from '@material-ui/core/Grid';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://1db0d616b0104d639e2f3892e8c6ec78@o517547.ingest.sentry.io/5625522",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 0.5,
});

//Variables
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

// const heat_data_list = [mask_rates, maskhole_rates, nomask_rates];
const heat_data_list = [mask_gps, maskhole_gps, nomask_gps];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { map_center : [40.762295, -73.968148], heatmap: false,
                  mask_list : [], maskhole_list : [], nomask_list : [], heat_data : heat_data_list[0],
                  glasses_im: 1, maskhole_im: 0, nomask_im: 0, heatmap_range: [0.0, 0.75]};
    this.showPosition = this.showPosition.bind(this)
    this.imageClick = this.imageClick.bind(this)
    this.updateData = this.updateData.bind(this)

  }

  showPosition(position) {
      // console.log("Logging at: " + position.coords.latitude.toString() +", "+ position.coords.longitude.toString());
      this.setState({latitude : position.coords.latitude, longitude : position.coords.longitude, map_center : [position.coords.latitude, position.coords.longitude]});
  }

  showError(error) {

    const errorMessage =  { code : 1, message : "Location Settings error" };

    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation. To log data, please enable Location Services for your browser.")
        throw errorMessage;
        break;
      case error.TIMEOUT:
        alert("To log data, please enable Location Services for your browser.")
        throw errorMessage;
        break;
      default:
        alert("To log data, please enable Location Services for your browser.")
        throw errorMessage;
    }
  }

  getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition, this.showError, {timeout:20000,enableHighAccuracy:true});
      } else {
          alert("Geolocation is not supported by this browser. To log data, please enable Location Services for your browser.");
      }
  }

  updateData(position, maskStatus) {

    let body = {
      timestamp: new Date().toUTCString(),
      mask_status: maskStatus,
      latitude : position.coords.latitude,
      longitude : position.coords.longitude,
      accuracy: position.coords.accuracy,
    };

    firebaseApp.database().ref('/').push(body);

    switch (maskStatus) {
      case 0:
        this.setState({mask_list: this.state.mask_list.concat([[position.coords.latitude, position.coords.longitude]])});
        break;
      case 1:
        this.setState({maskhole_list: this.state.maskhole_list.concat([[position.coords.latitude, position.coords.longitude]])});
        break;
      case 2:
        this.setState({nomask_list: this.state.nomask_list.concat([[position.coords.latitude, position.coords.longitude]])});
        break;
      default:
        this.setState({map_center: [position.coords.latitude, position.coords.longitude]});
    };
  }

  componentDidMount() {
    this.getLocation()
  };



  isUserLggedIn() {

    return this.props.user != null;
  }

  imageClick(maskStatus) {

      if(this.isUserLggedIn()){

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => this.updateData(position, maskStatus), this.showError, {timeout:5000,enableHighAccuracy:true});
        } else {
          alert("Geolocation error - please refresh page.");
          }
      } else {
          this.setState({heat_data: heat_data_list[maskStatus]})
          switch (maskStatus) {
            case 0:
              this.setState({glasses_im: 1, maskhole_im: 0, nomask_im: 0})
              this.setState({heatmap_range: [0.0, 0.75]})
              break;
            case 1:
              this.setState({glasses_im: 0, maskhole_im: 1, nomask_im: 0})
              this.setState({heatmap_range: [0.0, 0.15]})
              break;
            case 2:
              this.setState({glasses_im: 0, maskhole_im: 0, nomask_im: 1})
              this.setState({heatmap_range: [0.0, 0.15]})
              break;
            default:
              this.setState({glasses_im: 1, maskhole_im: 0, nomask_im: 0})
              this.setState({heatmap_range: [0.0, 1.0]})

          }

      }
}

getLineSeparator() {
  return <br></br>;
}

getSigninButton(props) {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;
  return(
    <footer>
      <center>
      {
        user
          ? <button onClick={signOut}>SIGN OUT</button>
          : <button onClick={signInWithGoogle}>SIGN IN TO LOG DATA</button>
      }
      </center>
    </footer>
)}

render(){

  return (
    <div className="App">

      <header className="App-header">
        <h1><center>MASK MAP</center></h1>
      </header>

      {this.isUserLggedIn() && this.getLineSeparator()}
      {this.isUserLggedIn() && this.getLineSeparator()}
      {!this.isUserLggedIn() && <center><p>SELECT AN EMOJI TO EXPLORE WHERE IT IS ABOVE AVERAGE. LEARN MORE ABOUT THE PROJECT <a href="https://jending.medium.com/mapping-mask-behavior-in-your-neighborhood-a5ab15380761">HERE</a>.</p></center>}

      <Emojis onClick = {(param) => this.imageClick(param)}
        mask_list = {this.state.mask_list}
        maskhole_list = {this.state.maskhole_list}
        nomask_list = {this.state.nomask_list}
        mask_status = {this.state.mask_status}
        glasses_im = {this.state.glasses_im}
        maskhole_im = {this.state.maskhole_im}
        nomask_im = {this.state.nomask_im}
        is_user_logged_in = {this.isUserLggedIn()}>
      </Emojis>

      {!this.isUserLggedIn() && this.getLineSeparator()}

      {this.isUserLggedIn() && <PathMap map_center = {this.state.map_center}
        mask_list = {this.state.mask_list}
        maskhole_list = {this.state.maskhole_list}
        nomask_list = {this.state.nomask_list}/>
      }

      {!this.isUserLggedIn() && this.state.heatmap && <HeatMap heat_data = {this.state.heat_data}
            heatmap_range = {this.state.heatmap_range}
      />}

      {!this.isUserLggedIn() && !this.state.heatmap && <EmojiMap map_center = {this.state.map_center}
        heat_data = {this.state.heat_data}
        glasses_im = {this.state.glasses_im}
        maskhole_im = {this.state.maskhole_im}
        nomask_im = {this.state.nomask_im}
        />
      }

    {this.getLineSeparator()}
    {this.getSigninButton(this.props)}
    {this.getLineSeparator()}
    {!this.isUserLggedIn() && <center><p>LAST UPDATED: MARCH 2021</p></center>}

     </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
