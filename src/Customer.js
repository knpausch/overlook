import Booking from './Booking'

class Customer {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.pastBookings = []
    }

    findMyBookings(bookingData){
        this.pastBookings = bookingData.filter((current) => {
            return current.userID === this.id
        })
    }
}

export default Customer