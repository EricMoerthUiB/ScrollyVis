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
     predecessor[1] = 1/38;
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
        }
        if (p === 1 && !once[1]) {
            factors[1] = factor;
            predecessor[2] = predecessor[1] + factor /38;
            listenerRemover[2] = uos(predecessor[1] , predecessor[1] + factor /38, p => instances[2](p));
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
            predecessor[3] = predecessor[2] + factor /38;
            listenerRemover[3] = uos(predecessor[2] , predecessor[2] + factor /38, p => instances[3](p));
            once[2] = true;
        }
    };
    once[3] = false;
    instances[3] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c5") !== null) document.getElementById("c5").classList.remove("active");
            document.getElementById("5").style.zIndex = "-1";
        } else {
            if(document.getElementById("c5") !== null) document.getElementById("c5").classList.add("active");
            document.getElementById("5").style.zIndex = "3";
            document.getElementById("5").style.opacity = ramp(p);
        }
        if (p === 1 && !once[3]) {
            factors[3] = factor;
            predecessor[4] = predecessor[3] + factor /38;
            listenerRemover[4] = uos(predecessor[3] , predecessor[3] + factor /38, p => instances[4](p));
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
            predecessor[5] = predecessor[4] + factor /38;
            listenerRemover[5] = uos(predecessor[4] , predecessor[4] + factor /38, p => instances[5](p));
            once[4] = true;
        }
    };
    once[5] = false;
    instances[5] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c8") !== null) document.getElementById("c8").classList.remove("active");
            alterUniform(LoadData.vol8,0,"u_opacity");
        } else {
            if(document.getElementById("c8") !== null) document.getElementById("c8").classList.add("active");
             if(p < 1) {
              rampTo(p, 0, 3.0517578125, _camera);
              alterUniform(LoadData.vol8,rampIn(p),"u_opacity");
            }
            document.getElementById("3").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[5]) {
            factors[5] = factor;
            predecessor[6] = predecessor[5] + factor /38;
            listenerRemover[6] = uos(predecessor[5] , predecessor[5] + factor /38, p => instances[6](p));
            once[5] = true;
        }
    };
    once[6] = false;
    instances[6] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c10") !== null) document.getElementById("c10").classList.remove("active");
        } else {
            if(document.getElementById("c10") !== null) document.getElementById("c10").classList.add("active");
             if(p < 1) {
              rampTo(p, 3.0517578125,3.0517578125,_camera);
              rampToPosRot(p, [0,0],[0,0],[0,0,0],[-1.0681415022205298,-0.5621797380108048,0],[0,0],[0,0],LoadData.vol8,LoadData.sl8);
              rampSettings(p,[0.15,0.8,2,0.15,"gray", 0],[0.15,0.8,2,0.15,"gray",0],LoadData.vol8,  LoadData.sl8);
            }
        }
        if (p === 1 && !once[6]) {
            factors[6] = factor;
            predecessor[9] = predecessor[6] + factor /38;
            listenerRemover[9] = uos(predecessor[6] , predecessor[6] + factor /38, p => instances[9](p));
            once[6] = true;
        }
    };
    once[9] = false;
    instances[9] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c13") !== null) document.getElementById("c13").classList.remove("active");
            document.getElementById("13").style.zIndex = "-1";
        } else {
            if(document.getElementById("c13") !== null) document.getElementById("c13").classList.add("active");
            document.getElementById("13").style.zIndex = "7";
            document.getElementById("13").style.opacity = ramp(p);
        }
        if (p === 1 && !once[9]) {
            factors[9] = factor;
            predecessor[7] = predecessor[9] + factor /38;
            listenerRemover[7] = uos(predecessor[9] , predecessor[9] + factor /38, p => instances[7](p));
            once[9] = true;
        }
    };
    once[7] = false;
    instances[7] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c11") !== null) document.getElementById("c11").classList.remove("active");
            alterUniform(LoadData.vol11,0,"u_opacity");
        } else {
            if(document.getElementById("c11") !== null) document.getElementById("c11").classList.add("active");
             if(p < 1) {
              rampTo(p, 0, 3.0517578125, _camera);
              alterUniform(LoadData.vol11,rampIn(p),"u_opacity");
            }
            alterUniform(LoadData.vol8,rampOut(p),"u_opacity");
        }
        if (p === 1 && !once[7]) {
            factors[7] = factor;
            predecessor[10] = predecessor[7] + factor /38;
            listenerRemover[10] = uos(predecessor[7] , predecessor[7] + factor /38, p => instances[10](p));
            once[7] = true;
        }
    };
    once[10] = false;
    instances[10] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c14") !== null) document.getElementById("c14").classList.remove("active");
            document.getElementById("14").style.zIndex = "-1";
        } else {
            if(document.getElementById("c14") !== null) document.getElementById("c14").classList.add("active");
            document.getElementById("14").style.zIndex = "9";
            document.getElementById("14").style.opacity = ramp(p);
        }
        if (p === 1 && !once[10]) {
            factors[10] = factor;
            predecessor[8] = predecessor[10] + factor /38;
            listenerRemover[8] = uos(predecessor[10] , predecessor[10] + factor /38, p => instances[8](p));
            once[10] = true;
        }
    };
    once[8] = false;
    instances[8] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c12") !== null) document.getElementById("c12").classList.remove("active");
        } else {
            if(document.getElementById("c12") !== null) document.getElementById("c12").classList.add("active");
             if(p < 1) {
              rampTo(p, 3.0517578125,3.0517578125,_camera);
              rampToPosRot(p, [0,0],[0,0],[-1.0681415022205298,-0.5621797380108048,0],[-2.8274333882308142,-2.728225199170083,0],[0,0],[0,0],LoadData.vol11,LoadData.sl11);
              rampSettings(p,[0.15,0.8,2,0.15,"gray", 0],[0.15,0.8,2,0.15,"gray",0],LoadData.vol11,  LoadData.sl11);
            }
        }
        if (p === 1 && !once[8]) {
            factors[8] = factor;
            predecessor[36] = predecessor[8] + factor /38;
            listenerRemover[36] = uos(predecessor[8] , predecessor[8] + factor /38, p => instances[36](p));
            once[8] = true;
        }
    };
    once[36] = false;
    instances[36] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c42") !== null) document.getElementById("c42").classList.remove("active");
            document.getElementById("42").style.zIndex = "-1";
        } else {
            if(document.getElementById("c42") !== null) document.getElementById("c42").classList.add("active");
            document.getElementById("42").style.zIndex = "11";
            document.getElementById("42").style.opacity = ramp(p);
        }
        if (p === 1 && !once[36]) {
            factors[36] = factor;
            predecessor[11] = predecessor[36] + factor /38;
            listenerRemover[11] = uos(predecessor[36] , predecessor[36] + factor /38, p => instances[11](p));
            once[36] = true;
        }
    };
    once[11] = false;
    instances[11] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c15") !== null) document.getElementById("c15").classList.remove("active");
            alterUniform(LoadData.sl15,0,"u_opacity");
        } else {
            if(document.getElementById("c15") !== null) document.getElementById("c15").classList.add("active");
             if(p < 1) {
              rampTo(p, 0, 0.7938498832162935, _camera);
              alterUniform(LoadData.sl15,rampIn(p),"u_opacity");
            }
            alterUniform(LoadData.vol11,rampOut(p),"u_opacity");
        }
        if (p === 1 && !once[11]) {
            factors[11] = factor;
            predecessor[12] = predecessor[11] + factor /38;
            listenerRemover[12] = uos(predecessor[11] , predecessor[11] + factor /38, p => instances[12](p));
            once[11] = true;
        }
    };
    once[12] = false;
    instances[12] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c16") !== null) document.getElementById("c16").classList.remove("active");
        } else {
            if(document.getElementById("c16") !== null) document.getElementById("c16").classList.add("active");
             if(p < 1) {
              rampTo(p, 0.7938498832162935,0.7938498832162935,_camera);
              rampToPosRot(p, [0,0],[0,0],[-2.8274333882308142,-2.728225199170083,0],[-2.8274333882308142,-2.728225199170083,0],[0,0],[0,0],LoadData.vol15,LoadData.sl15);
              rampSettings(p,[0.15,0.8,2,0.15,"gray", 2],[0.15,0.8,2,0.15,"gray",45],LoadData.vol15,  LoadData.sl15);
            }
        }
        if (p === 1 && !once[12]) {
            factors[12] = factor;
            predecessor[13] = predecessor[12] + factor /38;
            listenerRemover[13] = uos(predecessor[12] , predecessor[12] + factor /38, p => instances[13](p));
            once[12] = true;
        }
    };
    once[13] = false;
    instances[13] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c17") !== null) document.getElementById("c17").classList.remove("active");
            document.getElementById("17").style.zIndex = "-1";
        } else {
            if(document.getElementById("c17") !== null) document.getElementById("c17").classList.add("active");
            document.getElementById("17").style.zIndex = "14";
            document.getElementById("17").style.opacity = ramp(p);
        }
        if (p === 1 && !once[13]) {
            factors[13] = factor;
            predecessor[14] = predecessor[13] + factor /38;
            listenerRemover[14] = uos(predecessor[13] , predecessor[13] + factor /38, p => instances[14](p));
            once[13] = true;
        }
    };
    once[14] = false;
    instances[14] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c18") !== null) document.getElementById("c18").classList.remove("active");
        } else {
            if(document.getElementById("c18") !== null) document.getElementById("c18").classList.add("active");
             if(p < 1) {
              rampTo(p, 0.7938498832162935,0.7938498832162935,_camera);
              rampToPosRot(p, [0,0],[0,0],[-2.8274333882308142,-2.728225199170083,0],[-2.8274333882308142,-2.728225199170083,0],[0,0],[0,0],LoadData.vol15,LoadData.sl15);
              rampSettings(p,[0.15,0.8,2,0.15,"gray", 45],[0.15,0.8,2,0.15,"gray",81],LoadData.vol15,  LoadData.sl15);
            }
        }
        if (p === 1 && !once[14]) {
            factors[14] = factor;
            predecessor[15] = predecessor[14] + factor /38;
            listenerRemover[15] = uos(predecessor[14] , predecessor[14] + factor /38, p => instances[15](p));
            once[14] = true;
        }
    };
    once[15] = false;
    instances[15] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c19") !== null) document.getElementById("c19").classList.remove("active");
            document.getElementById("19").style.zIndex = "-1";
        } else {
            if(document.getElementById("c19") !== null) document.getElementById("c19").classList.add("active");
            document.getElementById("19").style.zIndex = "16";
            document.getElementById("19").style.opacity = ramp(p);
        }
        if (p === 1 && !once[15]) {
            factors[15] = factor;
            predecessor[16] = predecessor[15] + factor /38;
            listenerRemover[16] = uos(predecessor[15] , predecessor[15] + factor /38, p => instances[16](p));
            once[15] = true;
        }
    };
    once[16] = false;
    instances[16] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c20") !== null) document.getElementById("c20").classList.remove("active");
            document.getElementById("20").style.zIndex = "-1";
        } else {
            if(document.getElementById("c20") !== null) document.getElementById("c20").classList.add("active");
            document.getElementById("20").style.zIndex = "17";
            document.getElementById("20").style.opacity = ramp(p);
            alterUniform(LoadData.sl15,rampOut(p),"u_opacity");
        }
        if (p === 1 && !once[16]) {
            factors[16] = factor;
            predecessor[17] = predecessor[16] + factor /38;
            listenerRemover[17] = uos(predecessor[16] , predecessor[16] + factor /38, p => instances[17](p));
            once[16] = true;
        }
    };
    once[17] = false;
    instances[17] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c21") !== null) document.getElementById("c21").classList.remove("active");
            document.getElementById("21").style.zIndex = "-1";
        } else {
            if(document.getElementById("c21") !== null) document.getElementById("c21").classList.add("active");
            document.getElementById("21").style.zIndex = "18";
            if(p < 1) document.getElementById("21").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[17]) {
            factors[17] = factor;
            predecessor[18] = predecessor[17] + factor /38;
            listenerRemover[18] = uos(predecessor[17] , predecessor[17] + factor /38, p => instances[18](p));
            once[17] = true;
        }
    };
    once[18] = false;
    instances[18] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c22") !== null) document.getElementById("c22").classList.remove("active");
            document.getElementById("22").style.zIndex = "-1";
        } else {
            if(document.getElementById("c22") !== null) document.getElementById("c22").classList.add("active");
            document.getElementById("22").style.zIndex = "19";
            document.getElementById("22").style.opacity = ramp(p);
        }
        if (p === 1 && !once[18]) {
            factors[18] = factor;
            predecessor[19] = predecessor[18] + factor /38;
            listenerRemover[19] = uos(predecessor[18] , predecessor[18] + factor /38, p => instances[19](p));
            once[18] = true;
        }
    };
    once[19] = false;
    instances[19] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c23") !== null) document.getElementById("c23").classList.remove("active");
            document.getElementById("23").style.zIndex = "-1";
        } else {
            if(document.getElementById("c23") !== null) document.getElementById("c23").classList.add("active");
            document.getElementById("23").style.zIndex = "20";
            document.getElementById("23").style.opacity = ramp(p);
        }
        if (p === 1 && !once[19]) {
            factors[19] = factor;
            predecessor[20] = predecessor[19] + factor /38;
            listenerRemover[20] = uos(predecessor[19] , predecessor[19] + factor /38, p => instances[20](p));
            once[19] = true;
        }
    };
    once[20] = false;
    instances[20] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c24") !== null) document.getElementById("c24").classList.remove("active");
            alterUniform(LoadData.sl24,0,"u_opacity");
        } else {
            if(document.getElementById("c24") !== null) document.getElementById("c24").classList.add("active");
             if(p < 1) {
              rampTo(p, 0, 5.242975975512261, _camera);
              alterUniform(LoadData.sl24,rampIn(p),"u_opacity");
            }
            document.getElementById("21").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[20]) {
            factors[20] = factor;
            predecessor[22] = predecessor[20] + factor /38;
            listenerRemover[22] = uos(predecessor[20] , predecessor[20] + factor /38, p => instances[22](p));
            once[20] = true;
        }
    };
    once[22] = false;
    instances[22] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c26") !== null) document.getElementById("c26").classList.remove("active");
            document.getElementById("26").style.zIndex = "-1";
        } else {
            if(document.getElementById("c26") !== null) document.getElementById("c26").classList.add("active");
            document.getElementById("26").style.zIndex = "22";
            document.getElementById("26").style.opacity = ramp(p);
        }
        if (p === 1 && !once[22]) {
            factors[22] = factor;
            predecessor[21] = predecessor[22] + factor /38;
            listenerRemover[21] = uos(predecessor[22] , predecessor[22] + factor /38, p => instances[21](p));
            once[22] = true;
        }
    };
    once[21] = false;
    instances[21] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c25") !== null) document.getElementById("c25").classList.remove("active");
        } else {
            if(document.getElementById("c25") !== null) document.getElementById("c25").classList.add("active");
             if(p < 1) {
              rampTo(p, 5.242975975512261,4.8436993737439025,_camera);
              rampToPosRot(p, [0,0],[0,0],[-0.5340707511102647,0.21495107629824972,0],[-0.5340707511102647,0.21495107629824972,0],[-30.952076007038986,-6.382366060366184],[0,0],LoadData.vol24,LoadData.sl24);
              rampSettings(p,[0.15,0.8,2,0.15,"gray", 18],[0.15,0.8,2,0.15,"gray",24],LoadData.vol24,  LoadData.sl24);
            }
        }
        if (p === 1 && !once[21]) {
            factors[21] = factor;
            predecessor[26] = predecessor[21] + factor /38;
            listenerRemover[26] = uos(predecessor[21] , predecessor[21] + factor /38, p => instances[26](p));
            once[21] = true;
        }
    };
    once[26] = false;
    instances[26] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c31") !== null) document.getElementById("c31").classList.remove("active");
            document.getElementById("31").style.zIndex = "-1";
        } else {
            if(document.getElementById("c31") !== null) document.getElementById("c31").classList.add("active");
            document.getElementById("31").style.zIndex = "24";
            document.getElementById("31").style.opacity = ramp(p);
        }
        if (p === 1 && !once[26]) {
            factors[26] = factor;
            predecessor[24] = predecessor[26] + factor /38;
            listenerRemover[24] = uos(predecessor[26] , predecessor[26] + factor /38, p => instances[24](p));
            once[26] = true;
        }
    };
    once[24] = false;
    instances[24] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c29") !== null) document.getElementById("c29").classList.remove("active");
        } else {
            if(document.getElementById("c29") !== null) document.getElementById("c29").classList.add("active");
             if(p < 1) {
              rampTo(p, 4.8436993737439025,4.8436993737439025,_camera);
              rampToPosRot(p, [0,0],[0,0],[-0.5340707511102647,0.21495107629824972,0],[-0.5340707511102647,0.21495107629824972,0],[0,0],[0,0],LoadData.vol24,LoadData.sl24);
              rampSettings(p,[0.15,0.8,2,0.15,"gray", 24],[0.15,0.8,2,0.15,"gray",37],LoadData.vol24,  LoadData.sl24);
            }
        }
        if (p === 1 && !once[24]) {
            factors[24] = factor;
            predecessor[23] = predecessor[24] + factor /38;
            listenerRemover[23] = uos(predecessor[24] , predecessor[24] + factor /38, p => instances[23](p));
            once[24] = true;
        }
    };
    once[23] = false;
    instances[23] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c28") !== null) document.getElementById("c28").classList.remove("active");
            document.getElementById("28").style.zIndex = "-1";
        } else {
            if(document.getElementById("c28") !== null) document.getElementById("c28").classList.add("active");
            document.getElementById("28").style.zIndex = "26";
            document.getElementById("28").style.opacity = ramp(p);
        }
        if (p === 1 && !once[23]) {
            factors[23] = factor;
            predecessor[25] = predecessor[23] + factor /38;
            listenerRemover[25] = uos(predecessor[23] , predecessor[23] + factor /38, p => instances[25](p));
            once[23] = true;
        }
    };
    once[25] = false;
    instances[25] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c30") !== null) document.getElementById("c30").classList.remove("active");
        } else {
            if(document.getElementById("c30") !== null) document.getElementById("c30").classList.add("active");
             if(p < 1) {
              rampTo(p, 4.8436993737439025,4.8436993737439025,_camera);
              rampToPosRot(p, [0,0],[0,0],[-0.5340707511102647,0.21495107629824972,0],[-0.5340707511102647,0.21495107629824972,0],[0,0],[0,0],LoadData.vol24,LoadData.sl24);
              rampSettings(p,[0.15,0.8,2,0.15,"gray", 37],[0.15,0.8,2,0.15,"gray",41],LoadData.vol24,  LoadData.sl24);
            }
        }
        if (p === 1 && !once[25]) {
            factors[25] = factor;
            predecessor[27] = predecessor[25] + factor /38;
            listenerRemover[27] = uos(predecessor[25] , predecessor[25] + factor /38, p => instances[27](p));
            once[25] = true;
        }
    };
    once[27] = false;
    instances[27] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c32") !== null) document.getElementById("c32").classList.remove("active");
            document.getElementById("32").style.zIndex = "-1";
        } else {
            if(document.getElementById("c32") !== null) document.getElementById("c32").classList.add("active");
            document.getElementById("32").style.zIndex = "28";
            if(p < 1) document.getElementById("32").style.opacity = rampIn(p);
            alterUniform(LoadData.sl24,rampOut(p),"u_opacity");
        }
        if (p === 1 && !once[27]) {
            factors[27] = factor;
            predecessor[28] = predecessor[27] + factor /38;
            listenerRemover[28] = uos(predecessor[27] , predecessor[27] + factor /38, p => instances[28](p));
            once[27] = true;
        }
    };
    once[28] = false;
    instances[28] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c33") !== null) document.getElementById("c33").classList.remove("active");
            document.getElementById("33").style.zIndex = "-1";
        } else {
            if(document.getElementById("c33") !== null) document.getElementById("c33").classList.add("active");
            document.getElementById("33").style.zIndex = "29";
            document.getElementById("33").style.opacity = ramp(p);
        }
        if (p === 1 && !once[28]) {
            factors[28] = factor;
            predecessor[29] = predecessor[28] + factor /38;
            listenerRemover[29] = uos(predecessor[28] , predecessor[28] + factor /38, p => instances[29](p));
            once[28] = true;
        }
    };
    once[29] = false;
    instances[29] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c34") !== null) document.getElementById("c34").classList.remove("active");
            document.getElementById("34").style.zIndex = "-1";
        } else {
            if(document.getElementById("c34") !== null) document.getElementById("c34").classList.add("active");
            document.getElementById("34").style.zIndex = "30";
            if(p < 1) document.getElementById("34").style.opacity = rampIn(p);
            document.getElementById("32").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[29]) {
            factors[29] = factor;
            predecessor[30] = predecessor[29] + factor /38;
            listenerRemover[30] = uos(predecessor[29] , predecessor[29] + factor /38, p => instances[30](p));
            once[29] = true;
        }
    };
    once[30] = false;
    instances[30] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c35") !== null) document.getElementById("c35").classList.remove("active");
            document.getElementById("35").style.zIndex = "-1";
        } else {
            if(document.getElementById("c35") !== null) document.getElementById("c35").classList.add("active");
            document.getElementById("35").style.zIndex = "31";
            document.getElementById("35").style.opacity = ramp(p);
        }
        if (p === 1 && !once[30]) {
            factors[30] = factor;
            predecessor[31] = predecessor[30] + factor /38;
            listenerRemover[31] = uos(predecessor[30] , predecessor[30] + factor /38, p => instances[31](p));
            once[30] = true;
        }
    };
    once[31] = false;
    instances[31] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c37") !== null) document.getElementById("c37").classList.remove("active");
            document.getElementById("37").style.zIndex = "-1";
        } else {
            if(document.getElementById("c37") !== null) document.getElementById("c37").classList.add("active");
            document.getElementById("37").style.zIndex = "32";
            document.getElementById("37").style.opacity = ramp(p);
        }
        if (p === 1 && !once[31]) {
            factors[31] = factor;
            predecessor[32] = predecessor[31] + factor /38;
            listenerRemover[32] = uos(predecessor[31] , predecessor[31] + factor /38, p => instances[32](p));
            once[31] = true;
        }
    };
    once[32] = false;
    instances[32] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c38") !== null) document.getElementById("c38").classList.remove("active");
            document.getElementById("38").style.zIndex = "-1";
        } else {
            if(document.getElementById("c38") !== null) document.getElementById("c38").classList.add("active");
            document.getElementById("38").style.zIndex = "33";
            document.getElementById("38").style.opacity = ramp(p);
            document.getElementById("34").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[32]) {
            factors[32] = factor;
            predecessor[33] = predecessor[32] + factor /38;
            listenerRemover[33] = uos(predecessor[32] , predecessor[32] + factor /38, p => instances[33](p));
            once[32] = true;
        }
    };
    once[33] = false;
    instances[33] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c39") !== null) document.getElementById("c39").classList.remove("active");
            document.getElementById("39").style.zIndex = "-1";
        } else {
            if(document.getElementById("c39") !== null) document.getElementById("c39").classList.add("active");
            document.getElementById("39").style.zIndex = "34";
            if(p < 1) document.getElementById("39").style.opacity = rampIn(p);
        }
        if (p === 1 && !once[33]) {
            factors[33] = factor;
            predecessor[34] = predecessor[33] + factor /38;
            listenerRemover[34] = uos(predecessor[33] , predecessor[33] + factor /38, p => instances[34](p));
            once[33] = true;
        }
    };
    once[34] = false;
    instances[34] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c40") !== null) document.getElementById("c40").classList.remove("active");
            document.getElementById("40").style.zIndex = "-1";
        } else {
            if(document.getElementById("c40") !== null) document.getElementById("c40").classList.add("active");
            document.getElementById("40").style.zIndex = "35";
            document.getElementById("40").style.opacity = ramp(p);
        }
        if (p === 1 && !once[34]) {
            factors[34] = factor;
            predecessor[35] = predecessor[34] + factor /38;
            listenerRemover[35] = uos(predecessor[34] , predecessor[34] + factor /38, p => instances[35](p));
            once[34] = true;
        }
    };
    once[35] = false;
    instances[35] = (p) => {
        if (p <= 0) {
            if(document.getElementById("c41") !== null) document.getElementById("c41").classList.remove("active");
            document.getElementById("41").style.zIndex = "-1";
        } else {
            if(document.getElementById("c41") !== null) document.getElementById("c41").classList.add("active");
            document.getElementById("41").style.zIndex = "36";
            document.getElementById("41").style.opacity = rampIn(p);
            document.getElementById("39").style.opacity = rampOut(p);
        }
        if (p === 1 && !once[35]) {
            factors[35] = factor;
            predecessor[37] = predecessor[35] + factor /38;
            listenerRemover[37] = uos(predecessor[35] , predecessor[35] + factor /38, p => instances[37](p));
            once[35] = true;
        }
    };
    once[37] = false;
    instances[37] = (p) => {
        if (p <= 0) {
        } else {
        }
        if (p === 1 && !once[37]) {
            factors[37] = factor;
            once[37] = true;
        }
    };
        return [start, instances,once,38];
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