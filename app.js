/**
 * ============================================================================
 * STORYCRAFT STRATEGIST - JAVASCRIPT ENGINE
 * Internal Personal Branding & Content Strategy Generator for
 * International Children's Book Illustrators & Voice Actors
 * ============================================================================
 */

// ============================================================================
// 1. DATABASE: CURATED HOOKS & CONTENT STRATEGIES FOR GLOBAL CLIENTS
// ============================================================================
const STRATEGY_DATABASE = [
  // --- PILLAR 2: THE SECRET SAUCE (CHARACTER VOICE + ART) ---
  {
    id: "vo-1",
    pillar: "vo",
    angle: "scroll-stopper",
    hook: "What if your picture book character could actually talk?",
    visualAction: "Split screen or jump cut: On the left, a time-lapse watercolor of a blue fluffy alien/creature. On the right, you at your studio mic voicing them in a squeaky, lovable tone.",
    voScript: "Whenever I illustrate a new picture book, I don't just sketch their poses... I find their voice first. Meet Barnaby. He refuses to sleep until someone reads HIM a bedtime story.",
    targetClient: "Picture Book Authors & Independent Publishers",
    platform: "Instagram Reel / TikTok (9:16)",
    whyItWorks: "Authors dream of seeing their character come alive. Giving them a voice immediately triggers an emotional attachment."
  },
  {
    id: "vo-2",
    pillar: "vo",
    angle: "scroll-stopper",
    hook: "Painting a picture book character vs. finding their voice.",
    visualAction: "Show 3 different voice attempts for the same painted character: Attempt 1 (too serious), Attempt 2 (silly opera voice), Attempt 3 (the perfect warm bedtime whisper).",
    voScript: "Voice acting teaches you visual emotion. If a line requires a gentle sigh, the character's shoulders in the illustration need to drop 5 degrees.",
    targetClient: "Global Art Directors & Literary Agents",
    platform: "Instagram Reel (9:16)",
    whyItWorks: "Proves deep emotional intelligence in character design, showing art directors you understand pacing and nuance."
  },
  {
    id: "vo-3",
    pillar: "vo",
    angle: "emotional",
    hook: "Every picture book character has a secret heartbeat.",
    visualAction: "Slow panning shot across a cozy picture book spread of a lonely dragon in a flower field. Whispered storytelling voiceover playing with soft piano.",
    voScript: "When little readers tuck into bed, they don't just look at the pages—they listen to the cadence of the words. That’s why every spread I paint is tuned for the rhythm of reading aloud.",
    targetClient: "US/UK Publishing Houses & Editors",
    platform: "Reels / TikTok / YouTube Shorts",
    whyItWorks: "Speaks the language of picture book editors who prioritize the 'read-aloud factor' in acquisitions."
  },
  {
    id: "vo-4",
    pillar: "vo",
    angle: "client-magnet",
    hook: "Why authors hire an illustrator who is also a voice actor.",
    visualAction: "Showcase finished illustrated book spread + quick clip of the animated audiobook read-aloud demo you produced.",
    voScript: "In 2026, a picture book isn't just print on paper. It's animated read-alouds, Kickstarter video pitches, and social buzz. When we collaborate, your story gets both a visual world and a living voice.",
    targetClient: "Self-Publishing Authors & Kickstarter Creators",
    platform: "Reel / LinkedIn / TikTok",
    whyItWorks: "Positions you as a premium 2-in-1 creative partner, justifying higher commission rates."
  },
  {
    id: "vo-5",
    pillar: "vo",
    angle: "educational",
    hook: "3 voice acting tricks that make my book illustrations 10x more expressive.",
    visualAction: "Demonstrate on camera: 1. Making the facial expression while painting it. 2. Testing dialogue rhythm for page turns. 3. Matching color palette warmth to vocal timbre.",
    voScript: "Trick 1: If you can't say the character's line with the expression you painted, the illustration isn't finished yet.",
    targetClient: "Children's Book Community & Aspiring Authors",
    platform: "Carousel or Reel with on-screen text",
    whyItWorks: "High shareability and cements you as a master of your combined craft."
  },

  // --- PILLAR 1: PICTURE BOOK ART & CRAFT ---
  {
    id: "art-1",
    pillar: "art",
    angle: "scroll-stopper",
    hook: "The #1 mistake authors make when pacing a 32-page picture book.",
    visualAction: "Show a physical folded paper dummy book. Point out where page turns happen and where text needs 'quiet space'.",
    voScript: "A picture book isn't 32 separate paintings. It's a cinematic journey. If you put the climax on page 24 instead of page 28, you lose the young reader's anticipation.",
    targetClient: "Self-Publishing Authors & Debut Writers",
    platform: "TikTok / Instagram Reel",
    whyItWorks: "Establishes undeniable editorial authority. Authors will save this and seek your consultation."
  },
  {
    id: "art-2",
    pillar: "art",
    angle: "educational",
    hook: "How art directors tell if an illustrator is amateur or publishing-ready.",
    visualAction: "Side-by-side comparison on Procreate: Inconsistent character model vs. a disciplined 3-point character turnaround sheet with clear color swatches.",
    voScript: "Can your protagonist jump, cry, and sleep across 16 double-spreads while keeping the exact same head proportions? That's what international publishers scout for first.",
    targetClient: "Art Directors & Fellow Illustrators",
    platform: "Reels / Carousel",
    whyItWorks: "Directly signals to publishers: 'I understand professional production pipelines and character consistency'."
  },
  {
    id: "art-3",
    pillar: "art",
    angle: "emotional",
    hook: "I painted this spread for every child who felt too shy to speak.",
    visualAction: "Time-lapse of painting soft warm watercolor textures, revealing a tiny shy badger hiding behind giant glowing autumn leaves.",
    voScript: "In children's books, backgrounds aren't just scenery. They are the emotional atmosphere that hugs the reader when the world feels too big.",
    targetClient: "Global Parents, Teachers, & Editors",
    platform: "Reels / TikTok",
    whyItWorks: "Deep emotional resonance that garners authentic shares and comments from authors wanting that mood in their books."
  },
  {
    id: "art-4",
    pillar: "art",
    angle: "client-magnet",
    hook: "Currently booking Q3/Q4 picture books. Here is what my pipeline looks like.",
    visualAction: "Clean aesthetic desk view: Sketchbook thumbnails -> Color studies -> Finished CMYK print proofs -> Audio voice reel.",
    voScript: "From the first character turnaround to final print-ready 300 DPI files with bleed, I guide authors through every step of bringing their manuscript to life.",
    targetClient: "Authors Ready to Hire an Illustrator",
    platform: "Instagram Reel / Carousel",
    whyItWorks: "Removes friction and anxiety for authors who don't know how the illustration production process works."
  },

  // --- PILLAR 3: BEHIND THE SCENES & CREATOR JOURNEY ---
  {
    id: "bts-1",
    pillar: "bts",
    angle: "scroll-stopper",
    hook: "My studio setup as a picture book illustrator who also records character voices.",
    visualAction: "Desk tour: Cintiq/iPad Pro on one side, Shure/Rode studio microphone with pop filter on the other, physical picture books for reference.",
    voScript: "People always ask: 'Why is there a broadcast microphone on an illustrator's art desk?' Here is a day in my creative life.",
    targetClient: "General Creative Audience & Publishers",
    platform: "Reel / TikTok (Studio Tour format)",
    whyItWorks: "Visual curiosity gap: People love seeing unconventional multi-disciplinary creative studios."
  },
  {
    id: "bts-2",
    pillar: "bts",
    angle: "client-magnet",
    hook: "3 green flags to look for when hiring a children's book illustrator.",
    visualAction: "Talking head or voiceover over contract checklist: 1. Clear milestone revisions. 2. Knowledge of CMYK bleed. 3. Genuine love for the manuscript.",
    voScript: "If your illustrator doesn't ask about your book's target age group and trim size before quoting a price, that's a red flag. Here is how we do it right.",
    targetClient: "First-Time Self-Publishing Authors",
    platform: "Reel / LinkedIn",
    whyItWorks: "Builds immense trust. High-paying clients love working with transparent professionals."
  },
  {
    id: "bts-3",
    pillar: "bts",
    angle: "educational",
    hook: "Why I test all my picture book spreads in physical black-and-white first.",
    visualAction: "Hold up cheap black & white printed paper dummy book and flip through it quickly.",
    voScript: "If the storytelling and composition don't work in plain black and white values, adding beautiful colors won't save it. Always test your values first.",
    targetClient: "Art Directors & Discerning Authors",
    platform: "Reel / Carousel",
    whyItWorks: "Signals classic illustration fundamentals and rigorous craftsmanship."
  }
];

