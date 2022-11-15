# 🏨 Overlook 🏨

## Abstract
Overlook is an hotel booking website that helps users search for an available hotel room. They can view their total cost, search by date, filter by room type and select any booking of their choice. It also has a login feature and will only present the user's information associated with their account if they login successfully. All information is gathered from 3 APIs (customer, bookings, and rooms).

## Preview of Application
### Login - Unsuccessful then Successful Login
![login](https://user-images.githubusercontent.com/19957834/201973562-1ebafa5e-7791-4ffd-8905-2da1b5b84cbe.gif)

### Book a Room - Accessibility Focus Ring
![accessibility](https://user-images.githubusercontent.com/19957834/201974414-72131ee4-99e5-4597-b665-2a11d5debe39.gif)


## Installation Instructions
1. Go to this API [link](https://github.com/turingschool-examples/overlook-api)
2. Git clone SSH link `git@github.com:turingschool-examples/overlook-api.git`
3. `CD` into directory, run `npm install`
4. Run `npm start`
5. Open another terminal tab `cmd + t`
6. Git clone SSH link `git@github.com:knpausch/overlook.git` 
7. `CD` in to directory, run `npm install`
8. Run `npm start`
9. Copy `http://localhost:8080/`
10. Paste in web browser and run to see website 

## Context
Overlook is a solo project that is completed during Week 5 at Turing School of Software Development and Design within a span of 7 days. I prepared this project by wireframing on Figma and seting up a Github Project Board to document my process. We were assigned a partner to review and merge 2 of our Pull Requests on github. It took me approximately ~70 hours to complete. The rubric may be found [here](https://frontend.turing.edu/projects/overlook.html)

## Contributors
- Keyaanna (Kiko) Pausch [GitHub](https://github.com/knpausch) | [LinkedIn](https://www.linkedin.com/in/knpausch/)

## Learning Goals 🎯
- Fetch multiple APIS
- Post to an API
- Working on a time constraint 
- Implement testing, accessibility, and error handling
- Being given functionality requirements but full creative control over design

## Technology Used 💻
HTML | CSS | JavaScript | Figma | Webpack | API | Mocha and Chai | Chrome Dev Tools | GitHub Project Board | Lighthouse Accessibility Audit | WAVE

## Wins 🏆
- Built a fully functional web application to meet the MVP outlined in the project spec 
- Building a web application that is fully tabbable and includes an enhanced tab focus ring
- Fetching/posting successfully to an API
- Utilizing iterators so we are able to find and filter through an array of 1,008 object elements
- Delaying fetching until the user successfully logs in
- Matching the Figma comp

## Challenges 😅
- Designing well fleshed out testing for each method (happy/sad paths)
- Presenting the dataset of available rooms with iterators (based upon date given and room type requested)
- Delicately incorporating a login page in the last phase which meant repositioning the fetch call until the user successfully logs in
- Transitioning from the full customers API to a single customer API to increase speed and reduce data load

## Future Features
- Incorporate a unique account view if a manager logins in (they can view all bookings in their hotel, add, delete any booking, and view total revenue) 
