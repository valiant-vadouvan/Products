const connection = require ('../db/index.js');

module.exports = {
  products: function (callback) {
    // const { page = 1, count = 5 } = req.query;
    const qString = 'SELECT * FROM products LIMIT 5';
    connection.query(qString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  info: function (callback, product_id) {
    const qString = `SELECT (
      jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'slogan', p.slogan,
        'description', p.description,
        'category', p.category,
        'default_price', p.default_price,
        'features', (
          SELECT (
            jsonb_agg(
              jsonb_build_object(
                'feature', f.feature,
                'value', f.value
              )
            )
          )
          FROM features f
          WHERE f.product_id=p.id
        )
      )
    )
    FROM products p
    WHERE p.id = $1;`;
    connection.query(qString, [product_id], (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  styles: function (callback, product_id) {
    const qString = `SELECT (
      jsonb_build_object(
        'product_id', p.id,
        'results', (
          SELECT (
            jsonb_agg(
              jsonb_build_object(
                'style_id', s.style_id,
                'name', s.name,
                'original_price', s.original_price,
                'sale_price', s.sale_price,
                'default?', s.default_style,
                'photos', (
                  SELECT (
                    jsonb_agg(
                      jsonb_build_object(
                        'thumbnail_url', h.thumbnail_url,
                        'url', h.url
                      )
                    )
                  )
                  FROM photos h
                  WHERE h.style_id=s.style_id
                ),
                'skus', (
                  SELECT (
                    jsonb_object_agg(
                      k.id, (
                        jsonb_build_object(
                          'quantity', k.quantity,
                          'size', k.size
                        )
                      )
                    )
                  )
                  FROM skus k
                  WHERE k.style_id=s.style_id
                )
              )
            )
          )
          FROM styles s
          WHERE s.product_id=p.id
        )
      )
    )
    FROM products p
    WHERE p.id = $1;`;
    connection.query(qString, [product_id], (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  related: function (callback, product_id) {
    const qString = `SELECT (
      jsonb_agg(
        r.related_product_id
      )
    )
    FROM related_products r
    WHERE r.current_product_id = $1;`;
    connection.query(qString, [product_id], (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
};