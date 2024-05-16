import Container = Phaser.GameObjects.Container
import { Category } from '../../typings/types'

export class CategoryComponent extends Container {
    private frame: Phaser.GameObjects.Sprite
    private label: Phaser.GameObjects.Text
    private frameBorder: Phaser.GameObjects.Sprite

    public categoryConfig:
        | Category
        | {
              name: string
              id?: string
              frame: string
              description?: string
          }

    constructor(scene: Phaser.Scene) {
        super(scene)
        this.initialise()
    }

    public setContent(content, category: string): void {
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
        this.initName()
        this.attachListeners()
    }

    private initBkg(): void {
        const bkg = this.scene.add.sprite(0, 0, 'categoryBg')
        this.add(bkg)
        this.setSize(bkg.width, bkg.height)
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
