import Container = Phaser.GameObjects.Container

export class LevelComponent extends Container {
  constructor(scene, public config: { name: string; color: string; level: string }) {
    super(scene)
    this.initialize()
  }

  public deactivate(): void {
    this.setScale(1)
  }
  public activate(): void {
    this.setScale(0.95)
  }

  private initialize(): void {
    this.initBg()
    this.initFrame()
    this.initLabel()
    this.attachListeners()
  }

  private initLabel(): void {
    const label = this.scene.add.text(0, 0, this.config.level, {
      color: '#ffffff',
      fontSize: '58px'
    })
    label.setOrigin(0.5)
    this.add(label)
  }

  private initFrame(): void {
    console.log(this.config.color)
    const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
    gr.fillStyle(this.config.color === 'green' ? 0xcdd542 : this.config.color === 'yellow' ? 0xffd62b : 0xff9e4d, 0.7)
    gr.fillRoundedRect(0, 0, 150, 130, 20)
    gr.generateTexture(`levelFrame${this.config.color}`, 150, 150)
    gr.destroy()
    const bkg = this.scene.add.sprite(0, 10, `levelFrame${this.config.color}`)
    this.add(bkg)
  }

  private initBg(): void {
    console.log('has')
    const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
    gr.fillStyle(0xf5ebe3)
    gr.fillRoundedRect(0, 0, 210, 190, 20)
    gr.generateTexture('levelBg', 210, 190)
    gr.destroy()
    const bkg = this.scene.add.sprite(0, 0, 'levelBg')
    this.add(bkg)
    this.setSize(bkg.width, bkg.height)
  }

  private attachListeners(): void {
    this.setInteractive({ cursor: 'pointer', draggable: true })
  }
}
