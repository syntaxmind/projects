"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductByHandle } from "../../../lib/medusa";
import { getProductImage, getProductPrice } from "../../../lib/products";

export default function ProductDetailPage() {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";

    if (!handle) return;

    getProductByHandle(handle)
      .then((p) => {
        if (!p) throw new Error("المنتج غير موجود");
        setProduct(p);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [handle]);

  const image = product ? getProductImage(product) : null;
  const price = product ? getProductPrice(product) : null;
  const waText = encodeURIComponent(
    `السلام عليكم، أبي أستفسر عن: ${product?.title || ""}`
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

            {loading && <p className="shop-status">جاري التحميل...</p>}
            {error && <p className="shop-status shop-error">{error}</p>}

            {product && (
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
                  {price?.formatted && (
                    <div className="prod-price-big lat">{price.formatted}</div>
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
            )}
          </div>
        </section>
      </main>
    </>
  );
}
