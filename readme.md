# Fastify API Shoppingify

### Cara jalankannya

- install `node_modules` dari CMD atau terminal: `npm install`
- copy file `.env.example` lalu paste kemudian rename menjadi file `.env`
- buat database baru sesuai di `DATABASE_CONNECTION`
- ubah isian variabel `DATABASE_CONNECTION`, `HOST`, `PORT` sesuai komputer atau laptop yang kalian punya
- ketika sudah dirubah jalankan `npm run dev`. maka generate database sendiri.
- silakan akses di `/docs`

### Endpoint yang dipakai ini selain itu hanya pilihan

- `/api/kategori/with-item` - tampil semua kategori dan juga item
- `/api/item/create` - buat item
- `/api/listItem/create` - buat list dan juga buat item
- `/api/listItem/:id` - tampil list semua item dan juga kategori
- `/api/list/` - tampil list
- `/api/items/search?namaItem=` - pencarian nama item
- `/api/kategori/search?namaKategori` - pencarian nama kategori
- grafik belum dibuat
