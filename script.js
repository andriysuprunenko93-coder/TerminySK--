const siteConfig = {
  brandName: "TerminySK",
  telegramHandle: "@terminysk",
  telegramUrl: "https://t.me/terminysk",
  telegramChannelUrl: "https://t.me/SlovakiaInfo1",
  tiktokUrl: "https://www.tiktok.com/@minskterminy",
  whatsappNumber: "+421950703432"
};

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = value;
  }
};

const setLink = (id, href, text) => {
  const node = document.getElementById(id);
  if (node) {
    node.href = href;
    if (text) {
      node.textContent = text;
    }
  }
};

setText("heroHandle", siteConfig.telegramHandle);

const whatsappDigits = siteConfig.whatsappNumber.replace(/\D+/g, "");
const whatsappUrl = `https://wa.me/${whatsappDigits}`;

const trackEvent = (name, data = {}) => {
  if (typeof window !== "undefined" && typeof window.va === "function") {
    try {
      window.va("event", { name, data });
    } catch (error) {
      // Ignore analytics transport issues so UI behavior stays unaffected.
    }
  }
};

setLink("headerTelegram", siteConfig.telegramUrl, "Telegram");
setLink("headerChannel", siteConfig.telegramChannelUrl, "TG канал");
setLink("headerTiktok", siteConfig.tiktokUrl, "TikTok");
setLink("headerWhatsApp", whatsappUrl, "WhatsApp");
setLink("heroTelegram", siteConfig.telegramUrl);
setLink("heroChannel", siteConfig.telegramChannelUrl, "TG канал");
setLink("heroWhatsApp", whatsappUrl);
setLink("channelButton", siteConfig.telegramChannelUrl);
setLink("faqWhatsApp", whatsappUrl, "Написати в WhatsApp");
setLink("faqTelegram", siteConfig.telegramUrl, "Написати в Telegram");
setLink("contactChannel", siteConfig.telegramChannelUrl);
setLink("contactWhatsApp", whatsappUrl, `WhatsApp: ${siteConfig.whatsappNumber}`);
setLink("contactTelegram", siteConfig.telegramUrl);
setLink("contactTiktok", siteConfig.tiktokUrl);
setLink("footerTelegram", siteConfig.telegramUrl);
setLink("footerChannel", siteConfig.telegramChannelUrl);
setLink("footerTiktok", siteConfig.tiktokUrl);
setLink("footerWhatsApp", whatsappUrl);

document.title = `${siteConfig.brandName} | Документи в Словаччині`;

document.querySelectorAll("[data-telegram-link]").forEach((node) => {
  node.href = siteConfig.telegramUrl;
});

document.querySelectorAll("[data-telegram-channel-link]").forEach((node) => {
  node.href = siteConfig.telegramChannelUrl;
});

document.querySelectorAll("[data-tiktok-link]").forEach((node) => {
  node.href = siteConfig.tiktokUrl;
});

document.querySelectorAll("[data-whatsapp-link]").forEach((node) => {
  node.href = whatsappUrl;
});

const pageTitle = document.body?.dataset?.pageTitle;
if (pageTitle) {
  document.title = pageTitle;
}

[
  ["[data-telegram-link]", "telegram"],
  ["[data-telegram-channel-link]", "telegram_channel"],
  ["[data-tiktok-link]", "tiktok"],
  ["[data-whatsapp-link]", "whatsapp"]
].forEach(([selector, channel]) => {
  document.querySelectorAll(selector).forEach((node) => {
    node.addEventListener("click", () =>
      trackEvent("cta_click", {
        placement: node.dataset.placement || "page",
        channel
      })
    );
  });
});

const navLinks = [...document.querySelectorAll(".nav-link")];
const navMap = new Map(navLinks.map((link) => [link.getAttribute("href"), link]));
const sections = [...document.querySelectorAll("section[id]")];

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveNav(visible.target.id);
      }
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0.2, 0.35, 0.55]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href");
    if (href && navMap.has(href)) {
      setActiveNav(href.slice(1));
      trackEvent("nav_click", { target: href.slice(1) });
    }
  });
});

[
  ["headerTelegram", "cta_click", { placement: "header", channel: "telegram" }],
  ["headerChannel", "cta_click", { placement: "header", channel: "telegram_channel" }],
  ["headerTiktok", "cta_click", { placement: "header", channel: "tiktok" }],
  ["headerWhatsApp", "cta_click", { placement: "header", channel: "whatsapp" }],
  ["heroTelegram", "cta_click", { placement: "hero", channel: "telegram" }],
  ["heroChannel", "cta_click", { placement: "hero", channel: "telegram_channel" }],
  ["heroWhatsApp", "cta_click", { placement: "hero", channel: "whatsapp" }],
  ["channelButton", "cta_click", { placement: "channel_section", channel: "telegram_channel" }],
  ["faqWhatsApp", "cta_click", { placement: "faq", channel: "whatsapp" }],
  ["faqTelegram", "cta_click", { placement: "faq", channel: "telegram" }],
  ["contactWhatsApp", "cta_click", { placement: "contact", channel: "whatsapp" }],
  ["contactTelegram", "cta_click", { placement: "contact", channel: "telegram" }],
  ["contactChannel", "cta_click", { placement: "contact", channel: "telegram_channel" }],
  ["contactTiktok", "cta_click", { placement: "contact", channel: "tiktok" }],
  ["footerTelegram", "cta_click", { placement: "footer", channel: "telegram" }],
  ["footerChannel", "cta_click", { placement: "footer", channel: "telegram_channel" }],
  ["footerTiktok", "cta_click", { placement: "footer", channel: "tiktok" }],
  ["footerWhatsApp", "cta_click", { placement: "footer", channel: "whatsapp" }]
].forEach(([id, eventName, data]) => {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener("click", () => trackEvent(eventName, data));
  }
});

document.querySelectorAll(".faq-list details").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (details.open) {
      const title = details.querySelector("summary")?.textContent?.trim();
      trackEvent("faq_open", { question: title || "faq_item" });
    }
  });
});
