import m from "mithril";

import ticketmaster from "../models/ticket.js";

var menu = {
  view: function () {
    return [
      m("nav.header__nav-wrap.slide-in", [
        m("h2.header__nav-heading h6", "M | E | F | E | R"),
        m("ul.header__nav", [
          m("li", [
            m("a", { href: "/", oncreate: m.route.link }, "Search")
          ]),
          m("li", [
            m("a", { href: "/log-in", oncreate: m.route.link }, "Login")
          ]),
          m("li", [
            m("a", { href: "/sign-up", oncreate: m.route.link }, "Register")
          ]),
          ticketmaster.results.length != 0 ?
            m("li", [
              m("a", { href: "/event-result", oncreate: m.route.link }, "Event")
            ]) :
            m("p")
        ]),
        m("a.header__overlay-close.close-mobile-menu", {
          onclick: function () {
            m.route.set("/");
          }
        }, "Close")
      ])
    ];
  }
};

export default menu;
