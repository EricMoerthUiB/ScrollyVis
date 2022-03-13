import * as LoadData from "./loadData.js";
import * as MAP from "./mapCode.js";
import * as SKETCHFAB from "./sketchfab.js";
import * as RENDER from "./volume-render.js";

var _camera;

export function getInstances(camera){
     _camera = camera;
     let instances = [];
     var id = -1;
     let once = [];
     let predecessor = {};
     let listenerRemover = {};
     let zoom = [];
     let factor = 1;
     let factors = [];
     once[id] = false;
     let start;
     let pred11 = [17,16,15,12,9,8,13,14,11,10];
     predecessor[1] = 1/15;
     start = 1;

    once[1] = false;
    instances[1] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c3") !== null) document.getElementById("c3").classList.remove("active");
            document.getElementById("3").style.zIndex = "-1";
        } else {
            if(document.getElementById("c3") !== null) document.getElementById("c3").classList.add("active");
            document.getElementById("3").style.zIndex = "1";
            if(p < 1) document.getElementById("3").style.opacity = rampIn(p);
            if (p< 1) SKETCHFAB.sketch3Behaviour(p);
        }
        if (p === 1 && !once[1]) {
            factors[1] = factor;
            predecessor[2] = predecessor[1] + factor /15;
            listenerRemover[2] = uos(predecessor[1] , predecessor[1] + factor /15, p => instances[2](p));
            once[1] = true;
        }
    };
    once[2] = false;
    instances[2] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c4") !== null) document.getElementById("c4").classList.remove("active");
            document.getElementById("4").style.zIndex = "-1";
        } else {
            if(document.getElementById("c4") !== null) document.getElementById("c4").classList.add("active");
            document.getElementById("4").style.zIndex = "2";
            document.getElementById("4").style.opacity = ramp(p);
        }
        if (p === 1 && !once[2]) {
            factors[2] = factor;
            predecessor[3] = predecessor[2] + factor /15;
            listenerRemover[3] = uos(predecessor[2] , predecessor[2] + factor /15, p => instances[3](p));
            once[2] = true;
        }
    };
    once[3] = false;
    instances[3] = (p) => {
        if (p <= 0) {
        } else {
            if (p< 1) SKETCHFAB.sketch5Behaviour(p);
        }
        if (p === 1 && !once[3]) {
            factors[3] = factor;
            predecessor[4] = predecessor[3] + factor /15;
            listenerRemover[4] = uos(predecessor[3] , predecessor[3] + factor /15, p => instances[4](p));
            once[3] = true;
        }
    };
    once[4] = false;
    instances[4] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c6") !== null) document.getElementById("c6").classList.remove("active");
            document.getElementById("6").style.zIndex = "-1";
        } else {
            if(document.getElementById("c6") !== null) document.getElementById("c6").classList.add("active");
            document.getElementById("6").style.zIndex = "4";
            document.getElementById("6").style.opacity = ramp(p);
        }
        if (p === 1 && !once[4]) {
            factors[4] = factor;
            predecessor[5] = predecessor[4] + factor /15;
            listenerRemover[5] = uos(predecessor[4] , predecessor[4] + factor /15, p => instances[5](p));
            once[4] = true;
        }
    };
    once[5] = false;
    instances[5] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c9") !== null) document.getElementById("c9").classList.remove("active");
            document.getElementById("9").style.zIndex = "-1";
        } else {
            if(document.getElementById("c9") !== null) document.getElementById("c9").classList.add("active");
            document.getElementById("9").style.zIndex = "5";
            if(p < 1) document.getElementById("9").style.opacity = rampIn(p);
            if (p< 1) MAP.map9Behaviour(p);
            document.getElementById("3").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[5]) {
            factors[5] = factor;
            predecessor[6] = predecessor[5] + factor /15;
            listenerRemover[6] = uos(predecessor[5] , predecessor[5] + factor /15, p => instances[6](p));
            once[5] = true;
        }
    };
    once[6] = false;
    instances[6] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c10") !== null) document.getElementById("c10").classList.remove("active");
            document.getElementById("10").style.zIndex = "-1";
        } else {
            if(document.getElementById("c10") !== null) document.getElementById("c10").classList.add("active");
            document.getElementById("10").style.zIndex = "6";
            document.getElementById("10").style.opacity = ramp(p);
        }
        if (p === 1 && !once[6]) {
            factors[6] = factor;
            predecessor[7] = predecessor[6] + factor /15;
            listenerRemover[7] = uos(predecessor[6] , predecessor[6] + factor /15, p => instances[7](p));
            once[6] = true;
        }
    };
    once[7] = false;
    instances[7] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c11") !== null) document.getElementById("c11").classList.remove("active");
            document.getElementById("11").style.zIndex = "-1";
        } else {
            if(document.getElementById("c11") !== null) document.getElementById("c11").classList.add("active");
            document.getElementById("11").style.zIndex = "7";
            document.getElementById("11").style.opacity = ramp(p);
            if (p < 1 && once[7]) {
                once[7] = false;
                factor = factors[7];
                [listenerRemover, once] = removeListenersAndOnces(pred11, listenerRemover, once)
            }
            document.getElementById("9").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[7]) {
            factors[7] = factor;
            if (document.getElementsByName("question11")[0].checked) {
                predecessor[8] = predecessor[7] + factor /15;
                listenerRemover[8] = uos(predecessor[7], predecessor[7] + factor / 15, p => instances[8](p));
            }
            if (document.getElementsByName("question11")[1].checked) {
                predecessor[10] = predecessor[7] + factor /15;
                listenerRemover[10] = uos(predecessor[7], predecessor[7] + factor / 15, p => instances[10](p));
            }
            once[7] = true;
        }
    };
    once[8] = false;
    instances[8] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c13") !== null) document.getElementById("c13").classList.remove("active");
            document.getElementById("13").style.zIndex = "-1";
        } else {
            if(document.getElementById("c13") !== null) document.getElementById("c13").classList.add("active");
            document.getElementById("13").style.zIndex = "9";
            if(p < 1) document.getElementById("13").style.opacity = rampIn(p);
            if (p< 1) SKETCHFAB.sketch13Behaviour(p);
        }
        if (p === 1 && !once[8]) {
            factors[8] = factor;
            predecessor[9] = predecessor[8] + factor /15;
            listenerRemover[9] = uos(predecessor[8] , predecessor[8] + factor /15, p => instances[9](p));
            once[8] = true;
        }
    };
    once[9] = false;
    instances[9] = (p) => {
        if (p <= 0) {
        } else {
            if (p< 1) SKETCHFAB.sketch14Behaviour(p);
        }
        if (p === 1 && !once[9]) {
            factors[9] = factor;
            predecessor[12] = predecessor[9] + factor /15;
            listenerRemover[12] = uos(predecessor[9] , predecessor[9] + factor /15, p => instances[12](p));
            once[9] = true;
        }
    };
    once[12] = false;
    instances[12] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c17") !== null) document.getElementById("c17").classList.remove("active");
            document.getElementById("17").style.zIndex = "-1";
        } else {
            if(document.getElementById("c17") !== null) document.getElementById("c17").classList.add("active");
            document.getElementById("17").style.zIndex = "11";
            document.getElementById("17").style.opacity = ramp(p);
        }
        if (p === 1 && !once[12]) {
            factors[12] = factor;
            predecessor[15] = predecessor[12] + factor /15;
            listenerRemover[15] = uos(predecessor[12] , predecessor[12] + factor /15, p => instances[15](p));
            once[12] = true;
        }
    };
    once[15] = false;
    instances[15] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c20") !== null) document.getElementById("c20").classList.remove("active");
            document.getElementById("20").style.zIndex = "-1";
        } else {
            if(document.getElementById("c20") !== null) document.getElementById("c20").classList.add("active");
            document.getElementById("20").style.zIndex = "12";
            document.getElementById("20").style.opacity = ramp(p);
            document.getElementById("13").style.opacity = rampOut(p);
            document.getElementById("15").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[15]) {
            factors[15] = factor;
            predecessor[16] = predecessor[15] + factor /15;
            listenerRemover[16] = uos(predecessor[15] , predecessor[15] + factor /15, p => instances[16](p));
            once[15] = true;
        }
    };
    once[16] = false;
    instances[16] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c21") !== null) document.getElementById("c21").classList.remove("active");
            document.getElementById("21").style.zIndex = "-1";
        } else {
            if(document.getElementById("c21") !== null) document.getElementById("c21").classList.add("active");
            document.getElementById("21").style.zIndex = "13";
            document.getElementById("21").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[16]) {
            factors[16] = factor;
            predecessor[17] = predecessor[16] + factor /15;
            listenerRemover[17] = uos(predecessor[16] , predecessor[16] + factor /15, p => instances[17](p));
            once[16] = true;
        }
    };
    once[17] = false;
    instances[17] = (p) => {
        if (p <= 0) {
        } else {
        }
        if (p === 1 && !once[17]) {
            factors[17] = factor;
            once[17] = true;
        }
    };
    once[10] = false;
    instances[10] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c15") !== null) document.getElementById("c15").classList.remove("active");
            document.getElementById("15").style.zIndex = "-1";
        } else {
            if(document.getElementById("c15") !== null) document.getElementById("c15").classList.add("active");
            document.getElementById("15").style.zIndex = "8";
            if(p < 1) document.getElementById("15").style.opacity = rampIn(p);
            if (p< 1) SKETCHFAB.sketch15Behaviour(p);
        }
        if (p === 1 && !once[10]) {
            factors[10] = factor;
            predecessor[11] = predecessor[10] + factor /15;
            listenerRemover[11] = uos(predecessor[10] , predecessor[10] + factor /15, p => instances[11](p));
            once[10] = true;
        }
    };
    once[11] = false;
    instances[11] = (p) => {
        if (p <= 0) {
        } else {
            if (p< 1) SKETCHFAB.sketch16Behaviour(p);
        }
        if (p === 1 && !once[11]) {
            factors[11] = factor;
            predecessor[14] = predecessor[11] + factor /15;
            listenerRemover[14] = uos(predecessor[11] , predecessor[11] + factor /15, p => instances[14](p));
            once[11] = true;
        }
    };
    once[14] = false;
    instances[14] = (p) => {
        if (p <= 0) {
        } else {
            if (p< 1) SKETCHFAB.sketch19Behaviour(p);
        }
        if (p === 1 && !once[14]) {
            factors[14] = factor;
            predecessor[13] = predecessor[14] + factor /15;
            listenerRemover[13] = uos(predecessor[14] , predecessor[14] + factor /15, p => instances[13](p));
            once[14] = true;
        }
    };
    once[13] = false;
    instances[13] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c18") !== null) document.getElementById("c18").classList.remove("active");
            document.getElementById("18").style.zIndex = "-1";
        } else {
            if(document.getElementById("c18") !== null) document.getElementById("c18").classList.add("active");
            document.getElementById("18").style.zIndex = "11";
            document.getElementById("18").style.opacity = ramp(p);
        }
        if (p === 1 && !once[13]) {
            factors[13] = factor;
            predecessor[15] = predecessor[13] + factor /15;
            listenerRemover[15] = uos(predecessor[13] , predecessor[13] + factor /15, p => instances[15](p));
            once[13] = true;
        }
    };
        return [start, instances,once,15];
}

