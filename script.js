'use strict'

class Animal {
    static counter = +localStorage.getItem('counter') || 0
    constructor(name, age, type, isHomeless, description) {
        this._name = name
        this._age = age
        this._type = type
        this._isHomeless = isHomeless
        this._description = description
        this._id = ++Animal.counter
    }

    //getters
    get name() {
        return this._name
    }
    get age() {
        return this._age
    }
    get type() {
        return this._type
    }
    get isHomeless() {
        return this._isHomeless
    }
    get description() {
        return this._description
    }
    get id() {
        return this._id
    }

    //setters
    set name(str) {
        this._name = str
    }
    set age(num) {
        this._age = num
    }
    set type(str) {
        this._type = str
    }
    set isHomeless(boo) {
        this._isHomeless = boo
    }
    set description(str) {
        this._description = str
    }

    deleteFromTable(id) {
        animalObjects.forEach((obj, index) => {
            if (obj.id == id) {
                animalObjects.splice(animalObjects[index], 1)
                animals.splice(animals[index], 1)
                localStorage.setItem('animals', JSON.stringify(animals))
                renderTable(animalObjects);
            }
        })
    }

}



class Cat extends Animal {
    constructor(name, age, type, isHomeless, description, breed, size) {
        super(name, age, type, isHomeless, description)
        this._breed = breed
        this._size = size
    }

    //getters
    get breed() {
        return this._breed
    }
    get size() {
        return this._size
    }

    //setters
    set breed(str) {
        this._breed = str
    }
    set size(num) {
        this._size = num
    }
}

class Dog extends Animal {
    constructor(name, age, type, isHomeless, description, breed, size) {
        super(name, age, type, isHomeless, description)
        this._breed = breed
        this._size = size
    }

    //getters
    get breed() {
        return this._breed
    }
    get size() {
        return this._size
    }

    //setters
    set breed(str) {
        this._breed = str
    }
    set size(num) {
        this._size = num
    }
}

class Bird extends Animal {
    constructor(name, age, type, isHomeless, description, kind, color) {
        super(name, age, type, isHomeless, description)
        this._kind = kind
        this._color = color
    }

    //getters
    get kind() {
        return this._kind
    }
    get color() {
        return this._color
    }

    //setters
    set kind(str) {
        this._kind = str
    }
    set color(str) {
        this._color = str
    }
}

//грызун 
class Rodent extends Animal {
    constructor(name, age, type, isHomeless, description, kind, size) {
        super(name, age, type, isHomeless, description)
        this._kind = kind
        this._size = size
    }

    //getters
    get kind() {
        return this._kind
    }
    get size() {
        return this._size
    }

    //setters
    set kind(str) {
        this._kind = str
    }
    set size(num) {
        this._size = num
    }
}

//КРС
class Cattle extends Animal {
    constructor(name, age, type, isHomeless, description, kind, isGivesMilk) {
        super(name, age, type, isHomeless, description)
        this._kind = kind
        this._isGivesMilk = isGivesMilk
    }

    //getters
    get kind() {
        return this._kind
    }
    get isGivesMilk() {
        return this._isGivesMilk
    }

    //setters
    set kind(str) {
        this._kind = str
    }
    set isGivesMilk(boo) {
        this._isGivesMilk = boo
    }
}
const translates = {
    cat: 'Коты',
    dog: 'Собаки',
    bird: 'Птицы',
    rodent: 'Грызуны',
    cattle: 'Крупный рогатый скот'
}
const animals = JSON.parse(localStorage.getItem('animals')) || []

if (animals.length === 0) {
    Animal.counter = 0
    localStorage.removeItem('counter')
}

const form = document.querySelector('.form')
const submit = document.getElementById('submit')
const isHomeless = document.getElementById('is-homeless')
const animalName = document.getElementById('animal-name')
const animalType = document.getElementById('animal-type')

let deleteBtn = document.querySelectorAll('.delete-btn')
let animalObjects = []


const createAnimal = function (args) {
    const params = [...args]
    const inputValues = []
    params.forEach(parametr => {
        const value = {
            name: parametr.name,
            val: parametr.value,
            isChecked: parametr.checked
        }
        inputValues.push(value)
    })

    let newAnimal
    switch (inputValues[0].val) {
        case 'cat':
            newAnimal = new Cat()
            setProperties(newAnimal, inputValues)
            animals.push(newAnimal)
            animalObjects.push(newAnimal)
            break;
        case 'dog':
            newAnimal = new Dog()
            setProperties(newAnimal, inputValues)
            animals.push(newAnimal)
            animalObjects.push(newAnimal)
            break;
        case 'bird':
            newAnimal = new Bird()
            setProperties(newAnimal, inputValues)
            animals.push(newAnimal)
            animalObjects.push(newAnimal)
            break;
        case 'rodent':
            newAnimal = new Rodent()
            setProperties(newAnimal, inputValues)
            animals.push(newAnimal)
            animalObjects.push(newAnimal)
            break;
        case 'cattle':
            newAnimal = new Cattle()
            setProperties(newAnimal, inputValues)
            animals.push(newAnimal)
            animalObjects.push(newAnimal)
            break;
    }
    localStorage.setItem('animals', JSON.stringify(animals))
    localStorage.setItem('counter', Animal.counter)
}

const setProperties = function (animal, props) {
    props.forEach((prop, index) => {
        if (prop.val) {
            if (index !== props.length - 1) {
                if (index === 2) {
                    animal[prop.name] = prop.isChecked
                } else if (index === 8) {
                    if (animal.type === 'cattle') {
                        animal[prop.name] = prop.isChecked
                    }
                } else {
                    animal[prop.name] = prop.val
                }
            }
        }
    })
}

