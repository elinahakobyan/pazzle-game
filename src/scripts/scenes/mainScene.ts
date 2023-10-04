import Sprite = Phaser.GameObjects.Sprite;
import GridCutImage from "phaser3-rex-plugins/plugins/actions/GridCutImage";


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
    sprite.setAlpha(0.5)
    this.add.existing(sprite)

    const images= GridCutImage(sprite,4,4,)
    images.forEach((img,i)=>{
      img.x+=i*10
      img.y+=i*10
      img.setInteractive({ cursor: "pointer", draggable: true })
      img.on('drag',(pointer: Phaser.Input.Pointer)=>{
       img.setPosition(pointer.x,pointer.y)
      })
    }
  )

    const w= sprite.width/row
    const h=sprite.height/col

    // const gr=this.add.graphics()
    // gr.fillRect(0,0,w,h)
    // gr.fillStyle(0x000fff,0.5)
    //
    // gr.setPosition(sprite.x-sprite.width/2,sprite.y-sprite.height/2)
    // const canvas =this.textures.createCanvas('phaser-logo.png',200,200)
    // canvas.getContext().drawImage(sprite,0,0,w,h)
    // this.add.existing(canvas)



    // const canvas=document.getElementById("canvas");
    // const ctx=canvas?.getContext("2d");
    // const cw=canvas?.width;
    // const ch=canvas?.height;

    // const a=sprite.setCrop(0,0,)
    // console.log(a)

    // const mask = gr.createGeometryMask();
   // const a= sprite.setMask(mask);
   //  console.log(a)
   // a.setPosition(200,100)
   // gr.setPosition(a.x,a.y)

    // console.log(sprite.width,sprite.height)



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
