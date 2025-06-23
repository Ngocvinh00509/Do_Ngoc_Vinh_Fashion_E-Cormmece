

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

// Hiển thị menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

// Ẩn menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const mainImg = document.querySelector('.details__img'),
    smallImg = document.querySelectorAll('.details__small-img');

  smallImg.forEach((img) => {
    img.addEventListener('click', function () {
      mainImg.src = this.src;
    });
  });
}
imgGallery();

/*=============== SWIPER CATEGORIES ===============*/
var swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    350: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    992: { slidesPerView: 4 },
    1200: { slidesPerView: 5 },
    1400: { slidesPerView: 6 },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
var swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1400: { slidesPerView: 4 },
  },
});

/*============= PRODUCTS TABS =============*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((t) => t.classList.remove('active-tab'));
    tabs.forEach((t) => t.classList.remove('active-tab'));

    tab.classList.add('active-tab');
    target.classList.add('active-tab');
  });
});

/*============ LOGIN/REGISTER TABS =============*/
const container     = document.getElementById('container');
const signUpButton  = document.getElementById('signUp');
const signInButton  = document.getElementById('signIn');

signUpButton?.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton?.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

/*============ GENERIC FORM VALIDATOR =============*/
function validateForm(form, rules) {
  firstErrorField = null;
  let valid = true;

  // Clear previous errors
  rules.forEach(({ field }) => clearError(form.elements[field]));

  for (const { field, validator, message } of rules) {
    const input = form.elements[field];
    const value = input.value;

    if (!validator(value)) {
      showError(input, message);
      valid = false;
    }
  }

  return valid;
}



document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');

  /*============ HELPERS =============*/
  let firstErrorField = null;

  function showError(input, message) {
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    const msg = input.nextElementSibling;
    if (msg && msg.classList.contains('error-message')) {
      msg.textContent = message;
      msg.setAttribute('role', 'alert');
    }
    if (!firstErrorField) {
      firstErrorField = input;
      input.focus();
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');
    const msg = input.nextElementSibling;
    if (msg && msg.classList.contains('error-message')) {
      msg.textContent = '';
      msg.removeAttribute('role');
    }
  }

  function clearAllErrors(form) {
    form.querySelectorAll('.form__input.error').forEach(input => {
      clearError(input);
    });
    form.querySelectorAll('.error-message').forEach(msg => {
      msg.textContent = '';
      msg.removeAttribute('role');
    });
  }

  function validateForm(form, rules) {
    firstErrorField = null;
    let valid = true;
    rules.forEach(r => clearError(form.elements[r.field]));

    for (const { field, validator, message } of rules) {
      const input = form.elements[field];
      if (!validator(input.value)) {
        showError(input, message);
        valid = false;
      }
    }
    return valid;
  }

  /*============ SIGN UP =============*/
  const existingEmails = ['existing@test.com']; // giả lập email đã đăng ký
  const signupForm = document.getElementById('signup-form');

  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();

      const email = signupForm.elements['signup-email'].value.trim();

      const rules = [
        {
          field: 'signup-name',
          validator: v => v.trim() !== '',
          message: 'Name is required'
        },
        {
          field: 'signup-email',
          validator: v => v.trim() !== '',
          message: 'Email is required'
        },
        {
          field: 'signup-email',
          validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
          message: 'Please enter a valid email address'
        },
        {
          field: 'signup-password',
          validator: v => v.trim() !== '',
          message: 'Password is required'
        },
        {
          field: 'signup-password',
          validator: v => v.trim().length >= 6,
          message: 'Password must be at least 6 characters'
        },
        {
          field: 'signup-email',
          validator: v => !existingEmails.includes(v),
          message: 'Email already registered'
        }
      ];

      if (!validateForm(signupForm, rules)) return;

      clearAllErrors(signupForm);
      setTimeout(() => {
        alert('Account created successfully!');
        signupForm.reset();
        container.classList.remove('right-panel-active');
      }, 0);
    });
  }

  /*============ SIGN IN =============*/
  const signinForm = document.getElementById('signin-form');

  if (signinForm) {
    signinForm.addEventListener('submit', e => {
      e.preventDefault();

      const rules = [
        {
          field: 'signin-email',
          validator: v => v.trim() !== '',
          message: 'Email is required'
        },
        {
          field: 'signin-email',
          validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
          message: 'Please enter a valid email'
        },
        {
          field: 'signin-password',
          validator: v => v.trim() !== '',
          message: 'Password is required'
        }
      ];

      if (!validateForm(signinForm, rules)) return;

      clearAllErrors(signinForm);
      setTimeout(() => {
        alert('Sign In success!');
        signinForm.reset();
        // window.location.href = 'index.html'; // Nếu cần redirect
      }, 0);
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const errorMessages = document.querySelectorAll(".error-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset lỗi
    errorMessages.forEach(msg => msg.textContent = "");
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      input.classList.remove("error-border");
    });

    let isValid = true;

    if (nameInput.value.trim() === "") {
      setError(nameInput, "Please enter your name");
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      setError(emailInput, "Please enter your email");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setError(emailInput, "Invalid email format");
      isValid = false;
    }

    if (subjectInput.value.trim() === "") {
      setError(subjectInput, "Please enter a subject");
      isValid = false;
    }

    if (messageInput.value.trim() === "") {
      setError(messageInput, "Please enter your message");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });

  function setError(inputElement, message) {
    const small = inputElement.nextElementSibling;
    if (small && small.classList.contains("error-message")) {
      small.textContent = message;
    }
    inputElement.classList.add("error-border");
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const placeOrderBtn = document.querySelector(".btn.btn--md"); // Nút "Place Order"
  const form = document.getElementById("billing-form");
  const fields = [
    { id: "name", message: "Please enter your name" },
    { id: "address", message: "Please enter your address" },
    { id: "city", message: "Please enter your city" },
    { id: "country", message: "Please enter your country" },
    { id: "postcode", message: "Please enter your postcode" },
    { id: "phone", message: "Please enter your phone" },
    { id: "email", message: "Please enter a valid email", isEmail: true },
    { id: "note", message: "Please enter a note" }
  ];

  placeOrderBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let isValid = true;

    fields.forEach(({ id, message, isEmail }) => {
      const input = document.getElementById(id);
      const errorTag = input.nextElementSibling;

      input.classList.remove("error-border");
      errorTag.textContent = "";

      const value = input.value.trim();

      if (!value) {
        errorTag.textContent = message;
        input.classList.add("error-border");
        isValid = false;
      } else if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorTag.textContent = "Invalid email format";
        input.classList.add("error-border");
        isValid = false;
      }
    });

    if (isValid) {
      alert("Form is valid! Proceeding with order...");
      form.submit(); // or handle order logic here
    }
  });
});
//

