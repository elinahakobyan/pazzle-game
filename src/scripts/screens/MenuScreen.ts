import Container = Phaser.GameObjects.Container

export class MenuScreen extends Container {
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.initialise()
  }

  private initialise(): void {
    this.initCategories()
  }

  private initCategories(): void {
    //
  }
}
