// імпоруємо клас Sprite
import Sprite from "/modules/sprite.js"
import Rect from "./rect.js";
// створюємо клас Hero, який наслідує Sprite
class Hero extends Sprite{
    // передаємо параметри координат, розмірів, шляху до картинки(src) кольору та назви тега, який потім буде у index.html
    constructor(x,y,width,height,imgPath = undefined,color = undefined,tagName="div"){
        // ініціалізуємо параметри, які ми наслідуємо зі Sprite
        super(x,y,width,height,imgPath,color,tagName)
        // задаємо ширину героя
        this.ELEMENT.style.width = `${this.WIDTH}px` ;
        // 
        this.RECT = new Rect(x,y,width,height,this.ELEMENT)
        // задаємо висоту героя
        this.ELEMENT.style.height = `${this.HEIGHT}px`;
        this.SPEED = 3;
        this.IS_JUMP = false;
        this.JUMP_DISTANCE = 90;
        this.IS_GRAVITY = false;
        this.COUNTER = 0;
        // створюємо умову if та у дужки передаємо imgPath, щоб показати, що унас є шлях до малюнка, та малюнок буде виводитися на екран
        if (imgPath != undefined) {
            this.ELEMENT.src = this.IMG_PATH;
        }
        //додаємо елемент до body
        document.body.append(this.ELEMENT)

        
        this.IMG_NUM = 4  //встановлюємо 4 картинку з якої починається рух
        this.ELEMENT.style.position = "absolute"; // встановлюємо абсолютне позіціювання для зміни кординат
    }
    animation(){
        // Створюємо умову перемикання картинок при русі
        // Щоб не було помилки коли номер картинки стає більшим ніж у нас є
        // Або вона не перемикалась на картинку з анімацією стрибка
        console.log(this.IMG_NUM)
        if (this.IMG_NUM >= 8){
            // Повертає початкову картинку
            this.IMG_NUM = 4;
        }
        
        //додаємо 1 до номера картинки
        this.IMG_NUM++; 
        //змінюємо шлях, включаючи до нього картинку з новим номером
        this.IMG_PATH = `images/player/${this.IMG_NUM}.png`; 
        //присвоюємо новий шлях елемента до його src
        this.ELEMENT.src = this.IMG_PATH;
    }
    move(pressedKeys,listElem,listStar){
        let colRight = this.RECT.collisionRight(listElem,this.RECT.getRect(this.ELEMENT))
        let colLeft = this.RECT.collisionLeft(listElem,this.RECT.getRect(this.ELEMENT))
        let colStarRight = this.RECT.collisionRight(listStar,this.RECT.getRect(this.ELEMENT))
        let colStarLeft = this.RECT.collisionLeft(listStar,this.RECT.getRect(this.ELEMENT))
        // console.log(colRight)
        // створюємо умову для руху праворуч
        console.log(pressedKeys)
        if ( pressedKeys["KeyD"] == true && colRight == false){
            // Видаляємо клас 
            this.ELEMENT.classList.remove("left")
            // Додаємо рух вправо для цього елемента
            this.ELEMENT.classList.add("right")
            // Змінюємо х персонажу
            this.X += this.SPEED;
            
            //Змінюємо відступ на екрані
            this.ELEMENT.style.left = `${this.X}px`;
            // Викликаємо метод, що відповідає за анімацію
            this.animation();
            if ( colStarRight == true){
                this.COUNTER ++
               document.querySelector("h1").innerHTML = `зібрано: ${this.COUNTER}` 
               listStar.at(-1).ELEMENT.remove();
               listStar.pop();
            }
        }
        // Створюємо умову для руху ліворуч
        if ( pressedKeys["KeyA"] == true && colLeft == false){
            // Вилучаємо клас .right 
            this.ELEMENT.classList.remove("right")
            // Додаємо клас .left к елементу
            this.ELEMENT.classList.add("left")
            // Змінюємо х персонажу
            this.X -= this.SPEED;
            // Змінюємо відступ на екрані 
            this.ELEMENT.style.left = `${this.X}px`;
            // Викликаємо метод, що відовідає за анімацію
            this.animation();
            if ( colStarLeft == true){
                this.COUNTER ++
               document.querySelector("h1").innerHTML = `зібрано: ${this.COUNTER}` 
               listStar.at(-1).ELEMENT.remove();
               listStar.pop();
            }
        }
        if ( pressedKeys["KeyW"] == true && this.IS_JUMP == false && this.IS_GRAVITY == false){
            this.IS_JUMP = true;
            this.IS_GRAVITY = false;
        }
        if (this.IS_JUMP == true){
            this.jump()
        }

    };
    gravity(listElem, listStar){
        let colBottom = this.RECT.collisionBottom(listElem, this.RECT.getRect(this.ELEMENT));
        let colStarBottom = this.RECT.collisionBottom(listStar, this.RECT.getRect(this.ELEMENT));
        if (colBottom == false && this.IS_JUMP == false){
            this.Y += this.SPEED;
            this.ELEMENT.style.top = `${this.Y}px`;
            this.JUMP_DISTANCE = 90;
            this.IS_GRAVITY = true;
            this.IS_JUMP = false;
            if ( colStarBottom == true){
                this.COUNTER ++
               document.querySelector("h1").innerHTML = `зібрано: ${this.COUNTER}` 
              listStar.at(-1).ELEMENT.remove(); 
              listStar.pop();
               
            }
        }
        else{
            this.IS_GRAVITY = false;
        }
    }
    jump(){
        if (this.IS_GRAVITY == false){
            this.Y -= this.SPEED;
            this.ELEMENT.style.top = `${this.Y}px`;
            this.JUMP_DISTANCE -= this.SPEED;
            if (this.JUMP_DISTANCE <= 0){
                this.IS_JUMP = false;
                this.IS_GRAVITY = true;
            }
        }
    }
}
// 
export default Hero