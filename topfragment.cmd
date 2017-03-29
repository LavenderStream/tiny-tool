@ECHO OFF
adb shell dumpsys activity top | grep -A 10 "Added\ Fragments" | grep #
@ECHO ON
