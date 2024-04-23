import Container = Phaser.GameObjects.Container
import Tween = Phaser.Tweens.Tween

export class DifficultyLevel extends Container {
    constructor(
        scene,
        public labelConfig: { text: string; position: { x: number; y: number } },
        public content,
        private bgRotation: number
    ) {
        super(scene)
        this.initialize()
    }

    public deactivate(): void {
        this.scene.add.tween({
            targets: this,
            duration: 150,
            scale: 1,
            onComplete: () => {
                this.emit('btnClicked')
            }
        })
    }
    public activate(): Tween {
        return this.scene.add.tween({
            targets: this,
            duration: 150,
            scale: 0.95
        })
    }
    // public scaleUpTween(): void {
    //     this.scene.add.tween({
    //         targets: this,
    //         duration: 150,
    //         scale: 1,
    //         complete: () => {
    //             this.emit('btnClicked')
    //         }
    //     })
    // }
    // public scaleDownTween(): Tween {
    //     return this.scene.add.tween({
    //         targets: this,
    //         duration: 150,
    //         scale: 0.95
    //     })
    // }

    private initialize(): void {
        this.initBg()
        this.initLabel()
        this.attachListeners()
    }

    private initLabel(): void {
        const label = this.scene.add.text(
            this.labelConfig.position.x,
            this.labelConfig.position.y,
            this.labelConfig.text,
            {
                color: '#6740B0',
                fontSize: '64px',
                fontFamily: 'Arti Regular'
            }
        )
        label.setOrigin(0.5)
        this.add(label)
    }

    private initBg(): void {
        const bkg = this.scene.add.sprite(0, 0, 'diffBg')
        bkg.rotation = this.bgRotation
        this.add(bkg)
        this.setSize(bkg.width, bkg.height)
    }

    private attachListeners(): void {
        this.setInteractive({ cursor: 'pointer', draggable: true })
    }
}
