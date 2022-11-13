import chai from 'chai'
import Customer from '../src/Customer'
import Booking from '../src/Booking'
import { customerSample } from './customer-sample'
import { bookingSample } from './booking-sample'

const expect = chai.expect

let customer1
let customer2
let bookingData

describe('Customer Class', function() {
    beforeEach(() => {
        customer1 = new Customer(customerSample[0])
        customer2 = new Customer(customerSample[1])

        bookingData = bookingSample.map((currentBooking) => {
            return new Booking(currentBooking)
        })
    })

  it('should set customer id', function() {
    expect(customer1.id).to.equal(1)
    expect(customer2.id).to.equal(2)
  })

  it('should set customer name', function() {
    expect(customer1.name).to.equal('Leatha Ullrich')
    expect(customer2.name).to.equal('Rocio Schuster')
  })

  it('should set pastBookings property to an empty array', function() {
    expect(customer1.pastBookings).to.deep.equal([])
    expect(customer2.pastBookings).to.deep.equal([])
  })

  it('should set upcomingBookings property to an empty array', function() {
    expect(customer1.upcomingBookings).to.deep.equal([])
    expect(customer2.upcomingBookings).to.deep.equal([])
  })

  it('should set allBookings property to an empty array', function() {
    expect(customer1.allBookings).to.deep.equal([])
    expect(customer2.allBookings).to.deep.equal([])
  })

  it('should create an array of new Booking objects', function() {
    const result1 = customer1.createBooking(bookingSample)
    expect(result1.length).to.equal(7)
    expect(typeof result1).to.equal('object')
    expect(result1).to.deep.equal(([
        {id: '5fwrgu4i7k55hl6sz', userID: 9, date: '2022/04/22', roomNumber: 15, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t5', userID: 1, date: '2022/01/24', roomNumber: 24, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t6', userID: 13, date: '2022/01/10', roomNumber: 12, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t7', userID: 20, date: '2022/02/16', roomNumber: 7, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t8', userID: 1, date: '2023/02/05', roomNumber: 12, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t9', userID: 2, date: '2023/12/14', roomNumber: 14, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6ta', userID: 25, date: '2022/01/11', roomNumber: 9, numberedDate: 0}
    ]))

    const result2 = customer2.createBooking(bookingSample)
    expect(result1.length).to.equal(7)
    expect(typeof result2).to.equal('object')
    expect(result2).to.deep.equal(([
        {id: '5fwrgu4i7k55hl6sz', userID: 9, date: '2022/04/22', roomNumber: 15, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t5', userID: 1, date: '2022/01/24', roomNumber: 24, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t6', userID: 13, date: '2022/01/10', roomNumber: 12, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t7', userID: 20, date: '2022/02/16', roomNumber: 7, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t8', userID: 1, date: '2023/02/05', roomNumber: 12, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6t9', userID: 2, date: '2023/12/14', roomNumber: 14, numberedDate: 0},
        {id: '5fwrgu4i7k55hl6ta', userID: 25, date: '2022/01/11', roomNumber: 9, numberedDate: 0}
    ]))
  })

  it('should update allBookings property with all bookings associated with the customer', function() {
    customer1.findCustomersBookings(bookingSample)
    expect(customer1.allBookings).to.deep.equal([
        {id: '5fwrgu4i7k55hl6t5', userID: 1, date: '2022/01/24', roomNumber: 24},
        {id: '5fwrgu4i7k55hl6t8', userID: 1, date: '2023/02/05', roomNumber: 12}])

    customer2.findCustomersBookings(bookingSample)
    expect(customer2.allBookings).to.deep.equal([
        {id: '5fwrgu4i7k55hl6t9', userID: 2, date: '2023/12/14', roomNumber: 14}])
  })

  it('should update pastBookings property with past bookings associated with the customer', function() {
    customer1.findPastBookings(bookingSample)
    expect(customer1.pastBookings).to.deep.equal([
        {id: '5fwrgu4i7k55hl6t5', userID: 1, date: '2022/01/24', roomNumber: 24}])
  })

  
  
  
})
