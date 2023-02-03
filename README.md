# Looker Custom Visualization Boilerplate

A repo for getting started with custom visualizations that includes a Highcharts example integration.


## Installation
1.  **Install Dependecies.**

    Using yarn, install all dependencies
    ```
    yarn install
    ```
2. **Generate local HTTPS certificate**
  
    Using yarn, run the following to generate certificates for serving the custom visualization to Looker:

    ```
    yarn gen-cert
    ```
    Enter a country code when asked for country code.  All other prompts can be skipped by pressing Enter.  This will generate **/server/cert.pem** and **/server/key.pem**
    
3. **Enable Google Chrome to allow invalid certificates for resources loaded from localhost**

    Paste this into Google Chrome URL bar:
    ```
    chrome://flags/#allow-insecure-localhost
    ```

    > Reference: https://stackoverflow.com/a/31900210


4. **Make changes to the source code**

5. **Compile your code**

    You need to bundle your code, let's run:
    ```
    yarn build
    ```
    Recommended: Webpack can detect changes and build automatically, and Node can serve bundled code from a local HTTPS server:
     ```
    yarn serve
    ```

6. **Add visualization to Looker**

    In Looker, add the visualization according to the [official documentation](https://cloud.google.com/looker/docs/admin-panel-platform-visualizations).


## Project Files

This project consists of the following folders and files:

- **`/server`**: This directory contains everything necessary for serving the compiled custom visualization code to Looker (during development & testing)
- **`/server/`**: Local HTTPS certifcates (not version-controlled)
- **`/server/my-custom-viz.js`**: This visualization's minified distribution file. 
- **`manifest.lkml`**: Looker's external dependencies configuration file. The visualization object is defined here.
- **`marketplace.json`**: A JSON file containing information the marketplace installer uses to set up this project.
- **`/src`**: This directory will contain all of the visualization's source code.
- **`/src/my-customv-iz.js`**: The main source code for the visualization.
- **`/node_modules`**: The directory where all of the modules of code that your project depends on (npm packages) are automatically installed.
- **`README.md`**: This is a text file containing useful reference information about this visualization.
- **`yarn.lock`**: [Yarn](https://yarnpkg.com/) is a package manager alternative to npm. This file serves essentially the same purpose as `package-lock.json`, just for a different package management system.