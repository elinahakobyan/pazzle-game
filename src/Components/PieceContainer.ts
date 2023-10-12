import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image

export class PieceContainer extends Container {
  private context: Phaser.GameObjects.Image
  private gr: Phaser.GameObjects.Graphics
  constructor(scene, private id: string) {
    super(scene)
    this.initialize()

    // this.setSize(83.25, 71.25)
    // this.add(this.context)
  }

  public setContext(context: Image): void {
    // console.log(context)
    // this.context.setTexture(context.texture.key)
  }

  private initialize(): void {
    const gr = this.scene.add.graphics()
    gr.fillStyle(0x000000, 0.5)
    gr.fillRect(0, 0, 166.5, 142.5)
    this.add((this.gr = gr))

    // gr.generateTexture('sprite', 166.5, 142.5)
    // gr.destroy()

    // this.context = this.scene.add.sprite(0, 0, 'sprite')
    // this.context.setAlpha(0.5)
    // this.add(this.context)
  }
}
