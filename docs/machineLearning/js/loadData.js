import * as RENDER from "./volume-render.js";
import * as THREE from '../node_modules/three/build/three.module.js';

export var vol8,sl8,vol11,sl11,vol15,sl15,vol24,sl24;
export var size8,sizeSeg8,size11,sizeSeg11,size15,sizeSeg15,size24,sizeSeg24;
export var zoom8,zoom11,zoom15,zoom24;
export var groups = [];
export var groupLength = 8;

export function loadVolumeData(_scene, _camera) {
    RENDER.loadData("data/8_19_W1_1996.10.25_bias_ss_FLAIR.nii.gz", (mesh, meshSlice, volume) => {
        vol8 = new THREE.Group();
        size8 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size8[0]/2, - size8[1]/2, - size8[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol8.add(mesh);
        vol8.rotation.x = 0;
        vol8.rotation.y = 0;
        vol8.rotation.z = 0;
        vol8.position.z = -5000;
        vol8.position.x = 0;
        vol8.position.y = 0;
        zoom8= 3.0517578125;
        _scene.add(vol8);
        groups.push(vol8);

        sl8 = new THREE.Group();
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = 0;
        meshSlice.position.y = 0;
        meshSlice.material.uniforms["depth"].value = 0;
        sl8.add(meshSlice);
        _scene.add(sl8);
        groups.push(sl8);
    });
    RENDER.loadData("data/11_19_W1_1996.10.25_bias_ss_FLAIR.nii.gz", (mesh, meshSlice, volume) => {
        vol11 = new THREE.Group();
        size11 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size11[0]/2, - size11[1]/2, - size11[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol11.add(mesh);
        vol11.rotation.x = -1.0681415022205298;
        vol11.rotation.y = -0.5621797380108048;
        vol11.rotation.z = 0;
        vol11.position.z = -5000;
        vol11.position.x = 0;
        vol11.position.y = 0;
        zoom11= 3.0517578125;
        _scene.add(vol11);
        groups.push(vol11);

        sl11 = new THREE.Group();
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = 0;
        meshSlice.position.y = 0;
        meshSlice.material.uniforms["depth"].value = 0;
        sl11.add(meshSlice);
        _scene.add(sl11);
        groups.push(sl11);

        RENDER.loadData("data/11_24_brainSegment.nii.gz", (mesh,meshSlice, volume) => {
        sizeSeg11 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size11[0]/2, - size11[1]/2, - size11[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,1.0);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("viridis");
        vol11.add(mesh);
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = 0;
        meshSlice.position.y = 0;
        meshSlice.material.uniforms["depth"].value = 0;
        meshSlice.material.uniforms["u_color"].value = new THREE.Vector3(1,0,0);
        sl11.add(meshSlice);
        });

    });
    RENDER.loadData("data/15_19_W1_1996.10.25_bias_ss_FLAIR.nii.gz", (mesh, meshSlice, volume) => {
        vol15 = new THREE.Group();
        size15 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size15[0]/2, - size15[1]/2, - size15[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol15.add(mesh);
        vol15.rotation.x = -2.8274333882308142;
        vol15.rotation.y = -2.728225199170083;
        vol15.rotation.z = 0;
        vol15.position.z = -5000;
        vol15.position.x = 0;
        vol15.position.y = 0;
        zoom15= 0.7938498832162935;
        _scene.add(vol15);
        groups.push(vol15);

        sl15 = new THREE.Group();
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = 0;
        meshSlice.position.y = 0;
        meshSlice.material.uniforms["depth"].value = 2;
        sl15.add(meshSlice);
        _scene.add(sl15);
        groups.push(sl15);

        RENDER.loadData("data/15_24_brainSegment.nii.gz", (mesh,meshSlice, volume) => {
        sizeSeg15 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size15[0]/2, - size15[1]/2, - size15[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,1.0);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("viridis");
        vol15.add(mesh);
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = 0;
        meshSlice.position.y = 0;
        meshSlice.material.uniforms["depth"].value = 2;
        meshSlice.material.uniforms["u_seg"].value = true;
        meshSlice.material.uniforms["u_color"].value = new THREE.Vector3(1,0,0);
        sl15.add(meshSlice);
        });

    });
    RENDER.loadData("data/24_53_result.nii.gz", (mesh, meshSlice, volume) => {
        vol24 = new THREE.Group();
        size24 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size24[0]/2, - size24[1]/2, - size24[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,0.8);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_renderthreshold"].value = 0.15;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("gray");
        vol24.add(mesh);
        vol24.rotation.x = -0.5340707511102647;
        vol24.rotation.y = 0.21495107629824972;
        vol24.rotation.z = 0;
        vol24.position.z = -5000;
        vol24.position.x = 0;
        vol24.position.y = 0;
        zoom24= 5.242975975512261;
        _scene.add(vol24);
        groups.push(vol24);

        sl24 = new THREE.Group();
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = -30.952076007038986;
        meshSlice.position.y = -6.382366060366184;
        meshSlice.material.uniforms["depth"].value = 18;
        meshSlice.material.uniforms["u_seg"].value = true;
        sl24.add(meshSlice);
        _scene.add(sl24);
        groups.push(sl24);

        RENDER.loadData("data/24_55_result.nii.gz", (mesh,meshSlice, volume) => {
        sizeSeg24 = [volume.xLength*volume.spacing[0], volume.yLength*volume.spacing[1],volume.zLength*volume.spacing[2], volume.xLength, volume.yLength, volume.zLength];
        mesh.scale.set(volume.spacing[0], volume.spacing[1], volume.spacing[2]);
        mesh.position.set(- size24[0]/2, - size24[1]/2, - size24[2]/2);
        mesh.material.uniforms["u_clim"].value.set(0.15,1.0);
        mesh.material.uniforms["u_renderstyle"].value = 2;
        mesh.material.uniforms["u_cmdata"].value = RENDER.getColormap("viridis");
        vol24.add(mesh);
        meshSlice.rotation.z = Math.PI;
        meshSlice.position.x = -30.952076007038986;
        meshSlice.position.y = -6.382366060366184;
        meshSlice.material.uniforms["depth"].value = 18;
        meshSlice.material.uniforms["u_seg"].value = true;
        meshSlice.material.uniforms["u_color"].value = new THREE.Vector3(1,0,0);
        sl24.add(meshSlice);
        });

    });
    }
