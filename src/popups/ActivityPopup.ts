import Container = Phaser.GameObjects.Container
import { CloseBtn } from '../buttons/CloseBtn'

export class ActivityPopup extends Container {
    private bkg: Phaser.GameObjects.Sprite
    constructor(scene, private config) {
        super(scene)
        this.initialize()
    }

    private initialize(): void {
        this.initBkg()
        this.initCloseBtn()
        this.initText()
    }

    private initBkg(): void {
        const sprite = this.scene.add.sprite(0, 0, 'activity-bkg')
        this.add((this.bkg = sprite))

        const bkg = this.scene.add.sprite(0, 0, 'green-bkg')
        this.add(bkg)
    }

    private initCloseBtn(): void {
        const closeBtn = new CloseBtn(this.scene)
        closeBtn.setPosition(this.bkg.x + this.bkg.width / 2 - 110, this.bkg.y - this.bkg.height / 2 + 90)
        this.add(closeBtn)
    }

    private initText(): void {
        //
    }
}
