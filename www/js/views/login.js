import m from "mithril";

import auth from "../models/auth.js";

var login = {
  oninit: function () {
    auth.observeError = "";
  },
  view: function () {
    return [
      m("div.header__search.slide-in", [
        m("h1", "M | E | F | E | R"),
        m("div.header__toggle-menu", {
          onclick: function () {
            m.route.set("/menu");
          }
        }, [
          m("span", "Menu")
        ]),
        m("div.header__search-form", [
          m("div.tab-full", [
            m("form.sign-up", {
              onsubmit: function (event) {
                event.preventDefault();
                auth.needLogin = undefined;
                auth.login();
              }
            }, [
              m("span.hide-content.add-white", "Email"),
              ("div", [
                m("input#sampleInput.margin-special.full-width[type=email]" +
                  "[placeholder=email]", {
                  oninput: function (e) {
                    auth.email = e.target.value;
                  }
                })
              ]),
              m("span.hide-content.add-white", "Password"),
              ("div", [
                m("input#sampleInput.full-width[type=password]" +
                  "[placeholder=password]", {
                  oninput: function (e) {
                    auth.password = e.target.value;
                  }
                })
              ]),
              m("input.btn--primary.full-width[type=submit][value=LOGIN]"),
              auth.observeError ?
                m("div.alert-box.alert-box--error.hideit", [
                  m("p", "Failed to login. Incorrect email or password.")
                ]) :
                m("p"),
              auth.needLogin ?
                m("div.alert-box.alert-box--error.hideit", [
                  m("p", "You need to login to access this view.")
                ]) :
                m("p")
            ])
          ])
        ]),
      ])
    ];
  }
};

export default login;
