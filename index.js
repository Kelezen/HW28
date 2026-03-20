const imagesSrc = [
 'https://picsum.photos/id/237/200/300',
 'https://picsum.photos/id/238/200/300',
 'https://picsum.photos/id/239/200/300',
 'https://picsum.photos/id/231/200/300',
 'https://picsum.photos/id/232/200/300',
]

function Slider(config){
 this.width = config.width || 200
 this.images = config.images
 this.interval = config.interval || 3000

 this.currentSlide = 0
 this.paused = false
}

Slider.prototype.init = function(){

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

 this.createButtons()
 this.createIndicators()
 this.addSwipe()
 this.start()
}

Slider.prototype.createButtons = function(){

 const prev = document.createElement('button')
 const next = document.createElement('button')
 const pause = document.createElement('button')

 prev.innerText = 'PREV'
 next.innerText = 'NEXT'
 pause.innerText = 'PAUSE'

 document.body.append(prev, pause, next)

 prev.onclick = () => this.prev()
 next.onclick = () => this.next()
 pause.onclick = () => this.toggle()
}

Slider.prototype.createIndicators = function(){

 this.circles = []

 this.images.forEach((_,i)=>{

  const c = document.createElement('div')
  c.className = 'circle'

  if(i === 0) c.classList.add('circleActive')

  c.onclick = ()=>{
   this.currentSlide = i
   this.update()
  }

  this.root.appendChild(c)
  this.circles.push(c)
 })
}

Slider.prototype.update = function(){

 this.track.style.left = -this.currentSlide * this.width + 'px'

 this.circles.forEach(c=>c.classList.remove('circleActive'))
 this.circles[this.currentSlide].classList.add('circleActive')
}

Slider.prototype.next = function(){

 this.currentSlide++
 if(this.currentSlide >= this.images.length){
  this.currentSlide = 0
 }

 this.update()
}

Slider.prototype.prev = function(){

 this.currentSlide--
 if(this.currentSlide < 0){
  this.currentSlide = this.images.length - 1
 }

 this.update()
}

Slider.prototype.start = function(){

 setInterval(()=>{
  if(!this.paused){
   this.next()
  }
 }, this.interval)
}

Slider.prototype.toggle = function(){
 this.paused = !this.paused
}

function TouchSlider(config){
 Slider.call(this, config)
}

TouchSlider.prototype = Object.create(Slider.prototype)
TouchSlider.prototype.constructor = TouchSlider

TouchSlider.prototype.addSwipe = function(){

 let start = 0

 this.root.addEventListener('mousedown', e=>{
  start = e.clientX
 })

 this.root.addEventListener('mouseup', e=>{
  if(start - e.clientX > 50) this.next()
  if(e.clientX - start > 50) this.prev()
 })

 this.root.addEventListener('touchstart', e=>{
  start = e.touches[0].clientX
 })

 this.root.addEventListener('touchend', e=>{
  let end = e.changedTouches[0].clientX
  if(start - end > 50) this.next()
  if(end - start > 50) this.prev()
 })
}

const slider = new TouchSlider({
 images: imagesSrc,
 interval: 3000
})

slider.init()

document.addEventListener('keydown', e=>{
 if(e.code === 'ArrowRight') slider.next()
 if(e.code === 'ArrowLeft') slider.prev()
})