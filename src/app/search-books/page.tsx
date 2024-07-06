'use client'

import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect } from "react";
import { SearchContext } from "@/context/search-context";
import { useRouter } from "next/navigation";

import cardImages from "../../app/card-images";

import CartBlack from '../../../public/assets/Cart-Black.svg';
import FavoritesBlack from '../../../public/assets/Favorites-Black.svg';

export default function SearchBooks({
  searchParams
} : {
  searchParams: { [key: string]: string | undefined}
}) {
  // const searchLink = () => { 
  //   if (typeof searchParams.search === 'string') {
  //     throw new Error('URL is not of type string')
  //   }
  //    return searchParams
  // }

  const router = useRouter()

  const { search } = useContext(SearchContext)

  const books = () => {
    if (search === "") {
      router.push("/")
    } else {
      return cardImages
        .filter((book) => book.name.normalize('NFD').toLocaleLowerCase().replace(/[\u0300-\u036f]/g, "").includes(search.toLocaleLowerCase()))
    }
  }

  return(
    <div className="w-[87%] mx-auto my-3">

      <span className="text-lg font-semibold">Pesquisando por - {search}</span>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-2">
        {books()?.map(book => (
        <div key={book.id} className="bg-white space-y-2 py-1 pb-0 rounded-md overflow-hidden">
            
          <Link href={`/products/${book.id}`}>
            <Image 
              src={book.src}
              alt="image"
              width={300}
              height={300}
              className="hover:opacity-90"
            />
          </Link>

          <span className="text-sky-600 font-medium text-center block h-20 px-1">
            <Link href={`/products/${book.id}`}>
              {book.name}
            </Link>
          </span>

          <span className="text-black text-xl font-bold text-center block">
            R${book.price}
          </span>

          <div className="flex flex-row">  
            <Link href={`/products/${book.id}`} className="bg-lime-400 h-10 flex items-center justify-center gap-1 w-3/4 group">
              <Image 
                src={CartBlack}
                alt="cart-black"
                className="group-hover:size-[25px]"
              />
              <span className="text-lg font-medium text-black group-hover:text-[19px]">
                Comprar
              </span>
            </Link>

            <button 
              className="bg-slate-300 text-xl font-medium text-black flex justify-center items-center w-1/4 group"
              // onClick={() => addToFavoriteBooks(card.id)}
              >
              
              <Image 
                src={FavoritesBlack}
                alt="FavoritesBlack"
                className="group-hover:size-[27px]"
              />
            </button>
          </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}