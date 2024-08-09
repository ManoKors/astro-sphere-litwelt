---
import { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && comment) {
      onSubmit({ rating, comment });
      setRating(0);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Bewertung:</label>
        <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="0">0 Sterne</option>
          <option value="1">1 Stern</option>
          <option value="2">2 Sterne</option>
          <option value="3">3 Sterne</option>
          <option value="4">4 Sterne</option>
          <option value="5">5 Sterne</option>
        </select>
      </div>
      <div>
        <label htmlFor="comment">Kommentar:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">Bewertung abgeben</button>
    </form>
  );
};

export default ReviewForm;
