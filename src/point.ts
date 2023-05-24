import * as THREE from 'three'

function createPoint(positionCords: number[]) {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3))
    const material = new THREE.PointsMaterial({color: 0xff0000, size: 0.4})
    const point = new THREE.Points(geometry, material)
    point.position.set(positionCords[0], positionCords[1], positionCords[2])
    return point
}

function randomSign() {
    return Math.random() > 0.5 ? 1 : -1
}

function randomVal(n: number) {
    return randomSign() * (Math.random() * n)
}

function generateRandomVector(i: number) {
    const randomP = [randomVal(i), Math.abs(randomVal(i)), randomVal(i)]
    return randomP
}

function createRandomPoints(n: number, pointSystem: THREE.Object3D) {
    // remove child points
    pointSystem.clear()

    const arrPos = Array.from({length: n}, () => generateRandomVector(15) )
    arrPos.forEach(p => {
        pointSystem.add(createPoint(p))
    })
}

export {createRandomPoints}