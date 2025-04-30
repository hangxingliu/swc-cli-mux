# swc-cli-mux

This project is forked from [@swc-projects/pkgs](https://github.com/swc-project/pkgs), which is
maintained by [@kdy1 강동윤](https://github.com/kdy1)

> Source code synchronization status:
>
> - Synchronized at: **2025-02-04**
> - Commit URL: https://github.com/swc-project/pkgs/tree/259271f1326b75ce7103b571284dd17fdd42b6c7

## Changes from Original Project

1. Add a new command named `swc-mux` for building multiple projects simultaneously.
   Usage instructions in subsequent section.
2. Fix path issues related to the parent directory.

## Usage

```bash
# swc-mux [...common-options] [--mux-verbose] [... --mux <...options>]
swc-mux --strip-leading-paths src out
swc-mux --strip-leading-paths --mux src out --mux ../b/src ../b/out --mux -C module.type=es6 ../esm/src ../esm/out
```
