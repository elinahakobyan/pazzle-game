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

export class PuzzleScreen extends Phaser.GameObjects.Container {
  public gameLayer: Phaser.GameObjects.Container
  private boardContainer: BoardContainer
  private allowToPLace: boolean = false
  private placedPiecesCount: number = 0
  private isGameOver: boolean = false
  private pieceContainers: PieceContainer[] = []
  private whiteScreen: Phaser.GameObjects.Sprite
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
      piece.initialPos = { x: cellX + i * 10 + 700, y: cellY }
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

  private shufflePieces(): void {
    const gap = 50
    console.log(this.pieceContainers[0].height, this.pieceContainers[0].width)
    const width = this.height - this.pieceContainers[0].x + this.boardContainer.width
    this.pieceContainers.forEach((piece, i) => {
      // const gr = this.scene.add.graphics()
      // gr.fillStyle(0x000fff)
      // gr.fillCircle(this.pieceContainers[i].absolutePosition.x, this.pieceContainers[i].absolutePosition.y, 10)
      // this.add(gr)
      const prevPiece = this.pieceContainers[i - 1]
      // piece.setPosition(prevPiece?prevPiece.x+prevPiece.height/2)
      // piece.setPosition(
      //   piece.absolutePosition.x < this.boardContainer.x
      //     ? this.boardContainer.width + piece.x + 2 * gap
      //     : piece.absolutePosition.x == this.boardContainer.x
      //     ? this.boardContainer.width + piece.x + 3 * gap
      //     : this.boardContainer.width + piece.x + 4 * gap,
      //   piece.absolutePosition.y < this.boardContainer.y
      //     ? piece.y - gap
      //     : piece.absolutePosition.y == this.boardContainer.y
      //     ? piece.y
      //     : piece.y + gap
      // )
      // piece.absolutePosition.x < this.boardContainer.x
      //     ? console.log('poqr')
      //     : (piece.absolutePosition.x == this.boardContainer.x
      //         ? console.log('havasr')
      //         : console.log('mec'))
      console.log(piece.x, piece.y)
    })
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
