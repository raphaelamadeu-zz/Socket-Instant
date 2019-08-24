<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <div class="col-4 volume">
        <label for="volume">Volume</label> <br />
        <input type="range" name="volume" class="custom-range" min="0" max="10" v-model="volume">
      </div>
    </div>
    <div class="container grid-container">
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
      socket: io('https://jpj-instant.herokuapp.com/'),
      playing: '',
      sounds: { clips: [] },
      volume: 0.5
    }
  },
  mounted() {
    this.socket.on('playSound', data => {
      this.playSound(data);
    })
    fetch('./assets/sounds.json')
      .then(data => data.json())
      .then(data => this.sounds = data)
  },
  watch: {
    volume: function() {
      console.log(this.volume)
    }
  },
  methods: {
    requestSound(data) {
      this.socket.emit('playSound', data);
      console.log(data)
    },
    playSound(data) {
      if (this.playing == '') {
        this.playing = data;
        const audio = new Audio('./assets/sounds/' + data);
        audio.volume = (this.volume / 10);
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
  label {
    margin-top: 20px;
  }
  .volume {
    background-color: lightsteelblue;
    padding-bottom: 20px;
    border-radius: 10px;
    margin-top: 20px;
  }
</style>
