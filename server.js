require('dotenv').config({ path: 'variables.env' });
// NPM packages
const next = require('next');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Next.js set-up
const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
// Serve static files from /static/
const staticFileOptions = { root: __dirname + '/static/', headers: { 'Content-Type': 'text/plain;charset=UTF-8' } };
// Error catching
const catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);
// Trails API
const trails = require('./controllers/trails');

app
  .prepare()
  .then(() => {
    const server = express();
    ConfigureExpress(server);
    const router = require('express-promise-router')();
    server.use(router);
    // Mock API
    router.get("/api/trailsystem/:trailsystem", trails.getTrailSystemData);
    // API
    router.get("/api/region", trails.getRegionData);
    router.get("/api/coordinates", trails.getCoordinates);
    router.get("/api/elevation", trails.getElevation);
    router.get("/api/trail/:trail", trails.getTrailData);
    // Handle All Routes
    server.get('/', (req, res) => app.render(req, res, '/'));
    server.get('/trail-systems/:system', (req, res) => app.render(req, res, '/trail-systems/trailsystem'));
    server.get('/trails/:trail', (req, res) => app.render(req, res, '/trails/trail'));
    server.get('*', (req, res) => handle(req, res));
    // Start Server
    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on port: ' + port);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });


// Configure Server
function ConfigureExpress(server) {
  // Having compression on in dev makes header issues appear in console
  if (process.env.NODE_ENV === "production") {
    server.use(compression());
  }
  server.use(cookieParser());
  // Make form data avaiable on req.body
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  // noindex, nofollow on non-production sites.
  // if (process.env.SITE !== 'washington-trails-production') {
  //   server.use('*', (req, res, next) => {
  //     res.header('X-Robots-Tag', 'noindex, nofollow');
  //     next();
  //   });
  // }
  // // Add Redirects
  // // Redirect herokuapp url & force www
  // if (process.env.NODE_ENV === 'production') {
  //   server.all(/.*/, function(req, res, next) {
  //     const host = req.header('host');
  //     if (process.env.SITE === 'washington-trails-production') {
  //       host.match(/trails.visitstgeorge.com/)
  //         ? next()
  //         : res.redirect(301, 'https://trails.visitstgeorge.com' + req.path);
  //     } else {
  //       host.match(/staging.trails.visitstgeorge.com/)
  //         ? next()
  //         : res.redirect(301, 'https://trails-staging.visitstgeorge.com' + req.path);
  //     }
  //   });
  // }
  // Static Files
  // server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', staticFileOptions));
  // server.get('/sitemap.xml', (req, res) => res.status(200).sendFile('sitemap.xml', staticFileOptions));
}
