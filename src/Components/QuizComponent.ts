import Container = Phaser.GameObjects.Container
import { AnswerComponent } from './AnswerComponent'

export class QuizComponent extends Container {
    private selectedAnswer: AnswerComponent
    private answerComponents: AnswerComponent[] = []

    constructor(
        scene,
        private config: {
            question: string
            answers: { text: string; id: string; isRightAnswer: boolean }[]
        }
    ) {
        super(scene)

        this.initialize()
        this.setSize(1093, 863)
    }

    private initialize(): void {
        this.initQuestion()
        this.initAnswers()
    }

    private initQuestion(): void {
        const label = this.scene.add.text(0, -200, this.config.question, {
            color: '#ffffff',
            fontSize: '36px',
            fontFamily: 'Arti Regular',
            align: 'align-left',
            fontStyle: 'bold',
            wordWrap: { width: 1093 - 370, useAdvancedWrap: true }
        })
        label.setOrigin(0.5)
        this.add(label)
    }

    private initAnswers(): void {
        this.config.answers.forEach((a, i) => {
            const answerComponent = new AnswerComponent(this.scene, a)
            answerComponent.setPosition(i < 2 ? -1093 / 4 : 1093 / 4, i % 2 == 0 ? 863 / 3 - 170 : 863 / 2 - 150)
            answerComponent.on('pointerdown', () => {
                answerComponent.scaleDownTween()
            })
            answerComponent.on('pointerup', () => {
                answerComponent.scaleUpTween()
                this.handlePointerUp(answerComponent)
            })
            this.add(answerComponent)
            this.answerComponents.push(answerComponent)
        })
    }

    //
    private handlePointerUp(answerComponent: AnswerComponent): void {
        if (this.selectedAnswer) {
            if (this.selectedAnswer.id === answerComponent.id) {
            } else {
                this.selectedAnswer.setDefaultState()
                this.selectedAnswer = answerComponent
                this.checkForRightAnswer(answerComponent)
            }
        } else {
            this.selectedAnswer = answerComponent
            this.checkForRightAnswer(answerComponent)
        }
    }

    private checkForRightAnswer(answerComponent: AnswerComponent): void {
        answerComponent.updateFrames(answerComponent.isRightAnswer)
        if (answerComponent.isRightAnswer) {
            this.answerComponents.forEach(a => a.disableInteractive())
            this.emit('quizCompleted')
        }
    }
}
