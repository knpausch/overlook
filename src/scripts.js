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
let customerUpcomingBookings
let allBookings
let allCustomerBookings

//////////// QUERY SELECTORS ////////////
const currentUser = document.querySelector('#userText')
const pastBookingsList = document.querySelector('#pastReservationsDatalist')
const amountText = document.querySelector('#amountText')
const upcomingBookingsList = document.querySelector('#upcomingReservationsDatalist')

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
    return currentCustomer
}

function displayAccountInfo(){
    currentUser.innerText = currentCustomer.name +"'s account"
    gatherUsersAccountInfo()
    displayPastBookings()
    displayTotalCost()
    displayUpcomingBookings()
}

function gatherUsersAccountInfo(){
    currentCustomer.findPastBookings(allBookings)
    customerPastBookings = currentCustomer.pastBookings
    console.log("past bookings: ", customerPastBookings)

    currentCustomer.findUpcomingBookings(allBookings)
    customerUpcomingBookings = currentCustomer.upcomingBookings
    console.log("upcomming bookings: ", customerUpcomingBookings)
}

function displayPastBookings(){
    let bedGrammar = ''
    customerPastBookings = currentCustomer.formatBookings(apiRooms)
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
          <h4 id="past-reservation-item-text">${booking.date} 
          ${capitalizeFirstLetter(booking.roomType)}, 
          ${capitalizeFirstLetter(booking.bedSize)}, 
          ${booking.numBeds} ${bedGrammar}</h4>
        </article>
      </article>`
    })
}

function displayUpcomingBookings(){
    let bedGrammar = ''
    // customerUpcomingBookings = currentCustomer.formatBookings(apiRooms)
    customerUpcomingBookings.forEach((booking) => {
        if(booking.numBeds === 1){
            bedGrammar = 'Bed'
        }
        else{
            bedGrammar = 'Beds'
        }
        upcomingBookingsList.innerHTML += 
        `<article class="future-booking-item-container">
        <figure class="calendar-container">
          <img class="calendar-img" src="./images/calendar.png" alt="cartoon calendar icon">
        </figure>
        <article class="future-text-item-container">
          <h4>${booking.date}</h4>
        </article>
      </article>`
    })
}

function displayTotalCost(){
    //WIP: Need to finish Rooom class and formatBookings = currently roadblock
    // currentCustomer.findCustomersBookings(allBookings)
    // allCustomerBookings = currentCustomer.allBookings
    // console.log("for real: ", allCustomerBookings)

    let cumlativeCharge = customerPastBookings.reduce((total, booking) => {
        total += booking.costPerNight
        return total
    }, 0)
    amountText.innerText = "$"+cumlativeCharge.toFixed(2)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

//TO DO:
//update displayTotalCost so it is cost of ALL rooms (past and current)
//incorporate Room class and redo formatBookings function in Customer
//sort date in descending order (past and upcoming reservations)