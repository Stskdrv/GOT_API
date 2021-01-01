import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../servises/gotServise.js';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {
 
   //создаем новый инстанс нашего класса ищ отдельного компонента который мы создали для запросов на базу, и теперь его можно юзать в любом месте нашего проекта( в любом компоненте)
    gotServise = new GotService();

    state = {// так как состояние компонента(данные о персовнаже) будут постоянно меняться и перезаписываться из базы данных, то нам потребуется объект state который будет хранить состояние компонента в нем мы хотеим отразить все данные, которые будем получать для компонента
        char: {},
        loading: true,
        error: false
        
    }

    componentDidMount () {// это хук жизненного цикла, в нем мы размещаем инициализацию компонента и формируем внутри все запросы к API, это корректно, так как сначала в реакт приложении запускается конструктор, после этого рендер, только после этого хук маунтинга. Так мы работаем с полностью сформированной структурой приложения, это позволит избежать ошибок обращения к еще не сформированных элементов.
        this.updateChar();
        this.timerId =  setInterval(this.updateChar, 1500);
    }
    componentWillUnmount() {// этот метод вызыввется еще до того, как элемент будет удален со страницы, это лучшее место для размещения остановки саймеров или отписаться в каком то месте.
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState(
            {char,
            loading: false}
        )
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    updateChar = () => {// мы создаем функцию по обновлению нашего рандомного преса, для этого мы задаем некий id, по которому будет выдергиваться персонаж, далее мы вызываем метод gotServise и внутри уже его метод по поиску пероснажа, и в него уже передаем наш id. Однако стоит помнить, что так как он фетчит его с базы, то возвращаеь промис, и нам его надо обработать через метод .then. После создания этой функции нам надо задать момент, где ей нужно вызываться, при перересовке компонента, тем самым мы делаем это в конструкторе
    // Далее мы превратили метод updateChar  в стрелочную функцию, чтобы избежать проблем с контекстом
        const id = Math.floor(Math.random()*140 + 25);// мы делаем выбор рандомного персонажа в диапазоне 25-140
        this.gotServise.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) =>{
    const {name, gender,born,died,culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>

    )
}