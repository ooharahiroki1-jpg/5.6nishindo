const doc = document;
const body = doc.body;
const header = doc.querySelector(".site-header");
const menuToggle = doc.querySelector(".menu-toggle");
const mobileMenu = doc.querySelector(".mobile-menu");
const mobileLinks = [...doc.querySelectorAll(".mobile-menu a")];
const revealTargets = [...doc.querySelectorAll(".reveal")];
const faqButtons = [...doc.querySelectorAll(".faq-question")];
const faqItems = [...doc.querySelectorAll("[data-faq-item]")];
const faqSearchInput = doc.getElementById("faq-search-input");
const faqSearchStatus = doc.getElementById("faq-search-status");
const fitHeadings = [...doc.querySelectorAll(".fit-heading")];
const contactForm = doc.querySelector(".contact-form");
const contactMessage = contactForm?.querySelector('textarea[name="message"]');
const contactMethod = contactForm?.querySelector('select[name="contact_method"]');
const ctaDock = doc.querySelector(".cta-dock");
const ctaDockPrimary = doc.getElementById("cta-dock-primary");
const heroSection = doc.querySelector(".hero");
const contactSection = doc.getElementById("contact");
const qaAudit = doc.getElementById("qa-audit");
const sectionsWithCta = [...doc.querySelectorAll("[data-cta-label]")];
const trackTargets = [...doc.querySelectorAll("[data-track]")];
const diagnosisButtons = [...doc.querySelectorAll("[data-diagnosis-group]")];
const diagnosisTitle = doc.getElementById("diagnosis-title");
const diagnosisText = doc.getElementById("diagnosis-text");
const diagnosisMeta = doc.getElementById("diagnosis-meta");
const diagnosisPoints = doc.getElementById("diagnosis-points");
const storyCards = [...doc.querySelectorAll("[data-story-card]")];
const storyPhoto = doc.getElementById("story-photo");
const storyYear = doc.getElementById("story-year");
const storyHeadline = doc.getElementById("story-headline");
const storyText = doc.getElementById("story-text");
const teacherDialog = doc.getElementById("teacher-dialog");
const teacherDialogOpeners = [...doc.querySelectorAll("[data-open-teacher-dialog]")];
const teacherDialogClosers = [...doc.querySelectorAll("[data-close-teacher-dialog]")];
const teacherVoiceButtons = [...doc.querySelectorAll("[data-teacher-voice]")];
const teacherAudio = doc.getElementById("teacher-audio");
const teacherDemoPhoto = doc.getElementById("teacher-demo-photo");
const teacherDemoKicker = doc.getElementById("teacher-demo-kicker");
const teacherDemoTitle = doc.getElementById("teacher-demo-title");
const teacherDemoText = doc.getElementById("teacher-demo-text");
const teacherDemoToggle = doc.getElementById("teacher-demo-toggle");
const lineDialog = doc.getElementById("line-dialog");
const lineDialogOpeners = [...doc.querySelectorAll("[data-open-line-dialog]")];
const lineDialogClosers = [...doc.querySelectorAll("[data-close-line-dialog]")];
const lineFillButtons = [...doc.querySelectorAll("[data-line-fill]")];
const lineToFormButton = doc.querySelector("[data-line-to-form]");
const filterButtons = [...doc.querySelectorAll("[data-filter-group]")];
const courseCards = [...doc.querySelectorAll("[data-course-card]")];
const courseEmpty = doc.getElementById("course-empty");
const tourButtons = [...doc.querySelectorAll("[data-tour-item]")];
const tourPhoto = doc.getElementById("tour-photo");
const tourKicker = doc.getElementById("tour-kicker");
const tourTitle = doc.getElementById("tour-title");
const tourText = doc.getElementById("tour-text");
const flowButtons = [...doc.querySelectorAll("[data-flow-step]")];
const flowPhoto = doc.getElementById("flow-photo");
const flowTitle = doc.getElementById("flow-title");
const flowText = doc.getElementById("flow-text");
const flowNote = doc.getElementById("flow-note");
let auditTimer = null;
let teacherDemoIndex = 0;
let teacherDemoTimer = null;

