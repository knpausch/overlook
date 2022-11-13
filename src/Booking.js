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
}

export default Booking