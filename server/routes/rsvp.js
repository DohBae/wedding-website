const express = require('express');
const router = express.Router();
const pool = require('../configs/database');
const nodemailer = require('nodemailer');

router.get('/rsvp', async (req, res) => {
  const email = req.query.email;

  pool.query('SELECT * FROM rsvp WHERE email = $1', [email])
    .then((result) => {
      if (result.rows.length > 0) {
        const existingRSVPData = result.rows[0];
        res.status(200).json(existingRSVPData);
      } else {
        res.status(200).json(null);
      }
    })
    .catch((error) => {
      console.error('Failed to retrieve RSVP data from the database', error);
      res.sendStatus(500);
    });
});

router.put('/rsvp/:id', (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    attending,
    dietaryRestrictions,
    hasAllergy,
    other,
    songChoice,
    message,
  } = req.body;

  pool.query(
    'UPDATE rsvp SET name = $1, email = $2, attending = $3, dietary_restrictions = $4, has_allergy = $5, other = $6, song_choice = $7, message = $8 WHERE id = $9',
    [name, email, attending, dietaryRestrictions, hasAllergy, other, songChoice, message, id]
  )
    .then(() => {
      return sendEmailNotification(name, email, attending, dietaryRestrictions, hasAllergy, other, songChoice, message);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Failed to update RSVP in the database', error);
      res.sendStatus(500);
    });
});

router.post('/rsvp', (req, res) => {
  const {
    name,
    email,
    attending,
    dietaryRestrictions,
    hasAllergy,
    other,
    songChoice,
    message,
  } = req.body;

  pool.query(
    'INSERT INTO rsvp (name, email, attending, dietary_restrictions, has_allergy, other, song_choice, message) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [name, email, attending, dietaryRestrictions, hasAllergy, other, songChoice, message]
  )
    .then(() => {
      return sendEmailNotification(name, email, attending, dietaryRestrictions, hasAllergy, other, songChoice, message);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Failed to insert RSVP into the database', error);
      res.sendStatus(500);
    });
});

function sendEmailNotification(name, email, attending, dietaryRestrictions, hasAllergy, other, songChoice, message) {
  const transporter = nodemailer.createTransport({
    // Replace with your own email service configuration
    service: 'gmail',
    auth: {
      user: 'your-email@example.com',
      pass: 'your-password',
    },
  });

  const guestMailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'RSVP Confirmation',
    text: `Dear ${name},\n\nThank you for your RSVP!\n\nDetails:\nAttending: ${attending}\nDietary Restrictions: ${dietaryRestrictions.join(', ')}\nHas Allergy: ${hasAllergy}\nOther: ${other}\nSong Choice: ${songChoice}\n\nMessage: ${message}\n\nBest Regards,\nThe Event Team`,
  };

  const selfMailOptions = {
    from: 'your-email@example.com',
    to: 'your-email@example.com',
    subject: 'New RSVP',
    text: `Name: ${name}\nEmail: ${email}\nAttending: ${attending}\nDietary Restrictions: ${dietaryRestrictions.join(', ')}\nHas Allergy: ${hasAllergy}\nOther: ${other}\nSong Choice: ${songChoice}\n\nMessage: ${message}`,
  };

  return Promise.all([
    transporter.sendMail(guestMailOptions),
    transporter.sendMail(selfMailOptions),
  ])
    .catch((error) => {
      console.error('Failed to send email notification', error);
    });
}

module.exports = router;
