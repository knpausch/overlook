import { reservationPage } from "./scripts"
import { viewInfo } from "./scripts"

const getData = (url) => {
    return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error(`Sorry, try again later. ${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
      .catch(err => {
        console.log("Error" + err)
        viewInfo.className = 'view-info hidden'
        reservationPage.className = 'errorPage'
        reservationPage.innerHTML = `
        <img class="sad-img2" src="./images/sad.png" alt="sad face cartoon icon">
        <h1>Sorry try again later...</h1>
        `
      }) 
  }

export default getData