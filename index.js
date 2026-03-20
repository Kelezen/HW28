const imagesSrc = [
 'https://picsum.photos/id/237/200/300',
 'https://picsum.photos/id/238/200/300',
 'https://picsum.photos/id/239/200/300',
]

class Slider {

 constructor(config){
  this.width = config.width || 200
  this.images = config.images
  this.interval = config.interval || 3000

  this.current = 0
  this.paused = false
 }

 init(){

  this.root = document.createElement('div')
  this.root.className = 'rootElement'
  document.body.appendChild(this.root)

  this.track = document.createElement('div')
  this.track.className = 'moveContainer'
  this.root.appendChild(this.track)

  this.images.forEach(src=>{
   const img = document.createElement('img')
   img.src = src
   this.track.appendChild(img)
  })

  this.start()

  this.root.addEventListener('mouseenter', ()=> this.paused = true)
  this.root.addEventListener('mouseleave', ()=> this.paused = false)
 }

 next(){
  this.current++
  if(this.current >= this.images.length) this.current = 0
  this.track.style.left = -this.current * this.width + 'px'
 }

 start(){
  setInterval(()=>{
   if(!this.paused) this.next()
  }, this.interval)
 }
}

const slider = new Slider({
 images: imagesSrc
})

slider.init()