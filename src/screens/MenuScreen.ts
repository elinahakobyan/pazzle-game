import Container = Phaser.GameObjects.Container
import { MenuConfig } from '../../typings/types'
import { CategoryComponent } from '../Components/CategoryComponent'
import { HeaderContainer } from '../Components/HeaderContainer'
import { LevelComponent } from '../Components/LevelComponent'
import { NextButton } from '../buttons/NextButton'
import { menuConfig } from '../configs/menuConfig'
import { MenuStates } from '../enums/MenuStates'
import { CategoriesView } from '../views/CategoriesView'
import { LevelsView } from '../views/LevelsView'
import { SubcategoriesView } from '../views/SubcategoriesView'
import { GameScreen } from './GameScreen'
import Sprite = Phaser.GameObjects.Sprite
import { makeNinePatch } from '../configs/NinePatcheConfigs'

export class MenuScreen extends Container {
    private categoriesView: CategoriesView
    public nextBtn: NextButton
    private whiteScreen: Phaser.GameObjects.Sprite
    private subcategoriesView: SubcategoriesView
    private levelsView: LevelsView
    private playBtn: NextButton
    private currentState: MenuStates
    // private gameConfig: GameConfig = {}
    // private gameConfig: {}
    private gameConfig: {
        level: { level: string; name: string }
        category: { name: string }
        subcategory: { name: string; frame: string }
    }
    constructor(scene: Phaser.Scene, private header: HeaderContainer, private menuConfig: MenuConfig) {
        super(scene)
        this.gameConfig = {
            category: {
                name: ''
            },
            subcategory: {
                name: '',
                frame: ''
            },
            level: {
                name: '',
                level: ''
            }
        }

        this.initialise()
    }

    public getCurrentState(): number {
        return this.currentState
    }

    private initialise(): void {
        this.initCategoriesView()
        this.initNextBtn()
        this.initSubcategoryView()
        this.initLevelsView()
        this.initPlayBtn()
        this.crateWhiteScreen()
        this.attachListeners()
        this.bringToTop(this.header)
    }

    private attachListeners(): void {
        this.setSize(1920, 1080)
        this.setInteractive(
            new Phaser.Geom.Rectangle(this.width / 2, this.height / 2, this.width, this.height),
            Phaser.Geom.Rectangle.Contains
        )
        this.on('pointerup', () => {
            if (this.getActiveItem()) {
                this.nextBtn.disable()
                this.playBtn.visible && this.playBtn.disable()
                this.getActiveItem().deactivate()
            }
        })
    }

    private initLevelsView(): void {
        this.levelsView = new LevelsView(this.scene, this.menuConfig.levels)
        const w = 1920
        const h = 1080 - this.header.height + 20
        this.levelsView.setSize(w, h)
        this.levelsView.setPosition(0, this.header.height - 20)
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
        this.subcategoriesView.setSize(1920, 920)
        this.subcategoriesView.setPosition(0, this.header.height - 20)
        this.subcategoriesView.setVisible(false)
        this.add(this.subcategoriesView)
        this.subcategoriesView.on('itemActivated', () => {
            this.nextBtn.enable()
        })
        this.subcategoriesView.on('itemDeactivated', () => {
            this.nextBtn.disable()
        })
    }

