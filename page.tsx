import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './components/MovieCard';
import { Movie } from './types';
import ReactPlayer from 'react-player';

// --- DATABASE FILM OTOMATIS ---
// MAPPED FROM YOUR GOOGLE DRIVE LINKS
const movieData: Movie[] = [
  {
    id: '1',
    title: 'THE CREATOR (2023)',
    synopsis: "Perang AI vs Manusia bre! Robotnya keren parah, visualnya bikin mata melek. Endingnya bikin mewek dikit. Wajib tonton!",
    posterUrl: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=800', 
    driveUrl: 'https://drive.google.com/file/d/1oeueAaV_yjI2mn_cKisjJzaScSypyKeN/view?usp=sharing',
    year: '2023',
    rating: '8.5'
  },
  {
    id: '2',
    title: 'CYBERPUNK: EDGERUNNERS (2022)',
    synopsis: "Anak jalanan jadi begal cyber di Night City. Jedag-jedug musiknya, brutal aksinya. Jangan lupa siapin tisu bre.",
    posterUrl: 'https://images.unsplash.com/photo-1620641788421-7f1c338e61a9?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/144ISvEVV19EqftlsX6iEmlELfn-NMlkh/view?usp=sharing',
    year: '2022',
    rating: '9.0'
  },
  {
    id: '3',
    title: 'BLADE RUNNER 2049 (2017)',
    synopsis: "Ryan Gosling jadi detektif galau nyari jati diri. Sepi, gelap, aesthetic parah. Cocok buat nemenin malam minggu kelabu lo.",
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/19Hf8gtfIGp8LUnPf9OaWtZbXNJwuTNuz/view',
    year: '2017',
    rating: '8.8'
  },
  {
    id: '4',
    title: 'DUNE: PART TWO (2024)',
    synopsis: "Paul Atreides ngamuk di gurun pasir. Cacing raksasanya ngeri abis. Perang epik yang gak boleh dilewatin, sikat!",
    posterUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1fUo7fGuDX1V84jH29phhhoIP8B4Z8J4-/view?usp=sharing',
    year: '2024',
    rating: '9.2'
  },
  {
    id: '5',
    title: 'ALITA: BATTLE ANGEL (2019)',
    synopsis: "Cyborg cewek jago berantem nemuin cinta tapi nasibnya tragis. CGI-nya alus banget, matanya gede kayak anime.",
    posterUrl: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1TW3yKUfa8G2kI_GSLJDHgkRlUECGB3g8/view?usp=drivesdk',
    year: '2019',
    rating: '7.8'
  },
  {
    id: '6',
    title: 'READY PLAYER ONE (2018)',
    synopsis: "Masuk dunia game VR buat nyari harta karun. Banyak easter egg game & film jadul. Gamer sejati wajib nonton ini.",
    posterUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1hd1Hh3ydZIQ-pMhrPH8JvYe8dObxQ78t/view?usp=sharing',
    year: '2018',
    rating: '8.0'
  },
  {
    id: '7',
    title: 'THE MATRIX RESURRECTIONS (2021)',
    synopsis: "Neo bangun lagi dari tidur panjang. Masih bingung mana nyata mana simulasi. Aksi kungfu-nya masih oke lah.",
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1oZG5aJ5FUhcN1faBe95MOCuOgQU4qfBt/view?usp=sharing',
    year: '2021',
    rating: '6.5'
  },
  {
    id: '8',
    title: 'GODZILLA X KONG (2024)',
    synopsis: "Dua monster raksasa tag team lawan musuh baru. Berantemnya bar-bar banget, gedung hancur semua. Otak off, mata on.",
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/19IclU4cbRMsKNyMhH1TQTu76J2sAvQXv/view?usp=sharing',
    year: '2024',
    rating: '7.5'
  },
  {
    id: '9',
    title: 'JOHN WICK 4 (2023)',
    synopsis: "Babang John gak ada matinya. Nembak orang sambil drifting. Action non-stop dari awal sampe akhir, capek tapi puas.",
    posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1o4dUchP3BMN6PQUenchSQmA-n9xMD0CB/view?usp=sharing',
    year: '2023',
    rating: '8.9'
  },
  {
    id: '10',
    title: 'TRANSFORMERS: RISE OF BEASTS (2023)',
    synopsis: "Robot hewan purba muncul bre! Optimus Prime dapet upgrade. Seru buat nostalgia kartun minggu pagi.",
    posterUrl: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1QJYu2e1OuK4G5TspIoTeRWZNGEd9K5ro/view?usp=sharing',
    year: '2023',
    rating: '7.0'
  },
  {
    id: '11',
    title: 'AVATAR: WAY OF WATER (2022)',
    synopsis: "Visual airnya gila, kayak asli banget. Durasi panjang tapi gak berasa. Nontonnya berasa lagi liburan ke planet lain.",
    posterUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1eAV-YHVh3tTZkdkMGzIBs0PZFpLhRX-e/view?usp=sharing',
    year: '2022',
    rating: '8.2'
  },
  {
    id: '12',
    title: 'OPPENHEIMER (2023)',
    synopsis: "Biopic bapak bom atom. Tegang banget pas detik-detik ledakan. Cillian Murphy aktingnya gak ngotak.",
    posterUrl: 'https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1MVvzU4DlNuQTjGCk1kl0RCx7mLGWRX1D/view?usp=sharing',
    year: '2023',
    rating: '9.1'
  },
  {
    id: '13',
    title: 'GUARDIANS OF THE GALAXY VOL. 3 (2023)',
    synopsis: "Petualangan terakhir Star-Lord cs. Lucu, seru, tapi siap-siap nangis bombay liat masa lalu Rocket.",
    posterUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1ILInmOD39vMYUcLr7BoPwN7Lg7u2_z4Z/view?usp=sharing',
    year: '2023',
    rating: '8.4'
  },
  {
    id: '14',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE (2023)',
    synopsis: "Miles Morales ketemu ratusan Spidey lain. Art style-nya gokil parah, kayak komik hidup!",
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/10KJLcUxMvbWfivv0N3eRDQZvf9K8O--C/view?usp=sharing',
    year: '2023',
    rating: '9.0'
  },
  {
    id: '15',
    title: 'THE BATMAN (2022)',
    synopsis: "Batman versi Robert Pattinson lebih gelap dan detektif banget. Gotham-nya berasa nyata dan suram.",
    posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1gPkPHxO0cxX-oYsBXxsDfuuRUiSXsnjR/view?usp=sharing',
    year: '2022',
    rating: '8.3'
  },
  {
    id: '16',
    title: 'INTERSTELLAR (2014)',
    synopsis: "Masuk lubang cacing nyari planet baru. Musik Hans Zimmer bikin merinding. Siapin otak buat mikir fisika.",
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1tzzb2FyMFTkiGBSY2bptiEGF5zp1jP-d/view?usp=sharing',
    year: '2014',
    rating: '8.7'
  },
  {
    id: '17',
    title: 'INCEPTION (2010)',
    synopsis: "Maling mimpi di dalam mimpi. Leonardo DiCaprio pusing, lo juga bakal pusing, tapi seru abis!",
    posterUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/17SnH-fZO5Jiavf-lqzxojXkarxu5xcS8/view?usp=sharing',
    year: '2010',
    rating: '8.8'
  },
  {
    id: '18',
    title: 'TRON: LEGACY (2010)',
    synopsis: "Terjebak di dunia digital neon. Daft Punk yang ngisi lagu, visualnya eye-gasm banget buat anak techno.",
    posterUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1ZlHn4MvAEVAeYP8perc5O83t09u2SGVg/view?usp=sharing',
    year: '2010',
    rating: '7.5'
  },
  {
    id: '19',
    title: 'GHOST IN THE SHELL (2017)',
    synopsis: "Mayor Kusanagi nyari hacker misterius. Film wajib buat yang ngaku anak Cyberpunk sejati.",
    posterUrl: 'https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/19po5eVDnxbXZvQM6H68rrEi-4s9Kwlec/view?usp=sharing',
    year: '2017',
    rating: '7.2'
  },
  {
    id: '20',
    title: 'AKIRA (1988)',
    synopsis: "Neo-Tokyo mau meledak gara-gara bocah psikik. Animasi jadul tapi detailnya ngalahin anime jaman now.",
    posterUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1cl6PB1CYdZkLSSEca2O2FLNWtar_C-PI/view?usp=sharing',
    year: '1988',
    rating: '8.9'
  },
  {
    id: '21',
    title: 'MAD MAX: FURY ROAD (2015)',
    synopsis: "Balapan maut di gurun pasir. Minim dialog, full aksi, meledak-ledak. Gitarisnya paling gokil.",
    posterUrl: 'https://images.unsplash.com/photo-1568876694728-451bbf13fdb5?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1Jlz1Kk7tK6T6KgHLysyeVRicrLhWbAsT/view?usp=sharing',
    year: '2015',
    rating: '8.6'
  },
  {
    id: '22',
    title: 'TENET (2020)',
    synopsis: "Perang waktu maju mundur. Nonton sekali pasti bingung, nonton dua kali baru paham dikit.",
    posterUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1KlmZZ-1Tr10LXXngVC3iCQTjezXExbk2/view?usp=sharing',
    year: '2020',
    rating: '7.8'
  },
  {
    id: '23',
    title: 'PACIFIC RIM (2013)',
    synopsis: "Robot raksasa lawan monster laut. Del Toro emang jago bikin monster. Pukulan roketnya mantap!",
    posterUrl: 'https://images.unsplash.com/photo-1534293635397-a6427845f8e9?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1ZB1lVZ5DEQW80O5ma-HvyFcNlFCrKnqu/view?usp=sharing',
    year: '2013',
    rating: '7.0'
  },
  {
    id: '24',
    title: 'EDGE OF TOMORROW (2014)',
    synopsis: "Tom Cruise mati idup lagi tiap hari buat lawan alien. Konsep time loop yang dieksekusi sempurna.",
    posterUrl: 'https://images.unsplash.com/photo-1626126525134-fbbc0ecb94cb?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1JJehu3TyFXXgU6JiYQDm3-366K5Zu6Gm/view?usp=sharing',
    year: '2014',
    rating: '8.1'
  },
  {
    id: '25',
    title: 'DISTRICT 9 (2009)',
    synopsis: "Alien terdampar di Afrika Selatan dan diperlakukan kayak sampah. Dokumenter sci-fi yang ngena banget.",
    posterUrl: 'https://images.unsplash.com/photo-1518544806352-a2221eb43d45?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1DojQBvVLRKy4_7byYKo1UqKR2UIisNYQ/view?usp=sharing',
    year: '2009',
    rating: '8.0'
  },
  {
    id: '26',
    title: 'CHAPPIE (2015)',
    synopsis: "Robot polisi yang punya perasaan kayak anak kecil. Diajarin jadi gangster. Sedih tapi lucu.",
    posterUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1CH6JDcahpfdTf1-Td2uITJtthc8da6bj/view?usp=sharing',
    year: '2015',
    rating: '6.8'
  },
  {
    id: '27',
    title: 'ELYSIUM (2013)',
    synopsis: "Orang kaya hidup di luar angkasa, orang miskin di bumi yang ancur. Matt Damon pake exoskeleton buat naik kelas.",
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/11jR31VRLmabDxzFji_knLcRHsea4uCxa/view?usp=sharing',
    year: '2013',
    rating: '6.9'
  },
  {
    id: '28',
    title: 'EX MACHINA (2014)',
    synopsis: "Programmer ngetes robot cewek cantik. Hati-hati, jangan sampe jatuh cinta sama mesin bre.",
    posterUrl: 'https://images.unsplash.com/photo-1531297461136-82lw9z1z1w8c?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1NQc8yOTR4B4ZQKOrKf26feNI_yuPEibI/view?usp=sharing',
    year: '2014',
    rating: '7.7'
  },
  {
    id: '29',
    title: 'ARRIVAL (2016)',
    synopsis: "Alien dateng ke bumi, tapi bukan buat perang. Ahli bahasa harus nerjemahin maksud mereka sebelum telat.",
    posterUrl: 'https://images.unsplash.com/photo-1614728853913-1e3200596070?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/13Mxp5lnMY_LUtDvTX6LTlXoT3kXVeyWo/view?usp=sharing',
    year: '2016',
    rating: '8.3'
  },
  {
    id: '30',
    title: 'MINORITY REPORT (2002)',
    synopsis: "Polisi nangkep penjahat sebelum kejadian. Tom Cruise lari-larian lagi di masa depan yang canggih.",
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1yRDxBKNiAwhU5vWFx2dtO-l875W3BJ3A/view?usp=sharing',
    year: '2002',
    rating: '7.9'
  },
  {
    id: '31',
    title: 'TOTAL RECALL (2012)',
    synopsis: "Ingatan palsu tentang liburan ke Mars. Mana yang asli, mana yang mimpi? Action sci-fi klasik.",
    posterUrl: 'https://images.unsplash.com/photo-1541414779316-956a5084c0d4?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1tRZfFvvz1hJhhBG2oh-pHyJSMdUPEtc0/view?usp=sharing',
    year: '2012',
    rating: '6.7'
  },
  {
    id: '32',
    title: 'ROBOCOP (2014)',
    synopsis: "Polisi hampir mati diubah jadi cyborg penegak hukum. Keren, taktis, dan penuh dilema moral.",
    posterUrl: 'https://images.unsplash.com/photo-1563302111-eab4b145e6c9?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1bjYcP1g4Dc6XITzBuIphn-CkHdclvTIT/view?usp=sharing',
    year: '2014',
    rating: '6.5'
  },
  {
    id: '33',
    title: 'IRON MAN (2008)',
    synopsis: "Tony Stark bikin baju besi canggih di gua. Awal mula MCU yang legendaris. I am Iron Man!",
    posterUrl: 'https://images.unsplash.com/photo-1623939012339-5e513d4a6202?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1FoybeXSfk96PyfvolZyG_SghxCfUXv0o/view?usp=sharing',
    year: '2008',
    rating: '7.9'
  },
  {
    id: '34',
    title: 'AVENGERS: ENDGAME (2019)',
    synopsis: "Puncak pertarungan lawan Thanos. Portalnya kebuka, semua hero ngumpul. Merinding disko bre.",
    posterUrl: 'https://images.unsplash.com/photo-1561149877-84d268ba65b8?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1dfkVLmxm6NleqN8dkob1-23dgW6cLbn6/view?usp=sharing',
    year: '2019',
    rating: '9.3'
  },
  {
    id: '35',
    title: 'BLACK PANTHER (2018)',
    synopsis: "Wakanda Forever! Teknologi canggih ngumpet di Afrika. Kostum dan budayanya keren banget.",
    posterUrl: 'https://images.unsplash.com/photo-1596727147705-54a9d0c2067d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1SOMOJ-dhX90-C28-f2mHELYOgO042PUk/view?usp=sharing',
    year: '2018',
    rating: '7.5'
  },
  {
    id: '36',
    title: 'DEADPOOL (2016)',
    synopsis: "Hero paling nyeleneh, ngomong kasar, dan sadar kamera. Aksi brutal tapi bikin ngakak guling-guling.",
    posterUrl: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1IgvOvAfk2abIM21XJ4HaafYrmYmu5K30/view?usp=sharing',
    year: '2016',
    rating: '8.0'
  },
  {
    id: '37',
    title: 'LOGAN (2017)',
    synopsis: "Wolverine udah tua dan capek. Film superhero paling emosional dan brutal. Perpisahan yang sempurna.",
    posterUrl: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1ANr923fF6lv66TZWmi-LxQXsDhWxRDwp/view?usp=sharing',
    year: '2017',
    rating: '8.5'
  },
  {
    id: '38',
    title: 'JOKER (2019)',
    synopsis: "Orang jahat lahir dari orang baik yang tersakiti. Joaquin Phoenix aktingnya gila, suram dan artistik.",
    posterUrl: 'https://images.unsplash.com/photo-1598144675713-33924f7e59c8?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1Xse1ShfcISKIIIGuDNbm0-5f0vUg3owt/view?usp=sharing',
    year: '2019',
    rating: '8.8'
  },
  {
    id: '39',
    title: 'NO TIME TO DIE (2021)',
    synopsis: "Aksi terakhir Daniel Craig sebagai 007. Elegan, penuh aksi, dan emosional. Bond keren abis.",
    posterUrl: 'https://images.unsplash.com/photo-1514489024785-d5ba8dfb2198?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1rqKGwMZ7p_UXkI-rudXg44FfY-c7PbsZ/view?usp=sharing',
    year: '2021',
    rating: '7.8'
  },
  {
    id: '40',
    title: 'MISSION: IMPOSSIBLE - FALLOUT (2018)',
    synopsis: "Tom Cruise emang gak ada takutnya. Stunt gila-gilaan, lari-larian, plot twist di mana-mana.",
    posterUrl: 'https://images.unsplash.com/photo-1542259681-d4cd7980344d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1BYpw8XKErN4AwOx9K419Q2hsYiT0jYht/view?usp=sharing',
    year: '2018',
    rating: '8.5'
  },
  {
    id: '41',
    title: 'KINGSMAN: THE SECRET SERVICE (2014)',
    synopsis: "Manners maketh man. Agen rahasia Inggris yang classy tapi brutal. Scene gerejanya legendaris.",
    posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1OEbjoH2Cdyee207lj3pMObdzlckX7irY/view?usp=sharing',
    year: '2014',
    rating: '7.8'
  },
  {
    id: '42',
    title: 'EXTRACTION (2020)',
    synopsis: "Chris Hemsworth jadi tentara bayaran nyelamatin anak bos narkoba. Action long-take nya juara dunia.",
    posterUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1pn-plxChTHbSUNLc9Ddv-igD9YoNl867/view?usp=sharing',
    year: '2020',
    rating: '7.0'
  },
  {
    id: '43',
    title: 'THE GRAY MAN (2022)',
    synopsis: "Ryan Gosling vs Chris Evans. Dua agen top saling buru. Mahal, ledakan di mana-mana, seru buat hiburan.",
    posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/16X5c_iIA1OontkVcxW557deRct9g5-IH/view?usp=sharing',
    year: '2022',
    rating: '6.8'
  },
  {
    id: '44',
    title: 'RED NOTICE (2021)',
    synopsis: "Dwayne Johnson, Ryan Reynolds, Gal Gadot. Maling seni vs FBI. Kocak, ringan, visualnya oke.",
    posterUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1-9jM-6yQnICy229AcEVJmFzCC-7a3yvF/view?usp=sharing',
    year: '2021',
    rating: '6.5'
  },
  {
    id: '45',
    title: '6 UNDERGROUND (2019)',
    synopsis: "Michael Bay bikin film Netflix. Ledakan tiap 5 menit, mobil terbang, parkour gila. Otak tinggal di pintu.",
    posterUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1Gdjta3LQ5GscXVFC6CzJxnS5E5w7Nn4p/view?usp=sharing',
    year: '2019',
    rating: '6.1'
  },
  {
    id: '46',
    title: 'ARMY OF THE DEAD (2021)',
    synopsis: "Maling kasino di Las Vegas yang penuh zombie. Zombienya pinter, ada harimau zombie juga.",
    posterUrl: 'https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/16XbHz4GSR0xN0q6art-ArOevMmnfcFPT/view?usp=sharing',
    year: '2021',
    rating: '6.0'
  },
  {
    id: '47',
    title: 'REBEL MOON (2023)',
    synopsis: "Star Wars versi Zack Snyder. Slow motion banyak, visual gelap, perang luar angkasa yang epik.",
    posterUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/159ustLqlvb4PUI6f20l04y_I692xC4I8/view?usp=sharing',
    year: '2023',
    rating: '6.0'
  },
  {
    id: '48',
    title: 'PROJECT POWER (2020)',
    synopsis: "Pil yang ngasih kekuatan super random selama 5 menit. Konsep unik, aksi seru di New Orleans.",
    posterUrl: 'https://images.unsplash.com/photo-1615915468538-0fbd857888ca?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/11JFFZYMdoMGjsxBWp0ga_FC4bRqARAc8/view?usp=sharing',
    year: '2020',
    rating: '6.5'
  },
  {
    id: '49',
    title: 'THE OLD GUARD (2020)',
    synopsis: "Sekelompok tentara bayaran yang gak bisa mati. Charlize Theron badass banget pake kapak.",
    posterUrl: 'https://images.unsplash.com/photo-1595131838593-01053158e27c?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1bbn3PjvnCYfyJISHuEP_G_3u5Q66KteI/view?usp=sharing',
    year: '2020',
    rating: '6.8'
  },
  {
    id: '50',
    title: 'KATE (2021)',
    synopsis: "Pembunuh bayaran diracun dan cuma punya waktu 24 jam buat balas dendam di Tokyo. Neon abis!",
    posterUrl: 'https://images.unsplash.com/photo-1493514789931-586cb2db6d77?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1FnwVjycnQKgT6L9qw9Aijfm05QmtHGMR/view?usp=sharing',
    year: '2021',
    rating: '6.3'
  },
  {
    id: '51',
    title: 'GUNPOWDER MILKSHAKE (2021)',
    synopsis: "Cewek-cewek pembunuh bayaran ngumpul di restoran retro. Colorful, stylish, dan penuh aksi.",
    posterUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1EuToD7JISEKdT_F4UNsn3vLofx-zs_Fa/view?usp=sharing',
    year: '2021',
    rating: '6.0'
  },
  {
    id: '52',
    title: 'JOLT (2021)',
    synopsis: "Cewek dengan masalah amarah yang harus nyetrum dirinya sendiri biar tenang. Unik dan rusuh.",
    posterUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1LQKHWvFYP-tXQmFdxH6V4bJ45dqVGIOl/view?usp=sharing',
    year: '2021',
    rating: '5.8'
  },
  {
    id: '53',
    title: 'LUCY (2014)',
    synopsis: "Scarlett Johansson make 100% kapasitas otak. Jadi dewa, bisa ngendaliin waktu dan materi.",
    posterUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1JQ995uWmK2ZCGqp6Avzk_KBsId2AD2M4/view?usp=sharing',
    year: '2014',
    rating: '6.6'
  },
  {
    id: '54',
    title: 'SALT (2010)',
    synopsis: "Angelina Jolie jadi agen CIA yang dituduh mata-mata Rusia. Kabur-kaburan penuh strategi.",
    posterUrl: 'https://images.unsplash.com/photo-1620023425028-2c4994017df8?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1Be0QIVhx8PG7i2u3eJaYkwlZlsUKywwd/view?usp=sharing',
    year: '2010',
    rating: '6.5'
  },
  {
    id: '55',
    title: 'ATOMIC BLONDE (2017)',
    synopsis: "Agen rahasia di Berlin pasca perang dingin. Berantem tangan kosongnya realistis dan brutal.",
    posterUrl: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/15OxhWPwudLMSLMdrnp6W2QT5YHFn5kp0/view?usp=sharing',
    year: '2017',
    rating: '7.0'
  },
  {
    id: '56',
    title: 'ANNA (2019)',
    synopsis: "Model cantik ternyata pembunuh bayaran KGB. Plot twist berlapis-lapis khas Luc Besson.",
    posterUrl: 'https://images.unsplash.com/photo-1481819613568-3701cbc70156?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/16Iax61TPOdhHETX87Wzi2YelBalD77Qk/view?usp=sharing',
    year: '2019',
    rating: '6.7'
  },
  {
    id: '57',
    title: 'RED SPARROW (2018)',
    synopsis: "Jennifer Lawrence jadi mata-mata Rusia yang pake seduksi sebagai senjata. Gelap dan dewasa.",
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1BR2FnVu9qFxktnlgWEa4y01z9liBUh8v/view?usp=sharing',
    year: '2018',
    rating: '6.6'
  },
  {
    id: '58',
    title: 'BLACK WIDOW (2021)',
    synopsis: "Masa lalu Natasha Romanoff terungkap. Reuni keluarga disfungsional yang penuh ledakan.",
    posterUrl: 'https://images.unsplash.com/photo-1549488497-657d45e43896?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1SnGAc3ItQ9xE2190LSEWmpcX5CVNmKGE/view?usp=sharing',
    year: '2021',
    rating: '7.0'
  },
  {
    id: '59',
    title: 'WONDER WOMAN (2017)',
    synopsis: "Putri Amazon turun ke dunia manusia pas Perang Dunia I. Simbol harapan yang kuat banget.",
    posterUrl: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1X9B_24zhnSlkSt-vqINBNxaBfetQV4vB/view?usp=sharing',
    year: '2017',
    rating: '7.5'
  },
  {
    id: '60',
    title: 'CAPTAIN MARVEL (2019)',
    synopsis: "Pilot tempur dapet kekuatan kosmik. Nenek-nenek dipukulin di kereta (ternyata alien).",
    posterUrl: 'https://images.unsplash.com/photo-1620455588321-c5a49b6b1127?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1kGT84DE9MdL2To38HtCraCdl796PFjFi/view?usp=sharing',
    year: '2019',
    rating: '6.9'
  },
  {
    id: '61',
    title: 'BIRDS OF PREY (2020)',
    synopsis: "Harley Quinn putus sama Joker dan bikin geng cewek sendiri. Gila, warna-warni, dan seru.",
    posterUrl: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1i1-RHgdtaeYKxW2HF2mOsVzbZMlRCmLU/view?usp=sharing',
    year: '2020',
    rating: '6.5'
  },
  {
    id: '62',
    title: 'THE SUICIDE SQUAD (2021)',
    synopsis: "Tim penjahat dikirim misi bunuh diri lagi. Kali ini lebih brutal, lucu, dan ada hiu bisa ngomong.",
    posterUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1sOFaXKoYT7LozfCdoQ_pti1AJ1jmTRqi/view?usp=sharing',
    year: '2021',
    rating: '7.5'
  },
  {
    id: '63',
    title: 'VENOM (2018)',
    synopsis: "Tom Hardy kemasukan alien item. Hubungan mereka kayak pacaran tapi toxic. Seru dan kocak.",
    posterUrl: 'https://images.unsplash.com/photo-1610484733076-a60d694cb549?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1qfYjOqJ-XJjrJLNQxlXPcQF-qiIEsyQa/view?usp=sharing',
    year: '2018',
    rating: '6.8'
  },
  {
    id: '64',
    title: 'MORBIUS (2022)',
    synopsis: "Jared Leto jadi vampir gara-gara eksperimen gagal. It's Morbin' Time! (Meme legendaris).",
    posterUrl: 'https://images.unsplash.com/photo-1626245344319-58580d190b21?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1PpuImo3SI2Waa_D36H2Zt6VL0gIsIbFh/view?usp=sharing',
    year: '2022',
    rating: '5.5'
  },
  {
    id: '65',
    title: 'BLUE BEETLE (2023)',
    synopsis: "Remaja Latin dapet kekuatan alien kumbang biru. Keluarga adalah segalanya di film ini.",
    posterUrl: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/12GqhStAUykdIVXYrIMmElJLqlibycImY/view?usp=sharing',
    year: '2023',
    rating: '6.5'
  },
  {
    id: '66',
    title: 'AQUAMAN (2018)',
    synopsis: "Jason Momoa basah-basahan ngerebut tahta Atlantis. Visual bawah lautnya indah banget.",
    posterUrl: 'https://images.unsplash.com/photo-1550948537-130a1ce83314?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1KQzO1doWQCF-VXiNs3tbjfZpVj37PBUl/view?usp=sharing',
    year: '2018',
    rating: '7.0'
  },
  {
    id: '67',
    title: 'THE FLASH (2023)',
    synopsis: "Barry Allen lari ke masa lalu buat nyelamatin ibunya, tapi malah ngerusak semesta. Batman Michael Keaton balik!",
    posterUrl: 'https://images.unsplash.com/photo-1559535332-db9971090158?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1vdZNyBfa6AXpyamDdVN-UNKzmXkwERbP/view?usp=sharing',
    year: '2023',
    rating: '6.8'
  },
  {
    id: '68',
    title: 'SHAZAM! (2019)',
    synopsis: "Bocah dapet kekuatan dewa kalau teriak satu kata. Kocak, heartwarming, dan fun banget.",
    posterUrl: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1S6ZPhBcs-ymJTm4GRiW-3JrLpjpxFaCt/view?usp=sharing',
    year: '2019',
    rating: '7.2'
  },
  {
    id: '69',
    title: 'BLACK ADAM (2022)',
    synopsis: "The Rock jadi anti-hero super kuat. Hierarchy of power in DC universe changed forever katanya.",
    posterUrl: 'https://images.unsplash.com/photo-1568535092706-53825868e82a?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1AuXNig7cmb6OnxGoHof9YskMDPaE49gh/view?usp=sharing',
    year: '2022',
    rating: '6.5'
  },
  {
    id: '70',
    title: 'GEMINI MAN (2019)',
    synopsis: "Will Smith lawan kloningan mudanya sendiri. Actionnya alus, teknologinya canggih.",
    posterUrl: 'https://images.unsplash.com/photo-1506202687253-52e1b29d3527?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1iED5odWUI9aow8ofw3D6ns6btBl2wwFn/view?usp=sharing',
    year: '2019',
    rating: '6.0'
  },
  {
    id: '71',
    title: 'CODE 8 (2019)',
    synopsis: "Dunia di mana orang berkekuatan super didiskriminasi dan jadi buruh kasar. Indie tapi keren.",
    posterUrl: 'https://images.unsplash.com/photo-1616091093744-8dd3ae58f8b6?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1Qnni93oTPFW1rsHp7XMIDVNn2QAHKNt6/view?usp=sharing',
    year: '2019',
    rating: '6.5'
  },
  {
    id: '72',
    title: 'UPGRADE (2018)',
    synopsis: "Lumpuh terus dipasang chip AI yang bisa ngendaliin badan buat berantem. Hidden gem sci-fi terbaik!",
    posterUrl: 'https://images.unsplash.com/photo-1542308674-c3c2f913d8d6?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1-UUUT_rkkJIwFPI6ZL4M43zKIc1FRpED/view?usp=sharing',
    year: '2018',
    rating: '7.8'
  },
  {
    id: '73',
    title: 'MUTE (2018)',
    synopsis: "Bartender bisu nyari pacarnya yang ilang di Berlin masa depan yang neon. Atmosfernya dapet banget.",
    posterUrl: 'https://images.unsplash.com/photo-1506543730435-e2c1d455b57d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1tI4HJJ_hQ7h4hundaWYlW8yJpD16rRZf/view?usp=sharing',
    year: '2018',
    rating: '6.0'
  },
  {
    id: '74',
    title: 'ZONE 414 (2021)',
    synopsis: "Detektif nyari anak orang kaya di kota robot. Mirip Blade Runner tapi budget hemat. Lumayan lah.",
    posterUrl: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1wgUbd_2sbaWbrqr_ea_Gxz6LyWEbjIXs/view?usp=sharing',
    year: '2021',
    rating: '6.2'
  },
  {
    id: '75',
    title: 'REMINISCENCE (2021)',
    synopsis: "Hugh Jackman jual jasa buat ngeliat masa lalu. Noir sci-fi yang romantis dan misterius.",
    posterUrl: 'https://images.unsplash.com/photo-1510520286695-88541249915e?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1g2BJCRT70kIu6o6mmInnPuicc_IphaaT/view?usp=sharing',
    year: '2021',
    rating: '6.0'
  },
  {
    id: '76',
    title: 'INFINITE (2021)',
    synopsis: "Mark Wahlberg baru sadar kalo dia reinkarnasi terus menerus. Action standard tapi menghibur.",
    posterUrl: 'https://images.unsplash.com/photo-1544979590-37e9b47cd705?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1ReLlZrkI3MxRfdfIF8HZR2zzmaN2RSMe/view?usp=sharing',
    year: '2021',
    rating: '5.8'
  },
  {
    id: '77',
    title: 'LOOPER (2012)',
    synopsis: "Pembunuh bayaran harus ngebunuh versi tua dirinya yang dikirim dari masa depan. Mind blowing!",
    posterUrl: 'https://images.unsplash.com/photo-1534438097545-a28bc31c613c?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/14KbJtvrBqjKF2Jk0p71H8oj2OqOlmrJK/view?usp=sharing',
    year: '2012',
    rating: '7.8'
  },
  {
    id: '78',
    title: 'SOURCE CODE (2011)',
    synopsis: "Tentara bangun di tubuh orang lain di kereta yang mau meledak. Harus ulang terus sampe nemu pelakunya.",
    posterUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1gdLy48Gd3DF6lqmZmIam6YFr-9q594-K/view?usp=sharing',
    year: '2011',
    rating: '7.5'
  },
  {
    id: '79',
    title: 'PREDESTINATION (2014)',
    synopsis: "Film time travel paling bikin pusing. Ethan Hawke ngejar penjahat lintas waktu. Plot twistnya gila.",
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1FwAVzD_Q90dWCxQuIinjadv-KXl9ZJCm/view?usp=sharing',
    year: '2014',
    rating: '7.5'
  },
  {
    id: '80',
    title: 'OBLIVION (2013)',
    synopsis: "Tom Cruise kerja di bumi yang udah ditinggalin. Visualnya bersih, musiknya M83 enak banget.",
    posterUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1C4P2KDnccxt_H1eWMTrhEX-c3_U547by/view?usp=sharing',
    year: '2013',
    rating: '7.0'
  },
  {
    id: '81',
    title: 'WAR OF THE WORLDS (2005)',
    synopsis: "Alien nyerang bumi pake tripod raksasa. Tegang dari awal sampe akhir. Tom Cruise lari lagi.",
    posterUrl: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1SIvRkqu3Gd8nO1AnZ1FIL_06iNhG4V7h/view?usp=sharing',
    year: '2005',
    rating: '6.8'
  },
  {
    id: '82',
    title: 'STAR WARS: THE FORCE AWAKENS (2015)',
    synopsis: "Force bangun lagi. Rey, Finn, dan Poe lawan First Order. Nostalgia campur aksi baru.",
    posterUrl: 'https://images.unsplash.com/photo-1546561892-65bf811416b9?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1JTbrtkuG4g7JCyvcuBQOWnCO5b1VQNCv/view?usp=sharing',
    year: '2015',
    rating: '8.0'
  },
  {
    id: '83',
    title: 'ROGUE ONE (2016)',
    synopsis: "Misi nyuri blueprint Death Star. Film Star Wars paling perang dan realistis. Endingnya ngena.",
    posterUrl: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/10FG7LH0yAtcKCKhqHKOaWIqybh0BL3-E/view?usp=sharing',
    year: '2016',
    rating: '8.0'
  },
  {
    id: '84',
    title: 'SOLO: A STAR WARS STORY (2018)',
    synopsis: "Masa muda Han Solo. Gimana dia ketemu Chewie dan dapet Millennium Falcon. Seru buat fans.",
    posterUrl: 'https://images.unsplash.com/photo-1596727147705-54a9d0c2067d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1N5BWyQ6DfwUe3u3-KBnGjyxazhuD9qn2/view?usp=sharing',
    year: '2018',
    rating: '7.0'
  },
  {
    id: '85',
    title: 'GODZILLA (2014)',
    synopsis: "Raja monster balik lagi. Ukurannya gede banget, suaranya menggelegar. Manusia cuma jadi semut.",
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1HfZKMMxgLimhoWnWAYAAMYzR-r9QR_Jy/view?usp=sharing',
    year: '2014',
    rating: '6.8'
  },
  {
    id: '86',
    title: 'KONG: SKULL ISLAND (2017)',
    synopsis: "Ekspedisi ke pulau tengkorak. Kong masih muda tapi udah garang. Setting perang Vietnam yang asik.",
    posterUrl: 'https://images.unsplash.com/photo-1615915468538-0fbd857888ca?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1n4brsvtM11xSan2mS7i08VuSCu3Ku5Gd/view?usp=sharing',
    year: '2017',
    rating: '7.2'
  },
  {
    id: '87',
    title: 'GODZILLA: KING OF THE MONSTERS (2019)',
    synopsis: "Ghidorah, Mothra, Rodan muncul semua. Berantemnya epik, visualnya indah banget.",
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1iE2571nI64JCiqMqqk26m1RgJmjaJTxr/view?usp=sharing',
    year: '2019',
    rating: '6.5'
  },
  {
    id: '88',
    title: 'PACIFIC RIM: UPRISING (2018)',
    synopsis: "Generasi baru pilot Jaeger. Robotnya lebih lincah, monsternya evolusi. Hiburan ringan.",
    posterUrl: 'https://images.unsplash.com/photo-1534293635397-a6427845f8e9?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1jsTJrmEgFvIg6_gHFCSvD1nZbkQcuv2Q/view?usp=sharing',
    year: '2018',
    rating: '6.0'
  },
  {
    id: '89',
    title: 'BUMBLEBEE (2018)',
    synopsis: "Spin-off Transformers yang lebih hati. Persahabatan cewek sama mobil kodok kuning. Manis.",
    posterUrl: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1w4zYyw3AyGKM2cGbRTneFpT7oWLrnkDq/view?usp=sharing',
    year: '2018',
    rating: '7.5'
  },
  {
    id: '90',
    title: 'TRANSFORMERS: THE LAST KNIGHT (2017)',
    synopsis: "Optimus Prime jahat? Sejarah Transformers di bumi terungkap. Ledakan Michael Bay maksimal.",
    posterUrl: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1afF24F7CVFI_cDVCtjHCyEDItMWKvYbl/view?usp=sharing',
    year: '2017',
    rating: '5.5'
  },
  {
    id: '91',
    title: 'JURASSIC WORLD (2015)',
    synopsis: "Taman dinosaurus buka lagi, kali ini pake hybrid monster. Chris Pratt ngelatih Raptor. Gas!",
    posterUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1-9F3iue35B6pbh3vQPiKO1QG7VeAOSmA/view?usp=sharing',
    year: '2015',
    rating: '7.0'
  },
  {
    id: '92',
    title: 'JURASSIC WORLD: FALLEN KINGDOM (2018)',
    synopsis: "Pulau mau meledak, dinosaurus harus diselamatin. Indoraptor nyerempet genre horor.",
    posterUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1FYg9tSiNM5TEF2MgfJGwQ_6uq00m4Nis/view?usp=sharing',
    year: '2018',
    rating: '6.5'
  },
  {
    id: '93',
    title: 'JURASSIC WORLD: DOMINION (2022)',
    synopsis: "Dino hidup bareng manusia. Pemain lama balik lagi. Reuni akbar lawan belalang raksasa.",
    posterUrl: 'https://images.unsplash.com/photo-1620641788421-7f1c338e61a9?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/15YsYTnPKKB6RKyne_oNujGAUmfkv07Iy/view?usp=sharing',
    year: '2022',
    rating: '6.0'
  },
  {
    id: '94',
    title: 'FAST & FURIOUS 9 (2021)',
    synopsis: "Dominic Toretto punya adek jahat. Mobil terbang ke luar angkasa. Fisika udah gak berlaku bre.",
    posterUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1qpyLjp-pFqYPXzSyN0zBG7LOxCl4xU5v/view?usp=sharing',
    year: '2021',
    rating: '5.5'
  },
  {
    id: '95',
    title: 'FAST X (2023)',
    synopsis: "Jason Momoa jadi musuh yang flamboyant banget. Balapan di Roma pake bom bola raksasa.",
    posterUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/14Ef4UfRFd3K_I2C05Doan5FMIEBgVORi/view?usp=sharing',
    year: '2023',
    rating: '6.0'
  },
  {
    id: '96',
    title: 'HOBBS & SHAW (2019)',
    synopsis: "The Rock sama Jason Statham berantem mulu tapi harus kerja sama lawan Idris Elba yang cyborg.",
    posterUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1e6IIZTb1NzdewiO0N5itDVdUfva8xc9N/view?usp=sharing',
    year: '2019',
    rating: '6.5'
  },
  {
    id: '97',
    title: 'TOP GUN: MAVERICK (2022)',
    synopsis: "Tom Cruise ngajarin pilot muda cara terbang yang bener. Dogfight jet tempur terbaik sepanjang masa.",
    posterUrl: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/14ujTqRZho2n2qV76cPV1mfdtUEfillk3/view?usp=sharing',
    year: '2022',
    rating: '9.0'
  },
  {
    id: '98',
    title: 'FURIOSA: A MAD MAX SAGA (2024)',
    synopsis: "Prekuel Mad Max. Anya Taylor-Joy jadi Furiosa muda. Gurun pasir, motor, dan balas dendam.",
    posterUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1UZdj93ORn_pvCLadeqQeNAsZlYH77e38/view?usp=sharing',
    year: '2024',
    rating: '8.0'
  },
  {
    id: '99',
    title: 'CIVIL WAR (2024)',
    synopsis: "Amerika perang saudara di masa depan. Wartawan nyoba nyampe ke Washington DC. Tegang dan realistis.",
    posterUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1kgpuwHX6tzRTtrj1trsY2FnKXQVfNzYk/view?usp=sharing',
    year: '2024',
    rating: '7.8'
  },
  {
    id: '100',
    title: 'KINGDOM OF THE PLANET OF THE APES (2024)',
    synopsis: "Masa depan di mana kera berkuasa dan manusia jadi liar. Visual hutannya cakep banget.",
    posterUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6dce60?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1fEipwPQs4uqvjnE5X70Nyy82k9v2uRho/view?usp=sharing',
    year: '2024',
    rating: '7.5'
  },
  {
    id: '101',
    title: 'BAD BOYS: RIDE OR DIE (2024)',
    synopsis: "Will Smith sama Martin Lawrence balik lagi. Masih kocak, masih rusuh, masih nembakin orang jahat.",
    posterUrl: 'https://images.unsplash.com/photo-1594386993181-e2dd62c2f216?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1TYctXHgK3qQXfdgXjdenEjWatb8zqs6o/view?usp=sharing',
    year: '2024',
    rating: '7.0'
  },
  {
    id: '102',
    title: 'THE FALL GUY (2024)',
    synopsis: "Stuntman kejebak konspirasi jahat. Ryan Gosling lucu banget di sini, aksinya juga niat.",
    posterUrl: 'https://images.unsplash.com/photo-1496345962527-29157ab5bd8c?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1_CsSRBBv2_Twqb5WT3A6VqXoa8Qt0oSa/view?usp=sharing',
    year: '2024',
    rating: '7.5'
  },
  {
    id: '103',
    title: 'ARGYLLE (2024)',
    synopsis: "Penulis novel mata-mata ternyata nulis kejadian nyata. Kucingnya lucu, Henry Cavill potongannya aneh.",
    posterUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1fLjVjCGAmS-gI92yOZj0sc1SEPuPMOtl/view?usp=sharing',
    year: '2024',
    rating: '6.0'
  },
  {
    id: '104',
    title: 'BEEKEEPER (2024)',
    synopsis: "Jason Statham melihara lebah, tapi diganggu scammer. Yaudah, dibantai semua satu organisasi.",
    posterUrl: 'https://images.unsplash.com/photo-1628148866164-9b8849646b5a?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1yeZhlGTRpfafc7_q8I-etuMxV_XGLlEV/view?usp=sharing',
    year: '2024',
    rating: '6.5'
  },
  {
    id: '105',
    title: 'MADAME WEB (2024)',
    synopsis: "Dakota Johnson bisa liat masa depan. Dikejar spider-man jahat. Filmnya... ya gitu deh, tonton aja.",
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1EnPdqOn7tqZ3nEOq7maxbfKoBAS9gd_d/view?usp=sharing',
    year: '2024',
    rating: '4.0'
  },
  {
    id: '106',
    title: 'KRAVEN THE HUNTER (2024)',
    synopsis: "Pemburu paling ganas di dunia Marvel. Berdarah-darah, liar, dan penuh aksi hewan buas.",
    posterUrl: 'https://images.unsplash.com/photo-1557401614-4903328e3678?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1Hsg-rgR9ablEAIjYXhT_uC5mRnsyyagr/view?usp=sharing',
    year: '2024',
    rating: '6.5'
  },
  {
    id: '107',
    title: 'BORDERLANDS (2024)',
    synopsis: "Adaptasi game tembak-tembakan. Cate Blanchett rambut merah. Warna-warni, ledakan, dan robot cerewet.",
    posterUrl: 'https://images.unsplash.com/photo-1599557285906-8c5476a54f0a?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1ptC5QtSkTKoJRpap3sbNaf6QXlhjllJa/view?usp=sharing',
    year: '2024',
    rating: '5.0'
  },
  {
    id: '108',
    title: 'ALIEN: ROMULUS (2024)',
    synopsis: "Anak-anak muda kejebak sama Xenomorph di stasiun luar angkasa. Balik ke akar horor Alien yang asli.",
    posterUrl: 'https://images.unsplash.com/photo-1533221362791-5f2c4164b387?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1cKr_g6R2k-lNfwQlf57TIp_dCTlrHP2M/view?usp=sharing',
    year: '2024',
    rating: '7.8'
  },
  {
    id: '109',
    title: 'TWISTERS (2024)',
    synopsis: "Pemburu badai balik lagi. Angin puting beliungnya lebih gede, lebih ganas. Efeknya ngeri.",
    posterUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1BT7vDNCB2XzZVjfw7xwnl5GX65pmSSpx/view?usp=sharing',
    year: '2024',
    rating: '7.0'
  },
  {
    id: '110',
    title: 'MEGALOPOLIS (2024)',
    synopsis: "Proyek ambisius Francis Ford Coppola. Kota masa depan yang utopis. Visualnya artistik banget.",
    posterUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1-nW8MRzrh_1gq3fghFJStEYen9bfgbrc/view?usp=sharing',
    year: '2024',
    rating: '6.5'
  },
  {
    id: '111',
    title: 'MICKEY 17 (2025)',
    synopsis: "Robert Pattinson jadi karyawan yang tugasnya mati terus dikloning lagi. Sci-fi aneh dari sutradara Parasite.",
    posterUrl: 'https://images.unsplash.com/photo-1535378437327-1e58ae9231f1?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1cRKk3OyBj-mdB9EUwT0xxz8kZaJtCiWt/view?usp=sharing',
    year: '2025',
    rating: '7.5'
  },
  {
    id: '112',
    title: 'BALLERINA (2025)',
    synopsis: "Spin-off John Wick. Ana de Armas jadi pembunuh bayaran yang nyari dendam. Aksi cantik dan mematikan.",
    posterUrl: 'https://images.unsplash.com/photo-1496360166961-10a51d5f367a?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1aVRW4D0OB9HPXDPM-nlj6t8MqNOvpaI3/view?usp=sharing',
    year: '2025',
    rating: '7.0'
  },
  {
    id: '113',
    title: 'MISSION: IMPOSSIBLE 8 (2025)',
    synopsis: "Lanjutan Dead Reckoning. Tom Cruise lari lagi, kali ini mungkin yang terakhir. Wajib tonton di IMAX.",
    posterUrl: 'https://images.unsplash.com/photo-1542259681-d4cd7980344d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1JTbrtkuG4g7JCyvcuBQOWnCO5b1VQNCv/view?usp=sharing',
    year: '2025',
    rating: '8.5'
  },
  {
    id: '114',
    title: 'THE FANTASTIC FOUR (2025)',
    synopsis: "Keluarga superhero pertama Marvel akhirnya pulang ke MCU. Setting retro 60-an yang asik.",
    posterUrl: 'https://images.unsplash.com/photo-1616091093744-8dd3ae58f8b6?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/144V65HBi0O4linq9MIAy-C_BUKk-70o1/view?usp=sharing',
    year: '2025',
    rating: '7.5'
  },
  {
    id: '115',
    title: 'SUPERMAN (2025)',
    synopsis: "Superman baru yang lebih muda dan penuh harapan. James Gunn yang nyutradarain, pasti seru.",
    posterUrl: 'https://images.unsplash.com/photo-1596727147705-54a9d0c2067d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/19JPigSkyJZPAv1C3f-0g73fHA2pidYVD/view?usp=sharing',
    year: '2025',
    rating: '8.0'
  },
  {
    id: '116',
    title: 'AVATAR: FIRE AND ASH (2025)',
    synopsis: "Sekarang ketemu suku api Na'vi. Visualnya bakal lebih gila lagi. Cameron gak pernah ngecewain.",
    posterUrl: 'https://images.unsplash.com/photo-1505968409348-bd000797c92e?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/14wS9DsAMXS3rddt15cv9xlrXrsmRvMZC/view?usp=sharing',
    year: '2025',
    rating: '8.5'
  },
  {
    id: '117',
    title: 'TRON: ARES (2025)',
    synopsis: "Jared Leto masuk ke Grid. Film ketiga Tron yang udah ditunggu lama. Neon, musik, action.",
    posterUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1xxwySwMcdiFg50onmeXOe_iNxxHGGdFd/view?usp=sharing',
    year: '2025',
    rating: '7.5'
  },
  {
    id: '118',
    title: 'MINECRAFT MOVIE (2025)',
    synopsis: "Jack Black jadi Steve. Jason Momoa pake baju pink. Aneh, kotak-kotak, tapi bikin penasaran.",
    posterUrl: 'https://images.unsplash.com/photo-1607513105658-294747eb11d9?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1u2RI_nS8nYGQOJnM834mX9-HMFO09F1E/view?usp=sharing',
    year: '2025',
    rating: '6.0'
  },
  {
    id: '119',
    title: 'HOW TO TRAIN YOUR DRAGON (2025)',
    synopsis: "Versi live action dari kartun naga favorit kita. Toothless bakal seimut apa ya kalo nyata?",
    posterUrl: 'https://images.unsplash.com/photo-1576228315250-b9df7270b206?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1W4OtSP7dYgcgaVPeKVMODCEWQSZEskrc/view?usp=sharing',
    year: '2025',
    rating: '7.8'
  },
  {
    id: '120',
    title: 'ELIO (2025)',
    synopsis: "Bocah dikira pemimpin bumi sama alien. Pixar bikin film luar angkasa lagi, pasti visualnya cakep.",
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/10Gao1UwIJijbzl4Pt5TXz1wVF6nVGzdX/view?usp=sharing',
    year: '2025',
    rating: '7.5'
  },
  {
    id: '121',
    title: 'ZOOTOPIA 2 (2025)',
    synopsis: "Judy Hopps sama Nick Wilde balik lagi. Kasus baru di kota hewan yang rame. Furry merapat.",
    posterUrl: 'https://images.unsplash.com/photo-1587843472856-2e873cc7f5ef?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/19lbA_amVxRTj0_4g-yFqM8D-9bgzCwPH/view?usp=sharing',
    year: '2025',
    rating: '8.0'
  },
  {
    id: '122',
    title: 'MOANA 2 (2024)',
    synopsis: "Moana dapet panggilan leluhur lagi. Maui juga ikutan. Petualangan laut yang nyegerin mata.",
    posterUrl: 'https://images.unsplash.com/photo-1583995878426-302a64731872?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1Up6yFOhO8NaJ5tECQgnyclzIZI-s_AvR/view?usp=sharing',
    year: '2024',
    rating: '7.8'
  },
  {
    id: '123',
    title: 'MUFASA: THE LION KING (2024)',
    synopsis: "Cerita bapaknya Simba pas masih muda. Gimana dia jadi raja hutan. CGI-nya makin realistik.",
    posterUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1xW6WH5xiywiH6FKELP4pZQRZyZ5HyLnL/view?usp=drivesdk',
    year: '2024',
    rating: '7.0'
  },
  {
    id: '124',
    title: 'SONIC THE HEDGEHOG 3 (2024)',
    synopsis: "Shadow muncul! Keanu Reeves yang ngisi suara. Sonic punya saingan berat yang edgier.",
    posterUrl: 'https://images.unsplash.com/photo-1614726365723-49cfae9d012d?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1sDbbzZJknNefhLGUFa4inMFXqarkrDFw/view?usp=drivesdk',
    year: '2024',
    rating: '7.5'
  },
  {
    id: '125',
    title: 'KUNG FU PANDA 4 (2024)',
    synopsis: "Po nyari penerus Dragon Warrior. Lawannya bunglon sakti. Aksi kungfu-nya masih top markotop.",
    posterUrl: 'https://images.unsplash.com/photo-1542352516-7d02517865c6?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1cyr_sKjkPT_ybDpbUp2Ye4lDC2T7R-zO/view?usp=drivesdk',
    year: '2024',
    rating: '7.0'
  },
  {
    id: '126',
    title: 'DESPICABLE ME 4 (2024)',
    synopsis: "Gru punya bayi sekarang. Minions makin aneh-aneh aja kelakuannya. Hiburan keluarga yang aman.",
    posterUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1HJ0JmLN2C-B8yXAqAtQqO9rSlITQf4fq/view?usp=drivesdk',
    year: '2024',
    rating: '6.8'
  },
  {
    id: '127',
    title: 'INSIDE OUT 2 (2024)',
    synopsis: "Riley udah remaja, emosi baru muncul: Anxiety. Relate banget buat yang lagi quarter life crisis.",
    posterUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1rhHsSlcwga5rK0_FPdzDVb4pbL_Nje9w/view?usp=drivesdk',
    year: '2024',
    rating: '8.5'
  },
  {
    id: '128',
    title: 'BEETLEJUICE BEETLEJUICE (2024)',
    synopsis: "Hantu nyentrik Michael Keaton balik lagi. Jenna Ortega ikutan gabung. Horor komedi yang aneh.",
    posterUrl: 'https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1VNIujrWQ6I4_3H38GcvRjxUbt-IioPF5/view?usp=drivesdk',
    year: '2024',
    rating: '7.0'
  },
  {
    id: '129',
    title: 'GLADIATOR II (2024)',
    synopsis: "Balik ke colosseum setelah puluhan tahun. Paul Mescal lawan badak. Ridley Scott lagi masak.",
    posterUrl: 'https://images.unsplash.com/photo-1560252829-847293e42369?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1j1W7qYwHZ0iWFKY4Z6AAnRFuLii5W20a/view?usp=drivesdk',
    year: '2024',
    rating: '7.5'
  },
  {
    id: '130',
    title: 'NOSFERATU (2024)',
    synopsis: "Remake horor klasik vampir. Bill Skarsgard jadi monster. Gelap, gotik, dan bikin merinding.",
    posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1qSO_ArNv2Df_7UO_w0lAdJvv5uMKavks/view?usp=drivesdk',
    year: '2024',
    rating: '7.8'
  },
  {
    id: '131',
    title: 'WICKED (2024)',
    synopsis: "Musikal penyihir dari Oz. Ariana Grande jadi penyihir baik. Kostum dan set-nya megah.",
    posterUrl: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1svLO1AWyl6RZlUAPsUmECT3PbDqFaSrQ/view?usp=drivesdk',
    year: '2024',
    rating: '7.5'
  },
  {
    id: '132',
    title: 'THE LORD OF THE RINGS: THE WAR OF THE ROHIRRIM (2024)',
    synopsis: "Anime Lord of the Rings! Cerita raja Rohan helm Hammerhand. Epik fantasi dalam format baru.",
    posterUrl: 'https://images.unsplash.com/photo-1620953606776-92c2df9e585f?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1KiO2U9r6SqVuIEC8UI1Fh_R-ClWEIqXi/view?usp=drivesdk',
    year: '2024',
    rating: '7.8'
  },
  {
    id: '133',
    title: 'SAW XI (2025)',
    synopsis: "Jigsaw balik lagi mau main game. Sadis, penuh darah, dan jebakan-jebakan pinter. Khusus yang kuat mental.",
    posterUrl: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1Gv1Z4IAQFHBCTqLND1y9DclXt6QBFa10/view?usp=drivesdk',
    year: '2025',
    rating: '6.5'
  },
  {
    id: '134',
    title: 'FIVE NIGHTS AT FREDDY\'S 2 (2025)',
    synopsis: "Robot animatronik berhantu balik lagi. Lebih banyak jumpscare, lebih banyak lore. Fans game wajib nonton.",
    posterUrl: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1UpXcK6XJu2BJHIdKZIv-C7xO8l1nuzvq/view?usp=drivesdk',
    year: '2025',
    rating: '6.8'
  },
  {
    id: '135',
    title: 'M3GAN 2.0 (2025)',
    synopsis: "Boneka AI pembunuh dapet upgrade. Lebih pinter, lebih sadis, dan mungkin bawa temen. Tech horror kekinian.",
    posterUrl: 'https://images.unsplash.com/photo-1544257630-3cb836528753?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1LfvUrhLUs4nJprVo2jAKB4CHJi_-JgUF/view?usp=drivesdk',
    year: '2025',
    rating: '7.0'
  },
  {
    id: '136',
    title: 'THE BLACK PHONE 2 (2025)',
    synopsis: "Sekuel horor penculikan hantu. Ethan Hawke nyeremin banget topengnya. Atmosfer 70-an yang kental.",
    posterUrl: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80&w=800',
    driveUrl: 'https://drive.google.com/file/d/1cvOGShNNZpYcUK-C57ERL1Ut13tv5m_0/view?usp=drivesdk',
    year: '2025',
    rating: '7.2'
  }
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Cast ReactPlayer to any to avoid type errors with 'url' prop
  const Player = ReactPlayer as any;

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsPlayerReady(false);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsPlayerReady(false);
  };

  return (
    <div className="w-full max-w-7xl px-4 py-8 md:px-8">
      
      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 text-center relative"
      >
        <h1 className="text-5xl md:text-7xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 tracking-tighter drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
          BIOSKOP<span className="text-pink-500">21</span>
        </h1>
        <p className="mt-2 text-cyan-200 font-share-tech text-lg tracking-widest animate-pulse">
          SYSTEM: ONLINE // {movieData.length} STREAMING GRATIS TANPA BATAS
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4 rounded-full shadow-[0_0_10px_#00f3ff]" />
      </motion.div>

      {/* --- MOVIE GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {movieData.map((movie, index) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            index={index} 
            onClick={handleMovieClick} 
          />
        ))}
      </div>

      {/* --- FOOTER --- */}
      <footer className="mt-20 text-center text-gray-600 font-share-tech text-sm pb-8">
        <p>BIOSKOP21 PROJECT © 2024. ALL SYSTEMS OPTIMAL.</p>
        <p className="text-xs mt-2">Server by SafelinkU Nodes.</p>
      </footer>

      {/* --- STREAMING MODAL --- */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
          >
            <div className="w-full max-w-4xl bg-[#111] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.2)] flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black">
                <h2 className="text-xl font-bold font-orbitron text-white truncate pr-4">
                  NOW PLAYING: <span className="text-cyan-400">{selectedMovie.title}</span>
                </h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-pink-500 transition-colors font-mono text-xl"
                >
                  [CLOSE]
                </button>
              </div>

              {/* Player Container */}
              <div className="relative w-full aspect-video bg-black group">
                {!isPlayerReady && (
                   <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-share-tech animate-pulse z-10 bg-black">
                     Loading Stream... Sabar Bre...
                   </div>
                )}
                
                <Player
                  url={selectedMovie.driveUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                  onReady={() => setIsPlayerReady(true)}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload' 
                      }
                    }
                  }}
                />
              </div>

              {/* Modal Footer / Info */}
              <div className="p-6 bg-[#0a0a0a]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-gray-300 font-share-tech text-sm leading-relaxed">
                      {selectedMovie.synopsis}
                    </p>
                  </div>
                  {/* Safelink Helper Button */}
                  <a 
                    href={selectedMovie.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold font-orbitron text-sm rounded border border-pink-400 shadow-[0_0_10px_#ec4899] transition-all"
                  >
                    LINK RUSAK? KLIK SINI
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}