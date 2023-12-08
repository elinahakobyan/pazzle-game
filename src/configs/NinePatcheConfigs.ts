import { INinePatchConfig, NinePatch } from '@koreez/phaser3-ninepatch'

export const makeNinePatch = (scene: Phaser.Scene, config: INinePatchConfig): NinePatch => {
  const { x = 0, y = 0, width, height, key, frame, patchesConfig } = config
  return new NinePatch(scene, x, y, width, height, key, frame, patchesConfig)
}

export const getHeaderBgNinePatchConfig = (width: number, height: number): INinePatchConfig => {
  return {
    x: 0,
    y: 0,
    width,
    height,
    key: 'headerBg',
    frame: 'headerBg',
    patchesConfig: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  }
}
export const getNextBtnNinePatchConfig = (width: number, height: number): INinePatchConfig => {
  return {
    x: 0,
    y: 0,
    width,
    height,
    key: 'next-btn',
    frame: 'next-btn',
    patchesConfig: {
      top: 11,
      bottom: 10,
      left: 25,
      right: 15
    }
  }
}
