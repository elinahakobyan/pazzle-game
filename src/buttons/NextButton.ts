import { getNextBtnNinePatchConfig, makeNinePatch } from '../configs/NinePatcheConfigs'
import WebGLRenderer = Phaser.Renderer.WebGL.WebGLRenderer
import Tween = Phaser.Tweens.Tween

export class NextButton extends Phaser.GameObjects.Container {
    private grayScaleAsset: Phaser.GameObjects.Sprite
    private text: Phaser.GameObjects.Text
    constructor(scene: Phaser.Scene, private config: { text: string; frame: string }) {
        super(scene)
        this.initialise()
    }

    private initialise(): void {
        this.initBkg()
        this.initText()
        this.initIcon()
        // this.createGrayScaleAsset()
    }

    public scaleUpTween(): void {
        this.scene.add.tween({
            targets: this,
            duration: 150,
            scale: 1,
            complete: () => {
                this.emit('btnClicked')
            }
        })
    }
    public scaleDownTween(): Tween {
        return this.scene.add.tween({
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
        const btn = this.scene.add.sprite(0, 0, 'next-btn')
        this.add(btn)
        this.setSize(btn.width + 4, btn.height + 6)
        this.setInteractive({ cursor: 'pointer', draggable: true })

        // const btn = makeNinePatch(this.scene, getNextBtnNinePatchConfig(220, 50))
        // const gr = this.scene.add.graphics()
        // gr.fillStyle(0xffffff)
        // gr.fillRoundedRect(-(btn.width + 4) / 2, -(btn.height + 6) / 2, btn.width + 4, btn.height + 6, 12)
        // this.add(gr)
        // this.add(btn)
        // this.setInteractive({ cursor: 'pointer', draggable: true })
    }

    private initIcon(): void {
        const icon = this.scene.add.sprite(
            this.text.x + this.text.width / 2 + 20,
            this.text.y + 2,
            `${this.config.frame}-icon`
        )
        this.add(icon)
    }
    private initText(): void {
        const label = this.config.text == 'NEXT' ? 'Հաջորդը' : 'Խաղալ'

        const text = this.scene.add.text(-10, -8, label, {
            color: '#ffffff',
            fontSize: '32px',
            fontFamily: 'Arti Regular'
        })
        text.setOrigin(0.5)
        this.add((this.text = text))
    }

    private createGrayScaleAsset(): void {
        const { width: w, height: h } = this
        const renderTexture = this.scene.make.renderTexture({ x: 0, y: 0, width: 2 * w, height: 2 * h }, false)
        renderTexture.draw(this, w, h)
        renderTexture.saveTexture('aa')
        renderTexture.destroy()
        const grayscalePipeline = (this.scene.game.renderer as WebGLRenderer).pipelines.get('Gray')
        this.grayScaleAsset = this.scene.add.sprite(0, 0, 'aa').setPipeline(grayscalePipeline)
        this.add(this.grayScaleAsset)
    }
}
