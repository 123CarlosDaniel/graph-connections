import * as THREE from 'three'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import {Font, FontLoader} from 'three/examples/jsm/loaders/FontLoader'

function createLabel(text: string, font: Font, color: string, position: THREE.Vector3) {
    const geometry = new TextGeometry(text, {
        font: font,
        size: 0.5,
        height: 0.05
    })
    const material = new THREE.MeshBasicMaterial({color: color})
    const label = new THREE.Mesh(geometry, material)
    label.position.copy(position)
    return label
}

function loadFont(url: string): Promise<Font>{
    const fontLoader = new FontLoader()
    return new Promise((res, rej) => {
        fontLoader.load(url, res, undefined, rej)
    })
}

async function drawLabelAxis(scene: THREE.Scene) {
    const font = await loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
    const dataAxis = [{
        axis: 'X',
        color: 'red',
        vector: new THREE.Vector3(2.2, 0, 0)
    },
    {
        axis: 'Y',
        color: 'green',
        vector: new THREE.Vector3(0, 2.2, 0)
    },
    {
        axis: 'Z',
        color: 'blue',
        vector: new THREE.Vector3(0, 0, 2.2)
    }]
    dataAxis.forEach(obj => {
        const label = createLabel(obj.axis, font, obj.color, obj.vector)
        scene.add(label)
    })
}

// THREEFONTS
export {drawLabelAxis}
