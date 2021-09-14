import * as LoadData from "./loadData.js";
import * as MAP from "./mapCode.js";
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
     let pred12 = [47,8,9,18,17,16,33,32,31,30,46,29,45,28,44,27,43,26,42,25,41,24,40,23,39,38,22,21,20,19,15,14,37,13,36,35,12,11,10];
     let pred24 = [47,18,17,16,33,32,31,30,46,29,45,28,44,27,43,26,42,25,41,24,40,23,39,38,22,21,20,19];
     predecessor[1] = 1/43;
     start = 1;

    once[1] = false;
    instances[1] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c6") !== null) document.getElementById("c6").classList.remove("active");
            document.getElementById("6").style.zIndex = "-1";
        } else {
            if(document.getElementById("c6") !== null) document.getElementById("c6").classList.add("active");
            document.getElementById("6").style.zIndex = "1";
            if(p < 1) document.getElementById("6").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[1]) {
            factors[1] = factor;
            predecessor[2] = predecessor[1] + factor /43;
            listenerRemover[2] = uos(predecessor[1] , predecessor[1] + factor /43, p => instances[2](p));
            once[1] = true;
        }
    };
    once[2] = false;
    instances[2] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c7") !== null) document.getElementById("c7").classList.remove("active");
            document.getElementById("7").style.zIndex = "-1";
        } else {
            if(document.getElementById("c7") !== null) document.getElementById("c7").classList.add("active");
            document.getElementById("7").style.zIndex = "2";
            document.getElementById("7").style.opacity = ramp(p);
        }
        if (p === 1 && !once[2]) {
            factors[2] = factor;
            predecessor[3] = predecessor[2] + factor /43;
            listenerRemover[3] = uos(predecessor[2] , predecessor[2] + factor /43, p => instances[3](p));
            once[2] = true;
        }
    };
    once[3] = false;
    instances[3] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c8") !== null) document.getElementById("c8").classList.remove("active");
            document.getElementById("8").style.zIndex = "-1";
        } else {
            if(document.getElementById("c8") !== null) document.getElementById("c8").classList.add("active");
            document.getElementById("8").style.zIndex = "3";
            document.getElementById("8").style.opacity = ramp(p);
        }
        if (p === 1 && !once[3]) {
            factors[3] = factor;
            predecessor[4] = predecessor[3] + factor /43;
            listenerRemover[4] = uos(predecessor[3] , predecessor[3] + factor /43, p => instances[4](p));
            once[3] = true;
        }
    };
    once[4] = false;
    instances[4] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c9") !== null) document.getElementById("c9").classList.remove("active");
            document.getElementById("9").style.zIndex = "-1";
        } else {
            if(document.getElementById("c9") !== null) document.getElementById("c9").classList.add("active");
            document.getElementById("9").style.zIndex = "4";
            document.getElementById("9").style.opacity = ramp(p);
        }
        if (p === 1 && !once[4]) {
            factors[4] = factor;
            predecessor[5] = predecessor[4] + factor /43;
            listenerRemover[5] = uos(predecessor[4] , predecessor[4] + factor /43, p => instances[5](p));
            once[4] = true;
        }
    };
    once[5] = false;
    instances[5] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c10") !== null) document.getElementById("c10").classList.remove("active");
            document.getElementById("10").style.zIndex = "-1";
        } else {
            if(document.getElementById("c10") !== null) document.getElementById("c10").classList.add("active");
            document.getElementById("10").style.zIndex = "5";
            if(p < 1) document.getElementById("10").style.opacity = rampIn(p);
            MAP.map10Behaviour(p);
            document.getElementById("6").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[5]) {
            factors[5] = factor;
            predecessor[6] = predecessor[5] + factor /43;
            listenerRemover[6] = uos(predecessor[5] , predecessor[5] + factor /43, p => instances[6](p));
            once[5] = true;
        }
    };
    once[6] = false;
    instances[6] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c11") !== null) document.getElementById("c11").classList.remove("active");
            document.getElementById("11").style.zIndex = "-1";
        } else {
            if(document.getElementById("c11") !== null) document.getElementById("c11").classList.add("active");
            document.getElementById("11").style.zIndex = "6";
            document.getElementById("11").style.opacity = ramp(p);
        }
        if (p === 1 && !once[6]) {
            factors[6] = factor;
            predecessor[34] = predecessor[6] + factor /43;
            listenerRemover[34] = uos(predecessor[6] , predecessor[6] + factor /43, p => instances[34](p));
            once[6] = true;
        }
    };
    once[34] = false;
    instances[34] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c58") !== null) document.getElementById("c58").classList.remove("active");
            document.getElementById("58").style.zIndex = "-1";
        } else {
            if(document.getElementById("c58") !== null) document.getElementById("c58").classList.add("active");
            document.getElementById("58").style.zIndex = "7";
            document.getElementById("58").style.opacity = ramp(p);
            MAP.map58Behaviour(p);
            document.getElementById("10").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[34]) {
            factors[34] = factor;
            predecessor[7] = predecessor[34] + factor /43;
            listenerRemover[7] = uos(predecessor[34] , predecessor[34] + factor /43, p => instances[7](p));
            once[34] = true;
        }
    };
    once[7] = false;
    instances[7] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c12") !== null) document.getElementById("c12").classList.remove("active");
            document.getElementById("12").style.zIndex = "-1";
        } else {
            if(document.getElementById("c12") !== null) document.getElementById("c12").classList.add("active");
            document.getElementById("12").style.zIndex = "8";
            document.getElementById("12").style.opacity = ramp(p);
            if (p < 1 && once[7]) {
                once[7] = false;
                factor = factors[7];
                [listenerRemover, once] = removeListenersAndOnces(pred12, listenerRemover, once)
            }
        }
        if (p === 1 && !once[7]) {
            factors[7] = factor;
            if (document.getElementsByName("question12")[0].checked) {
                predecessor[8] = predecessor[7] + factor /43;
                listenerRemover[8] = uos(predecessor[7], predecessor[7] + factor / 43, p => instances[8](p));
            }
            if (document.getElementsByName("question12")[1].checked) {
                predecessor[9] = predecessor[7] + factor /43;
                listenerRemover[9] = uos(predecessor[7], predecessor[7] + factor / 43, p => instances[9](p));
            }
            if (document.getElementsByName("question12")[2].checked) {
                predecessor[10] = predecessor[7] + factor /43;
                listenerRemover[10] = uos(predecessor[7], predecessor[7] + factor / 43, p => instances[10](p));
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
            document.getElementById("13").style.zIndex = "41";
            document.getElementById("13").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[8]) {
            factors[8] = factor;
            predecessor[47] = predecessor[8] + factor /43;
            listenerRemover[47] = uos(predecessor[8] , predecessor[8] + factor /43, p => instances[47](p));
            once[8] = true;
        }
    };
    once[47] = false;
    instances[47] = (p) => {
        if (p <= 0) {
        } else {
        }
        if (p === 1 && !once[47]) {
            factors[47] = factor;
            once[47] = true;
        }
    };
    once[9] = false;
    instances[9] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c14") !== null) document.getElementById("c14").classList.remove("active");
            document.getElementById("14").style.zIndex = "-1";
        } else {
            if(document.getElementById("c14") !== null) document.getElementById("c14").classList.add("active");
            document.getElementById("14").style.zIndex = "41";
            document.getElementById("14").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[9]) {
            factors[9] = factor;
            predecessor[47] = predecessor[9] + factor /43;
            listenerRemover[47] = uos(predecessor[9] , predecessor[9] + factor /43, p => instances[47](p));
            once[9] = true;
        }
    };
    once[10] = false;
    instances[10] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c15") !== null) document.getElementById("c15").classList.remove("active");
            document.getElementById("15").style.zIndex = "-1";
        } else {
            if(document.getElementById("c15") !== null) document.getElementById("c15").classList.add("active");
            document.getElementById("15").style.zIndex = "9";
            document.getElementById("15").style.opacity = ramp(p);
        }
        if (p === 1 && !once[10]) {
            factors[10] = factor;
            predecessor[11] = predecessor[10] + factor /43;
            listenerRemover[11] = uos(predecessor[10] , predecessor[10] + factor /43, p => instances[11](p));
            once[10] = true;
        }
    };
    once[11] = false;
    instances[11] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c16") !== null) document.getElementById("c16").classList.remove("active");
            document.getElementById("16").style.zIndex = "-1";
        } else {
            if(document.getElementById("c16") !== null) document.getElementById("c16").classList.add("active");
            document.getElementById("16").style.zIndex = "10";
            document.getElementById("16").style.opacity = ramp(p);
        }
        if (p === 1 && !once[11]) {
            factors[11] = factor;
            predecessor[12] = predecessor[11] + factor /43;
            listenerRemover[12] = uos(predecessor[11] , predecessor[11] + factor /43, p => instances[12](p));
            once[11] = true;
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
            predecessor[35] = predecessor[12] + factor /43;
            listenerRemover[35] = uos(predecessor[12] , predecessor[12] + factor /43, p => instances[35](p));
            once[12] = true;
        }
    };
    once[35] = false;
    instances[35] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c59") !== null) document.getElementById("c59").classList.remove("active");
            document.getElementById("59").style.zIndex = "-1";
        } else {
            if(document.getElementById("c59") !== null) document.getElementById("c59").classList.add("active");
            document.getElementById("59").style.zIndex = "12";
            document.getElementById("59").style.opacity = ramp(p);
        }
        if (p === 1 && !once[35]) {
            factors[35] = factor;
            predecessor[36] = predecessor[35] + factor /43;
            listenerRemover[36] = uos(predecessor[35] , predecessor[35] + factor /43, p => instances[36](p));
            once[35] = true;
        }
    };
    once[36] = false;
    instances[36] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c60") !== null) document.getElementById("c60").classList.remove("active");
            document.getElementById("60").style.zIndex = "-1";
        } else {
            if(document.getElementById("c60") !== null) document.getElementById("c60").classList.add("active");
            document.getElementById("60").style.zIndex = "13";
            if(p < 1) document.getElementById("60").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[36]) {
            factors[36] = factor;
            predecessor[13] = predecessor[36] + factor /43;
            listenerRemover[13] = uos(predecessor[36] , predecessor[36] + factor /43, p => instances[13](p));
            once[36] = true;
        }
    };
    once[13] = false;
    instances[13] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c22") !== null) document.getElementById("c22").classList.remove("active");
            document.getElementById("22").style.zIndex = "-1";
        } else {
            if(document.getElementById("c22") !== null) document.getElementById("c22").classList.add("active");
            document.getElementById("22").style.zIndex = "14";
            document.getElementById("22").style.opacity = ramp(p);
        }
        if (p === 1 && !once[13]) {
            factors[13] = factor;
            predecessor[37] = predecessor[13] + factor /43;
            listenerRemover[37] = uos(predecessor[13] , predecessor[13] + factor /43, p => instances[37](p));
            once[13] = true;
        }
    };
    once[37] = false;
    instances[37] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c61") !== null) document.getElementById("c61").classList.remove("active");
            document.getElementById("61").style.zIndex = "-1";
        } else {
            if(document.getElementById("c61") !== null) document.getElementById("c61").classList.add("active");
            document.getElementById("61").style.zIndex = "15";
            if(p < 1) document.getElementById("61").style.opacity = rampIn(p);
            document.getElementById("60").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[37]) {
            factors[37] = factor;
            predecessor[14] = predecessor[37] + factor /43;
            listenerRemover[14] = uos(predecessor[37] , predecessor[37] + factor /43, p => instances[14](p));
            once[37] = true;
        }
    };
    once[14] = false;
    instances[14] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c23") !== null) document.getElementById("c23").classList.remove("active");
            document.getElementById("23").style.zIndex = "-1";
        } else {
            if(document.getElementById("c23") !== null) document.getElementById("c23").classList.add("active");
            document.getElementById("23").style.zIndex = "16";
            document.getElementById("23").style.opacity = ramp(p);
        }
        if (p === 1 && !once[14]) {
            factors[14] = factor;
            predecessor[15] = predecessor[14] + factor /43;
            listenerRemover[15] = uos(predecessor[14] , predecessor[14] + factor /43, p => instances[15](p));
            once[14] = true;
        }
    };
    once[15] = false;
    instances[15] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c24") !== null) document.getElementById("c24").classList.remove("active");
            document.getElementById("24").style.zIndex = "-1";
        } else {
            if(document.getElementById("c24") !== null) document.getElementById("c24").classList.add("active");
            document.getElementById("24").style.zIndex = "17";
            document.getElementById("24").style.opacity = ramp(p);
            if (p < 1 && once[15]) {
                once[15] = false;
                factor = factors[15];
                [listenerRemover, once] = removeListenersAndOnces(pred24, listenerRemover, once)
            }
            document.getElementById("61").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[15]) {
            factors[15] = factor;
            if (document.getElementsByName("question24")[0].checked) {
                predecessor[16] = predecessor[15] + factor /43;
                listenerRemover[16] = uos(predecessor[15], predecessor[15] + factor / 43, p => instances[16](p));
            }
            if (document.getElementsByName("question24")[1].checked) {
                predecessor[19] = predecessor[15] + factor /43;
                listenerRemover[19] = uos(predecessor[15], predecessor[15] + factor / 43, p => instances[19](p));
            }
            once[15] = true;
        }
    };
    once[16] = false;
    instances[16] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c25") !== null) document.getElementById("c25").classList.remove("active");
            document.getElementById("25").style.zIndex = "-1";
        } else {
            if(document.getElementById("c25") !== null) document.getElementById("c25").classList.add("active");
            document.getElementById("25").style.zIndex = "39";
            document.getElementById("25").style.opacity = ramp(p);
        }
        if (p === 1 && !once[16]) {
            factors[16] = factor;
            predecessor[17] = predecessor[16] + factor /43;
            listenerRemover[17] = uos(predecessor[16] , predecessor[16] + factor /43, p => instances[17](p));
            once[16] = true;
        }
    };
    once[17] = false;
    instances[17] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c26") !== null) document.getElementById("c26").classList.remove("active");
            document.getElementById("26").style.zIndex = "-1";
        } else {
            if(document.getElementById("c26") !== null) document.getElementById("c26").classList.add("active");
            document.getElementById("26").style.zIndex = "40";
            if(p < 1) document.getElementById("26").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[17]) {
            factors[17] = factor;
            predecessor[18] = predecessor[17] + factor /43;
            listenerRemover[18] = uos(predecessor[17] , predecessor[17] + factor /43, p => instances[18](p));
            once[17] = true;
        }
    };
    once[18] = false;
    instances[18] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c27") !== null) document.getElementById("c27").classList.remove("active");
            document.getElementById("27").style.zIndex = "-1";
        } else {
            if(document.getElementById("c27") !== null) document.getElementById("c27").classList.add("active");
            document.getElementById("27").style.zIndex = "41";
            document.getElementById("27").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[18]) {
            factors[18] = factor;
            predecessor[47] = predecessor[18] + factor /43;
            listenerRemover[47] = uos(predecessor[18] , predecessor[18] + factor /43, p => instances[47](p));
            once[18] = true;
        }
    };
    once[19] = false;
    instances[19] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c29") !== null) document.getElementById("c29").classList.remove("active");
            document.getElementById("29").style.zIndex = "-1";
        } else {
            if(document.getElementById("c29") !== null) document.getElementById("c29").classList.add("active");
            document.getElementById("29").style.zIndex = "18";
            document.getElementById("29").style.opacity = ramp(p);
        }
        if (p === 1 && !once[19]) {
            factors[19] = factor;
            predecessor[20] = predecessor[19] + factor /43;
            listenerRemover[20] = uos(predecessor[19] , predecessor[19] + factor /43, p => instances[20](p));
            once[19] = true;
        }
    };
    once[20] = false;
    instances[20] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c30") !== null) document.getElementById("c30").classList.remove("active");
            document.getElementById("30").style.zIndex = "-1";
        } else {
            if(document.getElementById("c30") !== null) document.getElementById("c30").classList.add("active");
            document.getElementById("30").style.zIndex = "19";
            if(p < 1) document.getElementById("30").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[20]) {
            factors[20] = factor;
            predecessor[21] = predecessor[20] + factor /43;
            listenerRemover[21] = uos(predecessor[20] , predecessor[20] + factor /43, p => instances[21](p));
            once[20] = true;
        }
    };
    once[21] = false;
    instances[21] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c31") !== null) document.getElementById("c31").classList.remove("active");
            document.getElementById("31").style.zIndex = "-1";
        } else {
            if(document.getElementById("c31") !== null) document.getElementById("c31").classList.add("active");
            document.getElementById("31").style.zIndex = "20";
            document.getElementById("31").style.opacity = ramp(p);
        }
        if (p === 1 && !once[21]) {
            factors[21] = factor;
            predecessor[22] = predecessor[21] + factor /43;
            listenerRemover[22] = uos(predecessor[21] , predecessor[21] + factor /43, p => instances[22](p));
            once[21] = true;
        }
    };
    once[22] = false;
    instances[22] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c32") !== null) document.getElementById("c32").classList.remove("active");
            document.getElementById("32").style.zIndex = "-1";
        } else {
            if(document.getElementById("c32") !== null) document.getElementById("c32").classList.add("active");
            document.getElementById("32").style.zIndex = "21";
            document.getElementById("32").style.opacity = ramp(p);
            document.getElementById("30").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[22]) {
            factors[22] = factor;
            predecessor[38] = predecessor[22] + factor /43;
            listenerRemover[38] = uos(predecessor[22] , predecessor[22] + factor /43, p => instances[38](p));
            once[22] = true;
        }
    };
    once[38] = false;
    instances[38] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c62") !== null) document.getElementById("c62").classList.remove("active");
            document.getElementById("62").style.zIndex = "-1";
        } else {
            if(document.getElementById("c62") !== null) document.getElementById("c62").classList.add("active");
            document.getElementById("62").style.zIndex = "22";
            document.getElementById("62").style.opacity = ramp(p);
        }
        if (p === 1 && !once[38]) {
            factors[38] = factor;
            predecessor[39] = predecessor[38] + factor /43;
            listenerRemover[39] = uos(predecessor[38] , predecessor[38] + factor /43, p => instances[39](p));
            once[38] = true;
        }
    };
    once[39] = false;
    instances[39] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c63") !== null) document.getElementById("c63").classList.remove("active");
            document.getElementById("63").style.zIndex = "-1";
        } else {
            if(document.getElementById("c63") !== null) document.getElementById("c63").classList.add("active");
            document.getElementById("63").style.zIndex = "23";
            if(p < 1) document.getElementById("63").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[39]) {
            factors[39] = factor;
            predecessor[23] = predecessor[39] + factor /43;
            listenerRemover[23] = uos(predecessor[39] , predecessor[39] + factor /43, p => instances[23](p));
            once[39] = true;
        }
    };
    once[23] = false;
    instances[23] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c35") !== null) document.getElementById("c35").classList.remove("active");
            document.getElementById("35").style.zIndex = "-1";
        } else {
            if(document.getElementById("c35") !== null) document.getElementById("c35").classList.add("active");
            document.getElementById("35").style.zIndex = "24";
            document.getElementById("35").style.opacity = ramp(p);
        }
        if (p === 1 && !once[23]) {
            factors[23] = factor;
            predecessor[40] = predecessor[23] + factor /43;
            listenerRemover[40] = uos(predecessor[23] , predecessor[23] + factor /43, p => instances[40](p));
            once[23] = true;
        }
    };
    once[40] = false;
    instances[40] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c64") !== null) document.getElementById("c64").classList.remove("active");
            document.getElementById("64").style.zIndex = "-1";
        } else {
            if(document.getElementById("c64") !== null) document.getElementById("c64").classList.add("active");
            document.getElementById("64").style.zIndex = "25";
            if(p < 1) document.getElementById("64").style.opacity = rampIn(p);
            document.getElementById("63").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[40]) {
            factors[40] = factor;
            predecessor[24] = predecessor[40] + factor /43;
            listenerRemover[24] = uos(predecessor[40] , predecessor[40] + factor /43, p => instances[24](p));
            once[40] = true;
        }
    };
    once[24] = false;
    instances[24] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c37") !== null) document.getElementById("c37").classList.remove("active");
            document.getElementById("37").style.zIndex = "-1";
        } else {
            if(document.getElementById("c37") !== null) document.getElementById("c37").classList.add("active");
            document.getElementById("37").style.zIndex = "26";
            document.getElementById("37").style.opacity = ramp(p);
        }
        if (p === 1 && !once[24]) {
            factors[24] = factor;
            predecessor[41] = predecessor[24] + factor /43;
            listenerRemover[41] = uos(predecessor[24] , predecessor[24] + factor /43, p => instances[41](p));
            once[24] = true;
        }
    };
    once[41] = false;
    instances[41] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c65") !== null) document.getElementById("c65").classList.remove("active");
            document.getElementById("65").style.zIndex = "-1";
        } else {
            if(document.getElementById("c65") !== null) document.getElementById("c65").classList.add("active");
            document.getElementById("65").style.zIndex = "27";
            if(p < 1) document.getElementById("65").style.opacity = rampIn(p);
            document.getElementById("64").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[41]) {
            factors[41] = factor;
            predecessor[25] = predecessor[41] + factor /43;
            listenerRemover[25] = uos(predecessor[41] , predecessor[41] + factor /43, p => instances[25](p));
            once[41] = true;
        }
    };
    once[25] = false;
    instances[25] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c39") !== null) document.getElementById("c39").classList.remove("active");
            document.getElementById("39").style.zIndex = "-1";
        } else {
            if(document.getElementById("c39") !== null) document.getElementById("c39").classList.add("active");
            document.getElementById("39").style.zIndex = "28";
            document.getElementById("39").style.opacity = ramp(p);
        }
        if (p === 1 && !once[25]) {
            factors[25] = factor;
            predecessor[42] = predecessor[25] + factor /43;
            listenerRemover[42] = uos(predecessor[25] , predecessor[25] + factor /43, p => instances[42](p));
            once[25] = true;
        }
    };
    once[42] = false;
    instances[42] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c66") !== null) document.getElementById("c66").classList.remove("active");
            document.getElementById("66").style.zIndex = "-1";
        } else {
            if(document.getElementById("c66") !== null) document.getElementById("c66").classList.add("active");
            document.getElementById("66").style.zIndex = "29";
            if(p < 1) document.getElementById("66").style.opacity = rampIn(p);
            document.getElementById("65").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[42]) {
            factors[42] = factor;
            predecessor[26] = predecessor[42] + factor /43;
            listenerRemover[26] = uos(predecessor[42] , predecessor[42] + factor /43, p => instances[26](p));
            once[42] = true;
        }
    };
    once[26] = false;
    instances[26] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c41") !== null) document.getElementById("c41").classList.remove("active");
            document.getElementById("41").style.zIndex = "-1";
        } else {
            if(document.getElementById("c41") !== null) document.getElementById("c41").classList.add("active");
            document.getElementById("41").style.zIndex = "30";
            document.getElementById("41").style.opacity = ramp(p);
        }
        if (p === 1 && !once[26]) {
            factors[26] = factor;
            predecessor[43] = predecessor[26] + factor /43;
            listenerRemover[43] = uos(predecessor[26] , predecessor[26] + factor /43, p => instances[43](p));
            once[26] = true;
        }
    };
    once[43] = false;
    instances[43] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c67") !== null) document.getElementById("c67").classList.remove("active");
            document.getElementById("67").style.zIndex = "-1";
        } else {
            if(document.getElementById("c67") !== null) document.getElementById("c67").classList.add("active");
            document.getElementById("67").style.zIndex = "31";
            if(p < 1) document.getElementById("67").style.opacity = rampIn(p);
            document.getElementById("66").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[43]) {
            factors[43] = factor;
            predecessor[27] = predecessor[43] + factor /43;
            listenerRemover[27] = uos(predecessor[43] , predecessor[43] + factor /43, p => instances[27](p));
            once[43] = true;
        }
    };
    once[27] = false;
    instances[27] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c43") !== null) document.getElementById("c43").classList.remove("active");
            document.getElementById("43").style.zIndex = "-1";
        } else {
            if(document.getElementById("c43") !== null) document.getElementById("c43").classList.add("active");
            document.getElementById("43").style.zIndex = "32";
            document.getElementById("43").style.opacity = ramp(p);
        }
        if (p === 1 && !once[27]) {
            factors[27] = factor;
            predecessor[44] = predecessor[27] + factor /43;
            listenerRemover[44] = uos(predecessor[27] , predecessor[27] + factor /43, p => instances[44](p));
            once[27] = true;
        }
    };
    once[44] = false;
    instances[44] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c68") !== null) document.getElementById("c68").classList.remove("active");
            document.getElementById("68").style.zIndex = "-1";
        } else {
            if(document.getElementById("c68") !== null) document.getElementById("c68").classList.add("active");
            document.getElementById("68").style.zIndex = "33";
            if(p < 1) document.getElementById("68").style.opacity = rampIn(p);
            document.getElementById("67").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[44]) {
            factors[44] = factor;
            predecessor[28] = predecessor[44] + factor /43;
            listenerRemover[28] = uos(predecessor[44] , predecessor[44] + factor /43, p => instances[28](p));
            once[44] = true;
        }
    };
    once[28] = false;
    instances[28] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c45") !== null) document.getElementById("c45").classList.remove("active");
            document.getElementById("45").style.zIndex = "-1";
        } else {
            if(document.getElementById("c45") !== null) document.getElementById("c45").classList.add("active");
            document.getElementById("45").style.zIndex = "34";
            document.getElementById("45").style.opacity = ramp(p);
        }
        if (p === 1 && !once[28]) {
            factors[28] = factor;
            predecessor[45] = predecessor[28] + factor /43;
            listenerRemover[45] = uos(predecessor[28] , predecessor[28] + factor /43, p => instances[45](p));
            once[28] = true;
        }
    };
    once[45] = false;
    instances[45] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c69") !== null) document.getElementById("c69").classList.remove("active");
            document.getElementById("69").style.zIndex = "-1";
        } else {
            if(document.getElementById("c69") !== null) document.getElementById("c69").classList.add("active");
            document.getElementById("69").style.zIndex = "35";
            if(p < 1) document.getElementById("69").style.opacity = rampIn(p);
            document.getElementById("68").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[45]) {
            factors[45] = factor;
            predecessor[29] = predecessor[45] + factor /43;
            listenerRemover[29] = uos(predecessor[45] , predecessor[45] + factor /43, p => instances[29](p));
            once[45] = true;
        }
    };
    once[29] = false;
    instances[29] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c47") !== null) document.getElementById("c47").classList.remove("active");
            document.getElementById("47").style.zIndex = "-1";
        } else {
            if(document.getElementById("c47") !== null) document.getElementById("c47").classList.add("active");
            document.getElementById("47").style.zIndex = "36";
            document.getElementById("47").style.opacity = ramp(p);
        }
        if (p === 1 && !once[29]) {
            factors[29] = factor;
            predecessor[46] = predecessor[29] + factor /43;
            listenerRemover[46] = uos(predecessor[29] , predecessor[29] + factor /43, p => instances[46](p));
            once[29] = true;
        }
    };
    once[46] = false;
    instances[46] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c70") !== null) document.getElementById("c70").classList.remove("active");
            document.getElementById("70").style.zIndex = "-1";
        } else {
            if(document.getElementById("c70") !== null) document.getElementById("c70").classList.add("active");
            document.getElementById("70").style.zIndex = "37";
            if(p < 1) document.getElementById("70").style.opacity = rampIn(p);
            document.getElementById("69").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[46]) {
            factors[46] = factor;
            predecessor[30] = predecessor[46] + factor /43;
            listenerRemover[30] = uos(predecessor[46] , predecessor[46] + factor /43, p => instances[30](p));
            once[46] = true;
        }
    };
    once[30] = false;
    instances[30] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c49") !== null) document.getElementById("c49").classList.remove("active");
            document.getElementById("49").style.zIndex = "-1";
        } else {
            if(document.getElementById("c49") !== null) document.getElementById("c49").classList.add("active");
            document.getElementById("49").style.zIndex = "38";
            document.getElementById("49").style.opacity = ramp(p);
        }
        if (p === 1 && !once[30]) {
            factors[30] = factor;
            predecessor[31] = predecessor[30] + factor /43;
            listenerRemover[31] = uos(predecessor[30] , predecessor[30] + factor /43, p => instances[31](p));
            once[30] = true;
        }
    };
    once[31] = false;
    instances[31] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c51") !== null) document.getElementById("c51").classList.remove("active");
            document.getElementById("51").style.zIndex = "-1";
        } else {
            if(document.getElementById("c51") !== null) document.getElementById("c51").classList.add("active");
            document.getElementById("51").style.zIndex = "39";
            document.getElementById("51").style.opacity = ramp(p);
            document.getElementById("70").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[31]) {
            factors[31] = factor;
            predecessor[32] = predecessor[31] + factor /43;
            listenerRemover[32] = uos(predecessor[31] , predecessor[31] + factor /43, p => instances[32](p));
            once[31] = true;
        }
    };
    once[32] = false;
    instances[32] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c52") !== null) document.getElementById("c52").classList.remove("active");
            document.getElementById("52").style.zIndex = "-1";
        } else {
            if(document.getElementById("c52") !== null) document.getElementById("c52").classList.add("active");
            document.getElementById("52").style.zIndex = "40";
            document.getElementById("52").style.opacity = ramp(p);
        }
        if (p === 1 && !once[32]) {
            factors[32] = factor;
            predecessor[33] = predecessor[32] + factor /43;
            listenerRemover[33] = uos(predecessor[32] , predecessor[32] + factor /43, p => instances[33](p));
            once[32] = true;
        }
    };
    once[33] = false;
    instances[33] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c53") !== null) document.getElementById("c53").classList.remove("active");
            document.getElementById("53").style.zIndex = "-1";
        } else {
            if(document.getElementById("c53") !== null) document.getElementById("c53").classList.add("active");
            document.getElementById("53").style.zIndex = "41";
            document.getElementById("53").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[33]) {
            factors[33] = factor;
            predecessor[47] = predecessor[33] + factor /43;
            listenerRemover[47] = uos(predecessor[33] , predecessor[33] + factor /43, p => instances[47](p));
            once[33] = true;
        }
    };
        return [start, instances,once,43];
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