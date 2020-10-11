import React from 'react';
import { render } from 'react-dom';
import Grid from '@material-ui/core/Grid';

class Emoji extends React.Component {

  constructor(props) {
    super(props);

  }

render(){

  return (
    <Grid item xs={4}>
      <div className="emoji-mask">
        <center><img src={this.props.img} onClick={this.props.function} width="80"/></center>
      </div>
    </Grid>
  );
}

}

export default Emoji;
