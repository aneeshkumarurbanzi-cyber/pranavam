'use client'

import { useState } from 'react'

interface Props {
  image: string
  name: string
}

export default function ProductGallery({ image, name }: Props) {
  const images = [image, image]

  const [selected, setSelected] = useState(image)

  return (
    <div className="grid grid-cols-[90px_1fr] gap-5">

      {/* Thumbnails */}

      <div className="space-y-4">

        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelected(img)}
            className={`overflow-hidden rounded-xl border-2 transition ${
              selected === img
                ? "border-yellow-700"
                : "border-gray-200 hover:border-yellow-500"
            }`}
          >
            <img
              src={img}
              alt={`${name} ${index + 1}`}
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}

      </div>

      {/* Main Image */}

      <div className="bg-white rounded-3xl border border-gray-200 p-6 flex items-center justify-center">

        <img
          src={selected}
          alt={name}
          className="w-full max-h-[550px] object-contain transition duration-300"
        />

      </div>

    </div>
  )
}