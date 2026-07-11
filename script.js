const first="Disha";
const last="Umeshaiah";
const tagline="CODE + AI + DESIGN";

let i=0,j=0,k=0;

function typeFirst(){
 if(i<first.length){
  document.getElementById("first-name").innerHTML+=first[i++];
  setTimeout(typeFirst,100);
 } else setTimeout(typeLast,200);
}

function typeLast(){
 if(j<last.length){
  document.getElementById("last-name").innerHTML+=last[j++];
  setTimeout(typeLast,100);
 } else setTimeout(typeTagline,400);
}

function typeTagline(){
 if(k<tagline.length){
  document.getElementById("subtitle-text").innerHTML+=tagline[k++];
  setTimeout(typeTagline,55);
 } else setTimeout(revealButtons,300);
}

function revealButtons(){
 const btns=document.querySelectorAll("#hero-buttons a");
 btns.forEach((btn,index)=>{
  setTimeout(()=>btn.classList.add("revealed"),index*220);
 });
}

typeFirst();

// LOGO CHANGE ON SCROLL
window.addEventListener("scroll",()=>{
 const logo=document.getElementById("logo");
 const logoText=logo.querySelector(".logo-text-nav");

 if(window.scrollY>100){
  logoText.innerHTML="Disha Umeshaiah";
 } else {
  logoText.innerHTML='/du<span class="nav-cursor">|</span>';
 }
});


function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_m03s22f", "template_1fd4di9", {
    from_name: name,
    from_email: email,
    message: message
  })
  .then(() => {
    alert("Message sent!");
  })
  .catch((error) => {
    console.error(error);
    alert("Failed to send");
  });
}

