const dev = {
  appBaseUrl: 'http://127.0.0.1:4000'
};

const prod = {
  appBaseUrl: 'http://api.jennypuichingchung.com'
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;