import Container = Phaser.GameObjects.Container

export class PreloadScreen extends Container {
  constructor(scene) {
    super(scene)
    this.initialize()
  }

  private initialize(): void {
    this.initBkg()
    this.initLetters()
    setTimeout(() => {
      this.emit('startGame')
    }, 2500)
  }

  private initBkg() {
    const bkg = this.scene.add.sprite(0, 0, 'cloud-bkg')
    bkg.setPosition(bkg.width / 2, bkg.height / 2)
    this.add(bkg)
  }

  private initLetters() {
    //
  }
}