// QUICK HOOKS CHEATSHEET
const QUICK_HOOKS_LIBRARY = [
  "What if your picture book character could actually talk?",
  "Painting a picture book character vs. finding their voice.",
  "The #1 mistake authors make when pacing a 32-page book.",
  "How art directors tell if an illustrator is publishing-ready.",
  "Every picture book character has a secret heartbeat.",
  "Why authors hire an illustrator who is also a voice actor.",
  "My studio setup as an illustrator who records character VO.",
  "Can you spot the hidden storytelling detail in this spread?",
  "3 green flags to look for when hiring a book illustrator.",
  "I painted this for every child who felt too shy to speak.",
  "Watch this character's expression change when I voice them.",
  "Why your picture book needs 'quiet space' for text typography.",
  "From pencil sketch to voiced character: Meet Lulu.",
  "How to know if your manuscript is ready for illustrations.",
  "What a $10,000 picture book illustration timeline looks like.",
  "Illustrating bedtime stories: The psychology of warm palettes."
];

// ============================================================================
// 2. STATE MANAGEMENT & LOCAL STORAGE
// ============================================================================
const APP_STORAGE_KEY_SCRIPTS = "storycraft_saved_scripts_v2";
const APP_STORAGE_KEY_CHECKLIST = "storycraft_weekly_cadence_v2";

