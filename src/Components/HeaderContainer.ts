import { BackButton } from '../buttons/BackButton'
import { getHeaderBgNinePatchConfig, makeNinePatch } from '../configs/NinePatcheConfigs'
import { HintContainer } from './HintContainer'
import { MusicContainer } from './MusicContainer'
import { RestartContainer } from './RestartContainer'

export class HeaderContainer extends Phaser.GameObjects.Container {
    private title: Phaser.GameObjects.Text
    private backBtn: BackButton
    private hint: HintContainer
    private music: MusicContainer
    private restart: RestartContainer
    constructor(scene: Phaser.Scene) {
        super(scene)

        this.initialise()
    }

    public hideBackButton(): void {
        this.scene.add.tween({
            targets: this.backBtn,
            x: -this.width / 2 - 150,
            ease: Phaser.Math.Easing.Elastic.Out,
            duration: 250,
            complete: () => {
                this.backBtn.setVisible(false)
            }
        })
    }
    public showBackButton(): void {
        this.scene.add.tween({
            targets: this.backBtn,
            x: -this.width / 2 + 90,
            ease: Phaser.Math.Easing.Elastic.Out,
            duration: 150,
            start: () => {
                this.backBtn.setVisible(true)
            }
        })
    }
    public showHint(): void {
        this.scene.add.tween({
            targets: this.music,
            x: this.width / 2 - 230,
            ease: Phaser.Math.Easing.Cubic.InOut,
            duration: 250,
            start: () => {
                // this.hint.setVisible(true)
            }
        })

        this.scene.add.tween({
            targets: this.hint,
            x: this.width / 2 - 90,
            ease: Phaser.Math.Easing.Cubic.InOut,
            duration: 250,
            start: () => {
                this.hint.setVisible(true)
            }
        })
    }

    public showRestartIcon(): void {
        this.scene.add.tween({
            targets: this.restart,
            x: this.width / 2 - 90,
            ease: Phaser.Math.Easing.Cubic.InOut,
            duration: 250,
            start: () => {
                // this.hint.setVisible(true)
            }
        })
    }
    public hideRestartIcon(): void {
        this.scene.add.tween({
            targets: this.restart,
            x: this.width / 2 + 100,
            ease: Phaser.Math.Easing.Cubic.InOut,
            duration: 150
        })

        this.scene.add.tween({
            targets: this.music,
            x: this.width / 2 - 90,
            ease: Phaser.Math.Easing.Cubic.InOut,
            duration: 250
        })
    }
    public hideHint(): void {
        this.scene.add.tween({
            targets: this.hint,
            x: this.width + 100,
            ease: Phaser.Math.Easing.Elastic.Out,
            duration: 150,
            complete: () => {
                this.hint.setVisible(false)
            }
        })
    }

    public updateTitleVisibility(visibility: boolean, text?: string): void {
        this.title.setVisible(visibility)
        if (!text) return
        const t = text == 'Categories' ? 'Կատեգորիաներ' : text == 'Levels' ? 'Մակարդակ' : text
        this.title.text = t ? t : ''
    }

    private initialise(): void {
        this.initHeaderBg()
        this.initTitle()
        this.initBackButton()
        this.initMusicButton()
        this.initHint1()
        this.initRestart()
        // const gr = this.scene.add.graphics()
        // gr.fillStyle(0x000fff, 0.1)
        // gr.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        // this.add(gr)
    }

    private initTitle(): void {
        const title = this.scene.add.text(0, 0, '', {
            color: '#360A58',
            fontSize: '52px',
            fontFamily: 'Arti Regular',
            fontStyle: 'bold'
        })
        title.setOrigin(0.5)
        title.setVisible(false)
        this.add((this.title = title))
    }

    private initHeaderBg(): void {
        const headerBgGr = this.scene.make.graphics({ x: 0, y: 0 }, false)
        headerBgGr.fillStyle(0xffffff)
        // headerBgGr.fillStyle(0xf5ebe3)
        headerBgGr.fillRoundedRect(0, 0, 200, 100, 20)
        headerBgGr.generateTexture('headerBg', 200, 100)
        headerBgGr.destroy()

        const headerBg = makeNinePatch(this.scene, getHeaderBgNinePatchConfig(1920, 184))
        headerBg.alpha = 0.6
        headerBg.setPosition(0, 0)
        this.add(headerBg)
        this.setSize(headerBg.width, headerBg.height)
    }

    private initBackButton(): void {
        this.backBtn = new BackButton(this.scene)
        this.backBtn.setPosition(-this.width / 2 + 90, 0)
        this.backBtn.on('pointerdown', () => {
            this.backBtn.setScale(0.95)
        })
        this.backBtn.on('pointerup', () => {
            this.backBtn.setScale(1)
            this.emit('onBackBtnClick')
        })
        this.add(this.backBtn)
    }
    private initHint1(): void {
        this.hint = new HintContainer(this.scene)
        this.hint.setPosition(this.width + 100, 0)
        this.hint.on('pointerdown', () => {
            this.hint.setScale(0.95)
        })
        this.hint.setVisible(false)
        this.hint.on('pointerup', () => {
            this.hint.setScale(1)
            this.hint.showIcons()
            this.emit('onHintBtnClick')
        })

        this.add(this.hint)
    }
    private initRestart(): void {
        this.restart = new RestartContainer(this.scene)
        this.restart.setPosition(this.hint.x, 0)
        // this.restart.setPosition(this.width + 100, 0)
        this.restart.on('pointerdown', () => {
            this.restart.setScale(0.95)
        })
        this.restart.on('pointerup', () => {
            this.restart.setScale(1)
            // this.restart.showIcons()
            this.emit('onRestartBtnClick')
        })

        this.add(this.restart)
    }

    private initMusicButton(): void {
        this.music = new MusicContainer(this.scene)
        this.music.setPosition(this.width / 2 - 90, 0)
        // this.music.setPosition(this.width + 100, 0)
        this.music.on('pointerdown', () => {
            this.music.setScale(0.95)
        })
        this.music.on('pointerup', () => {
            this.music.setScale(1)
            this.music.showIcons()
            this.emit('onMusicBtnClick')
        })

        this.add(this.music)
    }
}
