@echo off
@title MapleOrigin Launch Version
set PATH=C:\Program Files\Java\jdk1.8.0_111\bin;%PATH%
set CLASSPATH=.;dist\*;cores\*;
java -Xmx16384m -XX:+UseConcMarkSweepGC -XX:-OmitStackTraceInFastThrow -Dwzpath=wz\ -javaagent:glowroot\glowroot.jar net.server.Server
pause