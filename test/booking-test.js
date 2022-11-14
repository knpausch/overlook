import chai from 'chai'
import Booking from '../src/Booking'

import { bookingSample } from './booking-sample'

const expect = chai.expect

let booking1
let booking2

describe('Booking Class', function() {
    beforeEach(() => {
        booking1 = new Booking(bookingSample[0])
        booking2 = new Booking(bookingSample[1])
    })

  it('should set booking id', function() {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz")
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6t5")
  })

  it('should set booking userID', function() {
    expect(booking1.userID).to.equal(9)
    expect(booking2.userID).to.equal(1)
  })

  it('should set booking date', function() {
    expect(booking1.date).to.equal("2022/04/22")
    expect(booking2.date).to.equal("2022/01/24")
  })

  it('should set booking roomNumber', function() {
    expect(booking1.roomNumber).to.equal(15)
    expect(booking2.roomNumber).to.equal(24)
  })

  it('should set booking numberedDate to 0', function() {
    expect(booking1.numberedDate).to.equal(0)
  })

  it('should update booking numberedDate to a formated date', function() {
    booking1.formatDate()
    expect(booking1.numberedDate).to.equal(20220422)
    booking2.formatDate()
    expect(booking2.numberedDate).to.equal(20220124)
  })
})
