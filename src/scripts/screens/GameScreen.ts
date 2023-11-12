import Phaser from 'phaser'
import GridCutImage from 'phaser3-rex-plugins/plugins/actions/GridCutImage'
import { BoardContainer } from '../../Components/BoardContainer'
import { PieceContainer } from '../../Components/PieceContainer'
import Sprite = Phaser.GameObjects.Sprite
import Pointer = Phaser.Input.Pointer

export class GameScreen extends Phaser.GameObjects.Container {
  public gameLayer: Phaser.GameObjects.Container
  private boardContainer: BoardContainer
  private allowToPLace: boolean = false
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.initialize()
  }

  private initialize(): void {
    this.initLayers()
    this.initBoardContainer()
    this.initPieces()
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
    //   })
    // })
  }

  private initPieces(): void {
    const images = GridCutImage(this.boardContainer.bkg, 2, 2)
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
      const piece = new PieceContainer(this.scene, this.boardContainer.cells[i].id, img)
      piece.setSize(img.displayWidth, img.displayHeight)
      piece.absolutePosition = { x: tx + piece.width / 2 + x, y: ty + piece.height / 2 + y }
      piece.setPosition(tx + piece.width / 2 + x + i * 10 + 500, ty + piece.height / 2 + y)
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
        // console.log(this.allowToPLace, 'dragend')
        // if (this.allowToPLace) {
        //   const { tx, ty } = this.getLocalTransformMatrix()
        //   piece.setPosition(piece.absolutePosition.x + tx, piece.absolutePosition.y + ty)
        //   this.allowToPLace = false
        // } else {
        // }
      })
      // ;(this.parentContainer as GameScreen).gameLayer.add(piece)
      this.add(piece)
    })
  }

  private checkForPlace(piece: PieceContainer): void {
    this.boardContainer.cells.forEach(cell => {
      const { tx, ty } = this.getLocalTransformMatrix()
      console.log(tx, ty, 'a')

      const cellX = cell.getPosition().x + tx
      const cellY = cell.getPosition().y + ty
      const cellW = cell.getSize().width
      const cellH = cell.getSize().height

      console.log(cellX, cellY, 'cell')
      console.log(piece.x, piece.y, 'piece')
      // console.log(
      //   this.isIntoCell(piece.x, cellX, cellX + cellW),
      //   this.isIntoCell(piece.y, cellY, cellY + cellH),
      //   cell.id === piece.id
      // )

      if (
        this.isIntoCell(piece.x, cellX, cellX + cellW) &&
        this.isIntoCell(piece.y, cellY, cellY + cellH) &&
        cell.id === piece.id
      ) {
        this.allowToPLace = true
        // console.log(this.allowToPLace)
      } else {
        this.allowToPLace = false

        // console.log(this.allowToPLace)
      }
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
