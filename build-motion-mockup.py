#!/usr/bin/env python3
"""
Generate the motion homepage from index.source.html.

index.source.html is the page WITHOUT the film intro — the old blocking
#videoOverlay version. It is the file to edit: every section, translation
string, Paddle hook and footer link lives there. This script replays the
intro swap on top of it, so nothing can silently go missing.

    python3 build-motion-mockup.py            -> index.html   (shipping)
    python3 build-motion-mockup.py --review   -> motion-mockup.html (reviewer chrome)

Re-run after editing index.source.html. Do NOT edit index.html by hand — it
is overwritten.

What it swaps out
  - the blocking #videoOverlay intro
  - the #landing splash section
  - the on-landing chrome-hiding logic

What it swaps in
  - a pinned, self-playing film that morphs into the hero's image slot
  - a navbar that assembles itself as the film hands off

--review additionally injects a notes panel, a scroll HUD and a progress bar,
and marks the page noindex. The shipping build has none of that.
"""
import re
import sys
import pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "index.source.html"

REVIEW = "--review" in sys.argv[1:]
OUT = ROOT / ("motion-mockup.html" if REVIEW else "index.html")

html = SRC.read_text(encoding="utf-8")
orig_len = len(html)
applied = []


def sub(pattern, repl, label, count=1, flags=re.S):
    """Apply a replacement and fail loudly if the anchor no longer matches."""
    global html
    new, n = re.subn(pattern, repl, html, count=count, flags=flags)
    if n == 0:
        sys.exit("FAILED anchor: %s\n  index.source.html has changed shape; "
                 "update build-motion-mockup.py" % label)
    html = new
    applied.append("%s (%d)" % (label, n))


def only_review(text):
    """Reviewer-only fragment: emitted by --review, dropped from the ship build."""
    return text if REVIEW else ""


# ─────────────────────────────────────────────────────────────────────────
# 1 · Remove the old intro
# ─────────────────────────────────────────────────────────────────────────
sub(r'\n\s*<!-- Video Intro Overlay.*?\n    </div>\n',
    '\n', 'strip #videoOverlay')

sub(r'\n\s*<!-- Landing Splash.*?</section>\n',
    '\n', 'strip #landing splash')

sub(r'\n\s*<!-- Video intro logic.*?</script>\n',
    '\n', 'strip intro video script')

# The landing-splash chrome logic keyed off an element that no longer exists.
# Keep only the navbar "scrolled" behaviour.
#
# This span deliberately runs all the way through the "Click landing to enter
# site" handler. `const landing` is declared inside it, and that handler is the
# only other user of the binding — stopping at updateChrome's closing brace
# would leave `if (landing)` referring to a name that no longer exists. That is
# a ReferenceError, not a silent no-op, and it kills the rest of the enclosing
# <script> block: the mobile menu toggle right below it never binds.
# The span also swallows the original `addEventListener('scroll', updateChrome)`
# between the two, so the replacement below re-adds it exactly once.
sub(r'\n\s*// Landing splash: hide all chrome.*?'
    r'\n\s*// Click landing to enter site\n\s*if \(landing\) \{.*?\n        \}\n',
    '''
        // Navbar condense on scroll. (Landing-splash chrome logic and the
        // click-to-enter handler removed — the film owns the entry moment
        // now, and #landing no longer exists.)
        function updateChrome() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
        window.addEventListener('scroll', updateChrome);
''', 'replace landing chrome logic')

# ─────────────────────────────────────────────────────────────────────────
# 2 · Hero tweaks
# ─────────────────────────────────────────────────────────────────────────
# The release pill competes with the intro's job of saying what the app is for.
sub(r'\n\s*<a class="release-pill".*?</a>\n',
    '\n', 'remove release pill')

# Wrap the hero image so it can serve as the morph target. loading="lazy" is
# dropped: a lazy hero image can report a zero-height box, which would give the
# morph the wrong landing rectangle (and it is above the fold regardless).
sub(r'<img src="screenshots/01_Gallery\.png" alt="AstroIndexer Gallery View" loading="lazy">',
    '<div id="heroSlot"><img src="screenshots/01_Gallery.png" alt="AstroIndexer Gallery View"></div>',
    'wrap hero image in #heroSlot')

