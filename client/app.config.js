import { route } from "./components/exports/exports";
module.exports = ({ config }) => ({
  ...config,
  extra: {
    routeUrl: route.dev
  },
});