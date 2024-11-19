import React from 'react';
import PhoneInput from 'react-phone-input-2';

interface ContactInfoProps {
  clientData: any;
  handleChange: (field: any, value: string) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ clientData, handleChange }) => {
  const handleChangePhoneNumber = (value: string) => {
    handleChange("delivery_info.number", value)
  };

  return (
    <>
      <h3 className="checkout__subtitle">Контактна інформація</h3>
      <form action="put" className="checkout__form">
        <div className="checkout__cell">
          <label htmlFor="name1">Ім'я та Прізвище</label>
          <input
            type="text"
            name="name1"
            id="name1"
            placeholder="Ім'я та Прізвище"
            value={clientData.full_name}
            onChange={(e) => handleChange("delivery_info.full_name", e.target.value)}
            required
          />
        </div>
        <div className="checkout__cell">
          <label htmlFor="phone">Телефон</label>
          <PhoneInput
            country={'ua'}
            specialLabel='Телефон'
            value={clientData.phone_number}
            onChange={handleChangePhoneNumber}
            inputProps={{
              required: true,
            }}
          />
          {/* {!validPhoneNumber && <span className='checkout__error'>Невірний формат телефону</span>} */}
        </div>
        <div className="checkout__cell">
          <label htmlFor="email1">Електронна адреса</label>
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
