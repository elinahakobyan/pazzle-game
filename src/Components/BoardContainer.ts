import Sprite = Phaser.GameObjects.Sprite
import { GameScreen } from '../scripts/screens/GameScreen'
import { Cell } from './Cell'
import { PieceContainer } from './PieceContainer'
import Pointer = Phaser.Input.Pointer

export class BoardContainer extends Phaser.GameObjects.Container {
  public bkg: Phaser.GameObjects.Sprite
  readonly rows: number
  readonly cols: number
  public cells: Cell[] = []
  private boardLayer: Phaser.GameObjects.Container
  private allowToPLace: boolean = false
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.rows = 4
    this.cols = 4
    this.initialize()
    this.setSize(this.bkg.displayWidth, this.bkg.displayHeight)
  }

  private initialize(): void {
    this.initBkg()
    // this.drawBorders()
    this.initCells()
    // this.initPieces()
    // this.initLayers()
    this.drawRowCols()
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
        this.cells.push(cell)

        // const gr = this.scene.add.graphics()
        // gr.fillStyle(0x000fff, 0.5)
        // gr.fillRect(x - displayWidth / 2 + j * cellW, y - displayHeight / 2 + i * cellH, cellW, cellH)
        // this.add(gr)
      }
    }
  }

  private initPieces(): void {
    // const images = GridCutImage(this.bkg, this.cols, this.rows)
    // images.forEach((img, i) => {
    //   const { tx, ty } = this.getWorldTransformMatrix()
    //   // img.setPosition(tx, ty)
    //   const { x, y } = this.cells[i].getPosition()
    //   //test
    //   const gr = this.scene.add.graphics()
    //   gr.fillStyle(0xfff000)
    //   gr.fillCircle(x, y, 5)
    //   this.add(gr)
    //   //
    //   const piece = new PieceContainer(this.scene, this.cells[i].id)
    //   piece.setContext(img)
    //   piece.absolutePosition = { x: x + piece.width / 2, y: y + piece.height / 2 }
    //   piece.setPosition(x + piece.width / 2, y + piece.height / 2)
    //   // piece.setPosition(x + piece.width / 2 + 500 + i * 10, y + piece.height / 2)
    //   piece.setInteractive({ cursor: 'pointer', draggable: true })
    //   piece.on('drag', pointer => {
    //     // this.dragPieceContainer(pointer, piece)
    //     // this.checkForPlace(piece)
    //   })
    //   piece.on('dragend', pointer => {
    //     // console.log(this.allowToPLace, 'dragend')
    //     // if (this.allowToPLace) {
    //     //   const { tx, ty } = this.getLocalTransformMatrix()
    //     //   piece.setPosition(piece.absolutePosition.x + tx, piece.absolutePosition.y + ty)
    //     //   this.allowToPLace = false
    //     // } else {
    //     // }
    //   })
    //   console.log(this.parentContainer as GameScreen)
    //   ;(this.parentContainer as GameScreen).gameLayer.add(piece)
    //   // this.add(piece)
    // })
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
