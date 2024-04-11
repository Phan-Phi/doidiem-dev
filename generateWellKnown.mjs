import { resolve } from "node:path";
import { promisify } from "node:util";
import { Readable } from "node:stream";
import { createWriteStream } from "node:fs";

import fs from "node:fs/promises";
import { URL, fileURLToPath } from "node:url";

const env = process.env.NODE_ENV || "production";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const destDir = resolve(__dirname, "public/.well-known");

await fs.mkdir(destDir, { recursive: true });

const appleAppSiteAssociation = createWriteStream(
  resolve(destDir, "apple-app-site-association")
);

const assetLinks = createWriteStream(resolve(destDir, "assetlinks.json"));

//* DEVELOPMENT
// apple-app-site-association
const DEV_IOS = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "ZAT2SHZZ65.customer.vn.doidiem.dev",
        paths: [
          "/customer/reset-password/*",
          "/customer/verify-email/*",
          "/customer/me/notifications/*",
          "/customer/advertisements/*",
        ],
      },
      {
        appID: "ZAT2SHZZ65.merchant.vn.doidiem.dev",
        paths: [
          "/store/reset-password/*",
          "/store/set-password/*",
          "/store/me/notifications/*",
          "/store/advertisements/*",
        ],
      },
    ],
  },
};
// assetlinks.json
const DEV_ANDROID = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "customer.vn.doidiem.dev",
      sha256_cert_fingerprints: [
        "70:4B:E9:E9:90:62:D4:37:F5:FA:2C:82:B8:E1:11:5A:ED:D5:F4:8B:BC:BD:6C:D6:39:7F:5B:45:98:CF:85:9D",
      ],
    },
  },
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "merchant.vn.doidiem.dev",
      sha256_cert_fingerprints: [
        "22:12:4B:68:E3:6C:5C:48:97:C1:EC:08:C2:63:08:2C:E6:DF:19:A8:29:E9:9F:CD:8A:55:12:07:4F:C3:48:93",
      ],
    },
  },
];

//* PRODUCTION
// apple-app-site-association
const PROD_IOS = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "ZAT2SHZZ65.customer.vn.doidiem",
        paths: [
          "/customer/reset-password/*",
          "/customer/verify-email/*",
          "/customer/me/notifications/*",
          "/customer/advertisements/*",
        ],
      },
      {
        appID: "ZAT2SHZZ65.merchant.vn.doidiem",
        paths: [
          "/store/reset-password/*",
          "/store/set-password/*",
          "/store/me/notifications/*",
          "/store/advertisements/*",
        ],
      },
    ],
  },
};
// assetlinks.json
const PROD_ANDROID = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "customer.vn.doidiem",
      sha256_cert_fingerprints: [
        "F1:F2:01:5C:94:C1:36:07:CC:3A:68:D5:BA:10:8C:B7:8F:47:97:29:39:F0:93:94:19:5B:C4:3A:6D:EF:3E:5A",
      ],
    },
  },
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "merchant.vn.doidiem",
      sha256_cert_fingerprints: [
        "37:F6:68:F8:D8:ED:46:C6:AA:9D:38:9F:2B:3A:AF:85:9F:4F:32:33:ED:FF:92:AC:6A:13:AE:AC:00:58:E1:86",
      ],
    },
  },
];

if (env === "vercel") {
  Readable.from(JSON.stringify(DEV_ANDROID), { objectMode: true }).pipe(assetLinks);
  Readable.from(JSON.stringify(DEV_IOS), { objectMode: true }).pipe(
    appleAppSiteAssociation
  );
} else {
  Readable.from(JSON.stringify(PROD_ANDROID), { objectMode: true }).pipe(assetLinks);
  Readable.from(JSON.stringify(PROD_IOS), { objectMode: true }).pipe(
    appleAppSiteAssociation
  );
}