const setValuesForAnimal = function (animal, props) {
    for (let key in props) {
        animal[key] = props[key]
    }
}

const createAnimalObjects = function (animals) {
    const animalObjs = []
    let newAnimal
    animals.forEach(animal => {
        switch (animal._type) {
            case 'cat':
                newAnimal = new Cat()
                setValuesForAnimal(newAnimal, animal)
                animalObjs.push(newAnimal)
                break;
            case 'dog':
                newAnimal = new Dog()
                setValuesForAnimal(newAnimal, animal)
                animalObjs.push(newAnimal)
                break;
            case 'bird':
                newAnimal = new Bird()
                setValuesForAnimal(newAnimal, animal)
                animalObjs.push(newAnimal)
                break;
            case 'rodent':
                newAnimal = new Rodent()
                setValuesForAnimal(newAnimal, animal)
                animalObjs.push(newAnimal)
                break;
            case 'cattle':
                newAnimal = new Cattle()
                setValuesForAnimal(newAnimal, animal)
                animalObjs.push(newAnimal)
                break;
        }
    })
    return animalObjs;
}

const renderTable = function (arr) {
    const table = document.querySelector('table')
    table.querySelectorAll('tr:not(:first-child)').forEach(tr => {
        tr.remove()
    })
    arr.forEach(animal => {
        const tr = document.createElement('tr')
        tr.dataset.index = animal._id
        tr.innerHTML = `<td>${translates[animal._type]}</td>
					<td>${animal._name ? animal._name.toUpperCase()[0] + animal._name.toLowerCase().slice(1) : 'Безымянный'}</td>
					<td>${animal._isHomeless ? '&#10004;': '&#10008;'}</td>
					<td>${animal._age}</td>
					<td>${animal._breed || 'Не предусмотрено'}</td>
					<td>${animal._size || 'Не предусмотрено'}</td>
					<td>${animal._kind || 'Не предусмотрено'}</td>
					<td>${animal._color || 'Не предусмотрено'}</td>
					<td>${animal._isGivesMilk ? '&#10004;' : '&#10008;'}</td>
					<td>${animal._description}</td>
					<td>
						<button class="delete-btn" data-index-btn="${animal._id}">Удалить</button>
					</td>`
        table.append(tr)
    })
    deleteBtn = table.querySelectorAll('.delete-btn')
    deleteBtn.forEach(btn => {
        const id = btn.dataset.indexBtn
        let animalForDelete
        animalObjects.forEach(obj => {
            if (obj.id == id) {
                animalForDelete = obj
            }
        })
        btn.addEventListener('click', () => {
            animalForDelete.deleteFromTable(id)
        })
    })
}

const createTable = function () {
    const contentTable = document.querySelector('.content__table')
    const table = document.createElement('table')
    table.classList.add('table')
    const tr = document.createElement('tr')
    tr.innerHTML = `<th>Тип животного</th>
					<th>Кличка</th>
					<th>Бездомный</th>
					<th>Возраст</th>
					<th>Порода</th>
					<th>Размер</th>
					<th>Вид</th>
					<th>Расцветка</th>
					<th>Дает молоко</th>
					<th>Описание, симптомы</th>
					<th>
					</th>`
    table.append(tr)

    contentTable.append(table)
}
form.addEventListener('submit', (event) => {
    event.preventDefault()


    createAnimal(Array.from(event.target));
    renderTable(animals)

    //очистка инпутов
    const inputs = form.querySelectorAll('select, input[type=text], input[type=number], textarea')
    inputs.forEach(input => {
        input.disabled = false
        input.value = ''
    })
    const checkboxes = form.querySelectorAll('input[type=checkbox]')
    checkboxes.forEach(check => {
        check.checked = false
    })

})

isHomeless.addEventListener('change', () => {
    animalName.disabled = !animalName.disabled
    animalName.required = !animalName.required
})

animalType.addEventListener('change', (event) => {
    const inputGroup = document.querySelectorAll('.input-group')
    inputGroup.forEach(group => {
        group.classList.add('hidden')
        group.querySelector('input').required = false
    })
    let properties

    //открываем скрытые инпуты в зависимости от выбранного типа животного
    switch (event.target.value) {
        case 'cat':
            properties = document.querySelectorAll('.breed, .size')
            properties.forEach(prop => {
                prop.classList.remove('hidden');
                prop.querySelector('input').required = true
            })
            break;
        case 'dog':
            properties = document.querySelectorAll('.breed, .size')
            properties.forEach(prop => {
                prop.classList.remove('hidden');
                prop.querySelector('input').required = true
            })
            break;
        case 'bird':
            properties = document.querySelectorAll('.kind, .color')
            properties.forEach(prop => {
                prop.classList.remove('hidden');
                prop.querySelector('input').required = true
            })
            break;
        case 'rodent':
            properties = document.querySelectorAll('.kind, .size')
            properties.forEach(prop => {
                prop.classList.remove('hidden');
                prop.querySelector('input').required = true
            })
            break;
        case 'cattle':
            properties = document.querySelectorAll('.kind, .is-milk')
            properties.forEach(prop => {
                prop.classList.remove('hidden');
                if (prop.querySelector('input:not([type=checkbox])')) {
                    prop.querySelector('input:not([type=checkbox])').required = true
                }
            })
            break;
        case '':
            break;
    }
})


createTable()
animalObjects = createAnimalObjects(animals)
renderTable(animalObjects)