import dirCommand from "./dir";
import fileCommand from "./file";
import parseArgs, { initProgram } from "./options";

const straightPassOptions = new Set<string>([
    "--help",
    "-h",
    "--version",
    "-V",
]);
const optionsWithParam = new Set<string>([
    "-f",
    "--filename",
    "--config-file",
    "--cli-config-file",
    "--env-name",
    "--ignore",
    "--only",
    "-s",
    "--source-maps",
    "--source-map-target",
    "--source-file-name",
    "--source-root",
    "-o",
    "--out-file",
    "-d",
    "--out-dir",
    "--out-file-extension",
    "-C",
    "--config",
    "--workers",
    "--extensions",
]);

export async function swcMux(sysArgs: ReadonlyArray<string> = process.argv) {
    const commonArgs = sysArgs.slice(0, 2);
    const muxArgs: string[][] = [];

    let inCommonSection = true;
    let afterDoubleDash = false;
    let pendingArgs: string[] = [];
    let verbose = false;

    const savePendingArgs = () => {
        if (inCommonSection) {
            commonArgs.push(...pendingArgs);
            inCommonSection = false;
        } else {
            if (pendingArgs.length == 0) return;
            muxArgs.push(pendingArgs);
        }
        afterDoubleDash = false;
        pendingArgs = [];
    };

    for (let i = 2; i < sysArgs.length; i++) {
        const arg = sysArgs[i];
        if (arg === "--mux") {
            savePendingArgs();
            continue;
        }

        if (afterDoubleDash) {
            pendingArgs.push(arg);
            continue;
        }

        if (arg === "--mux-verbose") {
            verbose = true;
            continue;
        }
        if (straightPassOptions.has(arg)) {
            commonArgs.push(arg);
            break;
        }

        if (arg === "--") afterDoubleDash = true;
        pendingArgs.push(arg);
        if (optionsWithParam.has(arg) && i + 1 < sysArgs.length)
            pendingArgs.push(sysArgs[++i]);
    }
    savePendingArgs();
    if (muxArgs.length === 0) muxArgs.push([]);

    const promises: Promise<any>[] = [];
    muxArgs.forEach((args, i) => {
        const mergedArgs = [...commonArgs, ...args];
        if (verbose) printMuxArgs(i, mergedArgs);

        initProgram();
        const opts = parseArgs(mergedArgs);
        const fn = opts.cliOptions.outDir ? dirCommand : fileCommand;
        promises.push(fn(opts));
    });

    return Promise.all(promises);
}

function printMuxArgs(id: number, args: string[]) {
    const encodedArgs = args.slice(2).map(encodeShellArg).join(" ");
    console.error(`swc-mux[${id}]: ${encodedArgs}`);
}
function encodeShellArg(it: string) {
    if (/^[\w-\.]+$/.test(it)) return it;
    return "'" + it.replace(/'/g, "'\\''") + "'";
}
