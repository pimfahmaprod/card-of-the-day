/**
 * Script to update French card interpretations
 * Run with: node scripts/update-french-interpretations.js
 */

const fs = require('fs');
const path = require('path');

// Complete French translations matching Thai originals
const frenchTranslations = {
    "THE FOOL": {
        quote: "Quelqu'un qui arrive sans prévenir, ne sachant pas ce qu'il veut vraiment",
        interpretation: "Quelqu'un qui n'est pas prêt pour une relation sérieuse. S'il est prêt à s'engager, il vient probablement de sortir d'une relation récemment. Il peut arriver à l'improviste, amusant mais incertain de ce qu'il veut vraiment. Il manque souvent d'objectifs clairs dans les relations et semble ne pas avoir de direction."
    },
    "THE MAGICIAN": {
        quote: "Une personne charmante et talentueuse, désirée par beaucoup",
        interpretation: "Une personne charmante et talentueuse, bien connue de tous. Elle peut travailler comme spécialiste ou professionnelle : médecin, avocat, ingénieur, designer ou expert dans divers domaines. Cette personne a probablement beaucoup d'admirateurs, d'excellentes compétences en communication et sait comment conquérir les gens."
    },
    "THE HIGH PRIESTESS": {
        quote: "Une personne mystérieuse qui cache peut-être des secrets",
        interpretation: "Un introverti qui travaille dans l'ombre, comme chercheur, programmeur, écrivain ou éditeur. Expert spécialisé mais difficile à approcher car il ne sort pas souvent.\n\nAttention : Méfiez-vous des triangles amoureux ou des relations qui ne peuvent pas être révélées. Si vous êtes une femme, la personne à qui vous parlez cache peut-être quelque chose ou a quelqu'un d'autre dans sa vie."
    },
    "THE EMPRESS": {
        quote: "Vous êtes déjà complète, celui qui entre doit enrichir votre vie",
        interpretation: "Vous vivez déjà une vie épanouie et ne cherchez pas activement l'amour. Quiconque veut vous courtiser doit apporter de la valeur à votre vie plutôt que l'inverse.\n\nEn ce moment, si vous n'avez personne, c'est parce que vous préférez rester chez vous et êtes satisfaite de vous-même. Vous êtes profondément amoureuse de vous-même et personne ne vous a encore fait ressentir d'attirance.\n\nSi quelqu'un arrive, il doit être stable et offrir plus que votre vie de célibataire confortable - peut-être quelqu'un de financièrement stable qui aime offrir des cadeaux et prendre soin de vous."
    },
    "THE EMPEROR": {
        quote: "Un leader qui a du pouvoir et offre la stabilité",
        interpretation: "Quelqu'un qui a du pouvoir et du leadership. Peut-être quelqu'un occupant un poste élevé au travail ou quelqu'un de stable dans la vie. Aime les règles et l'ordre. Peut sembler strict mais offre la stabilité."
    },
    "THE HIEROPHANT": {
        quote: "Un bon conseiller, mais ne vous accorde pas d'attention particulière",
        interpretation: "Quelqu'un qui vient comme conseiller, mais qui agit comme un climatiseur central distribuant sa bienveillance à tous. C'est quelqu'un qui s'occupe de tout le monde de la même manière, sans vous accorder d'importance particulière. Peut être un professeur, un mentor ou un aîné qui donne des conseils."
    },
    "THE LOVERS": {
        quote: "Quelqu'un avec qui ça clique dès la première rencontre",
        interpretation: "Quelqu'un qui arrive avec une connexion parfaite. Vous aurez de l'alchimie dès la première rencontre. Vous partagez des valeurs et des intérêts similaires. C'est une relation équilibrée où les deux se comprennent bien et peuvent communiquer ouvertement."
    },
    "THE CHARIOT": {
        quote: "Une personne déterminée qui sait ce qu'elle veut",
        interpretation: "Quelqu'un de déterminé et enthousiaste. Une personne qui sait ce qu'elle veut et atteindra ses objectifs. Peut-être quelqu'un qui a réussi, avec du leadership, de l'énergie et beaucoup d'enthousiasme. Peut aimer voyager ou être très mobile."
    },
    "STRENGTH": {
        quote: "Quelqu'un qui a besoin de votre aide et de vos encouragements",
        interpretation: "La personne qui entre dans votre vie est probablement déjà dans votre entourage. Peut-être un ami proche, quelqu'un de proche, ou quelqu'un dont vous devez constamment vous occuper. Peut-être quelqu'un qui traverse des difficultés et a besoin d'encouragement et de soins.\n\nPour ceux qui n'ont personne : Si quelqu'un arrive en ce moment, vérifiez bien s'il a déjà quelqu'un. C'est peut-être quelqu'un qui a des problèmes dans sa relation actuelle et vient vers vous pour du réconfort."
    },
    "THE HERMIT": {
        quote: "Quelqu'un du passé avec qui vous partagez des souvenirs",
        interpretation: "La personne qui entrera dans votre vie est quelqu'un avec qui vous partagez encore des sentiments et des souvenirs. Peut-être un ex, quelqu'un avec qui vous aviez l'habitude de parler, ou quelqu'un qui a eu de l'importance dans le passé."
    },
    "WHEEL OF FORTUNE": {
        quote: "Quelqu'un qui arrive de façon inattendue, tout est encore instable",
        interpretation: "Quelqu'un qui arrive de façon inattendue ou un ancien qui revient. Vous pourriez le rencontrer lors d'un événement de rencontres ou en ligne - applications de rencontres, réseaux sociaux ou présentation par des amis.\n\nC'est encore une période d'incertitude, ou vous venez de sortir d'une relation et êtes dans une phase de repos et de changement, pas prêt(e) pour quelque chose de sérieux. Tout est encore instable."
    },
    "JUSTICE": {
        quote: "Période de décision et de réflexion",
        interpretation: "Personne n'arrive, mais quelqu'un s'éloigne de vous. La relation est dans une période de distance et il n'est pas certain de la direction qu'elle prendra. C'est un temps de jugement et de pesée des options.\n\nSi vous avez quelqu'un qui vous parle : Cette personne est peut-être en train de décider de prendre ses distances avec son partenaire actuel ou son ex, mais ne peut pas encore trouver de clarté. Elle hésite encore et n'est pas prête à faire un choix clair."
    },
    "THE HANGED MAN": {
        quote: "Période d'attente et de blocage",
        interpretation: "Vous n'êtes pas encore prêt(e) à rencontrer quelqu'un. Vous venez de traverser une déception, ou vous êtes actuellement malade. Si vous avez un rendez-vous, des circonstances imprévues pourraient empêcher la rencontre. C'est un temps pour s'arrêter et attendre.\n\nSi quelqu'un arrive : Cette personne vient peut-être de traverser un chagrin, a des problèmes, ou est dans une situation bloquée. Vous pourriez penser \"Je peux le/la réparer\". Attention - vous pourriez finir par devoir vous réparer vous-même."
    },
    "DEATH": {
        quote: "Période de fin et de transformation",
        interpretation: "C'est une période de changement et de chagrin. Pas idéal pour un nouveau départ. Vous devez d'abord faire le ménage dans les vieilles choses et dans votre esprit. C'est plus une période de fin que de commencement.\n\nSi quelqu'un arrive : C'est souvent quelqu'un du passé qui ne fait pas du bien à votre vie. Peut-être un ex qui revient pour vous blesser à nouveau, ou quelqu'un qui n'apporte que de la douleur.\n\nPour certains : Cela peut signifier quelqu'un dans le domaine médical (médecin, infirmier, pharmacien) ou un étranger, particulièrement britannique ou européen, qui pourrait vous apprécier."
    },
    "TEMPERANCE": {
        quote: "Plusieurs options, mais pas encore capable de choisir",
        interpretation: "Vous devrez peut-être jongler un peu. Des gens viennent vous parler mais vous ne pouvez pas décider quoi faire. Il y a plusieurs options, mais vous n'êtes pas sûr(e). Vous pourriez avoir plusieurs rendez-vous le même jour ou gérer plusieurs personnes en même temps.\n\nPour ceux qui savent qu'ils ne sont pas volages : Méfiez-vous de l'autre partie qui pourrait jongler entre plusieurs personnes, pas sûre de ses choix. Ou vous pourriez rencontrer quelqu'un d'intéressant, mais il/elle ne sera avec vous que brièvement avant de courir à un autre rendez-vous."
    },
    "THE DEVIL": {
        quote: "Une passion intense, mais attention aux personnes déjà prises",
        interpretation: "Quelqu'un arrive et vous serez très attirés l'un par l'autre. Il y a de l'alchimie, une forte attraction physique. Cela peut être une passion intense, mais pas nécessairement un amour bon pour le cœur à long terme.\n\nAttention : Méfiez-vous des personnes déjà en couple qui se rapprochent de vous. Peut-être quelqu'un de marié, qui a déjà un partenaire, ou dans une relation, mais qui vous drague ou vous accorde une attention particulière. Il peut y avoir des limitations ou des conditions cachées."
    },
    "THE TOWER": {
        quote: "Période de guérison et de reconstruction",
        interpretation: "C'est une période plus adaptée pour reposer votre cœur que pour laisser quelqu'un entrer dans votre vie. Vous venez peut-être de rompre avec quelqu'un. Vous êtes en phase de guérison de la douleur. Vous avez besoin de temps pour vous reconstruire.\n\nPour certains : Cela peut signifier rencontrer quelqu'un qui vient de rompre. Il/elle n'est peut-être pas prêt(e), a encore des blessures, est encore en phase de guérison. Si vous vous impliquez maintenant, vous devrez peut-être gérer ses émotions et problèmes."
    },
    "THE STAR": {
        quote: "Quelqu'un d'attirant et célèbre",
        interpretation: "C'est une période où vous commencez à prendre davantage soin de vous. Vous pourriez commencer à faire du sport, mieux vous habiller, prendre soin de votre peau, ou améliorer votre apparence. Des gens viennent s'intéresser à vous, mais vous n'avez pas encore décidé de choisir quelqu'un en particulier.\n\nOu cela peut signifier que quelqu'un arrive et cette personne est célèbre, belle, ou a une profession qui nécessite de montrer son visage - acteur/actrice, mannequin, influenceur, présentateur/présentatrice, ou métier impliquant d'apparaître en public."
    },
    "THE MOON": {
        quote: "Une relation floue et confuse",
        interpretation: "La personne qui vient vers vous en ce moment n'est pas votre type, ou ne répond pas à tous vos critères. Peu importe qui vous choisissez, ce n'est pas encore la bonne personne pour vous. Cela vous rend confus(e) et incertain(e).\n\nOu cela peut signifier : Vous êtes dans une relation floue, un amour à distance, ou une relation qui ne peut pas progresser. Il y a beaucoup d'obstacles. Vous n'êtes pas sûr(e) des sentiments de l'autre."
    },
    "THE SUN": {
        quote: "Un nouveau départ lumineux et clair",
        interpretation: "Vous êtes fait(e) pour une nouvelle relation, un tout nouveau départ. Quelqu'un avec qui vous parliez depuis longtemps vient peut-être de sortir de votre vie, ou vous venez d'apprendre une vérité qui a mis fin aux choses. C'est une période de nouveau départ lumineux.\n\nPour les célibataires : Quelqu'un qui vient de sortir d'une relation pourrait entrer dans votre vie et faire des avances claires et directes. Si vous avez la même énergie et êtes prêt(e) pour un nouveau départ, vous pouvez sortir avec cette personne.\n\nAttention : Pour ceux qui ont un amour secret, attention aux révélations. La vérité pourrait éclater."
    },
    "JUDGEMENT": {
        quote: "Temps de clôture et de nouveau départ",
        interpretation: "C'est une période où vous semblez décider de rompre avec quelqu'un plutôt que d'avoir de l'amour. C'est un temps de clôture, de fin d'un vieux chapitre, plus que de nouveau départ.\n\nSi vous voulez vraiment être avec quelqu'un : Vous devriez essayer de défaire vos vœux dans des temples importants pour que les choses non terminées dans votre cœur puissent enfin se conclure. Après la Saint-Valentin, puissiez-vous rencontrer quelqu'un de nouveau.\n\nPour ceux sans problèmes amoureux : Vous pourriez rencontrer quelqu'un d'intéressant dans un temple, un événement caritatif, ou un hôpital - une rencontre dans un lieu inattendu."
    },
    "THE WORLD": {
        quote: "Complet(e) en soi, pas besoin d'attachement",
        interpretation: "C'est une période la plus adaptée pour être seul(e). Vous êtes satisfait(e) de votre vie. Vous êtes complet(e) en vous-même. Vous ne ressentez aucun manque.\n\nSi quelqu'un vous contacte : S'il n'est pas vraiment extraordinaire, c'est souvent quelqu'un d'ancien avec qui vous avez gardé contact, mais dans votre cœur vous vous dites \"Non, ça ira\". Vous ne voulez pas faire avancer les choses.\n\nInversement : Vous pourriez être l'une de ces vieilles connaissances qui rend visite à quelqu'un. Il/elle parle sans s'engager, garde ses distances avec tout le monde, ne veut pas être sérieux/sérieuse avec personne."
    },
    "PAGE OF WANDS": {
        quote: "Quelqu'un d'enthousiaste qui apporte une nouvelle énergie",
        interpretation: "Un(e) inconnu(e) plus jeune que vous, à la peau bronzée ou mate, plein(e) d'énergie, enthousiaste, qui aime l'aventure. Vous pourriez le/la rencontrer dans les trois prochaines semaines. Peut-être dans un lieu d'activités, un événement, ou un endroit où vous n'êtes jamais allé(e) avant."
    },
    "KNIGHT OF WANDS": {
        quote: "Quelqu'un d'indépendant qui arrive sans prévenir",
        interpretation: "Quelqu'un de la fin de l'adolescence au milieu de la vie adulte, pas encore vraiment adulte. Cherche encore le sens de la vie et profite de vivre. Aime conduire vite, aime la liberté. Peut avoir la peau bronzée, vivre dans une autre province ou nécessiter un peu de temps de voyage pour vous voir. Peut venir vous voir sans rendez-vous préalable."
    },
    "QUEEN OF WANDS": {
        quote: "Une bonne relation mais sans étiquette, pas claire",
        interpretation: "Pour les femmes : Vous avez le béguin pour un ami proche ou attendez quelqu'un qui est déjà dans votre vie. Il vous traite peut-être bien comme si vous étiez sa petite amie, mais ne vous donne pas de statut. Vous êtes coincée dans une relation sans étiquette, pas claire.\n\nPour les hommes : Une femme fougueuse et charmante est déjà dans votre vie. Elle est compétente au travail, confiante. Mais elle attend peut-être encore un ex ou quelqu'un d'autre, donc l'amour ne progresse pas. Peu importe vos efforts, vous n'obtenez pas de clarté."
    },
    "KING OF WANDS": {
        quote: "Un leader avec vision et expérience",
        interpretation: "Un homme expérimenté, avec des connaissances pratiques du travail. Un leader avec une vision. Peut être un homme d'affaires, un propriétaire d'entreprise, ou un cadre. A traversé de grands projets. Respecté dans son domaine. Confiant et sait ce qu'il veut. Souvent un signe de feu (Bélier, Lion, Sagittaire)."
    },
    "PAGE OF CUPS": {
        quote: "Quelqu'un de mignon qui partage vos goûts",
        interpretation: "Quelqu'un de plus jeune que vous, beau/belle, mignon(ne), qui aime l'art. Peut étudier l'art, les lettres, les langues et la littérature. A du goût, est sensible, aime le travail créatif. La relation peut naître du partage de goûts et d'intérêts similaires - aimer les mêmes films, la même musique, ou avoir des hobbies similaires."
    },
    "KNIGHT OF CUPS": {
        quote: "Quelqu'un de romantique mais sans direction claire",
        interpretation: "Un(e) adolescent(e) ou quelqu'un d'âge moyen qui est romantique, qui entre ou vient d'entrer dans votre vie. Quelqu'un qui s'entend facilement avec les gens, sociable, parle doucement, sait vous faire sentir spécial(e). Mais peut ne pas encore avoir d'objectifs de vie clairs, flotte encore, ne sait pas où aller. Aime exprimer ses sentiments mais n'a peut-être pas de plans à long terme."
    },
    "QUEEN OF CUPS": {
        quote: "Quelqu'un d'émotionnellement intelligent qui comprend vos sentiments",
        interpretation: "Une femme belle, gentille, émotionnellement intelligente, qui comprend bien les sentiments des autres. Peut travailler dans un domaine créatif ou de soins comme thérapeute, conseillère, ou artiste. C'est quelqu'un de réconfortant et compréhensif, mais peut être trop sensible et se perdre dans les émotions des autres."
    },
    "KING OF CUPS": {
        quote: "Quelqu'un de mature émotionnellement et digne de confiance",
        interpretation: "Un homme mature, émotionnellement stable, digne de confiance. Peut travailler dans un domaine créatif ou de conseil. Comprend bien les émotions, sait écouter, est un bon confident. Peut avoir traversé beaucoup de choses et a appris à gérer ses émotions. Souvent un signe d'eau (Cancer, Scorpion, Poissons)."
    },
    "ACE OF WANDS": {
        quote: "Un nouveau début passionné et excitant",
        interpretation: "Une nouvelle opportunité amoureuse arrive avec passion et enthousiasme. C'est un moment d'énergie nouvelle, d'excitation et de possibilités. Quelqu'un peut entrer dans votre vie qui allume une étincelle. C'est le début de quelque chose de passionnant."
    },
    "TWO OF WANDS": {
        quote: "Planifier l'avenir de la relation",
        interpretation: "Vous êtes à un carrefour, planifiant l'avenir de votre relation ou de votre vie amoureuse. Vous avez des options et devez décider quelle direction prendre. C'est un moment de réflexion et de planification avant d'agir."
    },
    "THREE OF WANDS": {
        quote: "Attendre que quelqu'un revienne ou arrive de loin",
        interpretation: "Vous attendez quelqu'un qui pourrait venir de loin ou revenir après un voyage. Peut indiquer une relation à distance ou quelqu'un que vous avez rencontré en voyage. L'attente et l'anticipation sont présentes."
    },
    "FOUR OF WANDS": {
        quote: "Célébration et stabilité dans la relation",
        interpretation: "Un moment de célébration et de stabilité. Peut indiquer un engagement, des fiançailles, ou simplement une période heureuse dans la relation. C'est un bon signe pour la vie domestique et les relations familiales."
    },
    "FIVE OF WANDS": {
        quote: "Compétition et conflits en amour",
        interpretation: "Il y a de la compétition ou des conflits autour de votre vie amoureuse. Plusieurs personnes pourraient s'intéresser à vous ou à la personne que vous aimez. Il peut y avoir des désaccords ou des malentendus à résoudre."
    },
    "SIX OF WANDS": {
        quote: "Victoire et reconnaissance en amour",
        interpretation: "Succès et reconnaissance dans votre vie amoureuse. Vous pourriez gagner le cœur de quelqu'un ou votre relation pourrait être célébrée par votre entourage. C'est un moment de fierté et d'accomplissement."
    },
    "SEVEN OF WANDS": {
        quote: "Défendre votre relation ou votre position",
        interpretation: "Vous devez peut-être défendre votre relation ou vos choix amoureux face à l'opposition ou aux critiques. Restez ferme dans vos convictions. Ne laissez pas les autres vous décourager."
    },
    "EIGHT OF WANDS": {
        quote: "Communication rapide et développement soudain",
        interpretation: "Les choses bougent rapidement dans votre vie amoureuse. Messages, appels, ou rencontres arrivent vite. Une relation peut progresser rapidement. C'est un moment d'action et de mouvement."
    },
    "NINE OF WANDS": {
        quote: "Persévérance malgré les difficultés passées",
        interpretation: "Vous avez été blessé(e) avant et êtes maintenant sur la défensive. Mais ne perdez pas espoir. La persévérance est nécessaire. Quelqu'un de patient et compréhensif pourrait arriver pour vous aider à guérir."
    },
    "TEN OF WANDS": {
        quote: "Porter le poids de la relation",
        interpretation: "Vous portez peut-être trop de responsabilités dans votre relation ou dans votre quête de l'amour. C'est épuisant. Il est temps de déléguer ou de lâcher prise sur certaines choses. Ne vous surchargez pas."
    },
    "ACE OF CUPS": {
        quote: "Un nouveau début émotionnel et amoureux",
        interpretation: "Une nouvelle opportunité amoureuse pleine d'émotions profondes. Votre cœur est prêt à s'ouvrir à un nouvel amour. C'est un moment de renouveau émotionnel et de possibilités romantiques."
    },
    "TWO OF CUPS": {
        quote: "Une connexion mutuelle et équilibrée",
        interpretation: "Une belle connexion entre deux personnes. L'attraction et l'affection sont mutuelles. C'est le début d'un partenariat équilibré où les deux parties donnent et reçoivent également."
    },
    "THREE OF CUPS": {
        quote: "Célébration et amitié menant à l'amour",
        interpretation: "L'amour peut venir à travers des amis ou des célébrations sociales. Sortez, amusez-vous, et vous pourriez rencontrer quelqu'un de spécial. Les fêtes et rassemblements sont favorables aux rencontres."
    },
    "FOUR OF CUPS": {
        quote: "Apathie ou occasion manquée en amour",
        interpretation: "Vous pourriez ignorer une opportunité amoureuse parce que vous êtes trop concentré(e) sur ce que vous n'avez pas. Ouvrez les yeux - quelqu'un essaie peut-être d'attirer votre attention. Ne soyez pas trop difficile."
    },
    "FIVE OF CUPS": {
        quote: "Chagrin et regret, mais espoir reste",
        interpretation: "Vous vous concentrez sur ce qui a été perdu ou sur les déceptions passées. Mais regardez autour de vous - il reste encore de l'espoir. Ne laissez pas le passé vous empêcher de voir les possibilités futures."
    },
    "SIX OF CUPS": {
        quote: "Nostalgie et retour d'un amour du passé",
        interpretation: "Quelqu'un du passé pourrait revenir - un amour d'enfance, un ex, ou quelqu'un que vous avez connu il y a longtemps. C'est aussi un temps de nostalgie et de souvenirs doux. L'innocence et la simplicité sont présentes."
    },
    "SEVEN OF CUPS": {
        quote: "Trop de choix, difficulté à décider",
        interpretation: "Vous avez trop d'options ou trop de fantasmes sur l'amour. Il est difficile de distinguer le réel de l'illusion. Soyez réaliste dans vos attentes et choisissez avec sagesse."
    },
    "EIGHT OF CUPS": {
        quote: "S'éloigner pour chercher quelque chose de plus profond",
        interpretation: "Vous pourriez quitter une relation ou une situation qui ne vous satisfait plus émotionnellement. C'est un voyage pour trouver quelque chose de plus significatif. Parfois, il faut partir pour grandir."
    },
    "NINE OF CUPS": {
        quote: "Satisfaction et souhaits amoureux exaucés",
        interpretation: "Vos souhaits amoureux se réalisent. C'est un moment de satisfaction et de bonheur dans votre vie amoureuse. Profitez de ce moment de contentement. Vous méritez cette joie."
    },
    "TEN OF CUPS": {
        quote: "Bonheur familial et amour accompli",
        interpretation: "Le bonheur ultime en amour et en famille. Une relation épanouie qui apporte joie et harmonie. C'est le rêve d'une vie amoureuse parfaite qui se réalise."
    },
    "ACE OF SWORDS": {
        quote: "Clarté mentale et nouveau départ décisif",
        interpretation: "Un moment de clarté dans votre vie amoureuse. Vous voyez les choses clairement et pouvez prendre des décisions importantes. C'est un nouveau départ avec une vision claire."
    },
    "TWO OF SWORDS": {
        quote: "Indécision et choix difficile à faire",
        interpretation: "Vous êtes coincé(e) entre deux choix en amour et ne pouvez pas décider. Les deux options semblent avoir leurs avantages et inconvénients. Prenez le temps de réfléchir, mais ne restez pas bloqué(e) trop longtemps."
    },
    "THREE OF SWORDS": {
        quote: "Chagrin d'amour et douleur émotionnelle",
        interpretation: "Une période de douleur émotionnelle, peut-être une rupture, une trahison, ou une déception en amour. C'est douloureux mais nécessaire pour guérir et avancer. Permettez-vous de ressentir cette douleur."
    },
    "FOUR OF SWORDS": {
        quote: "Repos et récupération après une période difficile",
        interpretation: "Vous avez besoin de repos après une période difficile en amour. Prenez du temps pour vous, pour guérir et récupérer. Ce n'est pas le moment de chercher activement l'amour."
    },
    "FIVE OF SWORDS": {
        quote: "Conflit et victoire amère en amour",
        interpretation: "Il peut y avoir des conflits ou des disputes dans votre vie amoureuse. Même si vous gagnez, cela peut laisser un goût amer. Choisissez vos batailles avec sagesse. Parfois, perdre est gagner."
    },
    "SIX OF SWORDS": {
        quote: "Transition vers des eaux plus calmes",
        interpretation: "Vous quittez une situation difficile pour quelque chose de meilleur. C'est une transition, un mouvement vers la guérison. Même si le voyage est lent, vous vous dirigez vers des eaux plus calmes."
    },
    "SEVEN OF SWORDS": {
        quote: "Tromperie ou secrets en amour",
        interpretation: "Attention à la tromperie ou aux secrets dans votre vie amoureuse. Quelqu'un pourrait ne pas être honnête avec vous, ou vous pourriez cacher quelque chose. La vérité est importante pour une relation saine."
    },
    "EIGHT OF SWORDS": {
        quote: "Se sentir piégé(e) mais les limites sont auto-imposées",
        interpretation: "Vous vous sentez piégé(e) dans votre situation amoureuse, mais les barrières sont souvent dans votre esprit. Vous avez plus de pouvoir que vous ne le pensez. Libérez-vous de vos peurs."
    },
    "NINE OF SWORDS": {
        quote: "Anxiété et inquiétudes nocturnes sur l'amour",
        interpretation: "Vous vous inquiétez beaucoup pour votre vie amoureuse, surtout la nuit. L'anxiété peut être accablante. Mais souvent, vos peurs sont plus grandes que la réalité. Parlez à quelqu'un de vos inquiétudes."
    },
    "TEN OF SWORDS": {
        quote: "Fin douloureuse mais aussi nouveau départ",
        interpretation: "Une fin douloureuse dans votre vie amoureuse. C'est le point le plus bas. Mais rappelez-vous, après la fin vient un nouveau départ. Le pire est passé."
    },
    "ACE OF PENTACLES": {
        quote: "Nouvelle opportunité pour une relation stable",
        interpretation: "Une nouvelle opportunité pour une relation stable et sécurisante. Quelqu'un de fiable et pratique pourrait entrer dans votre vie. C'est un bon moment pour construire quelque chose de solide."
    },
    "TWO OF PENTACLES": {
        quote: "Équilibrer l'amour avec d'autres responsabilités",
        interpretation: "Vous jongler entre l'amour et d'autres responsabilités. Il peut être difficile de trouver l'équilibre. Soyez flexible et adaptable. Ne négligez pas votre vie amoureuse pour le travail."
    },
    "THREE OF PENTACLES": {
        quote: "Construire une relation ensemble avec effort",
        interpretation: "Une relation qui se construit avec effort et collaboration. Les deux parties travaillent ensemble pour créer quelque chose de beau. La communication et le travail d'équipe sont essentiels."
    },
    "FOUR OF PENTACLES": {
        quote: "Retenir l'amour par peur de perdre",
        interpretation: "Vous pourriez retenir votre amour ou être trop possessif/possessive par peur de perdre. Mais l'amour ne peut pas être contrôlé ainsi. Lâchez prise un peu pour permettre à l'amour de s'épanouir."
    },
    "FIVE OF PENTACLES": {
        quote: "Se sentir exclu(e) ou abandonné(e) en amour",
        interpretation: "Un sentiment de manque ou d'exclusion dans votre vie amoureuse. Vous pourriez vous sentir laissé(e) de côté ou non désiré(e). Mais l'aide est disponible si vous la cherchez. Ne souffrez pas en silence."
    },
    "SIX OF PENTACLES": {
        quote: "Donner et recevoir dans une relation équilibrée",
        interpretation: "Une relation où il y a un équilibre de donner et recevoir. L'un peut être plus généreux que l'autre en ce moment, mais cela s'équilibre avec le temps. La générosité renforce les liens."
    },
    "SEVEN OF PENTACLES": {
        quote: "Patience nécessaire, les résultats viendront",
        interpretation: "Vous avez investi dans votre vie amoureuse et attendez les résultats. La patience est nécessaire. Les bonnes choses prennent du temps. Continuez à nourrir ce que vous avez planté."
    },
    "EIGHT OF PENTACLES": {
        quote: "Travailler sur soi et sur la relation",
        interpretation: "C'est un temps de travail sur vous-même ou sur votre relation. L'amélioration vient avec l'effort et la pratique. Ne vous découragez pas - chaque petit pas compte."
    },
    "NINE OF PENTACLES": {
        quote: "Indépendance et autosuffisance avant l'amour",
        interpretation: "Vous êtes indépendant(e) et autosuffisant(e). Vous n'avez pas besoin de quelqu'un pour être heureux/heureuse. Quand l'amour viendra, il sera un ajout à votre vie déjà épanouie, pas une nécessité."
    },
    "TEN OF PENTACLES": {
        quote: "Amour durable et sécurité à long terme",
        interpretation: "Une relation qui offre sécurité et stabilité à long terme. Peut indiquer le mariage, la famille, ou un engagement sérieux. C'est un amour qui construit un avenir ensemble."
    },
    "PAGE OF SWORDS": {
        quote: "Quelqu'un de curieux mais peut-être trop bavard",
        interpretation: "Quelqu'un de jeune, curieux, intelligent, mais peut-être un peu trop bavard ou indiscret. Cette personne aime les discussions intellectuelles et peut être très directe. Faites attention aux commérages."
    },
    "KNIGHT OF SWORDS": {
        quote: "Quelqu'un d'impulsif qui agit vite",
        interpretation: "Quelqu'un qui agit rapidement et de manière décisive. Peut être impulsif et parfois blessant avec ses mots. Cette personne poursuit ce qu'elle veut avec détermination, mais peut manquer de tact."
    },
    "QUEEN OF SWORDS": {
        quote: "Quelqu'un d'intelligent et indépendant, peut-être distant",
        interpretation: "Une femme intelligente, indépendante, et parfois froide en apparence. Elle a traversé des difficultés et en est ressortie plus forte. Peut sembler distante mais a un bon cœur sous son armure."
    },
    "KING OF SWORDS": {
        quote: "Quelqu'un de logique et autoritaire",
        interpretation: "Un homme intelligent, logique, et autoritaire. Il valorise la vérité et la justice. Peut sembler froid mais est juste et honnête. Prend ses décisions avec la tête, pas le cœur."
    },
    "PAGE OF PENTACLES": {
        quote: "Quelqu'un de jeune avec des ambitions pratiques",
        interpretation: "Quelqu'un de jeune, studieux, pratique, avec des ambitions réalistes. Cette personne travaille dur pour atteindre ses objectifs. Peut être un peu lent(e) mais est fiable et déterminé(e)."
    },
    "KNIGHT OF PENTACLES": {
        quote: "Quelqu'un de fiable mais peut-être ennuyeux",
        interpretation: "Quelqu'un de fiable, patient, travailleur, mais peut-être un peu ennuyeux ou trop prudent. Cette personne avance lentement mais sûrement. Vous pouvez compter sur elle, mais n'attendez pas de surprises."
    },
    "QUEEN OF PENTACLES": {
        quote: "Quelqu'un de nourrissant et pratique",
        interpretation: "Une femme pratique, nourrissante, généreuse, qui aime prendre soin des autres. Elle est douée pour créer un foyer confortable et gérer les aspects pratiques de la vie. Chaleureuse et terre-à-terre."
    },
    "KING OF PENTACLES": {
        quote: "Quelqu'un de prospère et généreux",
        interpretation: "Un homme prospère, généreux, pratique, et fiable. Il a réussi matériellement et aime partager sa réussite. C'est quelqu'un de stable qui offre sécurité et confort."
    }
};

// Read current file
const filePath = path.join(__dirname, '..', 'js', 'card-interpretations.js');
let content = fs.readFileSync(filePath, 'utf8');

// Update each card's French translation
let updateCount = 0;

for (const [cardName, frData] of Object.entries(frenchTranslations)) {
    const escapedName = cardName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Pattern to find the French translation for this card
    const pattern = new RegExp(
        `("${escapedName}":\\s*\\{[\\s\\S]*?fr:\\s*\\{)[^}]*(\\})`,
        'g'
    );

    const replacement = `$1 quote: "${frData.quote.replace(/"/g, '\\"')}", interpretation: "${frData.interpretation.replace(/"/g, '\\"').replace(/\n/g, '\\n')}" $2`;

    const newContent = content.replace(pattern, replacement);

    if (newContent !== content) {
        content = newContent;
        updateCount++;
        console.log(`Updated: ${cardName}`);
    } else {
        console.log(`Not found or unchanged: ${cardName}`);
    }
}

// Write updated content
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\nTotal updated: ${updateCount} cards`);
console.log('Done! Please verify the changes.');
