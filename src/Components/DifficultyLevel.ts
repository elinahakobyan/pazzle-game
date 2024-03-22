import Container = Phaser.GameObjects.Container

export class DifficultyLevel extends Container {
    constructor(scene, public label: string) {
        super(scene)
        this.initialize()
    }

    public deactivate(): void {
        this.setScale(1)
    }
    public activate(): void {
        this.setScale(0.95)
    }

    private initialize(): void {
        this.initBg()
        this.initLabel()
        this.attachListeners()
    }

    private initLabel(): void {
        const label = this.scene.add.text(0, 0, this.label, {
            color: '#ffffff',
            fontSize: '32px'
        })
        label.setOrigin(0.5)
        this.add(label)
    }

    private initBg(): void {
        const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
        gr.fillStyle(0xc6e2ff)
        // gr.fillStyle(0xf5ebe3, )
        gr.fillRoundedRect(0, 0, 350, 90, 20)
        gr.generateTexture('diffBg', 350, 90)
        gr.destroy()
        const bkg = this.scene.add.sprite(0, 0, 'diffBg')
        bkg.alpha = 0.7
        this.add(bkg)
        this.setSize(bkg.width, bkg.height)
    }

    private attachListeners(): void {
        this.setInteractive({ cursor: 'pointer', draggable: true })
    }
}
