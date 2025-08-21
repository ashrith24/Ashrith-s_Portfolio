// PRELOADER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.transition = 'opacity 2s';
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 6000); 
  }, 6000); 
});





// SKILLS BLOCK BACKGROUND EFFECT
const highlight = document.querySelector('.hover-highlight');
const grid = document.querySelector('.skills-grid');
grid.addEventListener('mousemove', e => {
  const target = e.target.closest('.skill-category');
  if (target) {
    const rect = target.getBoundingClientRect();
    highlight.style.width = rect.width + 16 + 'px';  
    highlight.style.height = rect.height + 16 + 'px';
    highlight.style.left = rect.left - grid.getBoundingClientRect().left - 8 + 'px';
    highlight.style.top = rect.top - grid.getBoundingClientRect().top - 8 + 'px';
  }
});
grid.addEventListener('mouseleave', () => {
  highlight.style.width = 0;
  highlight.style.height = 0;
});





// EDUCATION ANIMATION OF SCROLLING EFFECT
function computeLineFrame() 
{
  const wrapper = document.querySelector(".edu-wrapper");
  const first = document.querySelector('.edu-card.card-1');
  const last = document.querySelector('.edu-card.card-3');
  if (!wrapper || !first || !last) return null;
  const wrapperTopAbs = wrapper.getBoundingClientRect().top + window.scrollY;
  const firstRect = first.getBoundingClientRect();
  const lastRect = last.getBoundingClientRect();
  const firstCenterAbs = firstRect.top + window.scrollY + firstRect.height / 2;
  const lastCenterAbs = lastRect.top + window.scrollY + lastRect.height / 2;
  const lineTop = firstCenterAbs - wrapperTopAbs;
  const lineHeight = Math.max(0, lastCenterAbs - firstCenterAbs);
  return { wrapper, lineTop, lineHeight, firstCenterAbs, lastCenterAbs };
}
function positionLineToFrame() 
{
  const frame = computeLineFrame();
  if (!frame) return;
  const line = document.querySelector('.edu-line');
  const lineBase = document.querySelector('.line-base');
  if (line) {
    line.style.top = `${Math.round(frame.lineTop)}px`;
    line.style.height = `${Math.round(frame.lineHeight)}px`;
  }
  if (lineBase) {
    lineBase.style.height = '100%';
  }
}
function updateEducationOnScroll() 
{
  const wrapper = document.querySelector(".edu-wrapper");
  const cards = document.querySelectorAll(".edu-card");
  const lineLight = document.querySelector(".line-light");
  const eduDot = document.getElementById("eduDot");
  const path = document.getElementById("eduPath");

  const viewHeight = window.innerHeight;
  const frame = computeLineFrame();
  if (frame) 
  {
    const line = document.querySelector('.edu-line');
    if (line) 
    {
      line.style.top = `${Math.round(frame.lineTop)}px`;
      line.style.height = `${Math.round(frame.lineHeight)}px`;
    }
  }
  if (window.innerWidth > 880) 
  {
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTopAbs = wrapperRect.top + window.scrollY;
    const wrapperBottomAbs = wrapperRect.bottom + window.scrollY;
    const wrapperHeight = wrapperBottomAbs - wrapperTopAbs;
    const viewportMid = window.scrollY + viewHeight * 0.5;
    let progress = 0;
    let y = 0;
    if (frame && frame.lineHeight > 0) 
    {
      const clampedMid = Math.min(frame.lastCenterAbs, Math.max(frame.firstCenterAbs, viewportMid));
      progress = (clampedMid - frame.firstCenterAbs) / frame.lineHeight;
      y = progress * frame.lineHeight;
    } else {
      progress = Math.min(1, Math.max(0, (viewportMid - wrapperTopAbs) / wrapperHeight));
      y = progress * (wrapperHeight - 20);
    }
    if (lineLight) {
      lineLight.style.transition = "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)";
      lineLight.style.transform = `translate(-50%, ${y}px)`;
    }
    let closestIndex = -1;
    let closestDelta = Number.POSITIVE_INFINITY;
    cards.forEach((card, i) => 
    {
      const r = card.getBoundingClientRect();
      const mid = r.top + window.scrollY + r.height / 2;
      const d = Math.abs(mid - viewportMid);
      if (d < closestDelta) 
      {
        closestDelta = d;
        closestIndex = i;
      }
    });
    cards.forEach((card, i) => {
      if (i === closestIndex) {
        card.classList.add("glow", "gold-active");
      } else {
        card.classList.remove("glow", "gold-active");
      }
    });

  } 
  else 
  {
    const cardPositions = [...cards].map(card => 
    {
      const rect = card.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        mid: rect.top + window.scrollY + rect.height / 2
      };
    });
    let closestIndex = -1;
    let closestScore = -Infinity;
    const viewportMid = window.scrollY + viewHeight * 0.5;
    cardPositions.forEach((pos, i) => 
    {
      const dist = Math.abs(pos.mid - viewportMid);
      const score = -dist + (i === 1 ? 12 : 0); 
      if (score > closestScore) {
        closestScore = score;
        closestIndex = i;
      }
    });

    cards.forEach((card, i) => 
    {
      if (i === closestIndex) {
        card.classList.add("glow", "gold-active");
      } else {
        card.classList.remove("glow", "gold-active");
      }
    });
    const timeline = document.querySelector('.edu-line');
    if (timeline && frame && frame.lineHeight > 0) {
      const clampedMid = Math.min(frame.lastCenterAbs, Math.max(frame.firstCenterAbs, viewportMid));
      const prog = (clampedMid - frame.firstCenterAbs) / frame.lineHeight;
      const y = prog * frame.lineHeight;
      timeline.style.setProperty('--progressLen', `${Math.max(0, y)}px`);
      timeline.style.setProperty('--progressY', `${y}px`);
      timeline.style.top = `${Math.round(frame.lineTop)}px`;
      timeline.style.height = `${Math.round(frame.lineHeight)}px`;
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const lineLight = document.querySelector(".line-light");
  if (lineLight) {
    lineLight.style.transform = "translate(-50%, 0px)";
  }
  const cards = document.querySelectorAll(".edu-card");
  if (cards.length) {
    cards.forEach((c) => {
      c.addEventListener("click", () => {
        if (window.innerWidth <= 880) {
          cards.forEach((k) => k.classList.remove("glow"));
          c.classList.add("glow");
          c.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      });
    });
  }
  updateEducationOnScroll();
  positionLineToFrame();
  let resizeScheduled = false;
  const onResizeRaf = () => {
    resizeScheduled = false;
    positionLineToFrame();
    updateEducationOnScroll();
  };
  window.addEventListener('resize', () => {
    if (!resizeScheduled) {
      resizeScheduled = true;
      requestAnimationFrame(onResizeRaf);
    }
  }, { passive: true });
});
let eduScheduled = false;
const eduOnScrollRaf = () => {
  eduScheduled = false;
  updateEducationOnScroll();
};
document.addEventListener("scroll", () => {
  if (!eduScheduled) {
    eduScheduled = true;
    requestAnimationFrame(eduOnScrollRaf);
  }
}, { passive: true });

