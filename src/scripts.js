//////////// Image Import ////////////
import './images/turing-logo.png'
import './images/room-service.png'
import './images/bed.png'
import './images/sad.png'
import './images/happy.png'
import './images/relax.jpg'
import './images/ring-bell.png'
import './images/lobby.jpg'
import './images/hotel.jpg'
import './images/perspective.png'
import './images/calendar.png'

//////////// File Import ////////////
import './css/styles.css';
import getData from './apiCalls'
import Customer from './Customer'

//////////// API URLS ////////////
const customersURL = 'http://localhost:3001/api/v1/customers'

//////////// GLOBAL VARIABLES ////////////
let apiCustomer
let currentCustomer

const currentUser = document.querySelector('#userText')

//////////// EVENT LISTENERS ////////////
window.addEventListener('load', fetchData([customersURL]))

//////////// FUNCTIONS ////////////
function fetchData(urls) {
    Promise.all([getData(urls[0])])
        .then(data => {
            apiCustomer = data[0]
            console.log(apiCustomer.customers[0])
            createCustomer(apiCustomer.customers[0])
            displayAccountInfo()
        })
        .catch(err => console.log(err))
}

function createCustomer(data) {
    currentCustomer = new Customer(data)
    console.log(currentCustomer)
    return currentCustomer
}

function displayAccountInfo(){
    currentUser.innerText = "User: " + currentCustomer.name
}