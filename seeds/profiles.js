const mongoose = require("mongoose");
const { Schema } = mongoose;

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

module.exports = [
  {
    origin: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    image: {
      url: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657226082/thesis/photo-1580051706353-f037886dedac_th0lpq.jpg",
      filename: "photo-1580051706353-f037886dedac_th0lpq.jpg",
    },
    bio: "Αν και στα 5 μου ξεκίνησα να αθλούμαι με το Tae Kwon Do, θυμάμαι στον ελεύθερό μου χρόνο να ασχολούμαι με μια μπάλα μπάσκετ! Κοιμόμουν με τη μπάλα, είχα μπασκετούλα κρεμασμένη στην πόρτα του δωματίου μου...Η αγάπη μου για το μπάσκετ ήταν ολοφάνερη και έτσι το 1999 αποφάσισα να ξεκινήσω στον Ηρακλή! Δεν θα ξεχάσω νομίζω ποτέ το συναίσθημα που μου προκάλεσε τότε, αλλα ακόμα και τώρα, η μπάλα όταν μπαίνει στο καλάθι και ακούγεται ο ήχος από το διχτάκι..", //https://www.agapotobasket.gr/interviews/item/8309-to-baslet-se-mathainei-na-sevesai
    assignments: [
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657226096/thesis/photo-1635209985571-70128050869e_rgfagk.jpg",
        filename: "photo-1635209985571-70128050869e_rgfagk.jpg",
        filetype: "png",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657226197/FIBAOfficialBasketballRules2020_YellowTracking_v1.0_sg50hh.pdf",
        filename:
          "FIBAOfficialBasketballRules2020_YellowTracking_v1.0_sg50hh.pdf",
        filetype: "pdf",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
    ],
    skills: [
      {
        skillName: "Rebounding",
        rating: 85,
      },
      {
        skillName: "Dribbling",
        rating: 70,
      },
      {
        skillName: "Shooting",
        rating: 50,
      },
      {
        skillName: "Passing",
        rating: 30,
      },
    ],
  },
  {
    origin: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    image: {
      url: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657225569/thesis/photo-1602674809970-89073c530b0a_vy7zjw.jpg",
      filename: "photo-1602674809970-89073c530b0a_vy7zjw.jpg",
    },
    bio: "Όταν ήμουν πιτσιρικάς, υποστήριζα την Μαρσέιγ και ο παίκτης που θαύμαζα ήταν ο Ζαν Πιέρ Παπέν. Υπήρχαν κι άλλοι σημαντικοί παίκτες όπως ο Ντεσάν, ο Μπολί και ο Ντεσαγί, αλλά εγώ ξεχώριζα τον Παπέν. Ήταν ο καλύτερος παίκτης, ο καλύτερος επιθετικός εκείνη την εποχή και ακόμα και σήμερα τον θεωρώ ως έναν από τους κορυφαίους όλων των εποχών. Πάντα είχα το δικό μου στυλ παιχνιδιού και δεν μπορώ να πω ότι τον έχω αντιγράψει, αλλά είναι αλήθεια ότι έχω δει πολλές κασέτες με τον Zαν Πιέρ, το πως έπαιζε και το πως σκόραρε. Μελέτησα τον τρόπο που εκινείτο στον αγωνιστικό χώρο, τις θέσεις που έπαιρνε. Το ότι τον παρακολουθούσα μου βοήθησε και εμένα ως επιθετικό", //https://www.contra.gr/podosfairo/sise-xekinisa-na-paizo-podosfairo-giati-ithela-na-petychaino-gkol.6848302.html
    assignments: [
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657225645/thesis/photo-1543326727-cf6c39e8f84c_zsrds6.jpg",
        filename: "photo-1543326727-cf6c39e8f84c_zsrds6.jpg",
        filetype: "png",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657225739/football_tutorial_j9kvo0.pdf",
        filename: "football_tutorial_j9kvo0.pdf",
        filetype: "pdf",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
    ],
    skills: [
      {
        skillName: "Passing",
        rating: 85,
      },
      {
        skillName: "Dribbling",
        rating: 70,
      },
      {
        skillName: "Shooting",
        rating: 50,
      },
      {
        skillName: "Heading",
        rating: 30,
      },
    ],
  },
  {
    origin: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    image: {
      url: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657228448/thesis/photo-1559781564-37cc9be29eb2_ssl7bl.jpg",
      filename: "photo-1559781564-37cc9be29eb2_ssl7bl.jpg",
    },
    bio: "Μεγαλώνοντας η αντίληψη σου για το σώμα σου, την κίνηση σου, τη φωνή σου, την προσωπικότητα σου αλλάζουν εντελώς. Οι παιδικές σου παρορμήσεις μπλοκάρονται και  τη θέση τους παίρνουν οι αναμνήσεις. Το σώμα σου θα υπακούσει στις κοινωνικές επιταγές της ενηλικίωσης και κάπου εκεί η σύνδεση σου με το εσωτερικό σου τοπίο θα φιμωθεί. Το σώμα σου θα πράττει όλο και λιγότερες κινήσεις, οι περισσότερες εξ’αυτών θα είναι μηχανικές. Το ίδιο θα συμβεί και με τη μάσκα του προσώπου σου η οποία στερείται μεγάλο αριθμό εκφράσεων και εναλλαγών.Δεν αισθάνεσαι φυσικά ότι στερείσαι κάτι. Μέχρι…..να ασχοληθείς με τον εαυτό σου με τρόπο που μόνο το θέατρο μπορεί να σε οδηγήσει.", //https://vassiliouvassia.gr/theatro/giati-na-mathw-na-paizw-theatro/
    assignments: [
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657228464/thesis/photo-1559781564-b5a5ba6a495f_qcdknj.jpg",
        filename: "photo-1559781564-b5a5ba6a495f_qcdknj.jpg",
        filetype: "png",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657226521/Theatre-Introduction-and-CPRC_bhbwak.pdf",
        filename: "Theatre-Introduction-and-CPRC_bhbwak.pdf",
        filetype: "pdf",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
    ],
    skills: [
      {
        skillName: "Oral communication skills",
        rating: 85,
      },
      {
        skillName: "Body language",
        rating: 70,
      },
      {
        skillName: "Co-ordination",
        rating: 50,
      },
      {
        skillName: "spatial awareness",
        rating: 30,
      },
    ],
  },
  {
    origin: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    image: {
      url: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657229069/thesis/photo-1542303664-4e34a25408be_juzspw.jpg",
      filename: "photo-1542303664-4e34a25408be_juzspw.jpg",
    },
    bio: "Ο βασικός λόγος για να ασχοληθεί κάποιος με τον κινηματογράφο, θεωρώ πως είναι γιατί θέλει να πει μια ιστορία ή να συμμετέχει στη δημιουργία της. Από τότε που υπάρχει ο άνθρωπος, κάθεται γύρω από την φωτιά και λέει ιστορίες. Πόσο μάλλον στην σημερινή εποχή, που παντού γύρω «τρέχουν» πληροφορίες, ειδήσεις, βίντεο και εικόνες. Κάτι από όλα σου κάνει εντύπωση ή σου γεννά μια ιδέα, την οποία θέλεις να μοιραστείς.", //https://www.koutipandoras.gr/article/enas-teleiofoitos-foititis-kinimatografoy-perigrafei-tis-synthikes-kataskeyis-tis-protis
    assignments: [
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657229086/thesis/photo-1518930259200-3e5b29f42096_dl5wdr.jpg",
        filename: "photo-1518930259200-3e5b29f42096_dl5wdr.jpg",
        filetype: "png",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657228892/2017Participations_zmhpo3.pdf",
        filename: "2017Participations_zmhpo3.pdf",
        filetype: "pdf",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
    ],
    skills: [
      {
        skillName: "Acting",
        rating: 85,
      },
      {
        skillName: "Body language",
        rating: 70,
      },
      {
        skillName: "Stunts",
        rating: 50,
      },
      {
        skillName: "Ability to remember lines",
        rating: 30,
      },
    ],
  },
  {
    origin: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    image: {
      url: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657229252/thesis/photo-1527186504227-0a47da29a0d0_st0oa4.jpg",
      filename: "photo-1527186504227-0a47da29a0d0_st0oa4.jpg",
    },
    bio: "Κανένας δεν επινόησε το χορό. Είναι βαθιά ενσωματωμένος στην καρδιά κάθε κουλτούρας, σε όλη τη διάρκεια της ιστορίας. Είναι κομμάτι του παλμού της ανθρωπότητας. Αγκαλιάζει πολλά διαφορετικά είδη, στυλ και παραδόσεις και εξελίσσεται διαρκώς. Ο ρόλος του ποικίλλει από τον ψυχαγωγικό μέχρι το θρησκευτικό, καλύπτοντας κάθε μορφή κοινωνικού σκοπού.", //https://toniko.gr/giati-o-choros-einai-eksisou-simantikos-me-ta-mathimatika-stin-ekpaidefsi/
    assignments: [
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657229267/thesis/photo-1548123378-bde4eca81d2d_cxnpsb.jpg",
        filename: "photo-1548123378-bde4eca81d2d_cxnpsb.jpg",
        filetype: "png",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/image/upload/v1657229505/Dance-Introduction_wxsjec.pdf",
        filename: "Dance-Introduction_wxsjec.pdf",
        filetype: "pdf",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
    ],
    skills: [
      {
        skillName: "Physical fitness",
        rating: 85,
      },
      {
        skillName: "Leg Swings",
        rating: 70,
      },
      {
        skillName: "Tendu",
        rating: 50,
      },
      {
        skillName: "Curl Down and Up",
        rating: 30,
      },
    ],
  },
];
