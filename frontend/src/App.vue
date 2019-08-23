<template>
  <div id="app">
    <Navbar />
    <div class="container grid-container" >
      <playBtn @click.native="requestSound(btn.file)" v-for="(btn, index) in sounds.clips" :key="index"  :playing="playing == btn.file" :title="btn.name"/>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

import playBtn from './components/playBtn'
import Navbar from './components/Navbar'


export default {
  name: 'app',
  components: {
    playBtn,
    Navbar
  },
  data() {
    return {
      socket: io('localhost:3000'),
      playing: '',
      sounds: { clips: [] }
    }
  },
  mounted() {
    this.socket.on('playSound', data => {
      this.playSound(data)
    })
    fetch('/assets/sounds.json')
      .then(data => data.json())
      .then(data => this.sounds = data)
  },
  methods: {
    requestSound(data) {
      this.socket.emit('playSound', data)
    },
    playSound(data) {
      if (this.playing == '') {
        this.playing = data
        const audio = new Audio('./assets/sounds/' + data)
        audio.play();
        audio.onended = () => {
          this.playing = ''
        }
      }
    }
  }
}
</script>

<style>
  .grid-container {
    margin-top: 20px;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
  }
</style>
