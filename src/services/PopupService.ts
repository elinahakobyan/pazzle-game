import { injectable } from 'power-di'
import { GameScreen } from '../screens/GameScreen'
import { ActivityPopup } from '../popups/ActivityPopup'
import { QuizPopup } from '../popups/QuizPopup'
import { BiographyPopup } from '../popups/BiographyPopup'
import { Scene } from 'phaser'
import { ButtonTypes } from '../enums/MenuStates'
import Container = Phaser.GameObjects.Container
import { EventEmitter } from 'events'

@injectable()
export class PopupService {
    public gameScreen: GameScreen
    public event$: EventEmitter
    public blockerLayer: Container
    private blocker: Phaser.GameObjects.Sprite
    private activePopup: BiographyPopup | QuizPopup | ActivityPopup | null
    private activePopupType: ButtonTypes
    constructor() {}

    public initialize(): void {
        this.initBlocker()
        this.event$ = new EventEmitter()
    }

    public showBiographyPopup(scene: Scene, config: any): void {
        this.blocker.setVisible(true)
        this.blocker.alpha = 0.5
        // this.gameScreen.bringToTop(this.blockerLayer)
        this.blockerLayer.bringToTop(this.blocker)
        const biographyPopup = new BiographyPopup(scene, config)
        biographyPopup.setPosition(1920 / 2, 1080 / 2)
        this.gameScreen.add(biographyPopup)
        this.activePopup = biographyPopup
        this.activePopupType = ButtonTypes.BiographyBtn
    }
    public showActivityPopup(scene: Scene, config: any): void {
        this.blocker.setVisible(true)
        this.blocker.alpha = 0.5
        // this.gameScreen.bringToTop(this.blockerLayer)
        this.blockerLayer.bringToTop(this.blocker)
        const activityPopup = new ActivityPopup(scene, config)
        activityPopup.setPosition(1920 / 2, 1080 / 2)
        this.gameScreen.add(activityPopup)
        this.activePopup = activityPopup
        this.activePopupType = ButtonTypes.ActivityBtn
    }

    public showQuizPopup(scene: Scene, config: any): void {
        this.blocker.setVisible(true)
        this.blocker.alpha = 0.5
        // this.gameScreen.bringToTop(this.blockerLayer)
        this.blockerLayer.bringToTop(this.blocker)
        const activityPopup = new QuizPopup(scene, config)
        activityPopup.setPosition(1920 / 2, 1080 / 2)
        this.gameScreen.add(activityPopup)
        this.activePopup = activityPopup
        this.activePopupType = ButtonTypes.QuizBtn
    }

    public hideActivePopup(scene): void {
        scene.add.tween({
            targets: [this.activePopup, this.blocker],
            duration: 200,
            alpha: 0,
            onComplete: () => {
                !!this.activePopup && this.activePopup.setVisible(false)
                this.activePopup?.destroy()
                this.activePopup = null
                this.blocker.alpha = 0
                this.event$.emit('popupClosed', this.activePopupType)
                // this.blocker.setVisible(false)
            }
        })
        this.activePopup = null
    }

    private initBlocker(): void {
        const whiteGr = this.gameScreen.scene.make.graphics({ x: 0, y: 0 }, false)
        whiteGr.fillStyle(0x000000)
        whiteGr.fillRect(0, 0, 1920, 1080)
        whiteGr.generateTexture('blocker', 1920, 1080)
        whiteGr.destroy()

        this.blocker = this.gameScreen.scene.add.sprite(1920 / 2, 1080 / 2, 'blocker')
        this.blocker.setAlpha(0)
        this.blocker.setInteractive({ cursor: 'pointer' })
        // this.blocker.setVisible(true)
        this.blockerLayer.add(this.blocker)
    }
}
