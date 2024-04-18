import Container = Phaser.GameObjects.Container
import Phaser from 'phaser'
import { HeaderContainer } from '../Components/HeaderContainer'
import { GameStates, MenuStates } from '../enums/MenuStates'
import { MenuScreen } from './MenuScreen'
import { PuzzleScreen } from './PuzzleScreen'
import { InitialScreen } from './InitialScreen'
import { BiographyPopup } from '../popups/BiographyPopup'

export class GameScreen extends Container {
    private header: HeaderContainer
    private menuScreen: MenuScreen
    public currentState: GameStates
    private puzzleScreen: PuzzleScreen
    private whiteScreen: Phaser.GameObjects.Sprite
    private initialScreen: InitialScreen
    private blocker: Phaser.GameObjects.Sprite
    constructor(scene) {
        super(scene)
        this.initialize()
    }

    private initialize(): void {
        const bkg = this.scene.add.sprite(0, 0, 'bkg')
        bkg.setPosition(bkg.width / 2, bkg.height / 2)
        this.add(bkg)
        this.crateWhiteScreen()
        this.initHeader()
        this.initInitialScreen()
        this.initBlocker()

        // this.initMenuScreen()
    }

    private initBlocker(): void {
        this.blocker = this.scene.add.sprite(1920 / 2, 1080 / 2, 'whiteScreen')
        this.blocker.alpha = 0
        this.blocker.setInteractive()
        this.add(this.blocker)
    }

    private initInitialScreen(): void {
        const initialScreen = new InitialScreen(this.scene)
        this.currentState = GameStates.InitialState
        initialScreen.on('onNextBtnClicked', config => {
            this.hideInitialScreen(config)
            // this.showMenuScreen(config)
        })
        this.add((this.initialScreen = initialScreen))
    }

    private initHeader(): void {
        const header = new HeaderContainer(this.scene)
        header.setPosition(header.width / 2, header.height / 2)
        header.on('onBackBtnClick', this.handleBackBtnClick, this)
        header.on('onHintBtnClick', this.handleHintBtnClick, this)
        header.on('onRestartBtnClick', this.handleRestartBtnClick, this)
        header.setVisible(false)
        this.add((this.header = header))
    }

    private initMenuScreen(menuConfig): void {
        this.menuScreen = new MenuScreen(this.scene, this.header, menuConfig)
        this.currentState = GameStates.MenuState
        this.menuScreen.on('playBtnClicked', this.initPuzzleScreen, this)
        this.add(this.menuScreen)
        // this.menuScreen.setVisible(false)
        this.bringToTop(this.header)
    }

    private showMenuScreen(config): void {
        this.hideWhiteScreen()
        if (!this.menuScreen) {
            this.initMenuScreen(config)
            this.header.setVisible(true)
        } else {
            this.menuScreen.destroy()
            this.menuScreen.setVisible(false)
            this.header.setVisible(true)
            this.initMenuScreen(config)
        }
    }
    private hideInitialScreen(config): void {
        this.bringToTop(this.whiteScreen)
        const tw = this.showWhiteScreenTween()
        tw.on('complete', () => {
            this.initialScreen.setVisible(false)
            this.showMenuScreen(config)

            const popupConfig = {
                biography: '',
                activity: '',
                quiz: {
                    1: {
                        question: '',
                        answer1: { text: '', id: '1', isRightAnswer: false },
                        answer2: { text: '', id: '2', isRightAnswer: false },
                        answer3: { text: '', id: '3', isRightAnswer: false },
                        answer4: { text: '', id: '4', isRightAnswer: false }
                    }
                }
            }

            const sprite = this.scene.add.sprite(1920 / 2, 1080 / 2, 'blur-bkg')
            this.add(sprite)

            const infoPopup = new BiographyPopup(this.scene, popupConfig.biography)
            infoPopup.setPosition(1920 / 2, 1080 / 2)
            this.add(infoPopup)
            //
            // const sprite = this.scene.add.sprite(1920 / 2, 1080 / 2, 'blur-bkg')
            // sprite.s
            // sprite.alpha = 0.9
            // const fx = sprite.preFX?.addBlur(0.5, 0, 0, 20, 0x000000, 6)
            // this.scene.add.tween({
            //     targets: fx,
            //     strength: 0,
            //     duration: 200,
            //     yoyo: true
            //     // repeat: -1
            // })
        })
    }

    private initPuzzleScreen(gameConfig): void {
        if (!this.puzzleScreen) {
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
        if (this.currentState === GameStates.MenuState) {
            switch (this.menuScreen.getCurrentState()) {
                case MenuStates.CategoriesState: {
                    console.log('CategoriesState')
                    this.hideMenuScreen()
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

    private handleRestartBtnClick(): void {
        this.currentState = GameStates.MenuState
        const tw = this.showWhiteScreenTween()
        tw.on('complete', () => {
            this.header.hideHint()
            this.header.hideRestartIcon()
            this.puzzleScreen.setVisible(false)
            this.menuScreen.showCategoriesView(this.whiteScreen)
        })
    }

    private handleHintBtnClick(): void {
        this.puzzleScreen.showOrHideHint()
    }
    private showInitialScreen(): void {
        this.hideWhiteScreen()
        this.currentState = GameStates.InitialState
        this.initialScreen.setVisible(true)
    }

    private hideMenuScreen(): void {
        this.bringToTop(this.whiteScreen)
        const tw = this.showWhiteScreenTween()
        tw.on('complete', () => {
            this.header.setVisible(false)
            this.menuScreen.setVisible(false)
            this.showInitialScreen()
        })
    }

    public hidePuzzleView(): void {
        const tw = this.showWhiteScreenTween()
        tw.on('complete', () => {
            this.header.hideHint()
            this.header.hideRestartIcon()
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
}
