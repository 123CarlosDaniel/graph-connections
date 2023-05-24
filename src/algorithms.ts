// arrPos : [x1,x2,x3][]
// return : [x1,x2,x3,y1,y2,y3][] (array of lines represented with 2 vertices)
function minSpanningTree(arrPos: number[][]) {
    let len = arrPos.length
    const edges = calculateEdges(arrPos)
    const resultEdges = kruskall(edges, len)
    const res: number[][] = []
    resultEdges.forEach(edge => {
        const from = arrPos[edge[0]]
        const to = arrPos[edge[1]]
        res.push([...from, ...to])
    })
    return res
}

/**
 * 
 * @param arrPos Each element represent a point [x,y,z] 
 * @returns Each element is a edge [start point index , end  point index , distance]
 */
function calculateEdges(arrPos: number[][]) {
    const edges: number[][] = []
    let len = arrPos.length
    for (let i = 0; i < len; i++) {
        const [x, y, z] = arrPos[i]
        for (let j = i + 1; j < len; j++) {
            const [x2, y2, z2] = arrPos[j]
            const dist = Math.pow(x - x2,2) + Math.pow(y - y2, 2) + Math.pow(z - z2, 2)
            edges.push([i, j, dist])
        }
    }
    return edges
}

function kruskall(edges: number[][], n: number) {
    const res: number[][] = []
    const parent = new Array(n).fill(-1)
    const rank = new Array(n).fill(0)
    edges.sort((a, b) => a[2] - b[2])

    const find = (n: number) => {
        if (parent[n] == -1) {
            return n
        }
        parent[n] = find(parent[n])
        return parent[n]
    }

    const union = (from: number, to: number) => {
        if (rank[from] < rank[to]) {
            parent[from] = to
        }
        else if (rank[from] > rank[to]) {
            parent[to] = from
        }
        else {
            parent[from] = to
            rank[to] += 1
        }
    }

    n -= 1
    for (let edge of edges) {
        let f = find(edge[0])
        let s = find(edge[1])
        if (f == s) continue
        union(f, s)
        res.push(edge)
        n--
        if (n == 0) {
            break
        } 
    }
    return res
}

function dijkstra(edges: number[][], n: number, start: number, end: number) {
    const res: number[][] = []
    const adj: number[][][] = new Array(n).fill([])
    for (let e of edges) {
        adj[e[0]].push([e[1], e[2]])
        adj[e[1]].push([e[0], e[2]])
    }
    const values = new Array(n).fill(Infinity)
    const processed = new Array(n).fill(false)
    values[start] = 0
    const selectMinVertex = () => {
        let min = Infinity
        let vertex = start
        for (let i = 0; i < n; i++) {
            if (!processed[i] && values[i] < min) {
                min = values[i]
                vertex = i
            }
        }
        return vertex
    }
    for (let i = 0; i < n - 1; i++) {
        let u = selectMinVertex()
        processed[u] = true
        for (let n of adj[u]) {
            if (!processed[n[0]] && (values[u] + n[1]) < values[n[0]]) {
                values[n[1]] = values[u] + n[1]
                res.push([u, n[0]])
            }
        }
    }
    return res
}

enum Algorithms {
    NoAlgorithm = 10,
    MST,
    Dijkstra,
    None
}

export {minSpanningTree, Algorithms}