const express = require("express");
const router = express.Router();
const {
  Interest,
  JobSeekerForm,
  RecruiterForm,
  UserJobSeeker,
  UserRecruiter,
} = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

const axios = require("axios");


const commonWords = [
  "a",
  "au sujet de",
  "ci-dessus",
  "après",
  "encore",
  "contre",
  "n'est pas",
  "tout",
  "suis",
  "un",
  "et",
  "toute",
  "sont",
  "ne sont pas",
  "comme",
  "à",
  "être",
  "parce que",
  "été",
  "avant",
  "être",
  "ci-dessous",
  "entre",
  "les deux",
  "mais",
  "par",
  "ne peut pas",
  "ne peut pas",
  "pourrait",
  "ne pourrait pas",
  "fait",
  "n'a pas",
  "faire",
  "fait",
  "ne le fait pas",
  "faire",
  "ne pas",
  "en bas",
  "pendant",
  "chaque",
  "peu",
  "pour",
  "de",
  "plus loin",
  "avait",
  "n'avait pas",
  "a",
  "n'a pas",
  "avoir",
  "n'ont pas",
  "avoir",
  "il",
  "il aurait",
  "il va",
  "il est",
  "son",
  "ici",
  "voici",
  "la sienne",
  "elle-même",
  "lui",
  "lui-même",
  "son",
  "comment",
  "comment va-t-on",
  "je",
  "j'aurais",
  "je vais",
  "je suis",
  "j'ai",
  "si",
  "dans",
  "dans",
  "est",
  "n'est pas",
  "il",
  "c'est",
  "son",
  "lui-même",
  "juste",
  "madame",
  "moi",
  "plus",
  "plus",
  "ne doit pas",
  "mon",
  "moi-même",
  "non",
  "ni",
  "pas",
  "heure",
  "de",
  "hors",
  "sur",
  "une fois",
  "seulement",
  "ou",
  "autre",
  "devrait",
  "notre",
  "le nôtre",
  "nous-mêmes",
  "dehors",
  "au-dessus",
  "propre",
  "re",
  "s",
  "ne doit pas",
  "elle",
  "elle aurait",
  "elle va",
  "elle est",
  "devrait",
  "ne devrait pas",
  "ainsi",
  "certains",
  "tel",
  "que",
  "ce",
  "ce",
  "leur",
  "le leur",
  "eux",
  "eux-mêmes",
  "alors",
  "là",
  "il y a",
  "ces",
  "ils",
  "ils auraient",
  "ils vont",
  "ils sont",
  "ils ont",
  "ceci",
  "ceux-là",
  "par",
  "à",
  "trop",
  "sous",
  "jusqu'à",
  "en haut",
  "très",
  "était",
  "n'était pas",
  "nous",
  "nous aurions",
  "nous allons",
  "nous sommes",
  "nous avons",
  "étaient",
  "n'étaient pas",
  "quoi",
  "qu'est-ce que c'est",
  "quand",
  "quand est-ce",
  "où",
  "où est",
  "lequel",
  "pendant que",
  "qui",
  "qui est",
  "à qui",
  "pourquoi",
  "pourquoi est-ce",
  "avec",
  "ne va pas",
  "ferait",
  "ne ferait pas",
  "vous",
  "vous auriez",
  "vous allez",
  "vous êtes",
  "vous avez",
  "votre",
  "vôtre",
  "vous-même",
  "vous-mêmes",
  "capable",
  "abst",
  "conformément",
  "selon",
  "en conséquence",
  "à travers",
  "agir",
  "en fait",
  "ajouté",
  "adj",
  "affecté",
  "affectant",
  "affecte",
  "ensuite",
  "ah",
  "presque",
  "seul",
  "le long",
  "déjà",
  "aussi",
  "bien que",
  "toujours",
  "parmi",
  "parmi",
  "annoncer",
  "un autre",
  "n'importe qui",
  "de toute façon",
  "plus",
  "quelqu'un",
  "quelque chose",
  "de toute façon",
  "en tout cas",
  "partout",
  "apparemment",
  "approximativement",
  "ne sont pas",
  "survenir",
  "autour",
  "à part",
  "demander",
  "demander",
  "auth",
  "disponible",
  "loin",
  "terriblement",
  "b",
  "arrière",
  "est devenu",
  "devenir",
  "devient",
  "devenir",
  "auparavant",
  "commencer",
  "début",
  "commencements",
  "commence",
  "derrière",
  "croire",
  "à côté",
  "en outre",
  "au-delà",
  "biol",
  "bref",
  "brièvement",
  "c",
  "ca",
  "est venu",
  "ne peut pas",
  "ne peux pas",
  "cause",
  "causes",
  "certain",
  "certainement",
  "co",
  "com",
  "venir",
  "vient",
  "contenir",
  "contenant",
  "contient",
  "ne pouvait pas",
  "date",
  "différent",
  "fait",
  "vers le bas",
  "dû",
  "e",
  "ed",
  "edu",
  "effet",
  "par exemple",
  "huit",
  "quatre-vingts",
  "soit",
  "autre",
  "ailleurs",
  "fin",
  "fin",
  "assez",
  "surtout",
  "et",
  "etc",
  "même",
  "jamais",
  "chaque",
  "tout le monde",
  "chacun",
  "tout",
  "partout",
  "ex",
  "sauf",
  "f",
  "loin",
  "ff",
  "cinquième",
  "premier",
  "cinq",
  "fixe",
  "suivi",
  "suivant",
  "suit",
  "ancien",
  "autrefois",
  "en avant",
  "trouvé",
  "quatre",
  "en outre",
  "g",
  "a donné",
  "obtenir",
  "obtient",
  "obtenir",
  "donner",
  "donné",
  "donne",
  "donnant",
  "aller",
  "va",
  "parti",
  "obtenu",
  "obtenu",
  "h",
  "arrive",
  "à peine",
  "il aurait",
  "d'où",
  "par conséquent",
  "ci-après",
  "par la présente",
  "ici",
  "voici",
  "ci-dessus",
  "ici",
  "là-dessus",
  "il hésite",
  "salut",
  "caché",
  "ici",
  "maison",
  "toutefois",
  "cependant",
  "cent",
  "id",
  "c'est-à-dire",
  "im",
  "immédiat",
  "immédiatement",
  "importance",
  "important",
  "inc",
  "en effet",
  "index",
  "information",
  "au lieu de",
  "invention",
  "intérieur",
  "il l'a fait",
  "il va",
  "j",
  "k",
  "gardé",
  "kg",
  "km",
  "savoir",
  "connu",
  "sait",
  "l",
  "largement",
  "dernier",
  "récemment",
  "plus tard",
  "ce dernier",
  "dernièrement",
  "moins",
  "moins",
  "de peur que",
  "laisser",
  "laissez",
  "comme",
  "aimé",
  "probable",
  "ligne",
  "peu",
  "regarder",
  "regardant",
  "semble",
  "ltd",
  "fabriqué",
  "principalement",
  "faire",
  "fait",
  "beaucoup",
  "peut-être",
  "peut-être",
  "signifier",
  "signifie",
  "pendant ce temps",
  "pendant ce temps",
  "simplement",
  "mg",
  "pourrait",
  "million",
  "manquer",
  "ml",
  "en outre",
  "principalement",
  "m.",
  "mme",
  "beaucoup",
  "mug",
  "doit",
  "n",
  "na",
  "nom",
  "à savoir",
  "nay",
  "nd",
  "près",
  "presque",
  "nécessairement",
  "nécessaire",
  "besoin",
  "besoins",
  "ni",
  "jamais",
  "néanmoins",
  "nouveau",
  "prochain",
  "neuf",
  "quatre-vingt-dix",
  "personne",
  "non",
  "aucun",
  "néanmoins",
  "personne",
  "normalement",
  "nos",
  "noté",
  "rien",
  "nulle part",
  "obtenir",
  "obtenu",
  "de toute évidence",
  "souvent",
  "oh",
  "ok",
  "d'accord",
  "vieux",
  "omis",
  "un",
  "ceux-ci",
  "sur",
  "ord",
  "autres",
  "autrement",
  "extérieur",
  "global",
  "en raison de",
  "p",
  "page",
  "pages",
  "partie",
  "particulier",
  "particulièrement",
  "passé",
  "par",
  "peut-être",
  "placé",
  "s'il vous plaît",
  "plus",
  "mal",
  "possible",
  "peut-être",
  "potentiellement",
  "pp",
  "principalement",
  "présent",
  "précédemment",
  "principalement",
  "probablement",
  "promptement",
  "fier",
  "fournit",
  "mettre",
  "q",
  "que",
  "rapidement",
  "assez",
  "qv",
  "r",
  "couru",
  "plutôt",
  "rd",
  "facilement",
  "vraiment",
  "récent",
  "récemment",
  "réf",
  "références",
  "concernant",
  "peu importe",
  "salutations",
  "lié",
  "relativement",
  "recherche",
  "respectivement",
  "a abouti",
  "résultant",
  "résultats",
  "droit",
  "courir",
  "dit",
  "vu",
  "dire",
  "disant",
  "dit",
  "sec",
  "section",
  "voir",
  "voir",
  "sembler",
  "semblait",
  "semblant",
  "semble",
  "vu",
  "soi",
  "soi-même",
  "envoyé",
  "sept",
  "plusieurs",
  "doit",
  "abandonné",
  "elle",
  "montrer",
  "montré",
  "montrés",
  "montre",
  "significatif",
  "significativement",
  "similaire",
  "de même",
  "puisque",
  "six",
  "légèrement",
  "similaire",
  "de même",
  "puisque",
  "six",
  "légèrement",
  "quelqu'un",
  "d'une manière ou d'une autre",
  "quelqu'un",
  "quelque chose",
  "quelquefois",
  "parfois",
  "quelque peu",
  "quelque part",
  "bientôt",
  "désolé",
  "spécifiquement",
  "spécifié",
  "spécifier",
  "en spécifiant",
  "encore",
  "arrêter",
  "fortement",
  "sub",
  "substantiellement",
  "avec succès",
  "suffisamment",
  "suggérer",
  "sup",
  "sûr",
  "prendre",
  "pris",
  "prenant",
  "dire",
  "tend",
  "th",
  "merci",
  "merci",
  "thanx",
  "c'est",
  "qui a",
  "de là",
  "ensuite",
  "par la suite",
  "par là",
  "par conséquent",
  "dedans",
  "là-dedans",
  "il y aura",
  "il y a",
  "il y a",
  "vers cela",
  "ensuite",
  "sur cela",
  "sur cela",
  "sur cela",
  "par là",
  "par là-dessus",
  "il y a",
  "ils seraient",
  "ils sont",
  "penser",
  "toi",
  "bien que",
  "même si",
  "même",
  "mille",
  "à travers",
  "tout au long",
  "par",
  "donc",
  "jusqu'à",
  "conseil",
  "ensemble",
  "a pris",
  "vers",
  "vers",
  "essayé",
  "essaye",
  "vraiment",
  "essayer",
  "essayer",
  "essai",
  "essayer",
  "ts",
  "deux fois",
  "deux",
  "u",
  "in",
  "malheureusement",
  "à moins que",
  "contrairement",
  "improbable",
  "à",
  "sur",
  "ups",
  "nous",
  "utiliser",
  "utilisé",
  "utile",
  "utilement",
  "utilité",
  "utilisations",
  "en utilisant",
  "habituellement",
  "v",
  "valeur",
  "différentes",
  "ont",
  "via",
  "viz",
  "vol",
  "vols",
  "contre",
  "w",
  "vouloir",
  "veut",
  "n'était pas",
  "chemin",
  "nous",
  "accueil",
  "est allé",
  "n'étaient pas",
  "quoi que ce soit",
  "ce qui va",
  "quoi",
  "d'où",
  "quand",
  "après que",
  "tandis que",
  "par quoi",
  "où dans",
  "où",
  "où",
  "où",
  "où",
  "où que",
  "que ce soit",
  "quel",
  "qui va",
  "qui",
  "qui va",
  "qui que ce soit",
  "entier",
  "qui va",
  "qui que ce soit",
  "qui est",
  "dont",
  "largement",
  "disposé",
  "souhaiter",
  "dans",
  "sans",
  "n'a pas",
  "mots",
  "monde",
  "ne serait pas",
  "www",
  "x",
  "oui",
  "encore",
  "vous",
  "vous êtes",
  "z",
  "zéro",
];

