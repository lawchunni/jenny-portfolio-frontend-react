const env = process.env.REACT_APP_NODE_ENV;

const appBaseUrl = env === 'production' ? process.env.REACT_APP_PROD_URI : process.env.REACT_APP_DEV_URI;

const config = {
  appBaseUrl: appBaseUrl
}

export default config;