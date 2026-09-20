let currentBudget = "Budget (Under ₹1,000)";

const upperInput = document.getElementById("upper-input");
const bottomInput = document.getElementById("bottom-input");
const shoeInput = document.getElementById("shoe-input");

const budgetPills = document.querySelectorAll(".pill");
const matchBtn = document.getElementById("match-btn");
const matchSpinner = document.getElementById("match-spinner");
const surpriseBtn = document.getElementById("surprise-btn");
const suggestBtn = document.getElementById("suggest-btn");
const customInput = document.getElementById("custom-input");
const occasionSelect = document.getElementById("occasion-select");
const skinToneSelect = document.getElementById("skin-tone-select");
const resultBox = document.getElementById("result-box");

const topWearText = document.getElementById("top-wear-text");
const bottomWearText = document.getElementById("bottom-wear-text");
const footwearText = document.getElementById("footwear-text");
const accessoryText = document.getElementById("accessory-text");
const tipText = document.getElementById("tip-text");
const vibeBadge = document.getElementById("vibe-badge");
const scoreTag = document.getElementById("score-tag");
const outfitResultImg = document.getElementById("outfit-result-img");
const bgWallpaper = document.getElementById("bg-wallpaper");
const vibeName = document.getElementById("vibe-name");
const spotifyLink = document.getElementById("spotify-link");

const topAmazon = document.getElementById("top-amazon");
const topMyntra = document.getElementById("top-myntra");
const topFlipkart = document.getElementById("top-flipkart");

const bottomAmazon = document.getElementById("bottom-amazon");
const bottomMyntra = document.getElementById("bottom-myntra");
const bottomFlipkart = document.getElementById("bottom-flipkart");

const shoeAmazon = document.getElementById("shoe-amazon");
const shoeMyntra = document.getElementById("shoe-myntra");
const shoeFlipkart = document.getElementById("shoe-flipkart");

const whatsappBtn = document.getElementById("whatsapp-btn");
const themeToggle = document.getElementById("theme-toggle");

const quickAskBtn = document.getElementById("quick-ask-btn");
const quickInput = document.getElementById("quick-input");
const quickResultBox = document.getElementById("quick-result-box");
const quickResultText = document.getElementById("quick-result-text");

const feedbackInput = document.getElementById("feedback-input");
const feedbackSubmitBtn = document.getElementById("feedback-submit-btn");
const feedbackMsg = document.getElementById("feedback-msg");

themeToggle.addEventListener("click", () => {
  const htmlEl = document.documentElement;
  const currentTheme = htmlEl.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", newTheme);
  localStorage.setItem("fitmatch_theme", newTheme);
});

document.documentElement.setAttribute("data-theme", localStorage.getItem("fitmatch_theme") || "dark");

budgetPills.forEach(pill => {
  pill.addEventListener("click", () => {
    budgetPills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    currentBudget = pill.getAttribute("data-budget");
  });
});

// STUNNING BOUTIQUE RACKS & WARDROBE COLLECTION (100% Clean Apparel, Formal Pants, Jeans, Trousers, Watches - Zero Humans)
const apparelCollectionPool = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1542272604-787c96355d53?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&auto=format&fit=crop&q=80", 
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1400&auto=format&fit=crop&q=80"
];

if (bgWallpaper) {
  bgWallpaper.style.backgroundImage = `url('${apparelCollectionPool[0]}')`;
}

function updateStoreLinks(elementPrefix, queryText) {
  const encodedQuery = encodeURIComponent(queryText);
  const formattedQuery = encodedQuery.replace(/%20/g, "-");

  const amazonEl = document.getElementById(`${elementPrefix}-amazon`);
  const myntraEl = document.getElementById(`${elementPrefix}-myntra`);
  const flipkartEl = document.getElementById(`${elementPrefix}-flipkart`);

  if (amazonEl) amazonEl.href = `https://www.amazon.in/s?k=${encodedQuery}`;
  if (myntraEl) myntraEl.href = `https://www.myntra.com/${formattedQuery}`;
  if (flipkartEl) flipkartEl.href = `https://www.flipkart.com/search?q=${encodedQuery}`;
}

