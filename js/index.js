const userSearchForm = document.getElementById('github-form')
const userList = document.getElementById('user-list')
const reposList = document.getElementById('repos-list')
const createP = document.createElement('p')
createP.classList.add('search-toggle')
createP.innerText = 'Currently Searching By Username. Click To Search By Repository'
createP.addEventListener('click', () => {
  if(createP.innerText ==='Currently Searching By Username. Click To Search By Repository'){
    createP.innerText = 'Currently Searching By Repository. Click To Search By Username'
  } else if(createP.innerText === 'Currently Searching By Repository. Click To Search By Username'){
    createP.innerText = 'Currently Searching By Username. Click To Search By Repository'
  }
})
userSearchForm.appendChild(createP)

const retrieveUser = (user) => {
  fetch(`https://api.github.com/search/users?q=${user}`,{
  headers:
  {
  "Content-Type": "application/json",
  Accept: "application/vnd.github.v3+json"
  },
})
  
  .then(resp => resp.json())
  .then(resp =>{
 
    usersToDoM(resp)})
}

const retrieveUserRepos = (user) => {
  fetch(`https://api.github.com/users/${user}/repos`,{
    headers:
    {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json"
    },
  })
  .then(resp =>  resp.json())
  .then(userReposToDom)
}

const userReposToDom = (resp) => {
  reposList.innerHTML = ''
  resp.forEach(repo => {
    const repoLink = document.createElement('a')
    repoLink.setAttribute('href', `${repo.html_url}`)
    repoLink.textContent = repo.name
    
    const createLi = document.createElement('li')

    reposList.appendChild(createLi).appendChild(repoLink)
  });
}

const usersToDoM = (resp) => {
  userList.innerHTML = ''
  debugger
  resp.items.forEach(user => {

  const userLink = document.createElement('a')
  userLink.setAttribute('href', `${user.html_url}`)

  const userLinkTarget = document.createElement('p')
  userLinkTarget.innerText = `^Click to visit above user's profile.^`
  
  const userName = document.createElement('li')
  userName.classList.add(user.login)
  userName.textContent = user.login

  const createImg = document.createElement('img')
  createImg.setAttribute('src', `${user.avatar_url}`)
  
  const userPhoto = document.createElement('li')

  userList.appendChild(userName).appendChild(userPhoto).appendChild(createImg).addEventListener('click', () => retrieveUserRepos(user.login))
  document.getElementsByClassName(`${user.login}`)[0].appendChild(userLink).appendChild(userLinkTarget)
})}

userSearchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchValue = document.getElementById('search').value
  retrieveUser(searchValue)
})

