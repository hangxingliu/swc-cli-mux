#!/usr/bin/env bash

throw() { echo -e "fatal: $1" >&2; exit 1; }
execute() { echo "$ $*"; "$@" || throw "Failed to execute '$1'"; }

PROJECT_ROOT="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )/../.." &> /dev/null && pwd )";
SWC_MUX="${PROJECT_ROOT}/bin/swc-mux.js";

SWC_MUX_ARGS=(
  --strip-leading-paths
  -C jsc.parser.syntax=typescript
  -C jsc.target=es2022
  "${@}" # <-- args from command line
  #
  --mux
  -C module.type=es6
  ../src
  -d ../esm
  #
  --mux
  -C module.type=commonjs
  ../src
  -d ../cjs
  #
  --mux
  -C module.type=commonjs
  ../sub-project/src
  -d ../sub-project/cjs
);

pushd "$( dirname -- "${BASH_SOURCE[0]}" )" >/dev/null || exit 1;
execute "$SWC_MUX" "${SWC_MUX_ARGS[@]}";
