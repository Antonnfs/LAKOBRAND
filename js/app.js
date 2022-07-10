/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      2: function (e, t, s) {
        var n, i;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (e) {
            var t,
              s = (this.document || this.ownerDocument).querySelectorAll(e),
              n = this;
            do {
              for (t = s.length; 0 <= --t && s.item(t) !== n; );
            } while (t < 0 && (n = n.parentElement));
            return n;
          }),
          (function () {
            function e(e, t) {
              t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
              var s = document.createEvent("CustomEvent");
              return s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s;
            }
            "function" != typeof window.CustomEvent &&
              ((e.prototype = window.Event.prototype),
              (window.CustomEvent = e));
          })(),
          (function () {
            for (
              var e = 0, t = ["ms", "moz", "webkit", "o"], s = 0;
              s < t.length && !window.requestAnimationFrame;
              ++s
            )
              (window.requestAnimationFrame =
                window[t[s] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[t[s] + "CancelAnimationFrame"] ||
                  window[t[s] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (t, s) {
                var n = new Date().getTime(),
                  i = Math.max(0, 16 - (n - e)),
                  a = window.setTimeout(function () {
                    t(n + i);
                  }, i);
                return (e = n + i), a;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (e) {
                  clearTimeout(e);
                });
          })(),
          (i =
            void 0 !== s.g
              ? s.g
              : "undefined" != typeof window
              ? window
              : this),
          (n = function () {
            return (function (e) {
              "use strict";
              var t = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                s = function () {
                  var e = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (t) {
                      for (var s in t) {
                        if (!t.hasOwnProperty(s)) return;
                        e[s] = t[s];
                      }
                    }),
                    e
                  );
                },
                n = function (e) {
                  "#" === e.charAt(0) && (e = e.substr(1));
                  for (
                    var t,
                      s = String(e),
                      n = s.length,
                      i = -1,
                      a = "",
                      r = s.charCodeAt(0);
                    ++i < n;

                  ) {
                    if (0 === (t = s.charCodeAt(i)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    a +=
                      (1 <= t && t <= 31) ||
                      127 == t ||
                      (0 === i && 48 <= t && t <= 57) ||
                      (1 === i && 48 <= t && t <= 57 && 45 === r)
                        ? "\\" + t.toString(16) + " "
                        : 128 <= t ||
                          45 === t ||
                          95 === t ||
                          (48 <= t && t <= 57) ||
                          (65 <= t && t <= 90) ||
                          (97 <= t && t <= 122)
                        ? s.charAt(i)
                        : "\\" + s.charAt(i);
                  }
                  return "#" + a;
                },
                i = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                a = function (t) {
                  return t
                    ? ((s = t),
                      parseInt(e.getComputedStyle(s).height, 10) + t.offsetTop)
                    : 0;
                  var s;
                },
                r = function (t, s, n) {
                  0 === t && document.body.focus(),
                    n ||
                      (t.focus(),
                      document.activeElement !== t &&
                        (t.setAttribute("tabindex", "-1"),
                        t.focus(),
                        (t.style.outline = "none")),
                      e.scrollTo(0, s));
                },
                o = function (t, s, n, i) {
                  if (s.emitEvents && "function" == typeof e.CustomEvent) {
                    var a = new CustomEvent(t, {
                      bubbles: !0,
                      detail: { anchor: n, toggle: i },
                    });
                    document.dispatchEvent(a);
                  }
                };
              return function (l, c) {
                var d,
                  u,
                  p,
                  h,
                  m = {
                    cancelScroll: function (e) {
                      cancelAnimationFrame(h),
                        (h = null),
                        e || o("scrollCancel", d);
                    },
                    animateScroll: function (n, l, c) {
                      m.cancelScroll();
                      var u = s(d || t, c || {}),
                        f =
                          "[object Number]" ===
                          Object.prototype.toString.call(n),
                        g = f || !n.tagName ? null : n;
                      if (f || g) {
                        var v = e.pageYOffset;
                        u.header &&
                          !p &&
                          (p = document.querySelector(u.header));
                        var y,
                          b,
                          w,
                          S,
                          E,
                          C,
                          T,
                          x,
                          L = a(p),
                          _ = f
                            ? n
                            : (function (t, s, n, a) {
                                var r = 0;
                                if (t.offsetParent)
                                  for (
                                    ;
                                    (r += t.offsetTop), (t = t.offsetParent);

                                  );
                                return (
                                  (r = Math.max(r - s - n, 0)),
                                  a && (r = Math.min(r, i() - e.innerHeight)),
                                  r
                                );
                              })(
                                g,
                                L,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(n, l)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          O = _ - v,
                          k = i(),
                          M = 0,
                          $ =
                            ((y = O),
                            (w = (b = u).speedAsDuration
                              ? b.speed
                              : Math.abs((y / 1e3) * b.speed)),
                            b.durationMax && w > b.durationMax
                              ? b.durationMax
                              : b.durationMin && w < b.durationMin
                              ? b.durationMin
                              : parseInt(w, 10)),
                          A = function (t) {
                            var s, i, a;
                            S || (S = t),
                              (M += t - S),
                              (C =
                                v +
                                O *
                                  ((i = E =
                                    1 < (E = 0 === $ ? 0 : M / $) ? 1 : E),
                                  "easeInQuad" === (s = u).easing &&
                                    (a = i * i),
                                  "easeOutQuad" === s.easing &&
                                    (a = i * (2 - i)),
                                  "easeInOutQuad" === s.easing &&
                                    (a =
                                      i < 0.5
                                        ? 2 * i * i
                                        : (4 - 2 * i) * i - 1),
                                  "easeInCubic" === s.easing && (a = i * i * i),
                                  "easeOutCubic" === s.easing &&
                                    (a = --i * i * i + 1),
                                  "easeInOutCubic" === s.easing &&
                                    (a =
                                      i < 0.5
                                        ? 4 * i * i * i
                                        : (i - 1) * (2 * i - 2) * (2 * i - 2) +
                                          1),
                                  "easeInQuart" === s.easing &&
                                    (a = i * i * i * i),
                                  "easeOutQuart" === s.easing &&
                                    (a = 1 - --i * i * i * i),
                                  "easeInOutQuart" === s.easing &&
                                    (a =
                                      i < 0.5
                                        ? 8 * i * i * i * i
                                        : 1 - 8 * --i * i * i * i),
                                  "easeInQuint" === s.easing &&
                                    (a = i * i * i * i * i),
                                  "easeOutQuint" === s.easing &&
                                    (a = 1 + --i * i * i * i * i),
                                  "easeInOutQuint" === s.easing &&
                                    (a =
                                      i < 0.5
                                        ? 16 * i * i * i * i * i
                                        : 1 + 16 * --i * i * i * i * i),
                                  s.customEasing && (a = s.customEasing(i)),
                                  a || i)),
                              e.scrollTo(0, Math.floor(C)),
                              (function (t, s) {
                                var i = e.pageYOffset;
                                if (
                                  t == s ||
                                  i == s ||
                                  (v < s && e.innerHeight + i) >= k
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    r(n, s, f),
                                    o("scrollStop", u, n, l),
                                    !(h = S = null)
                                  );
                              })(C, _) ||
                                ((h = e.requestAnimationFrame(A)), (S = t));
                          };
                        0 === e.pageYOffset && e.scrollTo(0, 0),
                          (T = n),
                          (x = u),
                          f ||
                            (history.pushState &&
                              x.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(x),
                                  anchor: T.id,
                                },
                                document.title,
                                T === document.documentElement
                                  ? "#top"
                                  : "#" + T.id
                              )),
                          "matchMedia" in e &&
                          e.matchMedia("(prefers-reduced-motion)").matches
                            ? r(n, Math.floor(_), !1)
                            : (o("scrollStart", u, n, l),
                              m.cancelScroll(!0),
                              e.requestAnimationFrame(A));
                      }
                    },
                  },
                  f = function (t) {
                    if (
                      !t.defaultPrevented &&
                      !(
                        0 !== t.button ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey
                      ) &&
                      "closest" in t.target &&
                      (u = t.target.closest(l)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !t.target.closest(d.ignore) &&
                      u.hostname === e.location.hostname &&
                      u.pathname === e.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var s, i;
                      try {
                        s = n(decodeURIComponent(u.hash));
                      } catch (t) {
                        s = n(u.hash);
                      }
                      if ("#" === s) {
                        if (!d.topOnEmptyHash) return;
                        i = document.documentElement;
                      } else i = document.querySelector(s);
                      (i = i || "#top" !== s ? i : document.documentElement) &&
                        (t.preventDefault(),
                        (function (t) {
                          if (
                            history.replaceState &&
                            t.updateURL &&
                            !history.state
                          ) {
                            var s = e.location.hash;
                            (s = s || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(t),
                                  anchor: s || e.pageYOffset,
                                },
                                document.title,
                                s || e.location.href
                              );
                          }
                        })(d),
                        m.animateScroll(i, u));
                    }
                  },
                  g = function (e) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(d)
                    ) {
                      var t = history.state.anchor;
                      ("string" == typeof t &&
                        t &&
                        !(t = document.querySelector(
                          n(history.state.anchor)
                        ))) ||
                        m.animateScroll(t, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    d &&
                      (document.removeEventListener("click", f, !1),
                      e.removeEventListener("popstate", g, !1),
                      m.cancelScroll(),
                      (h = p = u = d = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in e &&
                        "requestAnimationFrame" in e &&
                        "closest" in e.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    m.destroy(),
                      (d = s(t, c || {})),
                      (p = d.header ? document.querySelector(d.header) : null),
                      document.addEventListener("click", f, !1),
                      d.updateURL &&
                        d.popstate &&
                        e.addEventListener("popstate", g, !1);
                  })(),
                  m
                );
              };
            })(i);
          }.apply(t, [])),
          void 0 === n || (e.exports = n);
      },
    },
    t = {};
  function s(n) {
    var i = t[n];
    if (void 0 !== i) return i.exports;
    var a = (t[n] = { exports: {} });
    return e[n].call(a.exports, a, a.exports, s), a.exports;
  }
  (s.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      function e(e) {
        this.type = e;
      }
      (e.prototype.init = function () {
        const e = this;
        (this.оbjects = []),
          (this.daClassname = "_dynamic_adapt_"),
          (this.nodes = document.querySelectorAll("[data-da]"));
        for (let e = 0; e < this.nodes.length; e++) {
          const t = this.nodes[e],
            s = t.dataset.da.trim().split(","),
            n = {};
          (n.element = t),
            (n.parent = t.parentNode),
            (n.destination = document.querySelector(s[0].trim())),
            (n.breakpoint = s[1] ? s[1].trim() : "767"),
            (n.place = s[2] ? s[2].trim() : "last"),
            (n.index = this.indexInParent(n.parent, n.element)),
            this.оbjects.push(n);
        }
        this.arraySort(this.оbjects),
          (this.mediaQueries = Array.prototype.map.call(
            this.оbjects,
            function (e) {
              return (
                "(" +
                this.type +
                "-width: " +
                e.breakpoint +
                "px)," +
                e.breakpoint
              );
            },
            this
          )),
          (this.mediaQueries = Array.prototype.filter.call(
            this.mediaQueries,
            function (e, t, s) {
              return Array.prototype.indexOf.call(s, e) === t;
            }
          ));
        for (let t = 0; t < this.mediaQueries.length; t++) {
          const s = this.mediaQueries[t],
            n = String.prototype.split.call(s, ","),
            i = window.matchMedia(n[0]),
            a = n[1],
            r = Array.prototype.filter.call(this.оbjects, function (e) {
              return e.breakpoint === a;
            });
          i.addListener(function () {
            e.mediaHandler(i, r);
          }),
            this.mediaHandler(i, r);
        }
      }),
        (e.prototype.mediaHandler = function (e, t) {
          if (e.matches)
            for (let e = 0; e < t.length; e++) {
              const s = t[e];
              (s.index = this.indexInParent(s.parent, s.element)),
                this.moveTo(s.place, s.element, s.destination);
            }
          else
            for (let e = t.length - 1; e >= 0; e--) {
              const s = t[e];
              s.element.classList.contains(this.daClassname) &&
                this.moveBack(s.parent, s.element, s.index);
            }
        }),
        (e.prototype.moveTo = function (e, t, s) {
          t.classList.add(this.daClassname),
            "last" === e || e >= s.children.length
              ? s.insertAdjacentElement("beforeend", t)
              : "first" !== e
              ? s.children[e].insertAdjacentElement("beforebegin", t)
              : s.insertAdjacentElement("afterbegin", t);
        }),
        (e.prototype.moveBack = function (e, t, s) {
          t.classList.remove(this.daClassname),
            void 0 !== e.children[s]
              ? e.children[s].insertAdjacentElement("beforebegin", t)
              : e.insertAdjacentElement("beforeend", t);
        }),
        (e.prototype.indexInParent = function (e, t) {
          const s = Array.prototype.slice.call(e.children);
          return Array.prototype.indexOf.call(s, t);
        }),
        (e.prototype.arraySort = function (e) {
          "min" === this.type
            ? Array.prototype.sort.call(e, function (e, t) {
                return e.breakpoint === t.breakpoint
                  ? e.place === t.place
                    ? 0
                    : "first" === e.place || "last" === t.place
                    ? -1
                    : "last" === e.place || "first" === t.place
                    ? 1
                    : e.place - t.place
                  : e.breakpoint - t.breakpoint;
              })
            : Array.prototype.sort.call(e, function (e, t) {
                return e.breakpoint === t.breakpoint
                  ? e.place === t.place
                    ? 0
                    : "first" === e.place || "last" === t.place
                    ? 1
                    : "last" === e.place || "first" === t.place
                    ? -1
                    : t.place - e.place
                  : t.breakpoint - e.breakpoint;
              });
        });
      var t;
      new e("max").init(),
        (t = function () {
          var e = [
            "decimals",
            "thousand",
            "mark",
            "prefix",
            "suffix",
            "encoder",
            "decoder",
            "negativeBefore",
            "negative",
            "edit",
            "undo",
          ];
          function t(e) {
            return e.split("").reverse().join("");
          }
          function s(e, t) {
            return e.substring(0, t.length) === t;
          }
          function n(e, t, s) {
            if ((e[t] || e[s]) && e[t] === e[s]) throw new Error(t);
          }
          function i(e) {
            return "number" == typeof e && isFinite(e);
          }
          function a(e, s, n, a, r, o, l, c, d, u, p, h) {
            var m,
              f,
              g,
              v = h,
              y = "",
              b = "";
            return (
              o && (h = o(h)),
              !!i(h) &&
                (!1 !== e && 0 === parseFloat(h.toFixed(e)) && (h = 0),
                h < 0 && ((m = !0), (h = Math.abs(h))),
                !1 !== e &&
                  (h = (function (e, t) {
                    return (
                      (e = e.toString().split("e")),
                      (+(
                        (e = (e = Math.round(
                          +(e[0] + "e" + (e[1] ? +e[1] + t : t))
                        ))
                          .toString()
                          .split("e"))[0] +
                        "e" +
                        (e[1] ? e[1] - t : -t)
                      )).toFixed(t)
                    );
                  })(h, e)),
                -1 !== (h = h.toString()).indexOf(".")
                  ? ((g = (f = h.split("."))[0]), n && (y = n + f[1]))
                  : (g = h),
                s && (g = t((g = t(g).match(/.{1,3}/g)).join(t(s)))),
                m && c && (b += c),
                a && (b += a),
                m && d && (b += d),
                (b += g),
                (b += y),
                r && (b += r),
                u && (b = u(b, v)),
                b)
            );
          }
          function r(e, t, n, a, r, o, l, c, d, u, p, h) {
            var m,
              f = "";
            return (
              p && (h = p(h)),
              !(!h || "string" != typeof h) &&
                (c && s(h, c) && ((h = h.replace(c, "")), (m = !0)),
                a && s(h, a) && (h = h.replace(a, "")),
                d && s(h, d) && ((h = h.replace(d, "")), (m = !0)),
                r &&
                  (function (e, t) {
                    return e.slice(-1 * t.length) === t;
                  })(h, r) &&
                  (h = h.slice(0, -1 * r.length)),
                t && (h = h.split(t).join("")),
                n && (h = h.replace(n, ".")),
                m && (f += "-"),
                "" !== (f = (f += h).replace(/[^0-9\.\-.]/g, "")) &&
                  ((f = Number(f)), l && (f = l(f)), !!i(f) && f))
            );
          }
          function o(t, s, n) {
            var i,
              a = [];
            for (i = 0; i < e.length; i += 1) a.push(t[e[i]]);
            return a.push(n), s.apply("", a);
          }
          return function t(s) {
            if (!(this instanceof t)) return new t(s);
            "object" == typeof s &&
              ((s = (function (t) {
                var s,
                  i,
                  a,
                  r = {};
                for (
                  void 0 === t.suffix && (t.suffix = t.postfix), s = 0;
                  s < e.length;
                  s += 1
                )
                  if (void 0 === (a = t[(i = e[s])]))
                    "negative" !== i || r.negativeBefore
                      ? "mark" === i && "." !== r.thousand
                        ? (r[i] = ".")
                        : (r[i] = !1)
                      : (r[i] = "-");
                  else if ("decimals" === i) {
                    if (!(0 <= a && a < 8)) throw new Error(i);
                    r[i] = a;
                  } else if (
                    "encoder" === i ||
                    "decoder" === i ||
                    "edit" === i ||
                    "undo" === i
                  ) {
                    if ("function" != typeof a) throw new Error(i);
                    r[i] = a;
                  } else {
                    if ("string" != typeof a) throw new Error(i);
                    r[i] = a;
                  }
                return (
                  n(r, "mark", "thousand"),
                  n(r, "prefix", "negative"),
                  n(r, "prefix", "negativeBefore"),
                  r
                );
              })(s)),
              (this.to = function (e) {
                return o(s, a, e);
              }),
              (this.from = function (e) {
                return o(s, r, e);
              }));
          };
        }),
        "function" == typeof define && define.amd
          ? define([], t)
          : "object" == typeof exports
          ? (module.exports = t())
          : (window.wNumb = t());
      class n {
        constructor(e) {
          let t = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-youtube",
            youtubePlaceAttribute: "data-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            bodyLockDelay: 500,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          (this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...t,
              ...e,
              classes: { ...t.classes, ...e?.classes },
              hashSettings: { ...t.hashSettings, ...e?.hashSettings },
              on: { ...t.on, ...e?.on },
            }),
            this.options.init && this.initPopups();
        }
        initPopups() {
          this.popupLogging("Проснулся"), this.eventsPopup();
        }
        eventsPopup() {
          document.addEventListener(
            "click",
            function (e) {
              const t = e.target.closest(
                `[${this.options.attributeOpenButton}]`
              );
              if (t)
                return (
                  e.preventDefault(),
                  (this._dataValue = t.getAttribute(
                    this.options.attributeOpenButton
                  )
                    ? t.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = t),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void this.popupLogging(
                        `Ой ой, не заполнен атрибут у ${t.classList}`
                      )
                );
              return e.target.closest(
                `[${this.options.attributeCloseButton}]`
              ) ||
                (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (e.preventDefault(), void this.close())
                : void 0;
            }.bind(this)
          ),
            document.addEventListener(
              "keydown",
              function (e) {
                if (
                  this.options.closeEsc &&
                  27 == e.which &&
                  "Escape" === e.code &&
                  this.isOpen
                )
                  return e.preventDefault(), void this.close();
                this.options.focusCatch &&
                  9 == e.which &&
                  this.isOpen &&
                  this._focusCatch(e);
              }.bind(this)
            ),
            document.querySelector("form[data-ajax],form[data-dev]") &&
              document.addEventListener(
                "formSent",
                function (e) {
                  const t = e.detail.form.dataset.popupMessage;
                  t && this.open(t);
                }.bind(this)
              ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  window.location.hash
                    ? this._openToHash()
                    : this.close(this.targetOpen.selector);
                }.bind(this)
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this)
              ));
        }
        open(e) {
          if (
            (e &&
              "string" == typeof e &&
              "" !== e.trim() &&
              ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
            this.isOpen && ((this._reopen = !0), this.close()),
            this._selectorOpen ||
              (this.targetOpen.selector = this.lastClosed.selector),
            this._reopen ||
              (this.previousActiveElement = document.activeElement),
            (this.targetOpen.element = document.querySelector(
              this.targetOpen.selector
            )),
            this.targetOpen.element)
          ) {
            if (
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              )
            ) {
              const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                  this.options.youtubeAttribute
                )}?rel=0&showinfo=0&autoplay=1`,
                t = document.createElement("iframe");
              t.setAttribute("allowfullscreen", "");
              const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
              t.setAttribute("allow", `${s}; encrypted-media`),
                t.setAttribute("src", e),
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                  this.targetOpen.element
                    .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                    .appendChild(t);
            }
            this.options.hashSettings.location &&
              (this._getHash(), this._setHash()),
              this.options.on.beforeOpen(this),
              this.targetOpen.element.classList.add(
                this.options.classes.popupActive
              ),
              document.body.classList.add(this.options.classes.bodyActive),
              this._reopen ? (this._reopen = !1) : l(),
              this.targetOpen.element.setAttribute("aria-hidden", "false"),
              (this.previousOpen.selector = this.targetOpen.selector),
              (this.previousOpen.element = this.targetOpen.element),
              (this._selectorOpen = !1),
              (this.isOpen = !0),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              document.dispatchEvent(
                new CustomEvent("afterPopupOpen", { detail: { popup: this } })
              ),
              this.popupLogging("Открыл попап");
          } else
            this.popupLogging(
              "Ой ой, такого попапа нет. Проверьте корректность ввода. "
            );
        }
        close(e) {
          e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            (this.previousOpen.selector = e),
            this.isOpen &&
              o &&
              (this.options.on.beforeClose(this),
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              ) &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.body.classList.remove(
                  this.options.classes.bodyActive
                ),
                l(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              this.popupLogging("Закрыл попап"));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let e = document.querySelector(
            `.${window.location.hash.replace("#", "")}`
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
          document.querySelector(
            `[${this.options.attributeOpenButton}="${e}"]`
          ) &&
            e &&
            this.open(e);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
          const t = this.targetOpen.element.querySelectorAll(this._focusEl),
            s = Array.prototype.slice.call(t),
            n = s.indexOf(document.activeElement);
          e.shiftKey &&
            0 === n &&
            (s[s.length - 1].focus(), e.preventDefault()),
            e.shiftKey ||
              n !== s.length - 1 ||
              (s[0].focus(), e.preventDefault());
        }
        _focusTrap() {
          const e = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : e[0].focus();
        }
        popupLogging(e) {
          this.options.logging && u(`[Попапос]: ${e}`);
        }
      }
      let i = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            i.Android() || i.BlackBerry() || i.iOS() || i.Opera() || i.Windows()
          );
        },
      };
      let a = (e, t = 500, s = 0) => {
          e.classList.contains("_slide") ||
            (e.classList.add("_slide"),
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = `${e.offsetHeight}px`),
            e.offsetHeight,
            (e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            window.setTimeout(() => {
              (e.hidden = !s),
                !s && e.style.removeProperty("height"),
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                !s && e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t));
        },
        r = (e, t = 500, s = 0) => {
          if (!e.classList.contains("_slide")) {
            e.classList.add("_slide"),
              (e.hidden = !e.hidden && null),
              s && e.style.removeProperty("height");
            let n = e.offsetHeight;
            (e.style.overflow = "hidden"),
              (e.style.height = s ? `${s}px` : "0px"),
              (e.style.paddingTop = 0),
              (e.style.paddingBottom = 0),
              (e.style.marginTop = 0),
              (e.style.marginBottom = 0),
              e.offsetHeight,
              (e.style.transitionProperty = "height, margin, padding"),
              (e.style.transitionDuration = t + "ms"),
              (e.style.height = n + "px"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                e.style.removeProperty("height"),
                  e.style.removeProperty("overflow"),
                  e.style.removeProperty("transition-duration"),
                  e.style.removeProperty("transition-property"),
                  e.classList.remove("_slide");
              }, t);
          }
        },
        o = !0,
        l = (e = 500) => {
          document.documentElement.classList.contains("lock") ? c(e) : d(e);
        },
        c = (e = 500) => {
          let t = document.querySelector("body");
          if (o) {
            let s = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let e = 0; e < s.length; e++) {
                s[e].style.paddingRight = "0px";
              }
              (t.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, e),
              (o = !1),
              setTimeout(function () {
                o = !0;
              }, e);
          }
        },
        d = (e = 500) => {
          let t = document.querySelector("body");
          if (o) {
            let s = document.querySelectorAll("[data-lp]");
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (t.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (o = !1),
              setTimeout(function () {
                o = !0;
              }, e);
          }
        };
      document.querySelector(".button-menu") &&
        document.addEventListener("click", function (e) {
          document.documentElement.classList.toggle("menu-catalog-open"),
            e.target.closest(".button-menu") ||
              document.documentElement.classList.remove("menu-catalog-open");
        }),
        document.documentElement.classList.add("menu-catalog-open"),
        document.documentElement.classList.remove("menu-catalog-open");
      function u(e) {
        setTimeout(() => {
          window.FLS && console.log(e);
        }, 0);
      }
      function p(e) {
        return e.filter(function (e, t, s) {
          return s.indexOf(e) === t;
        });
      }
      function h(e, t) {
        const s = Array.from(e).filter(function (e, s, n) {
          if (e.dataset[t]) return e.dataset[t].split(",")[0];
        });
        if (s.length) {
          const e = [];
          s.forEach((s) => {
            const n = {},
              i = s.dataset[t].split(",");
            (n.value = i[0]),
              (n.type = i[1] ? i[1].trim() : "max"),
              (n.item = s),
              e.push(n);
          });
          let n = e.map(function (e) {
            return (
              "(" +
              e.type +
              "-width: " +
              e.value +
              "px)," +
              e.value +
              "," +
              e.type
            );
          });
          n = p(n);
          const i = [];
          if (n.length)
            return (
              n.forEach((t) => {
                const s = t.split(","),
                  n = s[1],
                  a = s[2],
                  r = window.matchMedia(s[0]),
                  o = e.filter(function (e) {
                    if (e.value === n && e.type === a) return !0;
                  });
                i.push({ itemsArray: o, matchMedia: r });
              }),
              i
            );
        }
      }
      document.querySelector(".cart__wrapper");
      const m = document.querySelector("[data-order-total]"),
        f = document.querySelector("[data-order-items]"),
        g = document.querySelector(".order__container");
      function v() {
        m &&
          (m.innerHTML = `Речей у кошику: <strong>${localStorage.totalQuantity}</strong>, </br>\n\t\tна сумму: <strong>${localStorage.totalPrice} ₴</strong>`);
      }
      function y() {
        if (f) {
          (f.innerHTML = ""),
            "0" === localStorage.getItem("totalQuantity") &&
              (g.innerHTML =
                '<div class="order__empty"><h2 class="title">Ваш кошик порожній</h2><a href="catalog.html" class="order__button_back button button_black _icon-arrow-link">Повернутись до каталогу</a></div>');
          for (let e = 0; e < localStorage.length; e++) {
            let t = localStorage.key(e);
            if ("totalPrice" !== t && "totalQuantity" !== t) {
              let e = JSON.parse(localStorage.getItem(t));
              console.log(t);
              const s = `\t\n\t\t\t\t<div data-product="${e.product}" data-product-key="${t}" class="item-cart">\n\t\t\t\t\t<div class="item-cart__remove">╳</div>\n\t\t\t\t\t<img class="item-cart__img" src=${e.imgSrc} alt="">\n\t\t\t\t\t<div class="item-cart__info">\n\t\t\t\t\t\t<h3 class="item-cart__name">${e.title}</h3>\n\t\t\t\t\t\t<div data-currency class="item-cart__price">${e.price}</div>\n\t\t\t\t\t\t<h5 data-size="${e.size}" class="item-cart__size">Розмір:&nbsp;<span class="size-cart">${e.size}</span></h5>\n\t\t\t\t\t\t<div class="item-cart__quantity quantity">\n\t\t\t\t\t\t\t<h4 class="quantity__title">Кількість:</h4>\n\t\t\t\t\t\t\t<div class="quantity__counter">\n\t\t\t\t\t\t\t\t<button data-action class="quantity__button quantity__button_minus">-</button>\n\t\t\t\t\t\t\t\t<input data-counter disabled type="phone" value="${e.counter}" class="quantity__value">\n\t\t\t\t\t\t\t\t<button data-action class="quantity__button quantity__button_plus">+</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>`;
              f.insertAdjacentHTML("afterbegin", s);
            }
          }
        }
      }
      function b() {
        c(), document.documentElement.classList.remove("cart-open");
      }
      m && document.addEventListener("loaded", v()),
        f && document.addEventListener("loaded", y()),
        window.addEventListener("click", function (e) {
          e.target.closest(".header__cart")
            ? o && (l(), document.documentElement.classList.toggle("cart-open"))
            : e.target.closest(".cart") || b();
        }),
        document.addEventListener("keyup", function (e) {
          "Escape" === e.code && b();
        }),
        console.log(localStorage);
      const w = document.querySelector(".cart__wrapper");
      let S, E;
      function C(e, t, s) {
        const n = JSON.parse(localStorage.getItem(e));
        "plus" === s ? ++n.counter : "minus" === s && --n.counter,
          localStorage.setItem(e, JSON.stringify(n));
      }
      function T() {
        w.innerHTML = "";
      }
      function x() {
        for (let e = 0; e < localStorage.length; e++) {
          let t = localStorage.key(e);
          if ("totalPrice" !== t && "totalQuantity" !== t) {
            let e = JSON.parse(localStorage.getItem(t));
            console.log(t);
            const s = `\t\n\t\t\t<div data-product="${e.product}" data-product-key="${t}" class="item-cart">\n\t\t\t\t<div class="item-cart__remove">╳</div>\n\t\t\t\t<img class="item-cart__img" src=${e.imgSrc} alt="">\n\t\t\t\t<div class="item-cart__info">\n\t\t\t\t\t<h3 class="item-cart__name">${e.title}</h3>\n\t\t\t\t\t<div data-currency class="item-cart__price">${e.price}</div>\n\t\t\t\t\t<h5 data-size="${e.size}" class="item-cart__size">Розмір:&nbsp;<span class="size-cart">${e.size}</span></h5>\n\t\t\t\t\t<div class="item-cart__quantity quantity">\n\t\t\t\t\t\t<h4 class="quantity__title">Кількість:</h4>\n\t\t\t\t\t\t<div class="quantity__counter">\n\t\t\t\t\t\t\t<button data-action class="quantity__button quantity__button_minus">-</button>\n\t\t\t\t\t\t\t<input data-counter disabled type="phone" value="${e.counter}" class="quantity__value">\n\t\t\t\t\t\t\t<button data-action class="quantity__button quantity__button_plus">+</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>`;
            w.insertAdjacentHTML("afterbegin", s);
          }
        }
      }
      function L() {
        const e = document.querySelector("[data-cart-empty]"),
          t = document.querySelector(".cart__total");
        "0" === !localStorage.getItem("totalQuantity") || w.children.length
          ? (e.classList.add("none"),
            t.classList.remove("none"),
            (w.style.padding = "10px"))
          : ((w.style.padding = "0px"),
            e.classList.remove("none"),
            t.classList.add("none"));
      }
      function _() {
        const e = document.querySelector(".total-cart__price");
        let t = 0;
        for (let e = 0; e < localStorage.length; e++) {
          let s = localStorage.key(e);
          if ("totalPrice" !== s && "totalQuantity" !== s) {
            let e = JSON.parse(localStorage.getItem(s));
            t = +t + parseInt(e.price) * e.counter;
          }
        }
        (e.innerText = t), localStorage.setItem("totalPrice", t);
      }
      function O() {
        const e = document.querySelector("[data-cart-counter]");
        let t = 0;
        for (let e = 0; e < localStorage.length; e++) {
          let s = localStorage.key(e);
          if ("totalPrice" !== s && "totalQuantity" !== s) {
            t = +t + +JSON.parse(localStorage.getItem(s)).counter;
          }
        }
        (e.innerText = t), localStorage.setItem("totalQuantity", t);
      }
      window.addEventListener("click", function (e) {
        if (e.target.closest(".quantity__button")) {
          let t = parseInt(
            e.target.closest(".quantity").querySelector("input").value
          );
          e.target.classList.contains("quantity__button_plus") ? ++t : --t,
            (e.target.closest(".cart__wrapper") ||
              e.target.closest(".order__items")) &&
            parseInt(t) < 1
              ? (localStorage.removeItem(
                  e.target
                    .closest(".item-cart")
                    .getAttribute("data-product-key")
                ),
                T(),
                x(),
                L(),
                O(),
                _(),
                v(),
                y(),
                console.log(localStorage))
              : t < 1 && (t = 1),
            (e.target.closest(".quantity").querySelector("input").value = t);
        } else e.target.closest(".item-cart__remove") && (localStorage.removeItem(e.target.closest(".item-cart").getAttribute("data-product-key")), T(), x(), L(), O(), _(), v(), y(), console.log(localStorage));
        if (
          e.target.hasAttribute("data-action") &&
          (e.target.closest(".order__items") ||
            e.target.closest(".cart__wrapper"))
        ) {
          const t = e.target.closest("[data-product]"),
            s = {
              product: t.dataset.product,
              imgSrc: t.querySelector(".item-cart__img").getAttribute("src"),
              title: t.querySelector(".item-cart__name").innerText,
              size: t.querySelector(".size-cart").innerText,
              price: t.querySelector("[data-currency]").innerText,
              counter: t.querySelector("[data-counter]").value,
            };
          console.log(s), console.log(localStorage);
          const n = `${s.product}${s.size}`;
          e.target.classList.contains("quantity__button_plus")
            ? (C(n, s, "plus"), console.log(localStorage))
            : (C(n, s, "minus"), console.log(localStorage)),
            T(),
            x(),
            L(),
            O(),
            _(),
            v(),
            y(),
            console.log(localStorage);
        }
      }),
        console.log(localStorage),
        L(),
        window.addEventListener("click", function (e) {
          if (e.target.hasAttribute("data-add-to-cart")) {
            const t = e.target.closest("[data-product]");
            (E = {
              product: t.dataset.product,
              imgSrc: t.querySelector(".product-img_main").getAttribute("src"),
              title: t.querySelector(".product__name").innerText,
              size: t.querySelector("input:checked").id,
              price: t.querySelector("[data-currency]").innerText,
              counter: t.querySelector("[data-counter]").value,
            }),
              (S = `${E.product}${E.size}`),
              localStorage.getItem(S)
                ? (T(),
                  (function (e, t, s) {
                    const n = JSON.parse(localStorage.getItem(e));
                    "plus" === s
                      ? (n.counter = +n.counter + +t.counter)
                      : "minus" === s && (n.counter = n.counter - t.counter);
                    localStorage.setItem(e, JSON.stringify(n));
                  })(S, E, "plus"),
                  x())
                : (T(),
                  (function (e, t) {
                    localStorage.setItem(e, JSON.stringify(t));
                  })(S, E),
                  x()),
              L(),
              O(),
              _(),
              (t.querySelector("[data-counter]").value = "1"),
              console.log(localStorage);
          }
          e.target.closest("[data-cart-clear]") &&
            (localStorage.clear(), T(), L(), _(), O(), v(), y());
        }),
        window.addEventListener("load", function () {
          x(), _(), O(), L();
        }),
        console.log(localStorage);
      var k = s(2);
      let M = (e, t = !1, s = 500, n = 0) => {
        const i = document.querySelector(e);
        if (i) {
          let e = "",
            a = 0;
          t &&
            ((e = "header.header"),
            (a = document.querySelector(e).offsetHeight));
          let r = {
            speedAsDuration: !0,
            speed: s,
            header: e,
            offset: n,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (c(), document.documentElement.classList.remove("menu-open")),
            void 0 !== k)
          )
            new k().animateScroll(i, "", r);
          else {
            let e = i.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
          }
        }
      };
      const $ = { inputMaskModule: null, selectModule: null };
      let A = {
        getErrors(e) {
          let t = 0,
            s = e.querySelectorAll("*[data-required]");
          return (
            s.length &&
              s.forEach((e) => {
                (null === e.offsetParent && "SELECT" !== e.tagName) ||
                  e.disabled ||
                  (t += this.validateInput(e));
              }),
            t
          );
        },
        validateInput(e) {
          let t = 0;
          return (
            "email" === e.dataset.required
              ? ((e.value = e.value.replace(" ", "")),
                this.emailTest(e)
                  ? (this.addError(e), t++)
                  : this.removeError(e))
              : ("checkbox" !== e.type || e.checked) && e.value
              ? this.removeError(e)
              : (this.addError(e), t++),
            t
          );
        },
        addError(e) {
          e.classList.add("_form-error"),
            e.parentElement.classList.add("_form-error");
          let t = e.parentElement.querySelector(".form__error");
          t && e.parentElement.removeChild(t),
            e.dataset.error &&
              e.parentElement.insertAdjacentHTML(
                "beforeend",
                `<div class="form__error">${e.dataset.error}</div>`
              );
        },
        removeError(e) {
          e.classList.remove("_form-error"),
            e.parentElement.classList.remove("_form-error"),
            e.parentElement.querySelector(".form__error") &&
              e.parentElement.removeChild(
                e.parentElement.querySelector(".form__error")
              );
        },
        formClean(e) {
          e.reset(),
            setTimeout(() => {
              let t = e.querySelectorAll("input,textarea");
              for (let e = 0; e < t.length; e++) {
                const s = t[e];
                s.parentElement.classList.remove("_form-focus"),
                  s.classList.remove("_form-focus"),
                  A.removeError(s),
                  (s.value = s.dataset.placeholder);
              }
              let s = e.querySelectorAll(".checkbox__input");
              if (s.length > 0)
                for (let e = 0; e < s.length; e++) {
                  s[e].checked = !1;
                }
              if ($.selectModule) {
                let t = e.querySelectorAll(".select");
                if (t.length)
                  for (let e = 0; e < t.length; e++) {
                    const s = t[e].querySelector("select");
                    $.selectModule.selectBuild(s);
                  }
              }
            }, 0);
        },
        emailTest: (e) =>
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
      };
      function P(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "constructor" in e &&
          e.constructor === Object
        );
      }
      function I(e = {}, t = {}) {
        Object.keys(t).forEach((s) => {
          void 0 === e[s]
            ? (e[s] = t[s])
            : P(t[s]) &&
              P(e[s]) &&
              Object.keys(t[s]).length > 0 &&
              I(e[s], t[s]);
        });
      }
      const q = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
      };
      function z() {
        const e = "undefined" != typeof document ? document : {};
        return I(e, q), e;
      }
      const B = {
        document: q,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
          return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (e) =>
          "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
          "undefined" != typeof setTimeout && clearTimeout(e);
        },
      };
      function D() {
        const e = "undefined" != typeof window ? window : {};
        return I(e, B), e;
      }
      class N extends Array {
        constructor(e) {
          "number" == typeof e
            ? super(e)
            : (super(...(e || [])),
              (function (e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                  get: () => t,
                  set(e) {
                    t.__proto__ = e;
                  },
                });
              })(this));
        }
      }
      function H(e = []) {
        const t = [];
        return (
          e.forEach((e) => {
            Array.isArray(e) ? t.push(...H(e)) : t.push(e);
          }),
          t
        );
      }
      function G(e, t) {
        return Array.prototype.filter.call(e, t);
      }
      function F(e, t) {
        const s = D(),
          n = z();
        let i = [];
        if (!t && e instanceof N) return e;
        if (!e) return new N(i);
        if ("string" == typeof e) {
          const s = e.trim();
          if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
            let e = "div";
            0 === s.indexOf("<li") && (e = "ul"),
              0 === s.indexOf("<tr") && (e = "tbody"),
              (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
              0 === s.indexOf("<tbody") && (e = "table"),
              0 === s.indexOf("<option") && (e = "select");
            const t = n.createElement(e);
            t.innerHTML = s;
            for (let e = 0; e < t.childNodes.length; e += 1)
              i.push(t.childNodes[e]);
          } else
            i = (function (e, t) {
              if ("string" != typeof e) return [e];
              const s = [],
                n = t.querySelectorAll(e);
              for (let e = 0; e < n.length; e += 1) s.push(n[e]);
              return s;
            })(e.trim(), t || n);
        } else if (e.nodeType || e === s || e === n) i.push(e);
        else if (Array.isArray(e)) {
          if (e instanceof N) return e;
          i = e;
        }
        return new N(
          (function (e) {
            const t = [];
            for (let s = 0; s < e.length; s += 1)
              -1 === t.indexOf(e[s]) && t.push(e[s]);
            return t;
          })(i)
        );
      }
      F.fn = N.prototype;
      const j = "resize scroll".split(" ");
      function W(e) {
        return function (...t) {
          if (void 0 === t[0]) {
            for (let t = 0; t < this.length; t += 1)
              j.indexOf(e) < 0 &&
                (e in this[t] ? this[t][e]() : F(this[t]).trigger(e));
            return this;
          }
          return this.on(e, ...t);
        };
      }
      W("click"),
        W("blur"),
        W("focus"),
        W("focusin"),
        W("focusout"),
        W("keyup"),
        W("keydown"),
        W("keypress"),
        W("submit"),
        W("change"),
        W("mousedown"),
        W("mousemove"),
        W("mouseup"),
        W("mouseenter"),
        W("mouseleave"),
        W("mouseout"),
        W("mouseover"),
        W("touchstart"),
        W("touchend"),
        W("touchmove"),
        W("resize"),
        W("scroll");
      const R = {
        addClass: function (...e) {
          const t = H(e.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.add(...t);
            }),
            this
          );
        },
        removeClass: function (...e) {
          const t = H(e.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.remove(...t);
            }),
            this
          );
        },
        hasClass: function (...e) {
          const t = H(e.map((e) => e.split(" ")));
          return (
            G(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
              .length > 0
          );
        },
        toggleClass: function (...e) {
          const t = H(e.map((e) => e.split(" ")));
          this.forEach((e) => {
            t.forEach((t) => {
              e.classList.toggle(t);
            });
          });
        },
        attr: function (e, t) {
          if (1 === arguments.length && "string" == typeof e)
            return this[0] ? this[0].getAttribute(e) : void 0;
          for (let s = 0; s < this.length; s += 1)
            if (2 === arguments.length) this[s].setAttribute(e, t);
            else
              for (const t in e)
                (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
          return this;
        },
        removeAttr: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
          return this;
        },
        transform: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
          return this;
        },
        transition: function (e) {
          for (let t = 0; t < this.length; t += 1)
            this[t].style.transitionDuration =
              "string" != typeof e ? `${e}ms` : e;
          return this;
        },
        on: function (...e) {
          let [t, s, n, i] = e;
          function a(e) {
            const t = e.target;
            if (!t) return;
            const i = e.target.dom7EventData || [];
            if ((i.indexOf(e) < 0 && i.unshift(e), F(t).is(s))) n.apply(t, i);
            else {
              const e = F(t).parents();
              for (let t = 0; t < e.length; t += 1)
                F(e[t]).is(s) && n.apply(e[t], i);
            }
          }
          function r(e) {
            const t = (e && e.target && e.target.dom7EventData) || [];
            t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
          }
          "function" == typeof e[1] && (([t, n, i] = e), (s = void 0)),
            i || (i = !1);
          const o = t.split(" ");
          let l;
          for (let e = 0; e < this.length; e += 1) {
            const t = this[e];
            if (s)
              for (l = 0; l < o.length; l += 1) {
                const e = o[l];
                t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                  t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                  t.dom7LiveListeners[e].push({
                    listener: n,
                    proxyListener: a,
                  }),
                  t.addEventListener(e, a, i);
              }
            else
              for (l = 0; l < o.length; l += 1) {
                const e = o[l];
                t.dom7Listeners || (t.dom7Listeners = {}),
                  t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                  t.dom7Listeners[e].push({ listener: n, proxyListener: r }),
                  t.addEventListener(e, r, i);
              }
          }
          return this;
        },
        off: function (...e) {
          let [t, s, n, i] = e;
          "function" == typeof e[1] && (([t, n, i] = e), (s = void 0)),
            i || (i = !1);
          const a = t.split(" ");
          for (let e = 0; e < a.length; e += 1) {
            const t = a[e];
            for (let e = 0; e < this.length; e += 1) {
              const a = this[e];
              let r;
              if (
                (!s && a.dom7Listeners
                  ? (r = a.dom7Listeners[t])
                  : s && a.dom7LiveListeners && (r = a.dom7LiveListeners[t]),
                r && r.length)
              )
                for (let e = r.length - 1; e >= 0; e -= 1) {
                  const s = r[e];
                  (n && s.listener === n) ||
                  (n &&
                    s.listener &&
                    s.listener.dom7proxy &&
                    s.listener.dom7proxy === n)
                    ? (a.removeEventListener(t, s.proxyListener, i),
                      r.splice(e, 1))
                    : n ||
                      (a.removeEventListener(t, s.proxyListener, i),
                      r.splice(e, 1));
                }
            }
          }
          return this;
        },
        trigger: function (...e) {
          const t = D(),
            s = e[0].split(" "),
            n = e[1];
          for (let i = 0; i < s.length; i += 1) {
            const a = s[i];
            for (let s = 0; s < this.length; s += 1) {
              const i = this[s];
              if (t.CustomEvent) {
                const s = new t.CustomEvent(a, {
                  detail: n,
                  bubbles: !0,
                  cancelable: !0,
                });
                (i.dom7EventData = e.filter((e, t) => t > 0)),
                  i.dispatchEvent(s),
                  (i.dom7EventData = []),
                  delete i.dom7EventData;
              }
            }
          }
          return this;
        },
        transitionEnd: function (e) {
          const t = this;
          return (
            e &&
              t.on("transitionend", function s(n) {
                n.target === this &&
                  (e.call(this, n), t.off("transitionend", s));
              }),
            this
          );
        },
        outerWidth: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(e.getPropertyValue("margin-right")) +
                parseFloat(e.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(e.getPropertyValue("margin-top")) +
                parseFloat(e.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          const e = D();
          return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            const e = D(),
              t = z(),
              s = this[0],
              n = s.getBoundingClientRect(),
              i = t.body,
              a = s.clientTop || i.clientTop || 0,
              r = s.clientLeft || i.clientLeft || 0,
              o = s === e ? e.scrollY : s.scrollTop,
              l = s === e ? e.scrollX : s.scrollLeft;
            return { top: n.top + o - a, left: n.left + l - r };
          }
          return null;
        },
        css: function (e, t) {
          const s = D();
          let n;
          if (1 === arguments.length) {
            if ("string" != typeof e) {
              for (n = 0; n < this.length; n += 1)
                for (const t in e) this[n].style[t] = e[t];
              return this;
            }
            if (this[0])
              return s.getComputedStyle(this[0], null).getPropertyValue(e);
          }
          if (2 === arguments.length && "string" == typeof e) {
            for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
            return this;
          }
          return this;
        },
        each: function (e) {
          return e
            ? (this.forEach((t, s) => {
                e.apply(t, [t, s]);
              }),
              this)
            : this;
        },
        html: function (e) {
          if (void 0 === e) return this[0] ? this[0].innerHTML : null;
          for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
          return this;
        },
        text: function (e) {
          if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
          for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
          return this;
        },
        is: function (e) {
          const t = D(),
            s = z(),
            n = this[0];
          let i, a;
          if (!n || void 0 === e) return !1;
          if ("string" == typeof e) {
            if (n.matches) return n.matches(e);
            if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
            if (n.msMatchesSelector) return n.msMatchesSelector(e);
            for (i = F(e), a = 0; a < i.length; a += 1)
              if (i[a] === n) return !0;
            return !1;
          }
          if (e === s) return n === s;
          if (e === t) return n === t;
          if (e.nodeType || e instanceof N) {
            for (i = e.nodeType ? [e] : e, a = 0; a < i.length; a += 1)
              if (i[a] === n) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          let e,
            t = this[0];
          if (t) {
            for (e = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (e += 1);
            return e;
          }
        },
        eq: function (e) {
          if (void 0 === e) return this;
          const t = this.length;
          if (e > t - 1) return F([]);
          if (e < 0) {
            const s = t + e;
            return F(s < 0 ? [] : [this[s]]);
          }
          return F([this[e]]);
        },
        append: function (...e) {
          let t;
          const s = z();
          for (let n = 0; n < e.length; n += 1) {
            t = e[n];
            for (let e = 0; e < this.length; e += 1)
              if ("string" == typeof t) {
                const n = s.createElement("div");
                for (n.innerHTML = t; n.firstChild; )
                  this[e].appendChild(n.firstChild);
              } else if (t instanceof N)
                for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
              else this[e].appendChild(t);
          }
          return this;
        },
        prepend: function (e) {
          const t = z();
          let s, n;
          for (s = 0; s < this.length; s += 1)
            if ("string" == typeof e) {
              const i = t.createElement("div");
              for (i.innerHTML = e, n = i.childNodes.length - 1; n >= 0; n -= 1)
                this[s].insertBefore(i.childNodes[n], this[s].childNodes[0]);
            } else if (e instanceof N)
              for (n = 0; n < e.length; n += 1)
                this[s].insertBefore(e[n], this[s].childNodes[0]);
            else this[s].insertBefore(e, this[s].childNodes[0]);
          return this;
        },
        next: function (e) {
          return this.length > 0
            ? e
              ? this[0].nextElementSibling &&
                F(this[0].nextElementSibling).is(e)
                ? F([this[0].nextElementSibling])
                : F([])
              : this[0].nextElementSibling
              ? F([this[0].nextElementSibling])
              : F([])
            : F([]);
        },
        nextAll: function (e) {
          const t = [];
          let s = this[0];
          if (!s) return F([]);
          for (; s.nextElementSibling; ) {
            const n = s.nextElementSibling;
            e ? F(n).is(e) && t.push(n) : t.push(n), (s = n);
          }
          return F(t);
        },
        prev: function (e) {
          if (this.length > 0) {
            const t = this[0];
            return e
              ? t.previousElementSibling && F(t.previousElementSibling).is(e)
                ? F([t.previousElementSibling])
                : F([])
              : t.previousElementSibling
              ? F([t.previousElementSibling])
              : F([]);
          }
          return F([]);
        },
        prevAll: function (e) {
          const t = [];
          let s = this[0];
          if (!s) return F([]);
          for (; s.previousElementSibling; ) {
            const n = s.previousElementSibling;
            e ? F(n).is(e) && t.push(n) : t.push(n), (s = n);
          }
          return F(t);
        },
        parent: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1)
            null !== this[s].parentNode &&
              (e
                ? F(this[s].parentNode).is(e) && t.push(this[s].parentNode)
                : t.push(this[s].parentNode));
          return F(t);
        },
        parents: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            let n = this[s].parentNode;
            for (; n; )
              e ? F(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
          }
          return F(t);
        },
        closest: function (e) {
          let t = this;
          return void 0 === e
            ? F([])
            : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            const n = this[s].querySelectorAll(e);
            for (let e = 0; e < n.length; e += 1) t.push(n[e]);
          }
          return F(t);
        },
        children: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            const n = this[s].children;
            for (let s = 0; s < n.length; s += 1)
              (e && !F(n[s]).is(e)) || t.push(n[s]);
          }
          return F(t);
        },
        filter: function (e) {
          return F(G(this, e));
        },
        remove: function () {
          for (let e = 0; e < this.length; e += 1)
            this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this;
        },
      };
      Object.keys(R).forEach((e) => {
        Object.defineProperty(F.fn, e, { value: R[e], writable: !0 });
      });
      const V = F;
      function Y(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      }
      function X() {
        return Date.now();
      }
      function Q(e, t) {
        void 0 === t && (t = "x");
        const s = D();
        let n, i, a;
        const r = (function (e) {
          const t = D();
          let s;
          return (
            t.getComputedStyle && (s = t.getComputedStyle(e, null)),
            !s && e.currentStyle && (s = e.currentStyle),
            s || (s = e.style),
            s
          );
        })(e);
        return (
          s.WebKitCSSMatrix
            ? ((i = r.transform || r.webkitTransform),
              i.split(",").length > 6 &&
                (i = i
                  .split(", ")
                  .map((e) => e.replace(",", "."))
                  .join(", ")),
              (a = new s.WebKitCSSMatrix("none" === i ? "" : i)))
            : ((a =
                r.MozTransform ||
                r.OTransform ||
                r.MsTransform ||
                r.msTransform ||
                r.transform ||
                r
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,")),
              (n = a.toString().split(","))),
          "x" === t &&
            (i = s.WebKitCSSMatrix
              ? a.m41
              : 16 === n.length
              ? parseFloat(n[12])
              : parseFloat(n[4])),
          "y" === t &&
            (i = s.WebKitCSSMatrix
              ? a.m42
              : 16 === n.length
              ? parseFloat(n[13])
              : parseFloat(n[5])),
          i || 0
        );
      }
      function U(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          "Object" === Object.prototype.toString.call(e).slice(8, -1)
        );
      }
      function J(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement
          ? e instanceof HTMLElement
          : e && (1 === e.nodeType || 11 === e.nodeType);
      }
      function K() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
          t = ["__proto__", "constructor", "prototype"];
        for (let s = 1; s < arguments.length; s += 1) {
          const n = s < 0 || arguments.length <= s ? void 0 : arguments[s];
          if (null != n && !J(n)) {
            const s = Object.keys(Object(n)).filter((e) => t.indexOf(e) < 0);
            for (let t = 0, i = s.length; t < i; t += 1) {
              const i = s[t],
                a = Object.getOwnPropertyDescriptor(n, i);
              void 0 !== a &&
                a.enumerable &&
                (U(e[i]) && U(n[i])
                  ? n[i].__swiper__
                    ? (e[i] = n[i])
                    : K(e[i], n[i])
                  : !U(e[i]) && U(n[i])
                  ? ((e[i] = {}),
                    n[i].__swiper__ ? (e[i] = n[i]) : K(e[i], n[i]))
                  : (e[i] = n[i]));
            }
          }
        }
        return e;
      }
      function Z(e, t, s) {
        e.style.setProperty(t, s);
      }
      function ee(e) {
        let { swiper: t, targetPosition: s, side: n } = e;
        const i = D(),
          a = -t.translate;
        let r,
          o = null;
        const l = t.params.speed;
        (t.wrapperEl.style.scrollSnapType = "none"),
          i.cancelAnimationFrame(t.cssModeFrameID);
        const c = s > a ? "next" : "prev",
          d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
          u = () => {
            (r = new Date().getTime()), null === o && (o = r);
            const e = Math.max(Math.min((r - o) / l, 1), 0),
              c = 0.5 - Math.cos(e * Math.PI) / 2;
            let p = a + c * (s - a);
            if ((d(p, s) && (p = s), t.wrapperEl.scrollTo({ [n]: p }), d(p, s)))
              return (
                (t.wrapperEl.style.overflow = "hidden"),
                (t.wrapperEl.style.scrollSnapType = ""),
                setTimeout(() => {
                  (t.wrapperEl.style.overflow = ""),
                    t.wrapperEl.scrollTo({ [n]: p });
                }),
                void i.cancelAnimationFrame(t.cssModeFrameID)
              );
            t.cssModeFrameID = i.requestAnimationFrame(u);
          };
        u();
      }
      let te, se, ne;
      function ie() {
        return (
          te ||
            (te = (function () {
              const e = D(),
                t = z();
              return {
                smoothScroll:
                  t.documentElement &&
                  "scrollBehavior" in t.documentElement.style,
                touch: !!(
                  "ontouchstart" in e ||
                  (e.DocumentTouch && t instanceof e.DocumentTouch)
                ),
                passiveListener: (function () {
                  let t = !1;
                  try {
                    const s = Object.defineProperty({}, "passive", {
                      get() {
                        t = !0;
                      },
                    });
                    e.addEventListener("testPassiveListener", null, s);
                  } catch (e) {}
                  return t;
                })(),
                gestures: "ongesturestart" in e,
              };
            })()),
          te
        );
      }
      function ae(e) {
        return (
          void 0 === e && (e = {}),
          se ||
            (se = (function (e) {
              let { userAgent: t } = void 0 === e ? {} : e;
              const s = ie(),
                n = D(),
                i = n.navigator.platform,
                a = t || n.navigator.userAgent,
                r = { ios: !1, android: !1 },
                o = n.screen.width,
                l = n.screen.height,
                c = a.match(/(Android);?[\s\/]+([\d.]+)?/);
              let d = a.match(/(iPad).*OS\s([\d_]+)/);
              const u = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                p = !d && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                h = "Win32" === i;
              let m = "MacIntel" === i;
              return (
                !d &&
                  m &&
                  s.touch &&
                  [
                    "1024x1366",
                    "1366x1024",
                    "834x1194",
                    "1194x834",
                    "834x1112",
                    "1112x834",
                    "768x1024",
                    "1024x768",
                    "820x1180",
                    "1180x820",
                    "810x1080",
                    "1080x810",
                  ].indexOf(`${o}x${l}`) >= 0 &&
                  ((d = a.match(/(Version)\/([\d.]+)/)),
                  d || (d = [0, 1, "13_0_0"]),
                  (m = !1)),
                c && !h && ((r.os = "android"), (r.android = !0)),
                (d || p || u) && ((r.os = "ios"), (r.ios = !0)),
                r
              );
            })(e)),
          se
        );
      }
      function re() {
        return (
          ne ||
            (ne = (function () {
              const e = D();
              return {
                isSafari: (function () {
                  const t = e.navigator.userAgent.toLowerCase();
                  return (
                    t.indexOf("safari") >= 0 &&
                    t.indexOf("chrome") < 0 &&
                    t.indexOf("android") < 0
                  );
                })(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                  e.navigator.userAgent
                ),
              };
            })()),
          ne
        );
      }
      const oe = {
        on(e, t, s) {
          const n = this;
          if ("function" != typeof t) return n;
          const i = s ? "unshift" : "push";
          return (
            e.split(" ").forEach((e) => {
              n.eventsListeners[e] || (n.eventsListeners[e] = []),
                n.eventsListeners[e][i](t);
            }),
            n
          );
        },
        once(e, t, s) {
          const n = this;
          if ("function" != typeof t) return n;
          function i() {
            n.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
            for (var s = arguments.length, a = new Array(s), r = 0; r < s; r++)
              a[r] = arguments[r];
            t.apply(n, a);
          }
          return (i.__emitterProxy = t), n.on(e, i, s);
        },
        onAny(e, t) {
          const s = this;
          if ("function" != typeof e) return s;
          const n = t ? "unshift" : "push";
          return (
            s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[n](e), s
          );
        },
        offAny(e) {
          const t = this;
          if (!t.eventsAnyListeners) return t;
          const s = t.eventsAnyListeners.indexOf(e);
          return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
        },
        off(e, t) {
          const s = this;
          return s.eventsListeners
            ? (e.split(" ").forEach((e) => {
                void 0 === t
                  ? (s.eventsListeners[e] = [])
                  : s.eventsListeners[e] &&
                    s.eventsListeners[e].forEach((n, i) => {
                      (n === t ||
                        (n.__emitterProxy && n.__emitterProxy === t)) &&
                        s.eventsListeners[e].splice(i, 1);
                    });
              }),
              s)
            : s;
        },
        emit() {
          const e = this;
          if (!e.eventsListeners) return e;
          let t, s, n;
          for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++)
            a[r] = arguments[r];
          "string" == typeof a[0] || Array.isArray(a[0])
            ? ((t = a[0]), (s = a.slice(1, a.length)), (n = e))
            : ((t = a[0].events), (s = a[0].data), (n = a[0].context || e)),
            s.unshift(n);
          return (
            (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
              e.eventsAnyListeners &&
                e.eventsAnyListeners.length &&
                e.eventsAnyListeners.forEach((e) => {
                  e.apply(n, [t, ...s]);
                }),
                e.eventsListeners &&
                  e.eventsListeners[t] &&
                  e.eventsListeners[t].forEach((e) => {
                    e.apply(n, s);
                  });
            }),
            e
          );
        },
      };
      const le = {
        updateSize: function () {
          const e = this;
          let t, s;
          const n = e.$el;
          (t =
            void 0 !== e.params.width && null !== e.params.width
              ? e.params.width
              : n[0].clientWidth),
            (s =
              void 0 !== e.params.height && null !== e.params.height
                ? e.params.height
                : n[0].clientHeight),
            (0 === t && e.isHorizontal()) ||
              (0 === s && e.isVertical()) ||
              ((t =
                t -
                parseInt(n.css("padding-left") || 0, 10) -
                parseInt(n.css("padding-right") || 0, 10)),
              (s =
                s -
                parseInt(n.css("padding-top") || 0, 10) -
                parseInt(n.css("padding-bottom") || 0, 10)),
              Number.isNaN(t) && (t = 0),
              Number.isNaN(s) && (s = 0),
              Object.assign(e, {
                width: t,
                height: s,
                size: e.isHorizontal() ? t : s,
              }));
        },
        updateSlides: function () {
          const e = this;
          function t(t) {
            return e.isHorizontal()
              ? t
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[t];
          }
          function s(e, s) {
            return parseFloat(e.getPropertyValue(t(s)) || 0);
          }
          const n = e.params,
            { $wrapperEl: i, size: a, rtlTranslate: r, wrongRTL: o } = e,
            l = e.virtual && n.virtual.enabled,
            c = l ? e.virtual.slides.length : e.slides.length,
            d = i.children(`.${e.params.slideClass}`),
            u = l ? e.virtual.slides.length : d.length;
          let p = [];
          const h = [],
            m = [];
          let f = n.slidesOffsetBefore;
          "function" == typeof f && (f = n.slidesOffsetBefore.call(e));
          let g = n.slidesOffsetAfter;
          "function" == typeof g && (g = n.slidesOffsetAfter.call(e));
          const v = e.snapGrid.length,
            y = e.slidesGrid.length;
          let b = n.spaceBetween,
            w = -f,
            S = 0,
            E = 0;
          if (void 0 === a) return;
          "string" == typeof b &&
            b.indexOf("%") >= 0 &&
            (b = (parseFloat(b.replace("%", "")) / 100) * a),
            (e.virtualSize = -b),
            r
              ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
              : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
            n.centeredSlides &&
              n.cssMode &&
              (Z(e.wrapperEl, "--swiper-centered-offset-before", ""),
              Z(e.wrapperEl, "--swiper-centered-offset-after", ""));
          const C = n.grid && n.grid.rows > 1 && e.grid;
          let T;
          C && e.grid.initSlides(u);
          const x =
            "auto" === n.slidesPerView &&
            n.breakpoints &&
            Object.keys(n.breakpoints).filter(
              (e) => void 0 !== n.breakpoints[e].slidesPerView
            ).length > 0;
          for (let i = 0; i < u; i += 1) {
            T = 0;
            const r = d.eq(i);
            if (
              (C && e.grid.updateSlide(i, r, u, t), "none" !== r.css("display"))
            ) {
              if ("auto" === n.slidesPerView) {
                x && (d[i].style[t("width")] = "");
                const a = getComputedStyle(r[0]),
                  o = r[0].style.transform,
                  l = r[0].style.webkitTransform;
                if (
                  (o && (r[0].style.transform = "none"),
                  l && (r[0].style.webkitTransform = "none"),
                  n.roundLengths)
                )
                  T = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
                else {
                  const e = s(a, "width"),
                    t = s(a, "padding-left"),
                    n = s(a, "padding-right"),
                    i = s(a, "margin-left"),
                    o = s(a, "margin-right"),
                    l = a.getPropertyValue("box-sizing");
                  if (l && "border-box" === l) T = e + i + o;
                  else {
                    const { clientWidth: s, offsetWidth: a } = r[0];
                    T = e + t + n + i + o + (a - s);
                  }
                }
                o && (r[0].style.transform = o),
                  l && (r[0].style.webkitTransform = l),
                  n.roundLengths && (T = Math.floor(T));
              } else
                (T = (a - (n.slidesPerView - 1) * b) / n.slidesPerView),
                  n.roundLengths && (T = Math.floor(T)),
                  d[i] && (d[i].style[t("width")] = `${T}px`);
              d[i] && (d[i].swiperSlideSize = T),
                m.push(T),
                n.centeredSlides
                  ? ((w = w + T / 2 + S / 2 + b),
                    0 === S && 0 !== i && (w = w - a / 2 - b),
                    0 === i && (w = w - a / 2 - b),
                    Math.abs(w) < 0.001 && (w = 0),
                    n.roundLengths && (w = Math.floor(w)),
                    E % n.slidesPerGroup == 0 && p.push(w),
                    h.push(w))
                  : (n.roundLengths && (w = Math.floor(w)),
                    (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                      e.params.slidesPerGroup ==
                      0 && p.push(w),
                    h.push(w),
                    (w = w + T + b)),
                (e.virtualSize += T + b),
                (S = T),
                (E += 1);
            }
          }
          if (
            ((e.virtualSize = Math.max(e.virtualSize, a) + g),
            r &&
              o &&
              ("slide" === n.effect || "coverflow" === n.effect) &&
              i.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
            n.setWrapperSize &&
              i.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
            C && e.grid.updateWrapperSize(T, p, t),
            !n.centeredSlides)
          ) {
            const t = [];
            for (let s = 0; s < p.length; s += 1) {
              let i = p[s];
              n.roundLengths && (i = Math.floor(i)),
                p[s] <= e.virtualSize - a && t.push(i);
            }
            (p = t),
              Math.floor(e.virtualSize - a) - Math.floor(p[p.length - 1]) > 1 &&
                p.push(e.virtualSize - a);
          }
          if ((0 === p.length && (p = [0]), 0 !== n.spaceBetween)) {
            const s = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
            d.filter((e, t) => !n.cssMode || t !== d.length - 1).css({
              [s]: `${b}px`,
            });
          }
          if (n.centeredSlides && n.centeredSlidesBounds) {
            let e = 0;
            m.forEach((t) => {
              e += t + (n.spaceBetween ? n.spaceBetween : 0);
            }),
              (e -= n.spaceBetween);
            const t = e - a;
            p = p.map((e) => (e < 0 ? -f : e > t ? t + g : e));
          }
          if (n.centerInsufficientSlides) {
            let e = 0;
            if (
              (m.forEach((t) => {
                e += t + (n.spaceBetween ? n.spaceBetween : 0);
              }),
              (e -= n.spaceBetween),
              e < a)
            ) {
              const t = (a - e) / 2;
              p.forEach((e, s) => {
                p[s] = e - t;
              }),
                h.forEach((e, s) => {
                  h[s] = e + t;
                });
            }
          }
          if (
            (Object.assign(e, {
              slides: d,
              snapGrid: p,
              slidesGrid: h,
              slidesSizesGrid: m,
            }),
            n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
          ) {
            Z(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
              Z(
                e.wrapperEl,
                "--swiper-centered-offset-after",
                e.size / 2 - m[m.length - 1] / 2 + "px"
              );
            const t = -e.snapGrid[0],
              s = -e.slidesGrid[0];
            (e.snapGrid = e.snapGrid.map((e) => e + t)),
              (e.slidesGrid = e.slidesGrid.map((e) => e + s));
          }
          if (
            (u !== c && e.emit("slidesLengthChange"),
            p.length !== v &&
              (e.params.watchOverflow && e.checkOverflow(),
              e.emit("snapGridLengthChange")),
            h.length !== y && e.emit("slidesGridLengthChange"),
            n.watchSlidesProgress && e.updateSlidesOffset(),
            !(l || n.cssMode || ("slide" !== n.effect && "fade" !== n.effect)))
          ) {
            const t = `${n.containerModifierClass}backface-hidden`,
              s = e.$el.hasClass(t);
            u <= n.maxBackfaceHiddenSlides
              ? s || e.$el.addClass(t)
              : s && e.$el.removeClass(t);
          }
        },
        updateAutoHeight: function (e) {
          const t = this,
            s = [],
            n = t.virtual && t.params.virtual.enabled;
          let i,
            a = 0;
          "number" == typeof e
            ? t.setTransition(e)
            : !0 === e && t.setTransition(t.params.speed);
          const r = (e) =>
            n
              ? t.slides.filter(
                  (t) =>
                    parseInt(t.getAttribute("data-swiper-slide-index"), 10) ===
                    e
                )[0]
              : t.slides.eq(e)[0];
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            if (t.params.centeredSlides)
              t.visibleSlides.each((e) => {
                s.push(e);
              });
            else
              for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                const e = t.activeIndex + i;
                if (e > t.slides.length && !n) break;
                s.push(r(e));
              }
          else s.push(r(t.activeIndex));
          for (i = 0; i < s.length; i += 1)
            if (void 0 !== s[i]) {
              const e = s[i].offsetHeight;
              a = e > a ? e : a;
            }
          (a || 0 === a) && t.$wrapperEl.css("height", `${a}px`);
        },
        updateSlidesOffset: function () {
          const e = this,
            t = e.slides;
          for (let s = 0; s < t.length; s += 1)
            t[s].swiperSlideOffset = e.isHorizontal()
              ? t[s].offsetLeft
              : t[s].offsetTop;
        },
        updateSlidesProgress: function (e) {
          void 0 === e && (e = (this && this.translate) || 0);
          const t = this,
            s = t.params,
            { slides: n, rtlTranslate: i, snapGrid: a } = t;
          if (0 === n.length) return;
          void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
          let r = -e;
          i && (r = e),
            n.removeClass(s.slideVisibleClass),
            (t.visibleSlidesIndexes = []),
            (t.visibleSlides = []);
          for (let e = 0; e < n.length; e += 1) {
            const o = n[e];
            let l = o.swiperSlideOffset;
            s.cssMode && s.centeredSlides && (l -= n[0].swiperSlideOffset);
            const c =
                (r + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                (o.swiperSlideSize + s.spaceBetween),
              d =
                (r - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                (o.swiperSlideSize + s.spaceBetween),
              u = -(r - l),
              p = u + t.slidesSizesGrid[e];
            ((u >= 0 && u < t.size - 1) ||
              (p > 1 && p <= t.size) ||
              (u <= 0 && p >= t.size)) &&
              (t.visibleSlides.push(o),
              t.visibleSlidesIndexes.push(e),
              n.eq(e).addClass(s.slideVisibleClass)),
              (o.progress = i ? -c : c),
              (o.originalProgress = i ? -d : d);
          }
          t.visibleSlides = V(t.visibleSlides);
        },
        updateProgress: function (e) {
          const t = this;
          if (void 0 === e) {
            const s = t.rtlTranslate ? -1 : 1;
            e = (t && t.translate && t.translate * s) || 0;
          }
          const s = t.params,
            n = t.maxTranslate() - t.minTranslate();
          let { progress: i, isBeginning: a, isEnd: r } = t;
          const o = a,
            l = r;
          0 === n
            ? ((i = 0), (a = !0), (r = !0))
            : ((i = (e - t.minTranslate()) / n), (a = i <= 0), (r = i >= 1)),
            Object.assign(t, { progress: i, isBeginning: a, isEnd: r }),
            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
              t.updateSlidesProgress(e),
            a && !o && t.emit("reachBeginning toEdge"),
            r && !l && t.emit("reachEnd toEdge"),
            ((o && !a) || (l && !r)) && t.emit("fromEdge"),
            t.emit("progress", i);
        },
        updateSlidesClasses: function () {
          const e = this,
            {
              slides: t,
              params: s,
              $wrapperEl: n,
              activeIndex: i,
              realIndex: a,
            } = e,
            r = e.virtual && s.virtual.enabled;
          let o;
          t.removeClass(
            `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
          ),
            (o = r
              ? e.$wrapperEl.find(
                  `.${s.slideClass}[data-swiper-slide-index="${i}"]`
                )
              : t.eq(i)),
            o.addClass(s.slideActiveClass),
            s.loop &&
              (o.hasClass(s.slideDuplicateClass)
                ? n
                    .children(
                      `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${a}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass)
                : n
                    .children(
                      `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${a}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass));
          let l = o
            .nextAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slideNextClass);
          s.loop &&
            0 === l.length &&
            ((l = t.eq(0)), l.addClass(s.slideNextClass));
          let c = o
            .prevAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slidePrevClass);
          s.loop &&
            0 === c.length &&
            ((c = t.eq(-1)), c.addClass(s.slidePrevClass)),
            s.loop &&
              (l.hasClass(s.slideDuplicateClass)
                ? n
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass)
                : n
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass),
              c.hasClass(s.slideDuplicateClass)
                ? n
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${c.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)
                : n
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${c.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)),
            e.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
          const t = this,
            s = t.rtlTranslate ? t.translate : -t.translate,
            {
              slidesGrid: n,
              snapGrid: i,
              params: a,
              activeIndex: r,
              realIndex: o,
              snapIndex: l,
            } = t;
          let c,
            d = e;
          if (void 0 === d) {
            for (let e = 0; e < n.length; e += 1)
              void 0 !== n[e + 1]
                ? s >= n[e] && s < n[e + 1] - (n[e + 1] - n[e]) / 2
                  ? (d = e)
                  : s >= n[e] && s < n[e + 1] && (d = e + 1)
                : s >= n[e] && (d = e);
            a.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
          }
          if (i.indexOf(s) >= 0) c = i.indexOf(s);
          else {
            const e = Math.min(a.slidesPerGroupSkip, d);
            c = e + Math.floor((d - e) / a.slidesPerGroup);
          }
          if ((c >= i.length && (c = i.length - 1), d === r))
            return void (
              c !== l && ((t.snapIndex = c), t.emit("snapIndexChange"))
            );
          const u = parseInt(
            t.slides.eq(d).attr("data-swiper-slide-index") || d,
            10
          );
          Object.assign(t, {
            snapIndex: c,
            realIndex: u,
            previousIndex: r,
            activeIndex: d,
          }),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            o !== u && t.emit("realIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) &&
              t.emit("slideChange");
        },
        updateClickedSlide: function (e) {
          const t = this,
            s = t.params,
            n = V(e).closest(`.${s.slideClass}`)[0];
          let i,
            a = !1;
          if (n)
            for (let e = 0; e < t.slides.length; e += 1)
              if (t.slides[e] === n) {
                (a = !0), (i = e);
                break;
              }
          if (!n || !a)
            return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
          (t.clickedSlide = n),
            t.virtual && t.params.virtual.enabled
              ? (t.clickedIndex = parseInt(
                  V(n).attr("data-swiper-slide-index"),
                  10
                ))
              : (t.clickedIndex = i),
            s.slideToClickedSlide &&
              void 0 !== t.clickedIndex &&
              t.clickedIndex !== t.activeIndex &&
              t.slideToClickedSlide();
        },
      };
      const ce = {
        getTranslate: function (e) {
          void 0 === e && (e = this.isHorizontal() ? "x" : "y");
          const {
            params: t,
            rtlTranslate: s,
            translate: n,
            $wrapperEl: i,
          } = this;
          if (t.virtualTranslate) return s ? -n : n;
          if (t.cssMode) return n;
          let a = Q(i[0], e);
          return s && (a = -a), a || 0;
        },
        setTranslate: function (e, t) {
          const s = this,
            {
              rtlTranslate: n,
              params: i,
              $wrapperEl: a,
              wrapperEl: r,
              progress: o,
            } = s;
          let l,
            c = 0,
            d = 0;
          s.isHorizontal() ? (c = n ? -e : e) : (d = e),
            i.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
            i.cssMode
              ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  s.isHorizontal() ? -c : -d)
              : i.virtualTranslate ||
                a.transform(`translate3d(${c}px, ${d}px, 0px)`),
            (s.previousTranslate = s.translate),
            (s.translate = s.isHorizontal() ? c : d);
          const u = s.maxTranslate() - s.minTranslate();
          (l = 0 === u ? 0 : (e - s.minTranslate()) / u),
            l !== o && s.updateProgress(e),
            s.emit("setTranslate", s.translate, t);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e, t, s, n, i) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === n && (n = !0);
          const a = this,
            { params: r, wrapperEl: o } = a;
          if (a.animating && r.preventInteractionOnTransition) return !1;
          const l = a.minTranslate(),
            c = a.maxTranslate();
          let d;
          if (
            ((d = n && e > l ? l : n && e < c ? c : e),
            a.updateProgress(d),
            r.cssMode)
          ) {
            const e = a.isHorizontal();
            if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -d;
            else {
              if (!a.support.smoothScroll)
                return (
                  ee({
                    swiper: a,
                    targetPosition: -d,
                    side: e ? "left" : "top",
                  }),
                  !0
                );
              o.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === t
              ? (a.setTransition(0),
                a.setTranslate(d),
                s &&
                  (a.emit("beforeTransitionStart", t, i),
                  a.emit("transitionEnd")))
              : (a.setTransition(t),
                a.setTranslate(d),
                s &&
                  (a.emit("beforeTransitionStart", t, i),
                  a.emit("transitionStart")),
                a.animating ||
                  ((a.animating = !0),
                  a.onTranslateToWrapperTransitionEnd ||
                    (a.onTranslateToWrapperTransitionEnd = function (e) {
                      a &&
                        !a.destroyed &&
                        e.target === this &&
                        (a.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          a.onTranslateToWrapperTransitionEnd
                        ),
                        a.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          a.onTranslateToWrapperTransitionEnd
                        ),
                        (a.onTranslateToWrapperTransitionEnd = null),
                        delete a.onTranslateToWrapperTransitionEnd,
                        s && a.emit("transitionEnd"));
                    }),
                  a.$wrapperEl[0].addEventListener(
                    "transitionend",
                    a.onTranslateToWrapperTransitionEnd
                  ),
                  a.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    a.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      };
      function de(e) {
        let { swiper: t, runCallbacks: s, direction: n, step: i } = e;
        const { activeIndex: a, previousIndex: r } = t;
        let o = n;
        if (
          (o || (o = a > r ? "next" : a < r ? "prev" : "reset"),
          t.emit(`transition${i}`),
          s && a !== r)
        ) {
          if ("reset" === o) return void t.emit(`slideResetTransition${i}`);
          t.emit(`slideChangeTransition${i}`),
            "next" === o
              ? t.emit(`slideNextTransition${i}`)
              : t.emit(`slidePrevTransition${i}`);
        }
      }
      const ue = {
        slideTo: function (e, t, s, n, i) {
          if (
            (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "number" != typeof e && "string" != typeof e)
          )
            throw new Error(
              `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
            );
          if ("string" == typeof e) {
            const t = parseInt(e, 10);
            if (!isFinite(t))
              throw new Error(
                `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
              );
            e = t;
          }
          const a = this;
          let r = e;
          r < 0 && (r = 0);
          const {
            params: o,
            snapGrid: l,
            slidesGrid: c,
            previousIndex: d,
            activeIndex: u,
            rtlTranslate: p,
            wrapperEl: h,
            enabled: m,
          } = a;
          if (
            (a.animating && o.preventInteractionOnTransition) ||
            (!m && !n && !i)
          )
            return !1;
          const f = Math.min(a.params.slidesPerGroupSkip, r);
          let g = f + Math.floor((r - f) / a.params.slidesPerGroup);
          g >= l.length && (g = l.length - 1),
            (u || o.initialSlide || 0) === (d || 0) &&
              s &&
              a.emit("beforeSlideChangeStart");
          const v = -l[g];
          if ((a.updateProgress(v), o.normalizeSlideIndex))
            for (let e = 0; e < c.length; e += 1) {
              const t = -Math.floor(100 * v),
                s = Math.floor(100 * c[e]),
                n = Math.floor(100 * c[e + 1]);
              void 0 !== c[e + 1]
                ? t >= s && t < n - (n - s) / 2
                  ? (r = e)
                  : t >= s && t < n && (r = e + 1)
                : t >= s && (r = e);
            }
          if (a.initialized && r !== u) {
            if (!a.allowSlideNext && v < a.translate && v < a.minTranslate())
              return !1;
            if (
              !a.allowSlidePrev &&
              v > a.translate &&
              v > a.maxTranslate() &&
              (u || 0) !== r
            )
              return !1;
          }
          let y;
          if (
            ((y = r > u ? "next" : r < u ? "prev" : "reset"),
            (p && -v === a.translate) || (!p && v === a.translate))
          )
            return (
              a.updateActiveIndex(r),
              o.autoHeight && a.updateAutoHeight(),
              a.updateSlidesClasses(),
              "slide" !== o.effect && a.setTranslate(v),
              "reset" !== y && (a.transitionStart(s, y), a.transitionEnd(s, y)),
              !1
            );
          if (o.cssMode) {
            const e = a.isHorizontal(),
              s = p ? v : -v;
            if (0 === t) {
              const t = a.virtual && a.params.virtual.enabled;
              t &&
                ((a.wrapperEl.style.scrollSnapType = "none"),
                (a._immediateVirtual = !0)),
                (h[e ? "scrollLeft" : "scrollTop"] = s),
                t &&
                  requestAnimationFrame(() => {
                    (a.wrapperEl.style.scrollSnapType = ""),
                      (a._swiperImmediateVirtual = !1);
                  });
            } else {
              if (!a.support.smoothScroll)
                return (
                  ee({
                    swiper: a,
                    targetPosition: s,
                    side: e ? "left" : "top",
                  }),
                  !0
                );
              h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
            }
            return !0;
          }
          return (
            a.setTransition(t),
            a.setTranslate(v),
            a.updateActiveIndex(r),
            a.updateSlidesClasses(),
            a.emit("beforeTransitionStart", t, n),
            a.transitionStart(s, y),
            0 === t
              ? a.transitionEnd(s, y)
              : a.animating ||
                ((a.animating = !0),
                a.onSlideToWrapperTransitionEnd ||
                  (a.onSlideToWrapperTransitionEnd = function (e) {
                    a &&
                      !a.destroyed &&
                      e.target === this &&
                      (a.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        a.onSlideToWrapperTransitionEnd
                      ),
                      a.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        a.onSlideToWrapperTransitionEnd
                      ),
                      (a.onSlideToWrapperTransitionEnd = null),
                      delete a.onSlideToWrapperTransitionEnd,
                      a.transitionEnd(s, y));
                  }),
                a.$wrapperEl[0].addEventListener(
                  "transitionend",
                  a.onSlideToWrapperTransitionEnd
                ),
                a.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  a.onSlideToWrapperTransitionEnd
                )),
            !0
          );
        },
        slideToLoop: function (e, t, s, n) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0);
          const i = this;
          let a = e;
          return i.params.loop && (a += i.loopedSlides), i.slideTo(a, t, s, n);
        },
        slideNext: function (e, t, s) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          const n = this,
            { animating: i, enabled: a, params: r } = n;
          if (!a) return n;
          let o = r.slidesPerGroup;
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            (o = Math.max(n.slidesPerViewDynamic("current", !0), 1));
          const l = n.activeIndex < r.slidesPerGroupSkip ? 1 : o;
          if (r.loop) {
            if (i && r.loopPreventsSlide) return !1;
            n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
          }
          return r.rewind && n.isEnd
            ? n.slideTo(0, e, t, s)
            : n.slideTo(n.activeIndex + l, e, t, s);
        },
        slidePrev: function (e, t, s) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          const n = this,
            {
              params: i,
              animating: a,
              snapGrid: r,
              slidesGrid: o,
              rtlTranslate: l,
              enabled: c,
            } = n;
          if (!c) return n;
          if (i.loop) {
            if (a && i.loopPreventsSlide) return !1;
            n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
          }
          function d(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          const u = d(l ? n.translate : -n.translate),
            p = r.map((e) => d(e));
          let h = r[p.indexOf(u) - 1];
          if (void 0 === h && i.cssMode) {
            let e;
            r.forEach((t, s) => {
              u >= t && (e = s);
            }),
              void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
          }
          let m = 0;
          if (
            (void 0 !== h &&
              ((m = o.indexOf(h)),
              m < 0 && (m = n.activeIndex - 1),
              "auto" === i.slidesPerView &&
                1 === i.slidesPerGroup &&
                i.slidesPerGroupAuto &&
                ((m = m - n.slidesPerViewDynamic("previous", !0) + 1),
                (m = Math.max(m, 0)))),
            i.rewind && n.isBeginning)
          ) {
            const i =
              n.params.virtual && n.params.virtual.enabled && n.virtual
                ? n.virtual.slides.length - 1
                : n.slides.length - 1;
            return n.slideTo(i, e, t, s);
          }
          return n.slideTo(m, e, t, s);
        },
        slideReset: function (e, t, s) {
          return (
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, s)
          );
        },
        slideToClosest: function (e, t, s, n) {
          void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === n && (n = 0.5);
          const i = this;
          let a = i.activeIndex;
          const r = Math.min(i.params.slidesPerGroupSkip, a),
            o = r + Math.floor((a - r) / i.params.slidesPerGroup),
            l = i.rtlTranslate ? i.translate : -i.translate;
          if (l >= i.snapGrid[o]) {
            const e = i.snapGrid[o];
            l - e > (i.snapGrid[o + 1] - e) * n &&
              (a += i.params.slidesPerGroup);
          } else {
            const e = i.snapGrid[o - 1];
            l - e <= (i.snapGrid[o] - e) * n && (a -= i.params.slidesPerGroup);
          }
          return (
            (a = Math.max(a, 0)),
            (a = Math.min(a, i.slidesGrid.length - 1)),
            i.slideTo(a, e, t, s)
          );
        },
        slideToClickedSlide: function () {
          const e = this,
            { params: t, $wrapperEl: s } = e,
            n =
              "auto" === t.slidesPerView
                ? e.slidesPerViewDynamic()
                : t.slidesPerView;
          let i,
            a = e.clickedIndex;
          if (t.loop) {
            if (e.animating) return;
            (i = parseInt(
              V(e.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              t.centeredSlides
                ? a < e.loopedSlides - n / 2 ||
                  a > e.slides.length - e.loopedSlides + n / 2
                  ? (e.loopFix(),
                    (a = s
                      .children(
                        `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    Y(() => {
                      e.slideTo(a);
                    }))
                  : e.slideTo(a)
                : a > e.slides.length - n
                ? (e.loopFix(),
                  (a = s
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  Y(() => {
                    e.slideTo(a);
                  }))
                : e.slideTo(a);
          } else e.slideTo(a);
        },
      };
      const pe = {
        loopCreate: function () {
          const e = this,
            t = z(),
            { params: s, $wrapperEl: n } = e,
            i = n.children().length > 0 ? V(n.children()[0].parentNode) : n;
          i.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
          let a = i.children(`.${s.slideClass}`);
          if (s.loopFillGroupWithBlank) {
            const e = s.slidesPerGroup - (a.length % s.slidesPerGroup);
            if (e !== s.slidesPerGroup) {
              for (let n = 0; n < e; n += 1) {
                const e = V(t.createElement("div")).addClass(
                  `${s.slideClass} ${s.slideBlankClass}`
                );
                i.append(e);
              }
              a = i.children(`.${s.slideClass}`);
            }
          }
          "auto" !== s.slidesPerView ||
            s.loopedSlides ||
            (s.loopedSlides = a.length),
            (e.loopedSlides = Math.ceil(
              parseFloat(s.loopedSlides || s.slidesPerView, 10)
            )),
            (e.loopedSlides += s.loopAdditionalSlides),
            e.loopedSlides > a.length && (e.loopedSlides = a.length);
          const r = [],
            o = [];
          a.each((t, s) => {
            const n = V(t);
            s < e.loopedSlides && o.push(t),
              s < a.length && s >= a.length - e.loopedSlides && r.push(t),
              n.attr("data-swiper-slide-index", s);
          });
          for (let e = 0; e < o.length; e += 1)
            i.append(V(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
          for (let e = r.length - 1; e >= 0; e -= 1)
            i.prepend(V(r[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
        },
        loopFix: function () {
          const e = this;
          e.emit("beforeLoopFix");
          const {
            activeIndex: t,
            slides: s,
            loopedSlides: n,
            allowSlidePrev: i,
            allowSlideNext: a,
            snapGrid: r,
            rtlTranslate: o,
          } = e;
          let l;
          (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
          const c = -r[t] - e.getTranslate();
          if (t < n) {
            (l = s.length - 3 * n + t), (l += n);
            e.slideTo(l, 0, !1, !0) &&
              0 !== c &&
              e.setTranslate((o ? -e.translate : e.translate) - c);
          } else if (t >= s.length - n) {
            (l = -s.length + t + n), (l += n);
            e.slideTo(l, 0, !1, !0) &&
              0 !== c &&
              e.setTranslate((o ? -e.translate : e.translate) - c);
          }
          (e.allowSlidePrev = i), (e.allowSlideNext = a), e.emit("loopFix");
        },
        loopDestroy: function () {
          const { $wrapperEl: e, params: t, slides: s } = this;
          e
            .children(
              `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
            )
            .remove(),
            s.removeAttr("data-swiper-slide-index");
        },
      };
      function he(e) {
        const t = this,
          s = z(),
          n = D(),
          i = t.touchEventsData,
          { params: a, touches: r, enabled: o } = t;
        if (!o) return;
        if (t.animating && a.preventInteractionOnTransition) return;
        !t.animating && a.cssMode && a.loop && t.loopFix();
        let l = e;
        l.originalEvent && (l = l.originalEvent);
        let c = V(l.target);
        if ("wrapper" === a.touchEventsTarget && !c.closest(t.wrapperEl).length)
          return;
        if (
          ((i.isTouchEvent = "touchstart" === l.type),
          !i.isTouchEvent && "which" in l && 3 === l.which)
        )
          return;
        if (!i.isTouchEvent && "button" in l && l.button > 0) return;
        if (i.isTouched && i.isMoved) return;
        !!a.noSwipingClass &&
          "" !== a.noSwipingClass &&
          l.target &&
          l.target.shadowRoot &&
          e.path &&
          e.path[0] &&
          (c = V(e.path[0]));
        const d = a.noSwipingSelector
            ? a.noSwipingSelector
            : `.${a.noSwipingClass}`,
          u = !(!l.target || !l.target.shadowRoot);
        if (
          a.noSwiping &&
          (u
            ? (function (e, t) {
                return (
                  void 0 === t && (t = this),
                  (function t(s) {
                    return s && s !== z() && s !== D()
                      ? (s.assignedSlot && (s = s.assignedSlot),
                        s.closest(e) || t(s.getRootNode().host))
                      : null;
                  })(t)
                );
              })(d, l.target)
            : c.closest(d)[0])
        )
          return void (t.allowClick = !0);
        if (a.swipeHandler && !c.closest(a.swipeHandler)[0]) return;
        (r.currentX =
          "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
          (r.currentY =
            "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
        const p = r.currentX,
          h = r.currentY,
          m = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
          f = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
        if (m && (p <= f || p >= n.innerWidth - f)) {
          if ("prevent" !== m) return;
          e.preventDefault();
        }
        if (
          (Object.assign(i, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
          }),
          (r.startX = p),
          (r.startY = h),
          (i.touchStartTime = X()),
          (t.allowClick = !0),
          t.updateSize(),
          (t.swipeDirection = void 0),
          a.threshold > 0 && (i.allowThresholdMove = !1),
          "touchstart" !== l.type)
        ) {
          let e = !0;
          c.is(i.focusableElements) &&
            ((e = !1), "SELECT" === c[0].nodeName && (i.isTouched = !1)),
            s.activeElement &&
              V(s.activeElement).is(i.focusableElements) &&
              s.activeElement !== c[0] &&
              s.activeElement.blur();
          const n = e && t.allowTouchMove && a.touchStartPreventDefault;
          (!a.touchStartForcePreventDefault && !n) ||
            c[0].isContentEditable ||
            l.preventDefault();
        }
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !a.cssMode &&
          t.freeMode.onTouchStart(),
          t.emit("touchStart", l);
      }
      function me(e) {
        const t = z(),
          s = this,
          n = s.touchEventsData,
          { params: i, touches: a, rtlTranslate: r, enabled: o } = s;
        if (!o) return;
        let l = e;
        if ((l.originalEvent && (l = l.originalEvent), !n.isTouched))
          return void (
            n.startMoving &&
            n.isScrolling &&
            s.emit("touchMoveOpposite", l)
          );
        if (n.isTouchEvent && "touchmove" !== l.type) return;
        const c =
            "touchmove" === l.type &&
            l.targetTouches &&
            (l.targetTouches[0] || l.changedTouches[0]),
          d = "touchmove" === l.type ? c.pageX : l.pageX,
          u = "touchmove" === l.type ? c.pageY : l.pageY;
        if (l.preventedByNestedSwiper)
          return (a.startX = d), void (a.startY = u);
        if (!s.allowTouchMove)
          return (
            V(l.target).is(n.focusableElements) || (s.allowClick = !1),
            void (
              n.isTouched &&
              (Object.assign(a, {
                startX: d,
                startY: u,
                currentX: d,
                currentY: u,
              }),
              (n.touchStartTime = X()))
            )
          );
        if (n.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
          if (s.isVertical()) {
            if (
              (u < a.startY && s.translate <= s.maxTranslate()) ||
              (u > a.startY && s.translate >= s.minTranslate())
            )
              return (n.isTouched = !1), void (n.isMoved = !1);
          } else if (
            (d < a.startX && s.translate <= s.maxTranslate()) ||
            (d > a.startX && s.translate >= s.minTranslate())
          )
            return;
        if (
          n.isTouchEvent &&
          t.activeElement &&
          l.target === t.activeElement &&
          V(l.target).is(n.focusableElements)
        )
          return (n.isMoved = !0), void (s.allowClick = !1);
        if (
          (n.allowTouchCallbacks && s.emit("touchMove", l),
          l.targetTouches && l.targetTouches.length > 1)
        )
          return;
        (a.currentX = d), (a.currentY = u);
        const p = a.currentX - a.startX,
          h = a.currentY - a.startY;
        if (
          s.params.threshold &&
          Math.sqrt(p ** 2 + h ** 2) < s.params.threshold
        )
          return;
        if (void 0 === n.isScrolling) {
          let e;
          (s.isHorizontal() && a.currentY === a.startY) ||
          (s.isVertical() && a.currentX === a.startX)
            ? (n.isScrolling = !1)
            : p * p + h * h >= 25 &&
              ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
              (n.isScrolling = s.isHorizontal()
                ? e > i.touchAngle
                : 90 - e > i.touchAngle));
        }
        if (
          (n.isScrolling && s.emit("touchMoveOpposite", l),
          void 0 === n.startMoving &&
            ((a.currentX === a.startX && a.currentY === a.startY) ||
              (n.startMoving = !0)),
          n.isScrolling)
        )
          return void (n.isTouched = !1);
        if (!n.startMoving) return;
        (s.allowClick = !1),
          !i.cssMode && l.cancelable && l.preventDefault(),
          i.touchMoveStopPropagation && !i.nested && l.stopPropagation(),
          n.isMoved ||
            (i.loop && !i.cssMode && s.loopFix(),
            (n.startTranslate = s.getTranslate()),
            s.setTransition(0),
            s.animating &&
              s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (n.allowMomentumBounce = !1),
            !i.grabCursor ||
              (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
              s.setGrabCursor(!0),
            s.emit("sliderFirstMove", l)),
          s.emit("sliderMove", l),
          (n.isMoved = !0);
        let m = s.isHorizontal() ? p : h;
        (a.diff = m),
          (m *= i.touchRatio),
          r && (m = -m),
          (s.swipeDirection = m > 0 ? "prev" : "next"),
          (n.currentTranslate = m + n.startTranslate);
        let f = !0,
          g = i.resistanceRatio;
        if (
          (i.touchReleaseOnEdges && (g = 0),
          m > 0 && n.currentTranslate > s.minTranslate()
            ? ((f = !1),
              i.resistance &&
                (n.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + n.startTranslate + m) ** g))
            : m < 0 &&
              n.currentTranslate < s.maxTranslate() &&
              ((f = !1),
              i.resistance &&
                (n.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - n.startTranslate - m) ** g)),
          f && (l.preventedByNestedSwiper = !0),
          !s.allowSlideNext &&
            "next" === s.swipeDirection &&
            n.currentTranslate < n.startTranslate &&
            (n.currentTranslate = n.startTranslate),
          !s.allowSlidePrev &&
            "prev" === s.swipeDirection &&
            n.currentTranslate > n.startTranslate &&
            (n.currentTranslate = n.startTranslate),
          s.allowSlidePrev ||
            s.allowSlideNext ||
            (n.currentTranslate = n.startTranslate),
          i.threshold > 0)
        ) {
          if (!(Math.abs(m) > i.threshold || n.allowThresholdMove))
            return void (n.currentTranslate = n.startTranslate);
          if (!n.allowThresholdMove)
            return (
              (n.allowThresholdMove = !0),
              (a.startX = a.currentX),
              (a.startY = a.currentY),
              (n.currentTranslate = n.startTranslate),
              void (a.diff = s.isHorizontal()
                ? a.currentX - a.startX
                : a.currentY - a.startY)
            );
        }
        i.followFinger &&
          !i.cssMode &&
          (((i.freeMode && i.freeMode.enabled && s.freeMode) ||
            i.watchSlidesProgress) &&
            (s.updateActiveIndex(), s.updateSlidesClasses()),
          s.params.freeMode &&
            i.freeMode.enabled &&
            s.freeMode &&
            s.freeMode.onTouchMove(),
          s.updateProgress(n.currentTranslate),
          s.setTranslate(n.currentTranslate));
      }
      function fe(e) {
        const t = this,
          s = t.touchEventsData,
          {
            params: n,
            touches: i,
            rtlTranslate: a,
            slidesGrid: r,
            enabled: o,
          } = t;
        if (!o) return;
        let l = e;
        if (
          (l.originalEvent && (l = l.originalEvent),
          s.allowTouchCallbacks && t.emit("touchEnd", l),
          (s.allowTouchCallbacks = !1),
          !s.isTouched)
        )
          return (
            s.isMoved && n.grabCursor && t.setGrabCursor(!1),
            (s.isMoved = !1),
            void (s.startMoving = !1)
          );
        n.grabCursor &&
          s.isMoved &&
          s.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        const c = X(),
          d = c - s.touchStartTime;
        if (t.allowClick) {
          const e = l.path || (l.composedPath && l.composedPath());
          t.updateClickedSlide((e && e[0]) || l.target),
            t.emit("tap click", l),
            d < 300 &&
              c - s.lastClickTime < 300 &&
              t.emit("doubleTap doubleClick", l);
        }
        if (
          ((s.lastClickTime = X()),
          Y(() => {
            t.destroyed || (t.allowClick = !0);
          }),
          !s.isTouched ||
            !s.isMoved ||
            !t.swipeDirection ||
            0 === i.diff ||
            s.currentTranslate === s.startTranslate)
        )
          return (
            (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1)
          );
        let u;
        if (
          ((s.isTouched = !1),
          (s.isMoved = !1),
          (s.startMoving = !1),
          (u = n.followFinger
            ? a
              ? t.translate
              : -t.translate
            : -s.currentTranslate),
          n.cssMode)
        )
          return;
        if (t.params.freeMode && n.freeMode.enabled)
          return void t.freeMode.onTouchEnd({ currentPos: u });
        let p = 0,
          h = t.slidesSizesGrid[0];
        for (
          let e = 0;
          e < r.length;
          e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
        ) {
          const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
          void 0 !== r[e + t]
            ? u >= r[e] && u < r[e + t] && ((p = e), (h = r[e + t] - r[e]))
            : u >= r[e] && ((p = e), (h = r[r.length - 1] - r[r.length - 2]));
        }
        let m = null,
          f = null;
        n.rewind &&
          (t.isBeginning
            ? (f =
                t.params.virtual && t.params.virtual.enabled && t.virtual
                  ? t.virtual.slides.length - 1
                  : t.slides.length - 1)
            : t.isEnd && (m = 0));
        const g = (u - r[p]) / h,
          v = p < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        if (d > n.longSwipesMs) {
          if (!n.longSwipes) return void t.slideTo(t.activeIndex);
          "next" === t.swipeDirection &&
            (g >= n.longSwipesRatio
              ? t.slideTo(n.rewind && t.isEnd ? m : p + v)
              : t.slideTo(p)),
            "prev" === t.swipeDirection &&
              (g > 1 - n.longSwipesRatio
                ? t.slideTo(p + v)
                : null !== f && g < 0 && Math.abs(g) > n.longSwipesRatio
                ? t.slideTo(f)
                : t.slideTo(p));
        } else {
          if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
          t.navigation &&
          (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
            ? l.target === t.navigation.nextEl
              ? t.slideTo(p + v)
              : t.slideTo(p)
            : ("next" === t.swipeDirection && t.slideTo(null !== m ? m : p + v),
              "prev" === t.swipeDirection && t.slideTo(null !== f ? f : p));
        }
      }
      function ge() {
        const e = this,
          { params: t, el: s } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: n, allowSlidePrev: i, snapGrid: a } = e;
        (e.allowSlideNext = !0),
          (e.allowSlidePrev = !0),
          e.updateSize(),
          e.updateSlides(),
          e.updateSlidesClasses(),
          ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
          e.isEnd &&
          !e.isBeginning &&
          !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0),
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.run(),
          (e.allowSlidePrev = i),
          (e.allowSlideNext = n),
          e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
      }
      function ve(e) {
        const t = this;
        t.enabled &&
          (t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation &&
              t.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation())));
      }
      function ye() {
        const e = this,
          { wrapperEl: t, rtlTranslate: s, enabled: n } = e;
        if (!n) return;
        let i;
        (e.previousTranslate = e.translate),
          e.isHorizontal()
            ? (e.translate = -t.scrollLeft)
            : (e.translate = -t.scrollTop),
          -0 === e.translate && (e.translate = 0),
          e.updateActiveIndex(),
          e.updateSlidesClasses();
        const a = e.maxTranslate() - e.minTranslate();
        (i = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
          i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
          e.emit("setTranslate", e.translate, !1);
      }
      let be = !1;
      function we() {}
      const Se = (e, t) => {
        const s = z(),
          {
            params: n,
            touchEvents: i,
            el: a,
            wrapperEl: r,
            device: o,
            support: l,
          } = e,
          c = !!n.nested,
          d = "on" === t ? "addEventListener" : "removeEventListener",
          u = t;
        if (l.touch) {
          const t = !(
            "touchstart" !== i.start ||
            !l.passiveListener ||
            !n.passiveListeners
          ) && { passive: !0, capture: !1 };
          a[d](i.start, e.onTouchStart, t),
            a[d](
              i.move,
              e.onTouchMove,
              l.passiveListener ? { passive: !1, capture: c } : c
            ),
            a[d](i.end, e.onTouchEnd, t),
            i.cancel && a[d](i.cancel, e.onTouchEnd, t);
        } else
          a[d](i.start, e.onTouchStart, !1),
            s[d](i.move, e.onTouchMove, c),
            s[d](i.end, e.onTouchEnd, !1);
        (n.preventClicks || n.preventClicksPropagation) &&
          a[d]("click", e.onClick, !0),
          n.cssMode && r[d]("scroll", e.onScroll),
          n.updateOnWindowResize
            ? e[u](
                o.ios || o.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                ge,
                !0
              )
            : e[u]("observerUpdate", ge, !0);
      };
      const Ee = {
          attachEvents: function () {
            const e = this,
              t = z(),
              { params: s, support: n } = e;
            (e.onTouchStart = he.bind(e)),
              (e.onTouchMove = me.bind(e)),
              (e.onTouchEnd = fe.bind(e)),
              s.cssMode && (e.onScroll = ye.bind(e)),
              (e.onClick = ve.bind(e)),
              n.touch &&
                !be &&
                (t.addEventListener("touchstart", we), (be = !0)),
              Se(e, "on");
          },
          detachEvents: function () {
            Se(this, "off");
          },
        },
        Ce = (e, t) => e.grid && t.grid && t.grid.rows > 1;
      const Te = {
        setBreakpoint: function () {
          const e = this,
            {
              activeIndex: t,
              initialized: s,
              loopedSlides: n = 0,
              params: i,
              $el: a,
            } = e,
            r = i.breakpoints;
          if (!r || (r && 0 === Object.keys(r).length)) return;
          const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
          if (!o || e.currentBreakpoint === o) return;
          const l = (o in r ? r[o] : void 0) || e.originalParams,
            c = Ce(e, i),
            d = Ce(e, l),
            u = i.enabled;
          c && !d
            ? (a.removeClass(
                `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !c &&
              d &&
              (a.addClass(`${i.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === i.grid.fill)) &&
                a.addClass(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses());
          const p = l.direction && l.direction !== i.direction,
            h = i.loop && (l.slidesPerView !== i.slidesPerView || p);
          p && s && e.changeDirection(), K(e.params, l);
          const m = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            u && !m ? e.disable() : !u && m && e.enable(),
            (e.currentBreakpoint = o),
            e.emit("_beforeBreakpoint", l),
            h &&
              s &&
              (e.loopDestroy(),
              e.loopCreate(),
              e.updateSlides(),
              e.slideTo(t - n + e.loopedSlides, 0, !1)),
            e.emit("breakpoint", l);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let n = !1;
          const i = D(),
            a = "window" === t ? i.innerHeight : s.clientHeight,
            r = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: a * t, point: e };
              }
              return { value: e, point: e };
            });
          r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < r.length; e += 1) {
            const { point: a, value: o } = r[e];
            "window" === t
              ? i.matchMedia(`(min-width: ${o}px)`).matches && (n = a)
              : o <= s.clientWidth && (n = a);
          }
          return n || "max";
        },
      };
      const xe = {
        addClasses: function () {
          const e = this,
            {
              classNames: t,
              params: s,
              rtl: n,
              $el: i,
              device: a,
              support: r,
            } = e,
            o = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((n) => {
                        e[n] && s.push(t + n);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "pointer-events": !r.touch },
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: n },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
              ],
              s.containerModifierClass
            );
          t.push(...o), i.addClass([...t].join(" ")), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { $el: e, classNames: t } = this;
          e.removeClass(t.join(" ")), this.emitContainerClasses();
        },
      };
      const Le = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements:
          "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      };
      function _e(e, t) {
        return function (s) {
          void 0 === s && (s = {});
          const n = Object.keys(s)[0],
            i = s[n];
          "object" == typeof i && null !== i
            ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
                !0 === e[n] &&
                (e[n] = { auto: !0 }),
              n in e && "enabled" in i
                ? (!0 === e[n] && (e[n] = { enabled: !0 }),
                  "object" != typeof e[n] ||
                    "enabled" in e[n] ||
                    (e[n].enabled = !0),
                  e[n] || (e[n] = { enabled: !1 }),
                  K(t, s))
                : K(t, s))
            : K(t, s);
        };
      }
      const Oe = {
          eventsEmitter: oe,
          update: le,
          translate: ce,
          transition: {
            setTransition: function (e, t) {
              const s = this;
              s.params.cssMode || s.$wrapperEl.transition(e),
                s.emit("setTransition", e, t);
            },
            transitionStart: function (e, t) {
              void 0 === e && (e = !0);
              const s = this,
                { params: n } = s;
              n.cssMode ||
                (n.autoHeight && s.updateAutoHeight(),
                de({
                  swiper: s,
                  runCallbacks: e,
                  direction: t,
                  step: "Start",
                }));
            },
            transitionEnd: function (e, t) {
              void 0 === e && (e = !0);
              const s = this,
                { params: n } = s;
              (s.animating = !1),
                n.cssMode ||
                  (s.setTransition(0),
                  de({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "End",
                  }));
            },
          },
          slide: ue,
          loop: pe,
          grabCursor: {
            setGrabCursor: function (e) {
              const t = this;
              if (
                t.support.touch ||
                !t.params.simulateTouch ||
                (t.params.watchOverflow && t.isLocked) ||
                t.params.cssMode
              )
                return;
              const s =
                "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
              (s.style.cursor = "move"),
                (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
                (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                (s.style.cursor = e ? "grabbing" : "grab");
            },
            unsetGrabCursor: function () {
              const e = this;
              e.support.touch ||
                (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode ||
                (e[
                  "container" === e.params.touchEventsTarget
                    ? "el"
                    : "wrapperEl"
                ].style.cursor = "");
            },
          },
          events: Ee,
          breakpoints: Te,
          checkOverflow: {
            checkOverflow: function () {
              const e = this,
                { isLocked: t, params: s } = e,
                { slidesOffsetBefore: n } = s;
              if (n) {
                const t = e.slides.length - 1,
                  s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
                e.isLocked = e.size > s;
              } else e.isLocked = 1 === e.snapGrid.length;
              !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
            },
          },
          classes: xe,
          images: {
            loadImage: function (e, t, s, n, i, a) {
              const r = D();
              let o;
              function l() {
                a && a();
              }
              V(e).parent("picture")[0] || (e.complete && i)
                ? l()
                : t
                ? ((o = new r.Image()),
                  (o.onload = l),
                  (o.onerror = l),
                  n && (o.sizes = n),
                  s && (o.srcset = s),
                  t && (o.src = t))
                : l();
            },
            preloadImages: function () {
              const e = this;
              function t() {
                null != e &&
                  e &&
                  !e.destroyed &&
                  (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                  e.imagesLoaded === e.imagesToLoad.length &&
                    (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")));
              }
              e.imagesToLoad = e.$el.find("img");
              for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                const n = e.imagesToLoad[s];
                e.loadImage(
                  n,
                  n.currentSrc || n.getAttribute("src"),
                  n.srcset || n.getAttribute("srcset"),
                  n.sizes || n.getAttribute("sizes"),
                  !0,
                  t
                );
              }
            },
          },
        },
        ke = {};
      class Me {
        constructor() {
          let e, t;
          for (var s = arguments.length, n = new Array(s), i = 0; i < s; i++)
            n[i] = arguments[i];
          if (
            (1 === n.length &&
            n[0].constructor &&
            "Object" === Object.prototype.toString.call(n[0]).slice(8, -1)
              ? (t = n[0])
              : ([e, t] = n),
            t || (t = {}),
            (t = K({}, t)),
            e && !t.el && (t.el = e),
            t.el && V(t.el).length > 1)
          ) {
            const e = [];
            return (
              V(t.el).each((s) => {
                const n = K({}, t, { el: s });
                e.push(new Me(n));
              }),
              e
            );
          }
          const a = this;
          (a.__swiper__ = !0),
            (a.support = ie()),
            (a.device = ae({ userAgent: t.userAgent })),
            (a.browser = re()),
            (a.eventsListeners = {}),
            (a.eventsAnyListeners = []),
            (a.modules = [...a.__modules__]),
            t.modules &&
              Array.isArray(t.modules) &&
              a.modules.push(...t.modules);
          const r = {};
          a.modules.forEach((e) => {
            e({
              swiper: a,
              extendParams: _e(t, r),
              on: a.on.bind(a),
              once: a.once.bind(a),
              off: a.off.bind(a),
              emit: a.emit.bind(a),
            });
          });
          const o = K({}, Le, r);
          return (
            (a.params = K({}, o, ke, t)),
            (a.originalParams = K({}, a.params)),
            (a.passedParams = K({}, t)),
            a.params &&
              a.params.on &&
              Object.keys(a.params.on).forEach((e) => {
                a.on(e, a.params.on[e]);
              }),
            a.params && a.params.onAny && a.onAny(a.params.onAny),
            (a.$ = V),
            Object.assign(a, {
              enabled: a.params.enabled,
              el: e,
              classNames: [],
              slides: V(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === a.params.direction,
              isVertical: () => "vertical" === a.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: a.params.allowSlideNext,
              allowSlidePrev: a.params.allowSlidePrev,
              touchEvents: (function () {
                const e = [
                    "touchstart",
                    "touchmove",
                    "touchend",
                    "touchcancel",
                  ],
                  t = ["pointerdown", "pointermove", "pointerup"];
                return (
                  (a.touchEventsTouch = {
                    start: e[0],
                    move: e[1],
                    end: e[2],
                    cancel: e[3],
                  }),
                  (a.touchEventsDesktop = {
                    start: t[0],
                    move: t[1],
                    end: t[2],
                  }),
                  a.support.touch || !a.params.simulateTouch
                    ? a.touchEventsTouch
                    : a.touchEventsDesktop
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: a.params.focusableElements,
                lastClickTime: X(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: a.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            a.emit("_swiper"),
            a.params.init && a.init(),
            a
          );
        }
        enable() {
          const e = this;
          e.enabled ||
            ((e.enabled = !0),
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"));
        }
        disable() {
          const e = this;
          e.enabled &&
            ((e.enabled = !1),
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"));
        }
        setProgress(e, t) {
          const s = this;
          e = Math.min(Math.max(e, 0), 1);
          const n = s.minTranslate(),
            i = (s.maxTranslate() - n) * e + n;
          s.translateTo(i, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses();
        }
        emitContainerClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = e.el.className
            .split(" ")
            .filter(
              (t) =>
                0 === t.indexOf("swiper") ||
                0 === t.indexOf(e.params.containerModifierClass)
            );
          e.emit("_containerClasses", t.join(" "));
        }
        getSlideClasses(e) {
          const t = this;
          return e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
        }
        emitSlidesClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = [];
          e.slides.each((s) => {
            const n = e.getSlideClasses(s);
            t.push({ slideEl: s, classNames: n }), e.emit("_slideClass", s, n);
          }),
            e.emit("_slideClasses", t);
        }
        slidesPerViewDynamic(e, t) {
          void 0 === e && (e = "current"), void 0 === t && (t = !1);
          const {
            params: s,
            slides: n,
            slidesGrid: i,
            slidesSizesGrid: a,
            size: r,
            activeIndex: o,
          } = this;
          let l = 1;
          if (s.centeredSlides) {
            let e,
              t = n[o].swiperSlideSize;
            for (let s = o + 1; s < n.length; s += 1)
              n[s] &&
                !e &&
                ((t += n[s].swiperSlideSize), (l += 1), t > r && (e = !0));
            for (let s = o - 1; s >= 0; s -= 1)
              n[s] &&
                !e &&
                ((t += n[s].swiperSlideSize), (l += 1), t > r && (e = !0));
          } else if ("current" === e)
            for (let e = o + 1; e < n.length; e += 1) {
              (t ? i[e] + a[e] - i[o] < r : i[e] - i[o] < r) && (l += 1);
            }
          else
            for (let e = o - 1; e >= 0; e -= 1) {
              i[o] - i[e] < r && (l += 1);
            }
          return l;
        }
        update() {
          const e = this;
          if (!e || e.destroyed) return;
          const { snapGrid: t, params: s } = e;
          function n() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate,
              s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
          }
          let i;
          s.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode && e.params.freeMode.enabled
              ? (n(), e.params.autoHeight && e.updateAutoHeight())
              : ((i =
                  ("auto" === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0)),
                i || n()),
            s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update");
        }
        changeDirection(e, t) {
          void 0 === t && (t = !0);
          const s = this,
            n = s.params.direction;
          return (
            e || (e = "horizontal" === n ? "vertical" : "horizontal"),
            e === n ||
              ("horizontal" !== e && "vertical" !== e) ||
              (s.$el
                .removeClass(`${s.params.containerModifierClass}${n}`)
                .addClass(`${s.params.containerModifierClass}${e}`),
              s.emitContainerClasses(),
              (s.params.direction = e),
              s.slides.each((t) => {
                "vertical" === e ? (t.style.width = "") : (t.style.height = "");
              }),
              s.emit("changeDirection"),
              t && s.update()),
            s
          );
        }
        mount(e) {
          const t = this;
          if (t.mounted) return !0;
          const s = V(e || t.params.el);
          if (!(e = s[0])) return !1;
          e.swiper = t;
          const n = () =>
            `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let i = (() => {
            if (e && e.shadowRoot && e.shadowRoot.querySelector) {
              const t = V(e.shadowRoot.querySelector(n()));
              return (t.children = (e) => s.children(e)), t;
            }
            return s.children(n());
          })();
          if (0 === i.length && t.params.createElements) {
            const e = z().createElement("div");
            (i = V(e)),
              (e.className = t.params.wrapperClass),
              s.append(e),
              s.children(`.${t.params.slideClass}`).each((e) => {
                i.append(e);
              });
          }
          return (
            Object.assign(t, {
              $el: s,
              el: e,
              $wrapperEl: i,
              wrapperEl: i[0],
              mounted: !0,
              rtl:
                "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
              rtlTranslate:
                "horizontal" === t.params.direction &&
                ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
              wrongRTL: "-webkit-box" === i.css("display"),
            }),
            !0
          );
        }
        init(e) {
          const t = this;
          if (t.initialized) return t;
          return (
            !1 === t.mount(e) ||
              (t.emit("beforeInit"),
              t.params.breakpoints && t.setBreakpoint(),
              t.addClasses(),
              t.params.loop && t.loopCreate(),
              t.updateSize(),
              t.updateSlides(),
              t.params.watchOverflow && t.checkOverflow(),
              t.params.grabCursor && t.enabled && t.setGrabCursor(),
              t.params.preloadImages && t.preloadImages(),
              t.params.loop
                ? t.slideTo(
                    t.params.initialSlide + t.loopedSlides,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : t.slideTo(
                    t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              t.attachEvents(),
              (t.initialized = !0),
              t.emit("init"),
              t.emit("afterInit")),
            t
          );
        }
        destroy(e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          const s = this,
            { params: n, $el: i, $wrapperEl: a, slides: r } = s;
          return (
            void 0 === s.params ||
              s.destroyed ||
              (s.emit("beforeDestroy"),
              (s.initialized = !1),
              s.detachEvents(),
              n.loop && s.loopDestroy(),
              t &&
                (s.removeClasses(),
                i.removeAttr("style"),
                a.removeAttr("style"),
                r &&
                  r.length &&
                  r
                    .removeClass(
                      [
                        n.slideVisibleClass,
                        n.slideActiveClass,
                        n.slideNextClass,
                        n.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              s.emit("destroy"),
              Object.keys(s.eventsListeners).forEach((e) => {
                s.off(e);
              }),
              !1 !== e &&
                ((s.$el[0].swiper = null),
                (function (e) {
                  const t = e;
                  Object.keys(t).forEach((e) => {
                    try {
                      t[e] = null;
                    } catch (e) {}
                    try {
                      delete t[e];
                    } catch (e) {}
                  });
                })(s)),
              (s.destroyed = !0)),
            null
          );
        }
        static extendDefaults(e) {
          K(ke, e);
        }
        static get extendedDefaults() {
          return ke;
        }
        static get defaults() {
          return Le;
        }
        static installModule(e) {
          Me.prototype.__modules__ || (Me.prototype.__modules__ = []);
          const t = Me.prototype.__modules__;
          "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
          return Array.isArray(e)
            ? (e.forEach((e) => Me.installModule(e)), Me)
            : (Me.installModule(e), Me);
        }
      }
      Object.keys(Oe).forEach((e) => {
        Object.keys(Oe[e]).forEach((t) => {
          Me.prototype[t] = Oe[e][t];
        });
      }),
        Me.use([
          function (e) {
            let { swiper: t, on: s, emit: n } = e;
            const i = D();
            let a = null,
              r = null;
            const o = () => {
                t &&
                  !t.destroyed &&
                  t.initialized &&
                  (n("beforeResize"), n("resize"));
              },
              l = () => {
                t && !t.destroyed && t.initialized && n("orientationchange");
              };
            s("init", () => {
              t.params.resizeObserver && void 0 !== i.ResizeObserver
                ? t &&
                  !t.destroyed &&
                  t.initialized &&
                  ((a = new ResizeObserver((e) => {
                    r = i.requestAnimationFrame(() => {
                      const { width: s, height: n } = t;
                      let i = s,
                        a = n;
                      e.forEach((e) => {
                        let {
                          contentBoxSize: s,
                          contentRect: n,
                          target: r,
                        } = e;
                        (r && r !== t.el) ||
                          ((i = n ? n.width : (s[0] || s).inlineSize),
                          (a = n ? n.height : (s[0] || s).blockSize));
                      }),
                        (i === s && a === n) || o();
                    });
                  })),
                  a.observe(t.el))
                : (i.addEventListener("resize", o),
                  i.addEventListener("orientationchange", l));
            }),
              s("destroy", () => {
                r && i.cancelAnimationFrame(r),
                  a && a.unobserve && t.el && (a.unobserve(t.el), (a = null)),
                  i.removeEventListener("resize", o),
                  i.removeEventListener("orientationchange", l);
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: n, emit: i } = e;
            const a = [],
              r = D(),
              o = function (e, t) {
                void 0 === t && (t = {});
                const s = new (r.MutationObserver || r.WebkitMutationObserver)(
                  (e) => {
                    if (1 === e.length) return void i("observerUpdate", e[0]);
                    const t = function () {
                      i("observerUpdate", e[0]);
                    };
                    r.requestAnimationFrame
                      ? r.requestAnimationFrame(t)
                      : r.setTimeout(t, 0);
                  }
                );
                s.observe(e, {
                  attributes: void 0 === t.attributes || t.attributes,
                  childList: void 0 === t.childList || t.childList,
                  characterData: void 0 === t.characterData || t.characterData,
                }),
                  a.push(s);
              };
            s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
              n("init", () => {
                if (t.params.observer) {
                  if (t.params.observeParents) {
                    const e = t.$el.parents();
                    for (let t = 0; t < e.length; t += 1) o(e[t]);
                  }
                  o(t.$el[0], { childList: t.params.observeSlideChildren }),
                    o(t.$wrapperEl[0], { attributes: !1 });
                }
              }),
              n("destroy", () => {
                a.forEach((e) => {
                  e.disconnect();
                }),
                  a.splice(0, a.length);
              });
          },
        ]);
      const $e = Me;
      function Ae(e, t, s, n) {
        const i = z();
        return (
          e.params.createElements &&
            Object.keys(n).forEach((a) => {
              if (!s[a] && !0 === s.auto) {
                let r = e.$el.children(`.${n[a]}`)[0];
                r ||
                  ((r = i.createElement("div")),
                  (r.className = n[a]),
                  e.$el.append(r)),
                  (s[a] = r),
                  (t[a] = r);
              }
            }),
          s
        );
      }
      function Pe(e) {
        let { swiper: t, extendParams: s, on: n, emit: i } = e;
        function a(e) {
          let s;
          return (
            e &&
              ((s = V(e)),
              t.params.uniqueNavElements &&
                "string" == typeof e &&
                s.length > 1 &&
                1 === t.$el.find(e).length &&
                (s = t.$el.find(e))),
            s
          );
        }
        function r(e, s) {
          const n = t.params.navigation;
          e &&
            e.length > 0 &&
            (e[s ? "addClass" : "removeClass"](n.disabledClass),
            e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e[t.isLocked ? "addClass" : "removeClass"](n.lockClass));
        }
        function o() {
          if (t.params.loop) return;
          const { $nextEl: e, $prevEl: s } = t.navigation;
          r(s, t.isBeginning && !t.params.rewind),
            r(e, t.isEnd && !t.params.rewind);
        }
        function l(e) {
          e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) &&
              t.slidePrev();
        }
        function c(e) {
          e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
        }
        function d() {
          const e = t.params.navigation;
          if (
            ((t.params.navigation = Ae(
              t,
              t.originalParams.navigation,
              t.params.navigation,
              { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
            )),
            !e.nextEl && !e.prevEl)
          )
            return;
          const s = a(e.nextEl),
            n = a(e.prevEl);
          s && s.length > 0 && s.on("click", c),
            n && n.length > 0 && n.on("click", l),
            Object.assign(t.navigation, {
              $nextEl: s,
              nextEl: s && s[0],
              $prevEl: n,
              prevEl: n && n[0],
            }),
            t.enabled ||
              (s && s.addClass(e.lockClass), n && n.addClass(e.lockClass));
        }
        function u() {
          const { $nextEl: e, $prevEl: s } = t.navigation;
          e &&
            e.length &&
            (e.off("click", c),
            e.removeClass(t.params.navigation.disabledClass)),
            s &&
              s.length &&
              (s.off("click", l),
              s.removeClass(t.params.navigation.disabledClass));
        }
        s({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        }),
          (t.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null,
          }),
          n("init", () => {
            d(), o();
          }),
          n("toEdge fromEdge lock unlock", () => {
            o();
          }),
          n("destroy", () => {
            u();
          }),
          n("enable disable", () => {
            const { $nextEl: e, $prevEl: s } = t.navigation;
            e &&
              e[t.enabled ? "removeClass" : "addClass"](
                t.params.navigation.lockClass
              ),
              s &&
                s[t.enabled ? "removeClass" : "addClass"](
                  t.params.navigation.lockClass
                );
          }),
          n("click", (e, s) => {
            const { $nextEl: n, $prevEl: a } = t.navigation,
              r = s.target;
            if (t.params.navigation.hideOnClick && !V(r).is(a) && !V(r).is(n)) {
              if (
                t.pagination &&
                t.params.pagination &&
                t.params.pagination.clickable &&
                (t.pagination.el === r || t.pagination.el.contains(r))
              )
                return;
              let e;
              n
                ? (e = n.hasClass(t.params.navigation.hiddenClass))
                : a && (e = a.hasClass(t.params.navigation.hiddenClass)),
                i(!0 === e ? "navigationShow" : "navigationHide"),
                n && n.toggleClass(t.params.navigation.hiddenClass),
                a && a.toggleClass(t.params.navigation.hiddenClass);
            }
          }),
          Object.assign(t.navigation, { update: o, init: d, destroy: u });
      }
      function Ie(e) {
        return (
          void 0 === e && (e = ""),
          `.${e
            .trim()
            .replace(/([\.:!\/])/g, "\\$1")
            .replace(/ /g, ".")}`
        );
      }
      function qe(e) {
        let { swiper: t, extendParams: s, on: n, emit: i } = e;
        const a = "swiper-pagination";
        let r;
        s({
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (e) => e,
            formatFractionTotal: (e) => e,
            bulletClass: `${a}-bullet`,
            bulletActiveClass: `${a}-bullet-active`,
            modifierClass: `${a}-`,
            currentClass: `${a}-current`,
            totalClass: `${a}-total`,
            hiddenClass: `${a}-hidden`,
            progressbarFillClass: `${a}-progressbar-fill`,
            progressbarOppositeClass: `${a}-progressbar-opposite`,
            clickableClass: `${a}-clickable`,
            lockClass: `${a}-lock`,
            horizontalClass: `${a}-horizontal`,
            verticalClass: `${a}-vertical`,
          },
        }),
          (t.pagination = { el: null, $el: null, bullets: [] });
        let o = 0;
        function l() {
          return (
            !t.params.pagination.el ||
            !t.pagination.el ||
            !t.pagination.$el ||
            0 === t.pagination.$el.length
          );
        }
        function c(e, s) {
          const { bulletActiveClass: n } = t.params.pagination;
          e[s]().addClass(`${n}-${s}`)[s]().addClass(`${n}-${s}-${s}`);
        }
        function d() {
          const e = t.rtl,
            s = t.params.pagination;
          if (l()) return;
          const n =
              t.virtual && t.params.virtual.enabled
                ? t.virtual.slides.length
                : t.slides.length,
            a = t.pagination.$el;
          let d;
          const u = t.params.loop
            ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup)
            : t.snapGrid.length;
          if (
            (t.params.loop
              ? ((d = Math.ceil(
                  (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
                )),
                d > n - 1 - 2 * t.loopedSlides && (d -= n - 2 * t.loopedSlides),
                d > u - 1 && (d -= u),
                d < 0 && "bullets" !== t.params.paginationType && (d = u + d))
              : (d = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
            "bullets" === s.type &&
              t.pagination.bullets &&
              t.pagination.bullets.length > 0)
          ) {
            const n = t.pagination.bullets;
            let i, l, u;
            if (
              (s.dynamicBullets &&
                ((r = n
                  .eq(0)
                  [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                a.css(
                  t.isHorizontal() ? "width" : "height",
                  r * (s.dynamicMainBullets + 4) + "px"
                ),
                s.dynamicMainBullets > 1 &&
                  void 0 !== t.previousIndex &&
                  ((o += d - (t.previousIndex - t.loopedSlides || 0)),
                  o > s.dynamicMainBullets - 1
                    ? (o = s.dynamicMainBullets - 1)
                    : o < 0 && (o = 0)),
                (i = Math.max(d - o, 0)),
                (l = i + (Math.min(n.length, s.dynamicMainBullets) - 1)),
                (u = (l + i) / 2)),
              n.removeClass(
                ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                  .map((e) => `${s.bulletActiveClass}${e}`)
                  .join(" ")
              ),
              a.length > 1)
            )
              n.each((e) => {
                const t = V(e),
                  n = t.index();
                n === d && t.addClass(s.bulletActiveClass),
                  s.dynamicBullets &&
                    (n >= i &&
                      n <= l &&
                      t.addClass(`${s.bulletActiveClass}-main`),
                    n === i && c(t, "prev"),
                    n === l && c(t, "next"));
              });
            else {
              const e = n.eq(d),
                a = e.index();
              if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                const e = n.eq(i),
                  r = n.eq(l);
                for (let e = i; e <= l; e += 1)
                  n.eq(e).addClass(`${s.bulletActiveClass}-main`);
                if (t.params.loop)
                  if (a >= n.length) {
                    for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                      n.eq(n.length - e).addClass(
                        `${s.bulletActiveClass}-main`
                      );
                    n.eq(n.length - s.dynamicMainBullets - 1).addClass(
                      `${s.bulletActiveClass}-prev`
                    );
                  } else c(e, "prev"), c(r, "next");
                else c(e, "prev"), c(r, "next");
              }
            }
            if (s.dynamicBullets) {
              const i = Math.min(n.length, s.dynamicMainBullets + 4),
                a = (r * i - r) / 2 - u * r,
                o = e ? "right" : "left";
              n.css(t.isHorizontal() ? o : "top", `${a}px`);
            }
          }
          if (
            ("fraction" === s.type &&
              (a.find(Ie(s.currentClass)).text(s.formatFractionCurrent(d + 1)),
              a.find(Ie(s.totalClass)).text(s.formatFractionTotal(u))),
            "progressbar" === s.type)
          ) {
            let e;
            e = s.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
              ? "horizontal"
              : "vertical";
            const n = (d + 1) / u;
            let i = 1,
              r = 1;
            "horizontal" === e ? (i = n) : (r = n),
              a
                .find(Ie(s.progressbarFillClass))
                .transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${r})`)
                .transition(t.params.speed);
          }
          "custom" === s.type && s.renderCustom
            ? (a.html(s.renderCustom(t, d + 1, u)), i("paginationRender", a[0]))
            : i("paginationUpdate", a[0]),
            t.params.watchOverflow &&
              t.enabled &&
              a[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
        }
        function u() {
          const e = t.params.pagination;
          if (l()) return;
          const s =
              t.virtual && t.params.virtual.enabled
                ? t.virtual.slides.length
                : t.slides.length,
            n = t.pagination.$el;
          let a = "";
          if ("bullets" === e.type) {
            let i = t.params.loop
              ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
              : t.snapGrid.length;
            t.params.freeMode &&
              t.params.freeMode.enabled &&
              !t.params.loop &&
              i > s &&
              (i = s);
            for (let s = 0; s < i; s += 1)
              e.renderBullet
                ? (a += e.renderBullet.call(t, s, e.bulletClass))
                : (a += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
            n.html(a), (t.pagination.bullets = n.find(Ie(e.bulletClass)));
          }
          "fraction" === e.type &&
            ((a = e.renderFraction
              ? e.renderFraction.call(t, e.currentClass, e.totalClass)
              : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
            n.html(a)),
            "progressbar" === e.type &&
              ((a = e.renderProgressbar
                ? e.renderProgressbar.call(t, e.progressbarFillClass)
                : `<span class="${e.progressbarFillClass}"></span>`),
              n.html(a)),
            "custom" !== e.type && i("paginationRender", t.pagination.$el[0]);
        }
        function p() {
          t.params.pagination = Ae(
            t,
            t.originalParams.pagination,
            t.params.pagination,
            { el: "swiper-pagination" }
          );
          const e = t.params.pagination;
          if (!e.el) return;
          let s = V(e.el);
          0 !== s.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              s.length > 1 &&
              ((s = t.$el.find(e.el)),
              s.length > 1 &&
                (s = s.filter((e) => V(e).parents(".swiper")[0] === t.el))),
            "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
            s.addClass(e.modifierClass + e.type),
            s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
            "bullets" === e.type &&
              e.dynamicBullets &&
              (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
              (o = 0),
              e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
            "progressbar" === e.type &&
              e.progressbarOpposite &&
              s.addClass(e.progressbarOppositeClass),
            e.clickable &&
              s.on("click", Ie(e.bulletClass), function (e) {
                e.preventDefault();
                let s = V(this).index() * t.params.slidesPerGroup;
                t.params.loop && (s += t.loopedSlides), t.slideTo(s);
              }),
            Object.assign(t.pagination, { $el: s, el: s[0] }),
            t.enabled || s.addClass(e.lockClass));
        }
        function h() {
          const e = t.params.pagination;
          if (l()) return;
          const s = t.pagination.$el;
          s.removeClass(e.hiddenClass),
            s.removeClass(e.modifierClass + e.type),
            s.removeClass(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass
            ),
            t.pagination.bullets &&
              t.pagination.bullets.removeClass &&
              t.pagination.bullets.removeClass(e.bulletActiveClass),
            e.clickable && s.off("click", Ie(e.bulletClass));
        }
        n("init", () => {
          p(), u(), d();
        }),
          n("activeIndexChange", () => {
            (t.params.loop || void 0 === t.snapIndex) && d();
          }),
          n("snapIndexChange", () => {
            t.params.loop || d();
          }),
          n("slidesLengthChange", () => {
            t.params.loop && (u(), d());
          }),
          n("snapGridLengthChange", () => {
            t.params.loop || (u(), d());
          }),
          n("destroy", () => {
            h();
          }),
          n("enable disable", () => {
            const { $el: e } = t.pagination;
            e &&
              e[t.enabled ? "removeClass" : "addClass"](
                t.params.pagination.lockClass
              );
          }),
          n("lock unlock", () => {
            d();
          }),
          n("click", (e, s) => {
            const n = s.target,
              { $el: a } = t.pagination;
            if (
              t.params.pagination.el &&
              t.params.pagination.hideOnClick &&
              a.length > 0 &&
              !V(n).hasClass(t.params.pagination.bulletClass)
            ) {
              if (
                t.navigation &&
                ((t.navigation.nextEl && n === t.navigation.nextEl) ||
                  (t.navigation.prevEl && n === t.navigation.prevEl))
              )
                return;
              const e = a.hasClass(t.params.pagination.hiddenClass);
              i(!0 === e ? "paginationShow" : "paginationHide"),
                a.toggleClass(t.params.pagination.hiddenClass);
            }
          }),
          Object.assign(t.pagination, {
            render: u,
            update: d,
            init: p,
            destroy: h,
          });
      }
      function ze(e) {
        let t,
          { swiper: s, extendParams: n, on: i, emit: a } = e;
        function r() {
          const e = s.slides.eq(s.activeIndex);
          let n = s.params.autoplay.delay;
          e.attr("data-swiper-autoplay") &&
            (n = e.attr("data-swiper-autoplay") || s.params.autoplay.delay),
            clearTimeout(t),
            (t = Y(() => {
              let e;
              s.params.autoplay.reverseDirection
                ? s.params.loop
                  ? (s.loopFix(),
                    (e = s.slidePrev(s.params.speed, !0, !0)),
                    a("autoplay"))
                  : s.isBeginning
                  ? s.params.autoplay.stopOnLastSlide
                    ? l()
                    : ((e = s.slideTo(
                        s.slides.length - 1,
                        s.params.speed,
                        !0,
                        !0
                      )),
                      a("autoplay"))
                  : ((e = s.slidePrev(s.params.speed, !0, !0)), a("autoplay"))
                : s.params.loop
                ? (s.loopFix(),
                  (e = s.slideNext(s.params.speed, !0, !0)),
                  a("autoplay"))
                : s.isEnd
                ? s.params.autoplay.stopOnLastSlide
                  ? l()
                  : ((e = s.slideTo(0, s.params.speed, !0, !0)), a("autoplay"))
                : ((e = s.slideNext(s.params.speed, !0, !0)), a("autoplay")),
                ((s.params.cssMode && s.autoplay.running) || !1 === e) && r();
            }, n));
        }
        function o() {
          return (
            void 0 === t &&
            !s.autoplay.running &&
            ((s.autoplay.running = !0), a("autoplayStart"), r(), !0)
          );
        }
        function l() {
          return (
            !!s.autoplay.running &&
            void 0 !== t &&
            (t && (clearTimeout(t), (t = void 0)),
            (s.autoplay.running = !1),
            a("autoplayStop"),
            !0)
          );
        }
        function c(e) {
          s.autoplay.running &&
            (s.autoplay.paused ||
              (t && clearTimeout(t),
              (s.autoplay.paused = !0),
              0 !== e && s.params.autoplay.waitForTransition
                ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                    s.$wrapperEl[0].addEventListener(e, u);
                  })
                : ((s.autoplay.paused = !1), r())));
        }
        function d() {
          const e = z();
          "hidden" === e.visibilityState && s.autoplay.running && c(),
            "visible" === e.visibilityState &&
              s.autoplay.paused &&
              (r(), (s.autoplay.paused = !1));
        }
        function u(e) {
          s &&
            !s.destroyed &&
            s.$wrapperEl &&
            e.target === s.$wrapperEl[0] &&
            (["transitionend", "webkitTransitionEnd"].forEach((e) => {
              s.$wrapperEl[0].removeEventListener(e, u);
            }),
            (s.autoplay.paused = !1),
            s.autoplay.running ? r() : l());
        }
        function p() {
          s.params.autoplay.disableOnInteraction
            ? l()
            : (a("autoplayPause"), c()),
            ["transitionend", "webkitTransitionEnd"].forEach((e) => {
              s.$wrapperEl[0].removeEventListener(e, u);
            });
        }
        function h() {
          s.params.autoplay.disableOnInteraction ||
            ((s.autoplay.paused = !1), a("autoplayResume"), r());
        }
        (s.autoplay = { running: !1, paused: !1 }),
          n({
            autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !0,
              stopOnLastSlide: !1,
              reverseDirection: !1,
              pauseOnMouseEnter: !1,
            },
          }),
          i("init", () => {
            if (s.params.autoplay.enabled) {
              o();
              z().addEventListener("visibilitychange", d),
                s.params.autoplay.pauseOnMouseEnter &&
                  (s.$el.on("mouseenter", p), s.$el.on("mouseleave", h));
            }
          }),
          i("beforeTransitionStart", (e, t, n) => {
            s.autoplay.running &&
              (n || !s.params.autoplay.disableOnInteraction
                ? s.autoplay.pause(t)
                : l());
          }),
          i("sliderFirstMove", () => {
            s.autoplay.running &&
              (s.params.autoplay.disableOnInteraction ? l() : c());
          }),
          i("touchEnd", () => {
            s.params.cssMode &&
              s.autoplay.paused &&
              !s.params.autoplay.disableOnInteraction &&
              r();
          }),
          i("destroy", () => {
            s.$el.off("mouseenter", p),
              s.$el.off("mouseleave", h),
              s.autoplay.running && l();
            z().removeEventListener("visibilitychange", d);
          }),
          Object.assign(s.autoplay, { pause: c, run: r, start: o, stop: l });
      }
      function Be() {
        let e = document.querySelectorAll(
          '[class*="__swiper"]:not(.swiper-wrapper)'
        );
        e &&
          e.forEach((e) => {
            e.parentElement.classList.add("swiper"),
              e.classList.add("swiper-wrapper");
            for (const t of e.children) t.classList.add("swiper-slide");
          });
      }
      window.addEventListener("load", function (e) {
        Be(),
          document.querySelector(".mainslider__slider") &&
            new $e(".mainslider__slider", {
              modules: [Pe, qe, ze],
              observer: !0,
              observeParents: !0,
              slidesPerView: 2,
              spaceBetween: 0,
              autoHeight: !0,
              speed: 2500,
              navigation: {
                nextEl: ".about__more .more__item_next",
                prevEl: ".about__more .more__item_prev",
              },
              breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 0, autoHeight: !0 },
                768: { slidesPerView: 1, spaceBetween: 0 },
                992: { slidesPerView: 2, spaceBetween: 0 },
                1268: { slidesPerView: 2, spaceBetween: 0 },
              },
              on: {},
            }),
          document.querySelector("maincatalogue__slider") &&
            new $e(".maincatalogue__slider", {
              modules: [ze],
              spaceBetween: 0,
              breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 0, autoHeight: !0 },
                768: { slidesPerView: 4, spaceBetween: 0 },
                992: { slidesPerView: 4, spaceBetween: 0 },
                1268: { slidesPerView: 4, spaceBetween: 0 },
              },
              on: {},
            }),
          document.querySelector(".product__slider") &&
            new $e(".product__slider", {
              modules: [Pe, qe],
              observer: !0,
              observeParents: !0,
              slidesPerView: 1,
              spaceBetween: 0,
              autoHeight: !1,
              speed: 800,
              allowTouchMove: !0,
              touchRatio: 1,
              resistanceRatio: 0.3,
              loop: !0,
              pagination: {
                el: ".swiper-pagination",
                clickable: !0,
                type: "progressbar",
              },
              navigation: {
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              },
              scrollbar: { el: ".swiper-scrollbar", draggable: !0 },
            });
      });
      class De {
        constructor(e) {
          (this.config = Object.assign({ logging: !0 }, e)),
            this.observer,
            !document.documentElement.classList.contains("watcher") &&
              this.scrollWatcherRun();
        }
        scrollWatcherUpdate() {
          this.scrollWatcherRun();
        }
        scrollWatcherRun() {
          document.documentElement.classList.add("watcher"),
            this.scrollWatcherConstructor(
              document.querySelectorAll("[data-watch]")
            );
        }
        scrollWatcherConstructor(e) {
          if (e.length) {
            this.scrollWatcherLogging(
              `Проснулся, слежу за объектами (${e.length})...`
            ),
              p(
                Array.from(e).map(function (e) {
                  return `${
                    e.dataset.watchRoot ? e.dataset.watchRoot : null
                  }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
                })
              ).forEach((t) => {
                let s = t.split("|"),
                  n = { root: s[0], margin: s[1], threshold: s[2] },
                  i = Array.from(e).filter(function (e) {
                    let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                      s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                      i = e.dataset.watchThreshold
                        ? e.dataset.watchThreshold
                        : 0;
                    if (
                      String(t) === n.root &&
                      String(s) === n.margin &&
                      String(i) === n.threshold
                    )
                      return e;
                  }),
                  a = this.getScrollWatcherConfig(n);
                this.scrollWatcherInit(i, a);
              });
          } else
            this.scrollWatcherLogging(
              "Сплю, нет объектов для слежения. ZzzZZzz"
            );
        }
        getScrollWatcherConfig(e) {
          let t = {};
          if (
            (document.querySelector(e.root)
              ? (t.root = document.querySelector(e.root))
              : "null" !== e.root &&
                this.scrollWatcherLogging(
                  `Эмм... родительского объекта ${e.root} нет на странице`
                ),
            (t.rootMargin = e.margin),
            !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
          ) {
            if ("prx" === e.threshold) {
              e.threshold = [];
              for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
            } else e.threshold = e.threshold.split(",");
            return (t.threshold = e.threshold), t;
          }
          this.scrollWatcherLogging(
            "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
          );
        }
        scrollWatcherCreate(e) {
          this.observer = new IntersectionObserver((e, t) => {
            e.forEach((e) => {
              this.scrollWatcherCallback(e, t);
            });
          }, e);
        }
        scrollWatcherInit(e, t) {
          this.scrollWatcherCreate(t),
            e.forEach((e) => this.observer.observe(e));
        }
        scrollWatcherIntersecting(e, t) {
          e.isIntersecting
            ? (!t.classList.contains("_watcher-view") &&
                t.classList.add("_watcher-view"),
              this.scrollWatcherLogging(
                `Я вижу ${t.classList}, добавил класс _watcher-view`
              ))
            : (t.classList.contains("_watcher-view") &&
                t.classList.remove("_watcher-view"),
              this.scrollWatcherLogging(
                `Я не вижу ${t.classList}, убрал класс _watcher-view`
              ));
        }
        scrollWatcherOff(e, t) {
          t.unobserve(e),
            this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
        }
        scrollWatcherLogging(e) {
          this.config.logging && u(`[Наблюдатель]: ${e}`);
        }
        scrollWatcherCallback(e, t) {
          const s = e.target;
          this.scrollWatcherIntersecting(e, s),
            s.hasAttribute("data-watch-once") &&
              e.isIntersecting &&
              this.scrollWatcherOff(s, t),
            document.dispatchEvent(
              new CustomEvent("watcherCallback", { detail: { entry: e } })
            );
        }
      }
      let Ne = !1;
      setTimeout(() => {
        if (Ne) {
          let e = new Event("windowScroll");
          window.addEventListener("scroll", function (t) {
            document.dispatchEvent(e);
          });
        }
      }, 0),
        i.any() && document.documentElement.classList.add("touch"),
        (function () {
          let e = document.querySelector(".icon-menu");
          e &&
            e.addEventListener("click", function (e) {
              o &&
                (l(), document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          if (
            document.querySelectorAll("[data-fullscreen]").length &&
            i.any()
          ) {
            function e() {
              let e = 0.01 * window.innerHeight;
              document.documentElement.style.setProperty("--vh", `${e}px`);
            }
            window.addEventListener("resize", e), e();
          }
        })(),
        (function () {
          const e = document.querySelectorAll("[data-tabs]");
          let t = [];
          if (e.length > 0) {
            const i = location.hash.replace("#", "");
            i.startsWith("tab-") && (t = i.replace("tab-", "").split("-")),
              e.forEach((e, s) => {
                e.classList.add("_tab-init"),
                  e.setAttribute("data-tabs-index", s),
                  e.addEventListener("click", n),
                  (function (e) {
                    const s = e.querySelectorAll("[data-tabs-titles]>*"),
                      n = e.querySelectorAll("[data-tabs-body]>*"),
                      i = e.dataset.tabsIndex,
                      a = t[0] == i;
                    if (a) {
                      e.querySelector(
                        "[data-tabs-titles]>._tab-active"
                      ).classList.remove("_tab-active");
                    }
                    n.length > 0 &&
                      n.forEach((e, n) => {
                        s[n].setAttribute("data-tabs-title", ""),
                          e.setAttribute("data-tabs-item", ""),
                          a && n == t[1] && s[n].classList.add("_tab-active"),
                          (e.hidden = !s[n].classList.contains("_tab-active"));
                      });
                  })(e);
              });
            let a = h(e, "tabs");
            a &&
              a.length &&
              a.forEach((e) => {
                e.matchMedia.addEventListener("change", function () {
                  s(e.itemsArray, e.matchMedia);
                }),
                  s(e.itemsArray, e.matchMedia);
              });
          }
          function s(e, t) {
            e.forEach((e) => {
              const s = (e = e.item).querySelector("[data-tabs-titles]"),
                n = e.querySelectorAll("[data-tabs-title]"),
                i = e.querySelector("[data-tabs-body]");
              e.querySelectorAll("[data-tabs-item]").forEach((a, r) => {
                t.matches
                  ? (i.append(n[r]),
                    i.append(a),
                    e.classList.add("_tab-spoller"))
                  : (s.append(n[r]), e.classList.remove("_tab-spoller"));
              });
            });
          }
          function n(e) {
            const t = e.target;
            if (t.closest("[data-tabs-title]")) {
              const s = t.closest("[data-tabs-title]"),
                n = s.closest("[data-tabs]");
              if (
                !s.classList.contains("_tab-active") &&
                !n.querySelectorAll("._slide").length
              ) {
                const e = n.querySelector("[data-tabs-title]._tab-active");
                e && e.classList.remove("_tab-active"),
                  s.classList.add("_tab-active"),
                  (function (e) {
                    const t = e.querySelectorAll("[data-tabs-title]"),
                      s = e.querySelectorAll("[data-tabs-item]"),
                      n = e.dataset.tabsIndex,
                      i = (function (e) {
                        if (e.hasAttribute("data-tabs-animate"))
                          return e.dataset.tabsAnimate > 0
                            ? e.dataset.tabsAnimate
                            : 500;
                      })(e);
                    s.length > 0 &&
                      s.forEach((e, s) => {
                        t[s].classList.contains("_tab-active")
                          ? (i ? r(e, i) : (e.hidden = !1),
                            e.closest(".popup") ||
                              (location.hash = `tab-${n}-${s}`))
                          : i
                          ? a(e, i)
                          : (e.hidden = !0);
                      });
                  })(n);
              }
              e.preventDefault();
            }
          }
        })(),
        new n({}),
        (function () {
          const e = document.querySelectorAll(
            "input[placeholder],textarea[placeholder]"
          );
          e.length &&
            e.forEach((e) => {
              e.dataset.placeholder = e.placeholder;
            }),
            document.body.addEventListener("focusin", function (e) {
              const t = e.target;
              ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
                (t.dataset.placeholder && (t.placeholder = ""),
                t.classList.add("_form-focus"),
                t.parentElement.classList.add("_form-focus"),
                A.removeError(t));
            }),
            document.body.addEventListener("focusout", function (e) {
              const t = e.target;
              ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
                (t.dataset.placeholder &&
                  (t.placeholder = t.dataset.placeholder),
                t.classList.remove("_form-focus"),
                t.parentElement.classList.remove("_form-focus"),
                t.hasAttribute("data-validate") && A.validateInput(t));
            });
        })(),
        (function (e) {
          const t = document.forms;
          if (t.length)
            for (const e of t)
              e.addEventListener("submit", function (e) {
                s(e.target, e);
              }),
                e.addEventListener("reset", function (e) {
                  const t = e.target;
                  A.formClean(t);
                });
          async function s(t, s) {
            if (0 === (e ? A.getErrors(t) : 0)) {
              if (t.hasAttribute("data-ajax")) {
                s.preventDefault();
                const e = t.getAttribute("action")
                    ? t.getAttribute("action").trim()
                    : "#",
                  i = t.getAttribute("method")
                    ? t.getAttribute("method").trim()
                    : "GET",
                  a = new FormData(t);
                t.classList.add("_sending");
                const r = await fetch(e, { method: i, body: a });
                if (r.ok) {
                  await r.json();
                  t.classList.remove("_sending"), n(t);
                } else alert("Ошибка"), t.classList.remove("_sending");
              } else t.hasAttribute("data-dev") && (s.preventDefault(), n(t));
            } else {
              s.preventDefault();
              const e = t.querySelector("._form-error");
              e && t.hasAttribute("data-goto-error") && M(e, !0, 1e3);
            }
          }
          function n(e) {
            document.dispatchEvent(
              new CustomEvent("formSent", { detail: { form: e } })
            ),
              A.formClean(e),
              u(`[Формы]: ${"Форма отправлена!"}`);
          }
        })(!0),
        new De({}),
        (function () {
          function e(e) {
            if ("click" === e.type) {
              const t = e.target;
              if (t.closest("[data-goto]")) {
                const s = t.closest("[data-goto]"),
                  n = s.dataset.goto ? s.dataset.goto : "",
                  i = !!s.hasAttribute("data-goto-header"),
                  a = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
                M(n, i, a), e.preventDefault();
              }
            } else if ("watcherCallback" === e.type && e.detail) {
              const t = e.detail.entry,
                s = t.target;
              if ("navigator" === s.dataset.watch) {
                const e = s.id,
                  n = document.querySelector("[data-goto]._navigator-active"),
                  i = document.querySelector(`[data-goto="${e}"]`);
                t.isIntersecting
                  ? (n && n.classList.remove("_navigator-active"),
                    i && i.classList.add("_navigator-active"))
                  : i && i.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", e),
            document.addEventListener("watcherCallback", e);
        })(),
        (function () {
          Ne = !0;
          const e = document.querySelector("header.header"),
            t = e.hasAttribute("data-scroll-show"),
            s = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
            n = e.dataset.scroll ? e.dataset.scroll : 1;
          let i,
            a = 0;
          document.addEventListener("windowScroll", function (r) {
            const o = window.scrollY;
            clearTimeout(i),
              o >= n
                ? (!e.classList.contains("_header-scroll") &&
                    e.classList.add("_header-scroll"),
                  t &&
                    (o > a
                      ? e.classList.contains("_header-show") &&
                        e.classList.remove("_header-show")
                      : !e.classList.contains("_header-show") &&
                        e.classList.add("_header-show"),
                    (i = setTimeout(() => {
                      !e.classList.contains("_header-show") &&
                        e.classList.add("_header-show");
                    }, s))))
                : (e.classList.contains("_header-scroll") &&
                    e.classList.remove("_header-scroll"),
                  t &&
                    e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")),
              (a = o <= 0 ? 0 : o);
          });
        })();
    })();
})();
