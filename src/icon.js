import L from 'leaflet';

const iconGlasses = new L.Icon({
    iconUrl: require('./images/glasses.png'),
    iconRetinaUrl: require('./images/glasses.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: [0,0],
    shadowAnchor: null,
    iconSize: new L.Point(15,15),
    className: 'none'
});

const iconMaskhole = new L.Icon({
    iconUrl: require('./images/maskhole.png'),
    iconRetinaUrl: require('./images/maskhole.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: [0,0],
    shadowAnchor: null,
    iconSize: new L.Point(15,15),
    className: 'none'
});

const iconNoMask = new L.Icon({
    iconUrl: require('./images/no_mask.png'),
    iconRetinaUrl: require('./images/no_mask.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: [0,0],
    shadowAnchor: null,
    iconSize: new L.Point(15,15),
    className: 'none'
});


export { iconGlasses, iconMaskhole, iconNoMask };
