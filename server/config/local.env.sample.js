'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://www.akashyadav.com:9000',
  SESSION_SECRET:   'imageprocessing-secret',

  FACEBOOK_ID:      '217716631922342',
  FACEBOOK_SECRET:  '38e4245d88471f65dd67535330d19e50',

  TWITTER_ID:       'rUPvW4EWdwBRDAm17lg3fmbtR',
  TWITTER_SECRET:   'mv7YRaZvbvTf9VvunT4G1XKrihqCHBypqgfPAB8fWz0yFI0DSl',

  GOOGLE_ID:        '354827563643-aisfr1saqqihg30aiglcjemllafjla98.apps.googleusercontent.com',
  GOOGLE_SECRET:    'siUD81YRscB-w96GGY5UNxvZ',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
