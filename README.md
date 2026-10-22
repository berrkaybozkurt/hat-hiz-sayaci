# Hat Hız Sayacı — Android uygulaması

Telefonla çekilen hat videosundan adet, duruş, hız kaybı, kalite kaybı ve OEE hesaplayan uygulama.
Çıktılar: Excel (.xlsx) ve şeritli/OEE göstergeli video (.mp4, cihaz desteklemezse .webm).
Kaydet butonları Android paylaşım menüsünü açar: Dosyalar, Drive, WhatsApp, e-posta.

## APK'yı GitHub ile derleme (bilgisayara kurulum gerekmez)

1. github.com'da yeni, boş bir depo açın (ör. `hat-hiz-sayaci`). Gizli (private) olabilir.
2. Bu klasörün içeriğini depoya yükleyin. `node_modules` klasörünü yüklemeyin.
   - Tarayıcıdan: depoda "Add file → Upload files", klasördeki dosyaları sürükleyin.
     `.github` klasörünün de yüklendiğinden emin olun.
3. Depoda **Actions** sekmesine girin. "APK derle" işi kendiliğinden başlar (yaklaşık 5 dk).
   Başlamazsa "APK derle → Run workflow" deyin.
4. İş yeşil tik alınca içine girin, en altta **Artifacts → hat-hiz-sayaci-apk** dosyasını indirin.
5. İnen zip'in içindeki `app-debug.apk` dosyasını telefona atın ve açın.
   Android "bilinmeyen kaynaklar" izni isterse bu dosya için izin verin.

## Kendi bilgisayarınızda derleme (Android Studio varsa)

```
npm install
npx cap sync android
npx cap open android      # Android Studio'da açılır → Build → Build APK
```

## Web arayüzünü değiştirmek

Tüm arayüz ve hesaplama `www/index.html` içinde. Değiştirdikten sonra depoya yükleyin;
GitHub yeni APK'yı otomatik derler.

## Hesap mantığı

- Çevrim = 60 ÷ nominal hız. 60 adet/dk → 1 sn.
- Duruş eşiği = çevrim × eşik (varsayılan 3). 1 sn × 3 = 3 sn ürün gelmezse duruş.
- Duruş % = duruş süresi ÷ kayıt süresi.
- Hız kaybı % = (çalışma süresi − adet × çevrim) ÷ kayıt süresi.
- Kalite kaybı % = reject × çevrim ÷ kayıt süresi.
- OEE % = (adet − reject) × çevrim ÷ kayıt süresi. Dört kalem toplamı %100.
