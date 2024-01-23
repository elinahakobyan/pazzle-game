import Container = Phaser.GameObjects.Container
import { Category } from '../../typings/types'

export class CategoryComponent extends Container {
  private frame: Phaser.GameObjects.Sprite
  private label: Phaser.GameObjects.Text
  private frameBorder: Phaser.GameObjects.Sprite
  constructor(scene: Phaser.Scene, public categoryConfig?: Category) {
    super(scene)
    this.initialise()
  }

  public setContent(content): void {
    this.categoryConfig = content
    this.frame.setTexture(content.frame)
    this.label.text = content.name
    this.initBorder()
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
    this.initBorder()
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
    console.log(frame.displayWidth, frame.displayHeight)
    this.add((this.frame = frame))
  }

  private initBorder(): void {
    if (this.categoryConfig) {
      const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
      gr.lineStyle(20, 0xf5ebe3, 1)
      gr.strokeRoundedRect(0, 0, this.frame.displayWidth + 10, this.frame.displayHeight + 10, 20)
      gr.generateTexture('frameBorder', this.frame.displayWidth + 10, this.frame.displayHeight + 10)
      gr.destroy()

      const frameBorder = this.scene.add.sprite(this.frame.x, this.frame.y, 'frameBorder')
      this.add((this.frameBorder = frameBorder))
    }
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
