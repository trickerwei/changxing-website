/* 長興極限空間 — 網站追蹤碼（Meta Pixel + GA4）
 * Pixel ID: 480170199428429（Chewei Lin的像素）
 * GA4: 到 analytics.google.com 建立資源後，把測量 ID（G-開頭）填入下方 GA4_ID
 */
(function () {
  var PIXEL_ID = '480170199428429';
  var GA4_ID = 'G-G4TYQ74S48';

  /* ===== Meta Pixel 基底碼 ===== */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  /* ===== GA4 ===== */
  if (GA4_ID) {
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA4_ID);
  }

  /* ===== 轉換事件：點 LINE＝Lead、點電話＝Contact ===== */
  function send(fbEvent, gaEvent, label) {
    try { fbq('track', fbEvent, { content_name: label }); } catch (e) {}
    try { if (window.gtag) gtag('event', gaEvent, { link_label: label }); } catch (e) {}
  }
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a');
    if (!a || !a.href) return;
    if (a.href.indexOf('tel:') === 0) {
      send('Contact', 'phone_click', 'phone_0955305205');
    } else if (a.href.indexOf('line.me') !== -1) {
      send('Lead', 'line_click', 'line_official_account');
    }
  }, true);
})();
