mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25lcnVpYiIsImEiOiJja2xjbGtyNWIxdXJvMnducGZhbWtyanhoIn0.edNKG90Wl-j4w7VSob5jkg';

export var maps = [];
export var mapSize = 2;function flyFromTo(p, from, to, map) {
    // let d = distance(from[0], from[1], to[0], to[1]);
    let delay = p < 0.2 ? 0 : p > 0.8 ? 1 : (p-0.2)/(0.8-0.2);
    let zoom = 10 - (sinRamp(delay) *3);
    let pos = [from[0] + (to[0] - from[0]) * delay, from[1] + (to[1] - from[1]) * delay];
    map.setZoom(zoom);
    map.setCenter(pos);
}

function alterMapZoom(p, zoomFrom, zoomTo, map) {
    let np = p < 0.5 ? 2 * p : 1;
    map.setZoom(zoomFrom + (zoomTo - zoomFrom) * np);
}
// Ramp InOut without Platou
//   /\
// /   \
function sinRamp(p) {
    return p > 0.5 ? 1-(2*(p-0.5)) : 2 * p;
}



export var map10= new mapboxgl.Map({
       container: 'map10',
       style: 'mapbox://styles/mapbox/dark-v10',
       minZoom: 3,
       maxZoom: 18,
       interactive: false,
       center: [15.63333, 78.21667],
       scrollZoom: false
});
map10.on('load', function () {
        new mapboxgl.Marker().setLngLat([15.63333, 78.21667]).addTo(map10);
        maps.push(map10);
    $.ajax({
        type: "GET",
        url: "data/polarBearSightings.csv",
        dataType: "text",
        success: function (data) {
            processData(data, map58);
        }
    });
});
export function map10Behaviour(p){
    alterMapZoom(p, 5, 10, map10);
}


export var map58= new mapboxgl.Map({
       container: 'map58',
       style: 'mapbox://styles/mapbox/dark-v10',
       minZoom: 3,
       maxZoom: 18,
       interactive: false,
       center: [15.63333, 78.21667],
       scrollZoom: false
});
map58.on('load', function () {
        new mapboxgl.Marker().setLngLat([15.63333, 78.21667]).addTo(map58);
        maps.push(map58);
    $.ajax({
        type: "GET",
        url: "data/polarBearSightings.csv",
        dataType: "text",
        success: function (data) {
            processData(data, map58);
        }
    });
});
export function map58Behaviour(p){
    alterMapZoom(p, 10, 4, map58);
}


function processData(data, map) {
    var csvData = $.csv.toArrays(data);

    var geoData = {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    };
    csvData.forEach(line => {
        geoData.data.features.push({
            "type": "Feature",
            "properties": {"id": csvData.indexOf(line), "mag": 20},
            "geometry": {"type": "Point", "coordinates": [line[0].split(";")[0], line[0].split(";")[1]]}
        })
    });

    map.addSource('importancePoints', geoData);

    map.addLayer({
        id: 'importance-heat',
        type: 'heatmap',
        source: 'importancePoints',
        maxzoom: 20,
        paint: {
            'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                0,
                0,
                6,
                1
            ],
            'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                9,
                3
            ],
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(0,0,0,0)',
                0.2,
                '#440154',
                0.4,
                '#39568C',
                0.6,
                '#1F968B',
                0.8,
                '#73D055',
                1,
                '#FDE725'
            ],
            'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                2,
                9,
                20
            ],
            'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                7,
                1,
                9,
                0
            ]
        }
    });
}

