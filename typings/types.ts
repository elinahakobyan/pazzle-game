export interface MenuConfig {
    categories: Category[]
    levels: Level[]
}

export interface MenuConfig {
    categories: Category[]
    levels: Level[]
}

export interface GameConfig {
    category: { name: string }
    subcategory: SubCategory
    level: Level
}

export interface Category {
    name: string
    frame: string
    themes: {
        name: string
        id?: string
        frame: string
        description: string
    }[]
}
export interface SubCategory {
    name: string
    frame: string
    description: string
}
export interface Level {
    name: string
    level: string
    color?: string
}
