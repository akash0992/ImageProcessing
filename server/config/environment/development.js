'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/imageprocessing-dev'
  },
  google: {
    clientID:     process.env.GOOGLE_ID || '354827563643-aisfr1saqqihg30aiglcjemllafjla98.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'siUD81YRscB-w96GGY5UNxvZ',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },
  facebook: {
    clientID:     process.env.FACEBOOK_ID || '217716631922342',
    clientSecret: process.env.FACEBOOK_SECRET || '38e4245d88471f65dd67535330d19e50',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },
  twitter: {
    clientID:     process.env.TWITTER_ID || 'rUPvW4EWdwBRDAm17lg3fmbtR',
    clientSecret: process.env.TWITTER_SECRET || 'mv7YRaZvbvTf9VvunT4G1XKrihqCHBypqgfPAB8fWz0yFI0DSl',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },
  cloudinary: {
    cloud_name: 'ttndbuzz',
    api_key: '827252699874268',
    api_secret: '3DURJxUyusq-5LZmHlGHt81UODA'
  },
  seedDB: false
};
