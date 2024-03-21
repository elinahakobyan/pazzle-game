import Container = Phaser.GameObjects.Container
import Sprite = Phaser.GameObjects.Sprite

export class PreloadScreen extends Container {
    constructor(scene) {
        super(scene)
        this.initialize()
    }

    private initialize(): void {
        this.initBkg()
        this.initLetters()
        setTimeout(() => {
            this.emit('startGame')
        }, 1000)
    }

    private initBkg() {
        const bkg = this.scene.add.sprite(0, 0, 'cloud-bkg')
        bkg.setPosition(bkg.width / 2, bkg.height / 2)
        this.add(bkg)
    }

    private initLetters() {
        const letters = ['t', 'h', 'i', 'n', 'k', 'i', 'n', 'g']
        const lettersSprites: Sprite[] = []
        // const letters = ['t', 'h', 'i', 'n', 'k', 'g', 'e', 'r', 'o', 's']

        letters.forEach((letter, i) => {
            const sprite = this.scene.add.sprite(0, 0, letter)
            sprite.setScale(0.5)
            lettersSprites.push(sprite)
            this.add(sprite)
            sprite.setPosition(
                (lettersSprites[i - 1] ? lettersSprites[i - 1].x + lettersSprites[i - 1].displayWidth / 2 : 100) +
                    (sprite.displayWidth + 20),
                window.innerHeight / 2
            )
        })
    }
}