const diagnosisState = {
  grade: "",
  experience: "",
  concern: ""
};

const courseFilters = {
  grade: "all",
  purpose: "all"
};

const diagnosisMessages = {
  shy: {
    title: "相性がよさそうです",
    text: "人見知りへの不安が強いなら、1対1で慣れる所から始められる体験相談が向いています。",
    meta: "おすすめ: まずは先生との相性確認",
    points: ["最初は会話から入れる", "親もそばで流れを確認できる", "無理に弾かせない"]
  },
  continue: {
    title: "続けやすい入口です",
    text: "続くか不安な場合は、好きな曲や小さな目標から始めて成功体験を作る導線が合います。",
    meta: "おすすめ: 好きな曲で続けるコース",
    points: ["練習量を急に増やさない", "できたを毎回残す", "親へ進め方も共有する"]
  },
  school: {
    title: "目標型の相談が向いています",
    text: "伴奏や学校との両立が気になるなら、通う意味が見えやすい個人レッスンとの相性が高めです。",
    meta: "おすすめ: 学校伴奏サポート",
    points: ["目標曲に合わせて進められる", "学校行事との両立を相談できる", "親も意味を感じやすい"]
  },
  default: {
    title: "3つ選ぶと結果が出ます",
    text: "まだ入力前です。選択がそろうと、おすすめの入り方と相談ポイントを表示します。",
    meta: "おすすめ: 体験前に教室の雰囲気を確認",
    points: ["先生との相性", "通いやすさ", "親の相談しやすさ"]
  }
};

const teacherDemoScenes = [
  {
    kicker: "先生のごあいさつ",
    title: "まずは安心して通えることを大切にしています",
    text: "最初は会話から入り、表情を見ながらその子のペースを整えていきます。",
    photo: "photo--teacher-video"
  },
  {
    kicker: "レッスンの考え方",
    title: "比べず、急がせず、できたを増やす",
    text: "一人ひとりの前回より少し進める感覚を大事にし、音楽そのものを好きになれるように進めます。",
    photo: "photo--teacher"
  },
  {
    kicker: "保護者への共有",
    title: "親御さんにもその日の様子を伝えます",
    text: "家での声かけや練習のコツまで共有し、通う意味が親にも見える状態をつくります。",
    photo: "photo--story-d"
  }
];

const updateHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

const trackEvent = (name, detail = {}) => {
  window.dataLayer = window.dataLayer || [];
  const payload = {
    event: name,
    ...detail
  };
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", name, detail);
  }

  console.log("track-event", JSON.stringify(payload));
};

const toggleMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.classList.toggle("is-open", !expanded);
  body.classList.toggle("menu-open", !expanded);
  syncDockVisibility();
};

const closeMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
  body.classList.remove("menu-open");
  syncDockVisibility();
};

const applyHeadingFit = () => {
  fitHeadings.forEach((heading) => {
    const computed = getComputedStyle(heading);
    const originalSize = Number(heading.dataset.baseSize || "0") || parseFloat(computed.fontSize);
    const allowedLines = Number(heading.dataset.lines || "1");
    const minSize = Number(heading.dataset.min || "18");

    if (!heading.dataset.baseSize) {
      heading.dataset.baseSize = String(originalSize);
    }

    heading.style.fontSize = `${originalSize}px`;
    heading.style.whiteSpace = allowedLines === 1 ? "nowrap" : "normal";

    if (heading.clientWidth === 0) return;

    let currentSize = originalSize;
    let lineHeight = parseFloat(getComputedStyle(heading).lineHeight);

    while (
      currentSize > minSize &&
      (heading.scrollWidth > heading.clientWidth + 1 ||
        heading.getBoundingClientRect().height > lineHeight * allowedLines + 1)
    ) {
      currentSize -= 1;
      heading.style.fontSize = `${currentSize}px`;
      lineHeight = parseFloat(getComputedStyle(heading).lineHeight);
    }
  });
};

