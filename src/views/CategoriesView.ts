import Container = Phaser.GameObjects.Container
import { CategoryComponent } from '../Components/CategoryComponent'
import { MenuScreen } from '../screens/MenuScreen'
import { Category } from '../../typings/types'
import { IocContext } from 'power-di'
import { SoundService } from '../services/SoundService'

export class CategoriesView extends Container {
    public activeItem: CategoryComponent | null
    public menuScreen: MenuScreen
    constructor(scene: Phaser.Scene, private categoriesConfig: Category[]) {
        super(scene)
        this.activeItem = null
        this.initialize()
    }

    public updateVisibility(visible: boolean): void {
        this.setVisible(visible)
    }

    private initialize(): void {
        this.initCategories()
    }

    private initCategories(): void {
        const soundService = IocContext.DefaultInstance.get(SoundService)
        const gap = 25
        const x = (1920 - (5 * 326 + 4 * gap)) / 2
        this.categoriesConfig.forEach((c, i) => {
            const category = new CategoryComponent(this.scene)
            category.setPosition(i * (category.width + gap) + x + category.width / 2 + 5, 920 / 2 - 100)
            // category.setPosition(i * (category.width + gap) + x, 920 / 2 - 100)
            category.setContent(c, 'categories')
            category.on('pointerup', () => {
                soundService.playSfx('select')
                this.handleCategoryPointerUp(category)
            })
            this.add(category)
        })
    }

    private handleCategoryPointerUp(category: CategoryComponent): void {
        if (this.activeItem && this.activeItem.active) {
            if (this.activeItem.categoryConfig.name === category.categoryConfig.name) {
                this.activeItem.deactivate()
                this.activeItem = null
                this.emit('itemDeactivated')
            } else {
                this.activeItem.deactivate()
                this.activeItem = category
                this.activeItem.activate()
                this.emit('itemActivated')
            }
        } else {
            this.activeItem = category
            this.activeItem.activate()
            this.emit('itemActivated')
            this.activeItem.active = true
        }
    }
}
