import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image

export class PieceContainer extends Container {
  private gr: Phaser.GameObjects.Graphics
  public absolutePosition: { x: number; y: number }
  constructor(scene, public id: string, private context: Image) {
    super(scene)
    this.add(this.context)
    this.initialize()
  }

  private initialize(): void {
    this.attachListeners()
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
