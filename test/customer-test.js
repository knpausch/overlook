import chai from 'chai'
import Customer from '../src/Customer'
import Booking from '../src/Booking'
import Room from '../src/Room'

import { customerSample } from './customer-sample'
import { bookingSample } from './booking-sample'
import { roomInfo } from './room-data'

const expect = chai.expect

let customer1
let customer2
let bookingData
let roomData
let currentDate

describe('Customer Class', function() {
    beforeEach(() => {
        customer1 = new Customer(customerSample[0])
        customer2 = new Customer(customerSample[1])

        bookingData = bookingSample.map((currentBooking) => {
            return new Booking(currentBooking)
        })
        roomData = roomInfo.map((currentRoom) => {
            return new Room(currentRoom)
        })

        const date = new Date()
        let currentDay = date.getDate()
        let currentMonth = date.getMonth() + 1
        let currentYear = date.getFullYear()
        currentDate = `${currentYear}${currentMonth}${currentDay}`
        currentDate = Number(currentDate)

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
    expect(result1.length).to.equal(bookingData.length)
    // expect(typeof result1).to.equal('object')
    expect(result1).to.deep.equal(bookingData)
    // expect(result1).to.deep.equal(([
    //     {id: '5fwrgu4i7k55hl6sz', userID: 9, date: '2022/04/22', roomNumber: 15, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t5', userID: 1, date: '2022/01/24', roomNumber: 24, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t6', userID: 13, date: '2022/01/10', roomNumber: 12, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t7', userID: 20, date: '2022/02/16', roomNumber: 7, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t8', userID: 1, date: '2023/02/05', roomNumber: 12, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t9', userID: 2, date: '2023/12/14', roomNumber: 14, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6ta', userID: 25, date: '2022/01/11', roomNumber: 9, numberedDate: 0}
    // ]))

    // const result2 = customer2.createBooking(bookingSample)
    // expect(result1.length).to.equal(7)
    // expect(typeof result2).to.equal('object')
    // expect(result2).to.deep.equal(([
    //     {id: '5fwrgu4i7k55hl6sz', userID: 9, date: '2022/04/22', roomNumber: 15, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t5', userID: 1, date: '2022/01/24', roomNumber: 24, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t6', userID: 13, date: '2022/01/10', roomNumber: 12, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t7', userID: 20, date: '2022/02/16', roomNumber: 7, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t8', userID: 1, date: '2023/02/05', roomNumber: 12, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6t9', userID: 2, date: '2023/12/14', roomNumber: 14, numberedDate: 0},
    //     {id: '5fwrgu4i7k55hl6ta', userID: 25, date: '2022/01/11', roomNumber: 9, numberedDate: 0}
    // ]))
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

    customer2.findPastBookings(bookingSample)
    expect(customer2.pastBookings).to.deep.equal([])   
  })

  it('should update upcomingBookings property with upcoming bookings associated with the customer', function() {
    customer1.findUpcomingBookings(bookingSample)
    expect(customer1.upcomingBookings).to.deep.equal([
        {id: '5fwrgu4i7k55hl6t8', userID: 1, date: '2023/02/05', roomNumber: 12}])

    customer2.findUpcomingBookings(bookingSample)
    expect(customer2.upcomingBookings).to.deep.equal([
        {id: '5fwrgu4i7k55hl6t9', userID: 2, date: '2023/12/14', roomNumber: 14}])   
  })

  it('should find all available rooms based upon given date', function() {
    let result1 = customer1.findAllAvailableRooms(20231214, bookingData, roomData)
    expect(result1.length).to.equal(24)

    let result2 = customer1.findAllAvailableRooms(20231223, bookingData, roomData)
    expect(result2.length).to.equal(0)
  })

  it('should filter all available rooms based upon given room type', function() {
    let availableRooms = customer1.findAllAvailableRooms(20231214, bookingData, roomData)
    let result1 = customer1.filterByRoomType("suite", availableRooms)
    expect(result1).to.deep.equal([
        {roomNumber: 2, roomType: 'suite', bidet: false, bedSize: 'full', numBeds: 2, costPerNight: 477.38},
        {roomNumber: 10, roomType: 'suite', bidet: false, bedSize: 'twin', numBeds: 1, costPerNight: 497.64},
        {roomNumber: 24, roomType: 'suite', bidet: false, bedSize: 'queen', numBeds: 1, costPerNight: 327.24}
    ])

    let result2 = customer2.filterByRoomType("kiddie room", availableRooms)
    expect(result2).to.deep.equal([])
  })

  it('should get todays date in number format', function() {
    let result1 = customer1.getCurrentDate()
    expect(result1).to.equal(currentDate)
  })

  
  
})
