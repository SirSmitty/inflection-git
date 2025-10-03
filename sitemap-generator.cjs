// Enable JSX/ESNext for this Node script
require("@babel/register")({
    presets: ["@babel/preset-env", "@babel/preset-react"],
    extensions: [".js", ".jsx"],
});

const router = require("./src/sitemap-routes.js").default;
const Sitemap = require("react-router-sitemap").default;

const SITE_URL = "https://inflectioncm.com";

new Sitemap(router)
    .build(SITE_URL)
    .save("./public/sitemap.xml");

console.log("✅ sitemap.xml generated");