let savedScripts = [];
let activeGeneratedIdea = null;

function loadStoredData() {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY_SCRIPTS);
    if (raw) savedScripts = JSON.parse(raw);
  } catch (e) {
    savedScripts = [];
  }
  updateSavedBadge();
}

function saveStoredScripts() {
  try {
    localStorage.setItem(APP_STORAGE_KEY_SCRIPTS, JSON.stringify(savedScripts));
  } catch (e) {
    console.error("Storage save failed", e);
  }
  updateSavedBadge();
}

function updateSavedBadge() {
  const badge = document.getElementById("savedCountBadge");
  if (badge) badge.textContent = savedScripts.length;
}

// ============================================================================
// 3. TOAST NOTIFICATION UTILITY
// ============================================================================
let toastTimer = null;

function showToast(message = "Copied to clipboard!", icon = "✨") {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  const iconEl = toast.querySelector(".toast-icon");
  if (iconEl) iconEl.textContent = icon;

  toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function copyToClipboard(text, successMessage = "Copied to clipboard!") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage, "📋");
    }).catch(() => {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  showToast(successMessage, "📋");
}

// ============================================================================
// 4. NAVIGATION TAB SWITCHER
// ============================================================================
const navTabBtns = document.querySelectorAll(".nav-tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const currentTabTitle = document.getElementById("currentTabTitle");
const currentTabSubtitle = document.getElementById("currentTabSubtitle");

const TAB_METADATA = {
  "tab-generator": {
    title: "Hook & Content Idea Generator",
    subtitle: "Generate scroll-stopping hooks and ideas tailored for global publishers & picture book authors."
  },
  "tab-script-builder": {
    title: "Short-Form Video Script Planner",
    subtitle: "Craft 15-45 second video scripts with live 9:16 mobile mockup preview."
  },
  "tab-client-magnet": {
    title: "International Client Magnet Strategy",
    subtitle: "Weekly authority cadence and publishing readiness checklist for US/UK/global art directors."
  },
  "tab-vault": {
    title: "Saved Production Scripts Vault",
    subtitle: "Your private production library of drafted video scripts ready to film."
  },
  "tab-profile": {
    title: "Brand Positioning & Pitch Assets",
    subtitle: "Core positioning data, superpower articulation, and copyable bios for global outreach."
  }
};

function switchTab(tabId) {
  navTabBtns.forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  tabPanels.forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });

  if (TAB_METADATA[tabId]) {
    currentTabTitle.textContent = TAB_METADATA[tabId].title;
    currentTabSubtitle.textContent = TAB_METADATA[tabId].subtitle;
  }

  // Mobile sidebar auto-close
  const sidebar = document.querySelector(".dashboard-sidebar");
  if (sidebar) sidebar.classList.remove("mobile-open");

  if (tabId === "tab-vault") {
    renderVaultList();
  }
}

navTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    switchTab(btn.dataset.tab);
  });
});

// Mobile menu toggle
const mobileSidebarToggle = document.getElementById("mobileSidebarToggle");
if (mobileSidebarToggle) {
  mobileSidebarToggle.addEventListener("click", () => {
    const sidebar = document.querySelector(".dashboard-sidebar");
    if (sidebar) sidebar.classList.toggle("mobile-open");
  });
}

