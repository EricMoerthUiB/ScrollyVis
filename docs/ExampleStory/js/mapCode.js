mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25lcnVpYiIsImEiOiJja2xjbGtyNWIxdXJvMnducGZhbWtyanhoIn0.edNKG90Wl-j4w7VSob5jkg';

export var maps = [];
export var mapSize = 1;function flyFromTo(p, from, to, map) {
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



export var map9= new mapboxgl.Map({
       container: 'map9',
       style: 'mapbox://styles/mapbox/dark-v10',
       minZoom: 3,
       maxZoom: 18,
       interactive: false,
       center: [31, -21],
       scrollZoom: false
});
map9.on('load', function () {
        new mapboxgl.Marker().setLngLat([31, -21]).addTo(map9);
        maps.push(map9);
});
export function map9Behaviour(p){
    alterMapZoom(p, 5, 10, map9);
}
