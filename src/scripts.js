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
import './css/styles.css'
import getData from './apiCalls'
import Customer from './Customer'
import Room from './Room'

//////////// API URLS ////////////
let customerURL
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
let allRooms
let customerRequestedDate
let availableRooms
let filteredList
let currentDate
let roomNumToBook
let postData
let customerNumber

//////////// QUERY SELECTORS ////////////
export const viewInfo = document.querySelector('#viewInfo')
export const reservationPage = document.querySelector('#reservationView')
const currentUser = document.querySelector('#userText')
const pastBookingsList = document.querySelector('#pastReservationsDatalist')
const amountText = document.querySelector('#amountText')
const upcomingBookingsList = document.querySelector('#upcomingReservationsDatalist')
const bookingViewButton = document.querySelector('#bookingViewButton')
const bookingPage = document.querySelector('#bookingView')
const reservationViewButton = document.querySelector('#reservationViewButton')
const currentViewText = document.querySelector('#currentViewText')
const bookingControlsContainer = document.querySelector('#bookingControlsContainer')
const requestedDate = document.querySelector('#requestedDate')
const submitDateButton = document.querySelector('#submitDateButton')
const availableRoomsDatalist = document.querySelector('#availableRoomsDatalist')
const roomResults = document.querySelector('#roomResults')
const noResults = document.querySelector('#noResults')
const dropdownMenu = document.querySelector('#dropdownMenu')
const submitFilterButton = document.querySelector('#submitFilterButton')
const badInput = document.querySelector('#badInput')
const badInputMessage = document.querySelector('#badInputMessage')
const savedBooking = document.querySelector('#savedBooking')
const loginButton = document.querySelector('#loginButton')
const username = document.querySelector('#username')
const loginForm = document.querySelector('#loginForm')
const password = document.querySelector('#password')
const incorrectLoginText = document.querySelector('#incorrectLoginText')
const loginView = document.querySelector('#loginView')

//////////// EVENT LISTENERS ////////////
loginForm.addEventListener('click', stopRefreshing)
loginButton.addEventListener('click', verifyLogin)
bookingViewButton.addEventListener('click', showbookingView)
bookingControlsContainer.addEventListener('click', stopRefreshing)
reservationViewButton.addEventListener('click', showReservationsView)
submitDateButton.addEventListener('click', getRequestedDate)
submitFilterButton.addEventListener('click', displayFilteredList)
roomResults.addEventListener('click', addBooking)

//////////// FUNCTIONS ////////////
function verifyLogin(){
    let usernameInput = username.value
    let usernameNumber
    let passwordInput = password.value
    if((usernameInput.length === 9 || usernameInput.length === 10) && passwordInput === 'overlook2021')
    {
        usernameInput = usernameInput.split('')
        usernameInput = (usernameInput.splice(0,8)).join('')
        usernameNumber = username.value.split('')
        usernameNumber = (usernameNumber.splice(8,2)).join('')
        if(usernameInput === 'customer' && (usernameNumber > 0 && usernameNumber <= 50)){
            customerNumber = (Number(usernameNumber)).toString()
            customerURL = `http://localhost:3001/api/v1/customers/${customerNumber}`
            fetchData([customerURL, bookingsURL, roomsURL])
            currentViewText.innerText = 'Reservation View'
            loginView.className = 'login-view hidden'
            reservationPage.className = 'reservation-view'
        }
        else{
            incorrectLoginText.className = 'incorrect-login-text'
        }
    }
    else{
        incorrectLoginText.className = 'incorrect-login-text'
    }
}

function fetchData(urls) {
    Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
        .then(data => {
            apiCustomer = data[0]
            apiBookings = data[1].bookings
            apiRooms = data[2].rooms
            createCustomer(apiCustomer)
            createRooms(apiRooms)
            displayAccountInfo()
            setCurrentDate()
        })
        .catch(err => console.log("Error: " + err))
}

function createCustomer(data) {
    currentCustomer = new Customer(data)
    allBookings = currentCustomer.createBooking(apiBookings)
    return currentCustomer
}

function createRooms(data){
    allRooms = data.map((currentBooking) => {
        return new Room(currentBooking)
    })
}

