export var sketchfab = [];
export var sketchfabSize = 3;

function flyFromToSketch(p, posFrom, posTo, lookAtFrom, lookAtTo, api) {
    // let d = distance(from[0], from[1], to[0], to[1]);
    let delay = p < 0.2 ? 0 : p > 0.8 ? 1 : (p - 0.2) / (0.8 - 0.2);
    let pos = [posFrom[0] + (posTo[0] - posFrom[0]) * delay, posFrom[1] + (posTo[1] - posFrom[1]) * delay, posFrom[2] + (posTo[2] - posFrom[2]) * delay];
    let viewAt = [lookAtFrom[0] + (lookAtTo[0] - lookAtFrom[0]) * delay, lookAtFrom[1] + (lookAtTo[1] - lookAtFrom[1]) * delay, lookAtFrom[2] + (lookAtTo[2] - lookAtFrom[2]) * delay];
    api.setCameraLookAt(pos, viewAt, 0);
}

var iframesketch4 = document.getElementById('sketch4');
var uid = 'd003d9631fed4dcaabac0bc991ac3857';
var clientsketch4 = new Sketchfab(iframesketch4);
var clienAPIsketch4 = null;
clientsketch4.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch4 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch4.click();
                   clienAPIsketch4.setCameraLookAt([-168.5133841749108,92.25624128126074,-1.9764073437646754],[-53.10894847899804,-76.75799901202575,0.00231650039070711], 0);
                   sketchfab.push(clienAPIsketch4);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch4Behaviour(p){}
export function sketch5Behaviour(p){
    flyFromToSketch(p, [-168.5133841749108,92.25624128126074,-1.9764073437646754], [-60.16544629771069,-17.217170667364726,45.33182207388136]
,[-53.10894847899804,-76.75799901202575,0.00231650039070711],[-61.38121240789676,-83.74023210390814,28.92032918397791]
,clienAPIsketch4)
}
var iframesketch14 = document.getElementById('sketch14');
var uid = 'd003d9631fed4dcaabac0bc991ac3857';
var clientsketch14 = new Sketchfab(iframesketch14);
var clienAPIsketch14 = null;
clientsketch14.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch14 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch14.click();
                   clienAPIsketch14.setCameraLookAt([-35.53140565666996,125.4139989700151,-19.968298816160637],[-53.10894847899999,-76.75799901200001,0.0023165003999992572], 0);
                   sketchfab.push(clienAPIsketch14);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch14Behaviour(p){}
export function sketch15Behaviour(p){
    flyFromToSketch(p, [-35.53140565666996,125.4139989700151,-19.968298816160637], [-34.77561530698842,-48.08737627791858,-2.7970180807134697]
,[-53.10894847899999,-76.75799901200001,0.0023165003999992572],[-37.23514131412053,-78.0471050153831,0.14532347983125252]
,clienAPIsketch14)
}
var iframesketch20 = document.getElementById('sketch20');
var uid = 'd003d9631fed4dcaabac0bc991ac3857';
var clientsketch20 = new Sketchfab(iframesketch20);
var clienAPIsketch20 = null;
clientsketch20.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch20 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch20.click();
                   clienAPIsketch20.setCameraLookAt([-93.33162011588888,116.32460653092946,54.660398789706306],[-53.10894847899998,-76.75799901200006,0.0023165003999875014], 0);
                   sketchfab.push(clienAPIsketch20);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch20Behaviour(p){}
export function sketch21Behaviour(p){
    flyFromToSketch(p, [-93.33162011588888,116.32460653092946,54.660398789706306], [19.829811943577923,-47.320631552385336,39.557708022317144]
,[-53.10894847899998,-76.75799901200006,0.0023165003999875014],[-24.32584784494798,-115.23794926162469,18.881567042529873]
,clienAPIsketch20)
}
