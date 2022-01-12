## links:
https://www.skilaketahoe.com/
https://adventuresportsjournal.com/dirt-lap-around-lake-tahoe/
https://tahoesouth.com/gaming/
https://www.northstarcalifornia.com/explore-the-resort/activities-and-events/village-activities.aspx
https://edgewoodtahoe.com/dine/
https://jesswandering.com/72-perfect-hours-in-lake-tahoe/

# Name
What I like to do On the Lake Tahoe

## Overview    
web page will be used to show defirent activities avalable on lake Tahoe, user will be able to sort activities by season, choose one of them in the menu on top and see detailed description of a chosen activity below, user will be able to add comments, and like/dislike the activity. 


## MVP
1. display list of pictures of all fun activities (GET request from API with DomContentLoaded event)
2. sort activities by season (submit event)
3. get detailed description of chosen activity (click event)


## STRETCH

4. like button (click event + PATCH request to update likes)
5. dislike button (click event + PATCH request to update likes)
6. submit your comment form (submit event + PATCH request to update likes)


/*
 Three question rule for the events:
  Overview: what is the feature- we want to click homelink and Homepage appear
  1. when we want to be able to do that? - DOMContentLoaded
  2. What is the cause of the event? - CLICK
  3. what is the effect? what is going to happen when event trigers& - make homepage appear
*/