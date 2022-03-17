export var sketchfab = [];
export var sketchfabSize = 6;

function flyFromToSketch(p, posFrom, posTo, lookAtFrom, lookAtTo, api) {
    // let d = distance(from[0], from[1], to[0], to[1]);
    let delay = p < 0.2 ? 0 : p > 0.8 ? 1 : (p - 0.2) / (0.8 - 0.2);
    let pos = [posFrom[0] + (posTo[0] - posFrom[0]) * delay, posFrom[1] + (posTo[1] - posFrom[1]) * delay, posFrom[2] + (posTo[2] - posFrom[2]) * delay];
    let viewAt = [lookAtFrom[0] + (lookAtTo[0] - lookAtFrom[0]) * delay, lookAtFrom[1] + (lookAtTo[1] - lookAtFrom[1]) * delay, lookAtFrom[2] + (lookAtTo[2] - lookAtFrom[2]) * delay];
    api.setCameraLookAt(pos, viewAt, 0);
}

var iframesketch3 = document.getElementById('sketch3');
var uid = '90034cbe58904828a11429395cef9125';
var clientsketch3 = new Sketchfab(iframesketch3);
var clienAPIsketch3 = null;
clientsketch3.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch3 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch3.click();
                   clienAPIsketch3.setCameraLookAt([-132.05422046893688,604.1683423539171,154.54370678153168],[-62.139614480635174,-3125.15433667789,-1973.3661476942068], 0);
                   sketchfab.push(clienAPIsketch3);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch3Behaviour(p){}
export function sketch6Behaviour(p){
    flyFromToSketch(p, [-132.05422046893688,604.1683423539171,154.54370678153168], [-141.6918575039076,-151.13630170982333,-196.90589356567972]
,[-62.139614480635174,-3125.15433667789,-1973.3661476942068],[-3438.6455141563492,-2902.0367071990254,-255.04013658880896]
,clienAPIsketch3)
}
var iframesketch26 = document.getElementById('sketch26');
var uid = '90034cbe58904828a11429395cef9125';
var clientsketch26 = new Sketchfab(iframesketch26);
var clienAPIsketch26 = null;
clientsketch26.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch26 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch26.click();
                   clienAPIsketch26.setCameraLookAt([-141.6918575039108,-151.13630170982196,-196.90589356567583],[-3438.6455141563524,-2902.036707199024,-255.04013658880595], 0);
                   sketchfab.push(clienAPIsketch26);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch26Behaviour(p){}
export function sketch29Behaviour(p){
    flyFromToSketch(p, [-141.6918575039108,-151.13630170982196,-196.90589356567583], [-302.22655464771776,-292.80994668453513,-206.9725912327021]
,[-3438.6455141563524,-2902.036707199024,-255.04013658880595],[-566.9841338990027,-4578.387856612665,-140.17852404499746]
,clienAPIsketch26)
}
export function sketch13Behaviour(p){
    flyFromToSketch(p, [-302.22655464771776,-292.80994668453513,-206.9725912327021], [-340.519372044032,-1203.8934411683144,-405.5747961987613]
,[-566.9841338990027,-4578.387856612665,-140.17852404499746],[-197.67471214237804,-5489.971432050743,-628.8837849503583]
,clienAPIsketch26)
}
var iframesketch30 = document.getElementById('sketch30');
var uid = '90034cbe58904828a11429395cef9125';
var clientsketch30 = new Sketchfab(iframesketch30);
var clienAPIsketch30 = null;
clientsketch30.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch30 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch30.click();
                   clienAPIsketch30.setCameraLookAt([-340.51937204403305,-1203.8934411683122,-405.57479619876005],[-197.67471214238674,-5489.971432050741,-628.8837849503559], 0);
                   sketchfab.push(clienAPIsketch30);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch30Behaviour(p){}
export function sketch16Behaviour(p){
    flyFromToSketch(p, [-340.51937204403305,-1203.8934411683122,-405.57479619876005], [59.312604802281385,-1264.0573356234365,-449.68822959331936]
,[-197.67471214238674,-5489.971432050741,-628.8837849503559],[4345.152995208271,-1408.0785323355162,-222.60655241814638]
,clienAPIsketch30)
}
var iframesketch17 = document.getElementById('sketch17');
var uid = '90034cbe58904828a11429395cef9125';
var clientsketch17 = new Sketchfab(iframesketch17);
var clienAPIsketch17 = null;
clientsketch17.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch17 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch17.click();
                   clienAPIsketch17.setCameraLookAt([-340.4838170267658,-1168.6132173410533,-401.590583955077],[-325.36874405023593,-5437.878072242717,-864.067803412234], 0);
                   sketchfab.push(clienAPIsketch17);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch17Behaviour(p){}
export function sketch23Behaviour(p){
    flyFromToSketch(p, [-340.4838170267658,-1168.6132173410533,-401.590583955077], [-338.9672804506453,-2121.3840083231444,-418.72057250364185]
,[-325.36874405023593,-5437.878072242717,-864.067803412234],[-301.0257125950914,-6399.9789261494825,-54.13586105001218]
,clienAPIsketch17)
}
var iframesketch31 = document.getElementById('sketch31');
var uid = '90034cbe58904828a11429395cef9125';
var clientsketch31 = new Sketchfab(iframesketch31);
var clienAPIsketch31 = null;
clientsketch31.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch31 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch31.click();
                   clienAPIsketch31.setCameraLookAt([-340.51937204403896,-1203.8934411683058,-405.5747961987526],[-197.67471214239265,-5489.971432050734,-628.8837849503586], 0);
                   sketchfab.push(clienAPIsketch31);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch31Behaviour(p){}
export function sketch18Behaviour(p){
    flyFromToSketch(p, [-340.51937204403896,-1203.8934411683058,-405.5747961987526], [-755.560375098039,-1266.1040433369958,-430.68475235513125]
,[-197.67471214239265,-5489.971432050734,-628.8837849503586],[-5016.372483061913,-825.9601591749902,-126.56374500827991]
,clienAPIsketch31)
}
var iframesketch27 = document.getElementById('sketch27');
var uid = '90034cbe58904828a11429395cef9125';
var clientsketch27 = new Sketchfab(iframesketch27);
var clienAPIsketch27 = null;
clientsketch27.init(uid, {
   success: function onSuccess(api) {
            clienAPIsketch27 = api;
            api.start();
            api.addEventListener('viewerready', function () {
                   iframesketch27.click();
                   clienAPIsketch27.setCameraLookAt([-141.69185750390443,-151.13630170982287,-196.90589356567997],[-3438.6455141563497,-2902.036707199021,-255.04013658880478], 0);
                   sketchfab.push(clienAPIsketch27);
               })},
   camera: 0,
   ui_stop: 0,
   autostart: 1,
   ui_theme: "dark"});

export function sketch27Behaviour(p){}
export function sketch10Behaviour(p){
    flyFromToSketch(p, [-141.69185750390443,-151.13630170982287,-196.90589356567997], [-604.7344531759713,-265.55139114050337,-198.07724601090854]
,[-3438.6455141563497,-2902.036707199021,-255.04013658880478],[-4595.914120513527,-853.9212481282891,-1669.485353799459]
,clienAPIsketch27)
}
