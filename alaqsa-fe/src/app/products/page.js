import Link from "next/link";
import { listProducts } from "../../lib/medusa";
import ProductCard from "../../components/ProductCard";
import RevealObserver from "../../components/RevealObserver";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    const result = await listProducts({ limit: 48 });
    products = result.products;
  } catch (err) {
    error = err.message;
  }

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

      <RevealObserver />
      <main className="shop-page">
        <section className="band" style={{ paddingTop: "120px" }}>
          <div className="wrap">
            <div className="band-head">
              <span className="tag ar">المتجر</span>
              <h2>منتجاتنا</h2>
              <p>قطع أداء وزينة — متوفرة للطلب من المحل.</p>
            </div>

            {error && <p className="shop-status shop-error">{error}</p>}
            {!error && products.length === 0 && (
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
