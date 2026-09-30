const form = document.querySelector("form");
const today = new Date();
const todayString = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

const fields = {
  username: {
    input: document.querySelector("#username"),
    error: document.querySelector("#username-error"),
    validate(value) {
      if (!value.trim()) return "Username tidak boleh kosong.";
      if (value.trim().length < 3) return "Username minimal 3 karakter.";
      return "";
    },
  },
  password: {
    input: document.querySelector("#password"),
    error: document.querySelector("#password-error"),
    validate(value) {
      if (!value) return "Password tidak boleh kosong.";
      if (value.length < 8) return "Password minimal 8 karakter.";
      return "";
    },
  },
  nama: {
    input: document.querySelector("#nama"),
    error: document.querySelector("#nama-error"),
    validate(value) {
      return value.trim() ? "" : "Nama tidak boleh kosong.";
    },
  },
  tanggalLahir: {
    input: document.querySelector("#tanggal-lahir"),
    error: document.querySelector("#tanggal-lahir-error"),
    validate(value) {
      if (!value) return "Tanggal lahir tidak boleh kosong.";
      if (value > todayString) return "Tanggal lahir tidak boleh melebihi hari ini.";
      return "";
    },
  },
  alamat: {
    input: document.querySelector("#alamat"),
    error: document.querySelector("#alamat-error"),
    validate(value) {
      return value.trim() ? "" : "Alamat tidak boleh kosong.";
    },
  },
  nomorTelepon: {
    input: document.querySelector("#nomor-telepon"),
    error: document.querySelector("#nomor-telepon-error"),
    validate(value) {
      const nomor = value.trim();
      if (!nomor) return "Nomor telepon tidak boleh kosong.";
      if (!nomor.startsWith("62")) return "Nomor telepon harus diawali 62.";
      return "";
    },
  },
};

document.querySelector("#tanggal-lahir").max = todayString;

function validateField(field) {
  const message = field.validate(field.input.value);
  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", String(Boolean(message)));
  return !message;
}

Object.values(fields).forEach((field) => {
  field.input.addEventListener("input", () => validateField(field));
  field.input.addEventListener("change", () => validateField(field));
});

form.addEventListener("submit", (event) => {
  const isValid = Object.values(fields).map(validateField).every(Boolean);
  if (!isValid) event.preventDefault();
});