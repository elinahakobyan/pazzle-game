import 'phaser'
import CutJigsawImagePlugin from 'phaser3-rex-plugins/plugins/cutjigsawimage-plugin'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
const width = window.innerWidth
const height = window.innerHeight
console.log(width, height)
const config = {
  type: Phaser.AUTO,
  backgroundColor: '#e7d0be',
  width: 1920,
  height: 1080,
  scale: {
    parent: 'phaser-engine',
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
