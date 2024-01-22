import Container = Phaser.GameObjects.Container
import { Category } from '../../typings/types'

export class CategoryComponent extends Container {
  private frame: Phaser.GameObjects.Sprite
  private label: Phaser.GameObjects.Text
  constructor(scene: Phaser.Scene, public categoryConfig?: Category) {
    super(scene)
    this.initialise()
  }

  public setContent(content): void {
    this.categoryConfig = content
    this.frame.setTexture(content.frame)
    this.label.text = content.name
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
    console.log(this.categoryConfig && this.categoryConfig.frame)
    const frame = this.scene.add.sprite(0, -50, this.categoryConfig ? this.categoryConfig.frame : 'phaser-logo')
    frame.setScale(0.3)
    this.add((this.frame = frame))
  }
  private initName(): void {
    const label = this.scene.add.text(0, 100, this.categoryConfig ? this.categoryConfig.name : 'AA', {
      color: '0x000000',
      fontSize: '24px'
    })
    label.setOrigin(0.5)
    this.add((this.label = label))
  }

  private attachListeners(): void {
    this.setInteractive({ cursor: 'pointer', draggable: true })
  }
}
