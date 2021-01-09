import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../servises/gotServise.js';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {
    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            //свойство default props в ситуациях когда пропс не был передан, или мы не хотим его передавать.
            //ItemList.defaultProps = {
            //     onItemSelected: () => {}
            // }
            // берем компонент айтемлист и прописываем свойство дефолтпропс. Он принимает в себя объект, и позволяет устанавливать пропсы по умолчанию, если они не были переданы напрямую. 
            // внутри самого компонента def.props можно устанавливать с помощью такого синтаксиса:
            // static defaultProps = {
                // props
            //}
            // c помощью свойства propTypes мы можем проверять тип данных передаваемых в свойства.Синтаксис:
            // housesPage.propTypes = {
            //     interval: (props,propName, componentName) => {
            //         const value = props[propName];
                        // if (typeof value === 'number' && !isNaN(value)){
                        //     return null
                        // }
                        //return new TypeError(`${componentName}: ${propName} must be a number`)
                        
            //     }
            // }
            //Так же есть библиотека propTypes.Если требуется проверка типа пропсов можо обратиться к ней.(см 102 урок)
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name}) => name}/>
        )

        const itemDetails = (
            <ItemDetails
            itemId={this.state.selectedHouse}
            getData={this.gotService.getHouse} >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )

        return (
           <RowBlock left={itemList} right={itemDetails} />
        )
    }
}