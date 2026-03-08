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
                    description: "7-stage scanning pipeline extracts 93+ fields from FITS and XISF headers. Supports SeeStar smart telescopes, NINA CSV integration, and stacked-image detection."
                },
                quality: {
                    title: "Quality Analysis",
                    description: "32+ quality metrics per frame with Moffat 7-parameter PSF fitting within 1.5% of PixInsight. 10 automatic defect detectors catch fog, trailing, gradients, and optical aberrations."
                },
                equipment: {
                    title: "Equipment Manager",
                    description: "Auto-discovery from FITS headers with automatic filter recognition, gain/offset detection, QE sensor curves, calibration library, and Bortle sky brightness settings."
                },
                ml: {
                    title: "ML Analytics",
                    description: "40-pattern discovery across 9 categories, AutoIntegrate Combination Recommender with 11 palettes, and PixInsight-aligned stacking advisor."
                },
                planning: {
                    title: "Session Planner V2",
                    description: "Equipment-aware target recommendations based on your optics, location, season, and sky conditions. 5-state project pipeline with Smart Plan scoring and moon analysis."
                },
                integration: {
                    title: "AstroBin & PixInsight",
                    description: "AstroBin gallery sync with published badges and acquisition push. PixInsight AutoIntegrate export with combination mode selection."
                },
                celestial: {
                    title: "Sky Atlas & Celestial Map",
                    description: "Interactive sky atlas with FOV overlays and mosaic positioning, plus a celestial map showing your imaging coverage across the sky."
                }
            }
        },

        // Details Section (feature showcases)
        details: {
            title: "See AstroIndexer in Action",
            subtitle: "Powerful tools designed for serious astrophotographers",
            gallery: {
                title: "Gallery & File Browser",
                description: "Browse your entire astrophotography collection with lightning-fast virtual scrolling. 6-level drill-down from catalogues to individual files, smart filters by quality, equipment, moon phase, and more.",
                points: [
                    "Virtual scrolling for 100,000+ images without lag",
                    "Smart filters with hierarchical categories",
                    "AstroBin published badges on target cards",
                    "Quality, calibration, and filter badges at a glance"
                ]
            },
            index: {
                title: "Index & Overview",
                description: "Your command center for all imaging data. See collection statistics, equipment performance, recent sessions, and AstroBin sync status at a glance.",
                points: [
                    "Complete collection statistics with target counts",
                    "Equipment performance overview per setup",
                    "AstroBin published status for each target",
                    "Quick access to recent scanning sessions"
                ]
            },
            quality: {
                title: "Quality Analysis",
                description: "Measures 32+ quality metrics per frame using Moffat 7-parameter PSF fitting with 3-phase outlier removal. V4 scorer with fatal defect pre-gate catches fog, clouds, and defocus before scoring.",
                points: [
                    "Within 1.5% of PixInsight SubframeSelector accuracy",
                    "10 automatic defect detectors (fog, trailing, gradients, tilt, coma)",
                    "9 quality multipliers with adaptive per-equipment baselines",
                    "Sensor heatmaps showing FWHM, SNR, and aberration across the field"
                ]
            },
            equipment: {
                title: "Equipment Manager",
                description: "Auto-discovers telescopes, cameras, and filters from your FITS headers. Automatic filter recognition, gain/offset detection, QE sensor curves, calibration library with target linking, and observing site configuration.",
                points: [
                    "Automatic filter recognition (broadband, narrowband, special) and gain/offset detection from FITS headers",
                    "QE curves for IMX183, IMX294, IMX455, IMX585, and 5 more sensors with auto-import",
                    "Calibration library: auto-created sets with temperature/gain matching, linked to imaging targets",
                    "Location settings with Bortle class (1-9), SQM calculation, and AstroBin equipment sync",
                    "SeeStar S50, S30, and S30 Pro smart telescope support"
                ]
            },
            planner: {
                title: "Session Planner V2",
                description: "Recommends suitable targets based on your equipment capabilities, observing location, time of year, and sky conditions. 5-state project pipeline (Queued, Planned, Scheduled, Active, Completed) with Smart Plan scoring.",
                points: [
                    "Equipment-aware suitability scoring: matches targets to your focal length, sensor, and FOV",
                    "Location and season-aware: altitude, visibility windows, and best-month calculations",
                    "Moon impact analysis with filter-specific safe-zone thresholds",
                    "QE-aware exposure recommendations per filter",
                    "NINA XML export and Telescopius CSV export"
                ]
            },
            catalogue: {
                title: "Catalogue Completion",
                description: "Track your progress through 26+ astronomical catalogues including Messier (110), NGC (7,840), IC (5,386), Caldwell, Sharpless, and more with color-coded visual grids.",
                points: [
                    "Green = processed, yellow = raw only, gray = not imaged",
                    "Cross-catalogue alias resolution (M42 = NGC 1976)",
                    "Context menu: preview, open in gallery, SIMBAD lookup",
                    "Completion percentage per catalogue"
                ]
            },
            celestial: {
                title: "Interactive Celestial Map",
                description: "Visualize your entire imaging collection on an interactive sky map. See coverage gaps, plan future sessions, and explore your astrophotography journey across the sky.",
                points: [
                    "Interactive 3D sky visualization",
                    "Coverage heatmap overlay",
                    "Object tracking and planning",
                    "Real-time position updates"
                ]
            },
            skyatlas: {
                title: "Sky Atlas",
                description: "Interactive sky atlas with field-of-view overlays showing exactly what your equipment captures. Plan mosaic panels, check framing, and discover new targets.",
                points: [
                    "FOV overlay matching your exact equipment",
                    "Mosaic panel positioning and planning",
                    "Plate solving integration",
                    "Target search with catalogue cross-reference"
                ]
            },
            astrobin: {
                title: "AstroBin Integration",
                description: "Sync your AstroBin gallery with automatic catalogue-ID matching. See which targets you have published, push acquisition data, and display published badges in your local gallery.",
                points: [
                    "One-click gallery sync with auto-matching",
                    "Published badges on gallery thumbnails",
                    "Push sub-frame counts and filter data to AstroBin",
                    "Offline browsing with cached data"
                ]
            },
            stacking: {
                title: "Stacking Advisor",
                description: "PixInsight-aligned frame selection with Winsorized Sigma Clipping at threshold 2.2. AutoIntegrate Combination Recommender selects the optimal palette from 11 options based on your filters and object type.",
                points: [
                    "Intelligent palette selection: SHO, HOO, LRGB, Dynamic SHO, and more",
                    "Frame quality tiers: Excellent, Good, Poor with per-filter balance",
                    "StarXTerminator + RGB broadband star recombination workflow",
                    "One-click export to PixInsight AutoIntegrate JSON"
                ]
            }
        },

        // ML Analytics Section
        ml: {
            title: "AI-Powered Analytics",
            subtitle: "40 ML Patterns Across 9 Categories -- Discover What Your Data Reveals",
            dashboard: {
                title: "Pattern Discovery Dashboard",
                description: "40 machine learning patterns across seasonal, moon, equipment, focus, thermal, atmospheric, optical, and optimization categories. Every pattern includes confidence scores and actionable recommendations.",
                points: [
                    "40 patterns discovered from YOUR imaging history",
                    "Confidence-scored insights with specific actions",
                    "AI-powered summaries via GPT-4o or Claude"
                ]
            },
            heatmap: {
                title: "Sensor Performance Heatmap",
                description: "Spatial quality maps across your sensor reveal tilt, coma, astigmatism, and vignetting patterns that are invisible in single-metric views.",
                points: [
                    "FWHM, SNR, and star density maps across the field",
                    "Aberration detection: coma, astigmatism, field curvature",
                    "Dead pixel and vignetting analysis"
                ]
            },
            exposure: {
                title: "Exposure & SNR Analysis",
                description: "QE-aware exposure recommendations using your sensor's actual quantum efficiency at each filter wavelength. Data-driven, not rule-of-thumb.",
                points: [
                    "QE-aware signal-to-noise calculations",
                    "Per-filter exposure optimization",
                    "Integration time planning per target"
                ]
            },
            patterns: {
                title: "Environmental & Optical Patterns",
                description: "Discovers seeing bimodality, cloud cover impact, sky gradient trends, field curvature signatures, sensor tilt, and optical degradation over time.",
                points: [
                    "Bimodal seeing detection and thresholds",
                    "Moon impact analysis: broadband vs narrowband",
                    "Optical quality trending across sessions"
                ]
            },
            session: {
                title: "Session & Equipment Analysis",
                description: "Compare session-by-session quality, track equipment performance over time, and identify your peak imaging hours and best equipment configurations.",
                points: [
                    "Peak imaging hours identification",
                    "Equipment degradation trending",
                    "Weekday vs weekend quality analysis"
                ]
            },
            insights: {
                title: "AI-Generated Insights",
                description: "Human-readable summaries of your most impactful patterns, generated by GPT-4o or Claude. Actionable recommendations specific to your equipment and imaging style.",
                points: [
                    "Personalized improvement recommendations",
                    "Equipment-specific optimization tips",
                    "Filter and target strategy guidance"
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
                    description: "7-stufige Scan-Pipeline extrahiert 93+ Felder aus FITS- und XISF-Headern. Unterstützt SeeStar Smart-Teleskope, NINA CSV-Integration und Stacked-Image-Erkennung."
                },
                quality: {
                    title: "Qualitätsanalyse",
                    description: "32+ Qualitätsmetriken pro Aufnahme mit Moffat 7-Parameter PSF-Fitting innerhalb von 1,5% PixInsight-Genauigkeit. 10 automatische Defektdetektoren erkennen Nebel, Nachführfehler, Gradienten und optische Aberrationen."
                },
                equipment: {
                    title: "Equipment Manager",
                    description: "Auto-Erkennung aus FITS-Headern mit automatischer Filtererkennung, Gain/Offset-Erkennung, QE-Sensorkurven, Kalibrationsbibliothek und Bortle Himmelshelligkeit-Einstellungen."
                },
                ml: {
                    title: "ML-Analytik",
                    description: "40-Muster-Erkennung in 9 Kategorien, AutoIntegrate Kombinations-Empfehlung mit 11 Paletten und PixInsight-kompatibler Stacking-Advisor."
                },
                planning: {
                    title: "Session Planner V2",
                    description: "Equipment-bewusste Zielempfehlungen basierend auf Ihrer Optik, Standort, Jahreszeit und Himmelsbedingungen. 5-Stufen-Projekt-Pipeline mit Smart Plan Bewertung und Mondanalyse."
                },
                integration: {
                    title: "AstroBin & PixInsight",
                    description: "AstroBin Galerie-Synchronisation mit Veröffentlichungs-Badges und Aufnahmedaten-Push. PixInsight AutoIntegrate Export mit Kombinationsmodus-Auswahl."
                },
                celestial: {
                    title: "Himmelsatlas & Sternkarte",
                    description: "Interaktiver Himmelsatlas mit FOV-Overlays und Mosaik-Positionierung, plus Sternkarte mit Ihrer Aufnahmeabdeckung am Himmel."
                }
            }
        },

        // Details Section (feature showcases)
        details: {
            title: "AstroIndexer in Aktion",
            subtitle: "Leistungsstarke Werkzeuge für ambitionierte Astrofotografen",
            gallery: {
                title: "Galerie & Dateibrowser",
                description: "Durchstöbern Sie Ihre gesamte Astrofotografie-Sammlung mit blitzschnellem virtuellem Scrollen. 6-stufiger Drill-Down von Katalogen zu einzelnen Dateien, intelligente Filter nach Qualität, Equipment, Mondphase und mehr.",
                points: [
                    "Virtuelles Scrollen für 100.000+ Bilder ohne Verzögerung",
                    "Intelligente Filter mit hierarchischen Kategorien",
                    "AstroBin Veröffentlichungs-Badges auf Zielkarten",
                    "Qualitäts-, Kalibrations- und Filter-Badges auf einen Blick"
                ]
            },
            index: {
                title: "Übersicht & Index",
                description: "Ihre Kommandozentrale für alle Aufnahmedaten. Sammlungsstatistiken, Equipment-Leistung, letzte Sitzungen und AstroBin-Sync-Status auf einen Blick.",
                points: [
                    "Vollständige Sammlungsstatistiken mit Zielanzahlen",
                    "Equipment-Leistungsübersicht pro Setup",
                    "AstroBin Veröffentlichungsstatus für jedes Ziel",
                    "Schnellzugriff auf aktuelle Scan-Sitzungen"
                ]
            },
            quality: {
                title: "Qualitätsanalyse",
                description: "Misst 32+ Qualitätsmetriken pro Aufnahme mit Moffat 7-Parameter PSF-Fitting und 3-Phasen Ausreißer-Entfernung. V4-Scorer mit fataler Defekt-Vorprüfung erkennt Nebel, Wolken und Defokussierung vor der Bewertung.",
                points: [
                    "Innerhalb von 1,5% der PixInsight SubframeSelector Genauigkeit",
                    "10 automatische Defektdetektoren (Nebel, Nachführfehler, Gradienten, Tilt, Koma)",
                    "9 Qualitätsmultiplikatoren mit adaptiven Equipment-spezifischen Basislinien",
                    "Sensor-Heatmaps mit FWHM, SNR und Aberrationen über das Feld"
                ]
            },
            equipment: {
                title: "Equipment Manager",
                description: "Auto-Erkennung von Teleskopen, Kameras und Filtern aus Ihren FITS-Headern. Automatische Filtererkennung, Gain/Offset-Erkennung, QE-Sensorkurven, Kalibrationsbibliothek mit Zielverknüpfung und Standort-Konfiguration.",
                points: [
                    "Automatische Filtererkennung (Breitband, Schmalband, Spezial) und Gain/Offset-Erkennung aus FITS-Headern",
                    "QE-Kurven für IMX183, IMX294, IMX455, IMX585 und 5 weitere Sensoren mit Auto-Import",
                    "Kalibrationsbibliothek: Automatisch erstellte Sets mit Temperatur/Gain-Abgleich, verknüpft mit Aufnahmezielen",
                    "Standort-Einstellungen mit Bortle-Klasse (1-9), SQM-Berechnung und AstroBin Equipment-Sync",
                    "SeeStar S50, S30 und S30 Pro Smart-Teleskop-Unterstützung"
                ]
            },
            planner: {
                title: "Session Planner V2",
                description: "Empfiehlt geeignete Ziele basierend auf Ihren Equipment-Fähigkeiten, Beobachtungsstandort, Jahreszeit und Himmelsbedingungen. 5-Stufen-Projekt-Pipeline mit Smart Plan Bewertung.",
                points: [
                    "Equipment-bewusste Eignungsbewertung: Abgleich von Zielen mit Brennweite, Sensor und Gesichtsfeld",
                    "Standort- und saisonbewusst: Höhe, Sichtbarkeitsfenster und Beste-Monat-Berechnung",
                    "Mondeinfluss-Analyse mit filterspezifischen Sicherheits-Schwellenwerten",
                    "QE-basierte Belichtungsempfehlungen pro Filter",
                    "NINA XML-Export und Telescopius CSV-Export"
                ]
            },
            skyatlas: {
                title: "Himmelsatlas",
                description: "Interaktiver Himmelsatlas mit Gesichtsfeld-Overlays, die genau zeigen, was Ihr Equipment aufnimmt. Planen Sie Mosaik-Panels, prüfen Sie den Bildausschnitt und entdecken Sie neue Ziele.",
                points: [
                    "FOV-Overlay passend zu Ihrem Equipment",
                    "Mosaik-Panel-Positionierung und -Planung",
                    "Plate-Solving Integration",
                    "Zielsuche mit Katalog-Kreuzreferenz"
                ]
            },
            celestial: {
                title: "Interaktive Sternkarte",
                description: "Visualisieren Sie Ihre gesamte Aufnahmesammlung auf einer interaktiven Himmelskarte. Erkennen Sie Abdeckungslücken, planen Sie zukünftige Sitzungen und erkunden Sie Ihre Astrofotografie-Reise.",
                points: [
                    "Interaktive 3D-Himmelsvisualisierung",
                    "Abdeckungs-Heatmap-Overlay",
                    "Objektverfolgung und -planung",
                    "Positionsaktualisierungen in Echtzeit"
                ]
            },
            astrobin: {
                title: "AstroBin Integration",
                description: "Synchronisieren Sie Ihre AstroBin-Galerie mit automatischer Katalog-ID-Zuordnung. Sehen Sie, welche Ziele veröffentlicht sind, pushen Sie Aufnahmedaten und zeigen Sie Veröffentlichungs-Badges in Ihrer lokalen Galerie.",
                points: [
                    "Ein-Klick Galerie-Synchronisation mit Auto-Zuordnung",
                    "Veröffentlichungs-Badges auf Galerie-Vorschaubildern",
                    "Sub-Frame-Anzahlen und Filterdaten an AstroBin senden",
                    "Offline-Browsing mit zwischengespeicherten Daten"
                ]
            },
            stacking: {
                title: "Stacking Advisor",
                description: "PixInsight-kompatible Frame-Auswahl mit Winsorized Sigma Clipping bei Schwellenwert 2,2. AutoIntegrate Kombinations-Empfehlung wählt die optimale Palette aus 11 Optionen basierend auf Ihren Filtern und dem Objekttyp.",
                points: [
                    "Intelligente Paletten-Auswahl: SHO, HOO, LRGB, Dynamic SHO und mehr",
                    "Frame-Qualitätsstufen: Exzellent, Gut, Schlecht mit Filter-Balance",
                    "StarXTerminator + RGB Breitband-Stern-Rekombination Workflow",
                    "Ein-Klick Export zu PixInsight AutoIntegrate JSON"
                ]
            },
            catalogue: {
                title: "Katalog-Fortschrittsverfolgung",
                description: "Verfolgen Sie Ihren Fortschritt durch 26+ astronomische Kataloge inkl. Messier (110), NGC (7.840), IC (5.386), Caldwell, Sharpless und mehr mit farbkodierten Rastern.",
                points: [
                    "Grün = bearbeitet, Gelb = nur Rohdaten, Grau = nicht aufgenommen",
                    "Katalogübergreifende Alias-Auflösung (M42 = NGC 1976)",
                    "Kontextmenü: Vorschau, in Galerie öffnen, SIMBAD-Abfrage",
                    "Fortschrittsprozent pro Katalog"
                ]
            }
        },

        // ML Analytics Section
        ml: {
            title: "KI-gestützte Analytik",
            subtitle: "40 ML-Muster in 9 Kategorien -- Entdecken Sie, was Ihre Daten verraten",
            dashboard: {
                title: "Muster-Erkennungs-Dashboard",
                description: "40 Machine-Learning-Muster in den Kategorien Saisonalität, Mond, Equipment, Fokus, Temperatur, Atmosphäre, Optik und Optimierung. Jedes Muster enthält Konfidenzwerte und umsetzbare Empfehlungen.",
                points: [
                    "40 Muster aus IHRER Aufnahmehistorie erkannt",
                    "Konfidenz-bewertete Erkenntnisse mit konkreten Maßnahmen",
                    "KI-gestützte Zusammenfassungen via GPT-4o oder Claude"
                ]
            },
            heatmap: {
                title: "Sensor-Leistungs-Heatmap",
                description: "Räumliche Qualitätskarten über Ihren Sensor zeigen Tilt, Koma, Astigmatismus und Vignettierungsmuster, die in Einzelmetrik-Ansichten unsichtbar sind.",
                points: [
                    "FWHM-, SNR- und Sterndichte-Karten über das Feld",
                    "Aberrationserkennung: Koma, Astigmatismus, Feldkrümmung",
                    "Defekte-Pixel- und Vignettierungsanalyse"
                ]
            },
            exposure: {
                title: "Belichtungs- & SNR-Analyse",
                description: "QE-basierte Belichtungsempfehlungen unter Verwendung der tatsächlichen Quanteneffizienz Ihres Sensors bei jeder Filterwellenlänge. Datenbasiert, nicht aus Faustregeln.",
                points: [
                    "QE-basierte Signal-Rausch-Berechnungen",
                    "Belichtungsoptimierung pro Filter",
                    "Integrationszeit-Planung pro Ziel"
                ]
            },
            patterns: {
                title: "Umgebungs- & Optik-Muster",
                description: "Erkennt bimodale Seeing-Verteilungen, Wolkendecke-Einfluss, Himmelshintergrund-Trends, Feldkrümmungs-Signaturen, Sensor-Tilt und optische Degradation über Zeit.",
                points: [
                    "Bimodale Seeing-Erkennung und Schwellenwerte",
                    "Mondeinfluss-Analyse: Breitband vs. Schmalband",
                    "Optische Qualitätsentwicklung über Sitzungen"
                ]
            },
            session: {
                title: "Sitzungs- & Equipment-Analyse",
                description: "Vergleichen Sie Sitzung für Sitzung die Qualität, verfolgen Sie Equipment-Leistung über Zeit und identifizieren Sie Ihre besten Aufnahmezeiten und Equipment-Konfigurationen.",
                points: [
                    "Identifikation optimaler Aufnahmezeiten",
                    "Equipment-Degradations-Tracking",
                    "Wochentag- vs. Wochenend-Qualitätsanalyse"
                ]
            },
            insights: {
                title: "KI-generierte Erkenntnisse",
                description: "Verständliche Zusammenfassungen Ihrer wichtigsten Muster, generiert von GPT-4o oder Claude. Umsetzbare Empfehlungen spezifisch für Ihr Equipment und Ihren Aufnahmestil.",
                points: [
                    "Personalisierte Verbesserungsempfehlungen",
                    "Equipment-spezifische Optimierungstipps",
                    "Filter- und Zielstrategie-Beratung"
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
    },

    es: {
        // Navigation
        nav: {
            features: "Funciones",
            pricing: "Precios",
            documentation: "Documentación",
            support: "Soporte",
            download: "Descargar"
        },

        // Hero Section
        hero: {
            title: "AstroIndexer",
            subtitle: "Gestión Profesional de Astrofotografía",
            description: "Organice, analice y optimice su flujo de trabajo de astrofotografía con potentes herramientas impulsadas por IA",
            platforms: "Disponible para",
            cta: {
                download: "Descarga Gratuita",
                learnMore: "Más Información"
            }
        },

        // Features Section
        features: {
            title: "Funciones Avanzadas para Astrofotógrafos",
            subtitle: "Todo lo que necesita para gestionar sus datos de imagen astronómica",
            items: {
                organization: {
                    title: "Organización Inteligente",
                    description: "Pipeline de escaneo de 7 etapas que extrae 93+ campos de cabeceras FITS y XISF. Compatible con telescopios inteligentes SeeStar, integración CSV de NINA y detección de imágenes apiladas."
                },
                quality: {
                    title: "Análisis de Calidad",
                    description: "32+ métricas de calidad por frame con ajuste PSF Moffat de 7 parámetros con precisión del 1,5% respecto a PixInsight. 10 detectores automáticos de defectos identifican niebla, trazos, gradientes y aberraciones ópticas."
                },
                equipment: {
                    title: "Gestor de Equipos",
                    description: "Auto-detección desde cabeceras FITS con reconocimiento automático de filtros, detección de ganancia/offset, curvas QE, biblioteca de calibración y configuración de brillo Bortle."
                },
                ml: {
                    title: "Analítica ML",
                    description: "Descubrimiento de 40 patrones en 9 categorías, Recomendador de Combinación AutoIntegrate con 11 paletas y asesor de apilado compatible con PixInsight."
                },
                planning: {
                    title: "Session Planner V2",
                    description: "Recomendaciones de objetivos basadas en su equipo, ubicación, época del año y condiciones del cielo. Pipeline de proyectos de 5 estados con puntuación Smart Plan y análisis lunar."
                },
                integration: {
                    title: "AstroBin y PixInsight",
                    description: "Sincronización de galería AstroBin con insignias de publicación y envío de datos de adquisición. Exportación a PixInsight AutoIntegrate con selección de modo de combinación."
                },
                celestial: {
                    title: "Atlas Celeste y Mapa Estelar",
                    description: "Atlas celeste interactivo con superposiciones FOV y posicionamiento de mosaicos, más un mapa estelar que muestra su cobertura de imagen en el cielo."
                }
            }
        },

        // Details Section (feature showcases)
        details: {
            title: "Vea AstroIndexer en Acción",
            subtitle: "Herramientas potentes diseñadas para astrofotógrafos serios",
            gallery: {
                title: "Galería y Explorador de Archivos",
                description: "Explore toda su colección de astrofotografía con desplazamiento virtual ultrarrápido. Navegación de 6 niveles desde catálogos hasta archivos individuales, filtros inteligentes por calidad, equipo, fase lunar y más.",
                points: [
                    "Desplazamiento virtual para 100.000+ imágenes sin retardo",
                    "Filtros inteligentes con categorías jerárquicas",
                    "Insignias de publicación AstroBin en tarjetas de objetivos",
                    "Insignias de calidad, calibración y filtro de un vistazo"
                ]
            },
            index: {
                title: "Índice y Vista General",
                description: "Su centro de control para todos los datos de imagen. Estadísticas de colección, rendimiento de equipos, sesiones recientes y estado de sincronización AstroBin de un vistazo.",
                points: [
                    "Estadísticas completas con recuentos de objetivos",
                    "Resumen de rendimiento de equipos por configuración",
                    "Estado de publicación AstroBin para cada objetivo",
                    "Acceso rápido a sesiones de escaneo recientes"
                ]
            },
            quality: {
                title: "Análisis de Calidad",
                description: "Mide 32+ métricas de calidad por frame con ajuste PSF Moffat de 7 parámetros y eliminación de valores atípicos en 3 fases. Evaluador V4 con pre-filtro de defectos fatales detecta niebla, nubes y desenfoque antes de puntuar.",
                points: [
                    "Precisión del 1,5% respecto a PixInsight SubframeSelector",
                    "10 detectores automáticos de defectos (niebla, trazos, gradientes, tilt, coma)",
                    "9 multiplicadores de calidad con líneas base adaptativas por equipo",
                    "Mapas de calor del sensor mostrando FWHM, SNR y aberraciones"
                ]
            },
            equipment: {
                title: "Gestor de Equipos",
                description: "Auto-detección de telescopios, cámaras y filtros desde sus cabeceras FITS. Reconocimiento automático de filtros, detección de ganancia/offset, curvas QE, biblioteca de calibración vinculada a objetivos y configuración del sitio de observación.",
                points: [
                    "Reconocimiento automático de filtros (banda ancha, banda estrecha, especial) y detección de ganancia/offset desde cabeceras FITS",
                    "Curvas QE para IMX183, IMX294, IMX455, IMX585 y 5 sensores más con auto-importación",
                    "Biblioteca de calibración: sets auto-creados con coincidencia de temperatura/ganancia, vinculados a objetivos de imagen",
                    "Configuración de ubicación con clase Bortle (1-9), cálculo SQM y sincronización de equipos AstroBin",
                    "Soporte para telescopios inteligentes SeeStar S50, S30 y S30 Pro"
                ]
            },
            planner: {
                title: "Session Planner V2",
                description: "Recomienda objetivos adecuados según las capacidades de su equipo, ubicación de observación, época del año y condiciones del cielo. Pipeline de 5 estados con puntuación Smart Plan.",
                points: [
                    "Puntuación de idoneidad por equipo: coincidencia de objetivos con distancia focal, sensor y campo de visión",
                    "Consciente de ubicación y temporada: altitud, ventanas de visibilidad y cálculo del mejor mes",
                    "Análisis de impacto lunar con umbrales de zona segura por filtro",
                    "Recomendaciones de exposición basadas en QE por filtro",
                    "Exportación NINA XML y Telescopius CSV"
                ]
            },
            skyatlas: {
                title: "Atlas Celeste",
                description: "Atlas celeste interactivo con superposiciones de campo de visión que muestran exactamente lo que captura su equipo. Planifique paneles de mosaico, verifique el encuadre y descubra nuevos objetivos.",
                points: [
                    "Superposición FOV ajustada a su equipo exacto",
                    "Posicionamiento y planificación de paneles de mosaico",
                    "Integración de plate solving",
                    "Búsqueda de objetivos con referencia cruzada de catálogos"
                ]
            },
            celestial: {
                title: "Mapa Celeste Interactivo",
                description: "Visualice toda su colección de imágenes en un mapa celeste interactivo. Vea las brechas de cobertura, planifique futuras sesiones y explore su viaje en astrofotografía.",
                points: [
                    "Visualización 3D del cielo interactiva",
                    "Superposición de mapa de calor de cobertura",
                    "Seguimiento y planificación de objetos",
                    "Actualizaciones de posición en tiempo real"
                ]
            },
            astrobin: {
                title: "Integración AstroBin",
                description: "Sincronice su galería AstroBin con coincidencia automática de ID de catálogo. Vea qué objetivos ha publicado, envíe datos de adquisición y muestre insignias de publicación en su galería local.",
                points: [
                    "Sincronización de galería con un clic y auto-coincidencia",
                    "Insignias de publicación en miniaturas de galería",
                    "Envío de recuentos de sub-frames y datos de filtros a AstroBin",
                    "Navegación offline con datos en caché"
                ]
            },
            stacking: {
                title: "Asesor de Apilado",
                description: "Selección de frames compatible con PixInsight con Winsorized Sigma Clipping a umbral 2,2. El Recomendador de Combinación AutoIntegrate selecciona la paleta óptima de 11 opciones según sus filtros y tipo de objeto.",
                points: [
                    "Selección inteligente de paleta: SHO, HOO, LRGB, Dynamic SHO y más",
                    "Niveles de calidad: Excelente, Bueno, Pobre con balance por filtro",
                    "Flujo de recombinación de estrellas StarXTerminator + RGB banda ancha",
                    "Exportación con un clic a PixInsight AutoIntegrate JSON"
                ]
            },
            catalogue: {
                title: "Seguimiento de Catálogos",
                description: "Siga su progreso a través de 26+ catálogos astronómicos incluyendo Messier (110), NGC (7.840), IC (5.386), Caldwell, Sharpless y más con cuadrículas visuales codificadas por color.",
                points: [
                    "Verde = procesado, amarillo = solo datos brutos, gris = no capturado",
                    "Resolución de alias entre catálogos (M42 = NGC 1976)",
                    "Menú contextual: vista previa, abrir en galería, consulta SIMBAD",
                    "Porcentaje de completitud por catálogo"
                ]
            }
        },

        // ML Analytics Section
        ml: {
            title: "Analítica Impulsada por IA",
            subtitle: "40 Patrones ML en 9 Categorías -- Descubra lo que Revelan sus Datos",
            dashboard: {
                title: "Panel de Descubrimiento de Patrones",
                description: "40 patrones de machine learning en categorías estacionales, lunares, de equipo, enfoque, térmicas, atmosféricas, ópticas y de optimización. Cada patrón incluye puntuaciones de confianza y recomendaciones accionables.",
                points: [
                    "40 patrones descubiertos de SU historial de imágenes",
                    "Insights con puntuación de confianza y acciones específicas",
                    "Resúmenes generados por IA vía GPT-4o o Claude"
                ]
            },
            heatmap: {
                title: "Mapa de Calor del Sensor",
                description: "Mapas de calidad espacial del sensor revelan tilt, coma, astigmatismo y patrones de viñeteo invisibles en vistas de métrica única.",
                points: [
                    "Mapas de FWHM, SNR y densidad de estrellas del campo",
                    "Detección de aberraciones: coma, astigmatismo, curvatura de campo",
                    "Análisis de píxeles muertos y viñeteo"
                ]
            },
            exposure: {
                title: "Análisis de Exposición y SNR",
                description: "Recomendaciones de exposición basadas en QE usando la eficiencia cuántica real de su sensor a cada longitud de onda del filtro. Basado en datos, no en reglas empíricas.",
                points: [
                    "Cálculos señal-ruido basados en QE",
                    "Optimización de exposición por filtro",
                    "Planificación de tiempo de integración por objetivo"
                ]
            },
            patterns: {
                title: "Patrones Ambientales y Ópticos",
                description: "Descubre bimodalidad del seeing, impacto de cobertura nubosa, tendencias de gradiente del cielo, firmas de curvatura de campo, tilt del sensor y degradación óptica en el tiempo.",
                points: [
                    "Detección de seeing bimodal y umbrales",
                    "Análisis de impacto lunar: banda ancha vs banda estrecha",
                    "Tendencia de calidad óptica entre sesiones"
                ]
            },
            session: {
                title: "Análisis de Sesiones y Equipos",
                description: "Compare la calidad sesión por sesión, rastree el rendimiento del equipo en el tiempo e identifique sus mejores horas de imagen y configuraciones de equipo.",
                points: [
                    "Identificación de horas óptimas de imagen",
                    "Seguimiento de degradación de equipos",
                    "Análisis de calidad entre semana vs fin de semana"
                ]
            },
            insights: {
                title: "Insights Generados por IA",
                description: "Resúmenes legibles de sus patrones más impactantes, generados por GPT-4o o Claude. Recomendaciones accionables específicas para su equipo y estilo de imagen.",
                points: [
                    "Recomendaciones de mejora personalizadas",
                    "Consejos de optimización específicos por equipo",
                    "Orientación sobre estrategia de filtros y objetivos"
                ]
            }
        },

        // Download Section
        download: {
            title: "Descargar AstroIndexer",
            subtitle: "Prueba gratuita, disponible para todas las plataformas",
            windows: {
                detail: "Instalador (.exe) \u00b7 Windows 10+"
            },
            macos: {
                detail: "Universal (.zip) \u00b7 macOS 12+"
            },
            linux: {
                detail: "Archivo (.tar.gz) \u00b7 Ubuntu 22.04+"
            },
            note: "Prueba gratuita de 30 días con acceso completo. Sin necesidad de cuenta."
        },

        // Pricing Section
        pricing: {
            title: "Elija su Plan",
            subtitle: "Precios flexibles para aficionados y profesionales",
            trial: {
                title: "Prueba Gratuita",
                price: "Gratis",
                duration: "30 días",
                features: [
                    "Acceso completo a todas las funciones",
                    "Hasta 1000 imágenes",
                    "Soporte básico",
                    "Todas las herramientas de análisis"
                ],
                cta: "Iniciar Prueba Gratuita"
            },
            personal: {
                title: "Estándar",
                price: "49€",
                duration: "pago único",
                features: [
                    "Imágenes ilimitadas",
                    "Todas las funciones incluidas",
                    "Soporte prioritario",
                    "Actualizaciones de por vida",
                    "Licencia multi-ordenador"
                ],
                cta: "Comprar Ahora"
            },
            professional: {
                title: "Profesional",
                price: "89€",
                duration: "pago único",
                features: [
                    "Todo lo de Estándar",
                    "Uso comercial",
                    "Funciones ML avanzadas",
                    "Perfiles de equipo personalizados",
                    "Acceso API",
                    "Soporte premium"
                ],
                cta: "Contactar Ventas"
            }
        },

        // Footer
        footer: {
            product: {
                title: "Producto",
                links: {
                    features: "Funciones",
                    pricing: "Precios",
                    changelog: "Historial de Cambios",
                    roadmap: "Hoja de Ruta"
                }
            },
            support: {
                title: "Soporte",
                links: {
                    documentation: "Documentación",
                    guides: "Guías de Usuario",
                    faq: "FAQ",
                    contact: "Contacto"
                }
            },
            company: {
                title: "Empresa",
                links: {
                    about: "Acerca de",
                    blog: "Blog",
                    privacy: "Política de Privacidad",
                    terms: "Términos de Servicio"
                }
            },
            copyright: "© 2025 AstroIndexer. Todos los derechos reservados."
        }
    }
};

// Language detection and management
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.supportedLanguages = ['en', 'de', 'es'];
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

            // Spanish-speaking countries timezones
            const spanishTimezones = [
                'Europe/Madrid', 'Atlantic/Canary',
                'America/Mexico_City', 'America/Bogota',
                'America/Buenos_Aires', 'America/Santiago',
                'America/Lima'
            ];
            if (spanishTimezones.includes(timezone)) {
                this.currentLang = 'es';
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
            const descriptions = {
                en: 'AstroIndexer - Professional astrophotography data management and analysis software',
                de: 'AstroIndexer - Professionelle Software zur Verwaltung und Analyse von Astrofotografie-Daten',
                es: 'AstroIndexer - Software profesional de gestión y análisis de datos de astrofotografía'
            };
            metaDesc.content = descriptions[this.currentLang] || descriptions.en;
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