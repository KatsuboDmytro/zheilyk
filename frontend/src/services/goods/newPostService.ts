import axios from 'axios';

interface NewPostService {
  getNewPostAreas: () => Promise<any>;
  getNewPostCities: (area: string | undefined) => Promise<any>;
  getNewPostWarehouses: (city: string | undefined) => Promise<any>;
}

const newPostService: NewPostService = {
  getNewPostAreas: () => {
    const request = {
      "apiKey": process.env.REACT_APP_NEWPOST_TOKEN,
      "modelName": "Address",
      "calledMethod": "getAreas",
      "methodProperties": {}
    };

    const response = axios.post(`https://api.novaposhta.ua/v2.0/json/`, request);

    return response;
  },
  getNewPostCities: (area) => {
    const request = {
      "apiKey": process.env.REACT_APP_NEWPOST_TOKEN,
      "modelName": "Address",
      "calledMethod": "getCities",
      "methodProperties": {
        "AreaRef": area,
      }
    };

    const response = axios.post(`https://api.novaposhta.ua/v2.0/json/`, request);

    return response;
  },
  getNewPostWarehouses: (city) => {
    const request = {
      "apiKey": process.env.REACT_APP_NEWPOST_TOKEN,
      "modelName": "Address",
      "calledMethod": "getWarehouses",
      "methodProperties": {
        "CityRef": city,
      }
    };

    const response = axios.post(`https://api.novaposhta.ua/v2.0/json/`, request);

    return response;
  },
};

export default newPostService;
