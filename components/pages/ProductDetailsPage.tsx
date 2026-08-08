'use client'
import Link from 'next/link';
import { useState } from 'react'
import { products } from '@/lib/products'

interface Props {
  slug: string
  lang: 'en' | 'ru'
}

export default function ProductDetailsPage({
  slug,
  lang,
}: Props) {
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-32 text-center">
        <h2 className="text-3xl font-bold">
          {lang === 'en'
            ? 'Product Not Found'
            : 'Товар не найден'}
        </h2>
      </div>
    )
  }

  const currentLang = lang === 'ru' ? 'ru' : 'en'

  const productName =
    typeof product.name === 'string'
      ? product.name
      : product.name?.[currentLang] ?? product.name?.en ?? ''

  const productCategory =
    typeof product.category === 'string'
      ? product.category
      : product.category?.[currentLang] ??
        product.category?.en ??
        ''

  const productDescription =
    typeof product.description === 'string'
      ? product.description
      : product.description?.[currentLang] ??
        product.description?.en ??
        ''

  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  )

  const [qty, setQty] = useState(1)

  const relatedProducts = products.filter(
    (item) => item.slug !== product.slug
  )

  const whatsappMessage =
    lang === 'en'
      ? `Hello,

I am interested in this product.

Product : ${productName}

Price : ₹${product.price}

Quantity : ${qty}

Please share more details.`
      : `Здравствуйте,

Меня интересует этот товар.

Товар : ${productName}

Цена : ₹${product.price}

Количество : ${qty}

Пожалуйста, пришлите подробности.`

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Breadcrumb */}

      <p className="text-gray-500 mb-8">
        {lang === 'en'
          ? `Home / Products / ${productName}`
          : `Главная / Товары / ${productName}`}
      </p>

      <div className="grid lg:grid-cols-2 gap-16">

        {/* Images */}

        <div>

          <div className="bg-white rounded-3xl shadow overflow-hidden">

            <img
              src={selectedImage}
              alt={productName}
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
              background: 'rgba(201,162,39,.4)',
            }}
          >
            {productCategory}
          </span>

          <h1 className="text-5xl font-bold mt-6">
            {productName}
          </h1>

          <p className="mt-3 text-yellow-600 font-semibold">
            ⭐ {product.rating} / 5
          </p>

          <div className="flex items-center gap-4 mt-8">

            
          </div>

         

          <p className="mt-8 text-gray-600 leading-8">
            {productDescription}
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

          {/* WhatsApp Button */}

          <a
            href={`https://wa.me/YOURNUMBER?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 w-full h-14 rounded-xl flex items-center justify-center text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition"
          >
            {lang === 'en'
              ? 'WhatsApp Enquiry'
              : 'Заказать через WhatsApp'}
          </a>

        </div>

      </div>

      {/* Related Products */}

      <div className="mt-24">

        <h2 className="text-3xl font-bold mb-10">
          {lang === 'en'
            ? 'You May Also Like'
            : 'Похожие товары'}
        </h2>

        <div className="grid md:grid-cols-3 gap-8"></div>
                  {relatedProducts.map((item) => {

            const itemName =
              typeof item.name === 'string'
                ? item.name
                : item.name?.[currentLang] ?? item.name?.en ?? ''

            const itemCategory =
              typeof item.category === 'string'
                ? item.category
                : item.category?.[currentLang] ??
                  item.category?.en ??
                  ''

            return (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow overflow-hidden hover:shadow-xl transition"
              >

                <img
                  src={item.image}
                  className="w-full h-72 object-cover"
                  alt={itemName}
                />

                <div className="p-6">

                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                    style={{
                      background: 'rgba(201,162,39,.25)',
                    }}
                  >
                    {itemCategory}
                  </span>

                  <h3 className="text-xl font-semibold">
                    {itemName}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">

                    

                  </div>

                 <Link href={`/products/${item.slug}`}>
  <button
    className="w-full h-12 mt-6 rounded-xl font-semibold text-black hover:opacity-90 transition"
    style={{
      background: 'rgba(201,162,39,.4)',
    }}
  >
    {lang === 'en'
      ? 'View Product'
      : 'Подробнее'}
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
