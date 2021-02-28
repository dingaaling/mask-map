import React from 'react';

import Grid from '@material-ui/core/Grid';
import {  Map, TileLayer, Marker } from 'react-leaflet'
import { iconGlasses, iconMaskhole, iconNoMask } from './icon';

class EmojiMap extends React.Component {

render(){

    let marker = iconGlasses
    if (this.props.glasses_im) {
      marker = iconGlasses
    }
    if (this.props.maskhole_im) {
      marker = iconMaskhole
    }
    if (this.props.nomask_im) {
      marker = iconNoMask
    }


    return (
      <div className="leaflet-container">

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
                <Map center={[40.750046, -73.979045]} zoom={12}>
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />

                {this.props.heat_data.map((position, idx) =>
                  <Marker key={`marker-${idx}`} position={position} icon={ marker }>
                  </Marker>
                )}


                </Map>
          </Grid>
          <Grid item xs={2}></Grid>

        </Grid>
        </div>
    );

}

}

export default EmojiMap;
