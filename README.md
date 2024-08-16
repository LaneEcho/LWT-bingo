# Lesbians Who Tech Bingo!

## Summary

<center>
A simple Bingo game to ehnance your Lesbians Who Tech experience
<br>

[Play it here!](https://laneecho.github.io/LWT-bingo/)

</center>

## Tech Stack

[![React][React.js]][React-url] ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white&color=%23FFCA28) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) [![HTML5][HTML5]][HTML5-url] ![Material-UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black) ![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)


<br>

## How to Work on This Project

1. Fork and close this repository to your local machine
2. Install NPM packages: `npm install`
3. Run `npm run dev` to start up the application
4. Navigate to http://localhost:8080 to view the application
5. Choose an issue to work on and create a branch
6. Create a PR to merge your branch into dev & await review!

<br>

### Theme
```client/Theme/MainTheme.tsx``` contains the current information for our theme, and another theme object for Dark Mode is found in ```DarkMode.tsx```
It uses the experimental_extendTheme API which extends the default theme of MUI, which I found to avoid repetitive code like declaring the font family in both Dark Mode and Light Mode. We can easily update things like font family and breakpoints in the MainTheme object and they'll still apply to Dark Mode without having to also define them within the DarkMode object. 
<br>
More details: <br>
[MUI Theme](https://mui.com/material-ui/customization/theming/) <br>
[extendTheme](https://mui.com/material-ui/experimental-api/css-theme-variables/customization/)

## To Do

| Feature                            | Status |
| ---------------------------------- | ------ |
| Alert player when they win         | ✅     |
| Do not reset board on page refresh | ✅     |
| Separate Modal Component           | ✅     |
| Updated UI                         | ⏳     |
| Responsive Design                  | ⏳     |
| Leaderboard/ Database              | ⏳     |
| And more...                        | ⏳     |

- ✅ = Ready to use
- ⏳ = In progress

## The Team

|  Developed By  |                                                                                                                                                  |                                                                                                                                                  |
| :------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
| Lane Hamilton  |  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aleyna-hamilton/)  |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LaneEcho)    |
|  Tegan Barron  |   [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tegan-barron/)    |
| Jimena Cuadros |  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jimena-cuadros/)   |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jcuadrosj)   |
|   Alex Sharp   | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alex-nicole-sharp/) | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alexsharp4096) |
|  K.D. Hubbard  |    [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/k-d-hubbard/)    |    [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kdhubb)     |

<!-- Logo Links -->

[React.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
[JavaScript-url]: https://www.javascript.com/
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML/
