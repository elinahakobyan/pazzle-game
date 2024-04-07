import { PreloadScreen } from '../screens/PreloadScreen'

export default class PreloadScene extends Phaser.Scene {
  private preloadScreen: PreloadScreen
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('cloud-bkg', 'assets/img/cloud-bkg.png')
    let letters = ['t', 'h', 'i', 'n', 'k', 'g', 'e', 'r', 'o', 's'].forEach(key => {
      this.load.image(key, `assets/letters/${key}.png`)
    })
    // this.load.image('phaser-logo', '/Users/user/University/puzzle-game/dist/assets/img/phaser-logo.png')
    // this.load.image('car', 'assets/img/car.png')
    // this.load.image('next-btn', 'assets/buttons/next-btn.png')
    // this.load.image('hint-btn', 'assets/buttons/hint-btn.png')
    // this.load.image('back-btn', 'assets/buttons/back-btn.png')
    // this.load.image('next-icon', 'assets/icons/next-icon.png')
    // this.load.image('hint-icon', 'assets/icons/hint-icon.png')
    // this.load.image('play-icon', 'assets/icons/play-icon.png')
    //
    // // let categories = ['animals', 'birds', 'professions', 'sport', 'vehicles'].forEach(key => {
    // let categories = ['categories'].forEach(key => {
    //   this.load.atlas(key, `../../assets/atlases/${key}.png`, `../../assets/atlases/${key}.json`)
    //   // this.load.image(key, `assets/categories/${key}.png`)
    // })
    // let animals = ['animals', 'birds', 'professions', 'sport', 'vehicles'].forEach(key => {
    //   this.load.atlas(
    //     key,
    //     `../../assets/atlases/subcategories/${key}.png`,
    //     `../../assets/atlases/subcategories/${key}.json`
    //   )
    //
    //   // this.load.image(key, `assets/subcategories/animals/${key}.png`)
    // })
    // let birds = ['flamingo', 'hen', 'owl', 'parrot', 'swan'].forEach(key => {
    //   this.load.image(key, `assets/subcategories/birds/${key}.png`)
    // })
    // let professions = ['builder', 'doctor', 'judge', 'programmer', 'teacher'].forEach(key => {
    //   this.load.image(key, `assets/subcategories/professions/${key}.png`)
    // })
    // let sport = ['basketball', 'chess', 'football', 'swiming', 'volleyball'].forEach(key => {
    //   this.load.image(key, `assets/subcategories/sport/${key}.png`)
    // })
    // let vehicles = ['bicycle', 'car', 'plane', 'train', 'traktor'].forEach(key => {
    //   this.load.image(key, `assets/subcategories/vehicles/${key}.png`)
    // })
    this.loadAssets()
    this.load.start()
  }

  create() {
    // this.initPreloadScreen()
    // this.loadAssets()
    // this.load.start()
    this.scene.start('MainScene')
    // this.preloadScreen.on('startGame', () => {
    //     const h = window.innerHeight
    //     const w = window.innerWidth
    // })

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }

  private initPreloadScreen(): void {
    this.preloadScreen = new PreloadScreen(this)
    this.add.existing(this.preloadScreen)
  }
  private loadAssets(): void {
    this.load.image('bkg', 'assets/img/bkg.png')
    this.load.image('puzzle-piece', 'assets/img/puzzle-piece.png')
    this.load.image('logo', 'assets/img/logo.png')
    this.load.image('diffBg', 'assets/img/diffBg.png')
    this.load.image('categoryBg', 'assets/img/categoryBg.png')
    this.load.image('bkg1', 'assets/img/bkg1.png')
    this.load.image('car', 'assets/img/car.png')
    this.load.image('next-btn', 'assets/buttons/next-btn.png')
    this.load.image('hint-btn', 'assets/buttons/hint-btn.png')
    this.load.image('back-btn', 'assets/buttons/back-btn.png')
    this.load.image('next-icon', 'assets/icons/next-icon.png')
    this.load.image('play-icon', 'assets/icons/play-icon.png')
    this.load.image('hide-icon', 'assets/icons/hide.png')
    this.load.image('mute-icon', 'assets/icons/mute.png')
    this.load.image('show-icon', 'assets/icons/show.png')
    this.load.image('unmute-icon', 'assets/icons/unmute.png')

    let categories = [
      'animals',
      'birds',
      'professions',
      'sport',
      'vehicles',
      'compositors',
      'painters',
      'writers',
      'sportmens',
      'scientist'
    ].forEach(key => {
      // let categories = ['categories'].forEach(key => {
      //   this.load.atlas(key, `../../assets/atlases/${key}.png`, `../../assets/atlases/${key}.json`)
      this.load.image(key, `assets/categories/${key}.png`)
    })
    let animals = ['lion', 'giraffe', 'monkey', 'elephant', 'zebra'].forEach(key => {
      // let animals = ['animals', 'birds', 'professions', 'sport', 'vehicles'].forEach(key => {
      // this.load.atlas(
      //   key,
      //   `../../assets/atlases/subcategories/${key}.png`,
      //   `../../assets/atlases/subcategories/${key}.json`
      // )

      this.load.image(key, `assets/subcategories/animals/${key}.png`)
    })
    let birds = ['flamingo', 'hen', 'owl', 'parrot', 'swan'].forEach(key => {
      this.load.image(key, `assets/subcategories/birds/${key}.png`)
    })
    let professions = ['builder', 'doctor', 'judge', 'programmer', 'teacher'].forEach(key => {
      this.load.image(key, `assets/subcategories/professions/${key}.png`)
    })
    let sport = ['basketball', 'chess', 'football', 'swiming', 'volleyball'].forEach(key => {
      this.load.image(key, `assets/subcategories/sport/${key}.png`)
    })
    let vehicles = ['bicycle', 'car', 'plane', 'train', 'traktor'].forEach(key => {
      this.load.image(key, `assets/subcategories/vehicles/${key}.png`)
    })
    let writers = ['w1', 'w2', 'w3', 'w4', 'w5'].forEach(key => {
      this.load.image(key, `assets/subcategories/writers/${key}.png`)
    })
    let compositor = ['c1', 'c2', 'c3', 'c4', 'c5'].forEach(key => {
      this.load.image(key, `assets/subcategories/compositor/${key}.png`)
    })
    let painters = ['p1', 'p2', 'p3', 'p4', 'p5'].forEach(key => {
      this.load.image(key, `assets/subcategories/painters/${key}.png`)
    })
    let sportmens = ['a1', 'a2', 'a3', 'a4', 'a5'].forEach(key => {
      this.load.image(key, `assets/subcategories/sportmens/${key}.png`)
    })
    let scientist = ['s1', 's2', 's3', 's4', 's5'].forEach(key => {
      this.load.image(key, `assets/subcategories/scientist/${key}.png`)
    })
  }
}
