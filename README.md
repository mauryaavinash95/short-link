# Short Link

## Metoer / React App to shorten URLs. 

To start clone the repo and run:
```
curl https://install.meteor.com/ | sh     #to install meteor on OSX & Linux machines.
npm install                               #to install dependencies.
meteor run                                #to start the project.
```

To view the live version of the app visit https://www.shorterr.herokuapp.com

1. The application uses [DDP] (https://en.wikipedia.org/wiki/Distributed_Data_Protocol) to synchronize the client-server(client: Mini Mongo, server: Mongodb) database interactions.
2. Methods, Publications & Subscriptions are used to manage the database CRUDs.
3. SCSS and packages such as `react-flip` move are used to style up the application.

Currently the application generates a random string for each URL in the database using `shortid` npm package.
Next step includes setting up customization option for the user to generate URL & verification of user's email address.

###### Since the dynos on heroku sleep after 1 hour of inactivity, the app may be slow to load if loaded for first time within the given hour.
