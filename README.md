# spair-test

Test Details: https://docs.google.com/document/d/1JzD7RCkQjDNILkmZrldYOWE_lGqzHU9zB74nwZlz81w

Hmmm it seems create-react-app-typescript is deprecated since create-react-app has typescript support now.


## Setup
To setup the app and view it. You want to clone build and serve it.
```bash
git clone https://github.com/muggy8/spair-test zhikaili
cd zhikaili
npm install
npm run build
node server
```

Next you can visit your localhost to see the product. If you want to change the port you can call `node server` with `-d` or `-dev` to have it moved on port 5000 and you can also pass in a port using `--port=####`. Now you can visit the app via localhost in your browser


## Components

The app itself has 2 main components. The first one is the app.js file which contains the view of the main app. The file has very few things that it does. the first thing it does is to set up any continuous actions that needs to be done and attach them to listeners of when the app is attached and detach the listener when the component is detached. This is to future proof the design so it will be easier to migrate this to a sub component of another app. The listeners that are added are the browser's window resize as well as initiate the continuous polling of the bus data. The second part of this is the render function which renders the map as well as the markers that are on the map. Because the map itself doesn't have any ways of getting the bounding box out of it. the source map is dug out from underneath and it's bounding box is obtained. this allows us to exclude any markers that are not shown and exclude them from the drawing cycle.

The second main component of the server. the main reason for the need of the server is because Translink doesn't serve their data with allow cross origin, as a result, the data is rejected in the browser's request. the solution is to retrieve the data server side and pass it to the client. I also took that opportunity to parse the data into json before passing it off to the browser. the rest of the server is express's  static function which is pretty good for just serving the normal assets.

## Artistic Flare
I decided that the dots would look better if they had some sort of animation. i tried a transition and let them one between updates but that was a bit slow and ragging the map around resulted in some really funky effects. I eventually settled on the blinking effect that's kinda reminiscent of a radar scanner effect.
