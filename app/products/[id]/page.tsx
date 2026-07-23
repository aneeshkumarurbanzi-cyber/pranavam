import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductGallery from "@/components/products/ProductGallery";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* Breadcrumb */}

     

      {/* Back Button */}

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-10 text-black font-medium hover:text-yellow-700 transition"
      >
        <ArrowLeft size={20} />
        Back to Products
      </Link>

      {/* Product Section */}

      <div className="grid lg:grid-cols-2 gap-16">

        {/* Gallery */}

        <ProductGallery
          image={product.image}
          name={product.name}
        />

        {/* Product Details */}

        <div className="flex flex-col justify-center">

          <span
            className="inline-block w-fit px-4 py-1 rounded-full text-sm font-medium"
            style={{
              background: "rgba(201,162,39,.25)",
            }}
          >
            {product.category}
          </span>

          <h1 className="text-5xl font-bold mt-5">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-5">

            <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
              ★ 4.8
            </span>

            <span className="text-gray-500">
              186 Ratings
            </span>

          </div>

          <div className="flex items-center gap-5 mt-8 flex-wrap">

            <span className="text-5xl font-bold">
              ${product.price.toFixed(2)}
            </span>

            <span className="text-3xl line-through text-gray-400">
              ${product.mrp.toFixed(2)}
            </span>

            <span className="text-green-600 font-semibold">
              Save ${(product.mrp - product.price).toFixed(2)}
            </span>

          </div>

          <p className="mt-8 text-gray-600 leading-8">
            {product.description}
          </p>

          <div className="space-y-3 mt-10">

            <p>✅ In Stock</p>

            <p>🚚 Worldwide Shipping</p>

            <p>🔒 Secure Payment</p>

          </div>

          <a
            href={`https://t.me/YOUR_TELEGRAM_USERNAME?text=${encodeURIComponent(
              `Hi, I am interested in ${product.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 h-14 rounded-xl flex items-center justify-center font-semibold text-black hover:opacity-90 transition"
            style={{
              background: "rgba(201,162,39,.4)",
            }}
          >
            Order Now
          </a>

        </div>

      </div>

      {/* Related Products */}

      <div className="mt-24">

        <h2 className="text-3xl font-bold mb-10">
          Related Products
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {relatedProducts.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow hover:shadow-xl transition"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="font-semibold text-xl">
                  {item.name}
                </h3>

                <div className="flex items-center gap-3 mt-4">

                  <span className="text-2xl font-bold">
                    ${item.price.toFixed(2)}
                  </span>

                  <span className="text-gray-400 line-through">
                    ${item.mrp.toFixed(2)}
                  </span>

                </div>

                <Link href={`/products/${item.id}`}>

                  <button
                    className="w-full h-12 mt-6 rounded-xl font-semibold text-black hover:opacity-90 transition"
                    style={{
                      background: "rgba(201,162,39,.4)",
                    }}
                  >
                    View Product
                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}