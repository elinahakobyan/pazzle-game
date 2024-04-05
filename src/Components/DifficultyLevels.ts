// import Container = Phaser.GameObjects.Container
// import { DifficultyLevel } from './DifficultyLevel'
// import { LevelComponent } from './LevelComponent'
// import { menuConfig1, menuConfig2 } from '../configs/menuConfigs'
//
// export class DifficultyLevels extends Container {
//     public activeItem: DifficultyLevel | null
//     constructor(scene) {
//         super(scene)
//         this.initialize()
//     }
//
//     private initialize(): void {
//         this.intiBkg()
//         // this.initLevels()
//     }
//
//     private intiBkg(): void {
//         const gr = this.scene.make.graphics({ x: 0, y: 0 }, false)
//         gr.fillStyle(0xffffff)
//         // gr.fillStyle(0xf5ebe3)
//         gr.fillRoundedRect(0, 0, 450, 600, 20)
//         gr.generateTexture('Bg', 450, 600)
//         gr.destroy()
//         const bkg = this.scene.add.sprite(0, 0, 'Bg')
//         bkg.alpha = 0.5
//         this.add(bkg)
//         this.setSize(bkg.width, bkg.height)
//     }
//
//     private initLevels(): void {
//         const config = [
//             { label: '1 մակարդակ', content: menuConfig1 },
//             { label: '2 մակարդակ', content: menuConfig2 }
//         ]
//         config.forEach((c, i) => {
//             const diffLevel = new DifficultyLevel(this.scene, c.label, c.content)
//             diffLevel.setPosition(0, -150 + i * 150)
//             this.add(diffLevel)
//             diffLevel.on('pointerup', () => {
//                 this.handleCategoryPointerUp(diffLevel)
//             })
//         })
//     }
//
//     private handleCategoryPointerUp(diffLevel: DifficultyLevel): void {
//         if (this.activeItem) {
//             if (this.activeItem.label === diffLevel.label) {
//                 this.activeItem.deactivate()
//                 this.activeItem = null
//                 this.emit('itemDeactivated')
//                 // this.nextBtn.disable()
//             } else {
//                 this.activeItem.deactivate()
//                 this.activeItem = diffLevel
//                 this.activeItem.activate()
//                 this.emit('itemActivated')
//                 // this.nextBtn.enable()
//             }
//         } else {
//             this.activeItem = diffLevel
//             this.activeItem.activate()
//             this.emit('itemActivated')
//             // this.nextBtn.enable()
//         }
//     }
// }
