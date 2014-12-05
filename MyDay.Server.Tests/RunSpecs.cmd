@echo off

setlocal enabledelayedexpansion

set REL_ROOT="..\MyDay\"
pushd %REL_ROOT%
set WATCH_ROOT=%CD%
popd
call jasmine-node --color --verbose --autotest --watch %WATCH_ROOT%\server.js %WATCH_ROOT%\static\scripts  --test-dir spec

endlocal