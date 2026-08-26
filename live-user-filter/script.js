const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []

getData()

filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    try {
        const res = await fetch('https://randomuser.me/api?results=50')

        if(!res.ok) throw new Error(`Request failed: ${res.status}`)

        const { results } = await res.json()

        // Clear result
        result.innerHTML = ''

        results.forEach(user => {
            const li = document.createElement('li')

            listItems.push(li)

            li.innerHTML = `
                <img src="${user.picture.large}" alt="${user.name.first}">
                <div class="user-info">
                    <h4>${user.name.first} ${user.name.last}</h4>
                    <p>${user.location.city}, ${user.location.country}</p>
                </div>
            `

            result.appendChild(li)
        })
    } catch(err) {
        result.innerHTML = '<li><h3>Failed to load users. Please try again later.</h3></li>'
    }
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}