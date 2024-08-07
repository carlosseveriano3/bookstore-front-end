'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useContext} from "react";
import { SearchContext } from "@/context/search-context";
import { useRouter } from "next/navigation";

import Logo from '../../public/book.png';
import Menu from '../../public/assets/Menu.svg';
import User from '../../public/assets/User.svg';
import Favorites from '../../public/assets/Favorites.svg';
import Cart from '../../public/assets/Cart.svg';
import Search from '../../public/assets/Search.svg';
import Close from '../../public/assets/Close.svg';

export function Header() {

  const { search, setSearch } = useContext(SearchContext);
  const [windowWidth, setWindowWidth] = useState(0);
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  function searchValue(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function enterSearch() {
    console.log("foi")
    router.push(`/search-products?search=${search}`)
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMemo(() => {
    if (windowWidth > 766) {
      setIsOpen(false)
    }
  }, [windowWidth])

  function getMenuClasses() {
    let menuClasses: string[] = [];

    if (isOpen) {
      menuClasses = [
        "flex",
        "absolute",
        "bg-slate-600",
        "w-full",
        "p-4",
        "left-0",
        "flex-col",
        "items-center",
      ]
    }

    return menuClasses.join(" ")
  }

  return(
    <nav>
      <div className="bg-slate-600 w-full p-2 flex items-center justify-between sm:p-3">
          <button 
            className="ml-2 md:hidden"
            onClick={() => {
              setIsOpen(!isOpen)
            }}  
          >
            {isOpen ? (
              <Image src={Close} 
              alt="Close" 
              className="size-8"
              />
            ) : (
              <Image 
              src={Menu} 
              alt="Menu" 
              className="size-8"
              />
            )}
          </button>

        <div className="flex items-center gap-2 lg:ml-7">
          <div className="">
            <Link href="/">
              <Image
              src={Logo}
              alt="logo"
              className="size-10"
              />
            </Link>
          </div>
          <div className="">
            <span className="font-bold text-2xl text-nowrap antialiased">Don't Panic!</span>
          </div>
        </div>

        <div className="flex gap-2 md:gap-4">
          <Link href="/">
            <Image 
              src={User}
              alt="user"
              className="size-7 lg:size-[32px]"
            />
            <span className="hidden lg:block lg:-translate-x-1">entrar</span>
          </Link>

          <Link href="/favorite-products">
            <Image 
              src={Favorites}
              alt="Favorites"
              className="size-7 lg:size-[32px] lg:ml-2"
            />
            <span className="hidden text-center lg:block lg:-translate-x-1">favoritos</span>
          </Link>

          <Link href="/" className="mr-2 lg:mr-10">
            <Image 
              src={Cart}
              alt="Cart"
              className="size-7 lg:size-[32px]"
            />
            <span className="hidden lg:block lg:-translate-x-1">cesta</span>
          </Link>
        </div>

      </div>

      <div className={`${isOpen ? "" : "bg-amber-400"} h-12 flex justify-center`}>
        
        <form className= "flex items-center focus-within:text-black sm:ml-20 md:absolute md:top-4 md:ml-18 lg:ml-6 lg:top-6">
          <div className="relative text-black">
            <Image 
              src={Search}
              alt="search"
              className="absolute pointer-events-none my-1 right-3"
            />
            <input 
              type="text" 
              autoComplete="off" 
              placeholder="O que você procura?"
              value={search}
              onChange={searchValue}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  enterSearch()
                }
              }}
              className="px-3 py-[4px] w-[360px] outline-none rounded-md border-none 
              placeholder-gray-400 ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 lg:w-[500px]"
            />
          </div>
        </form>

        <div className={`${getMenuClasses()} ${isOpen ? "": "hidden"} space-y-6 z-10 md:flex md:justify-center md:space-y-0 md:items-center md:translate-x-14`}>
          <div className="flex flex-col space-y-6 -translate-x-14 md:space-y-0 md:flex-row md:items-center">
            <Link href="/" className="md:hover:bg-slate-600 md:hover:rounded-md md:p-2">Produtos</Link>
            <Link href="/public-domain" className="md:hover:bg-slate-600 md:hover:rounded-md md:p-2">Livros de domínio público</Link>
            <Link href="/categories" className="md:hover:bg-slate-600 md:hover:rounded-md md:p-2">Categorias</Link>
            <Link href="/contact" className="md:hover:bg-slate-600 md:hover:rounded-md md:p-2">Contato</Link>
          </div>
          
          <div className="-translate-x-[63px] md:-translate-x-14">
            <span>
              <Link href="/my-products" className="md:hover:bg-slate-600 md:hover:rounded-md md:p-2 md:inline-block">
                Meus produtos
              </Link>
            </span>
          </div>
        </div>

      </div>

    </nav>
  )
}