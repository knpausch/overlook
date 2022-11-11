import Booking from './Booking'

class Customer {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.pastBookings = []
        this.upcomingBookings = []
        this.allBookings = []
    }

    createBooking(bookingData){
        return bookingData.map((currentBooking) => {
            return new Booking(currentBooking)
        })
    }

    findCustomersBookings(bookingData){
        this.allBookings = bookingData.filter((currentBooking) => {
            return currentBooking.userID === this.id
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
}

export default Customer