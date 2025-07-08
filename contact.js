function sanitize(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showLoading(show) {
  const loading = document.getElementById("contact-loading");
  if (loading) loading.classList.toggle("hidden", !show);
}

function sendMail() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const name = sanitize(nameInput.value.trim());
  const email = sanitize(emailInput.value.trim());
  const message = sanitize(messageInput.value.trim());

  if (!name || !email || !message) {
    alert("All fields are required.");
    return;
  }
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (message.length > 1000) {
    alert("Message is too long.");
    return;
  }

  showLoading(true);

  const params = { name, email, message };
  const serviceID = "service_16qslfe";
  const templateID = "template_x9hz8bk";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
      showLoading(false);
      alert("Thank you for reaching out! I will get back to you soon.");
    })
    .catch((err) => {
      showLoading(false);
      console.log(err);
      alert("There was an error sending your message. Please try again later.");
    });
}