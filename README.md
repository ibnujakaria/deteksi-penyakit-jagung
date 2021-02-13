# deteksi-penyakit-jagung
Deteksi penyakit pada (daun) jagung berbasis citra dengan menggunakan metode *Grey Level Run-Length Matrix* (GLRLM) dan *Fuzzy Color Histogram* (FCH).

Ini adalah project tugas akhir alias skripsi.

## What to do

### 1. Install hal-hal yang dibutuhkan
```bash
npm install
```

### 2. *Generate* pembagian data training dan data testing menggunakan K-Fold Cross Validation dengan perintah `npm run generate <k>`

Misal k = 7

```bash
npm run generate 7
```

Hasil generate akan disimpan di direktori `dist/k-fold`.

### 3. Ekstraksi Fitur dari data yang sudah di-*generate* sebelumnya.

```bash
npm run extraction
```
Akan menghasilkan output berupa file `/dist/extracted-data.json`.

### 4. Lakukan pengujian.

```bash
npm run test
```

## Lihat Hasil
Hasil bisa langsung dilihat pada file `dist/results.json`. Akan tetapi agak sulit untuk membacanya. Untuk melihat hasil dalam bentuk grafik, anda bisa melihatnya dengan melakukan cara berikut:

### Jalankan server Express (sebagai web-service)

```bash
npm run serve
```

### Jalankan Aplikasi Client

```bash
cd src/client
npm install # dont forget to install it first
```

#### Jalankan aplikasi

```bash
npm run dev
```

Hasil bisa dibuka dengan mengunjungi alamat `http://localhost:3000`.
