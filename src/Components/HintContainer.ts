export class HintContainer extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.initialize()
  }

  private initialize(): void {
    this.initBkg()
    // this.initIcon()
  }

  private initBkg(): void {
    const bkg = this.scene.add.sprite(0, 0, 'hint-btn')
    bkg.setScale(1.3)
    this.add(bkg)
    this.setSize(bkg.width, bkg.height)
    this.setInteractive({ cursor: 'pointer', draggable: true })
  }
  private initIcon(): void {
    const icon = this.scene.add.sprite(-2, 0, 'next-icon')
    icon.setAlpha(0.8)
    // icon.setTint(0xf03e9682)
    icon.setScale(-1, 1)
    this.add(icon)
  }
}
