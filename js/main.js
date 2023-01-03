//import {Map, View, Feature, Geolocation} from './ol';
// import GeoJSON from './ol/format/GeoJSON';
// import Point from './ol/geom/Point';
// import {Circle as CircleStyle, Fill, Stroke, Style} from './ol/style';
// import {OSM, Vector as VectorSource} from './ol/source';
// import {Tile as TileLayer, Vector as VectorLayer, VectorImage as VectorImg} from './ol/layer';
// import {fromCircle} from 'ol/geom/Polygon';

var Map                 = ol.Map;
var View                = ol.View;
var Feature             = ol.Feature;
var Geolocation         = ol.Geolocation;
var GeoJSON             = ol.format.GeoJSON;
var Point               = ol.geom.Point;
var CircleStyle         = ol.style.Circle;
var Fill                = ol.style.Fill;
var Stroke              = ol.style.Stroke;
var Style               = ol.style.Style;
var OSM                 = ol.source.OSM;
var VectorSource        = ol.source.Vector;
var TileLayer           = ol.layer.Tile;
var VectorLayer         = ol.layer.Vector;
var VectorImg           = ol.layer.VectorImage;

var active_route = undefined;
var active_features;
var is_ascending = true;
var served = false;

var current_media_route = undefined;
var current_media_order = undefined;


