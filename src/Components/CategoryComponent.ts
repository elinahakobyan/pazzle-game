import Container = Phaser.GameObjects.Container
import { Category } from '../../typings/types'

export class CategoryComponent extends Container {
  constructor(scene: Phaser.Scene, public categoryConfig: Category) {
    super(scene)
    this.initialise()
  }

  public deactivate(): void {
    this.setScale(1)
  }
  public activate(): void {
    this.setScale(0.95)
  }

  private initialise(): void {
    this.initBkg()
    this.initFrame()
    this.initName()
    this.attachListeners()
  }

  private initBkg(): void {
    const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
    gr.fillStyle(0xf5ebe3)
    gr.fillRoundedRect(0, 0, 250, 350, 20)
    gr.generateTexture('categoryBg', 250, 350)
    gr.destroy()
    const bkg = this.scene.add.sprite(0, 0, 'categoryBg')
    this.add(bkg)
    this.setSize(bkg.width, bkg.height)

    const gra = this.scene.make.graphics({ x: 0, y: 0 }, false)
    gra.fillStyle(0xfff000)
    gra.fillCircle(0, 0, 5)
    this.add(gra)
  }
  private initFrame(): void {
    const frame = this.scene.add.sprite(0, -50, this.categoryConfig.frame)
    this.add(frame)
  }
  private initName(): void {
    const label = this.scene.add.text(0, 100, this.categoryConfig.name, {
      color: '0x000000',
      fontSize: '24px'
    })
    label.setOrigin(0.5)
    this.add(label)
  }

  private attachListeners(): void {
    this.setInteractive({ cursor: 'pointer', draggable: true })
  }
}