function displayAccountInfo(){
    currentUser.innerText = currentCustomer.name + "'s account"
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
          <h3 class="past-reservation-item-text">
          ${booking.date}, 
          ${capitalizeFirstLetter(booking.roomType)},
          ${capitalizeFirstLetter(booking.bedSize)},
          ${booking.numBeds} ${bedGrammar}</h3>
        </article>
      </article>`
    })
}

function displayUpcomingBookings(){
    upcomingBookingsList.innerHTML = ''
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
          <h3 class="upcomming-reservation-item-text">
          ${booking.date}, 
          ${capitalizeFirstLetter(booking.roomType)},
          ${capitalizeFirstLetter(booking.bedSize)},
          ${booking.numBeds} ${bedGrammar},
          Bidet: ${bidetStatus}</h3>
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
    amountText.innerText = "$" + cumlativeCharge.toFixed(2)
}

function showbookingView(){
    savedBooking.className = 'saved-booking hidden'
    roomResults.className = 'room-results'
    noResults.className = 'no-results hidden'
    currentViewText.innerText = 'Booking View'
    reservationPage.className = 'reservation-view hidden'
    bookingPage.className = 'booking-view'
    roomResults.className = 'room-results'
    badInput.className = 'bad-input hidden'
}

function showReservationsView(){
    availableRoomsDatalist.innerHTML = ''
    requestedDate.value = ''
    dropdownMenu.value = 'select room'
    currentViewText.innerText = 'Reservation View'
    reservationPage.className = 'reservation-view'
    bookingPage.className = 'booking-view hidden'
    savedBooking.className = 'saved-booking hidden'
    availableRooms = []
}

function getRequestedDate(){
    savedBooking.className = 'saved-booking hidden'
    availableRoomsDatalist.innerHTML = ''
    customerRequestedDate = requestedDate.value.split('-')
    customerRequestedDate = Number(customerRequestedDate.join(''))
    if(requestedDate.value === ''){
        roomResults.className = 'room-results hidden'
        badInput.className = 'bad-input'
        badInputMessage.innerText = 'Please input a date'
    }
    else if(customerRequestedDate < currentDate){
        roomResults.className = 'room-results hidden'
        badInput.className = 'bad-input'
        badInputMessage.innerText = 'Please pick a future date'
    }
    else{
        roomResults.className = 'room-results'
        badInput.className = 'bad-input hidden'
        availableRooms = currentCustomer.findAllAvailableRooms(customerRequestedDate, allBookings, allRooms)
        showAvailableRooms(availableRooms)
    }
}

function showAvailableRooms(availableRooms){
    if(availableRooms.length === 0){
        showApologyMesssage()
    }
    else{
        roomResults.className = 'room-results'
        noResults.className = 'no-results hidden'
        let bedGrammar = ''
        let bidetStatus = ''

        availableRooms.forEach((currentRoom) => {
            if(currentRoom.numBeds === 1){
                bedGrammar = 'Bed'
            }
            else{
                bedGrammar = 'Beds'
            }
            if(currentRoom.bidet){
                bidetStatus = 'Yes'
            }
            else{
                bidetStatus = 'No'
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
                <button class="book-button" id="${currentRoom.roomNumber}">Book</button>
            </article>`
        })
    }
}

function showApologyMesssage(){
    roomResults.className = 'room-results hidden'
    noResults.className = 'no-results'
}

function displayFilteredList(){
    savedBooking.className = 'saved-booking hidden'
    if(dropdownMenu.value === 'select room'){
        roomResults.className = 'room-results hidden'
        badInput.className = 'bad-input'
        badInputMessage.innerText = 'Please select a room type'
        noResults.className = 'no-results hidden'
    }
    else{
        if(availableRooms === undefined){
            roomResults.className = 'room-results hidden'
            badInput.className = 'bad-input'
            badInputMessage.innerText = 'Please input date & room type to see results'
            noResults.className = 'no-results hidden'
        }
        else{
            roomResults.className = 'room-results'
            badInput.className = 'bad-input hidden'
            filteredList = currentCustomer.filterByRoomType(dropdownMenu.value, availableRooms)
            if(filteredList.length > 0){
                availableRoomsDatalist.innerHTML = '' 
                showAvailableRooms(filteredList)
            }
            else{
                showApologyMesssage()
            }
        }
    }
}

function addBooking(event){
    if(event.target.classList.contains('book-button')){
        availableRooms = availableRooms.filter((currentRoom) => {
            return currentRoom.roomNumber != event.target.id
        })
        roomNumToBook = Number(event.target.id)
    }
    formatPostData(currentCustomer.id, customerRequestedDate, roomNumToBook)
    savedBooking.className = 'saved-booking'
    roomResults.className = 'room-results hidden'
    updateReservations(postData)
}

function formatPostData(id, date, roomNumber){
    date = date.toString()
    date = date.split('')
    let year = date.slice(0,4)
    year = year.join('')
    let month = date.slice(4,6)
    month = month.join('')
    let day = date.slice(6,8)
    day = day.join('')
    date = year + '/' + month + '/' + day
    postData = 
    { 
        userID: id, 
        date: date, 
        roomNumber: roomNumber 
    }
}

function updateReservations(formattedPostData){
    return fetch(bookingsURL, {
        method: 'POST',
        body: JSON.stringify(formattedPostData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(test => getData(bookingsURL))
        .then(data => {
            updateBookings(data)
        })
        .catch(err => console.log('Fetch Error: ', err))
}

function updateBookings(newData) {
    allBookings = currentCustomer.createBooking(newData.bookings)
    currentCustomer.findUpcomingBookings(allBookings)
    customerUpcomingBookings = currentCustomer.upcomingBookings
    displayUpcomingBookings()
    displayTotalCost()
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

function setCurrentDate(){
    const date = new Date()
    let currentDay = date.getDate()
    let currentMonth = date.getMonth() + 1
    let currentYear = date.getFullYear()
    currentDate = `${currentYear}${currentMonth}${currentDay}`
    currentDate = Number(currentDate)
}