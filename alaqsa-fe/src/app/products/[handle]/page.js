import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandle } from "../../../lib/medusa";
import { getProductImage, getProductPrice } from "../../../lib/products";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const image = getProductImage(product);
  const price = getProductPrice(product);
  const waText = encodeURIComponent(
    `السلام عليكم، أبي أستفسر عن: ${product.title || ""}`
  );

  return (
    <>
      <header className="nav on" id="nav">
        <div className="wrap nav-in">
          <Link className="brand" href="/">
            الأقصى لزينة السيارات
          </Link>
          <div className="nav-right">
            <nav className="nav-links">
              <Link href="/">الرئيسية</Link>
              <Link href="/products">المنتجات</Link>
              <Link href="/#contact">تواصل</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="shop-page">
        <section className="band" style={{ paddingTop: "120px" }}>
          <div className="wrap">
            <Link href="/products" className="back-link">
              ← كل المنتجات
            </Link>

            <div className="prod-detail">
              <div className="prod-detail-img">
                {image ? (
                  <img src={image} alt={product.title} />
                ) : (
                  <div className="prod-placeholder" />
                )}
              </div>
              <div className="prod-detail-body">
                <span className="tag ar">منتج</span>
                <h1>{product.title}</h1>
                {product.subtitle && <p className="prod-sub">{product.subtitle}</p>}
                {price?.formatted ? (
                  <div className="prod-price-big lat">{price.formatted}</div>
                ) : (
                  <div className="prod-price-big">السعر عند الطلب</div>
                )}
                {product.description && (
                  <p className="prod-desc">{product.description}</p>
                )}
                <div className="ctas" style={{ justifyContent: "flex-start", marginTop: "28px" }}>
                  <a
                    className="btn btn-red"
                    href={`https://wa.me/966556766564?text=${waText}`}
                    target="_blank"
                    rel="noopener"
                  >
                    اسأل عن المنتج
                  </a>
                  <Link className="btn btn-line" href="/products">
                    المزيد
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