// PROJECT FILTERS
(function(){
  const cards = document.querySelectorAll(".project-card");
  const buttons = document.querySelectorAll(".filter-btn");

  const counts = { all: cards.length, "ml-ai": 0, software: 0 };
  cards.forEach(card=>{
    const cats = (card.dataset.categories||"").split(",");
    cats.forEach(cat=>{ if(counts[cat]!==undefined) counts[cat]++; });
  });

  buttons.forEach(btn=>{
    const f = btn.dataset.filter;
    const countEl = btn.querySelector(".count");
    if(countEl) countEl.textContent = "("+counts[f]+")";

    btn.addEventListener("click", ()=>{
      buttons.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach(card=>{
        const cats = (card.dataset.categories||"").split(",");
        if(f==="all" || cats.includes(f)){
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
})();

// SEE MORE PROJECTS
(function(){
  const btn = document.getElementById("see-more-projects");
  const extras = document.querySelectorAll(".project-card.extra-card");
  if(!btn) return;

  let expanded = false;

  btn.addEventListener("click", ()=>{
    expanded = !expanded;
    extras.forEach(card=>card.classList.toggle("extra-visible", expanded));
    btn.classList.toggle("expanded", expanded);
    btn.innerHTML = expanded
      ? 'See fewer projects <i class="fas fa-chevron-down"></i>'
      : 'See more projects <i class="fas fa-chevron-down"></i>';
  });
})();

// COMMAND PALETTE
(function(){
  const overlay = document.getElementById("cmdk-overlay");
  const btn = document.getElementById("cmdk-btn");
  const input = document.getElementById("cmdk-input");
  const list = document.getElementById("cmdk-list");
  const output = document.getElementById("cmdk-output");
  const items = Array.from(document.querySelectorAll(".cmdk-item"));

  const sectionMap = {
    about: "#about",
    projects: "#projects",
    skills: "#skills",
    github: "#github-activity",
    contact: "#contact"
  };

  let activeIndex = 0;

  function setActive(index){
    const visible = items.filter(i=>!i.classList.contains("hidden"));
    visible.forEach(i=>i.classList.remove("active"));
    if(visible[index]) visible[index].classList.add("active");
    activeIndex = index;
  }

  function openPalette(){
    overlay.classList.add("open");
    input.value = "";
    output.innerHTML = "";
    items.forEach(i=>i.classList.remove("hidden"));
    setActive(0);
    setTimeout(()=>input.focus(),50);
  }

  function closePalette(){
    overlay.classList.remove("open");
  }

  function printLines(lines){
    output.innerHTML = "";
    lines.forEach(line=>{
      const div = document.createElement("div");
      div.className = "cmdk-line";
      div.textContent = line;
      output.appendChild(div);
    });
  }

  function runCommand(cmd){
    cmd = cmd.replace(/^\//,"").toLowerCase().trim();

    if(sectionMap[cmd]){
      printLines(["$ "+cmd, "> navigating to "+cmd+" section..."]);
      setTimeout(()=>{
        closePalette();
        document.querySelector(sectionMap[cmd]).scrollIntoView({behavior:"smooth"});
      },350);
      return;
    }

    if(cmd==="whoami"){
      printLines([
        "$ whoami",
        "> disha umeshaiah",
        "> cs student, aston university",
        "> ai + software engineering · full-stack"
      ]);
      return;
    }

    if(cmd==="status"){
      printLines([
        "$ status",
        "> open to opportunities",
        "> united kingdom"
      ]);
      return;
    }

    if(cmd==="help" || cmd===""){
      printLines(["$ help", "> use ↑ ↓ to navigate, enter to select, esc to close"]);
      return;
    }

    printLines(["$ "+cmd, "> command not found — try /help"]);
  }

  function filterItems(query){
    const q = query.replace(/^\//,"").toLowerCase().trim();
    items.forEach(item=>{
      const cmd = item.dataset.cmd;
      const desc = item.querySelector(".cmdk-desc").textContent.toLowerCase();
      const match = cmd.includes(q) || desc.includes(q);
      item.classList.toggle("hidden", !match);
    });
    setActive(0);
  }

  btn.addEventListener("click", openPalette);

  overlay.addEventListener("click", (e)=>{
    if(e.target===overlay) closePalette();
  });

  window.addEventListener("keydown",(e)=>{
    const tag = document.activeElement.tagName;
    const typing = tag==="INPUT" || tag==="TEXTAREA";

    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="z" && !typing){
      e.preventDefault();
      overlay.classList.contains("open") ? closePalette() : openPalette();
    }

    if(overlay.classList.contains("open")){
      if(e.key==="Escape"){
        closePalette();
      }
      if(e.key==="ArrowDown"){
        e.preventDefault();
        const visible = items.filter(i=>!i.classList.contains("hidden"));
        setActive(Math.min(activeIndex+1, visible.length-1));
      }
      if(e.key==="ArrowUp"){
        e.preventDefault();
        setActive(Math.max(activeIndex-1,0));
      }
      if(e.key==="Enter"){
        const visible = items.filter(i=>!i.classList.contains("hidden"));
        if(visible[activeIndex]){
          runCommand(visible[activeIndex].dataset.cmd);
        } else {
          runCommand(input.value);
        }
      }
    }
  });

  input.addEventListener("input",()=>{
    filterItems(input.value);
  });

  items.forEach(item=>{
    item.addEventListener("click",()=>runCommand(item.dataset.cmd));
  });

  // HERO TERMINAL INPUT HANDOFF
  const macInput = document.getElementById("mac-cmd-input");
  const macCursorDecor = document.getElementById("mac-cursor-decor");

  function syncMacCursor(){
    if(!macCursorDecor) return;
    const shouldHide = document.activeElement===macInput || macInput.value.length>0;
    macCursorDecor.style.visibility = shouldHide ? "hidden" : "visible";
  }

  if(macInput){
    macInput.addEventListener("focus", ()=>{
      openPalette();
      input.value = macInput.value;
      filterItems(input.value);
      syncMacCursor();
    });
    macInput.addEventListener("input", syncMacCursor);
    macInput.addEventListener("blur", ()=>{
      macInput.value = "";
      syncMacCursor();
    });
  }

  // FOOTER TERMINAL INPUT HANDOFF
  const footerInput = document.getElementById("footer-cmd-input");
  const footerCursorDecor = document.getElementById("footer-cursor-decor");

  function syncFooterCursor(){
    if(!footerCursorDecor) return;
    const shouldHide = document.activeElement===footerInput || footerInput.value.length>0;
    footerCursorDecor.style.visibility = shouldHide ? "hidden" : "visible";
  }

  if(footerInput){
    footerInput.addEventListener("focus", ()=>{
      openPalette();
      input.value = footerInput.value;
      filterItems(input.value);
      syncFooterCursor();
    });
    footerInput.addEventListener("input", syncFooterCursor);
    footerInput.addEventListener("blur", ()=>{
      footerInput.value = "";
      syncFooterCursor();
    });
  }
})();

// SCROLL TO TOP BUTTON
(function(){
  const btn = document.getElementById("scroll-top-btn");
  if(!btn) return;

  window.addEventListener("scroll", ()=>{
    if(window.scrollY > 400){
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", ()=>{
    window.scrollTo({top:0, behavior:"smooth"});
  });
})();

// GITHUB ACTIVITY
const GH_USERNAME = "disha-umeshaiah";

function renderGhCalendar(contributions){
  const grid = document.getElementById("gh-grid");
  const monthsRow = document.getElementById("gh-months");
  grid.innerHTML = "";
  monthsRow.innerHTML = "";

  const weeks = [];
  let currentWeek = [];

  const firstDay = new Date(contributions[0].date).getDay();
  for(let i=0;i<firstDay;i++) currentWeek.push(null);

  contributions.forEach(day=>{
    currentWeek.push(day);
    if(currentWeek.length===7){
      weeks.push(currentWeek);
      currentWeek=[];
    }
  });
  if(currentWeek.length>0){
    while(currentWeek.length<7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  let lastMonth=-1;
  weeks.forEach((week,weekIndex)=>{
    const firstValid = week.find(d=>d);
    if(firstValid){
      const m = new Date(firstValid.date).getMonth();
      if(m!==lastMonth){
        const label=document.createElement("span");
        label.style.left = (weekIndex*14)+"px";
        label.textContent = new Date(firstValid.date).toLocaleString("default",{month:"short"});
        monthsRow.appendChild(label);
        lastMonth=m;
      }
    }
    week.forEach(day=>{
      const cell=document.createElement("div");
      if(day){
        cell.className="gh-cell level-"+day.level;
        cell.title=day.date+": "+day.count+" contribution"+(day.count===1?"":"s");
      } else {
        cell.className="gh-cell level-empty";
      }
      grid.appendChild(cell);
    });
  });
}

async function loadGithubActivity(){
  try{
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/"+GH_USERNAME+"?y=last");
    const data = await res.json();
    const contributions = data.contributions;

    const total = contributions.reduce((s,c)=>s+c.count,0);
    document.getElementById("gh-total").textContent = total.toLocaleString();

    const best = contributions.reduce((m,c)=>c.count>m?c.count:m,0);
    document.getElementById("gh-bestday").textContent = best;

    let streak=0;
    for(let i=contributions.length-1;i>=0;i--){
      if(contributions[i].count>0) streak++;
      else break;
    }
    document.getElementById("gh-streak").textContent = streak;

    renderGhCalendar(contributions);
  } catch(e){
    console.error("GitHub activity fetch failed", e);
    const panel = document.querySelector(".github-panel");
    if(panel) panel.innerHTML = '<p style="text-align:center;color:#999;">Live GitHub activity could not be loaded right now.</p>';
  }

  try{
    const repoRes = await fetch("https://api.github.com/users/"+GH_USERNAME+"/repos?per_page=100");
    const repos = await repoRes.json();
    const stars = Array.isArray(repos) ? repos.reduce((s,r)=>s+(r.stargazers_count||0),0) : 0;
    document.getElementById("gh-stars").textContent = stars;
  } catch(e){
    document.getElementById("gh-stars").textContent = "–";
  }
}

loadGithubActivity();

