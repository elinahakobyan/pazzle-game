import Phaser from 'phaser'
import GridCutImage from 'phaser3-rex-plugins/plugins/actions/GridCutImage'
import Sprite = Phaser.GameObjects.Sprite
import _ from 'lodash'
import { BoardContainer } from '../../Components/BoardContainer'
import { PieceContainer } from '../../Components/PieceContainer'

export class GameScreen extends Phaser.GameObjects.Container {
  public gameLayer: Phaser.GameObjects.Container
  private boardContainer: BoardContainer
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
      const { tx, ty } = this.boardContainer.getWorldTransformMatrix()
      // img.setPosition(tx, ty)
      console.log(tx, ty, this.boardContainer.x, this.boardContainer.y)
      const { x, y } = this.boardContainer.cells[i].getPosition()
      console.log(x, y, 'cell')
      //test
      const gr = this.scene.add.graphics()
      gr.fillStyle(0xfff000)
      gr.fillCircle(this.boardContainer.x + x, this.boardContainer.y + y, 5)
      this.add(gr)
      //
      const piece = new PieceContainer(this.scene, this.boardContainer.cells[i].id)
      piece.setContext(img)
      piece.absolutePosition = { x: x + piece.width / 2, y: y + piece.height / 2 }
      piece.setPosition(this.boardContainer.x, this.boardContainer.y)
      // piece.setPosition(x + piece.width / 2 + 500 + i * 10, y + piece.height / 2)
      piece.setInteractive({ cursor: 'pointer', draggable: true })

      const gra = this.scene.add.graphics()
      gra.fillStyle(0x000fff)
      gra.fillCircle(0, 0, 5)
      piece.add(gra)

      piece.on('drag', pointer => {
        // this.dragPieceContainer(pointer, piece)
        // this.checkForPlace(piece)
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

  private initBoardContainer(): void {
    const board = new BoardContainer(this.scene)
    board.setInteractive({ cursor: 'pointer', draggable: true })
    board.setPosition(window.innerWidth * 0.5 - 250, window.innerHeight * 0.5)
    console.log(window.innerWidth * 0.5 - 250, window.innerHeight * 0.5, 'kshkfjashfjkashfjkhs')
    this.add((this.boardContainer = board))
  }

  private initLayers(): void {
    this.gameLayer = this.scene.add.container()
    this.add(this.gameLayer)
  }
}
