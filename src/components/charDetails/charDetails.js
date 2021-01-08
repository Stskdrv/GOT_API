import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../servises/gotServise.js';
import Spinner from '../spinner';

const Field = ({char, field, label}) => {// создаем сам компонент, который потом передается в chardetails он является стрелочной функцией, которая принимет в себя элемент, поле и отображение, а возвращает кусок верстки, которую мы берем из уже существующего метода рендер.
    
        return(
            <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label} {/* сам лжйбл приходит к нам из пропса, на компонент выше, из характер пэйдж */} </span>
            <span>{char[field]}</span> {/* вытаскиваем поле из объекта item который пришел из API */}
            </li>
        )
}

export {
    Field
}
    
export default class CharDetails extends Component {

    gotServise = new GotService();

    state = {// так как состояние компонента(данные о персовнаже) будут постоянно меняться и перезаписываться из базы данных, то нам потребуется объект state который будет хранить состояние компонента в нем мы хотеим отразить все данные, которые будем получать для компонента
        char: null

    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {// проверяем совпадение текущих пропсов с предыдущими
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }

    }

    updateChar() { // функция для появления персонажа
        const {charId} = this.props;// деструктурируем переменную из пропсов
        if (!charId) {
            return;
        }

        this.gotServise.getCharacter(charId)// тут мы получаем персонажа по айдишнику и кладем в стэйт его 
            .then((char) => {
                this.setState({char})
            })

    }

    render() {

        if (!this.state.char) {
            return <span className='select-error'>Please select char</span>
        }
        
        const {char} = this.state;
        const {name} = char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child)=> {
                            return React.cloneElement(child, {char})
                        })
                    
                    }
                </ul>
            </div>
        );
    }
}