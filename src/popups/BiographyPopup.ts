import Container = Phaser.GameObjects.Container
import { IocContext } from 'power-di'
import { CloseBtn } from '../buttons/CloseBtn'
import { PopupService } from '../services/PopupService'
import { SoundService } from '../services/SoundService'

export class BiographyPopup extends Container {
    private bkg: Phaser.GameObjects.Sprite
    private popupService = IocContext.DefaultInstance.get(PopupService)

    constructor(scene, private biographyConfig: string) {
        super(scene)
        this.initialize()
    }

    private initialize(): void {
        this.initBkg()
        this.initCloseBtn()
        this.initText()
    }

    private initBkg(): void {
        const sprite = this.scene.add.sprite(0, 0, 'biography-bkg')
        this.add((this.bkg = sprite))

        const bkg = this.scene.add.sprite(0, 0, 'orange-bkg')
        this.add(bkg)
    }

    private initCloseBtn(): void {
        const closeBtn = new CloseBtn(this.scene)
        closeBtn.setPosition(this.bkg.x + this.bkg.width / 2 - 180, this.bkg.y - this.bkg.height / 2 + 150)
        closeBtn.addListener('pointerdown', () => closeBtn.scaleDownTween())
        closeBtn.addListener('pointerup', () => closeBtn.scaleUpTween())
        closeBtn.on('closeBtnClicked', this.handleCloseBtnClicked, this)
        this.add(closeBtn)
    }

    private handleCloseBtnClicked(): void {
        const soundService = IocContext.DefaultInstance.get(SoundService)
        soundService.playSfx('tap')
        this.popupService.hideActivePopup(this.scene)
    }

    private initText(): void {
        const label = this.scene.add.text(0, 0, this.biographyConfig, {
            // const label = this.scene.add.text(-this.bkg.width / 2 + 210, -this.bkg.height / 2 + 220, this.biographyConfig, {
            color: '#ffffff',
            fontSize: '36px',
            fontFamily: 'Arti Regular',
            align: 'align-left',
            fontStyle: 'bold',
            wordWrap: { width: this.bkg.width - 370, useAdvancedWrap: true }
        })
        label.setOrigin(0.5)
        if (label.height > 800) {
            label.setFontSize('30px')
        } else if (label.height > 700) {
            label.setFontSize('32px')
        }
        this.add(label)
    }
}
