import React from 'react';

import Grid from '@material-ui/core/Grid';
import {  Map, TileLayer} from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer';

class HeatMap extends React.Component {

render(){
    return (
      <div className="leaflet-container">

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
                <Map center={[40.760186, -73.972084]} zoom={15}>
                <HeatmapLayer
                  fitBoundsOnLoad
                  fitBoundsOnUpdate
                  max={1.0}
                  radius={12}
                  points={this.props.heat_data}
                  longitudeExtractor={m => m[1]}
                  latitudeExtractor={m => m[0]}
                  intensityExtractor={m => parseFloat(m[2])}/>
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                </Map>
          </Grid>
          <Grid item xs={2}></Grid>

        </Grid>
        </div>
    );

}

}

export default HeatMap;
