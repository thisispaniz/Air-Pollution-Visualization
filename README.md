# Air-Pollution-Visualization
This app is a tool for people with respitory problems (specifically people suffering from Asthma) who live in the 9 biggest cities of germany. They can use this app to check the air quality in different districts of the city. This could help them avoid restraining their lungs.

<img src='readme images/2.png'>

## Overview
This project uses choropleth maps and an API (https://open-meteo.com/) to visualize real-time data about the air quality of the specified districts. The color of each district corresponds with the air quality of that district. Also by hovering on each district the user can get an accurate air quality value. This app uses the European AQI.


## Key User Group
The primary user group are people suffering from asthma who live in big cities and are in the risk of asthma attacks.


## User Objectives
Users of this application seek to:

* Understand the current air quality in specific locations.
* Determine whether it's safe to go outside without a mask.
* Plan outdoor activities based on real-time air pollution data.

## The chosen visualization
The chosen method is a map-based interface displaying color-coded air quality indices for different areas. This method is effective because:

* Intuitive Interpretation: Users can quickly interpret air quality levels through color gradients on the map.

* Geospatial Awareness: A map allows users to associate air quality with specific locations, helping them plan activities in safer areas.

* Real-time Updates: The map provides real-time updates, ensuring users have the latest information for decision-making.

## How it works
First create a CodeSpace from this repository:

<img src='readme images/00.png'>

When the CodeSpace is created the command cd app && python3 -m uvicorn main:app --reload will run automatically. (This might take one or two minutes.)

<img src='readme images/01.png'>

When that happens switch to the ports tab and ctrl + click on the link.

<img src='readme images/02.png'>

This is what the app looks like untouched:

<img src='readme images/1.png'>

You can click on a cities name to see it's map. When the map is displayed you can hover on different districts to see the European AQI value of that district.

<img src='readme images/2.png'>

There is the functionality to post a .json file of a new city to see the visualization of. You can do that by clicking on Browse and then selecting the file and then clicking on Upload. There is a sample file in this repository that you can use. The data file needs to have this attribute:

<img src='readme images/3.png'>

There are three possible outcomes to this upload. if the file you upload is not a .json file you get this error:

<img src='readme images/7.png'>

If the file you are uploading has already been uploaded before you get the following error:

<img src='readme images/5.png'>

And finally if everything in this order you get this message that indicates the file has been uploaded:

<img src='readme images/4.png'>

When this happens click on back and go back to the main page. You can now see the visualization for the map data you uploaded by clicking on the NEWLY ADDED CITY button.

<img src='readme images/6.png'>



