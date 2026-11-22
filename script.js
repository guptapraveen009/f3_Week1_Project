let timers = [];  
  let nextId = 1;

  function addTimer() {
    const h = Number(hh.value) || 0;
    const m = Number(mm.value) || 0;
    const s = Number(ss.value) || 0;
    const total = h * 3600 + m * 60 + s;
    if (total <= 0) return;

    timers.push({ id: nextId++, seconds: total });
    hh.value = mm.value = ss.value = "";
    draw();
  }

  function removeTimer(id) {
    timers = timers.filter(t => t.id !== id);
    draw();
  }

  function two(n) { return String(n).padStart(2, "0"); }

  function format(sec) {
    return two(Math.floor(sec / 3600)) + " : " + two(Math.floor(sec / 60) % 60) + " : " + two(sec % 60);
  }

  function draw() {
    empty.style.display = timers.length ? "none" : "block";
    list.innerHTML = "";
    for (const t of timers) {
      const div = document.createElement("div");
      if (t.seconds > 0) {
        div.className = "row";
        div.innerHTML = `<span>Time Left :</span><span class="big">${format(t.seconds)}</span><button onclick="removeTimer(${t.id})">Delete</button>`;
      } else {
        div.className = "row done";
        div.innerHTML = `<span class="big">Timer Is Up !</span><button onclick="removeTimer(${t.id})">Stop</button>`;
      }
      list.appendChild(div);
    }
  }

  // every second, reduce each running timer by 1
  setInterval(() => {
    timers.forEach(t => { if (t.seconds > 0) t.seconds--; });
    draw();
  }, 1000);

  draw();
