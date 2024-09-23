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
    let style;
    if (align === "center") {
      style = `border-left: clamp(1px, 1vw, 4px) solid white; border-top-left-radius: clamp(2px, 0.6vw, 4px); border-bottom-left-radius: clamp(2px, 0.6vw, 4px); position: relative; box-sizing: border-box; font-size: 2vw; font-family: Comfortaa; margin-top: 4px; margin-bottom: 4px; background: ${bgColor}; color: white; padding: 1vw; text-align: center;`;
    } else if (align === "left") {
      style = `border-left: clamp(1px, 1vw, 4px) solid whhite; border-top-left-radius: clamp(2px, 0.6vw, 4px); border-bottom-left-radius: clamp(2px, 0.6vw, 4px); position: relative; box-sizing: border-box; font-size: 2vw; font-family: Comfortaa; margin-top: 4px; margin-bottom: 4px; background: ${bgColor}; color: white;`;
    }
    const msgElement = document.createElement("div");
    msgElement.innerHTML = beautifyMessage(message);
    msgElement.style = style;
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
    version: "1.0.0",
    repository: ""
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
      version: modVersion
    };
    if (typeof Player.ExtensionSettings.DOGS === "string") {
      modStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.DOGS)) ?? data;
    } else modStorage = data;
    Object.keys(data).forEach((key) => {
      if (modStorage[key] === void 0) {
        modStorage[key] = data[key];
      }
    });
    hookFunction("ChatRoomMessage", 20, (args, next) => {
      const message = args[0];
      const sender = getPlayer(message.Sender);
      if (!sender) return next(args);
      if (message.Content === "dogsMsg" && !sender.IsPlayer()) {
        const msg = message.Dictionary.msg;
        const data2 = message.Dictionary.data;
        if (msg === "syncStorage") {
          if (!sender.DOGS) {
            console.log("sync 1");
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
      console.log("sync 2");
      chatSendDOGSMessage("syncStorage", {
        storage: modStorage
      });
    });
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
    console.log(modStorage);
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

  // src/modules/settingsMenu.ts
  function loadSettingsMenu() {
    let currentSettingsPage = null;
    const settingsPages = {
      remoteControl: {
        name: "Remote control",
        icon: () => `${staticPath}/src/images/settings-remote-control.png`,
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
            `Remote control lets allowed users to remotely change your appearance, now you don't need to be in the same room to change items of your friends. If remote control is disabled then no one can use it on you.`,
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
        icon: () => `${staticPath}/src/images/settings-devious-padlock.png`,
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
      Image: `${staticPath}/src/images/slavery.png`,
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
            chatSendLocal("The remote request <!timed out!>! Target player may be <!offline!> or not using <!BCC!>!");
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
  function registerDeviousPadlockInModStorage(group, ownerId) {
    if (!modStorage.deviousPadlock.itemGroups) {
      modStorage.deviousPadlock.itemGroups = {};
    }
    const item = ServerAppearanceBundle(Player.Appearance).filter((item2) => {
      return item2.Group === group;
    })[0];
    modStorage.deviousPadlock.itemGroups[group] = {
      item,
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
    if (target.IsPlayer()) {
      if (modStorage.deviousPadlock.itemGroups) {
        Object.keys(modStorage.deviousPadlock.itemGroups).forEach(async (group) => {
          const lockedItem = ServerAppearanceBundle(Player.Appearance).filter((item) => {
            return item.Group === group;
          })[0];
          const property = lockedItem?.Property;
          const padlockChanged = !(property?.Name === deviousPadlock.Name && property?.LockedBy === "ExclusivePadlock");
          if (JSON.stringify(lockedItem) !== JSON.stringify(modStorage.deviousPadlock.itemGroups[group].item) || padlockChanged) {
            const newItem = Object.assign({}, modStorage.deviousPadlock.itemGroups[group].item);
            ServerSend("ChatRoomCharacterUpdate", {
              ID: Player.ID === 0 ? Player.OnlineID : Player.AccountName.replace("Online-", ""),
              ActivePose: Player.ActivePose,
              Appearance: ServerAppearanceBundle(Player.Appearance).filter((item) => {
                return item.Group !== group;
              }).concat([newItem])
            });
            if (padlockChanged) {
              await waitFor(() => {
                return !!InventoryGet(Player, group);
              });
              const itemName = InventoryGet(Player, group).Craft?.Name ? InventoryGet(Player, group).Craft.Name : InventoryGet(Player, group).Asset.Description;
              chatSendCustomAction(`Chaos padlock appears again on ${getNickname(Player)}'s ${itemName}`);
            }
          }
        });
      }
    } else {
      if (modStorage.deviousPadlock.itemGroups) {
        Object.keys(modStorage.deviousPadlock.itemGroups).forEach(async (group) => {
          const lockedItem = ServerAppearanceBundle(Player.Appearance).filter((item) => {
            return item.Group === group;
          })[0];
          const property = lockedItem?.Property;
          const padlockChanged = !(property?.Name === deviousPadlock.Name && property?.LockedBy === "ExclusivePadlock");
          if (JSON.stringify(lockedItem) !== JSON.stringify(modStorage.deviousPadlock.itemGroups[group].item)) {
            if (!canAccessChaosPadlock(group, target, Player)) {
              const newItem = Object.assign({}, modStorage.deviousPadlock.itemGroups[group].item);
              ServerSend("ChatRoomCharacterUpdate", {
                ID: Player.ID === 0 ? Player.OnlineID : Player.AccountName.replace("Online-", ""),
                ActivePose: Player.ActivePose,
                Appearance: ServerAppearanceBundle(Player.Appearance).filter((item) => {
                  return item.Group !== group;
                }).concat([newItem])
              });
              if (padlockChanged) {
                await waitFor(() => {
                  return !!InventoryGet(Player, group);
                });
                const itemName = InventoryGet(Player, group).Craft?.Name ? InventoryGet(Player, group).Craft.Name : InventoryGet(Player, group).Asset.Description;
                chatSendCustomAction(`Devious padlock appears again on ${getNickname(Player)}'s ${itemName}`);
              }
            } else {
              if (padlockChanged) {
                delete modStorage.deviousPadlock.itemGroups[group];
              } else {
                modStorage.deviousPadlock.itemGroups[group].item = lockedItem;
              }
            }
          }
        });
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
      const padlockPreviewLink = `${staticPath}/src/images/devious-padlock.png`;
      const centerBlock = document.createElement("div");
      centerBlock.style = "display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;";
      const preview = document.createElement("div");
      preview.style = "position: relative; width: 30%; height: 30%; max-width: 150px; max-height: 150px;";
      const previewItem = document.createElement("img");
      previewItem.src = itemPreviewLink;
      previewItem.style = "background: white; width: 100%; height: 100%;";
      const previewPadlock = document.createElement("img");
      previewPadlock.src = padlockPreviewLink;
      previewPadlock.style = "z-index: 10; width: 20%; height: 20%; position: absolute; left: 2px; top: 2px;";
      const description = document.createElement("p");
      description.innerHTML = beautifyMessage(
        `Padlock can be managed only by users who <!correspond!> to the <!access permissions!><br><span style="color: #ff0000;">Protected from cheats</span>`
      );
      description.style = "width: 100%; text-align: center; background: rgb(63 61 104); padding: 1vw; color: white; text-align: center; font-size: clamp(12px, 4vw, 24px); margin-top: 2vw;";
      const owner = document.createElement("p");
      owner.innerHTML = beautifyMessage(
        `Owner of the padlock: <!${getPlayer(deviousPadlockMenuData.owner) ? `${getNickname(getPlayer(deviousPadlockMenuData.owner))} (${deviousPadlockMenuData.owner})` : `${deviousPadlockMenuData.owner}`}!>`
      );
      owner.style = "width: 100%; text-align: center; background: rgb(63 61 104); padding: 1vw; color: white; text-align: center; font-size: clamp(12px, 4vw, 24px); margin-top: 2vw;";
      const time = document.createElement("div");
      time.style = "width: 100%; margin-top: 2vw; width: 100%; background: rgb(63 61 104); padding: 1vw; display: flex; flex-direction: column; align-items: center;";
      const timeText = document.createElement("p");
      timeText.textContent = "When should the lock be removed? (Leave this field empty for permanent \u{1F609})";
      timeText.style = "font-size: clamp(12px, 4vw, 24px); margin-top: 1vw; color: white; text-align: center;";
      const timeField = document.createElement("input");
      timeField.type = "datetime-local";
      timeField.classList.add("dogsTextEdit");
      if (!canAccessChaosPadlock(group.Name, Player, target)) {
        timeField.classList.add("disabled");
      }
      timeField.style = "background: rgb(99 96 147); margin-top: 1vw; width: 80%; height: 4vw; font-size: clamp(12px, 4vw, 24px);";
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
      backBtnIcon.src = `${staticPath}/src/images/back-arrow.png`;
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
      backBtnIcon.src = `${staticPath}/src/images/back-arrow.png`;
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
        ChatRoomCharacterUpdate(C);
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
        args[0] = `${staticPath}/src/images/devious-padlock.png`;
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

  // src/index.ts
  var staticPath = "http://127.0.0.1:5500";
  var modVersion = "1.0.0";
  var link1 = document.createElement("link");
  link1.href = "https://fonts.googleapis.com/css2?family=Comfortaa";
  link1.rel = "stylesheet";
  link1.type = "text/css";
  document.head.append(link1);
  var link2 = document.createElement("link");
  link2.href = `${staticPath}/src/styles.css`;
  link2.rel = "stylesheet";
  link2.type = "text/css";
  document.head.append(link2);
  initStorage();
  loadSettingsMenu();
  loadCommands();
  loadRemoteControl();
  loadDeviousPadlock();
})();
