import Container = Phaser.GameObjects.Container
import { CategoryComponent } from '../Components/CategoryComponent'

export class SubcategoriesView extends Container {
    private categories: CategoryComponent[] = []
    public activeItem: CategoryComponent | null
    public title: string
    constructor(scene: Phaser.Scene) {
        super(scene)
        this.initialize()
        this.activeItem = null
    }

    public setContentConfig(themes, category: string): void {
        themes.forEach((t, i) => {
            this.categories[i].setContent(t, category)
        })
    }

    public deactivateSubcategory(): void {
        if (!this.activeItem) return
        this.activeItem.deactivate()
        this.activeItem = null
        this.emit('itemDeactivated')
    }
    public activateSubcategory(category: CategoryComponent): void {
        this.activeItem = category
        this.activeItem.activate()
        this.emit('itemActivated')
    }

    private initialize(): void {
        this.initSubcategories()
    }

    private initSubcategories(): void {
        const gap = 25
        const x = (1920 - (5 * 326 + 4 * gap)) / 2

        for (let i = 0; i < 5; i++) {
            const category = new CategoryComponent(this.scene)
            category.setPosition(i * (category.width + gap) + x + category.width / 2 + 5, 920 / 2 - 100)
            category.on('pointerup', () => {
                this.handleCategoryPointerUp(category)
            })
            this.add(category)
            this.categories.push(category)
        }
    }

    private handleCategoryPointerUp(category: CategoryComponent): void {
        if (this.activeItem) {
            if (this.activeItem.categoryConfig.name === category.categoryConfig.name) {
                this.deactivateSubcategory()
            } else {
                this.activeItem.deactivate()
                this.activateSubcategory(category)
            }
        } else {
            this.activateSubcategory(category)
            // this.nextBtn.enable()
        }
    }
}
