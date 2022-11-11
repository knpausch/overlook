class Booking{
    constructor(data){
        this.id = data.id
        this.userID = data.userID
        this.date = data.date
        this.roomNumber = data.roomNumber
        this.numberedDate = 0
    }

    formatDate(){
        let chargeDate = this.date.split("/")
        chargeDate = Number(chargeDate.join(""))
        this.numberedDate = chargeDate
    }

    checkBookingIsUpcoming(){
        this.formatDate()
        const date = new Date()
        let currentDay = date.getDate()
        let currentMonth = date.getMonth() + 1
        let currentYear = date.getFullYear()
        let currentDate = `${currentYear}${currentMonth}${currentDay}`
        currentDate = Number(currentDate)

        if(this.numberedDate >= currentDate){
            return true
        }
        else{
            return false
        }
    }
}

export default Booking