const circle_route_01 = ol.geom.Polygon.fromCircle(
    new ol.geom.Circle([-13616498.997187842, 6042863.7403398305], 100)
)


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
                'media': '<div style="width:100vw;height:auto;max-height:50vh;padding-bottom:73%;position:relative;"><iframe src="https://player.vimeo.com/video/31122911?h=5708fc8e4d&autoplay=1&loop=1&color=CAC9E8&title=0&byline=0&portrait=0" style="position:absolute" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
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
                'media': '<div style="width:100vw;height:auto;max-height:50vh;padding-bottom:73%;position:relative;"><iframe src="https://giphy.com/embed/ncyIupJW3D8qs" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/halloween-mcdonalds-happy-meal-ncyIupJW3D8qs">via GIPHY</a></p>',
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
                'media': '<div class="videoWrapper"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/KcvVR4NVYwk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
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
                'media': '<div style="width:100vw;height:auto;max-height:50vh;padding:2rem;">If we were able to take as the finest allegory of simulation the Borges tale where the cartographers of the Empire draw up a map so detailed that it ends up exactly covering the territory (but where, with the decline of the Empire this map becomes frayed and finally ruined, a few shreds still discernible in the deserts - the metaphysical beauty of this ruined abstraction, bearing witness to an imperial pride and rotting like a carcass, returning to the substance of the soil, rather as an aging double ends up being confused with the real thing), this fable would then have come full circle for us, and now has nothing but the discrete charm of second-order simulacra</div>',
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

                'media-type': 'vid',
                'media': '<div class="videoWrapper"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/cpa7KLeJJjQ" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
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
                'media': '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        // {   // Circle
        //     'type': 'Feature',
        //     'geometry': {
        //         'type': 'Polygon',
        //         'coordinates': [
        //             circle_route_01.getCoordinates()[0]
        //         ],
        //     },
        //     'properties': {
        //         'route': 'c',
        //         'name': 'E. Pike St.',
        //         'order': 0,
        //
        //         'asc_dir': 'Enter Cafe Vita',
        //         'asc_icon': 'forward',
        //         'asc_tran_dir': 'ud',
        //         'asc_tran_icon': 'ud',
        //
        //         'dsc_dir': 'Enter Cafe Vita',
        //         'dsc_icon': 'forward',
        //         'dsc_tran_dir': 'ud',
        //         'dsc_tran_icon': 'ud',
        //
        //         'media-type': 'aud',
        //         'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
        //     }
        // },
        {   // Cobblestone alley/street
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13617510.462279076,6043384.8578523054],
                    [-13617549.137532657,6043273.294620822],
                    [-13617478.62957036,6043315.837399761],
                ]],
            },
            'properties': {
                'route': 'd',
                'name': 'the cobblestone alley',
                'order': 0,

                'asc_dir': 'Continue on',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Continue on',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Old bus stop gazebo shelter
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13612735.67442037,6043624.401813754],
                    [-13612754.532030247,6043595.425486381],
                    [-13612704.168413624,6043571.96845946],
                    [-13612694.969579536,6043618.192600746],
                ]],
            },
            'properties': {
                'route': 'e',
                'name': 'the gazebo',
                'order': 0,

                'asc_dir': 'Enter',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Enter',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // El Rio Masonry Detail
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13612735.67442037,6043624.401813754],
                    [-13612754.532030247,6043595.425486381],
                    [-13612704.168413624,6043571.96845946],
                    [-13612694.969579536,6043618.192600746],
                ]],
            },
            'properties': {
                'route': 'e',
                'name': 'the gazebo',
                'order': 0,

                'asc_dir': 'Enter',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Enter',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Sculpture Park near Expedia
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13623044.88737729,6045109.779023631],
                    [-13623040.942548627,6045004.785891528],
                    [-13622998.459778413,6045025.1169315595],
                    [-13622995.425294826,6045072.7583238715],
                    [-13623019.39771516,6045124.3445448475],
                ]],
            },
            'properties': {
                'route': 'f',
                'name': 'the staircase',
                'order': 0,

                'asc_dir': 'Sit on',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Sit on',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Little Howe Park
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13620429.279183032,6046604.255172952],
                    [-13620430.822666027,6046463.798220351],
                    [-13620295.767903911,6046464.569961849],
                    [-13620294.224420914,6046598.852982467],
                ]],
            },
            'properties': {
                'route': 'g',
                'name': 'Little Howe Park',
                'order': 0,

                'asc_dir': 'Enter',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Enter',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Grassy green space with big trees by I/5
            // Boylston Ave E and E Hamlin St
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13616978.478793971,6048333.312282038],
                    [-13616972.060063979,6048120.327150491],
                    [-13616951.636832187,6048133.748131383],
                    [-13616916.042056778,6048437.179003723],
                ]],
            },
            'properties': {
                'route': 'h',
                'name': 'the grassy green space next to I/5',
                'order': 0,

                'asc_dir': 'Enter',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Enter',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Cement wall polygon #1
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13623017.288263552,6045820.113356535],
                    [-13623024.227720967,6045803.287458593],
                    [-13622957.50559556,6045790.902582991],
                    [-13622956.356566792,6045806.6517026005],
                ]],
            },
            'properties': {
                'route': 'i',
                'name': 'West Galer St Flyover',
                'order': 0,

                'asc_dir': 'Head west',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head East',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Cement wall polygon #2
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13623017.147036798,6045819.3215542773],
                    [-13623030.779018061,6045789.760908256],
                    [-13623028.172166968,6045767.3213550095],
                    [-13623028.18878126,6045767.028627016],
                    [-13623016.500345564,6045767.695812289],
                    [-13622999.752280513,6045815.8501909375],
                ]],
            },
            'properties': {
                'route': 'i',
                'name': 'the cement wall',
                'order': 1,

                'asc_dir': 'Walk across',
                'asc_icon': 'forward',
                'asc_tran_dir': 'Turn left',
                'asc_tran_icon': 'left',

                'dsc_dir': 'Walk across',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'Turn right',
                'dsc_tran_icon': 'right',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Cement wall polygon #3
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13623031.104171539,6045790.356016258],
                    [-13623028.27013913,6045766.9752488965],
                    [-13622949.625739826,6045772.6433137115],
                    [-13622949.271485774,6045784.687951443],
                ]],
            },
            'properties': {
                'route': 'i',
                'name': 'W Galer St',
                'order': 2,

                'asc_dir': 'Head east',
                'asc_icon': 'forward',
                'asc_tran_dir': 'Turn left',
                'asc_tran_icon': 'left',

                'dsc_dir': 'Head west',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'Turn right',
                'dsc_tran_icon': 'right',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // David Rodgers Park
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13621144.241467783,6048094.20287968],
                    [-13621146.34257836,6047974.439576811],
                    [-13621113.425179327,6047990.548091233],
                    [-13621020.976313954,6047924.012922972],
                    [-13620854.288208207,6047900.900706629],
                    [-13620852.187097631,6047938.0203268165],
                    [-13621006.014371566,6047959.037683148],
                    [-13621082.608890869,6048002.4543845],
                    [-13621069.301857216,6048052.180668147],
                ]],
            },
            'properties': {
                'route': 'j',
                'name': 'the pedestrian path',
                'order': 0,

                'asc_dir': 'Forward',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Forward',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'udt',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Alley from NE 48th St to NE 50th St
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13613137.655317388,6051286.481707302],
                    [-13613135.191061473,6051068.805768013],
                    [-13613103.155734558,6051068.805768013],
                    [-13613105.619990474,6051284.838870024],
                ]],
            },
            'properties': {
                'route': 'k',
                'name': 'the alley',
                'order': 0,

                'asc_dir': 'Head North',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head South',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Alley from 30th Ave NE to 27th Ave NE
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13614209.071281241,6051736.438651035],
                    [-13614207.542841136,6051702.048748677],
                    [-13613888.098859234,6051703.577188781],
                    [-13613890.39151939,6051737.202871087],
                ]],
            },
            'properties': {
                'route': 'l',
                'name': 'the alley',
                'order': 0,

                'asc_dir': 'Head North',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head South',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Alley between 36th Ave NE and 37th Ave NE
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13613139.26811645,6050910.409229135],
                    [-13613133.136932034,6050735.434658465],
                    [-13613103.42426909,6050743.452361165],
                    [-13613104.36752823,6050908.051081282],
                ]],
            },
            'properties': {
                'route': 'm',
                'name': 'the alley',
                'order': 0,

                'asc_dir': 'Head North',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head South',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Olive way and Melrose Ave
            // Grassy I/5 entrance triangle
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13617510.412448747,6043399.658141944],
                    [-13617556.588068342,6043267.624729665],
                    [-13617473.255504854,6043316.325578457],
                ]],
            },
            'properties': {
                'route': 'n',
                'name': 'the grassy triagle by I/5 triangle',
                'order': 0,

                'asc_dir': 'Enter',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Enter',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Old stairway connecting 2nd Ave N to Highland Dr
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13620251.563216716,6045479.0135424],
                    [-13620253.690459084,6045426.541564006],
                    [-13620238.563402249,6045428.196085847],
                    [-13620237.85432146,6045478.540821874],
                ]],
            },
            'properties': {
                'route': 'o',
                'name': 'the old stairway',
                'order': 0,

                'asc_dir': 'Head North',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head South',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Dr Blanche Lavizzo Park
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13614835.50447619,6040764.499551332],
                    [-13614845.009284312,6040733.332622377],
                    [-13614804.779631333,6040735.100958771],
                    [-13614805.663799532,6040766.046845677],
                ]],
            },
            'properties': {
                'route': 'p',
                'name': 'path along the amphitheater',
                'order': 0,

                'asc_dir': 'Forward',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Forward',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Brick stairway at the Seattle Central College
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13616828.935093049,6043214.181244548],
                    [-13616826.005523741,6043200.021659557],
                    [-13616771.320229981,6043199.533398005],
                    [-13616773.029145412,6043213.4488522215],
                ]],
            },
            'properties': {
                'route': 'q',
                'name': 'the brick stairway',
                'order': 0,

                'asc_dir': 'Head East',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head West',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Public stair sitting area outside Seattle Courthouse
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13618477.4758475,6043038.288984778],
                    [-13618490.254387286,6043010.247189135],
                    [-13618400.094689902,6042929.316437153],
                    [-13618320.583775679,6043019.121175098],
                    [-13618366.728502685,6043030.834836569],
                    [-13618403.644284291,6043070.235334245],
                    [-13618413.938108008,6043055.327037827],
                    [-13618385.186393488,6043030.834836569],
                    [-13618424.231931726,6042984.335150124],
                    [-13618477.83080694,6043039.353863093],
                ]],
            },
            'properties': {
                'route': 'r',
                'name': 'the staircase outside the courthouse',
                'order': 0,

                'asc_dir': 'Walk',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Walk',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Thomas St and 8th Ave N
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13619001.603362441,6044026.580683811],
                    [-13619004.608342148,6044001.28877127],
                    [-13618941.002938332,6044001.789601221],
                    [-13618941.503768284,6044025.579023909],
                ]],
            },
            'properties': {
                'route': 's',
                'name': 'Thomas St.',
                'order': 0,

                'asc_dir': 'Head East',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head West',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Ancient wooden garage
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13614279.097286845,6045745.214346897],
                    [-13614279.333647108,6045710.233027968],
                    [-13614200.152958993,6045706.923984285],
                    [-13614197.789356362,6045743.559825055],
                ]],
            },
            'properties': {
                'route': 't',
                'name': 'toward Ancient wooden garage',
                'order': 0,

                'asc_dir': 'Head',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
        {   // Pedestrian section of Interlochen Trail/street
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-13615384.44028027,6046723.516455431],
                    [-13615346.389461588,6046586.981164868],
                    [-13615346.389461588,6046461.637291565],
                    [-13615299.3855091,6046448.207590854],
                    [-13615204.258462396,6046556.764338269],
                    [-13615047.578620767,6046481.781842631],
                    [-13614992.740676196,6046490.734976439],
                    [-13615204.258462396,6046607.125715935],
                    [-13615313.934351537,6046499.688110246],
                    [-13615297.147225648,6046604.887432483],
                    [-13615336.317186056,6046717.920746801],
                ]],
            },
            'properties': {
                'route': 'u',
                'name': 'Interlochen Trail',
                'order': 0,

                'asc_dir': 'Head North',
                'asc_icon': 'forward',
                'asc_tran_dir': 'ud',
                'asc_tran_icon': 'ud',

                'dsc_dir': 'Head South',
                'dsc_icon': 'forward',
                'dsc_tran_dir': 'ud',
                'dsc_tran_icon': 'ud',

                'media-type': 'aud',
                'media': '<iframe width="100%" height="166" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/599169165&color=%239c9c7c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-originalmusic" title="Original Music" target="_blank" style="color: #cccccc; text-decoration: none;"></a> · <a href="https://soundcloud.com/user-originalmusic/sovietwave-novye-doma" title="SovietWave - Новые Дома" target="_blank" style="color: #cccccc; text-decoration: none;"></a></div>',
            }
        },
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
    el('show_media_button_section').style.display = "block";
    if (active_route !== undefined){  // user has already been placed in a route
        if (_active_feat.length > 0) {
            if (_active_feat.length === 1) {
                var is_new_route = (active_route !== _active_feat[0]);
                if (is_new_route) {
                    active_route = _active_feat[0];
                    render_nav(active_route, is_ascending);
                }
            } else {    // there are 2 possible route
                var next_route;
                is_ascending = _active_feat[0].get('order') < _active_feat[1].get('order');
                if (active_route === _active_feat[1]) {
                    is_ascending = !is_ascending;
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
var deviceOrientation = new ol.DeviceOrientation(
    {
        tracking: true
    });
// when the device changes heading, rotate the view so that
// 'up' on the device points the direction we are facing
deviceOrientation.on('change:heading', onChangeHeading);
function onChangeHeading(event)
{
    var heading = event.target.getHeading();
    console.log("heading changed: " + heading);
    view.setRotation(-heading);
}

// NAVIGATION DIRECTIONS ------------------------------------------------------------------------

function render_nav(_feat, _is_asc){
    var nav_content = '';
    var nav_icon = '';
    if (_is_asc)
    {
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

function render_tran_nav(_feat, _next_feat, _is_asc)
{
    var nav_content = '';
    var nav_icon = '';
    if (_is_asc)
    {
        nav_content = _feat.get('asc_tran_dir') + ' on ' + _next_feat.get('name');
        nav_icon = _feat.get('asc_tran_icon');
    } else {
        nav_content = _feat.get('dsc_tran_dir') + ' on ' + _next_feat.get('name');
        nav_icon = _feat.get('dsc_tran_icon');
    }
    el('nav_txt').innerText = nav_content;
    el('nav-icon').src = './js/ui/' + nav_icon + '.png';
    el('nav-icon').alt = nav_icon;
}

function serve()
{
    if (current_media_order !== active_route.get('order') || current_media_route !== active_route.get('route'))
    {
        el('media-section').style.display = 'block';
        el('media-content').innerHTML = active_route.get('media');
        current_media_route = active_route.get('route');
        current_media_order = active_route.get('order');
    }
}
