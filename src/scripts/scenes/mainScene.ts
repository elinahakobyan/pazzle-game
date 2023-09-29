import Sprite = Phaser.GameObjects.Sprite;

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    console.log('Start')
    const row=2
    const col=2


    const sprite=new Sprite(this,window.innerWidth*0.5,window.innerHeight*0.5,'phaser-logo')
    this.add.existing(sprite)

    const gr=this.add.graphics()
    gr.fillRect(0,0,sprite.width/row,sprite.height/col)
    gr.fillStyle(0x000fff,0.5)

    gr.setPosition(sprite.x-sprite.width/2,sprite.y-sprite.height/2)

    const mask = gr.createGeometryMask();
   const a= sprite.setMask(mask);
    console.log(a)
   // a.setPosition(200,100)
   // gr.setPosition(a.x,a.y)

    console.log(sprite.width,sprite.height)



    // new PhaserLogo(this, this.cameras.main.width / 2, 0)
    // this.fpsText = new FpsText(this)
    // display the Phaser.VERSION
    // this.add
    //   .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
    //     color: '#000000',
    //     fontSize: '24px'
    //   })
    //   .setOrigin(1, 0)
  }

  update() {
    // this.fpsText.update()
  }
}
