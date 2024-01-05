import Phaser from 'phaser'
import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image

export class CellContainer extends Container {
  public id: string
  private context: Phaser.GameObjects.Image
  constructor(scene: Phaser.Scene, index: number) {
    super(scene)
    this.id = `${index}`
    this.initialize()
  }

  public setContext(context: Image): void {
    this.context = context
    this.add(this.context)
  }
  private initialize(): void {
    //
  }
}
