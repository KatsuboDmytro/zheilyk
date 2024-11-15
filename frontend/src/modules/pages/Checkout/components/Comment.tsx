import React from 'react';

interface CommentProps {
  comment: string;
  handleChange: (field: any, value: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, handleChange }) => {
  return (
    <>
      <h3 className="checkout__subtitle">Ваш коментар</h3>
      <form action="put" className="checkout__form">
        <div className="checkout__cell">
          <textarea
            name="comment"
            id="comment"
            required
            className="checkout__comment"
            placeholder="Зв'яжіться зі мною, будь ласка"
            value={comment}
            onChange={(e) => handleChange("delivery_info.comments", e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default Comment;
