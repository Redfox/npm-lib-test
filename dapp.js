// src/dapp-store.tsx
import React2 from "react";

// src/component.tsx
import React, { useEffect, useState } from "react";

// src/constants.ts
var TEST = "TEST";

// src/component.tsx
var SOLANA_APPS = [
  {
    id: "jupiter",
    name: "Jupiter",
    description: "Best swap aggregator for Solana - trade tokens with the best prices",
    icon: "https://static.jup.ag/jup/icon.png",
    url: "https://jup.ag",
    category: "defi",
    type: "app"
  },
  {
    id: "raydium",
    name: "Raydium",
    description: "Leading AMM on Solana - trade, provide liquidity, and farm yields",
    icon: "https://img-v1.raydium.io/icon/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R.png",
    url: "https://raydium.io",
    category: "defi",
    type: "app"
  },
  {
    id: "meteora",
    name: "Meteora",
    description: "Concentrated liquidity AMM with innovative features",
    icon: "https://www.meteora.ag/logo.svg",
    url: "https://meteora.ag",
    category: "defi",
    type: "app"
  },
  {
    id: "realms",
    name: "Realms",
    description: "DAOs and governance platform for Solana projects",
    icon: "https://app.realms.today/img/logotype-realms-blue-white.svg",
    url: "https://app.realms.today",
    category: "governance",
    type: "app"
  },
  {
    id: "pump",
    name: "Pump.fun",
    description: "Launch your own token on Solana easily",
    icon: "https://pump.fun/logo.png",
    url: "https://pump.fun/board",
    category: "tools",
    type: "app"
  },
  {
    id: "tensor",
    name: "Tensor",
    description: "Leading NFT marketplace on Solana",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/30449.png",
    url: "https://tensor.trade",
    category: "defi",
    type: "app"
  },
  {
    id: "gibwork",
    name: "Gibwork",
    description: "Find Talent, Find Work",
    icon: "https://media.gib.work/work-logo.png",
    url: "https://app.gib.work",
    category: "tools",
    type: "app"
  },
  {
    id: "test-app",
    name: "Test App",
    description: "Test App",
    icon: "https://media.gib.work/work-logo.png",
    url: "test-app",
    category: "tools",
    type: "extension"
  }
];
var Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [installedApps, setInstalledApps] = useState([]);
  const installApp = (app) => {
    try {
      console.log("Installing app:", app);
      const newApp = {
        id: app.id,
        name: app.name,
        description: app.description,
        icon: app.icon,
        url: app.url,
        category: app.category,
        installedAt: Date.now(),
        type: app.type
      };
      const updated = [...installedApps, newApp];
      setInstalledApps(updated);
      localStorage.setItem("installed_apps", JSON.stringify(updated));
    } catch (error) {
      console.error("Error installing app:", error);
    }
  };
  const uninstallApp = (appId) => {
    const updated = installedApps.filter((app) => app.id !== appId);
    setInstalledApps(updated);
    localStorage.setItem("installed_apps", JSON.stringify(updated));
  };
  const categories = [
    "all",
    ...new Set(SOLANA_APPS.map((app) => app.category))
  ];
  const filteredApps = selectedCategory === "all" ? SOLANA_APPS : SOLANA_APPS.filter((app) => app.category === selectedCategory);
  const isInstalled = (appId) => installedApps.some((app) => app.id === appId);
  useEffect(() => {
    const stored = localStorage.getItem("installed_apps");
    if (stored) {
      setInstalledApps(JSON.parse(stored));
    }
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "container mx-auto p-6" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold mb-8" }, "Solana App Store"), /* @__PURE__ */ React.createElement("p", null, TEST), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-4 mb-6" }, categories.map((category) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: category,
      onClick: () => setSelectedCategory(category),
      className: `px-4 py-2 rounded-lg capitalize ${selectedCategory === category ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`
    },
    category
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-x-6" }, filteredApps.map((app) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: app.id,
      className: "p-6 rounded-xl border border-gray-200 hover:border-green-300 transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: app.icon,
        alt: `${app.name} icon`,
        className: "w-12 h-12 rounded-lg"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold" }, app.name), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-gray-500 capitalize" }, app.category), app.type === "extension" ? /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "text-xs text-gray-500 capitalize ",
        style: {
          backgroundColor: "#e0e0e0",
          // light gray
          padding: "2px 4px",
          borderRadius: "4px"
        }
      },
      app.type
    ) : null)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => isInstalled(app.id) ? uninstallApp(app.id) : installApp(app),
        className: `px-4 py-1 font-semibold rounded-lg ${isInstalled(app.id) ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-green-100 text-green-600 hover:bg-green-200"}`
      },
      isInstalled(app.id) ? "Uninstall" : "Get"
    )), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600 text-sm mt-2" }, app.description)))
  ))));
};

// src/dapp-store.tsx
var App = () => {
  return /* @__PURE__ */ React2.createElement(Store, null);
};
var dapp_store_default = App;
export {
  App,
  dapp_store_default as default
};
//# sourceMappingURL=index.js.map
