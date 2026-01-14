/**
 * Internationalization (i18n) System
 * Supports English and Portuguese
 */

const translations = {
  en: {
    // Meta
    "meta.title": "Trebla | Research & Engineering in Blockchain & AI",
    "meta.description":
      "A research and engineering collective bridging theoretical research and applied technology. Open source contributions, software services, and applied research in blockchain, zero-knowledge proofs, and artificial intelligence.",

    // Header
    "nav.github": "[GitHub]",

    // Hero Section
    "hero.status": "System Operational",
    "hero.title.line1": "Engineering",
    "hero.title.line2": "the future",
    "hero.description":
      "Trebla is a research and engineering collective. We bridge the gap between <span class='text-white'>theoretical research</span> and <span class='text-white'>applied technology</span> in blockchain and artificial intelligence.",

    // Capabilities Section
    "capabilities.title": "Capabilities",
    "capabilities.index": "/// INDEX_01",

    // Card 1
    "card1.number": "01",
    "card1.title": "Open Source",
    "card1.description":
      "Active contribution to core infrastructure, developer tooling, and open protocols that power the decentralized web.",

    // Card 2
    "card2.number": "02",
    "card2.title": "Services",
    "card2.description":
      "End-to-end engineering for high-stakes environments. Smart contract auditing, full-stack application development, and system architecture.",

    // Card 3
    "card3.number": "03",
    "card3.title": "Research",
    "card3.description":
      "Applied research in zero-knowledge proofs, agentic AI workflows, and decentralized governance models.",

    // Footer
    "footer.copyright": "Trebla ©",
    "footer.language": "Language",
  },

  pt: {
    // Meta
    "meta.title": "Trebla | Pesquisa e Engenharia em Blockchain & IA",
    "meta.description":
      "Um coletivo de pesquisa e engenharia conectando pesquisa teórica e tecnologia aplicada. Contribuições open source, serviços de software e pesquisa aplicada em blockchain, provas de conhecimento zero e inteligência artificial.",

    // Header
    "nav.github": "[GitHub]",

    // Hero Section
    "hero.status": "Sistema Operacional",
    "hero.title.line1": "Desenvolvendo",
    "hero.title.line2": "o futuro",
    "hero.description":
      "Trebla é um coletivo de pesquisa e engenharia. Conectamos <span class='text-white'>pesquisa teórica</span> e <span class='text-white'>tecnologia aplicada</span> em blockchain e inteligência artificial.",

    // Capabilities Section
    "capabilities.title": "Competências",
    "capabilities.index": "/// ÍNDICE_01",

    // Card 1
    "card1.number": "01",
    "card1.title": "Open Source",
    "card1.description":
      "Contribuição ativa para infraestrutura central, ferramentas de desenvolvimento e protocolos abertos que impulsionam a web descentralizada.",

    // Card 2
    "card2.number": "02",
    "card2.title": "Serviços",
    "card2.description":
      "Engenharia completa para ambientes de alta criticidade. Auditoria de smart contracts, desenvolvimento full-stack e arquitetura de sistemas.",

    // Card 3
    "card3.number": "03",
    "card3.title": "Pesquisa",
    "card3.description":
      "Pesquisa aplicada em provas de conhecimento zero, fluxos de IA agêntica e modelos de governança descentralizada.",

    // Footer
    "footer.copyright": "Trebla ©",
    "footer.language": "Idioma",
  },
};

class I18n {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.init();
  }

  detectLanguage() {
    // Check localStorage first
    const saved = localStorage.getItem("language");
    if (saved && translations[saved]) {
      return saved;
    }

    // Check browser language
    const browserLang = navigator.language.split("-")[0];
    if (translations[browserLang]) {
      return browserLang;
    }

    // Default to English
    return "en";
  }

  init() {
    this.updateLanguage(this.currentLang);
    this.setupLanguageSelector();
  }

  updateLanguage(lang) {
    if (!translations[lang]) return;

    this.currentLang = lang;
    localStorage.setItem("language", lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update meta tags
    document.title = translations[lang]["meta.title"];
    this.updateMetaTag("description", translations[lang]["meta.description"]);
    this.updateMetaTag(
      "og:title",
      translations[lang]["meta.title"],
      "property"
    );
    this.updateMetaTag(
      "og:description",
      translations[lang]["meta.description"],
      "property"
    );
    this.updateMetaTag("twitter:title", translations[lang]["meta.title"]);
    this.updateMetaTag(
      "twitter:description",
      translations[lang]["meta.description"]
    );

    // Update all elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = translations[lang][key];

      if (translation) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = translation;
        } else {
          element.innerHTML = translation;
        }
      }
    });

    // Update language selector
    this.updateLanguageSelector();

    // Update structured data language
    this.updateStructuredDataLanguage(lang);
  }

  updateMetaTag(name, content, attribute = "name") {
    const meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (meta) {
      meta.setAttribute("content", content);
    }
  }

  setupLanguageSelector() {
    const selector = document.getElementById("language-selector");
    if (selector) {
      selector.addEventListener("change", (e) => {
        this.updateLanguage(e.target.value);
      });
    }
  }

  updateLanguageSelector() {
    const selector = document.getElementById("language-selector");
    if (selector) {
      selector.value = this.currentLang;
    }
  }

  updateStructuredDataLanguage(lang) {
    const inLanguage = lang === "pt" ? "pt-BR" : "en-US";
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const data = JSON.parse(script.textContent);
        if (data.inLanguage) {
          data.inLanguage = inLanguage;
          script.textContent = JSON.stringify(data);
        }
      } catch (e) {
        // Ignore parse errors
      }
    });
  }

  translate(key) {
    return translations[this.currentLang][key] || key;
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.i18n = new I18n();
  });
} else {
  window.i18n = new I18n();
}
