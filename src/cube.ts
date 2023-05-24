import * as THREE from 'three'

function createCube(cubesSystem: THREE.Object3D, pos: THREE.Vector3) {
    const cubeSize = 4
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMat = new THREE.MeshPhongMaterial({color: '#8ac'})
    const cube = new THREE.Mesh(cubeGeo, cubeMat)
    cube.position.set(pos.x, pos.y, pos.z)
    cubesSystem.add(cube)
    return cube 
}

export {createCube}

