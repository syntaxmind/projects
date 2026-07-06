"use client";

import { useState, useEffect } from 'react';
import Script from 'next/script';
import * as THREE from 'three';

const T = {
    'nav.shop':{ar:'الأقصى لزينة السيارات',en:'Al-Aqsa Auto Accessories'},
    'nav.about':{ar:'المحل',en:'The Shop'},
    'nav.services':{ar:'خدماتنا',en:'Services'},
    'nav.work':{ar:'أعمالنا',en:'Work'},
    'nav.contact':{ar:'تواصل',en:'Contact'},
    'nav.wa':{ar:'واتساب',en:'WhatsApp'},
    'hero.name':{ar:'الأقصى لزينة السيارات - فلاتر رياضي',en:'Al-Aqsa Auto Accessories - Sport Filters'},
    'hero.h1':{ar:'خلّي سيارتك<br><span class="r">تتنفّس.</span>',en:'Let your car<br><span class="r">breathe.</span>'},
    'hero.sub':{ar:'فلاتر رياضية، انتيكات هواء، عوادم، مكابح وزينة - تركيب داخل ورشتنا في حي الأمل.',en:'Sport filters, air intakes, exhausts, brakes and styling - fitted in-house in Al Amal, Riyadh.'},
    'hero.btnwa':{ar:'راسلنا واتساب',en:'Message us'},
    'hero.btndir':{ar:'الاتجاهات',en:'Directions'},
    'hero.hint':{ar:'اسحب للتدوير · DRAG',en:'DRAG TO SPIN'},
    'hero.chip':{ar:'تدفّق هواء أعلى',en:'more airflow'},
    'about.cap':{ar:'المحل · حي الأمل',en:'The shop · Al Amal'},
    'about.tag':{ar:'المحل',en:'The Shop'},
    'about.h2':{ar:'ورشة رياض تتعامل مع كل سيارة كأنها سيارتها.',en:'A Riyadh garage that treats every car like its own.'},
    'about.p':{ar:'من فلتر رياضي بسيط إلى تجهيز كامل للمحرك، عوادم، مكابح وزينة - كل شي يتركّب ويُجرّب عندنا، ويُشرح لك بوضوح، ويخلص بنفس الزيارة. محل يجي له الناس من كل الرياض.',en:'From a simple sport filter to a full engine setup, exhausts, brakes and styling - everything is fitted and tested here, explained plainly, and done the same visit. The kind of shop people drive across Riyadh for.'},
    'about.quote':{ar:'«تعامل راقٍ من أبو ذياب، ومحلّ شامل لأغلب الاحتياجات.»<cite>عميل - تقييم قوقل</cite>',en:'“Classy service from Abu Dhiyab, and a shop that covers most of what you need.”<cite>Google review</cite>'},
    'svc.tag':{ar:'خدماتنا',en:'Services'},
    'svc.h2':{ar:'كل شي لسيارتك، تحت سقف واحد.',en:'Everything for your car, under one roof.'},
    'svc.1':{ar:'<h3>فلاتر رياضية</h3><p>تنفّس أعمق وعزم أوضح - فلتر يتغسل ويرجع جديد.</p>',en:'<h3>Sport air filters</h3><p>Deeper breathing and sharper response - a filter you clean and reuse.</p>'},
    'svc.2':{ar:'<h3>انتيكات وصناديق هواء</h3><p>هواء أبرد وأنظف يوصل للمحرك، استجابة أسرع.</p>',en:'<h3>Cold-air intakes &amp; boxes</h3><p>Cooler, cleaner air to the engine for quicker response.</p>'},
    'svc.3':{ar:'<h3>عوادم ومخارج</h3><p>صوت وأداء على ذوقك - مَجنافلو، بورلا، aFe.</p>',en:'<h3>Exhausts &amp; tips</h3><p>Sound and performance your way - MagnaFlow, Borla, aFe.</p>'},
    'svc.4':{ar:'<h3>مكابح وتعليق</h3><p>بريمبو وآيباخ - توقّف أقوى وثبات أعلى.</p>',en:'<h3>Brakes &amp; suspension</h3><p>Brembo and Eibach - stronger stops, better stance.</p>'},
    'svc.5':{ar:'<h3>إضاءة وزينة خارجية</h3><p>تفاصيل تخلّي سيارتك تتميّز، ليل ونهار.</p>',en:'<h3>Lighting &amp; styling</h3><p>Details that make your car stand out, day or night.</p>'},
    'svc.6':{ar:'<h3>تركيب داخل الورشة</h3><p>كل قطعة تتركّب وتُفحص وترجعها جاهزة للسواقة.</p>',en:'<h3>In-house installation</h3><p>Every part fitted, checked, and handed back ready to drive.</p>'},
    'work.tag':{ar:'أعمالنا',en:'Our Work'},
    'work.h2':{ar:'من داخل المحل.',en:'Straight from the shop floor.'},
    'work.note':{ar:'صور وأعمال أكثر على <a href="https://www.instagram.com/alaqsa.t1" target="_blank" rel="noopener">انستقرام @alaqsa.t1</a>.',en:'More photos and reels on <a href="https://www.instagram.com/alaqsa.t1" target="_blank" rel="noopener">Instagram @alaqsa.t1</a>.'},
    'g.1':{ar:'قطع تعديل وأداء',en:'Performance parts'},
    'g.2':{ar:'عوادم ومخارج',en:'Exhausts & tips'},
    'g.3':{ar:'مخزون شامل',en:'Full inventory'},
    'says.tag':{ar:'آراء العملاء',en:'Reviews'},
    'says.bigq':{ar:'«من أول ما دخلت، تعامل واضح وأسعار <span class="r">صريحة بدون مفاجآت</span>.»<cite>★★★★★ - تقييم قوقل</cite>',en:'“From the moment I walked in - clear service and <span class="r">honest pricing, no surprises</span>.”<cite>★★★★★ - Google review</cite>'},
    'says.q1':{ar:'«أسعار وخدمة ممتازة، غيّروا الفلتر وما قصّروا، وثبّتوا لي صندوق الهواء.»<cite><span class="stars">★★★★★</span> قوقل</cite>',en:'“Great prices and service - changed my filter and fitted the air box too.”<cite><span class="stars">★★★★★</span> Google</cite>'},
    'says.q2':{ar:'«جيت من بريدة، أبو ذياب صبور ومحترم، وركّب لي الفلتر والانتيك.»<cite><span class="stars">★★★★★</span> قوقل</cite>',en:'“Drove from Buraidah - Abu Dhiyab was patient and kind, fitted my filter and intake.”<cite><span class="stars">★★★★★</span> Google</cite>'},
    'contact.tag':{ar:'تواصل',en:'Contact'},
    'contact.h2':{ar:'تعال نخلّي سيارتك تتنفّس صح.',en:'Let\u2019s get your car breathing right.'},
    'contact.p':{ar:'راسلنا واتساب وقل لنا سيارتك وش تبي، أو عدّ علينا في المحل.',en:'Message us on WhatsApp with your car and what you want, or just drop by.'},
    'c.loc.k':{ar:'الموقع',en:'Location'},
    'c.loc.v':{ar:'٢٨٨٢ ابن الأنباري، حي الأمل، الرياض',en:'2882 Ibn Al Anbari, Al Amal, Riyadh'},
    'c.call.k':{ar:'اتصال',en:'Call'},
    'c.ig.k':{ar:'انستقرام',en:'Instagram'},
    'c.snap.k':{ar:'سناب شات',en:'Snapchat'},
    'c.hours.k':{ar:'الدوام',en:'Hours'},
    'c.hours.v':{ar:'السبت-الخميس ٩-١ و ٤-١٠ · الجمعة ٤-١٠ مساءً',en:'Sat-Thu 9-1 & 4-10 · Fri 4-10 PM'},
    'cta.h2':{ar:'الأقصى لزينة السيارات',en:'Al-Aqsa Auto Accessories'},
    'cta.p':{ar:'سيارتك تستاهل تشتغل وتبان مثل ما تتمنّى. قل لنا وش تسوق، نقول لك وش ممكن.',en:'Your car deserves to run and look the way you want. Tell us what you drive, we\u2019ll tell you what\u2019s possible.'},
    'cta.btn1':{ar:'ابدأ المحادثة',en:'Start a chat'},
    'cta.btn2':{ar:'زورنا في المحل',en:'Visit the shop'},
    'footer.badge':{ar:'معاينة · موقع تجريبي',en:'Preview · demo site'},
    'footer.note':{ar:'معاينة لموقع الأقصى لزينة السيارات بصور المحل الفعلية. الأرقام والحسابات والدوام للتأكيد قبل الإطلاق.',en:'Preview for Al-Aqsa Auto Accessories, built with the shop\u2019s own photos. Numbers, accounts and hours to be confirmed before launch.'}
  };

