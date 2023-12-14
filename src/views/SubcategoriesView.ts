import Container = Phaser.GameObjects.Container
import { CategoryComponent } from '../Components/CategoryComponent'

export class SubcategoriesView extends Container {
  private categories: CategoryComponent[] = []
  public activeItem: CategoryComponent | null
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.initialize()
    this.activeItem = null
  }

  public setContentConfig(themes): void {
    console.log(themes, this.categories)
    themes.forEach((t, i) => {
      this.categories[i].setContent(t)
    })
  }

  private initialize(): void {
    this.initSubcategories()
  }

  private initSubcategories(): void {
    const gap = 50
    for (let i = 0; i < 5; i++) {
      console.log('has')
      const category = new CategoryComponent(this.scene)
      category.setPosition(i * (category.width + gap) + 350, 920 / 2 - 100)
      category.on('pointerup', () => {
        this.handleCategoryPointerUp(category)
      })
      this.add(category)
      this.categories.push(category)
    }
  }

  private handleCategoryPointerUp(category: CategoryComponent): void {
    console.log(category, 'aa')
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
