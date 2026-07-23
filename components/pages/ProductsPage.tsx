'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Heart } from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  image: string
  mrp: number
  price: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'Ganapathy Idol',
    category: 'Pooja Items',
    image: '/products/ganapathy.jpg',
    mrp: 1299,
    price: 899,
  },
  {
    id: 2,
    name: 'Brass Vilakku',
    category: 'Lamps',
    image: '/products/lamp.jpg',
    mrp: 1599,
    price: 1199,
  },
  {
    id: 3,
    name: 'Rudraksha Mala',
    category: 'Rudraksha',
    image: '/products/rudraksha.jpg',
    mrp: 899,
    price: 699,
  },
  {
    id: 4,
    name: 'Pooja Kit',
    category: 'Pooja Items',
    image: '/products/pooja-kit.jpg',
    mrp: 999,
    price: 749,
  },
 
]

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('')

  let filtered = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const categoryMatch =
      category === 'All' || product.category === category

    return searchMatch && categoryMatch
  })

  if (sort === 'low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  }

  if (sort === 'high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

  {/* Hero */}

  <div className="text-center mb-12">

    <h1 className="text-5xl md:text-6xl font-bold text-black">
      Sacred Pooja Store
    </h1>

    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
      Explore our premium collection of pooja essentials,
      lamps, idols, rudraksha and sacred accessories.
    </p>

  </div>

  {/* Filters */}

  <div className=" top-24 z-20 bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-10">

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      <div className="text-gray-600">
        <span className="font-semibold text-black">
          {filtered.length}
        </span>{' '}
        Products Found
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-12 w-full md:w-56 rounded-xl border border-gray-300 px-4 outline-none focus:border-yellow-700"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 w-full md:w-56 rounded-xl border border-gray-300 px-4 outline-none focus:border-yellow-700"
        >
          <option>All</option>
          <option>Pooja Items</option>
          <option>Lamps</option>
          <option>Flowers</option>
          <option>Rudraksha</option>
        </select>

        {/* Search */}

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 rounded-xl border border-gray-300 pl-12 pr-4 outline-none focus:border-yellow-700"
          />

        </div>

      </div>

    </div>

  </div>

  {/* Product Grid */}

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

    {filtered.map((product) => {

      const discount = Math.round(
        ((product.mrp - product.price) / product.mrp) * 100
      )

      return (

      

            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >

              {/* Image */}

              <div className="relative overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Category */}

                <span
                  className="absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-semibold text-black"
                  style={{
                    background: 'rgba(201,162,39,.4)',
                  }}
                >
                  {product.category}
                </span>

                {/* Discount */}

                <span className="absolute right-4 top-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </span>

                {/* Wishlist */}

                <button className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
                  ♡
                </button>

              </div>

              {/* Content */}

              <div className="p-6">

                <h3 className="text-lg font-semibold text-black line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center gap-3 mt-4">

                  <span className="text-2xl font-bold text-black">
                    ${product.price.toFixed(2)}
                  </span>

                  <span className="text-gray-400 line-through">
                    ${product.mrp.toFixed(2)}
                  </span>

                </div>

                <p className="text-green-600 text-sm mt-2 font-medium">
                  You Save ${(product.mrp - product.price).toFixed(2)}
                </p>

                        <Link href={`/products/${product.id}`}>
  <button
    className="w-full mt-6 h-12 rounded-xl text-black font-semibold transition hover:scale-[1.02]"
    style={{
      background: "rgba(201,162,39,.4)",
    }}
  >
    View Product
  </button>
</Link>

              </div>

            </div>

          )

        })}

      </div>

    </section>

  )

}