// Language translations for AstroIndexer website
const translations = {
    en: {
        // Navigation
        nav: {
            whatis: "What Is AstroIndexer?",
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
            platforms: "Runs locally on your computer",
            cta: {
                download: "Download Free",
                learnMore: "Learn More"
            },
            priceTeaser: "One-time purchase from \u20ac49 \u00b7 Free 30-day trial"
        },

        // Features Section
        features: {
            title: "Powerful Features for Astrophotographers",
            subtitle: "Everything you need to organize, analyze, and understand your astronomical imaging data",
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
                    description: "One-click automated workflow: scan folders, detect equipment, create calibration sets, run quality analysis, and Imaging Intelligence in a single pipeline."
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
                    title: "Imaging Intelligence",
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
                description: "Point AstroIndexer at your imaging folder and let Autopilot handle everything: scanning, equipment detection, tagging, calibration set creation, gain/offset setup, quality analysis, and Imaging Intelligence -- all in one automated pipeline.",
                points: [
                    "Scans and indexes all FITS/XISF files automatically",
                    "Auto-detects equipment, creates calibration sets, populates gain/offset",
                    "Optional Quality Analysis (FWHM, HFR, star detection) in the same run",
                    "Optional Imaging Intelligence (pattern discovery, stacking recommendations)",
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

        // Imaging Intelligence Section
        ml: {
            title: "Imaging Intelligence",
            subtitle: "40 Patterns Across 9 Categories -- Discover What Your Data Reveals",
            dashboard: {
                title: "Imaging Intelligence Dashboard",
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

        // Imaging Insights (merged proof block)
        insights: {
            title: "Your Data Tells a Story",
            subtitle: "Real metrics from a single astrophotographer's dataset \u2014 extracted automatically from FITS headers and quality analysis.",
            cards: {
                frames: {
                    value: "1,909",
                    label: "Frames Indexed",
                    detail: "Every frame contributes to a deeper performance profile."
                },
                sessions: {
                    value: "62",
                    label: "Imaging Nights",
                    detail: "Every session adds context to your long-term results."
                },
                seeing: {
                    value: '1.9"',
                    label: "Best Seeing",
                    detail: "Automatically tracked across your imaging history."
                },
                fwhm: {
                    value: '2.7"',
                    label: "Average FWHM",
                    detail: "Measured via Moffat PSF fitting across all analyzed frames."
                },
                setup: {
                    value: "APO 94mm + QHY268M",
                    label: "Most Productive Setup",
                    detail: "Ranked by quality-weighted imaging hours."
                },
                months: {
                    value: "May, Jun, Sep",
                    label: "Best Imaging Months",
                    detail: "Based on your historical quality scores."
                }
            },
            caption: "Your insights are generated from your own sessions. No manual data entry required."
        },

        problem: {
            lead: "Thousands of frames. Dozens of imaging sessions. Years of data.",
            question: "But which nights produced your best results? Which setup performs best? Which filters deliver the highest quality data?"
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
            title: "Compare Your Setups Across Years of Data",
            subtitle: "AstroIndexer analyzes thousands of frames across multiple sessions and equipment combinations, so you can compare performance across your entire dataset instead of judging one night at a time.",
            comparison: {
                label: "Equipment Performance Comparison",
                desc: "Compare FWHM, ellipticity, SNR, star counts, tracking RMS, and moon phase impact across every setup you own."
            },
            baseline: {
                label: "Baseline Metrics Comparison",
                desc: "See statistical baselines and variation ranges for each telescope and camera combination to understand what consistently performs best."
            },
            callout: {
                title: "Best Performing Combination",
                desc: "AstroIndexer automatically identifies your strongest telescope, camera, and filter combination based on quality-weighted analysis across all sessions."
            }
        },
        audience: {
            title: "Who AstroIndexer Is Built For",
            labels: [
                "Astrophotographers",
                "Capture Workflow Users",
                "Processing-Focused Imagers",
                "Observatory Owners"
            ],
            items: [
                "Managing thousands of frames across years of imaging.",
                "Running NINA, Voyager, or APT and needing real data intelligence.",
                "Using PixInsight or AstroPixelProcessor and wanting frame-level quality insights.",
                "Tracking equipment performance across home or remote setups over time."
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
            builder: "Built by an astrophotographer who wanted insight from years of imaging data \u2014 not more folders, spreadsheets, and guesswork."
        },
        trust: {
            title: "Built for Privacy and Ownership",
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
                "Imaging Intelligence discovers hidden patterns",
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
                price: "\u20ac49",
                duration: "one-time",
                features: [
                    "Unlimited images",
                    "All core features",
                    "Equipment database",
                    "Session statistics & planning",
                    "Multi-computer license",
                    "Lifetime updates"
                ],
                cta: "Coming Soon"
            },
            professional: {
                title: "Professional",
                price: "\u20ac89",
                duration: "one-time",
                badge: "Best Value",
                features: [
                    "Unlimited images",
                    "All core features",
                    "Advanced Quality Analysis",
                    "Machine Learning Analytics",
                    "Photometry Tools",
                    "Custom equipment profiles",
                    "Multi-computer license",
                    "Lifetime updates"
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
            legal: {
                title: "Legal",
                links: {
                    impressum: "Legal Notice",
                    privacy: "Privacy Policy",
                    terms: "Terms & Conditions",
                    eula: "License Agreement (EULA)",
                    withdrawal: "Right of Withdrawal"
                }
            },
            copyright: "\u00a9 2025 AstroIndexer. All rights reserved."
        }
    },

    de: {
        // Navigation
        nav: {
            whatis: "Was ist AstroIndexer?",
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
            platforms: "L\u00e4uft lokal auf deinem Computer",
            cta: {
                download: "Kostenlos herunterladen",
                learnMore: "Mehr erfahren"
            },
            priceTeaser: "Einmaliger Kauf ab €49 · 30 Tage kostenlos testen"
        },

        // Features Section
        features: {
            title: "Leistungsstarke Funktionen für Astrofotografen",
            subtitle: "Alles, was Sie brauchen, um Ihre astronomischen Bilddaten zu organisieren, analysieren und verstehen",
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
                    description: "Ein-Klick-Workflow: Ordner scannen, Equipment erkennen, Kalibrationssets erstellen, Qualit\u00e4tsanalyse und Bild-Intelligenz in einer Pipeline."
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
                    title: "Bild-Intelligenz",
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
                description: "Richten Sie AstroIndexer auf Ihren Aufnahmeordner und lassen Sie den Autopilot alles erledigen: Scannen, Equipment-Erkennung, Tagging, Kalibrationsset-Erstellung, Gain/Offset-Setup, Qualitätsanalyse und Bild-Intelligenz -- alles in einer automatisierten Pipeline.",
                points: [
                    "Scannt und indexiert alle FITS/XISF-Dateien automatisch",
                    "Auto-Erkennung von Equipment, Erstellung von Kalibrationssets, Gain/Offset-Befüllung",
                    "Optionale Qualitätsanalyse (FWHM, HFR, Sternerkennung) im gleichen Durchlauf",
                    "Optionale Bild-Intelligenz (Mustererkennung, Stacking-Empfehlungen)",
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

        // Imaging Intelligence Section
        ml: {
            title: "Bild-Intelligenz",
            subtitle: "40 Muster in 9 Kategorien -- Entdecken Sie, was Ihre Daten verraten",
            dashboard: {
                title: "Bild-Intelligenz Dashboard",
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

        // Imaging Insights (merged proof block)
        insights: {
            title: "Ihre Daten erz\u00e4hlen eine Geschichte",
            subtitle: "Echte Messwerte eines einzelnen Astrofotografen \u2014 automatisch aus FITS-Headern und Qualit\u00e4tsanalyse extrahiert.",
            cards: {
                frames: {
                    value: "1.909",
                    label: "Frames indexiert",
                    detail: "Jedes Frame tr\u00e4gt zu einem tieferen Leistungsprofil bei."
                },
                sessions: {
                    value: "62",
                    label: "Aufnahmen\u00e4chte",
                    detail: "Jede Session f\u00fcgt Kontext zu Ihren Langzeitergebnissen hinzu."
                },
                seeing: {
                    value: '1,9"',
                    label: "Bestes Seeing",
                    detail: "Automatisch \u00fcber Ihre gesamte Aufnahmehistorie erfasst."
                },
                fwhm: {
                    value: '2,7"',
                    label: "Durchschnittlicher FWHM",
                    detail: "Gemessen per Moffat-PSF-Fitting \u00fcber alle analysierten Frames."
                },
                setup: {
                    value: "APO 94mm + QHY268M",
                    label: "Produktivstes Setup",
                    detail: "Nach qualit\u00e4tsgewichteten Aufnahmestunden."
                },
                months: {
                    value: "Mai, Jun, Sep",
                    label: "Beste Aufnahmemonate",
                    detail: "Basierend auf historischen Qualit\u00e4tswerten."
                }
            },
            caption: "Ihre Insights werden aus Ihren eigenen Sessions generiert. Keine manuelle Dateneingabe n\u00f6tig."
        },

        problem: {
            lead: "Thousands of frames. Dozens of imaging sessions. Years of data.",
            question: "Aber welche N\u00e4chte lieferten die besten Ergebnisse? Welches Setup performt am besten? Welche Filter liefern die h\u00f6chste Datenqualit\u00e4t?"
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
            title: "Vergleiche deine Setups \u00fcber Jahre hinweg",
            subtitle: "AstroIndexer analysiert Tausende von Frames \u00fcber mehrere Sessions und Equipment-Kombinationen, sodass du die Performance \u00fcber deinen gesamten Datensatz vergleichen kannst \u2014 statt jede Nacht einzeln zu beurteilen.",
            comparison: {
                label: "Equipment-Performance-Vergleich",
                desc: "Vergleiche FWHM, Elliptizit\u00e4t, SNR, Sternanzahl, Tracking-RMS und Mondphasen-Einfluss \u00fcber jedes Setup, das du besitzt."
            },
            baseline: {
                label: "Baseline-Metrik-Vergleich",
                desc: "Statistische Baselines und Variationsbereiche f\u00fcr jede Teleskop- und Kamera-Kombination, um zu verstehen, was konstant am besten performt."
            },
            callout: {
                title: "Beste Equipment-Kombination",
                desc: "AstroIndexer identifiziert automatisch deine st\u00e4rkste Teleskop-, Kamera- und Filter-Kombination basierend auf qualit\u00e4tsgewichteter Analyse \u00fcber alle Sessions."
            }
        },
        audience: {
            title: "F\u00fcr wen AstroIndexer entwickelt wurde",
            labels: [
                "Astrofotografen",
                "Aufnahme-Workflow-Nutzer",
                "Verarbeitungsorientierte Imager",
                "Sternwarten-Besitzer"
            ],
            items: [
                "Verwalten Tausende von Frames \u00fcber Jahre hinweg.",
                "Nutzen NINA, Voyager oder APT und brauchen echte Daten-Intelligenz.",
                "Verarbeiten in PixInsight oder AstroPixelProcessor und wollen Frame-Level-Qualit\u00e4tseinblicke.",
                "Verfolgen Equipment-Performance \u00fcber Heim- oder Remote-Setups \u00fcber die Zeit."
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
            builder: "Entwickelt von einem Astrofotografen, der Erkenntnisse aus jahrelangen Aufnahmedaten wollte \u2014 nicht noch mehr Ordner, Tabellen und Ratespiele."
        },
        trust: {
            title: "Privatsph\u00e4re und Eigenverantwortung",
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
                "Bild-Intelligenz entdeckt verborgene Muster",
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
                price: "49\u20ac",
                duration: "einmalig",
                features: [
                    "Unbegrenzte Bilder",
                    "Alle Kernfunktionen",
                    "Equipment-Datenbank",
                    "Session-Statistiken & Planung",
                    "Mehrcomputer-Lizenz",
                    "Lebenslange Updates"
                ],
                cta: "Bald verf\u00fcgbar"
            },
            professional: {
                title: "Professionell",
                price: "89\u20ac",
                duration: "einmalig",
                badge: "Bestes Angebot",
                features: [
                    "Unbegrenzte Bilder",
                    "Alle Kernfunktionen",
                    "Erweiterte Qualit\u00e4tsanalyse",
                    "Machine-Learning-Analytik",
                    "Photometrie-Tools",
                    "Benutzerdefinierte Equipment-Profile",
                    "Mehrcomputer-Lizenz",
                    "Lebenslange Updates"
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
                    about: "\u00dcber uns",
                    blog: "Blog",
                    privacy: "Datenschutz",
                    terms: "Nutzungsbedingungen"
                }
            },
            legal: {
                title: "Rechtliches",
                links: {
                    impressum: "Impressum",
                    privacy: "Datenschutz",
                    terms: "AGB",
                    eula: "Lizenzvertrag (EULA)",
                    withdrawal: "Widerruf"
                }
            },
            copyright: "\u00a9 2025 AstroIndexer. Alle Rechte vorbehalten."
        }
    },

    es: {
        // Navigation
        nav: {
            whatis: "¿Qué es AstroIndexer?",
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
            platforms: "Funciona localmente en tu ordenador",
            cta: {
                download: "Descarga Gratuita",
                learnMore: "Más Información"
            },
            priceTeaser: "Compra única desde €49 · Prueba gratuita de 30 días"
        },

        // Features Section
        features: {
            title: "Funciones Avanzadas para Astrofotógrafos",
            subtitle: "Todo lo que necesitas para organizar, analizar y comprender tus datos de imagen astron\u00f3mica",
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
                    description: "Flujo de trabajo automatizado: escanear carpetas, detectar equipo, crear sets de calibraci\u00f3n, ejecutar an\u00e1lisis de calidad e Inteligencia de Imagen en una sola pipeline."
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
                    title: "Inteligencia de Imagen",
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
                description: "Apunte AstroIndexer a su carpeta de imágenes y deje que Autopilot se encargue de todo: escaneo, detección de equipos, etiquetado, creación de sets de calibración, configuración de ganancia/offset, análisis de calidad e Inteligencia de Imagen -- todo en un pipeline automatizado.",
                points: [
                    "Escanea e indexa todos los archivos FITS/XISF automáticamente",
                    "Auto-detección de equipos, creación de sets de calibración, configuración de ganancia/offset",
                    "Análisis de Calidad opcional (FWHM, HFR, detección de estrellas) en la misma ejecución",
                    "Inteligencia de Imagen opcional (descubrimiento de patrones, recomendaciones de apilado)",
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

        // Imaging Intelligence Section
        ml: {
            title: "Inteligencia de Imagen",
            subtitle: "40 Patrones en 9 Categorías -- Descubra lo que Revelan sus Datos",
            dashboard: {
                title: "Panel de Inteligencia de Imagen",
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

        // Imaging Insights (merged proof block)
        insights: {
            title: "Tus Datos Cuentan una Historia",
            subtitle: "M\u00e9tricas reales del conjunto de datos de un astr\u00f3foto \u2014 extra\u00eddas autom\u00e1ticamente de cabeceras FITS y an\u00e1lisis de calidad.",
            cards: {
                frames: {
                    value: "1.909",
                    label: "Frames Indexados",
                    detail: "Cada frame contribuye a un perfil de rendimiento m\u00e1s profundo."
                },
                sessions: {
                    value: "62",
                    label: "Noches de Imagen",
                    detail: "Cada sesi\u00f3n a\u00f1ade contexto a tus resultados a largo plazo."
                },
                seeing: {
                    value: '1,9"',
                    label: "Mejor Seeing",
                    detail: "Rastreado autom\u00e1ticamente a lo largo de tu historial de imagen."
                },
                fwhm: {
                    value: '2,7"',
                    label: "FWHM Promedio",
                    detail: "Medido mediante ajuste Moffat PSF en todos los frames analizados."
                },
                setup: {
                    value: "APO 94mm + QHY268M",
                    label: "Setup M\u00e1s Productivo",
                    detail: "Clasificado por horas de imagen ponderadas por calidad."
                },
                months: {
                    value: "May, Jun, Sep",
                    label: "Mejores Meses de Imagen",
                    detail: "Basado en tus puntuaciones hist\u00f3ricas de calidad."
                }
            },
            caption: "Tus insights se generan a partir de tus propias sesiones. Sin entrada manual de datos."
        },

        problem: {
            lead: "Thousands of frames. Dozens of imaging sessions. Years of data.",
            question: "\u00bfPero qu\u00e9 noches produjeron los mejores resultados? \u00bfQu\u00e9 configuraci\u00f3n funciona mejor? \u00bfQu\u00e9 filtros entregan la mayor calidad de datos?"
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
            title: "Compara tus configuraciones a lo largo de a\u00f1os de datos",
            subtitle: "AstroIndexer analiza miles de frames a trav\u00e9s de m\u00faltiples sesiones y combinaciones de equipo, para que puedas comparar el rendimiento en todo tu conjunto de datos en lugar de juzgar una noche a la vez.",
            comparison: {
                label: "Comparaci\u00f3n de rendimiento de equipo",
                desc: "Compara FWHM, elipticidad, SNR, conteo de estrellas, RMS de seguimiento e impacto de fase lunar en cada configuraci\u00f3n que poseas."
            },
            baseline: {
                label: "Comparaci\u00f3n de m\u00e9tricas base",
                desc: "L\u00edneas base estad\u00edsticas y rangos de variaci\u00f3n para cada combinaci\u00f3n de telescopio y c\u00e1mara para entender qu\u00e9 funciona mejor de forma consistente."
            },
            callout: {
                title: "Mejor combinaci\u00f3n de rendimiento",
                desc: "AstroIndexer identifica autom\u00e1ticamente tu combinaci\u00f3n m\u00e1s fuerte de telescopio, c\u00e1mara y filtro bas\u00e1ndose en an\u00e1lisis ponderado por calidad en todas las sesiones."
            }
        },
        audience: {
            title: "\u00bfPara qui\u00e9n est\u00e1 hecho AstroIndexer?",
            labels: [
                "Astrof\u00f3t\u00f3grafos",
                "Usuarios de flujos de captura",
                "Imagers enfocados en procesado",
                "Propietarios de observatorios"
            ],
            items: [
                "Gestionando miles de frames a lo largo de a\u00f1os de imagen.",
                "Usando NINA, Voyager o APT y necesitando inteligencia de datos real.",
                "Usando PixInsight o AstroPixelProcessor y buscando insights de calidad por frame.",
                "Rastreando rendimiento de equipo en observatorios dom\u00e9sticos o remotos a lo largo del tiempo."
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
            builder: "Creado por un astrof\u00f3tografo que quer\u00eda conocimiento real de a\u00f1os de datos de imagen \u2014 no m\u00e1s carpetas, hojas de c\u00e1lculo y conjeturas."
        },
        trust: {
            title: "Privacidad y propiedad garantizadas",
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
                "La Inteligencia de Imagen descubre patrones ocultos",
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
                title: "Est\u00e1ndar",
                price: "49\u20ac",
                duration: "pago \u00fanico",
                features: [
                    "Im\u00e1genes ilimitadas",
                    "Todas las funciones principales",
                    "Base de datos de equipos",
                    "Estad\u00edsticas y planificaci\u00f3n",
                    "Licencia multi-ordenador",
                    "Actualizaciones de por vida"
                ],
                cta: "Pr\u00f3ximamente"
            },
            professional: {
                title: "Profesional",
                price: "89\u20ac",
                duration: "pago \u00fanico",
                badge: "Mejor Valor",
                features: [
                    "Im\u00e1genes ilimitadas",
                    "Todas las funciones principales",
                    "An\u00e1lisis de calidad avanzado",
                    "An\u00e1lisis de Machine Learning",
                    "Herramientas de fotometr\u00eda",
                    "Perfiles de equipo personalizados",
                    "Licencia multi-ordenador",
                    "Actualizaciones de por vida"
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
                    privacy: "Pol\u00edtica de Privacidad",
                    terms: "T\u00e9rminos de Servicio"
                }
            },
            legal: {
                title: "Legal",
                links: {
                    impressum: "Aviso Legal",
                    privacy: "Pol\u00edtica de Privacidad",
                    terms: "T\u00e9rminos y Condiciones",
                    eula: "Acuerdo de Licencia (EULA)",
                    withdrawal: "Derecho de Desistimiento"
                }
            },
            copyright: "\u00a9 2025 AstroIndexer. Todos los derechos reservados."
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

        // Toggle language content blocks (used on legal pages)
        const langBlocks = document.querySelectorAll('[data-lang-content]');
        if (langBlocks.length > 0) {
            langBlocks.forEach(block => {
                const blockLang = block.getAttribute('data-lang-content');
                block.style.display = blockLang === this.currentLang ? '' : 'none';
            });
            // If no block matches current lang, show English as fallback
            const visible = document.querySelector('[data-lang-content="' + this.currentLang + '"]');
            if (!visible) {
                document.querySelectorAll('[data-lang-content="en"]').forEach(b => b.style.display = '');
            }
        }

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