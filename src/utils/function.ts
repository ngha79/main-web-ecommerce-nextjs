export function slugCategory(category: string) {
  return category.split(' ').join('-')
}

export function slugToStringCategory(category: string) {
  return category.split('-').join(' ')
}
