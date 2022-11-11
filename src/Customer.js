import Booking from './Booking'

class Customer {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.pastBookings = []
        this.upcomingBookings = []
    }

    createBooking(bookingData){
        return bookingData.map((currentBooking) => {
            const myBooking = new Booking(currentBooking)
            return myBooking
        })
    }

    findPastBookings(bookingData){
        this.pastBookings = bookingData.filter((currentBooking) => {
            return currentBooking.userID === this.id && !currentBooking.checkBookingIsUpcoming()
        })
    }

    findUpcomingBookings(bookingData){
        this.upcomingBookings = bookingData.filter((currentBooking) => {
            return currentBooking.userID === this.id && currentBooking.checkBookingIsUpcoming()
        })
    }

    formatBookings(roomData){
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