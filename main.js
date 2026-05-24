const input = document.querySelector(".input");
const allclear = document.querySelector(".allclear");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const kop = document.querySelector(".kop");
const bol = document.querySelector(".bol");
const a1 = document.querySelector(".a1");
const a2 = document.querySelector(".a2");
const a3 = document.querySelector(".a3");
const a4 = document.querySelector(".a4");
const a5 = document.querySelector(".a5");
const a6 = document.querySelector(".a6");
const a7 = document.querySelector(".a7");
const a8 = document.querySelector(".a8");
const a9 = document.querySelector(".a9");
const a0 = document.querySelector(".a0");
const teng = document.querySelector(".teng");
const back = document.querySelector(".back");
const koefA = document.querySelector(".koef-a");
const koefB = document.querySelector(".koef-b");
const koefC = document.querySelector(".koef-c");
const yechishBtn = document.querySelector(".yechish-btn");
const tenglamaNatija = document.querySelector(".tenglama-natija");
const dark = document.querySelector(".dark");
const body = document.querySelector("body");
const foiz = document.querySelector(".foiz");

// 1. Sayt ochilganda xotirani tekshirish
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("darkmode");
  dark.textContent = "Lightmode"; // Agar qorong'u bo'lsa, tugma matni almashadi
} else {
  dark.textContent = "Darkmode";
}

// 2. Tugma bosilganda rejimni va matnni o'zgartirish
dark.addEventListener("click", () => {
  body.classList.toggle("darkmode");

  // Agar hozir darkmode yoqilgan bo'lsa
  if (body.classList.contains("darkmode")) {
    dark.textContent = "Lightmode";
    localStorage.setItem("theme", "dark"); // Xotiraga saqlash
  } else {
    dark.textContent = "Darkmode";
    localStorage.setItem("theme", "light"); // Xotiradan o'chirish
  }
});

let display = input.value;

// Har bir raqam tugmasi bosilganda ekranga yozish
a0.addEventListener("click", () => {
  input.value += "0";
});
a1.addEventListener("click", () => {
  input.value += "1";
});
a2.addEventListener("click", () => {
  input.value += "2";
});
a3.addEventListener("click", () => {
  input.value += "3";
});
a4.addEventListener("click", () => {
  input.value += "4";
});
a5.addEventListener("click", () => {
  input.value += "5";
});
a6.addEventListener("click", () => {
  input.value += "6";
});
a7.addEventListener("click", () => {
  input.value += "7";
});
a8.addEventListener("click", () => {
  input.value += "8";
});
a9.addEventListener("click", () => {
  input.value += "9";
});

// Amallar tugmalari bosilganda (bo'lish uchun slesh "/" belgisini qo'yamiz)
plus.addEventListener("click", () => {
  input.value += "+";
});
minus.addEventListener("click", () => {
  input.value += "-";
});
kop.addEventListener("click", () => {
  input.value += "*";
});
bol.addEventListener("click", () => {
  input.value += "/";
});

// Ekranni butunlay tozalash (AC tugmasi)
allclear.addEventListener("click", () => {
  input.value = "";
});

// Tenglik belgi bosilganda hisoblash (eval funksiyasi orqali)
teng.addEventListener("click", () => {
  try {
    // eval() ekrandagi misolni avtomat hisoblab beradi (masalan: "5+5" -> 10)
    input.value = eval(input.value);
  } catch (error) {
    input.value = "Xatolik"; // Agar misol noto'g'ri yozilsa
  }
});

// Bitta harf yoki raqamni o'chirish tugmasi
back.addEventListener("click", () => {
  input.value = input.value.slice(0, -1);
});

teng.addEventListener("click", () => {
  try {
    let ifoda = input.value;

    // Agar misol ichida foiz (%) belgisi bo'lsa, uni hisoblaymiz
    // Masalan: "100-50%" yoki "100*20%"
    if (ifoda.includes("%")) {
      // RegEx orqali son va foiz qismini ajratib olamiz
      // Masalan: 100 va -50% ni ajratadi
      ifoda = ifoda.replace(
        /(\d+)([\+\-\*\/])(\d+)%/g,
        (match, son1, amal, son2) => {
          let foizQiymati = (parseFloat(son1) * parseFloat(son2)) / 100;
          return son1 + amal + foizQiymati;
        },
      );
    }

    // Yangilangan toza misolni hisoblaymiz (Masalan: 100 - 50)
    input.value = eval(ifoda);
  } catch (error) {
    input.value = "Xatolik";
  }
});
