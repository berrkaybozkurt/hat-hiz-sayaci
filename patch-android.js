// Android projesine kamera izni ve "ekran açık kalsın" ayarı ekler
const fs = require('fs'), path = require('path');
const man = 'android/app/src/main/AndroidManifest.xml';
let m = fs.readFileSync(man, 'utf8');
if (!m.includes('android.permission.CAMERA')) {
  m = m.replace('<uses-permission android:name="android.permission.INTERNET" />',
    '<uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.CAMERA" />\n    <uses-feature android:name="android.hardware.camera" android:required="false" />');
  fs.writeFileSync(man, m);
}
const act = 'android/app/src/main/java/com/berkay/hathizsayaci/MainActivity.java';
fs.writeFileSync(act, `package com.berkay.hathizsayaci;

import android.os.Bundle;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}
`);
console.log('Android ayarları eklendi');
