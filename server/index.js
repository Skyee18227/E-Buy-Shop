const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ENV_PATH = path.join(__dirname, ".env");
const DATA_PATH = path.join(__dirname, "data", "products.json");

loadEnvFile(ENV_PATH);

const PORT = Number(process.env.PORT || 5000);
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;

  try {
    if (req.method === "GET" && pathname === "/api/health") {
      return sendJson(res, 200, {
        ok: true,
        message: "E-Buy API is running",
        date: new Date().toISOString(),
      });
    }

    if (req.method === "GET" && pathname === "/api/products") {
      const products = readProducts();
      return sendJson(res, 200, products);
    }

    if (req.method === "GET" && pathname === "/api/products/categories") {
      const categories = [...new Set(readProducts().map((product) => product.category))];
      return sendJson(res, 200, categories);
    }

    if (req.method === "GET" && pathname === "/api/categories") {
      const categories = [...new Set(readProducts().map((product) => product.category))];
      return sendJson(res, 200, categories);
    }

    if (req.method === "GET" && pathname.startsWith("/api/products/category/")) {
      const category = decodeURIComponent(pathname.replace("/api/products/category/", ""));
      const products = readProducts().filter((product) => product.category === category);
      return sendJson(res, 200, products);
    }

    if (req.method === "GET" && pathname.startsWith("/api/products/")) {
      const id = Number(pathname.replace("/api/products/", ""));
      const product = readProducts().find((item) => item.id === id);

      if (!product) {
        return sendJson(res, 404, { error: "Product not found" });
      }

      return sendJson(res, 200, product);
    }

    if (req.method === "POST" && pathname === "/api/products") {
      if (!hasValidApiKey(req)) {
        return sendJson(res, 401, { error: "Missing or invalid API key" });
      }

      const body = await readJsonBody(req);
      const products = readProducts();
      const nextId = products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
      const newProduct = normalizeProduct(body, nextId);

      products.push(newProduct);
      writeProducts(products);

      return sendJson(res, 201, newProduct);
    }

    if (req.method === "PUT" && pathname.startsWith("/api/products/")) {
      if (!hasValidApiKey(req)) {
        return sendJson(res, 401, { error: "Missing or invalid API key" });
      }

      const id = Number(pathname.replace("/api/products/", ""));
      const body = await readJsonBody(req);
      const products = readProducts();
      const index = products.findIndex((product) => product.id === id);

      if (index === -1) {
        return sendJson(res, 404, { error: "Product not found" });
      }

      const updatedProduct = normalizeProduct(body, id);
      products[index] = updatedProduct;
      writeProducts(products);

      return sendJson(res, 200, updatedProduct);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/products/")) {
      if (!hasValidApiKey(req)) {
        return sendJson(res, 401, { error: "Missing or invalid API key" });
      }

      const id = Number(pathname.replace("/api/products/", ""));
      const products = readProducts();
      const nextProducts = products.filter((product) => product.id !== id);

      if (nextProducts.length === products.length) {
        return sendJson(res, 404, { error: "Product not found" });
      }

      writeProducts(nextProducts);
      return sendJson(res, 200, { success: true });
    }

    sendJson(res, 404, { error: "Route not found" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`E-Buy API listening on http://localhost:${PORT}`);
});

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload, null, 2));
}

function readProducts() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
}

function writeProducts(products) {
  fs.writeFileSync(DATA_PATH, `${JSON.stringify(products, null, 2)}\n`, "utf8");
}

function hasValidApiKey(req) {
  if (!ADMIN_API_KEY) {
    return true;
  }

  return req.headers["x-api-key"] === ADMIN_API_KEY;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error("Request body must be valid JSON"));
      }
    });

    req.on("error", reject);
  });
}

function normalizeProduct(input, id) {
  const title = String(input.title || "").trim();
  const description = String(input.description || "").trim();
  const category = String(input.category || "").trim();
  const image = String(input.image || "").trim();
  const price = Number(input.price);
  const rate = Number(input.rating && input.rating.rate);
  const count = Number(input.rating && input.rating.count);

  if (!title || !description || !category || !image || Number.isNaN(price)) {
    throw new Error("title, description, category, image, and price are required");
  }

  return {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: {
      rate: Number.isNaN(rate) ? 0 : rate,
      count: Number.isNaN(count) ? 0 : count,
    },
  };
}
