'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ClimateChangeSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-gradient-to-br from-emerald-50/30 via-white to-green-50/20">
      {/* Epic Animated Forest - Layered Pine Trees Growing from Ground */}
      <div className="pointer-events-none absolute inset-0 opacity-30 sm:opacity-35 md:opacity-30">
        <svg className="absolute inset-0 h-full w-full origin-bottom scale-[2.5] sm:scale-150 md:scale-100" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Reference Image Inspired Color Palette */}
            <linearGradient id="pineLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7CB342" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#689F38" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="pineMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#558B2F" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#4A7C2F" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="pineDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#33691E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#2E5C19" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="treeBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6B9E3E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#558B2F" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="pineTrunk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A98262" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#6D4C41" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          {/* ==== BACK ROW - Distant Small Trees ==== */}
          
          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.4 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }} style={{ transformOrigin: "60px 600px" }}>
            <rect x="57" y="570" width="6" height="30" fill="url(#pineTrunk)" />
            <polygon points="60,540 48,568 72,568" fill="url(#pineLight)" />
            <polygon points="60,555 52,574 68,574" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.38 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }} style={{ transformOrigin: "180px 600px" }}>
            <rect x="178" y="578" width="4" height="22" fill="url(#pineTrunk)" />
            <polygon points="180,555 170,578 190,578" fill="url(#treeBody)" />
            <polygon points="180,566 174,582 186,582" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.42 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 }} style={{ transformOrigin: "320px 600px" }}>
            <rect x="316" y="572" width="8" height="28" fill="url(#pineTrunk)" />
            <polygon points="320,530 304,570 336,570" fill="url(#pineLight)" />
            <polygon points="320,548 310,576 330,576" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.36 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1], delay: 0.8 }} style={{ transformOrigin: "460px 600px" }}>
            <rect x="458" y="577" width="4" height="23" fill="url(#pineTrunk)" />
            <polygon points="460,550 448,578 472,578" fill="url(#treeBody)" />
            <polygon points="460,563 453,581 467,581" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.4 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1], delay: 1.1 }} style={{ transformOrigin: "600px 600px" }}>
            <rect x="596" y="571" width="8" height="29" fill="url(#pineTrunk)" />
            <polygon points="600,538 586,572 614,572" fill="url(#pineLight)" />
            <polygon points="600,553 590,575 610,575" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.39 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 1.4 }} style={{ transformOrigin: "740px 600px" }}>
            <rect x="738" y="575" width="4" height="25" fill="url(#pineTrunk)" />
            <polygon points="740,545 729,576 751,576" fill="url(#treeBody)" />
            <polygon points="740,559 733,579 747,579" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.41 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 1.7 }} style={{ transformOrigin: "880px 600px" }}>
            <rect x="876" y="573" width="8" height="27" fill="url(#pineTrunk)" />
            <polygon points="880,535 864,573 896,573" fill="url(#pineLight)" />
            <polygon points="880,550 870,577 890,577" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.37 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1], delay: 2 }} style={{ transformOrigin: "1020px 600px" }}>
            <rect x="1018" y="578" width="4" height="22" fill="url(#pineTrunk)" />
            <polygon points="1020,555 1009,579 1031,579" fill="url(#treeBody)" />
            <polygon points="1020,567 1013,582 1027,582" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.43 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1], delay: 2.3 }} style={{ transformOrigin: "1160px 600px" }}>
            <rect x="1156" y="574" width="8" height="26" fill="url(#pineTrunk)" />
            <polygon points="1160,540 1145,574 1175,574" fill="url(#pineLight)" />
            <polygon points="1160,554 1150,578 1170,578" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.38 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 2.6 }} style={{ transformOrigin: "1300px 600px" }}>
            <rect x="1298" y="577" width="4" height="23" fill="url(#pineTrunk)" />
            <polygon points="1300,550 1288,578 1312,578" fill="url(#treeBody)" />
            <polygon points="1300,563 1293,581 1307,581" fill="url(#pineMid)" />
          </motion.g>

          {/* ==== MIDDLE ROW - Medium Trees ==== */}
          
          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.55 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }} style={{ transformOrigin: "120px 600px" }}>
            <rect x="116" y="551" width="8" height="49" fill="url(#pineTrunk)" />
            <polygon points="120,475 95,525 145,525" fill="url(#pineLight)" />
            <polygon points="115,485 107,500 123,500" fill="url(#pineDark)" opacity="0.3" />
            <polygon points="120,500 103,540 137,540" fill="url(#treeBody)" />
            <polygon points="120,525 108,555 132,555" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.58 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1], delay: 0.6 }} style={{ transformOrigin: "260px 600px" }}>
            <rect x="256" y="546" width="8" height="54" fill="url(#pineTrunk)" />
            <polygon points="260,460 232,515 288,515" fill="url(#pineLight)" />
            <polygon points="254,472 245,490 263,490" fill="url(#pineDark)" opacity="0.35" />
            <polygon points="260,490 238,530 282,530" fill="url(#treeBody)" />
            <polygon points="260,515 244,550 276,550" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.52 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.95, ease: [0.34, 1.56, 0.64, 1], delay: 1 }} style={{ transformOrigin: "400px 600px" }}>
            <rect x="396" y="551" width="8" height="49" fill="url(#pineTrunk)" />
            <polygon points="400,490 377,535 423,535" fill="url(#treeBody)" />
            <polygon points="395,502 387,518 403,518" fill="url(#pineDark)" opacity="0.28" />
            <polygon points="400,520 383,555 417,555" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.6 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.15, ease: [0.34, 1.56, 0.64, 1], delay: 1.4 }} style={{ transformOrigin: "540px 600px" }}>
            <rect x="536" y="546" width="8" height="54" fill="url(#pineTrunk)" />
            <polygon points="540,445 510,505 570,505" fill="url(#pineLight)" />
            <polygon points="533,460 524,478 542,478" fill="url(#pineDark)" opacity="0.32" />
            <polygon points="540,480 515,525 565,525" fill="url(#treeBody)" />
            <polygon points="540,510 522,550 558,550" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.56 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.05, ease: [0.34, 1.56, 0.64, 1], delay: 1.8 }} style={{ transformOrigin: "680px 600px" }}>
            <rect x="676" y="546" width="8" height="54" fill="url(#pineTrunk)" />
            <polygon points="680,480 654,530 706,530" fill="url(#pineLight)" />
            <polygon points="674,492 665,510 683,510" fill="url(#pineDark)" opacity="0.3" />
            <polygon points="680,510 660,550 700,550" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.54 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.98, ease: [0.34, 1.56, 0.64, 1], delay: 2.2 }} style={{ transformOrigin: "820px 600px" }}>
            <rect x="816" y="551" width="8" height="49" fill="url(#pineTrunk)" />
            <polygon points="820,485 796,532 844,532" fill="url(#treeBody)" />
            <polygon points="815,498 807,515 823,515" fill="url(#pineDark)" opacity="0.29" />
            <polygon points="820,518 802,555 838,555" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.59 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.12, ease: [0.34, 1.56, 0.64, 1], delay: 2.6 }} style={{ transformOrigin: "960px 600px" }}>
            <rect x="956" y="548" width="8" height="52" fill="url(#pineTrunk)" />
            <polygon points="960,455 928,510 992,510" fill="url(#pineLight)" />
            <polygon points="953,468 944,486 962,486" fill="url(#pineDark)" opacity="0.33" />
            <polygon points="960,485 933,530 987,530" fill="url(#treeBody)" />
            <polygon points="960,515 940,552 980,552" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.53 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.96, ease: [0.34, 1.56, 0.64, 1], delay: 3 }} style={{ transformOrigin: "1100px 600px" }}>
            <rect x="1096" y="553" width="8" height="47" fill="url(#pineTrunk)" />
            <polygon points="1100,495 1078,538 1122,538" fill="url(#treeBody)" />
            <polygon points="1095,507 1087,523 1103,523" fill="url(#pineDark)" opacity="0.27" />
            <polygon points="1100,525 1084,557 1116,557" fill="url(#pineMid)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.57 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.08, ease: [0.34, 1.56, 0.64, 1], delay: 3.4 }} style={{ transformOrigin: "1240px 600px" }}>
            <rect x="1236" y="556" width="8" height="44" fill="url(#pineTrunk)" />
            <polygon points="1240,470 1212,520 1268,520" fill="url(#pineLight)" />
            <polygon points="1234,483 1225,500 1243,500" fill="url(#pineDark)" opacity="0.31" />
            <polygon points="1240,500 1218,545 1262,545" fill="url(#treeBody)" />
            <polygon points="1240,530 1224,560 1256,560" fill="url(#pineMid)" />
          </motion.g>

          {/* ==== FRONT ROW - Large Hero Pines ==== */}
          
          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.72 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.3, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }} style={{ transformOrigin: "190px 600px" }}>
            <rect x="184" y="536" width="12" height="64" fill="url(#pineTrunk)" />
            <polygon points="190,395 155,470 225,470" fill="url(#pineLight)" />
            <polygon points="182,410 172,432 192,432" fill="url(#pineDark)" opacity="0.4" />
            <polygon points="190,430 162,490 218,490" fill="url(#treeBody)" />
            <polygon points="185,445 176,462 194,462" fill="url(#pineDark)" opacity="0.35" />
            <polygon points="190,465 168,515 212,515" fill="url(#pineMid)" />
            <polygon points="190,500 176,540 204,540" fill="url(#pineDark)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.78 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.7 }} style={{ transformOrigin: "350px 600px" }}>
            <rect x="344" y="526" width="12" height="74" fill="url(#pineTrunk)" />
            <polygon points="350,360 310,450 390,450" fill="url(#pineLight)" />
            <polygon points="340,378 328,402 352,402" fill="url(#pineDark)" opacity="0.42" />
            <polygon points="350,400 318,475 382,475" fill="url(#treeBody)" />
            <polygon points="344,418 334,438 354,438" fill="url(#pineDark)" opacity="0.38" />
            <polygon points="350,440 324,505 376,505" fill="url(#pineMid)" />
            <polygon points="348,460 338,480 358,480" fill="url(#pineDark)" opacity="0.33" />
            <polygon points="350,485 332,530 368,530" fill="url(#pineDark)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.7 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.25, ease: [0.34, 1.56, 0.64, 1], delay: 1.2 }} style={{ transformOrigin: "510px 600px" }}>
            <rect x="504" y="541" width="12" height="59" fill="url(#pineTrunk)" />
            <polygon points="510,415 472,495 548,495" fill="url(#treeBody)" />
            <polygon points="502,432 490,455 514,455" fill="url(#pineDark)" opacity="0.36" />
            <polygon points="510,455 478,520 542,520" fill="url(#pineMid)" />
            <polygon points="507,475 497,492 517,492" fill="url(#pineDark)" opacity="0.32" />
            <polygon points="510,495 486,545 534,545" fill="url(#pineDark)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.8 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.6, ease: [0.34, 1.56, 0.64, 1], delay: 1.7 }} style={{ transformOrigin: "670px 600px" }}>
            <rect x="663" y="521" width="14" height="79" fill="url(#pineTrunk)" />
            <polygon points="670,330 622,430 718,430" fill="url(#pineLight)" />
            <polygon points="660,350 646,376 674,376" fill="url(#pineDark)" opacity="0.44" />
            <polygon points="670,375 630,460 710,460" fill="url(#treeBody)" />
            <polygon points="662,395 650,418 674,418" fill="url(#pineDark)" opacity="0.4" />
            <polygon points="670,420 638,495 702,495" fill="url(#pineMid)" />
            <polygon points="666,442 654,465 678,465" fill="url(#pineDark)" opacity="0.36" />
            <polygon points="670,470 648,525 692,525" fill="url(#pineDark)" />
            <polygon points="668,495 658,512 678,512" fill="url(#pineDark)" opacity="0.3" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.74 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.35, ease: [0.34, 1.56, 0.64, 1], delay: 2.2 }} style={{ transformOrigin: "830px 600px" }}>
            <rect x="824" y="541" width="12" height="59" fill="url(#pineTrunk)" />
            <polygon points="830,385 788,475 872,475" fill="url(#pineLight)" />
            <polygon points="822,405 810,428 834,428" fill="url(#pineDark)" opacity="0.39" />
            <polygon points="830,425 795,500 865,500" fill="url(#treeBody)" />
            <polygon points="826,445 816,462 836,462" fill="url(#pineDark)" opacity="0.34" />
            <polygon points="830,465 802,530 858,530" fill="url(#pineMid)" />
            <polygon points="830,495 812,545 848,545" fill="url(#pineDark)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.76 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.45, ease: [0.34, 1.56, 0.64, 1], delay: 2.7 }} style={{ transformOrigin: "990px 600px" }}>
            <rect x="984" y="541" width="12" height="59" fill="url(#pineTrunk)" />
            <polygon points="990,370 945,460 1035,460" fill="url(#pineLight)" />
            <polygon points="980,390 966,415 994,415" fill="url(#pineDark)" opacity="0.41" />
            <polygon points="990,415 953,490 1027,490" fill="url(#treeBody)" />
            <polygon points="984,435 972,455 996,455" fill="url(#pineDark)" opacity="0.37" />
            <polygon points="990,455 960,520 1020,520" fill="url(#pineMid)" />
            <polygon points="988,477 978,495 998,495" fill="url(#pineDark)" opacity="0.33" />
            <polygon points="990,500 970,545 1010,545" fill="url(#pineDark)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.71 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.28, ease: [0.34, 1.56, 0.64, 1], delay: 3.2 }} style={{ transformOrigin: "1150px 600px" }}>
            <rect x="1144" y="541" width="12" height="59" fill="url(#pineTrunk)" />
            <polygon points="1150,410 1110,490 1190,490" fill="url(#treeBody)" />
            <polygon points="1142,428 1130,450 1154,450" fill="url(#pineDark)" opacity="0.37" />
            <polygon points="1150,450 1116,520 1184,520" fill="url(#pineMid)" />
            <polygon points="1147,470 1137,488 1157,488" fill="url(#pineDark)" opacity="0.32" />
            <polygon points="1150,490 1124,545 1176,545" fill="url(#pineDark)" />
          </motion.g>

          <motion.g initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 0.75 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1], delay: 3.7 }} style={{ transformOrigin: "1310px 600px" }}>
            <rect x="1304" y="541" width="12" height="59" fill="url(#pineTrunk)" />
            <polygon points="1310,390 1268,475 1352,475" fill="url(#pineLight)" />
            <polygon points="1302,410 1290,432 1314,432" fill="url(#pineDark)" opacity="0.4" />
            <polygon points="1310,430 1276,505 1344,505" fill="url(#treeBody)" />
            <polygon points="1306,450 1296,468 1316,468" fill="url(#pineDark)" opacity="0.35" />
            <polygon points="1310,470 1284,530 1336,530" fill="url(#pineMid)" />
            <polygon points="1310,500 1292,545 1328,545" fill="url(#pineDark)" />
          </motion.g>
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-6"
            >
              Carbono Negativo na prática
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 font-light leading-relaxed"
            >
              A Gabardo teve, em setembro de 2025, o reconhecimento oficial do feito histórico no setor logístico: tornou-se a primeira transportadora no mundo certificada como carbono negativa, em auditoria que consolidou o inventário de emissões de 2024. O marco coroa uma jornada iniciada em 2017, quando a companhia passou a medir sistematicamente os gases de efeito estufa para direcionar investimentos em eficiência, mitigação e regeneração ambiental.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 text-lg text-gray-600 font-light leading-relaxed"
            >
              No inventário 2024, a Gabardo registrou saldo negativo de -23.890,90 tCO₂e — volume compensado equivalente ao sequestro anual de aproximadamente 1,1 milhão de árvores adultas (estimativa de 21 kg de CO₂ absorvidos por árvore/ano, DOE/EPA) e suficiente para neutralizar as emissões anuais de cerca de 17,8 mil automóveis leves. Com 81.775,48 tCO₂e disponíveis no Programa Carbono Negativo Gabardo, a empresa mantém monitoramento contínuo, projetos de captura que vão além da neutralização e uma governança ambiental validada pela Worton ESG.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex flex-col items-center"
          >
            <div className="relative w-full max-w-xl">
              <Image
                src="/images/Design sem nome (51).png"
                alt="Certificação de carbono negativo da Gabardo"
                width={720}
                height={480}
                className="w-full h-auto"
                priority
              />
              <a
                href="/certifications/certificado-carbono-negativo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-8 left-1/2 -translate-x-[65%] text-sm font-semibold text-gabardo-light-blue transition hover:text-gabardo-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/60 focus:ring-offset-1 focus:ring-offset-white md:bottom-12 md:left-[42%] md:-translate-x-1/2"
              >
                Baixar Certificado
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
