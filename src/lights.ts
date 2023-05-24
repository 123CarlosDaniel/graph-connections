import * as THREE from 'three';
function lights() {
    const color = 0xffffff
    const intensity = 0.2
    const light = new THREE.PointLight(color, intensity)
    light.position.set(0, 10, 0)
    return light
}

export {lights}