console.log("Шо то на непонятном :)")

// создаем элемент заголовка
const heading = document.createElement('h1')
heading.textContent = 'Тестовый заголовлок'

// добавляем заголовок в DOM
const root = document.querySelector('#root')
root.append(heading)
