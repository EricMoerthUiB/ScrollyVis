import {getColormap, loadData, volume_render_init_withContainer} from "../web/js/volume-render.js";

mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25lcnVpYiIsImEiOiJja2xjbGtyNWIxdXJvMnducGZhbWtyanhoIn0.edNKG90Wl-j4w7VSob5jkg';

// var headlineCheck = function (event) {
//     checkedBehaviour($(event.currentTarget));
// };
// window.headlineCheck = headlineCheck;
//
// var checkedBehaviour = function (element) {
//     var checked = element[0].checked;
//     if (element.parent('div').parent('div').parent('div').children('div').get().length > 0) {
//         var textArea = element.parent('div').parent('div').parent('div').children('div').get()[0].children[0];
//         checked ? textArea.setAttribute("class", "textAreaHeadline") :
//             textArea.setAttribute("class", "textAreaText");
//     }
// };

var id = document.getElementById("drawflow");
var inputFiles = [];
var newFiles = [];
var renderers = {};
var cameras = {};
var meshes = {};
var scenes = {};
var files = {};
var filesSegmentation = {};
var arcballs = {};
var volumes = {};
var slices = {};
window.meshes = meshes;

var editor = new Drawflow(id);
window.editor = editor;
editor.reroute = true;
if (template !== null) {
    editor.drawflow = template;
}
editor.addNodeImport = (dataNode, precanvas) => {
    const parent = document.createElement('div');
    parent.classList.add("parent-node");

    const node = document.createElement('div');
    node.innerHTML = "";
    node.setAttribute("id", "node-" + dataNode.id);
    node.classList.add("drawflow-node");
    if (dataNode.class != '') {
        node.classList.add(dataNode.class);
    }

    const inputs = document.createElement('div');
    inputs.classList.add("inputs");

    const outputs = document.createElement('div');
    outputs.classList.add("outputs");

    const inputsBottom = document.createElement('div');
    inputsBottom.classList.add("inputsBottom");
    const outputsTop = document.createElement('div');
    outputsTop.classList.add("outputsTop");

    Object.keys(dataNode.inputs).map(function (input_item, index) {
        const input = document.createElement('div');
        if (dataNode.inputs[input_item].type === "in") {
            input.classList.add("input");
            inputs.appendChild(input);
        } else {
            input.classList.add("inputBottom");
            inputsBottom.appendChild(input);
        }
        input.classList.add(input_item);
        Object.keys(dataNode.inputs[input_item].connections).map(function (output_item, index) {
            var connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
            var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
            path.classList.add("main-path");
            if (dataNode.inputs[input_item].type === "inBottom") {
                path.classList.add("sub-path");
            }
            path.setAttributeNS(null, 'd', '');
            // path.innerHTML = 'a';
            connection.classList.add("connection");
            connection.classList.add("node_in_node-" + dataNode.id);
            connection.classList.add("node_out_node-" + dataNode.inputs[input_item].connections[output_item].node);
            connection.classList.add(dataNode.inputs[input_item].connections[output_item].input);
            connection.classList.add(input_item);

            connection.appendChild(path);
            precanvas.appendChild(connection);

        });
    });

    for (var x = 0; x < Object.keys(dataNode.outputs).length; x++) {
        const output = document.createElement('div');
        if (dataNode.outputs[Object.keys(dataNode.outputs)[x]].type === "out") {
            output.classList.add("output");
            outputs.appendChild(output);
        } else {
            output.classList.add("outputTop");
            outputsTop.appendChild(output);
        }
        output.classList.add("output_" + (x + 1));
    }

    const contentHolder = document.createElement('div');

    const content = document.createElement('div');
    content.classList.add("drawflow_content_node");

    if (dataNode.typenode === false) {
        content.innerHTML = dataNode.html;
    } else if (dataNode.typenode === true) {
        content.appendChild(this.noderegister[dataNode.html].html.cloneNode(true));
    } else {
        if (parseInt(this.render.version) === 3) {
            //Vue 3
            let wrapper = this.render.createApp({
                parent: this.parent,
                render: h => this.render.h(this.noderegister[dataNode.html].html, this.noderegister[dataNode.html].props, this.noderegister[dataNode.html].options)
            }).mount(content)
        } else {
            //Vue 2
            let wrapper = new this.render({
                parent: this.parent,
                render: h => h(this.noderegister[dataNode.html].html, {props: this.noderegister[dataNode.html].props}),
                ...this.noderegister[dataNode.html].options
            }).$mount()
            content.appendChild(wrapper.$el);
        }
    }

    Object.entries(dataNode.data).forEach(function (key, value) {
        if (typeof key[1] === "object") {
            insertObjectkeys(null, key[0], key[0]);
        } else {
            var elems = content.querySelectorAll('[df-' + key[0] + ']');
            for (var i = 0; i < elems.length; i++) {
                if (elems[i].type === "checkbox") {
                    elems[i].checked = key[1] === "true";
                    // checkedBehaviour($(elems[i]));
                }
                elems[i].value = key[1];
            }
        }
    })

    function insertObjectkeys(object, name, completname) {
        if (object === null) {
            var object = dataNode.data[name];
        } else {
            var object = object[name]
        }
        if (object !== null) {
            Object.entries(object).forEach(function (key, value) {
                if (typeof key[1] === "object") {
                    insertObjectkeys(object, key[0], completname + '-' + key[0]);
                } else {
                    var elems = content.querySelectorAll('[df-' + completname + '-' + key[0] + ']');
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].value = key[1];
                    }
                }
            });
        }
    }

    contentHolder.appendChild(outputsTop);
    contentHolder.appendChild(content);
    contentHolder.appendChild(inputsBottom);
    node.appendChild(inputs);
    node.appendChild(contentHolder);
    node.appendChild(outputs);
    node.style.top = dataNode.pos_y + "px";
    node.style.left = dataNode.pos_x + "px";
    parent.appendChild(node);
    editor.precanvas.appendChild(parent);

    //Check if Map => Load Map Code
    if (dataNode.name === "map") {
        var mapElement = $(document.getElementById("node-" + dataNode.id))[0].children[1].children[1].children[0].children[0];
        // Read location => Zoom To
        var map = new mapboxgl.Map({
            container: mapElement,
            style: 'mapbox://styles/mapbox/dark-v10',
            minZoom: 3,
            maxZoom: 18,
            scrollZoom: false,
            doubleClickZoom: false,
            dragPan: false,
        });
        if (dataNode.data.latlon !== undefined && dataNode.data.latlon !== "") {
            new mapboxgl.Marker()
                .setLngLat(dataNode.data.latlon)
                .addTo(map);
            map.flyTo({center: dataNode.data.latlon, zoom: 8});
        }
        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });
        geocoder.on('result', function (e) {
            var nodeData = editor.getNodeFromId(dataNode.id.toString()).data;
            nodeData.latlon = e.result.center;
            editor.updateNodeDataFromId(dataNode.id, nodeData);
        });
        // Add the control to the map.
        $(document.getElementById("node-" + dataNode.id))[0].children[1].children[1].children[1].children[1].appendChild(geocoder.onAdd(map));
    }
}
editor.start();

/* Mouse and Touch Actions */
var elements = document.getElementsByClassName('drag-drawflow');
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('touchend', drop, false);
    elements[i].addEventListener('touchmove', positionMobile, false);
    elements[i].addEventListener('touchstart', drag, false);
}

var mobile_item_selec = '';
var mobile_last_move = null;

function positionMobile(ev) {
    mobile_last_move = ev;
}

export function allowDrop(ev) {
    ev.preventDefault();
}

window.allowDrop = allowDrop;

export function drag(ev) {
    if (ev.type === "touchstart") {
        mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
    } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    }
}

window.drag = drag;

export function drop(ev) {
    if (ev.type === "touchend") {
        var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
        if (parentdrawflow != null) {
            addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
        }
        mobile_item_selec = '';
    } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
    }

}

window.drop = drop;

