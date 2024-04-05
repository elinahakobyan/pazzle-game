export interface MenuConfig {
    categories: Category[]
    levels: Level[]
}
export interface GameConfig {
    category: Category
    subcategory: {
        name: string
        frame: string
        description: string
    }
    level: Level
}

export interface Category {
    name: string
    frame: string
    description?: string
    themes: {
        name: string
        frame: string
    }[]
}
export interface Level {
    name: string
    level: string
}
