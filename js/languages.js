// Language translations for AstroIndexer website
const translations = {
    en: {
        // Navigation
        nav: {
            insights: "Insights",
            features: "Features",
            pricing: "Pricing",
            documentation: "Documentation",
            support: "Support",
            download: "Download"
        },

        // Hero Section
        hero: {
            title: "AstroIndexer",
            subtitle: "Understand Your Astrophotography",
            description: "AstroIndexer analyzes your imaging history to reveal equipment performance, seeing patterns, and what actually improves your results.",
            platforms: "Available for",
            cta: {
                download: "Download Free",
                learnMore: "Learn More"
            },
            priceTeaser: "One-time purchase from €49 · Free 30-day trial"
        },

        // Features Section
        features: {
            title: "Powerful Features for Astrophotographers",
            subtitle: "Everything you need to manage your astronomical imaging data",
            badge: {
                standard: "Standard",
                pro: "Pro"
            },
            items: {
                organization: {
                    title: "Smart Organization",
                    description: "7-stage scanning pipeline extracts 93+ fields from FITS and XISF headers. Supports SeeStar smart telescopes, NINA CSV integration, and stacked-image detection."
                },
                gallery: {
                    title: "Gallery & File Browser",
                    description: "Browse 100,000+ frames with virtual scrolling, 6-level drill-down, smart filters by quality, equipment, and moon phase."
                },
                equipment: {
                    title: "Equipment Manager",
                    description: "Auto-discovery from FITS headers with automatic filter recognition, gain/offset detection, QE sensor curves, calibration library, and Bortle sky brightness settings."
                },
                statistics: {
                    title: "Statistics & Reporting",
                    description: "Session statistics, exposure totals by target and filter, equipment performance baselines, and quality distribution analysis."
                },
                planning: {
                    title: "Session Planner V2",
                    description: "Equipment-aware target recommendations based on your optics, location, season, and sky conditions. 5-state project pipeline with Smart Plan scoring and moon analysis."
                },
                catalogue: {
                    title: "Catalogue Completion",
                    description: "Track progress across 26+ astronomical catalogues including Messier, NGC, IC, Caldwell, and Sharpless with color-coded visual grids."
                },
                autopilot: {
                    title: "Autopilot Pipeline",
                    description: "One-click automated workflow: scan folders, detect equipment, create calibration sets, run quality analysis, and ML analytics in a single pipeline."
                },
                integration: {
                    title: "PixInsight & AstroBin",
                    description: "AstroBin gallery sync with published badges and acquisition push. PixInsight AutoIntegrate export with combination mode selection."
                },
                celestial: {
                    title: "Sky Atlas & Celestial Map",
                    description: "Interactive sky atlas with FOV overlays and mosaic positioning, plus a celestial map showing your imaging coverage across the sky."
                },
                quality: {
                    title: "Quality Analysis",
                    description: "32+ quality metrics per frame with Moffat 7-parameter PSF fitting within 1.5% of PixInsight. 10 automatic defect detectors catch fog, trailing, gradients, and optical aberrations."
                },
                ml: {
                    title: "ML Analytics",
                    description: "40-pattern discovery across 9 categories, AutoIntegrate Combination Recommender with 11 palettes, and PixInsight-aligned stacking advisor."
                },
                aiinsights: {
                    title: "AI Imaging Advisor",
                    description: "AI-generated recommendations for frame selection, stacking strategies, and equipment optimization. Powered by GPT-4o or Claude."
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
            autopilot: {
                title: "One-Click Autopilot Setup",
                description: "Point AstroIndexer at your imaging folder and let Autopilot handle everything: scanning, equipment detection, tagging, calibration set creation, gain/offset setup, quality analysis, and ML analytics -- all in one automated pipeline.",
                points: [
                    "Scans and indexes all FITS/XISF files automatically",
                    "Auto-detects equipment, creates calibration sets, populates gain/offset",
                    "Optional Quality Analysis (FWHM, HFR, star detection) in the same run",
                    "Optional ML Analytics (pattern discovery, stacking recommendations)",
                    "Optional PixInsight Auto-Stack via AutoIntegrate"
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
                    "Offline browsing with cached data",
                    "Equipment Presets — sync telescope, camera, mount, filter, and accessory setups from your AstroBin profile"
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
            note: "Free 30-day trial with full access. No account required.",
            trialLicense: "Download Trial License"
        },

        // Imaging Insights
        insights: {
            title: "Your Data Tells a Story",
            subtitle: "AstroIndexer doesn't just store your images. It reveals what years of imaging data can teach you.",
            cards: {
                seeing: {
                    value: '1.9"',
                    label: "Best Seeing Achieved",
                    detail: "Automatically tracked across all sessions"
                },
                sessions: {
                    value: "62",
                    label: "Sessions Analyzed",
                    detail: "Every night contributes to your performance profile"
                },
                setup: {
                    value: "APO 94mm",
                    label: "Most Productive Setup",
                    detail: "Ranked by quality-weighted imaging hours"
                },
                efficiency: {
                    value: "41%",
                    label: "Clear Sky Efficiency",
                    detail: "Usable frames vs. total captured"
                },
                months: {
                    value: "May, Sep",
                    label: "Best Imaging Months",
                    detail: "Based on your historical quality scores"
                },
                frames: {
                    value: "1,909",
                    label: "Frames Indexed",
                    detail: "Every frame builds a smarter analysis"
                }
            },
            caption: "Example data from a real imaging setup. Your insights are generated from your own sessions.",
            cta: {
                text: "Discover what your astrophotography data reveals.",
                button: "Try It Free"
            }
        },

        problem: {
            lead: "Thousands of frames. Dozens of imaging sessions. Years of data.",
            question: "But which nights produced your best results?"
        },
        // Real Dataset
        realdata: {
            title: "Real Imaging Dataset Analysis",
            subtitle: "Dataset analyzed with AstroIndexer",
            frames: { label: "Frames Indexed" },
            nights: { label: "Imaging Nights" },
            seeing: { label: "Best Seeing" },
            fwhm: { label: "Average FWHM" },
            setup: { value: "APO 94mm + QHY268M", label: "Most Productive Setup" },
            months: { value: "May, Jun, Sep", label: "Best Imaging Months" },
            caption: "All metrics extracted automatically from FITS headers and quality analysis. No manual data entry."
        },
        equipperf: {
            title: "Discover What Your Data Reveals",
            subtitle: "AstroIndexer analyzes thousands of frames across multiple sessions and equipment setups. Compare telescope performance, filter efficiency, and image quality metrics across your entire dataset.",
            comparison: {
                label: "Equipment Performance Comparison",
                desc: "FWHM, ellipticity, SNR, star counts, tracking RMS, and moon phase impact \u2014 compared across every setup you own."
            },
            baseline: {
                label: "Baseline Metrics Comparison",
                desc: "Statistical baselines with standard deviations for each telescope and camera combination. See exactly which setup produces the sharpest stars."
            },
            callout: {
                title: "Best Performing Combination",
                desc: "AstroIndexer automatically identifies your best-performing telescope, camera, and filter combination based on quality-weighted analysis across all sessions."
            }
        },
        audience: {
            title: "Who AstroIndexer Is Built For",
            items: [
                "Astrophotographers managing thousands of frames across years of imaging",
                "Users running NINA, Voyager, or APT capture workflows who need data intelligence",
                "Imagers who process in PixInsight or AstroPixelProcessor and want frame-level quality insights",
                "Home observatories and remote setups tracking equipment performance over time"
            ]
        },
        ecosystem: {
            title: "Works With Your Existing Workflow",
            subtitle: "AstroIndexer complements the tools you already use",
            capture: { label: "Capture", tools: "NINA \u00b7 Voyager \u00b7 APT" },
            process: { label: "Process", tools: "PixInsight \u00b7 APP \u00b7 Siril" },
            intelligence: { label: "Data Intelligence" }
        },
        why: {
            title: "Why AstroIndexer Exists",
            text1: "Astrophotographers accumulate thousands of frames across years of imaging. But answering simple questions is surprisingly difficult:",
            questions: [
                "Which nights had the best seeing?",
                "Which telescope and camera combination performs best?",
                "Which filters produce the highest quality data?",
                "How has my imaging improved over time?"
            ],
            text2: "AstroIndexer analyzes your entire imaging history to reveal those answers automatically.",
            builder: "Built by an astrophotographer who wanted to understand years of imaging data instead of managing folders and spreadsheets."
        },
        trust: {
            items: [
                "One-time purchase \u2014 no subscription",
                "Runs locally on your computer",
                "No cloud upload \u2014 your data stays private",
                "No internet required \u2014 works at remote dark sites",
                "Continuous development \u2014 new features released regularly",
                "Community feedback shapes the roadmap"
            ]
        },
        workflow: {
            title: "From Folders to Insights in 5 Steps",
            steps: [
                "Point AstroIndexer at your imaging folders",
                "Autopilot scans and indexes all frames",
                "Quality analysis scores every image",
                "ML analytics discovers hidden patterns",
                "Insights reveal your best setups and conditions"
            ]
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
                    "All core features",
                    "Equipment database",
                    "Session statistics & planning",
                    "Multi-computer license",
                    "Lifetime updates"
                ],
                cta: "Buy Now"
            },
            professional: {
                title: "Professional",
                price: "€89",
                duration: "one-time",
                features: [
                    "Everything in Standard",
                    "Advanced Quality Analysis",
                    "Machine Learning Analytics",
                    "Photometry Tools",
                    "Custom equipment profiles"
                ],
                cta: "Buy Now"
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
            insights: "Einblicke",
            features: "Funktionen",
            pricing: "Preise",
            documentation: "Dokumentation",
            support: "Support",
            download: "Herunterladen"
        },

        // Hero Section
        hero: {
            title: "AstroIndexer",
            subtitle: "Verstehe deine Astrofotografie",
            description: "AstroIndexer analysiert deine Aufnahmehistorie und zeigt Equipment-Performance, Seeing-Muster und was deine Ergebnisse wirklich verbessert.",
            platforms: "Verf\u00fcgbar f\u00fcr",
            cta: {
                download: "Kostenlos herunterladen",
                learnMore: "Mehr erfahren"
            },
            priceTeaser: "Einmaliger Kauf ab €49 · 30 Tage kostenlos testen"
        },

        // Features Section
        features: {
            title: "Leistungsstarke Funktionen für Astrofotografen",
            subtitle: "Alles, was Sie zur Verwaltung Ihrer astronomischen Bilddaten benötigen",
            badge: {
                standard: "Standard",
                pro: "Pro"
            },
            items: {
                organization: {
                    title: "Intelligente Organisation",
                    description: "7-stufige Scan-Pipeline extrahiert 93+ Felder aus FITS- und XISF-Headern. Unterst\u00fctzt SeeStar Smart-Teleskope, NINA CSV-Integration und Stacked-Image-Erkennung."
                },
                gallery: {
                    title: "Galerie & Dateibrowser",
                    description: "100.000+ Aufnahmen mit virtuellem Scrollen durchsuchen, 6-stufiger Drill-Down, intelligente Filter nach Qualit\u00e4t, Equipment und Mondphase."
                },
                equipment: {
                    title: "Equipment Manager",
                    description: "Auto-Erkennung aus FITS-Headern mit automatischer Filtererkennung, Gain/Offset-Erkennung, QE-Sensorkurven, Kalibrationsbibliothek und Bortle Himmelshelligkeit-Einstellungen."
                },
                statistics: {
                    title: "Statistiken & Berichte",
                    description: "Session-Statistiken, Belichtungsstunden nach Ziel und Filter, Equipment-Leistungsbaselines und Qualit\u00e4tsverteilungsanalyse."
                },
                planning: {
                    title: "Session Planner V2",
                    description: "Equipment-bewusste Zielempfehlungen basierend auf Ihrer Optik, Standort, Jahreszeit und Himmelsbedingungen. 5-Stufen-Projekt-Pipeline mit Smart Plan Bewertung und Mondanalyse."
                },
                catalogue: {
                    title: "Katalog-Fortschritt",
                    description: "Fortschritt \u00fcber 26+ astronomische Kataloge verfolgen: Messier, NGC, IC, Caldwell und Sharpless mit farbcodierten visuellen Rastern."
                },
                autopilot: {
                    title: "Autopilot-Pipeline",
                    description: "Ein-Klick-Workflow: Ordner scannen, Equipment erkennen, Kalibrationssets erstellen, Qualit\u00e4tsanalyse und ML-Analytik in einer Pipeline."
                },
                integration: {
                    title: "PixInsight & AstroBin",
                    description: "AstroBin Galerie-Synchronisation mit Ver\u00f6ffentlichungs-Badges und Aufnahmedaten-Push. PixInsight AutoIntegrate Export mit Kombinationsmodus-Auswahl."
                },
                celestial: {
                    title: "Himmelsatlas & Sternkarte",
                    description: "Interaktiver Himmelsatlas mit FOV-Overlays und Mosaik-Positionierung, plus Sternkarte mit Ihrer Aufnahmeabdeckung am Himmel."
                },
                quality: {
                    title: "Qualit\u00e4tsanalyse",
                    description: "32+ Qualit\u00e4tsmetriken pro Aufnahme mit Moffat 7-Parameter PSF-Fitting innerhalb von 1,5% PixInsight-Genauigkeit. 10 automatische Defektdetektoren erkennen Nebel, Nachf\u00fchrfehler, Gradienten und optische Aberrationen."
                },
                ml: {
                    title: "ML-Analytik",
                    description: "40-Muster-Erkennung in 9 Kategorien, AutoIntegrate Kombinations-Empfehlung mit 11 Paletten und PixInsight-kompatibler Stacking-Advisor."
                },
                aiinsights: {
                    title: "KI-Aufnahmeberater",
                    description: "KI-generierte Empfehlungen f\u00fcr Frame-Auswahl, Stacking-Strategien und Equipment-Optimierung. Angetrieben von GPT-4o oder Claude."
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
            autopilot: {
                title: "Ein-Klick Autopilot-Einrichtung",
                description: "Richten Sie AstroIndexer auf Ihren Aufnahmeordner und lassen Sie den Autopilot alles erledigen: Scannen, Equipment-Erkennung, Tagging, Kalibrationsset-Erstellung, Gain/Offset-Setup, Qualitätsanalyse und ML-Analytik -- alles in einer automatisierten Pipeline.",
                points: [
                    "Scannt und indexiert alle FITS/XISF-Dateien automatisch",
                    "Auto-Erkennung von Equipment, Erstellung von Kalibrationssets, Gain/Offset-Befüllung",
                    "Optionale Qualitätsanalyse (FWHM, HFR, Sternerkennung) im gleichen Durchlauf",
                    "Optionale ML-Analytik (Mustererkennung, Stacking-Empfehlungen)",
                    "Optionales PixInsight Auto-Stacking via AutoIntegrate"
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
                    "Offline-Browsing mit zwischengespeicherten Daten",
                    "Equipment-Presets — Teleskop-, Kamera-, Montierungs-, Filter- und Zubehör-Setups aus Ihrem AstroBin-Profil synchronisieren"
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
            note: "30 Tage kostenlose Testversion mit vollem Zugang. Kein Konto erforderlich.",
            trialLicense: "Testlizenz herunterladen"
        },

        // Imaging Insights
        insights: {
            title: "Ihre Daten erz\u00e4hlen eine Geschichte",
            subtitle: "AstroIndexer speichert nicht nur Ihre Bilder. Es zeigt, was Jahre an Aufnahmedaten verraten.",
            cards: {
                seeing: {
                    value: '1,9"',
                    label: "Bestes Seeing",
                    detail: "Automatisch \u00fcber alle Sessions erfasst"
                },
                sessions: {
                    value: "62",
                    label: "Sessions analysiert",
                    detail: "Jede Nacht tr\u00e4gt zu Ihrem Leistungsprofil bei"
                },
                setup: {
                    value: "APO 94mm",
                    label: "Produktivstes Setup",
                    detail: "Nach qualit\u00e4tsgewichteten Aufnahmestunden"
                },
                efficiency: {
                    value: "41%",
                    label: "Klarer-Himmel-Effizienz",
                    detail: "Nutzbare Frames vs. Gesamtaufnahmen"
                },
                months: {
                    value: "Mai, Sep",
                    label: "Beste Aufnahmemonate",
                    detail: "Basierend auf historischen Qualit\u00e4tswerten"
                },
                frames: {
                    value: "1.909",
                    label: "Frames indexiert",
                    detail: "Jedes Frame verbessert die Analyse"
                }
            },
            caption: "Beispieldaten eines realen Aufnahme-Setups. Ihre Insights werden aus Ihren eigenen Sessions generiert.",
            cta: {
                text: "Entdecken Sie, was Ihre Astrofotografie-Daten verraten.",
                button: "Kostenlos testen"
            }
        },

        problem: {
            lead: "Thousands of frames. Dozens of imaging sessions. Years of data.",
            question: "But which nights produced your best results?"
        },
        realdata: {
            title: "Analyse eines realen Bilddatensatzes",
            subtitle: "Datensatz analysiert mit AstroIndexer",
            frames: { label: "Frames indexiert" },
            nights: { label: "Aufnahmen\u00e4chte" },
            seeing: { label: "Bestes Seeing" },
            fwhm: { label: "Durchschnittlicher FWHM" },
            setup: { value: "APO 94mm + QHY268M", label: "Produktivstes Setup" },
            months: { value: "Mai, Jun, Sep", label: "Beste Aufnahmemonate" },
            caption: "Alle Messwerte automatisch aus FITS-Headern und Qualit\u00e4tsanalyse extrahiert. Keine manuelle Dateneingabe."
        },
        equipperf: {
            title: "Entdecke, was deine Daten verraten",
            subtitle: "AstroIndexer analysiert Tausende von Frames \u00fcber mehrere Sessions und Equipment-Setups. Vergleiche Teleskop-Performance, Filter-Effizienz und Bildqualit\u00e4t \u00fcber deinen gesamten Datensatz.",
            comparison: {
                label: "Equipment-Performance-Vergleich",
                desc: "FWHM, Elliptizit\u00e4t, SNR, Sternanzahl, Tracking-RMS und Mondphasen-Einfluss \u2014 verglichen \u00fcber alle deine Setups."
            },
            baseline: {
                label: "Baseline-Metrik-Vergleich",
                desc: "Statistische Baselines mit Standardabweichungen f\u00fcr jede Teleskop-Kamera-Kombination. Sieh genau, welches Setup die sch\u00e4rfsten Sterne liefert."
            },
            callout: {
                title: "Beste Equipment-Kombination",
                desc: "AstroIndexer identifiziert automatisch deine leistungsst\u00e4rkste Teleskop-, Kamera- und Filter-Kombination basierend auf qualit\u00e4tsgewichteter Analyse aller Sessions."
            }
        },
        audience: {
            title: "F\u00fcr wen AstroIndexer entwickelt wurde",
            items: [
                "Astrofotografen, die Tausende von Frames \u00fcber Jahre verwalten",
                "Nutzer von NINA, Voyager oder APT, die Daten-Intelligenz brauchen",
                "Bildbearbeiter mit PixInsight oder AstroPixelProcessor, die Frame-Qualit\u00e4t verstehen wollen",
                "Heim-Sternwarten und Remote-Setups, die Equipment-Performance \u00fcber die Zeit verfolgen"
            ]
        },
        ecosystem: {
            title: "Arbeitet mit deinem bestehenden Workflow",
            subtitle: "AstroIndexer erg\u00e4nzt die Tools, die du bereits nutzt",
            capture: { label: "Aufnahme", tools: "NINA \u00b7 Voyager \u00b7 APT" },
            process: { label: "Verarbeitung", tools: "PixInsight \u00b7 APP \u00b7 Siril" },
            intelligence: { label: "Daten-Intelligenz" }
        },
        why: {
            title: "Warum AstroIndexer existiert",
            text1: "Astrofotografen sammeln Tausende von Aufnahmen \u00fcber Jahre. Aber einfache Fragen zu beantworten ist \u00fcberraschend schwierig:",
            questions: [
                "Welche N\u00e4chte hatten das beste Seeing?",
                "Welche Teleskop-Kamera-Kombination liefert die besten Ergebnisse?",
                "Welche Filter erzeugen die h\u00f6chste Datenqualit\u00e4t?",
                "Wie hat sich meine Bildqualit\u00e4t \u00fcber die Zeit verbessert?"
            ],
            text2: "AstroIndexer analysiert deine gesamte Aufnahmehistorie und liefert diese Antworten automatisch.",
            builder: "Entwickelt von einem Astrofotografen, der seine jahrelangen Aufnahmedaten verstehen wollte \u2014 statt Ordner und Tabellen zu verwalten."
        },
        trust: {
            items: [
                "Einmaliger Kauf \u2014 kein Abo",
                "L\u00e4uft lokal auf deinem Computer",
                "Kein Cloud-Upload \u2014 deine Daten bleiben privat",
                "Kein Internet erforderlich \u2014 funktioniert an entlegenen Beobachtungsorten",
                "Kontinuierliche Weiterentwicklung \u2014 regelm\u00e4\u00dfig neue Features",
                "Community-Feedback bestimmt die Roadmap"
            ]
        },
        workflow: {
            title: "Von Ordnern zu Erkenntnissen in 5 Schritten",
            steps: [
                "AstroIndexer auf deine Aufnahmeordner zeigen",
                "Autopilot scannt und indexiert alle Frames",
                "Qualit\u00e4tsanalyse bewertet jedes Bild",
                "ML-Analytik entdeckt verborgene Muster",
                "Einblicke zeigen deine besten Setups und Bedingungen"
            ]
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
                    "Alle Kernfunktionen",
                    "Equipment-Datenbank",
                    "Session-Statistiken & Planung",
                    "Mehrcomputer-Lizenz",
                    "Lebenslange Updates"
                ],
                cta: "Jetzt kaufen"
            },
            professional: {
                title: "Professionell",
                price: "89€",
                duration: "einmalig",
                features: [
                    "Alles aus Standard",
                    "Erweiterte Qualitätsanalyse",
                    "Machine-Learning-Analytik",
                    "Photometrie-Tools",
                    "Benutzerdefinierte Equipment-Profile"
                ],
                cta: "Jetzt kaufen"
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
            insights: "Perspectivas",
            features: "Funciones",
            pricing: "Precios",
            documentation: "Documentación",
            support: "Soporte",
            download: "Descargar"
        },

        // Hero Section
        hero: {
            title: "AstroIndexer",
            subtitle: "Comprende tu astrofotograf\u00eda",
            description: "AstroIndexer analiza tu historial de imagen para revelar rendimiento de equipo, patrones de seeing y lo que realmente mejora tus resultados.",
            platforms: "Disponible para",
            cta: {
                download: "Descarga Gratuita",
                learnMore: "Más Información"
            },
            priceTeaser: "Compra única desde €49 · Prueba gratuita de 30 días"
        },

        // Features Section
        features: {
            title: "Funciones Avanzadas para Astrofotógrafos",
            subtitle: "Todo lo que necesita para gestionar sus datos de imagen astronómica",
            badge: {
                standard: "Est\u00e1ndar",
                pro: "Pro"
            },
            items: {
                organization: {
                    title: "Organizaci\u00f3n Inteligente",
                    description: "Pipeline de escaneo de 7 etapas que extrae 93+ campos de cabeceras FITS y XISF. Compatible con telescopios inteligentes SeeStar, integraci\u00f3n CSV de NINA y detecci\u00f3n de im\u00e1genes apiladas."
                },
                gallery: {
                    title: "Galer\u00eda y Explorador",
                    description: "Explore 100.000+ frames con scroll virtual, navegaci\u00f3n de 6 niveles, filtros inteligentes por calidad, equipo y fase lunar."
                },
                equipment: {
                    title: "Gestor de Equipos",
                    description: "Auto-detecci\u00f3n desde cabeceras FITS con reconocimiento autom\u00e1tico de filtros, detecci\u00f3n de ganancia/offset, curvas QE, biblioteca de calibraci\u00f3n y configuraci\u00f3n de brillo Bortle."
                },
                statistics: {
                    title: "Estad\u00edsticas e Informes",
                    description: "Estad\u00edsticas de sesi\u00f3n, totales de exposici\u00f3n por objetivo y filtro, l\u00edneas base de rendimiento de equipo y an\u00e1lisis de distribuci\u00f3n de calidad."
                },
                planning: {
                    title: "Session Planner V2",
                    description: "Recomendaciones de objetivos basadas en su equipo, ubicaci\u00f3n, \u00e9poca del a\u00f1o y condiciones del cielo. Pipeline de proyectos de 5 estados con puntuaci\u00f3n Smart Plan y an\u00e1lisis lunar."
                },
                catalogue: {
                    title: "Completitud de Cat\u00e1logos",
                    description: "Seguimiento del progreso en 26+ cat\u00e1logos astron\u00f3micos: Messier, NGC, IC, Caldwell y Sharpless con cuadr\u00edculas visuales codificadas por colores."
                },
                autopilot: {
                    title: "Pipeline Autopilot",
                    description: "Flujo de trabajo automatizado: escanear carpetas, detectar equipo, crear sets de calibraci\u00f3n, ejecutar an\u00e1lisis de calidad y ML en una sola pipeline."
                },
                integration: {
                    title: "PixInsight y AstroBin",
                    description: "Sincronizaci\u00f3n de galer\u00eda AstroBin con insignias de publicaci\u00f3n y env\u00edo de datos de adquisici\u00f3n. Exportaci\u00f3n a PixInsight AutoIntegrate con selecci\u00f3n de modo de combinaci\u00f3n."
                },
                celestial: {
                    title: "Atlas Celeste y Mapa Estelar",
                    description: "Atlas celeste interactivo con superposiciones FOV y posicionamiento de mosaicos, m\u00e1s un mapa estelar que muestra su cobertura de imagen en el cielo."
                },
                quality: {
                    title: "An\u00e1lisis de Calidad",
                    description: "32+ m\u00e9tricas de calidad por frame con ajuste PSF Moffat de 7 par\u00e1metros con precisi\u00f3n del 1,5% respecto a PixInsight. 10 detectores autom\u00e1ticos de defectos identifican niebla, trazos, gradientes y aberraciones \u00f3pticas."
                },
                ml: {
                    title: "Anal\u00edtica ML",
                    description: "Descubrimiento de 40 patrones en 9 categor\u00edas, Recomendador de Combinaci\u00f3n AutoIntegrate con 11 paletas y asesor de apilado compatible con PixInsight."
                },
                aiinsights: {
                    title: "Asesor de Imagen IA",
                    description: "Recomendaciones generadas por IA para selecci\u00f3n de frames, estrategias de apilado y optimizaci\u00f3n de equipo. Impulsado por GPT-4o o Claude."
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
            autopilot: {
                title: "Configuración Autopilot con Un Clic",
                description: "Apunte AstroIndexer a su carpeta de imágenes y deje que Autopilot se encargue de todo: escaneo, detección de equipos, etiquetado, creación de sets de calibración, configuración de ganancia/offset, análisis de calidad y analítica ML -- todo en un pipeline automatizado.",
                points: [
                    "Escanea e indexa todos los archivos FITS/XISF automáticamente",
                    "Auto-detección de equipos, creación de sets de calibración, configuración de ganancia/offset",
                    "Análisis de Calidad opcional (FWHM, HFR, detección de estrellas) en la misma ejecución",
                    "Analítica ML opcional (descubrimiento de patrones, recomendaciones de apilado)",
                    "Auto-apilado PixInsight opcional vía AutoIntegrate"
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
                    "Navegación offline con datos en caché",
                    "Equipment Presets — sincronice configuraciones de telescopio, cámara, montura, filtros y accesorios desde su perfil AstroBin"
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
            note: "Prueba gratuita de 30 días con acceso completo. Sin necesidad de cuenta.",
            trialLicense: "Descargar Licencia de Prueba"
        },

        // Imaging Insights
        insights: {
            title: "Tus Datos Cuentan una Historia",
            subtitle: "AstroIndexer no solo almacena tus im\u00e1genes. Revela lo que a\u00f1os de datos de imagen pueden ense\u00f1arte.",
            cards: {
                seeing: {
                    value: '1,9"',
                    label: "Mejor Seeing Conseguido",
                    detail: "Rastreado autom\u00e1ticamente en todas las sesiones"
                },
                sessions: {
                    value: "62",
                    label: "Sesiones Analizadas",
                    detail: "Cada noche contribuye a tu perfil de rendimiento"
                },
                setup: {
                    value: "APO 94mm",
                    label: "Setup M\u00e1s Productivo",
                    detail: "Clasificado por horas de imagen ponderadas por calidad"
                },
                efficiency: {
                    value: "41%",
                    label: "Eficiencia de Cielo Despejado",
                    detail: "Frames utilizables vs. total capturado"
                },
                months: {
                    value: "May, Sep",
                    label: "Mejores Meses de Imagen",
                    detail: "Basado en tus puntuaciones hist\u00f3ricas de calidad"
                },
                frames: {
                    value: "1.909",
                    label: "Frames Indexados",
                    detail: "Cada frame mejora el an\u00e1lisis"
                }
            },
            caption: "Datos de ejemplo de una configuraci\u00f3n real. Tus insights se generan a partir de tus propias sesiones.",
            cta: {
                text: "Descubre lo que revelan tus datos de astrofotograf\u00eda.",
                button: "Probar Gratis"
            }
        },

        problem: {
            lead: "Thousands of frames. Dozens of imaging sessions. Years of data.",
            question: "But which nights produced your best results?"
        },
        realdata: {
            title: "An\u00e1lisis de un conjunto de datos real",
            subtitle: "Conjunto de datos analizado con AstroIndexer",
            frames: { label: "Frames indexados" },
            nights: { label: "Noches de imagen" },
            seeing: { label: "Mejor Seeing" },
            fwhm: { label: "FWHM promedio" },
            setup: { value: "APO 94mm + QHY268M", label: "Setup m\u00e1s productivo" },
            months: { value: "May, Jun, Sep", label: "Mejores meses de imagen" },
            caption: "Todas las m\u00e9tricas extra\u00eddas autom\u00e1ticamente de cabeceras FITS y an\u00e1lisis de calidad. Sin entrada manual de datos."
        },
        equipperf: {
            title: "Descubre lo que tus datos revelan",
            subtitle: "AstroIndexer analiza miles de frames a trav\u00e9s de m\u00faltiples sesiones y configuraciones de equipo. Compara rendimiento de telescopios, eficiencia de filtros y m\u00e9tricas de calidad de imagen en todo tu conjunto de datos.",
            comparison: {
                label: "Comparaci\u00f3n de rendimiento de equipo",
                desc: "FWHM, elipticidad, SNR, conteo de estrellas, RMS de seguimiento e impacto de fase lunar \u2014 comparados en todas tus configuraciones."
            },
            baseline: {
                label: "Comparaci\u00f3n de m\u00e9tricas base",
                desc: "L\u00edneas base estad\u00edsticas con desviaciones est\u00e1ndar para cada combinaci\u00f3n de telescopio y c\u00e1mara. Ve exactamente qu\u00e9 configuraci\u00f3n produce las estrellas m\u00e1s n\u00edtidas."
            },
            callout: {
                title: "Mejor combinaci\u00f3n de rendimiento",
                desc: "AstroIndexer identifica autom\u00e1ticamente tu mejor combinaci\u00f3n de telescopio, c\u00e1mara y filtro basada en an\u00e1lisis ponderado por calidad de todas las sesiones."
            }
        },
        audience: {
            title: "\u00bfPara qui\u00e9n est\u00e1 hecho AstroIndexer?",
            items: [
                "Astrof\u00f3tografos que gestionan miles de frames a lo largo de a\u00f1os",
                "Usuarios de NINA, Voyager o APT que necesitan inteligencia de datos",
                "Procesadores con PixInsight o AstroPixelProcessor que quieren an\u00e1lisis de calidad por frame",
                "Observatorios dom\u00e9sticos y configuraciones remotas que rastrean el rendimiento del equipo"
            ]
        },
        ecosystem: {
            title: "Funciona con tu flujo de trabajo actual",
            subtitle: "AstroIndexer complementa las herramientas que ya usas",
            capture: { label: "Captura", tools: "NINA \u00b7 Voyager \u00b7 APT" },
            process: { label: "Procesamiento", tools: "PixInsight \u00b7 APP \u00b7 Siril" },
            intelligence: { label: "Inteligencia de datos" }
        },
        why: {
            title: "Por qu\u00e9 existe AstroIndexer",
            text1: "Los astrof\u00f3tografos acumulan miles de frames a lo largo de a\u00f1os. Pero responder preguntas simples es sorprendentemente dif\u00edcil:",
            questions: [
                "\u00bfQu\u00e9 noches tuvieron el mejor seeing?",
                "\u00bfQu\u00e9 combinaci\u00f3n de telescopio y c\u00e1mara rinde mejor?",
                "\u00bfQu\u00e9 filtros producen los datos de mayor calidad?",
                "\u00bfC\u00f3mo ha mejorado mi imagen con el tiempo?"
            ],
            text2: "AstroIndexer analiza todo tu historial de imagen para revelar esas respuestas autom\u00e1ticamente.",
            builder: "Creado por un astrof\u00f3tografo que quer\u00eda entender a\u00f1os de datos de imagen en lugar de gestionar carpetas y hojas de c\u00e1lculo."
        },
        trust: {
            items: [
                "Compra \u00fanica \u2014 sin suscripci\u00f3n",
                "Funciona localmente en tu ordenador",
                "Sin subida a la nube \u2014 tus datos permanecen privados",
                "Sin internet necesario \u2014 funciona en sitios remotos oscuros",
                "Desarrollo continuo \u2014 nuevas funciones regularmente",
                "El feedback de la comunidad define la hoja de ruta"
            ]
        },
        workflow: {
            title: "De carpetas a insights en 5 pasos",
            steps: [
                "Apunta AstroIndexer a tus carpetas de imagen",
                "Autopilot escanea e indexa todos los frames",
                "El an\u00e1lisis de calidad puntua cada imagen",
                "La anal\u00edtica ML descubre patrones ocultos",
                "Los insights revelan tus mejores configuraciones y condiciones"
            ]
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
                    "Todas las funciones principales",
                    "Base de datos de equipos",
                    "Estadísticas y planificación",
                    "Licencia multi-ordenador",
                    "Actualizaciones de por vida"
                ],
                cta: "Comprar Ahora"
            },
            professional: {
                title: "Profesional",
                price: "89€",
                duration: "pago único",
                features: [
                    "Todo lo de Estándar",
                    "Análisis de calidad avanzado",
                    "Análisis de Machine Learning",
                    "Herramientas de fotometría",
                    "Perfiles de equipo personalizados"
                ],
                cta: "Comprar Ahora"
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