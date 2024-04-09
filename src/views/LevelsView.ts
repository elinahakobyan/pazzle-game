import Container = Phaser.GameObjects.Container
import { LevelComponent } from '../Components/LevelComponent'

export class LevelsView extends Container {
    public activeItem: LevelComponent | null
    constructor(scene, private levelsConfigs: any) {
        super(scene)
        this.initialize()
    }

    private initialize(): void {
        this.initLevels()
    }

    private initLevels(): void {
        const gap = 170
        const w = 270 * 3 + 2 * gap

        // const gap = 25
        const x = (1920 - (3 * 270 + 2 * gap)) / 2

        // category.setPosition(i * (category.width + gap) + x + category.width / 2 + 5, 920 / 2 - 100)

        this.levelsConfigs.forEach((lvl, i) => {
            const level = new LevelComponent(this.scene, lvl)
            // level.setPosition(100, 100)
            level.setPosition(
                i * (level.width + gap) + x + level.width / 2 + 5,
                // i * (level.width + gap) + 560,
                920 / 2 - 100
            )
            level.on('pointerup', () => {
                this.handleCategoryPointerUp(level)
            })
            this.add(level)
        })
    }

    private handleCategoryPointerUp(category: LevelComponent): void {
        if (this.activeItem) {
            if (this.activeItem.config?.name === category.config?.name) {
                this.activeItem.deactivate()
                this.activeItem = null
                this.emit('itemDeactivated')
                // this.nextBtn.disable()
            } else {
                this.activeItem.deactivate()
                this.activeItem = category
                this.activeItem.activate()
                this.emit('itemActivated')
                // this.nextBtn.enable()
            }
        } else {
            this.activeItem = category
            this.activeItem.activate()
            this.emit('itemActivated')
            // this.nextBtn.enable()
        }
    }
}
