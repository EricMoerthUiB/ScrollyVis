export var sketchfab = [];
export var sketchfabSize = 2;

function flyFromToSketch(p, posFrom, posTo, lookAtFrom, lookAtTo, api) {
    // let d = distance(from[0], from[1], to[0], to[1]);
    let delay = p < 0.2 ? 0 : p > 0.8 ? 1 : (p - 0.2) / (0.8 - 0.2);
    let pos = [posFrom[0] + (posTo[0] - posFrom[0]) * delay, posFrom[1] + (posTo[1] - posFrom[1]) * delay, posFrom[2] + (posTo[2] - posFrom[2]) * delay];
    let viewAt = [lookAtFrom[0] + (lookAtTo[0] - lookAtFrom[0]) * delay, lookAtFrom[1] + (lookAtTo[1] - lookAtFrom[1]) * delay, lookAtFrom[2] + (lookAtTo[2] - lookAtFrom[2]) * delay];
    api.setCameraLookAt(pos, viewAt, 0);
}

var iframesketch3 = document.getElementById('sketch3');
var uid = '809c5fb7bc4845c7aaab1444c92c70df';
var clientsketch3 = new Sketchfab(iframesketch3);
var clienAPIsketch3 = null;
clientsketch3.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch3 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch3.click();
                   clienAPIsketch3.setCameraLookAt([-5399.039866599593,3679.0206218632165,871.9562464105525],[-795.0471744626453,-21.774396513927126,-290.48100002357666], 0);
                   sketchfab.push(clienAPIsketch3);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch3Behaviour(p){}
export function sketch4Behaviour(p){
    flyFromToSketch(p, [-5399.039866599593,3679.0206218632165,871.9562464105525], [-900.4532036818575,-913.8994458953455,18500.39566691361]
,[-795.0471744626453,-21.774396513927126,-290.48100002357666],[-625.8837890625,-909.3023681640625,1019.7519073486328]
,clienAPIsketch3)
}
export function sketch7Behaviour(p){
    flyFromToSketch(p, [-900.4532036818575,-913.8994458953455,18500.39566691361], [-10478.518052568676,-1130.3319365671273,1850.4080326175795]
,[-625.8837890625,-909.3023681640625,1019.7519073486328],[-625.8837890625,-909.3023681640625,1019.7519073486328]
,clienAPIsketch3)
}
export function sketch9Behaviour(p){
    flyFromToSketch(p, [-10478.518052568676,-1130.3319365671273,1850.4080326175795], [8788.88009767231,-1504.960466583836,2264.4681456360527]
,[-625.8837890625,-909.3023681640625,1019.7519073486328],[-86.61979102604127,-785.889602292809,142.932116743681]
,clienAPIsketch3)
}
export function sketch12Behaviour(p){
    flyFromToSketch(p, [8788.88009767231,-1504.960466583836,2264.4681456360527], [-2315.0440088225178,-3773.8521786076963,1098.1374012940491]
,[-86.61979102604127,-785.889602292809,142.932116743681],[-524.077699714168,-609.3920258254699,-70.1646294621396]
,clienAPIsketch3)
}
export function sketch14Behaviour(p){
    flyFromToSketch(p, [-2315.0440088225178,-3773.8521786076963,1098.1374012940491], [952.7403658108851,-3012.159186451805,971.1248597462688]
,[-524.077699714168,-609.3920258254699,-70.1646294621396],[2475.939204215705,-1975.9526551888785,616.3346030487344]
,clienAPIsketch3)
}
var iframesketch18 = document.getElementById('sketch18');
var uid = '8c4edcffd06a420aa64f16360980c6e1';
var clientsketch18 = new Sketchfab(iframesketch18);
var clienAPIsketch18 = null;
clientsketch18.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch18 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch18.click();
                   clienAPIsketch18.setCameraLookAt([-88.03234091793925,-45.49068481510968,33.50502903158247],[-16.4046552883,1.697001653,-14.1716008681], 0);
                   sketchfab.push(clienAPIsketch18);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch18Behaviour(p){}
export function sketch20Behaviour(p){
    flyFromToSketch(p, [-88.03234091793925,-45.49068481510968,33.50502903158247], [34.006830815458905,-45.77749791669365,-3.604587553959279]
,[-16.4046552883,1.697001653,-14.1716008681],[45.37452976339997,5.127215557900006,-15.769309222600002]
,clienAPIsketch18)
}
export function sketch22Behaviour(p){
    flyFromToSketch(p, [34.006830815458905,-45.77749791669365,-3.604587553959279], [-45.763350528118195,-12.114960349579546,66.25265108565955]
,[45.37452976339997,5.127215557900006,-15.769309222600002],[-45.732577465336966,-10.23669648809913,-53.32755150283777]
,clienAPIsketch18)
}
