import Sprite = Phaser.GameObjects.Sprite
import * as Stats from 'stats.js'
import { GameScreen } from '../screens/GameScreen'
import { ForegroundScreen } from '../screens/ForegroundScreen'
import { HeaderContainer } from '../../Components/HeaderContainer'
import { MenuScreen } from '../screens/MenuScreen'
import { menuConfig } from '../../configs/menuConfig'

export default class MainScene extends Phaser.Scene {
  private gameScreen: GameScreen
  private foregroundScreen: ForegroundScreen
  private header: HeaderContainer
  private menuScreen: MenuScreen

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.initMenuScreen()
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
    const menuScreen = new MenuScreen(this, menuConfig)
    this.add.existing((this.menuScreen = menuScreen))
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
