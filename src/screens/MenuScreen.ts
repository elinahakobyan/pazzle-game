import Container = Phaser.GameObjects.Container
import { HeaderContainer } from '../Components/HeaderContainer'
import { MenuConfig } from '../../typings/types'
import { menuConfig } from '../configs/menuConfig'
import { CategoryComponent } from '../Components/CategoryComponent'
import { NextButton } from '../buttons/NextButton'
import { GameStates } from '../enums/GameStates'
import { SubcategoriesView } from '../views/SubcategoriesView'
import { CategoriesView } from '../views/CategoriesView'
import { LevelsView } from '../views/LevelsView'
import { LevelComponent } from '../Components/LevelComponent'

export class MenuScreen extends Container {
  private header: HeaderContainer
  private categories: CategoryComponent[] = []
  private categoriesView: CategoriesView
  private activeItem: CategoryComponent | null
  public nextBtn: NextButton
  private whiteScreen: Phaser.GameObjects.Sprite
  private subcategoriesView: SubcategoriesView
  private currentState: GameStates
  private levelsView: LevelsView
  private playBtn: NextButton

  constructor(scene: Phaser.Scene, menuConfig: MenuConfig) {
    super(scene)
    // this.setSize(1920, 1080)
    this.initialise()
  }

  private initialise(): void {
    const gameConfig = {
      themeName: 'car',
      row: 2,
      col: 2
    }
    this.initHeader()
    this.initCategories()
    this.initNextBtn()
    this.initSubcategoryView()
    this.initLevelsView()
    this.initPlayBtn()
    this.crateWhiteScreen()
    this.attachListeners()
    // this.gameScreen = new GameScreen(this, gameConfig)
    // this.add.existing(this.gameScreen)
  }

