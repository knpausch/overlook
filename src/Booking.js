class Booking{
    constructor(data){
        this.id = data.id
        this.userID = data.userID
        this.date = data.date
        this.roomNumber = data.roomNumber
        this.year = 0
        this.month = 0
        this.day = 0
    }

    setDateValues(){
        let chargeDate = this.date.split("/")
        console.log("ok son")
    }

}

export default Booking