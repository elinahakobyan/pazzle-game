import Container = Phaser.GameObjects.Container
import Phaser from 'phaser'
import { IocContext } from 'power-di'
import { HeaderContainer } from '../Components/HeaderContainer'
import { GameStates, MenuStates } from '../enums/MenuStates'
import { PopupService } from '../services/PopupService'
import { InitialScreen } from './InitialScreen'
import { MenuScreen } from './MenuScreen'
import { PuzzleScreen } from './PuzzleScreen'
import { SoundService } from '../services/SoundService'

export class GameScreen extends Container {
    public blocker: Phaser.GameObjects.Sprite
    public currentState: GameStates
    private header: HeaderContainer
    private menuScreen: MenuScreen
    private puzzleScreen: PuzzleScreen
    private whiteScreen: Phaser.GameObjects.Sprite
    private initialScreen: InitialScreen
    private popupService = IocContext.DefaultInstance.get(PopupService)
    private soundService = IocContext.DefaultInstance.get(SoundService)
    private blockerLayer: Phaser.GameObjects.Container
    private isBackBtnClicked: boolean = false
    constructor(scene) {
        super(scene)
        this.initialize()
    }

    private initialize(): void {
        this.soundService.initialize(this.scene)
        const bkg = this.scene.add.sprite(0, 0, 'bkg')
        bkg.setPosition(bkg.width / 2, bkg.height / 2)
        this.add(bkg)
        this.crateWhiteScreen()
        this.initHeader()
        this.initInitialScreen()
        // this.initBlockerLayer()
        this.initServices()
        this.bringToTop(this.blockerLayer)
        // const config = [
        //   {
        //     question: 'Նշված ստեղծագործություններից ո՞րն է Հովհաննես Թումանյանի բալադներից։',
        //     answers: [
        //       { text: '«Փարվանա» ', id: '1', isRightAnswer: true },
        //       { text: '«Թմկաբերդի առումը»', id: '2', isRightAnswer: false },
        //       { text: '«Լոռեցի Սաքոն»', id: '3', isRightAnswer: false },
        //       { text: '«Սասունցի Դավիթ»', id: '4', isRightAnswer: false }
        //     ]
        //   },
        //   {
        //     question: 'Նշված պոեմնորից ո՞րն է գրել Հովհաննես Թումանյանը։',
        //     answers: [
        //       { text: '«Աբու-Լալա Մահարի»  ', id: '1', isRightAnswer: false },
        //       { text: '«Թմկաբերդի առումը»', id: '2', isRightAnswer: true },
        //       { text: ' «Գայլ Վահան»', id: '3', isRightAnswer: false },
        //       { text: '«Մատյան Ողբերգության»', id: '4', isRightAnswer: false }
        //     ]
        //   },
        //   {
        //     question: 'Ո՞ր  գրական խմբակի նախաձեռնող է եղել Հովհաննես Թումանյանը։\n',
        //     answers: [
        //       { text: '«Վերնատուն»', id: '1', isRightAnswer: true },
        //       { text: '«Երեքի խմբակ»', id: '2', isRightAnswer: false },
        //       { text: '«Քուրա»', id: '3', isRightAnswer: false },
        //       { text: '«Մուրճ»', id: '4', isRightAnswer: false }
        //     ]
        //   }
        // ]

        // const a = new QuizPopup(this.scene, config)
        // a.setPosition(1920 / 2, 1080 / 2 - 200)
        // this.add(a)

        // this.initBlocker()
        // this.initMenuScreen()
    }

    private initBlockerLayer(): void {
        this.blockerLayer = this.scene.add.container()
        this.blockerLayer.z = 10
        this.add(this.blockerLayer)
    }

    private initServices(): void {
        this.popupService.gameScreen = this
        // this.popupService.blockerLayer = this.blockerLayer
        // this.popupService.initialize()
    }

    private initInitialScreen(): void {
        const initialScreen = new InitialScreen(this.scene)
        this.currentState = GameStates.InitialState
        initialScreen.on('onNextBtnClicked', (config, difficultyLevel) => {
            this.hideInitialScreen(config, difficultyLevel)
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

    private initMenuScreen(menuConfig, difficultyLevel): void {
        this.menuScreen = new MenuScreen(this.scene, this.header, menuConfig, difficultyLevel)
        this.currentState = GameStates.MenuState
        this.menuScreen.on('playBtnClicked', this.initPuzzleScreen, this)
        this.add(this.menuScreen)
        // this.menuScreen.setVisible(false)
        this.bringToTop(this.header)
    }

    private showMenuScreen(config, difficultyLevel): void {
        this.hideWhiteScreen()
        if (!this.menuScreen) {
            this.initMenuScreen(config, difficultyLevel)
            this.header.setVisible(true)
        } else {
            this.menuScreen.destroy()
            this.menuScreen.setVisible(false)
            this.header.setVisible(true)
            this.initMenuScreen(config, difficultyLevel)
        }
    }
    private hideInitialScreen(config, difficultyLevel): void {
        this.bringToTop(this.whiteScreen)
        const tw = this.showWhiteScreenTween()
        tw.on('complete', () => {
            this.initialScreen.setVisible(false)
            this.showMenuScreen(config, difficultyLevel)
            this.bringToTop(this.blockerLayer)
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
        this.bringToTop(this.blockerLayer)
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
            this.bringToTop(this.blockerLayer)
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
            this.header.updateBackBtnState()
            this.showInitialScreen()
        })
    }

    public hidePuzzleView(): void {
        const tw = this.showWhiteScreenTween()
        tw.on('complete', () => {
            this.header.hideHint()
            this.header.hideRestartIcon()
            this.header.updateBackBtnState()
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
