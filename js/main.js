import './style.css';
import {Map, View, Feature, Geolocation} from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer, VectorImage as VectorImg} from 'ol/layer';

var active_route = undefined;
var active_features;
var is_ascending = true;



// ROUTE DATA --------------------------------------------------------------------------------

const geojson_obj = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:4326',
        },
    },
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13616614.70335676,6036432.883910653],
                    [-13616648.342852032,6036445.002258454],
                    [-13616656.252196932,6036732.96909078],
                    [-13616624.413413644,6036758.694251015],
                ]],
            },
            'properties': {
                'route': 'a',
                'name': 'Old Rainier Brewery Dr.',
                'order': 0,

                'asc_dir': 'Head North',
                'asc_icon': 'forward',
                'asc_tran_dir': 'Turn left',
                'asc_tran_icon': 'left',

                'dsc_dir': 'Head South',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media':'<iframe style="border: 0; width: 100%; height: 50px;" src="https://bandcamp.com/EmbeddedPlayer/album=1462003022/size=small/bgcol=333333/linkcol=2ebd35/artwork=none/track=2455122445/transparent=true/" seamless><a href="https://regionalattraction.bandcamp.com/album/shadows-light">Shadows &amp; Light by Wind❏ws</a></iframe>',
            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13616769.330308417,6036773.749069517],
                    [-13616769.570573734,6036738.663335189],
                    [-13616655.415436042,6036718.196383314],
                    [-13616654.447382022,6036708.112694637],
                    [-13616622.682020685,6036730.394112845],
                    [-13616624.061933165,6036758.909400782],
                ]],
            },
            'properties': {
                'route': 'a',
                'name': 'S Stevens St',
                'order': 1,

                'asc_dir': 'Head West',
                'asc_icon': 'forward',
                'asc_tran_dir': 'Turn right',
                'asc_tran_icon': 'right',

                'dsc_dir': 'Head East',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'Turn right',
                'dsc_tran_icon': 'right',

                'media-type': 'vid',
                'media': '<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/31122911?h=5708fc8e4d&autoplay=1&loop=1&color=CAC9E8&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100vw;height:auto;max-height:50vh;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13616725.080167754,6036730.629392092],
                    [-13616784.407239255,6036742.021774085],
                    [-13616780.646542171,6037238.455755829],
                    [-13616718.014129225,6037239.9330574125],
                ]],
            },
            'properties': {
                'route': 'a',
                'name': 'Airport Way S',
                'order': 2,

                'asc_dir': 'Head North',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head South',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'Turn left',
                'dsc_tran_icon': 'left',

                'media-type': 'img',
                'media': '<div style="width:100vw;height:50vh;padding-bottom:73%;position:relative;"><iframe src="https://giphy.com/embed/ncyIupJW3D8qs" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/halloween-mcdonalds-happy-meal-ncyIupJW3D8qs">via GIPHY</a></p>',
            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13618221.468956664,6040740.425829238],
                    [-13618221.468956664,6040694.775587578],
                    [-13618009.283377616,6040694.775587578],
                    [-13618009.283377616,6040740.425829238],
                ]],
            },
            'properties': {
                'route': 'b',
                'name': 'S Washington St',
                'order': 0,

                'asc_dir': 'Head East',
                'asc_icon': 'forward',
                'asc_tran_dir': 'Turn right',
                'asc_tran_icon': 'right',

                'dsc_dir': 'Head West',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'vid',
                'media': '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ZjMR8KU6YEc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13618132.169797894,6040740.425829238],
                    [-13618132.169797894,6040555.8131731255],
                    [-13618009.283377616,6040555.8131731255],
                    [-13618009.283377616,6040740.425829238],
                ]],
            },
            'properties': {
                'route': 'b',
                'name': 'Occidental Ave S',
                'order': 1,

                'asc_dir': 'Head South',
                'asc_icon': 'forward',
                'asc_tran_dir': 'Continue South',
                'asc_tran_icon': 'forward',

                'dsc_dir': 'Continue North',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'Turn left',
                'dsc_tran_icon': 'left',

                'media-type': 'img',
                'media': '<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/dFDWuV7gIMMINpDhmC" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/retro-digital-online-dFDWuV7gIMMINpDhmC">via GIPHY</a></p>',
            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13618132.169797894,6040596.711524497],
                    [-13618132.169797894,6040412.982899374],
                    [-13618009.283377616,6040412.982899374],
                    [-13618009.283377616,6040596.711524497],
                ]],
            },
            'properties': {
                'route': 'b',
                'name': 'Occidental Ave S',
                'order': 2,

                'asc_dir': 'Continue South',
                'asc_icon': 'forward',
                'asc_tran_dir': 'Turn left',
                'asc_tran_icon': 'left',

                'dsc_dir': 'Head North',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'Continue North',
                'dsc_tran_icon': 'forward',

                'media-type': 'img',
                'media': '<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/dFDWuV7gIMMINpDhmC" width="auto" height="50%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>',
            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13618132.169797894,6040455.573383794],
                    [-13618132.169797894,6040412.982899374],
                    [-13617642.79247341,6040412.982899374],
                    [-13617670.871720519,6040455.573383794],
                ]],
            },
            'properties': {
                'route': 'b',
                'name': 'S Jackson St',
                'order': 3,

                'asc_dir': 'Head East',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head West',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'Turn right',
                'dsc_tran_icon': 'right',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;">Original Music</a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;">SovietWave - Новые Дома</a></div>',
            }
        }
    ]
};

