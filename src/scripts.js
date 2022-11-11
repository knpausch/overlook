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
let customerPastBookings
let allBookings

//////////// QUERY SELECTORS ////////////
const currentUser = document.querySelector('#userText')
const pastBookingsList = document.querySelector('#pastReservationsDatalist')
const amountText = document.querySelector('#amountText')

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
    allBookings = currentCustomer.createBooking(apiBookings)
    console.log("come'on boy: ", allBookings[0].year)
    console.log("come'on boy: ", allBookings[0].month)
    console.log("come'on boy: ", allBookings[0].day)

    // console.log("lets try: ", allBookings)
    return currentCustomer
}

function displayAccountInfo(){
    currentUser.innerText = currentCustomer.name +"'s account"
    currentCustomer.findCustomerBookings(allBookings)
    displayPastBookings()
    displayTotalCost()
}

function displayPastBookings(){
    let bedGrammar = ''
    customerPastBookings = currentCustomer.formatBookings(apiRooms)
    console.log("did it do it?: ", customerPastBookings)
    customerPastBookings.forEach((booking) => {
        if(booking.numBeds === 1){
            bedGrammar = 'Bed'
        }
        else{
            bedGrammar = 'Beds'
        }
        pastBookingsList.innerHTML += 
        `<article class="past-booking-item-container">
        <figure class="checkmark-container">
          <img class="check-img" src="./images/perspective.png" alt="green checkmark icon">
        </figure>
        <article class="past-text-item-container">
          <h4 id="past-reservation-item-text"> ${booking.date} 
          ${capitalizeFirstLetter(booking.roomType)}, 
          ${capitalizeFirstLetter(booking.bedSize)}, 
          ${booking.numBeds} ${bedGrammar}</h4>
        </article>
      </article>`
    })
}

function displayTotalCost(){
    let cumlativeCharge = customerPastBookings.reduce((total, booking) => {
        total += booking.costPerNight
        return total
    }, 0)
    amountText.innerText = "$"+cumlativeCharge.toFixed(2)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
