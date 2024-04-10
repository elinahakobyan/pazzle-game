export class RestartContainer extends Phaser.GameObjects.Container {
    private showIcon: Phaser.GameObjects.Sprite
    private hideIcon: Phaser.GameObjects.Sprite
    constructor(scene: Phaser.Scene) {
        super(scene)
        this.initialize()
    }

    private initialize(): void {
        this.initBkg()
        this.initIcon()
    }

    private initBkg(): void {
        const bkg = this.scene.add.sprite(0, 0, 'hint-btn')
        bkg.setScale(1.3)
        this.add(bkg)
        this.setSize(bkg.width, bkg.height)
        this.setInteractive({ cursor: 'pointer', draggable: true })
    }
    private initIcon(): void {
        this.showIcon = this.scene.add.sprite(-2, 0, 'restart-icon')
        this.add(this.showIcon)
    }
}
