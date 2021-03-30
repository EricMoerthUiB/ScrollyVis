import * as RENDER from "./volume-render.js";
import * as THREE from '../node_modules/three/build/three.module.js';

export var vol19,sl19,sl29,sl52;
export var size19,sizeSeg19,size29,sizeSeg29,size52,sizeSeg52;
export var groups = [];
export var groupLength = 4;

export function loadVolumeData(_scene) {
    RENDER.loadData("data/19_vibe2min.nii.gz", (mesh, meshSlice, volume) => {
        vol19 = new THREE.Group();
        size19 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size19[0]/2, - size19[1]/2, - size19[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol19.position.set(-(volume.xLength*volume.spacing[0])/2, 0, -1000);
        vol19.add(mesh);
        vol19.rotation.x = 0* ( Math.PI / 180 );
        vol19.rotation.y = 0* ( Math.PI / 180 );
        vol19.rotation.z = 0* ( Math.PI / 180 );
        _scene.add(vol19);
        groups.push(vol19);

        sl19 = new THREE.Group();
        meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        sl19.add(meshSlice);
        _scene.add(sl19);
        groups.push(sl19);

        RENDER.loadData("data/50_140segmented-2-vibe2min-header.nii.gz", (mesh,meshSlice, volume) => {
        sizeSeg19 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size19[0]/2, - size19[1]/2, - size19[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,1.0);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol19.add(mesh);
        meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        meshSlice.material.uniforms["u_seg"].value = true;
        sl19.add(meshSlice);
        });

    });
    RENDER.loadData("data/29_vibe2min.nii.gz", (mesh, meshSlice, volume) => {
        sl29 = new THREE.Group();
        size29 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        sl29.add(meshSlice);
        _scene.add(sl29);
        groups.push(sl29);

        RENDER.loadData("data/24_140segmented-2-vibe2min-header.nii.gz", (mesh,meshSlice, volume) => {
        meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        meshSlice.material.uniforms["u_seg"].value = true;
        sl29.add(meshSlice);
        });

    });
    RENDER.loadData("data/52_vibe2min.nii.gz", (mesh, meshSlice, volume) => {
        sl52 = new THREE.Group();
        size52 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        sl52.add(meshSlice);
        _scene.add(sl52);
        groups.push(sl52);

        RENDER.loadData("data/53_result.nii.gz", (mesh,meshSlice, volume) => {
        meshSlice.position.x = -180;
        meshSlice.rotation.z = Math.PI;
        meshSlice.material.uniforms["u_seg"].value = true;
        sl52.add(meshSlice);
        });

    });
}