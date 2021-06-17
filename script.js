
const form = document.querySelector('#form') 
const newDiv = document.createElement('div')
const result = document.querySelector('.result')

result.append(newDiv)

form.addEventListener('submit', function(event) {
  event.preventDefault()
  newDiv.innerHTML = ''
  let url = `https://shazam.p.rapidapi.com/search?term=${event.target.firstElementChild.value}&locale=en-US&offset=0&limit=5`
  fetch(url, {
    headers:{
      "x-rapidapi-key": "f15011cc6emsh1c53b4a4ae25c69p1c46bfjsnebe408509220",
      "x-rapidapi-host": "shazam.p.rapidapi.com",
      "Accept": "application/json"
    }
  })
  .then(resp => resp.json())
  .then(data => data.tracks.hits.forEach(data => {
    
    
    const {title, subtitle, images} = data.track
    
    newDiv.innerHTML += `
      <div class='result-content'>
        <h4 class='title'>${title}</h4>
        <h5 class='subtitle'>${subtitle}</h5>
        <div>
          <img src="${images.coverart}" alt="" class='cover-art'>
        </div>
        <button>Add</button>
      </div>
      `
    console.log(data.track)
    })
  )
  .catch(err => console.error(err))
})