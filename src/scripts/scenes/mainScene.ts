import Sprite = Phaser.GameObjects.Sprite
import * as Stats from 'stats.js'
import { GameScreen } from '../screens/GameScreen'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  private resize(): void {
    console.log('has')

    // var canvas = this.game.canvas,
    //   width = window.innerWidth,
    //   height = window.innerHeight
    // var wratio = width / height,
    //   ratio = canvas.width / canvas.height
    // if (wratio < ratio) {
    //   canvas.style.width = width + 'px'
    //   canvas.style.height = width / ratio + 'px'
    // } else {
    //   canvas.style.width = height * ratio + 'px'
    //   canvas.style.height = height + 'px'
    // }
  }

  create() {
    window.addEventListener('resize', this.resize)
    this.resize()
    const gameConfig = {
      themeName: 'car',
      row: 2,
      col: 2
    }
    const game = new GameScreen(this, gameConfig)
    this.add.existing(game)
    this.initStatJS()
  }

  private initStatJS() {
    const stats = new Stats()
    stats.showPanel(0)
    const update = () => {
      stats.begin()
      stats.end()
      window.requestAnimationFrame(update)
    }
    update()
    document.body.appendChild(stats.dom)
  }

  update() {
    // this.fpsText.update()
  }
}
