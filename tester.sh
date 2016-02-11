#!/bin/bash

devices=`adb devices | grep 'device$' | cut -f1`
pids=""

for device in $devices
do
    adb -s $device shell setprop ro.secure 0
    adb -s $device shell setprop ro.debuggable 1
    adb -s $device shell setprop persist.service.adb.enable 1

    log_file="./log/$device-logcat-`date +%d-%m-%H:%M:%S`.log"
    echo "Logging device $device to \"$log_file\""
    adb -s $device logcat -v threadtime | grep "$3" > $log_file &
    pids="$pids $!"

    # 安装
    echo "$device install $1 begin"
    adb -s $device install -rg $1
    echo "$device install end"

    #启动
    echo "$device launch begin"
    adb -s $device shell am start -n $2
    echo "$device launch end"

    echo "$device sleep 2 sec begin"
    sleep 2
    echo "$device sleep 2 sec end"

    #卸载
    echo "$device uninstall begin"
    adb -s $device uninstall $3
    echo "$device uninstall end"

    #设备信息
    echo "$device get device info begin"
    adb -s $device shell cat /system/build.prop | grep "product"
    echo "$device get device info end"

done

echo "Children PIDs: $pids"

killemall()
{
    echo "Killing children (what a shame...)"

    for pid in $pids
    do
        echo "Killing $pid"
        `kill -9 $pid`
    done
    
    kill `ps aux | grep adb | grep 'server' | awk  '{print $2}'`
}

killemall
