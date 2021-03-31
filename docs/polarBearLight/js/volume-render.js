import * as THREE from '../node_modules/three/build/three.module.js';
import {VolumeRenderShader1} from '../jsm/shaders/VolumeShader.js';
import {VolumeSliceRenderShader} from '../jsm/shaders/SliceShader.js';
import {Volume} from "../jsm/misc/Volume.js";

var renderer,
    render,
    scene,
    camera,
    materials = [],
    volconfig,
    cmtextures;

export function volume_render_init(renderIn) {
    render = renderIn;
    scene = new THREE.Scene();
    // Create renderer
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('webgl2', {alpha: false, antialias: false});
    renderer = new THREE.WebGLRenderer({canvas: canvas, context: context});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var h = 500; // frustum height
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-h * aspect / 2,
        h * aspect / 2,
        h / 2,
        -h / 2,
        0.00001,
        200000);
    camera.position.set(0, 0, 0);
    camera.up.set(0, 0, 1); // In our data, z is up
    camera.zoom = 0.8;
    volconfig = {clim1: 0.15, clim2: 0.8, renderstyle: 'mip', isothreshold: 0.15, opacity: 0.0, colormap: 'viridis'};
    return [renderer, scene, camera];
}

export function getColormap(colormap){
    return cmtextures[colormap];
}

export function loadData(url, receiver) {
    readNifti(url, (volume) => {
        var texture = new THREE.DataTexture3D(volume.data, volume.xLength, volume.yLength, volume.zLength);
        texture.format = THREE.RedFormat;
        texture.type = THREE.FloatType;
        texture.minFilter = texture.magFilter = THREE.LinearFilter;
        texture.unpackAlignment = 1;

        // Colormap textures
        cmtextures = {
            viridis: new THREE.TextureLoader().load('textures/cm_viridis.png', render),
            gray: new THREE.TextureLoader().load('textures/cm_gray.png', render)
        };

        // Material
        var shader = VolumeRenderShader1;
        var sliceShader = VolumeSliceRenderShader;

        var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

        uniforms["u_data"].value = texture;
        uniforms["u_size"].value.set(volume.xLength, volume.yLength, volume.zLength);
        uniforms["u_clim"].value.set(volconfig.clim1, volconfig.clim2);
        uniforms["u_renderstyle"].value = volconfig.renderstyle === 'mip' ? 0 : volconfig.renderstyle === 'iso' ? 1 : 2; // 0: MIP, 1: ISO
        uniforms["u_renderthreshold"].value = volconfig.isothreshold; // For ISO renderstyle
        uniforms["u_opacity"].value = volconfig.opacity;
        uniforms["u_cmdata"].value = cmtextures[volconfig.colormap];

        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            side: THREE.BackSide, // The volume shader uses the backface as its "reference point"
            blending: THREE.NormalBlending,
            transparent: true,
        });
        materials.push(material);

        // THREE.Mesh
        var geometry = new THREE.BoxBufferGeometry(volume.xLength, volume.yLength, volume.zLength);
        geometry.translate(volume.xLength / 2 - 0.5, volume.yLength / 2 - 0.5, volume.zLength / 2 - 0.5);
        var mesh = new THREE.Mesh(geometry, material);
        // scene.add(mesh);


        // Slicing setup
        const textureSlice = new THREE.DataTexture2DArray(volume.data, volume.xLength, volume.yLength, volume.zLength);
        textureSlice.format = THREE.RedFormat;
        textureSlice.type = THREE.FloatType;
        const materialSlice = new THREE.ShaderMaterial({
            uniforms: {
                diffuse: {value: textureSlice},
                depth: {value: 0},
                size: {value: new THREE.Vector2(500 * (volume.xLength/volume.yLength), 500)},
                u_opacity: {value: 0.0},
                u_level: {value: 0.51},
                u_window: {value: 0.99},
                u_seg: {value: false},
                transparent: true,
            },
            vertexShader: sliceShader.vertexShader,
            fragmentShader: sliceShader.fragmentShader,
            blending: THREE.NormalBlending,
            transparent: true,
            glslVersion: THREE.GLSL3
        });
        const geometrySlice = new THREE.PlaneGeometry(500 * (volume.xLength/volume.yLength), 500);
        var meshSlice = new THREE.Mesh(geometrySlice, materialSlice);

        receiver(mesh, meshSlice, volume)
    });
    // window.addEventListener('resize', onWindowResize, false);
}

function readNifti(url, receiver) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.crossOrigin = true;
    request.responseType = 'arraybuffer';
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status === 200) {
            let data = request.response;
            if (nifti.isCompressed(data)) {
                data = nifti.decompress(data);
            }
            if (nifti.isNIFTI1(data)) {

                let niftiHeader = nifti.readHeader(data);
                let volume = new Volume();
                let image = nifti.readImage(niftiHeader, data);
                let int8 =  new Int8Array(image);
                let int16 = new Int16Array(image);
                let int32 = new Int32Array(image);
                let float64 = new Float64Array(image);
                let dimensions = niftiHeader.dims[1] * niftiHeader.dims[2] * niftiHeader.dims[3];
                if (dimensions === int8.length) {
                    volume.data = int8;
                } else if (dimensions === int16.length) {
                    volume.data = int16;
                } else if(dimensions === int32.length) {
                    volume.data = int32;
                } else {
                    volume.data = float64
                }
                // get the min and max intensities
                var min_max = volume.computeMinMax();
                var min = min_max[0];
                var max = min_max[1];

                var dataASFloat32 = new Float32Array(volume.data.length);
                for (var i = 0; i < volume.data.length; i++) {
                    dataASFloat32 [i] = (volume.data[i]-min) / Math.sqrt(Math.pow(max,2)-Math.pow(min,2));
                }
                volume.data = dataASFloat32;
                // get the min and max intensities
                var min_max = volume.computeMinMax();
                var min = min_max[0];
                var max = min_max[1];
                // attach the scalar range to the volume
                volume.windowLow = min;
                volume.windowHigh = max;
                // get the image dimensions
                volume.dimensions = [niftiHeader.dims[1], niftiHeader.dims[2], niftiHeader.dims[3]];
                volume.spacing = [niftiHeader.pixDims[1], niftiHeader.pixDims[2],niftiHeader.pixDims[3]];
                volume.offset = [niftiHeader.qoffset_x, niftiHeader.qoffset_y, niftiHeader.qoffset_z];
                volume.xLength = niftiHeader.dims[1];
                volume.yLength = niftiHeader.dims[2];
                volume.zLength = niftiHeader.dims[3];
                receiver(volume);
            }
        }
    };
    request.send();

}
