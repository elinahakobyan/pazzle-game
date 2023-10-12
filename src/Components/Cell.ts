import Phaser from 'phaser'

export class Cell {
  public id: string
  constructor(
    scene: Phaser.Scene,
    row: number,
    col: number,
    private dimensions: { x: number; y: number; width: number; height: number }
  ) {
    this.id = `${row}${col}`
    this.dimensions = dimensions
    this.initialize()
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.dimensions.x, y: this.dimensions.y }
  }

  private initialize(): void {
    //
  }
}
