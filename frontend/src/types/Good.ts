export interface Good {
  id: number,
  brand: string,
  images: string[],
  name: string,
  description: Description[],
  additional_info: AdditionalInfo[],
  price: string,
  category: number,
  size: string[],
  color: string,
  sale: boolean,
  in_stock: boolean,
  sale_price: string | null,
  date_added?: string,
}

interface AdditionalInfo {
  size: string;
  color: string;
  amount: number;
}

interface Description {
  title: string;
  description: string;
}