function getSize(volume) {
    return [volume.xLength * volume.spacing[0], volume.yLength * volume.spacing[1], volume.zLength * volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
}

function loadSegmentation(event, nodeIdIn = undefined, fileIn = undefined) {
    var nodeId = nodeIdIn !== undefined ? nodeIdIn : $(event.currentTarget).parent('div').parent('div').parent('div').parent('div').get()[0].id;
    var node = editor.getNodeFromId(nodeId.split("-")[1]);
    var file = fileIn !== undefined ? fileIn : event.target.files[0];
    var _vol = volumes[nodeId];
    var _slice = slices[nodeId];
    var _renderer = renderers[nodeId];
    var _scene = scenes[nodeId];
    var _camera = cameras[nodeId];
    filesSegmentation[nodeId] = file;
    loadData(URL.createObjectURL(file), (mesh, meshSlice, volume) => {
        let size = getSize(volume);
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(-size[0] / 2, -size[1] / 2, -size[2] / 2); //if gi
        mesh.material.uniforms["u_clim"].value.set(0.15, 1.0);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_cmdata"].value = getColormap("viridis");
        _vol.add(mesh);
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = node.data.slicePos[0];
        meshSlice.position.y = node.data.slicePos[1];
        meshSlice.material.uniforms["depth"].value = node.data.sliceDepth;
        meshSlice.material.uniforms["u_color"].value = new THREE.Vector3(1, 0, 0);
        _slice.add(meshSlice);
        if (node.data.slice === "true") {
            mesh.material.uniforms["u_opacity"].value = 0.0;
            meshSlice.material.uniforms["u_opacity"].value = 1.0;
        }
        _renderer.render(_scene, _camera)
    });
}

window.loadSegmentation = loadSegmentation;

function loadVolume(event) {
    var output = $(event.currentTarget).parent('div').parent('div').get()[0].childNodes[1].childNodes[1];
    var nodeId = $(event.currentTarget).parent('div').parent('div').parent('div').parent('div').get()[0].id;
    var file = event.target.files[0];
    loadVolumeIntern(output, nodeId, file);
}

function loadVolumeIntern(output, nodeId, file, callback = undefined) {
    var node = editor.getNodeFromId(nodeId.split("-")[1]);
    //Present Volume Visualization of the loaded Volume
    var _renderer, _scene, _camera;
    [_renderer, _scene, _camera] = volume_render_init_withContainer(() => {
        _renderer.render(_scene, _camera)
    }, output);
    renderers[nodeId] = _renderer;
    cameras[nodeId] = _camera;
    scenes[nodeId] = _scene;
    files[nodeId] = file;
    arcballs[nodeId] = new Arcball(_renderer, _camera, _scene, output, node.data.slice === "true");
    output.addEventListener('mousedown', (event) => {
        arcballs[nodeId].onDocumentMouseDown(event)
    }, false);
    output.addEventListener('mouseup', (event) => {
        arcballs[nodeId].onDocumentMouseUp(event);
        arcballToNodeData(nodeId)
    }, false);
    output.addEventListener('mousemove', (event) => {
        arcballs[nodeId].onDocumentMouseMove(event)
    }, false);
    output.addEventListener('wheel', (event) => {
        arcballs[nodeId].onDocumentMouseWheel(event);
        arcballToNodeData(nodeId)
    }, false);
    // output.addEventListener('dblclick', onDocumentDoubleClick, false);
    loadData(URL.createObjectURL(file), (mesh, meshSlice, volume) => {
        let vol = new THREE.Group();
        let size = getSize(volume);
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(-size[0] / 2, -size[1] / 2, -size[2] / 2); //if gi
        mesh.material.uniforms["u_clim"].value.set(node.data.clim1, node.data.clim2);
        mesh.material.uniforms["u_renderstyle"].value = node.data.style;
        mesh.material.uniforms["u_renderthreshold"].value = node.data.iso;
        mesh.material.uniforms["u_cmdata"].value = getColormap(node.data.colormap);
        meshes[nodeId] = mesh;
        vol.add(mesh);
        volumes[nodeId] = vol;
        _scene.add(vol);
        vol.position.x = node.data.pos[0];
        vol.position.y = node.data.pos[1];
        vol.position.z = -5000;
        vol.rotation.x = node.data.rot[0];
        vol.rotation.y = node.data.rot[1];
        vol.rotation.z = node.data.rot[2];
        if (node.data.zoom !== 0) {
            _camera.zoom = node.data.zoom;
        } else {
            _camera.zoom = 1 / volume.spacing[0];
            let nodeData = node.data;
            nodeData.zoom = _camera.zoom;
            editor.updateNodeDataFromId(nodeId.split("-")[1], nodeData)
        }
        _camera.updateProjectionMatrix();
        arcballs[nodeId].object = vol;
        arcballs[nodeId].animate();
        // _renderer.render(_scene, _camera)
        let sl = new THREE.Group();
        // meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = node.data.slicePos[0];
        meshSlice.position.y = node.data.slicePos[1];
        meshSlice.material.uniforms["depth"].value = node.data.sliceDepth;
        // meshSlice.material.uniforms["u_color"].value = new THREE.Vector3(1,0,0);
        sl.add(meshSlice);
        slices[nodeId] = sl;
        _scene.add(sl);
        if (node.data.slice === "true") {
            meshSlice.material.uniforms["u_opacity"].value = 1.0;
            mesh.material.uniforms["u_opacity"].value = 0.0;
        }
        arcballs[nodeId].sliceGroupValue = sl;
        if (callback !== undefined) {
            callback();
        }
    });
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
}

window.loadVolume = loadVolume;

// Reflect the changes my by the arcball interactor in the nodes
function arcballToNodeData(nodeId) {
    var node = editor.getNodeFromId(nodeId.split("-")[1]);
    var nodeData = node.data;
    nodeData.zoom = cameras[nodeId].zoom;
    nodeData.slicePos = [arcballs[nodeId].sliceGroup.position.x, arcballs[nodeId].sliceGroup.position.y];
    nodeData.sliceDepth = arcballs[nodeId].sliceGroup.children[0].material.uniforms["depth"].value;
    nodeData.pos = [arcballs[nodeId].arcObject.position.x, arcballs[nodeId].arcObject.position.y];
    nodeData.rot = [cleanAngle(arcballs[nodeId].arcObject.rotation.x),
        cleanAngle(arcballs[nodeId].arcObject.rotation.y), cleanAngle(arcballs[nodeId].arcObject.rotation.z)];
    editor.updateNodeDataFromId(nodeId.split("-")[1], nodeData)
}

function cleanAngle(angle) {
    if (angle > (2 * Math.PI)) {
        return angle - (2 * Math.PI);
    } else if (angle < (-2 * Math.PI)) {
        return angle + (2 * Math.PI);
    }
    return angle;
}

export function changeVolume(event) {
    // if (event.currentTarget.value < 0 && event.currentTarget.max === "361") event.currentTarget.value = 360;
    // if (event.currentTarget.value > 360 && event.currentTarget.max === "361") event.currentTarget.value = 0;
    var nodeId = $(event.currentTarget).parent('div').parent('div').parent('div').parent('div').get()[0].id;
    if ($(event.currentTarget).parent('div').get()[0].childNodes[11].value === "true") {
        if (slices[nodeId] !== undefined && meshes[nodeId] !== undefined) {
            arcballs[nodeId].sliceValue = true;
            slices[nodeId].children.forEach(child => child.material.uniforms["u_opacity"].value = 1.0);
            volumes[nodeId].children.forEach(child => child.material.uniforms["u_opacity"].value = 0.0);
            renderers[nodeId].render(scenes[nodeId], cameras[nodeId]);
        }
    } else {
        if (meshes[nodeId] !== undefined) {
            arcballs[nodeId].sliceValue = false;
            volumes[nodeId].children.forEach(child => child.material.uniforms["u_opacity"].value = 1.0);
            slices[nodeId].children.forEach(child => child.material.uniforms["u_opacity"].value = 0.0);
            meshes[nodeId].material.uniforms["u_cmdata"].value = getColormap($(event.currentTarget).parent('div').get()[0].childNodes[17].value);
            meshes[nodeId].material.uniforms["u_renderstyle"].value = $(event.currentTarget).parent('div').get()[0].childNodes[21].value;
            meshes[nodeId].material.uniforms["u_renderthreshold"].value = $(event.currentTarget).parent('div').get()[0].childNodes[25].value;
            meshes[nodeId].material.uniforms["u_clim"].value.set($(event.currentTarget).parent('div').get()[0].childNodes[29].value,
                $(event.currentTarget).parent('div').get()[0].childNodes[33].value);
            renderers[nodeId].render(scenes[nodeId], cameras[nodeId]);
        }
    }
}

window.changeVolume = changeVolume;

function loadImage(event) {
    var output = $(event.currentTarget).parent('div').parent('div').children('img').get()[0];
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
}

window.loadImage = loadImage;

function loadVideo(event) {
    var output = $(event.currentTarget).parent('div').parent('div').children('video').get()[0];
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
}

window.loadVideo = loadVideo;


export function addNodeToDrawFlow(name, pos_x, pos_y) {
    pos_x = pos_x * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * (editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
    pos_y = pos_y * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * (editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));
    addNodeToDrawFlowFixedPos(name, pos_x, pos_y);
}

window.addNodeToDrawFlow = addNodeToDrawFlow;

export function copyNodeToDrawflowFixedPos(toCopy, pos_x, pos_y) {
    var nodeToCopy = editor.getNodeFromId(toCopy);
    addNodeToDrawFlowFixedPos(nodeToCopy.name, pos_x, pos_y, nodeToCopy.data);
    var nodeId = editor.nodeId - 1;
    var output = document.getElementById("node-" + nodeId).childNodes[1].childNodes[1].childNodes[1].childNodes[1];
    var file = files["node-" + nodeToCopy.id];
    var fileSegmentation = filesSegmentation["node-" + nodeToCopy.id];
    if (file !== undefined) {
        loadVolumeIntern(output, "node-" + nodeId, file, () => {
            if (fileSegmentation !== undefined) {
                loadSegmentation(null, "node-" + nodeId, fileSegmentation);
            }
        });
    }
}

window.copyNodeToDrawflowFixedPos = copyNodeToDrawflowFixedPos;

export function addNodeToDrawFlowFixedPos(name, pos_x, pos_y, settings = undefined) {
    if (editor.editor_mode === 'fixed') {
        return false;
    }
    switch (name) {
        case 'start':
            var start = `
          <div style="width: 360px; height: 180px;">
             <input type="text" df-title style="background-color: #222222; border: none; height: 30px; width: 250px;
             margin-top: 50px; margin-left: 50px; color: white; font-size: 25px; text-align: center">
              <input type="text" df-subtitle style="background-color: #222222; border: none; height: 30px; width: 150px;
               margin-top: 20px; margin-left: 100px; color: white; text-align: center" >
          </div>
          `;
            editor.addNode('start', 0, 1, pos_x, pos_y, 'start', settings !== undefined ? settings : {
                "title": 'Title',
                "subtitle": 'subtitle'
            }, start);
            break;
        case 'text':
            var text = `
         <div style="width: 380px;" xmlns="http://www.w3.org/1999/html">
             <textarea df-text class="textAreaText"></textarea>
          </div>
          <div class="box">
            <div style="float:left;margin-left: 36px; margin-top: 4px; margin-right: 45px">Color</div>
            <input type="color" df-color style="width: 120px; border: none; display: block; background-color: #00000000"/>
          <div style="margin-left: 36px; float:left; margin-top: 4px; margin-right: 55px">Size</div>
            <select df-size style="height: 20px; margin-top: 2px; width: 120px; background-color: #222222; color: white;">
                <option value="s" selected>Small</option>
                <option value="m">Medium</option>
                <option value="l">Large</option>
                <option value="xl">X-Large</option>
              </select>
          </div>
          `;
            editor.addNode("text", 1, 1, pos_x, pos_y, 'text', settings !== undefined ? settings : {
                "text": "Text", "size": 'm',
                "color": "#FFFFFF",
                "bgcolor": "#00000000"
            }, text, false, 0, 0);
            break;
        case 'image':
            var image = `
           <div class="container" style="">    
                <div class="middle"><input type="file" accept="image/*" onchange="loadImage(event)" title=""></div>
                <img class="image" id="output" style="z-index: 0; position: absolute;width: 380px; height: 180px;object-fit: scale-down; border: none;" draggable="false">
          </div>
          <div class="box" style="display: flex">
            <div style="float:left;margin-left: 20px; margin-top: 4px; margin-right: 8px">Size:</div>
             <select df-presentation style="height: 20px; margin-top: 2px; width: 80px; background-color: #222222; color: white">
                <option value="normal" selected>Normal</option>
                <option value="fullscreen">Fullscreen</option>
              </select>
              <div style="margin-left: 25px; margin-right: 4px;"><i class="fas fa-ellipsis-h"></i>
                <select df-horizontal style="height: 20px; margin-top: 2px; margin-left: 8px; width: 80px; background-color: #222222; color: white;">
                    <option value="left" selected>Left</option>
                    <option value="center" selected>Center</option>
                    <option value="right" selected>Right</option>
                  </select>
              </div>
          </div> 
          `;
            editor.addNode('image', 1, 1, pos_x, pos_y, 'image', settings !== undefined ? settings : {
                "presentation": "normal", "horizontal": "left",
            }, image, false, 1, 1);
            break;
        case 'video':
            var video = `
           <div class="container" style="">    
                <div class="middle"><input type="file" accept="video/*" onchange="loadVideo(event)" title=""></div>
                <video class="image" id="output" style="z-index: 0; position: absolute;width: 380px; height: 180px;object-fit: scale-down; border: none;" draggable="false">
          </div>
           <div class="box" style="display: flex">
            <div style="float:left;margin-left: 20px; margin-top: 4px; margin-right: 8px">Size:</div>
             <select df-presentation style="height: 20px; margin-top: 2px; width: 80px; background-color: #222222; color: white">
                <option value="normal" selected>Normal</option>
                <option value="fullscreen">Fullscreen</option>
              </select>
              <div style="margin-left: 25px; margin-right: 4px;"><i class="fas fa-ellipsis-h"></i>
                <select df-horizontal style="height: 20px; margin-top: 2px; margin-left: 8px; width: 80px; background-color: #222222; color: white;">
                    <option value="left" selected>Left</option>
                    <option value="center" selected>Center</option>
                    <option value="right" selected>Right</option>
                  </select>
              </div>
          </div> 
          `;
            editor.addNode('video', 1, 1, pos_x, pos_y, 'video', settings !== undefined ? settings : {
                "presentation": "normal",
                "horizontal": "left"
            }, video, false, 1, 1);
            break;
        case "subtext":
            var subtext = `
         <div style="width: 360px; margin-right: 20px; height: 65px;" xmlns="http://www.w3.org/1999/html">
             <textarea df-text class="textAreaText" style="margin-left: 20px; width: 92%; height: 40px;"></textarea>
          </div>
          <div class="box" style="width: 340px;display: flex; flex-wrap:wrap;">
            <div style="margin-left: 2px; margin-top: 4px;">Text: </div>
            <input type="color" df-color style="width: 20px; border: none; background-color: #00000000;"/>
            <div style="margin-left: 2px; margin-top: 4px;">BG Color: </div>
            <input type="color" df-bgcolor style="width: 20px; border: none; background-color: #00000000; "/>
            <div style="margin-left: 2px; margin-top: 4px;">BG: </div>
             <input type="checkbox" df-background style="margin-left: 10px; margin-top: 5px;"/>
          <div style="margin-left: 2px; margin-top: 4px; margin-right: 2px">Size: </div>
            <select df-size style="height: 20px; margin-top: 2px;width: 40px; background-color: #222222; color: white;">
                <option value="s">S</option>
                <option value="m" selected>M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>
          <div style="margin-left: 5px; margin-right: 5px;"><i class="fas fa-ellipsis-v"></i>
            <select df-vertical style="height: 20px; margin-top: 2px; width: 80px; background-color: #222222; color: white;">
                <option value="top" selected>Top</option>
                <option value="center" selected>Center</option>
                <option value="bottom" selected>Bottom</option>
              </select>
              </div>
          <div style="margin-left: 5px; margin-right: 5px;"><i class="fas fa-ellipsis-h"></i>
            <select df-horizontal style="height: 20px; margin-top: 2px; width: 80px; background-color: #222222; color: white;">
                <option value="left" selected>Left</option>
                <option value="center" selected>Center</option>
                <option value="right" selected>Right</option>
              </select>
          </div>
          </div>
          `;
            editor.addNode('subtext', 0, 0, pos_x, pos_y, 'subtext', settings !== undefined ? settings : {
                "text": "Text", "size": 'm', "vertical": "center", "horizontal": "right",
                "color": "#FFFFFF",
                "bgcolor": "#888888", "background": "false",
            }, subtext, false, 0, 1);
            break;
        case 'map':
            var map = `
           <div class="container" style="">    
                <div id="map" style="z-index: 0; position: absolute;width: 380px; height: 180px;" draggable="false"></div>
          </div>
          <div class="box">
            <div style="margin-top: 5px">Location:</div>
            <div id = "geocoder" style="float:left; margin-top: -15px; margin-left: 60px"></div>
          </div> 
          `;
            var node = editor.addNode('map', 1, 1, pos_x, pos_y, 'map', settings !== undefined ? settings : {
                "latlon": "",
                "presentation": "fullscreen"
            }, map, false, 1, 0);
            var mapElement = $(document.getElementById("node-" + node))[0].children[1].children[1].children[0].children[0];
            var map = new mapboxgl.Map({
                container: mapElement,
                style: 'mapbox://styles/mapbox/dark-v10',
                minZoom: 3,
                maxZoom: 18,
                scrollZoom: false,
                doubleClickZoom: false,
                dragPan: false,
            });
            var geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });
            geocoder.on('result', function (e) {
                var nodeData = editor.getNodeFromId(node.toString()).data;
                nodeData.latlon = e.result.center;
                editor.updateNodeDataFromId(node, nodeData);
            });
            // Add the control to the map.
            $(document.getElementById("node-" + node))[0].children[1].children[1].children[1].children[1].appendChild(geocoder.onAdd(map));
            break;
        case 'decision':
            var decision = `
           <div style="width: 300px; height: 220px;">
            <div style="margin-left: 10px; margin-top: 10px; width: 20px"><i class="fas fa-project-diagram fa-2x" style="color: #5b5b5b"></i></div>
<!--            <p>Enter Title</p>-->
            <div style="margin-left: 25px; margin-top: 15px;">Question:</div>
             <input type="text" df-question style="background-color: #222222; border: none; height: 30px; width: 240px;
             margin-top: 10px; margin-left: 25px; color: white; font-size: 25px; text-align: center">
            <div style="margin-left: 25px; margin-top: 15px;">Choices separated by ;</div>
             <input type="text" df-option style="background-color: #222222; border: none; height: 30px; width: 240px;
             margin-top: 10px; margin-left: 25px; color: white; font-size: 25px; text-align: center">
          </div>
          `;
            editor.addNode('decision', 1, 1, pos_x, pos_y, 'decision', {
                "option": "",
                "question": ""
            }, decision, false, 0, 0);
            break;
        case 'volvis':
            var volvis = `
           <div class="" style="width: 380px; height: 200px">    
                <div class="vol" style="width: 380px; height: 200px" draggable="false"></div>
          </div>
          <div class="box" style="width: 340px;display: flex; flex-wrap:wrap;">
             <input type="button" value="Volume" onclick="$(event.currentTarget).parent('div').get()[0].childNodes[3].click()" style="margin-left: 20px; height: 20px"/>
             <input type="file" class="volumeFile" accept="*.nii.gz" onchange="loadVolume(event)" title="" style="margin-left: 20px;display:none">
             <input type="button" value="Segmentation" onclick="{
                if(meshes[$(event.currentTarget).parent('div').parent('div').parent('div').parent('div').get()[0].id] === undefined){
                    alert('Load a volume first');
                 }else{
                    $(event.currentTarget).parent('div').get()[0].childNodes[7].click()
                 }
             }" style="margin-left: 12px; height: 20px"/>
             <input type="file" class="segmentationFile" accept="*.nii.gz" onchange="loadSegmentation(event)" title="" style="margin-left: 20px;margin-bottom: 5px; display:none">
             <div style="margin-left: 15px; ">Slice View</div>
             <input type="checkbox" df-slice style="margin-left: 12px; margin-bottom: 10px" onchange="changeVolume(event)"/>
<!--             <input type="file" accept="*" onchange="loadVolume(event)" title="">-->
             <div style="margin-left: 20px; margin-top: 4px; margin-right: 8px">Colormap:</div>
             <select df-colormap style="height: 20px; margin-top: 2px; width: 80px; background-color: #222222; color: white" onchange="changeVolume(event)">
                <option value="gray" selected>Gray</option>
                <option value="viridis">Viridis</option>
              </select>
              <div style="margin-left: 32px; margin-top: 4px; margin-right: 8px">Style:</div>
             <select df-style style="height: 20px; margin-top: 2px; width: 80px; background-color: #222222; color: white" onchange="changeVolume(event)">
                <option value="2" selected>DVR</option>
                <option value="1">ISO</option>
                <option value="0">MIP</option>
              </select>
              <div style="margin-left: 20px; margin-top: 10px; margin-right: 2px">ISO: </div>
              <input df-iso type="number" min ="0.1" max = "1" step="0.05"
              style="height: 15px; margin-top: 8px; width: 45px; background-color: #222222; color: white"
              onchange="changeVolume(event)" oninput="changeVolume(event)">
              <div style="margin-left: 20px; margin-top: 10px; margin-right: 2px">CLIM1: </div>
              <input df-clim1 type="number" min ="0.1" max = "1" step="0.05"
              style="height: 15px; margin-top: 8px; width: 45px; background-color: #222222; color: white"
              onchange="changeVolume(event)" oninput="changeVolume(event)">
              <div style="margin-left: 20px; margin-top: 10px; margin-right: 2px">CLIM2: </div>
              <input df-clim2 type="number" min ="0.1" max = "1" step="0.05"
              style="height: 15px; margin-top: 8px; width: 45px; background-color: #222222; color: white"
              onchange="changeVolume(event)" oninput="changeVolume(event)">
          </div> 
          `;
            var node = editor.addNode('volvis', 1, 1, pos_x, pos_y, 'volvis', settings !== undefined ? settings : {
                "style": 2,
                "slice": "false",
                "colormap": 'gray',
                "clim1": 0.15,
                "clim2": 0.8,
                "iso": 0.15,
                "pos": [0, 0, 0],
                "slicePos": [0, 0, 0],
                "sliceDepth": 0,
                "rot": [0, 0, 0],
                "zoom": 0,
            }, volvis, false, 1, 1);
            break;
        default:
    }
}

