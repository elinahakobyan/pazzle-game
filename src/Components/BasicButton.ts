import { getNextBtnNinePatchConfig, makeNinePatch } from '../configs/NinePatcheConfigs'
import WebGLRenderer = Phaser.Renderer.WebGL.WebGLRenderer

export class BasicButton extends Phaser.GameObjects.Container {
  private grayScaleAsset: Phaser.GameObjects.Sprite
  constructor(scene: Phaser.Scene, private config: { text: string; frame: string }) {
    super(scene)
    this.initialise()
  }

  private initialise(): void {
    this.initBkg()
    this.initIcon()
    this.initText()
    // this.createGrayScaleAsset()
  }

  public scaleUpTween(): void {
    this.scene.add.tween({
      targets: this,
      duration: 150,
      scale: 1,
      complete: () => {
        this.emit('onBtnClickedComplete')
      }
    })
  }
  public scaleDownTween(): void {
    this.scene.add.tween({
      targets: this,
      duration: 150,
      scale: 0.95
    })
  }

  public disable(): void {
    this.setAlpha(0.5)
    this.disableInteractive()
  }
  public enable(): void {
    this.setAlpha(1)
    this.setInteractive({ cursor: 'pointer', draggable: true })
  }
  private initBkg(): void {
    const btn = makeNinePatch(this.scene, getNextBtnNinePatchConfig(220, 50))
    const gr = this.scene.add.graphics()
    gr.fillStyle(0xffffff)
    gr.fillRoundedRect(-(btn.width + 4) / 2, -(btn.height + 6) / 2, btn.width + 4, btn.height + 6, 12)
    this.add(gr)
    this.add(btn)
    this.setSize(btn.width + 4, btn.height + 6)
    // this.setInteractive({ cursor: 'pointer', draggable: true })
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

  private createGrayScaleAsset(): void {
    console.log('has')
    const { width: w, height: h } = this
    console.log(w, h)
    const renderTexture = this.scene.make.renderTexture({ x: 0, y: 0, width: 2 * w, height: 2 * h }, false)
    renderTexture.draw(this, w, h)
    renderTexture.saveTexture('aa')
    renderTexture.destroy()
    const grayscalePipeline = (this.scene.game.renderer as WebGLRenderer).pipelines.get('Gray')
    this.grayScaleAsset = this.scene.add.sprite(0, 0, 'aa').setPipeline(grayscalePipeline)
    this.add(this.grayScaleAsset)
  }
}
