"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Book } from "@/data/books";
import { trackFacebookEvent } from "@/components/FacebookPixel";
import { trackGAEvent } from "@/components/GoogleAnalytics";

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  formatPrice: (price?: number) => string | null;
  formatBookTitle: (title: string) => React.ReactNode;
}

/**
 * Modal لعرض تفاصيل الكتاب
 */
export default function BookDetailsModal({
  book,
  isOpen,
  onClose,
  formatPrice,
  formatBookTitle,
}: BookDetailsModalProps) {
  // إغلاق Modal عند الضغط على زر Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // منع التمرير في الخلفية عند فتح Modal
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const handleWhatsAppOrder = () => {
    // تتبع أحداث Facebook Pixel و Google Analytics
    trackFacebookEvent("InitiateCheckout", {
      content_name: book.title,
      content_category: "Book",
      content_ids: [book.title],
      value: book.price ? book.price / 1000 : undefined,
      currency: "TND",
    });

    trackFacebookEvent("Contact", {
      content_name: book.title,
    });

    trackGAEvent("whatsapp_order_click", {
      book_title: book.title,
      book_author: book.author,
      book_price: book.price ? book.price / 1000 : undefined,
      currency: "TND",
      event_category: "engagement",
      event_label: "Book Order - Modal",
    });

    let message = `السلام عليكم ورحمة الله وبركاته\n\n`;
    message += `أريد طلب الكتاب التالي:\n`;
    message += `📖 ${book.title}\n`;
    message += `✍️ ${book.author}\n`;
    if (book.price) {
      const formattedPrice = formatPrice(book.price);
      message += `💰 ${formattedPrice}\n`;
    }
    message += `\nشكراً لكم`;
    const whatsappUrl = `https://wa.me/+21626010403?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Overlay - الخلفية الداكنة */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto font-cairo"
          onClick={(e) => e.stopPropagation()}
        >
          {/* زر الإغلاق */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="إغلاق"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row">
            {/* صورة الكتاب - الجانب الأيسر */}
            <div className="w-full md:w-2/5 h-80 md:h-auto relative bg-gradient-to-br from-[#e6e2dc] to-[#c6bbae]">
              <Image
                src={book.image}
                alt={`غلاف كتاب ${book.title} للمؤلف ${book.author}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={90}
              />
            </div>

            {/* معلومات الكتاب - الجانب الأيمن */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
              {/* العنوان */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {formatBookTitle(book.title)}
              </h2>

              {/* المؤلف */}
              <p className="text-lg md:text-xl text-gray-600 mb-4 font-medium">
                ✍️ {book.author}
              </p>

              {/* السعر */}
              {book.price && (
                <p className="text-2xl md:text-3xl font-bold text-[#8a6f47] mb-6">
                  {formatPrice(book.price)}
                </p>
              )}

              {/* الوصف */}
              <div className="flex-1 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">عن الكتاب</h3>
                {book.description ? (
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {book.description}
                  </p>
                ) : (
                  <p className="text-base md:text-lg text-gray-500 italic">
                    سيتم إضافة وصف الكتاب قريباً...
                  </p>
                )}
              </div>

              {/* زر الطلب عبر واتساب */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#d0a074] hover:bg-[#b88a5a] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98] text-lg"
                aria-label={`طلب ${book.title} عبر واتساب`}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>اطلب عبر واتساب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


