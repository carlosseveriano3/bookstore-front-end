import { useRef } from "react";
import { Products } from "./types";

const base_url = 'https://dummyjson.com/products'

export async function getProductsCategory(
  category: string
): Promise<{
  products: Products[] | null
  error: string | null
}> {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch(`${base_url}/category/${category}?limit=10`);
    const data = await res.json();

    if (typeof data === 'string' || !data) {
      throw new Error('Failed to fetch products')
    }
    
    return { products: data.products, error: null }
  } catch (error: any) {
    return { products: null, error: error.message || 'Failed too fetch products' }
  }
}

export async function getProductById(
  id: string
): Promise<{
  product: Products | null
  error: string | null
}> {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch (`${base_url}/${id}`)
    const data = await res.json();

    if (typeof data === 'string' || !data) {
      throw new Error('Failed to fetch data')
    }

    console.log(data)

    return { product: data, error: null }
  } catch (error: any) {
    return { product: null, error: error.message || 'Failed to fetch product' }
  }
}

export async function getProductsById(
  id: string
): Promise<{
  product: Products[] | null
  error: string | null
}> {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch (`${base_url}/${id}`)
    const data = await res.json();

    if (typeof data === 'string' || !data) {
      throw new Error('Failed to fetch data')
    }

    console.log(data)

    return { product: data.product, error: null }
  } catch (error: any) {
    return { product: null, error: error.message || 'Failed to fetch product' }
  }
}