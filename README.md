
# mama_recipe_app
<div align="center"><img src="logo_mama_recipe.png"/></div>

<hr/>

## General Information
### Build with
<ul>
  <li>HTML 5</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>NodeJS</li>
  <li>ReactJS (frontend library)</li>
  <li>ExpressJS (backend library)</li>
</ul>

### Structure Folder 
<p>Backend</p>
<ul>
  <li>public</li>
  <ul>
    <li>img <span><b><i>image public access</i></b></span></li>
  </ul>
  <li>src</li>
  <ul>
    <li>config ||<span><b><i>You can put database configuration in here</i></b></span></li>
    <li>controller ||<span><b><i>This folder for the logic componenent of API</i></b></span></li>
    <li>helper ||<span><b><i>This folder is used to help improve the logic of the controller, for example, response alignment.</i></b></span></li>
    <li>middleware ||<span><b><i>Middleware is used as a bridge during the routes API, for example, uploading images.</i></b></span></li>
    <li>model ||<span><b><i>Models are used to give commands to database manipulation, as in the crud example.</i></b></span></li>
    <li>router ||<span><b><i>The router is the place to set the endpoint for the API.</i></b></span></li>
  </ul>
  <li>index.js || <span><b><i>You can setup this application in this file, such as set port, set another library, and other.</i></b></span></li>
</ul>
<hr/>
<p>Frontend</p>
<ul>
  <li>public || <span><b><i>You can drop anything if that is accesseble for public</i></b></span></li>
  <li>src</li>
  <ul>
    <li>assets ||<span><b><i>You can store various needs for this website, such as images, styles, javascript, and others.</i></b></span></li>
    <li>components ||<span><b><i>This folder is for storing layouts, such as Navbar.</i></b></span></li>
    <li>pages ||<span><b><i>This folder is the main folder in the website display for this application.</i></b></span></li>
    <li>redux ||<span><b><i>Redux to set the global state, as well as the use of user data.</i></b></span></li>
    <li>router ||<span><b><i>The router is used to set the endpoint of this application.</i></b></span></li>
  </ul>
</ul>
<hr/>

### Installation Guide
<p>Backend</p>
<ol type="1">
  <li>Your first step is to add the .env settings contained in the backend folder, with the examples contained in the .env-example.</li>
  <li>Continue with database creation.</li>
  <li>You can first import the postman documentation contained in this repo and pay attention to the fields in each POST request.
</li>
  <li>To run the server that has been set, use the <b>npm run dev command</b>.</li>
  <li>When there is a description of the Server running on Port (with the port you have specified), the API is ready to use.</li>
</ol>
<hr />
<p>Frontend</p>

### Screenshot Application
<details>
  <summary>
    Login Page
  </summary>
<img src="ss/login_page.png" alt="login Page" />
</details>
<details>
  <summary>
    Register Page
  </summary>
<img src="ss/register_page.png" alt="login Page" />
</details>
<details>
  <summary>
    Landing Page
  </summary>
<img src="ss/landing_page.png" alt="login Page" />
</details>
<details>
  <summary>
    Add recipe Page
  </summary>
<img src="ss/add recipe_page.png" alt="login Page" />
</details>
<details>
  <summary>
    Profile Page
  </summary>
<img src="ss/profile_page.png" alt="login Page" />
</details>
<details>
  <summary>
    My recipe Page
  </summary>
<img src="ss/my recipe_page.png" alt="login Page" />
</details>
<details>
  <summary>
    Detail recipe Page
  </summary>
<img src="ss/detail recipe_page.png" alt="login Page" />
</details>
<details>
  <summary>
    Update recipe Page
  </summary>
<img src="ss/update_page.png" alt="login Page" />
</details>

