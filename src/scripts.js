// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
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

import getData from './apiCalls'
import Customer from './Customer'

const customersURL = 'http://localhost:3001/api/v1/customers'

let apiCustomer
let currentCustomer

console.log('This is the JavaScript entry file - your code begins here.')

window.addEventListener('load', fetchData([customersURL]))

function fetchData(urls) {
    Promise.all([getData(urls[0])])
        .then(data => {
            apiCustomer = data[0]
            console.log(apiCustomer.customers[0])
            createCustomer(apiCustomer.customers[0])
        })
        .catch(err => console.log(err))
}

function createCustomer(data) {
    currentCustomer = new Customer(data)
    return currentCustomer
}