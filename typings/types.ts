export interface MenuConfig {
  categories: Category[]
  levels: Level[]
}

export interface Category {
  name: string
  frame: string
  themes: {
    name: string
    frame: string
  }[]
}
export interface Level {
  name: string
  level: string
}
