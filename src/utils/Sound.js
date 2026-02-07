const context = new AudioContext()

export class Sound {
  src = ''
  buffer = null

  constructor(src) {
    this.src = src
    this.load()
  }

  async load() {
    if (!this.src) throw new Error('missing sound src')
    if (this.buffer) return

    const response = await fetch(this.src)
    const arrayBuffer = await response.arrayBuffer()
    this.buffer = await context.decodeAudioData(arrayBuffer)
  }

  play() {
    if (!this.buffer) {
      console.warn('sound not loaded')
      return
    }

    const source = context.createBufferSource()
    source.buffer = this.buffer
    source.connect(context.destination)
    source.start(0)
  }
}
