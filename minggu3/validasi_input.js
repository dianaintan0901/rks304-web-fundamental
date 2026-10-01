// validasi_input.js
// Validasi input form register.html
// Setiap fungsi validate_xxx() mengembalikan true jika valid, false jika tidak.
// Pesan error ditampilkan di <p class="error-message"> tepat di bawah masing-masing input.

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", function (event) {
    // Selalu cegah submit dulu, baru kirim manual jika semua valid
    event.preventDefault();

    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isNamaValid = validateNama();
    const isTanggalLahirValid = validateTanggalLahir();
    const isAlamatValid = validateAlamat();
    const isNoTelpValid = validateNoTelp();

    const isFormValid =
      isUsernameValid &&
      isPasswordValid &&
      isNamaValid &&
      isTanggalLahirValid &&
      isAlamatValid &&
      isNoTelpValid;

    if (isFormValid) {
      // Semua valid -> lanjutkan navigasi sesuai action form (dashboard.html)
      form.submit();
    }
  });

  // Opsional: validasi ulang saat user selesai mengetik di tiap field (UX lebih baik)
  document.getElementById("username").addEventListener("blur", validateUsername);
  document.getElementById("password").addEventListener("blur", validatePassword);
  document.getElementById("nama").addEventListener("blur", validateNama);
  document.getElementById("tanggal_lahir").addEventListener("blur", validateTanggalLahir);
  document.getElementById("alamat").addEventListener("blur", validateAlamat);
  document.getElementById("no_telp").addEventListener("blur", validateNoTelp);
});

// ---------- Helper untuk menampilkan / menyembunyikan pesan error ----------

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorEl = input.parentElement.querySelector(".error-message");
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
  input.classList.add("border-red-500");
  input.classList.remove("border-slate-300");
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  const errorEl = input.parentElement.querySelector(".error-message");
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
  input.classList.remove("border-red-500");
  input.classList.add("border-slate-300");
}

// ---------- Validasi tiap field ----------

// a. Username: tidak boleh kosong, minimal 3 karakter
function validateUsername() {
  const value = document.getElementById("username").value.trim();

  if (value === "") {
    showError("username", "Username tidak boleh kosong.");
    return false;
  }
  if (value.length < 3) {
    showError("username", "Username minimal 3 karakter.");
    return false;
  }
  clearError("username");
  return true;
}

// b. Password: tidak boleh kosong, minimal 8 karakter
function validatePassword() {
  const value = document.getElementById("password").value;

  if (value === "") {
    showError("password", "Password tidak boleh kosong.");
    return false;
  }
  if (value.length < 8) {
    showError("password", "Password minimal 8 karakter.");
    return false;
  }
  clearError("password");
  return true;
}

// c. Nama: tidak boleh kosong
function validateNama() {
  const value = document.getElementById("nama").value.trim();

  if (value === "") {
    showError("nama", "Nama tidak boleh kosong.");
    return false;
  }
  clearError("nama");
  return true;
}

// d. Tanggal lahir: tidak boleh kosong, tidak boleh future date (harus <= hari ini)
function validateTanggalLahir() {
  const value = document.getElementById("tanggal_lahir").value;

  if (value === "") {
    showError("tanggal_lahir", "Tanggal lahir tidak boleh kosong.");
    return false;
  }

  const inputDate = new Date(value);
  const today = new Date();
  // Reset jam ke 00:00:00 supaya perbandingan murni berdasarkan tanggal
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate > today) {
    showError("tanggal_lahir", "Tanggal lahir tidak boleh melebihi hari ini.");
    return false;
  }

  clearError("tanggal_lahir");
  return true;
}

// e. Alamat: tidak boleh kosong
function validateAlamat() {
  const value = document.getElementById("alamat").value.trim();

  if (value === "") {
    showError("alamat", "Alamat tidak boleh kosong.");
    return false;
  }
  clearError("alamat");
  return true;
}

// f. Nomor telepon: tidak boleh kosong, harus berawalan "62"
function validateNoTelp() {
  const value = document.getElementById("no_telp").value.trim();

  if (value === "") {
    showError("no_telp", "Nomor telepon tidak boleh kosong.");
    return false;
  }
  if (!value.startsWith("62")) {
    showError("no_telp", "Nomor telepon harus berawalan 62 (contoh: 6281234567890).");
    return false;
  }
  clearError("no_telp");
  return true;
}