async function generateLook(upperVal, bottomVal, shoeVal, occasionVal, skinVal) {
  matchBtn.disabled = true;
  matchSpinner.classList.remove("hidden");
  matchBtn.querySelector(".btn-text").innerText = "Humanoid Curating...";
  matchBtn.style.opacity = "0.8";

  try {
    const backendUrl = "https://fitmatch-backend-32b0.onrender.com/generate-outfit";

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: customInput.value.trim() || "None",
        upper: upperVal || "Shirt",
        bottom: bottomVal || "Trousers / Jeans",
        shoes: shoeVal || "Shoes / Watch",
        occasion: occasionVal,
        budget: currentBudget,
        skinTone: skinVal
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Server error occurred");

    const lines = data.result.split("\n");
    let topVal = upperVal || "Formal Shirt Collection";
    let bottomValText = bottomVal || "Straight-Fit Jeans / Formal Pants";
    let shoesVal = shoeVal || "Sneakers & Watch";
    let accVal = "Minimal Watch & Accessories";
    let tipStyle = "Keep your styling clean, classy, and well-fitted.";
    let styleScore = "98% - Perfect Boutique Synergy";

    lines.forEach(line => {
      if (line.startsWith("TOP:")) topVal = line.replace("TOP:", "").trim();
      if (line.startsWith("SHOES:")) shoesVal = line.replace("SHOES:", "").trim();
      if (line.startsWith("ACCESSO:")) accVal = line.replace("ACCESSO:", "").trim();
      if (line.startsWith("TIP:")) tipStyle = line.replace("TIP:", "").trim();
      if (line.startsWith("SCORE:")) styleScore = line.replace("SCORE:", "").trim();
    });

    topWearText.innerText = topVal;
    bottomWearText.innerText = bottomValText;
    footwearText.innerText = shoesVal;
    accessoryText.innerText = accVal;
    tipText.innerText = tipStyle;

    vibeBadge.innerText = `${occasionVal.toUpperCase()}`;
    scoreTag.innerText = `⭐ Style Score: ${styleScore}`;

    const vibePlaylists = {
      "College / Daily Study": { name: "Chill Lo-Fi Beats & Focus", query: "chill%20lofi%20study%20playlist" },
      "Gym / Workout": { name: "Hype Workout Gym Bass", query: "gym%20workout%20bass%20playlist" },
      "Date Night / Casual Evening": { name: "Romantic R&B Smooth Vibe", query: "romantic%20rnb%20evening%20playlist" },
      "Weekend Hangout / Beach Bay": { name: "Summer Beach Indie Pop", query: "summer%20indie%20pop%20playlist" },
      "Night Party / Clubbing": { name: "EDM Club & Party Anthems", query: "edm%20club%20party%20playlist" }
    };

    const currentVibeData = vibePlaylists[occasionVal] || vibePlaylists["College / Daily Study"];
    vibeName.innerText = currentVibeData.name;
    spotifyLink.href = `https://open.spotify.com/search/${currentVibeData.query}`;

    outfitResultImg.style.opacity = "0";
    setTimeout(() => {
      const randomImg = apparelCollectionPool[Math.floor(Math.random() * apparelCollectionPool.length)];
      outfitResultImg.src = randomImg;
      outfitResultImg.style.opacity = "1";
    }, 300);

    updateStoreLinks("top", topVal);
    updateStoreLinks("bottom", bottomValText);
    updateStoreLinks("shoe", shoesVal);

    resultBox.classList.remove("hidden");
    resultBox.scrollIntoView({ behavior: "smooth" });

    whatsappBtn.onclick = () => {
      const shareMessage = `⚡ *FitMatch Humanoid Look*\n\n👕 *Upper:* ${topVal}\n👖 *Bottom:* ${bottomValText}\n👟 *Shoes:* ${shoesVal}\n🎯 *Scene:* ${occasionVal}\n⭐ *Score:* ${styleScore}\n\n💡 *Tip:* ${tipStyle}\n\nGenerated via FitMatch Humanoid!`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, "_blank");
    };

  } catch (error) {
    alert("Error: " + error.message);
    console.error(error);
  } finally {
    matchBtn.disabled = false;
    matchSpinner.classList.add("hidden");
    matchBtn.querySelector(".btn-text").innerText = "Curate Complete Look";
    matchBtn.style.opacity = "1";
    surpriseBtn.innerText = "🎲 Surprise Me";
    surpriseBtn.style.opacity = "1";
  }
}

matchBtn.addEventListener("click", () => {
  generateLook(upperInput.value.trim(), bottomInput.value.trim(), shoeInput.value.trim(), occasionSelect.value, skinToneSelect.value);
});

