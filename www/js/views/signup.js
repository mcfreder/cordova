import m from "mithril";

import auth from "../models/auth.js";
import register from "../models/register.js";

var signup = {
  oninit: function () {
    register.message = "";
    auth.needLogin = undefined;
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
                register.postReg();
              }
            }, [
              m("span.hide-content.add-white", "Email"),
              ("div", [
                m("input#sampleInput.margin-special.full-width[type=email]" +
                  "[placeholder=example@mailbox.com][required]", {
                  oninput: function (e) {
                    register.email = e.target.value;
                  }
                })
              ]),
              m("span.hide-content.add-white", "Password"),
              ("div", [
                m("input#sampleInput.full-width[type=text]" +
                  "[placeholder=examplepassword][required]", {
                  oninput: function (e) {
                    register.password = e.target.value;
                  }
                })
              ]),
              m("input.btn--primary.full-width[type=submit][value=CREATE]"),
              register.message ?
                m("div.alert-box.alert-box--success.hideit", [
                  m("p", {
                    onclick: function () {
                      m.route.set("/log-in");
                    }
                  }, "Success! Your account is now registered. " +
                  "Click here to login.")
                ]) :
                m("p")
            ])
          ])
        ]),
      ])
    ];
  }
};

export default signup;
