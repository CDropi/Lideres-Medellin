/* ==========================================================================
   HUB LUMA — lógica de la rueda
   - Reparte a los líderes al azar alrededor del círculo en cada visita
   - Gira despacio sola; se detiene al pasar el mouse o al elegir a alguien
   - Se puede girar arrastrando (dedo o mouse)
   - Al elegir un líder, la rueda lo lleva hacia el panel de detalle
   - Enlace directo por líder: tu-sitio/#id-del-lider
   ========================================================================== */
(() => {
  "use strict";

  const C = window.HUB_CONFIG || {};
  const $ = (sel) => document.querySelector(sel);

  const wheel = $("#wheel");
  const nodesEl = $("#nodes");
  const panelEmpty = $("#panelEmpty");
  const card = $("#card");

  const mqDesktop = window.matchMedia("(min-width: 900px)");
  const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canHover = window.matchMedia("(hover: hover)").matches;

  const SPEED = 360 / 140; // grados por segundo (una vuelta cada 140 s)

  /* ---------- utilidades ---------- */
  const slug = (s) =>
    String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const initials = (name) => {
    const p = String(name).trim().split(/\s+/);
    const a = p[0] ? p[0][0] : "";
    const lastWord = p.length > 1 ? p[p.length - 1] : "";
    const b = /^\d+$/.test(lastWord) ? lastWord : lastWord.charAt(0);
    return (a + b).toUpperCase();
  };

  const firstName = (name) => String(name).trim().split(/\s+/)[0];

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const wrap180 = (d) => (((d % 360) + 540) % 360) - 180;
  const hasLink = (url) => typeof url === "string" && /^https?:\/\//i.test(url.trim());

  const makeAvatar = (item, cls) => {
    const el = document.createElement("span");
    el.className = cls;
    el.textContent = initials(item.nombre);
    if (item.foto) {
      const img = new Image();
      img.alt = "";
      img.decoding = "async";
      img.onload = () => { el.textContent = ""; el.appendChild(img); };
      img.src = item.foto;
    }
    return el;
  };

  const icon = {
    clock: '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };

  /* ---------- textos generales ---------- */
  if (C.tituloLinea1) $("#title1").textContent = C.tituloLinea1;
  if (C.tituloLinea2) $("#title2").textContent = C.tituloLinea2;
  $("#subtitle").textContent = C.subtitulo || "";
  const fechaGeneral = C.fechaGeneral || C.fecha;
  if (fechaGeneral) { const d = $("#date"); d.textContent = fechaGeneral; d.hidden = false; }

  // Ajusta el tamaño del título al ancho disponible.
  // Celular: las dos líneas quedan del mismo ancho que el subtítulo (bloque "justificado").
  // Escritorio: "DROPI SE TOMA" ocupa el 76% del bloque y "MEDELLÍN" el 90%.
  const headEl = $(".head");
  const titleEls = [$("#title1"), $("#title2")];
  // Ancho real del renglón más largo del subtítulo
  function subtitleWidth() {
    const sub = $("#subtitle");
    if (!sub.textContent.trim()) return 0;
    const range = document.createRange();
    range.selectNodeContents(sub);
    return Math.max(0, ...Array.from(range.getClientRects(), (r) => r.width));
  }

  function fitTitle() {
    const desktop = mqDesktop.matches;
    const max = desktop ? headEl.clientWidth : (subtitleWidth() || headEl.clientWidth);
    if (!max) return;
    const ratios = desktop ? [0.762, 0.905] : [1, 1];
    titleEls.forEach((el, k) => {
      el.style.fontSize = "";
      const w = el.getBoundingClientRect().width;
      if (!w) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${(fs * max * ratios[k]) / w}px`;
    });
  }
  fitTitle();
  // Se vuelve a ajustar cuando termina de cargar la tipografía (Tusker cambia el ancho)
  if (document.fonts) {
    if (document.fonts.ready) document.fonts.ready.then(fitTitle);
    document.fonts.addEventListener?.("loadingdone", fitTitle);
  }
  window.addEventListener("load", fitTitle);
  let fitRaf = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(fitRaf);
    fitRaf = requestAnimationFrame(fitTitle);
  });

  // Instrucción: "clic" en computador, "tap" en pantallas táctiles
  $("#emptyHint").innerHTML = canHover
    ? '<span class="l">Haz clic en la foto del líder Dropi</span> <span class="l">y agéndate en su clase.</span>'
    : '<span class="l">Haz tap en la foto del líder Dropi</span> <span class="l">y agéndate en su clase.</span>';

  /* ---------- datos ---------- */
  const usedIds = new Set();
  const items = shuffle(
    (Array.isArray(C.lideres) ? C.lideres : [])
      .filter((l) => l && l.nombre)
      .map((l) => {
        let id = l.id ? slug(l.id) : slug(l.nombre);
        while (usedIds.has(id)) id += "-2";
        usedIds.add(id);
        return { ...l, id };
      })
  );
  const N = items.length;

  // Nombre corto para la etiqueta en celular: el primer nombre, o el primer
  // nombre + inicial si hay nombres repetidos (ej: "Juan M." y "Juan C.")
  const firstCount = {};
  items.forEach((it) => { const f = firstName(it.nombre); firstCount[f] = (firstCount[f] || 0) + 1; });
  const shortName = (name) => {
    const f = firstName(name);
    if (firstCount[f] < 2) return f;
    const second = String(name).trim().split(/\s+/)[1];
    return second ? `${f} ${second[0]}.` : f;
  };

  if (!N) {
    $("#emptyLead").textContent =
      "Agrega a los líderes en config.js para ver la rueda.";
    return;
  }

  /* ---------- nodos ---------- */
  const nodes = items.map((item, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "node";
    b.setAttribute("aria-pressed", "false");
    b.setAttribute("aria-label", `${item.nombre}: ${item.clase || "clase"}`);
    b.appendChild(makeAvatar(item, "avatar"));

    const label = document.createElement("span");
    label.className = "node-name";
    label.setAttribute("aria-hidden", "true");
    const full = document.createElement("span");
    full.className = "full";
    full.textContent = item.nombre;
    const short = document.createElement("span");
    short.className = "short";
    short.textContent = item.corto || shortName(item.nombre);
    label.append(full, short);
    b.appendChild(label);

    b.addEventListener("click", () => {
      if (suppressClick) return;
      if (selected === i) aimAt(i); else select(i);
    });

    b.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select((i + 1) % N, true); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select((i - 1 + N) % N, true); }
    });

    nodesEl.appendChild(b);
    return b;
  });

  /* ---------- geometría y animación ---------- */
  let rot = Math.random() * 360;
  let target = null;
  let selected = -1;
  let radius = 0;
  let hovering = false;
  let drag = null;
  let suppressClick = false;
  let lastRot = null;
  let lastRadius = null;
  const step = 360 / N;

  // Ojos del robot
  const eyesEl = $("#eyes");
  const look = { x: 0, y: 0 };
  const pointer = { x: 0, y: 0, t: -1e9 };
  let scanIndex = Math.floor(Math.random() * N);
  let scanTime = 0;

  function measure() {
    const w = wheel.clientWidth;
    const nodeW = nodes[0].offsetWidth || 56;
    const labelPad = mqDesktop.matches ? 38 : 18;
    radius = Math.max(60, w / 2 - nodeW / 2 - labelPad);
    const maxHub = 2 * (radius - nodeW / 2) - (mqDesktop.matches ? 44 : 24);
    const hub = Math.max(90, Math.min(maxHub, radius * (mqDesktop.matches ? 1.05 : 1.12)));
    wheel.style.setProperty("--r", `${radius}px`);
    wheel.style.setProperty("--hub", `${hub}px`);
  }

  function layout() {
    if (rot === lastRot && radius === lastRadius) return;
    lastRot = rot;
    lastRadius = radius;
    for (let i = 0; i < N; i++) {
      const a = ((rot + i * step - 90) * Math.PI) / 180;
      const x = (Math.cos(a) * radius).toFixed(2);
      const y = (Math.sin(a) * radius).toFixed(2);
      nodes[i].style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    }
  }

  // Lleva al líder elegido hacia el panel: a la derecha en escritorio, abajo en celular
  function aimAt(i, instant = false) {
    const focusAngle = mqDesktop.matches ? 0 : 90;
    const t = focusAngle + 90 - i * step;
    target = rot + wrap180(t - rot);
    if (instant || mqReduce.matches) { rot = target; target = null; }
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (target !== null) {
      const d = target - rot;
      if (Math.abs(d) < 0.05) { rot = target; target = null; }
      else rot += d * (1 - Math.exp(-dt * 7));
    } else if (!mqReduce.matches && !(drag && drag.active) && !hovering && selected < 0) {
      rot += SPEED * dt;
    }
    layout();
    updateEyes(now, dt);
    requestAnimationFrame(tick);
  }

  // Mira al líder elegido; si no hay, sigue el mouse o va mirando a cada líder
  function nodeDir(i) {
    const a = ((rot + i * step - 90) * Math.PI) / 180;
    return { x: Math.cos(a), y: Math.sin(a) };
  }

  function updateEyes(now, dt) {
    let tx = 0, ty = 0;
    if (!mqReduce.matches) {
      if (selected >= 0) {
        ({ x: tx, y: ty } = nodeDir(selected));
      } else if (now - pointer.t < 2500) {
        const r = wheel.getBoundingClientRect();
        const dx = pointer.x - (r.left + r.width / 2);
        const dy = pointer.y - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / (r.width / 2));
        tx = (dx / d) * k;
        ty = (dy / d) * k;
      } else {
        if (now - scanTime > 2600) {
          scanTime = now;
          scanIndex = (scanIndex + 3 + Math.floor(Math.random() * 5)) % N;
        }
        ({ x: tx, y: ty } = nodeDir(scanIndex));
      }
    }
    const f = 1 - Math.exp(-dt * 6);
    look.x += (tx - look.x) * f;
    look.y += (ty - look.y) * f;
    eyesEl.style.setProperty("--lx", look.x.toFixed(3));
    eyesEl.style.setProperty("--ly", look.y.toFixed(3));
  }

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.t = performance.now();
  }, { passive: true });

  /* ---------- arrastrar para girar ---------- */
  const angleAt = (x, y) => (Math.atan2(y - drag.cy, x - drag.cx) * 180) / Math.PI;

  wheel.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const r = wheel.getBoundingClientRect();
    drag = { id: e.pointerId, cx: r.left + r.width / 2, cy: r.top + r.height / 2, x0: e.clientX, y0: e.clientY, active: false, prev: 0 };
    drag.prev = angleAt(e.clientX, e.clientY);
  });

  wheel.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.active) {
      if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 8) return;
      drag.active = true;
      target = null;
      wheel.setPointerCapture(e.pointerId);
      wheel.classList.add("is-dragging");
    }
    const a = angleAt(e.clientX, e.clientY);
    rot += wrap180(a - drag.prev);
    drag.prev = a;
  });

  const endDrag = (e) => {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    if (drag.active) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 60);
      wheel.classList.remove("is-dragging");
    }
    drag = null;
  };
  wheel.addEventListener("pointerup", endDrag);
  wheel.addEventListener("pointercancel", endDrag);

  if (canHover) {
    wheel.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") hovering = true; });
    wheel.addEventListener("pointerleave", () => { hovering = false; });
  }

  $("#hub").addEventListener("click", () => { if (!suppressClick && selected >= 0) clearSelection(); });

  /* ---------- panel ---------- */
  function fillCard(it) {
    $("#cardAvatarWrap").replaceChildren(makeAvatar(it, "card-avatar"));
    $("#cardName").textContent = it.nombre;
    $("#cardRole").textContent = it.rol || C.rol || "";
    $("#cardTitle").textContent = it.clase || "";

    const desc = $("#cardDesc");
    desc.textContent = it.descripcion || "";
    desc.hidden = !it.descripcion;

    const chips = $("#cardChips");
    chips.replaceChildren();
    [[it.fecha, icon.calendar], [it.hora, icon.clock]].forEach(([text, svg]) => {
      if (!text) return;
      const c = document.createElement("span");
      c.className = "chip";
      c.innerHTML = svg;
      c.appendChild(document.createTextNode(text));
      chips.appendChild(c);
    });

    const link = $("#cardLink");
    if (hasLink(it.luma)) {
      link.href = it.luma.trim();
      link.textContent = "Inscribirme en Luma";
      link.removeAttribute("aria-disabled");
    } else {
      link.removeAttribute("href");
      link.textContent = "Enlace de inscripción pendiente";
      link.setAttribute("aria-disabled", "true");
    }
  }

  // En escritorio el bloque de textos está centrado verticalmente: al cambiar
  // el panel, el encabezado se desliza suave a su nueva posición
  function smoothHead(change) {
    if (!mqDesktop.matches || mqReduce.matches) { change(); return; }
    const before = headEl.getBoundingClientRect().top;
    change();
    const delta = before - headEl.getBoundingClientRect().top;
    if (Math.abs(delta) > 1) {
      // Se animan los textos uno por uno y no el <header> completo: si el header
      // tuviera un transform, el logo (que en escritorio va con position:absolute
      // en la esquina) se reubicaría dentro del header durante la animación.
      headEl.querySelectorAll(":scope > :not(.logo)").forEach((el) => {
        el.animate(
          [{ transform: `translateY(${delta}px)` }, { transform: "none" }],
          { duration: 380, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
        );
      });
    }
  }

  function select(i, focusNode = false) {
    smoothHead(() => selectNow(i, focusNode));
  }

  function selectNow(i, focusNode) {
    selected = i;
    nodes.forEach((b, j) => {
      b.classList.toggle("is-active", j === i);
      b.setAttribute("aria-pressed", String(j === i));
    });
    wheel.classList.add("has-selection");
    aimAt(i);

    fillCard(items[i]);
    panelEmpty.hidden = true;
    card.hidden = false;
    card.classList.remove("is-in");
    void card.offsetWidth; // reinicia la animación de entrada
    card.classList.add("is-in");

    history.replaceState(null, "", `#${items[i].id}`);
    if (focusNode) nodes[i].focus({ preventScroll: true });

    // En celular, si la tarjeta quedó fuera de pantalla, la acerca
    if (!mqDesktop.matches) {
      const r = card.getBoundingClientRect();
      if (r.bottom > window.innerHeight) card.scrollIntoView({ behavior: mqReduce.matches ? "auto" : "smooth", block: "end" });
    }
  }

  function clearSelection() {
    smoothHead(clearNow);
  }

  function clearNow() {
    const prev = selected;
    selected = -1;
    nodes.forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
    wheel.classList.remove("has-selection");
    card.hidden = true;
    panelEmpty.hidden = false;
    history.replaceState(null, "", location.pathname + location.search);
    if (prev >= 0) nodes[prev].focus({ preventScroll: true });
  }

  $("#cardClose").addEventListener("click", clearSelection);
  $("#prevBtn").addEventListener("click", () => select((selected - 1 + N) % N));
  $("#nextBtn").addEventListener("click", () => select((selected + 1) % N));


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && selected >= 0) clearSelection();
  });

  /* ---------- arranque ---------- */
  measure();
  new ResizeObserver(() => {
    measure();
    if (selected >= 0 && !(drag && drag.active)) aimAt(selected, true);
  }).observe(wheel);
  mqDesktop.addEventListener("change", () => { measure(); if (selected >= 0) aimAt(selected); });

  // Enlace directo: tu-sitio/#id-del-lider abre esa clase
  const fromHash = decodeURIComponent(location.hash.slice(1));
  const hashIndex = items.findIndex((it) => it.id === fromHash);
  if (hashIndex >= 0) { select(hashIndex); aimAt(hashIndex, true); }

  layout();
  requestAnimationFrame(tick);
})();
