import * as RENDER from "./volume-render.js";
import * as THREE from '../node_modules/three/build/three.module.js';

export var vol24,sl24,vol31,sl31;
export var size24,sizeSeg24,size31,sizeSeg31;
export var groups = [];
export var groupLength = 4;

export function loadVolumeData(_scene) {
    RENDER.loadData("data/24_24_orrfugl.cropped.nii.gz", (mesh, meshSlice, volume) => {
        vol24 = new THREE.Group();
        size24 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size24[0]/2, - size24[1]/2, - size24[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_renderthreshold"].value = 0.1;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol24.position.set(-(volume.xLength*volume.spacing[0])/2, 0, -1000);
        vol24.add(mesh);
        vol24.rotation.x = 0* ( Math.PI / 180 );
        vol24.rotation.y = 0* ( Math.PI / 180 );
        vol24.rotation.z = 0* ( Math.PI / 180 );
        _scene.add(vol24);
        groups.push(vol24);

        sl24 = new THREE.Group();
        meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        sl24.add(meshSlice);
        _scene.add(sl24);
        groups.push(sl24);
    });
    RENDER.loadData("data/31_31_bear.cropped.nii.gz", (mesh, meshSlice, volume) => {
        vol31 = new THREE.Group();
        size31 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size31[0]/2, - size31[1]/2, - size31[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 1;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol31.position.set(-(volume.xLength*volume.spacing[0])/2, 0, -1000);
        vol31.add(mesh);
        vol31.rotation.x = 0* ( Math.PI / 180 );
        vol31.rotation.y = 0* ( Math.PI / 180 );
        vol31.rotation.z = 0* ( Math.PI / 180 );
        _scene.add(vol31);
        groups.push(vol31);

        sl31 = new THREE.Group();
        meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        sl31.add(meshSlice);
        _scene.add(sl31);
        groups.push(sl31);
    });
}