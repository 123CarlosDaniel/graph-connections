import * as THREE from 'three'

function createCamera() {
    let width = window.innerWidth
    let height = window.innerHeight
    const fov = 75
    const aspect = width / height
    const near = 0.1
    const far = 1000
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 30, 25)
    return camera
}

export {createCamera}