function alterUniform(element, value, uniform) {
    if (element != null) {
        if (element.material !== undefined) {
            element.material.uniforms[uniform].value = value;
        } else {
            element.children.forEach(child => child.material.uniforms[uniform].value = value);
        }
    }
}

function removeListenersAndOnces(list, listenerRemover, once) {
    list.forEach(entry => {
        if (Object.keys(listenerRemover).includes(entry.toString())) {
            listenerRemover[entry]();
            delete listenerRemover[entry];
        }
        once[entry] = false;
    });
    return [listenerRemover, once];
}

function rampTo(p, zoomo, zoom, _camera) {
    let np = p < 0.5 ? 2 * p : 1;
    _camera.zoom = zoomo + (zoom - zoomo) * np;
    _camera.updateProjectionMatrix();
}

// Ramp function used for in and out transition
//      ___
//    /    \
// __/      \__
function ramp(p) {
    return p <= 0.33 ? p * (1 / 0.33) : p > 0.33 && p < 0.66 ? 1 : 1 - ((p - 0.66) * (1 / 0.33));
}

function rampToPosRot(p, fromPos, toPos, fromRot, toRot, fromSlice, toSlice, object, slice) {
    let np = p < 0.5 ? 2 * p : 1;
    object.position.x = fromPos[0] + (toPos[0] - fromPos[0]) * np;
    object.position.y = fromPos[1] + (toPos[1] - fromPos[1]) * np;
    slice.position.x = fromSlice[0] + (toSlice[0] - fromSlice[0]) * np;
    slice.position.y = fromSlice[1] + (toSlice[1] - fromSlice[1]) * np;
    let angles = [Math.sqrt(Math.pow(toRot[0] - fromRot[0], 2)) * np,
        Math.sqrt(Math.pow(toRot[1] - fromRot[1], 2)) * np];
    let whereTo = [(toRot[0] < fromRot[0] ? fromRot[0] - (angles[0] * np) : fromRot[0] + (angles[0] * np)),
        (toRot[1] < fromRot[1] ? fromRot[1] - (angles[1] * np) : fromRot[1] + (angles[1] * np))];
    object.rotation.x = whereTo[0];
    object.rotation.y = whereTo[1];
}

// From Settings [clim1, clim2, renderstyle, renderthreshold, u_cmdata]
function rampSettings(p, fromSettings, toSettings, object, slice){
    let np = p < 0.5 ? 2 * p : 1;
    object.children[0].material.uniforms['u_clim'].value.set(fromSettings[0] + (toSettings[0] - fromSettings[0]) * np,
        fromSettings[1] + (toSettings[1] - fromSettings[1]) * np);
    object.children[0].material.uniforms['u_renderstyle'].value = toSettings[2];
    object.children[0].material.uniforms['u_renderthreshold'].value = fromSettings[3] + (toSettings[3] - fromSettings[3]) * np;
    slice.children.forEach(child => child.material.uniforms['depth'].value = fromSettings[5] + (toSettings[5] - fromSettings[5]) * np);
    object.children[0].material.uniforms['u_cmdata'].value = RENDER.getColormap(toSettings[4]);
}

// RampOut function used for in and out transition
// ___
//    \
//     \__
function rampOut(p){
    return p < 0.2 ? 1 - (5*p) : 0;
}


// RampIn function used for in and out transition
//      ___
//    /
// __/
function rampIn(p){
    return p < 0.5 ? 2*p: 1;
}