const measureHeadingLines = (heading) => {
  if (!(heading instanceof HTMLElement)) return 0;
  const range = document.createRange();
  range.selectNodeContents(heading);
  const rects = [...range.getClientRects()].filter((rect) => rect.width > 0 && rect.height > 0);
  return rects.length || 0;
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
);

const storyObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;
    const target = visibleEntry.target;
    if (!(target instanceof HTMLElement)) return;
    setActiveStory(target);
  },
  {
    threshold: [0.4, 0.6, 0.8],
    rootMargin: "-10% 0px -20% 0px"
  }
);

const toggleFaq = (button) => {
  const answer = button.nextElementSibling;
  const expanded = button.getAttribute("aria-expanded") === "true";

  faqButtons.forEach((otherButton) => {
    if (otherButton === button) return;
    otherButton.setAttribute("aria-expanded", "false");
    const otherAnswer = otherButton.nextElementSibling;
    if (otherAnswer instanceof HTMLElement) {
      otherAnswer.style.maxHeight = null;
    }
  });

  button.setAttribute("aria-expanded", String(!expanded));

  if (!(answer instanceof HTMLElement)) return;
  answer.style.maxHeight = expanded ? null : `${answer.scrollHeight}px`;
};

const updateDiagnosis = () => {
  if (!diagnosisTitle || !diagnosisText || !diagnosisMeta || !diagnosisPoints) return;

  const ready = Object.values(diagnosisState).every(Boolean);
  const concern = diagnosisState.concern || "default";
  const grade = diagnosisState.grade;
  const experience = diagnosisState.experience;

  if (!ready) {
    const state = diagnosisMessages.default;
    diagnosisTitle.textContent = state.title;
    diagnosisText.textContent = state.text;
    diagnosisMeta.textContent = state.meta;
    diagnosisPoints.innerHTML = state.points.map((point) => `<li>${point}</li>`).join("");
    return;
  }

  let state = diagnosisMessages[concern] || diagnosisMessages.default;

  if (grade === "middle" && experience === "goal") {
    state = {
      title: "目標達成型の相性です",
      text: "中学生で目標曲があるなら、伴奏や発表会にも寄り添える1対1の設計が活きます。",
      meta: "おすすめ: 中学生の継続コース",
      points: ["部活や学校と両立しやすい", "目標に合わせて調整できる", "親も進み方を把握しやすい"]
    };
  }

  if (grade === "early" && concern === "shy") {
    state = {
      title: "最初の入口に向いています",
      text: "低学年で人見知りなら、慣れる所から始められる個人レッスンとの相性が特に高い想定です。",
      meta: "おすすめ: はじめての個人レッスン",
      points: ["会話と音遊びから始める", "親も近くで見守りやすい", "レッスン時間を短く調整しやすい"]
    };
  }

  diagnosisTitle.textContent = state.title;
  diagnosisText.textContent = state.text;
  diagnosisMeta.textContent = state.meta;
  diagnosisPoints.innerHTML = state.points.map((point) => `<li>${point}</li>`).join("");

  trackEvent("diagnosis_result_view", { ...diagnosisState, result: state.meta });
};

const setDiagnosisChoice = (button) => {
  if (!(button instanceof HTMLElement)) return;
  const group = button.dataset.diagnosisGroup;
  const value = button.dataset.diagnosisValue;
  if (!group || !value) return;

  diagnosisButtons
    .filter((item) => item.dataset.diagnosisGroup === group)
    .forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });

  diagnosisState[group] = value;
  updateDiagnosis();
};

const setActiveStory = (button) => {
  if (!(button instanceof HTMLElement) || !storyPhoto || !storyYear || !storyHeadline || !storyText) return;

  storyCards.forEach((card) => {
    card.classList.toggle("is-active", card === button);
    card.setAttribute("aria-pressed", String(card === button));
  });

  const nextPhoto = button.dataset.storyPhoto;
  if (nextPhoto) {
    const photoClasses = [...storyPhoto.classList].filter((name) => name.startsWith("photo--story-"));
    storyPhoto.classList.remove(...photoClasses);
    storyPhoto.classList.add(nextPhoto);
  }

  storyYear.textContent = button.dataset.storyYear || "";
  storyHeadline.textContent = button.dataset.storyHeadline || "";
  storyText.textContent = button.dataset.storyText || "";
  scheduleAudit();
};

