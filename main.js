const modal = document.getElementById("modal");
const openButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close-modal");
const leadForm = document.getElementById("leadForm");
const successText = document.getElementById("successText");

function openModal() {
  modal.classList.add("active");
  document.body.classList.add("lock");
}

function closeModal() {
  modal.classList.remove("active");
  document.body.classList.remove("lock");
  successText.classList.remove("show");
}

openButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// FORM SUBMIT INTEGRATSIYASI (TEZKOR REJIM)
leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = leadForm.querySelector('input[type="text"]');
  const phoneInput = leadForm.querySelector('input[type="tel"]');
  const submitBtn = leadForm.querySelector(".submit-btn");

  const leadData = {
    name: nameInput.value,
    phone: phoneInput.value,
    date: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }),
    source: "RiOne Stars Landing Page"
  };

  // 1. Tugmani bloklash va holatni o'zgartirish
  submitBtn.disabled = true;
  submitBtn.innerText = "Yuborilmoqda...";

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyM1F906o7hgC8JP4UffncVryOO-O_4X9g7bYivIkejFA-0gz-T28aagsg4uaKSrDVx/exec";

  // 2. [Asosiy Tezlashtirish]: Fetch so'rovini yuboramiz, lekin (.then) javobini KUTIB O'TIRMAYMIZ!
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  }).catch(error => console.error("Orqa fonda xatolik:", error));

  // 3. Foydalanuvchiga darhol muvaffaqiyatli oynani ko'rsatamiz (Kutish vaqti 0 ga tushdi)
  successText.classList.add("show");
  leadForm.reset();

  // 4. Atigi 1 soniyadan keyin darhol Botga o'tkazib yuboramiz
  setTimeout(() => {
    closeModal();
    window.location.href = "https://t.me/risolatumidovnarobot";
  }, 1000);
});