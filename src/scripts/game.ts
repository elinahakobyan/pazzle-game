import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import CutJigsawImagePlugin from 'phaser3-rex-plugins/plugins/cutjigsawimage-plugin'
const width = window.innerWidth
const height = window.innerHeight
const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  width: width,
  height: height,
  scale: {
    parent: 'phaser-engine',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.ScaleModes.FIT
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

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
