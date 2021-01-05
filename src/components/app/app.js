// this.props.children -  позволяет передавать в компонент все что угодно, массвы, объекты или число, все , что передавется в компонент попадает в это свойство.


import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import './app.css';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import CharacterPage from '../characterPage';
import GotService from '../../servises/gotServise.js';

export default class App extends Component {
    gotServise = new GotService();

    
    // делаем из аппа отдельный класс, так как теперь у нас появляется состояние компонента и надо за ним следить. 
    state = {// выставляем значения по умолчанию для компонента, показ элемента в тру, показ ошибки в фолс
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {// хук для отлавливания ошибок в приложении, если они возникают.
        this.setState({
            error: true,
        })
    }
    toggleRandomChar = () => {// метод тоглинга показа компонента
        this.setState((state) => {// передаем стэйт метод сэтстейт
            return {
                showRandomChar: !state.showRandomChar// перезаписываем значение показа стэйта
            }
        });
    }



    render() {
        if (this.state.error) {// мутим условие, что если стэйт ошибка верна, то показываем ошибку
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;// тернарный оператор, если у нас показ персонажа возвращает тру, то мы показываем этот блок рандом чар
        return (
            <> 
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
            </>
        );
    }
};