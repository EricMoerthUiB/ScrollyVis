class Arcball {
    constructor(renderer, camera, scene, window, slice) {
        this.arcCamera = camera;
        this.arcScene = scene;
        this.arcRenderer = renderer;
        this.arcWindow = window;
        this.type = -1;
        this.slice = slice;
    }

    // Declares the start of a click
    onDocumentMouseDown(event) {
        this.isClicking = true;
        this.mousePositionStart = [((event.offsetX - this.arcWindow.offsetWidth) / this.arcWindow.offsetWidth + 1) * 2 - 1,
            (((event.offsetY - this.arcWindow.offsetHeight) / this.arcWindow.offsetHeight) * -2) - 1];
        this.objectPositionStart = [this.arcObject.position.x, this.arcObject.position.y];
        this.sliceObjectPositionStart = [this.sliceGroup.position.x, this.sliceGroup.position.y];
        this.objectRotationStart = [this.arcObject.rotation.x, this.arcObject.rotation.y];
        this.type = event.button;
    }

// Declares the ending of a click
    onDocumentMouseUp(event) {
        this.isClicking = false;
    }

    onDocumentMouseWheel(event) {
        if (this.slice === true) {
            // Slicing
            if (event.deltaY < 0 && this.sliceGroup.children[0].material.uniforms["depth"].value <= this.arcObject.children[0].material.uniforms["u_size"].value.z) {
                this.sliceGroup.children.forEach(child => child.material.uniforms["depth"].value = child.material.uniforms["depth"].value + 1)
            } else if (this.sliceGroup.children[0].material.uniforms["depth"].value > 0) {
                this.sliceGroup.children.forEach(child => child.material.uniforms["depth"].value = child.material.uniforms["depth"].value - 1)
            }
            this.arcRenderer.render(this.arcScene, this.arcCamera);
        } else {
            if (event.deltaY < 0) {
                this.arcCamera.zoom *= 1.25;
            }
            if (event.deltaY > 0) {
                if (this.arcCamera.zoom > 0.1)
                    this.arcCamera.zoom /= 1.25;
            }
            this.arcCamera.updateProjectionMatrix();
            this.arcRenderer.render(this.arcScene, this.arcCamera);
        }
    }

    onDocumentMouseMove(event) {
        this.mousePosition = [((event.offsetX - this.arcWindow.offsetWidth) / this.arcWindow.offsetWidth + 1) * 2 - 1,
            (((event.offsetY - this.arcWindow.offsetHeight) / this.arcWindow.offsetHeight) * -2) - 1]

    }

    set object(object) {
        this.arcObject = object;
    }

    set sliceGroupValue(object) {
        this.sliceGroup = object;
    }

    set sliceValue(value) {
        this.slice = value;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.isClicking) {
            this.mouseVector = [this.mousePosition[0] - this.mousePositionStart[0], this.mousePosition[1] - this.mousePositionStart[1]];
            if (this.type === 1 && this.slice === false) {
                // arcObject.position.set(-arcObjectSize[0] / 2 + mouseEvent.x* arcObject.scale.x * arcObjectSize[0]*2, -arcObjectSize[1] / 2 + mouseEvent.y * arcObject.scale.y * arcObjectSize[1]*2, -arcObjectSize[2] / 2);
                this.arcObject.position.x = this.objectPositionStart[0] + this.mouseVector[0] * 1 / this.arcCamera.zoom * 200;
                this.arcObject.position.y = this.objectPositionStart[1] + this.mouseVector[1] * 1 / this.arcCamera.zoom * 200;
                // arcObject.object.position.setZ(mouseEvent.z);
            } else if (this.type === 1 && this.slice) {
                this.sliceGroup.position.x = this.sliceObjectPositionStart[0] + this.mouseVector[0] * 1 / this.arcCamera.zoom * 200;
                this.sliceGroup.position.y = this.sliceObjectPositionStart[1] + this.mouseVector[1] * 1 / this.arcCamera.zoom * 200;
            } else if (this.type === 0 && this.slice === true) {
                if (this.mouseVector[0] > 0) {
                    this.arcCamera.zoom *= 1.02;
                } else if (this.arcCamera.zoom > 0.5) {
                    this.arcCamera.zoom /= 1.02;
                }
                this.arcCamera.updateProjectionMatrix();
                this.arcRenderer.render(this.arcScene, this.arcCamera);
            } else if (this.type === 0 && this.slice === false) {
                let posX = this.arcObject.position.x, posY = this.arcObject.position.y;
                this.arcObject.position.x = 0;
                this.arcObject.position.y = 0;
                this.arcObject.rotation.x = this.objectRotationStart[0] + this.mouseVector[1] * Math.PI;
                this.arcObject.rotation.y = this.objectRotationStart[1] - this.mouseVector[0] * Math.PI;
                this.arcObject.position.x = posX;
                this.arcObject.position.y = posY;
                // arcObject.rotation.z = 0* ( Math.PI / 180 );
            }
            this.arcRenderer.render(this.arcScene, this.arcCamera);
        }

        //scene.updateMatrixWorld();
    }

}

//
// set
//
// setData(renderer, camera, scene, window, object) {
//     this._arcCamera = camera;
//     this._arcScene = scene;
//     this._arcRenderer = renderer;
//     this._arcWindow = window;
//     this._arcObject = object;
// }

// }

// // Stores the mouse vector in normalized device coordinates
// var mouseVector = new THREE.Vector3();
// // Stores the mouse vector in the event position
// var mouseEvent = new THREE.Vector3();
// var isClicking, type;
// var arcCamera, arcScene, arcRenderer, arcInteractiveBoxes, arcWindow, arcObject, arcObjectSize;
//
// // Declares the start of a click
// function onDocumentMouseDown(event) {
//     isClicking = true;
// }
//
// // Declares the ending of a click
// function onDocumentMouseUp(event) {
//     isClicking = false;
// }
//
// function onDocumentMouseMove(event) {
//     mouseVector.x = ((event.offsetX - arcWindow.offsetWidth) / arcWindow.offsetWidth + 1) * 2 - 1;
//     mouseVector.y = (((event.offsetY - arcWindow.offsetHeight) / arcWindow.offsetHeight) * -2) - 1;
// }
//
// // Mouse wheel regulates the zoom of the camera
// function onDocumentMouseWheel(event) {
//     if (event.deltaY < 0) {
//         arcCamera.zoom *= 1.25;
//     }
//     if (event.deltaY > 0) {
//         if (arcCamera.zoom > 0.1)
//             arcCamera.zoom /= 1.25;
//     }
//     arcCamera.updateProjectionMatrix();
// }
//
// function setData(renderer, camera, scene, interactiveBoxes, window, object, objectSize) {
//     arcCamera = camera;
//     arcScene = scene;
//     arcRenderer = renderer;
//     arcInteractiveBoxes = interactiveBoxes;
//     arcWindow = window;
//     arcObject = object;
//     arcObjectSize = objectSize;
// }
//
// function animate() {
//     requestAnimationFrame(animate);
//     //scene.updateMatrixWorld();
//     if (isClicking) {
//
//     }
// }
