import Container = Phaser.GameObjects.Container
import Tween = Phaser.Tweens.Tween

export class BaseButton extends Container {
    private text: Phaser.GameObjects.Text
    constructor(scene, private config) {
        super(scene)

        this.initialize()
    }

    private initialize(): void {
        this.initBkg()
        this.initText()
    }

    public scaleUpTween(): void {
        this.scene.add.tween({
            targets: this,
            duration: 150,
            scale: 1,
            complete: () => {
                this.emit('baseBtnClicked', this.config.text)
            }
        })
    }
    public scaleDownTween(): Tween {
        return this.scene.add.tween({
            targets: this,
            duration: 150,
            scale: 0.95
        })
    }

    public disable(): void {
        this.setAlpha(0.5)
        this.disableInteractive()
    }
    public enable(): void {
        this.setAlpha(1)
        this.setInteractive({ cursor: 'pointer', draggable: true })
    }
    private initBkg(): void {
        const btn = this.scene.add.sprite(0, 0, this.config.frame)
        this.add(btn)
        this.setSize(btn.width, btn.height)
        this.setInteractive({ cursor: 'pointer', draggable: true })
    }

    private initText(): void {
        const text = this.scene.add.text(-10, -8, this.config.text, {
            color: '#ffffff',
            fontSize: '32px',
            fontFamily: 'Arti Regular',
            fontStyle: 'bold'
        })
        text.setOrigin(0.5)
        this.add((this.text = text))
    }
}
