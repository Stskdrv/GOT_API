import React, {Component, useState, useEffect} from 'react';
// import GotService from '../../servises/gotServise.js';
import Spinner from '../spinner/index.js';
import ErrorMessage from '../error';
import './itemList.css';


// это классовое программирование: в 104 уроке переделываем на функциональное

// export default class ItemList extends Component {
// /*     gotServise = new GotService(); мы вызывеем его на уровень выше, поэтому не требуется*/

//     state = {// так как состояние компонента(данные о списке наших персонажей) будут постоянно меняться и перезаписываться из базы данных, то нам потребуется объект state который будет хранить состояние компонента в нем мы хотеим отразить все данные, которые будем получать для компонента
//         itemList: null,// это список песонажеей, изначально налл
//         error: false// изначально у нас нет ошибки, поэтому ставим в фолс
//     }
    
//     renderItems(arr) {// метод для рендера полученного списка персонажей. Он на вход получает массив и должен его обработать.
//         return arr.map((item) => {

//             const {id} = item; //дестркутуризацией вытаскиваем id из item и помещаем в кей и в обработчик выбора элемента
//             const label = this.props.renderItem(item);

//             //цепочка событый:перед тем, как из метода map возвращать элементы,  мы передаем сверху функцию рендерайтем котораф принимет в себя объект и возвращает из него только свойство имя,далее внутри айтем листа мы создаем переменную лэйбл, она создается из функции, которая срабатывает на этом конкретом айтеме, и будет возворащено лишь значение присущее этому айтему и далее мы его кладем на место айтем нэйм. С помощью такой операции мы можем сверху контролировать то, что нам нужно...Это и называется рендер-функция, она нам позволяет контролировать что нужно отображать в итоге. Определение Рендар функция- функция, которая передаетс яв компонент для отображения части его содержимого , это позволяет контролировать этот компонент извне, при ее задании используем render
            
//             return (// когда мы создаем на странице элементы с помощью такого способа, мы обязательно должы передать уникальное значение ключа.

//                 <li 
//                 key={id}               
//                 className="list-group-item"
//                 onClick={ () => this.props.onItemSelected(id)}>
//                     {label}
//                 </li>
//             )
//         })

//     }

//     componentDidMount() {// При монтировании компонента делаем запрос на сервер для получения списка песонажей, после получения промиса мы обрабатываем его и записываем полученный ответ в стэйт.

//         const {getData} = this.props;// мы получаем как проперти функцию get data, из пропсов

// /*         this.gotServise.getAllCharacters()  мы меняем команду, которая стояла раньше на  по запросу через готсервис на новую функцию getData, этот сервис нам не нужен так как мы его производим на уровень выше.*/
//         getData()    
//             .then( (itemList) => {
//                 this.setState({
//                     itemList,
//                     error: false
//                 });
//             })
// /*             .catch(() => {this.onError()}); */
//     }
// /*     componentDidCatch(){
//         this.setState({
//             itemList: null,
//             error: true
//         })
//     }
//     onError(status){
//         this.setState({
//             itemList: null,
//             error: true
//         })
//     } */


//     render() {
//         const {itemList, error} = this.state;// создаем константу списка персонажей из стэйта

//         if(error){
//             return <ErrorMessage/>
//         }

//         if(!itemList) {
//             return <Spinner/>// показываем спиннер, пока список не определен
//         }

//         const items = this.renderItems(itemList);
        
//         return (
//             <ul className="item-list list-group">
//                 {items}
//             </ul>
//         );
//     }
// }

// Пример компонентов высшего порядка:
// тут мы создаем безымянный класс обертку, в которой мы можем менять части кода. 
// const f = () => {
//     return class extends Component {
//         render() {
//             return <ItemList {...this.props}/>// таким образом возвращаем компонент итемлист с пропсами
//         }
//     };
// }

// export default f();


// функциональное исполнения по 104 уроку:

function  ItemList ({getData, onItemSelected, renderItem})  {
    /*     gotServise = new GotService(); мы вызывеем его на уровень выше, поэтому не требуется*/

        const [itemList,updateList] = useState([]) // так мы задаем стейт

        useEffect(() => {
            getData()    
                .then( (data) => {
                    updateList(data)
                    });
        }, [])
        
        
        function renderItems(arr) {// метод для рендера полученного списка персонажей. Он на вход получает массив и должен его обработать.
            return arr.map((item) => {
    
                const {id} = item; //дестркутуризацией вытаскиваем id из item и помещаем в кей и в обработчик выбора элемента
                const label = renderItem(item);
    
                //цепочка событый:перед тем, как из метода map возвращать элементы,  мы передаем сверху функцию рендерайтем котораф принимет в себя объект и возвращает из него только свойство имя,далее внутри айтем листа мы создаем переменную лэйбл, она создается из функции, которая срабатывает на этом конкретом айтеме, и будет возворащено лишь значение присущее этому айтему и далее мы его кладем на место айтем нэйм. С помощью такой операции мы можем сверху контролировать то, что нам нужно...Это и называется рендер-функция, она нам позволяет контролировать что нужно отображать в итоге. Определение Рендар функция- функция, которая передаетс яв компонент для отображения части его содержимого , это позволяет контролировать этот компонент извне, при ее задании используем render
                
                return (// когда мы создаем на странице элементы с помощью такого способа, мы обязательно должы передать уникальное значение ключа.
    
                    <li 
                    key={id}               
                    className="list-group-item"
                    onClick={ () => onItemSelected(id)}>
                        {label}
                    </li>
                )
            })
    
        }
    
    

    /*             .catch(() => {this.onError()}); */
        
    /*     componentDidCatch(){
            this.setState({
                itemList: null,
                error: true
            })
        }
        onError(status){
            this.setState({
                itemList: null,
                error: true
            })
        } */
    
    





    if(!itemList) {
        return <Spinner/>// показываем спиннер, пока список не определен
    }

    const items = renderItems(itemList);
    
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}
    
export default ItemList;