import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import newPostService from '../../../../services/goods/newPostService';

interface DeliveryDetailsProps {
  handleChange: (field: any, value: string | object) => void;
  clientData: any;
}

export type OptionType = {
  value: string;
  label: string;
};

export type MethodDetailsType = {
  'відділення': {
    'область': OptionType | null;
    'місто': OptionType | null;
    'відділення': OptionType | null;
  };
  'поштомат': {
    'область': OptionType | null;
    'місто': OptionType | null;
    'поштомат': OptionType | null;
  };
  "кур'єр": {
    'область': OptionType | null;
    'місто': OptionType | null;
    'адреса': OptionType | null;
  };
};

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ handleChange, clientData }) => {
  const [method, setMethod] = useState<keyof MethodDetailsType>('відділення');
  const [selectedRegion, setSelectedRegion] = useState<OptionType | null>(null);
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [newPostAreas, setNewPostAreas] = useState<OptionType[]>([]);
  const [newPostCities, setNewPostCities] = useState<OptionType[]>([]);
  const [newPostWarehouses, setNewPostWarehouses] = useState<OptionType[]>([]);

  const [methodDetails, setMethodDetails] = useState<MethodDetailsType>({
    'відділення': {
      'область': null,
      'місто': null,
      'відділення': null,
    },
    'поштомат': {
      'область': null,
      'місто': null,
      'поштомат': null,
    },
    "кур'єр": {
      'область': null,
      'місто': null,
      'адреса': null,//'',
    },
  });

  const handleRegionChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setSelectedRegion(selectedOption);
      setMethodDetails((prev) => ({
        ...prev,
        [method]: {
          ...prev[method],
          'область': selectedOption,
        },
      }));
    }
  };

  const handleCityChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setSelectedCity(selectedOption);
      setMethodDetails((prev) => ({
        ...prev,
        [method]: {
          ...prev[method],
          'місто': selectedOption,
        },
      }));
    }
  };

  const handleAdressChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setMethodDetails((prev) => ({
        ...prev,
        [method]: {
          ...prev[method],
          [method === "відділення" ? "відділення" : "поштомат"]: selectedOption,
        },
      }));
    }
  };

  const handleAdressToDeliverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethodDetails((prev) => ({
      ...prev,
      [method]: {
        ...prev[method],
        ["адреса"]: { value: '', label: event.target.value},
      },
    }));
  };

  useEffect(() => {
    const fetchNewPostData = async () => {
      try {
        const response = await newPostService.getNewPostAreas();
        const data = response.data.data;
        console.log('New post data:', data);
        setNewPostAreas(data.map((area: any) => ({
          value: area.Ref,
          label: area.Description,
        })));
      } catch (error) {
        console.error('Error fetching New Post data:', error);
      }
    };
    fetchNewPostData();
  }, []);

  useEffect(() => {
    const fetchNewPostCities = async () => {
      const area: string | undefined = selectedRegion?.value;

      if (area) {
        try {
          const response = await newPostService.getNewPostCities(area);
          const data = response.data.data;
          console.log('New post cities:', data);
          setNewPostCities(data.map((city: any) => ({
            value: city.Ref,
            label: city.Description,
          })));
        } catch (error) {
          console.error('Error fetching New Post cities:', error);
        }
      }
    };
    fetchNewPostCities();
  }, [selectedRegion]);

  useEffect(() => {
    const fetchNewPostWarehouses = async () => {
      const city: string | undefined = selectedCity?.value;

      if (city) {
        try {
          const response = await newPostService.getNewPostWarehouses(city);
          const data = response.data.data;
          console.log('New post warehouses:', data);
          setNewPostWarehouses(data.map((warehouse: any) => ({
            value: warehouse.Ref,
            label: warehouse.Description,
          })));
        } catch (error) {
          console.error('Error fetching New Post warehouses:', error);
        }
      }
    };
    fetchNewPostWarehouses();
  }, [selectedCity]);

  useEffect(() => {
    handleChange('delivery_info.post_department', methodDetails[method]);
  }, [method, methodDetails, handleChange]);

  const getCurrentOption = (value: OptionType | null, options: OptionType[]): OptionType | null => {
    return options.find(option => option.value === value?.value) || null;
  };

  const warehouseValue = method === 'відділення' ? methodDetails['відділення'].відділення : methodDetails['поштомат'].поштомат;

  return (
    <>
      <div className="account__cell--row">
        <button
          className="account__newpost"
          onClick={() => setMethod('відділення')}
          style={{ borderColor: method === 'відділення' ? '#f00' : '' }}
        >
          У відділення Нової Пошти
        </button>
        <button
          className="account__newpost"
          onClick={() => setMethod('поштомат')}
          style={{ borderColor: method === 'поштомат' ? '#f00' : '' }}
        >
          У поштомат Нової Пошти
        </button>
        <button
          className="account__newpost"
          onClick={() => setMethod("кур'єр")}
          style={{ borderColor: method === "кур'єр" ? '#f00' : '' }}
        >
          Кур'єром Нової Пошти
        </button>
      </div>
      <div className="account__cell">
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="region">Область</label>
            <Select
              id="region"
              options={newPostAreas}
              placeholder="Оберіть область"
              isSearchable={true}
              onChange={handleRegionChange}
              value={getCurrentOption(methodDetails[method]['область'], newPostAreas)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Місто</label>
            <Select
              id="city"
              options={newPostCities}
              placeholder="Оберіть місто"
              isSearchable={true}
              onChange={handleCityChange}
              value={getCurrentOption(methodDetails[method]['місто'], newPostCities)}
              isDisabled={!selectedRegion}
            />
          </div>

          <div className="form-group checkout__cell">
            <label htmlFor="warehouse">{method === "кур'єр" ? 'Адреса' : 'Відділення'}</label>
            {method === "кур'єр" ? (
              <input
                type="text"
                name="name1"
                id="name1"
                placeholder="Вулиця, будинок, квартира"
                value={methodDetails[method]['адреса']?.label}
                onChange={handleAdressToDeliverChange}
                required
              />
            ) : (
              <Select
                id="warehouse"
                options={newPostWarehouses}
                placeholder={method === 'відділення' ? 'Оберіть відділення' : 'Оберіть поштомат'}
                isSearchable={true}
                onChange={handleAdressChange}
                value={getCurrentOption(warehouseValue, newPostWarehouses)}
                isDisabled={!selectedCity}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryDetails;