mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25lcnVpYiIsImEiOiJja2xjbGtyNWIxdXJvMnducGZhbWtyanhoIn0.edNKG90Wl-j4w7VSob5jkg';

function easeTo(map) {
    map.easeTo({duration: 10000, zoom: 8});
}

var map10 = new mapboxgl.Map({
    container: 'map10',
    style: 'mapbox://styles/mapbox/dark-v10',
    minZoom: 3,
    maxZoom: 18,
    center: [15.662747, 78.179567],
    scrollZoom: false
});
map10.on('load', function () {
    (function mapLoop() {
        let opacity = parseInt(document.getElementById("map10").parentElement.style.opacity);
        if (isNaN(opacity) || opacity <= 0.95) {
            setTimeout(mapLoop, 100);
        } else {
            easeTo(map10);
        }
    })();


    $.ajax({
        type: "GET",
        url: "data/polarBearSightings.csv",
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });
});

function processData(data) {
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

    map10.addSource('importancePoints', geoData);

    map10.addLayer({
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

