# Wos Iss I Haint
This project is a responsive website made with Angular CLI version 7.4.1.

Wos Iss I Haint is an open source webapplication that can be used to search for restaurants in South Tyrol. The application uses leafletjs and data from Open Data Hub.
**IMPORTANT:** The application needs credentials from Open Data Hub to work. You can ask [here](https://opendatahub.bz.it) for credentials. The credentials should be filled in 
src/assets/credentials.ts like the following example:

```
export const credentials = {
  "username": "YOUR_OPENDATAHUB_USERNAME",
  "password": "YOUR_OPENDATAHUB_PASSWORD"
}
```

## Table
- [Using this repository](#using-this-repository)
- [Build](#build)
- [Screenshots](#screenshots)

You need nodejs installed and then you have to run this commands.
```
npm install -g @angular/cli   # installs angular
npm install                   # installs all dependencies
```
Now you can run the development server:

Run `ng serve` for a dev server. The Application will be running at `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Screenshots

<img src="https://www.targaserver.com/images/Home.png" alt="Homepage" width="200"/>
<img src="https://www.targaserver.com/images/List.png" alt="Liste" width="200"/>


