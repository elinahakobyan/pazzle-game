import Container = Phaser.GameObjects.Container
import { IocContext } from 'power-di'
import { QuizComponent } from '../Components/QuizComponent'
import { CloseBtn } from '../buttons/CloseBtn'
import { PopupService } from '../services/PopupService'
import { SoundService } from '../services/SoundService'

export class QuizPopup extends Container {
    private bkg: Phaser.GameObjects.Sprite
    private popupService = IocContext.DefaultInstance.get(PopupService)
    private quizzes: QuizComponent[] = []
    private currentQuizIndex: number

    constructor(
        scene,
        private quizConfig: {
            question: string
            answers: { text: string; id: string; isRightAnswer: boolean }[]
        }[]
    ) {
        super(scene)
        this.initialize()
    }

    private initialize(): void {
        this.initBkg()
        this.initCloseBtn()
        this.initQuizzes()
        this.showFirstQuiz()
    }

    private showFirstQuiz(): void {
        this.currentQuizIndex = 0
        this.quizzes[this.currentQuizIndex].alpha = 1
    }

    private handleQuizCompleted(): void {
        this.hideCurrentQuiz()
        // this.showNextQuiz()
    }

    private showNextQuiz(): void {
        this.currentQuizIndex++
        if (!this.quizzes[this.currentQuizIndex]) {
            this.showCongratulation()
        } else {
            this.scene.add.tween({
                targets: this.quizzes[this.currentQuizIndex],
                duration: 250,
                alpha: 1,
                // x: -800,
                onComplete: () => {
                    this.quizzes[this.currentQuizIndex].setVisible(true)
                }
            })
            // this.quizzes[this.currentQuizIndex].setVisible(true)
        }
    }

    private showCongratulation(): void {
        const congratulation = this.scene.add.text(0, 0, 'ՇՆՈՐՀԱՎՈՐ', {
            color: '#360A58',
            fontSize: '64px',
            fontFamily: 'Arti Regular',
            fontStyle: 'bold'
        })
        congratulation.setOrigin(0.5)
        this.add(congratulation)
    }

    private hideCurrentQuiz(): void {
        this.scene.add.tween({
            targets: this.quizzes[this.currentQuizIndex],
            duration: 250,
            alpha: 0,
            delay: 1000,
            // x: -800,
            onComplete: () => {
                this.quizzes[this.currentQuizIndex].setVisible(false)
                this.quizzes[this.currentQuizIndex].destroy()
                this.showNextQuiz()
            }
        })
    }

    private initQuizzes() {
        this.quizConfig.forEach(q => {
            const quizComponent = new QuizComponent(this.scene, q)
            quizComponent.setAlpha(0)
            quizComponent.on('quizCompleted', this.handleQuizCompleted, this)
            this.add(quizComponent)
            this.quizzes.push(quizComponent)
        })
    }

    private initBkg(): void {
        const sprite = this.scene.add.sprite(0, 0, 'quiz-bkg')
        this.add((this.bkg = sprite))

        const bkg = this.scene.add.sprite(0, 0, 'yellow-bkg')
        this.add(bkg)
    }

    private initCloseBtn(): void {
        const closeBtn = new CloseBtn(this.scene)
        closeBtn.setPosition(this.bkg.x + this.bkg.width / 2 - 180, this.bkg.y - this.bkg.height / 2 + 150)
        closeBtn.addListener('pointerdown', () => closeBtn.scaleDownTween())
        closeBtn.addListener('pointerup', () => closeBtn.scaleUpTween())
        closeBtn.on('closeBtnClicked', this.handleCloseBtnClicked, this)
        this.add(closeBtn)
    }

    private handleCloseBtnClicked(): void {
        const soundService = IocContext.DefaultInstance.get(SoundService)
        soundService.playSfx('tap')
        this.popupService.hideActivePopup(this.scene)
    }
}
