import Sprite = Phaser.GameObjects.Sprite
import * as Stats from 'stats.js'
import { GameScreen } from '../screens/GameScreen'
import { ForegroundScreen } from '../screens/ForegroundScreen'
import { HeaderContainer } from '../../Components/HeaderContainer'
import { MenuScreen } from '../screens/MenuScreen'

export default class MainScene extends Phaser.Scene {
  private gameScreen: GameScreen
  private foregroundScreen: ForegroundScreen
  private header: HeaderContainer
  private menuScreen: MenuScreen

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const gameConfig = {
      themeName: 'car',
      row: 2,
      col: 2
    }

    const foregroundScreen = new ForegroundScreen(this)
    foregroundScreen.on('onForegroundViewComplete', () => {
      this.destroyForegroundView()
      this.initHeader()
      this.initMenuScreen()
    })
    this.add.existing((this.foregroundScreen = foregroundScreen))
    // this.gameScreen = new GameScreen(this, gameConfig)
    // this.add.existing(this.gameScreen)
    this.initStatJS()
  }

  private initHeader(): void {
    const header = new HeaderContainer(this)
    header.setPosition(header.width / 2, header.height / 2)
    this.add.existing((this.header = header))
  }

  private destroyForegroundView(): void {
    this.foregroundScreen.destroy()
    this.foregroundScreen.visible = false
  }
  private initMenuScreen(): void {
    const menuScreen = new MenuScreen(this)
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
