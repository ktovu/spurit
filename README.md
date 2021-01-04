Comments:  
In moka we have BG with transparent effect. It will be better to use BG without any styles.  
Font Tiempos Fine is not open source. And we canon't use for production mode.

Steps of development:  
1. Get private gulp boilerplate.
2. Load and optimaze fonts. For Tiempos Fine was taken light, regular, medium and bold.
3. Instead of BG image was taken original without styles to save time for loading. From 3mb we have 250 kb.


### Install
``` npm install -g gulp stylelint```  
``` npm i ```  

### Run srever
``` npm run serve ```

### Run watch
``` npm run watch ```

### Build project
``` npm run build ```

### Fast terminal commands
Auto-fix styles
``` stylelint src/style/partials/**/*.scss --fix   ```  
Auto-fix JS
``` eslint src/**/*.js --fix ```

## Path
Styles:
* Colors must be as variables in ``` src/style/common/colors.scss ```
* Elements (buttons, fields, etc) ``` src/style/elements ```
* Libraries ``` src/style/lib/ ```
* SVG icons ``` src/img/icons/sprite.svg ```
