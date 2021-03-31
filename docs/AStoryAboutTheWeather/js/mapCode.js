mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25lcnVpYiIsImEiOiJja2xjbGtyNWIxdXJvMnducGZhbWtyanhoIn0.edNKG90Wl-j4w7VSob5jkg';

function easeTo(map) {
    map.easeTo({duration: 10000, zoom: 8});
}

var map33 = new mapboxgl.Map({
    container: 'map33',
    style: 'mapbox://styles/mapbox/dark-v10',
    minZoom: 3,
    maxZoom: 18,
    center: [-82.701982, 32.046915],
    scrollZoom: false
});
map33.on('load', function () {
    (function mapLoop() {
        let opacity = parseInt(document.getElementById("map33").parentElement.style.opacity);
        if (isNaN(opacity) || opacity <= 0.95) {
            setTimeout(mapLoop, 100);
        } else {
            easeTo(map33);
        }
    })();
    $.ajax({
        type: "GET",
        url: "data/stormData.json",
        dataType: "json",
        success: function (data) {
            processDataDBZ(data, map33);
        }
    });
});
var map51 = new mapboxgl.Map({
    container: 'map51',
    style: 'mapbox://styles/mapbox/dark-v10',
    minZoom: 3,
    maxZoom: 18,
    center: [-82.701982, 32.046915],
    scrollZoom: false
});
map51.on('load', function () {
    (function mapLoop() {
        let opacity = parseInt(document.getElementById("map51").parentElement.style.opacity);
        if (isNaN(opacity) || opacity <= 0.95) {
            setTimeout(mapLoop, 100);
        } else {
            easeTo(map51);
        }
    })();
    $.ajax({
        type: "GET",
        url: "data/stormData.json",
        dataType: "json",
        success: function (data) {
            processDataHail(data, map51);
        }
    });
});

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
                ['get','dbz'],
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
            if(max < parseFloat(data.hail_mass)){
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
                ['get','hail'],
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
