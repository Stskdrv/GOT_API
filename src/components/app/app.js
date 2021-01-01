import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../error';
import PersonDetails from '../personDetails';
import './app.css';

export default class App extends Component {// делаем из аппа отдельный класс, так как теперь у нас появляется состояние компонента и надо за ним следить. 
    state = {// выставляем значения по умолчанию для компонента, показ элемента в тру, показ ошибки в фолс
        showRandomChar: true,
        error: false
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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <PersonDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};