const styles = {
    'Polygon': new Style({
        stroke: new Stroke({
            color: 'rgba(0,255,0,0.5)',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(0,255,0,0.2)',
        }),
    }),
};

const styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};




// MAP SETUP ---------------------------------------------------------------------------------------


const view = new View({
    center: [0, 0],
    zoom: 19,
});

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    target: 'map',
    view: view,
});

map.on('postcompose',function(e){
    document.querySelector('canvas').style.filter="invert(87%)";
});

const box_v_layer = new VectorImg({
    source: new VectorSource({
        features: new GeoJSON().readFeatures(geojson_obj),
    }),
    visible: true,
    title: 'geojson',
    style: styleFunction,
});
map.addLayer(box_v_layer);


map.on('click', evt => {
    const coord = evt.coordinate;
    el('click_pos').innerText = coord;

    get_feature_at_coord(coord);
    serve();
});




// GENERAL UTILITY -------------------------------------------------------------------------

function el(id) {
    return document.getElementById(id);
}

function get_feature_at_coord(_coord) {
    var active_features_in_this_func = [];
    let pixel = map.getPixelFromCoordinate(_coord);
    console.log('pixel: ' + pixel);
    map.forEachFeatureAtPixel(pixel,
        (feat, layer) => {
            if (layer === box_v_layer){
                active_features_in_this_func.push(feat);
            }
        });
    set_active_route(active_features_in_this_func);
}



// GEOLOCATION TRACKING ---------------------------------------------------------------

const geolocation = new Geolocation({
    trackingOptions: {
        enableHighAccuracy: true,
    },
    projection: view.getProjection(),
    tracking: true,
});

