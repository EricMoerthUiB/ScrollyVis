import * as RENDER from "./volume-render.js";
import * as THREE from '../node_modules/three/build/three.module.js';

export var vol18,sl18,vol33,sl33,vol44,sl44;
export var size18,sizeSeg18,size33,sizeSeg33,size44,sizeSeg44;
export var zoom18,zoom33,zoom44;
export var groups = [];
export var groupLength = 6;

export function loadVolumeData(_scene, _camera) {
    RENDER.loadData("data/18_24_24_orrfugl.cropped.nii.gz", (mesh, meshSlice, volume) => {
        vol18 = new THREE.Group();
        size18 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size18[0]/2, - size18[1]/2, - size18[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 1;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol18.add(mesh);
        vol18.rotation.x = 0.47123889803846936;
        vol18.rotation.y = -1.1078247778448218;
        vol18.rotation.z = 0;
        vol18.position.z = -5000;
        vol18.position.x = 0;
        vol18.position.y = 0;
        zoom18= 7.529411764705882;
        _scene.add(vol18);
        groups.push(vol18);

        sl18 = new THREE.Group();
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = 0;
        meshSlice.position.y = 0;
        meshSlice.material.uniforms["depth"].value = 0;
        sl18.add(meshSlice);
        _scene.add(sl18);
        groups.push(sl18);
    });
    RENDER.loadData("data/33_31_31_bear.cropped.nii.gz", (mesh, meshSlice, volume) => {
        vol33 = new THREE.Group();
        size33 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size33[0]/2, - size33[1]/2, - size33[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 1;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol33.add(mesh);
        vol33.rotation.x = 0.12566370614359185;
        vol33.rotation.y = 0.5952491343643816;
        vol33.rotation.z = 0;
        vol33.position.z = -5000;
        vol33.position.x = 0;
        vol33.position.y = 0;
        zoom33= 2.6528497409326426;
        _scene.add(vol33);
        groups.push(vol33);

        sl33 = new THREE.Group();
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = 0;
        meshSlice.position.y = 0;
        meshSlice.material.uniforms["depth"].value = 0;
        sl33.add(meshSlice);
        _scene.add(sl33);
        groups.push(sl33);
    });
    RENDER.loadData("data/44_31_31_bear.cropped.nii.gz", (mesh, meshSlice, volume) => {
        vol44 = new THREE.Group();
        size44 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size44[0]/2, - size44[1]/2, - size44[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 1;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol44.add(mesh);
        vol44.rotation.x = 0.03141592653589764;
        vol44.rotation.y = 0.5787144361875938;
        vol44.rotation.z = 0;
        vol44.position.z = -5000;
        vol44.position.x = 5.800030921052651;
        vol44.position.y = 12.585771250000011;
        zoom44= 1.1425867690821159;
        _scene.add(vol44);
        groups.push(vol44);

        sl44 = new THREE.Group();
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = -3.6850823322345323;
        meshSlice.position.y = 40.25952447966256;
        meshSlice.material.uniforms["depth"].value = 15;
        sl44.add(meshSlice);
        _scene.add(sl44);
        groups.push(sl44);
    });
    }
