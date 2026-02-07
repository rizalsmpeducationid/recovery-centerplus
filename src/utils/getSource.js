const images = import.meta.glob('@/assets/objects/*.webp', { eager: true, import: 'default' })

const imageMap = {}

for (const path in images) {
  const fileName = path.split('/').pop().replace('.webp', '')
  const parsedFileName = fileName.toLowerCase().replace('_', '')

  imageMap[parsedFileName] = images[path]
}

export function getSource(input) {
  return imageMap[input] ?? null
}
