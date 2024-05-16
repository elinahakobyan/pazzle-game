import { injectable, IocContext } from 'power-di'
import Container = Phaser.GameObjects.Container

@injectable()
export class SoundService {
    private scene: Phaser.Scene
    private themeSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound
    private activeSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound

    constructor() {}

    public initialize(scene): void {
        this.scene = scene
        this.initBkgMusic()
    }

    public stopBkgMusic() {
        this.themeSound.stop()
        // this.activeSound.stop()
    }
    public playBkgMusic() {
        this.themeSound.play()
        // this.activeSound.stop()
    }

    public playSfx(key: string, loop?: boolean): void {
        if (this.activeSound) {
            this.activeSound.volume = 0
            this.activeSound.destroy()
            this.activeSound = this.scene.sound.add(key, { volume: 1, loop })
            this.activeSound.play()
        } else {
            this.activeSound = this.scene.sound.add(key, { volume: 1, loop })
            this.activeSound.play()
        }
    }

    private initBkgMusic(): void {
        this.themeSound = this.scene.sound.add('theme', { volume: 1, loop: true })
        this.themeSound.play()
    }
}
