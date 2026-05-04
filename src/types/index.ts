export interface Recipe {
  id: string
  name: string
  image: string
  category: string
  area: string
  tags: string[]
  ingredients: Array<{name: string, amount: string}>
  instructions: string[]
}

export interface Category {
  name: string
  value: string
}
