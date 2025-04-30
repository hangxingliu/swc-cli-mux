import { createHash } from "node:crypto";
console.log(createHash("md5").update("helloworld").digest("hex"));
