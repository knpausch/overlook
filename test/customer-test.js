import chai from 'chai'
import Customer from '../src/Customer'
import Booking from '../src/Booking'
import { customerSample } from './customer-sample'
import { bookingSample } from './booking-sample'

const expect = chai.expect

let customer1, customer2

describe('Customer Class', function() {
    beforeEach(() => {
        customer1 = new Customer(customerSample[0])
        customer2 = new Customer(customerSample[1])
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

  it('should create a new Booking object', function() {
    // customer1.createBooking()

    // expect(customer1.allBookings).to.deep.equal([])
    // expect(customer2.allBookings).to.deep.equal([])
  })

})
