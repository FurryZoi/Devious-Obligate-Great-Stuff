(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js
  var require_bcmodsdk = __commonJS({
    "node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js"(exports) {
      var bcModSdk2 = function() {
        "use strict";
        const o = "1.2.0";
        function e(o2) {
          alert("Mod ERROR:\n" + o2);
          const e2 = new Error(o2);
          throw console.error(e2), e2;
        }
        const t = new TextEncoder();
        function n(o2) {
          return !!o2 && "object" == typeof o2 && !Array.isArray(o2);
        }
        function r(o2) {
          const e2 = /* @__PURE__ */ new Set();
          return o2.filter((o3) => !e2.has(o3) && e2.add(o3));
        }
        const i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
        function c(o2) {
          a.has(o2) || (a.add(o2), console.warn(o2));
        }
        function s(o2) {
          const e2 = [], t2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set();
          for (const r3 of f.values()) {
            const i3 = r3.patching.get(o2.name);
            if (i3) {
              e2.push(...i3.hooks);
              for (const [e3, a2] of i3.patches.entries()) t2.has(e3) && t2.get(e3) !== a2 && c(`ModSDK: Mod '${r3.name}' is patching function ${o2.name} with same pattern that is already applied by different mod, but with different pattern:
Pattern:
${e3}
Patch1:
${t2.get(e3) || ""}
Patch2:
${a2}`), t2.set(e3, a2), n2.add(r3.name);
            }
          }
          e2.sort((o3, e3) => e3.priority - o3.priority);
          const r2 = function(o3, e3) {
            if (0 === e3.size) return o3;
            let t3 = o3.toString().replaceAll("\r\n", "\n");
            for (const [n3, r3] of e3.entries()) t3.includes(n3) || c(`ModSDK: Patching ${o3.name}: Patch ${n3} not applied`), t3 = t3.replaceAll(n3, r3);
            return (0, eval)(`(${t3})`);
          }(o2.original, t2);
          let i2 = function(e3) {
            var t3, i3;
            const a2 = null === (i3 = (t3 = m.errorReporterHooks).hookChainExit) || void 0 === i3 ? void 0 : i3.call(t3, o2.name, n2), c2 = r2.apply(this, e3);
            return null == a2 || a2(), c2;
          };
          for (let t3 = e2.length - 1; t3 >= 0; t3--) {
            const n3 = e2[t3], r3 = i2;
            i2 = function(e3) {
              var t4, i3;
              const a2 = null === (i3 = (t4 = m.errorReporterHooks).hookEnter) || void 0 === i3 ? void 0 : i3.call(t4, o2.name, n3.mod), c2 = n3.hook.apply(this, [e3, (o3) => {
                if (1 !== arguments.length || !Array.isArray(e3)) throw new Error(`Mod ${n3.mod} failed to call next hook: Expected args to be array, got ${typeof o3}`);
                return r3.call(this, o3);
              }]);
              return null == a2 || a2(), c2;
            };
          }
          return { hooks: e2, patches: t2, patchesSources: n2, enter: i2, final: r2 };
        }
        function l(o2, e2 = false) {
          let r2 = i.get(o2);
          if (r2) e2 && (r2.precomputed = s(r2));
          else {
            let e3 = window;
            const a2 = o2.split(".");
            for (let t2 = 0; t2 < a2.length - 1; t2++) if (e3 = e3[a2[t2]], !n(e3)) throw new Error(`ModSDK: Function ${o2} to be patched not found; ${a2.slice(0, t2 + 1).join(".")} is not object`);
            const c2 = e3[a2[a2.length - 1]];
            if ("function" != typeof c2) throw new Error(`ModSDK: Function ${o2} to be patched not found`);
            const l2 = function(o3) {
              let e4 = -1;
              for (const n2 of t.encode(o3)) {
                let o4 = 255 & (e4 ^ n2);
                for (let e5 = 0; e5 < 8; e5++) o4 = 1 & o4 ? -306674912 ^ o4 >>> 1 : o4 >>> 1;
                e4 = e4 >>> 8 ^ o4;
              }
              return ((-1 ^ e4) >>> 0).toString(16).padStart(8, "0").toUpperCase();
            }(c2.toString().replaceAll("\r\n", "\n")), d2 = { name: o2, original: c2, originalHash: l2 };
            r2 = Object.assign(Object.assign({}, d2), { precomputed: s(d2), router: () => {
            }, context: e3, contextProperty: a2[a2.length - 1] }), r2.router = /* @__PURE__ */ function(o3) {
              return function(...e4) {
                return o3.precomputed.enter.apply(this, [e4]);
              };
            }(r2), i.set(o2, r2), e3[r2.contextProperty] = r2.router;
          }
          return r2;
        }
        function d() {
          for (const o2 of i.values()) o2.precomputed = s(o2);
        }
        function p() {
          const o2 = /* @__PURE__ */ new Map();
          for (const [e2, t2] of i) o2.set(e2, { name: e2, original: t2.original, originalHash: t2.originalHash, sdkEntrypoint: t2.router, currentEntrypoint: t2.context[t2.contextProperty], hookedByMods: r(t2.precomputed.hooks.map((o3) => o3.mod)), patchedByMods: Array.from(t2.precomputed.patchesSources) });
          return o2;
        }
        const f = /* @__PURE__ */ new Map();
        function u(o2) {
          f.get(o2.name) !== o2 && e(`Failed to unload mod '${o2.name}': Not registered`), f.delete(o2.name), o2.loaded = false, d();
        }
        function g(o2, t2) {
          o2 && "object" == typeof o2 || e("Failed to register mod: Expected info object, got " + typeof o2), "string" == typeof o2.name && o2.name || e("Failed to register mod: Expected name to be non-empty string, got " + typeof o2.name);
          let r2 = `'${o2.name}'`;
          "string" == typeof o2.fullName && o2.fullName || e(`Failed to register mod ${r2}: Expected fullName to be non-empty string, got ${typeof o2.fullName}`), r2 = `'${o2.fullName} (${o2.name})'`, "string" != typeof o2.version && e(`Failed to register mod ${r2}: Expected version to be string, got ${typeof o2.version}`), o2.repository || (o2.repository = void 0), void 0 !== o2.repository && "string" != typeof o2.repository && e(`Failed to register mod ${r2}: Expected repository to be undefined or string, got ${typeof o2.version}`), null == t2 && (t2 = {}), t2 && "object" == typeof t2 || e(`Failed to register mod ${r2}: Expected options to be undefined or object, got ${typeof t2}`);
          const i2 = true === t2.allowReplace, a2 = f.get(o2.name);
          a2 && (a2.allowReplace && i2 || e(`Refusing to load mod ${r2}: it is already loaded and doesn't allow being replaced.
Was the mod loaded multiple times?`), u(a2));
          const c2 = (o3) => {
            let e2 = g2.patching.get(o3.name);
            return e2 || (e2 = { hooks: [], patches: /* @__PURE__ */ new Map() }, g2.patching.set(o3.name, e2)), e2;
          }, s2 = (o3, t3) => (...n2) => {
            var i3, a3;
            const c3 = null === (a3 = (i3 = m.errorReporterHooks).apiEndpointEnter) || void 0 === a3 ? void 0 : a3.call(i3, o3, g2.name);
            g2.loaded || e(`Mod ${r2} attempted to call SDK function after being unloaded`);
            const s3 = t3(...n2);
            return null == c3 || c3(), s3;
          }, p2 = { unload: s2("unload", () => u(g2)), hookFunction: s2("hookFunction", (o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            "number" != typeof t3 && e(`Mod ${r2} failed to hook function '${o3}': Expected priority number, got ${typeof t3}`), "function" != typeof n2 && e(`Mod ${r2} failed to hook function '${o3}': Expected hook function, got ${typeof n2}`);
            const s3 = { mod: g2.name, priority: t3, hook: n2 };
            return a3.hooks.push(s3), d(), () => {
              const o4 = a3.hooks.indexOf(s3);
              o4 >= 0 && (a3.hooks.splice(o4, 1), d());
            };
          }), patchFunction: s2("patchFunction", (o3, t3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            n(t3) || e(`Mod ${r2} failed to patch function '${o3}': Expected patches object, got ${typeof t3}`);
            for (const [n2, i4] of Object.entries(t3)) "string" == typeof i4 ? a3.patches.set(n2, i4) : null === i4 ? a3.patches.delete(n2) : e(`Mod ${r2} failed to patch function '${o3}': Invalid format of patch '${n2}'`);
            d();
          }), removePatches: s2("removePatches", (o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const t3 = l(o3);
            c2(t3).patches.clear(), d();
          }), callOriginal: s2("callOriginal", (o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to call a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3);
            return Array.isArray(t3) || e(`Mod ${r2} failed to call a function: Expected args array, got ${typeof t3}`), i3.original.apply(null != n2 ? n2 : globalThis, t3);
          }), getOriginalHash: s2("getOriginalHash", (o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to get hash: Expected function name string, got ${typeof o3}`);
            return l(o3).originalHash;
          }) }, g2 = { name: o2.name, fullName: o2.fullName, version: o2.version, repository: o2.repository, allowReplace: i2, api: p2, loaded: true, patching: /* @__PURE__ */ new Map() };
          return f.set(o2.name, g2), Object.freeze(p2);
        }
        function h() {
          const o2 = [];
          for (const e2 of f.values()) o2.push({ name: e2.name, fullName: e2.fullName, version: e2.version, repository: e2.repository });
          return o2;
        }
        let m;
        const y = void 0 === window.bcModSdk ? window.bcModSdk = function() {
          const e2 = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) };
          return m = e2, Object.freeze(e2);
        }() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')
One of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk);
        return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: true }), exports.default = y), y;
      }();
    }
  });

  // src/modules/utils.ts
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function waitFor(func, cancelFunc = () => false) {
    while (!func()) {
      if (cancelFunc()) {
        return false;
      }
      await sleep(10);
    }
    return true;
  }
  function getPlayer(value) {
    if (!value) return;
    return ChatRoomCharacter.find((Character) => {
      return Character.MemberNumber == value || Character.Name.toLowerCase() === value || Character.Nickname?.toLowerCase() === value;
    });
  }
  function getNickname(target) {
    return CharacterNickname(target);
  }
  function beautifyMessage(message) {
    message = message.replaceAll("<!", `<span style='color: #48AA6D;'>`).replaceAll("!>", "</span>");
    return message;
  }
  function chatSendDOGSMessage(msg, _data = void 0, targetNumber = void 0) {
    const data = {
      Content: "dogsMsg",
      Dictionary: {
        msg
      },
      Type: "Hidden"
    };
    if (_data) data.Dictionary.data = _data;
    if (targetNumber) data.Target = targetNumber;
    ServerSend("ChatRoomChat", data);
  }
  function chatSendBeep(data, targetId) {
    const beep = {
      IsSecret: true,
      BeepType: "Leash",
      MemberNumber: targetId,
      Message: JSON.stringify({
        type: "DOGS",
        ...data
      })
    };
    ServerSend("AccountBeep", beep);
  }
  function chatSendCustomAction(message) {
    if (!ServerPlayerIsInChatRoom()) return;
    const isFemale = CharacterPronounDescription(Player) === "She/Her";
    const capPossessive = isFemale ? "Her" : "His";
    const capIntensive = isFemale ? "Her" : "Him";
    const capSelfIntensive = isFemale ? "Herself" : "Himself";
    const capPronoun = isFemale ? "She" : "He";
    message = message.replaceAll("<Possessive>", capPossessive).replaceAll("<possessive>", capPossessive.toLocaleLowerCase()).replaceAll("<Intensive>", capIntensive).replaceAll("<intensive>", capIntensive.toLocaleLowerCase()).replaceAll("<SelfIntensive>", capSelfIntensive).replaceAll("<selfIntensive>", capSelfIntensive.toLocaleLowerCase()).replaceAll("<Pronoun>", capPronoun).replaceAll("<pronoun>", capPronoun.toLocaleLowerCase());
    ServerSend("ChatRoomChat", {
      Content: "Beep",
      Type: "Action",
      Dictionary: [
        // EN
        { Tag: "Beep", Text: "msg" },
        // CN
        { Tag: "\u53D1\u9001\u79C1\u804A", Text: "msg" },
        // DE
        { Tag: "Biep", Text: "msg" },
        // FR
        { Tag: "Sonner", Text: "msg" },
        // Message itself
        { Tag: "msg", Text: message }
      ]
    });
  }
  function notify(message, duration = 3e3, notificationColor = "rgb(72,70,109)", sliderColor = "rgb(61,132,168)") {
    if (document.querySelector("#dogsNotificationBlock")) {
      document.querySelector("#dogsNotificationBlock").remove();
    }
    const targetElement = document.querySelector("#dogsFullScreen") ? document.querySelector("#dogsFullScreen") : document.querySelector("#MainCanvas");
    const notificationCenterBlock = document.createElement("div");
    notificationCenterBlock.id = "dogsNotificationBlock";
    notificationCenterBlock.classList.add("adaptive-font-size");
    notificationCenterBlock.style = `position: absolute; top: ${(document.body.offsetHeight - targetElement.offsetHeight) / 2 + 2}px; margin-left: 50%; transform: translateX(-50%); z-index: 100; font-family: Comfortaa;`;
    const notification = document.createElement("div");
    notification.style = `position: relative; display: flex; justify-content: center; align-items: center; background: ${notificationColor}; color: white; min-width: 150px; padding: 1.4vw; border-radius: clamp(2px, 0.6vw, 4px);`;
    const notificationContent = document.createElement("p");
    notificationContent.style = "text-align: center; width: 90%;";
    notificationContent.innerHTML = beautifyMessage(message);
    const notificationSlider = document.createElement("div");
    notificationSlider.style = `position: absolute; left: 0; bottom: 0; width: 0; height: 0.5vw; max-height: 3px; background: ${sliderColor}; border-radius: clamp(2px, 0.6vw, 4px);`;
    const notificationCloseBtn = document.createElement("div");
    notificationCloseBtn.textContent = "x";
    notificationCloseBtn.style = "cursor: pointer; position: absolute; top: 0.4vw; right: 1vw; color: white; font-size: clamp(12px, 3vw, 26px);";
    notificationCloseBtn.addEventListener("click", () => {
      clearInterval(i);
      notificationCenterBlock.remove();
    });
    notification.append(notificationContent, notificationSlider, notificationCloseBtn);
    notificationCenterBlock.append(notification);
    document.body.append(notificationCenterBlock);
    window.onresize = () => {
      notificationCenterBlock.style = `position: absolute; top: ${(document.body.offsetHeight - targetElement.offsetHeight) / 2 + 2}px; margin-left: 50%; transform: translateX(-50%); z-index: 100; font-family: Comfortaa;`;
    };
    const i = setInterval(() => {
      notificationSlider.style.width = `${parseInt(notificationSlider.style.width.replace("%", "")) + 1}%`;
      if (parseInt(notificationSlider.style.width.replace("%", "")) >= 100) {
        clearInterval(i);
        notificationCenterBlock.remove();
      }
    }, duration / 100);
  }
  async function requestButtons(l, w, maxw, btns) {
    if (document.querySelector("#dogsPopupContainer")) {
      document.querySelector("#dogsPopupContainer").remove();
    }
    const container = document.createElement("div");
    container.id = "dogsPopupContainer";
    const popup = document.createElement("div");
    popup.id = "dogsPopup";
    popup.classList.add("adaptive-font-size");
    popup.style = `width: ${w}%; min-width: 170px; max-width: ${maxw}px;`;
    const label = document.createElement("p");
    label.style = `color: white; text-align: center; padding: 0px 8px;`;
    label.innerHTML = beautifyMessage(l);
    const btnsBlock = document.createElement("div");
    btnsBlock.style = "display: flex; align-items: center; justify-content: center; flex-wrap: wrap; width: 100%; margin-top: 10px; gap: 10px;";
    btns.forEach((btn) => {
      const el = document.createElement("button");
      el.innerText = btn.text;
      el.classList.add("dogsSquare");
      el.classList.add("adaptive-font-size");
      el.style = `text-wrap: wrap; text-align: center;`;
      btnsBlock.append(el);
    });
    popup.append(label, btnsBlock);
    container.append(popup);
    document.body.append(container);
    return new Promise((resolve, reject) => {
      btnsBlock.childNodes.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          resolve(e.target.innerText);
          container.remove();
        });
      });
    });
  }
  function chatSendLocal(message, align = "center", bgColor = "rgb(72,70,109)") {
    if (!ServerPlayerIsInChatRoom()) return;
    let style2;
    if (align === "center") {
      style2 = `border-left: clamp(1px, 1vw, 4px) solid white; border-top-left-radius: clamp(2px, 0.6vw, 4px); border-bottom-left-radius: clamp(2px, 0.6vw, 4px); position: relative; box-sizing: border-box; font-size: 2vw; font-family: Comfortaa; margin-top: 4px; margin-bottom: 4px; background: ${bgColor}; color: white; padding: 1vw; text-align: center;`;
    } else if (align === "left") {
      style2 = `border-left: clamp(1px, 1vw, 4px) solid whhite; border-top-left-radius: clamp(2px, 0.6vw, 4px); border-bottom-left-radius: clamp(2px, 0.6vw, 4px); position: relative; box-sizing: border-box; font-size: 2vw; font-family: Comfortaa; margin-top: 4px; margin-bottom: 4px; background: ${bgColor}; color: white;`;
    }
    const msgElement = document.createElement("div");
    msgElement.innerHTML = beautifyMessage(message);
    msgElement.style = style2;
    msgElement.classList.add("dogsMessageBlock");
    const time = document.createElement("div");
    time.style = "position: absolute; font-size: 1.5vw; padding: 1px; text-align: center; background: white; color: rgb(72,70,109); bottom: 0; right: 0;";
    time.classList.add("current-time");
    time.textContent = ChatRoomCurrentTime();
    msgElement.append(time);
    document.querySelector("#TextAreaChatLog").appendChild(msgElement);
    ElementScrollToEnd("TextAreaChatLog");
  }
  function drawCheckbox(left, top, width, height, text, isChecked, isDisabled = false, textColor = "Black", textLeft = 200, textTop = 45) {
    DrawText(text, left + textLeft, top + textTop, textColor, "Gray");
    DrawButton(left, top, width, height, "", isDisabled ? "#ebebe4" : "White", isChecked ? "Icons/Checked.png" : "", null, isDisabled);
  }
  function drawWrappedText(text, x, y, color, charactersCount, gap = 50) {
    const lines = [];
    let line = "";
    for (let c of text) {
      line += c;
      if (line.length === charactersCount) {
        lines.push(line);
        line = "";
      }
    }
    if (line) lines.push(line);
    for (let l in lines) {
      DrawText(lines[parseInt(l)], x, y + parseInt(l) * gap, color);
    }
  }

  // src/modules/bcModSdk.ts
  var import_bondage_club_mod_sdk = __toESM(require_bcmodsdk());
  var modSdk = import_bondage_club_mod_sdk.default.registerMod({
    name: "DOGS",
    fullName: "Devious Obligate Great Stuff",
    version: getModVersion(),
    repository: "https://github.com/FurryZoi/Devious-Obligate-Great-Stuff.git"
  });
  function hookFunction(functionName, priority, hook) {
    return modSdk.hookFunction(functionName, priority, hook);
  }
  function patchFunction(functionName, patches) {
    modSdk.patchFunction(functionName, patches);
  }

  // src/modules/storage.ts
  var modStorage;
  var modStorageSaveString;
  function initStorage() {
    const data = {
      remoteControl: {},
      deviousPadlock: {},
      version: getModVersion()
    };
    if (typeof Player.ExtensionSettings.DOGS === "string") {
      modStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.DOGS)) ?? data;
    } else modStorage = data;
    Object.keys(data).forEach((key) => {
      if (modStorage[key] === void 0) {
        modStorage[key] = data[key];
      }
    });
    modStorageSaveString = JSON.stringify(modStorage);
    migrateModStorage();
    hookFunction("ChatRoomMessage", 20, (args, next) => {
      const message = args[0];
      const sender = getPlayer(message.Sender);
      if (!sender) return next(args);
      if (message.Content === "dogsMsg" && !sender.IsPlayer()) {
        const msg = message.Dictionary.msg;
        const data2 = message.Dictionary.data;
        if (msg === "syncStorage") {
          if (!sender.DOGS) {
            chatSendDOGSMessage("syncStorage", {
              storage: modStorage
            }, sender.MemberNumber);
          }
          sender.DOGS = data2.storage;
        }
      }
      next(args);
    });
    hookFunction("ChatRoomSync", -20, (args, next) => {
      next(args);
      chatSendDOGSMessage("syncStorage", {
        storage: modStorage
      });
    });
    window.modStorage = modStorage;
  }
  function migrateModStorage() {
    if (typeof modStorage.deviousPadlock.itemGroups === "object") {
      Object.values(modStorage.deviousPadlock.itemGroups).forEach((d) => {
        if (d.item.Name) {
          d.item.name = d.item.Name;
          delete d.item.Name;
        }
        if (d.item.Color) {
          d.item.color = d.item.Color;
          delete d.item.Color;
        }
        if (d.item.Craft) {
          d.item.craft = d.item.Craft;
          delete d.item.Craft;
        }
        if (d.item.Property) {
          d.item.property = d.item.Property;
          delete d.item.Property;
        }
        delete d.item.Difficulty;
        delete d.item.Group;
      });
    }
  }
  function updateModStorage() {
    if (typeof modStorage !== "object") return;
    if (JSON.stringify(modStorage) === modStorageSaveString) return;
    modStorageSaveString = JSON.stringify(modStorage);
    Player.ExtensionSettings.DOGS = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("DOGS");
    chatSendDOGSMessage("syncStorage", {
      storage: modStorage
    });
  }
  setInterval(updateModStorage, 800);

  // src/modules/remoteControl.ts
  var remoteControlTarget = null;
  var remoteControlState = null;
  var remoteControlControllers = [];
  function setRemoteControlTarget(target) {
    remoteControlTarget = target;
  }
  function setRemoteControlState(state) {
    remoteControlState = state;
  }
  function hasPermissionForRemoteControl(targetId) {
    if (!modStorage.remoteControl.state) return false;
    if (modStorage.remoteControl.permission === 2) {
      return Player.IsLoverOfMemberNumber(targetId) || Player.IsOwnedByMemberNumber(targetId);
    }
    if (modStorage.remoteControl.permission === 1) {
      return Player.IsLoverOfMemberNumber(targetId) || Player.IsOwnedByMemberNumber(targetId) || Player.WhiteList.includes(targetId);
    }
    return Player.FriendList.includes(targetId);
  }
  function loadRemoteControl() {
    hookFunction("DialogMenuButtonBuild", 20, (args, next) => {
      next(args);
      if (remoteControlState === "interacting") {
        DialogMenuButton = DialogMenuButton.filter((btn) => btn !== "Activity");
      }
    });
    hookFunction("DialogLeave", 20, (args, next) => {
      if (remoteControlState === "interacting") {
        return DialogLeaveFocusItem();
      }
      return next(args);
    });
    hookFunction("DialogMenuBack", 20, (args, next) => {
      if (remoteControlState === "interacting") {
        chatSendBeep({
          action: "remoteControlUpdate",
          appearance: ServerAppearanceBundle(CurrentCharacter.Appearance)
        }, remoteControlTarget);
        remoteControlState = null;
        ChatRoomStatusUpdate("");
        DialogLeave();
        return null;
      }
      return next(args);
    });
    hookFunction("ChatRoomRun", 20, (args, next) => {
      switch (remoteControlState) {
        case "loading":
          DrawRect(0, 0, 2e3, 1e3, "#48466D");
          DrawText("Loading...", 1e3, 500, "white", "center");
          return null;
        case "interacting":
          return null;
        default:
          return next(args);
      }
    });
    hookFunction("ServerAccountBeep", 20, (args, next) => {
      const beep = args[0];
      if (!beep.BeepType) return next(args);
      if (beep.BeepType !== "Leash") {
        return next(args);
      }
      let data;
      try {
        data = JSON.parse(beep.Message);
      } catch {
        return next(args);
      }
      if (data.type !== "DOGS") return next(args);
      if (data.action === "remoteControlResponse") {
        if (remoteControlTarget !== beep.MemberNumber) return;
        const C = CharacterLoadOnline(data.bundle, beep.MemberNumber);
        setRemoteControlState("interacting");
        ChatRoomFocusCharacter(C);
        if (!C.AllowItem) C.AllowItem = true;
        DialogChangeMode("items");
        DialogChangeFocusToGroup(C, "ItemArms");
      }
      if (data.action === "remoteControlRequest") {
        if (!hasPermissionForRemoteControl(beep.MemberNumber)) {
          return chatSendBeep({
            action: "remoteControlReject",
            reason: "noPermissions"
          }, beep.MemberNumber);
        }
        if (CurrentScreen !== "ChatRoom") {
          return chatSendBeep({
            action: "remoteControlReject",
            reason: "targetNotInChatRoom"
          }, beep.MemberNumber);
        }
        chatSendBeep({
          bundle: {
            ID: Player.OnlineID,
            Name: Player.Name,
            ActivePose: Player.ActivePose,
            ArousalSettings: Player.ArousalSettings,
            AssetFamily: Player.AssetFamily,
            BlackList: Player.BlackList,
            BlockItems: Player.BlockItems,
            Crafting: null,
            Creation: Player.Creation,
            Description: Player.Description,
            Difficulty: Player.Difficulty,
            FavoriteItems: {},
            Game: {},
            Inventory: {},
            LimitedItems: {},
            ItemPermission: Player.ItemPermission,
            Lovership: Player.Lovership,
            LabelColor: Player.LabelColor,
            MemberNumber: Player.MemberNumber,
            Nickname: Player.Nickname,
            OnlineSharedSettings: Player.OnlineSharedSettings,
            Owner: Player.Owner,
            Ownership: Player.Ownership,
            Reputation: Player.Reputation,
            Title: Player.Title,
            WhiteList: [],
            Appearance: ServerAppearanceBundle(Player.Appearance)
          },
          action: "remoteControlResponse"
        }, beep.MemberNumber);
        if (!remoteControlControllers.includes(beep.MemberNumber)) {
          remoteControlControllers.push(beep.MemberNumber);
        }
        const name = Player.FriendNames.get(beep.MemberNumber) || beep.MemberNumber;
        chatSendLocal(`<!${name}!> used <!remote control!> on you!`);
      }
      if (data.action === "remoteControlUpdate") {
        if (!hasPermissionForRemoteControl(beep.MemberNumber) || !remoteControlControllers.includes(beep.MemberNumber)) return;
        ServerAppearanceLoadFromBundle(
          Player,
          Player.AssetFamily,
          data.appearance,
          beep.MemberNumber
        );
        const name = Player.FriendNames.get(beep.MemberNumber) || beep.MemberNumber;
        chatSendLocal(`<!${name}!> remotely changed your appearance`);
        chatSendCustomAction(`${getNickname(Player)}'s appearance was remotely changed`);
        ChatRoomCharacterUpdate(Player);
        remoteControlControllers.splice(remoteControlControllers.indexOf(beep.MemberNumber), 1);
      }
      if (data.action === "remoteControlReject") {
        if (remoteControlTarget !== beep.MemberNumber) return;
        if (data.reason === "targetNotInChatRoom") {
          chatSendLocal("The player is not in the <!chat room!>!");
        } else if (data.reason === "noPermissions") {
          chatSendLocal("You dont have <!permission!> to use <!remote control!> on this player!");
        } else {
          chatSendLocal("For <!unknown reasons!>, you failed to use <!remote control!> on this player!");
        }
        remoteControlState = null;
      }
      next(args);
    });
  }

  // src/images/settings-remote-control.png
  var settings_remote_control_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAARWSURBVGhD7ZvLr01XHMevokWqDAhCRSSExttAaYnEiCAV8WrrlXqMPP4Dow5qZFpMjSqVGBATFVFMWkFjgqjWM8Q7pPX8fs7ZK/lZWXffffc+e+91bvtJPjnr7LX22vd31tpr7ce6vTrKZ5BcKBfI6XKMHCzhkbwmz8nj8qh8LNuSsXKvfC7fZpSy7MO+bUM/+b38R4aCyiL7UsdHsqW0ukt/KE/KWY1v70MQv8lL8j4bxBD5mZwpQ8GdlfPky8a3CPlc+q1FkGvlx7IzyFsnKevvH/rxooHB6LbkD30gCaI7vYiy6+VDSR235CcyaobJlXJ441s+2Jc6qKstoeW+lIzAnMMvEkn/KOfKKqbISvhUHpP2vAxJGcq2NbQarRgKMOQfstSWLrsb9ZVPpZty3sgzkisrmCEZ2T9ofGteeHBl9qrxrU3ZKRl1T8tpbPBgGz8CZSjbI8jSk3rMoBUVrfhVB8jNcpFk3mx1SzGY3ZVH5D7JeV4b4+Vl6Y+2ZcmxxslaoGWrDNbJMTl25eyQoT+oCrfLXLj5Lw88xagLxotcFAm4yM1BUXIfu0jAdc6buY9dJOA0rsilcrm8wQbDn/IruUxeZ4OBsuzDvlfZEBPnZWhAwSXSwUMAm7dCOrjntXk8GXEQtM2zcuxclNXCPNty2DTkzaudtBama9Kym+S9ZJuTR0AbE+8k25yU/U7ymIc6bJ41dwsXIS3gso2uS0fL/wG3CKYeRuBvJeephXNztVyTpC2c39/IVdKfsmon7RxmnnVskDaPYB2kbR5lHdRh86zRncP2Ssi/KsqbVztpLex3aZtHN6Y7uy5t8/wubfOsuVu4CGkBl210XTpa/nMBFxkY6FZTmslMPJGH5a/yL8mxebXCOyduNrrzlvCCnNpMVkfWc9i9zU8LiDzK/CtDdfhGO2jxjpgWzApvEdknVJc1yoBp2S+kD2tAJif2Z4MHP1BXLR1lwLukZaDcI59JV4Y028izsK+tyze6gFm0Yp8dc47+LkNlkTx7jrPmI61r5w64rGnpoLSvRHZLFqV1Bnk/NJMNaPmfmsl4SGthLg8dvO/NsmaLJRB2pQ91hMphdC1sb+0mySzPpxjM7Nxayu1hWQHzpt/RO/nMgi1r62gZZQU8KvkE1ni8biZTYbXdxWayga2jZZQV8OzkExixGcS64mfJsgfHnOQzGtIGLe5zWdDi4F0Qy4RDZZE8+76IRTCswguVxdyDVhHSAsZt0jJCHpJ0b1eGNNvIs7Cvrcs3yoC5O5oofUbKxYmkfVhdy1KnUJ3OKANGbgMnyKxQln1CdVmjDRhZ0r9F9pGdQd5WSdlQHb65A67yAQAP9g7IU/JvNojRkrujryX/C5GVqB8AlGHuFi5rHo6WIgHbi4Sq4dYxF0UC/iX5rIMTyWelDJVcNobOsTLlmBy7FubLrFNJK+Q/2ThmrTCdsOjzpuSWLvSHFpE6ua7eL7szdQXo6HgHt8PvLYBuVy0AAAAASUVORK5CYII=";

  // src/images/settings-devious-padlock.png
  var settings_devious_padlock_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAdhwAAHYcAafCeOoAAAS9SURBVGhD1ZtpyHxTHIBfS/blb99F9lCEj7LvPkhRvvz5gHxRinwRoeQDiSRZIhRlp2Qp2RJlS7aQfUmW7Pv6PO/M1fnf+d07c++cee+dp57mvtPMnXNmzvI7v3PelRa6YRc8EPfCbXEd/Au/wnfweXwKf8a5ZXU8HV/FfyfQyt6Eu+PccTS+h1HFxvk3Xo8bYO9ZFa/CfzCqTBM/wn2xt9iEH8Co8G39CQ/G3uFgeAdGhZ5WK70P9oqzMCpsWZv6J/gyvoEOVNHryn6A62Mv2AF/xaighZ/hObglptjnD8F7cVy/vw57wbimfCuui+M4DL/E6B7qvL0bdsp26DQSFVAdsZuwKxqMRPfSG7BTzsOoYPo0roxNOQKj++n36GzQGc9hVDD7o2FkW+7H6L56OHaC3/TvGBXqWZwGKxXdVy/AiWnTxKpwEbDa4HKEx4aPbbE7/DG4HGHn4eNE5KzwJsPHCFdA0/Abfjy4HKHuc0eoqrCR0kX4KJ4w/HscVb+uOC9PixFWRN3nToxr1bSf2KT2xjrK70k9DqflFYzu/QROTNUv/A06nxbsjy+gy7TNfGJeqarwa3gMpn1vFTwN38ZjfWIeqRu07L97ojGvE3yBQfv5g8sV+GH4GJG+fy7YFA3jjF/tN1diGQe2y9AW8O5QW8g1mGM2yNKHm2LyzdVMjgo0ZaaDVhX+eo+joeJc0sUv1SlRQGF20FE4WoX8iA9ijkCiKTbpaAHyJB40uGyOX4DzbdRXCu/ELlgbTRyUXQtbYxMfl1d6E+cWg4kUK2RaxWz/L+jcmvo5novTLgY6Y5JFwThcnrnA2BFNwnXBd/gMmiioWkZOjc3/UqzLYS21TptGhzPBykYf2rV2ya0xKzbjPv2yZU0Fh7QNPOyzfQ5ajsdwPGlbaAeoPuOcvdXgckXaVtgc09cl65aHs+RPNGFRLs/MW6BT3B54D0b9KrfuSJyK/pqdYsWvxqiQufQX3Ql7wxpoVBYVtqw7iS4AXkKDhug1Zc/EJeVidJGRejumKVO3M6PCFn6Inv1Ioz1zzNdi9PrULbDAlZ1bPOXybIPZuA2jguyHBRdi9Bp1E7y8N5zi9kn0vsL0S3oIo9eEM0nukay8GKnibLTJV3EJeiKgCitU0KgOMx+6A0wiuMNfsBwN/k32r+cTYBRnF8lOFxX+FM1+FpjyNfVrsj/Nd3uuKztdVNgUUtoHi6yje0cvDi4X2XD4mJUuKrw5prmpM/AA9LxGmlhw5yM7XVRYLsdigDPla/+1qReY+3bKyk5XFfY0nYNSMUilHIl3Y9rss9FVheVEfB83WvxrgHvSD+Oyxb9mQO4Kp/PjJFjZNP9dF4xU0egz21bYEbW8HDO8ex0LNh4+jiNtupOWJ733XfgFlsuT7m/PHLMNk56PPhllTXwLo9eUPQV7Rd0BtbIu4B/BJgfIPeDSi5MINrUrcNzB0By6/3woNuqWbYd+l4dHDS7/x8yDi/KlTsab+XD1Vd7CNZHn81m4BaNvvU9ujyO0HaX9/4M+4xFIMykjtK3wfei32FcMXrLvMd2M5WbUB40RPGedHSMk4+HoQ7vSfaXa/3rJEaB73OAk7GKELvgW3S69cXhdwcLCf0UCJzjt4nzEAAAAAElFTkSuQmCC";

  // src/images/slavery.png
  var slavery_default = "data:image/png;base64,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";

  // src/modules/settingsMenu.ts
  function loadSettingsMenu() {
    let currentSettingsPage = null;
    const settingsPages = {
      remoteControl: {
        name: "Remote control",
        icon: () => settings_remote_control_default,
        draw: () => {
          const remoteControlPermissionsTexts = {
            0: "Friends and higher",
            1: "Whitelist and higher",
            2: "Lovers and higher"
          };
          DrawText(
            "Devious Overwhelming Gear Script (DOGS) - Remote control",
            1e3,
            125,
            "Black",
            "Gray"
          );
          drawCheckbox(150, 300, 65, 65, "Enabled", modStorage.remoteControl.state ? true : false, false, "black", 150, 35);
          DrawText("Who can use remote control on you", 430, 440, "black");
          DrawBackNextButton(
            150,
            470,
            560,
            90,
            remoteControlPermissionsTexts[modStorage.remoteControl.permission ?? 0],
            "white",
            "",
            () => {
              const p = modStorage.remoteControl.permission ?? 0;
              if (p === 0) return remoteControlPermissionsTexts[0];
              return remoteControlPermissionsTexts[p - 1];
            },
            () => {
              const p = modStorage.remoteControl.permission ?? 0;
              if (p === 2) return remoteControlPermissionsTexts[2];
              return remoteControlPermissionsTexts[p + 1];
            }
          );
          drawWrappedText(
            `Remote control lets allowed users to remotely change your appearance, now you don't need to be in the same room to change items of your friends. If remote control is disabled then no one can use it on you. Type "/dogs remote <member number>" to connect remotely.`,
            1400,
            250,
            "black",
            50
          );
        },
        onClick: () => {
          if (MouseIn(150, 300, 65, 65)) modStorage.remoteControl.state = !modStorage.remoteControl.state;
          if (MouseIn(150, 470, 560 / 2, 90)) {
            modStorage.remoteControl.permission = modStorage.remoteControl.permission === 0 ? 0 : (modStorage.remoteControl.permission ?? 0) - 1;
          }
          if (MouseIn(150 + 560 / 2, 470, 560 / 2, 90)) {
            modStorage.remoteControl.permission = modStorage.remoteControl.permission === 2 ? 2 : (modStorage.remoteControl.permission ?? 0) + 1;
          }
        }
      },
      deviousPadlock: {
        name: "Devious padlock",
        icon: () => settings_devious_padlock_default,
        draw: () => {
          DrawText(
            "Devious Overwhelming Gear Script (DOGS) - Devious padlock",
            1e3,
            125,
            "Black",
            "Gray"
          );
          drawCheckbox(150, 300, 65, 65, "Enabled", modStorage.deviousPadlock.state, false, "black", 150, 35);
          drawWrappedText(
            `The padlock is made in such a way that the wearer cannot remove it on him own. In the padlock settings you can add notes and configure access rights. By default these padlocks are disabled and cannot be used on you, but you can always change it :3`,
            1400,
            250,
            "black",
            50
          );
        },
        onClick: () => {
          if (MouseIn(150, 300, 65, 65)) modStorage.deviousPadlock.state = !modStorage.deviousPadlock.state;
        }
      }
    };
    const settingsButtonLeft = 200;
    const settingsButtonTop = 260;
    const settingsButtonWidth = 600;
    const settingsButtonHeight = 75;
    const settingsButtonsGap = 100;
    PreferenceRegisterExtensionSetting({
      Identifier: "DOGS",
      ButtonText: "DOGS Settings",
      Image: slavery_default,
      click: () => {
        if (MouseIn(1815, 75, 90, 90)) currentSettingsPage === null ? PreferenceSubscreenExtensionsClear() : currentSettingsPage = null;
        const buttonsPositions = {};
        if (currentSettingsPage === null) {
          Object.keys(settingsPages).forEach((pageKey, i) => {
            buttonsPositions[pageKey] = [settingsButtonLeft, settingsButtonTop + i * settingsButtonsGap, settingsButtonWidth, settingsButtonHeight];
          });
          Object.keys(buttonsPositions).forEach((pageKey) => {
            if (MouseIn(...buttonsPositions[pageKey])) currentSettingsPage = pageKey;
          });
        } else {
          settingsPages[currentSettingsPage].onClick();
        }
      },
      run: () => {
        if (currentSettingsPage === null) {
          DrawText(
            "Devious Overwhelming Gear Script (DOGS) - General",
            1e3,
            125,
            "Black",
            "Gray"
          );
          Object.keys(settingsPages).forEach((pageKey, i) => {
            const page = settingsPages[pageKey];
            DrawButton(
              settingsButtonLeft,
              settingsButtonTop + i * settingsButtonsGap,
              settingsButtonWidth,
              settingsButtonHeight,
              page.name,
              "White",
              page.icon()
            );
          });
        } else {
          settingsPages[currentSettingsPage].draw();
        }
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
      },
      exit: () => {
      },
      load: () => {
      }
    });
  }

  // src/modules/commands.ts
  var commands = [
    {
      name: "remote",
      description: "Remote control",
      action: (text) => {
        const args = getArgs(text);
        const targetId = parseInt(args[0]);
        if (!targetId) {
          return chatSendLocal(
            `Example: /dogs remote <character id>`
          );
        }
        chatSendBeep({
          action: "remoteControlRequest"
        }, targetId);
        setRemoteControlState("loading");
        setRemoteControlTarget(targetId);
        ChatRoomHideElements();
        ChatRoomStatusUpdate("Preference");
        setTimeout(function() {
          if (remoteControlState === "loading") {
            setRemoteControlState(null);
            setRemoteControlTarget(null);
            chatSendLocal("The remote request <!timed out!>! Target player may be <!offline!> or not using <!DOGS!>!");
          }
        }, 5e3);
      }
    }
  ];
  function getArgs(text) {
    return text.split(",").map((arg) => {
      return arg.trim();
    });
  }
  function loadCommands() {
    CommandCombine([
      {
        Tag: "dogs",
        Description: "Execute DOGS command",
        Action: function(text) {
          const commandName = text.split(" ")[0];
          const commandText = text.split(" ").slice(1).join(" ");
          const command = commands.find((c) => c.name === commandName);
          if (command) {
            command.action(commandText);
          } else {
            chatSendLocal(
              "Unknown command, use <!/dogs help!> to view a list of all available commands!"
            );
          }
        }
      }
    ]);
  }

  // src/images/devious-padlock.png

  // src/images/back-arrow.png
  var back_arrow_default = "data:image/png;base64,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";

  // src/modules/deviousPadlock.ts
  var deviousPadlock = {
    AllowType: [],
    Effect: [],
    Extended: true,
    IsLock: true,
    Name: "DeviousPadlock",
    Time: 10,
    Value: 70,
    Wear: false,
    RemovalTime: 1e3
  };
  var chaosPadlockAccessPermissionsList = [
    "Everyone except wearer",
    "Wearer's family and higher",
    "Wearer's lovers and higher",
    "Wearer's owner"
  ];
  var deviousPadlockMenuData = null;
  var deviousPadlockMenuLastData = null;
  function createDeviousPadlock() {
    AssetFemale3DCG.forEach((ele) => {
      if (ele.Group === "ItemMisc") {
        ele.Asset.push(deviousPadlock);
      }
    });
    const assetGroup = AssetGroupGet("Female3DCG", "ItemMisc");
    AssetAdd(assetGroup, deviousPadlock, AssetFemale3DCGExtended);
    AssetGet("Female3DCG", "ItemMisc", deviousPadlock.Name).Description = "Devious Padlock";
    InventoryAdd(Player, deviousPadlock.Name, "ItemMisc");
  }
  function convertExclusivePadlockToDeviousPadlock(item) {
    if (item.Property?.Name !== deviousPadlock.Name) {
      item.Property.Name = deviousPadlock.Name;
    }
  }
  function getSavedItemData(item) {
    return {
      name: item.Asset.Name,
      color: item.Color,
      craft: item.Craft,
      property: item.Property
    };
  }
  function registerDeviousPadlockInModStorage(group, ownerId) {
    if (!modStorage.deviousPadlock.itemGroups) {
      modStorage.deviousPadlock.itemGroups = {};
    }
    const currentItem = InventoryGet(Player, group);
    modStorage.deviousPadlock.itemGroups[group] = {
      item: getSavedItemData(currentItem),
      owner: ownerId
    };
  }
  function inspectDeviousPadlock(target, item, itemGroup) {
    let deviousPadlock2;
    if (target.IsPlayer()) {
      deviousPadlock2 = modStorage.deviousPadlock;
    } else {
      deviousPadlock2 = target.DOGS.deviousPadlock;
    }
    deviousPadlockMenuData = {
      owner: deviousPadlock2.itemGroups[itemGroup.Name].owner,
      accessPermission: deviousPadlock2.itemGroups[itemGroup.Name].accessPermission ?? 0,
      memberNumbers: deviousPadlock2.itemGroups[itemGroup.Name].memberNumbers ?? [],
      unlockTime: deviousPadlock2.itemGroups[itemGroup.Name].unlockTime,
      note: deviousPadlock2.itemGroups[itemGroup.Name].note
    };
    deviousPadlockMenuLastData = JSON.parse(JSON.stringify(deviousPadlockMenuData));
    const menu = document.createElement("div");
    menu.id = "dogsFullScreen";
    menu.style = "height: 70vw;";
    menu.append(getDeviousPadlockMenu(target, itemGroup, menu, "main"));
    document.body.append(menu);
  }
  function canAccessChaosPadlock(groupName, target1, target2) {
    if (!target1.CanInteract()) return false;
    if (!target1.IsPlayer() && !target1.DOGS) return false;
    if (!target2.IsPlayer() && !target2.DOGS) return false;
    if (target1.MemberNumber === target2.MemberNumber) return false;
    const owner = target2.IsPlayer() ? modStorage.deviousPadlock.itemGroups[groupName].owner : target2.DOGS.deviousPadlock.itemGroups[groupName].owner;
    const permissionKey = target2.IsPlayer() ? modStorage.deviousPadlock.itemGroups[groupName].accessPermission ?? 0 : target2.DOGS.deviousPadlock.itemGroups[groupName].accessPermission ?? 0;
    const memberNumbers = target2.IsPlayer() ? modStorage.deviousPadlock.itemGroups[groupName].memberNumbers ?? [] : target2.DOGS.deviousPadlock.itemGroups[groupName].memberNumbers ?? [];
    if (target1.MemberNumber === owner || memberNumbers.includes(target1.MemberNumber)) return true;
    if (permissionKey === 0) return target1.MemberNumber !== target2.MemberNumber;
    if (permissionKey === 1) return target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (permissionKey === 2) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (permissionKey === 3) return target2.IsOwnedByCharacter(target1);
    return true;
  }
  function canSetAccessPermission(target1, target2, permissionKey) {
    if (permissionKey === 0) return target1.MemberNumber !== target2.MemberNumber;
    if (permissionKey === 1) return target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (permissionKey === 2) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (permissionKey === 3) return target2.IsOwnedByCharacter(target1);
    return false;
  }
  function onAppearanceChange(target1, target2) {
    if (target2.IsPlayer()) checkDeviousPadlocks(target1);
  }
  function checkDeviousPadlocks(target) {
    if (modStorage.deviousPadlock.itemGroups) {
      let padlocksChangedItemNames = [];
      let pushChatRoom = false;
      Object.keys(modStorage.deviousPadlock.itemGroups).forEach(async (groupName) => {
        const currentItem = InventoryGet(Player, groupName);
        const savedItem = modStorage.deviousPadlock.itemGroups[groupName].item;
        const property = currentItem?.Property;
        const padlockChanged = !(property?.Name === deviousPadlock.Name && property?.LockedBy === "ExclusivePadlock");
        if (currentItem?.Asset?.Name !== savedItem.name || JSON.stringify(currentItem?.Color) !== JSON.stringify(savedItem.color) || JSON.stringify(currentItem?.Craft) !== JSON.stringify(savedItem.craft) || JSON.stringify(currentItem?.Property) !== JSON.stringify(savedItem.property)) {
          if (canAccessChaosPadlock(groupName, target, Player)) {
            if (padlockChanged) {
              delete modStorage.deviousPadlock.itemGroups[groupName];
            } else {
              modStorage.deviousPadlock.itemGroups[groupName].item = getSavedItemData(currentItem);
            }
          } else {
            const difficulty = AssetGet(Player.AssetFamily, groupName, savedItem.name).Difficulty;
            let newItem = InventoryWear(Player, savedItem.name, groupName, savedItem.color, difficulty, Player.MemberNumber, savedItem.craft);
            newItem.Property = savedItem.property;
            if (newItem.Property.Name !== deviousPadlock.Name) newItem.Property.Name = deviousPadlock.Name;
            if (newItem.Property.LockedBy !== "ExclusivePadlock") newItem.Property.Name = "ExclusivePadlock";
            if (padlockChanged) padlocksChangedItemNames.push(newItem.Craft?.Name ? newItem.Craft.Name : newItem.Asset.Description);
            pushChatRoom = true;
          }
        }
      });
      if (ServerPlayerIsInChatRoom() && pushChatRoom) ChatRoomCharacterUpdate(Player);
      if (padlocksChangedItemNames.length === 1) {
        chatSendCustomAction(`Devious padlock appears again on ${getNickname(Player)}'s ${padlocksChangedItemNames[0]}`);
      }
      if (padlocksChangedItemNames.length > 1) {
        chatSendCustomAction(`Devious padlock appears again on ${getNickname(Player)}'s: ${padlocksChangedItemNames.join(", ")}`);
      }
    }
    ServerAppearanceBundle(Player.Appearance).forEach((item) => {
      if (item.Property?.Name === deviousPadlock.Name && item.Property?.LockedBy === "ExclusivePadlock") {
        if (!modStorage.deviousPadlock.itemGroups || !modStorage.deviousPadlock.itemGroups[item.Group]) {
          if (!modStorage.deviousPadlock.state) {
            InventoryUnlock(Player, item.Group);
            ChatRoomCharacterUpdate(Player);
          } else registerDeviousPadlockInModStorage(item.Group, target.MemberNumber);
        }
      }
    });
  }
  function checkDeviousPadlocksTimers() {
    if (!modStorage.deviousPadlock.itemGroups) return;
    Object.keys(modStorage.deviousPadlock.itemGroups).forEach((group) => {
      const unlockTime = modStorage.deviousPadlock.itemGroups[group].unlockTime;
      if (unlockTime && new Date(unlockTime) < /* @__PURE__ */ new Date()) {
        const itemName = InventoryGet(Player, group).Craft?.Name ? InventoryGet(Player, group).Craft.Name : InventoryGet(Player, group).Asset.Name;
        chatSendCustomAction(`The devious padlock opens on ${getNickname(Player)}'s ${itemName} with loud click`);
        delete modStorage.deviousPadlock.itemGroups[group];
        InventoryUnlock(Player, group);
        ChatRoomCharacterUpdate(Player);
      }
    });
  }
  function getDeviousPadlockMenu(target, group, menuElement, page) {
    const item = InventoryGet(target, group.Name);
    const itemName = item.Craft?.Name ? item.Craft.Name : item.Asset.Description;
    if (page === "main") {
      const itemPreviewLink = `https://www.bondage-europe.com/${GameVersion}/BondageClub/Assets/Female3DCG/${group.Name}/Preview/${item.Asset.Name}.png`;
      const centerBlock = document.createElement("div");
      centerBlock.style = "display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;";
      const preview = document.createElement("div");
      preview.style = "position: relative; width: 20%; height: 20%; max-width: 150px; max-height: 150px;";
      const previewItem = document.createElement("img");
      previewItem.src = itemPreviewLink;
      previewItem.style = "background: white; width: 100%; height: 100%;";
      const previewPadlock = document.createElement("img");
      previewPadlock.src = devious_padlock_default;
      previewPadlock.style = "z-index: 10; width: 20%; height: 20%; position: absolute; left: 2px; top: 2px;";
      const description = document.createElement("p");
      description.innerHTML = beautifyMessage(
        `Padlock can be managed only by users who <!correspond!> to the <!access permissions!><br><span style="color: #ff0000;">Protected from cheats</span>`
      );
      description.style = "width: 100%; text-align: center; background: rgb(63 61 104); padding: 1vw; color: white; text-align: center; font-size: clamp(12px, 3vw, 24px); margin-top: 1.5vw;";
      const owner = document.createElement("p");
      owner.innerHTML = beautifyMessage(
        `Owner of the padlock: <!${getPlayer(deviousPadlockMenuData.owner) ? `${getNickname(getPlayer(deviousPadlockMenuData.owner))} (${deviousPadlockMenuData.owner})` : `${deviousPadlockMenuData.owner}`}!>`
      );
      owner.style = "width: 100%; text-align: center; background: rgb(63 61 104); padding: 1vw; color: white; text-align: center; font-size: clamp(12px, 3vw, 24px); margin-top: 1.5vw;";
      const time = document.createElement("div");
      time.style = "width: 100%; margin-top: 1.5vw; width: 100%; background: rgb(63 61 104); padding: 1vw; display: flex; flex-direction: column; align-items: center;";
      const timeText = document.createElement("p");
      timeText.textContent = "When should the lock be removed? (Leave this field empty for permanent \u{1F609})";
      timeText.style = "font-size: clamp(12px, 3vw, 24px); margin-top: 1vw; color: white; text-align: center;";
      const timeField = document.createElement("input");
      timeField.type = "datetime-local";
      timeField.classList.add("dogsTextEdit");
      if (!canAccessChaosPadlock(group.Name, Player, target)) {
        timeField.classList.add("disabled");
      }
      timeField.style = "background: rgb(99 96 147); margin-top: 1vw; width: 80%; height: 4vw; min-height: 15px; font-size: clamp(12px, 3vw, 24px);";
      timeField.value = deviousPadlockMenuData.unlockTime ? deviousPadlockMenuData.unlockTime : "";
      timeField.addEventListener("change", function(e) {
        deviousPadlockMenuData.unlockTime = e.target.value;
      });
      const rowBtns = document.createElement("div");
      rowBtns.style = "display: flex; align-items: center; gap: 0 1vw;";
      const noteBtn = document.createElement("button");
      noteBtn.classList.add("dogsBtn");
      noteBtn.style = "color: white; font-size: clamp(12px, 4vw, 24px); margin-top: 2vw;";
      noteBtn.textContent = `Note`;
      noteBtn.addEventListener("click", function() {
        centerBlock.remove();
        menuElement.append(getDeviousPadlockMenu(target, group, menuElement, "note"));
      });
      const accessBtn = document.createElement("button");
      accessBtn.classList.add("dogsBtn");
      accessBtn.style = "color: white; font-size: clamp(12px, 4vw, 24px); margin-top: 2vw;";
      accessBtn.textContent = `Access`;
      accessBtn.addEventListener("click", function() {
        centerBlock.remove();
        menuElement.append(getDeviousPadlockMenu(target, group, menuElement, "access"));
      });
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "x";
      closeBtn.style = "display: flex; align-items: center; justify-content: center; position: absolute; top: 5px; right: 5px; min-width: 17px; min-height: 17px; width: 6vw; height: 6vw; font-size: 4.5vw;";
      closeBtn.classList.add("dogsBtn");
      closeBtn.addEventListener("click", function() {
        menuElement.remove();
        if (!target.IsPlayer() && JSON.stringify(deviousPadlockMenuLastData) !== JSON.stringify(deviousPadlockMenuData)) {
          chatSendDOGSMessage("changeDeviousPadlockConfigurations", {
            ...deviousPadlockMenuData,
            group: group.Name
          }, target.MemberNumber);
          chatSendCustomAction(
            `${getNickname(Player)} changes the devious padlock configurations on ${getNickname(target)}'s ${itemName}`
          );
        }
      });
      preview.append(previewItem, previewPadlock);
      time.append(timeText, timeField);
      rowBtns.append(noteBtn, accessBtn);
      centerBlock.append(
        preview,
        description,
        owner,
        time,
        rowBtns,
        closeBtn
      );
      return centerBlock;
    }
    if (page === "note") {
      const centerBlock = document.createElement("div");
      centerBlock.style = "display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;";
      const backBtn = document.createElement("button");
      backBtn.style = "display: flex; align-items: center; justify-content: center; position: absolute; top: 5px; right: 5px; min-width: 17px; min-height: 17px; width: 6vw; height: 6vw; font-size: 4.5vw;";
      backBtn.classList.add("dogsBtn");
      backBtn.addEventListener("click", function() {
        centerBlock.remove();
        menuElement.append(getDeviousPadlockMenu(target, group, menuElement, "main"));
      });
      const backBtnIcon = document.createElement("img");
      backBtnIcon.style = "width: 75%; height: auto;";
      backBtnIcon.src = back_arrow_default;
      backBtn.append(backBtnIcon);
      const note = document.createElement("textarea");
      note.classList.add("dogsTextEdit");
      if (!canAccessChaosPadlock(group.Name, Player, target)) {
        note.classList.add("disabled");
      }
      note.style = "width: 75%; height: 30%; font-size: clamp(12px, 4vw, 24px);";
      note.placeholder = "You can leave a note that other DOGS users can see";
      note.value = deviousPadlockMenuData.note ? deviousPadlockMenuData.note : "";
      note.addEventListener("change", function(e) {
        deviousPadlockMenuData.note = e.target.value;
      });
      centerBlock.append(note, backBtn);
      return centerBlock;
    }
    if (page === "access") {
      const centerBlock = document.createElement("div");
      centerBlock.style = "display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;";
      const backBtn = document.createElement("button");
      backBtn.style = "display: flex; align-items: center; justify-content: center; position: absolute; top: 5px; right: 5px; min-width: 17px; min-height: 17px; width: 6vw; height: 6vw; font-size: 4.5vw;";
      backBtn.classList.add("dogsBtn");
      backBtn.addEventListener("click", function() {
        centerBlock.remove();
        menuElement.append(getDeviousPadlockMenu(target, group, menuElement, "main"));
      });
      const backBtnIcon = document.createElement("img");
      backBtnIcon.style = "width: 75%; height: auto;";
      backBtnIcon.src = back_arrow_default;
      backBtn.append(backBtnIcon);
      const memberNumbersText = document.createElement("p");
      memberNumbersText.style = "color: white; width: 75%; font-size: clamp(12px, 4vw, 24px); text-align: center;";
      memberNumbersText.textContent = "Member numbers which will always have access to the padlock";
      const memberNumbers = document.createElement("textarea");
      memberNumbers.classList.add("dogsTextEdit");
      if (!canAccessChaosPadlock(group.Name, Player, target)) {
        memberNumbers.classList.add("disabled");
      }
      memberNumbers.placeholder = "Member numbers";
      memberNumbers.style = "width: 75%; height: 6.5vw; margin-top: 1vw; font-size: clamp(12px, 4vw, 24px);";
      memberNumbers.value = deviousPadlockMenuData.memberNumbers ? deviousPadlockMenuData.memberNumbers.join(", ") : "";
      memberNumbers.addEventListener("change", function(e) {
        deviousPadlockMenuData.memberNumbers = e.target.value.split(",").map((n) => parseInt(n));
      });
      const currentAccessSetting = document.createElement("p");
      currentAccessSetting.innerHTML = beautifyMessage(`Current access permission: <!${chaosPadlockAccessPermissionsList[deviousPadlockMenuData.accessPermission]}!>`);
      currentAccessSetting.style = "margin-top: 2.5vw; color: white; text-align: center; font-size: clamp(12px, 4vw, 24px);";
      const accessSettings = document.createElement("div");
      accessSettings.style = "display: flex; align-items: center; column-gap: 2vw; margin-top: 2vw;";
      const leftBtn = document.createElement("button");
      leftBtn.classList.add("dogsBtn");
      leftBtn.textContent = "<<";
      leftBtn.style = "display: flex; align-items: center; justify-content: center; width: 4vw; height: 4vw; border-radius: 50%;";
      leftBtn.addEventListener("click", function() {
        const index = chaosPadlockAccessPermissionsList.indexOf(accessText.textContent);
        if (index > 0) {
          accessText.textContent = chaosPadlockAccessPermissionsList[index - 1];
        } else {
          accessText.textContent = chaosPadlockAccessPermissionsList[index];
        }
      });
      const accessText = document.createElement("p");
      accessText.textContent = chaosPadlockAccessPermissionsList[deviousPadlockMenuData.accessPermission];
      accessText.style = "text-align: center; color: white; font-size: clamp(12px, 4vw, 24px);";
      const rightBtn = document.createElement("button");
      rightBtn.classList.add("dogsBtn");
      rightBtn.textContent = ">>";
      rightBtn.style = "display: flex; align-items: center; justify-content: center; width: 4vw; height: 4vw; border-radius: 50%;";
      rightBtn.addEventListener("click", function() {
        const index = chaosPadlockAccessPermissionsList.indexOf(accessText.textContent);
        if (index < chaosPadlockAccessPermissionsList.length - 1) {
          accessText.textContent = chaosPadlockAccessPermissionsList[index + 1];
        } else {
          accessText.textContent = chaosPadlockAccessPermissionsList[index];
        }
      });
      const submitBtn = document.createElement("button");
      submitBtn.classList.add("dogsBtn");
      submitBtn.textContent = "Submit";
      submitBtn.addEventListener("click", function() {
        if (!canSetAccessPermission(Player, target, chaosPadlockAccessPermissionsList.indexOf(accessText.textContent))) {
          return notify("Not enough rights to set this access permission", 5e3, "rgb(137 133 205)", "white");
        }
        deviousPadlockMenuData.accessPermission = chaosPadlockAccessPermissionsList.indexOf(accessText.textContent);
        currentAccessSetting.innerHTML = beautifyMessage(`Current access permission: <!${accessText.textContent}!>`);
      });
      accessSettings.append(leftBtn, accessText, rightBtn, submitBtn);
      centerBlock.append(memberNumbersText, memberNumbers, currentAccessSetting, accessSettings, backBtn);
      return centerBlock;
    }
  }
  function loadDeviousPadlock() {
    createDeviousPadlock();
    checkDeviousPadlocks(Player);
    setInterval(checkDeviousPadlocksTimers, 1e3);
    hookFunction("DialogItemClick", 20, async (args, next) => {
      const C = CharacterGetCurrent();
      const focusGroup = C.FocusGroup;
      const item = InventoryGet(C, focusGroup.Name);
      const clickedItem = args[0];
      if (DialogMenuMode !== "locking") return next(args);
      if (!item) return next(args);
      if (clickedItem?.Asset?.Name === deviousPadlock.Name && !InventoryIsPermissionBlocked(C, deviousPadlock.Name, "ItemMisc")) {
        if (C.IsPlayer()) {
          if (!modStorage.deviousPadlock.state) {
            return notify(`Your devious padlock module is <!disabled!>`, 4e3);
          }
          const answer = await requestButtons(
            "This padlock is recommended for those who want to feel really helpless, you will not be able to remove this padlock yourself. Continue? \u{1F60F}",
            80,
            600,
            [
              {
                text: "Yes, i want to lock myself"
              },
              {
                text: "No, i clicked wrong button"
              }
            ]
          );
          if (answer === "No, i clicked wrong button") return;
        } else if (!C.DOGS?.deviousPadlock.state) {
          return notify(`<!${getNickname(C)}'s!> devious padlock module is <!disabled!>`, 4e3);
        }
        InventoryLock(C, item, "ExclusivePadlock", Player.MemberNumber);
        convertExclusivePadlockToDeviousPadlock(
          item
        );
        if (ServerPlayerIsInChatRoom()) ChatRoomCharacterUpdate(C);
        else checkDeviousPadlocks(Player);
        if (C.IsPlayer()) {
          chatSendCustomAction(`${getNickname(Player)} uses devious padlock on <possessive> ${item.Craft?.Name ? item.Craft.Name : item.Asset.Description}`);
        } else {
          chatSendCustomAction(`${getNickname(Player)} uses devious padlock on ${getNickname(C)}'s ${item.Craft?.Name ? item.Craft.Name : item.Asset.Description}`);
        }
        DialogLeave();
        return;
      }
      next(args);
    });
    hookFunction("InventoryItemMiscExclusivePadlockDraw", 20, (args, next) => {
      const item = InventoryGet(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
      if (item.Property?.Name === deviousPadlock.Name) {
        inspectDeviousPadlock(CurrentCharacter, item, CurrentCharacter.FocusGroup);
        DialogChangeMode("items");
        return;
      }
      next(args);
    });
    hookFunction("DialogCanUnlock", 20, (args, next) => {
      const [target, item] = args;
      if (item?.Property?.Name === deviousPadlock.Name) return canAccessChaosPadlock(target.FocusGroup?.Name, Player, target);
      return next(args);
    });
    hookFunction("InventoryUnlock", 20, (args, next) => {
      const [target, group] = args;
      const item = InventoryGet(target, group);
      if (item?.Property?.Name === deviousPadlock.Name) {
        delete item.Property.Name;
      }
      return next(args);
    });
    hookFunction("DialogSetStatus", 20, (args, next) => {
      const [status] = args;
      if (typeof status === "string" && status.startsWith("This looks like its locked by a") && InventoryGet(CurrentCharacter, CurrentCharacter?.FocusGroup?.Name)?.Property?.Name === deviousPadlock.Name) {
        if (CurrentCharacter.IsPlayer()) {
          args[0] = "This looks like its locked by a devious padlock, you are totally helpless :3";
        } else {
          args[0] = `This looks like its locked by a devious padlock, ${getNickname(CurrentCharacter)} is totally helpless :3`;
        }
      }
      next(args);
    });
    hookFunction("ChatRoomCharacterItemUpdate", -20, (args, next) => {
      if (remoteControlState === "interacting") return;
      next(args);
      const [target, group] = args;
      onAppearanceChange(Player, target);
    });
    hookFunction("ChatRoomSyncItem", -20, (args, next) => {
      next(args);
      const [data] = args;
      const item = data?.Item;
      const target1 = getPlayer(data?.Source);
      const target2 = getPlayer(item?.Target);
      if (!target1 || !target2) return;
      onAppearanceChange(target1, target2);
    });
    hookFunction("ChatRoomSyncSingle", -20, (args, next) => {
      next(args);
      const [data] = args;
      const target1 = getPlayer(data?.SourceMemberNumber);
      const target2 = getPlayer(data?.Character?.MemberNumber);
      if (!target1 || !target2) return;
      onAppearanceChange(target1, target2);
    });
    hookFunction("DrawImageResize", 20, (args, next) => {
      var path = args[0];
      if (typeof path === "object") return next(args);
      if (!!path && path === `Assets/Female3DCG/ItemMisc/Preview/${deviousPadlock.Name}.png`) {
        args[0] = devious_padlock_default;
      }
      return next(args);
    });
    hookFunction("ChatRoomMessage", 20, (args, next) => {
      const message = args[0];
      const sender = getPlayer(message.Sender);
      if (!sender) return next(args);
      if (message.Content === "dogsMsg" && !sender.IsPlayer()) {
        const msg = message.Dictionary.msg;
        const data = message.Dictionary.data;
        if (msg === "changeDeviousPadlockConfigurations") {
          console.log(data);
          if (!modStorage.deviousPadlock.itemGroups[data.group]) return;
          if (!canAccessChaosPadlock(data.group, sender, Player)) {
            return;
          }
          if (data.accessPermission && canSetAccessPermission(sender, Player, data.accessPermission)) {
            modStorage.deviousPadlock.itemGroups[data.group].accessPermission = data.accessPermission;
          }
          if (Array.isArray(data.memberNumbers)) {
            modStorage.deviousPadlock.itemGroups[data.group].memberNumbers = data.memberNumbers;
          }
          if (typeof data.unlockTime === "string") {
            modStorage.deviousPadlock.itemGroups[data.group].unlockTime = data.unlockTime;
          }
          if (typeof data.note === "string") {
            modStorage.deviousPadlock.itemGroups[data.group].note = data.note;
          }
        }
      }
      next(args);
    });
    patchFunction("DialogGetLockIcon", {
      [`if (InventoryItemHasEffect(item, "Lock")) {`]: `
		if (InventoryItemHasEffect(item, "Lock")) {
			if (item.Property && item.Property.Name === "DeviousPadlock") {
				icons.push("DeviousPadlock");
				return icons; }
		`
    });
  }

  // src/styles.css
  var styles_default = `* {
    margin: 0; 
    padding: 0;
}

:root {
    --blue-color: rgb(72,70,109);
}

.dogsMessageBlock .current-time {
    display: none;
}

.dogsMessageBlock:hover .current-time {
    display: inline;
}

#dogsPopupContainer {
    display: flex; 
    align-items: center; 
    justify-content: center;
    height: 100%; 
    font-family: Comfortaa;
    z-index: 100;
}

#dogsPopup {
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    background: var(--blue-color); 
    z-index: 200; 
    padding: 10px 0px;
    border: 2px solid rgb(72,70,109);
    border-radius: 5px;
}

#dogsPopup input:focus {
    border: 2px solid white !important;
}

.dogsSquare {
    cursor: pointer;
    position: relative;
    font-family: Comfortaa;
    padding: 6px;
    color: white; 
    border: none; 
    background: rgb(107, 105, 158);
    transition-duration: 0.4s;
}

.dogsSquare::before {
    content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 100%;
	background: rgba(255, 255, 255, 0.4);
	transition-duration: 0.4s;
}

.dogsSquare:hover::before {
    width: 100%;
}

.dogsBtn {
    cursor: pointer; 
    font-size: 2vw; 
    font-family: Comfortaa;
    padding: 3px 8px; 
    color: white; 
    border: none;
    border-radius: 4px; 
    background: rgb(107, 105, 158); 
    transition-duration: 0.4s;
}

.dogsBtn:hover {
    background: rgb(121, 119, 177); 
    transition-duration: 0.4s;
}

.dogsTextEdit {
    cursor: pointer;
    outline: none; 
    font-family: Comfortaa; 
    color: white; 
    background: rgb(107, 105, 158); 
    border: none; border-radius: 2px;
    width: 80%; 
    padding: 6px;
}

.dogsTextEdit::placeholder {
    color: rgb(216, 216, 216);
}

.dogsTextEdit::-webkit-scrollbar {
    background: rgb(107 15 183);
}

.dogsTextEdit::-webkit-scrollbar-thumb {
    background: #ffffff;
}

.dogsTextEdit:focus {
    border: 2px solid white !important;
}

#dogsPopup input:focus {
    border: 2px solid white !important;
}

.dogsCheckBox {
    display: flex;
    align-items: center;
    gap: 0 5px;
}

.dogsCheckBox-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5vw;
    height: 2.5vw;
    min-width: 8px;
    min-height: 8px;
    max-width: 18px;
    max-height: 18px;
    background: white;
    border: 2px solid #8b3fd2;
    border-radius: 100px;
    transition-duration: 0.4s;
}

.dogsCheckBox-btn:hover {
    border: 2px solid #5713ba;
    transition-duration: 0.4s;
}

.dogsCheckBox-btn[checked="true"] {
    background: #5713ba;
    border-color: #5713ba;
    transition-duration: 0.4s;
}

.dogsCheckBox-btn[checked="true"]:hover {
    background: #7331d6;
    border-color: #7331d6;
    transition-duration: 0.4s;
}

.dogsCheckBox-btn[checked="true"]::before {
    content: "\u2714";
    color: white;
    font-size: 15px;
}

#dogsFullScreen {
    margin: auto; 
    top: 0; 
    bottom: 0; 
    left: 0; 
    right: 0;
    position: absolute; 
    width: 100vw; 
    height: 50vw; 
    max-height: 100vh;
    background: var(--blue-color); 
    font-family: Comfortaa;
    z-index: 10;
}

.adaptive-font-size {
    font-size: clamp(10px, 2vw, 20px);
}

.disabled {
    opacity: 0.6; 
    pointer-events: none;
}

`;

  // src/index.ts
  function getModVersion() {
    return "1.0.0";
  }
  var font = document.createElement("link");
  font.href = "https://fonts.googleapis.com/css2?family=Comfortaa";
  font.rel = "stylesheet";
  font.type = "text/css";
  document.head.append(font);
  var style = document.createElement("style");
  style.innerHTML = styles_default;
  document.head.append(style);
  waitFor(() => typeof window.Player?.MemberNumber === "number").then(() => {
    initStorage();
    loadSettingsMenu();
    loadCommands();
    loadRemoteControl();
    loadDeviousPadlock();
  });
})();