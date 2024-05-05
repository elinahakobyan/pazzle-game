import Container = Phaser.GameObjects.Container
import Tween = Phaser.Tweens.Tween

export class AnswerComponent extends Container {
  public isRightAnswer: boolean
  public id: string
  private bkg: Phaser.GameObjects.Sprite
  private icon: Phaser.GameObjects.Sprite
  private defaultFrame: Phaser.GameObjects.Sprite
  private greenFrame: Phaser.GameObjects.Sprite
  private redFrame: Phaser.GameObjects.Sprite
  constructor(scene, private config: { text: string; id: string; isRightAnswer: boolean }) {
    super(scene)
    this.id = this.config.id
    this.isRightAnswer = this.config.isRightAnswer

    this.initialize()
  }

  public setDefaultState(): void {
    this.defaultFrame.setVisible(true)
    this.redFrame.setVisible(false)
    this.greenFrame.setVisible(false)
  }

  public scaleUpTween(): void {
    console.log('upTween')
    this.scene.add.tween({
      targets: this,
      duration: 150,
      scale: 1
    })
  }
  public scaleDownTween(): Tween {
    console.log('downTween')

    return this.scene.add.tween({
      targets: this,
      duration: 150,
      scale: 0.85
    })
  }

  public updateFrames(flag: boolean): void {
    if (flag) {
      this.defaultFrame.setVisible(false)
      this.greenFrame.setVisible(true)
    } else {
      this.defaultFrame.setVisible(false)
      this.redFrame.setVisible(true)
    }
  }

  private initialize(): void {
    this.initBkg()
    this.initIcon()
    this.initText()
    this.initFrames()
    this.setInteractive({ cursor: 'pointer' })
  }

  private initFrames(): void {
    this.defaultFrame = this.scene.add.sprite(this.bkg.x, this.bkg.y, 'default-frame')
    this.add(this.defaultFrame)

    this.greenFrame = this.scene.add.sprite(this.bkg.x, this.bkg.y, 'green-frame')
    this.greenFrame.setVisible(false)
    this.add(this.greenFrame)

    this.redFrame = this.scene.add.sprite(this.bkg.x, this.bkg.y, 'red-frame')
    this.redFrame.setVisible(false)
    this.add(this.redFrame)
  }

  private initBkg(): void {
    this.bkg = this.scene.add.sprite(0, 0, 'answer-bkg')
    this.setSize(this.bkg.width, this.bkg.height)
    this.add(this.bkg)
  }

  private initIcon(): void {
    this.icon = this.scene.add.sprite(0, 0, 'answer-icon')
    this.icon.setPosition(-this.bkg.width / 2 + 60, 0)
    this.icon.setScale(0.85)
    this.add(this.icon)

    const number = this.scene.add.text(this.icon.x, this.icon.y, this.id, {
      fontSize: '56px',
      color: '#5F38A8',
      fontFamily: 'Arti Regular',
      align: 'center',
      fontStyle: 'bold'
    })
    number.setOrigin(0.5)
    this.add(number)
  }

  private initText(): void {
    const text = this.scene.add.text(0, 0, this.config.text, {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arti Regular',
      align: 'center',
      fontStyle: 'bold'
    })
    console.log(text.width)
    const w = this.bkg.width - 174

    const gr = this.scene.add.graphics()
    gr.fillStyle(0xffffff, 0.5)
    gr.fillRect(0, 0, w, this.bkg.height)
    this.add(gr)

    if (text.width > 280) {
      text.setFontSize('24px')
    }
    if (text.width > 320) {
      text.setFontSize('20px')
    }
    const a = (w - text.width) / 2
    console.log(a, 'aa')

    text.setOrigin(0.5)
    text.setPosition(this.icon.x + this.icon.displayWidth / 2 + text.width / 2 + Math.abs(a), this.icon.y)
    this.add(text)
  }
}
