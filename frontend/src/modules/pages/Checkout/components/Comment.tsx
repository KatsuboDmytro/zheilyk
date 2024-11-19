import React from 'react';
import { useTranslation } from 'react-i18next';

interface CommentProps {
  comment: string;
  handleChange: (field: any, value: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, handleChange }) => {
  const [t] = useTranslation("global");

  return (
    <>
      <h3 className="checkout__subtitle">{t("checkout.comment.standart")}</h3>
      <form action="put" className="checkout__form">
        <div className="checkout__cell">
          <textarea
            name="comment"
            id="comment"
            required
            className="checkout__comment"
            placeholder={t("checkout.comment.placeholder")}
            value={comment}
            onChange={(e) => handleChange("delivery_info.comments", e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default Comment;
