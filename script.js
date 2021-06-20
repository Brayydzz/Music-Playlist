
const form = document.querySelector('#form') 
const result = document.querySelector('.result')
const playlist = document.querySelector('.playlist')
const newDiv = document.createElement('div')

result.append(newDiv)


function createNewDiv(data) {

  // Deconstruct API JSON nesting
  const {title, subtitle, images} = data.track
    newDiv.innerHTML += `
      <div class='result-content'>
        <h4 class='title'>${title}</h4>
        <h5 class='subtitle'>${subtitle}</h5>
        <div>
          <img src="${images.coverart}" alt="" class='cover-art'>
        </div>
        <button class='add'>Add</button>
      </div>
      `
}

// Event listener for search button to perform API request
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
    // Calls Create new div function
    createNewDiv(data)

    // Creates Add button
    const addButton = document.querySelectorAll('.add')

    // For each Add button, add event listener
    addButton.forEach(button => 
      button.addEventListener('click', event => {
        let addToPlaylist = event.target.parentNode.cloneNode(true)
        const newButton = document.createElement('button')
        // Remove previous add button
        addToPlaylist.children[3].remove()

        // create and append new button
        addToPlaylist.append(newButton)
        addToPlaylist.children[3].innerText = 'Remove'
        addToPlaylist.children[3].classList.add('remove')
        playlist.append(addToPlaylist)


        // Event listener for remove button to remove track from playlist
        const removeButton = document.querySelectorAll('.remove')
        removeButton.forEach(removeButton =>
          removeButton.addEventListener('click', event =>{
            event.target.parentNode.remove()
          }))
      })
      )
    })
  )
  .catch(err => console.error(err))
})

