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
    { id: 1, label: 'diamonds1', shape: 'image', image: './src/assets/1.jpg' },
    { id: 2, label: 'diamonds2', shape: 'image', image: './src/assets/2.jpg' },
    { id: 3, label: 'diamonds3', shape: 'image', image: './src/assets/1.jpg' },
    { id: 4, label: 'diamonds4', shape: 'image', image: './src/assets/1.jpg' },
    { id: 5, label: 'diamonds5', shape: 'image', image: './src/assets/1.jpg' }
  ])

  // create an array with edges
  var edges = [
    { from: 1, to: 2 },
    { from: 2, to: 1 },
    { from: 2, to: 3 },
    { from: 2, to: 4 }
  ]

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
})
</script>
