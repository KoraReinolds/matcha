# [Matcha](https://mskiles-matcha.herokuapp.com/)

# Installation

Project setup

```sh
$ npm install
```

Run development server

```sh
$ npm run serve
```

For production build

```sh
$ npm run build
```

# Features
#### Profile
Every user has following information:  
◦ The gender.  
◦ Sexual preferences.  
◦ A biography.  
◦ A list of interests with tags (ex: #vegan, #geek, #piercing etc...).  
◦ Pictures, max 5, including 1 as profile picture.  
◦ GPS location.  
◦ Fame rating (user activity indicator).  
◦ A list users who looked at his/her profile and who “liked” one.  

#### Search
Also every user can get a list of suggestions that match his/her profile.  
By default this list show people:  
• from the same geographical area  
• the same ages  
• with appropriate preferences  
• with maximum of common tags.  
The list is sortable and filterable by age, location, “fame rating”, common tags, distance and preferences.  

#### Chat
When two people “like” each other, they are able to chat.  

#### Notifications
Every user notified in real time of the following events:  
• The user received a “like”.  
• The user’s profile has been visited.  
• The user received a message.  
• A “liked” user “disliked” you.  

[deployed version on heroku](https://mskiles-matcha.herokuapp.com/)