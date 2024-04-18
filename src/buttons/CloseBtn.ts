import Container = Phaser.GameObjects.Container
import Tween = Phaser.Tweens.Tween

export class CloseBtn extends Container {
    constructor(scene: Phaser.Scene) {
        super(scene)
        this.initialize()
    }

    public scaleUpTween(): void {
        this.scene.add.tween({
            targets: this,
            duration: 150,
            scale: 1,
            complete: () => {
                this.emit('closeBtnClicked')
            }
        })
    }
    public scaleDownTween(): Tween {
        return this.scene.add.tween({
            targets: this,
            duration: 150,
            scale: 0.85
        })
    }

    private initialize(): void {
        this.initBkg()
    }
    private initBkg(): void {
        const bkg = this.scene.add.sprite(0, 0, 'close-btn')
        this.add(bkg)
        this.setSize(bkg.width, bkg.height)
        this.setInteractive({ cursor: 'pointer', draggable: true })
    }
}
