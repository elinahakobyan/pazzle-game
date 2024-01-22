import Container = Phaser.GameObjects.Container
import { HeaderContainer } from '../Components/HeaderContainer'
import { MenuScreen } from './MenuScreen'
import { menuConfig } from '../configs/menuConfig'
import { GameStates, MenuStates } from '../enums/MenuStates'
import { PuzzleScreen } from './PuzzleScreen'
import Phaser from 'phaser'
import { GameConfig } from '../../typings/types'

export class GameScreen extends Container {
  private header: HeaderContainer
  private menuScreen: MenuScreen
  public currentState: GameStates
  private puzzleScreen: PuzzleScreen
  private whiteScreen: Phaser.GameObjects.Sprite
  constructor(scene) {
    super(scene)
    this.initialize()
  }

  private initialize(): void {
    const gameConfig = {
      category: {
        name: 'Animals'
      },
      subcategory: {
        name: 'Anim3',
        frame: 'train.jpg'
      },
      level: {
        name: 'Easy',
        level: '2:2'
      }
    }
    // this.initPuzzleScreen(gameConfig)
    this.initHeader()
    this.initMenuScreen()
    this.crateWhiteScreen()
  }

  private initHeader(): void {
    const header = new HeaderContainer(this.scene)
    header.setPosition(header.width / 2, header.height / 2)
    header.on('onBackBtnClick', this.handleBackBtnClick, this)
    header.on('onHintBtnClick', this.handleHintBtnClick, this)
    this.add((this.header = header))
  }

  private initMenuScreen(): void {
    this.menuScreen = new MenuScreen(this.scene, this.header, menuConfig)
    this.currentState = GameStates.MenuState
    // this.menuScreen.setPosition(0, this.header.height - 20)
    this.menuScreen.on('playBtnClicked', this.initPuzzleScreen, this)
    this.add(this.menuScreen)
    this.bringToTop(this.header)

    // const gr = this.scene.add.graphics()
    // gr.fillStyle(0xfff000, 0.2)
    // gr.fillRect(this.menuScreen.x, this.menuScreen.y, this.menuScreen.width, this.menuScreen.height)
    // this.add(gr)
  }

  private initPuzzleScreen(gameConfig): void {
    console.log(gameConfig)
    if (!this.puzzleScreen) {
      console.log(gameConfig)
      this.puzzleScreen = new PuzzleScreen(this.scene, this.header, gameConfig)
      this.currentState = GameStates.GameState
      this.add(this.puzzleScreen)
    } else {
      this.puzzleScreen.destroy()
      this.puzzleScreen.setVisible(false)
      this.puzzleScreen = new PuzzleScreen(this.scene, this.header, gameConfig)
      this.currentState = GameStates.GameState
      this.add(this.puzzleScreen)
    }
    this.bringToTop(this.whiteScreen)
  }

  private handleBackBtnClick(): void {
    console.log(this.currentState)
    if (this.currentState === GameStates.MenuState) {
      switch (this.menuScreen.getCurrentState()) {
        case MenuStates.CategoriesState: {
          console.log('CategoriesState')
          break
        }
        case MenuStates.SubcategoryState: {
          console.log('SubcategoryState')
          this.menuScreen.hideSubcategoriesView()
          break
        }
        case MenuStates.LevelsState: {
          console.log('LevelsState')
          this.menuScreen.hideLevelsView(true)
          break
        }
      }
    } else {
      this.currentState = GameStates.MenuState
      this.hidePuzzleView()
    }
    console.log('handleBackBtnClicked')
  }

  private handleHintBtnClick(): void {
    this.puzzleScreen.showOrHideHint()
  }

  public hidePuzzleView(): void {
    const tw = this.showWhiteScreenTween()
    tw.on('complete', () => {
      this.header.hideHint()
      this.puzzleScreen.setVisible(false)
      this.menuScreen.showLevelsView(this.whiteScreen)
    })
  }

  public hideWhiteScreen(): Phaser.Tweens.Tween {
    return this.scene.add.tween({
      targets: this.whiteScreen,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.whiteScreen.setVisible(false)
      }
    })
  }

  private showWhiteScreenTween(): Phaser.Tweens.Tween {
    return this.scene.add.tween({
      targets: this.whiteScreen,
      alpha: 1,
      duration: 500,
      onStart: () => {
        this.whiteScreen.setVisible(true)
      }
    })
  }

  private crateWhiteScreen(): void {
    this.whiteScreen = this.scene.add.sprite(1920 / 2, 1080 / 2, 'whiteScreen')
    this.whiteScreen.setAlpha(0)
    this.whiteScreen.setVisible(false)
    this.add(this.whiteScreen)
  }
}