// ============================================================================
// 5. HOOK & IDEA GENERATOR ENGINE (TAB 1)
// ============================================================================
const generateIdeasBtn = document.getElementById("generateIdeasBtn");
const generatorResultsContainer = document.getElementById("generatorResultsContainer");
const pillarCards = document.querySelectorAll(".pillar-card");
const hookChipBtns = document.querySelectorAll(".chip-btn");

let selectedPillar = "art";
let selectedHookType = "scroll-stopper";

// Pillar selection
pillarCards.forEach(card => {
  card.addEventListener("click", () => {
    pillarCards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedPillar = card.dataset.pillar;
  });
});

// Hook category selection
hookChipBtns.forEach(chip => {
  chip.addEventListener("click", () => {
    hookChipBtns.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    selectedHookType = chip.dataset.hookType;
  });
});

function generateIdeas() {
  let pool = STRATEGY_DATABASE.slice();

  // Filter by pillar
  pool = pool.filter(item => item.pillar === selectedPillar);

  // Filter by hook type (unless random)
  if (selectedHookType !== "random") {
    const angleMatches = pool.filter(item => item.angle === selectedHookType);
    if (angleMatches.length > 0) pool = angleMatches;
  }

  // Shuffle pool
  pool.sort(() => 0.5 - Math.random());
  const selectedIdeas = pool.slice(0, 2);

  renderGeneratedIdeas(selectedIdeas);
}

function renderGeneratedIdeas(ideas) {
  if (!generatorResultsContainer) return;
  generatorResultsContainer.innerHTML = "";

  if (ideas.length === 0) {
    generatorResultsContainer.innerHTML = `
      <div class="card" style="text-align: center; padding: 30px;">
        <p style="color: var(--color-text-muted);">No exact match found for this filter combination. Try selecting "Surprise Me" or Pillar 2!</p>
      </div>
    `;
    return;
  }

  activeGeneratedIdea = ideas[0];

  ideas.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "generated-idea-card";

    const pillarNameMap = {
      art: "Pillar 1: Picture Book Art",
      vo: "Pillar 2: Character VO (Secret Sauce ⭐)",
      bts: "Pillar 3: Behind The Scenes"
    };

    const angleNameMap = {
      "scroll-stopper": "⚡ Scroll-Stopper",
      "emotional": "📖 Emotional Storytelling",
      "educational": "🎨 Craft & Educational",
      "client-magnet": "🧲 Direct Client Magnet"
    };

    card.innerHTML = `
      <div class="idea-card-header">
        <div class="idea-tag-group">
          <span class="idea-pillar-pill">${pillarNameMap[item.pillar] || item.pillar}</span>
          <span class="idea-angle-pill">${angleNameMap[item.angle] || item.angle}</span>
        </div>
        <span class="format-recommendation">🎯 Target: ${item.targetClient}</span>
      </div>

      <!-- Hook Spotlight Box -->
      <div class="hook-spotlight-box">
        <div class="hook-text-quote">"${item.hook}"</div>
        <button class="btn-copy-hook" data-hook="${encodeURIComponent(item.hook)}">
          📋 Copy Hook
        </button>
      </div>

      <!-- Strategy Grid -->
      <div class="strategy-breakdown-grid">
        <div class="breakdown-row">
          <div class="breakdown-subhead">📹 Visual Action Guide</div>
          <div class="breakdown-content">${item.visualAction}</div>
        </div>

        <div class="breakdown-row">
          <div class="breakdown-subhead">🎙️ Voiceover Script Line</div>
          <div class="breakdown-content mono">"${item.voScript}"</div>
        </div>
      </div>

      <div class="breakdown-row" style="margin-bottom: 16px; background: #FFF9F3; border-color: rgba(254, 212, 63, 0.4);">
        <div class="breakdown-subhead" style="color: #9A6700;">💡 Why This Attracts Global Clients</div>
        <div class="breakdown-content">${item.whyItWorks}</div>
      </div>

      <!-- Card Footer Actions -->
      <div class="idea-card-footer">
        <span style="font-size: 0.8rem; color: var(--color-text-muted);">Format: <strong>${item.platform}</strong></span>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary btn-sm send-to-builder-btn" data-index="${index}">
            🎬 Send to Script Builder
          </button>
          <button class="btn btn-secondary btn-sm quick-save-idea-btn" data-index="${index}">
            💾 Save Idea
          </button>
        </div>
      </div>
    `;

    // Hook copy button
    const copyBtn = card.querySelector(".btn-copy-hook");
    copyBtn.addEventListener("click", () => {
      copyToClipboard(item.hook, "Hook copied to clipboard!");
    });

    // Send to builder button
    const sendBtn = card.querySelector(".send-to-builder-btn");
    sendBtn.addEventListener("click", () => {
      populateScriptBuilderWithIdea(item);
      switchTab("tab-script-builder");
      showToast("Idea loaded into Script Studio!", "🎬");
    });

    // Quick save button
    const saveBtn = card.querySelector(".quick-save-idea-btn");
    saveBtn.addEventListener("click", () => {
      saveIdeaDirectly(item);
    });

    generatorResultsContainer.appendChild(card);
  });
}

