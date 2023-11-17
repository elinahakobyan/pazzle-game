import Phaser from 'phaser'
import GridCutImage from 'phaser3-rex-plugins/plugins/actions/GridCutImage'
import { BoardContainer } from '../../Components/BoardContainer'
import { PieceContainer } from '../../Components/PieceContainer'
import Sprite = Phaser.GameObjects.Sprite
import Pointer = Phaser.Input.Pointer
import CutJigsawImagePlugin from 'phaser3-rex-plugins/plugins/cutjigsawimage-plugin'
import BasePlugin = Phaser.Plugins.BasePlugin
import CutJigsawImage from 'phaser3-rex-plugins/plugins/cutjigsawimage'

export class GameScreen extends Phaser.GameObjects.Container {
  public gameLayer: Phaser.GameObjects.Container
  private boardContainer: BoardContainer
  private allowToPLace: boolean = false
  private placedPiecesCount: number = 0
  private isGameOver: boolean = false
  private pieceContainers: PieceContainer[] = []
  constructor(scene: Phaser.Scene, private config: { themeName: string; row: number; col: number }) {
    super(scene)
    this.initialize()
  }

  private initialize(): void {
    // this.initLayers()
    // const sprite = this.scene.add.sprite(0, 0, 'bkg')
    // sprite.setPosition(sprite.width / 2, sprite.height / 2)
    // this.add(sprite)
    this.initBoardContainer()
    this.initPieces()

    // this.boardContainer.cells.forEach(cell => {
    //   const { tx, ty } = this.boardContainer.getLocalTransformMatrix()
    //   const cellX = cell.getPosition().x + tx
    //   const cellY = cell.getPosition().y + ty
    //   const cellW = cell.getSize().width
    //   const cellH = cell.getSize().height
    //
    //   const gr = this.scene.add.graphics()
    //   gr.fillStyle(0x000fff, 0.2)
    //   gr.fillRect(cellX, cellY, cellW, cellH)
    //   this.add(gr)
    // })
    // const row = 4
    // const col = 4
    // const sprite = new Sprite(this.scene, window.innerWidth * 0.5, window.innerHeight * 0.5, 'phaser-logo')
    // sprite.setAlpha(0.5)
    // this.add(sprite)
    // const images = GridCutImage(sprite, row, col)
    // console.log(images)
    // const arr2d = _.chunk(images, row)
    // console.log(arr2d)
    // images.forEach((img, i) => {
    //   img.x += i * 5
    //   // img.y += i * 10
    //   img.setInteractive({ cursor: 'pointer', draggable: true })
    //   img.on('drag', (pointer: Phaser.Input.Pointer) => {
    //     img.setPosition(pointer.x, pointer.y)
    //   })'
    // })
  }

  private initPieces(): void {
    const { row, col } = this.config
    const images = CutJigsawImage(this.boardContainer.hintBkg, {
      columns: col,
      rows: row,
      edgeWidth: 30,
      edgeHeight: 30,
      drawShapeCallback: this.drawShapeCallback,
      edges: [
        [{ left: 0, right: 1, top: 0, bottom: 2 }],
        [{ left: 2, right: 0, top: 0, bottom: 1 }],
        [{ left: 1, right: 0, top: 2, bottom: 0 }],
        [{ left: 0, right: 2, top: 1, bottom: 0 }],
        [{ left: 1, right: 0, top: 2, bottom: 0 }],
        [{ left: 0, right: 2, top: 1, bottom: 0 }]
      ]
    })
    const pieceW = this.boardContainer.bkg.displayWidth / row
    const pieceH = this.boardContainer.bkg.displayHeight / col
    // const images = GridCutImage(this.boardContainer.bkg, 2, 2)
    images.forEach((img, i) => {
      img.setPosition(0, 0)
      const { tx: cellX, ty: cellY } = this.boardContainer.cells[i].getWorldTransformMatrix()
      //test
      const gr = this.scene.add.graphics()
      gr.fillStyle(0xfff000)
      gr.fillCircle(cellX, cellY, 5)
      this.add(gr)
      //
      const piece = new PieceContainer(this.scene, this.boardContainer.cells[i].id)
      // const piece = new PieceContainer(this.scene, this.boardContainer.cells[i].id)
      piece.setContext(img)
      piece.setSize(pieceW, pieceH)
      piece.initialPos = { x: cellX + i * 10 + 700, y: cellY }
      piece.absolutePosition = { x: cellX, y: cellY }
      // piece.context.preFX?.setPadding(1)
      piece.context.preFX?.addGlow(0xffffff, 1)
      piece.setPosition(piece.initialPos.x, piece.initialPos.y)
      piece.setInteractive({ cursor: 'pointer', draggable: true })

      const gra = this.scene.add.graphics()
      gra.fillStyle(0x000fff)
      gra.fillCircle(0, 0, 5)
      piece.add(gra)

      piece.on('drag', pointer => {
        this.dragPieceContainer(pointer, piece)
        this.checkForPlace(piece)
      })
      piece.on('dragend', pointer => {
        console.log(this.allowToPLace, 'dragend')
        this.onDragend(piece)
      })
      this.add(piece)
      this.pieceContainers.push(piece)
    })
  }