# ─────────────────────────────────────────────────────────────────────────
# 3 · Inject styles
# ─────────────────────────────────────────────────────────────────────────
REVIEW_STYLES = r'''
/* ── reviewer chrome — --review builds only ── */
#mm-notesBtn{position:fixed;z-index:9999;left:14px;bottom:14px;
  font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;
  background:rgba(200,165,92,.14);border:1px solid rgba(200,165,92,.45);
  color:var(--accent);padding:8px 12px;cursor:pointer}
#mm-notes{position:fixed;z-index:9998;left:14px;bottom:88px;width:min(380px,88vw);
  max-height:74vh;overflow:auto;display:none;background:rgba(6,10,18,.97);
  border:1px solid var(--line);padding:20px;font-size:12.5px;line-height:1.55;
  color:rgba(247,243,232,.8)}
#mm-notes.on{display:block}
#mm-notes h4{font-family:var(--font-mono);font-size:10px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--accent);margin:16px 0 6px}
#mm-notes h4:first-child{margin-top:0}
#mm-notes code{font-family:var(--font-mono);font-size:11px;color:var(--hl)}
#mm-hud{position:fixed;z-index:9999;left:14px;bottom:48px;
  font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;
  color:rgba(200,165,92,.85);background:rgba(6,10,18,.8);
  border:1px solid rgba(200,165,92,.28);padding:6px 10px;pointer-events:none}
#mm-bar{position:fixed;left:0;top:0;height:2px;width:0;background:var(--accent);z-index:9997}
'''

STYLES = r'''
''' + only_review('<meta name="robots" content="noindex, nofollow">\n') + r'''<!-- ══ MOTION STYLES ══ generated by build-motion-mockup.py ══ -->
<style>
/* ── the film, pinned full-bleed ─────────────────────────────── */
#heroSpacer{height:120vh;position:relative}
#mediaStage{
  position:fixed;left:0;top:0;width:100vw;height:100vh;
  z-index:900;overflow:hidden;background:#04070E;
  will-change:transform,width,height,left,top;
}
#mediaStage #scrubVideo{width:100%;height:100%;object-fit:cover}
#stageGallery{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0}

/* chrome laid over the film */
#heroActions{position:fixed;z-index:920;left:clamp(20px,4vw,64px);bottom:56px}
#heroActions .row{display:flex;gap:12px;flex-wrap:wrap}
#heroActions .note{margin-top:14px;font-family:var(--font-mono);font-size:11px;
  letter-spacing:.08em;color:rgba(247,243,232,.55)}
#heroStatement{
  position:fixed;z-index:920;right:clamp(20px,4vw,64px);bottom:56px;
  width:min(40ch,44vw);border-top:1px solid rgba(200,165,92,.55);padding-top:16px;
}
#heroStatement p{font-size:clamp(15px,1.25vw,18px);line-height:1.55;color:rgba(247,243,232,.88)}
#scrubHint{
  position:fixed;z-index:920;left:50%;bottom:30px;transform:translateX(-50%);
  font-family:var(--font-mono);font-size:12px;letter-spacing:.22em;
  text-transform:uppercase;color:rgba(247,243,232,.78);text-align:center;
}
#scrubHint span{display:block;margin-top:10px;font-size:18px;line-height:1;
  color:var(--accent);animation:mm-nudge 2s ease-in-out infinite}
@keyframes mm-nudge{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(8px);opacity:1}}

/* navbar starts hidden; GSAP reveals it. The stock transition would fight
   a scrubbed tween, so it is disabled here. */
.navbar{opacity:0;transform:translateY(-100%);transition:none!important}

/* morph target. aspect-ratio matches 01_Gallery.png so the box has a correct
   height before the image decodes. */
#heroSlot{position:relative;width:100%;aspect-ratio:2860/1624}
#heroSlot img{width:100%;height:100%;object-fit:cover;visibility:hidden}

/* ── Lenis smooth scroll ─────────────────────────────────────
   Required by Lenis: it drives scrolling itself, so native smooth
   behaviour has to be off or the two fight each other. */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
''' + only_review(REVIEW_STYLES) + r'''
/* ── fallbacks: no pinning, no morph ─────────────────────────── */
@media (max-width:900px){
  #heroSpacer{display:none}
  #mediaStage{position:relative;width:100%;height:58vh;z-index:1}
  #heroActions,#heroStatement,#scrubHint{position:relative;left:auto;right:auto;
    bottom:auto;width:auto;transform:none;margin:24px clamp(20px,4vw,64px) 0}
  .navbar{opacity:1;transform:none}
  #heroSlot img{visibility:visible}
}
@media (prefers-reduced-motion:reduce){
  #heroSpacer{display:none}
  #mediaStage{position:relative;width:100%;height:70vh;z-index:1}
  #heroActions,#heroStatement,#scrubHint{position:relative;left:auto;right:auto;
    bottom:auto;width:auto;transform:none;margin:24px clamp(20px,4vw,64px) 0}
  #scrubHint span{animation:none}
  .navbar{opacity:1;transform:none}
  #heroSlot img{visibility:visible}
}

/* ── hard fallback: GSAP unavailable ─────────────────────────
   The film hides the navbar and the hero image and pins itself over the
   whole viewport, and only the motion script undoes that. If the GSAP CDN
   is blocked or fails, the script sets html.mm-static and these rules put
   the page back to a normal static layout. Without this the homepage is a
   black screen. */
html.mm-static #heroSpacer{display:none}
html.mm-static #mediaStage{position:relative;width:100%;height:70vh;z-index:1}
html.mm-static #heroActions,
html.mm-static #heroStatement,
html.mm-static #scrubHint{position:relative;left:auto;right:auto;
  bottom:auto;width:auto;transform:none;margin:24px clamp(20px,4vw,64px) 0}
html.mm-static #scrubHint span{animation:none}
html.mm-static .navbar{opacity:1;transform:none}
html.mm-static #heroSlot img{visibility:visible}
</style>
'''
sub(r'</head>', STYLES + '</head>', 'inject styles')

