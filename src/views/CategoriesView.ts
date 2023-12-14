import Container = Phaser.GameObjects.Container
import { Category } from '../../typings/types'
import { CategoryComponent } from '../Components/CategoryComponent'
import { MenuScreen } from '../screens/MenuScreen'

export class CategoriesView extends Container {
  public activeItem: CategoryComponent | null
  public menuScreen: MenuScreen
  constructor(
    scene: Phaser.Scene,
    private categoriesConfig: { name: string; frame: string; themes: { name: string; frame: string }[] }[]
  ) {
    super(scene)
    this.activeItem = null
    this.initialize()
  }

  private initialize(): void {
    this.initCategories()
  }

  private initCategories(): void {
    const gap = 50
    this.categoriesConfig.forEach((c, i) => {
      const category = new CategoryComponent(this.scene, c)
      category.setPosition(i * (category.width + gap) + 350, 920 / 2 - 100)
      category.on('pointerup', () => {
        this.handleCategoryPointerUp(category)
      })
      this.add(category)
    })
  }

  private handleCategoryPointerUp(category: CategoryComponent): void {
    if (this.activeItem) {
      if (this.activeItem.categoryConfig?.name === category.categoryConfig?.name) {
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
