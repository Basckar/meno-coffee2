"use strict";
// خروج از لودینگ و نمایش صفحه، با انیمیشن ورود آیتم‌ها
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    // اجرای انیمیشن خروج
    splash.style.animation = "splash-out .8s ease forwards";
    // بعد از پایان انیمیشن، مخفی کن
    splash.addEventListener("animationend", () => {
      splash.style.display = "none";
      // افکت ورود آیتم‌های تب فعال
      document
        .querySelectorAll(".food-list.active .food-item")
        .forEach((item, i) => {
          setTimeout(() => item.classList.add("show"), i * 140);
        });
    });
  }, 1200); // زمان نمایش اولیه لودینگ
});
// مدیریت تب‌ها مطابق data-tab و idها
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.toggle("active", t === tab));
    document.querySelectorAll(".food-list").forEach((list) => {
      const active = list.id === target;
      list.classList.toggle("active", active);
      if (active) {
        // افکت ورود ترتیبی
        list.querySelectorAll(".food-item").forEach((item, i) => {
          item.classList.remove("show");
          setTimeout(() => item.classList.add("show"), i * 140);
        });
      }
    });
  });
});

// پاپ‌آپ عمومی: محتوا از کارت انتخاب‌شده می‌آید
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const popupBody = document.getElementById("popup-body");

function openPopup(contentHtml) {
  popupBody.innerHTML = contentHtml;
  overlay.classList.add("active");
  popup.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closePopup() {
  overlay.classList.remove("active");
  popup.classList.remove("active");
  document.body.style.overflow = "";
  popupBody.innerHTML = "";
}

// ساختن محتوای پاپ‌آپ مطابق دیزاین (نام، توضیح، امتیاز، گزینه‌های شیر، قیمت، سفارش)
function buildPopupContent({
  title,
  desc,
  imgSrc,
  rating = "4.5",
  price = "۱۴۰,۰۰۰",
}) {
  return `
        <img class="popup-pic" src="${imgSrc}" alt="${title}"/>
        <div class="popup-title">
          <h3 id="popup-title">${title}</h3>
          <div class="rating">
            <span>${rating}</span>
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3.20607 8.28162L0.221995 5.4825C-0.157087 5.12694 -0.0386464 4.77547 0.485473 4.70245L4.60963 4.12577L6.45398 0.529876C6.68803 0.0729678 7.07172 0.0729678 7.30576 0.529876L9.15011 4.12577L13.2743 4.70245C13.7987 4.77547 13.9172 5.12694 13.5378 5.4825L10.5537 8.28162L11.2579 12.2341C11.3473 12.736 11.0374 12.9537 10.5682 12.7163L6.87987 10.8504L3.19153 12.7166C2.72238 12.9541 2.41245 12.7364 2.50181 12.2344L3.20607 8.28162Z" fill="#7A7A7A"/>
            </svg>
          </div>
        </div>
        <p class="popup-text">${desc}</p>
        <h4 class="popup-subtitle">انتخاب شیر</h4>
        <div class="popup-options">
          <button class="popup-btn" type="button">شیر عادی</button>
          <button class="popup-btn" type="button">شیر وانیل</button>
          <button class="popup-btn" type="button">شیر فندق</button>
        </div>
        <div class="div-footer">
          <button class="popup-order" type="button">سفارش</button>
          <div>
            <h4 class="popup-price">تومان</h4>
            <p class="popup-amount">${price}</p>
          </div>
        </div>
      `;
}

// باز کردن پاپ‌آپ وقتی روی کل کارت کلیک بشه
document.querySelectorAll(".food-item").forEach((item) => {
  item.addEventListener("click", () => {
    const title =
      item.querySelector(".food-item__title h3")?.textContent.trim() || "آیتم";
    const desc =
      item.querySelector(".food-item__title p")?.textContent.trim() || "";
    const imgSrc =
      item.querySelector(".food-item__pic")?.getAttribute("src") ||
      "img/Product Image.png";
    openPopup(buildPopupContent({ title, desc, imgSrc }));
  });
});

// بستن پاپ‌آپ
function closePopup() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  popupBody.innerHTML = "";
}

// دکمه‌ی بستن داخل پاپ‌آپ
document.querySelector(".closePopup").addEventListener("click", closePopup);

// کلیک روی فضای بیرون (فقط خود overlay، نه داخل پاپ‌آپ)
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closePopup();
  }
});
