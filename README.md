# swc-cli-mux

This project is forked from [@swc-projects/pkgs](https://github.com/swc-project/pkgs), which is
maintained by [@kdy1 강동윤](https://github.com/kdy1)

> Source code synchronization status:
>
> - Synchronized at: **2024-11-20**
> - Commit URL: https://github.com/swc-project/pkgs/tree/2e3b129c2777c2db3c52048a4a640a4768f22b19
>
> Main changes between the original repo:
>
> <https://github.com/hangxingliu/swc-cli-mux/commit/2c8572a3439a4265d6698e934d07283df4406079>

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
