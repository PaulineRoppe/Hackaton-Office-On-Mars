# App-Mars

If you want to know how the new version looks like check it out [here](https://app-mars.herokuapp.com/).

## Built With

* [NodeJS](https://nodejs.org/en/docs/) - JS Framework 
* [React](https://reactjs.org/docs/getting-started.html) - JS Framework

## Authors

* [**Pauline Roppe**](https://github.com/PaulineRoppe) *(Design-Frontend)*
* [**Stéphanie Grosjean**](https://github.com/grosjeanstephanie) *(Frontend)*
* [**Alexandre Bove**](https://github.com/bovealexandre) *(Frontend)*
* [**Stéphane Wiertz**](https://github.com/stwiertz) *(Frontend)*
* [**Antony Rizzitelli**](https://github.com/Upd4ting) *(Full Stack)*
* [**Thibaut Janssens**](https://github.com/ThibautJanssens) *(Backend)*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Getting Started

### Prerequisites
You'll need [npm](https://www.npmjs.com/get-npm) to download and install all the dependencies.

### Installing

To get a development env running, install all the dependencies with:
```cmd
npm install
```
Don't forget to edit your .env file. If you do not have one:
```cmd
touch .env
``` 
And modify your credentials: 
GOOGLE_APPLICATION_CREDENTIALS = your_key

To start your node server, you'll need first to build the application with.
```cmd
npm run build
```
Then you can run the server by using the command (*by default the server will start on localhost:8000*):
```cmd
npm run start 
```

## Deployment

The project is ready to deploy on heroku, just push this repo to your herokuapp repository.
Add you addon for the database with the following :
```cmd
heroku addons:create heroku-postgresql:hobby-dev
```
Don't forget to edit the configs with:
 * APP_ENV  =  production
 * GOOGLE_APPLICATION_CREDENTIALS  = your key