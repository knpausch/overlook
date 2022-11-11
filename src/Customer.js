import Booking from './Booking'

class Customer {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.pastBookings = []
    }

    createBooking(bookingData){
        // console.log("ok cuzz")
        return bookingData.map((currentBooking) => {
            const myBooking = new Booking(currentBooking)
            return myBooking
        })
    }

    findCustomerBookings(bookingData){
        // const date = new Date();
        // let currentDay = date.getDate();
        // let currentMonth = date.getMonth() + 1;
        // let currentYear = date.getFullYear();
        // let currentDate = `${currentYear}${currentMonth}${currentDay}`;
        // currentDate = Number(currentDate)

        // console.log("current date: ", currentDate);
        // const chargeDate = bookingData[0].date.split("/")
        // let dateString = chargeDate.join("")
        // console.log("boom: ", Number(dateString))
        // let chargeYear = chargeDate[0]
        // let chargeMonth = chargeDate[1]
        // let chargeDay = chargeDate[2]


        // console.log("customerYear: ", chargeYear)
        // console.log("chargeMonth: ", chargeMonth)
        // console.log("chargeDay: ", chargeDay)

        // bookingData.setDateValues()

        console.log("ok boy: ",bookingData[0].checkBookingIsUpcoming())

        this.pastBookings = bookingData.filter((currentBooking) => {
        // let chargeDate = currentBooking.date.split("/")
        // chargeDate = Number(chargeDate.join(""))
        // console.log("okk:", currentBooking.formatDate())
        // currentBooking.formatDate()
        // console.log("ay boi: ",currentBooking.numberedDate)
            return currentBooking.userID === this.id && !currentBooking.checkBookingIsUpcoming()
            // && currentBooking.checkBookingIsUpcoming()
        })

        // this.pastBookings.sort((bookingA, bookingB) => {
        //     let chargeDate = bookingB.date.split("/")
        //     chargeDate = Number(chargeDate.join(""))
        //     return 
        // })
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