const openTeacherDialog = () => {
  if (!(teacherDialog instanceof HTMLDialogElement)) return;
  if (!teacherDialog.open) {
    teacherDialog.showModal();
  }
  body.classList.add("menu-open");
  startTeacherDemo();
  syncDockVisibility();
  scheduleAudit();
};

const closeTeacherDialog = () => {
  if (!(teacherDialog instanceof HTMLDialogElement)) return;
  if (teacherDialog.open) {
    teacherDialog.close();
  }
  body.classList.remove("menu-open");
  stopTeacherAudio();
  stopTeacherDemo();
  syncDockVisibility();
};

const setTeacherDemoScene = (index) => {
  if (!teacherDemoPhoto || !teacherDemoKicker || !teacherDemoTitle || !teacherDemoText) return;
  const scene = teacherDemoScenes[index];
  if (!scene) return;

  const photoClasses = [...teacherDemoPhoto.classList].filter((name) => name.startsWith("photo--"));
  teacherDemoPhoto.classList.remove(...photoClasses);
  teacherDemoPhoto.classList.add("photo", scene.photo);
  teacherDemoKicker.textContent = scene.kicker;
  teacherDemoTitle.textContent = scene.title;
  teacherDemoText.textContent = scene.text;
  scheduleAudit();
};

const advanceTeacherDemo = () => {
  teacherDemoIndex = (teacherDemoIndex + 1) % teacherDemoScenes.length;
  setTeacherDemoScene(teacherDemoIndex);
};

const startTeacherDemo = () => {
  if (!teacherDemoToggle) return;
  stopTeacherDemo();
  setTeacherDemoScene(teacherDemoIndex);
  teacherDemoTimer = window.setInterval(advanceTeacherDemo, 2400);
  teacherDemoToggle.textContent = "プレビュー停止";
};

const stopTeacherDemo = () => {
  if (teacherDemoTimer) {
    window.clearInterval(teacherDemoTimer);
    teacherDemoTimer = null;
  }
  if (teacherDemoToggle) {
    teacherDemoToggle.textContent = "プレビュー再生";
  }
};

const toggleTeacherDemo = () => {
  if (teacherDemoTimer) {
    stopTeacherDemo();
    return;
  }
  startTeacherDemo();
};

const toggleTeacherAudio = () => {
  if (!(teacherAudio instanceof HTMLMediaElement)) return;

  if (!teacherAudio.paused) {
    stopTeacherAudio();
    return;
  }

  teacherAudio.currentTime = 0;
  teacherAudio.play().catch(() => {
    teacherVoiceButtons.forEach((button) => {
      if (button instanceof HTMLElement) {
        button.textContent = "再生できません";
      }
    });
  });
  teacherVoiceButtons.forEach((button) => {
    if (button instanceof HTMLElement) {
      button.textContent = "音声を止める";
    }
  });
};

const stopTeacherAudio = () => {
  if (teacherAudio instanceof HTMLMediaElement) {
    teacherAudio.pause();
    teacherAudio.currentTime = 0;
  }
  teacherVoiceButtons.forEach((button) => {
    if (button instanceof HTMLElement) {
      button.textContent = "音声を再生";
    }
  });
};

const openLineDialog = (prefill = "") => {
  if (!(lineDialog instanceof HTMLDialogElement)) return;
  if (!lineDialog.open) {
    lineDialog.showModal();
  }
  if (contactMessage instanceof HTMLTextAreaElement && prefill) {
    contactMessage.value = prefill;
  }
  if (contactMethod instanceof HTMLSelectElement) {
    contactMethod.value = "LINEを希望";
  }
  body.classList.add("menu-open");
  syncDockVisibility();
};

const closeLineDialog = () => {
  if (!(lineDialog instanceof HTMLDialogElement)) return;
  if (lineDialog.open) {
    lineDialog.close();
  }
  body.classList.remove("menu-open");
  syncDockVisibility();
};

