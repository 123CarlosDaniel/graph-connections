import {BufferAttribute, BufferGeometry, Line, LineBasicMaterial} from 'three'
import { minSpanningTree, Algorithms } from './algorithms'


function LinePoints(points: THREE.Points[], lineSystem: THREE.Object3D, algorithm: number) {
    lineSystem.clear()
    if (algorithm == Algorithms.None) return
    const materialLine = new LineBasicMaterial({color: 0x00ff00})

    const arrPos = getPositionArray(points)
    // reemplazar aqui con el algoritmo
    let arrLines: number[][]

    switch (algorithm) {
        case Algorithms.NoAlgorithm :{
            arrLines = getInitialLines(arrPos)    //[x1,x2,x3,y1,y2,y3][]
            break
        }
        case Algorithms.MST: {
            arrLines = minSpanningTree(arrPos)
            break
        }
        default: arrLines = getInitialLines(arrPos)
    }

    arrLines.forEach((p) => {
        const line = createLine(p, materialLine)
        lineSystem.add(line)            
    })

}

function createLine(p: number[], materialLine: LineBasicMaterial) {
    const geometryLine = new BufferGeometry()
    geometryLine.setAttribute('position', new BufferAttribute(new Float32Array(p), 3))
    return new Line(geometryLine, materialLine)
}

function getInitialLines(points: number[][]) {
    const arrLines = []
    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            arrLines.push([...points[i], ...points[j]])   
        }
    }    
    return arrLines
}

function getPositionArray(points: THREE.Points[]) {
    const arrPos = []
    for (let i = 0; i < points.length; i++) {
        arrPos.push(Object.values(points[i].position).map((v: number) => {
            return parseFloat(v.toFixed(2))
        }) )
    }
    return arrPos
}



export {LinePoints}