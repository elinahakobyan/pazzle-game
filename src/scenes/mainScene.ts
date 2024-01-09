import Sprite = Phaser.GameObjects.Sprite
import * as Stats from 'stats.js'
import { PuzzleScreen } from '../screens/PuzzleScreen'
import { ForegroundScreen } from '../screens/ForegroundScreen'
import { HeaderContainer } from '../Components/HeaderContainer'
import { MenuScreen } from '../screens/MenuScreen'
import { menuConfig } from '../configs/menuConfig'
import { GameScreen } from '../screens/GameScreen'

export default class MainScene extends Phaser.Scene {
  private puzzleScreen: PuzzleScreen
  private foregroundScreen: ForegroundScreen
  private header: HeaderContainer
  private menuScreen: MenuScreen
  private gameScreen: GameScreen

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    // this.initMenuScreen()
    this.initGameScreen()
    // const foregroundScreen = new ForegroundScreen(this)
    // foregroundScreen.on('onForegroundViewComplete', () => {
    //   this.destroyForegroundView()
    // })
    // this.add.existing((this.foregroundScreen = foregroundScreen))
    this.initStatJS()
  }

  private destroyForegroundView(): void {
    this.foregroundScreen.destroy()
    this.foregroundScreen.visible = false
  }
  private initMenuScreen(): void {
    // const menuScreen = new MenuScreen(this, menuConfig)
    // menuScreen.on('playBtnClicked', this.initGameScreen, this)
    // this.add.existing((this.menuScreen = menuScreen))
  }

  private initGameScreen(): void {
    this.gameScreen = new GameScreen(this)
    this.add.existing(this.gameScreen)
  }

  private onBackBtnClicked(): void {
    //
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
