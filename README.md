# Splash Extension

## Running

Start: `yarn start`
Dev: `gulp watch`

Auto refresh enabled
Drag build directory to chrome extension folder.

## Redux Pattern

We're using [Ducks pattern](https://github.com/erikras/ducks-modular-redux) instead of traditional redux (it's faster). All it means is putting everything that's related to one domain into one file rather than spreading it over actions and reducers, etc.

## Styles

Because we're adding the extension into the page, we needed a workaround to make sure the styles are properly reset and prefixed, so they override everything outside the extension.
--> Use styled jsx
`<style jsx global>{`.componentName {
background: red;

.componentName-title {
color: green;
}
`}</style>`

Make sure to use unique names (i.e. the component name) for classNames, because it's global namespace css.

## Navigation

Built a little router with redux. Just pull `{ goTo }` from props and use it like `onClick={() => goTo('ENTER_SPLASHTAG')}`. The 'routes' are defined in app.js, mapping the name to the corresponding component e.g. `ENTER_SPLASHTAG: EnterSplashtag`

There are three folders:

1.  popup --> where the content for a built in chrome popup would go
2.  content --> content script that can be injected into any page (where we'll do the parsing for fields). Think of it as just editing the console in chrome on any random page. That's pretty much all you can do from here.
3.  event --> background script that keeps running and orchestrates everything. A lot of things are only possible from the background script, and accessing the current page is only possible from content script. That's why we need to pass messages back and forth between them using the chrome API.

# Directory
Description and locations of relevant files

## content

* src
```
    src
    ├── assets                # holds all of the images and animations for the extension
    ├── components            # UI components
    ├── lib                   # utilities and constants
    ├── modules               # redux and state control
    ├── api.js                # api for interfacing w/ firebase
    ├── firebase.js           # firebase initialization
    ├── index.js              # index initializing store, listeners, and front end
    ├── messageTypes.js       # message types for extension background functions
    └── scrape.js             # file for parsing fonts/colors of webpage
```
  * components
   
```
    components
    ├── animations                # all animated components
    ├── sections                  # components for each screen/section
    ├── universal                 # smaller universal components used across the app
    ├── App.js                    # container components for the app
    └── StyleReset.js             # global style for the extension
```
  * lib
```
    lib
    ├── constants.js                     # font and color constants
    ├── creditCard.js                    # credit card field selectors
    ├── fontUtils.js                     # utility for grabbing fonts
    └── urls.js                          # utility for grabbing/cleaning urls
```
  * modules
```
    modules
    ├── app.js                     # redux actions/reducer for authenticating and initializing a transaction
    └── index.js                   # index file
```
  
## event

* src

holds all of the background files for the extension, including listeners for refresh, closed/switched tab, and other messages from the front end.

## build
the built extension is here after running `yarn start && gulp watch`
drag this file into the chrome extension folder to update chrome.

## assets
only has the extension icon/logo
