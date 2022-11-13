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

    findAllAvailableRooms(date, bookingData, roomData){
        const occupiedList = bookingData.filter((currentBooking) => {
            let formatedDate = currentBooking.date.split("/")
            formatedDate = Number(formatedDate.join(""))
            return formatedDate === date
        })
        let closedRooms = occupiedList.map((currentOcc) => {
            return currentOcc.roomNumber
          })
          let openRooms = roomData.reduce((acc, room) => {
            if(!closedRooms.includes(room.roomNumber)){
                acc.push(room)
            }
            return acc
          }, [])
          return openRooms
    }

    filterByRoomType(givenRoomType, availableRooms){
        return availableRooms.filter((currentRoom) => {
            return currentRoom.roomType === givenRoomType
        })
    }
}

export default Customer