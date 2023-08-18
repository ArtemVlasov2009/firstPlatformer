
class Sprite { //Создаем класс-родитель Sprite
    constructor(x,y,width,height,imgPath = undefined,color = undefined,tagName="div") { //Иницилизируем обьекты,созданных,с помощью класса 
        this.X = x; //Свойство координаты Х спрайта
        this.Y = y; //Свойство координаты Y спрайта
        this.WIDTH = width; //Свойство ширины спрайта
        this.HEIGHT = height; //Свойство высоты спрайта
        this.COLOR = color; //Свойство цвета спрайта 
        this.IMG_PATH = imgPath; //Свойство картинки спрайта
        this.ELEMENT = document.createElement(tagName); //Создаем HTML элемент tagName

        document.body.append(this.ELEMENT);

        if (tagName == "img" && imgPath != undefined){
            this.ELEMENT.src = imgPath;
        }
        this.ELEMENT.style.width = `${this.WIDTH}px`;
        // задаємо висоту героя
        this.ELEMENT.style.height = `${this.HEIGHT}px`;
        this.ELEMENT.style.position = "absolute";
        this.ELEMENT.style.left = `${this.X}px`;
        this.ELEMENT.style.top = `${this.Y}px`;
    }
}
export default Sprite //Експортируем класс Sprite