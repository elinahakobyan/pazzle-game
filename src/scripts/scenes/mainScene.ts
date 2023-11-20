import Sprite = Phaser.GameObjects.Sprite
import * as Stats from 'stats.js'
import { GameScreen } from '../screens/GameScreen'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const gameConfig = {
      themeName: 'car',
      row: 4,
      col: 4
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
