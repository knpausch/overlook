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
import Room from './Room'
import Booking from './Booking'

//////////// API URLS ////////////
const customersURL = 'http://localhost:3001/api/v1/customers'
const bookingsURL = 'http://localhost:3001/api/v1/bookings'
const roomsURL = 'http://localhost:3001/api/v1/rooms'

//////////// GLOBAL VARIABLES ////////////
let apiCustomer
let apiBookings
let apiRooms
let currentCustomer

//////////// QUERY SELECTORS ////////////
const currentUser = document.querySelector('#userText')

//////////// EVENT LISTENERS ////////////
window.addEventListener('load', fetchData([customersURL, bookingsURL, roomsURL]))

//////////// FUNCTIONS ////////////
function fetchData(urls) {
    Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
        .then(data => {
            apiCustomer = data[0].customers
            apiBookings = data[1].bookings
            apiRooms = data[2].rooms

            createCustomer(apiCustomer[0])

            displayAccountInfo()
        })
        .catch(err => console.log(err))
}

function createCustomer(data) {
    // const randomUser = data[Math.floor(Math.random() * data.length)]
    // currentCustomer = new Customer(randomUser)
    currentCustomer = new Customer(data)
    console.log(currentCustomer)
    return currentCustomer
}

function displayAccountInfo(){
    currentUser.innerText = "User: " + currentCustomer.name

    currentCustomer.findMyBookings(apiBookings)
    console.log("did it do it?: ", currentCustomer.formatMyBookings(apiRooms))
    // console.log("here: ", currentCustomer.pastBookings)
}