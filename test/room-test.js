import chai from 'chai'
import Room from '../src/Room'

import { roomInfo } from './room-data'

const expect = chai.expect

let room1
let room2

describe('Room Class', function() {
    beforeEach(() => {
        room1 = new Room(roomInfo[0])
        room2 = new Room(roomInfo[1])
    })

  it('should set room roomnumber', function() {
    expect(room1.roomNumber).to.equal(1)
    expect(room2.roomNumber).to.equal(2)
  })

  it('should set room roomType', function() {
    expect(room1.roomType).to.equal('residential suite')
    expect(room2.roomType).to.equal('suite')
  })

  it('should set room bidet', function() {
    expect(room1.bidet).to.equal(true)
    expect(room2.bidet).to.equal(false)
  })

  it('should set room bedSize', function() {
    expect(room1.bedSize).to.equal('queen')
    expect(room2.bedSize).to.equal('full')
  })

  it('should set room numBeds', function() {
    expect(room1.numBeds).to.equal(1)
    expect(room2.numBeds).to.equal(2)
  })

  it('should set room costPerNight', function() {
    expect(room1.costPerNight).to.equal(358.4)
    expect(room2.costPerNight).to.equal(477.38)
  })
})
