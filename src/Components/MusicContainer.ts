import { IocContext } from 'power-di'
import { SoundService } from '../services/SoundService'

export class MusicContainer extends Phaser.GameObjects.Container {
    private showIcon: Phaser.GameObjects.Sprite
    private hideIcon: Phaser.GameObjects.Sprite
    private soundService = IocContext.DefaultInstance.get(SoundService)

    constructor(scene: Phaser.Scene) {
        super(scene)
        this.initialize()
    }

    public showIcons(): void {
        if (this.showIcon.visible) {
            this.showIcon.setVisible(false)
            this.hideIcon.setVisible(true)
            this.soundService.playBkgMusic()
        } else {
            this.hideIcon.setVisible(false)
            this.showIcon.setVisible(true)
            this.soundService.stopBkgMusic()
        }
    }

    private initialize(): void {
        this.initBkg()
        this.initIcon()
    }

    private initBkg(): void {
        const bkg = this.scene.add.sprite(0, 0, 'hint-btn')
        bkg.setScale(1.3)
        this.add(bkg)
        this.setSize(bkg.width, bkg.height)
        this.setInteractive({ cursor: 'pointer', draggable: true })
    }
    private initIcon(): void {
        this.showIcon = this.scene.add.sprite(-2, 0, 'mute-icon')
        this.showIcon.setVisible(true)
        this.add(this.showIcon)

        this.hideIcon = this.scene.add.sprite(-2, 0, 'unmute-icon')
        this.showIcon.setVisible(false)
        this.add(this.hideIcon)
    }
}
