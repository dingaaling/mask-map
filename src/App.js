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
import { mask_data, maskhole_data, nomask_data } from './mask_data';

//Styling
import './App.css'


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const heat_data_list = [mask_data, maskhole_data, nomask_data]

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { map_center : [40.762295, -73.968148],
                  mask_list : [], maskhole_list : [], nomask_list : [], heat_data : mask_data};
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
      default:
        alert("An unknown error occurred.")
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

  isUserLggedIn() {

    return this.props.user != null;
  }

  imageClick(maskStatus) {


      if(this.isUserLggedIn()){

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

                switch (maskStatus) {
                  case 0:
                    current_this.setState({mask_list: current_this.state.mask_list.concat([[position.coords.latitude, position.coords.longitude]])});
                    break;
                  case 1:
                    current_this.setState({maskhole_list: current_this.state.maskhole_list.concat([[position.coords.latitude, position.coords.longitude]])});
                    break;
                  case 2:
                    current_this.setState({nomask_list: current_this.state.nomask_list.concat([[position.coords.latitude, position.coords.longitude]])});
                    break;
                  default:
                    current_this.setState({map_center: [position.coords.latitude, position.coords.longitude]});
                };
              });
        } else {
          alert("Geolocation error - please refresh page.");
          }
      } else {
          this.setState({heat_data: heat_data_list[maskStatus]})
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
      {!this.isUserLggedIn() && <center><p>SELECT AN EMOJI TO VIEW CORRESPONDING DATA</p></center>}

      <Emojis onClick = {(param) => this.imageClick(param)}
        mask_list = {this.state.mask_list}
        maskhole_list = {this.state.maskhole_list}
        nomask_list = {this.state.nomask_list}
        mask_status = {this.state.mask_status}
        is_user_logged_in = {this.isUserLggedIn()}>
      </Emojis>

      {!this.isUserLggedIn() && this.getLineSeparator()}

      {this.isUserLggedIn() && <PathMap map_center = {this.state.map_center}
        mask_list = {this.state.mask_list}
        maskhole_list = {this.state.maskhole_list}
        nomask_list = {this.state.nomask_list}/>
      }

      {!this.isUserLggedIn() && <HeatMap heat_data = {this.state.heat_data}/>}

      {this.getLineSeparator()}

     {this.getSigninButton(this.props)}

     </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
