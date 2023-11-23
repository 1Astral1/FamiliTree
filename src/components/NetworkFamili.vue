<template>
  <div>
    <div id="mynetwork" class="h-screen" ref="canvasElement"></div>
  </div>
</template>
<script setup>
import { DataSet, Network } from 'vis-network/standalone'
import { onMounted, ref } from 'vue'

const canvasElement = ref()

onMounted(() => {
  const nodes = new DataSet([
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' }
  ])

  // create an array with edges
  const edges = new DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 4, to: 4 },
    { from: 3, to: 5 }
  ])

  // create a network
  const container = document.getElementById('mynetwork')
  const data = {
    nodes: nodes,
    edges: edges
  }
  var options = {
    layout: {
      hierarchical: {
        direction: 'UD'
      }
    }
  }
  const network = new Network(container, data, options)
})
</script>
