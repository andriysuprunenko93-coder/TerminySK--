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

setLink("headerTelegram", siteConfig.telegramUrl, "Telegram");
setLink("headerChannel", siteConfig.telegramChannelUrl, "TG канал");
setLink("headerTiktok", siteConfig.tiktokUrl, "TikTok");
setLink("headerWhatsApp", whatsappUrl, "WhatsApp");
setLink("heroTelegram", siteConfig.telegramUrl);
setLink("heroChannel", siteConfig.telegramChannelUrl, "TG канал");
setLink("heroWhatsApp", whatsappUrl);
setLink("channelButton", siteConfig.telegramChannelUrl);
setLink("contactChannel", siteConfig.telegramChannelUrl);
setLink("contactWhatsApp", whatsappUrl, `WhatsApp: ${siteConfig.whatsappNumber}`);
setLink("contactTelegram", siteConfig.telegramUrl);
setLink("contactTiktok", siteConfig.tiktokUrl);
setLink("footerTelegram", siteConfig.telegramUrl);
setLink("footerChannel", siteConfig.telegramChannelUrl);
setLink("footerTiktok", siteConfig.tiktokUrl);
setLink("footerWhatsApp", whatsappUrl);

document.title = `${siteConfig.brandName} | Документи в Словаччині`;

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
    }
  });
});
