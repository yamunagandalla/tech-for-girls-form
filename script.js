const scriptURL = "https://script.google.com/macros/s/AKfycbxC7_VWMx1vUTwW9dInZaoU6dhi1jJn4lNnkCfiJvBizMdCqosxnixamxmm5BoMSwVH2A/exec";

const form = document.getElementById("registrationForm");
const whatsappBtn = document.getElementById("whatsappShareBtn");
const submitBtn = document.getElementById("submitBtn");
const clickCounter = document.getElementById("clickCounter");
const thankYouMsg = document.getElementById("thankYou");

let clickCount = 0;

// Reset for every session (remove previous lock)
localStorage.removeItem("submitted");

// WhatsApp Sharing Logic
whatsappBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community ✨");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");
    clickCount++;
    clickCounter.innerText = `Click count: ${clickCount}/5`;

    if (clickCount === 5) {
      clickCounter.innerText = "✅ Sharing complete. Please continue.";
      whatsappBtn.disabled = true;
    }
  }
});

// Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete WhatsApp sharing (5 clicks) before submitting.");
    return;
  }

  submitBtn.disabled = true;

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const college = document.getElementById("college").value.trim();
  const screenshotFile = document.getElementById("screenshot").files[0];
  const screenshotName = screenshotFile ? screenshotFile.name : "Not uploaded";

  const data = new URLSearchParams();
  data.append("name", name);
  data.append("phone", phone);
  data.append("email", email);
  data.append("college", college);
  data.append("screenshotName", screenshotName);

  fetch(scriptURL, {
    method: "POST",
    body: data
  })
    .then(res => res.text())
    .then(response => {
      form.reset();
      clickCount = 0;
      clickCounter.innerText = "Click count: 0/5";
      whatsappBtn.disabled = false;
      thankYouMsg.innerText = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
      submitBtn.disabled = false;
    })
    .catch(error => {
      alert("Something went wrong. Please try again later.");
      console.error("Error!", error.message);
      submitBtn.disabled = false;
    });
});