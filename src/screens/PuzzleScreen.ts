import _ from 'lodash'
import Phaser from 'phaser'
import CutJigsawImage from 'phaser3-rex-plugins/plugins/cutjigsawimage'
import { GameConfig } from '../../typings/types'
import { BoardContainer } from '../Components/BoardContainer'
import { HeaderContainer } from '../Components/HeaderContainer'
import { PieceContainer } from '../Components/PieceContainer'
import { EdgesConfig } from '../configs/EdgesConfig'
import Sprite = Phaser.GameObjects.Sprite
import Pointer = Phaser.Input.Pointer
import BasePlugin = Phaser.Plugins.BasePlugin

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
  glow: Phaser.FX.Glow | undefined
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
    this.bringToTop(this.header)
  }

  private initPieces(): void {
    const { level } = this.config
    const row = parseInt(level.level)
    const col = parseInt(level.level)
    const s = this.scene.add.sprite(0, 0, 'car')
    s.setVisible(false)
    this.add(s)

    const images = CutJigsawImage(s, {
      // piecesKey: `${this.boardContainer.hintBkg.texture.key}/${this.boardContainer.hintBkg.frame.name}`,
      columns: col,
      rows: row,
      edgeWidth: 30,
      edgeHeight: 30,
      edges: EdgesConfig[row]
    })
    const pieceW = this.boardContainer.bkg.displayWidth / row
    const pieceH = this.boardContainer.bkg.displayHeight / col
    images.forEach((img, i) => {
      console.log(img)

      img.setPosition(0, 0)
      const { tx: cellX, ty: cellY } = this.boardContainer.cells[i].getWorldTransformMatrix()
      const piece = new PieceContainer(this.scene, this.boardContainer.cells[i].id)
      piece.setContext(img)
      piece.setSize(pieceW, pieceH)
      piece.absolutePosition = { x: cellX, y: cellY }
      this.glow = piece.context.preFX?.addGlow(0xffffff, 1)
      piece.setPosition(piece.absolutePosition.x, piece.absolutePosition.y)
      piece.setInteractive({ cursor: 'pointer', draggable: true })
      piece.on('drag', pointer => {
        this.dragPieceContainer(pointer, piece)
        this.checkForPlace(piece)
      })
      piece.on('dragend', pointer => {
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
      // this.placedPiecesCount -= 1
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
      this.removeListeners()
      this.hideHintIcon()
      this.showPiecesAnimation()
      this.showGameOverText()
      console.warn('GAMEOVER')
    }
  }

  private removeListeners(): void {
    this.removeAllListeners()
    this.pieceContainers.forEach(piece => {
      piece.disableInteractive()
    })
  }

  private showPiecesAnimation(): void {
    this.pieceContainers.forEach((piece, i) => {
      // this.glow && piece.context.preFX?.remove(this.glow)≥
      this.scene.add.tween({
        targets: piece,
        scale: 1.1,
        duration: 300,
        yoyo: true,
        ease: Phaser.Math.Easing.Sine.In,
        delay: i * 130,
        start: () => {
          // this.bringToTop(piece)
        }
      })
      this.scene.add.tween({
        targets: piece,
        alpha: 0,
        duration: 350,
        delay: this.pieceContainers.length * 150,
        ease: Phaser.Math.Easing.Cubic.In
      })
    })
    this.scene.add.tween({
      targets: this.boardContainer.hintBkg,
      alpha: 1,
      duration: 350,
      // delay:this.pieceContainers.length*160+250,
      complete: () => {
        this.boardContainer.hintBkg.alpha = 1
      },
      start: () => {
        this.boardContainer.hintBkg.setVisible(true)
        this.boardContainer.hintBkg.alpha = 0
      },
      ease: Phaser.Math.Easing.Cubic.Out
    })
  }

  private hideHintIcon(): void {
    this.header.hideHint()
  }

  private showGameOverText(): void {
    const x = this.boardContainer.x + this.boardContainer.width + 150
    const y = this.boardContainer.y - this.boardContainer.height / 2 + 70
    const header = this.scene.add.text(x, y, 'AAAAAA', {
      color: '#ffffff',
      // color:'#c7a496',
      fontSize: '72px'
    })
    header.setOrigin(0.5)
    header.alpha = 0
    this.add(header)

    const text = this.scene.add.text(
      x,
      y + 250,
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
      {
        color: '#ffffff',
        // color:'#c7a496',
        fontSize: '24px',
        align: 'center',
        wordWrap: { width: 600, useAdvancedWrap: true }
      }
    )
    text.alpha = 0
    text.setOrigin(0.5)
    this.add(text)

    this.scene.add.tween({
      targets: [header, text],
      alpha: 1,
      duration: 300,
      delay: this.pieceContainers.length * 210,
      ease: Phaser.Math.Easing.Cubic.InOut
    })

    // this.scene.add.tween({
    //   targets:[header,text],
    //   scale:1.1,
    //   yoyo:true,
    //   duration:300,
    //   delay:this.pieceContainers.length*200,
    //   ease: Phaser.Math.Easing.Cubic.Out,
    // })
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
