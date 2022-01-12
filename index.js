/**DOM content Loaded */
document.addEventListener("DOMContentLoaded", () => {
    getAllActivities()
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
   console.log(activity.name)
}

const handleBigPic = (activity) => {
    console.log(activity.name, "will be first big picture")
}


/** MISC */

