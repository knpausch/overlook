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
})
