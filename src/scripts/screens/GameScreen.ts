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
  constructor(scene: Phaser.Scene) {
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
    const images = CutJigsawImage(this.boardContainer.bkg, {
      columns: 2,
      rows: 2,
      edgeWidth: 20
      // drawShapeCallback: this.drawShapeCallback
    })
    // const images = GridCutImage(this.boardContainer.bkg, 2, 2)
    console.log(images)
    images.forEach((img, i) => {
      img.setPosition(0, 0)
      const { tx, ty } = this.boardContainer.getWorldTransformMatrix()
      const { x, y } = this.boardContainer.cells[i].getPosition()
      //test
      const gr = this.scene.add.graphics()
      gr.fillStyle(0xfff000)
      gr.fillCircle(this.boardContainer.x + x, this.boardContainer.y + y, 5)
      this.add(gr)
      //
      const piece = new PieceContainer(this.scene, this.boardContainer.cells[i].id)
      piece.setContext(img)
      piece.initialPos = { x: tx + piece.width / 2 + x + i * 10 + 500, y: ty + piece.height / 2 + y }
      piece.absolutePosition = { x: x + tx + piece.width / 2, y: y + ty }
      piece.context.preFX?.setPadding(1)
      piece.context.preFX?.addGlow(0xff0000, 2, 0)
      // piece.absolutePosition = { x: tx + piece.width / 2 + x, y: ty + piece.height / 2 + y }
      piece.setPosition(piece.absolutePosition.x, piece.absolutePosition.y)
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
    console.log('drawShapeCallback')
    const centerX = width / 2,
      centerY = height / 2

    graphics.clear()
    graphics.beginPath()

    graphics.moveTo(edgeWidth, edgeHeight)

    switch (edgeMode.top) {
      case 1:
        graphics.lineTo(centerX - edgeHeight, edgeHeight)
        graphics.lineTo(centerX, 0)
        graphics.lineTo(centerX + edgeHeight, edgeHeight)
        break
      case 2:
        graphics.lineTo(centerX - edgeHeight, edgeHeight)
        graphics.lineTo(centerX, edgeHeight + edgeHeight)
        graphics.lineTo(centerX + edgeHeight, edgeHeight)
        break
    }
    graphics.lineTo(width - edgeWidth, edgeHeight)
    switch (edgeMode.right) {
      case 1:
        graphics.lineTo(width - edgeWidth, centerY - edgeWidth)
        graphics.lineTo(width, centerY)
        graphics.lineTo(width - edgeWidth, centerY + edgeWidth)
        break
      case 2:
        graphics.lineTo(width - edgeWidth, centerY - edgeWidth)
        graphics.lineTo(width - edgeWidth - edgeWidth, centerY)
        graphics.lineTo(width - edgeWidth, centerY + edgeWidth)
        break
    }
    graphics.lineTo(width - edgeWidth, height - edgeHeight)
    switch (edgeMode.bottom) {
      case 1:
        graphics.lineTo(centerX + edgeHeight, height - edgeHeight)
        graphics.lineTo(centerX, height)
        graphics.lineTo(centerX - edgeHeight, height - edgeHeight)
        break
      case 2:
        graphics.lineTo(centerX + edgeHeight, height - edgeHeight)
        graphics.lineTo(centerX, height - edgeHeight - edgeHeight)
        graphics.lineTo(centerX - edgeHeight, height - edgeHeight)
        break
    }
    graphics.lineTo(edgeWidth, height - edgeHeight)

    switch (edgeMode.left) {
      case 1:
        graphics.lineTo(edgeWidth, centerY + edgeWidth)
        graphics.lineTo(0, centerY)
        graphics.lineTo(edgeWidth, centerY - edgeWidth)
        break
      case 2:
        graphics.lineTo(edgeWidth, centerY + edgeWidth)
        graphics.lineTo(edgeWidth + edgeWidth, centerY)
        graphics.lineTo(edgeWidth, centerY - edgeWidth)
        break
    }
    graphics.lineTo(edgeWidth, edgeHeight)

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
      const { tx, ty } = this.boardContainer.getLocalTransformMatrix()
      const cellX = cell.getPosition().x + tx
      const cellY = cell.getPosition().y + ty
      const cellW = cell.getSize().width
      const cellH = cell.getSize().height
      if (
        this.isIntoCell(piece.x, cellX, cellX + cellW) &&
        this.isIntoCell(piece.y, cellY, cellY + cellH) &&
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
    const board = new BoardContainer(this.scene)
    board.setInteractive({ cursor: 'pointer', draggable: true })
    board.setPosition(window.innerWidth * 0.5 - 250, window.innerHeight * 0.5)
    this.add((this.boardContainer = board))
  }

  private initLayers(): void {
    this.gameLayer = this.scene.add.container()
    this.add(this.gameLayer)
  }
}
