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
        let bookingIsUpcoming
        let currentDate = this.getCurrentDate()

        this.pastBookings = bookingData.filter((currentBooking) => {
            let chosenDate = currentBooking.date.split('/')
            chosenDate = Number(chosenDate.join(''))

            if(chosenDate >= currentDate){
                bookingIsUpcoming = true
            }
            else{
                bookingIsUpcoming = false
            }

            return currentBooking.userID === this.id && !bookingIsUpcoming
        })
    }

    findUpcomingBookings(bookingData){
        let bookingIsUpcoming
        let currentDate = this.getCurrentDate()

        this.upcomingBookings = bookingData.filter((currentBooking) => {
            let chosenDate = currentBooking.date.split('/')
            chosenDate = Number(chosenDate.join(''))

            if(chosenDate >= currentDate){
                bookingIsUpcoming = true
            }
            else{
                bookingIsUpcoming = false
            }

            return currentBooking.userID === this.id && bookingIsUpcoming
        })
    }

    findAllAvailableRooms(date, bookingData, roomData){
        const occupiedList = bookingData.filter((currentBooking) => {
            let formatedDate = currentBooking.date.split('/')
            formatedDate = Number(formatedDate.join(''))
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

    getCurrentDate(){
        const date = new Date()
        let currentDay = date.getDate()
        let currentMonth = date.getMonth() + 1
        let currentYear = date.getFullYear()
        let currentDate = `${currentYear}${currentMonth}${currentDay}`
        return currentDate = Number(currentDate)
    }
}

export default Customer