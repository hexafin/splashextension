# Splash Extension

Start: `yarn start`
Dev: `gulp watch`

Auto refresh enabled
Drag build directory to chrome extension folder.

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

There are three folders:

1.  popup --> where the content for a built in chrome popup would go
2.  content --> content script that can be injected into any page (where we'll do the parsing for fields). Think of it as just editing the console in chrome on any random page. That's pretty much all you can do from here.
3.  event --> background script that keeps running and orchestrates everything. A lot of things are only possible from the background script, and accessing the current page is only possible from content script. That's why we need to pass messages back and forth between them using the chrome API.
