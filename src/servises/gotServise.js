export default class GotService {// мы пишем отдельный класс для доступа к нашему api внутри с помощью конструктора мы передаем свойство- адрес нашей базы данных и методы по получению наших ресурсов, а именно метод гет ресурс, который обращается к базе и запрашивает конкретный требуемый материал
    // для запроса разных сущностей у нас есть доп методы, работающие на основе метода getresourse
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';// нижним подчеркиванием показываем, что это статичные данные, которые не следует изменять(инфа для других разрабов)
    }

    getResource = async (url) => {// мы добавляем async для того чтобы показать асинхронность следующей за ней операции
        const res = await fetch(`${this._apiBase}${url}`);//await говорит, что мы ждем выполнения запроса перед тем как продолжать делать код. Так же мы при помощи рег. выражений складываем часть от айпибащы и часть от переданного пользователем ЮРЛ в каждый
    
        if (!res.ok) {// выкидываем ошибку если фетч не возврашает статус ок 
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();// так как .json() тоже возвращает промис, т.е. асинхронный код, мы тоже должны добавить await 
    }

    getAllBooks = async () => {// мы передаем путь, который фетчим в каждом методе
        return this.getResource(`/books/`);
    }
    
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }
    
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);//мы указываем с каой страницы мы хотим получать данные из базы, а именно с 5 страницы начинаем и получаем 10 записей из базы
        return res.map(this._transformCharacter) // таким образом мы получем массив данных из базы данных и после этого с помощью map трансформируем в тот вид, в который нужно
    }
    
    getCharacter  = async (id) =>{
        const character =  await this.getResource(`/characters/${id}`);//мы ищем определенного персонажа в базе данных по уникальному айдишнику
        return this._transformCharacter(character);
            
    }
    
    getAllHouses = async () =>{
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) =>{
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    isSet(data) { 
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }    
    
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }
    _transformCharacter =  (char) => {// для того чтобы не дублировать постоянно данные о персонаже, мы создадим универсальную функцию по изменению персонажа
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        };
    }
    _transformHouse =  (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        };
    }
    
    _transformBook(book) {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        };
    }
}