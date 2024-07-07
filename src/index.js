
import 'SCSS/styles.scss';

console.log('App.js init');

export default {};


import './styles/main.scss'

// создание свойства класса без конструктора
class Game {
    name = 'Violin Charades'
}
const myGame = new Game()

// создаем параграф
const p = document.createElement('p')
p.textContent = `I like ${myGame.game}.`
console.log("Шо то на непонятном :)")

// создаем элемент заголовка
const heading = document.createElement('h1')
heading.textContent = 'И еще один тестовый заголовк'

// добавляем заголовок в DOM
const root = document.querySelector('#root')
root.append(heading)

import example from './assets/img/costil_logo.jpg'

