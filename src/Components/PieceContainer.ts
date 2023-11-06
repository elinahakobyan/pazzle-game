import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image

export class PieceContainer extends Container {
  private context: Phaser.GameObjects.Image
  private gr: Phaser.GameObjects.Graphics
  constructor(scene, private id: string) {
    super(scene)
    this.initialize()
  }

  public setContext(context: Image): void {
    this.add((this.context = context))
    this.setSize(this.context.displayWidth, this.context.displayHeight)
    this.initZone()
  }

  private initialize(): void {
    this.attachListeners()
  }

  private initZone(): void {
    console.log(this.displayWidth, this.displayHeight)
    const zone = this.scene.add.zone(-this.width / 2, -this.height / 2, this.width, this.height)
    this.add(zone)

    const gr = this.scene.add.graphics()
    gr.fillStyle(0xfff000, 0.5)
    gr.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
    this.add(gr)
  }
  private attachListeners(): void {
    this.handleDrag()
  }

  private handleDrag(): void {}
}
