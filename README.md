
# Inteliment-Assignment

React Redux Authentication System
A simple responsive app using React, Redux, CSS3 which has a login screen.
Assumptions: User is already registered on the website.
On login user is authenticated and taken to the home page.
Where there is a link to the About us page with 3 sections with the following links:

    Profile (link to aboutus/profile)
    Team (link to aboutus/team)
    Contact Us (link to aboutus/contact)

The about us page has 3 different sections on the same page (SPA) and these 3 sections could be reached using the following urls:

    localhost:your_port_no/aboutus/profile
    localhost:your_port_no/aboutus/team
    localhost:your_port_no/aboutus/contact

### Implementation
Uses node server running at port:5000

Live on https://inteliment-assignment.herokuapp.com

 * username = vikasmagar512@gmail.com
 * passsword = pwd
 
Improvements
 * JWT Authentication

### Technology
* React
* Redux
* React Router
* Redux Thunk middleware

### Installation

```
sudo npm install    
sudo npm start 
```

### Tests
 Tests are written for few components using Jest
``` 
sudo npm test 
```

### Production
 ```
sudo npm run prebuild
sudo npm run build
 ```