if (generateIdeasBtn) {
  generateIdeasBtn.addEventListener("click", () => {
    generateIdeas();
  });
}

function saveIdeaDirectly(item) {
  const newScript = {
    id: "script-" + Date.now(),
    title: item.hook.substring(0, 45) + "...",
    platform: item.platform,
    pillar: item.pillar,
    hook: item.hook,
    visualAction: item.visualAction,
    voScript: item.voScript,
    cta: "If you're an author or publisher with a story waiting to be illustrated and voiced, my collaboration link is in my bio! 📚✨",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  };

  savedScripts.unshift(newScript);
  saveStoredScripts();
  showToast("Saved to Script Vault!", "💾");
}

// Quick Hooks Library Accordion & Rendering
const toggleCheatsheetHeader = document.getElementById("toggleCheatsheetHeader");
const cheatsheetBody = document.getElementById("cheatsheetBody");
const quickHooksGrid = document.getElementById("quickHooksGrid");

if (toggleCheatsheetHeader && cheatsheetBody) {
  toggleCheatsheetHeader.addEventListener("click", () => {
    const isOpen = cheatsheetBody.style.display !== "none";
    cheatsheetBody.style.display = isOpen ? "none" : "block";
    const arrow = toggleCheatsheetHeader.querySelector(".accordion-toggle-arrow");
    if (arrow) arrow.textContent = isOpen ? "▼" : "▲";
  });
}

function renderQuickHooks() {
  if (!quickHooksGrid) return;
  quickHooksGrid.innerHTML = "";

  QUICK_HOOKS_LIBRARY.forEach(hookText => {
    const item = document.createElement("div");
    item.className = "quick-hook-item";
    item.innerHTML = `
      <span>"${hookText}"</span>
      <button class="btn-text-tiny" title="Copy hook">Copy</button>
    `;

    item.querySelector("button").addEventListener("click", () => {
      copyToClipboard(hookText, "Hook copied!");
    });

    quickHooksGrid.appendChild(item);
  });
}

renderQuickHooks();

// ============================================================================
// 6. SHORT-FORM SCRIPT BUILDER & REAL-TIME PHONE MOCKUP (TAB 2)
// ============================================================================
const scriptBuilderForm = document.getElementById("scriptBuilderForm");
const scriptTitle = document.getElementById("scriptTitle");
const scriptPlatform = document.getElementById("scriptPlatform");
const scriptPillar = document.getElementById("scriptPillar");
const scriptHookText = document.getElementById("scriptHookText");
const scriptHookVisual = document.getElementById("scriptHookVisual");
const scriptVisualAction = document.getElementById("scriptVisualAction");
const scriptVoScript = document.getElementById("scriptVoScript");
const scriptCtaText = document.getElementById("scriptCtaText");
const ctaPresetSelector = document.getElementById("ctaPresetSelector");

// Phone Mockup Elements
const previewVisualCueText = document.getElementById("previewVisualCueText");
const previewHookCaption = document.getElementById("previewHookCaption");
const previewDialogueText = document.getElementById("previewDialogueText");
const previewCtaStrip = document.getElementById("previewCtaStrip");
const previewTimerEst = document.getElementById("previewTimerEst");

