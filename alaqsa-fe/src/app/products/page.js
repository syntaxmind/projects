"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listProducts } from "../../lib/medusa";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";

    const nav = document.getElementById("nav");
    const handleScroll = () => {
      if (nav) nav.classList.toggle("on", window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    listProducts({ limit: 24 })
      .then(({ products }) => setProducts(products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              <a
                href="https://wa.me/966556766564"
                target="_blank"
                rel="noopener"
                className="nav-wa"
              >
                واتساب
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="shop-page">
        <section className="band" style={{ paddingTop: "120px" }}>
          <div className="wrap">
            <div className="band-head">
              <span className="tag ar">المتجر</span>
              <h2>منتجاتنا</h2>
              <p>قطع أداء وزينة — أضف منتجات جديدة من لوحة Medusa Admin.</p>
            </div>

            {loading && <p className="shop-status">جاري التحميل...</p>}
            {error && <p className="shop-status shop-error">{error}</p>}
            {!loading && !error && products.length === 0 && (
              <p className="shop-status">لا توجد منتجات بعد.</p>
            )}

            <div className="prod-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot-in">
          <div>
            <div className="brand" style={{ marginBottom: "8px" }}>
              الأقصى لزينة السيارات
            </div>
            <span className="badge">المتجر</span>
          </div>
          <p className="foot-note">منتجات من Medusa — تُدار من لوحة التحكم.</p>
        </div>
      </footer>
    </>
  );
}
