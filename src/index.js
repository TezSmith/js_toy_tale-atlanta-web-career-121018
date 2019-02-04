const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyCont = document.querySelector("#toy-collection")

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', init)

function init() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(res => {

      res.forEach(t => {
        let div = document.createElement('div')
        div.dataset.id = t.id
        div.classList.add('card')
        let h2 = document.createElement('h2')
        h2.innerHTML += `${t.name}`
        let img = document.createElement('img')
        img.src = t.image
        img.classList.add('toy-avatar')
        let likes = document.createElement('p')
        let likeBtn = document.createElement('button')
        likes.innerHTML += `${t.likes}`
        likeBtn.innerText = "Like <3"
        div.appendChild(h2)
        div.appendChild(img)
        div.appendChild(likes)
        div.appendChild(likeBtn)
        toyCont.appendChild(div)

        likeBtn.addEventListener('click', (e) => {
          e.preventDefault()
          let card = e.target.parentElement.dataset.id
          let text = e.target.previousElementSibling.innerText
          let num = parseInt(text)
          let newNum = num+1

          likes.innerHTML = `${newNum}`

          fetch("http://localhost:3000/toys/" + card, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'},
            body: JSON.stringify({
              likes: newNum
          })
        }).then(res => res.json())
        .then(res => {
          toyCont.innerHTML += `<div class="card">
            <h2>${t.name}</h2>
            <img src="${t.image}" class="toy-avatar" />
            <p>${t.likes} </p>
            <button class="like-btn">Like <3</button>
          </div>`
        })

      })
  })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let toyName = e.target.name.value
      let toyUrl = e.target.image.value

      fetch('http://localhost:3000/toys', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: toyName,
        image: toyUrl,
        likes: 0
      })}).then(res => res.json())
        .then(res => {
          toyCont.innerHTML += `<div class="card">
            <h2>${t.name}</h2>
            <img src="${t.image}" class="toy-avatar" />
            <p>${t.likes} </p>
            <button class="like-btn">Like <3</button>
          </div>`
        })

    })
  } else {
    toyForm.style.display = 'none'
  }
})
}


// OR HERE!
