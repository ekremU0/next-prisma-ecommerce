import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import { incrementProductQuantity } from "@/app/actions/cart-actions";
import { Product } from "@prisma/client";

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

const ProductDetails = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await getProduct(id);
  console.log(product);

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-center w-3/4 mb-48 mt-32 mx-auto">
      <div className="relative w-full h-[400px] flex-1 bg-white rounded-lg">
        <Image
          src={product.imageUrl}
          alt="product"
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      <div className="flex-[2]">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="py-6">{product.description}</p>
        <p className="mb-8 font-bold text-lg">
          Price:{" "}
          <span className="badge badge-neutral p-3 text-lg">
            {product.price}$
          </span>
        </p>
        <AddToCartButton
          productId={id}
          incrementProductQuantity={incrementProductQuantity}
          className={"btn btn-info disabled:bg-current"}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