  private drawShapeCallback(graphics, width, height, edgeWidth, edgeHeight, edgeMode): void {
    const DegToRad = Phaser.Math.DegToRad
    const RAD0 = DegToRad(0)
    const RAD90 = DegToRad(90)
    const RAD180 = DegToRad(180)
    const RAD270 = DegToRad(270)
    const RAD360 = DegToRad(360)

    const centerX = width / 2,
      centerY = height / 2
    const leftX = edgeWidth,
      rightX = width - edgeWidth,
      topY = edgeHeight,
      bottomY = height - edgeHeight

    graphics.clear()
    graphics.beginPath()

    graphics.moveTo(leftX, topY)
    console.log(edgeMode)
    if (!edgeMode) return

    switch (edgeMode.top) {
      case 1:
        graphics.lineTo(centerX - edgeHeight, topY)
        graphics.arc(centerX, topY, edgeHeight, RAD180, RAD360, false)
        break
      case 2:
        graphics.lineTo(centerX - edgeHeight, topY)
        graphics.arc(centerX, topY, edgeHeight, RAD180, RAD360, true)
        break
    }
    graphics.lineTo(rightX, topY)

    switch (edgeMode.right) {
      case 1:
        graphics.arc(rightX, centerY, edgeWidth, RAD270, RAD90, false)
        break
      case 2:
        graphics.arc(rightX, centerY, edgeWidth, RAD270, RAD90, true)
        break
    }
    graphics.lineTo(rightX, bottomY)

    switch (edgeMode.bottom) {
      case 1:
        graphics.arc(centerX, bottomY, edgeHeight, RAD0, RAD180, false)
        break
      case 2:
        graphics.arc(centerX, bottomY, edgeHeight, RAD0, RAD180, true)
        break
    }
    graphics.lineTo(leftX, bottomY)

    switch (edgeMode.left) {
      case 1:
        graphics.arc(leftX, centerY, edgeWidth, RAD90, RAD270, false)
        break
      case 2:
        graphics.arc(leftX, centerY, edgeWidth, RAD90, RAD270, true)
        break
    }
    graphics.lineTo(leftX, topY)

    graphics.closePath()
    graphics.fillPath()
  }

  private onDragend(piece: PieceContainer): void {
    if (this.allowToPLace) {
      piece.setPosition(piece.absolutePosition.x, piece.absolutePosition.y)
      this.placedPiecesCount += 1
      this.allowToPLace = false
      this.checkForGameOver()
    } else {
      piece.setPosition(piece.initialPos.x, piece.initialPos.y)
    }
  }

  private checkForGameOver(): void {
    if (this.placedPiecesCount === this.pieceContainers.length) {
      this.isGameOver = true
      console.warn('GAMEOVER')
    }
  }

  private checkForPlace(piece: PieceContainer): void {
    this.boardContainer.cells.find(cell => {
      const { tx, ty } = cell.getWorldTransformMatrix()
      if (
        this.isIntoCell(piece.x, tx - cell.width / 2, tx + cell.width / 2) &&
        this.isIntoCell(piece.y, ty - cell.height / 2, ty + cell.height / 2) &&
        cell.id === piece.id
      ) {
        this.allowToPLace = true
      } else {
        this.allowToPLace = false
      }
      return this.allowToPLace
    })
  }

  private isIntoCell(p: number, min: number, max: number): boolean {
    return p < Math.max(min, max) && p > Math.min(min, max)
  }

  private dragPieceContainer(pointer: Pointer, piece: PieceContainer): void {
    piece.setPosition(pointer.x, pointer.y)
  }

  private initBoardContainer(): void {
    const board = new BoardContainer(this.scene, this.config)
    // board.setInteractive({ cursor: 'pointer', draggable: true })
    board.setPosition(window.innerWidth * 0.5 - 250, window.innerHeight * 0.5)
    this.add((this.boardContainer = board))
  }

  private initLayers(): void {
    this.gameLayer = this.scene.add.container()
    this.add(this.gameLayer)
  }
}
