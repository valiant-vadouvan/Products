var models = require('../models/models.js');

module.exports = {
  products: function (req, res) {
    if (req.method === 'GET' && req.url === '/products') {
      models.products((err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data.rows);
        }
      });
    }
  },

  info: function (req, res) {
    const { product_id } = req.params;
    if (req.method === 'GET' && req.url === `/products/${product_id}`) {
      models.info((err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data.rows[0].jsonb_build_object);
        }
      }, product_id);
    }
  },

  styles: function (req, res) {
    const { product_id } = req.params;
    if (req.method === 'GET' && req.url === `/products/${product_id}/styles`) {
      models.styles((err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data.rows[0].jsonb_build_object);
        }
      }, product_id);
    }
  },

  related: function (req, res) {
    const { product_id } = req.params;
    if (req.method === 'GET' && req.url === `/products/${product_id}/related`) {
      models.related((err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data.rows[0].jsonb_agg);
        }
      }, product_id);
    }
  }
}