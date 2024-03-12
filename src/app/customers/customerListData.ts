export type CustomerList = {
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
  results: Customer[];
};
export type Customer = {
  id: {
    name: string;
    value: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  gender: string;
  registered: {
    date: string;
    age: number;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
};
