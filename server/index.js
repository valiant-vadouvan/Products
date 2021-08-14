const express = require('express');
const controllers = require('./controllers/controllers.js');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/products', controllers.products);
app.get('/products/:product_id', controllers.info);
app.get('/products/:product_id/styles', controllers.styles);
app.get('/products/:product_id/related', controllers.related);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});