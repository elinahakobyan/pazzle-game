import Phaser from 'phaser'
import CutJigsawImage from 'phaser3-rex-plugins/plugins/cutjigsawimage'
import { BoardContainer } from '../Components/BoardContainer'
import { PieceContainer } from '../Components/PieceContainer'
import { EdgesConfig } from '../configs/EdgesConfig'
import Sprite = Phaser.GameObjects.Sprite
import Pointer = Phaser.Input.Pointer
import BasePlugin = Phaser.Plugins.BasePlugin
import { getHeaderBgNinePatchConfig, makeNinePatch } from '../configs/NinePatcheConfigs'
import { HeaderContainer } from '../Components/HeaderContainer'
import { GameConfig } from '../../typings/types'
import _ from 'lodash'

export class PuzzleScreen extends Phaser.GameObjects.Container {
  public gameLayer: Phaser.GameObjects.Container
  private boardContainer: BoardContainer
  private allowToPLace: boolean = false
  private placedPiecesCount: number = 0
  private gapY: number = 0
  private isGameOver: boolean = false
  private pieceContainers: PieceContainer[] = []
  private whiteScreen: Phaser.GameObjects.Sprite
  private shuffledPiecesPositions: {
    x: number
    y: number
  }[] = []
  constructor(
    scene: Phaser.Scene,
    private header: HeaderContainer,
    private config: GameConfig // private config: { themeName: string; row: number; col: number }
  ) {
    super(scene)
    this.initialize()
  }

  public setToInitialState(): void {
    this.pieceContainers.forEach(p => {
      p.setPosition(p.initialPos.x, p.initialPos.y)
    })
  }

  public showOrHideHint(): void {
    this.boardContainer.updateHintVisibility()
  }

  private initialize(): void {
    this.updateHeader()
    this.initBoardContainer()
    this.initPieces()
  }

  private updateHeader(): void {
    this.header.updateTitleVisibility(false)
    this.header.showHint()
  }

  private initPieces(): void {
    const { level } = this.config
    const row = parseInt(level.level)
    const col = parseInt(level.level)
    const images = CutJigsawImage(this.boardContainer.hintBkg, {
      columns: col,
      rows: row,
      edgeWidth: 30,
      edgeHeight: 30,
      edges: EdgesConfig[row]
    })
    const pieceW = this.boardContainer.bkg.displayWidth / row
    const pieceH = this.boardContainer.bkg.displayHeight / col
    images.forEach((img, i) => {
      img.setPosition(0, 0)
      const { tx: cellX, ty: cellY } = this.boardContainer.cells[i].getWorldTransformMatrix()
      const piece = new PieceContainer(this.scene, this.boardContainer.cells[i].id)
      piece.setContext(img)
      piece.setSize(pieceW, pieceH)
      piece.absolutePosition = { x: cellX, y: cellY }
      piece.context.preFX?.addGlow(0xffffff, 1)
      piece.setPosition(piece.absolutePosition.x, piece.absolutePosition.y)
      piece.setInteractive({ cursor: 'pointer', draggable: true })
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
    this.shufflePieces()
    // setTimeout(() => {
    this.showPiecePlacementAnim()
    // }, 1500)
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

  private showPiecePlacementAnim(): void {
    this.pieceContainers.forEach((piece, i) => {
      piece.showMovementAnim(piece.initialPos, i * 50)
    })
  }

  private shufflePieces(): void {
    const { level } = this.config
    const gap = 75
    const col = parseInt(level.level)
    const width = 1920 - (this.boardContainer.x + this.boardContainer.width / 2)
    const piecesWidth = this.pieceContainers[0].width * col + (col - 1) * gap
    const piecesHeight = this.pieceContainers[0].height * col + (col - 1) * gap

    const positions: {
      x: number
      y: number
    }[] = []
    this.pieceContainers.forEach((piece, i) => {
      if (i % col == 0) {
        this.gapY = i / col
      }
      const x = this.boardContainer.width + piece.absolutePosition.x + (i % col) * gap + (width - piecesWidth) / 2
      const y = piece.absolutePosition.y + this.gapY * gap - (piecesHeight - this.boardContainer.height) / 2
      positions.push({ x: x, y: y })
      // piece.setPosition(x, y)
    })

    this.shuffledPiecesPositions = _.shuffle(positions)
    console.log(positions, this.shuffledPiecesPositions)
    this.pieceContainers.forEach((piece, i) => {
      const pos = this.shuffledPiecesPositions[i]
      piece.initialPos = { x: pos.x, y: pos.y }
      // piece.setPosition(pos.x, pos.y)
    })

    // _.shuffle(this.piecesPositions)
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
    this.bringToTop(piece)
    piece.setPosition(pointer.x, pointer.y)
  }

  private initBoardContainer(): void {
    const board = new BoardContainer(this.scene, this.config)
    board.setPosition(1920 * 0.5 - 450, (1080 + this.header.height - 20) * 0.5)
    this.add((this.boardContainer = board))
  }

  private initLayers(): void {
    this.gameLayer = this.scene.add.container()
    this.add(this.gameLayer)
  }
}
