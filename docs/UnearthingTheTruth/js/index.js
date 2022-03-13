import * as RENDER from "../js/volume-render.js"
import * as VOLUME_LOADER from "./loadData.js"
import * as MAP from "./mapCode.js"
import * as SKETCHFAB from "./sketchfab.js"
import * as INSTANCES_LOADER from "./instances.js"
import {groupLength, groups} from "./loadData.js";
import * as LoadData from "./loadData.js";

const header = document.querySelector('.header');
let _renderer, _scene, _camera;
var instances = [];
var once = [];
var len;
var start;
uos(0, 1, p => render());
[_renderer, _scene, _camera] = RENDER.volume_render_init(render);
VOLUME_LOADER.loadVolumeData(_scene, _camera);
[start, instances, once, len] = INSTANCES_LOADER.getInstances(_camera);
document.getElementsByTagName('body')[0].style.minHeight = len * 3000 + "px";
document.getElementsByTagName('body')[0].style.overflow = "hidden";
document.getElementsByTagName('body')[0].style.position = "fixed";
const step = 1 / len;
const transitionBegin = 0;
const transitionEnd = transitionBegin + step;

uos(transitionBegin, transitionEnd, p => instances[start](p));
scroll = 1050;
document.addEventListener('keydown', (e) => {
    if (e.code == "ArrowRight") {
        scroll = scroll + 1985;
        window.scrollTo({top: scroll, left: 0, behavior: 'smooth'});
    } else if (e.code == "ArrowLeft") {
        scroll = scroll - 1985;
        window.scrollTo({top: scroll, left: 0, behavior: 'smooth'});
    }
});

function render() {
    if (_renderer != null) {
        _renderer.render(_scene, _camera);
    }
}

requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    resize();
    header.style.opacity = 1;
    var elem = document.getElementById("myBar");
    (function asyncLoop() {
        elem.style.width = 100 * ((groups.length + MAP.maps.length + SKETCHFAB.sketchfab.length) / (groupLength + MAP.mapSize + SKETCHFAB.sketchfabSize)) + "%";
        // console.log("MAP " + MAP.maps.length + " m " + MAP.mapSize);
        if (groups.length < groupLength || MAP.maps.length < MAP.mapSize || SKETCHFAB.sketchfab.length < SKETCHFAB.sketchfabSize) {
            setTimeout(asyncLoop, 10);
        } else {
            document.getElementById("done").style.opacity = "1";
            document.getElementsByTagName('body')[0].style.overflow = "default";
            document.getElementsByTagName('body')[0].style.position = "relative";
        }
    })();
});

function resize() {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
    _renderer.setSize(window.innerWidth, window.innerHeight);
    const divs = document.querySelectorAll('.heading');
    for (let i = 0; i < divs.length; i += 1) {
        divs[i].style.height = `${window.innerHeight}px`;
    }
    render();
}

window.addEventListener('resize', resize, false);

window.adaptISO = function (value) {
    LoadData.groups.forEach(group => {
        group.children.forEach(ch => {
            if (ch.material.uniforms["u_opacity"].value > 0) {
                ch.material.uniforms["u_renderthreshold"].value = value;
            }
        })
    });
    render()
};
