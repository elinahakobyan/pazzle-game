import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'



const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  width: 1024,
  height: 768,
  scale: {
    parent: "phaser-engine",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.ScaleModes.RESIZE ,
  },
  scene: [PreloadScene, MainScene],
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