window.addNodeToDrawFlowFixedPos = addNodeToDrawFlowFixedPos;

export function changeMode(option) {
    //console.log(lock.id);
    if (option == 'lock') {
        lock.style.display = 'none';
        unlock.style.display = 'block';
    } else {
        lock.style.display = 'block';
        unlock.style.display = 'none';
    }
}

window.changeMode = changeMode;

export function copyToClipboard() {
    var tempInput = document.createElement("input");
    tempInput.value = JSON.stringify(editor.export(), null, 4);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

window.copyToClipboard = copyToClipboard;

export function exportData() {
    document.getElementById("exportButton").classList.add("disabled");

    let output = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"utf-8\">\n" +
        "<!--    <link href=\"https://fonts.googleapis.com/css?family=Roboto:100,400\" rel=\"stylesheet\">-->\n" +
        "    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/base.css\" />\n" +
        "    <link rel=\"stylesheet\" type=\"text/css\" href=\"css/tree.css\" />\n" +
        "    <script type=\"text/javascript\" src=\"./js/nifti-reader.js\"><\/script>\n" +
        "    <script src=\"https://unpkg.com/three@0.102.1/build/three.min.js\"><\/script>\n " +
        "   <script src=\"https://unpkg.com/three.phenomenon@1.1.0/dist/three.phenomenon.umd.js\"><\/script>\n" +
        "   <script src=\"https://unpkg.com/uos@1.1.1/dist/uos.umd.js\"><\/script>\n" +
        "   <script type=\"module\" src=\"./js/volume-render.js\"><\/script>\n" +
        "   <script src='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'></script>\n" +
        "    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js'></script>\n" +
        "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.71/jquery.csv-0.71.min.js\"></script>\n" +
        "   <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet'/>\n" +
        "   <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css\" integrity=\"sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=\" crossorigin=\"anonymous\" />\n" +
        "   <script type=\"text/javascript\" src=\"./js/videoCode.js\"><\/script>\n";

    let content = "   </head>\n " +
        "   <body>\n" +
        " <main>\n" +
        "<div class=\"content content--canvas\">\n";

    let flow = {};
    let code = editor.export();
    let codeNodes = code.drawflow.Home.data;
    let keys = Object.keys(codeNodes);
    let volVis = [];
    let preloadUrls = [];
    let nodeUpdateInfo = {};
    //Find start node => Go from there
    let startNode;

    for (i in keys) {
        let node = codeNodes[keys[i]];
        if (node.class === "start") {
            startNode = node;
            break;
        }
    }
    if (startNode === null) {
        throw "No Start Node given";
    }

    //Start from startNode and traverse through the flow => assert the tree is correct
    var currNode = startNode;
    var lastNode = startNode;
    var counter = 0;
    // try {
    let stack = [];
    stack.push([startNode, startNode]);
    while (stack.length > 0) {
        [lastNode, currNode] = stack.pop();
        do {
            let nextNode = undefined;
            if (currNode.outputs[Object.keys(currNode.outputs)[0]].connections.length > 0) {
                nextNode = codeNodes[currNode.outputs[Object.keys(currNode.outputs)[0]].connections[0].node]; // set Current node to the next node
                // If there are more connections (Decision Node) put them on the stack
                for (let i = 1; i < currNode.outputs[Object.keys(currNode.outputs)[0]].connections.length; i++) {
                    stack.push([currNode, codeNodes[currNode.outputs[Object.keys(currNode.outputs)[0]].connections[i].node]]);
                }
            } else {
                nextNode = {id: 10000, data: {}, class: "stop", type: "stop"};
            }
            //Subtree handling
            let subtree = -1;
            let inKeys = Object.keys(currNode.inputs);
            for (let k in inKeys) {
                if (currNode.inputs[inKeys[k]].type === "inBottom" && currNode.inputs[inKeys[k]].connections.length > 0) subtree = currNode.inputs[inKeys[k]].connections[0].node;
            }
            if (subtree >= 0) {
                [flow[currNode.id], content, preloadUrls, volVis] = getNodeCode(currNode, lastNode.id, codeNodes[subtree].id, nextNode.id, content, preloadUrls, volVis);
                [flow, content, preloadUrls, volVis] = handleSubtree(codeNodes[subtree], codeNodes, keys.length, currNode.id, nextNode.id, flow, content, preloadUrls, volVis);
                lastNode = flow[Object.keys(flow)[Object.keys(flow).length - 1]];
            } else {
                [flow[currNode.id], content, preloadUrls, volVis] = getNodeCode(currNode, lastNode.id, nextNode.id, undefined, content, preloadUrls, volVis);
                lastNode = currNode;
            }
            currNode = nextNode;
            counter++; //Endless Loop Protection
        } while (currNode !== undefined && currNode.class !== "stop" && counter <= keys.length);
        [flow[currNode.id], content, preloadUrls, volVis] = getNodeCode(currNode, lastNode.id, undefined, undefined, content, preloadUrls, volVis);
        // console.log(currNode.id + " " + currNode.class);
    }

    if (preloadUrls.length > 0) {
        output += "    <style>\n    body:after{\n     content: ";
        preloadUrls.forEach(url => output += "url(\"" + url + "\") ");
        //     content: url(./data/5_DJI_0078.JPG) url("./data/6_DJI_0169.JPG");
        output += "\n    }\n    </style>";
    }
    output += content;

    // Add the Tree:
    output += "        <div class=\"treeHolder\">\n" +
        "            <div class=\"tree\">\n" +
        "                 <ul>\n" +
        "                    <li>\n" +
        "                        <div class=\"circle active\" id=\"c" + startNode.id + "\"><i class=\"fas fa-play fa-xs treeIcon\"></i></div>\n";
    // put in the tree
    let treeCode = traverseFlowForTree(flow[flow[startNode.id].out], flow, "", 0);
    output += treeCode;
    output += "                 </li>\n            </ul>\n\n" +
        "           </div></div>\n\n";
    output += "</div>\n" +
        "</main>\n" +
        "<script type=\"module\" src=\"./js/index.js\"><\/script>\n";
    let mapsIncluded = Object.keys(flow).some(key => {
        if (flow[key].type === "map") return true;
    });
    if (mapsIncluded) {
        output += "<script type=\"text/javascript\" src=\"./js/mapCode.js\"><\/script>\n";
    }
    output += "\n</body>\n</html>";
    // } catch (e) {
    //     alert(e);
    //     document.getElementById("exportButton").classList.remove("disabled");
    // }

    exportWebpage(output, flow, volVis, nodeUpdateInfo, startNode.id);
    // document.getElementById("exportButton").classList.remove("disabled");
}

window.exportData = exportData;

function traverseFlowForTree(node, flow, code, first = false) {
    // console.log(node.type);
    if (node.type !== "decision" && flow[node.out].type === "stop") {
        return getTreeNodeCode(first, node.id, node.type);
    }
    if (typeof node.out === 'object') {
        let lowerCode = "";
        node.out.connections.forEach(output => {
            lowerCode += "<li>" + traverseFlowForTree(flow[output.node], flow, code, true) + "</li>";
        });
        return "<ul><li>" + getTreeNodeCode(true, node.id, node.type) + "\n<ul>" + lowerCode + "</li></ul>\n";
    } else {
        return getTreeNodeCode(first, node.id, node.type) + traverseFlowForTree(flow[node.out], flow, code, false);
    }
}

function getTreeNodeCode(first, id, type) {
    return !first ? "                   <ul>\n" +
        "                            <li>\n" +
        "                                <div class=\"circle\" id=\"c" + id + "\"><i class=\"fas "+getIcon(type)+" fa-xs treeIcon\"></i></div>\n" +
        "                            </li>\n" +
        "                        </ul>\n\n" :
        "                             <div class=\"circle\" id=\"c" + id + "\"><i class=\"fas "+getIcon(type)+" fa-xs treeIcon\"></i></div>\n";
}

function getIcon(type){
    switch (type) {
        case "text":
            return "fa-paragraph";
        case "image":
            return "fa-image";
        case "video":
            return "fa-video";
        case "subtext":
            return "fa-paragraph";
        case "map":
            return "fa-map-marked-alt";
        case "decision":
            return "fa-share-alt";
        case "volvis":
            return "fa-cube";

    }
}

function handleSubtree(currNode, codeNodes, max, lastId, nextId, flow, content, preloadUrls, volVis) {
    // traverse till no output
    let count = 0;
    let currN = currNode;
    let path = [];
    let further = false;
    let last = lastId;
    do {
        // Get Code of node and add to flow
        further = false;
        let nextNode = undefined;

        // Check the next Node
        let outs = Object.keys(currN.outputs);
        for (let o in outs) {
            if (currN.outputs[Object.keys(currN.outputs)[o]].type === "out" &&
                currN.outputs[Object.keys(currN.outputs)[o]].connections.length > 0) {
                nextNode = codeNodes[currN.outputs[Object.keys(currN.outputs)[0]].connections[0].node];
                further = true;
            }
        }
        //Subtree handling
        let subtree = -1;
        let inKeys = Object.keys(currN.inputs);
        for (let k in inKeys) {
            if (currN.inputs[inKeys[k]].type === "inBottom" && currN.inputs[inKeys[k]].connections.length > 0) subtree = currN.inputs[inKeys[k]].connections[0].node;
        }
        if (subtree >= 0) {
            [flow[currN.id], content, preloadUrls, volVis] = getNodeCode(currN, last, codeNodes[subtree].id, nextNode !== undefined ? nextNode.id : nextId, content, preloadUrls, volVis);
            [flow, content, preloadUrls] = handleSubtree(codeNodes[subtree], codeNodes, max, currN.id, nextNode !== undefined ? nextNode.id : nextId, flow, content, preloadUrls, volVis);
            last = flow[Object.keys(flow)[Object.keys(flow).length - 1]].id
        } else {
            [flow[currN.id], content, preloadUrls, volVis] = getNodeCode(currN, last, nextNode !== undefined ? nextNode.id : nextId, undefined, content, preloadUrls, volVis);
        }
        currN = nextNode;
        count++; //Endless Loop Protection
    } while (further && count <= max);
    return [flow, content, preloadUrls, volVis];
}

function getNodeCode(node, inNode, outNode, blendOut, output, preloadUrls, volVis) {
    let flow = null;
    switch (node.class) {
        case "start":
            output += "\t\t\t<div class=\"header\" id=\"" + node.id + "\">\n" +
                "            <h1 class=\"header__title\">" + node.data.title + "</h1>\n" +
                "            <p class=\"header__text\">" + node.data.subtitle + "</p>\n" +
                "            <div id=\"progressContainer\">\n" +
                "              <div id=\"myProgress\">\n" +
                "              <div id=\"myBar\"></div>\n" +
                "             </div>\n" +
                "              <div id=\"done\" style=\"margin-left: 40%; opacity: 0\">done</div>\n" +
                "              </div>" +
                "        </div>\n";
            flow = {
                id: node.id, in: "-1",
                out: outNode, type: "start"
            };
            // startNode = node.id;
            break;
        case "text":
            output += "\t\t\t<div class=\"text " + node.data.size + "\" id=\"" + node.id + "\" style=\"color:"
                + node.data.color + "; background-color:" + node.data.bgcolor + "\" >\n<span>\n" + node.data.text + "\n</span></div>\n";
            flow = {
                id: node.id, in: node.inputs["input_1"].connections[0].node,
                out: outNode, type: "text", text: node.data.text
            };
            break;
        case "subtext":
            output += "\t\t\t<div class=\"subtext " + node.data.vertical + " " + node.data.horizontal + " " + node.data.size + "\" id=\"" + node.id + "\" style=\"color:"
                + node.data.color + "; background-color:" + node.data.bgcolor + (node.data.background === "true" ? "55" : "00")
                + "\" >\n\t\t\t<span style='width: 100%'>\n\t\t\t\t" + node.data.text + "\n\t\t\t</span>\n\t\t\t</div>\n";
            flow = {
                id: node.id, in: inNode,
                out: outNode, type: "subtext", text: node.data.text
            };
            break;
        case "map":
            output += "<div class=\"" + (node.data.presentation === "fullscreen" ? "mapFullscreen" : "map") + "\" id=\"" + node.id + "\">" +
                "   <div id=\"map" + node.id + "\"  style=\"width: 100%; height: 100%\"></div>" +
                "</div>\n";
            if (node.data.latlon === "") {
                throw ("No location given in Map");
            }
            var map = {
                id: node.id,
                in: inNode,
                out: outNode,
                blendOut: blendOut,
                type: "map",
                lat: node.data.latlon[1],
                lon: node.data.latlon[0]
            };
            flow = map;
            // mapsIncluded = true;
            break;
        case "image":
            let file = document.getElementById("node-" + node.id).children[1].children[1].children[0].children[0].children[0].files[0];
            if (file === undefined) {
                throw("no image file given");
            }
            let newImageFile = node.id + "_" + file.name;
            inputFiles[node.id] = file;
            newFiles[node.id] = newImageFile;
            output += "<div class=\"" + (node.data.presentation === "fullscreen" ? "imageFullscreen" : "image") + " " + node.data.horizontal + "\" id=\"" + node.id + "\">\n" +
                "<img src=\"./data/" + newImageFile + "\"/>" +
                "</div>\n";
            preloadUrls.push("./data/" + newImageFile);
            var image = {
                id: node.id,
                in: inNode,
                out: outNode,
                blendOut: blendOut,
                type: "image",
            };
            flow = image;
            break;
        case "video":
            let videoFile = document.getElementById("node-" + node.id).children[1].children[1].children[0].children[0].children[0].files[0];
            if (videoFile === undefined) {
                throw("no video file given");
            }
            let newVideoFile = node.id + "_" + videoFile.name;
            inputFiles[node.id] = videoFile;
            newFiles[node.id] = newVideoFile;
            output += "<div class=\"" + (node.data.presentation === "fullscreen" ? "videoFullscreen" : "video") + " " + node.data.horizontal + "\" id=\"" + node.id + "\">\n" +
                "<video width=\"100%\" id=\"vid" + node.id + "\" muted controls onLoadedData = \"videoLoaded(" + node.id + ")\">\n" +
                "     <source src=\"./data/" + newVideoFile + "\"" +
                " type=\"video/mp4\"/>\n" +
                "</video>\n" +
                "</div>\n";
            preloadUrls.push("./data/" + newVideoFile);
            var video = {
                id: node.id,
                in: inNode,
                out: outNode,
                blendOut: blendOut,
                type: "video",
            };
            flow = video;
            break;
        case "volvis":
            // let volumeFile = document.getElementById("node-" + node.id).children[1].children[1].children[1].childNodes[1].files[0];
            // if (volumeFile === undefined) {
            let volumeFile = undefined;
            if (files["node-" + node.id] !== undefined) {
                volumeFile = files["node-" + node.id];
            } else {
                throw("no volume given");
            }
            let segmentationFile = undefined;
            if (files["node-" + node.id] !== undefined) {
                segmentationFile = filesSegmentation["node-" + node.id];
            }
            // }
            let newVolumeFile = node.id + "_" + volumeFile.name;
            inputFiles[node.id] = volumeFile;
            newFiles[node.id] = newVolumeFile;
            if (segmentationFile !== undefined) {
                let newSegFile = node.id + "_" + segmentationFile.name;
                inputFiles[node.id + "_seg"] = segmentationFile;
                newFiles[node.id + "_seg"] = newSegFile;
            }
            // output += "\t\t\t<div class=\"text\" id=\"" + node.id + "\">\n" + "Will be replaced with a VolVis" + "\n</div>\n";
            var vol = {
                id: node.id,
                in: inNode,
                out: outNode,
                blendOut: blendOut,
                type: "volvis",
                presentation: node.data.style,
                volume: node.id,
                volumeFile: volumeFile,
                segmentationFile: segmentationFile,
                method: node.data.style,
                colormap: node.data.colormap,
                clim1: node.data.clim1,
                clim2: node.data.clim2,
                iso: node.data.iso,
                pos: node.data.pos,
                rot: node.data.rot,
                slicePos: node.data.slicePos,
                slice: node.data.slice,
                sliceDepth: node.data.sliceDepth,
                zoom: node.data.zoom
            };
            volVis.push(vol);
            flow = vol;
            break;
        case "stop":
            //     output += "\t\t\t<div class=\"headinger\" id=\"" + node.id + "\">\n" + node.data.title + "\n</div>\n";
            flow = {id: node.id, type: "stop"};
            break;
        case "decision":
            output += "\t\t\t<div class=\"headinger\" id=\"" + node.id + "\">\n<div>" + node.data.question + "</div>\n" +
                "\t\t\t<div style=\"margin-top: 50px\">";
            node.data.option.split(";").forEach(option => {
                output += "\t\t\t\t\n<input type=\"radio\" id=\"question" + node.id + ":" + option + "\" name=\"question" + node.id + "\" value=\"" + option + "\"";
                node.data.option.split(";").indexOf(option) === 0 ? output += "checked" : output += "";
                output += ">\n" +
                    "\t\t\t\t<label for=\"question" + node.id + ":" + option + "\">" + option + "</label>";
            });
            output += "\n</div>\n</div>\n";
            flow = {
                id: node.id,
                flow: node.inputs["input_1"].connections[0].node,
                out: node.outputs["output_1"],
                question: node.data.question,
                options: node.data.option,
                type: "decision"
            };
            break;
    }
    return [flow, output, preloadUrls, volVis];
}

function generateDataLoaderNew(volVis, newFileNames) {
    let output = "import * as RENDER from \"./volume-render.js\";\n" +
        "import * as THREE from '../node_modules/three/build/three.module.js';";
    let groups = [];
    let sizes = [];
    let zoomLevels = [];
    let code = "export function loadVolumeData(_scene, _camera) {\n";
    let volumes = [];
    volVis.forEach(vis => {
        if (volumes.includes(vis.volume)) {
            delete newFileNames[vis.id];
            return;
        }
        volumes.push(vis.volume);
        groups.push("vol" + vis["volume"]);
        groups.push("sl" + vis["volume"]);
        sizes.push("size" + vis["volume"]);
        sizes.push("sizeSeg" + vis["volume"]);
        zoomLevels.push("zoom" + vis["volume"]);
        code += "    RENDER.loadData(\"data/" + newFileNames[vis["volume"]] + "\", (mesh, meshSlice, volume) => {\n" +
            "        vol" + vis["volume"] + " = new THREE.Group();\n" +
            "        size" + vis["volume"] + " = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1]," +
            "volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];\n" +
            "        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);\n" +
            "        mesh.position.set(- size" + vis["volume"] + "[0]/2, - size" + vis["volume"] + "[1]/2, - size" + vis["volume"] + "[2]/2);\n" +
            "        mesh.material.uniforms[\"u_clim\"].value.set(" + vis.clim1 + "," + vis.clim2 + ");\n" +
            "        mesh.material.uniforms[\"u_renderstyle\"].value = " + vis.presentation + ";\n" +
            "        mesh.material.uniforms[\"u_renderthreshold\"].value = " + vis.iso + ";\n" +
            "        mesh.material.uniforms[\"u_cmdata\"].value = RENDER.getColormap(\"" + (vis.colormap === "gray" ? 'gray' : 'viridis') + "\");\n" +
            "        vol" + vis["volume"] + ".add(mesh);\n" +
            "        vol" + vis["volume"] + ".rotation.x = " + vis.rot[0] + ";\n" +
            "        vol" + vis["volume"] + ".rotation.y = " + vis.rot[1] + ";\n" +
            "        vol" + vis["volume"] + ".rotation.z = " + vis.rot[2] + ";\n" +
            "        vol" + vis["volume"] + ".position.z = -5000;\n" +
            "        vol" + vis["volume"] + ".position.x = " + vis.pos[0] + ";\n" +
            "        vol" + vis["volume"] + ".position.y = " + vis.pos[1] + ";\n" +
            // "        vol" + vis["volume"] + ".position.z = " + vis.trz + ";\n" +
            "        zoom" + vis["volume"] + "= " + vis.zoom + ";\n";
        // "        _camera.updateProjectionMatrix();\n";
        code += "        _scene.add(vol" + vis["volume"] + ");\n" +
            "        groups.push(vol" + vis["volume"] + ");\n";
        code += "\n" +
            "        sl" + vis["volume"] + " = new THREE.Group();\n" +
            // "        meshSlice.position.x = -180;\n" +
            "        meshSlice.rotation.z = Math.PI;\n" +
            "        meshSlice.position.x = " + vis.slicePos[0] + ";\n" +
            "        meshSlice.position.y = " + vis.slicePos[1] + ";\n" +
            "        meshSlice.material.uniforms[\"depth\"].value = " + vis.sliceDepth + ";\n" +
            "        sl" + vis["volume"] + ".add(meshSlice);\n" +
            "        _scene.add(sl" + vis["volume"] + ");\n" +
            "        groups.push(sl" + vis["volume"] + ");\n";

        // if (vis.slice === "true") {
        //     code += "            meshSlice.material.uniforms[\"u_opacity\"].value = 1.0;\n" +
        //         "            mesh.material.uniforms[\"u_opacity\"].value = 0.0;\n";
        // }
        if (vis["segmentationFile"] != null) {
            code += "\n        RENDER.loadData(\"data/" + newFileNames[(vis["volume"] + "_seg")] + "\", (mesh,meshSlice, volume) => {\n" +
                "        sizeSeg" + vis["volume"] + " = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1]," +
                "volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];\n" +
                "        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);\n" +
                "        mesh.position.set(- size" + vis["volume"] + "[0]/2, - size" + vis["volume"] + "[1]/2, - size" + vis["volume"] + "[2]/2);\n" +
                "        mesh.material.uniforms[\"u_clim\"].value.set(0.15,1.0);\n" +
                "        mesh.material.uniforms[\"u_renderstyle\"].value = 2;\n" +
                "        mesh.material.uniforms[\"u_cmdata\"].value = RENDER.getColormap(\"viridis\");\n" +
                "        vol" + vis["volume"] + ".add(mesh);\n" +
                // "        meshSlice.position.x = -180;\n" +
                "        meshSlice.rotation.z = Math.PI;\n" +
                "        meshSlice.position.x = " + vis.slicePos[0] + ";\n" +
                "        meshSlice.position.y = " + vis.slicePos[1] + ";\n" +
                "        meshSlice.material.uniforms[\"depth\"].value = " + vis.sliceDepth + ";\n" +
                "        meshSlice.material.uniforms[\"u_color\"].value = new THREE.Vector3(1,0,0);\n" +
                "        sl" + vis["volume"] + ".add(meshSlice);\n";
            // if (vis.slice === "true") {
            //     code += "            mesh.material.uniforms[\"u_opacity\"].value = 0.0;\n" +
            //         "            meshSlice.material.uniforms[\"u_opacity\"].value = 1.0;\n";
            // }
            code += "        });\n\n";
        }
        code += "    });\n";
    });
    code += "    }\n";
    if (groups.length > 0) {
        output += "\n\nexport var " + groups.join(",") + ";\n" +
            "export var " + sizes.join(",") + ";\n" +
            "export var " + zoomLevels.join(",") + ";\n";
    }
    output += "export var groups = [];\n" +
        "export var groupLength = " + groups.length + ";\n\n";
    output += code;
    return [output, newFileNames];
}

function createInstances(flow, nodeUpdateInfo, startNode) {
    let maps = [];
    let output = "import * as LoadData from \"./loadData.js\";\n" +
        "import * as RENDER from \"./volume-render.js\";\n\n" +
        "var _camera;\n\n" +
        "export function getInstances(camera){\n" +
        "     _camera = camera;\n" +
        "     let instances = [];\n" +
        "     var id = -1;\n" +
        "     let once = [];\n" +
        "     let predecessor = {};\n" +
        "     let listenerRemover = {};\n" +
        "     let zoom = [];\n" +
        "     let factor = 1;\n" +
        "     let factors = [];\n" +
        "     once[id] = false;\n" +
        // "     zoom[0] = _camera.zoom;\n" +
        "     let start;\n";


    //First check if it is concentric => Different handling for that
    let j = Object.keys(flow)[0];
    let instances = 0;
    // First traverse through and gather information and lengths
    let nodeToLength = {};
    let decisionToFollow;
    let len = 0, nodes = [];
    [len, nodeToLength, nodes, decisionToFollow] = traverseNodes(j, nodeToLength, flow, {}, []);

    Object.keys(decisionToFollow).forEach(key => {
        let dtf = decisionToFollow[key];
        let ns = [];
        dtf.forEach(n => {
            ns.push(Object.keys(nodeToLength).indexOf(n.toString()));
        });
        output += "     let pred" + key + " = [" + ns.join(",") + "];\n";
    });
    output += "     predecessor[" + Object.keys(nodeToLength).indexOf(flow[startNode].out.toString()) + "] = 1/" + nodeToLength[startNode] + ";\n";
    // Second just handle the nodes and create the code
    let blendOut = {};
    let nodeToInstance = {};

    output += "     start = " + Object.keys(nodeToLength).indexOf(flow[startNode].out.toString()) + ";\n";

    [nodeToInstance, instances, output, maps] = traverseFlow(j, 0, blendOut, output, nodeToInstance, flow, nodeUpdateInfo, nodeToLength[startNode], nodeToLength, decisionToFollow, maps);
    output += "\n        return [start, instances,once," + nodeToLength[startNode] + "];\n" +
        "}\n" +
        "\n" +
        "function alterUniform(element, value, uniform) {\n" +
        "    if (element != null) {\n" +
        "        if (element.material !== undefined) {\n" +
        "            element.material.uniforms[uniform].value = value;\n" +
        "        } else {\n" +
        "            element.children.forEach(child => child.material.uniforms[uniform].value = value);\n" +
        "        }\n" +
        "    }\n" +
        "}" +
        "\n\n" +
        "function removeListenersAndOnces(list, listenerRemover, once) {\n" +
        "    list.forEach(entry => {\n" +
        "        if (Object.keys(listenerRemover).includes(entry.toString())) {\n" +
        "            listenerRemover[entry]();\n" +
        "            delete listenerRemover[entry];\n" +
        "        }\n" +
        "        once[entry] = false;\n" +
        "    });\n" +
        "    return [listenerRemover, once];\n" +
        "}\n\n" +
        "function rampTo(p, zoomo, zoom, _camera) {\n" +
        "    let np = p < 0.5 ? 2 * p : 1;\n" +
        "    _camera.zoom = zoomo + (zoom - zoomo) * np;\n" +
        "    _camera.updateProjectionMatrix();\n" +
        "}\n\n" +
        "// Ramp function used for in and out transition\n" +
        "//      ___\n" +
        "//    /    \\\n" +
        "// __/      \\__\n" +
        "function ramp(p) {\n" +
        "    return p <= 0.33 ? p * (1 / 0.33) : p > 0.33 && p < 0.66 ? 1 : 1 - ((p - 0.66) * (1 / 0.33));\n" +
        "}\n" +
        "\n" +
        "function rampToPosRot(p, fromPos, toPos, fromRot, toRot, fromSlice, toSlice, object, slice) {\n" +
        "    let np = p < 0.5 ? 2 * p : 1;\n" +
        "    object.position.x = fromPos[0] + (toPos[0] - fromPos[0]) * np;\n" +
        "    object.position.y = fromPos[1] + (toPos[1] - fromPos[1]) * np;\n" +
        "    slice.position.x = fromSlice[0] + (toSlice[0] - fromSlice[0]) * np;\n" +
        "    slice.position.y = fromSlice[1] + (toSlice[1] - fromSlice[1]) * np;\n" +
        "    let angles = [Math.sqrt(Math.pow(toRot[0] - fromRot[0], 2)) * np,\n" +
        "        Math.sqrt(Math.pow(toRot[1] - fromRot[1], 2)) * np];\n" +
        "    let whereTo = [(toRot[0] < fromRot[0] ? fromRot[0] - (angles[0] * np) : fromRot[0] + (angles[0] * np)),\n" +
        "        (toRot[1] < fromRot[1] ? fromRot[1] - (angles[1] * np) : fromRot[1] + (angles[1] * np))];\n" +
        "    object.rotation.x = whereTo[0];\n" +
        "    object.rotation.y = whereTo[1];\n" +
        "}\n\n" +
        "// From Settings [clim1, clim2, renderstyle, renderthreshold, u_cmdata]\n" +
        "function rampSettings(p, fromSettings, toSettings, object, slice){\n" +
        "    let np = p < 0.5 ? 2 * p : 1;\n" +
        "    object.children[0].material.uniforms['u_clim'].value.set(fromSettings[0] + (toSettings[0] - fromSettings[0]) * np,\n" +
        "        fromSettings[1] + (toSettings[1] - fromSettings[1]) * np);\n" +
        "    object.children[0].material.uniforms['u_renderstyle'].value = toSettings[2];\n" +
        "    object.children[0].material.uniforms['u_renderthreshold'].value = fromSettings[3] + (toSettings[3] - fromSettings[3]) * np;\n" +
        "    slice.children.forEach(child => child.material.uniforms['depth'].value = fromSettings[5] + (toSettings[5] - fromSettings[5]) * np);\n" +
        "    object.children[0].material.uniforms['u_cmdata'].value = RENDER.getColormap(toSettings[4]);\n" +
        "}\n\n" +
        "// RampOut function used for in and out transition\n" +
        "// ___\n" +
        "//    \\\n" +
        "//     \\__\n" +
        "function rampOut(p){\n" +
        "    return p < 0.2 ? 1 - (5*p) : 0;\n" +
        "}\n" +
        "\n" +
        "\n" +
        "// RampIn function used for in and out transition\n" +
        "//      ___\n" +
        "//    /\n" +
        "// __/\n" +
        "function rampIn(p){\n" +
        "    return p < 0.5 ? 2*p: 1;\n" +
        "}";

    return [output, maps];
}

function traverseNodes(start, nodeToLength, flow, decisionToFollow) {
    let len, n;
    let node = flow[start];
    if (Object.keys(nodeToLength).includes(node.id)) {
        return nodeToLength
    }
    if (node.type === "stop") {
        nodeToLength[node.id] = 1;
        return [1, nodeToLength, [node.id], decisionToFollow];
    }
    if (node.type === "decision") {
        let lengths = [];
        let nodes = [];
        node.out.connections.forEach(connection => {
            [len, nodeToLength, n, decisionToFollow] = traverseNodes(connection.node, nodeToLength, flow, decisionToFollow);
            lengths.push(len);
            n.forEach(e => nodes.push(e));
        });
        decisionToFollow[node.id] = [];
        nodes.forEach(n => decisionToFollow[node.id].push(n));
        decisionToFollow[node.id] = [...new Set(decisionToFollow[node.id])];
        nodes.push(node.id);
        let maxLength = Math.max(...lengths);
        nodeToLength[node.id] = maxLength + 1;
        return [maxLength + 1, nodeToLength, nodes, decisionToFollow];
    }
    [len, nodeToLength, n] = traverseNodes(node.out, nodeToLength, flow, decisionToFollow);
    n.push(node.id);
    nodeToLength[node.id] = len + 1;
    return [len + 1, nodeToLength, n, decisionToFollow];
}

function traverseFlow(j, instances, blendOut, output, nodeToInstance, flow, nodeUpdateInfo, length, nodeToLength, decisionToFollow, maps) {
    let nodecount = 0;
    while (nodecount < Object.keys(flow).length + 1) {
        nodecount++;
        let node = flow[j];
        //Check if the successor is a volume file set instructions to interpolate from one volvis to the next
        if (node.type === "volvis" && (flow[node.out].type === "volvis" || (node.blendOut !== undefined && flow[node.blendOut].type === "volvis"))) {
            // Compare the volume files
            let nextNode = flow[node.out].type === "volvis" ? flow[node.out] : flow[node.blendOut];
            let vol1 = node.volumeFile;
            let seg1 = node.segmentationFile;
            let vol2 = nextNode.volumeFile;
            let seg2 = nextNode.segmentationFile;
            if (vol1.size === vol2.size && vol1.name === vol2.name && vol1.type === vol2.type && node.slice === nextNode.slice) {
                if (seg1 === undefined && seg2 === undefined ||
                    seg1 !== undefined && seg2 !== undefined && seg1.size === seg2.size && seg1.name === seg1.name && seg1.type === seg2.type) {
                    nextNode.interpolateFrom = node;
                    nextNode.volume = node.volume;
                }
            }
            if (node.blendOut === undefined) {
                node.blendOut = nextNode.id;
                Object.keys(blendOut).includes(nextNode.id) ? blendOut[nextNode.id].push(node) : blendOut[nextNode.id] = [node];
            }
        } else if (node.type === "volvis" && node.interpolateFrom !== undefined) {
            if (node.blendOut === undefined) {
                node.blendOut = node.out;
                Object.keys(blendOut).includes(node.blendOut) ? blendOut[node.blendOut].push(node) : blendOut[node.blendOut] = [node];
            }
        }

        if (Object.keys(nodeToInstance).includes(node.id.toString())) {
            //already visited
            return [nodeToInstance, instances, output, maps];
        }
        if (node.blendOut !== undefined) {
            Object.keys(blendOut).includes(node.blendOut.toString()) ?
                blendOut[node.blendOut].push(node) :
                blendOut[node.blendOut] = [node];
        }
        if (!["start"].includes(node.type)) {
            nodeToInstance[node.id] = instances;
            output += getInstance(node, instances, node.type !== "stop", node.out, blendOut[node.id], nodeUpdateInfo[node.id],
                node.blendOut !== undefined, length, nodeToLength, flow[node.out] !== undefined ? flow[node.out].type : "stop");
        }
        if (node.type === "map") {
            maps.push(node);
        }
        instances++;
        if (flow[j].type === "stop") {
            return [nodeToInstance, instances, output, maps];
        }
        if (node.type === "decision") {
            // Handle the multiple outputs
            node.out.connections.forEach(connection => {
                [nodeToInstance, instances, output, maps] = traverseFlow(connection.node, instances, blendOut, output, nodeToInstance, flow, nodeUpdateInfo, length, nodeToLength, decisionToFollow, maps)
            })
        } else {
            j = node.out;
        }
    }
    return [nodeToInstance, instances, output, maps];
}

function getInstance(element, id, next, nextId, blendOut = [], nodeUpdateInfo, blend = false, length, nodeToLength, nextType) {
    let instanceId = Object.keys(nodeToLength).indexOf(element.id.toString());
    let nextInstanceId = next ? Object.keys(nodeToLength).indexOf(nextId.toString()) : -1;
    var output =
        "\n    once[" + instanceId + "] = false;\n" +
        "    instances[" + instanceId + "] = (p) => {\n" +
        "        if (p <= 0) {\n";
    if (element.type !== "stop") output += "            document.getElementById(\"c" + element.id + "\").classList.remove(\"active\");\n";
    if (["text", "subtext", "map", "image", "video", "decision"].includes(element.type)) {
        output += "            document.getElementById(\"" + element.id + "\").style.zIndex = \"-1\";\n";
    } else if (["volvis"].includes(element.type) && element.interpolateFrom === undefined) {
        let selector = "sl";
        if (element.slice === "false") selector = "vol";
        output += "            alterUniform(LoadData." + selector + element.volume + ",0,\"u_opacity\");\n";
    }

    output += "        } else {\n";
    if (element.type !== "stop") output += "            document.getElementById(\"c" + element.id + "\").classList.add(\"active\");\n";
    if (["text", "subtext", "map", "image", "video", "stop", "decision"].includes(element.type)) {
        if (element.type !== "stop") {
            output += "            document.getElementById(\"" + element.id + "\").style.zIndex = \"" + (length - nodeToLength[element.id]) + "\";\n";
            output += blend ? "            if(p < 1) document.getElementById(\"" + element.id + "\").style.opacity = rampIn(p);\n" :
                element.type === "stop" || (element.type !== "decision" && nextType === "stop") ? "            document.getElementById(\"" + element.id + "\").style.opacity = rampIn(p);\n" :
                    "            document.getElementById(\"" + element.id + "\").style.opacity = ramp(p);\n";
        }
        if (element.type === "decision") {
            output += "            if (p < 1 && once[" + instanceId + "]) {\n" +
                "                once[" + instanceId + "] = false;\n" +
                "                factor = factors[" + instanceId + "];\n" +
                "                [listenerRemover, once] = removeListenersAndOnces(pred" + element.id + ", listenerRemover, once)\n" +
                "            }\n";
        }

        if (nodeUpdateInfo !== undefined) {
            output += "            if(p<1){\n";
            nodeUpdateInfo.forEach(info => {
                output += "              " + info;
            });
            output += "            }\n"
        }

    } else if (["volvis"].includes(element.type)) {
        output += "             if(p < 1) {";
        if (element.interpolateFrom !== undefined) {
            output += "\n              rampTo(p, " + element.interpolateFrom.zoom + "," + element.zoom + ",_camera);\n";
            output += "              rampToPosRot(p, [" + element.interpolateFrom.pos + "],[" + element.pos + "]," +
                "[" + element.interpolateFrom.rot + "],[" + element.rot + "],[" + element.interpolateFrom.slicePos + "]," +
                "[" + element.slicePos + "],LoadData.vol" + element.interpolateFrom.volume + ",LoadData.sl" + element.interpolateFrom.volume + ");\n" +
                "              rampSettings(p,[" + element.interpolateFrom.clim1 + "," + element.interpolateFrom.clim2 + ","
                + element.interpolateFrom.method + "," + element.interpolateFrom.iso + ",\""
                + element.interpolateFrom.colormap + "\", " + element.interpolateFrom.sliceDepth + "],[" + element.clim1 + "," + element.clim2
                + "," + element.method + "," + element.iso + ",\"" + element.colormap + "\"," + element.sliceDepth + "]," +
                "LoadData.vol" + element.interpolateFrom.volume + ",  LoadData.sl" + element.interpolateFrom.volume + ");\n";
        } else {
            output += "\n              rampTo(p, 0, " + element.zoom + ", _camera);\n";
            if (element.slice === "false") {
                output += blend || nextType === "stop" ? "              alterUniform(LoadData.vol" + element.volume + ",rampIn(p),\"u_opacity\");\n" :
                    "              alterUniform(LoadData.vol" + element.volume + ",ramp(p), \"u_opacity\");\n";
            } else {
                output += blend || nextType === "stop" ? "              alterUniform(LoadData.sl" + element.volume + ",rampIn(p),\"u_opacity\");\n" :
                    "              alterUniform(LoadData.sl" + element.volume + ",ramp(p),\"u_opacity\");\n";
            }
        }
        if (nodeUpdateInfo !== undefined) {
            nodeUpdateInfo.forEach(info => {
                output += "              " + info;
            });
        }
        output += "            }\n";
    }
    if (blendOut.length > 0 && element.type !== "stop") {
        [...new Set(blendOut)].forEach(bl => {
            if (["map", "image", "video"].includes(bl.type)) {
                output += "            document.getElementById(\"" + bl.id + "\").style.opacity = rampOut(p);\n"
            } else if (bl.type === "volvis" && element.interpolateFrom === undefined) {
                output += bl.slice === "false" ? "            alterUniform(LoadData.vol" + bl.volume + ",rampOut(p),\"u_opacity\");\n" :
                    "            alterUniform(LoadData.sl" + bl.volume + ",rampOut(p),\"u_opacity\");\n";
            }
        });
    }
    output += "        }\n" +
        "        if (p === 1 && !once[" + instanceId + "]) {\n" +
        "            factors[" + instanceId + "] = factor;\n";
    if (next) {
        // Handle Decision node
        if (element.type === "decision") {
            element.out.connections.forEach(out => {
                nextInstanceId = Object.keys(nodeToLength).indexOf(out.node);
                output += "            if (document.getElementsByName(\"question" + element.id + "\")[" + element.out.connections.indexOf(out) + "].checked) {\n" +
                    // "                factor += " + (((nodeToLength[element.id] - nodeToLength[out.node]) - 1) / nodeToLength[out.node]) + ";\n" +
                    "                predecessor[" + nextInstanceId + "] = predecessor[" + instanceId + "]" + " + factor /" + length + ";\n" +
                    "                listenerRemover[" + nextInstanceId + "] = uos(predecessor[" + instanceId + "], predecessor[" + instanceId + "] + factor / " + length +
                    ", p => instances[" + nextInstanceId + "](p));\n" +
                    "            }\n";
            })
        } else {
            output += "            predecessor[" + nextInstanceId + "] = predecessor[" + instanceId + "]" + " + factor /" + length + ";\n" +
                "            listenerRemover[" + nextInstanceId + "] = uos(predecessor[" + instanceId + "] , predecessor[" + instanceId + "]" + " + factor /" + length +
                ", p => instances[" + nextInstanceId + "](p));\n";
        }
    }
    output += "            once[" + instanceId + "] = true;\n" +
        // "            zoom[" + instanceId + "] = _camera.zoom;\n" +
        "        }\n" +
        "    };";
    return output;
}

function generateMapCode(maps) {
    var output = generalMapCode(parseFloat(map.lat), parseFloat(map.lon));

    for (let i = 0; i < maps.length; i++) {
        let map = maps[i];
        let latLonFrom = [parseFloat(map.lat), parseFloat(map.lon)];
        for (let j = 0; j < maps.length; j++) {
            if (maps[j].out === map.id || maps[j].blendOut === map.id) {
                latLonFrom = [maps[j].lat, maps[j].lon];
            }
        }
        output += getMapcode(parseFloat(map.lat), parseFloat(map.lon), "map" + map.id, latLonFrom);
    }
    return output;
}

function getMapcode(lat, lon, container, latLonFrom) {
    var output =
        "var " + container + "= new mapboxgl.Map({\n" +
        "       container: '" + container + "',\n" +
        "       style: 'mapbox://styles/mapbox/dark-v10',\n" +
        "       minZoom: 3,\n" +
        "       maxZoom: 18,\n" +
        "       interactive: false,\n" +
        "       center: [" + latLonFrom[1] + ", " + latLonFrom[0] + "],\n";
    if (latLonFrom[0] !== lat) {
        output += "       zoom: 10,\n";
    }
    output += "       scrollZoom: false\n" +
        "});\n" +
        container + ".on('load', function () {\n" +
        "        (function mapLoop() {\n" +
        "            let opacity = parseInt(document.getElementById(\"" + container + "\").parentElement.style.opacity);\n" +
        "            if (isNaN(opacity) || opacity <= 0.95) {\n" +
        "                setTimeout(mapLoop, 100);\n" +
        "            } else {\n" +
        "                new mapboxgl.Marker().setLngLat([" + latLonFrom[1] + ", " + latLonFrom[0] + "]).addTo(" + container + ");\n" +
        "                easeTo(" + container + "," + lat + "," + lon + "," + (latLonFrom[0] !== lat) + ");\n" +
        "            }\n" +
        "        })();\n" +
        "});";
    return output;
}

function generalMapCode() {
    var output = "mapboxgl.accessToken = 'pk.eyJ1Ijoic3Bvb25lcnVpYiIsImEiOiJja2xjbGtyNWIxdXJvMnducGZhbWtyanhoIn0.edNKG90Wl-j4w7VSob5jkg';\n" +
        "\n" +
        "function easeTo(map, lat, lon, newLocation) {\n" +
        "        new mapboxgl.Marker().setLngLat([lon,lat]).addTo(map);\n" +
        "        if(newLocation){ \n" +
        "                map.flyTo({duration: 10000, zoom: 10, center: [lon,lat]});\n" +
        "        }else{\n" +
        "                map.easeTo({duration: 10000, zoom: 10, center: [lon,lat]});\n        }\n" +
        "}\n" +
        "\n";
    return output;
}

function exportWebpage(indexHTML, flow, volvis, nodeUpdateInfo, startNode) {
    var zip = new JSZip();
    zip.file("index.html", indexHTML);
    //generate the Data Loaders
    var [instances, maps] = createInstances(flow, nodeUpdateInfo, startNode);
    // let [loadData, groups] = generateDataLoader(volvis, newFileNames);
    var loadData;
    [loadData, newFiles] = generateDataLoaderNew(volvis, newFiles);
    var js = zip.folder("js");
    if (maps !== undefined && maps.length > 0) {
        let mapCode = generateMapCode(maps);
        js.file("mapCode.js", mapCode);
    }
    var data = zip.folder("data");
    js.file("loadData.js", loadData);
    js.file("instances.js", instances);
    var css = zip.folder("css");
    var jsm = zip.folder("jsm");
    var libs = jsm.folder("libs");
    var misc = jsm.folder("misc");
    var shaders = jsm.folder("shaders");
    var textures = zip.folder("textures");
    var node_modules = zip.folder("node_modules").folder("three").folder("build");
    let promises = [
        loadFile("./web/js/index.js").then((index) => js.file("index.js", index)),
        loadFile("./web/js/nifti-reader.js").then((nifti) => js.file("nifti-reader.js", nifti)),
        loadFile("./web/js/videoCode.js").then((video) => js.file("videoCode.js", video)),
        loadFile("./web/js/volume-render.js").then((volume) => js.file("volume-render.js", volume)),
        $.get("./web/css/base.css").then((base) => css.file("base.css", base)),
        $.get("./web/css/main.css").then((main) => css.file("main.css", main)),
        $.get("./web/css/tree.css").then((tree) => css.file("tree.css", tree)),
        loadFile("./web/node_modules/three/build/three.module.js")
            .then((three) => node_modules.file("three.module.js", three)),
        loadFile("./web/jsm/libs/dat.gui.module.js").then((dataGui) => libs.file("dat.gui.module.js", dataGui)),
        loadFile("./web/jsm/misc/Volume.d.ts").then((volumeD) => misc.file("Volume.d.ts", volumeD)),
        loadFile("./web/jsm/misc/Volume.js").then((volumeJs) => misc.file("Volume.js", volumeJs)),
        loadFile("./web/jsm/misc/VolumeSlice.d.ts").then((volumeSliceD) => misc.file("VolumeSlice.d.ts", volumeSliceD)),
        loadFile("./web/jsm/misc/VolumeSlice.js").then((volumeSliceJ) => misc.file("VolumeSlice.js", volumeSliceJ)),
        loadFile("./web/jsm/shaders/VolumeShader.d.ts").then((volumeShadeD) => shaders.file("VolumeShader.d.ts", volumeShadeD)),
        loadFile("./web/jsm/shaders/VolumeShader.js").then((volumeShadeJ) => shaders.file("VolumeShader.js", volumeShadeJ)),
        loadFile("./web/jsm/shaders/SliceShader.js").then((volumeShadeJ) => shaders.file("SliceShader.js", volumeShadeJ)),
        loadFile("./web/textures/cm_gray.png").then((gray) => textures.file("cm_gray.png", gray)),
        loadFile("./web/textures/cm_viridis.png").then((viri) => textures.file("cm_viridis.png", viri)),
    ];
    for (let ind in newFiles) {
        promises.push(
            data.file(newFiles[ind], inputFiles[ind])
        )
    }
    Promise.all(promises).then(
        (result) => {
            zip.generateAsync({type: "blob"})
                .then(function (content) {
                    // Force down of the Zip file
                    saveAs(content, "website.zip");
                    document.getElementById("exportButton").classList.remove("disabled");
                });
        }
    ).catch(e => {
        console.log(e);
    })
}

function loadFile(url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.crossOrigin = true;
        request.responseType = 'arraybuffer';
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status === 200) {
                resolve(request.response)
            }
        };
        request.send();
    });
}
