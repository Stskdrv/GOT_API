// import React, {Component} from 'react';
// import {Col, Row, Container} from 'reactstrap';
// import Header from '../header';
// import RandomChar from '../randomChar';
// import ErrorMessage from '../errorMessage';
// import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
// import gotService from '../../servises/gotService';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

// import './app.css';


// export default class App extends Component {
//     gotService = new gotService();

//     state = {
//         showRandomChar: true,
//         error: false,
//         selectedHouse: 20
//     };

//     componentDidCatch() {
//         console.log('error');
//         this.setState({
//             error: true
//         })
//     }

//     toggleRandomChar = () => {
//         this.setState((state) => {
//             return {
//                 showRandomChar: !state.showRandomChar
//             }
//         });
//     };


//     render() {
//         const char = this.state.showRandomChar ? <RandomChar/> : null;

//         if (this.state.error) {
//             return <ErrorMessage/>
//         }

//         return (
//             <Router> 
//                 <div className='app'>
//                     <Container>
//                         <Header />
//                     </Container>
//                     <Container>
//                         <Row>
//                             <Col lg={{size: 5, offset: 0}}>
//                             {char}
//                             <button 
//                                 className="toggle-btn"
//                                 onClick={this.toggleRandomChar}>Toggle random character</button>
//                             </Col>
//                         </Row>
//                         <Route path='/' component={() => <h1>Welcome to GOT DB</h1>} exact/>
//                         <Route path='/characters' component={CharacterPage} />
//                         <Route path='/books' component={BooksPage} exact/>
//                         <Route path='/books/:id' render={({match}) => {
//                             const {id} = match.params;
//                         return <BooksItem bookId={id}/>}}/>
//                         <Route path='/houses' component={HousesPage} />
//                     </Container>
//                 </div>
//             </Router>
//         )
//     }

// };

// this.props.children -  позволяет передавать в компонент все что угодно, массвы, объекты или число, все , что передавется в компонент попадает в это свойство.

// React ROuter - переключение между частями приложения, страницами, так как у нас приложение SPA одостраничное, без перезагрузки, это не совсем страницы, а скрытие одной информации и показ другой, routing тим и занимается . Router -  компонент, который знает что надо показать  а что скрыть. Библиотека реакет роутер занимается тем, что узнает какой элемент должен быть отображен по данному URL и при переходе на другую страницу она отображает то, что требуется.

import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import './app.css';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
/* import CharacterPage from '../characterPage'; */
import GotService from '../../servises/gotServise.js';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';


export default class App extends Component {
    gotServise = new GotService();

    
    // делаем из аппа отдельный класс, так как теперь у нас появляется состояние компонента и надо за ним следить. 
    state = {// выставляем значения по умолчанию для компонента, показ элемента в тру, показ ошибки в фолс
        showRandomChar: true,
        error: false,
        selectedHouse: 20
    }

    componentDidCatch() {// хук для отлавливания ошибок в приложении, если они возникают.
        this.setState({
            error: true,
        })
    }
    toggleRandomChar = () => {// метод тоглинга показа компонента
        this.setState((state) => {// передаем стэйт метод сэтстейт
            return {
                showRandomChar: !state.showRandomChar // перезаписываем значение показа стэйта
            }
        });
    }



    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        /*         if (this.state.error) {// мутим условие, что если стэйт ошибка верна, то показываем ошибку
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;// тернарный оператор, если у нас показ персонажа возвращает тру, то мы показываем этот блок рандом чар */
        return ( // оборачиваем всю верстку в рутер компонент
            <Router >
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                            </Col>
                        </Row>
                        {/*с помощью компонента роут помещаем элементы на страницу, у него есть атрибуты Path -путь к нашей страницы, вторым атрибутом передаем компонент кторый будем рендерить(название),  */}
                        <Route path='/' component={() => <h1>Welcome to GOT DB</h1>} exact/>
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact/>
                        <Route path='/books/:id' render={({match}) => { // создаем функцию рендер, которая будет возвращать требуемый компонент booksItem, для того, чтобы правильно отображать книгу по айди, будем передавать его через пропсы из компонента роутер. Во внутрь функции передаем аргументы, приходящие из эл роут. Мэтч это объект записи о том, как именно path совпал с текущим адресом, и в нем есть параметр id. В мэтч есть параметр params: в который попадает id элемента. Так же есть ЮРЛ и path. поэтому потом через константу деструктур вытаскиваем айди из мэтча. Далее передаем его в проперти элемента bookId.
                            const {id} = match.params;
                        return <BooksItem bookId={id}/>}}/>
                        <Route path='/houses' component={HousesPage} />
                    </Container>
                </div>
            </Router>

/* без библиотеки роутинга            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button // создаем кнопку, которая при нажатии запускает метод тоглинга рандомного персонажа и тем самым меняет стэйт компонента
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotServise.getAllBooks // теперь этот айтемлист получит проперти метод для получения всех книг 
                            }
                            renderItem={(item) => `${item.name}`}
                            /> 
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotServise.getAllHouses}
                            renderItem={(item) => `${item.name}(${item.gender })`}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    
                </Container>
            </> */
        );
    }
};