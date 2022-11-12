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
let allRooms
let currentView

//////////// QUERY SELECTORS ////////////
const currentUser = document.querySelector('#userText')
const pastBookingsList = document.querySelector('#pastReservationsDatalist')
const amountText = document.querySelector('#amountText')
const upcomingBookingsList = document.querySelector('#upcomingReservationsDatalist')
const bookingViewButton = document.querySelector('#bookingViewButton')
const reservationPage = document.querySelector('#reservationView')
const bookingPage = document.querySelector('#bookingView')
const reservationViewButton = document.querySelector('#reservationViewButton')
const currentViewText = document.querySelector('#currentViewText')
const bookingControlsContainer = document.querySelector('#bookingControlsContainer')
const requestedDate = document.querySelector('#requestedDate')
const submitDateButton = document.querySelector('#submitDateButton')
const availableRoomsDatalist = document.querySelector('#availableRoomsDatalist')

//////////// EVENT LISTENERS ////////////
window.addEventListener('load', fetchData([customersURL, bookingsURL, roomsURL]))
bookingViewButton.addEventListener('click', showbookingView)
bookingControlsContainer.addEventListener('click', stopRefreshing)
reservationViewButton.addEventListener('click', showReservationsView)
submitDateButton.addEventListener('click', getRequestedDate)

//////////// FUNCTIONS ////////////
function fetchData(urls) {
    Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
        .then(data => {
            apiCustomer = data[0].customers
            apiBookings = data[1].bookings
            apiRooms = data[2].rooms
            createCustomer(apiCustomer)
            createRooms(apiRooms)
            displayAccountInfo()
        })
        .catch(err => console.log(err))
}

function createCustomer(data) {
    const randomUser = data[Math.floor(Math.random() * data.length)]
    currentCustomer = new Customer(randomUser)
    // currentCustomer = new Customer(data)
    console.log(currentCustomer)
    allBookings = currentCustomer.createBooking(apiBookings)
    return currentCustomer
}

function createRooms(data){
    allRooms = data.map((currentBooking) => {
        return new Room(currentBooking)
    })
}

function displayAccountInfo(){
    currentUser.innerText = currentCustomer.name +"'s account"
    currentView = 'reservationView'
    gatherUsersAccountInfo()
    displayPastBookings()
    displayUpcomingBookings()
    displayTotalCost()
}

function gatherUsersAccountInfo(){
    currentCustomer.findPastBookings(allBookings)
    customerPastBookings = currentCustomer.pastBookings

    currentCustomer.findUpcomingBookings(allBookings)
    customerUpcomingBookings = currentCustomer.upcomingBookings
}

function displayPastBookings(){
    let bedGrammar = ''
    let formatedPastBookings = formatReservationInfo(customerPastBookings)
    formatedPastBookings.forEach((booking) => {
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
          <h4 id="past-reservation-item-text">
          ${booking.date}, 
          ${capitalizeFirstLetter(booking.roomType)},
          ${capitalizeFirstLetter(booking.bedSize)},
          ${booking.numBeds} ${bedGrammar}</h4>
        </article>
      </article>`
    })
}

function displayUpcomingBookings(){
    let bedGrammar = ''
    let bidetStatus = ''
    let formatedUpcomingBookings = formatReservationInfo(customerUpcomingBookings)
    formatedUpcomingBookings.forEach((booking) => {
        if(booking.numBeds === 1){
            bedGrammar = 'Bed'
        }
        else{
            bedGrammar = 'Beds'
        }
        if(booking.bidet){
            bidetStatus = "Yes"
        }
        else{
            bidetStatus = "No"
        }
        upcomingBookingsList.innerHTML += 
        `<article class="past-booking-item-container">
        <figure class="calendar-container">
          <img class="calendar-img" src="./images/calendar.png" alt="carton calendar icon">
        </figure>
        <article class="past-text-item-container">
          <h4 id="past-reservation-item-text">
          ${booking.date}, 
          ${capitalizeFirstLetter(booking.roomType)},
          ${capitalizeFirstLetter(booking.bedSize)},
          ${booking.numBeds} ${bedGrammar},
          Bidet: ${bidetStatus}</h4>
        </article>
      </article>`
    })
}

function displayTotalCost(){
    currentCustomer.findCustomersBookings(allBookings)
    const formatedList = formatReservationInfo(currentCustomer.allBookings)

    let cumlativeCharge = formatedList.reduce((total, booking) => {
        total += booking.costPerNight
        return total
    }, 0)
    amountText.innerText = "$"+cumlativeCharge.toFixed(2)
}

function showbookingView(){
    let bedGrammar = ''
    let bidetStatus = ''
    currentViewText.innerText = "Booking View"
    reservationPage.className = "reservation-view hidden"
    bookingPage.className = "booking-view"

    console.log(allRooms)

    allRooms.forEach((currentRoom) => {
        if(currentRoom.numBeds === 1){
            bedGrammar = 'Bed'
        }
        else{
            bedGrammar = 'Beds'
        }
        if(currentRoom.bidet){
            bidetStatus = "Yes"
        }
        else{
            bidetStatus = "No"
        }
        availableRoomsDatalist.innerHTML += 
        `<article class="search-result-item-container">
            <figure class="bed-container">
              <img class="bed-img" src="./images/bed.png" alt="cartoon bed icon">
            </figure>
            <article class="text-search-result-item-container">
              <h4 class="text-search-result-item">
              ${capitalizeFirstLetter(currentRoom.roomType)}, 
              ${capitalizeFirstLetter(currentRoom.bedSize)},
              ${currentRoom.numBeds} ${bedGrammar},
              Bidet: ${bidetStatus}</h4>
            </article>
            <button class="book-button">Book</button>
          </article>`
    })
}

function showReservationsView(){
    currentView = 'reservationView'
    currentViewText.innerText = "Reservation View"
    reservationPage.className = "reservation-view"
    bookingPage.className = "booking-view hidden"
}

function getRequestedDate(){
    console.log("hi son: ", requestedDate.value)

}

function showAvailableRooms(){
    console.log("im ready")
}

//////////// HELPER FUNCTIONS ////////////
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatReservationInfo(reservationList){
    const formatedInfo = reservationList.map((currentBooking) => {
        let customerInfo = {}
        customerInfo.date = currentBooking.date
        customerInfo.id = currentBooking.id
        customerInfo.numberedDate = currentBooking.numberedDate
        const roomInfo = allRooms.find((currentRoom) => {
            return currentRoom.roomNumber === currentBooking.roomNumber
        })
        customerInfo.roomType = roomInfo.roomType
        customerInfo.bidet = roomInfo.bidet
        customerInfo.bedSize = roomInfo.bedSize
        customerInfo.numBeds = roomInfo.numBeds
        customerInfo.costPerNight = roomInfo.costPerNight
        return customerInfo
    })
    return formatedInfo.sort((a, b) => {
        return a.numberedDate - b.numberedDate
    })
}

function stopRefreshing(e){
    e.preventDefault()
}