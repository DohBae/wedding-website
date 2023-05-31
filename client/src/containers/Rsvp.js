import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RSVPForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(true);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [hasAllergy, setHasAllergy] = useState(false);
  const [other, setOther] = useState(false);
  const [songChoice, setSongChoice] = useState('');
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingRSVP, setExistingRSVP] = useState(null);

  useEffect(() => {
    // Check if the guest already RSVP'd
    const checkExistingRSVP = async () => {
      const response = await axios.get(`/rsvp?email=${email}`);
      if (response.status === 200) {
        const existingRSVPData = response.data;
        if (existingRSVPData) {
          setExistingRSVP(existingRSVPData);
          setName(existingRSVPData.name);
          setAttending(existingRSVPData.attending);
          setDietaryRestrictions(existingRSVPData.dietaryRestrictions);
          setHasAllergy(existingRSVPData.hasAllergy);
          setOther(existingRSVPData.other);
          setSongChoice(existingRSVPData.songChoice);
          setMessage(existingRSVPData.message);
        }
      }
    };

    if (email) {
      checkExistingRSVP();
    }
  }, [email]);

  const handleRSVPUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.put(`/rsvp/${existingRSVP.id}`, {
      name,
      email,
      attending,
      dietaryRestrictions,
      hasAllergy,
      other,
      songChoice,
      message,
    });

    if (response.status === 200) {
      setConfirmation('Your RSVP has been updated!');
      await axios.post('/send-email', {
        name,
        email,
        attending,
        dietaryRestrictions,
        hasAllergy,
        other,
        songChoice,
        message,
      });
    } else {
      console.error('Failed to update RSVP');
      setConfirmation('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post('/rsvp', {
      name,
      email,
      attending,
      dietaryRestrictions,
      hasAllergy,
      other,
      songChoice,
      message,
    });

    if (response.status === 200) {
      setConfirmation('Thank you for your RSVP! We look forward to seeing you at the wedding!');
      await axios.post('/send-email', {
        name,
        email,
        attending,
        dietaryRestrictions,
        hasAllergy,
        other,
        songChoice,
        message,
      });
    } else {
      console.error('Failed to submit RSVP');
      setConfirmation('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>RSVP Form</h2>
      {existingRSVP ? (
        <div>
          <p>You have already RSVP'd. If you would like to change your RSVP, click the button below.</p>
          <button onClick={() => setExistingRSVP(null)}>Update RSVP</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="attending">Will you be attending?</label>
            <select
              id="attending"
              value={attending}
              onChange={(e) => setAttending(e.target.value === 'true')}
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label>Dietary Restrictions:</label>
            <div>
              <input
                type="checkbox"
                id="vegetarian"
                checked={dietaryRestrictions.includes('vegetarian')}
                onChange={(e) =>
                  setDietaryRestrictions((prevRestrictions) => {
                    if (e.target.checked) {
                      return [...prevRestrictions, 'vegetarian'];
                    } else {
                      return prevRestrictions.filter((restriction) => restriction !== 'vegetarian');
                    }
                  })
                }
              />
              <label htmlFor="vegetarian">Vegetarian</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="vegan"
                checked={dietaryRestrictions.includes('vegan')}
                onChange={(e) =>
                  setDietaryRestrictions((prevRestrictions) => {
                    if (e.target.checked) {
                      return [...prevRestrictions, 'vegan'];
                    } else {
                      return prevRestrictions.filter((restriction) => restriction !== 'vegan');
                    }
                  })
                }
              />
              <label htmlFor="vegan">Vegan</label>
            </div>
            {/* Add more dietary restrictions checkboxes here */}
            <input
            type="checkbox"
            id="other"
            checked={other}
            onChange={(e) => setOther(e.target.checked)}
            />
            <label htmlFor="other">Other</label>
            </div>
          {other && (
            <div>
              <input
                type="text"
                id="other"
                value=""
                onChange={(e) => setOther(e.target.value)}
              />
            </div>
          )}
          <div>
          </div>
          <div>
            <input
              type="checkbox"
              id="hasAllergy"
              checked={hasAllergy}
              onChange={(e) => setHasAllergy(e.target.checked)}
            />
            <label htmlFor="hasAllergy">Do you have any allergies?</label>
          </div>
          {hasAllergy && (
            <div>
              <input
                type="text"
                id="allergy"
                value=""
                onChange={(e) => setHasAllergy(e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="songChoice">Choose a song to dance to:</label>
            <input
              type="text"
              id="songChoice"
              value={songChoice}
              onChange={(e) => setSongChoice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message">Leave a message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {confirmation && <p>{confirmation}</p>}
    </div>
  );
};
export default RSVPForm;
