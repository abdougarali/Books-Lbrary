"use client";

import { useEffect } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

/**
 * Google Analytics Component (GA4)
 * لتتبع الزوار والأحداث في الصفحة
 * 
 * كيفية الحصول على Measurement ID:
 * 1. اذهب إلى Google Analytics: https://analytics.google.com
 * 2. سجل الدخول بحساب Google
 * 3. أنشئ Property جديد (إذا لم يكن لديك)
 * 4. اختر "Web" كمنصة
 * 5. أدخل اسم الموقع (مثل: "مكتبة بشر")
 * 6. انسخ Measurement ID (مثل: G-XXXXXXXXXX)
 * 7. أضف Measurement ID في ملف .env.local كالتالي:
 *    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // استخدام Measurement ID من Environment Variable إذا لم يتم تمريره
  const gaMeasurementId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!gaMeasurementId) {
      console.warn("Google Analytics Measurement ID غير موجود. أضف NEXT_PUBLIC_GA_MEASUREMENT_ID في .env.local");
      return;
    }

    // Initialize Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", gaMeasurementId, {
        page_path: window.location.pathname,
      });
    }
  }, [gaMeasurementId]);

  if (!gaMeasurementId) {
    return null; // لا تعرض أي شيء إذا لم يكن هناك Measurement ID
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Helper function to track custom events in Google Analytics
 * يمكن استخدامها في أي مكان في الكود لتتبع الأحداث
 * 
 * أمثلة:
 * - trackGAEvent('whatsapp_click', { book_title: 'Book Title', book_price: 45.9 })
 * - trackGAEvent('book_view', { book_title: 'Book Title' })
 * - trackGAEvent('contact_button_click')
 */
export function trackGAEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
}


