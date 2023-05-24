function getPilihanKomputer() {
  const komp = Math.random();

  if (komp < 0.34) return "gajah";
  if (komp >= 0.34 && komp < 0.67) return "orang";
  return "semut";
}

function getHasil(komp, pemain) {
  if (komp == pemain) return "SERI !";
  if (komp == "gajah") return pemain == "orang" ? "KALAH !" : "MENANG !";
  if (komp == "semut") return pemain == "gajah" ? "KALAH !" : "MENANG !";
  if (komp == "orang") return pemain == "semut" ? "KALAH !" : "MENANG !";
}

const pilihan = document.querySelectorAll("li img");
pilihan.forEach(function (pil) {
  pil.addEventListener("click", function () {
    const pilihanKomputer = getPilihanKomputer();
    const pilihanPemain = pil.className;
    const hasil = getHasil(pilihanKomputer, pilihanPemain);

    const imgKomp = document.querySelector(".img-komputer");
    imgKomp.setAttribute("src", "img/" + pilihanKomputer + ".png");

    const info = document.querySelector(".info");
    info.innerHTML = hasil;
  });
});
