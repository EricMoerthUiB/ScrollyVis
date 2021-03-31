import * as LoadData from "./loadData.js"

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
     zoom[0] = _camera.zoom;
     let start;
     let pred14 = [22,21,25,20,19,17,33,18,16,15,14,32,13,24,23,28,29,12,27,26,31,11,9,6,7,8];
     let pred26 = [22,21,25,20,19,17,33,18,16,15,14,32,13,24,23,28,29];
     predecessor[1] = 1/31;
     start = 1;

    once[1] = false;
    instances[1] = (p) => {
        if (p <= 0) {
            document.getElementById("2").style.zIndex = "-1";
        } else {
            document.getElementById("2").style.zIndex = "1";
            if(p < 1) document.getElementById("2").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[1]) {
            factors[1] = factor;
            predecessor[2] = predecessor[1] + factor /31;
            listenerRemover[2] = uos(predecessor[1] , predecessor[1] + factor /31, p => instances[2](p));
            once[1] = true;
            zoom[1] = _camera.zoom;
        }
    };
    once[2] = false;
    instances[2] = (p) => {
        if (p <= 0) {
            document.getElementById("4").style.zIndex = "-1";
        } else {
            document.getElementById("4").style.zIndex = "2";
            document.getElementById("4").style.opacity = ramp(p);
        }
        if (p === 1 && !once[2]) {
            factors[2] = factor;
            predecessor[3] = predecessor[2] + factor /31;
            listenerRemover[3] = uos(predecessor[2] , predecessor[2] + factor /31, p => instances[3](p));
            once[2] = true;
            zoom[2] = _camera.zoom;
        }
    };
    once[3] = false;
    instances[3] = (p) => {
        if (p <= 0) {
            document.getElementById("5").style.zIndex = "-1";
        } else {
            document.getElementById("5").style.zIndex = "3";
            document.getElementById("5").style.opacity = ramp(p);
        }
        if (p === 1 && !once[3]) {
            factors[3] = factor;
            predecessor[10] = predecessor[3] + factor /31;
            listenerRemover[10] = uos(predecessor[3] , predecessor[3] + factor /31, p => instances[10](p));
            once[3] = true;
            zoom[3] = _camera.zoom;
        }
    };
    once[10] = false;
    instances[10] = (p) => {
        if (p <= 0) {
            document.getElementById("20").style.zIndex = "-1";
        } else {
            document.getElementById("20").style.zIndex = "4";
            document.getElementById("20").style.opacity = ramp(p);
        }
        if (p === 1 && !once[10]) {
            factors[10] = factor;
            predecessor[4] = predecessor[10] + factor /31;
            listenerRemover[4] = uos(predecessor[10] , predecessor[10] + factor /31, p => instances[4](p));
            once[10] = true;
            zoom[10] = _camera.zoom;
        }
    };
    once[4] = false;
    instances[4] = (p) => {
        if (p <= 0) {
            document.getElementById("10").style.zIndex = "-1";
        } else {
            document.getElementById("10").style.zIndex = "5";
            if(p < 1) document.getElementById("10").style.opacity = rampIn(p);
            document.getElementById("2").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[4]) {
            factors[4] = factor;
            predecessor[30] = predecessor[4] + factor /31;
            listenerRemover[30] = uos(predecessor[4] , predecessor[4] + factor /31, p => instances[30](p));
            once[4] = true;
            zoom[4] = _camera.zoom;
        }
    };
    once[30] = false;
    instances[30] = (p) => {
        if (p <= 0) {
            document.getElementById("54").style.zIndex = "-1";
        } else {
            document.getElementById("54").style.zIndex = "6";
            document.getElementById("54").style.opacity = ramp(p);
        }
        if (p === 1 && !once[30]) {
            factors[30] = factor;
            predecessor[5] = predecessor[30] + factor /31;
            listenerRemover[5] = uos(predecessor[30] , predecessor[30] + factor /31, p => instances[5](p));
            once[30] = true;
            zoom[30] = _camera.zoom;
        }
    };
    once[5] = false;
    instances[5] = (p) => {
        if (p <= 0) {
            document.getElementById("14").style.zIndex = "-1";
        } else {
            document.getElementById("14").style.zIndex = "7";
            document.getElementById("14").style.opacity = ramp(p);
            if (p < 1 && once[5]) {
                once[5] = false;
                factor = factors[5];
                [listenerRemover, once] = removeListenersAndOnces(pred14, listenerRemover, once)
            }
        }
        if (p === 1 && !once[5]) {
            factors[5] = factor;
            if (document.getElementsByName("question14")[0].checked) {
                factor += 0;
                predecessor[6] = predecessor[5] + factor /31;
                listenerRemover[6] = uos(predecessor[5], predecessor[5] + factor / 31, p => instances[6](p));
            }
            if (document.getElementsByName("question14")[1].checked) {
                factor += 0;
                predecessor[7] = predecessor[5] + factor /31;
                listenerRemover[7] = uos(predecessor[5], predecessor[5] + factor / 31, p => instances[7](p));
            }
            if (document.getElementsByName("question14")[2].checked) {
                factor += 0;
                predecessor[8] = predecessor[5] + factor /31;
                listenerRemover[8] = uos(predecessor[5], predecessor[5] + factor / 31, p => instances[8](p));
            }
            once[5] = true;
            zoom[5] = _camera.zoom;
        }
    };
    once[6] = false;
    instances[6] = (p) => {
        if (p <= 0) {
            document.getElementById("15").style.zIndex = "-1";
        } else {
            document.getElementById("15").style.zIndex = "8";
            document.getElementById("15").style.opacity = ramp(p);
        }
        if (p === 1 && !once[6]) {
            factors[6] = factor;
            predecessor[9] = predecessor[6] + factor /31;
            listenerRemover[9] = uos(predecessor[6] , predecessor[6] + factor /31, p => instances[9](p));
            once[6] = true;
            zoom[6] = _camera.zoom;
        }
    };
    once[9] = false;
    instances[9] = (p) => {
        if (p <= 0) {
            document.getElementById("18").style.zIndex = "-1";
        } else {
            document.getElementById("18").style.zIndex = "9";
            document.getElementById("18").style.opacity = ramp(p);
        }
        if (p === 1 && !once[9]) {
            factors[9] = factor;
            predecessor[11] = predecessor[9] + factor /31;
            listenerRemover[11] = uos(predecessor[9] , predecessor[9] + factor /31, p => instances[11](p));
            once[9] = true;
            zoom[9] = _camera.zoom;
        }
    };
    once[11] = false;
    instances[11] = (p) => {
        if (p <= 0) {
            document.getElementById("22").style.zIndex = "-1";
        } else {
            document.getElementById("22").style.zIndex = "10";
            document.getElementById("22").style.opacity = ramp(p);
            document.getElementById("10").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[11]) {
            factors[11] = factor;
            predecessor[31] = predecessor[11] + factor /31;
            listenerRemover[31] = uos(predecessor[11] , predecessor[11] + factor /31, p => instances[31](p));
            once[11] = true;
            zoom[11] = _camera.zoom;
        }
    };
    once[31] = false;
    instances[31] = (p) => {
        if (p <= 0) {
            document.getElementById("58").style.zIndex = "-1";
        } else {
            document.getElementById("58").style.zIndex = "11";
            if(p < 1) document.getElementById("58").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[31]) {
            factors[31] = factor;
            predecessor[26] = predecessor[31] + factor /31;
            listenerRemover[26] = uos(predecessor[31] , predecessor[31] + factor /31, p => instances[26](p));
            once[31] = true;
            zoom[31] = _camera.zoom;
        }
    };
    once[26] = false;
    instances[26] = (p) => {
        if (p <= 0) {
            document.getElementById("50").style.zIndex = "-1";
        } else {
            document.getElementById("50").style.zIndex = "12";
            document.getElementById("50").style.opacity = ramp(p);
        }
        if (p === 1 && !once[26]) {
            factors[26] = factor;
            predecessor[27] = predecessor[26] + factor /31;
            listenerRemover[27] = uos(predecessor[26] , predecessor[26] + factor /31, p => instances[27](p));
            once[26] = true;
            zoom[26] = _camera.zoom;
        }
    };
    once[27] = false;
    instances[27] = (p) => {
        if (p <= 0) {
            document.getElementById("51").style.zIndex = "-1";
        } else {
            document.getElementById("51").style.zIndex = "13";
            document.getElementById("51").style.opacity = ramp(p);
        }
        if (p === 1 && !once[27]) {
            factors[27] = factor;
            predecessor[12] = predecessor[27] + factor /31;
            listenerRemover[12] = uos(predecessor[27] , predecessor[27] + factor /31, p => instances[12](p));
            once[27] = true;
            zoom[27] = _camera.zoom;
        }
    };
    once[12] = false;
    instances[12] = (p) => {
        if (p <= 0) {
            document.getElementById("26").style.zIndex = "-1";
        } else {
            document.getElementById("26").style.zIndex = "14";
            document.getElementById("26").style.opacity = ramp(p);
            if (p < 1 && once[12]) {
                once[12] = false;
                factor = factors[12];
                [listenerRemover, once] = removeListenersAndOnces(pred26, listenerRemover, once)
            }
            document.getElementById("58").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[12]) {
            factors[12] = factor;
            if (document.getElementsByName("question26")[0].checked) {
                factor += 0;
                predecessor[28] = predecessor[12] + factor /31;
                listenerRemover[28] = uos(predecessor[12], predecessor[12] + factor / 31, p => instances[28](p));
            }
            if (document.getElementsByName("question26")[1].checked) {
                factor += 0;
                predecessor[29] = predecessor[12] + factor /31;
                listenerRemover[29] = uos(predecessor[12], predecessor[12] + factor / 31, p => instances[29](p));
            }
            once[12] = true;
            zoom[12] = _camera.zoom;
        }
    };
    once[28] = false;
    instances[28] = (p) => {
        if (p <= 0) {
            document.getElementById("52").style.zIndex = "-1";
        } else {
            document.getElementById("52").style.zIndex = "15";
            document.getElementById("52").style.opacity = ramp(p);
        }
        if (p === 1 && !once[28]) {
            factors[28] = factor;
            predecessor[23] = predecessor[28] + factor /31;
            listenerRemover[23] = uos(predecessor[28] , predecessor[28] + factor /31, p => instances[23](p));
            once[28] = true;
            zoom[28] = _camera.zoom;
        }
    };
    once[23] = false;
    instances[23] = (p) => {
        if (p <= 0) {
            document.getElementById("45").style.zIndex = "-1";
        } else {
            document.getElementById("45").style.zIndex = "16";
            if(p < 1) document.getElementById("45").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[23]) {
            factors[23] = factor;
            predecessor[24] = predecessor[23] + factor /31;
            listenerRemover[24] = uos(predecessor[23] , predecessor[23] + factor /31, p => instances[24](p));
            once[23] = true;
            zoom[23] = _camera.zoom;
        }
    };
    once[24] = false;
    instances[24] = (p) => {
        if (p <= 0) {
            document.getElementById("47").style.zIndex = "-1";
        } else {
            document.getElementById("47").style.zIndex = "17";
            document.getElementById("47").style.opacity = ramp(p);
        }
        if (p === 1 && !once[24]) {
            factors[24] = factor;
            predecessor[13] = predecessor[24] + factor /31;
            listenerRemover[13] = uos(predecessor[24] , predecessor[24] + factor /31, p => instances[13](p));
            once[24] = true;
            zoom[24] = _camera.zoom;
        }
    };
    once[13] = false;
    instances[13] = (p) => {
        if (p <= 0) {
            document.getElementById("29").style.zIndex = "-1";
        } else {
            document.getElementById("29").style.zIndex = "18";
            document.getElementById("29").style.opacity = ramp(p);
            document.getElementById("45").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[13]) {
            factors[13] = factor;
            predecessor[32] = predecessor[13] + factor /31;
            listenerRemover[32] = uos(predecessor[13] , predecessor[13] + factor /31, p => instances[32](p));
            once[13] = true;
            zoom[13] = _camera.zoom;
        }
    };
    once[32] = false;
    instances[32] = (p) => {
        if (p <= 0) {
            document.getElementById("60").style.zIndex = "-1";
        } else {
            document.getElementById("60").style.zIndex = "19";
            if(p < 1) document.getElementById("60").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[32]) {
            factors[32] = factor;
            predecessor[14] = predecessor[32] + factor /31;
            listenerRemover[14] = uos(predecessor[32] , predecessor[32] + factor /31, p => instances[14](p));
            once[32] = true;
            zoom[32] = _camera.zoom;
        }
    };
    once[14] = false;
    instances[14] = (p) => {
        if (p <= 0) {
            document.getElementById("32").style.zIndex = "-1";
        } else {
            document.getElementById("32").style.zIndex = "20";
            document.getElementById("32").style.opacity = ramp(p);
        }
        if (p === 1 && !once[14]) {
            factors[14] = factor;
            predecessor[15] = predecessor[14] + factor /31;
            listenerRemover[15] = uos(predecessor[14] , predecessor[14] + factor /31, p => instances[15](p));
            once[14] = true;
            zoom[14] = _camera.zoom;
        }
    };
    once[15] = false;
    instances[15] = (p) => {
        if (p <= 0) {
            document.getElementById("33").style.zIndex = "-1";
        } else {
            document.getElementById("33").style.zIndex = "21";
            document.getElementById("33").style.opacity = ramp(p);
        }
        if (p === 1 && !once[15]) {
            factors[15] = factor;
            predecessor[16] = predecessor[15] + factor /31;
            listenerRemover[16] = uos(predecessor[15] , predecessor[15] + factor /31, p => instances[16](p));
            once[15] = true;
            zoom[15] = _camera.zoom;
        }
    };
    once[16] = false;
    instances[16] = (p) => {
        if (p <= 0) {
            document.getElementById("34").style.zIndex = "-1";
        } else {
            document.getElementById("34").style.zIndex = "22";
            document.getElementById("34").style.opacity = ramp(p);
        }
        if (p === 1 && !once[16]) {
            factors[16] = factor;
            predecessor[18] = predecessor[16] + factor /31;
            listenerRemover[18] = uos(predecessor[16] , predecessor[16] + factor /31, p => instances[18](p));
            once[16] = true;
            zoom[16] = _camera.zoom;
        }
    };
    once[18] = false;
    instances[18] = (p) => {
        if (p <= 0) {
            document.getElementById("38").style.zIndex = "-1";
        } else {
            document.getElementById("38").style.zIndex = "23";
            document.getElementById("38").style.opacity = ramp(p);
        }
        if (p === 1 && !once[18]) {
            factors[18] = factor;
            predecessor[33] = predecessor[18] + factor /31;
            listenerRemover[33] = uos(predecessor[18] , predecessor[18] + factor /31, p => instances[33](p));
            once[18] = true;
            zoom[18] = _camera.zoom;
        }
    };
    once[33] = false;
    instances[33] = (p) => {
        if (p <= 0) {
            document.getElementById("61").style.zIndex = "-1";
        } else {
            document.getElementById("61").style.zIndex = "24";
            if(p < 1) document.getElementById("61").style.opacity = rampIn(p);
            document.getElementById("60").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[33]) {
            factors[33] = factor;
            predecessor[17] = predecessor[33] + factor /31;
            listenerRemover[17] = uos(predecessor[33] , predecessor[33] + factor /31, p => instances[17](p));
            once[33] = true;
            zoom[33] = _camera.zoom;
        }
    };
    once[17] = false;
    instances[17] = (p) => {
        if (p <= 0) {
            document.getElementById("36").style.zIndex = "-1";
        } else {
            document.getElementById("36").style.zIndex = "25";
            document.getElementById("36").style.opacity = ramp(p);
        }
        if (p === 1 && !once[17]) {
            factors[17] = factor;
            predecessor[19] = predecessor[17] + factor /31;
            listenerRemover[19] = uos(predecessor[17] , predecessor[17] + factor /31, p => instances[19](p));
            once[17] = true;
            zoom[17] = _camera.zoom;
        }
    };
    once[19] = false;
    instances[19] = (p) => {
        if (p <= 0) {
            document.getElementById("39").style.zIndex = "-1";
        } else {
            document.getElementById("39").style.zIndex = "26";
            document.getElementById("39").style.opacity = ramp(p);
        }
        if (p === 1 && !once[19]) {
            factors[19] = factor;
            predecessor[20] = predecessor[19] + factor /31;
            listenerRemover[20] = uos(predecessor[19] , predecessor[19] + factor /31, p => instances[20](p));
            once[19] = true;
            zoom[19] = _camera.zoom;
        }
    };
    once[20] = false;
    instances[20] = (p) => {
        if (p <= 0) {
            document.getElementById("40").style.zIndex = "-1";
        } else {
            document.getElementById("40").style.zIndex = "27";
            document.getElementById("40").style.opacity = ramp(p);
            document.getElementById("61").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[20]) {
            factors[20] = factor;
            predecessor[25] = predecessor[20] + factor /31;
            listenerRemover[25] = uos(predecessor[20] , predecessor[20] + factor /31, p => instances[25](p));
            once[20] = true;
            zoom[20] = _camera.zoom;
        }
    };
    once[25] = false;
    instances[25] = (p) => {
        if (p <= 0) {
            document.getElementById("48").style.zIndex = "-1";
        } else {
            document.getElementById("48").style.zIndex = "28";
            document.getElementById("48").style.opacity = ramp(p);
        }
        if (p === 1 && !once[25]) {
            factors[25] = factor;
            predecessor[21] = predecessor[25] + factor /31;
            listenerRemover[21] = uos(predecessor[25] , predecessor[25] + factor /31, p => instances[21](p));
            once[25] = true;
            zoom[25] = _camera.zoom;
        }
    };
    once[21] = false;
    instances[21] = (p) => {
        if (p <= 0) {
            document.getElementById("41").style.zIndex = "-1";
        } else {
            document.getElementById("41").style.zIndex = "29";
            document.getElementById("41").style.opacity = ramp(p);
        }
        if (p === 1 && !once[21]) {
            factors[21] = factor;
            predecessor[22] = predecessor[21] + factor /31;
            listenerRemover[22] = uos(predecessor[21] , predecessor[21] + factor /31, p => instances[22](p));
            once[21] = true;
            zoom[21] = _camera.zoom;
        }
    };
    once[22] = false;
    instances[22] = (p) => {
        if (p <= 0) {
            document.getElementById("44").style.zIndex = "-1";
        } else {
            document.getElementById("44").style.zIndex = "30";
            document.getElementById("44").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[22]) {
            factors[22] = factor;
            once[22] = true;
            zoom[22] = _camera.zoom;
        }
    };
    once[29] = false;
    instances[29] = (p) => {
        if (p <= 0) {
            document.getElementById("53").style.zIndex = "-1";
        } else {
            document.getElementById("53").style.zIndex = "15";
            document.getElementById("53").style.opacity = ramp(p);
        }
        if (p === 1 && !once[29]) {
            factors[29] = factor;
            predecessor[23] = predecessor[29] + factor /31;
            listenerRemover[23] = uos(predecessor[29] , predecessor[29] + factor /31, p => instances[23](p));
            once[29] = true;
            zoom[29] = _camera.zoom;
        }
    };
    once[7] = false;
    instances[7] = (p) => {
        if (p <= 0) {
            document.getElementById("16").style.zIndex = "-1";
        } else {
            document.getElementById("16").style.zIndex = "8";
            document.getElementById("16").style.opacity = ramp(p);
        }
        if (p === 1 && !once[7]) {
            factors[7] = factor;
            predecessor[9] = predecessor[7] + factor /31;
            listenerRemover[9] = uos(predecessor[7] , predecessor[7] + factor /31, p => instances[9](p));
            once[7] = true;
            zoom[7] = _camera.zoom;
        }
    };
    once[8] = false;
    instances[8] = (p) => {
        if (p <= 0) {
            document.getElementById("17").style.zIndex = "-1";
        } else {
            document.getElementById("17").style.zIndex = "8";
            document.getElementById("17").style.opacity = ramp(p);
        }
        if (p === 1 && !once[8]) {
            factors[8] = factor;
            predecessor[9] = predecessor[8] + factor /31;
            listenerRemover[9] = uos(predecessor[8] , predecessor[8] + factor /31, p => instances[9](p));
            once[8] = true;
            zoom[8] = _camera.zoom;
        }
    };
        return [start, instances,once,31];
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