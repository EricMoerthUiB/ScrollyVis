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
     predecessor[1] = 1/28;
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
            predecessor[2] = predecessor[1] + factor /28;
            listenerRemover[2] = uos(predecessor[1] , predecessor[1] + factor /28, p => instances[2](p));
            once[1] = true;
            zoom[1] = _camera.zoom;
        }
    };
    once[2] = false;
    instances[2] = (p) => {
        if (p <= 0) {
            document.getElementById("3").style.zIndex = "-1";
        } else {
            document.getElementById("3").style.zIndex = "2";
            document.getElementById("3").style.opacity = ramp(p);
        }
        if (p === 1 && !once[2]) {
            factors[2] = factor;
            predecessor[3] = predecessor[2] + factor /28;
            listenerRemover[3] = uos(predecessor[2] , predecessor[2] + factor /28, p => instances[3](p));
            once[2] = true;
            zoom[2] = _camera.zoom;
        }
    };
    once[3] = false;
    instances[3] = (p) => {
        if (p <= 0) {
            document.getElementById("4").style.zIndex = "-1";
        } else {
            document.getElementById("4").style.zIndex = "3";
            document.getElementById("4").style.opacity = ramp(p);
        }
        if (p === 1 && !once[3]) {
            factors[3] = factor;
            predecessor[4] = predecessor[3] + factor /28;
            listenerRemover[4] = uos(predecessor[3] , predecessor[3] + factor /28, p => instances[4](p));
            once[3] = true;
            zoom[3] = _camera.zoom;
        }
    };
    once[4] = false;
    instances[4] = (p) => {
        if (p <= 0) {
            document.getElementById("14").style.zIndex = "-1";
        } else {
            document.getElementById("14").style.zIndex = "4";
            document.getElementById("14").style.opacity = ramp(p);
        }
        if (p === 1 && !once[4]) {
            factors[4] = factor;
            predecessor[5] = predecessor[4] + factor /28;
            listenerRemover[5] = uos(predecessor[4] , predecessor[4] + factor /28, p => instances[5](p));
            once[4] = true;
            zoom[4] = _camera.zoom;
        }
    };
    once[5] = false;
    instances[5] = (p) => {
        if (p <= 0) {
            alterUniform(LoadData.vol19,0,"u_opacity");
        } else {
            if(p < 1) {
              alterUniform(LoadData.vol19,rampIn(p),"u_opacity");

              rampTo(p, zoom[4], 350 / LoadData.size19[1], _camera);
            }
            document.getElementById("2").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[5]) {
            factors[5] = factor;
            predecessor[6] = predecessor[5] + factor /28;
            listenerRemover[6] = uos(predecessor[5] , predecessor[5] + factor /28, p => instances[6](p));
            once[5] = true;
            zoom[5] = _camera.zoom;
        }
    };
    once[6] = false;
    instances[6] = (p) => {
        if (p <= 0) {
            document.getElementById("20").style.zIndex = "-1";
        } else {
            document.getElementById("20").style.zIndex = "6";
            document.getElementById("20").style.opacity = ramp(p);
            if(p<1){
              LoadData.vol19.rotation.y = (((1-1) * 360 / 2) +  p *  360/2)* Math.PI/180;
            }
        }
        if (p === 1 && !once[6]) {
            factors[6] = factor;
            predecessor[7] = predecessor[6] + factor /28;
            listenerRemover[7] = uos(predecessor[6] , predecessor[6] + factor /28, p => instances[7](p));
            once[6] = true;
            zoom[6] = _camera.zoom;
        }
    };
    once[7] = false;
    instances[7] = (p) => {
        if (p <= 0) {
            document.getElementById("21").style.zIndex = "-1";
        } else {
            document.getElementById("21").style.zIndex = "7";
            document.getElementById("21").style.opacity = ramp(p);
            if(p<1){
              LoadData.vol19.rotation.y = (((2-1) * 360 / 2) +  p *  360/2)* Math.PI/180;
            }
        }
        if (p === 1 && !once[7]) {
            factors[7] = factor;
            predecessor[8] = predecessor[7] + factor /28;
            listenerRemover[8] = uos(predecessor[7] , predecessor[7] + factor /28, p => instances[8](p));
            once[7] = true;
            zoom[7] = _camera.zoom;
        }
    };
    once[8] = false;
    instances[8] = (p) => {
        if (p <= 0) {
            alterUniform(LoadData.sl29,0,"u_opacity");
        } else {
            if(p < 1){
              alterUniform(LoadData.sl29,rampIn(p),"u_opacity");
              rampTo(p, zoom[7], 0.7, _camera);
            }
            alterUniform(LoadData.vol19,rampOut(p),"u_opacity");
        }
        if (p === 1 && !once[8]) {
            factors[8] = factor;
            predecessor[9] = predecessor[8] + factor /28;
            listenerRemover[9] = uos(predecessor[8] , predecessor[8] + factor /28, p => instances[9](p));
            once[8] = true;
            zoom[8] = _camera.zoom;
        }
    };
    once[9] = false;
    instances[9] = (p) => {
        if (p <= 0) {
            document.getElementById("25").style.zIndex = "-1";
        } else {
            document.getElementById("25").style.zIndex = "9";
            document.getElementById("25").style.opacity = ramp(p);
            if(p<1){
              alterUniform(LoadData.sl29,0 + 0/2 * 85 + p* 1 /2 * 85,"depth");
            }
        }
        if (p === 1 && !once[9]) {
            factors[9] = factor;
            predecessor[10] = predecessor[9] + factor /28;
            listenerRemover[10] = uos(predecessor[9] , predecessor[9] + factor /28, p => instances[10](p));
            once[9] = true;
            zoom[9] = _camera.zoom;
        }
    };
    once[10] = false;
    instances[10] = (p) => {
        if (p <= 0) {
            document.getElementById("26").style.zIndex = "-1";
        } else {
            document.getElementById("26").style.zIndex = "10";
            document.getElementById("26").style.opacity = ramp(p);
            if(p<1){
              alterUniform(LoadData.sl29,0 + 1/2 * 85 + p* 1 /2 * 85,"depth");
            }
        }
        if (p === 1 && !once[10]) {
            factors[10] = factor;
            predecessor[11] = predecessor[10] + factor /28;
            listenerRemover[11] = uos(predecessor[10] , predecessor[10] + factor /28, p => instances[11](p));
            once[10] = true;
            zoom[10] = _camera.zoom;
        }
    };
    once[11] = false;
    instances[11] = (p) => {
        if (p <= 0) {
            document.getElementById("27").style.zIndex = "-1";
        } else {
            document.getElementById("27").style.zIndex = "11";
            document.getElementById("27").style.opacity = ramp(p);
            alterUniform(LoadData.sl29,rampOut(p),"u_opacity");
        }
        if (p === 1 && !once[11]) {
            factors[11] = factor;
            predecessor[12] = predecessor[11] + factor /28;
            listenerRemover[12] = uos(predecessor[11] , predecessor[11] + factor /28, p => instances[12](p));
            once[11] = true;
            zoom[11] = _camera.zoom;
        }
    };
    once[12] = false;
    instances[12] = (p) => {
        if (p <= 0) {
            document.getElementById("31").style.zIndex = "-1";
        } else {
            document.getElementById("31").style.zIndex = "12";
            if(p < 1) document.getElementById("31").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[12]) {
            factors[12] = factor;
            predecessor[13] = predecessor[12] + factor /28;
            listenerRemover[13] = uos(predecessor[12] , predecessor[12] + factor /28, p => instances[13](p));
            once[12] = true;
            zoom[12] = _camera.zoom;
        }
    };
    once[13] = false;
    instances[13] = (p) => {
        if (p <= 0) {
            document.getElementById("32").style.zIndex = "-1";
        } else {
            document.getElementById("32").style.zIndex = "13";
            document.getElementById("32").style.opacity = ramp(p);
        }
        if (p === 1 && !once[13]) {
            factors[13] = factor;
            predecessor[14] = predecessor[13] + factor /28;
            listenerRemover[14] = uos(predecessor[13] , predecessor[13] + factor /28, p => instances[14](p));
            once[13] = true;
            zoom[13] = _camera.zoom;
        }
    };
    once[14] = false;
    instances[14] = (p) => {
        if (p <= 0) {
            document.getElementById("33").style.zIndex = "-1";
        } else {
            document.getElementById("33").style.zIndex = "14";
            document.getElementById("33").style.opacity = ramp(p);
        }
        if (p === 1 && !once[14]) {
            factors[14] = factor;
            predecessor[25] = predecessor[14] + factor /28;
            listenerRemover[25] = uos(predecessor[14] , predecessor[14] + factor /28, p => instances[25](p));
            once[14] = true;
            zoom[14] = _camera.zoom;
        }
    };
    once[25] = false;
    instances[25] = (p) => {
        if (p <= 0) {
            alterUniform(LoadData.sl55,0,"u_opacity");
        } else {
            if(p < 1){
              alterUniform(LoadData.sl55,rampIn(p),"u_opacity");
              rampTo(p, zoom[14], 0.7, _camera);
            }
            document.getElementById("31").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[25]) {
            factors[25] = factor;
            predecessor[24] = predecessor[25] + factor /28;
            listenerRemover[24] = uos(predecessor[25] , predecessor[25] + factor /28, p => instances[24](p));
            once[25] = true;
            zoom[25] = _camera.zoom;
        }
    };
    once[24] = false;
    instances[24] = (p) => {
        if (p <= 0) {
            document.getElementById("49").style.zIndex = "-1";
        } else {
            document.getElementById("49").style.zIndex = "16";
            document.getElementById("49").style.opacity = ramp(p);
            if(p<1){
              alterUniform(LoadData.sl55,10 + 0/3 * 38 + p* 1 /3 * 38,"depth");
            }
        }
        if (p === 1 && !once[24]) {
            factors[24] = factor;
            predecessor[15] = predecessor[24] + factor /28;
            listenerRemover[15] = uos(predecessor[24] , predecessor[24] + factor /28, p => instances[15](p));
            once[24] = true;
            zoom[24] = _camera.zoom;
        }
    };
    once[15] = false;
    instances[15] = (p) => {
        if (p <= 0) {
            document.getElementById("35").style.zIndex = "-1";
        } else {
            document.getElementById("35").style.zIndex = "17";
            document.getElementById("35").style.opacity = ramp(p);
            if(p<1){
              alterUniform(LoadData.sl55,10 + 1/3 * 38 + p* 1 /3 * 38,"depth");
            }
        }
        if (p === 1 && !once[15]) {
            factors[15] = factor;
            predecessor[16] = predecessor[15] + factor /28;
            listenerRemover[16] = uos(predecessor[15] , predecessor[15] + factor /28, p => instances[16](p));
            once[15] = true;
            zoom[15] = _camera.zoom;
        }
    };
    once[16] = false;
    instances[16] = (p) => {
        if (p <= 0) {
            document.getElementById("36").style.zIndex = "-1";
        } else {
            document.getElementById("36").style.zIndex = "18";
            document.getElementById("36").style.opacity = ramp(p);
            if(p<1){
              alterUniform(LoadData.sl55,10 + 2/3 * 38 + p* 1 /3 * 38,"depth");
            }
        }
        if (p === 1 && !once[16]) {
            factors[16] = factor;
            predecessor[26] = predecessor[16] + factor /28;
            listenerRemover[26] = uos(predecessor[16] , predecessor[16] + factor /28, p => instances[26](p));
            once[16] = true;
            zoom[16] = _camera.zoom;
        }
    };
    once[26] = false;
    instances[26] = (p) => {
        if (p <= 0) {
            document.getElementById("56").style.zIndex = "-1";
        } else {
            document.getElementById("56").style.zIndex = "19";
            if(p < 1) document.getElementById("56").style.opacity = rampIn(p);
            alterUniform(LoadData.sl55,rampOut(p),"u_opacity");
        }
        if (p === 1 && !once[26]) {
            factors[26] = factor;
            predecessor[27] = predecessor[26] + factor /28;
            listenerRemover[27] = uos(predecessor[26] , predecessor[26] + factor /28, p => instances[27](p));
            once[26] = true;
            zoom[26] = _camera.zoom;
        }
    };
    once[27] = false;
    instances[27] = (p) => {
        if (p <= 0) {
            document.getElementById("58").style.zIndex = "-1";
        } else {
            document.getElementById("58").style.zIndex = "20";
            document.getElementById("58").style.opacity = ramp(p);
        }
        if (p === 1 && !once[27]) {
            factors[27] = factor;
            predecessor[20] = predecessor[27] + factor /28;
            listenerRemover[20] = uos(predecessor[27] , predecessor[27] + factor /28, p => instances[20](p));
            once[27] = true;
            zoom[27] = _camera.zoom;
        }
    };
    once[20] = false;
    instances[20] = (p) => {
        if (p <= 0) {
            document.getElementById("44").style.zIndex = "-1";
        } else {
            document.getElementById("44").style.zIndex = "21";
            if(p < 1) document.getElementById("44").style.opacity = rampIn(p);
            document.getElementById("56").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[20]) {
            factors[20] = factor;
            predecessor[21] = predecessor[20] + factor /28;
            listenerRemover[21] = uos(predecessor[20] , predecessor[20] + factor /28, p => instances[21](p));
            once[20] = true;
            zoom[20] = _camera.zoom;
        }
    };
    once[21] = false;
    instances[21] = (p) => {
        if (p <= 0) {
            document.getElementById("46").style.zIndex = "-1";
        } else {
            document.getElementById("46").style.zIndex = "22";
            document.getElementById("46").style.opacity = ramp(p);
        }
        if (p === 1 && !once[21]) {
            factors[21] = factor;
            predecessor[22] = predecessor[21] + factor /28;
            listenerRemover[22] = uos(predecessor[21] , predecessor[21] + factor /28, p => instances[22](p));
            once[21] = true;
            zoom[21] = _camera.zoom;
        }
    };
    once[22] = false;
    instances[22] = (p) => {
        if (p <= 0) {
            document.getElementById("47").style.zIndex = "-1";
        } else {
            document.getElementById("47").style.zIndex = "23";
            document.getElementById("47").style.opacity = ramp(p);
        }
        if (p === 1 && !once[22]) {
            factors[22] = factor;
            predecessor[23] = predecessor[22] + factor /28;
            listenerRemover[23] = uos(predecessor[22] , predecessor[22] + factor /28, p => instances[23](p));
            once[22] = true;
            zoom[22] = _camera.zoom;
        }
    };
    once[23] = false;
    instances[23] = (p) => {
        if (p <= 0) {
            document.getElementById("48").style.zIndex = "-1";
        } else {
            document.getElementById("48").style.zIndex = "24";
            document.getElementById("48").style.opacity = ramp(p);
            document.getElementById("44").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[23]) {
            factors[23] = factor;
            predecessor[17] = predecessor[23] + factor /28;
            listenerRemover[17] = uos(predecessor[23] , predecessor[23] + factor /28, p => instances[17](p));
            once[23] = true;
            zoom[23] = _camera.zoom;
        }
    };
    once[17] = false;
    instances[17] = (p) => {
        if (p <= 0) {
            document.getElementById("38").style.zIndex = "-1";
        } else {
            document.getElementById("38").style.zIndex = "25";
            if(p < 1) document.getElementById("38").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[17]) {
            factors[17] = factor;
            predecessor[18] = predecessor[17] + factor /28;
            listenerRemover[18] = uos(predecessor[17] , predecessor[17] + factor /28, p => instances[18](p));
            once[17] = true;
            zoom[17] = _camera.zoom;
        }
    };
    once[18] = false;
    instances[18] = (p) => {
        if (p <= 0) {
            document.getElementById("41").style.zIndex = "-1";
        } else {
            document.getElementById("41").style.zIndex = "26";
            document.getElementById("41").style.opacity = ramp(p);
        }
        if (p === 1 && !once[18]) {
            factors[18] = factor;
            predecessor[19] = predecessor[18] + factor /28;
            listenerRemover[19] = uos(predecessor[18] , predecessor[18] + factor /28, p => instances[19](p));
            once[18] = true;
            zoom[18] = _camera.zoom;
        }
    };
    once[19] = false;
    instances[19] = (p) => {
        if (p <= 0) {
            document.getElementById("43").style.zIndex = "-1";
        } else {
            document.getElementById("43").style.zIndex = "27";
            document.getElementById("43").style.opacity = rampIn(p);
            document.getElementById("38").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[19]) {
            factors[19] = factor;
            once[19] = true;
            zoom[19] = _camera.zoom;
        }
    };
        return [start, instances,once,28];
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
