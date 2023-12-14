export class ForegroundScreen extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.initialise()
  }

  private initialise(): void {
    const sprite = this.scene.add.sprite(1920 / 2, 1080 / 2, 'phaser-logo')
    this.add(sprite)

    const tw = this.scene.add.tween({
      targets: sprite,
      duration: 1000,
      scale: 1.5,
      yoyo: true,
      onComplete: () => {
        this.emit('onForegroundViewComplete', this)
      }
    })
  }
}