document.addEventListener("DOMContentLoaded", function () {
  // Calculate Shipping
  const shippingForm = document.querySelector(".cart__shipping .form");
  const shippingInputs = shippingForm.querySelectorAll(".form__input");
  const updateBtn = shippingForm.querySelector(".btn");

  // Apply Coupon
  const couponForm = document.querySelector(".coupon__form");
  const couponInput = couponForm.querySelector(".form__input");
  const applyBtn = couponForm.querySelector(".btn");

  // Helper to create error message if missing
  function ensureErrorMessage(input) {
    if (!input.nextElementSibling || !input.nextElementSibling.classList?.contains("error-message")) {
      const small = document.createElement("small");
      small.classList.add("error-message");
      input.insertAdjacentElement("afterend", small);
    }
  }

  // Create error messages for all shipping inputs and coupon input
  shippingInputs.forEach(ensureErrorMessage);
  ensureErrorMessage(couponInput);

  // Add error class + message
  function setError(input, message) {
    const small = input.nextElementSibling;
    small.textContent = message;
    input.classList.add("error-border");
  }

  // Clear all errors
  function clearErrors(inputs) {
    inputs.forEach(input => {
      input.classList.remove("error-border");
      const small = input.nextElementSibling;
      if (small && small.classList.contains("error-message")) {
        small.textContent = "";
      }
    });
  }

  // Handle Update Shipping button
  updateBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let valid = true;
    clearErrors(shippingInputs);

    shippingInputs.forEach(input => {
      if (input.value.trim() === "") {
        setError(input, "This field is required");
        valid = false;
      }
    });

    if (valid) {
      alert("Shipping info is valid. Proceeding update...");
    }
  });

  // Handle Apply Coupon button
  applyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearErrors([couponInput]);

    if (couponInput.value.trim() === "") {
      setError(couponInput, "Please enter a coupon code");
    } else {
      alert("Coupon applied (if valid)");
    }
  });
});
// Kích hoạt các validation khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  validateUpdateProfile();
});