  private attachListeners(): void {
    this.setSize(1920, 1080)
    this.setInteractive(
      new Phaser.Geom.Rectangle(this.width / 2, this.height / 2, this.width, this.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.on('pointerup', () => {
      console.log('hass')
      console.log(this.getActiveItem())
      if (this.getActiveItem()) {
        this.nextBtn.disable()
        this.playBtn.visible && this.playBtn.disable()
        this.getActiveItem().deactivate()
        // this.categoriesView.activeItem.deactivate()
      }
    })
  }

  private initLevelsView(): void {
    this.levelsView = new LevelsView(this.scene, menuConfig.levels)
    // this.currentState = GameStates.LevelsState
    const w = 1920
    const h = 1080 - this.header.height + 20
    this.levelsView.setPosition(0, this.header.y + this.header.height / 2 - 20)
    this.levelsView.setSize(w, h)
    this.levelsView.setVisible(false)
    this.add(this.levelsView)
    this.levelsView.on('itemActivated', () => {
      this.playBtn.enable()
    })
    this.levelsView.on('itemDeactivated', () => {
      this.playBtn.disable()
    })
  }
  private initSubcategoryView(): void {
    this.subcategoriesView = new SubcategoriesView(this.scene)
    this.subcategoriesView.setPosition(0, this.header.y + this.header.height / 2 - 20)
    this.subcategoriesView.setSize(1920, 920)
    this.subcategoriesView.setVisible(false)
    this.add(this.subcategoriesView)
    this.subcategoriesView.on('itemActivated', () => {
      this.nextBtn.enable()
    })
    this.subcategoriesView.on('itemDeactivated', () => {
      this.nextBtn.disable()
    })
  }

  private initCategories(): void {
    this.header.updateTitleVisibility(true, 'Categories')
    this.header.hideButtons()
    this.currentState = GameStates.CategoriesState
    console.log('GameStates.CategoriesState')
    const { categories } = menuConfig
    this.categoriesView = new CategoriesView(this.scene, categories)
    const w = 1920
    const h = 1080 - this.header.height + 20
    this.categoriesView.setPosition(0, this.header.y + this.header.height / 2 - 20)
    this.categoriesView.setSize(w, h)
    this.add(this.categoriesView)
    this.categoriesView.on('itemActivated', () => {
      this.nextBtn.enable()
    })
    this.categoriesView.on('itemDeactivated', () => {
      this.nextBtn.disable()
    })
  }

  private initNextBtn(): void {
    const btn = new NextButton(this.scene, { text: 'NEXT', frame: 'next' })
    btn.setPosition(1920 / 2, 1080 / 2 + 320)
    btn.disable()
    btn.on('pointerdown', () => {
      btn.scaleDownTween()
    })
    btn.on('pointerup', () => {
      btn.scaleUpTween()
    })
    btn.on('btnClicked', () => {
      this.onNextBtnClick(this.getActiveItem())
    })
    this.add((this.nextBtn = btn))
  }
  private initPlayBtn(): void {
    const btn = new NextButton(this.scene, { text: 'PLAY', frame: 'play' })
    btn.setPosition(1920 / 2, 1080 / 2 + 320)
    btn.disable()
    btn.on('pointerdown', () => {
      btn.scaleDownTween()
    })
    btn.on('pointerup', () => {
      btn.scaleUpTween()
    })
    btn.on('btnClicked', () => {
      this.onPlayBtnClicked()
    })
    this.add((this.playBtn = btn))
    this.playBtn.setVisible(false)
  }

  private getActiveItem(): CategoryComponent | LevelComponent {
    let activeItem
    switch (this.currentState) {
      case GameStates.CategoriesState: {
        activeItem = this.categoriesView.activeItem
        console.log(activeItem)
        break
      }
      case GameStates.SubcategoryState: {
        activeItem = this.subcategoriesView.activeItem
        break
      }
      case GameStates.LevelsState: {
        activeItem = this.levelsView.activeItem
        break
      }
    }
    return activeItem
  }

  private onNextBtnClick(activeItem: CategoryComponent | LevelComponent | null): void {
    console.log(activeItem)
    const whiteScreen = this.showWhiteScreenTween()
    whiteScreen.on('complete', () => {
      this.showNextView(activeItem)
    })
  }
  private onPlayBtnClicked(): void {
    const whiteScreen = this.showWhiteScreenTween()
    whiteScreen.on('complete', () => {
      // this.initGameScreen()
    })
  }

  private showNextView(activeItem: CategoryComponent | LevelComponent | null): void {
    switch (this.currentState) {
      case GameStates.CategoriesState: {
        console.log('GameStates.SubcategoryState')
        this.showSubcategoriesView(activeItem)
        break
      }
      case GameStates.SubcategoryState: {
        console.log('GameStates.LevelState')
        this.showLevelsView()
        break
      }
    }
  }

  private showSubcategoriesView(activeItem): void {
    this.categoriesView.setVisible(false)
    this.currentState = GameStates.SubcategoryState
    this.header.updateTitleVisibility(true, activeItem?.categoryConfig?.name)
    this.header.showButtons()
    this.nextBtn.disable()
    this.hideWhiteScreen()
    this.subcategoriesView.setVisible(true)
    this.subcategoriesView.setContentConfig(activeItem?.categoryConfig?.themes)
  }

  private showLevelsView(): void {
    this.subcategoriesView.setVisible(false)
    this.currentState = GameStates.LevelsState
    this.hideWhiteScreen()
    this.header.updateTitleVisibility(true, 'Levels')
    this.nextBtn.disable()
    this.nextBtn.setVisible(false)
    this.playBtn.setVisible(true)
    this.levelsView.setVisible(true)
  }

  private crateWhiteScreen(): void {
    const whiteGr = this.scene.make.graphics({ x: 0, y: 0 }, false)
    whiteGr.fillStyle(0xffffff)
    whiteGr.fillRect(0, 0, 1920, 1080)
    whiteGr.generateTexture('whiteScreen', 1920, 1080)
    whiteGr.destroy()

    this.whiteScreen = this.scene.add.sprite(1920 / 2, 1080 / 2, 'whiteScreen')
    this.whiteScreen.setAlpha(0)
    this.whiteScreen.setVisible(false)
    this.add(this.whiteScreen)
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
  private hideWhiteScreen(): Phaser.Tweens.Tween {
    return this.scene.add.tween({
      targets: this.whiteScreen,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.whiteScreen.setVisible(false)
      }
    })
  }

  private hideSubcategoriesView(): void {
    const tw = this.showWhiteScreenTween()
    tw.on('complete', () => {
      this.subcategoriesView.setVisible(false)
      this.showCategoriesView()
    })
  }
  private showCategoriesView(): void {
    this.hideWhiteScreen()
    this.header.updateTitleVisibility(true, 'Categories')
    this.header.hideButtons()
    this.currentState = GameStates.CategoriesState
    this.categoriesView.setVisible(true)
    this.getActiveItem() ? this.nextBtn.enable() : this.nextBtn.disable()

    // this.header.updateTitleVisibility(true, this.categoriesView.activeItem)
  }

  private handleBackBtnClicked(): void {
    switch (this.currentState) {
      case GameStates.CategoriesState: {
        console.log('CategoriesState')
        break
      }
      case GameStates.SubcategoryState: {
        console.log('SubcategoryState')
        this.hideSubcategoriesView()
        break
      }
      case GameStates.LevelsState: {
        console.log('LevelsState')
        this.hideLevelsView()
        break
      }
      case GameStates.GameState: {
        break
      }
    }
    console.log('handleBackBtnClicked')
  }

  private hideLevelsView(): void {
    const tw = this.showWhiteScreenTween()
    tw.on('complete', () => {
      this.levelsView.setVisible(false)
      this.playBtn.setVisible(false)
      this.showSubcategoriesView(this.categoriesView.activeItem)
      this.getActiveItem() ? this.nextBtn.enable() : this.nextBtn.disable()
      this.nextBtn.setVisible(true)
    })
  }

  private initHeader(): void {
    const header = new HeaderContainer(this.scene)
    header.setPosition(header.width / 2, header.height / 2)
    header.on('onBackBtnClick', this.handleBackBtnClicked, this)
    this.add((this.header = header))
  }
}
