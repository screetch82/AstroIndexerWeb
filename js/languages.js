// Language translations for AstroIndexer website
const translations = {
    en: {
        // Navigation
        nav: {
            features: "Features",
            pricing: "Pricing",
            documentation: "Documentation",
            support: "Support",
            download: "Download"
        },

        // Hero Section
        hero: {
            title: "AstroIndexer",
            subtitle: "Professional Astrophotography Management",
            description: "Organize, analyze, and optimize your astrophotography workflow with powerful AI-driven tools",
            platforms: "Available for",
            cta: {
                download: "Download Free",
                learnMore: "Learn More"
            }
        },

        // Features Section
        features: {
            title: "Powerful Features for Astrophotographers",
            subtitle: "Everything you need to manage your astronomical imaging data",
            items: {
                organization: {
                    title: "Smart Organization",
                    description: "Automatically organize your FITS and XISF files with intelligent cataloging"
                },
                quality: {
                    title: "Quality Analysis",
                    description: "Advanced image quality metrics including FWHM, HFR, and star detection"
                },
                equipment: {
                    title: "Equipment Profiling",
                    description: "Track and optimize performance across all your imaging equipment"
                },
                ml: {
                    title: "ML Analytics",
                    description: "Machine learning insights to improve your imaging sessions"
                },
                planning: {
                    title: "Session Planning",
                    description: "Plan optimal imaging sessions based on weather and target visibility"
                },
                integration: {
                    title: "Software Integration",
                    description: "Seamless integration with PixInsight, N.I.N.A, and other tools"
                },
                celestial: {
                    title: "Celestial Map",
                    description: "Interactive sky map showing your imaging coverage and future targets"
                }
            }
        },

        // Details Section (feature showcases)
        details: {
            title: "See AstroIndexer in Action",
            subtitle: "Powerful tools designed for serious astrophotographers",
            quality: {
                title: "Advanced Quality Analysis",
                description: "Comprehensive image quality metrics with FWHM, HFR, eccentricity, and star count analysis. Automatically grade and sort your images to identify the best frames for stacking.",
                points: [
                    "Real-time FWHM and HFR calculations",
                    "Automatic quality scoring",
                    "Batch analysis capabilities"
                ]
            },
            equipment: {
                title: "Equipment Performance Tracking",
                description: "Track performance metrics across all your equipment combinations. Identify optimal configurations and monitor equipment degradation over time.",
                points: [
                    "Equipment profile management",
                    "Performance trend analysis",
                    "Setup comparison tools"
                ]
            },
            planner: {
                title: "Advanced Session Planning",
                description: "Plan your imaging sessions with precision using yearly completion tracking, timeline views, and exposure planning tools.",
                points: [
                    "Yearly completion planner",
                    "Timeline visualization",
                    "Exposure plan optimization"
                ]
            },
            catalogue: {
                title: "Catalogue Completion Tracking",
                description: "Track your progress through Messier, NGC, IC, and other astronomical catalogs with interactive visual grids.",
                points: [
                    "Visual grid for all catalog objects",
                    "Progress tracking by catalog",
                    "Missing object identification"
                ]
            },
            gallery: {
                title: "Gallery View",
                description: "Browse your entire astrophotography collection with lightning-fast virtual scrolling. View thumbnails of 100,000+ images without lag.",
                points: [
                    "Virtual scrolling for unlimited images",
                    "Quick preview with FITS header data",
                    "Batch operations and tagging"
                ]
            },
            index: {
                title: "Index & Overview",
                description: "Your command center for all imaging data. Get instant insights into your collection with smart categorization.",
                points: [
                    "Complete collection statistics",
                    "Equipment performance metrics",
                    "Quick access to recent sessions"
                ]
            },
            celestial: {
                title: "Interactive Celestial Map",
                description: "Visualize your entire imaging collection on an interactive sky map. See coverage gaps, plan future sessions, and explore your astrophotography journey.",
                points: [
                    "Interactive 3D sky visualization",
                    "Coverage heatmap overlay",
                    "Object tracking and planning",
                    "Real-time position updates"
                ]
            }
        },

        // ML Analytics Section
        ml: {
            title: "AI-Powered Analytics",
            subtitle: "6 Specialized Machine Learning Modules for Advanced Astrophotography Analysis",
            dashboard: {
                title: "ML Analytics Dashboard",
                description: "Comprehensive overview of all machine learning insights with real-time quality predictions and performance metrics.",
                points: [
                    "Real-time quality predictions",
                    "Performance trend analysis",
                    "Equipment recommendations"
                ]
            },
            heatmap: {
                title: "Sensor Performance Heatmap",
                description: "Visualize sensor performance across your entire frame to identify vignetting, dust motes, and optical aberrations.",
                points: [
                    "Pixel-level quality mapping",
                    "Dust and defect detection",
                    "Vignetting analysis"
                ]
            },
            exposure: {
                title: "Exposure Time Optimization",
                description: "AI-driven exposure time recommendations based on your equipment, target, and conditions.",
                points: [
                    "Optimal sub-exposure calculations",
                    "Signal-to-noise predictions",
                    "Total integration planning"
                ]
            },
            patterns: {
                title: "Quality Pattern Recognition",
                description: "Machine learning identifies patterns in your imaging data to predict optimal conditions.",
                points: [
                    "Weather pattern analysis",
                    "Seeing condition predictions",
                    "Equipment behavior patterns"
                ]
            },
            session: {
                title: "Session Performance Analysis",
                description: "Deep analysis of imaging sessions to identify trends and optimize future sessions.",
                points: [
                    "Session quality scoring",
                    "Time-of-night analysis",
                    "Equipment performance tracking"
                ]
            },
            insights: {
                title: "AI-Generated Insights",
                description: "Actionable recommendations generated by analyzing your complete imaging history.",
                points: [
                    "Personalized improvement tips",
                    "Equipment upgrade recommendations",
                    "Workflow optimization suggestions"
                ]
            }
        },

        // Download Section
        download: {
            title: "Download AstroIndexer",
            subtitle: "Free to try, works on all major platforms",
            windows: {
                detail: "Installer (.exe) \u00b7 Windows 10+"
            },
            macos: {
                detail: "Universal (.zip) \u00b7 macOS 12+"
            },
            linux: {
                detail: "Archive (.tar.gz) \u00b7 Ubuntu 22.04+"
            },
            note: "Free 30-day trial with full access. No account required."
        },

        // Pricing Section
        pricing: {
            title: "Choose Your Plan",
            subtitle: "Flexible pricing for hobbyists and professionals",
            trial: {
                title: "Free Trial",
                price: "Free",
                duration: "30 days",
                features: [
                    "Full feature access",
                    "Up to 1000 images",
                    "Basic support",
                    "All analysis tools"
                ],
                cta: "Start Free Trial"
            },
            personal: {
                title: "Standard",
                price: "€49",
                duration: "one-time",
                features: [
                    "Unlimited images",
                    "All features included",
                    "Priority support",
                    "Lifetime updates",
                    "Multi-computer license"
                ],
                cta: "Buy Now"
            },
            professional: {
                title: "Professional",
                price: "€89",
                duration: "one-time",
                features: [
                    "Everything in Standard",
                    "Commercial use",
                    "Advanced ML features",
                    "Custom equipment profiles",
                    "API access",
                    "Premium support"
                ],
                cta: "Contact Sales"
            }
        },

        // Footer
        footer: {
            product: {
                title: "Product",
                links: {
                    features: "Features",
                    pricing: "Pricing",
                    changelog: "Changelog",
                    roadmap: "Roadmap"
                }
            },
            support: {
                title: "Support",
                links: {
                    documentation: "Documentation",
                    guides: "User Guides",
                    faq: "FAQ",
                    contact: "Contact Us"
                }
            },
            company: {
                title: "Company",
                links: {
                    about: "About",
                    blog: "Blog",
                    privacy: "Privacy Policy",
                    terms: "Terms of Service"
                }
            },
            copyright: "© 2025 AstroIndexer. All rights reserved."
        }
    },

    de: {
        // Navigation
        nav: {
            features: "Funktionen",
            pricing: "Preise",
            documentation: "Dokumentation",
            support: "Support",
            download: "Herunterladen"
        },

        // Hero Section
        hero: {
            title: "AstroIndexer",
            subtitle: "Professionelle Astrofotografie-Verwaltung",
            description: "Organisieren, analysieren und optimieren Sie Ihren Astrofotografie-Workflow mit leistungsstarken KI-gesteuerten Tools",
            platforms: "Verf\u00fcgbar f\u00fcr",
            cta: {
                download: "Kostenlos herunterladen",
                learnMore: "Mehr erfahren"
            }
        },

        // Features Section
        features: {
            title: "Leistungsstarke Funktionen für Astrofotografen",
            subtitle: "Alles, was Sie zur Verwaltung Ihrer astronomischen Bilddaten benötigen",
            items: {
                organization: {
                    title: "Intelligente Organisation",
                    description: "Automatische Organisation Ihrer FITS- und XISF-Dateien mit intelligenter Katalogisierung"
                },
                quality: {
                    title: "Qualitätsanalyse",
                    description: "Erweiterte Bildqualitätsmetriken einschließlich FWHM, HFR und Sternerkennung"
                },
                equipment: {
                    title: "Equipment-Profile",
                    description: "Verfolgen und optimieren Sie die Leistung all Ihrer Imaging-Ausrüstung"
                },
                ml: {
                    title: "ML-Analytik",
                    description: "Machine-Learning-Einblicke zur Verbesserung Ihrer Aufnahmesitzungen"
                },
                planning: {
                    title: "Sitzungsplanung",
                    description: "Planen Sie optimale Aufnahmesitzungen basierend auf Wetter und Zielsichtbarkeit"
                },
                integration: {
                    title: "Software-Integration",
                    description: "Nahtlose Integration mit PixInsight, N.I.N.A und anderen Tools"
                },
                celestial: {
                    title: "Himmelskarte",
                    description: "Interaktive Himmelskarte mit Ihrer Aufnahmeabdeckung und zukünftigen Zielen"
                }
            }
        },

        // Details Section (feature showcases)
        details: {
            title: "AstroIndexer in Aktion",
            subtitle: "Leistungsstarke Werkzeuge für ambitionierte Astrofotografen",
            quality: {
                title: "Erweiterte Qualitätsanalyse",
                description: "Umfassende Bildqualitätsmetriken mit FWHM, HFR, Exzentrizität und Sternzählung. Automatische Bewertung und Sortierung Ihrer Bilder zur Identifikation der besten Einzelaufnahmen für das Stacking.",
                points: [
                    "FWHM- und HFR-Berechnungen in Echtzeit",
                    "Automatische Qualitätsbewertung",
                    "Stapelverarbeitung"
                ]
            },
            equipment: {
                title: "Equipment-Leistungsüberwachung",
                description: "Verfolgen Sie Leistungsmetriken über all Ihre Equipment-Kombinationen. Identifizieren Sie optimale Konfigurationen und überwachen Sie Verschleiß über die Zeit.",
                points: [
                    "Equipment-Profilverwaltung",
                    "Leistungstrend-Analyse",
                    "Setup-Vergleichswerkzeuge"
                ]
            },
            planner: {
                title: "Erweiterte Sitzungsplanung",
                description: "Planen Sie Ihre Aufnahmesitzungen präzise mit jährlicher Fortschrittsverfolgung, Zeitleisten-Ansichten und Belichtungsplanungs-Tools.",
                points: [
                    "Jährlicher Fortschrittsplaner",
                    "Zeitleisten-Visualisierung",
                    "Belichtungsplan-Optimierung"
                ]
            },
            catalogue: {
                title: "Katalog-Fortschrittsverfolgung",
                description: "Verfolgen Sie Ihren Fortschritt durch Messier-, NGC-, IC- und andere astronomische Kataloge mit interaktiven visuellen Rastern.",
                points: [
                    "Visuelles Raster für alle Katalogobjekte",
                    "Fortschrittsverfolgung pro Katalog",
                    "Identifikation fehlender Objekte"
                ]
            },
            gallery: {
                title: "Galerie-Ansicht",
                description: "Durchstöbern Sie Ihre gesamte Astrofotografie-Sammlung mit blitzschnellem virtuellem Scrollen. Betrachten Sie Vorschaubilder von über 100.000 Aufnahmen ohne Verzögerung.",
                points: [
                    "Virtuelles Scrollen für unbegrenzte Bilder",
                    "Schnellvorschau mit FITS-Header-Daten",
                    "Stapeloperationen und Tagging"
                ]
            },
            index: {
                title: "Übersicht & Index",
                description: "Ihre Kommandozentrale für alle Aufnahmedaten. Erhalten Sie sofortige Einblicke in Ihre Sammlung mit intelligenter Kategorisierung.",
                points: [
                    "Vollständige Sammlungsstatistiken",
                    "Equipment-Leistungsmetriken",
                    "Schnellzugriff auf aktuelle Sitzungen"
                ]
            },
            celestial: {
                title: "Interaktive Himmelskarte",
                description: "Visualisieren Sie Ihre gesamte Aufnahmesammlung auf einer interaktiven Himmelskarte. Erkennen Sie Abdeckungslücken, planen Sie zukünftige Sitzungen und erkunden Sie Ihre Astrofotografie-Reise.",
                points: [
                    "Interaktive 3D-Himmelsvisualisierung",
                    "Abdeckungs-Heatmap-Overlay",
                    "Objektverfolgung und -planung",
                    "Positionsaktualisierungen in Echtzeit"
                ]
            }
        },

        // ML Analytics Section
        ml: {
            title: "KI-gestützte Analytik",
            subtitle: "6 spezialisierte Machine-Learning-Module für fortgeschrittene Astrofotografie-Analyse",
            dashboard: {
                title: "ML-Analytik-Dashboard",
                description: "Umfassende Übersicht aller Machine-Learning-Erkenntnisse mit Echtzeit-Qualitätsvorhersagen und Leistungsmetriken.",
                points: [
                    "Qualitätsvorhersagen in Echtzeit",
                    "Leistungstrend-Analyse",
                    "Equipment-Empfehlungen"
                ]
            },
            heatmap: {
                title: "Sensor-Leistungs-Heatmap",
                description: "Visualisieren Sie die Sensorleistung über das gesamte Bild, um Vignettierung, Staubkörner und optische Aberrationen zu identifizieren.",
                points: [
                    "Pixelgenaue Qualitätskartierung",
                    "Staub- und Defekterkennung",
                    "Vignettierungsanalyse"
                ]
            },
            exposure: {
                title: "Belichtungszeit-Optimierung",
                description: "KI-gestützte Belichtungszeit-Empfehlungen basierend auf Ihrer Ausrüstung, dem Zielobjekt und den Bedingungen.",
                points: [
                    "Optimale Einzelbelichtungs-Berechnung",
                    "Signal-Rausch-Vorhersagen",
                    "Gesamt-Integrationsplanung"
                ]
            },
            patterns: {
                title: "Qualitätsmuster-Erkennung",
                description: "Machine Learning erkennt Muster in Ihren Aufnahmedaten zur Vorhersage optimaler Bedingungen.",
                points: [
                    "Wettermuster-Analyse",
                    "Seeing-Vorhersagen",
                    "Equipment-Verhaltensmuster"
                ]
            },
            session: {
                title: "Sitzungsleistungs-Analyse",
                description: "Tiefgehende Analyse von Aufnahmesitzungen zur Erkennung von Trends und Optimierung zukünftiger Sitzungen.",
                points: [
                    "Sitzungs-Qualitätsbewertung",
                    "Nachtzeit-Analyse",
                    "Equipment-Leistungsverfolgung"
                ]
            },
            insights: {
                title: "KI-generierte Erkenntnisse",
                description: "Umsetzbare Empfehlungen aus der Analyse Ihrer gesamten Aufnahmehistorie.",
                points: [
                    "Personalisierte Verbesserungstipps",
                    "Equipment-Upgrade-Empfehlungen",
                    "Workflow-Optimierungsvorschläge"
                ]
            }
        },

        // Download Section
        download: {
            title: "AstroIndexer herunterladen",
            subtitle: "Kostenlos testen, verf\u00fcgbar f\u00fcr alle Plattformen",
            windows: {
                detail: "Installer (.exe) \u00b7 Windows 10+"
            },
            macos: {
                detail: "Universal (.zip) \u00b7 macOS 12+"
            },
            linux: {
                detail: "Archiv (.tar.gz) \u00b7 Ubuntu 22.04+"
            },
            note: "30 Tage kostenlose Testversion mit vollem Zugang. Kein Konto erforderlich."
        },

        // Pricing Section
        pricing: {
            title: "W\u00e4hlen Sie Ihren Plan",
            subtitle: "Flexible Preise f\u00fcr Hobbyisten und Profis",
            trial: {
                title: "Kostenlose Testversion",
                price: "Kostenlos",
                duration: "30 Tage",
                features: [
                    "Voller Funktionsumfang",
                    "Bis zu 1000 Bilder",
                    "Basis-Support",
                    "Alle Analysetools"
                ],
                cta: "Testversion starten"
            },
            personal: {
                title: "Standard",
                price: "49€",
                duration: "einmalig",
                features: [
                    "Unbegrenzte Bilder",
                    "Alle Funktionen enthalten",
                    "Prioritäts-Support",
                    "Lebenslange Updates",
                    "Mehrcomputer-Lizenz"
                ],
                cta: "Jetzt kaufen"
            },
            professional: {
                title: "Professionell",
                price: "89€",
                duration: "einmalig",
                features: [
                    "Alles aus Standard",
                    "Kommerzielle Nutzung",
                    "Erweiterte ML-Funktionen",
                    "Benutzerdefinierte Equipment-Profile",
                    "API-Zugang",
                    "Premium-Support"
                ],
                cta: "Vertrieb kontaktieren"
            }
        },

        // Footer
        footer: {
            product: {
                title: "Produkt",
                links: {
                    features: "Funktionen",
                    pricing: "Preise",
                    changelog: "Änderungsprotokoll",
                    roadmap: "Roadmap"
                }
            },
            support: {
                title: "Support",
                links: {
                    documentation: "Dokumentation",
                    guides: "Benutzerhandbücher",
                    faq: "FAQ",
                    contact: "Kontakt"
                }
            },
            company: {
                title: "Unternehmen",
                links: {
                    about: "Über uns",
                    blog: "Blog",
                    privacy: "Datenschutz",
                    terms: "Nutzungsbedingungen"
                }
            },
            copyright: "© 2025 AstroIndexer. Alle Rechte vorbehalten."
        }
    }
};