function updatePhoneMockup() {
  if (previewHookCaption && scriptHookText) {
    previewHookCaption.textContent = scriptHookText.value.trim() 
      ? `"${scriptHookText.value.trim()}"` 
      : `"What if your picture book character could actually talk?"`;
  }

  if (previewVisualCueText && scriptHookVisual) {
    previewVisualCueText.textContent = scriptHookVisual.value.trim() 
      ? scriptHookVisual.value.trim() 
      : "Close-up of illustration process & character expression";
  }

  if (previewDialogueText && scriptVoScript) {
    const snippet = scriptVoScript.value.trim().substring(0, 95);
    previewDialogueText.textContent = snippet 
      ? `"${snippet}${scriptVoScript.value.length > 95 ? "..." : ""}"`
      : `"Whenever I illustrate a new character, I find their voice first..."`;
  }

  if (previewCtaStrip && scriptCtaText) {
    previewCtaStrip.textContent = scriptCtaText.value.trim()
      ? scriptCtaText.value.trim().substring(0, 50) + "..."
      : "📚 Authors & Publishers: Link in bio to collaborate!";
  }

  // Calculate estimated duration
  if (scriptVoScript && previewTimerEst) {
    const wordCount = (scriptVoScript.value.trim().split(/\s+/).filter(Boolean).length) + 8;
    const estimatedSeconds = Math.max(12, Math.round(wordCount / 2.3));
    previewTimerEst.textContent = `~ ${estimatedSeconds}s Video`;
  }
}

// Live inputs listener
[scriptHookText, scriptHookVisual, scriptVisualAction, scriptVoScript, scriptCtaText].forEach(input => {
  if (input) input.addEventListener("input", updatePhoneMockup);
});

// CTA Preset Change
if (ctaPresetSelector && scriptCtaText) {
  ctaPresetSelector.addEventListener("change", () => {
    if (ctaPresetSelector.value !== "custom") {
      scriptCtaText.value = ctaPresetSelector.value;
      updatePhoneMockup();
    }
  });
}

// Paste Active Hook button
const pasteFromGeneratedHookBtn = document.getElementById("pasteFromGeneratedHookBtn");
if (pasteFromGeneratedHookBtn) {
  pasteFromGeneratedHookBtn.addEventListener("click", () => {
    if (activeGeneratedIdea) {
      scriptHookText.value = activeGeneratedIdea.hook;
      scriptHookVisual.value = activeGeneratedIdea.visualAction;
      updatePhoneMockup();
      showToast("Pasted active hook & visual cue!", "⚡");
    } else {
      scriptHookText.value = "What if your picture book character could actually talk?";
      updatePhoneMockup();
    }
  });
}

function populateScriptBuilderWithIdea(idea) {
  if (scriptTitle) scriptTitle.value = idea.hook.substring(0, 45);
  if (scriptHookText) scriptHookText.value = idea.hook;
  if (scriptHookVisual) scriptHookVisual.value = idea.visualAction;
  if (scriptVisualAction) scriptVisualAction.value = idea.visualAction;
  if (scriptVoScript) scriptVoScript.value = idea.voScript;
  updatePhoneMockup();
}

// Copy Full Production Script
const copyFullScriptBtn = document.getElementById("copyFullScriptBtn");
if (copyFullScriptBtn) {
  copyFullScriptBtn.addEventListener("click", () => {
    const fullText = formatScriptForClipboard();
    copyToClipboard(fullText, "Full Production Script copied!");
  });
}

function formatScriptForClipboard() {
  const title = scriptTitle.value || "Untitled Picture Book Reel";
  const platform = scriptPlatform.value;
  const pillar = scriptPillar.value;
  const hook = scriptHookText.value || "No hook set";
  const visualHook = scriptHookVisual.value || "-";
  const visualBody = scriptVisualAction.value || "-";
  const vo = scriptVoScript.value || "-";
  const cta = scriptCtaText.value || "-";

  return `🎬 PRODUCTION SCRIPT: ${title}
==================================================
📱 FORMAT: ${platform}
🎨 PILLAR: ${pillar}

⚡ 1. THE HOOK (0 - 3s)
--------------------------------------------------
[AUDIO/SPOKEN]: "${hook}"
[CAMERA VISUAL]: ${visualHook}

📹 2. MAIN STORY & ACTION (3 - 25s)
--------------------------------------------------
[VISUAL ACTION]:
${visualBody}

[VOICEOVER / VOICE ACTING DIALOGUE]:
"${vo}"

🧲 3. CALL TO ACTION (FINAL 5s)
--------------------------------------------------
"${cta}"

--------------------------------------------------
Suggested Hashtags:
#ChildrensBookIllustration #KidLitArt #PictureBookAuthor #VoiceActor #PictureBookIllustrator #BookPublishing #ArtDirector
==================================================`;
}

