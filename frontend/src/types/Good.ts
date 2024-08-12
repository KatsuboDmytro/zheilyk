export interface Good {
  id: number,
  brand: string,
  image: string | null,
  name: string,
  description: string,
  price: string,
  category: number,
  size: string,
  color: string,
  sale: boolean,
  in_stock: boolean
}