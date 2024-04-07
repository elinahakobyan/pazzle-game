import 'phaser'
import CutJigsawImagePlugin from 'phaser3-rex-plugins/plugins/cutjigsawimage-plugin'
import '../css/main.css'
import MainScene from '../scenes/mainScene'
import PreloadScene from '../scenes/preloadScene'
const width = window.innerWidth
const height = window.innerHeight

const ratio = window.innerWidth < 600 ? 2 : 1

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  width: 1920,
  height: 1080,
  scale: {
    parent: 'phaser-engine',
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: window.innerWidth * ratio,
    // height: window.innerHeight * ratio
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [PreloadScene, MainScene],

  plugins: {
    global: [
      {
        key: 'rexCutJigsawImage',
        plugin: CutJigsawImagePlugin,
        start: true
      }
    ]
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

const game = new Phaser.Game(config)
