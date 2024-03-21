import CutJigsawImage from 'phaser3-rex-plugins/plugins/cutjigsawimage'
import { GameConfig } from '../../typings/types'
import { EdgesConfig } from '../configs/EdgesConfig'
import { CellContainer } from './CellContainer'

export class BoardContainer extends Phaser.GameObjects.Container {
    public bkg: Phaser.GameObjects.Sprite
    private boardLayer: Phaser.GameObjects.Container
    private allowToPLace: boolean = false
    public hintBkg: Phaser.GameObjects.Sprite
    private cellsBkg: Phaser.GameObjects.Sprite
    public cells: CellContainer[] = []
    constructor(scene: Phaser.Scene, private config: GameConfig) {
        super(scene)
        this.initialize()
    }

    public updateHintVisibility(): void {
        this.hintBkg.visible = !this.hintBkg.visible
    }

    private initialize(): void {
        this.initBkg()
        this.initCells()
        this.initHintBkg()
    }

    private initCells(): void {
        this.generateCellsBkg()
        const { level } = this.config
        const row = parseInt(level.level)
        const col = parseInt(level.level)
        const images = CutJigsawImage(this.cellsBkg, {
            columns: col,
            rows: row,
            edgeWidth: 30,
            edgeHeight: 30,
            edges: EdgesConfig[row]
        })
        images.forEach((img, i) => {
            const cell = new CellContainer(this.scene, i)
            cell.setSize(img.displayWidth, img.displayHeight)
            img.preFX?.addGlow(0xffffff, 2)
            cell.setPosition(img.x, img.y)
            this.add(cell)
            img.setPosition(0, 0)
            cell.setContext(img)
            this.cells.push(cell)
        })
    }

    private generateCellsBkg(): void {
        const w = 700
        const h = 535
        const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
        gr.fillStyle(0xffe8cd)
        gr.fillRect(0, 0, w, h)
        gr.generateTexture('cellsBkg', w, h)
        gr.destroy()
        this.cellsBkg = this.scene.add.sprite(0, 0, 'cellsBkg')
        // this.cellsBkg.setAlpha(0)
        this.add(this.cellsBkg)
    }

    private initBkg(): void {
        const boardW = 730
        const boardH = 561
        const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
        gr.fillStyle(0xffffff)
        gr.fillRoundedRect(0, 0, boardW, boardH, 20)
        gr.generateTexture('boardBkg', boardW, boardH)
        gr.destroy()

        this.bkg = this.scene.add.sprite(0, 0, 'boardBkg')
        this.setSize(this.bkg.width, this.bkg.height)
        this.add(this.bkg)
    }

    private initHintBkg(): void {
        const { category, subcategory } = this.config
        this.hintBkg = this.scene.add.sprite(0, 0, `${subcategory.frame}`, '')
        // this.hintBkg = this.scene.add.sprite(0, 0, category.name.toLocaleLowerCase(), `${subcategory.frame + '.png'}`)
        this.hintBkg.alpha = 0.3
        this.hintBkg.setVisible(false)
        this.add(this.hintBkg)
    }
}
