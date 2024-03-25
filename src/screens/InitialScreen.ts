import Container = Phaser.GameObjects.Container
import { DifficultyLevels } from '../Components/DifficultyLevels'
import { NextButton } from '../buttons/NextButton'

export class InitialScreen extends Container {
    private difficultyLevels: DifficultyLevels
    private nextBtn: NextButton
    constructor(scene) {
        super(scene)

        this.initialize()
    }

    private initialize(): void {
        this.intiDifficultyLevels()
        this.initNextBtn()
        this.attachListeners()
    }

    private attachListeners(): void {
        this.setSize(1920, 1080)
        this.setInteractive(
            new Phaser.Geom.Rectangle(this.width / 2, this.height / 2, this.width, this.height),
            Phaser.Geom.Rectangle.Contains
        )
        this.on('pointerdown', () => {
            if (this.difficultyLevels.activeItem) {
                this.difficultyLevels.activeItem.deactivate()
                this.nextBtn.disable()
            }
        })
    }

    private intiDifficultyLevels(): void {
        const difficultyLevels = new DifficultyLevels(this.scene)
        difficultyLevels.setPosition(1920 / 2, 1080 / 2)
        difficultyLevels.on('itemActivated', () => {
            this.nextBtn.enable()
        })
        difficultyLevels.on('itemDeactivated', () => {
            this.nextBtn.disable()
        })
        this.add((this.difficultyLevels = difficultyLevels))
    }

    private initNextBtn(): void {
        const btn = new NextButton(this.scene, { text: 'NEXT', frame: 'next' })
        btn.setPosition(1920 / 2, 1080 / 2 + 250)
        btn.disable()
        btn.on('pointerdown', () => {
            btn.scaleDownTween()
        })
        btn.on('pointerup', () => {
            btn.scaleUpTween()
        })
        btn.on('btnClicked', () => {
            this.emit('onNextBtnClicked', this.difficultyLevels.activeItem?.content)
        })
        this.add((this.nextBtn = btn))
    }
}
