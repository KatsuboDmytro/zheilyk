import React from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface ContactInfoProps {
  clientData: any;
  handleChange: (field: any, value: string) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ clientData, handleChange }) => {
  const [t] = useTranslation("global");
  
  const handleChangePhoneNumber = (value: string) => {
    handleChange("delivery_info.number", value)
  };

  return (
    <>
      <h3 className="checkout__subtitle">{t("checkout.contacts.title")}</h3>
      <form action="put" className="checkout__form">
        <div className="checkout__cell">
          <label htmlFor="name1">{t("checkout.contacts.name1")}</label>
          <input
            type="text"
            name="name1"
            id="name1"
            placeholder={t("checkout.contacts.name1")}
            value={clientData.full_name}
            onChange={(e) => handleChange("delivery_info.full_name", e.target.value)}
            required
          />
        </div>
        <div className="checkout__cell">
          <label htmlFor="phone"></label>
            <label htmlFor="phone">{t("checkout.contacts.phone")}</label>
            <PhoneInput
              country={'ua'}
              specialLabel=""
              value={clientData.phone_number}
              onChange={handleChangePhoneNumber}
              inputProps={{
                required: true,
                name: 'phone',
              }}
              containerClass="custom-container"
              inputClass="custom-input"
              buttonClass="custom-flag"
              dropdownClass="custom-dropdown"
            />
          {/* {!validPhoneNumber && <span className='checkout__error'>Невірний формат телефону</span>} */}
        </div>
        <div className="checkout__cell">
          <label htmlFor="email1">{t("checkout.contacts.email1")}</label>
          <input 
            type="email"
            name="email1"
            id="email1"
            placeholder="address@email.com"
            value={clientData.email}
            required
            onChange={(e) => handleChange("delivery_info.email", e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default ContactInfo;
