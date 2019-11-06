const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Assets API'
  });
});

/* GET home page. */
router.get('/docs', (req, res) => {
  res.render('docs', {
    title: 'Assets API'
  });
});

/* Get route for docs */
router.get('/docs/api', (req, res) => {
  res.render('docs', {
    title: 'Assets API'
  })
});

module.exports = router;
