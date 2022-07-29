const crypto = require("crypto");

function generateRandomBytes() {
  const hash = crypto.randomBytes(64).toString("hex");
  console.log(hash);
}

generateRandomBytes();