    private initCategoriesView(): void {
        this.header.updateTitleVisibility(true, 'Categories')
        this.header.hideBackButton()
        this.currentState = MenuStates.CategoriesState
        console.log('GameStates.CategoriesState')
        const { categories } = this.menuConfig
        this.categoriesView = new CategoriesView(this.scene, categories)
        const w = 1920
        const h = 1080 - this.header.height + 20
        this.categoriesView.setSize(w, h)
        this.categoriesView.setPosition(0, this.header.height - 20)
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
        btn.setPosition(1920 / 2 - 10, 1080 / 2 + 320)
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
        btn.setPosition(1920 / 2 - 10, 1080 / 2 + 320)
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
            case MenuStates.CategoriesState: {
                activeItem = this.categoriesView.activeItem
                break
            }
            case MenuStates.SubcategoryState: {
                activeItem = this.subcategoriesView.activeItem
                break
            }
            case MenuStates.LevelsState: {
                activeItem = this.levelsView.activeItem
                break
            }
        }
        return activeItem
    }

    private onNextBtnClick(activeItem: CategoryComponent | LevelComponent): void {
        const whiteScreen = this.showWhiteScreenTween()
        whiteScreen.on('complete', () => {
            this.showNextView(activeItem)
        })
    }
    private onPlayBtnClicked(): void {
        const gameConfig = {
            themeName: 'car',
            row: 2,
            col: 2
        }
        const activeItem = this.getActiveItem()
        if (activeItem) {
            this.gameConfig.level.name = (activeItem as LevelComponent).config.name
            this.gameConfig.level.level = (activeItem as LevelComponent).config.level
        }
        const whiteScreen = this.showWhiteScreenTween()
        whiteScreen.on('complete', () => {
            this.levelsView.setVisible(false)
            this.playBtn.setVisible(false)
            this.header.updateTitleVisibility(false, '')
            this.hideWhiteScreen()
            // this.emit('playBtnClicked', gameConfig)
            this.emit('playBtnClicked', this.gameConfig)
        })
    }

    private showNextView(activeItem: CategoryComponent | LevelComponent): void {
        switch (this.currentState) {
            case MenuStates.CategoriesState: {
                console.log('GameStates.SubcategoryState')
                this.showSubcategoriesView(activeItem, true)
                if (activeItem && (activeItem as CategoryComponent).categoryConfig) {
                    this.gameConfig.category.name = (activeItem as CategoryComponent).categoryConfig?.name
                }
                break
            }
            case MenuStates.SubcategoryState: {
                console.log('GameStates.LevelState')
                this.showLevelsView()
                if (activeItem && (activeItem as CategoryComponent).categoryConfig) {
                    this.gameConfig.subcategory.name = (activeItem as CategoryComponent).categoryConfig.name
                    this.gameConfig.subcategory.frame = (activeItem as CategoryComponent).categoryConfig?.frame
                }
                break
            }
        }
    }

    private showSubcategoriesView(activeItem, nextBtnClicked: boolean): void {
        this.currentState = MenuStates.SubcategoryState
        this.header.updateTitleVisibility(true, activeItem?.categoryConfig?.name)
        this.header.showBackButton()
        // this.nextBtn.disable()
        this.getActiveItem() ? this.nextBtn.enable() : this.nextBtn.disable()
        this.nextBtn.setVisible(true)
        this.categoriesView.setVisible(false)
        this.hideWhiteScreen()
        this.subcategoriesView.setVisible(true)
        if (nextBtnClicked && activeItem.categoryConfig.name !== this.subcategoriesView.title) {
            this.subcategoriesView.deactivateSubcategory()
        }
        this.subcategoriesView.title = activeItem.categoryConfig.name
        this.subcategoriesView.setContentConfig(activeItem.categoryConfig.themes, activeItem.categoryConfig.name)
    }

    public showLevelsView(target?: Sprite): void {
        this.subcategoriesView.setVisible(false)
        this.currentState = MenuStates.LevelsState
        this.hideWhiteScreen(target)
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
        ;(this.parentContainer as GameScreen).bringToTop(this)
        return this.scene.add.tween({
            targets: this.whiteScreen,
            alpha: 1,
            duration: 500,
            onStart: () => {
                this.bringToTop(this.whiteScreen)
                this.whiteScreen.setVisible(true)
            }
        })
    }
    private hideWhiteScreen(target?: Sprite): Phaser.Tweens.Tween {
        ;(this.parentContainer as GameScreen).bringToTop(this.header)
        return this.scene.add.tween({
            targets: target ? target : this.whiteScreen,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.whiteScreen.setVisible(false)
            }
        })
    }

    public hideSubcategoriesView(): void {
        const tw = this.showWhiteScreenTween()
        tw.on('complete', () => {
            this.subcategoriesView.setVisible(false)
            this.showCategoriesView()
        })
    }
    private showCategoriesView(): void {
        this.hideWhiteScreen()
        this.header.updateTitleVisibility(true, 'Categories')
        this.header.hideBackButton()
        this.currentState = MenuStates.CategoriesState
        this.categoriesView.setVisible(true)
        this.getActiveItem() ? this.nextBtn.enable() : this.nextBtn.disable()
    }

    public hideLevelsView(isBackBtnClicked: boolean): void {
        const tw = this.showWhiteScreenTween()
        tw.on('complete', () => {
            this.levelsView.setVisible(false)
            this.playBtn.setVisible(false)
            isBackBtnClicked && this.showSubcategoriesView(this.categoriesView.activeItem, false)
        })
    }
}
