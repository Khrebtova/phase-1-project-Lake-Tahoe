/**DOM content Loaded */
document.addEventListener("DOMContentLoaded", () => {
    getAllActivities()
    filterEventAttach()
    commentEventAttach()
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

const commentEventAttach = () => {
    commentForm().addEventListener('submit', (e) => {
        e.preventDefault()
        handleCommentSubmit(selectedActivity, e.target['comment'].value)
        commentForm().reset()
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
    resetDetailDiv();
    selectedActivityId = activity.id
    selectedActivity  = activity;
    
    let img = document.createElement('img')
    img.className = "detail-image"
    img.src = activity.image
    img.alt = activity.name

    let h2 = document.createElement('h2')
    h2.innerText = activity.name
    h2.className = "name"

    let likeBtn = document.createElement('button')
    activity.likes !== 0 ? likeBtn.className = "liked" : likeBtn.className = "likeBtn"
    likeBtn.innerText = `${activity.likes} ???`
    likeBtn.addEventListener('click', () => handleLike(activity))

    let disLikeBtn = document.createElement('button')
    disLikeBtn.innerText = `????`
    disLikeBtn.className = "dislike"
    disLikeBtn.addEventListener('click', () => handleDisLike(activity))

    let h3 = document.createElement('h3')
    h3.innerText = activity.description
    h3.className = "description"

    detailsDiv().appendChild(img)
    detailsDiv().appendChild(h2)
    detailsDiv().appendChild(likeBtn)
    detailsDiv().appendChild(disLikeBtn)
    detailsDiv().appendChild(h3)
    
    for (let el of activity.comment){
        let p = document.createElement('p')
        p.innerText = `"${el}"`
        detailsDiv().appendChild(p)
    }
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

const handleCommentSubmit = (activity, comment) => {
    let addcomment = [...activity.comment, comment];
    activity.comment = addcomment
    handlePatchRequest(activity) 
}

const handleLike = (activity) => {
    activity.likes += 1
    handlePatchRequest(activity)
}

const handleDisLike = (activity) =>{
    activity.likes > 0 ? activity.likes -- : activity.likes = 0
    handlePatchRequest(activity)
}

const handlePatchRequest = (activity) => {
    fetch(`http://localhost:3000/activities/${activity.id}`, {
        method: 'PATCH',
        headers : {
            "Content-type" : "application/json",
            Accept : "application/json"
        },
        body: JSON.stringify(activity)
    })
    .then(res => res.json())
    .then(activity => handleBigPic(activity))
}

/** MISC */
const resetMenuDiv = () => {
    menuDiv().innerHTML = ""
}

const resetDetailDiv = () => {
    detailsDiv().innerHTML =""
}
