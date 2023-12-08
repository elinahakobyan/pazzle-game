import Container = Phaser.GameObjects.Container
import { HeaderContainer } from '../../Components/HeaderContainer'
import { MenuConfig } from '../../../typings/types'
import { menuConfig } from '../../configs/menuConfig'
import { CategoryComponent } from '../../Components/CategoryComponent'
import { getNextBtnNinePatchConfig, makeNinePatch } from '../../configs/NinePatcheConfigs'
import { BasicButton } from '../../Components/BasicButton'

export class MenuScreen extends Container {
  private header: HeaderContainer
  private categories: CategoryComponent[] = []
  private categoriesView: Phaser.GameObjects.Container
  private activeItem: CategoryComponent | null
  constructor(scene: Phaser.Scene, menuConfig: MenuConfig) {
    super(scene)
    this.activeItem = null
    // this.setSize(1920, 1080)
    this.initialise()
  }

  private initialise(): void {
    const gameConfig = {
      themeName: 'car',
      row: 2,
      col: 2
    }
    this.initHeader()
    this.initCategories()
    this.initNextBtn()
    this.attachListeners()
    // this.gameScreen = new GameScreen(this, gameConfig)
    // this.add.existing(this.gameScreen)
  }

  private attachListeners(): void {
    this.setSize(1920, 1080)
    this.setInteractive(
      new Phaser.Geom.Rectangle(this.width / 2, this.height / 2, this.width, this.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.on('pointerup', () => {
      if (this.activeItem) {
        this.activeItem.deactivate()
        this.activeItem = null
      }
    })
  }

  private initCategories(): void {
    this.header.updateTitleVisibility(true, 'Categories')
    this.categoriesView = this.scene.add.container()
    const w = 1920
    const h = 1080 - this.header.height + 20
    this.categoriesView.setSize(w, h)
    this.categoriesView.setPosition(0, this.header.y + this.header.height / 2 - 20)
    this.add(this.categoriesView)
    // const gr = this.scene.add.graphics()
    // gr.fillStyle(0x000fff, 0.1)
    // gr.fillRect(0, 0, this.categoriesView.width, this.categoriesView.height)
    // this.categoriesView.add(gr)
    const { categories } = menuConfig
    const gap = 50
    categories.forEach((c, i) => {
      const category = new CategoryComponent(this.scene, c)
      category.setPosition(i * (category.width + gap) + 350, this.categoriesView.height / 2 - 100)
      category.on('pointerup', () => {
        this.handleCategoryPointerUp(category)
      })
      this.categoriesView.add(category)
      this.categories.push(category)
    })
    console.log(categories)
  }

  private initNextBtn(): void {
    const btn = new BasicButton(this.scene, { text: 'NEXT', frame: 'next' })
    btn.setPosition(1920 / 2, 1080 / 2 + 320)
    this.add(btn)
  }

  private handleCategoryPointerUp(category: CategoryComponent): void {
    if (this.activeItem) {
      if (this.activeItem.categoryConfig.name === category.categoryConfig.name) {
        this.activeItem.deactivate()
        this.activeItem = null
      } else {
        this.activeItem.deactivate()
        this.activeItem = category
        this.activeItem.activate()
      }
    } else {
      this.activeItem = category
      this.activeItem.activate()
    }
  }

  private initHeader(): void {
    const header = new HeaderContainer(this.scene)
    header.setPosition(header.width / 2, header.height / 2)
    this.add((this.header = header))
  }
}
