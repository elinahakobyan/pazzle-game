import Sprite = Phaser.GameObjects.Sprite
import GridCutImage from 'phaser3-rex-plugins/plugins/actions/GridCutImage'
import { GameScreen } from '../screens/GameScreen'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const game = new GameScreen(this)
    this.add.existing(game)
  }

  update() {
    // this.fpsText.update()
  }
}