# ─────────────────────────────────────────────────────────────────────────
# 4 · Inject the film markup ahead of the real hero
# ─────────────────────────────────────────────────────────────────────────
REVIEW_FILM = r'''    <div id="mm-bar"></div>
    <button id="mm-notesBtn">Reviewer notes</button>
    <div id="mm-hud">film —— · hero 0% · morph 0%</div>
    <aside id="mm-notes">
      <h4>This is index.source.html with only the intro replaced</h4>
      <p>Generated by <code>build-motion-mockup.py</code>. Every section, translation,
         Paddle hook and footer link is the real page — re-run the script after
         editing <code>index.source.html</code> to keep them in sync.</p>
      <h4>Removed</h4>
      <p>The blocking <code>#videoOverlay</code>, the <code>#landing</code> splash,
         and the <code>on-landing</code> chrome logic. Three separate entry moments
         collapsed into one.</p>
      <h4>1 · The film autoplays, then holds</h4>
      <p>Runs from <code>t=0.95</code> — skipping the splash-card dissolve, whose
         rectangular edges read as a rendering bug — and stops on the lockup.
         Never seeked, so sparse keyframes cost nothing.</p>
      <h4>2 · Morph into the hero image slot</h4>
      <p>The film shrinks into the hero's right-hand image box at the real
         proportions of <code>01_Gallery.png</code>, not a full-height column.</p>
      <h4>3 · FLIP handoff</h4>
      <p>At completion the fixed film and the inline <code>&lt;img&gt;</code> occupy the
         same rectangle, so the swap to normal page content is invisible.</p>
      <h4>4 · Navbar assembles itself</h4>
      <p>Hidden while the film owns the screen, revealed across the back half of
         the morph.</p>
      <h4>Open question</h4>
      <p>A visitor who scrolls at second two drives the morph mid-film, so the
         lockup resolves inside a shrinking panel. Fix if it matters: gate the
         morph on the video's <code>ended</code> event.</p>
    </aside>

'''

FILM = r'''
    <!-- ══ film intro ══ generated by build-motion-mockup.py ══ -->
''' + only_review(REVIEW_FILM) + r'''    <div id="mediaStage">
      <video id="scrubVideo" autoplay muted playsinline preload="auto"
             poster="intro_poster.jpg" src="intro_vid_website.mp4#t=0.95"></video>
      <img id="stageGallery" src="screenshots/01_Gallery.png" alt="">
    </div>

    <div id="heroActions">
      <div class="row">
        <a href="#download" class="btn-primary btn-large">Download Free</a>
        <a href="newsletter/rc1/" class="btn-secondary btn-large">See what's new</a>
      </div>
      <div class="note">One-time from &euro;49 &middot; free 14-day trial</div>
    </div>

    <div id="heroStatement">
      <p>AstroIndexer analyzes your imaging history to reveal equipment performance,
         seeing patterns, and what actually improves your results.</p>
    </div>

    <div id="scrubHint">Scroll to continue<span>&darr;</span></div>
    <div id="heroSpacer"></div>

'''
sub(r'\n\s*<!-- About / Info Section -->\n\s*<section id="about" class="hero">',
    FILM + '    <!-- About / Info Section -->\n    <section id="about" class="hero">',
    'inject film markup')

