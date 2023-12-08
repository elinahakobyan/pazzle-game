import { getNextBtnNinePatchConfig, makeNinePatch } from '../configs/NinePatcheConfigs'

export class BasicButton extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, private config: { text: string; frame: string }) {
    super(scene)
    this.initialise()
  }

  private initialise(): void {
    this.initBkg()
    this.initIcon()
    this.initText()
  }

  private initBkg(): void {
    const btn = makeNinePatch(this.scene, getNextBtnNinePatchConfig(220, 50))
    const gr = this.scene.add.graphics()
    gr.fillStyle(0xffffff)
    gr.fillRoundedRect(-(btn.width + 4) / 2, -(btn.height + 6) / 2, btn.width + 4, btn.height + 6, 12)
    this.add(gr)
    this.add(btn)
  }

  private initIcon(): void {
    const icon = this.scene.add.sprite(45, 0, `${this.config.frame}-icon`)
    this.add(icon)
  }
  private initText(): void {
    const text = this.scene.add.text(-20, 0, this.config.text, {
      color: '#ffffff',
      fontSize: '32px'
    })
    text.setOrigin(0.5)
    this.add(text)
  }
}
