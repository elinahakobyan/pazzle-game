import Sprite = Phaser.GameObjects.Sprite
import GridCutImage from 'phaser3-rex-plugins/plugins/actions/GridCutImage'
import { Cell } from './Cell'
import { PieceContainer } from './PieceContainer'
import { GameScreen } from '../scripts/screens/GameScreen'

export class BoardContainer extends Phaser.GameObjects.Container {
  private bkg: Phaser.GameObjects.Sprite
  readonly rows: number
  readonly cols: number
  private cells: Cell[] = []
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.rows = 2
    this.cols = 2
    this.initialize()
    this.setSize(this.bkg.displayWidth, this.bkg.displayHeight)
  }

  private initialize(): void {
    this.initBkg()
    // this.drawBorders()
    this.initCells()
    this.initPieces()
    this.drawRowCols()
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
    const { x, y, displayWidth, displayHeight } = this.bkg
    const cellW = displayWidth / this.cols
    const cellH = displayHeight / this.rows
    for (let i = 0; i <= this.rows - 1; i++) {
      for (let j = 0; j <= this.cols - 1; j++) {
        const cell = new Cell(this.scene, j, i, {
          x: x - displayWidth / 2 + j * cellW,
          y: y - displayHeight / 2 + i * cellH,
          width: cellW,
          height: cellH
        })
        // cell.input.
        this.cells.push(cell)
      }
    }
  }

  private initPieces(): void {
    const images = GridCutImage(this.bkg, this.cols, this.rows)
    images.forEach((img, i) => {
      const { tx, ty } = this.getWorldTransformMatrix()
      img.setPosition(tx, ty)
      const cellX = this.cells[i].getPosition().x
      const cellY = this.cells[i].getPosition().y

      //test
      const gr = this.scene.add.graphics()
      gr.fillStyle(0xfff000)
      gr.fillCircle(cellX, cellY, 5)
      this.add(gr)
      //
      const piece = new PieceContainer(this.scene, this.cells[i].id)
      piece.setContext(img)
      piece.setPosition(cellX + piece.width / 2, cellY + piece.height / 2)
      piece.setInteractive({ cursor: 'pointer', draggable: true })

      piece.on('drag', pointer => {
        ;(this.parentContainer as GameScreen).gameLayer.add(piece)
        piece.setPosition(pointer.x, pointer.y)
      })
      this.add(piece)
    })
  }

  private drawRowCols(): void {
    const { x, y, displayWidth, displayHeight } = this.bkg
    const cellW = displayWidth / this.cols
    const cellH = displayHeight / this.rows
    for (let i = 0; i <= this.rows; i++) {
      const gr = this.scene.add.graphics()
      gr.lineStyle(2, 0x000000)
      gr.beginPath()
      gr.moveTo(x - displayWidth / 2, y - displayHeight / 2 + i * cellH)
      gr.lineTo(x - displayWidth / 2 + this.cols * cellW, y - displayHeight / 2 + i * cellH)
      gr.strokePath()
      this.add(gr)
    }
    for (let i = 0; i <= this.cols; i++) {
      const gr = this.scene.add.graphics()
      gr.lineStyle(2, 0x000000)
      gr.beginPath()
      gr.moveTo(x - displayWidth / 2 + i * cellW, y - displayHeight / 2)
      gr.lineTo(x - displayWidth / 2 + i * cellW, y - displayHeight / 2 + this.rows * cellH)
      gr.strokePath()
      this.add(gr)
    }
  }

  private initBkg(): void {
    this.bkg = new Sprite(this.scene, 0, 0, 'phaser-logo')
    this.bkg.setScale(1.5)
    this.bkg.setAlpha(0.5)
    this.add(this.bkg)
  }
}
