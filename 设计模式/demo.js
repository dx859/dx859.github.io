var data = []

for (var i=0; i<10000; i++) {
  data.push('这是内容' + i)
}


var wrap = document.getElementById('wrap')
var content = document.getElementById('content')


const createHtml = function() {
  var html = ''
  data.forEach(item => {
    html += `<li>${item}</li>`
  })
  return html
}



// wrap.addEventListener
// content.innerHTML = createHtml(data)
wrap.appendChild
class ScrollUtil {
  constructor(wrap, content, data) {
    this.wrap = wrap;
    this.data = data;
    this.content = content;
    this.liPool = []
    this.cellHeight = 50;
    this.wrapHeight = 500;
    this.screenNum = Math.ceil(this.wrapHeight/this.cellHeight)*2;
    this.scrollEv = this.scrollEv.bind(this);
    this.currentNum = 0;
    this.init();

  }

  init() {
    this.content.style.height = (this.data.length * this.cellHeight) + 'px'
    this.createChildren()
    this.render()
    this.wrap.addEventListener('scroll', this.scrollEv)
  }

  createChildren() {
    
    for(let i=0; i<this.screenNum ; i++) {
      let li = document.createElement('li')
      li.setAttribute('data-i', i)
      this.content.appendChild(li)
      this.liPool.push(li)
      
    }
  }

  render() {
    let num = this.getNum();
    this.currentNum = num;
    
    if (num > data.length - this.screenNum) {
      num = data.length - this.screenNum
    } else if (num<5){
      num = 0
    } else {
      num = num-5
    }

   
    
    this.liPool.forEach((li,i)=> {
      li.style.top = ((num + i)*this.cellHeight) + 'px'
      li.innerText = this.data[i+num]
    })
  }

  scrollEv() {

    if (Math.abs(this.getNum()-this.currentNum)>5) {
      this.render()
    }

  }

  getNum() {
    var scrollTop = this.wrap.scrollTop
    return Math.floor(scrollTop/this.cellHeight)
  }
}

new ScrollUtil(wrap, content, data)