'use client'

import { useState } from 'react'
import { products } from '@/data/products'

interface Props {
  slug: string
}

export default function ProductDetailsPage({ slug }: Props) {
  const product = products.find((p) => p.slug === slug)

  const [selectedImage, setSelectedImage] = useState(
    product?.images[0] || ''
  )

  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-32 text-center">
        <h2 className="text-3xl font-bold">Product Not Found</h2>
      </div>
    )
  }

  const relatedProducts = products.filter(
    (item) => item.slug !== product.slug
  )

  const whatsappMessage = `Hello,

I am interested in this product.

Product : ${product.name}

Price : $${product.price}

Quantity : ${qty}

Please share more details.`

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Breadcrumb */}

      <p className="text-gray-500 mb-8">
        Home / Products / {product.name}
      </p>

      <div className="grid lg:grid-cols-2 gap-16">

        {/* Images */}

        <div>

          <div className="bg-white rounded-3xl shadow overflow-hidden">

            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[600px] object-cover"
            />

          </div>

          <div className="flex gap-4 mt-5">

            {product.images.map((img, index) => (

              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`rounded-xl overflow-hidden border-2 ${
                  selectedImage === img
                    ? 'border-yellow-700'
                    : 'border-gray-200'
                }`}
              >
                <img
                  src={img}
                  className="w-24 h-24 object-cover"
                  alt=""
                />
              </button>

            ))}

          </div>

        </div>

        {/* Details */}

        <div>

          <span
            className="inline-block px-4 py-2 rounded-full text-black font-medium"
            style={{
              background: 'rgba(201,162,39,.4)'
            }}
          >
            {product.category}
          </span>

          <h1 className="text-5xl font-bold mt-6">
            {product.name}
          </h1>

          <p className="mt-3 text-yellow-600 font-semibold">
            ⭐ {product.rating} / 5
          </p>

          <div className="flex items-center gap-4 mt-8">

            <span className="text-5xl font-bold">
              ${product.price}
            </span>

            <span className="text-2xl text-gray-400 line-through">
              ${product.mrp}
            </span>

          </div>

          <p className="mt-3 text-green-600 font-semibold">
            You Save ${product.mrp - product.price}
          </p>

          <p className="mt-8 text-gray-600 leading-8">
            {product.description}
          </p>

          {/* Quantity */}

          <div className="flex items-center gap-5 mt-10">

            <button
              onClick={() =>
                setQty((q) => Math.max(1, q - 1))
              }
              className="w-12 h-12 rounded-xl border"
            >
              -
            </button>

            <span className="text-2xl font-semibold">
              {qty}
            </span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-12 h-12 rounded-xl border"
            >
              +
            </button>

          </div>

          {/* WhatsApp */}

          <a
            href={`https://wa.me/YOURNUMBER?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            className="mt-10 w-full h-14 rounded-xl flex items-center justify-center text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition"
          >
            WhatsApp Enquiry
          </a>

        </div>

      </div>

      {/* Related Products */}

      <div className="mt-24">

        <h2 className="text-3xl font-bold mb-10">
          You May Also Like
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {relatedProducts.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow overflow-hidden"
            >

              <img
                src={item.image}
                className="w-full h-72 object-cover"
                alt={item.name}
              />

              <div className="p-6">

                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>

                <p className="mt-3 text-2xl font-bold">
                  ${item.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}