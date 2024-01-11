import CutJigsawImage from 'phaser3-rex-plugins/plugins/cutjigsawimage'
import { EdgesConfig } from '../configs/EdgesConfig'
import { CellContainer } from './CellContainer'
import { GameConfig } from '../../typings/types'

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
    const w = 660
    const h = 500
    const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
    gr.fillStyle(0xffe8cd)
    gr.fillRect(0, 0, w, h)
    gr.generateTexture('cellsBkg', w, h)
    gr.destroy()
    this.cellsBkg = this.scene.add.sprite(0, 0, 'cellsBkg')
    this.cellsBkg.setAlpha(0)
    this.add(this.cellsBkg)
  }

  private initBkg(): void {
    const boardW = 680
    const boardH = 518
    const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
    gr.fillStyle(0xffffff)
    gr.fillRoundedRect(0, 0, boardW, boardH, 20)
    gr.generateTexture('boardBkg', boardW, boardH)
    gr.destroy()

    this.bkg = this.scene.add.sprite(0, 0, 'boardBkg')
    this.add(this.bkg)
  }

  private initHintBkg(): void {
    this.hintBkg = this.scene.add.sprite(0, 0, 'car')
    console.log(this.hintBkg.width, this.hintBkg.height)
    this.updateHintState(true)
    this.add(this.hintBkg)
  }

  private updateHintState(state: boolean): void {
    state ? this.hintBkg.setAlpha(0.3) : this.hintBkg.setAlpha(0)
  }
}
