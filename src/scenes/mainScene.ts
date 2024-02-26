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

  public resize(e) {
    if (!this.gameScreen) return
    console.log(e)
    const w = window.innerWidth
    const h = window.innerHeight
    const { width, height } = e
    const scale = Math.max(w / width, h / height)
    console.log(scale)
    this.gameScreen.setScale(scale)
    this.gameScreen.setPosition(w / 2, h / 2)
  }

  create() {
    // window.addEventListener('resize', e => {
    //   if (!this.gameScreen) return
    //   const w = window.innerWidth
    //   const h = window.innerHeight
    //   // const { width, height } = e
    //   const scale = Math.min(w / 1920, h / 1080)
    //   console.log(scale)
    //   this.gameScreen.setScale(scale)
    //   // this.gameScreen.setPosition(w / 2, h / 2)
    // })
    this.scale.on('resize', this.resize, this)
    this.scale.on('orientationchange', this.checkOrientation, this)
    // this.initMenuScreen()
    this.initGameScreen()
    // const foregroundScreen = new ForegroundScreen(this)
    // foregroundScreen.on('onForegroundViewComplete', () => {
    //   this.destroyForegroundView()
    // })
    // this.add.existing((this.foregroundScreen = foregroundScreen))
    // this.initStatJS()
  }

  private checkOrientation(orientation) {
    if (orientation === Phaser.Scale.PORTRAIT) {
      console.log('Please set your\nphone to landscape')
      // this.ship.alpha = 0.2
      // this.text.setVisible(true)
    } else if (orientation === Phaser.Scale.LANDSCAPE) {
      // this.ship.alpha = 1
      // this.text.setVisible(false)
    }
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
    const w = window.innerWidth
    const h = window.innerHeight
    console.log(w, h)

    this.gameScreen = new GameScreen(this)
    this.gameScreen.setPosition(w / 2, h / 2)
    this.add.existing(this.gameScreen)

    const gr = this.add.graphics()
    gr.fillStyle(0x000fff, 0.5)
    gr.fillCircle(0, 0, 20)
    this.gameScreen.add(gr)

    console.log(this.gameScreen.width, this.gameScreen.height)
    // this.gameScreen.setPosition(w / 2, h / 2)
    // this.gameScreen.setPosition(w / 2 - this.gameScreen.width / 2, h / 2 - this.gameScreen.height / 2)
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
