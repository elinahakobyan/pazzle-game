import Sprite = Phaser.GameObjects.Sprite
import { GameScreen } from '../scripts/screens/GameScreen'
import { Cell } from './Cell'
import { PieceContainer } from './PieceContainer'
import Pointer = Phaser.Input.Pointer
import CutJigsawImage from 'phaser3-rex-plugins/plugins/cutjigsawimage'
import GenerateFrames from 'phaser3-rex-plugins/plugins/actions/CutJigsawImage/generateframes/GenerateFrames'
import Image = Phaser.GameObjects.Image

export class BoardContainer extends Phaser.GameObjects.Container {
  public bkg: Phaser.GameObjects.Sprite
  private boardLayer: Phaser.GameObjects.Container
  private allowToPLace: boolean = false
  public hintBkg: Phaser.GameObjects.Sprite
  private cellsBkg: Phaser.GameObjects.Sprite
  public cells: Cell[] = []
  constructor(scene: Phaser.Scene, private config: { themeName: string; row: number; col: number }) {
    super(scene)
    this.initialize()
    // this.setSize(700, 500)
  }

  private initialize(): void {
    this.initBkg()
    this.initCells()
    this.initHintBkg()
    // this.drawBorders()
    // this.drawRowCols()
  }

  private initLayers(): void {
    this.boardLayer = this.scene.add.container()
    this.add(this.boardLayer)
  }

  private drawBorders(): void {
    const { x, y, displayWidth, displayHeight } = this.bkg
    const gr = this.scene.add.graphics()
    gr.lineStyle(2, 0x000000)
    gr.beginPath()
    gr.moveTo(x - displayWidth / 2, y - displayHeight / 2)
    gr.lineTo(x - displayWidth / 2 + displayWidth, y - displayHeight / 2)
    gr.lineTo(x - displayWidth / 2 + displayWidth, y - displayHeight / 2 + displayHeight)
    gr.lineTo(x - displayWidth / 2, y - displayHeight / 2 + displayHeight)
    gr.lineTo(x - displayWidth / 2, y - displayHeight / 2)
    gr.strokePath()
    this.add(gr)
  }

  private initCells(): void {
    this.generateCellsBkg()
    const images = CutJigsawImage(this.cellsBkg, {
      columns: this.config.col,
      rows: this.config.row,
      edgeWidth: 30,
      edgeHeight: 30
      // drawShapeCallback: this.drawShapeCallback,
      // edges: [
      //   [{ left: 0, right: 1, top: 0, bottom: 2 }],
      //   [{ left: 2, right: 0, top: 0, bottom: 1 }],
      //   [{ left: 0, right: 2, top: 1, bottom: 0 }],
      //   [{ left: 1, right: 0, top: 2, bottom: 0 }]
      // ]
    })
    console.log(images)
    images.forEach((img, i) => {
      const cell = new Cell(this.scene, i)
      cell.setSize(img.displayWidth, img.displayHeight)
      img.preFX?.addGlow(0xffffff, 2)
      cell.setPosition(img.x, img.y)
      this.add(cell)
      img.setPosition(0, 0)
      cell.setContext(img)
      this.cells.push(cell)
    })
  }

  private drawShapeCallback(graphics, width, height, edgeWidth, edgeHeight, edgeMode): void {
    console.log(edgeMode)
    // return this.cellsBkg
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

  private drawRowCols(): void {
    const { row, col } = this.config

    const { x, y, displayWidth, displayHeight } = this.hintBkg
    const cellW = displayWidth / col
    const cellH = displayHeight / row
    for (let i = 0; i <= row; i++) {
      const gr = this.scene.add.graphics()
      gr.lineStyle(2, 0x000000)
      gr.beginPath()
      gr.moveTo(x - displayWidth / 2, y - displayHeight / 2 + i * cellH)
      gr.lineTo(x - displayWidth / 2 + col * cellW, y - displayHeight / 2 + i * cellH)
      gr.strokePath()
      this.add(gr)
    }
    for (let i = 0; i <= col; i++) {
      const gr = this.scene.add.graphics()
      gr.lineStyle(2, 0x000000)
      gr.beginPath()
      gr.moveTo(x - displayWidth / 2 + i * cellW, y - displayHeight / 2)
      gr.lineTo(x - displayWidth / 2 + i * cellW, y - displayHeight / 2 + row * cellH)
      gr.strokePath()
      this.add(gr)
    }
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
