import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../servises/gotServise.js';
import {withRouter} from 'react-router-dom';// компонент высшего порядка, нужен для оборачивания других компонентов, для передачи им своих свойств

export class BooksPage extends Component {
    gotService = new GotService();

    state = {
        error: false
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

        return (
            <ItemList 
            onItemSelected={(itemId) => {
                this.props.history.push(itemId)// передаем конечный адрес при нажатии на элемент
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({name}) => name}/>
        )
    }
}
export default withRouter(BooksPage);// таким образом передаем все пропсы компоненту booksPage от высшего компонента