import { medusaClient } from '../lib/medusa';

export default function Home() {
  const [lang, setLang] = useState('ar');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from Medusa Backend
    medusaClient.products.list()
      .then(({ products }) => {
        setProducts(products);
        console.log("Fetched Medusa Products:", products);
      })
      .catch((err) => {
        console.error("Medusa fetch error:", err);
      });
  }, []);

  const toggleLang = () => {
    setLang(l => (l === 'ar' ? 'en' : 'ar'));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'en') {
      document.documentElement.classList.add('en');
    } else {
      document.documentElement.classList.remove('en');
    }
  }, [lang]);

  useEffect(() => {
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if (nav) nav.classList.toggle('on', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: .12 });
    
    document.querySelectorAll('.rv').forEach((el) => {
      io.observe(el);
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rpm = document.getElementById('rpm');
    if (reduce) {
      if (rpm) rpm.textContent = '+18%';
    } else {
      setTimeout(() => {
        let v = 0;
        const t = setInterval(() => {
          v += 0.6;
          if (v >= 18) {
            v = 18;
            clearInterval(t);
          }
          if (rpm) rpm.textContent = '+' + v.toFixed(0) + '%';
        }, 26);
      }, 600);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    let animationFrameId;
    var host=document.getElementById('filter3d');
    if(!host || host.querySelector('canvas')) return;
        
    var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W=host.clientWidth||760,H=host.clientHeight||420;
    var renderer;
    try{ renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); }catch(e){ return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); renderer.setSize(W,H);
    renderer.domElement.style.zIndex='1';
    host.appendChild(renderer.domElement);
    var fb=host.querySelector('.stage-fallback'); if(fb) fb.style.display='none';
    var scene=new THREE.Scene();
    var camera=new THREE.PerspectiveCamera(36,W/H,0.1,100); camera.position.set(0,0.2,6.6);
    function pleated(rTop,rBot,h,pl,amp){
      var segs=pl*4,rings=26,pos=[],idx=[],i,j;
      for(i=0;i<=rings;i++){var v=i/rings,y=h*(v-0.5),r=rBot+(rTop-rBot)*v;
        for(j=0;j<=segs;j++){var t=j/segs*Math.PI*2,fr=(t/(2*Math.PI))*pl,tri=Math.abs((fr-Math.floor(fr))*2-1),rr=r+amp*(tri-0.5)*2; pos.push(Math.cos(t)*rr,y,Math.sin(t)*rr);} }
      var row=segs+1;
      for(i=0;i<rings;i++)for(j=0;j<segs;j++){var a=i*row+j,b=a+1,c=a+row,d=c+1; idx.push(a,c,b,b,c,d);}
      var g=new THREE.BufferGeometry(); g.setIndex(idx); g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3)); g.computeVertexNormals(); return g;
    }
    var f=new THREE.Group();
    f.add(new THREE.Mesh(pleated(1.12,1.34,2.45,54,0.075), new THREE.MeshStandardMaterial({color:0xc23a2e,roughness:.82,metalness:.08,flatShading:true})));
    var chrome=new THREE.MeshStandardMaterial({color:0xe2e8ef,roughness:.16,metalness:1});
    var tc=new THREE.Mesh(new THREE.CylinderGeometry(1.16,1.16,0.2,48),chrome); tc.position.y=1.3; f.add(tc);
    var lg=new THREE.Mesh(new THREE.CylinderGeometry(0.46,0.46,0.22,40),new THREE.MeshStandardMaterial({color:0x141414,roughness:.45,metalness:.7})); lg.position.y=1.41; f.add(lg);
    var bc=new THREE.Mesh(new THREE.CylinderGeometry(1.36,1.36,0.18,48),chrome); bc.position.y=-1.3; f.add(bc);
    var nk=new THREE.Mesh(new THREE.CylinderGeometry(0.92,1.0,0.55,40,1,true),chrome); nk.position.y=-1.6; f.add(nk);
    scene.add(f);
    scene.add(new THREE.AmbientLight(0x3a3a3a,1.0));
    var key=new THREE.DirectionalLight(0xffffff,2.1); key.position.set(4,6,6); scene.add(key);
    var warm=new THREE.PointLight(0xc23a2e,2.0,40); warm.position.set(-5,1,4); scene.add(warm);
    var fill=new THREE.PointLight(0xffffff,0.9,40); fill.position.set(4,-2,5); scene.add(fill);
    var tRY=0,tRX=0,cRY=0,cRX=0,drag=false,lx=0,ly=0,auto=!reduce;
    host.style.cursor='grab';
    host.addEventListener('pointerdown',function(e){drag=true;auto=false;lx=e.clientX;ly=e.clientY;host.style.cursor='grabbing';});
    window.addEventListener('pointerup',function(){drag=false;host.style.cursor='grab';});
    window.addEventListener('pointermove',function(e){ if(!drag)return; tRY+=(e.clientX-lx)*0.01; tRX+=(e.clientY-ly)*0.01; tRX=Math.max(-0.5,Math.min(0.6,tRX)); lx=e.clientX; ly=e.clientY; });
    window.addEventListener('resize',function(){ var w=host.clientWidth,h=host.clientHeight; if(!w||!h)return; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); });
    function loop(){ animationFrameId = requestAnimationFrame(loop); if(auto) tRY+=0.006; cRY+=(tRY-cRY)*0.08; cRX+=(tRX-cRX)*0.08; f.rotation.y=cRY; f.rotation.x=0.12+cRX; renderer.render(scene,camera); }
    loop();

    return () => {
      if (renderer) renderer.dispose();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const t = (key) => T[key] ? T[key][lang] : key;

  return (
    <>
      {/* NAV */}
<header className="nav" id="nav">
  <div className="wrap nav-in">
    <a className="brand" href="#top"  dangerouslySetInnerHTML={{ __html: t("nav.shop") }}></a>
    <div className="nav-right">
      <nav className="nav-links">
        <a href="#about"  dangerouslySetInnerHTML={{ __html: t("nav.about") }}></a>
        <a href="#services"  dangerouslySetInnerHTML={{ __html: t("nav.services") }}></a>
        <a href="#work"  dangerouslySetInnerHTML={{ __html: t("nav.work") }}></a>
        <a href="#contact"  dangerouslySetInnerHTML={{ __html: t("nav.contact") }}></a>
        <a href="https://wa.me/966556766564?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85" target="_blank" rel="noopener" className="nav-wa"  dangerouslySetInnerHTML={{ __html: t("nav.wa") }}></a>
      </nav>
      <button className="lang-btn" id="langBtn" onClick={toggleLang}>EN</button>
      <button className="burger" aria-label="القائمة" onClick={() => document.getElementById('contact').scrollIntoView()}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
      </button>
    </div>
  </div>
</header>

{/* HERO */}
<section className="hero" id="top">
  <div className="hero-top">
    <div className="hero-name"  dangerouslySetInnerHTML={{ __html: t("hero.name") }}></div>
    <h1  dangerouslySetInnerHTML={{ __html: t("hero.h1") }}></h1>
  </div>

  <div className="stage" id="filter3d">
    <img className="stage-fallback" src="/filter3d.jpg" alt="فلتر رياضي" />
    <span className="spinhint"  dangerouslySetInnerHTML={{ __html: t("hero.hint") }}></span>
    <div className="chip"><div className="n" id="rpm">+0%</div><div className="l"  dangerouslySetInnerHTML={{ __html: t("hero.chip") }}></div></div>
  </div>
  <div className="vig"></div>

  <div className="hero-bottom">
    <p className="sub"  dangerouslySetInnerHTML={{ __html: t("hero.sub") }}></p>
    <div className="ctas">
      <a className="btn btn-red" href="https://wa.me/966556766564?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D9%88%D8%AF%D9%8A%20%D8%A3%D8%B9%D8%AF%D9%84%20%D8%B3%D9%8A%D8%A7%D8%B1%D8%AA%D9%8A" target="_blank" rel="noopener"  dangerouslySetInnerHTML={{ __html: t("hero.btnwa") }}></a>
      <a className="btn btn-line" href="https://maps.app.goo.gl/PsUGUe6vKSFrv2uh7" target="_blank" rel="noopener"  dangerouslySetInnerHTML={{ __html: t("hero.btndir") }}></a>
    </div>
  </div>
</section>

{/* TICKER */}
<div className="ticker" aria-label="brands">
  <div className="track">
    <span className="it">K&amp;N</span><span className="it">BBK</span><span className="it">Spectre</span><span className="it">Brembo</span><span className="it">aFe</span><span className="it">MagnaFlow</span><span className="it">Borla</span><span className="it">Eibach</span>
    <span className="it">K&amp;N</span><span className="it">BBK</span><span className="it">Spectre</span><span className="it">Brembo</span><span className="it">aFe</span><span className="it">MagnaFlow</span><span className="it">Borla</span><span className="it">Eibach</span>
  </div>
</div>

{/* ABOUT */}
<section className="band" id="about" style={{background: "var(--bg)"}}>
  <div className="wrap about-grid">
    <div className="about-photo rv">
      <img src="/img1.jpeg" alt="المحل ليلاً" />
      <div className="cap"  dangerouslySetInnerHTML={{ __html: t("about.cap") }}></div>
    </div>
    <div className="about-body rv">
      <span className="tag ar"  dangerouslySetInnerHTML={{ __html: t("about.tag") }}></span>
      <h2  dangerouslySetInnerHTML={{ __html: t("about.h2") }}></h2>
      <p  dangerouslySetInnerHTML={{ __html: t("about.p") }}></p>
      <blockquote className="pullquote"  dangerouslySetInnerHTML={{ __html: t("about.quote") }}></blockquote>
    </div>
  </div>
</section>

{/* SERVICES */}
<section className="menu band" id="services">
  <div className="wrap">
    <div className="band-head rv">
      <span className="tag ar"  dangerouslySetInnerHTML={{ __html: t("svc.tag") }}></span>
      <h2  dangerouslySetInnerHTML={{ __html: t("svc.h2") }}></h2>
    </div>
    <div>
      <a className="svc rv" href="#contact"><span className="k lat">01</span><div className="svc-b"  dangerouslySetInnerHTML={{ __html: t("svc.1") }}></div><span className="go">↖</span></a>
      <a className="svc rv" href="#contact"><span className="k lat">02</span><div className="svc-b"  dangerouslySetInnerHTML={{ __html: t("svc.2") }}></div><span className="go">↖</span></a>
      <a className="svc rv" href="#contact"><span className="k lat">03</span><div className="svc-b"  dangerouslySetInnerHTML={{ __html: t("svc.3") }}></div><span className="go">↖</span></a>
      <a className="svc rv" href="#contact"><span className="k lat">04</span><div className="svc-b"  dangerouslySetInnerHTML={{ __html: t("svc.4") }}></div><span className="go">↖</span></a>
      <a className="svc rv" href="#contact"><span className="k lat">05</span><div className="svc-b"  dangerouslySetInnerHTML={{ __html: t("svc.5") }}></div><span className="go">↖</span></a>
      <a className="svc rv" href="#contact"><span className="k lat">06</span><div className="svc-b"  dangerouslySetInnerHTML={{ __html: t("svc.6") }}></div><span className="go">↖</span></a>
    </div>
  </div>
</section>

{/* GALLERY */}
<section className="band" id="work" style={{background: "var(--bg)"}}>
  <div className="wrap">
    <div className="band-head rv">
      <span className="tag ar"  dangerouslySetInnerHTML={{ __html: t("work.tag") }}></span>
      <h2  dangerouslySetInnerHTML={{ __html: t("work.h2") }}></h2>
    </div>
    <div className="gal">
      <figure className="gtile big rv"><img src="/img2.jpeg" alt="قطع التعديل" /><figcaption  dangerouslySetInnerHTML={{ __html: t("g.1") }}></figcaption></figure>
      <figure className="gtile rv"><img src="/img3.jpeg" alt="عوادم" /><figcaption  dangerouslySetInnerHTML={{ __html: t("g.2") }}></figcaption></figure>
      <figure className="gtile rv"><img src="/img4.jpeg" alt="مخزون" /><figcaption  dangerouslySetInnerHTML={{ __html: t("g.3") }}></figcaption></figure>
    </div>
    <p className="gal-note"  dangerouslySetInnerHTML={{ __html: t("work.note") }}></p>
  </div>
</section>

{/* SAYS */}
<section className="band" style={{background: "var(--bg)"}}>
  <div className="wrap">
    <span className="tag ar rv"  dangerouslySetInnerHTML={{ __html: t("says.tag") }}></span>
    <blockquote className="big-q rv"  dangerouslySetInnerHTML={{ __html: t("says.bigq") }}></blockquote>
    <div className="q-row">
      <blockquote className="rv"  dangerouslySetInnerHTML={{ __html: t("says.q1") }}></blockquote>
      <blockquote className="rv"  dangerouslySetInnerHTML={{ __html: t("says.q2") }}></blockquote>
    </div>
  </div>
</section>

{/* CONTACT */}
<section className="contact band" id="contact">
  <div className="wrap">
    <div className="band-head rv">
      <span className="tag ar"  dangerouslySetInnerHTML={{ __html: t("contact.tag") }}></span>
      <h2  dangerouslySetInnerHTML={{ __html: t("contact.h2") }}></h2>
      <p  dangerouslySetInnerHTML={{ __html: t("contact.p") }}></p>
    </div>
    <div className="contact-grid">
      <div className="c-list">
        <a className="c-row rv" href="https://maps.app.goo.gl/PsUGUe6vKSFrv2uh7" target="_blank" rel="noopener">
          <span className="ico"><svg viewBox="0 0 24 24"><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
          <span><span className="k"  dangerouslySetInnerHTML={{ __html: t("c.loc.k") }}></span><span className="v"  dangerouslySetInnerHTML={{ __html: t("c.loc.v") }}></span></span><span className="go">↖</span>
        </a>
        <a className="c-row rv" href="tel:+966556766564">
          <span className="ico"><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg></span>
          <span><span className="k"  dangerouslySetInnerHTML={{ __html: t("c.call.k") }}></span><span className="v lat">+966 55 676 6564</span></span><span className="go">↖</span>
        </a>
        <a className="c-row rv" href="https://www.instagram.com/alaqsa.t1" target="_blank" rel="noopener">
          <span className="ico"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></span>
          <span><span className="k"  dangerouslySetInnerHTML={{ __html: t("c.ig.k") }}></span><span className="v lat">@alaqsa.t1</span></span><span className="go">↖</span>
        </a>
        <a className="c-row rv" href="https://www.snapchat.com/add/allaqsa11" target="_blank" rel="noopener">
          <span className="ico"><svg viewBox="0 0 24 24"><path d="M12 2.6c-3.5 0-5.4 2.6-5.4 5.5 0 1.2-.4 1.7-1.3 2-.6.2-1.1.4-1.1 1 0 .5.8.8 1.7 1-.3.7-1.1 1.5-2 1.8-.4.2-.5.6-.3 1 .3.5 1.4.6 2 .6.1.6 0 1.2.6 1.3.6.1 1.3-.4 2.1-.4.9 0 1.4.8 2.7.8s1.8-.8 2.7-.8c.8 0 1.5.5 2.1.4.6-.1.5-.7.6-1.3.6 0 1.7-.1 2-.6.2-.4.1-.8-.3-1-.9-.3-1.7-1.1-2-1.8.9-.2 1.7-.5 1.7-1 0-.6-.5-.8-1.1-1-.9-.3-1.3-.8-1.3-2 0-2.9-1.9-5.5-5.4-5.5Z"/></svg></span>
          <span><span className="k"  dangerouslySetInnerHTML={{ __html: t("c.snap.k") }}></span><span className="v lat">allaqsa11</span></span><span className="go">↖</span>
        </a>
        <div className="c-row rv">
          <span className="ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
          <span><span className="k"  dangerouslySetInnerHTML={{ __html: t("c.hours.k") }}></span><span className="v"  dangerouslySetInnerHTML={{ __html: t("c.hours.v") }}></span></span>
        </div>
      </div>
      <div className="map rv">
        <iframe title="الموقع" loading="lazy" src="https://maps.google.com/maps?q=24.6476684,46.7238895&z=16&output=embed"></iframe>
      </div>
    </div>

    <div className="cta-final rv">
      <h2  dangerouslySetInnerHTML={{ __html: t("cta.h2") }}></h2>
      <p  dangerouslySetInnerHTML={{ __html: t("cta.p") }}></p>
      <div className="ctas">
        <a className="btn btn-red" href="https://wa.me/966556766564?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85" target="_blank" rel="noopener"  dangerouslySetInnerHTML={{ __html: t("cta.btn1") }}></a>
        <a className="btn btn-line" href="https://maps.app.goo.gl/PsUGUe6vKSFrv2uh7" target="_blank" rel="noopener"  dangerouslySetInnerHTML={{ __html: t("cta.btn2") }}></a>
      </div>
    </div>
  </div>
</section>

<footer>
  <div className="wrap foot-in">
    <div>
      <div className="brand" style={{marginBottom: "8px"}} dangerouslySetInnerHTML={{ __html: t("nav.shop") }}></div>
      <span className="badge"  dangerouslySetInnerHTML={{ __html: t("footer.badge") }}></span>
    </div>
    <p className="foot-note"  dangerouslySetInnerHTML={{ __html: t("footer.note") }}></p>
  </div>
</footer>


    </>
  );
}
