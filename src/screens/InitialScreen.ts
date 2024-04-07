import Container = Phaser.GameObjects.Container
import { NextButton } from '../buttons/NextButton'
import { DifficultyLevel } from '../Components/DifficultyLevel'
import { menuConfig1, menuConfig2 } from '../configs/menuConfigs'
import Sprite = Phaser.GameObjects.Sprite

export class InitialScreen extends Container {
  private nextBtn: NextButton
  private downTween: Phaser.Tweens.Tween
  private pieces: Sprite[] = []
  private activeItem: DifficultyLevel | null
  private logo: Phaser.GameObjects.Sprite
  constructor(scene) {
    super(scene)

    this.initialize()
  }

  public showPieces(): void {
    this.pieces.forEach(p => p.setVisible(true))
  }

  public hidePieces(): void {
    this.pieces.forEach(p => p.setVisible(false))
  }

  private initialize(): void {
    this.initPieces()
    this.initLogo()
    this.initLevels()
    // this.intiDifficultyLevels()

    // this.initNextBtn()
    this.attachListeners()
  }

  private initLogo(): void {
    this.logo = this.scene.add.sprite(0, 0, 'logo')
    this.logo.setPosition(1920 / 2, 1080 / 2 - 50)
    this.add(this.logo)
  }

  private initLevels(): void {
    const config = [
      {
        labelConfig: { text: '1', position: { x: -30, y: -15 } },
        content: menuConfig1,
        rotation: 0,
        position: { x: 1920 / 2 - 120, y: 920 - 50 }
      },
      {
        labelConfig: { text: '2', position: { x: 30, y: 33 } },
        content: menuConfig2,
        rotation: Math.PI,
        position: { x: 1920 / 2 + 120, y: 920 - 50 - 50 }
      }
    ]

    config.forEach((c, i) => {
      const diffLevel = new DifficultyLevel(this.scene, c.labelConfig, c.content, c.rotation)
      diffLevel.setPosition(c.position.x, c.position.y)
      this.add(diffLevel)
      diffLevel.on('pointerup', () => {
        this.handleCategoryPointerUp(diffLevel)
      })
      diffLevel.on('btnClicked', () => {
        // this.downTween && this.downTween.destroy()
        this.emit('onNextBtnClicked', this.activeItem?.content)
      })
    })
  }

  private handleCategoryPointerUp(diffLevel: DifficultyLevel): void {
    if (this.activeItem) {
      this.downTween = this.activeItem?.activate()
      this.downTween.on('complete', () => {
        this.activeItem && this.activeItem.deactivate()
      })
    }
    if (this.activeItem) {
      this.activeItem.deactivate()
      this.activeItem = diffLevel
      this.activeItem.activate()
      this.emit('itemActivated')
      // this.nextBtn.enable()
    } else {
      this.activeItem = diffLevel
      const downTween = this.activeItem?.activate()
      downTween.on('complete', () => this.activeItem && this.activeItem.deactivate())
      this.emit('itemActivated')
      // this.nextBtn.enable()
    }
  }

  private initPieces(): void {
    //226 232
    const piecesConfig = [
      {
        position: { x: 1920 / 2, y: 232 / 2 - 15 },
        rotation: Math.PI / 2
      },
      {
        position: { x: 226 / 2 - 20, y: 350 },
        rotation: 0
      },
      {
        position: { x: 1920 - 226 / 2 + 20, y: 770 },
        rotation: Math.PI
      }
    ]

    piecesConfig.forEach(p => {
      const piece = this.scene.add.sprite(p.position.x, p.position.y, 'puzzle-piece')
      piece.rotation = p.rotation
      piece.alpha = 0.6
      this.add(piece)
      this.pieces.push(piece)
    })
  }

  private attachListeners(): void {
    this.setSize(1920, 1080)
    this.setInteractive(
      new Phaser.Geom.Rectangle(this.width / 2, this.height / 2, this.width, this.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.on('pointerdown', () => {
      if (this.activeItem) {
        this.activeItem.deactivate()
        // this.nextBtn.disable()
      }
    })
  }

  private intiDifficultyLevels(): void {
    // const difficultyLevels = new DifficultyLevels(this.scene)
    // difficultyLevels.setPosition(1920 / 2, 1080 / 2 + 100)
    // difficultyLevels.on('itemActivated', () => {
    //     this.nextBtn.enable()
    // })
    // difficultyLevels.on('itemDeactivated', () => {
    //     this.nextBtn.disable()
    // })
    // this.add((this.difficultyLevels = difficultyLevels))
  }

  // private initNextBtn(): void {
  //     const btn = new NextButton(this.scene, { text: 'NEXT', frame: 'next' })
  //     btn.setPosition(1920 / 2, 1080 / 2 + 280)
  //     btn.disable()
  //     btn.on('pointerdown', () => {
  //         const downTween = btn.scaleDownTween()
  //         downTween.on('complete', () => btn.scaleUpTween())
  //     })
  //     // btn.on('pointerup', () => {
  //     //     btn.scaleUpTween()
  //     // })
  //     btn.on('btnClicked', () => {
  //         this.emit('onNextBtnClicked', this.activeItem?.content)
  //     })
  //     this.add((this.nextBtn = btn))
  // }
}