// Language detection and management
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.supportedLanguages = ['en', 'de'];
        this.init();
    }

    init() {
        // Detect language from multiple sources
        this.detectLanguage();

        // Apply translations
        this.applyTranslations();

        // Set up language switcher
        this.setupLanguageSwitcher();

        // Save preference
        this.saveLanguagePreference();
    }

    detectLanguage() {
        // 1. Check localStorage for saved preference
        const savedLang = localStorage.getItem('astroindexer_language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.currentLang = savedLang;
            return;
        }

        // 2. Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            this.currentLang = urlLang;
            return;
        }

        // 3. Detect from browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.substring(0, 2).toLowerCase();

        if (this.supportedLanguages.includes(langCode)) {
            this.currentLang = langCode;
        } else {
            // 4. Try to detect from browser languages array
            const languages = navigator.languages;
            for (let lang of languages) {
                const code = lang.substring(0, 2).toLowerCase();
                if (this.supportedLanguages.includes(code)) {
                    this.currentLang = code;
                    break;
                }
            }
        }

        // 5. Detect from timezone (fallback for country detection)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone) {
            // German-speaking countries timezones
            const germanTimezones = [
                'Europe/Berlin', 'Europe/Vienna', 'Europe/Zurich',
                'Europe/Luxembourg', 'Europe/Brussels'
            ];

            if (germanTimezones.includes(timezone)) {
                this.currentLang = 'de';
            }
        }
    }

    applyTranslations() {
        const t = translations[this.currentLang];

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedProperty(t, key);

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Update meta tags
        this.updateMetaTags();
    }

    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    setupLanguageSwitcher() {
        // Create language switcher if it doesn't exist
        if (!document.getElementById('language-switcher')) {
            this.createLanguageSwitcher();
        }

        // Add click handlers
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.id = 'language-switcher';
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="language-toggle">
                <span class="current-lang">${this.currentLang.toUpperCase()}</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
            <div class="language-dropdown">
                <a href="#" class="language-option" data-lang="en">
                    <span class="flag">🇬🇧</span> English
                </a>
                <a href="#" class="language-option" data-lang="de">
                    <span class="flag">🇩🇪</span> Deutsch
                </a>
            </div>
        `;

        // Add to navigation or header
        const nav = document.querySelector('nav') || document.querySelector('header');
        if (nav) {
            nav.appendChild(switcher);
        }

        // Toggle dropdown
        switcher.querySelector('.language-toggle').addEventListener('click', () => {
            switcher.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                switcher.classList.remove('active');
            }
        });
    }

    switchLanguage(lang) {
        if (this.supportedLanguages.includes(lang)) {
            this.currentLang = lang;
            this.applyTranslations();
            this.saveLanguagePreference();

            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.history.pushState({}, '', url);

            // Update current language display
            const currentLangDisplay = document.querySelector('.current-lang');
            if (currentLangDisplay) {
                currentLangDisplay.textContent = lang.toUpperCase();
            }

            // Close dropdown
            const switcher = document.getElementById('language-switcher');
            if (switcher) {
                switcher.classList.remove('active');
            }
        }
    }

    saveLanguagePreference() {
        localStorage.setItem('astroindexer_language', this.currentLang);
    }

    updateMetaTags() {
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = this.currentLang === 'de'
                ? 'AstroIndexer - Professionelle Software zur Verwaltung und Analyse von Astrofotografie-Daten'
                : 'AstroIndexer - Professional astrophotography data management and analysis software';
        }

        // Update Open Graph tags
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.content = metaDesc?.content;
        }
    }

    // Get current translation
    t(key) {
        return this.getNestedProperty(translations[this.currentLang], key);
    }
}

// Initialize language manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.languageManager = new LanguageManager();
    });
} else {
    window.languageManager = new LanguageManager();
}

// Export for use in other scripts
window.translations = translations;
window.LanguageManager = LanguageManager;