const fillLineMessage = (message) => {
  if (contactMessage instanceof HTMLTextAreaElement) {
    contactMessage.value = message;
  }
  if (contactMethod instanceof HTMLSelectElement) {
    contactMethod.value = "LINEを希望";
  }
};

const moveLineToForm = () => {
  fillLineMessage(contactMessage instanceof HTMLTextAreaElement ? contactMessage.value || "LINEで相談したいです。" : "LINEで相談したいです。");
  closeLineDialog();
  contactForm?.scrollIntoView({ behavior: "smooth", block: "start" });
  trackEvent("line_demo_to_form", { message: contactMessage instanceof HTMLTextAreaElement ? contactMessage.value : "" });
};

const applyCourseFilters = () => {
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const grades = (card.dataset.grades || "").split(" ");
    const purposes = (card.dataset.purposes || "").split(" ");
    const gradeMatch = courseFilters.grade === "all" || grades.includes(courseFilters.grade);
    const purposeMatch = courseFilters.purpose === "all" || purposes.includes(courseFilters.purpose);
    const visible = gradeMatch && purposeMatch;

    card.classList.toggle("is-hidden", !visible);
    if (visible) visibleCount += 1;
  });

  if (courseEmpty) {
    courseEmpty.hidden = visibleCount !== 0;
  }
};

const setCourseFilter = (button) => {
  if (!(button instanceof HTMLElement)) return;
  const group = button.dataset.filterGroup;
  const value = button.dataset.filterValue;
  if (!group || !value) return;

  filterButtons
    .filter((item) => item.dataset.filterGroup === group)
    .forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });

  courseFilters[group] = value;
  applyCourseFilters();
  trackEvent("course_filter", { ...courseFilters });
};

const setActiveTour = (button) => {
  if (!(button instanceof HTMLElement) || !tourPhoto || !tourKicker || !tourTitle || !tourText) return;

  tourButtons.forEach((item) => {
    item.classList.toggle("is-active", item === button);
    item.setAttribute("aria-pressed", String(item === button));
  });

  const nextPhoto = button.dataset.tourPhoto;
  if (nextPhoto) {
    const photoClasses = [...tourPhoto.classList].filter((name) => name.startsWith("photo--tour-"));
    tourPhoto.classList.remove(...photoClasses);
    tourPhoto.classList.add(nextPhoto);
  }

  tourKicker.textContent = button.dataset.tourKicker || "";
  tourTitle.textContent = button.dataset.tourTitle || "";
  tourText.textContent = button.dataset.tourText || "";
  scheduleAudit();
};

const setActiveFlow = (button) => {
  if (!(button instanceof HTMLElement) || !flowPhoto || !flowTitle || !flowText || !flowNote) return;

  flowButtons.forEach((item) => {
    item.classList.toggle("is-active", item === button);
    item.setAttribute("aria-selected", String(item === button));
  });

  const nextPhoto = button.dataset.flowPhoto;
  if (nextPhoto) {
    const photoClasses = [...flowPhoto.classList].filter((name) => name.startsWith("photo--flow-"));
    flowPhoto.classList.remove(...photoClasses);
    flowPhoto.classList.add(nextPhoto);
  }

  flowTitle.textContent = button.dataset.flowTitle || "";
  flowText.textContent = button.dataset.flowText || "";
  flowNote.textContent = button.dataset.flowNote || "";
  scheduleAudit();
};

const filterFaq = () => {
  if (!(faqSearchInput instanceof HTMLInputElement) || !faqSearchStatus) return;

  const query = faqSearchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")?.textContent?.toLowerCase() || "";
    const answer = item.querySelector(".faq-answer")?.textContent?.toLowerCase() || "";
    const keywords = (item.getAttribute("data-keywords") || "").toLowerCase();
    const visible = !query || [question, answer, keywords].some((text) => text.includes(query));

    item.classList.toggle("is-hidden", !visible);

    if (!visible) {
      const button = item.querySelector(".faq-question");
      const answerElement = item.querySelector(".faq-answer");
      if (button instanceof HTMLElement) {
        button.setAttribute("aria-expanded", "false");
      }
      if (answerElement instanceof HTMLElement) {
        answerElement.style.maxHeight = null;
      }
    }

    if (visible) visibleCount += 1;
  });

  faqSearchStatus.textContent = `${visibleCount}件の質問を表示しています。`;
};

