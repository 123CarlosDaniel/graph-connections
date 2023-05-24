import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import * as THREE from 'three'

class PickHelper {
    raycaster: THREE.Raycaster
    pickedObject: THREE.Object3D | null
    pointControl: TransformControls
    constructor(transformCtrl: TransformControls) {
        this.raycaster = new THREE.Raycaster()
        this.pickedObject = null
        this.pointControl = transformCtrl
    }
    pick(normalizedPosition: any, scene: THREE.Object3D, camera: THREE.Camera) {
        this.raycaster.setFromCamera(normalizedPosition, camera)
        const intersectedObjects = this.raycaster.intersectObjects(scene.children)
        if (intersectedObjects.length) { 
            this.pickedObject = intersectedObjects[0].object
            
            this.pointControl.attach(this.pickedObject)

            this.pointControl.position.set(0, 0, 0)
        } 
    }
}


function getPosition(renderer: THREE.WebGLRenderer, e: MouseEvent) {
    const pickPosition = {x: 0, y: 0}
    const rect = renderer.domElement.getBoundingClientRect()
    const pos = {
        x: (e.clientX - rect.left) * window.innerWidth / rect.width,
        y: (e.clientY - rect.top) * window.innerHeight / rect.height
    }
    pickPosition.x = (pos.x / window.innerWidth) * 2 - 1
    pickPosition.y = (pos.y / window.innerHeight) * -2 + 1
    return pickPosition
}


export {PickHelper, getPosition}