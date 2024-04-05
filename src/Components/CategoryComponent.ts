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
        console.log(content, category)
        this.categoryConfig = content
        this.frame.setTexture(`${content.frame}`)
        this.frame.setFrame('')

        this.label.text = content.name
        // this.initBorder()
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
        // const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
        // gr.fillStyle(0xffffff)
        // // gr.fillStyle(0xf5ebe3)
        // gr.fillRoundedRect(0, 0, 250, 350, 20)
        // gr.generateTexture('categoryBg', 250, 350)
        // gr.destroy()
        const bkg = this.scene.add.sprite(0, 0, 'categoryBg')
        // bkg.alpha = 0.15
        this.add(bkg)
        this.setSize(bkg.width, bkg.height)

        // const gra = this.scene.make.graphics({ x: 0, y: 0 }, false)
        // gra.fillStyle(0xfff000)
        // gra.fillCircle(0, 0, 5)
        // this.add(gra)
    }
    private initFrame(): void {
        const frame = this.scene.add.sprite(0, -30, '', '')
        frame.setScale(0.35)
        this.add((this.frame = frame))
    }

    private initName(): void {
        const label = this.scene.add.text(0, 130, this.categoryConfig ? this.categoryConfig.name : 'AA', {
            color: '#ffffff',
            fontSize: '24px',
            fontFamily: 'Arti Regular',
            align: 'center',
            fontStyle: 'bold',
            wordWrap: { width: 250, useAdvancedWrap: true }
        })
        label.setOrigin(0.5)
        this.add((this.label = label))
    }

    private attachListeners(): void {
        this.setInteractive({ cursor: 'pointer', draggable: true })
    }
}
