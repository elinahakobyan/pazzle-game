import Phaser from 'phaser'
import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image

export class Cell extends Container {
  public id: string
  constructor(scene: Phaser.Scene, index: number, private context: Image) {
    super(scene)
    this.id = `${index}`
    this.add(context)
    this.initialize()
  }

  public getSize(): { width: number; height: number } {
    return { width: this.context.displayWidth, height: this.context.displayHeight }
  }

  private initialize(): void {
    //
  }
}
