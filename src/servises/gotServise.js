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

    getAllBooks() {// мы передаем путь, который фетчим в каждом методе
        return this.getResource(`/books/`);
    }
    
    getBook(id) {
        return this.getResource(`/books/${id}/`); 
    }
    
     async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);//мы указываем с каой страницы мы хотим получать данные из базы, а именно с 5 страницы начинаем и получаем 10 записей из базы
        return res.map(this._transformCharacter) // таким образом мы получем массив данных из базы данных и после этого с помощью map трансформируем в тот вид, в который нужно
    }
    
    async getCharacter (id) {
        const character =  await this.getResource(`/characters/${id}`);//мы ищем определенного персонажа в базе данных по уникальному айдишнику
        return this._transformCharacter(character);
    }
    
    getAllHouses() {
        return this.getResource(`/houses/`);
    }
    
    getHouse(id) {
        return this.getResource(`/houses/${id}/`);
    }

    _transformCharacter(char) {// для того чтобы не дублировать постоянно данные о персонаже, мы создадим универсальную функцию по изменению персонажа
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
        }
    }
    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        };
    }
    
    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        };
    }
}