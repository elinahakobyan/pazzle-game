import { getHeaderBgNinePatchConfig, makeNinePatch } from '../configs/NinePatcheConfigs'

export class HeaderContainer extends Phaser.GameObjects.Container {
  private title: Phaser.GameObjects.Text
  constructor(scene: Phaser.Scene) {
    super(scene)

    this.initialise()
  }

  public updateTitleVisibility(visibility: boolean, text?: string): void {
    this.title.text = text ? text : ''
    this.title.setVisible(visibility)
  }

  private initialise(): void {
    this.initHeaderBg()
    this.initTitle()
    this.initBackButton()
    this.initHint1()
    this.initHint2()
  }

  private initTitle(): void {
    const title = this.scene.add.text(0, 20, '', {
      color: '0x000000',
      fontSize: '24px'
    })
    title.setOrigin(0.5)
    title.setVisible(false)
    this.add((this.title = title))
  }

  private initHeaderBg(): void {
    const headerBgGr = this.scene.make.graphics({ x: 0, y: 0 }, false)
    headerBgGr.fillStyle(0xf5ebe3)
    headerBgGr.fillRoundedRect(0, 0, 200, 100, 20)
    headerBgGr.generateTexture('headerBg', 200, 100)
    headerBgGr.destroy()

    const headerBg = makeNinePatch(this.scene, getHeaderBgNinePatchConfig(1920, 180))
    headerBg.setPosition(0, -20)
    this.add(headerBg)

    this.setSize(headerBg.width, headerBg.height)
  }

  private initBackButton(): void {}
  private initHint1(): void {}
  private initHint2(): void {}
}
