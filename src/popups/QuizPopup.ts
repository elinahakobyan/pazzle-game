import Container = Phaser.GameObjects.Container
import { CloseBtn } from '../buttons/CloseBtn'
import { IocContext } from 'power-di'
import { PopupService } from '../services/PopupService'
import { QuizComponent } from '../Components/QuizComponent'

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
        console.warn('QUIZ CONFIG', quizConfig)
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
        const congratulation = this.scene.add.text(0, 0, 'CONGRATULATION', {
            color: '#360A58',
            fontSize: '52px',
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
                console.log(this.quizzes[this.currentQuizIndex], this.currentQuizIndex)
                this.quizzes[this.currentQuizIndex].setVisible(false)
                this.quizzes[this.currentQuizIndex].destroy()
                this.showNextQuiz()
            }
        })
    }

    private initQuizzes() {
        this.quizConfig.forEach(q => {
            const quizComponent = new QuizComponent(this.scene, q)
            // quizComponent.setVisible(false)
            quizComponent.setAlpha(0)
            quizComponent.on('quizCompleted', this.handleQuizCompleted, this)
            this.add(quizComponent)
            this.quizzes.push(quizComponent)
        })
    }

    private initQuestion(): void {
        // const label = this.scene.add.text(0, 0, this.quizConfig.biography, {
        //     // const label = this.scene.add.text(-this.bkg.width / 2 + 210, -this.bkg.height / 2 + 220, this.biographyConfig, {
        //     color: '#ffffff',
        //     fontSize: '36px',
        //     fontFamily: 'Arti Regular',
        //     align: 'align-left',
        //     fontStyle: 'bold',
        //     wordWrap: { width: this.bkg.width - 370, useAdvancedWrap: true }
        // })
        // label.setOrigin(0.5)
        //
        // this.add(label)
    }

    private initAnswers(): void {}

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
        this.popupService.hideActivePopup(this.scene)
    }
}
