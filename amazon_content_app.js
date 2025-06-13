// Firebase Cloud Function
const functions = require("firebase-functions");
const axios = require("axios");

exports.sendToMake = functions.https.onCall(async (data, context) => {
  const { asin, mode } = data;

  try {
    // TODO: Replace "your-webhook-id" with your actual Make.com webhook ID
    const response = await axios.post("https://hook.make.com/your-webhook-id", {
      asin,
      mode // "affiliate" or "seller"
    });

    return { success: true, makeResponse: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Prompt for Affiliate Mode
const promptAffiliate = (asin) => `Generate a marketing blog title and a 100-word unboxing-style description for the following Amazon product. Include a short social caption, too. Use this ASIN for details: ${asin}`;

// Prompt for Seller Mode
const promptSeller = (asin) => `You're writing for a brand store. Generate: 1) SEO title 2) 150-word product intro 3) Key features (bullet) 4) Social teaser. Product ASIN: ${asin}`;

// Frontend Code (HTML + JS)

<form id="form">
  <input type="text" name="asin" placeholder="Amazon ASIN" required>
  <select name="mode">
    <option value="affiliate">Affiliate</option>
    <option value="seller">Seller</option>
  </select>
  <button type="submit">Generate</button>
</form>

<script>
  const form = document.getElementById('form');
  form.onsubmit = async (e) => {
    e.preventDefault();
    const asin = form.asin.value;
    const mode = form.mode.value;

    const res = await fetch("/__/functions/sendToMake", {
      method: "POST",
      body: JSON.stringify({ asin, mode }),
      headers: { "Content-Type": "application/json" }
    });

    const result = await res.json();
    alert("Sent to Make: " + JSON.stringify(result));
  };
</script>
