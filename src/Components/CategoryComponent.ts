import Container = Phaser.GameObjects.Container
import { Category } from '../../typings/types'

export class CategoryComponent extends Container {
  private frame: Phaser.GameObjects.Sprite
  private label: Phaser.GameObjects.Text
  private frameBorder: Phaser.GameObjects.Sprite
  public categoryConfig: Category

  constructor(scene: Phaser.Scene) {
    super(scene)
    this.initialise()
  }

  public setContent(content, category: string): void {
    this.categoryConfig = content
    this.frame.setTexture(`${content.frame}`)
    this.frame.setFrame('')

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
    // this.initBorder()
    this.initName()
    this.attachListeners()
  }

  private initBkg(): void {
    const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
    gr.fillStyle(0xffffff)
    // gr.fillStyle(0xf5ebe3)
    gr.fillRoundedRect(0, 0, 250, 350, 20)
    gr.generateTexture('categoryBg', 250, 350)
    gr.destroy()
    const bkg = this.scene.add.sprite(0, 0, 'categoryBg')
    bkg.alpha = 0.5
    this.add(bkg)
    this.setSize(bkg.width, bkg.height)

    // const gra = this.scene.make.graphics({ x: 0, y: 0 }, false)
    // gra.fillStyle(0xfff000)
    // gra.fillCircle(0, 0, 5)
    // this.add(gra)
  }
  private initFrame(): void {
    const frame = this.scene.add.sprite(0, -50, '', '')
    frame.setScale(0.3)
    this.add((this.frame = frame))
  }

  private initBorder(): void {


    // if (this.categoryConfig) {
    //   const gr = this.scene.make.graphics()
    //   gr.lineStyle(20, 0xffffff, 1)
    //   // gr.lineStyle(20, 0xf5ebe3, 1)
    //   gr.strokeRoundedRect(
    //     0,
    //     0,
    //     //   this.frame.x - this.frame.displayWidth / 2,
    //     // this.frame.y - this.frame.displayHeight / 2,
    //     this.frame.displayWidth + 10,
    //     this.frame.displayHeight + 10,
    //     20
    //   )
    //   // gr.setVisible(false)
    //   // gr.generateTexture('frameBorder', this.frame.displayWidth + 10, this.frame.displayHeight + 10)
    //   // gr.destroy()
    //
    //   // const frameBorder = this.scene.add.sprite(this.frame.x, this.frame.y, 'frameBorder')
    //   // frameBorder.alpha = 0.5
    //   // this.add((this.frameBorder = frameBorder))
    //   this.frame.setMask(gr.createGeometryMask())
    // }

    // const gr = this.scene.make.graphics()
    // gr.fillStyle(0xffff00)
    // gr.alpha = 1
    // gr.fillRoundedRect(this.frame.x, this.frame.y, 100, 90, 5)
    // const mask = gr.createGeometryMask()
    //
    // // gr.setVisible(true)
    // const { tx, ty } = this.frame.getWorldTransformMatrix()
    // gr.setPosition(tx, ty)
    // this.frame.mask = mask

    // const mask = this.frame.setMask(gr.createGeometryMask())
    // mask.setPosition(100, 100)
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
