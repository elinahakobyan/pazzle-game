import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import CutJigsawImagePlugin from 'phaser3-rex-plugins/plugins/cutjigsawimage-plugin'

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  width: 1024,
  height: 768,
  scale: {
    parent: 'phaser-engine',
    autoCenter: Phaser.Scale.FIT,
    mode: Phaser.Scale.ScaleModes.RESIZE
  },
  scene: [PreloadScene, MainScene],
  plugins: {
    global: [
      {
        key: 'rexCutJigsawImage',
        plugin: CutJigsawImagePlugin,
        start: true
      }
      // ...
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
