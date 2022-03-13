export var sketchfab = [];
export var sketchfabSize = 3;

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
                   clienAPIsketch3.setCameraLookAt([-4852.88961599782,3182.674001318183,219.58991666579004],[-1821.054414305839,94.25357035513451,583.4680852875551], 0);
                   sketchfab.push(clienAPIsketch3);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch3Behaviour(p){}
export function sketch5Behaviour(p){
    flyFromToSketch(p, [-4852.88961599782,3182.674001318183,219.58991666579004], [-976.7589699878425,-908.9339792060007,15798.279432977168]
,[-1821.054414305839,94.25357035513451,583.4680852875551],[-977.9329797107806,-666.0519025493954,337.0173286625338]
,clienAPIsketch3)
}
var iframesketch13 = document.getElementById('sketch13');
var uid = '809c5fb7bc4845c7aaab1444c92c70df';
var clientsketch13 = new Sketchfab(iframesketch13);
var clienAPIsketch13 = null;
clientsketch13.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch13 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch13.click();
                   clienAPIsketch13.setCameraLookAt([-976.7582674556814,-909.0793208214434,15798.277149741947],[-977.9322771786215,-666.1972441648383,337.0150454273155], 0);
                   sketchfab.push(clienAPIsketch13);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch13Behaviour(p){}
export function sketch14Behaviour(p){
    flyFromToSketch(p, [-976.7582674556814,-909.0793208214434,15798.277149741947], [-1579.1316473657205,-3186.6555708105416,1152.7562114034376]
,[-977.9322771786215,-666.1972441648383,337.0150454273155],[-819.0243907521979,-1414.7340088555488,4.986518784280538]
,clienAPIsketch13)
}
var iframesketch15 = document.getElementById('sketch15');
var uid = '809c5fb7bc4845c7aaab1444c92c70df';
var clientsketch15 = new Sketchfab(iframesketch15);
var clienAPIsketch15 = null;
clientsketch15.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch15 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch15.click();
                   clienAPIsketch15.setCameraLookAt([-976.7582674556772,-909.0793208214434,15798.277149741949],[-977.9322771786213,-666.1972441648383,337.01504542731567], 0);
                   sketchfab.push(clienAPIsketch15);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch15Behaviour(p){}
export function sketch16Behaviour(p){
    flyFromToSketch(p, [-976.7582674556772,-909.0793208214434,15798.277149741949], [-2850.108856393452,-3394.6091078273485,2839.281699547647]
,[-977.9322771786213,-666.1972441648383,337.01504542731567],[1455.118437239099,-1406.995475428093,986.7090922628115]
,clienAPIsketch15)
}
export function sketch19Behaviour(p){
    flyFromToSketch(p, [-2850.108856393452,-3394.6091078273485,2839.281699547647], [1057.6313270761802,-1348.0985757325745,1090.0414482448793]
,[1455.118437239099,-1406.995475428093,986.7090922628115],[1455.118437239099,-1406.995475428093,986.7090922628115]
,clienAPIsketch15)
}
