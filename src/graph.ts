import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {TransformControls} from 'three/examples/jsm/controls/TransformControls'
import * as THREEFONTS from './labels'
import GUI from 'lil-gui'
import * as CAMERA from './camera'
import * as LIGHTS from './lights'
import * as PLANE from './plane'
import * as PICKER from './pickHelper' 
import * as POINT from './point'
import * as UTILPOINTS from './pointsGraph'
import { Algorithms } from './algorithms'

export function graph() {
    let width = window.innerWidth
    let height = window.innerHeight
    // scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('black')
    // renderer
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(width, height)

    // camera
    const camera = CAMERA.createCamera()
    // gui 
    const gui = new GUI()

    // controls
    const orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.target.set(0, 5, 0)
    orbitControls.enabled = true 
    orbitControls.maxDistance = 35
    orbitControls.minDistance = 2
    orbitControls.enablePan = false 
    orbitControls.update()
 
    // state
    const algorithmState = {
        algorithm: Algorithms.NoAlgorithm
    }

    const pointState = {
        number: 10
    }
    // axes
    const axes = new THREE.AxesHelper(2)
    axes.material = new THREE.LineBasicMaterial({color: 0xff0000})
    scene.add(axes)

    THREEFONTS.drawLabelAxis(scene)

    // plane 
    const mesh = PLANE.plane()
    scene.add(mesh)
 
    // point system
    const pointSystem = new THREE.Object3D()
    scene.add(pointSystem)
    

    POINT.createRandomPoints(pointState.number, pointSystem)   

    const lineSystem = new THREE.Object3D()
    scene.add(lineSystem)
    // UTILPOINTS.LinePoints(pointSystem.children as THREE.Points[], lineSystem, Algorithms.NoAlgorithm)

    const pointHandler = gui.addFolder('points')
    pointHandler.add(pointState, 'number', 2, 20, 1).name('Number of points').onChange(() => {
        POINT.createRandomPoints(pointState.number, pointSystem)
        UTILPOINTS.LinePoints(pointSystem.children as THREE.Points[], lineSystem, algorithmState.algorithm)
    })

    // pointControls
    const controlPointSystem = new THREE.Object3D()
    scene.add(controlPointSystem)
    const pointControls = new TransformControls(camera, renderer.domElement)
    pointControls.setSize(0.5)
    
    controlPointSystem.add(pointControls)
    pointControls.setMode('translate')

    // pointControl events
    pointControls.addEventListener('mouseDown', () => {
        orbitControls.enabled = false
    })
    pointControls.addEventListener('mouseUp', () => {
        orbitControls.enabled = true
        UTILPOINTS.LinePoints(pointSystem.children as THREE.Points[], lineSystem, algorithmState.algorithm)        
    })

    // detach pointControls
    renderer.domElement.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        pointControls.detach()
    })

    // event handler to help the raycast
    const pickHelper = new PICKER.PickHelper(pointControls)

    renderer.domElement.addEventListener('mousedown', (e) => {
        const pickPosition = PICKER.getPosition(renderer, e)
        pickHelper.pick(pickPosition, pointSystem, camera)
    })

    // lights
    const light = LIGHTS.lights()
    scene.add(light)

    // gui 
    gui.domElement.style.top = '3rem' 
    gui.add(light, 'intensity', 0, 2, 0.01).name('brightness')

    // algorithm helper
    const options = {
        MST: Algorithms.MST,
        AllLines: Algorithms.NoAlgorithm,
        OnlyPoints: Algorithms.None
    }
    function updateView() {
        UTILPOINTS.LinePoints(pointSystem.children as THREE.Points[], lineSystem, algorithmState.algorithm)        
    }
    const algorithms = gui.addFolder('Algorithms')
    algorithms.add(algorithmState, 'algorithm', options).onChange(updateView).name('Algorithm')

    // responsive resizing
    window.addEventListener('resize', () => {
        width = window.innerWidth
        height = window.innerHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        renderer.render(scene, camera)
    })

    function render() {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    
    const container = document.querySelector('#app')
    container?.append(renderer.domElement)
    requestAnimationFrame(render)
    
}