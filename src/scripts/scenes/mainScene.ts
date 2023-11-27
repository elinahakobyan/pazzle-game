import Sprite = Phaser.GameObjects.Sprite
import * as Stats from 'stats.js'
import { GameScreen } from '../screens/GameScreen'

export default class MainScene extends Phaser.Scene {
  private gameScreen: GameScreen

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const gameConfig = {
      themeName: 'car',
      row: 2,
      col: 2
    }
    this.gameScreen = new GameScreen(this, gameConfig)
    this.add.existing(this.gameScreen)
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
