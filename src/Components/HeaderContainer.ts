import { getHeaderBgNinePatchConfig, makeNinePatch } from '../configs/NinePatcheConfigs'
import { BackButton } from '../buttons/BackButton'

export class HeaderContainer extends Phaser.GameObjects.Container {
  private title: Phaser.GameObjects.Text
  private backBtn: BackButton
  constructor(scene: Phaser.Scene) {
    super(scene)

    this.initialise()
  }

  public hideBackButton(): void {
    this.backBtn.setVisible(false)
  }
  public showBackButton(): void {
    this.backBtn.setVisible(true)
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
      fontSize: '32px'
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

  private initBackButton(): void {
    this.backBtn = new BackButton(this.scene)
    this.backBtn.setPosition(-this.width / 2 + 90, 20)
    this.backBtn.on('pointerdown', () => {
      this.backBtn.setScale(0.95)
    })
    this.backBtn.on('pointerup', () => {
      this.backBtn.setScale(1)
      this.emit('onBackBtnClick')
    })
    this.add(this.backBtn)
  }
  private initHint1(): void {}
  private initHint2(): void {}
}
