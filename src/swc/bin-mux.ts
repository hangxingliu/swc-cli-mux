//
// swc-mux [...common-options] ...[--mux ...options]
//
import { swcMux } from "./mux";

process.on("uncaughtException", function (err) {
    console.error(err);
    process.exit(1);
});

swcMux().catch((err: Error) => {
    console.error(err);
    process.exit(1);
});