# ─────────────────────────────────────────────────────────────────────────
# 5 · Inject the motion script
# ─────────────────────────────────────────────────────────────────────────
REVIEW_JS_INIT = r'''  var notes = document.getElementById('mm-notes');
  document.getElementById('mm-notesBtn').addEventListener('click', function(){ notes.classList.toggle('on'); });
  document.addEventListener('keydown', function(e){ if(e.key==='n'||e.key==='N') notes.classList.toggle('on'); });

'''

REVIEW_JS_HUD = r'''  var hud = document.getElementById('mm-hud');
  function paintHud(){
    var state = video.ended ? 'held' : (video.paused ? 'paused' : 'playing');
    hud.textContent = 'film ' + (video.currentTime||0).toFixed(1) + '/'
                    + (video.duration ? video.duration.toFixed(1) : '?') + 's ' + state
                    + ' · hero ' + Math.round(hudHero*100) + '%'
                    + ' · morph ' + Math.round(hudMorph*100) + '%';
  }
  video.addEventListener('timeupdate', paintHud);
  gsap.to('#mm-bar', { width:'100%', ease:'none',
    scrollTrigger:{ trigger:document.body, start:'top top', end:'bottom bottom', scrub:true }});
  ScrollTrigger.create({ trigger:'#heroSpacer', start:'top top', end:'bottom top',
    onUpdate:function(self){ hudHero = self.progress; paintHud(); }});

'''

