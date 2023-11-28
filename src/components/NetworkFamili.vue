<template>
  <div>
    <div id="mynetwork" class="h-screen" ref="canvasElement"></div>
  </div>
</template>
<script setup>
import { DataSet, Network } from 'vis-network/standalone'
import { onMounted, ref } from 'vue'
import { tree } from '@/tree.js'

const canvasElement = ref()

console.log(tree)

onMounted(() => {
  const nodes = new DataSet([])

  // create an array with edges
  const edges = new DataSet([])

  tree.Individuals.forEach((element) => {
    nodes.add({
      id: element.Id,
      label: element.Fullname,
      shape: 'image',
      image: element.Sex === 'F' ? '/2.jpg' : '/1.jpg',
      level: 0
    })
  })

  window.nodes = nodes

  tree.Relations.forEach((relation, index) => {
    nodes.update([
      {
        id: index.Husband,
        level: index
      },
      {
        id: relation.Wife,
        level: index
      }
    ])

    if (Array.isArray(relation.Children)) {
      relation.Children.forEach((childId, childrenIndex) => {
        nodes.update({
          id: childId,
          level: index + 1
        })

        edges.add({ id: `${relation.Id}-${childrenIndex}-H`, from: relation.Husband, to: childId })
        edges.add({ id: `${relation.Id}-${childrenIndex}-W`, from: relation.Wife, to: childId })
      })
    }
    // else {
    //   edges.add({ id: `${relation.Id}-H`, from: relation.Husband, to: relation.Children })
    //   edges.add({ id: `${relation.Id}-W`, from: relation.Wife, to: relation.Children })
    // }
  })

  // create a network
  const container = document.getElementById('mynetwork')
  const data = {
    nodes: nodes,
    edges: edges
  }
  let options = {
    physics: {
      enabled: false
    },
    interaction: {
      dragNodes: false
    },
    layout: {
      hierarchical: {
        direction: 'UD'
      }
    },
    edges: {
      color: '#000'
    }
  }

  const network = new Network(container, data, options)

  network.on('beforeDrawing', function (ctx) {
    ctx.strokeStyle = '#ff3333'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, 0)

    for (const Node1 of nodes.get()) {
      var Pos1 = network.getPositions([Node1.id])[Node1.id]

      for (const Node2 of network.getConnectedNodes(Node1.id, 'to')) {
        var Pos2 = network.getPositions([Node2])[Node2]

        ctx.moveTo(Pos1.x, Pos1.y)
        ctx.lineTo(Pos1.x, Pos1.y + 50)
        ctx.lineTo(Pos2.x, Pos1.y + 50)
        ctx.lineTo(Pos2.x, Pos2.y)
      }
    }

    ctx.moveTo(0, 0)
    ctx.closePath()
    ctx.stroke()
  })
})
</script>