function removePunctuation(word) {
  return word
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"“”‘’]/g, "")
    .replace(/"/g, "");
}

router.post("/", validateToken, async (req, res) => {
  const { OfferId } = req.body;
  const UserJobSeekerId = req.user.id;

  if (!OfferId) {
    return res.status(400).json({ error: "L'ID de l'offre est requis" });
  }

  const jobSeekerForm = await JobSeekerForm.findOne({
    where: { UserJobSeekerId },
  });

  if (!jobSeekerForm) {
    return res.status(400).json({
      error:
        "Vous devez créer un CV avant de manifester un intérêt pour une offre d'emploi",
    });
  }

  const existingInterest = await Interest.findOne({
    where: { OfferId, UserJobSeekerId },
  });

  if (!existingInterest) {
    await Interest.create({ OfferId, UserJobSeekerId });
    res.json({ liked: true });
  } else {
    await Interest.destroy({
      where: { OfferId, UserJobSeekerId },
    });
    res.json({ liked: false });
  }
});

router.get("/check/:offerId", validateToken, async (req, res) => {
  const { offerId } = req.params;
  const UserJobSeekerId = req.user.id;

  const existingInterest = await Interest.findOne({
    where: { OfferId: offerId, UserJobSeekerId },
  });

  res.json({ liked: !!existingInterest });
});

router.get("/", validateToken, async (req, res) => {
  const recruiterId = req.user.id;
  console.log("Recruiter ID:", recruiterId); // Log recruiterId for debugging

  try {
    const recruiterForms = await RecruiterForm.findAll({
      where: { UserRecruiterId: recruiterId },
    });
    const offerIds = recruiterForms.map((form) => form.id);

    console.log("Offer IDs:", offerIds); // Log offerIds for debugging

    const interests = await Interest.findAll({
      where: { OfferId: offerIds },
      include: [
        {
          model: JobSeekerForm,
          include: [{ model: UserJobSeeker }],
        },
      ],
    });

    const jobSeekers = interests.map((interest) => interest.JobSeekerForm);
    console.log("Job Seekers:", jobSeekers);
    res.json(jobSeekers);
  } catch (error) {
    console.error("Error fetching job seekers:", error);
    res.status(500).json({ error: "Failed to fetch interested job seekers" });
  }
});

router.get("/:OfferId", validateToken, async (req, res) => {
  const recruiterId = req.user.id;
  const OfferId = req.params.OfferId;
  console.log("Recruiter ID:", recruiterId); // Log recruiterId for debugging

  try {
    const interests = await Interest.findAll({
      where: { OfferId: OfferId },
      include: [
        {
          model: JobSeekerForm,
          include: [{ model: UserJobSeeker }],
        },
      ],
    });

    const jobSeekers = interests.map((interest) => interest.JobSeekerForm);
    console.log("Job Seekers:", jobSeekers);
    res.json(jobSeekers);
  } catch (error) {
    console.error("Error fetching job seekers:", error);
    res.status(500).json({ error: "Failed to fetch interested job seekers" });
  }
});

// New route to get job seeker match percentages
router.get("/:OfferId/match", validateToken, async (req, res) => {
  const recruiterId = req.user.id;
  const OfferId = req.params.OfferId;

  try {
    const recruiterForm = await RecruiterForm.findByPk(OfferId);
    if (!recruiterForm) {
      return res.status(404).json({ error: "Offer not found" });
    }

    const interests = await Interest.findAll({
      where: { OfferId: OfferId },
      include: [
        {
          model: JobSeekerForm,
          include: [{ model: UserJobSeeker }],
        },
      ],
    });

    const jobSeekers = interests.map((interest) => interest.JobSeekerForm);

    const jobListingText = [
      recruiterForm.description,
      recruiterForm.experience,
      recruiterForm.formations,
      recruiterForm.skills,
      recruiterForm.keywords,
      recruiterForm.langues,
    ]
      .flat()
      .join(" ");

    const jobListingWords = jobListingText
      .split(/\s+/)
      .map((word) => removePunctuation(word));
    const jobKeywords = jobListingWords.filter(
      (word) => !commonWords.includes(word.toLowerCase())
    );

    const jobSeekersWithMatch = jobSeekers.map((jobSeeker) => {
      const resumeText = [
        jobSeeker.formations,
        jobSeeker.experiences,
        jobSeeker.projetsAcademiques,
        jobSeeker.langues,
        jobSeeker.langages,
        jobSeeker.logiciels,
      ]
        .flat()
        .join(" ");

      const resumeWords = resumeText
        .split(/\s+/)
        .map((word) => removePunctuation(word));
      const keywordFrequency = {};
      jobKeywords.forEach((word) => {
        const frequency = resumeWords.filter(
          (resumeWord) => resumeWord.toLowerCase() === word.toLowerCase()
        ).length;
        keywordFrequency[word] = frequency;
      });

      const totalKeywords = Object.keys(keywordFrequency).length;
      const matchedKeywords = Object.values(keywordFrequency).filter(
        (freq) => freq > 0
      ).length;
      const matchPercentage = (matchedKeywords / totalKeywords) * 100;

      return {
        ...jobSeeker.get(),
        matchPercentage,
      };
    });

    res.json(jobSeekersWithMatch);
  } catch (error) {
    console.error("Error fetching job seekers with match percentages:", error);
    res.status(500).json({ error: "Failed to fetch interested job seekers" });
  }
});

// recommendation route
// GET /recommendations/:offerId
router.get('/recommendations/:offerId', validateToken, async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const offerId = req.params.offerId;

    // 🔍 Check offer belongs to recruiter
    const offer = await RecruiterForm.findOne({
      where: { id: offerId, UserRecruiterId: recruiterId },
    });

    if (!offer) {
      return res.status(404).json({ error: "Offre introuvable ou non autorisée" });
    }

    // 📡 Send request to Python engine
    const response = await axios.post('http://localhost:5000/offer-analyze', {
      offer_id: offerId,
    });

    res.json({ sortedApplicants: response.data });

  } catch (error) {
    console.error('Erreur moteur recruteur :', error.response?.data || error.message, error.stack);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
});


module.exports = router;
