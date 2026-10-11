/* CCMG site – menu, forms, member profiles */
(function () {
  "use strict";
  var cfg = window.CCMG_CONFIG || {};

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Forms (Formspree, or email fallback) ---------- */
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var key = form.getAttribute("data-form");              // contact | collaborate | newsletter
      var id = cfg["FORMSPREE_" + key.toUpperCase()];
      var data = new FormData(form);

      if (!id) {
        // No Formspree ID yet: open the visitor's email app instead.
        var lines = [];
        data.forEach(function (v, k) { if (v) lines.push(k + ": " + v); });
        var subject = encodeURIComponent(form.getAttribute("data-subject") || "Message from the CCMG website");
        window.location.href = "mailto:" + cfg.CONTACT_EMAIL + "?subject=" + subject + "&body=" + encodeURIComponent(lines.join("\n"));
        if (status) { status.className = "form-status ok"; status.textContent = "Your email app should open with your message ready to send."; }
        return;
      }

      if (status) { status.className = "form-status"; status.textContent = "Sending…"; }
      fetch("https://formspree.io/f/" + id, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          if (status) { status.className = "form-status ok"; status.textContent = "Thank you! Your message has been sent."; }
        })
        .catch(function () {
          if (status) { status.className = "form-status err"; status.textContent = "Sorry, something went wrong. Please email us at " + cfg.CONTACT_EMAIL + "."; }
        });
    });
  });

  /* ---------- Member profiles (Our Members page) ---------- */
  var grid = document.getElementById("profiles");
  var dlg = document.getElementById("profile-dialog");
  if (grid && dlg && window.CCMG_MEMBERS) {
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var initials = function (n) { return n.replace(/^(Dr\.?|Mr\.?|Ms\.?)\s+/i, "").split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join(""); };

    window.CCMG_MEMBERS.forEach(function (m, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "profile";
      b.innerHTML =
        '<div class="profile__logo"><img src="' + m.logo + '" alt="' + esc(m.name) + ' logo" loading="lazy"></div>' +
        '<div class="profile__name">' + esc(m.name) + "</div>" +
        '<div class="profile__meta">Est. ' + esc(m.founded) + " · " + esc(m.base) + "</div>" +
        '<p class="profile__summary">' + esc(m.summary) + "</p>" +
        '<span class="profile__more">Read profile →</span>';
      b.addEventListener("click", function () { openProfile(i); });
      grid.appendChild(b);
    });

    function openProfile(i) {
      var m = window.CCMG_MEMBERS[i];
      var photo = m.directorPhoto
        ? '<img src="' + m.directorPhoto + '" alt="' + esc(m.director) + '">'
        : '<span class="initials">' + esc(initials(m.director)) + "</span>";
      dlg.innerHTML =
        '<div class="pd__top">' +
          '<div class="pd__logo"><img src="' + m.logo + '" alt=""></div>' +
          '<div><h3 id="pd-title">' + esc(m.name) + '</h3><div class="profile__meta">Est. ' + esc(m.founded) + " · " + esc(m.base) + "</div></div>" +
          '<button class="pd__close" type="button" aria-label="Close">×</button>' +
        "</div>" +
        '<div class="pd__body">' +
          "<div><h4>Who they are</h4><p>" + esc(m.about) + "</p></div>" +
          '<div class="director">' + photo + "<div><strong>" + esc(m.director) + "</strong><p>" + esc(m.directorBio) + "</p></div></div>" +
          '<div class="achieve"><h4>Main achievements</h4><p>' + esc(m.achievements) + "</p></div>" +
        "</div>";
      dlg.setAttribute("aria-labelledby", "pd-title");
      dlg.querySelector(".pd__close").addEventListener("click", function () { dlg.close(); });
      dlg.showModal();
    }
    // click on the dark backdrop closes the popup
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }
})();
