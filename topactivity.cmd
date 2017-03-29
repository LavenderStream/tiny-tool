@ECHO OFF
adb shell dumpsys activity top | grep ACTIVITY --color
@ECHO ON