const syncDockLabel = () => {
  if (!ctaDockPrimary) return;

  const headerOffset = (header?.getBoundingClientRect().height || 0) + 28;
  const current = sectionsWithCta.find((section) => {
    if (!(section instanceof HTMLElement)) return false;
    const rect = section.getBoundingClientRect();
    return rect.top <= headerOffset && rect.bottom > headerOffset;
  });

  if (!(current instanceof HTMLElement)) {
    ctaDockPrimary.textContent = "体験相談";
    ctaDockPrimary.setAttribute("href", "#contact");
    return;
  }

  ctaDockPrimary.textContent = current.dataset.ctaLabel || "体験相談";
  ctaDockPrimary.setAttribute("href", current.dataset.ctaTarget || "#contact");
};

const syncDockVisibility = () => {
  if (!ctaDock) return;

  const menuOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  const heroVisible =
    heroSection instanceof HTMLElement &&
    heroSection.getBoundingClientRect().bottom > Math.min(window.innerHeight * 0.7, 560);
  const contactVisible =
    contactSection instanceof HTMLElement &&
    contactSection.getBoundingClientRect().top < window.innerHeight &&
    contactSection.getBoundingClientRect().bottom > 0;
  const formFocused =
    contactForm instanceof HTMLElement &&
    doc.activeElement instanceof HTMLElement &&
    contactForm.contains(doc.activeElement);
  const dialogOpen =
    (teacherDialog instanceof HTMLDialogElement && teacherDialog.open) ||
    (lineDialog instanceof HTMLDialogElement && lineDialog.open);

  ctaDock.classList.toggle("is-hidden", Boolean(menuOpen || heroVisible || contactVisible || formFocused || dialogOpen));
};

const buildAudit = () => {
  const overflowX = Math.max(0, doc.documentElement.scrollWidth - window.innerWidth);
  const headingIssues = [...doc.querySelectorAll("h1, h2, h3")]
    .filter((heading) => heading instanceof HTMLElement && heading.clientWidth > 0)
    .map((heading) => {
      const lines = measureHeadingLines(heading) || 1;
      const allowedLines = Number(heading.dataset.lines || "1");

      return {
        text: heading.textContent?.trim() || "",
        lines,
        allowedLines,
        overflow: Math.max(0, heading.scrollWidth - heading.clientWidth)
      };
    })
    .filter((item) => item.lines > item.allowedLines || item.overflow > 1);

  const formClipped = contactForm instanceof HTMLElement ? contactForm.scrollWidth > contactForm.clientWidth + 1 : false;
  const mediaBroken = [
    ...doc.querySelectorAll(".photo, .compare-card, .price-card, .case-card, .contact-form, .tour-preview, .map-card")
  ].some((element) => element instanceof HTMLElement && element.scrollWidth > element.clientWidth + 1);

  const audit = {
    width: window.innerWidth,
    overflowX,
    headingIssues,
    formClipped,
    mediaBroken,
    faqVisibleCount: faqItems.filter((item) => !item.classList.contains("is-hidden")).length,
    dockHidden: ctaDock?.classList.contains("is-hidden") ?? null
  };

  if (qaAudit) {
    qaAudit.textContent = JSON.stringify(audit);
  }

  console.log("qa-audit", JSON.stringify(audit));
};

const scheduleAudit = () => {
  window.clearTimeout(auditTimer);
  auditTimer = window.setTimeout(() => {
    applyHeadingFit();
    syncDockLabel();
    buildAudit();
  }, 70);
};