suggestBtn.addEventListener("click", () => {
  const occasion = occasionSelect.value;
  const suggestions = {
    "College / Daily Study": { upper: "Classic Cotton Shirt", bottom: "Straight-Fit Blue Jeans", shoe: "White Casual Sneakers" },
    "Gym / Workout": { upper: "Solid Athletic T-Shirt", bottom: "Solid Black Joggers", shoe: "Running Sports Shoes" },
    "Date Night / Casual Evening": { upper: "Crisp Formal Shirt", bottom: "Slim-Fit Chinos", shoe: "Classic Leather Loafers" },
    "Weekend Hangout / Beach Bay": { upper: "Linen Casual Shirt", bottom: "Relaxed Trousers", shoe: "Minimalist Sneakers" },
    "Night Party / Clubbing": { upper: "Solid Black Formal Shirt", bottom: "Formal Trousers", shoe: "Oxford Shoes" }
  };

  const picked = suggestions[occasion] || suggestions["College / Daily Study"];
  upperInput.value = picked.upper;
  bottomInput.value = picked.bottom;
  shoeInput.value = picked.shoe;

  generateLook(picked.upper, picked.bottom, picked.shoe, occasion, skinToneSelect.value);
});

surpriseBtn.addEventListener("click", () => {
  surpriseBtn.innerText = "Rolling...";
  surpriseBtn.style.opacity = "0.7";

  const randomUppers = ["Crisp Cotton Shirt", "Formal Blazer", "Solid Casual Tee", "Classic Shirt"];
  const randomBottoms = ["Straight-Fit Chinos", "Formal Trousers", "Straight-Fit Denim Jeans", "Solid Joggers"];
  const randomShoes = ["Leather Watch & Formal Shoes", "White Sneakers", "Classic Loafers"];

  const rUpper = randomUppers[Math.floor(Math.random() * randomUppers.length)];
  const rBottom = randomBottoms[Math.floor(Math.random() * randomBottoms.length)];
  const rShoe = randomShoes[Math.floor(Math.random() * randomShoes.length)];

  upperInput.value = rUpper;
  bottomInput.value = rBottom;
  shoeInput.value = rShoe;

  const occasions = Array.from(occasionSelect.options).map(o => o.value);
  const randomOccasion = occasions[Math.floor(Math.random() * occasions.length)];

  generateLook(rUpper, rBottom, rShoe, randomOccasion, skinToneSelect.value);
});

async function handleQuickAsk() {
  const question = quickInput.value.trim();
  if (!question) {
    alert("Pehle apna sawal toh likho!");
    return;
  }

  quickAskBtn.innerText = "Thinking...";
  quickAskBtn.style.opacity = "0.7";

  try {
    const response = await fetch("https://fitmatch-backend-32b0.onrender.com/quick-ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Error");

    quickResultText.innerText = data.result;
    quickResultBox.classList.remove("hidden");
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    quickAskBtn.innerText = "Ask Humanoid Directly";
    quickAskBtn.style.opacity = "1";
  }
}

quickAskBtn.addEventListener("click", handleQuickAsk);

quickInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleQuickAsk();
  }
});

// Formspree Feedback Submission Integration
feedbackSubmitBtn.addEventListener("click", async () => {
  const feedbackText = feedbackInput.value.trim();
  if (!feedbackText) {
    alert("Pehle kuch feedback toh likho!");
    return;
  }

  feedbackSubmitBtn.innerText = "Submitting...";
  feedbackSubmitBtn.style.opacity = "0.7";

  try {
    const response = await fetch("https://formspree.io/f/xvkgzrlk", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ message: feedbackText })
    });

    if (!response.ok) throw new Error("Failed to submit feedback");

    feedbackMsg.classList.remove("hidden");
    feedbackInput.value = "";
    setTimeout(() => feedbackMsg.classList.add("hidden"), 4000);
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    feedbackSubmitBtn.innerText = "Submit Feedback";
    feedbackSubmitBtn.style.opacity = "1";
  }
});

setInterval(() => {
  if (bgWallpaper) {
    const newBgUrl = apparelCollectionPool[Math.floor(Math.random() * apparelCollectionPool.length)];
    bgWallpaper.style.backgroundImage = `url('${newBgUrl}')`;
  }
}, 3500);