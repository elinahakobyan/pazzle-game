import Container = Phaser.GameObjects.Container
import { LevelComponent } from '../Components/LevelComponent'
import { CategoryComponent } from '../Components/CategoryComponent'

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
    const gap = 150
    const w = 210 * 3 + 2 * gap
    this.levelsConfigs.forEach((lvl, i) => {
      const level = new LevelComponent(this.scene, lvl)
      // level.setPosition(100, 100)
      level.setPosition(i * (level.width + gap) + 590, 920 / 2 - 100)
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