menuToggle?.addEventListener("click", toggleMenu);
mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));
faqButtons.forEach((button) => button.addEventListener("click", () => toggleFaq(button)));
diagnosisButtons.forEach((button) => button.addEventListener("click", () => setDiagnosisChoice(button)));
storyCards.forEach((button) => {
  button.addEventListener("click", () => setActiveStory(button));
  storyObserver.observe(button);
});
teacherDialogOpeners.forEach((button) => button.addEventListener("click", openTeacherDialog));
teacherDialogClosers.forEach((button) =>
  button.addEventListener("click", (event) => {
    event.preventDefault();
    closeTeacherDialog();
    const href = button.getAttribute("href");
    if (href) {
      window.location.hash = href.replace("#", "");
    }
  })
);
teacherVoiceButtons.forEach((button) => button.addEventListener("click", toggleTeacherAudio));
teacherDemoToggle?.addEventListener("click", toggleTeacherDemo);
lineDialogOpeners.forEach((button) =>
  button.addEventListener("click", () => {
    if (!(button instanceof HTMLElement)) return;
    openLineDialog(button.dataset.linePrefill || "");
  })
);
lineDialogClosers.forEach((button) =>
  button.addEventListener("click", (event) => {
    event.preventDefault();
    closeLineDialog();
  })
);
lineFillButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (!(button instanceof HTMLElement)) return;
    fillLineMessage(button.dataset.lineFill || "");
  })
);
lineToFormButton?.addEventListener("click", moveLineToForm);
teacherAudio?.addEventListener("ended", stopTeacherAudio);
filterButtons.forEach((button) => button.addEventListener("click", () => setCourseFilter(button)));
tourButtons.forEach((button) => button.addEventListener("click", () => setActiveTour(button)));
flowButtons.forEach((button) => button.addEventListener("click", () => setActiveFlow(button)));
faqSearchInput?.addEventListener("input", filterFaq);
trackTargets.forEach((element) =>
  element.addEventListener("click", () => {
    if (!(element instanceof HTMLElement)) return;
    trackEvent(element.dataset.track || "cta_click", { label: element.textContent?.trim() || "" });
  })
);

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  trackEvent("form_submit", { path: "thanks.html" });
  window.location.href = contactForm.getAttribute("action") || "thanks.html";
});

teacherDialog?.addEventListener("click", (event) => {
  if (!(teacherDialog instanceof HTMLDialogElement)) return;
  const panel = teacherDialog.querySelector(".teacher-dialog__panel");
  if (!(panel instanceof HTMLElement)) return;
  const rect = panel.getBoundingClientRect();
  const clickInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!clickInside) {
    closeTeacherDialog();
  }
});

teacherDialog?.addEventListener("close", () => {
  body.classList.remove("menu-open");
  stopTeacherAudio();
  stopTeacherDemo();
  syncDockVisibility();
});

lineDialog?.addEventListener("click", (event) => {
  if (!(lineDialog instanceof HTMLDialogElement)) return;
  const panel = lineDialog.querySelector(".line-dialog__panel");
  if (!(panel instanceof HTMLElement)) return;
  const rect = panel.getBoundingClientRect();
  const clickInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!clickInside) {
    closeLineDialog();
  }
});

lineDialog?.addEventListener("close", () => {
  body.classList.remove("menu-open");
  syncDockVisibility();
});

window.addEventListener(
  "scroll",
  () => {
    updateHeaderState();
    syncDockLabel();
    syncDockVisibility();
  },
  { passive: true }
);

window.addEventListener("resize", scheduleAudit);
window.addEventListener("load", scheduleAudit);
window.addEventListener("focusin", syncDockVisibility);
window.addEventListener("focusout", syncDockVisibility);

revealTargets.forEach((target) => revealObserver.observe(target));

applyHeadingFit();
updateDiagnosis();
applyCourseFilters();
filterFaq();
setTeacherDemoScene(0);
stopTeacherAudio();
if (storyCards[0]) setActiveStory(storyCards[0]);
if (tourButtons[0]) setActiveTour(tourButtons[0]);
if (flowButtons[0]) setActiveFlow(flowButtons[0]);
buildAudit();
updateHeaderState();
syncDockLabel();
syncDockVisibility();
