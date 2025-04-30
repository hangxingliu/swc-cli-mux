# swc-cli-mux

This project is forked from [@swc-projects/pkgs](https://github.com/swc-project/pkgs), which is
maintained by [@kdy1 강동윤](https://github.com/kdy1)

> Source code synchronization status:
>
> - Synchronized on: **2025-05-04**
> - Commit URL: https://github.com/swc-project/pkgs/tree/0475403a2b8ed259832ce07ef0f646a8ddbf9409

## Usage

```bash
# swc-mux [...common-options] [--mux-verbose] [... --mux <...options>]
swc-mux --strip-leading-paths src out
swc-mux --strip-leading-paths --mux src out --mux ../b/src ../b/out --mux -C module.type=es6 ../esm/src ../esm/out
```

## Changes from Original Project

1. Add a new command named `swc-mux` for building multiple projects simultaneously.
   Usage instructions in subsequent section.
2. Fix path issues related to the parent directory.

## Sync with Upstream

```bash
# git remote add upstream https://github.com/swc-project/pkgs.git
git fetch upstream
git checkout upstream/main
git checkout -b mux-v${new_version}
git cherry-pick "${commit_hashes[@]}"

# Delete .husky/pre-commit if there is any "Couldn't find a script named lint-staged" error
# Then restore this file after cherry-pick done

# Finally:
# run `yarn upgrade-interactive` and update the "Source code synchronization status" section in README
git add .
git commit --amend --no-ed
```

### Sync the main branch

```bash
# git remote add upstream https://github.com/swc-project/pkgs.git
git fetch upstream
git rebase upstream/main
```