SCRIPT = r'''
<!-- ══ MOTION SCRIPT ══ generated by build-motion-mockup.py ══ -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="js/lenis.min.js"></script>
<script>
(function(){
  'use strict';
''' + only_review(REVIEW_JS_INIT) + r'''  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow  = window.matchMedia('(max-width: 900px)').matches;

  var video    = document.getElementById('scrubVideo');
  var gallery  = document.getElementById('stageGallery');
  var stage    = document.getElementById('mediaStage');
  var slot     = document.getElementById('heroSlot');
  var slotImg  = slot ? slot.querySelector('img') : null;
  var siteHero = document.getElementById('about');
  if (!video || !stage || !slot || !siteHero) return;

  /* The CSS above hides the navbar and the hero image and pins the film over
     the viewport, on the assumption that GSAP will undo all of it. If the CDN
     is blocked or slow-failing, that assumption breaks and the visitor gets a
     black screen. Fall back to the static layout instead. */
  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add('mm-static');
    video.play().catch(function(){});
    video.addEventListener('ended', function(){ video.pause(); });
    return;
  }

  if (reduced) { video.removeAttribute('autoplay'); video.pause(); return; }
  if (narrow)  {
    video.play().catch(function(){});
    video.addEventListener('ended', function(){ video.pause(); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── Lenis smooth scroll ───────────────────────────────────────
     Lenis takes over the scroll position and eases it, so raw wheel
     deltas become weighted motion. Everything scroll-linked below then
     inherits that easing for free.

     Two wiring details matter:
       1. lenis.on('scroll', ScrollTrigger.update) — otherwise triggers
          fire against the browser's scroll value, not the eased one, and
          the morph desyncs from what is on screen.
       2. Drive lenis.raf from gsap.ticker instead of its own rAF loop, so
          both run on ONE frame clock. Two loops = visible jitter.
     lagSmoothing(0) stops GSAP compensating for frame drops, which would
     otherwise make Lenis jump.                                          */
  var lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.05,          // higher = more glide. >1.4 starts feeling laggy.
      smoothWheel: true,
      touchMultiplier: 1.6
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(time){ lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Native smooth anchor scrolling is disabled by Lenis's CSS, so in-page
    // links would otherwise jump. Capture phase beats the theme's own handler.
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        e.stopPropagation();
        lenis.scrollTo(target, { offset: -70, duration: 1.2 });
      }, true);
    });
  }

  var hudHero = 0, hudMorph = 0;
''' + only_review(REVIEW_JS_HUD) + r'''
  /*  Film map, measured frame-by-frame:
        0.00–0.10  splash card on black, portrait -> letterboxed at 16:9
        0.10–0.85  card dissolving out -> its rectangular edges are visible
        0.95–6.20  clean full-bleed: Earth, telescope push-in, Milky Way
        6.30–8.00  lockup fades back in and holds
      Starting at 0.95 skips the card entirely, so the lockup appears exactly
      once — at the end, where it morphs into the hero slot.                */
  var T_IN = 0.95;
  function startFilm(){
    try { if (video.currentTime < T_IN) video.currentTime = T_IN; } catch(e){}
    var p = video.play();
    if (p && p.catch) p.catch(function(){
      window.addEventListener('pointerdown', function(){ video.play().catch(function(){}); },
                              {once:true, passive:true});
    });
  }
  if (video.readyState >= 1) startFilm();
  else video.addEventListener('loadedmetadata', startFilm, {once:true});
  video.addEventListener('ended', function(){ video.pause(); });

  // Chrome leaves from the first pixel — the opening scroll must move something.
  gsap.to(['#heroActions','#heroStatement'], {
    autoAlpha:0, y:-28, ease:'power1.in',
    scrollTrigger:{ trigger:'#heroSpacer', start:'top top', end:'20% top', scrub:0.35 }});
  gsap.to('#scrubHint', { opacity:0, ease:'none',
    scrollTrigger:{ trigger:'#heroSpacer', start:'top top', end:'3% top', scrub:true }});
  gsap.to('.navbar', { opacity:1, y:0, ease:'power2.out',
    scrollTrigger:{ trigger:'#heroSpacer', start:'45% top', end:'88% top', scrub:0.4 }});

  /* ── morph ─────────────────────────────────────────────────────
     The slot sits in normal flow, so its live rect is below the fold while
     the morph runs. What we need is where it WILL be once the morph ends —
     the moment #about's top reaches the viewport top. Subtracting the hero's
     own top from the slot's top gives exactly that.                      */
  var morph = { p:0 }, handedOff = false;

  function targetRect(){
    var r = slot.getBoundingClientRect();
    var heroTop = siteHero.getBoundingClientRect().top;
    return { left:r.left, top:r.top - heroTop, width:r.width, height:r.height };
  }
  function applyMorph(){
    var t = targetRect();
    // power2.OUT, not inOut: an inOut ease is near-flat over its first ~15%,
    // which made the opening scroll look like nothing was happening.
    var e = gsap.parseEase('power2.out')(morph.p);
    gsap.set(stage, {
      left:   gsap.utils.interpolate(0, t.left, e),
      top:    gsap.utils.interpolate(0, t.top, e),
      width:  gsap.utils.interpolate(window.innerWidth, t.width, e),
      height: gsap.utils.interpolate(window.innerHeight, t.height, e),
      borderRadius: gsap.utils.interpolate(0, 4, e)
    });
    hudMorph = morph.p;
    flip(morph.p >= 0.999);
  }
  function flip(toInline){
    if (toInline === handedOff) return;
    handedOff = toInline;
    if (slotImg) slotImg.style.visibility = toInline ? 'visible' : 'hidden';
    stage.style.visibility = toInline ? 'hidden' : 'visible';
  }

  gsap.to(morph, { p:1, ease:'none',
    onUpdate: applyMorph,               // on the tween: fires every scrub frame
    scrollTrigger:{ trigger:'#heroSpacer', start:'top top', end:'bottom top',
                    scrub:0.3, onRefresh: applyMorph }});
  applyMorph();

  gsap.to(gallery, { opacity:1, ease:'none',
    scrollTrigger:{ trigger:'#heroSpacer', start:'52% top', end:'86% top', scrub:0.4 }});

  window.addEventListener('resize', function(){ ScrollTrigger.refresh(); applyMorph(); });
})();
</script>
'''
sub(r'</body>', SCRIPT + '</body>', 'inject motion script')

# A generated file that shares a name with the obvious thing to edit needs to
# say so in the first thing anyone opening it will read.
BANNER = ("<!-- GENERATED FILE - DO NOT EDIT.\n"
          "     Built from index.source.html by build-motion-mockup.py.\n"
          "     Edit index.source.html, then re-run: python3 build-motion-mockup.py -->\n")
html = BANNER + html

OUT.write_text(html, encoding="utf-8")

print("built %s%s" % (OUT.name, "  (reviewer chrome)" if REVIEW else "  (shipping)"))
print("  source  %s  %6d bytes" % (SRC.name, orig_len))
print("  output  %s  %6d bytes" % (OUT.name, len(html)))
for a in applied:
    print("  ok  " + a)
