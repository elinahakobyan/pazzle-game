import Phaser from 'phaser'
import GridCutImage from 'phaser3-rex-plugins/plugins/actions/GridCutImage'
import Sprite = Phaser.GameObjects.Sprite
import _ from 'lodash'
import { BoardContainer } from '../../Components/BoardContainer'

export class GameScreen extends Phaser.GameObjects.Container {
  public gameLayer: Phaser.GameObjects.Container
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.initialize()
  }

  private initialize(): void {
    this.initBoardContainer()
    this.initLayers()

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

  private initBoardContainer(): void {
    const board = new BoardContainer(this.scene)
    board.setInteractive({ cursor: 'pointer', draggable: true })
    board.setPosition(window.innerWidth * 0.5, window.innerHeight * 0.5)
    this.add(board)
  }

  private initLayers(): void {
    this.gameLayer = this.scene.add.container()
    this.add(this.gameLayer)
  }
}
