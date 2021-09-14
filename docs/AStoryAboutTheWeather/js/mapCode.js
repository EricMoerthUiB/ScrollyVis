mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25lcnVpYiIsImEiOiJja2xjbGtyNWIxdXJvMnducGZhbWtyanhoIn0.edNKG90Wl-j4w7VSob5jkg';

export var maps = [];
export var mapSize = 5;

function flyFromTo(p, from, to, map) {
    // let d = distance(from[0], from[1], to[0], to[1]);
    let delay = p < 0.2 ? 0 : p > 0.8 ? 1 : (p - 0.2) / (0.8 - 0.2);
    let zoom = 10 - (sinRamp(delay) * 3);
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
    return p > 0.5 ? 1 - (2 * (p - 0.5)) : 2 * p;
}


export var map40 = new mapboxgl.Map({
    container: 'map40',
    style: 'mapbox://styles/mapbox/dark-v10',
    minZoom: 3,
    maxZoom: 18,
    interactive: false,
    center: [-84.1557, 31.5782],
    scrollZoom: false
});
map40.on('load', function () {
    new mapboxgl.Marker().setLngLat([-84.1557, 31.5782]).addTo(map40);
    maps.push(map40);
    $.ajax({
        type: "GET",
        url: "data/stormData.json",
        dataType: "json",
        success: function (data) {
            processDataDBZ(data, map40);
        }
    });
});

export function map40Behaviour(p) {
    alterMapZoom(p, 5, 10, map40);
}


export var map41 = new mapboxgl.Map({
    container: 'map41',
    style: 'mapbox://styles/mapbox/dark-v10',
    minZoom: 3,
    maxZoom: 18,
    interactive: false,
    center: [-84.1557, 31.5782],
    zoom: 10,
    scrollZoom: false
});
map41.on('load', function () {
    new mapboxgl.Marker().setLngLat([-83.6536, 31.706]).addTo(map41);
    new mapboxgl.Marker().setLngLat([-84.1557, 31.5782]).addTo(map41);
    maps.push(map41);
    $.ajax({
        type: "GET",
        url: "data/stormData.json",
        dataType: "json",
        success: function (data) {
            processDataDBZ(data, map41);
        }
    });
});

export function map41Behaviour(p) {
    flyFromTo(p, [-84.1557, 31.5782], [-83.6536, 31.706], map41)
}


export var map17 = new mapboxgl.Map({
    container: 'map17',
    style: 'mapbox://styles/mapbox/dark-v10',
    minZoom: 3,
    maxZoom: 18,
    interactive: false,
    center: [-83.6536, 31.706],
    zoom: 10,
    scrollZoom: false
});
map17.on('load', function () {
    new mapboxgl.Marker().setLngLat([-81.0998, 32.0835]).addTo(map17);
    new mapboxgl.Marker().setLngLat([-83.6536, 31.706]).addTo(map17);
    maps.push(map17);
    $.ajax({
        type: "GET",
        url: "data/stormData.json",
        dataType: "json",
        success: function (data) {
            processDataDBZ(data, map17);
        }
    });
});

export function map17Behaviour(p) {
    flyFromTo(p, [-83.6536, 31.706], [-81.0998, 32.0835], map17)
}


export var map42 = new mapboxgl.Map({
    container: 'map42',
    style: 'mapbox://styles/mapbox/dark-v10',
    minZoom: 3,
    maxZoom: 18,
    interactive: false,
    center: [-81.0998, 32.0835],
    zoom: 10,
    scrollZoom: false
});
map42.on('load', function () {
    new mapboxgl.Marker().setLngLat([-84.1557, 31.5782]).addTo(map42);
    new mapboxgl.Marker().setLngLat([-81.0998, 32.0835]).addTo(map42);
    maps.push(map42);
    $.ajax({
        type: "GET",
        url: "data/stormData.json",
        dataType: "json",
        success: function (data) {
            processDataHail(data, map42);
        }
    });
});

export function map42Behaviour(p) {
    flyFromTo(p, [-81.0998, 32.0835], [-84.1557, 31.5782], map42)
}


export var map21 = new mapboxgl.Map({
    container: 'map21',
    style: 'mapbox://styles/mapbox/dark-v10',
    minZoom: 3,
    maxZoom: 18,
    interactive: false,
    center: [-84.1557, 31.5782],
    zoom: 10,
    scrollZoom: false
});
map21.on('load', function () {
    new mapboxgl.Marker().setLngLat([-81.0998, 32.0835]).addTo(map21);
    new mapboxgl.Marker().setLngLat([-84.1557, 31.5782]).addTo(map21);
    maps.push(map21);
    $.ajax({
        type: "GET",
        url: "data/stormData.json",
        dataType: "json",
        success: function (data) {
            processDataHail(data, map21);
        }
    });
});

export function map21Behaviour(p) {
    flyFromTo(p, [-84.1557, 31.5782], [-81.0998, 32.0835], map21)
}


function processDataDBZ(data, map) {
    var geojson = {
        'type': 'geojson', 'data': {
            "type": "FeatureCollection",
            "features": []
        }
    };


    Object.keys(data.series).forEach(index => {
        data.series[index].forEach(data => {
            geojson.data.features.push({
                    "type": "Feature",
                    "properties": {"hail": parseFloat(data.hail_mass), "dbz": parseFloat(data.max_dbz)},
                    "geometry": JSON.parse(data.geo_json)
                }
            );
        });
    });
    map.addSource('storm', geojson);

    map.addLayer({
        'id': 'storm',
        'type': 'fill',
        'source': 'storm',
        'layout': {},
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'dbz'],
                30,
                'rgba(0,0,0,0)',
                39,
                '#76B7E5',
                48.5,
                '#8295CC',
                58,
                '#956CAF',
                67.5,
                '#AB4B9D',
                77,
                '#BD1F63'
            ],
            'fill-opacity': 0.6,
            // 'fill-outline-color': 'rgba(0,0,0,0)'
        }
    });
}

function processDataHail(data, map) {
    var geojson = {
        'type': 'geojson', 'data': {
            "type": "FeatureCollection",
            "features": []
        }
    };

    var max = 0;
    Object.keys(data.series).forEach(index => {
        data.series[index].forEach(data => {
            if (max < parseFloat(data.hail_mass)) {
                max = parseFloat(data.hail_mass);
            }
            geojson.data.features.push({
                    "type": "Feature",
                    "properties": {"hail": parseFloat(data.hail_mass), "dbz": parseFloat(data.max_dbz)},
                    "geometry": JSON.parse(data.geo_json)
                }
            );
        });
    });
    map.addSource('storm', geojson);

    map.addLayer({
        'id': 'storm',
        'type': 'fill',
        'source': 'storm',
        'layout': {},
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'hail'],
                0,
                'rgba(0,0,0,0)',
                2.4,
                '#ECEEEE',
                4.8,
                '#96C2D1',
                7.2,
                '#3B8ABD',
                9.6,
                '#1256A6',
                12,
                '#29338E'
            ],
            'fill-opacity': 0.8,
            // 'fill-outline-color': 'rgba(0,0,0,0)'
        }
    });
}
