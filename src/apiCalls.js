const getData = (url) => {
    return fetch(url)
      .then(response => response.json())
      .catch(err => console.log(err)) 
  }

export default getData