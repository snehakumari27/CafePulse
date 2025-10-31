// ✅ Generate QR Code
function generateQRCode(url) {
  const qrcodeDiv = document.getElementById("qrcode");
  new QRCode(qrcodeDiv, {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

// ✅ Handle Feedback Form
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const feedback = document.getElementById("feedback").value.trim();

    if (!name || !feedback) {
      alert("Please fill out all fields!");
      return;
    }

    const feedbackData = JSON.parse(localStorage.getItem("feedbacks") || "[]");

    // 👇 Correct time generation
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });

    feedbackData.push({
      name,
      feedback,
      time: formattedTime
    });

    localStorage.setItem("feedbacks", JSON.stringify(feedbackData));

    feedbackForm.style.display = "none";
    document.getElementById("thankyou").style.display = "block";
  });
}

// ✅ Load feedbacks in dashboard
function loadFeedbacks() {
  const feedbackData = JSON.parse(localStorage.getItem("feedbacks") || "[]");
  const tableBody = document.querySelector("#feedbackTable tbody");

  tableBody.innerHTML = "";

  feedbackData.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.feedback}</td>
      <td>${entry.time}</td>
    `;
    tableBody.appendChild(row);
  });
}

