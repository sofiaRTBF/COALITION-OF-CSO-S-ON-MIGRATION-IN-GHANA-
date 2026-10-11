/* =============================================================
   MEMBER MAP (home page)
   precision:
     "address" = street address known, pin on / near it
     "city"    = town / city verified, pin placed in that town
     "unverified" = no public address found (placeholder in Accra)
   To fix a pin: find the office on Google Maps, right-click it,
   copy the coordinates into lat / lng, and change precision.
   ============================================================= */
(function () {
  if (!document.getElementById("map") || !window.L) return;

  var ACCRA = [5.6037, -0.1870];
  var orgs = [
    { name: "Right To Be Free (RTBF)", city: "Osu, Accra", region: "Greater Accra", lat: 5.5585, lng: -0.1800, precision: "address", address: "Ogbamey Street, Osu, Accra", url: "https://righttobefree.org" },
    { name: "Media Response", city: "Bubiashie, Accra", region: "Greater Accra", lat: 5.5770, lng: -0.2270, precision: "address", address: "30 Nii Ashie Street, Bubiashie, Accra", url: "https://www.mediaresponsegh.com" },
    { name: "International Child Development Program (ICDP Ghana)", city: "Tema", region: "Greater Accra", lat: 5.6698, lng: -0.0166, precision: "city", url: "https://icdpghana.org" },
    { name: "Purim African Youth Development Platform (PAYDP)", city: "Accra", region: "Greater Accra", precision: "city", url: "https://paydpghana.org" },
    { name: "SEWA Foundation Ghana", city: "Otinibi, Accra", region: "Greater Accra", lat: 5.7925, lng: -0.1489, precision: "address", address: "Jones Owusu Yeboah Avenue, Otinibi Road, Accra" },
    { name: "Challenging Heights", city: "Winneba", region: "Central", lat: 5.3510, lng: -0.6230, precision: "city", url: "https://challengingheights.org" },
    { name: "Migration Advocacy Center (MAC)", city: "Kutunse, Accra–Nsawam Road", region: "Greater Accra", lat: 5.7150, lng: -0.2830, precision: "address", address: "Hse No. KJ9 Koans Estates, Kutunse, Accra–Nsawam Road, Taifa", url: "https://migrationadvocenter.org" },
    { name: "Migration & Rights Lab", city: "Techiman", region: "Bono East", lat: 7.5864, lng: -1.9398, precision: "city", url: "https://migrationrightslab.org" },
    { name: "Research and Counselling Foundation for African Migrants (RECFAM)", city: "Accra", region: "Greater Accra", precision: "city", note: "Also active in Enchi (Western North) and Jomoro and Amenfi Central (Western)." },
    { name: "RECFAM – Enchi (field presence)", city: "Enchi", region: "Western North", lat: 5.8210, lng: -2.8220, precision: "city", note: "RECFAM's main office is in Accra." },
    { name: "Human Rights Advocacy Centre (HRAC)", city: "Accra", region: "Greater Accra", precision: "city", url: "https://hracghana.org" },
    { name: "ATUMNET / TUC Ghana", city: "Hall of Trade Unions, Accra", region: "Greater Accra", lat: 5.5510, lng: -0.2060, precision: "city", address: "Hall of Trade Unions, Accra", url: "https://www.ghanatuc.org" },
    { name: "Migrants Watch Ghana", city: "Nungua", region: "Greater Accra", lat: 5.6010, lng: -0.0770, precision: "city" },
    { name: "Assemblies of God Care (A-G CARE)", city: "Accra", region: "Greater Accra", precision: "city" },
    { name: "Caritas Ghana", city: "Accra", region: "Greater Accra", precision: "city", url: "https://caritasghana.org" },
    { name: "Scholars in Transit", city: "Techiman", region: "Bono East", lat: 7.5800, lng: -1.9320, precision: "city" },
    { name: "BOK Africa Concern", city: "Berekum", region: "Bono", lat: 7.4534, lng: -2.5840, precision: "city", url: "https://bokafrica.org" },
    { name: "Engage Now Africa – Ghana", city: "Accra", region: "Greater Accra", precision: "city" },
    { name: "Africa Development Organization for Migration (AFDOM)", city: "Tamale", region: "Northern", lat: 9.4008, lng: -0.8393, precision: "city" },
    { name: "Renel Ghana Foundation", city: "Lily St, Accra", region: "Greater Accra", lat: 5.63431, lng: -0.15217, precision: "address", address: "JRMX+P4G, Lily St, Accra", url: "https://www.renelgh.org" },
    { name: "Transformative Impact Network (TIN Ghana)", city: "Tamale", region: "Northern", lat: 9.4075, lng: -0.8480, precision: "city" },
    { name: "International Needs Ghana", city: "Accra", region: "Greater Accra", precision: "city", url: "https://internationalneedsgh.org" },
    { name: "Nigerians in Diaspora Organisation (NIDO) Ghana", city: "Accra", region: "Greater Accra", precision: "city" },
    { name: "Sierra Leonean Youth Organization in Ghana", city: "Accra", region: "Greater Accra", precision: "city" },
    { name: "Association of Liberian Community in Ghana", city: "Buduburam (Gomoa East)", region: "Central", lat: 5.5170, lng: -0.4880, precision: "city" },
    { name: "Welfare of Children and Youth Association (WCYA)", city: "Accra", region: "Greater Accra", precision: "city" },
    { name: "International Migration Policy Recruitment & Advisory Centre (IMPRAC)", city: "Accra", region: "Greater Accra", precision: "city", address: "JZ 20 Obonu St (GA-307-3272)", url: "https://www.imprac.org" },
    { name: "VIS – Volontariato Internazionale per lo Sviluppo", city: "Sunyani (Odumase)", region: "Bono", lat: 7.3700, lng: -2.3300, precision: "city", note: "Other Ghana offices: Ashaiman (Greater Accra) and Sanzule (Western).", url: "https://www.volint.it" },
    { name: "Youth Advocates Ghana (YAG)", city: "Nsawam", region: "Eastern", lat: 5.8065, lng: -0.3535, precision: "address", address: "Odei Yaw Street, off Nsawam Government Hospital Road, Nsawam" },
    { name: "Challenges Group Ghana", city: "East Legon, Accra", region: "Greater Accra", lat: 5.6370, lng: -0.1600, precision: "address", address: "26 Nii Sai Wulu Road, East Legon, Accra (GA-483-3213)", url: "https://www.thechallengesgroup.com/challenges-ghana" },
    { name: "Catholic Relief Services (CRS) Ghana", city: "Accra", region: "Greater Accra", precision: "city", url: "https://www.crs.org" }
  ];

  var COLORS = { address: "#006B3F", city: "#CE1126", unverified: "#B8930A" };
  var LABELS = { address: "Street address", city: "Town / city", unverified: "Needs checking" };

  // Organisations without their own coordinates are spread in a small ring around Accra.
  var ring = 0;
  orgs.forEach(function (o) {
    if (o.lat == null) {
      var a = ring * 2.4, r = 0.012 + 0.004 * Math.floor(ring / 6);
      o.lat = ACCRA[0] + r * Math.sin(a); o.lng = ACCRA[1] + r * Math.cos(a); o.approx = true; ring++;
    }
  });

  var map = L.map("map", { scrollWheelZoom: false }).setView([7.9, -1.0], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
  map.setMaxBounds([[3.5, -4.5], [12, 2.5]]);
  var cluster = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 45 });
  map.addLayer(cluster);

  function pin(c) {
    return L.divIcon({ className: "", iconSize: [26, 36], iconAnchor: [13, 36], popupAnchor: [0, -32],
      html: '<svg width="26" height="36" viewBox="0 0 26 36"><path d="M13 0C5.8 0 0 5.8 0 13c0 9.5 13 23 13 23s13-13.5 13-23C26 5.8 20.2 0 13 0z" fill="' + c + '"/><circle cx="13" cy="13" r="5" fill="#fff"/></svg>' });
  }
  function popup(o) {
    return '<div class="popup"><h4>' + o.name + "</h4><p><strong>" + o.city + "</strong> · " + o.region + " Region</p>" +
      (o.address ? "<p>" + o.address + "</p>" : "") + (o.note ? "<p><em>" + o.note + "</em></p>" : "") +
      (o.approx ? "<p><em>Pin shows the city, not the exact office.</em></p>" : "") +
      (o.url ? '<p><a href="' + o.url + '" target="_blank" rel="noopener">Website ↗</a></p>' : "") +
      '<span class="tag" style="background:' + COLORS[o.precision] + '">' + LABELS[o.precision] + "</span></div>";
  }
  orgs.forEach(function (o) { o.marker = L.marker([o.lat, o.lng], { icon: pin(COLORS[o.precision]), title: o.name }).bindPopup(popup(o)); });

  var listEl = document.getElementById("org-list"), searchEl = document.getElementById("org-search"),
      countEl = document.getElementById("org-count"), legendEl = document.getElementById("legend");
  var active = { address: true, city: true, unverified: true };

  Object.keys(LABELS).forEach(function (k) {
    if (!orgs.some(function (o) { return o.precision === k; })) return; // hide empty categories
    var b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-pressed", "true");
    b.innerHTML = '<span class="dot" style="background:' + COLORS[k] + '"></span>' + LABELS[k];
    b.onclick = function () { active[k] = !active[k]; b.setAttribute("aria-pressed", active[k]); render(); };
    legendEl.appendChild(b);
  });

  function render() {
    var q = searchEl.value.trim().toLowerCase();
    var vis = orgs.filter(function (o) { return active[o.precision] && (!q || (o.name + " " + o.city + " " + o.region).toLowerCase().indexOf(q) > -1); })
                  .sort(function (a, b) { return a.name.localeCompare(b.name); });
    cluster.clearLayers();
    vis.forEach(function (o) { cluster.addLayer(o.marker); });
    listEl.innerHTML = "";
    vis.forEach(function (o) {
      var li = document.createElement("li");
      li.tabIndex = 0;
      li.innerHTML = '<span class="dot" style="background:' + COLORS[o.precision] + '"></span><div><div class="name">' + o.name + '</div><div class="place">' + o.city + " · " + o.region + "</div></div>";
      li.onclick = li.onkeydown = function (e) {
        if (e.type === "keydown" && e.key !== "Enter") return;
        listEl.querySelectorAll("li").forEach(function (x) { x.classList.remove("active"); });
        li.classList.add("active");
        cluster.zoomToShowLayer(o.marker, function () { o.marker.openPopup(); });
      };
      listEl.appendChild(li);
    });
    countEl.textContent = "Showing " + vis.length + " of " + orgs.length + " organisations";
  }
  searchEl.addEventListener("input", render);
  render();
})();
