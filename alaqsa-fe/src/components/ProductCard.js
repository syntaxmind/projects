import Link from "next/link";
import { getProductImage, getProductPrice } from "../lib/products";

export default function ProductCard({ product }) {
  const image = getProductImage(product);
  const price = getProductPrice(product);

  return (
    <Link href={`/products/${product.handle}`} className="prod-card rv">
      <div className="prod-img">
        {image ? (
          <img src={image} alt={product.title} loading="lazy" />
        ) : (
          <div className="prod-placeholder" />
        )}
      </div>
      <div className="prod-body">
        <h3>{product.title}</h3>
        {product.subtitle && <p className="prod-sub">{product.subtitle}</p>}
        {price?.formatted && <span className="prod-price lat">{price.formatted}</span>}
      </div>
    </Link>
  );
}
