import Sprite from "/modules/sprite.js" // імпортуємо Sprite 

class Rect{
// передаємо властивості: кординати,ширина,висота,шлях до картинки, колір 
    constructor (x,y,width,height,element) {
        this.X = x
        this.Y = y
        this.MOVE_RIGHT = true
        this.HEIGHT = height
        this.WIDTH = width
        this.ELEMENT = element
        this.RECT = this.getRect(this.ELEMENT) // отримано з getRect
    }
// Створюємо метод "getRect" для повернення властивостей
    getRect(element) {
      // Отримуємо "ELEMENT"
      // console.log(element)
        let box = element.getBoundingClientRect();
        return {
          // Повертаємо властовості: 'право, ліво, верх, низ'
            right: box.right,
            left: box.left,
            top: box.top,
            bottom: box.bottom
        }
    }
    collisionRight(listElem, rect){
        let collision = false;
        for (let elem of listElem){
		    let rectElem = this.getRect(elem.ELEMENT);
		    if (rect.bottom > rectElem.top && rect.top < rectElem.bottom){
                if (rect.left <= rectElem.left && rect.right >= rectElem.left){
                    collision = true;
                    break
                }
                else{
                    collision = false;
                }
            }
		    else{
                collision = false;
		    }
	    }
	    return collision
    };
    collisionLeft(listElem, rect){
        let collision = false;
            for (let elem of listElem){
                let rectElem = this.getRect(elem.ELEMENT);
                if (rect.bottom > rectElem.top && rect.top < rectElem.bottom){
                        if (rect.right >= rectElem.right && rect.left <= rectElem.right){
                            collision = true;
                            break
                        }
                        else{
                            collision = false;
                        }
                    }
                else{
                        collision = false;
                }
            }
        return collision
    }
    collisionBottom(listElem, rect){
      let collision = false;
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT);
            if (rect.right > rectElem.left && rect.left < rectElem.right){

                if (rect.bottom >= rectElem.top && rect.top < rectElem.top){
                    collision = true;
                    break
                }
                else{
                    collision = false;
                }
                }
            else{
                collision = false;
            }
        }
      return collision
  }
}
// Єкспортуємо объект "Rect"
export default Rect