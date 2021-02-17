const http = require("http");
const fs = require("fs");
const url = require("url");
const {replaceTemplate} = require('./modules/render_template');

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf8");
const dataObject = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

// * Create a Server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  // * Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardsHTML = dataObject
      .map((item) => replaceTemplate(tempCard, item))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS %}/g, cardsHTML);
    return res.end(output);
  }
  // * Products Page
  else if (pathname === "/product/") {
    const id = query.id;
    const item = dataObject[id];
    const output = replaceTemplate(tempProduct, item);
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(output);
  }
  // * API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    return res.end(data);
  }
  res.writeHead(404, {
    "Content-Type": "text/html",
    "my-own-header": "Hello, world",
  });
  res.end("<h1>Page Not Found!</h1>");
});

server.listen(3000, "localhost", () => {
  console.log("Listening to requests on port 3000");
});
