import Booking from './Booking'

class Customer {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.pastBookings = []
    }

    findMyBookings(bookingData){
        this.pastBookings = bookingData.filter((currentBooking) => {
            return currentBooking.userID === this.id
        })
    }

    formatMyBookings(roomData){
        // console.log("lets do this")
        return this.pastBookings.map((currentBooking) => {
            let customerInfo = {}
            customerInfo.date = currentBooking.date
            customerInfo.id = currentBooking.id
            const roomInfo = roomData.find((currentRoom) => {
              return currentRoom.number === currentBooking.roomNumber
            })
            customerInfo.roomType = roomInfo.roomType
            customerInfo.bidet = roomInfo.bidet
            customerInfo.bedSize = roomInfo.bedSize
            customerInfo.numBeds = roomInfo.numBeds
            customerInfo.costPerNight = roomInfo.costPerNight
            return customerInfo
          })
    }
}

export default Customer