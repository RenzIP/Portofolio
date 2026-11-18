/* Ruang — scene 3D beranda.
   Three.js r150 (UMD). Data proyek, stasiun, dan teks UI dibaca dari
   <script id="ruang-data"> yang dirender Astro. Tidak ada salinan data
   proyek di file ini. */

(async () => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- data ---------------- */

  const dataEl = $("#ruang-data");
  let DATA;
  try {
    DATA = JSON.parse(dataEl.textContent || "{}");
  } catch (err) {
    DATA = {};
  }

  const PROJECTS = Array.isArray(DATA.projects) ? DATA.projects : [];
  const STATIONS = Array.isArray(DATA.stations) ? DATA.stations : [];
  const COPY = DATA.copy || {};
  const ARCHIVE = DATA.archive || {};
  const BOARD = DATA.board || {};
  const SCREEN = DATA.screen || {};
  const STATION_COUNT = STATIONS.length || 5;

  function kindLabel(kind) {
    return (COPY.kinds && COPY.kinds[kind]) || kind;
  }

  /* ---------------- texture helpers ---------------- */

  function canvasTex(w, h, draw) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    draw(ctx, w, h);
    const t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  function speckle(ctx, w, h, count, alpha, size = 1.6) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * alpha;
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 245 : 0},${Math.random() > 0.5 ? 225 : 0},${a})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, size, size);
    }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ---------------- boot ---------------- */

  const stage = $("#stage");
  const boot = $("#boot");
  const bootPct = $("#boot-pct");
  const listEl = $("#daftar");

  /** Fallback: tampilkan mode daftar statis, tanpa WebGL. */
  function showFallback() {
    document.body.classList.add("is-ready", "no-webgl");
    if (boot) boot.remove();
    if (!listEl) return;
    listEl.classList.add("is-open");
    listEl.removeAttribute("aria-hidden");
  }

  if (typeof THREE === "undefined") {
    showFallback();
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch (err) {
    renderer = null;
  }

  if (!renderer) {
    showFallback();
    return;
  }

  try {
  /* Tekstur kanvas digambar sekali di awal; tunggu webfont supaya label
     di layar dan papan tidak memakai font fallback. */
  try {
    await document.fonts.ready;
  } catch (err) {
    /* font gagal dimuat — fallback font tetap dipakai */
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0a09);
  scene.fog = new THREE.FogExp2(0x0b0a09, 0.042);

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.05, 60);

  const hemi = new THREE.HemisphereLight(0x71839a, 0x1b1410, 0.34);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xffd2a0, 0.62);
  key.position.set(2.6, 4.4, 2.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 16;
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -3;
  key.shadow.bias = -0.0012;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x9dc4e6, 0.5);
  rim.position.set(1.9, 3.4, -4.2);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0xffc98f, 0.18);
  fill.position.set(-3, 2.4, 4);
  scene.add(fill);

  const lampLight = new THREE.PointLight(0xffb066, 1.5, 6.5, 2);
  lampLight.position.set(1.2, 1.33, -0.62);
  scene.add(lampLight);

  const screenLight = new THREE.PointLight(0x8fe3c4, 0.55, 3.4, 2);
  screenLight.position.set(0, 1.5, -0.35);
  scene.add(screenLight);

  /* ---------------- materials ---------------- */

  const mat = {
    wall: new THREE.MeshStandardMaterial({ color: 0x2a241d, roughness: 0.96 }),
    wallDark: new THREE.MeshStandardMaterial({ color: 0x1d1915, roughness: 0.98 }),
    floor: new THREE.MeshStandardMaterial({ color: 0x3a2f24, roughness: 0.82 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x6b4a2f, roughness: 0.66 }),
    woodDark: new THREE.MeshStandardMaterial({ color: 0x3d2a1b, roughness: 0.72 }),
    metal: new THREE.MeshStandardMaterial({ color: 0x2c2c2a, roughness: 0.42, metalness: 0.65 }),
    black: new THREE.MeshStandardMaterial({ color: 0x14120f, roughness: 0.55 }),
    paper: new THREE.MeshStandardMaterial({ color: 0xd8cdb6, roughness: 0.92 }),
    oxide: new THREE.MeshStandardMaterial({ color: 0xc05a3a, roughness: 0.7 }),
    amber: new THREE.MeshStandardMaterial({ color: 0xf2b45c, roughness: 0.6 }),
    green: new THREE.MeshStandardMaterial({ color: 0x8fd3b2, roughness: 0.6 }),
    screenFrame: new THREE.MeshStandardMaterial({ color: 0x0d0c0b, roughness: 0.5, metalness: 0.2 }),
  };

  function box(w, h, d, material, x, y, z) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  const world = new THREE.Group();
  scene.add(world);

  const hotspots = [];

  function hotspot(mesh, data) {
    mesh.userData.hotspot = data;
    hotspots.push(mesh);
    return mesh;
  }

  /* ---------------- room ---------------- */

  function buildRoom() {
    const floorTex = canvasTex(512, 512, (ctx, w, h) => {
      ctx.fillStyle = "#3b2f23";
      ctx.fillRect(0, 0, w, h);
      const rows = 8;
      for (let r = 0; r < rows; r++) {
        const y = (r * h) / rows;
        const tone = 42 + Math.floor(Math.random() * 22);
        ctx.fillStyle = `rgb(${tone + 18},${tone + 8},${tone - 4})`;
        ctx.fillRect(0, y, w, h / rows - 1.5);
        for (let i = 0; i < 26; i++) {
          ctx.strokeStyle = `rgba(20,14,9,${0.05 + Math.random() * 0.12})`;
          ctx.lineWidth = 0.7 + Math.random();
          ctx.beginPath();
          const yy = y + Math.random() * (h / rows);
          ctx.moveTo(Math.random() * w, yy);
          ctx.bezierCurveTo(w * 0.3, yy + 2, w * 0.7, yy - 2, w, yy + 1);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(12,8,5,0.55)";
        ctx.fillRect(0, y + h / rows - 1.5, w, 1.5);
      }
      speckle(ctx, w, h, 1400, 0.05);
    });
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(3, 3.4);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(9.4, 10.4),
      new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.86, metalness: 0.02 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0.5);
    floor.receiveShadow = true;
    world.add(floor);

    const wallTex = canvasTex(512, 512, (ctx, w, h) => {
      ctx.fillStyle = "#2b241d";
      ctx.fillRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(255,225,190,0.05)");
      g.addColorStop(0.6, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      speckle(ctx, w, h, 2600, 0.07, 1.2);
      for (let i = 0; i < 9; i++) {
        ctx.strokeStyle = `rgba(0,0,0,${0.05 + Math.random() * 0.06})`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * w, 0);
        ctx.lineTo(Math.random() * w, h);
        ctx.stroke();
      }
    });
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
    wallTex.repeat.set(2.6, 1.4);

    const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.97 });

    const back = new THREE.Mesh(new THREE.PlaneGeometry(9.4, 3.4), wallMat);
    back.position.set(0, 1.7, -4);
    back.receiveShadow = true;
    world.add(back);

    const left = new THREE.Mesh(new THREE.PlaneGeometry(10.4, 3.4), wallMat);
    left.rotation.y = Math.PI / 2;
    left.position.set(-3.8, 1.7, 0.5);
    left.receiveShadow = true;
    world.add(left);

    const right = new THREE.Mesh(new THREE.PlaneGeometry(10.4, 3.4), wallMat);
    right.rotation.y = -Math.PI / 2;
    right.position.set(3.8, 1.7, 0.5);
    right.receiveShadow = true;
    world.add(right);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(9.4, 10.4),
      new THREE.MeshStandardMaterial({ color: 0x191510, roughness: 1 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 3.4, 0.5);
    world.add(ceiling);

    const skirt = new THREE.MeshStandardMaterial({ color: 0x241d16, roughness: 0.9 });
    world.add(box(9.4, 0.14, 0.06, skirt, 0, 0.07, -3.97));
    world.add(box(0.06, 0.14, 10.4, skirt, -3.77, 0.07, 0.5));
    world.add(box(0.06, 0.14, 10.4, skirt, 3.77, 0.07, 0.5));

    /* window */
    const city = canvasTex(512, 512, (ctx, w, h) => {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#0a1220");
      sky.addColorStop(0.55, "#132234");
      sky.addColorStop(1, "#1d2a33");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(w * 0.7, h * 0.22, 8, w * 0.7, h * 0.22, 150);
      glow.addColorStop(0, "rgba(210,225,240,0.5)");
      glow.addColorStop(1, "rgba(210,225,240,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(232,238,244,0.9)";
      ctx.beginPath();
      ctx.arc(w * 0.7, h * 0.22, 13, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 70; i++) {
        ctx.fillStyle = `rgba(220,232,245,${0.15 + Math.random() * 0.5})`;
        ctx.fillRect(Math.random() * w, Math.random() * h * 0.45, 1.2, 1.2);
      }

      let x = -10;
      while (x < w + 20) {
        const bw = 26 + Math.random() * 58;
        const bh = 90 + Math.random() * 220;
        const y = h - bh;
        ctx.fillStyle = `rgb(${12 + Math.random() * 8},${19 + Math.random() * 9},${26 + Math.random() * 10})`;
        ctx.fillRect(x, y, bw, bh);
        for (let wy = y + 8; wy < h - 6; wy += 13) {
          for (let wx = x + 5; wx < x + bw - 4; wx += 9) {
            if (Math.random() < 0.42) {
              ctx.fillStyle = Math.random() < 0.72 ? "rgba(242,180,92,0.8)" : "rgba(143,211,178,0.65)";
              ctx.fillRect(wx, wy, 3.4, 4.6);
            }
          }
        }
        x += bw + 5 + Math.random() * 10;
      }

      const haze = ctx.createLinearGradient(0, h * 0.55, 0, h);
      haze.addColorStop(0, "rgba(24,40,54,0)");
      haze.addColorStop(1, "rgba(24,40,54,0.72)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, h * 0.55, w, h * 0.45);
    });

    const winW = 1.72;
    const winH = 1.34;
    const winX = 1.62;
    const winY = 1.98;
    const winZ = -3.985;

    const night = new THREE.Mesh(
      new THREE.PlaneGeometry(winW, winH),
      new THREE.MeshStandardMaterial({
        map: city,
        emissive: 0xffffff,
        emissiveMap: city,
        emissiveIntensity: 0.62,
        roughness: 0.9,
      })
    );
    night.position.set(winX, winY, winZ);
    world.add(night);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x17130f, roughness: 0.7 });
    world.add(box(winW + 0.16, 0.09, 0.12, frameMat, winX, winY + winH / 2 + 0.04, winZ + 0.03));
    world.add(box(winW + 0.16, 0.09, 0.12, frameMat, winX, winY - winH / 2 - 0.04, winZ + 0.03));
    world.add(box(0.09, winH + 0.16, 0.12, frameMat, winX - winW / 2 - 0.04, winY, winZ + 0.03));
    world.add(box(0.09, winH + 0.16, 0.12, frameMat, winX + winW / 2 + 0.04, winY, winZ + 0.03));
    world.add(box(0.035, winH, 0.06, frameMat, winX, winY, winZ + 0.04));
    world.add(box(winW, 0.035, 0.06, frameMat, winX, winY + 0.18, winZ + 0.04));
    world.add(box(winW + 0.3, 0.06, 0.26, mat.woodDark, winX, winY - winH / 2 - 0.12, winZ + 0.09));

    hotspot(night, { kind: "contact", label: DATA.contactEmail || "Email", station: 4 });

    /* whiteboard */
    const boardTex = canvasTex(1024, 600, (ctx, w, h) => {
      ctx.fillStyle = "#e7dfcd";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(90,104,96,0.12)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.fillStyle = "#3a3a32";
      ctx.font = "500 22px 'JetBrains Mono Variable', monospace";
      ctx.fillText(BOARD.title || "GRADIOL / ARSITEKTUR", 46, 62);
      ctx.strokeStyle = "rgba(58,58,50,0.35)";
      ctx.beginPath();
      ctx.moveTo(46, 78);
      ctx.lineTo(420, 78);
      ctx.stroke();

      const boxNode = (x, y, bw, bh, title, sub) => {
        ctx.strokeStyle = "#2f3a35";
        ctx.lineWidth = 3;
        roundRect(ctx, x, y, bw, bh, 3);
        ctx.stroke();
        ctx.fillStyle = "#2f3a35";
        ctx.font = "600 26px 'JetBrains Mono Variable', monospace";
        ctx.fillText(title, x + 18, y + 38);
        ctx.fillStyle = "#6b6a5c";
        ctx.font = "400 18px 'JetBrains Mono Variable', monospace";
        ctx.fillText(sub, x + 18, y + 66);
      };

      boxNode(52, 130, 236, 92, "BROWSER", "Next.js App Router");
      boxNode(392, 130, 236, 92, "GO / FIBER", "state + broadcast");
      boxNode(732, 130, 236, 92, "REDIS", "presence · lock");

      ctx.strokeStyle = "#a9522f";
      ctx.lineWidth = 3;
      const arrow = (x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        const a = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - 11 * Math.cos(a - 0.4), y2 - 11 * Math.sin(a - 0.4));
        ctx.lineTo(x2 - 11 * Math.cos(a + 0.4), y2 - 11 * Math.sin(a + 0.4));
        ctx.closePath();
        ctx.fillStyle = "#a9522f";
        ctx.fill();
      };
      arrow(288, 158, 386, 158);
      arrow(628, 158, 726, 158);
      arrow(850, 224, 850, 292);
      arrow(732, 318, 300, 318);
      ctx.font = "400 16px 'JetBrains Mono Variable', monospace";
      ctx.fillStyle = "#7a6a52";
      ctx.fillText("WS", 322, 148);
      ctx.fillText("commands", 646, 148);

      ctx.strokeStyle = "#2f3a35";
      ctx.lineWidth = 2;
      roundRect(ctx, 52, 292, 236, 76, 2);
      ctx.stroke();
      ctx.fillStyle = "#2f3a35";
      ctx.font = "500 20px 'JetBrains Mono Variable', monospace";
      ctx.fillText(BOARD.version || "VERSION HISTORY", 70, 326);
      ctx.fillStyle = "#6b6a5c";
      ctx.font = "400 16px 'JetBrains Mono Variable', monospace";
      ctx.fillText(BOARD.versionSub || "", 70, 350);

      ctx.save();
      ctx.translate(742, 318);
      ctx.rotate(-0.045);
      ctx.fillStyle = "#f2b45c";
      ctx.fillRect(0, 0, 210, 132);
      ctx.fillStyle = "#3a2a16";
      ctx.font = "600 19px 'JetBrains Mono Variable', monospace";
      ctx.fillText(BOARD.stickyTitle || "", 18, 34);
      ctx.font = "400 17px 'JetBrains Mono Variable', monospace";
      const sticky = Array.isArray(BOARD.sticky) ? BOARD.sticky : [];
      sticky.forEach((line, i) => ctx.fillText(line, 18, 64 + i * 26));
      ctx.restore();

      ctx.fillStyle = "#7a6a52";
      ctx.font = "400 16px 'JetBrains Mono Variable', monospace";
      const boardFoot = Array.isArray(BOARD.foot) ? BOARD.foot : [];
      ctx.fillText(boardFoot[0] || "", 52, 512);
      ctx.fillText(boardFoot[1] || "", 52, 540);
      speckle(ctx, w, h, 500, 0.04, 1);
    });

    const boardW = 2.16;
    const boardH = 1.22;
    const board = new THREE.Mesh(
      new THREE.PlaneGeometry(boardW, boardH),
      new THREE.MeshStandardMaterial({
        map: boardTex,
        roughness: 0.82,
        emissive: 0xffffff,
        emissiveMap: boardTex,
        emissiveIntensity: 0.09,
      })
    );
    board.position.set(-1.78, 1.9, -3.972);
    world.add(board);

    const boardFrame = new THREE.MeshStandardMaterial({ color: 0x8d8578, roughness: 0.5, metalness: 0.35 });
    world.add(box(boardW + 0.07, 0.045, 0.05, boardFrame, -1.78, 1.9 + boardH / 2, -3.965));
    world.add(box(boardW + 0.07, 0.045, 0.05, boardFrame, -1.78, 1.9 - boardH / 2, -3.965));
    world.add(box(0.045, boardH, 0.05, boardFrame, -1.78 - boardW / 2, 1.9, -3.965));
    world.add(box(0.045, boardH, 0.05, boardFrame, -1.78 + boardW / 2, 1.9, -3.965));

    hotspot(board, { kind: "board", label: BOARD.title || "GraDiOl", sheet: DATA.deskProject || "gradi-ol" });
  }

  buildRoom();

  /* ---------------- monitor ---------------- */

  const MONITOR_W = 1024;
  const MONITOR_H = 576;
  const MONITOR_INTERVAL = 6.6;
  const MONITOR_WIPE = 0.72;
  const MONITOR_FALLBACK = {
    key: "ruang",
    n: "00",
    name: "Ruang",
    title: "",
    summary: "",
    stack: "",
    color: "#8fd3b2",
  };

  let monitor = null;

  function monitorFont(size, weight, mono) {
    const family = mono
      ? "'JetBrains Mono Variable', 'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', 'Microsoft YaHei', monospace"
      : "'Bricolage Grotesque Variable', 'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', 'Microsoft YaHei', sans-serif";
    return `${weight || 400} ${size}px ${family}`;
  }

  function tint(hex, alpha) {
    const raw = String(hex || "").replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(raw)) return `rgba(143, 211, 178, ${alpha})`;
    const n = parseInt(raw, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }

  function fitText(ctx, text, maxWidth) {
    const value = String(text || "");
    if (ctx.measureText(value).width <= maxWidth) return value;
    let out = value;
    while (out.length && ctx.measureText(`${out}…`).width > maxWidth) {
      out = out.slice(0, -1);
    }
    return `${out.trimEnd()}…`;
  }

  function wrapText(ctx, text, maxWidth, maxLines) {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    const flush = () => {
      if (line) {
        lines.push(line);
        line = "";
      }
    };
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width <= maxWidth) {
        line = test;
        continue;
      }
      flush();
      if (ctx.measureText(word).width <= maxWidth) {
        line = word;
        continue;
      }
      let chunk = "";
      for (const ch of word) {
        if (chunk && ctx.measureText(chunk + ch).width > maxWidth) {
          lines.push(chunk);
          chunk = ch;
        } else {
          chunk += ch;
        }
      }
      line = chunk;
    }
    flush();
    if (lines.length <= maxLines) return lines;
    const kept = lines.slice(0, maxLines);
    let tail = kept[maxLines - 1];
    while (tail.length && ctx.measureText(`${tail}…`).width > maxWidth) {
      tail = tail.slice(0, -1);
    }
    kept[maxLines - 1] = `${tail.trimEnd()}…`;
    return kept;
  }

  function drawMonitorSlide(ctx, project, index) {
    const w = MONITOR_W;
    const h = MONITOR_H;
    const accent = project.color || "#8fd3b2";
    const total = String(Math.max(1, PROJECTS.length)).padStart(2, "0");
    const label = (SCREEN.label || "Proyek").toUpperCase();
    const hint = SCREEN.hint || "";
    const number = project.n || String(index + 1).padStart(2, "0");

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#08120f";
    ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(w * 0.82, h * 0.1, 16, w * 0.82, h * 0.1, w * 0.82);
    glow.addColorStop(0, tint(accent, 0.26));
    glow.addColorStop(0.45, tint(accent, 0.07));
    glow.addColorStop(1, tint(accent, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(143, 211, 178, 0.09)";
    for (let x = 0; x < w; x += 30) {
      for (let y = 0; y < h; y += 30) ctx.fillRect(x, y, 1, 1);
    }

    /* nomor proyek raksasa sebagai latar */
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = accent;
    ctx.font = monitorFont(260, 700, false);
    ctx.textAlign = "right";
    ctx.fillText(number, w - 48, 304);
    ctx.restore();

    /* header */
    ctx.fillStyle = "rgba(6, 15, 12, 0.86)";
    ctx.fillRect(0, 0, w, 64);
    ctx.fillStyle = tint(accent, 0.35);
    ctx.fillRect(0, 62, w, 2);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(48, 32, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#dff3e8";
    ctx.font = monitorFont(17, 600, true);
    ctx.fillText(label, 68, 39);

    ctx.textAlign = "right";
    ctx.fillStyle = "#6f8b7e";
    ctx.font = monitorFont(16, 400, true);
    ctx.fillText(`${number} / ${total}`, w - 48, 39);
    ctx.textAlign = "left";

    /* nama + judul lengkap */
    ctx.fillStyle = "#f4efe4";
    ctx.font = monitorFont(74, 600, false);
    const nameLines = wrapText(ctx, project.name || project.key || "", w - 384, 2);
    let y = 190;
    nameLines.forEach((line) => {
      ctx.fillText(line, 48, y);
      y += 80;
    });

    if (project.title && project.title !== project.name) {
      ctx.fillStyle = "#7f9a8d";
      ctx.font = monitorFont(21, 400, false);
      ctx.fillText(fitText(ctx, project.title, w - 384), 48, y + 4);
      y += 38;
    }

    y += 14;
    ctx.fillStyle = accent;
    ctx.fillRect(48, y, 88, 4);
    y += 38;

    ctx.fillStyle = "#a9c4b7";
    ctx.font = monitorFont(24, 400, false);
    const summaryLines = wrapText(ctx, project.summary || "", w - 324, 2);
    summaryLines.forEach((line) => {
      ctx.fillText(line, 48, y);
      y += 34;
    });

    if (project.stack) {
      ctx.fillStyle = tint(accent, 0.82);
      ctx.font = monitorFont(17, 500, true);
      ctx.fillText(fitText(ctx, project.stack, w - 96), 48, h - 118);
    }

    /* footer */
    ctx.strokeStyle = "rgba(143, 211, 178, 0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(48, h - 86);
    ctx.lineTo(w - 48, h - 86);
    ctx.stroke();

    ctx.fillStyle = "#6f8b7e";
    ctx.font = monitorFont(16, 400, true);
    const foot = [
      project.date,
      project.hash ? `commit ${project.hash}` : null,
      project.status,
    ]
      .filter(Boolean)
      .join(" · ");
    ctx.fillText(fitText(ctx, foot, w - 420), 48, h - 48);

    ctx.textAlign = "right";
    ctx.fillStyle = tint(accent, 0.9);
    ctx.font = monitorFont(15, 500, true);
    ctx.fillText(hint, w - 48, h - 48);
    ctx.textAlign = "left";

    /* titik progres */
    for (let i = 0; i < PROJECTS.length; i++) {
      const on = i === index;
      const dotX = 51 + i * 18;
      const dotY = h - 21;
      if (on) {
        ctx.fillStyle = accent;
        roundRect(ctx, dotX - 3, dotY - 2.5, 16, 5, 2.5);
        ctx.fill();
      } else {
        ctx.fillStyle = "rgba(143, 211, 178, 0.24)";
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function makeMonitor() {
    const canvases = [
      document.createElement("canvas"),
      document.createElement("canvas"),
    ];
    const out = document.createElement("canvas");
    [canvases[0], canvases[1], out].forEach((canvas) => {
      canvas.width = MONITOR_W;
      canvas.height = MONITOR_H;
    });
    const ctxs = canvases.map((canvas) => canvas.getContext("2d"));
    const ctxOut = out.getContext("2d");

    const found = PROJECTS.findIndex((p) => p.key === DATA.deskProject);
    const index = found >= 0 ? found : 0;
    const current = PROJECTS[index] || MONITOR_FALLBACK;
    drawMonitorSlide(ctxs[0], current, index);
    ctxOut.drawImage(canvases[0], 0, 0);

    const texture = new THREE.CanvasTexture(out);
    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 8;

    return {
      texture,
      screen: null,
      canvases,
      ctxs,
      out,
      ctxOut,
      index,
      current,
      front: 0,
      from: 0,
      to: 0,
      t: 1,
      acc: 0,
      wipeAcc: 0,
    };
  }

  function advanceMonitor() {
    if (!monitor || PROJECTS.length < 2) return;
    const nextIndex = (monitor.index + 1) % PROJECTS.length;
    const nextSlot = 1 - monitor.front;
    drawMonitorSlide(monitor.ctxs[nextSlot], PROJECTS[nextIndex], nextIndex);
    monitor.from = monitor.front;
    monitor.to = nextSlot;
    monitor.t = 0;
    monitor.index = nextIndex;
    monitor.current = PROJECTS[nextIndex];
    monitor.acc = 0;
    if (monitor.screen && monitor.screen.userData.hotspot) {
      monitor.screen.userData.hotspot.label = monitor.current.name;
    }
    if (hoveredHotspot === monitor.screen) {
      tipLabel.textContent = monitor.current.name;
    }
  }

  function compositeMonitor(t) {
    if (!monitor) return;
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const edge = Math.round(eased * MONITOR_W);
    const { ctxOut, canvases, from, to } = monitor;
    ctxOut.clearRect(0, 0, MONITOR_W, MONITOR_H);
    ctxOut.drawImage(canvases[from], 0, 0);
    if (edge > 0) {
      ctxOut.save();
      ctxOut.beginPath();
      ctxOut.rect(0, 0, edge, MONITOR_H);
      ctxOut.clip();
      ctxOut.drawImage(canvases[to], 0, 0);
      ctxOut.restore();
      ctxOut.fillStyle = tint(monitor.current.color, 0.8);
      ctxOut.fillRect(Math.max(0, edge - 2), 0, 3, MONITOR_H);
    }
    monitor.texture.needsUpdate = true;
  }

  function tickMonitor(dt) {
    if (!monitor) return;
    const paused = reduceMotion || document.hidden || sheetOpen || listOpen;
    if (monitor.t < 1) {
      /* jangan tinggalkan layar setengah ter-wipe saat sheet/daftar dibuka */
      if (paused) {
        monitor.t = 1;
        monitor.front = monitor.to;
        compositeMonitor(1);
        return;
      }
      monitor.t = Math.min(1, monitor.t + dt / MONITOR_WIPE);
      monitor.wipeAcc += dt;
      if (monitor.t >= 1 || monitor.wipeAcc >= 1 / 30) {
        monitor.wipeAcc = 0;
        compositeMonitor(monitor.t);
      }
      if (monitor.t >= 1) monitor.front = monitor.to;
      return;
    }
    if (paused) return;
    monitor.acc += dt;
    if (monitor.acc >= MONITOR_INTERVAL) advanceMonitor();
  }

  /* ---------------- desk ---------------- */

  function buildDesk() {
    const top = box(3.5, 0.075, 1.05, mat.wood, 0, 0.95, -0.58);
    world.add(top);
    world.add(box(0.075, 0.92, 0.9, mat.woodDark, -1.62, 0.46, -0.6));
    world.add(box(0.075, 0.92, 0.9, mat.woodDark, 1.62, 0.46, -0.6));
    world.add(box(3.3, 0.06, 0.06, mat.woodDark, 0, 0.72, -1.0));
    world.add(box(3.3, 0.06, 0.06, mat.woodDark, 0, 0.72, -0.16));

    /* monitor */
    world.add(box(0.52, 0.024, 0.24, mat.metal, 0, 0.995, -0.84));
    world.add(box(0.06, 0.4, 0.06, mat.metal, 0, 1.19, -0.87));

    const frame = box(1.5, 0.9, 0.055, mat.screenFrame, 0, 1.55, -0.83);
    world.add(frame);

    monitor = makeMonitor();

    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.43, 0.83),
      new THREE.MeshStandardMaterial({
        map: monitor.texture,
        emissive: 0xffffff,
        emissiveMap: monitor.texture,
        emissiveIntensity: 0.95,
        roughness: 0.35,
        metalness: 0.05,
      })
    );
    screen.position.set(0, 1.55, -0.799);
    world.add(screen);
    monitor.screen = screen;
    hotspot(screen, {
      kind: "monitor",
      label: monitor.current ? monitor.current.name : "GraDiOl",
      station: 1,
    });

    /* keyboard */
    const keysTex = canvasTex(512, 160, (ctx, w, h) => {
      ctx.fillStyle = "#1b1917";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#2a2724";
      roundRect(ctx, 4, 4, w - 8, h - 8, 6);
      ctx.fill();
      const cols = 14;
      const rows = 4;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const kw = (w - 30) / cols;
          const kh = (h - 26) / rows;
          ctx.fillStyle = "#0f0e0d";
          roundRect(ctx, 15 + c * kw + 1.5, 13 + r * kh + 1.5, kw - 3, kh - 3, 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = "#f2b45c";
      ctx.fillRect(15 + 4 * ((w - 30) / cols), 13 + 3 * ((h - 26) / rows), 2, 2);
    });

    world.add(box(1.02, 0.022, 0.31, mat.black, -0.02, 0.998, -0.28));
    const keys = new THREE.Mesh(
      new THREE.PlaneGeometry(0.96, 0.27),
      new THREE.MeshStandardMaterial({ map: keysTex, roughness: 0.7 })
    );
    keys.rotation.x = -Math.PI / 2;
    keys.position.set(-0.02, 1.011, -0.28);
    world.add(keys);

    /* notebook + pen */
    const nb = box(0.34, 0.022, 0.25, mat.paper, -1.12, 0.999, -0.36);
    nb.rotation.y = 0.13;
    world.add(nb);
    const pen = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.007, 0.19, 8),
      mat.oxide
    );
    pen.rotation.z = Math.PI / 2;
    pen.rotation.y = 0.3;
    pen.position.set(-1.02, 1.02, -0.28);
    world.add(pen);

    /* mug */
    const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.062, 0.055, 0.11, 22, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xd9c8a8, roughness: 0.8, side: THREE.DoubleSide })
    );
    mug.position.set(1.06, 1.045, -0.33);
    mug.castShadow = true;
    world.add(mug);
    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.045, 0.011, 8, 18),
      new THREE.MeshStandardMaterial({ color: 0xd9c8a8, roughness: 0.8 })
    );
    handle.position.set(1.12, 1.045, -0.33);
    handle.rotation.y = Math.PI / 2;
    world.add(handle);

    /* lamp */
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.028, 24), mat.metal);
    base.position.set(1.38, 0.995, -0.78);
    base.castShadow = true;
    world.add(base);

    const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.36, 8), mat.metal);
    arm1.position.set(1.37, 1.17, -0.77);
    arm1.rotation.z = 0.12;
    arm1.rotation.x = 0.08;
    world.add(arm1);

    const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 8), mat.metal);
    arm2.position.set(1.3, 1.32, -0.72);
    arm2.rotation.z = 1.02;
    arm2.rotation.x = 0.22;
    world.add(arm2);

    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.105, 0.13, 24, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x2f2b25, roughness: 0.55, metalness: 0.4, side: THREE.DoubleSide })
    );
    shade.position.set(1.19, 1.39, -0.66);
    shade.rotation.z = 0.3;
    world.add(shade);

    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xffd9a0 })
    );
    bulb.position.set(1.19, 1.35, -0.66);
    world.add(bulb);

    const bulbGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xffb066, transparent: true, opacity: 0.16, depthWrite: false })
    );
    bulbGlow.position.copy(bulb.position);
    world.add(bulbGlow);
  }

  buildDesk();

  /* ---------------- shelf + books ---------------- */

  const bookGroups = [];

  function buildShelf() {
    const sx = -3.63;
    const z0 = -1.78;
    const z1 = 1.38;
    const depth = 0.32;

    world.add(box(0.02, 2.3, z1 - z0, mat.wallDark, -3.79, 1.66, (z0 + z1) / 2));

    for (const z of [z0, -0.2, z1]) {
      world.add(box(depth, 2.28, 0.045, mat.woodDark, sx, 1.65, z));
    }
    const shelfY = [0.56, 1.26, 1.96, 2.62];
    for (const y of shelfY) {
      world.add(box(depth, 0.04, z1 - z0, mat.wood, sx, y, (z0 + z1) / 2));
    }

    const spine = (project, index) => {
      const h = 0.37 + (index % 3) * 0.035;
      const w = 0.115 + (index % 2) * 0.022;

      const spineTex = canvasTex(128, 512, (ctx, cw, ch) => {
        ctx.fillStyle = project.color;
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(0, 0, 8, ch);
        ctx.fillRect(cw - 10, 0, 10, ch);
        ctx.fillStyle = "rgba(255,255,255,0.16)";
        ctx.fillRect(12, 0, 2, ch);

        ctx.save();
        ctx.translate(cw / 2 + 2, ch / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#12100c";
        ctx.font = "600 25px 'JetBrains Mono Variable', monospace";
        ctx.fillText(project.name.toUpperCase(), 0, 0, ch - 90);
        ctx.restore();

        ctx.fillStyle = "rgba(18,16,12,0.72)";
        ctx.font = "500 16px 'JetBrains Mono Variable', monospace";
        ctx.textAlign = "center";
        ctx.fillText(project.n, cw / 2, ch - 22);
        ctx.fillText(project.hash || project.date || "—", cw / 2, 30);
      });

      const group = new THREE.Group();
      const body = box(0.22, h, w, new THREE.MeshStandardMaterial({
        color: project.color,
        roughness: 0.78,
      }), 0, 0, 0);
      group.add(body);

      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.8 })
      );
      face.rotation.y = Math.PI / 2;
      face.position.x = 0.111;
      group.add(face);

      const data = { kind: "project", label: project.name, sheet: project.key };
      hotspot(face, data);
      hotspot(body, data);

      return { group, h, w };
    };

    const rowY = [1.26, 1.96, 2.62];
    const rows = [];
    for (let start = 0; start < PROJECTS.length; start += 5) {
      rows.push({
        y: rowY[Math.min(rows.length, rowY.length - 1)],
        items: Array.from(
          { length: Math.min(5, PROJECTS.length - start) },
          (_, offset) => start + offset
        ),
      });
    }

    rows.forEach((row) => {
      let z = z0 + 0.34;
      row.items.forEach((idx) => {
        const project = PROJECTS[idx];
        const b = spine(project, idx);
        const baseY = row.y + 0.02;
        b.group.position.set(-3.55, baseY + b.h / 2, z + b.w / 2);
        b.group.rotation.y = (Math.random() - 0.5) * 0.03;
        world.add(b.group);
        bookGroups.push({
          group: b.group,
          baseX: b.group.position.x,
          baseRot: b.group.rotation.y,
          index: idx,
        });
        z += b.w + 0.035;
      });
    });

    /* non-project books and objects so the shelf feels used */
    const fillerMat = (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.86 });
    const fillerBook = (y, z, h, w, color, tilt = 0) => {
      const m = box(0.2, h, w, fillerMat(color), -3.57, y + 0.02 + h / 2 - Math.abs(tilt) * 0.18, z + w / 2);
      m.rotation.x = tilt;
      world.add(m);
      return z + w + 0.03;
    };

    /* row 2, after the five project books */
    let fz = -0.6;
    fz = fillerBook(1.26, fz, 0.36, 0.1, 0x5d5346);
    fz = fillerBook(1.26, fz, 0.4, 0.13, 0x3f4a42);
    fz = fillerBook(1.26, fz, 0.33, 0.09, 0x7a5a44);
    fz = fillerBook(1.26, fz, 0.42, 0.12, 0x8a7a62);
    fz = fillerBook(1.26, fz, 0.35, 0.1, 0x4a3b2c, -0.11);
    for (let i = 0; i < 3; i++) {
      const sheet = box(0.22, 0.032, 0.3, i === 2 ? mat.paper : fillerMat(0x6b6153), -3.56, 1.3 + i * 0.034, 0.36);
      sheet.rotation.y = 0.04 * i;
      world.add(sheet);
    }
    world.add(box(0.22, 0.16, 0.3, fillerMat(0x51443a), -3.56, 1.36, 0.92));

    /* row 3 */
    fz = -0.58;
    fz = fillerBook(1.96, fz, 0.34, 0.09, 0x6b6153);
    fz = fillerBook(1.96, fz, 0.4, 0.12, 0x3f4a42);
    fz = fillerBook(1.96, fz, 0.37, 0.11, 0x8a7a62, 0.1);
    fz = fillerBook(1.96, fz, 0.31, 0.08, 0x5d5346);
    world.add(box(0.2, 0.18, 0.26, fillerMat(0x4a3b2c), -3.57, 2.07, 0.35));
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.13, 16), mat.oxide);
    pot.position.set(-3.57, 2.11, 0.72);
    pot.castShadow = true;
    world.add(pot);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x6f8b62, roughness: 0.9 });
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.26, 6), leafMat);
      leaf.position.set(-3.57 + Math.cos(i * 1.3) * 0.05, 2.29, 0.72 + Math.sin(i * 1.3) * 0.05);
      leaf.rotation.z = Math.cos(i * 1.3) * 0.35;
      leaf.rotation.x = Math.sin(i * 1.3) * 0.35;
      world.add(leaf);
    }

    /* bottom shelf */
    world.add(box(0.24, 0.3, 0.44, fillerMat(0x4a4038), -3.57, 0.73, -0.5));
    fz = 0.0;
    fz = fillerBook(0.56, fz, 0.38, 0.12, 0x3f4a42);
    fz = fillerBook(0.56, fz, 0.34, 0.1, 0x6b6153);
    fz = fillerBook(0.56, fz, 0.4, 0.13, 0x51443a, -0.09);
    fz = fillerBook(0.56, fz, 0.32, 0.09, 0x7a5a44);
    for (let i = 0; i < 4; i++) {
      world.add(box(0.22, 0.03, 0.28, i === 3 ? mat.oxide : mat.paper, -3.56, 0.59 + i * 0.032, 0.78));
    }

    /* top shelf */
    world.add(box(0.22, 0.14, 0.5, fillerMat(0x3f3a32), -3.57, 2.7, -0.95));
    fz = 0.05;
    fz = fillerBook(2.62, fz, 0.3, 0.09, 0x5d5346);
    fz = fillerBook(2.62, fz, 0.36, 0.11, 0x3f4a42);
    world.add(box(0.2, 0.05, 0.24, mat.oxide, -3.55, 2.65, 1.0));

    const shelfLight = new THREE.PointLight(0xffb877, 0.5, 3.4, 2);
    shelfLight.position.set(-3.05, 2.15, -0.2);
    scene.add(shelfLight);
  }

  buildShelf();

  /* ---------------- cabinet + poster ---------------- */

  function buildArchive() {
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2f2d28, roughness: 0.58, metalness: 0.25 });
    const cabinetBody = box(0.62, 1.58, 1.24, bodyMat, 3.5, 0.79, -0.95);
    world.add(cabinetBody);

    const drawerTex = canvasTex(512, 160, (ctx, w, h) => {
      ctx.fillStyle = "#34312b";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(0,0,0,0.4)";
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, w - 4, h - 4);
      ctx.fillStyle = "rgba(239,230,214,0.08)";
      ctx.fillRect(8, 8, w - 16, 2);
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(8, h - 10, w - 16, 2);
    });

    const drawerMat = new THREE.MeshStandardMaterial({ map: drawerTex, roughness: 0.62, metalness: 0.2 });
    const centers = [0.26, 0.63, 1.0, 1.37];
    centers.forEach((y) => {
      const front = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.3), drawerMat);
      front.rotation.y = -Math.PI / 2;
      front.position.set(3.185, y, -0.95);
      world.add(front);
      world.add(box(0.04, 0.035, 0.32, mat.metal, 3.16, y, -0.95));
    });

    const labelTex = canvasTex(512, 128, (ctx, w, h) => {
      ctx.fillStyle = "#d9c8a8";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#241d16";
      ctx.font = "600 34px 'JetBrains Mono Variable', monospace";
      ctx.fillText(ARCHIVE.label || "ARSIP", 26, 54);
      ctx.font = "400 22px 'JetBrains Mono Variable', monospace";
      ctx.fillText(`${ARCHIVE.years || ""} / ${String(DATA.repoOwner || "RENZIP").toUpperCase()}`, 26, 92);
      ctx.fillStyle = "#c05a3a";
      ctx.fillRect(w - 70, 26, 30, 76);
    });
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(0.62, 0.155),
      new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.85 })
    );
    label.rotation.y = -Math.PI / 2;
    label.position.set(3.178, 1.37, -1.28);
    world.add(label);

    hotspot(
      cabinetBody,
      { kind: "archive", label: COPY.archiveLabel || "Commit log", station: 3 }
    );

    /* paper stack on top */
    for (let i = 0; i < 4; i++) {
      const sheet = box(0.3, 0.008, 0.38, mat.paper, 3.48, 1.585 + i * 0.009, -0.62 + i * 0.006);
      sheet.rotation.y = (Math.random() - 0.5) * 0.12;
      world.add(sheet);
    }

    /* poster */
    const posterTex = canvasTex(512, 700, (ctx, w, h) => {
      ctx.fillStyle = "#12100c";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(239,230,214,0.18)";
      ctx.lineWidth = 2;
      ctx.strokeRect(22, 22, w - 44, h - 44);

      ctx.fillStyle = "#f2b45c";
      ctx.font = "500 150px 'Bricolage Grotesque Variable', sans-serif";
      ctx.fillText(String(ARCHIVE.count ?? 0).padStart(2, "0"), 40, 190);

      ctx.fillStyle = "#efe6d6";
      ctx.font = "500 44px 'Bricolage Grotesque Variable', sans-serif";
      ctx.fillText(ARCHIVE.commitsLabel || "COMMITS", 40, 250);

      ctx.fillStyle = "#948975";
      ctx.font = "400 18px 'JetBrains Mono Variable', monospace";
      ctx.fillText(`GITHUB.COM/${String(DATA.repoOwner || "RENZIP").toUpperCase()}`, 40, 292);

      const hashes = Array.isArray(ARCHIVE.hashes) ? ARCHIVE.hashes : [];
      hashes.forEach((hash, i) => {
        const y = 350 + i * 34;
        ctx.fillStyle = i === 0 ? "#8fd3b2" : "#6b6153";
        ctx.fillText(hash, 40, y);
        ctx.fillStyle = "rgba(239,230,214,0.12)";
        ctx.fillRect(150, y - 12, 320, 1);
      });

      ctx.fillStyle = "#c05a3a";
      ctx.fillRect(40, h - 78, 58, 4);
      ctx.fillStyle = "#948975";
      ctx.font = "400 15px 'JetBrains Mono Variable', monospace";
      ctx.fillText(`main / tag ${ARCHIVE.tag || "v1.0"}`, 40, h - 48);
    });

    const poster = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 1.23),
      new THREE.MeshStandardMaterial({ map: posterTex, roughness: 0.9 })
    );
    poster.rotation.y = -Math.PI / 2;
    poster.position.set(3.775, 2.46, -0.95);
    world.add(poster);

    hotspot(poster, { kind: "archive", label: COPY.archiveLabel || "Commit log", station: 3 });
  }

  buildArchive();

  /* ---------------- rug + floor lamp + dust ---------------- */

  function buildAtmosphere() {
    const rugTex = canvasTex(512, 360, (ctx, w, h) => {
      ctx.fillStyle = "#33241b";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(239,230,214,0.1)";
      ctx.lineWidth = 3;
      ctx.strokeRect(18, 18, w - 36, h - 36);
      ctx.strokeStyle = "rgba(192,90,58,0.22)";
      ctx.lineWidth = 6;
      ctx.strokeRect(40, 40, w - 80, h - 80);
      for (let i = 0; i < 16; i++) {
        ctx.strokeStyle = "rgba(0,0,0,0.16)";
        ctx.beginPath();
        ctx.moveTo(60, 60 + i * 15);
        ctx.lineTo(w - 60, 60 + i * 15);
        ctx.stroke();
      }
      speckle(ctx, w, h, 2200, 0.06);
    });
    const rug = new THREE.Mesh(
      new THREE.PlaneGeometry(3.7, 2.5),
      new THREE.MeshStandardMaterial({ map: rugTex, roughness: 1 })
    );
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.014, 0.92);
    rug.receiveShadow = true;
    world.add(rug);

    /* floor lamp in the corner */
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.72, 8), mat.metal);
    pole.position.set(-3.18, 0.87, 3.2);
    world.add(pole);
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.18, 0.03, 20), mat.metal);
    foot.position.set(-3.18, 0.015, 3.2);
    world.add(foot);
    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.24, 0.3, 24, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xd9c8a8, roughness: 0.9, side: THREE.DoubleSide, emissive: 0xf2b45c, emissiveIntensity: 0.18 })
    );
    shade.position.set(-3.18, 1.76, 3.2);
    world.add(shade);
    const floorGlow = new THREE.PointLight(0xffb877, 0.55, 5, 2);
    floorGlow.position.set(-3.05, 1.68, 3.05);
    scene.add(floorGlow);

    /* pendant above the desk */
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.8, 6), mat.black);
    cable.position.set(0, 3.0, 0.85);
    world.add(cable);

    const pendant = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 0.28, 32, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x24211c, roughness: 0.62, metalness: 0.32, side: THREE.DoubleSide })
    );
    pendant.position.set(0, 2.6, 0.85);
    world.add(pendant);

    const innerDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.29, 32),
      new THREE.MeshBasicMaterial({ color: 0xffcf94, side: THREE.DoubleSide })
    );
    innerDisc.rotation.x = Math.PI / 2;
    innerDisc.position.set(0, 2.47, 0.85);
    world.add(innerDisc);

    const pendantLight = new THREE.PointLight(0xffc48a, 0.4, 5, 2);
    pendantLight.position.set(0, 2.44, 0.85);
    scene.add(pendantLight);

    /* dust */
    const count = 280;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = -3.5 + Math.random() * 7;
      positions[i * 3 + 1] = 0.35 + Math.random() * 2.8;
      positions[i * 3 + 2] = -3.4 + Math.random() * 7.8;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dust = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xffd7a2,
        size: 0.014,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      })
    );
    dust.userData.seeds = seeds;
    world.add(dust);
    return dust;
  }

  const dust = buildAtmosphere();

  /* ---------------- camera path ---------------- */

  const KEYS = [
    { pos: new THREE.Vector3(0, 1.74, 6.05), tgt: new THREE.Vector3(0, 1.42, -0.5), fov: 42 },
    { pos: new THREE.Vector3(0.18, 1.68, 1.92), tgt: new THREE.Vector3(0, 1.5, -0.78), fov: 40 },
    { pos: new THREE.Vector3(-0.55, 1.82, 1.5), tgt: new THREE.Vector3(-3.4, 1.82, -0.55), fov: 46 },
    { pos: new THREE.Vector3(1.0, 1.55, 1.65), tgt: new THREE.Vector3(3.4, 1.6, -0.95), fov: 46 },
    { pos: new THREE.Vector3(1.12, 1.94, -1.18), tgt: new THREE.Vector3(1.64, 2.03, -3.99), fov: 46 },
  ];

  const posCurve = new THREE.CatmullRomCurve3(
    KEYS.map((k) => k.pos),
    false,
    "centripetal",
    0.5
  );
  const tgtCurve = new THREE.CatmullRomCurve3(
    KEYS.map((k) => k.tgt),
    false,
    "centripetal",
    0.5
  );

  const isPortrait = () => window.innerWidth < 860;

  let lastFov = 0;

  function applyFov() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = isPortrait() ? 56 : KEYS[0].fov;
    camera.updateProjectionMatrix();
    lastFov = camera.fov;
  }
  applyFov();

  function updateFov(p) {
    if (isPortrait()) {
      if (lastFov !== 56) {
        camera.fov = 56;
        camera.updateProjectionMatrix();
        lastFov = 56;
      }
      return;
    }
    const last = Math.min(KEYS.length - 1, Math.max(0, STATION_COUNT - 1));
    const f = clamp(p, 0, 1) * last;
    const i0 = Math.floor(f);
    const i1 = Math.min(last, i0 + 1);
    const t = f - i0;
    const fov = lerp(KEYS[i0].fov, KEYS[i1].fov, t);
    if (Math.abs(fov - lastFov) > 0.02) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
      lastFov = fov;
    }
  }

  const track = $("#track");
  const docEl = document.documentElement;

  let rawP = 0;
  let smoothP = 0;
  let station = -1;
  let activeCopy = -1;
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };

  function readScroll() {
    const max = docEl.scrollHeight - window.innerHeight;
    rawP = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
  }

  /* ---------------- ui refs ---------------- */

  const copyEls = $$(".copy-inner");
  const railBtns = $$(".rail button");
  const scrim = $("#scrim");
  const camIndex = $("#cam-index");
  const camLabel = $("#cam-label");
  const camBar = $("#cam-bar");
  const mLabel = $("#m-label");
  const mCount = $("#m-count");
  const mTrack = $$("#m-track i");
  const tip = $("#tip");
  const tipKind = $("#tip-kind");
  const tipLabel = $("#tip-label");
  const sheet = $("#sheet");
  const sheetTag = $("#sheet-tag");
  const sheetTitle = $("#sheet-title");
  const sheetYear = $("#sheet-year");
  const sheetDesc = $("#sheet-desc");
  const sheetFacts = $("#sheet-facts");
  const sheetLink = $("#sheet-link");
  const sheetClose = $("#sheet-close");
  const list = $("#daftar");
  const listOpenBtn = $("#open-list");
  const listCloseBtn = $("#close-list");

  let sheetOpen = false;
  let listOpen = false;
  let lastFocus = null;

  function setStation(next) {
    if (next === station) return;
    station = next;
    const meta = STATIONS[next] || { label: "", cam: "" };
    camIndex.textContent = String(next + 1).padStart(2, "0");
    camLabel.textContent = meta.cam;
    mLabel.textContent = `${String(next + 1).padStart(2, "0")} — ${meta.label}`;
    mCount.textContent = `${String(next + 1).padStart(2, "0")} / ${String(STATION_COUNT).padStart(2, "0")}`;
    railBtns.forEach((b, i) => b.setAttribute("aria-current", i === next ? "true" : "false"));
    mTrack.forEach((el, i) => el.classList.toggle("on", i <= next));
    if (activeCopy !== next) {
      activeCopy = next;
      copyEls.forEach((el) => el.classList.toggle("is-active", Number(el.dataset.copy) === next));
    }
    scrim.classList.toggle("is-on", true);
  }

  function goTo(index) {
    const last = Math.max(0, STATION_COUNT - 1);
    const max = docEl.scrollHeight - window.innerHeight;
    const top = last > 0 ? (clamp(index, 0, last) / last) * max : 0;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }

  railBtns.forEach((b) => {
    b.addEventListener("click", () => goTo(Number(b.dataset.goto)));
  });
  $$("[data-goto]").forEach((el) => {
    if (el.tagName === "A") {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        goTo(Number(el.dataset.goto));
      });
    }
  });

  /* ---------------- sheet ---------------- */

  function openSheet(key) {
    const p = PROJECTS.find((x) => x.key === key);
    if (!p) return;
    lastFocus = document.activeElement;
    tip.classList.remove("is-on");
    if (renderer && renderer.domElement) renderer.domElement.style.cursor = "";
    hoveredBook = null;
    sheetTag.textContent = `${COPY.sheetTag || "Project"} / ${p.n}`;
    sheetTitle.textContent = p.title || p.name;
    sheetYear.textContent =
      [p.date, p.hash ? `${COPY.commit || "Commit"} ${p.hash}` : null]
        .filter(Boolean)
        .join(" · ") || COPY.pending || "";
    sheetDesc.textContent = p.summary || "";
    sheetFacts.innerHTML = "";

    const rows = [[COPY.stack || "Stack", p.stack]];
    if (p.status) rows.push([COPY.status || "Status", p.status]);
    rows.forEach(([k, v]) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = k;
      dd.textContent = v;
      row.append(dt, dd);
      sheetFacts.append(row);
    });

    if (p.hash && p.source) {
      const commitRow = document.createElement("div");
      const cdt = document.createElement("dt");
      const cdd = document.createElement("dd");
      cdt.textContent = COPY.commit || "Commit";
      const code = document.createElement("code");
      code.textContent = p.hash;
      cdd.append(code, document.createTextNode(` · ${p.source}`));
      commitRow.append(cdt, cdd);
      sheetFacts.append(commitRow);
    }

    if (p.href) {
      sheetLink.href = p.href;
      sheetLink.hidden = false;
    } else {
      sheetLink.hidden = true;
    }

    const sheetRepo = $("#sheet-repo");
    if (sheetRepo) {
      if (p.repoHref) {
        sheetRepo.href = p.repoHref;
        sheetRepo.hidden = false;
      } else {
        sheetRepo.hidden = true;
      }
    }

    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    sheetOpen = true;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => sheet.focus({ preventScroll: true }), 60);
  }

  function closeSheet() {
    if (!sheetOpen) return;
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    sheetOpen = false;
    if (!listOpen) document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  sheetClose.addEventListener("click", closeSheet);
  $$("[data-project]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openSheet(el.dataset.project);
    });
  });

  /* ---------------- list mode ---------------- */

  function openList() {
    if (listOpen) return;
    lastFocus = document.activeElement;
    tip.classList.remove("is-on");
    if (renderer && renderer.domElement) renderer.domElement.style.cursor = "";
    hoveredBook = null;
    list.classList.add("is-open");
    list.setAttribute("aria-hidden", "false");
    listOpen = true;
    document.body.style.overflow = "hidden";
    list.scrollTop = 0;
    window.setTimeout(() => list.focus({ preventScroll: true }), 60);
  }

  function closeList() {
    if (!listOpen) return;
    list.classList.remove("is-open");
    list.setAttribute("aria-hidden", "true");
    listOpen = false;
    if (!sheetOpen) document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  listOpenBtn.addEventListener("click", openList);
  listCloseBtn.addEventListener("click", closeList);
  $("#skip-list")?.addEventListener("click", (e) => {
    e.preventDefault();
    openList();
  });

  if (window.location.hash === "#daftar") openList();

  /* ---------------- pointer ---------------- */

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-2, -2);
  let hoveredBook = null;
  let hoveredHotspot = null;
  let pointerX = 0;
  let pointerY = 0;
  let hasPointer = false;

  function pick(clientX, clientY) {
    const r = renderer.domElement.getBoundingClientRect();
    pointer.x = ((clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((clientY - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(hotspots, false);
    return hits.length ? hits[0].object : null;
  }

  function setHover(obj) {
    if (!obj) {
      tip.classList.remove("is-on");
      renderer.domElement.style.cursor = "";
      hoveredBook = null;
      hoveredHotspot = null;
      return;
    }
    hoveredHotspot = obj;
    const data = obj.userData.hotspot;
    tipKind.textContent = kindLabel(data.kind);
    tipLabel.textContent = data.label;
    tip.classList.add("is-on");
    renderer.domElement.style.cursor = "pointer";
    hoveredBook = obj.parent && obj.parent.userData ? null : null;
    if (obj.parent && bookGroups.some((b) => b.group === obj.parent)) {
      hoveredBook = obj.parent;
    }
  }

  window.addEventListener("pointermove", (e) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
    hasPointer = true;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    if (listOpen || sheetOpen) return;
    setHover(pick(e.clientX, e.clientY));
    const pad = 14;
    const w = tip.offsetWidth;
    const x = e.clientX + pad + w > window.innerWidth ? e.clientX - w - pad : e.clientX + pad;
    tip.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(e.clientY + 18)}px, 0)`;
  });

  renderer.domElement.addEventListener("pointerleave", () => {
    tip.classList.remove("is-on");
    renderer.domElement.style.cursor = "";
    hoveredBook = null;
  });

  renderer.domElement.addEventListener("click", (e) => {
    if (listOpen || sheetOpen) return;
    const obj = pick(e.clientX, e.clientY);
    if (!obj) return;
    const data = obj.userData.hotspot;
    if (data.sheet) {
      openSheet(data.sheet);
      return;
    }
    if (typeof data.station === "number") {
      if (station === data.station) {
        if (data.station === 1) {
          const key = monitor && monitor.current ? monitor.current.key : DATA.deskProject;
          openSheet(key || "gradi-ol");
        }
        if (data.station === 3) goTo(3);
        if (data.station === 4 && DATA.contactEmail) {
          window.location.href = `mailto:${DATA.contactEmail}`;
        }
      } else {
        goTo(data.station);
      }
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (sheetOpen) {
        closeSheet();
        return;
      }
      if (listOpen) closeList();
      return;
    }
    const target = e.target;
    const typing =
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
    if (
      (e.key === "l" || e.key === "L") &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !typing &&
      !sheetOpen &&
      !listOpen
    ) {
      openList();
      return;
    }
    if ((sheetOpen || listOpen) && e.key === "Tab") {
      const container = sheetOpen ? sheet : list;
      const f = $$('a[href], button, [tabindex]:not([tabindex="-1"])', container).filter(
        (el) => el.offsetParent !== null
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === container)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------------- loop ---------------- */

  let last = performance.now();
  let elapsed = 0;
  let frames = 0;

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    elapsed += dt;
    frames++;

    readScroll();
    const follow = reduceMotion ? 1 : 1 - Math.exp(-dt * 5.4);
    smoothP = lerp(smoothP, rawP, follow);
    if (Math.abs(smoothP - rawP) < 0.0002) smoothP = rawP;

    const lastStation = Math.max(0, STATION_COUNT - 1);
    const nextStation = clamp(Math.round(smoothP * lastStation), 0, lastStation);
    setStation(nextStation);
    updateFov(smoothP);

    const pos = posCurve.getPoint(smoothP);
    const tgt = tgtCurve.getPoint(smoothP);

    const pm = reduceMotion ? 0 : 1 - Math.exp(-dt * 2.6);
    mouse.sx = lerp(mouse.sx, mouse.x, pm);
    mouse.sy = lerp(mouse.sy, mouse.y, pm);

    const par = reduceMotion ? 0 : 0.12;
    pos.x += mouse.sx * par;
    pos.y += -mouse.sy * par * 0.7;
    tgt.x += mouse.sx * par * 1.7;
    tgt.y += -mouse.sy * par * 1.2;

    if (!reduceMotion) {
      pos.y += Math.sin(elapsed * 0.55) * 0.006;
      pos.x += Math.cos(elapsed * 0.37) * 0.004;
    }

    if (isPortrait()) {
      /* di stasiun meja, menjauh dan naik sedikit supaya monitor utuh
         dan copy di bawahnya tidak menabrak layar */
      const deskPull = clamp(
        1 - Math.abs(smoothP - 1 / Math.max(1, lastStation)) * Math.max(1, lastStation),
        0,
        1
      );
      tgt.y -= 0.45 + deskPull * 0.18;
      pos.y -= 0.06;
      pos.z += deskPull * 0.6;
    }

    camera.position.copy(pos);
    camera.lookAt(tgt);

    if (camBar) camBar.style.width = `${Math.round(smoothP * 100)}%`;

    /* books lean out when hovered */
    bookGroups.forEach((b) => {
      const want = hoveredBook === b.group ? 0.055 : 0;
      b.group.position.x = lerp(b.group.position.x, b.baseX + want, reduceMotion ? 1 : 1 - Math.exp(-dt * 9));
    });

    tickMonitor(dt);

    /* dust drift */
    if (!reduceMotion && frames % 2 === 0) {
      const arr = dust.geometry.attributes.position.array;
      const seeds = dust.userData.seeds;
      for (let i = 0; i < seeds.length; i++) {
        arr[i * 3 + 1] += Math.sin(elapsed * 0.35 + seeds[i]) * 0.0006;
        arr[i * 3] += Math.cos(elapsed * 0.22 + seeds[i]) * 0.0004;
        if (arr[i * 3 + 1] > 3.25) arr[i * 3 + 1] = 0.3;
      }
      dust.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);

    if (frames === 2) {
      document.body.classList.add("is-ready");
      if (bootPct) bootPct.textContent = "100%";
    }

    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    applyFov();
    readScroll();
  });

  readScroll();
  smoothP = rawP;
  requestAnimationFrame(frame);
  } catch (err) {
    console.error("Ruang gagal dimuat:", err);
    showFallback();
  }
})();



