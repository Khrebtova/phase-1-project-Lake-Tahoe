/**DOM content Loaded */
document.addEventListener("DOMContentLoaded", () => {
    getAllActivities()
    filterEventAttach()
    
})

/** GlobalVariables */
let seasonSelect = document.getElementById("season")
let selectedActivityId = 1
let selectedActivity ;
let listOfAllActvities = []

/** Node getters */
const detailsDiv = () => document.getElementById('details')
const menuDiv = () => document.getElementById("activity-menu")
const filter = () => document.getElementById("sort")
const commentForm = () => document.getElementById("comment-form")

/**Event Listeners */
const filterEventAttach = () => {
    filter().addEventListener('submit', (e) => {
        e.preventDefault();
        handleFilter(e.target['season'].value);
        filter().reset()
    })
}

/** Event Handlers */
const getAllActivities = () => {
    resetMenuDiv()
    fetch(`http://localhost:3000/activities`)
    .then(res => res.json())
    .then(data => { 
        listOfAllActvities = data;
        data.forEach(el => renderPicture(el))
        handleBigPic(data[0])
    })
} 

const renderPicture = (activity) => {
    let img = document.createElement('img')
    img.src = activity.image
    img.className = 'mini-pic'
    img.addEventListener('click', () => handleBigPic(activity))
    menuDiv().appendChild(img)
}

const handleBigPic = (activity) => {
    console.log(activity.name, "will be first big picture")
}

function handleFilter(season){
    resetMenuDiv()
    let sortedList;
    if (season === 'All of them'){
        sortedList = listOfAllActvities
    }
    else {
        sortedList = listOfAllActvities.filter(el => el.season === season || el.season === "All Year Round")
    }
    sortedList.forEach(el => renderPicture(el))
    handleBigPic(sortedList[0]) 
}

/** MISC */
const resetMenuDiv = () => {
    menuDiv().innerHTML = ""
}

const resetDetailDiv = () => {
    detailsDiv().innerHTML =""
}
