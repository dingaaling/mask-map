import React from 'react';

import Emoji from './Emoji.js';
import glasses from './images/glasses.png'
import no_mask from './images/no_mask_red.png'
import maskhole from './images/maskhole_red.png'
import Grid from '@material-ui/core/Grid';



class Emojis extends React.Component {

render(){
    return (
      <div>
      <Grid container item xs={12} spacing={1}>
          <Emoji img={glasses} function = {() => this.props.onClick(0)}></Emoji>
          <Emoji img={maskhole} function = {() => this.props.onClick(1)}></Emoji>
          <Emoji img={no_mask} function = {() => this.props.onClick(2)}></Emoji>
      </Grid>

      {this.props.is_user_logged_in && <Grid container item xs={12} spacing={1}>
        <Grid item xs={4}>
          <center><p>{this.props.mask_list.length}</p></center>
        </Grid>
        <Grid item xs={4}>
          <center><p>{this.props.maskhole_list.length}</p></center>
        </Grid>
        <Grid item xs={4}>
          <center><p>{this.props.nomask_list.length}</p></center>
        </Grid>
      </Grid>
    }
      </div>
    );

}

}

export default Emojis;