const accuracyFeature = new Feature();
geolocation.on('change:accuracyGeometry', function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

const positionFeature = new Feature();
positionFeature.setStyle(
    new Style({
        image: new CircleStyle({
            radius: 6,
            fill: new Fill({
                color: '#3399CC',
            }),
            stroke: new Stroke({
                color: '#fff',
                width: 2,
            }),
        }),
    })
);

new VectorLayer({
    map: map,
    source: new VectorSource({
        features: [accuracyFeature, positionFeature],
    }),
});

geolocation.on('change', function () {
    const coord = geolocation.getPosition();
    el('position').innerText = String(coord);
    view.setCenter(coord);
    positionFeature.setGeometry(coord ? new Point(coord) : null);

    active_features = get_feature_at_coord(coord);
    set_active_route(active_features);
});

geolocation.on('error', function (error) {
    el('nav_txt').innerText = error.message;
});

function set_active_route(_active_feat){
    console.log("_active_feat received with length " + _active_feat.length)
    console.log("active route: " + active_route);
    if (active_route !== undefined){  // user has already been placed in a route
        if (_active_feat.length > 0) {
            if (_active_feat.length === 1) {
                var is_new_route = (active_route !== _active_feat[0]);
                if (is_new_route) { active_route = _active_feat[0]; }
                render_nav(active_route, is_ascending);
            } else {    // there are 2 possible route
                var next_route;
                is_ascending = _active_feat[0].get('order') < _active_feat[1].get('order');
                if (active_route === _active_feat[1]) {
                    is_ascending = !is_ascending
                    next_route = _active_feat[0];
                } else {
                    next_route = _active_feat[1];
                }
                render_tran_nav(active_route, next_route, is_ascending);
            }
        }
    } else {    // new user, no active route assigned yet
        if (_active_feat.length > 0) {
            if (_active_feat.length > 0) {
                if (_active_feat.length === 1) {
                    active_route = _active_feat[0];
                    render_nav(active_route, is_ascending);
                } else {    // _features.length === 2
                    // have user pick ?
                    var next_route;
                    if (_active_feat[0].get('order') > _active_feat[1].get('order')) {
                        active_route = _active_feat[1];
                        next_route = _active_feat[0];
                    } else {
                        active_route = _active_feat[0];
                        next_route = _active_feat[1];
                    }
                    render_tran_nav(active_route, next_route, is_ascending);
                }
            }
        } else {    // no active route, no active feature >> error
            el('show_media_button_section').style.display = "none";
            el('nav_txt').innerText = "You are current not on route, check out the map to get on a route.";
        }
    }
}


// MAP ROTATION ------------------------------------------------------------------------

const gn = new GyroNorm();

gn.init().then(function () {
    gn.start(function (event) {
        const center = view.getCenter();
        const resolution = view.getResolution();
        const beta = toRadians(event.do.beta);
        const gamma = toRadians(event.do.gamma);

        center[0] -= resolution * gamma * 25;
        center[1] += resolution * beta * 25;

        view.setCenter(center);
    });
});

// create a new device orientation object set to track the device
var deviceOrientation = new ol.DeviceOrientation({
    tracking: true
});
// when the device changes heading, rotate the view so that
// 'up' on the device points the direction we are facing
deviceOrientation.on('change:heading', onChangeHeading);
function onChangeHeading(event) {
    var heading = event.target.getHeading();
    console.log("heading changed: " + heading);
    view.setRotation(-heading);
}

// NAVIGATION DIRECTIONS ------------------------------------------------------------------------

function render_nav(_feat, _is_asc){
    var nav_content = '';
    var nav_icon = '';
    if (_is_asc) {
        nav_content = _feat.get('asc_dir') + ' on ' + _feat.get('name');
        nav_icon = _feat.get('asc_icon');
        console.log('nav_icon: ' + nav_icon);
    } else {
        nav_content = _feat.get('dsc_dir')+ ' on ' + _feat.get('name');
        nav_icon = _feat.get('dsc_icon');
        console.log('nav_icon: ' + nav_icon);
    }
    el('nav_txt').innerText = nav_content;
    el('nav-icon').src = 'js/ui/' + nav_icon + '.png';
    el('nav-icon').alt = nav_icon;
    serve();
}

function render_tran_nav(_feat, _next_feat, _is_asc){
    var nav_content = '';
    var nav_icon = '';
    if (_is_asc) {
        nav_content = _feat.get('asc_tran_dir') + ' on ' + _next_feat.get('name');
        nav_icon = _feat.get('asc_tran_icon');
    } else {
        nav_content = _feat.get('dsc_tran_dir') + ' on ' + _next_feat.get('name');
        nav_icon = _feat.get('dsc_tran_icon');
    }
    el('nav_txt').innerText = nav_content;
    el('nav-icon').src = './js/ui/' + nav_icon + '.png';
    el('nav-icon').alt = nav_icon;
    serve();
}

function serve(){
    if (active_route.get('media-type') === 'aud'){
        el('media-section').style.display = 'block';
        el('media-content').innerHTML = active_route.get('media');
    } else if (active_route.get('media-type') === 'vid') {
        el('media-section').style.display = 'block';
        el('media-content').innerHTML = active_route.get('media');
    } else if (active_route.get('media-type') === 'img') {
        el('media-section').style.display = 'block';
        el('media-content').innerHTML = active_route.get('media');
    }
}
