import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../error';
import GotService from '../../servises/gotServise.js';
import RowBlock from '../rowBlock';





export default class CharacterPage extends Component {
    gotServise = new GotService();

    state = {
        selectedChar:130,
        error: false,
    }

    onItemSelected = (id) => {// данная функция будет устанавливать id элемента на который мы кликнули в стэйт
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch() {// хук для отлавливания ошибок в приложении, если они возникают.
        this.setState({
            error: true,
        })
    }


    render() {
        if (this.state.error) {// мутим условие, что если стэйт ошибка верна, то показываем ошибку
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotServise.getAllCharacters}
                renderItem={({name,gender}/* вытащили из айтема имя и пол деструктуризацией */) => `${name}(${gender })`}
                /> 
        )
//для того, чтобы показать как работают props.children мы добавляем в клмпонент CharDetails 2 поля, в которые помещаем пол и дату рождения
        const charDetails = (
            <CharDetails charId={this.state.selectedChar}>
                <Field field='gender' label='Gender'/> 
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/> 
                <Field field='culture' label='Culture'/>
            </CharDetails>

            
        )
        return(
            <RowBlock left={itemList} right={charDetails} />
            //мы тут для предотвращения копипасты выносим все элементы в отдельные константы и функции, чтобы более элегантно все выглядело и контроировалось(100ур20мин) это паттерн- использование JSX элементы как свойства компонентов, теперь этот ровблок можно импортировать в другие компоненты и использовать в виде одной строчки, передавая туда только разные аргументы. Э
        )
    }
}