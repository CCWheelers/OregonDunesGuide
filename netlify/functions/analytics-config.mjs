const validMeasurementId = (value) => /^G-[A-Z0-9]+$/i.test(value || "");

export default async () => {
  const measurementId = process.env.GA4_MEASUREMENT_ID || "";
  const script = validMeasurementId(measurementId)
    ? `(()=>{const id=${JSON.stringify(measurementId)};const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(id);document.head.appendChild(s);window.gtag("js",new Date());window.gtag("config",id,{send_page_view:true,anonymize_ip:true});})();`
    : `(()=>{window.ODG_ANALYTICS_PENDING=true;})();`;

  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
};

export const config = { path: "/api/analytics-config" };
