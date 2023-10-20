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
  }

  private initialize(): void {
    this.attachListeners()
  }
  private attachListeners(): void {
    this.handleDrag()
  }

  private handleDrag(): void {
    this.on('pointerdown', pointer => {
      // const { tx, ty } = this.getWorldTransformMatrix()
      this.setPosition(pointer.x, pointer.y)
      console.log(pointer.x, pointer.y)
      // console.log(tx, ty)
      // console.log(piece.x, piece.y)
      // this.setPosition(tx - pointer.x, ty - pointer.y)
    })
  }
}
