const router = require('express').Router();

router.get('/', (req, res) => {
  const dogs = ['Dolly', 'Trixie', 'Archie', 'Hugo']
  res.json(dogs);
});

module.exports = router;