// Save Script to Vault
if (scriptBuilderForm) {
  scriptBuilderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newScript = {
      id: "script-" + Date.now(),
      title: scriptTitle.value.trim() || "Untitled Script",
      platform: scriptPlatform.value,
      pillar: scriptPillar.value,
      hook: scriptHookText.value.trim(),
      visualAction: scriptVisualAction.value.trim(),
      voScript: scriptVoScript.value.trim(),
      cta: scriptCtaText.value.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    savedScripts.unshift(newScript);
    saveStoredScripts();
    showToast("Script saved to your Production Vault!", "💾");
  });
}

// Reset Form
const clearScriptFormBtn = document.getElementById("clearScriptFormBtn");
if (clearScriptFormBtn) {
  clearScriptFormBtn.addEventListener("click", () => {
    if (confirm("Reset this script form?")) {
      scriptBuilderForm.reset();
      updatePhoneMockup();
    }
  });
}

// ============================================================================
// 7. SAVED SCRIPTS VAULT (TAB 4)
// ============================================================================
const vaultListGrid = document.getElementById("vaultListGrid");
const exportMarkdownVaultBtn = document.getElementById("exportMarkdownVaultBtn");
const clearVaultBtn = document.getElementById("clearVaultBtn");
const exportAllDataBtn = document.getElementById("exportAllDataBtn");

