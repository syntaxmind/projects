import RevealObserver from "./RevealObserver";

const T = {
  tag: { ar: "عملاؤنا", en: "Reviews" },
  h2:  { ar: "آراء من جاءوا وعادوا", en: "Heard from those who came back." },
};

export default function TestimonialsGrid({ items = [], lang = "ar" }) {
  if (!items.length) return null;

  const t = (key) => T[key][lang] ?? T[key]["ar"];
  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <>
      <RevealObserver />
      <section className="band" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <div className="band-head rv">
            <span className="tag ar">{t("tag")}</span>
            <h2>{t("h2")}</h2>
          </div>
          <div className="testi-grid">
            {items.map((item) => (
              <div key={item.id} className="testi-card rv">
                <div className="testi-top">
                  {item.photo_url ? (
                    <img src={item.photo_url} alt={item.customer_name} className="testi-avatar" />
                  ) : (
                    <div className="testi-avatar testi-initials">
                      {item.customer_name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="testi-name">{item.customer_name}</div>
                    <div className="testi-stars">{stars(item.rating)}</div>
                  </div>
                </div>
                <p className="testi-text">«{item.review_text}»</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
