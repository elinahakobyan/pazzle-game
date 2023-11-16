import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image

export class PieceContainer extends Container {
  private gr: Phaser.GameObjects.Graphics
  public absolutePosition: { x: number; y: number }
  public initialPos: { x: number; y: number }
  public context: Phaser.GameObjects.Image
  constructor(scene, public id: string) {
    super(scene)
    this.initialize()
  }

  private initialize(): void {
    this.attachListeners()
  }

  public setContext(context: Image): void {
    this.context = context
    this.add(this.context)
    this.setSize(this.context.displayWidth, this.context.displayHeight)
  }

  private initZone(): void {
    console.log(this.displayWidth, this.displayHeight)
    const zone = this.scene.add.zone(-this.width / 2, -this.height / 2, this.width, this.height)
    this.add(zone)

    // const gr = this.scene.add.graphics()
    // gr.fillStyle(0xfff000, 0.5)
    // gr.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
    // this.add(gr)
  }
  private attachListeners(): void {
    this.handleDrag()
  }

  private handleDrag(): void {}
}