function renderVaultList() {
  if (!vaultListGrid) return;
  vaultListGrid.innerHTML = "";

  if (savedScripts.length === 0) {
    vaultListGrid.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <span style="font-size: 2.4rem; display: block; margin-bottom: 8px;">📂</span>
        <h4 style="font-size: 1.2rem; color: var(--color-primary);">Your Script Vault is Empty</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted); max-width: 440px; margin: 6px auto 16px auto;">
          Generate ideas in Tab 1 or build scripts in Tab 2, then click "Save to Script Vault" to save your production assets here.
        </p>
        <button class="btn btn-primary btn-sm" onclick="switchTab('tab-generator')">Go to Hook Generator ⚡</button>
      </div>
    `;
    return;
  }

  savedScripts.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "vault-item-card";

    card.innerHTML = `
      <div class="vault-item-header">
        <h4 class="vault-item-title">${item.title}</h4>
        <span class="vault-item-platform">${item.platform || "Reel"}</span>
      </div>

      <div class="vault-hook-preview">
        ⚡ Hook: "${item.hook}"
      </div>

      <div class="vault-vo-preview">
        🎙️ VO: "${item.voScript ? item.voScript.substring(0, 110) + '...' : '-'}"
      </div>

      <div class="vault-item-actions">
        <span class="vault-date-stamp">Saved on ${item.date || "Recently"}</span>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-secondary btn-sm copy-vault-item-btn" data-index="${index}">📋 Copy</button>
          <button class="btn-icon-tiny delete-vault-item-btn" data-index="${index}" title="Delete" style="color: #E03131;">🗑️</button>
        </div>
      </div>
    `;

    // Copy script
    card.querySelector(".copy-vault-item-btn").addEventListener("click", () => {
      const formatted = `🎬 SCRIPT: ${item.title}\n⚡ Hook: "${item.hook}"\n📹 Visual: ${item.visualAction}\n🎙️ VO: "${item.voScript}"\n🧲 CTA: "${item.cta}"`;
      copyToClipboard(formatted, "Script copied to clipboard!");
    });

    // Delete script
    card.querySelector(".delete-vault-item-btn").addEventListener("click", () => {
      if (confirm(`Delete "${item.title}"?`)) {
        savedScripts.splice(index, 1);
        saveStoredScripts();
        renderVaultList();
        showToast("Script removed", "🗑️");
      }
    });

    vaultListGrid.appendChild(card);
  });
}

// Export Vault as Markdown
function exportVaultAsMarkdown() {
  if (savedScripts.length === 0) {
    alert("Vault is currently empty. Generate and save some scripts first!");
    return;
  }

  let mdContent = `# 📚 StoryCraft Production Scripts Vault\n`;
  mdContent += `*Exported on ${new Date().toLocaleDateString()} for International Publishing Outreach*\n\n---\n\n`;

  savedScripts.forEach((s, idx) => {
    mdContent += `## ${idx + 1}. ${s.title}\n`;
    mdContent += `- **Format:** ${s.platform}\n`;
    mdContent += `- **Pillar:** ${s.pillar}\n`;
    mdContent += `- **Date Saved:** ${s.date}\n\n`;
    mdContent += `### ⚡ Hook (0 - 3s)\n> "${s.hook}"\n\n`;
    mdContent += `### 📹 Visual Action\n${s.visualAction}\n\n`;
    mdContent += `### 🎙️ Voiceover Script\n\`\`\`text\n${s.voScript}\n\`\`\`\n\n`;
    mdContent += `### 🧲 Client Magnet CTA\n"${s.cta}"\n\n---\n\n`;
  });

  const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `StoryCraft_Scripts_Vault_${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Downloaded Markdown file!", "📄");
}

if (exportMarkdownVaultBtn) exportMarkdownVaultBtn.addEventListener("click", exportVaultAsMarkdown);
if (exportAllDataBtn) exportAllDataBtn.addEventListener("click", exportVaultAsMarkdown);

if (clearVaultBtn) {
  clearVaultBtn.addEventListener("click", () => {
    if (savedScripts.length === 0) return;
    if (confirm("Are you sure you want to clear all saved scripts in the vault?")) {
      savedScripts = [];
      saveStoredScripts();
      renderVaultList();
      showToast("Vault cleared", "🗑️");
    }
  });
}

// ============================================================================
// 8. CLIENT MAGNET STRATEGY CHECKLIST (TAB 3)
// ============================================================================
const cadenceCheckboxes = document.querySelectorAll(".cadence-checkbox");
const weeklyProgressPercent = document.getElementById("weeklyProgressPercent");
const weeklyProgressFill = document.getElementById("weeklyProgressFill");
const resetWeeklyChecklistBtn = document.getElementById("resetWeeklyChecklistBtn");

function loadWeeklyChecklist() {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY_CHECKLIST);
    if (raw) {
      const state = JSON.parse(raw);
      cadenceCheckboxes.forEach(cb => {
        if (state[cb.id] !== undefined) {
          cb.checked = state[cb.id];
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
  updateWeeklyProgress();
}

function saveWeeklyChecklist() {
  const state = {};
  cadenceCheckboxes.forEach(cb => {
    state[cb.id] = cb.checked;
  });
  localStorage.setItem(APP_STORAGE_KEY_CHECKLIST, JSON.stringify(state));
  updateWeeklyProgress();
}

function updateWeeklyProgress() {
  if (!cadenceCheckboxes.length) return;
  const total = cadenceCheckboxes.length;
  let checkedCount = 0;
  cadenceCheckboxes.forEach(cb => {
    if (cb.checked) checkedCount++;
  });

  const percent = Math.round((checkedCount / total) * 100);
  if (weeklyProgressPercent) weeklyProgressPercent.textContent = `${percent}%`;
  if (weeklyProgressFill) weeklyProgressFill.style.width = `${percent}%`;

  if (percent === 100) {
    showToast("🎉 All 3 weekly authority posts completed!", "🏆");
  }
}

cadenceCheckboxes.forEach(cb => {
  cb.addEventListener("change", saveWeeklyChecklist);
});

if (resetWeeklyChecklistBtn) {
  resetWeeklyChecklistBtn.addEventListener("click", () => {
    if (confirm("Reset this week's checklist?")) {
      cadenceCheckboxes.forEach(cb => cb.checked = false);
      saveWeeklyChecklist();
      showToast("Checklist reset for new week", "📅");
    }
  });
}

// ============================================================================
// 9. COPY ELEVATOR PITCH & BRAND BIOS
// ============================================================================
const copySidebarPitchBtn = document.getElementById("copySidebarPitchBtn");
const sidebarElevatorPitch = document.getElementById("sidebarElevatorPitch");

if (copySidebarPitchBtn && sidebarElevatorPitch) {
  copySidebarPitchBtn.addEventListener("click", () => {
    copyToClipboard(sidebarElevatorPitch.textContent.trim(), "Elevator Pitch copied!");
  });
}

document.querySelectorAll(".copy-bio-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      copyToClipboard(targetEl.textContent.trim(), "Bio copied to clipboard!");
    }
  });
});

// ============================================================================
// 10. INITIALIZATION
// ============================================================================
window.addEventListener("DOMContentLoaded", () => {
  loadStoredData();
  loadWeeklyChecklist();

  // Initial generation
  generateIdeas();
  updatePhoneMockup();
});
