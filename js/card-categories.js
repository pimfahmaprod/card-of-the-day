/**
 * Card of the Day - Category Interpretations (Love, Work, Finance, Health)
 * @version 1.0.0
 * Translations for non-Thai languages. Thai data is in tarot_cards.json.
 */

const cardCategories = {
    "THE FOOL": {
        en: {
            love: "You may be feeling the urge to start fresh in love. If you've just ended a relationship, now isn't the time to reconcile with your ex. Consider traveling to a new place or trying activities you've never done before to broaden your horizons and ease the loneliness. Singles may meet someone free-spirited and adventurous, but not yet ready for commitment.\n\nFor those in a relationship, your partner may need to travel far, or they might be developing new hobbies, social circles, or interests that change their daily routine.",
            loveQuote: "Every new beginning carries the wild promise of the unknown.",
            work: "You're in a phase where work isn't your top priority. You might be thinking about quitting even without a new job lined up, wanting to live life on your own terms. If you must keep working, you may be going through the motions, causing tasks to slip through the cracks. There might also be a new intern joining your team who lacks experience and needs guidance getting started. For those in entertainment, performing arts, or blogging, this is a great time to showcase your talents and gain recognition.",
            workQuote: "Not every wandering soul is lost; some are simply finding their stage.",
            finance: "You tend to spend recklessly during this period, splurging on shopping and international travel. Or perhaps you've recently quit your job without a clear plan, so you don't hesitate to dip into your savings without any financial planning. Windfalls may come from abroad, but the source might not be entirely legitimate. Be cautious of younger people asking to borrow money for gambling.",
            financeQuote: "Freedom without a budget is just chaos with a credit card.",
            health: "Your health is generally good during this period, but don't be careless as minor accidents can happen, especially from risky activities like climbing, extreme sports, or reckless driving. Parents should watch out for their children's health, as they may catch fevers, rashes, or infections from school friends. Live mindfully, don't be too careless, practice preventive healthcare, and be extra cautious during risky activities. If you have children, watch for unusual symptoms and see a doctor early.",
            healthQuote: "A carefree spirit still needs a careful step."
        },
        ja: {
            love: "恋愛面では、新しいスタートを切りたいという衝動に駆られているかもしれません。最近別れたばかりなら、今は復縁を考える時期ではありません。新しい場所への旅行や未経験のアクティビティに挑戦して、視野を広げ、孤独感を和らげましょう。独身の方は、自由奔放で冒険心あふれる人と出会う可能性がありますが、まだ本格的な交際には至らないでしょう。\n\n交際中の方は、パートナーが遠方へ出張したり、新しい趣味や人間関係、興味を持ち始めて日常のリズムが変わるかもしれません。",
            loveQuote: "すべての始まりには、未知への美しい約束が宿っている。",
            work: "仕事があまり優先事項ではない時期に入っています。次の仕事が決まっていなくても辞めたいと考えるかもしれません。自分らしく生きたいという気持ちが強まっています。仕事を続ける場合でも、惰性でこなしてしまい、ミスが増える恐れがあります。チームに経験の浅い新人が配属され、指導が必要になることも。エンターテインメントやパフォーマンス、ブログなどの分野では、才能を発揮して注目を集める絶好のチャンスです。",
            workQuote: "さまよう魂がすべて迷っているわけではない。自分の舞台を探しているだけだ。",
            finance: "この時期は衝動的にお金を使いがちです。ショッピングや海外旅行に散財してしまうかもしれません。あるいは明確な計画なく仕事を辞めたばかりで、貯蓄を躊躇なく切り崩しているかもしれません。海外から思わぬ臨時収入がある可能性もありますが、その出どころは完全に合法とは限りません。若い人からギャンブル資金の借金を頼まれることにも注意しましょう。",
            financeQuote: "予算のない自由は、クレジットカードを持った混乱にすぎない。",
            health: "この時期の健康運は概ね良好ですが、油断は禁物です。登山やエクストリームスポーツ、無謀な運転などリスクの高い活動でちょっとした事故が起きやすくなっています。お子さんのいる方は、学校の友達から風邪や発疹、感染症をもらってくる可能性があるので気をつけましょう。日々を意識的に過ごし、予防的な健康管理を心がけ、危険な活動では特に注意を払ってください。",
            healthQuote: "気ままな心にも、慎重な一歩は必要だ。"
        },
        ko: {
            love: "사랑에서 새로운 시작을 하고 싶은 충동을 느끼고 있을 수 있습니다. 최근 이별을 겪었다면, 지금은 재결합할 시기가 아닙니다. 새로운 곳으로 여행을 떠나거나 해보지 못한 활동에 도전해 시야를 넓히고 외로움을 달래보세요. 싱글이라면 자유롭고 모험적인 사람을 만날 수 있지만, 아직 진지한 관계를 맺을 준비가 되어 있지 않을 수 있습니다.\n\n연인이 있는 분은 상대가 먼 곳으로 출장을 가거나, 새로운 취미·인간관계·관심사를 발전시키면서 일상 패턴이 바뀔 수 있습니다.",
            loveQuote: "모든 새로운 시작에는 미지의 설렘이 담겨 있다.",
            work: "일이 최우선이 아닌 시기입니다. 다음 직장이 정해지지 않았는데도 퇴사를 고민하며, 자기만의 방식대로 살고 싶어 할 수 있습니다. 일을 계속해야 한다면 건성으로 하게 되어 실수가 생길 수 있습니다. 팀에 경험 부족한 신입이 합류해 가이드가 필요할 수도 있습니다. 엔터테인먼트·공연·블로그 분야라면, 재능을 보여주고 인정받기에 좋은 시기입니다.",
            workQuote: "방황하는 영혼이 모두 길을 잃은 것은 아니다.",
            finance: "이 시기에는 충동적으로 돈을 쓰기 쉽습니다. 쇼핑과 해외여행에 거침없이 소비하게 됩니다. 혹은 뚜렷한 계획 없이 퇴사한 후 저축을 거리낌 없이 꺼내 쓸 수도 있습니다. 해외에서 뜻밖의 수입이 들어올 수 있지만, 출처가 완전히 정당하지 않을 수 있으니 주의하세요. 도박 목적으로 돈을 빌리려는 젊은 사람들을 조심하세요.",
            financeQuote: "계획 없는 자유는 신용카드를 든 혼돈일 뿐이다.",
            health: "이 시기 전반적인 건강은 양호하지만, 방심은 금물입니다. 등산·익스트림 스포츠·과속 운전 등 위험한 활동에서 사소한 사고가 발생할 수 있습니다. 자녀가 있는 부모님은 아이의 건강에 유의하세요. 학교 친구들로부터 열·발진·감염이 옮을 수 있습니다. 늘 의식하며 생활하고, 예방적 건강 관리를 실천하며, 위험한 활동 시 각별히 주의하세요.",
            healthQuote: "자유로운 영혼에게도 신중한 한 걸음은 필요하다."
        }
    },
    "THE MAGICIAN": {
        en: {
            love: "Your charm is radiating brightly. Many people are reaching out to you through various social media channels. You're open to getting to know new people, but you may not be looking for anything serious. Some may approach you with other intentions, like language exchange or business networking.\n\nFor those in a relationship, be mindful that your charm may be too strong. Others might show interest even knowing you're taken, or you might be so absorbed in personal activities that people mistakenly assume you're single.",
            loveQuote: "True magic in love begins when you dare to be seen.",
            work: "If you're job hunting, there's a good chance of landing a new position, especially in engineering, public speaking, sales, performing arts, or professional services. For those already employed, you may receive a promotion or be assigned an important project. Freelancers will have so much work coming in that it's almost overwhelming.",
            workQuote: "Skill meets opportunity, and the world bends to your will.",
            finance: "Salaried workers will earn extra income from overtime. Freelancers will have a steady stream of diverse projects that generate substantial income. Business owners will hit their sales targets, and everything they touch turns profitable. Clients notice your work and hire you consistently. While you may indulge in some personal spending, it won't be excessively extravagant.",
            financeQuote: "When your hands are skilled, abundance follows naturally.",
            health: "Overall health is fairly good, with vital organs functioning normally. However, there may be issues from poor posture, especially neck, shoulder, and upper back pain from overworking or sitting incorrectly. Office workers are at high risk and should adjust their sitting habits, stretch every hour, and ensure proper desk and chair height. If you have chronic pain, consult a doctor or physical therapist. Prevention is better than cure, so start with proper posture and regular light exercise.",
            healthQuote: "A strong body is the first tool of every great endeavor."
        },
        ja: {
            love: "あなたの魅力が輝いています。多くの人がSNSを通じてアプローチしてきます。新しい出会いには前向きですが、真剣な関係を求めているわけではないかもしれません。語学交換やビジネス目的で近づいてくる人もいるでしょう。\n\n交際中の方は、あなたの魅力が強すぎて注意が必要です。パートナーがいることを知りながら興味を示す人がいるかもしれませんし、自分の活動に没頭しすぎて独身だと誤解されることもあります。",
            loveQuote: "恋の本当の魔法は、ありのままの自分を見せる勇気から始まる。",
            work: "就職活動中の方には良い知らせがありそうです。特にエンジニアリング、スピーチ、営業、舞台芸術、専門サービスの分野にチャンスがあります。すでに働いている方は、昇進や重要なプロジェクトへの抜擢が期待できます。フリーランスの方は仕事が殺到して対応しきれないほどです。",
            workQuote: "スキルとチャンスが出会えば、世界はあなたの思いのままに動く。",
            finance: "サラリーマンは残業で副収入が得られるでしょう。フリーランスは多様なプロジェクトが安定して入り、かなりの収入になります。経営者は売上目標を達成し、手がけるものすべてが利益を生みます。少し贅沢をすることもあるかもしれませんが、度を越すほどではないでしょう。",
            financeQuote: "腕に磨きがかかれば、豊かさは自然とついてくる。",
            health: "全体的な健康状態は良好で、主要な臓器も正常に機能しています。ただし、姿勢の悪さからくる首や肩、背中上部の痛みに注意が必要です。デスクワークの方はリスクが高いので、座り方を見直し、一時間ごとにストレッチをし、デスクと椅子の高さを適切に調整しましょう。",
            healthQuote: "強い体こそ、あらゆる偉業を成し遂げるための最初の道具だ。"
        },
        ko: {
            love: "당신의 매력이 환하게 빛나고 있습니다. 다양한 SNS를 통해 많은 사람이 연락을 해옵니다. 새로운 사람을 알아가는 데 열려 있지만, 진지한 것을 찾고 있지는 않을 수 있습니다. 언어 교환이나 비즈니스 네트워킹 등 다른 목적으로 다가오는 사람도 있을 수 있습니다.\n\n연인이 있는 분은 매력이 너무 강해서 상대가 있다는 걸 알면서도 관심을 보이는 사람이 있을 수 있습니다. 또는 개인 활동에 몰두해서 주변에서 싱글이라고 오해할 수도 있습니다.",
            loveQuote: "사랑의 진정한 마법은 있는 그대로의 모습을 보여줄 때 시작된다.",
            work: "구직 중이라면 새 자리를 잡을 가능성이 높습니다. 특히 엔지니어링·연설·영업·공연예술·전문 서비스 분야에서 유리합니다. 직장인이라면 승진하거나 중요한 프로젝트를 맡게 될 수 있습니다. 프리랜서는 감당하기 어려울 정도로 일이 밀려들 것입니다.",
            workQuote: "실력이 기회를 만나면 세상이 당신의 뜻대로 움직인다.",
            finance: "직장인은 야근 수당으로 추가 수입을 얻게 됩니다. 프리랜서는 다양한 프로젝트가 꾸준히 들어와 상당한 수입을 올릴 수 있습니다. 사업가는 매출 목표를 달성하고, 손대는 것마다 수익이 납니다. 개인 소비를 즐길 수는 있지만, 지나치게 사치스럽지는 않을 것입니다.",
            financeQuote: "손재주가 뛰어나면 풍요는 자연스레 따라온다.",
            health: "전반적인 건강은 양호하며 주요 장기 기능도 정상입니다. 다만 잘못된 자세로 인한 문제가 있을 수 있습니다. 특히 과로나 잘못된 좌식 자세로 인한 목·어깨·등 상부 통증에 주의하세요. 사무직은 고위험군이므로 앉는 습관을 교정하고, 매시간 스트레칭을 하며, 책상과 의자 높이를 적절히 맞추세요.",
            healthQuote: "건강한 몸은 모든 위대한 일의 첫 번째 도구이다."
        }
    },
    "THE HIGH PRIESTESS": {
        en: {
            love: "Your love life during this period may need to remain a secret, whether due to rules, social status, or certain conditions. Singles may have a secret crush on someone at work but can't reveal their feelings yet. Be sure to verify the other person's background and relationship status before pursuing anything further.\n\nFor those in a relationship, watch out for third-party interference. You may be the first to notice warning signs, but without clear evidence yet. Or you yourself may be unknowingly developing feelings for someone else.",
            loveQuote: "Some love stories are written in invisible ink, waiting for the right light.",
            work: "This is a time for working with numbers, accounting, and important details within your company. Work may be piling up, but you're handling things well. Job seekers have opportunities in accounting, detail-oriented work, writing, or fortune-telling. Freelancers in arts, writing, and accounting will have clients contacting them steadily.",
            workQuote: "Silence holds more answers than noise ever will.",
            finance: "You're paying more attention to your income and expenses, starting to plan your finances with clear allocation between spending and savings. You're finding side income to compensate for what you've spent. The expenses you're willing to pay for are courses to build skills and side careers. If you're interested in mystical arts, you could study and turn it into a profitable career. Men should beware of women asking to borrow money; whether they truly need it or not, the money lent may never come back.",
            financeQuote: "Wisdom whispers: guard your treasure before you share it.",
            health: "For women, there may be issues with hormones and menstruation, causing unusual mood swings. Some may have problems with the uterus or reproductive system and should watch for abnormalities and get check-ups. For men, a close female companion may be dealing with hormonal issues, causing emotional ups and downs that require patience and understanding. Get enough rest, eat nutritious food, and consult a specialist if you notice anything unusual.",
            healthQuote: "Listen to the quiet signals your body sends before they become storms."
        },
        ja: {
            love: "この時期の恋愛は、規則や社会的地位、特定の事情により秘密にしておく必要があるかもしれません。独身の方は、職場の誰かに密かに想いを寄せているものの、まだ気持ちを打ち明けられないかもしれません。相手の素性や交際状況を確認してから先に進みましょう。\n\n交際中の方は、第三者の介入に注意してください。あなたが最初に警戒サインに気づくかもしれませんが、まだ明確な証拠はないでしょう。あるいは、あなた自身が無意識のうちに他の誰かに惹かれ始めているかもしれません。",
            loveQuote: "見えないインクで書かれた恋物語もある。正しい光を待っているだけだ。",
            work: "社内で数字や経理、重要な細部を扱う時期です。仕事は山積みかもしれませんが、うまく対処できています。求職中の方は、経理や細かい作業、執筆、占いの分野にチャンスがあります。芸術・執筆・会計分野のフリーランスは、クライアントから安定した依頼が入るでしょう。",
            workQuote: "沈黙は、騒音よりも多くの答えを秘めている。",
            finance: "収支への意識が高まり、支出と貯蓄を明確に分けた資金計画を立て始めています。使ったぶんを補うための副収入も模索中です。スキルアップや副業のための講座に投資する意欲があります。神秘的な分野に興味があれば、学んで収益化することもできるでしょう。男性は、女性からの借金の申し出に注意してください。本当に必要かどうかに関わらず、貸したお金は戻ってこない可能性があります。",
            financeQuote: "知恵はささやく。分け与える前に、まず宝を守れ、と。",
            health: "女性はホルモンや月経に関する問題で、普段と違う気分の変動が起こるかもしれません。子宮や生殖器系のトラブルにも注意し、異変があれば検査を受けましょう。男性は、身近な女性がホルモンの問題で感情の起伏が激しくなっている場合、忍耐と理解が必要です。十分な休息をとり、栄養のある食事を心がけ、異常があれば専門医に相談しましょう。",
            healthQuote: "嵐になる前に、体が静かに送る信号に耳を傾けよう。"
        },
        ko: {
            love: "이 시기의 연애는 비밀로 유지해야 할 수도 있습니다. 규칙이나 사회적 지위, 특정 조건 때문일 수 있습니다. 싱글이라면 직장 동료에게 몰래 호감을 품고 있지만 아직 마음을 드러내지 못할 수 있습니다. 더 나아가기 전에 상대의 배경과 연애 상태를 반드시 확인하세요.\n\n연인이 있는 분은 제3자의 개입을 주의하세요. 경고 신호를 가장 먼저 눈치챌 수 있지만, 아직 확실한 증거가 없을 수 있습니다. 혹은 자신도 모르게 다른 사람에게 마음이 가고 있을 수도 있습니다.",
            loveQuote: "어떤 사랑 이야기는 보이지 않는 잉크로 쓰여, 적절한 빛을 기다린다.",
            work: "회사 내에서 숫자·회계·중요한 세부 사항을 다루는 시기입니다. 업무가 쌓이고 있지만 잘 처리하고 있습니다. 구직자는 회계·세밀한 업무·글쓰기·점술 분야에서 기회가 있습니다. 예술·글쓰기·회계 분야 프리랜서는 꾸준히 의뢰가 들어올 것입니다.",
            workQuote: "침묵은 소음보다 더 많은 답을 품고 있다.",
            finance: "수입과 지출에 더 관심을 기울이며, 소비와 저축을 명확히 배분하는 재무 계획을 세우기 시작합니다. 소비한 만큼 보충할 부수입을 찾고 있습니다. 기꺼이 지출하는 항목은 기술과 부업을 위한 교육 과정입니다. 신비학에 관심이 있다면 공부해서 수익성 있는 직업으로 전환할 수도 있습니다. 남성은 여성이 돈을 빌려달라고 하는 경우를 주의하세요. 빌려준 돈은 돌아오지 않을 수 있습니다.",
            financeQuote: "지혜가 속삭인다: 나누기 전에 보물을 지켜라.",
            health: "여성은 호르몬과 생리 관련 문제가 있을 수 있으며, 평소와 다른 감정 기복이 나타날 수 있습니다. 자궁이나 생식기 관련 문제가 있을 수 있으니 이상 징후를 살피고 검진을 받으세요. 남성은 가까운 여성이 호르몬 문제로 감정 기복이 심할 수 있으니 인내심을 가져야 합니다. 충분히 쉬고, 영양가 있는 음식을 섭취하며, 이상이 느껴지면 전문의와 상담하세요.",
            healthQuote: "몸이 보내는 조용한 신호에 귀 기울여라, 폭풍이 되기 전에."
        }
    },
    "THE EMPRESS": {
        en: {
            love: "You're ready to open your heart to love, but your homebody nature limits your chances of meeting someone special. If you want love, you may need to step out of your comfort zone. Try starting by reaching out to someone you're interested in.\n\nFor those in a relationship, your partner admires you for who you are. They feel they can rely on you for everything, and this may be a time when you get to know their family better.",
            loveQuote: "Love grows best in the garden of those who dare to nurture it.",
            work: "You're so reliable that people constantly seek your help. If you work in an office, your career may not advance dramatically, but it's stable. This card may represent a generous boss who helps whenever you ask, though you might need to approach them with a little charm. Business owners will see many customers, and job seekers might land a position at a well-equipped large company. A female boss will be very supportive, but a male boss may delegate so much work that you practically become a supervisor yourself.",
            workQuote: "Abundance comes to those who give generously of their gifts.",
            finance: "Life is fairly comfortable. You may receive a windfall or a lump sum that can be invested in business or real estate. Salaried workers have stability, with good benefits even if not flashy. You may not have much cash but hold valuable assets. If you need help, you can borrow from respected elders. Those who are the family breadwinner need to manage money wisely, as family members may suddenly ask for loans.",
            financeQuote: "Plenty flows to those who hold their wealth with open hands and wise hearts.",
            health: "Watch out for overeating, especially sweets and carbs. Those trying to lose weight may experience intense food cravings. Office workers should be careful of back pain from poor sitting posture and avoid leaning too heavily to one side. Even if there are no symptoms now, it could become a long-term problem. Control your diet, eat plenty of fruits and vegetables, drink lots of water, and maintain proper sitting posture. If you sit for long periods, get up and stretch regularly.",
            healthQuote: "Nourish your body as tenderly as you would a beloved garden."
        },
        ja: {
            love: "心を開く準備はできていますが、家で過ごすことが多いため、特別な出会いのチャンスが限られています。恋愛を望むなら、快適な空間から一歩踏み出す必要があるかもしれません。気になる人に自分から連絡してみることから始めましょう。\n\n交際中の方は、パートナーがありのままのあなたを尊敬しています。すべてを頼れる存在だと感じており、この時期はパートナーの家族とより深く知り合う機会があるかもしれません。",
            loveQuote: "愛は、育てる勇気を持つ者の庭でこそ最もよく育つ。",
            work: "あなたはとても頼りにされており、常に周囲から助けを求められます。オフィス勤務の場合、キャリアが劇的に飛躍することはないかもしれませんが、安定しています。このカードは、頼めば助けてくれる寛大な上司を表すこともあります。ただし、少しの愛嬌が必要かもしれません。経営者には多くのお客様が訪れ、求職者は設備の整った大企業に就職できるかもしれません。",
            workQuote: "豊かさは、惜しみなく才能を分け与える者のもとに訪れる。",
            finance: "生活はかなり快適です。臨時収入やまとまったお金を受け取り、事業や不動産に投資できるかもしれません。サラリーマンは華やかではなくても安定した福利厚生があります。現金は多くなくても価値ある資産を持っているかもしれません。助けが必要なら、年長の尊敬する方から借りることもできるでしょう。家計を支えている方は、家族から突然借金を頼まれることがあるので、賢く管理しましょう。",
            financeQuote: "開いた手と賢い心で富を持つ者のもとに、豊かさは流れてくる。",
            health: "食べ過ぎ、特に甘いものや炭水化物の取りすぎに注意しましょう。ダイエット中の方は強い食欲に悩まされるかもしれません。デスクワークの方は座り姿勢の悪さによる腰痛に注意し、片側に偏りすぎないようにしましょう。今は症状がなくても、長期的な問題になる可能性があります。食事を管理し、果物や野菜を十分にとり、水をたくさん飲み、正しい座り姿勢を保ちましょう。",
            healthQuote: "大切な庭を慈しむように、あなたの体も優しく養おう。"
        },
        ko: {
            love: "사랑에 마음을 열 준비가 되어 있지만, 집에 머무르는 성향 때문에 특별한 사람을 만날 기회가 제한됩니다. 사랑을 원한다면 안전지대를 벗어나야 할 수도 있습니다. 관심 있는 사람에게 먼저 연락해보는 것부터 시작해보세요.\n\n연인이 있는 분은 상대가 당신의 있는 모습 그대로를 존경합니다. 모든 것을 의지할 수 있다고 느끼며, 상대 가족과 더 가까워지는 시기가 될 수 있습니다.",
            loveQuote: "사랑은 가꾸는 자의 정원에서 가장 잘 자란다.",
            work: "너무 믿음직해서 사람들이 끊임없이 도움을 요청합니다. 사무직이라면 커리어가 극적으로 올라가지는 않지만 안정적입니다. 이 카드는 부탁하면 도와주는 관대한 상사를 나타낼 수 있습니다. 사업가는 손님이 많을 것이고, 구직자는 시설이 잘 갖춰진 대기업에 취직할 수 있습니다.",
            workQuote: "풍요는 자신의 재능을 아낌없이 나누는 자에게 찾아온다.",
            finance: "비교적 여유로운 생활입니다. 뜻밖의 목돈이 들어와 사업이나 부동산에 투자할 수 있습니다. 직장인은 화려하지 않아도 좋은 복지로 안정적입니다. 현금은 많지 않지만 가치 있는 자산을 보유하고 있을 수 있습니다. 도움이 필요하면 존경하는 어르신에게 빌릴 수 있습니다. 가족의 생계를 책임지는 분은 가족이 갑자기 대출을 요청할 수 있으니 현명하게 관리하세요.",
            financeQuote: "열린 손과 지혜로운 마음으로 재물을 다루면 풍요가 흐른다.",
            health: "과식, 특히 단 음식과 탄수화물에 주의하세요. 다이어트 중이라면 강한 식욕을 느낄 수 있습니다. 사무직은 잘못된 좌식 자세로 인한 허리 통증에 주의하고, 한쪽으로 기울어 앉지 마세요. 지금은 증상이 없더라도 장기적인 문제가 될 수 있습니다. 식단을 조절하고 과일·채소를 충분히 섭취하며, 물을 많이 마시고, 장시간 앉아 있다면 정기적으로 일어나 스트레칭하세요.",
            healthQuote: "사랑하는 정원을 가꾸듯 몸도 부드럽게 돌보아라."
        }
    },
    "THE EMPEROR": {
        en: {
            love: "If you're a woman, there's a chance of meeting an older man with leadership qualities who is rather serious and reserved. He may come into your life through mutual acquaintances or social media. If you're talking to someone, he may reply slowly today due to meetings or important duties. If you're a man, work stress might make you come across as harsh toward your partner or someone you're getting to know. Be careful with your communication and emotions.\n\nFor those in a relationship, work stress may cause you or your partner to become distant, cold, or make decisions without consulting each other. Be mindful of communication and emotional control.",
            loveQuote: "Even the strongest fortress needs a gentle door for love to enter.",
            work: "Those taking government exams may receive good news. If you're not currently job hunting, your organization may announce new regulations that feel restrictive. If there's a restructuring, you might get a new boss who is an older man or a foreigner. This period requires following orders more than being creative, or you may need to coordinate with government agencies.",
            workQuote: "Structure is the scaffold upon which great achievements are built.",
            finance: "Finances aren't exciting, with regular expenses coming due on schedule. Major expenses likely involve an older male relative or benefactor. While stressful and pressured, it's still manageable. If you're in financial trouble, you can borrow from a respected elder. If you have a romantic partner, just let them know and they'll be ready to help. Those with debts should be prepared for collection calls or warning letters.",
            financeQuote: "Discipline today builds the empire of tomorrow.",
            health: "Stress and pressure are high during this period and may affect your health. Those with blood pressure issues or cerebrovascular problems need to be especially careful. Don't skip doctor appointments and take your medication consistently. Watch out for heavily spiced, fried, and fatty foods that can throw your body's balance off. Find ways to relieve stress such as meditation, light exercise, or enjoyable hobbies. Control your diet and get enough rest.",
            healthQuote: "A ruler who neglects their own well-being rules nothing at all."
        },
        ja: {
            love: "女性の場合、リーダーシップがあり真面目で寡黙な年上の男性と出会うチャンスがあります。共通の知人やSNSを通じて知り合うかもしれません。連絡を取り合っている人がいる場合、今日は会議や重要な任務で返信が遅くなることも。男性の場合、仕事のストレスがパートナーや気になる人への態度を厳しくしてしまうかもしれません。コミュニケーションと感情のコントロールに気をつけましょう。\n\n交際中の方は、仕事のストレスであなたかパートナーが冷たくなったり、相談なく決断を下してしまうことがあります。コミュニケーションと感情のコントロールを意識しましょう。",
            loveQuote: "どんな堅固な要塞にも、愛が入るための優しい扉は必要だ。",
            work: "公務員試験を受ける方には良い知らせがあるかもしれません。転職を考えていない場合でも、組織が新しい規則を発表し、窮屈に感じることがあるでしょう。組織再編があれば、年配の男性や外国人の新しい上司がつく可能性があります。この時期は創造性よりも指示に従うことが求められるか、行政機関との調整が必要になるかもしれません。",
            workQuote: "偉大な業績は、しっかりとした構造の上に築かれる。",
            finance: "財務面では刺激に欠け、定期的な支出が予定通り発生します。大きな出費は年配の男性の親族や後援者に関するものになりそうです。ストレスやプレッシャーはありますが、まだ対処可能な範囲です。経済的に困っている場合は、年長の尊敬する方から借りることができます。パートナーがいる場合は状況を伝えれば、喜んで助けてくれるでしょう。",
            financeQuote: "今日の規律が、明日の帝国を築く。",
            health: "この時期はストレスとプレッシャーが高く、健康に影響を及ぼすかもしれません。血圧や脳血管の問題がある方は特に注意が必要です。通院を怠らず、薬をきちんと服用しましょう。辛い料理、揚げ物、脂っこい食事は体のバランスを崩す原因になります。瞑想や軽い運動、趣味など、ストレス解消法を見つけましょう。",
            healthQuote: "自分の健康をないがしろにする支配者は、何も支配していないのと同じだ。"
        },
        ko: {
            love: "여성이라면 리더십이 있고 다소 진지하며 과묵한 연상의 남성을 만날 수 있습니다. 지인 소개나 SNS를 통해 인연이 닿을 수 있습니다. 남성이라면 업무 스트레스로 인해 연인이나 알아가는 사람에게 딱딱하게 대할 수 있으니 의사소통과 감정 조절에 신경 쓰세요.\n\n연인이 있는 분은 업무 스트레스로 서로 멀어지거나 차가워질 수 있고, 상의 없이 일방적으로 결정을 내릴 수 있습니다. 소통과 감정 조절에 유의하세요.",
            loveQuote: "아무리 견고한 성채에도 사랑이 들어올 부드러운 문이 필요하다.",
            work: "공무원 시험을 치르는 분은 좋은 소식을 들을 수 있습니다. 구직 중이 아니라면, 회사에서 답답하게 느껴지는 새 규정을 발표할 수 있습니다. 조직 개편이 있다면 연상이거나 외국인인 새 상사를 맞이할 수 있습니다. 이 시기는 창의성보다 지시를 따르는 것이 중요하며, 관공서와 협조가 필요할 수도 있습니다.",
            workQuote: "체계는 위대한 성취가 세워지는 발판이다.",
            finance: "재정이 흥미롭지는 않으며, 정기 지출이 예정대로 나갑니다. 큰 지출은 연상의 남성 친인척이나 후원자와 관련될 가능성이 높습니다. 스트레스와 압박이 있지만 감당 가능한 수준입니다. 경제적 어려움이 있으면 존경하는 어른에게 빌릴 수 있습니다. 빚이 있는 분은 독촉 전화나 경고 서신에 대비하세요.",
            financeQuote: "오늘의 절제가 내일의 제국을 세운다.",
            health: "이 시기에는 스트레스와 압박이 심해 건강에 영향을 줄 수 있습니다. 혈압이나 뇌혈관 문제가 있는 분은 특히 주의하세요. 병원 진료를 거르지 말고 약을 꾸준히 복용하세요. 맵고 기름진 음식은 몸의 균형을 무너뜨릴 수 있으니 조심하세요. 명상·가벼운 운동·즐거운 취미 등으로 스트레스를 해소하고, 식단 조절과 충분한 휴식을 취하세요.",
            healthQuote: "자신의 건강을 소홀히 하는 지도자는 아무것도 다스리지 못한다."
        }
    },
    "THE HIEROPHANT": {
        en: {
            love: "Singles may meet someone who is naturally caring and good at listening and giving advice. But don't expect romance just yet, as they may treat everyone this kindly.\n\nFor those in a relationship, if you've recently gone through conflict, a mediator may be needed to help resolve things. One partner may have become more interested in spiritual matters, causing the relationship to feel less passionate. Physical intimacy may not be as exciting as it once was.",
            loveQuote: "Patience is the quiet prayer that brings love to those who wait.",
            work: "There's an opportunity to attend meetings with senior figures in your organization. If there's a restructuring, you may get a new boss who is somewhat conservative but works well with the team. There might be special training sessions or guest speakers. It could be time for annual health check-ups. If there's conflict within the team, a senior figure will step in to help resolve it.",
            workQuote: "The greatest lessons come from those who have walked the path before you.",
            finance: "You'll get a regular salary increase, but nothing exciting. If you want higher pay, you'll need to speak directly with management, though company policy may not allow dramatic raises. Your boss can help to a degree, but switching jobs might yield better compensation. For those seeking scholarships, there's a good chance of receiving positive news.",
            financeQuote: "Steady hands and honest work build fortunes that last.",
            health: "For those with existing conditions, symptoms may flare up, requiring a follow-up visit. This isn't a new diagnosis but routine monitoring. For those without existing conditions, someone may offer you a health insurance plan, or your company may arrange annual health screenings. Follow your treatment plan strictly, never skip appointments, and maintain consistent healthcare. This may be a good time to get health insurance or a preventive check-up.",
            healthQuote: "Healing begins when you honor the rituals of self-care."
        },
        ja: {
            love: "独身の方は、思いやりがあり、聞き上手でアドバイス上手な人と出会うかもしれません。ただし、すぐに恋愛を期待しないでください。その人は誰にでも同じように親切な可能性があります。\n\n交際中の方は、最近衝突があった場合、仲裁者が問題解決を手伝ってくれるかもしれません。パートナーの一方がスピリチュアルなことに興味を深め、関係の情熱が薄れることも。肉体的な親密さも以前ほどの興奮がないかもしれません。",
            loveQuote: "忍耐は、愛を待つ者に届ける静かな祈りだ。",
            work: "組織の幹部との会議に出席する機会があります。組織再編があれば、保守的だがチームとうまくやれる新しい上司がつくかもしれません。特別な研修やゲスト講師による講演もあるでしょう。年次健康診断の時期かもしれません。チーム内に対立があれば、年長者が仲裁に入ってくれます。",
            workQuote: "最も偉大な教えは、先にその道を歩んだ者から授かるものだ。",
            finance: "定期昇給はありますが、目を見張るほどではありません。給与アップを望むなら、経営陣に直接話す必要がありますが、会社の方針で大幅な昇給は難しいかもしれません。上司はある程度助けてくれますが、転職した方がより良い条件を得られるかもしれません。奨学金を申請中の方は、良い知らせを受け取る可能性があります。",
            financeQuote: "着実な手と誠実な仕事が、長続きする財産を築く。",
            health: "持病がある方は症状が再燃し、フォローアップ受診が必要になるかもしれません。新たな診断ではなく、定期的な経過観察です。持病がない方は、健康保険への加入を勧められたり、会社の年次健康診断があるかもしれません。治療計画を厳守し、通院を欠かさず、一貫した健康管理を続けましょう。",
            healthQuote: "セルフケアの習慣を大切にすることから、癒しは始まる。"
        },
        ko: {
            love: "싱글이라면 타고난 배려심으로 잘 들어주고 조언도 잘하는 사람을 만날 수 있습니다. 하지만 아직 로맨스를 기대하지는 마세요. 모두에게 이렇게 친절한 사람일 수 있습니다.\n\n연인이 있는 분은 최근 갈등을 겪었다면 중재자가 필요할 수 있습니다. 한쪽이 영적인 문제에 더 관심을 갖게 되면서 관계의 열정이 줄어들 수 있습니다. 신체적 친밀감도 예전만큼 흥미롭지 않을 수 있습니다.",
            loveQuote: "인내는 기다리는 자에게 사랑을 가져다주는 조용한 기도이다.",
            work: "조직 내 고위 인사와의 회의에 참석할 기회가 있습니다. 조직 개편이 있다면 다소 보수적이지만 팀과 잘 협력하는 새 상사를 맞이할 수 있습니다. 특별 교육이나 초청 강연이 있을 수 있습니다. 연례 건강검진 시기일 수 있습니다. 팀 내 갈등이 있다면 선배가 나서서 해결해줄 것입니다.",
            workQuote: "가장 큰 가르침은 그 길을 먼저 걸어본 이에게서 온다.",
            finance: "정기 급여 인상은 있지만 특별할 것은 없습니다. 더 높은 급여를 원한다면 경영진에게 직접 말해야 하지만, 회사 정책상 큰 폭의 인상은 어려울 수 있습니다. 이직하는 것이 더 나은 보상을 받을 수 있습니다. 장학금을 신청한 분은 좋은 소식을 받을 가능성이 높습니다.",
            financeQuote: "꾸준한 손과 정직한 노동이 오래가는 재산을 만든다.",
            health: "기존 질환이 있는 분은 증상이 악화되어 재방문이 필요할 수 있습니다. 새로운 진단이 아니라 정기 모니터링입니다. 건강한 분은 건강보험을 권유받거나, 회사에서 연례 건강검진을 마련할 수 있습니다. 치료 계획을 철저히 따르고, 진료를 절대 거르지 마세요. 건강보험 가입이나 예방 검진을 받기에 좋은 시기입니다.",
            healthQuote: "치유는 자기 돌봄의 의식을 존중할 때 시작된다."
        }
    },
    "THE LOVERS": {
        en: {
            love: "Singles have a strong chance of finding an impressive new love during this period. It will be a romance that develops quickly, as if everything was arranged for you to meet. Whether through friends or social media, you'll feel like this person is \"the one\" from the very first encounter.\n\nFor those in a relationship, you may plan activities together such as traveling or starting a new project. But be cautious, as the romance that's about to bloom might not necessarily come from your current partner.",
            loveQuote: "When two hearts recognize each other, the universe conspires in their favor.",
            work: "There's a good chance of landing a new job you love. For those already employed, your team is supportive and wonderful. There may be a new department forming, and you could be put in charge of an important project. Business owners will find great new partners they click with, with opportunities to expand. Negotiations will go smoothly.",
            workQuote: "The best partnerships are born when passion meets purpose.",
            finance: "You see opportunities and invest your savings in business ventures, possibly with one or two partners. Existing business owners will gain new partners who improve cash flow. On the personal finance side, you may be invited to social events frequently, and fear of losing face leads to overspending on clothes and appearance. Windfalls are more likely to come from the opposite sex or your partner than from your own efforts.",
            financeQuote: "Shared dreams multiply wealth when trust leads the way.",
            health: "Office workers should watch out for arm, neck, shoulder, and upper back pain, possibly from overuse or overexercising. Also be mindful of blood sugar levels and cut back on sweets and carbs, especially if you already have high cholesterol and blood pressure, as diabetes risk increases. Adjust your work habits, stretch regularly, control your diet, and exercise moderately. Consult a doctor if you notice any irregularities.",
            healthQuote: "Two hearts in harmony keep each other well."
        },
        ja: {
            love: "独身の方は、この時期に素敵な新しい恋に出会える可能性が高いです。まるですべてが仕組まれたかのように、急速に発展する恋愛になるでしょう。友人やSNSを通じて出会い、最初の瞬間から「運命の人」だと感じるかもしれません。\n\n交際中の方は、一緒に旅行したり新しいプロジェクトを始めたりする計画があるかもしれません。ただし注意が必要です。花開こうとしている恋が、必ずしも今のパートナーとの間とは限りません。",
            loveQuote: "二つの心が認め合うとき、宇宙はその味方をする。",
            work: "好きな仕事に就けるチャンスがあります。すでに働いている方は、チームが協力的で素晴らしい環境です。新しい部署が設立され、重要なプロジェクトを任されるかもしれません。経営者は気の合う新しいパートナーを見つけ、事業拡大の機会があります。交渉はスムーズに進むでしょう。",
            workQuote: "最高のパートナーシップは、情熱と目的が出会うところに生まれる。",
            finance: "チャンスを見つけて貯蓄をビジネスに投資するかもしれません。一人か二人のパートナーとの共同投資の可能性もあります。既存の経営者は、キャッシュフローを改善してくれる新しいパートナーを得るでしょう。個人の財務面では、社交イベントに頻繁に誘われ、見栄のために服や外見にお金をかけすぎるかもしれません。臨時収入は自分の努力よりも、異性やパートナーからもたらされる傾向があります。",
            financeQuote: "信頼が導くとき、共有された夢は富を倍増させる。",
            health: "デスクワークの方は、腕、首、肩、背中上部の痛みに注意しましょう。使いすぎや運動のしすぎが原因かもしれません。また、血糖値にも気を配り、甘いものや炭水化物を控えましょう。特にすでにコレステロールや血圧が高い方は、糖尿病リスクが高まります。作業習慣を見直し、定期的にストレッチをし、食事を管理し、適度に運動しましょう。",
            healthQuote: "調和した二つの心は、互いの健康を守り合う。"
        },
        ko: {
            love: "싱글은 이 시기에 인상적인 새로운 사랑을 찾을 가능성이 높습니다. 모든 것이 당신들의 만남을 위해 준비된 것처럼 빠르게 발전하는 로맨스가 될 것입니다. 친구 소개든 SNS든, 첫 만남부터 이 사람이 '운명'이라는 느낌을 받을 것입니다.\n\n연인이 있는 분은 여행이나 새로운 프로젝트 등 함께할 활동을 계획할 수 있습니다. 다만 곧 피어날 로맨스가 반드시 현재 파트너에게서 오는 것은 아닐 수 있으니 주의하세요.",
            loveQuote: "두 마음이 서로를 알아볼 때, 우주가 그 편에 선다.",
            work: "좋아하는 새 직장을 구할 가능성이 높습니다. 이미 취업한 분은 팀이 협조적이고 훌륭합니다. 새 부서가 생길 수 있고, 중요한 프로젝트를 맡게 될 수 있습니다. 사업가는 함께 성장할 훌륭한 파트너를 찾아 사업을 확장할 기회가 있습니다. 협상이 순조롭게 진행될 것입니다.",
            workQuote: "열정이 목적을 만날 때 최고의 파트너십이 탄생한다.",
            finance: "기회를 발견하고 저축을 사업에 투자합니다. 한두 명의 파트너와 함께할 수도 있습니다. 기존 사업가는 현금 흐름을 개선하는 새 파트너를 얻게 됩니다. 개인 재정 면에서는 사교 행사에 자주 초대받아 체면 때문에 의류와 외모에 과소비할 수 있습니다. 뜻밖의 수입은 자신의 노력보다 이성이나 파트너에게서 올 가능성이 높습니다.",
            financeQuote: "신뢰가 이끄는 공유된 꿈은 재물을 배가시킨다.",
            health: "사무직은 팔·목·어깨·등 상부 통증에 주의하세요. 과사용이나 과도한 운동 때문일 수 있습니다. 혈당 수치에도 신경 쓰고 단 음식과 탄수화물을 줄이세요. 이미 고콜레스테롤·고혈압이 있다면 당뇨 위험이 높아집니다. 업무 습관을 개선하고, 정기적으로 스트레칭하며, 식단을 조절하고, 이상이 있으면 의사와 상담하세요.",
            healthQuote: "조화로운 두 마음은 서로의 건강도 지켜준다."
        }
    },
    "THE CHARIOT": {
        en: {
            love: "Singles have a chance of meeting someone who has just transferred in or received a significant position. They're talented, a natural leader, and highly driven. Being close to them will give you inspiration and fresh perspectives on life. But be cautious, as they may have multiple admirers.\n\nFor those in a relationship, your partner may receive an important work assignment, causing them to prioritize work over romance. If you're in a long-distance relationship, you may get to see each other soon.",
            loveQuote: "Love is the journey where two souls race toward the same horizon.",
            work: "You'll be assigned an important project. Job seekers have a good chance of hearing positive news. Expect hard work and perseverance, with frequent travel and meetings. Despite many obstacles and competitors, you won't give up. You may get a new boss who is extremely driven, pushing you to work even harder.",
            workQuote: "Victory belongs to those who charge forward without looking back.",
            finance: "Your financial liquidity isn't bad during this period. There are opportunities for extra income from business travel or position allowances. Job changers can negotiate a satisfying salary, and hitting targets means additional performance bonuses. On the expense side, you may have car-related costs, whether repairs, travel expenses, or even purchasing a new vehicle.",
            financeQuote: "Fortune favors those who steer their own chariot with confidence.",
            health: "Be cautious of health issues from prolonged sitting and driving, especially if you travel frequently. Get lumbar support equipment and maintain proper seating posture. Also watch out for travel accidents. Some may need a wheelchair and physical therapy. Drive carefully, take breaks on long trips, and use ergonomic accessories for comfort. Prevention is better than cure; take extra care of your health and be especially cautious when traveling.",
            healthQuote: "Even the swiftest chariot must pause to mend its wheels."
        },
        ja: {
            love: "独身の方は、最近異動してきた人や重要なポジションに就いた人と出会うチャンスがあります。才能があり、生まれながらのリーダーで、非常に意欲的な人です。近くにいるとインスピレーションや新しい視点をもらえるでしょう。ただし、複数のファンがいるかもしれないので注意が必要です。\n\n交際中の方は、パートナーが重要な仕事を任され、仕事を恋愛より優先するかもしれません。遠距離恋愛中なら、もうすぐ会えるかもしれません。",
            loveQuote: "愛とは、二つの魂が同じ地平線に向かって駆ける旅路だ。",
            work: "重要なプロジェクトを任されるでしょう。求職者は良い知らせを聞ける可能性が高いです。ハードワークと忍耐が求められ、出張や会議が頻繁になります。多くの障害や競争相手がいても、あなたは諦めません。非常にやる気のある新しい上司がつき、さらに働くことを求められるかもしれません。",
            workQuote: "勝利は、振り返らずに前へ突き進む者のものだ。",
            finance: "この時期の資金流動性は悪くありません。出張や役職手当による副収入のチャンスがあります。転職者は満足のいく給与を交渉でき、目標達成でパフォーマンスボーナスも期待できます。支出面では、車の修理、旅費、新車購入など、車関連の費用がかかりそうです。",
            financeQuote: "運命は、自信を持って自らの戦車を操る者に微笑む。",
            health: "長時間の座位や運転による健康問題に注意しましょう。頻繁に移動する方は特にです。腰のサポート器具を用意し、正しい座り姿勢を保ちましょう。交通事故にも注意が必要です。安全運転を心がけ、長距離移動では休憩を取り、快適さのためにエルゴノミクス用品を活用しましょう。",
            healthQuote: "最速の戦車も、車輪を直すために立ち止まらなければならない。"
        },
        ko: {
            love: "싱글은 최근 전근을 왔거나 중요한 직책을 맡은 사람을 만날 수 있습니다. 재능이 있고, 타고난 리더이며, 의욕이 넘칩니다. 가까이 하면 영감과 삶에 대한 새로운 시각을 얻을 수 있습니다. 하지만 여러 명의 추종자가 있을 수 있으니 주의하세요.\n\n연인이 있는 분은 상대가 중요한 업무를 맡아 일을 연애보다 우선시할 수 있습니다. 장거리 연애 중이라면 곧 만남의 기회가 있을 수 있습니다.",
            loveQuote: "사랑은 두 영혼이 같은 지평선을 향해 달리는 여정이다.",
            work: "중요한 프로젝트를 맡게 됩니다. 구직자는 좋은 소식을 들을 가능성이 높습니다. 열심히 일하고 인내해야 하며, 잦은 출장과 회의가 있을 것입니다. 많은 장애물과 경쟁자에도 불구하고 포기하지 않을 것입니다. 매우 의욕적인 새 상사를 만나 더 열심히 일하게 될 수 있습니다.",
            workQuote: "승리는 뒤돌아보지 않고 전진하는 자의 것이다.",
            finance: "이 시기 재정 유동성은 나쁘지 않습니다. 출장비나 직책 수당으로 추가 수입 기회가 있습니다. 이직자는 만족스러운 급여를 협상할 수 있고, 목표 달성 시 성과급이 추가됩니다. 지출 면에서는 차량 관련 비용이 있을 수 있습니다. 수리비·여행 경비 또는 새 차 구매 등이 해당됩니다.",
            financeQuote: "행운은 자신의 전차를 자신감 있게 모는 자의 편이다.",
            health: "장시간 앉아서 운전하는 것으로 인한 건강 문제에 주의하세요. 특히 이동이 잦은 분은 요추 지지대를 구하고 올바른 좌석 자세를 유지하세요. 교통사고에도 조심하세요. 운전 시 주의하고, 장거리 여행 시 휴식을 취하며, 인체공학적 액세서리를 활용하세요.",
            healthQuote: "가장 빠른 전차도 바퀴를 고칠 때는 멈춰야 한다."
        }
    },
    "STRENGTH": {
        en: {
            love: "Singles should thoroughly check the background of anyone pursuing them, as they may not truly be single. Even if they are, there may be a highly influential family member, especially a woman like a mother or older sister, who has a strong say in their decisions. You'll need to pass these hurdles before the relationship can work.\n\nFor those in a relationship, you may sense your partner behaving unusually, making you want to keep a closer eye on them. What you suspect may not be anything serious, but if you feel they're hiding something, you're likely to find out soon.",
            loveQuote: "True strength in love is the courage to trust and the grace to forgive.",
            work: "The work you've been given is significantly harder than before. You're dealing with problems others have passed on, having to communicate with impatient and difficult people. Even when angry, you must remain gentle and composed. Seniors may be closely monitoring your performance. Job seekers should prepare more thoroughly for interviews and tests, as this round won't be as easy as before.",
            workQuote: "Gentle persistence conquers what brute force never could.",
            finance: "You're trying to organize your finances more systematically. Most expenses are unavoidable fixed costs, especially money needed to care for elderly relatives and pets. As for cash, you may not have much right now, particularly if you've recently invested in business or the stock market. You'll have to wait a while before you can convert those assets back to cash. Be patient and hang in there for now.",
            financeQuote: "Quiet endurance is the root from which lasting wealth grows.",
            health: "You may experience common ailments like fever, headache, feeling hot, or slight blood pressure elevation. Most can be resolved with rest and medication. The elderly and those with chronic conditions need to be strict about diet and lifestyle. Find stress-relieving activities, watch out for forgetfulness, and beware of animal bites or stings. Stay away from unfamiliar animals. Get adequate rest, maintain basic health care, and be mindful in your daily life.",
            healthQuote: "The fiercest battles are won by the gentlest warriors within."
        },
        ja: {
            love: "独身の方は、アプローチしてくる人の身元をしっかり確認しましょう。本当に独身ではないかもしれません。独身だとしても、母親や姉のような影響力の強い女性の家族がいて、決定権を握っている可能性があります。関係を築くには、その壁を乗り越える必要があります。\n\n交際中の方は、パートナーの様子がいつもと違うと感じ、注意深く見守りたくなるかもしれません。疑っていることは深刻なことではないかもしれませんが、何か隠していると感じるなら、やがて真実が明らかになるでしょう。",
            loveQuote: "愛における本当の強さとは、信じる勇気と許す優雅さだ。",
            work: "以前よりもかなり難しい仕事を任されています。他の人が回した問題に対処し、気が短く扱いにくい人たちとコミュニケーションを取らなければなりません。怒りを感じても、穏やかで冷静でいる必要があります。上層部があなたのパフォーマンスを注視しているかもしれません。求職者は面接や試験の準備をより入念に行いましょう。今回は以前ほど簡単ではありません。",
            workQuote: "穏やかな粘り強さは、力ずくでは決してなし得ないことを成し遂げる。",
            finance: "家計をより体系的に整理しようとしています。支出のほとんどは避けられない固定費で、特に高齢の親族やペットの世話にかかるお金です。現金は今あまり手元にないかもしれません。最近、事業や株式市場に投資したばかりなら特にそうです。資産を現金に戻すにはしばらく待つ必要があるでしょう。今は忍耐の時です。",
            financeQuote: "静かな忍耐こそが、永続する富を育てる根だ。",
            health: "発熱、頭痛、ほてり、軽度の血圧上昇など、一般的な体調不良を経験するかもしれません。ほとんどは休息と薬で解決できます。高齢者や持病のある方は食事と生活習慣を厳しく管理する必要があります。ストレス解消法を見つけ、物忘れに注意し、動物の噛み傷や刺し傷にも気をつけましょう。",
            healthQuote: "最も激しい戦いは、内なる最も穏やかな戦士が勝ち取るものだ。"
        },
        ko: {
            love: "싱글이라면 관심을 보이는 사람의 배경을 철저히 확인하세요. 진정한 싱글이 아닐 수 있습니다. 싱글이더라도 어머니나 언니 같은 영향력 있는 여성 가족이 결정에 큰 영향을 미칠 수 있습니다. 이런 관문을 통과해야 관계가 성사됩니다.\n\n연인이 있는 분은 상대의 행동이 평소와 다르다는 걸 느끼고 더 주의 깊게 지켜보고 싶을 수 있습니다. 의심하는 것은 심각한 문제가 아닐 수 있지만, 무언가를 숨기고 있다면 곧 알게 될 가능성이 높습니다.",
            loveQuote: "사랑에서의 진정한 힘은 믿을 용기와 용서할 품격이다.",
            work: "맡은 업무가 이전보다 훨씬 어렵습니다. 다른 사람들이 넘긴 문제를 처리하고, 성급하고 까다로운 사람들과 소통해야 합니다. 화가 나더라도 부드럽고 침착하게 대해야 합니다. 선배들이 당신의 성과를 면밀히 관찰할 수 있습니다. 구직자는 면접과 시험 준비를 더 철저히 하세요.",
            workQuote: "부드러운 끈기가 무력으로는 절대 이길 수 없는 것을 이긴다.",
            finance: "재정을 더 체계적으로 정리하려 하고 있습니다. 대부분의 지출은 어르신과 반려동물 돌봄 등 피할 수 없는 고정 비용입니다. 현금이 많지 않을 수 있습니다. 특히 최근 사업이나 주식에 투자한 경우, 자산을 현금으로 전환하려면 시간이 필요합니다. 인내하며 버텨야 할 시기입니다.",
            financeQuote: "조용한 인내가 영속하는 부의 뿌리이다.",
            health: "발열·두통·더위·혈압 상승 같은 일반적인 증상이 있을 수 있습니다. 대부분 휴식과 약으로 해결됩니다. 고령자와 만성 질환자는 식단과 생활 습관을 엄격히 관리하세요. 스트레스 해소 활동을 찾고, 건망증에 주의하며, 동물에게 물리지 않도록 조심하세요. 충분히 쉬고 기본적인 건강 관리를 유지하세요.",
            healthQuote: "가장 치열한 전투는 내면의 가장 부드러운 전사가 이긴다."
        }
    },
    "THE HERMIT": {
        en: {
            love: "Singles, you're choosing to be alone and spend time with yourself during this period. Even though you feel lonely, you're not ready to open your heart to anyone. If you've recently ended a relationship, you may still be following their life through social media. The only person who might make your heart flutter right now is probably a fictional character from the drama you're watching.\n\nFor those in a relationship, things are in a dull phase. Physical intimacy is nearly nonexistent. Even sharing the same bed, you each fall asleep separately. Reigniting the spark may feel as awkward as starting all over again.",
            loveQuote: "In solitude, the heart learns what it truly seeks.",
            work: "You'll get to work with a highly experienced expert who may come to teach or oversee your project. You might spend free time studying or researching. Your work quality is praised, but you may have minimal interaction with colleagues, preferring to work alone. Job seekers have opportunities in education or consulting. Freelancers, especially writers and photographers, will have plenty of work.",
            workQuote: "Wisdom is found in the silence between the noise of the world.",
            finance: "You're living frugally, avoiding social outings, and turning down almost every invitation. You may have to maintain this lifestyle for a while until your financial situation improves. Anyone hoping for windfalls during this time will be disappointed. But if you want extra income, try freelance document work, article writing, or tutoring for some additional earnings.",
            financeQuote: "Sometimes the richest path is the one walked in quiet simplicity.",
            health: "Mental health may be more of a concern than physical health, including stress, depression, withdrawal, and not wanting to talk to anyone. For those with unexplained symptoms, you may find a specialist with a new treatment approach. Some may need to decide on an endoscopic procedure. Find someone to talk to, don't keep stress bottled up, and consult a professional if you're struggling with mental health.",
            healthQuote: "The lantern of self-awareness illuminates the path to healing."
        },
        ja: {
            love: "独身の方は、この時期は一人の時間を選んでいます。寂しさを感じていても、誰にも心を開く準備ができていません。最近別れた方は、SNSで元パートナーの近況を追っているかもしれません。今あなたの心を揺さぶるのは、見ているドラマの登場人物くらいかもしれません。\n\n交際中の方は、マンネリの時期に入っています。肉体的な親密さはほぼなく、同じベッドにいても別々に眠りについています。再び火をつけようとしても、最初からやり直すような気まずさを感じるかもしれません。",
            loveQuote: "孤独の中で、心は本当に求めているものを学ぶ。",
            work: "非常に経験豊富な専門家と一緒に仕事をする機会があります。指導や監督のために来るかもしれません。空き時間には勉強やリサーチに費やすかもしれません。仕事の質は評価されていますが、同僚との交流は最小限で、一人で作業することを好むでしょう。求職者は教育やコンサルティング分野にチャンスがあります。フリーランスの方は、特に執筆や写真の仕事が豊富です。",
            workQuote: "知恵は、世界の喧騒の間にある静寂の中に見つかる。",
            finance: "質素な生活を送り、外出を避け、ほぼすべての誘いを断っています。経済状況が改善するまで、しばらくこの生活を続ける必要があるかもしれません。この時期に臨時収入を期待している人は失望するでしょう。副収入が欲しいなら、フリーランスの文書作成、記事執筆、家庭教師などで少し稼ぐことができます。",
            financeQuote: "時に最も豊かな道は、静かな素朴さの中を歩む道だ。",
            health: "身体的な健康よりも精神的な健康が心配な時期です。ストレス、うつ、引きこもり、誰とも話したくない気持ちになるかもしれません。原因不明の症状がある方は、新しい治療法を持つ専門医に出会えるかもしれません。信頼できる人に話を聞いてもらい、ストレスを溜め込まないようにし、メンタルヘルスに悩んでいるなら専門家に相談しましょう。",
            healthQuote: "自己認識のランタンが、癒しへの道を照らし出す。"
        },
        ko: {
            love: "싱글인 당신은 이 시기에 혼자 시간을 보내기를 선택하고 있습니다. 외로움을 느끼면서도 누구에게도 마음을 열 준비가 되어 있지 않습니다. 최근 이별을 겪었다면 SNS를 통해 여전히 상대의 삶을 지켜보고 있을 수 있습니다. 지금 당신의 마음을 설레게 할 유일한 사람은 아마 드라마 속 주인공일 것입니다.\n\n연인이 있는 분은 무미건조한 시기입니다. 신체적 친밀감이 거의 없습니다. 같은 침대에서도 각자 따로 잠듭니다. 다시 불꽃을 지피는 것이 처음 시작하는 것만큼 어색할 수 있습니다.",
            loveQuote: "고독 속에서 마음은 진정으로 원하는 것을 배운다.",
            work: "풍부한 경험을 가진 전문가와 함께 일하게 됩니다. 가르치러 오거나 프로젝트를 감독할 수 있습니다. 여가 시간에 공부나 연구를 할 수 있습니다. 업무 품질은 인정받지만, 동료와의 교류가 적고 혼자 일하는 것을 선호합니다. 구직자는 교육이나 컨설팅 분야에서 기회가 있습니다. 작가와 사진작가인 프리랜서는 일이 많을 것입니다.",
            workQuote: "지혜는 세상의 소음 사이 침묵 속에서 발견된다.",
            finance: "검소하게 생활하며 외출을 피하고 거의 모든 초대를 거절하고 있습니다. 재정 상황이 나아질 때까지 이런 생활을 유지해야 할 수 있습니다. 뜻밖의 수입을 기대하기는 어렵습니다. 하지만 추가 수입을 원한다면 프리랜서 문서 작업·기사 작성·과외 등으로 수입을 보충해보세요.",
            financeQuote: "때로는 조용한 소박함 속의 길이 가장 풍요로운 길이다.",
            health: "신체 건강보다 정신 건강이 더 걱정될 수 있습니다. 스트레스·우울감·은둔·아무와도 대화하고 싶지 않은 상태 등이 해당됩니다. 원인 불명의 증상이 있다면 새로운 치료법을 가진 전문가를 찾을 수 있습니다. 대화할 사람을 찾고, 스트레스를 혼자 안고 있지 마세요. 정신 건강에 어려움이 있다면 전문가와 상담하세요.",
            healthQuote: "자기 인식의 등불이 치유의 길을 밝힌다."
        }
    },
    "WHEEL OF FORTUNE": {
        en: {
            love: "Singles will meet many new people, especially through dating apps or social media. This is a good time for those who'd like a foreign partner. However, quantity may outweigh quality among those who approach you. Choosing wisely depends on your own judgment. For those who recently broke up, reconciliation seems unlikely. If living together, one person may need to move out.\n\nFor those in a relationship, expect major changes such as traveling abroad together, buying a house, or moving in together.",
            loveQuote: "The wheel turns, and with it comes the love you never expected.",
            work: "This period brings unexpected job transfers or location changes, especially for those in real estate or international work. You may receive exciting news. Even without plans to change jobs, there may be internal organizational shifts, sudden project reassignments, or department transfers. This card doesn't indicate whether all changes will be positive or negative; it simply signals that major change is coming, like the wheel of fate spinning forward relentlessly.",
            workQuote: "Change is the only constant; ride the wheel with courage.",
            finance: "Prepare to receive a large sum from asset changes, possibly from selling a house or land. Those awaiting bank loan approvals have a good chance. But be careful, as this is also a month with heavy expenses, especially travel costs, venue rentals, and home renovations. For those who like to gamble, you may get good news. If you have rental properties, there's a chance of signing a new tenant.",
            financeQuote: "Fortune spins for those who are ready to catch it.",
            health: "Allergy sufferers may have flare-ups as the weather changes. Some may experience digestive issues and irritable bowel syndrome. Those with serious illnesses should watch for spread to other organs. If previously treated, get a check-up to prevent recurrence. Maintain consistent health care, eat on time, and keep up with doctor appointments.",
            healthQuote: "As seasons turn, so must your care for the body that carries you."
        },
        ja: {
            love: "独身の方は、特にマッチングアプリやSNSを通じて多くの新しい出会いがあるでしょう。外国人のパートナーを希望する方にとっても良い時期です。ただし、近づいてくる人の数は多くても質が伴わないかもしれません。賢く選ぶかどうかはあなた次第です。最近別れた方は、復縁の可能性は低そうです。一緒に住んでいる場合は、どちらかが引っ越す必要があるかもしれません。\n\n交際中の方は、海外旅行、家の購入、同棲など大きな変化が期待されます。",
            loveQuote: "運命の輪が回れば、予想もしなかった愛がやってくる。",
            work: "予期しない異動や勤務地の変更が起こりやすい時期です。特に不動産や国際的な仕事をしている方に当てはまります。ワクワクするニュースを受け取るかもしれません。転職を考えていなくても、組織内の変動、突然のプロジェクト変更、部署異動があるかもしれません。このカードはすべての変化が良いか悪いかを示すものではなく、運命の車輪が容赦なく前に進んでいるように、大きな変化が来ることを告げています。",
            workQuote: "変化だけが唯一の不変。勇気を持って運命の輪に乗ろう。",
            finance: "資産の売買から大きな金額を受け取る準備をしましょう。家や土地の売却からかもしれません。銀行のローン承認を待っている方には良い見通しがあります。ただし出費も多い月になりそうで、特に旅費、会場費、住宅のリフォーム費用が嵩みます。宝くじなどが好きな方には良い知らせがあるかもしれません。",
            financeQuote: "運命の輪は、準備ができている者のために回っている。",
            health: "アレルギー体質の方は、季節の変わり目に症状が悪化するかもしれません。消化器系の問題や過敏性腸症候群が出ることも。重い病気を抱えている方は他の臓器への広がりに注意しましょう。以前治療を受けた方は、再発防止のために検査を受けてください。",
            healthQuote: "季節が巡るように、あなたを支える体へのケアも巡らせなければならない。"
        },
        ko: {
            love: "싱글은 특히 데이팅 앱이나 SNS를 통해 많은 새로운 사람을 만나게 됩니다. 외국인 파트너를 원하는 분에게 좋은 시기입니다. 하지만 다가오는 사람 중에는 질보다 양이 앞설 수 있습니다. 현명한 선택은 본인의 판단에 달려 있습니다. 최근 이별한 분은 재결합 가능성이 낮습니다.\n\n연인이 있는 분은 해외 여행·집 구매·동거 등 큰 변화가 예상됩니다.",
            loveQuote: "운명의 수레바퀴가 돌면, 예상치 못한 사랑이 함께 온다.",
            work: "이 시기에는 예상치 못한 인사이동이나 근무지 변경이 있습니다. 특히 부동산이나 해외 업무 관련 분야에서 그렇습니다. 설렘 가득한 소식을 받을 수 있습니다. 이직 계획이 없더라도 내부 조직 변동·갑작스러운 프로젝트 재배치·부서 이동이 있을 수 있습니다. 이 카드는 변화가 긍정적인지 부정적인지를 나타내지 않습니다. 단지 운명의 수레바퀴처럼 큰 변화가 온다는 신호입니다.",
            workQuote: "변화만이 유일한 상수이다. 용기를 가지고 바퀴에 올라타라.",
            finance: "자산 변동으로 큰 금액을 받을 준비를 하세요. 집이나 토지 매매에서 올 수 있습니다. 은행 대출 승인을 기다리는 분은 가능성이 높습니다. 하지만 여행비·장소 대여·집 수리 등 큰 지출도 있는 달입니다. 도박을 즐기는 분에게 좋은 소식이 있을 수 있습니다. 임대 부동산이 있다면 새 세입자 계약 가능성이 있습니다.",
            financeQuote: "행운의 수레바퀴는 준비된 자를 위해 돈다.",
            health: "알레르기가 있는 분은 날씨 변화로 증상이 악화될 수 있습니다. 소화 장애와 과민성 장증후군이 나타날 수 있습니다. 심각한 질환이 있는 분은 다른 장기로의 전이를 주의하세요. 이전에 치료를 받았다면 재발 방지를 위해 검진을 받으세요. 꾸준한 건강 관리를 유지하고, 규칙적인 식사와 진료 예약을 지키세요.",
            healthQuote: "계절이 바뀌듯, 당신을 지탱하는 몸에 대한 돌봄도 바뀌어야 한다."
        }
    },
    "JUSTICE": {
        en: {
            love: "Singles, even though people show interest, your direct and serious nature may make others feel uncomfortable and hesitant to approach. Try relaxing your strictness and showing your softer side.\n\nFor those in a relationship, things are tense. There may be emotional and physical distance between you. You may be unhappy about certain things but choose silence, using coldness or passive-aggressive remarks instead of direct communication. Find time for an honest conversation to address the issues.",
            loveQuote: "Love asks not for perfection, but for the courage to speak the truth.",
            work: "Your current work may have problems from the very beginning, like buttoning a shirt wrong from the first button. There's a chance the work will be scrapped and you'll need to reconceptualize everything. While the revisions aren't unacceptable, the deadline is closing in fast. For client-facing work, you may encounter clients who don't know what they want, changing requirements so frequently that the team can't keep up. You may need to establish clear contracts and revision policies. Sometimes you'll need to stand firm and use logic. Additionally, internal competition and office politics may be intense, requiring you to stay vigilant while working.",
            workQuote: "Every wrong beginning holds the seed of a right restart.",
            finance: "You may have been facing financial problems for quite some time. This poor liquidity comes from issues that have accumulated over a long period. It's time to cut out the unnecessary, no matter what others might think. This month might be tough. Watch out for fines or legal and attorney costs. If there are no major issues, most expenses will go toward repairing essential items.",
            financeQuote: "Balance the scales today, and tomorrow's burden will be lighter.",
            health: "Be careful about your eating habits, both what you eat and when. Avoid coffee, carbonated drinks, and foods that cause acid and gas. Some may need surgery in the stomach or rib area. Choose easily digestible foods that aren't greasy or spicy, eat on schedule, and consult a doctor if you notice anything unusual.",
            healthQuote: "The body keeps an honest ledger; treat it with fairness."
        },
        ja: {
            love: "独身の方は、周りから好意を寄せられていても、あなたの率直で真面目な性格が相手を緊張させ、近づきにくくしているかもしれません。厳しさを少し緩めて、柔らかい一面を見せてみましょう。\n\n交際中の方は、緊張状態にあります。感情的にも物理的にも距離ができているかもしれません。不満があっても沈黙を選び、直接伝える代わりに冷たい態度や皮肉で返してしまっています。率直に話し合う時間を作りましょう。",
            loveQuote: "愛は完璧を求めない。真実を語る勇気を求めるだけだ。",
            work: "現在の仕事は最初のボタンの掛け違いのように、根本から問題を抱えているかもしれません。最初からやり直す可能性もあります。修正自体は受け入れられるものですが、締め切りが迫っています。クライアント対応では、要望が定まらず何度も変更を求められ、チームが追いつけない状況になることも。明確な契約と修正ルールを設ける必要があるかもしれません。社内競争や社内政治も激しく、気を抜けません。",
            workQuote: "すべての間違った始まりには、正しいやり直しの種が宿っている。",
            finance: "かなり長い間、経済的な問題を抱えているかもしれません。流動性の低さは長期にわたって蓄積された問題によるものです。周りの目を気にせず、不要なものを切り捨てる時です。今月は厳しいかもしれません。罰金や法務費用に注意しましょう。大きな問題がなければ、支出のほとんどは必需品の修理に充てられるでしょう。",
            financeQuote: "今日天秤を整えれば、明日の荷は軽くなる。",
            health: "食生活に注意しましょう。何を食べるか、いつ食べるか、両方が大切です。コーヒー、炭酸飲料、胃酸やガスの原因になる食品は避けましょう。胃やあばら骨の辺りの手術が必要になるケースも。消化の良い、油っぽくなく辛くない食事を選び、規則正しく食べ、異変があれば医師に相談しましょう。",
            healthQuote: "体は正直な帳簿をつけている。公正に扱おう。"
        },
        ko: {
            love: "싱글인 당신은 다른 사람이 관심을 보여도, 직설적이고 진지한 성격이 상대를 불편하게 만들어 쉽게 다가오지 못하게 할 수 있습니다. 엄격함을 조금 풀고 부드러운 면을 보여주세요.\n\n연인이 있는 분은 상황이 긴장되어 있습니다. 감정적·물리적 거리가 있을 수 있습니다. 불만이 있지만 침묵을 택하고, 직접적인 대화 대신 냉담함이나 은근한 비꼼으로 표현하고 있습니다. 시간을 내서 솔직하게 대화해 문제를 해결하세요.",
            loveQuote: "사랑은 완벽함이 아니라 진실을 말할 용기를 원한다.",
            work: "현재 업무는 처음부터 문제가 있었을 수 있습니다. 첫 단추부터 잘못 끼운 셔츠처럼요. 업무가 폐기되고 처음부터 다시 구상해야 할 가능성이 있습니다. 수정 자체가 불가능하지는 않지만, 마감이 다가오고 있습니다. 고객 대면 업무라면 자기가 뭘 원하는지 모르는 클라이언트를 만나 수정 요청이 빈번할 수 있습니다. 명확한 계약서와 수정 정책이 필요합니다. 내부 경쟁과 사내 정치도 치열할 수 있으니 경계하세요.",
            workQuote: "모든 잘못된 시작에는 올바른 재출발의 씨앗이 있다.",
            finance: "꽤 오랜 기간 재정 문제를 겪고 있을 수 있습니다. 이 유동성 부족은 오랜 시간 누적된 문제에서 비롯됩니다. 이제 불필요한 것을 과감히 잘라낼 때입니다. 이번 달은 힘들 수 있습니다. 벌금이나 법률 비용에 주의하세요. 큰 문제가 없다면 대부분의 지출은 필수품 수리에 들어갈 것입니다.",
            financeQuote: "오늘 저울의 균형을 맞추면 내일의 짐이 가벼워진다.",
            health: "식습관에 주의하세요. 무엇을 먹는지, 언제 먹는지 모두 중요합니다. 커피·탄산음료·가스를 유발하는 음식을 피하세요. 위나 갈비뼈 부근에 수술이 필요할 수도 있습니다. 소화가 잘 되고 기름지거나 맵지 않은 음식을 선택하고, 규칙적으로 식사하며, 이상이 있으면 의사와 상담하세요.",
            healthQuote: "몸은 정직한 장부를 기록한다. 공정하게 대하라."
        }
    },
    "THE HANGED MAN": {
        en: {
            love: "Singles may feel weary and discouraged about finding a partner. If you're talking to someone, they may suddenly go silent, blocking all communication channels so you can no longer reach them.\n\nFor those in a relationship, there may be arguments or misunderstandings that make you question how to continue. One partner may be facing serious problems, needing time alone to reflect without wanting to share with anyone.",
            loveQuote: "Sometimes love asks you to surrender before it lets you rise.",
            work: "You're in a phase where you feel you've lost your touch. Your boss and colleagues may call you in for criticism, leaving you feeling burned out and unmotivated. You can't see a way out of your current problems. The first step is to accept that you can't solve everything alone and that you need help. Inform your boss and colleagues about your challenges and limitations. Sometimes seeing the problem from someone else's perspective reveals solutions you've overlooked. For job seekers, don't lose heart even if you need to apply and interview at many places. You have a chance of landing a job in healthcare, wellness, or insurance.",
            workQuote: "The view changes entirely when you learn to see from a different angle.",
            finance: "This is not the time to do anything more than maintain your current financial status. Those who invested may face unforeseen circumstances that cause principal loss. Investing more in hopes of recovering lost capital could be a mistake. Accept what's gone, and once you've come to terms with it, start looking for new ways to earn. Sometimes standing still for a while helps you spot better opportunities ahead.",
            financeQuote: "In stillness, the clearest paths reveal themselves.",
            health: "This is a time to take extra care of your health. You may fall ill with anything from common ailments to chronic conditions requiring long treatment. Diabetics should watch for wounds around the legs and ankles, as they may become infected and worsen. Get enough rest, maintain strict health care, and see a doctor immediately if anything feels wrong.",
            healthQuote: "Healing asks for patience and the courage to simply be still."
        },
        ja: {
            love: "独身の方は、パートナー探しに疲れ、落胆しているかもしれません。連絡を取り合っている人がいる場合、突然音信不通になり、すべての連絡手段をブロックされるかもしれません。\n\n交際中の方は、喧嘩や誤解が生じ、今後どうすればいいか迷っているかもしれません。パートナーの一方が深刻な問題に直面し、誰にも話さず一人で考える時間を必要としているかもしれません。",
            loveQuote: "時に愛は、あなたを立ち上がらせる前に、降伏することを求める。",
            work: "自分の調子が落ちていると感じる時期です。上司や同僚から批判を受け、燃え尽きてやる気を失っているかもしれません。今の問題から抜け出す道が見えません。まず、すべてを一人で解決できないこと、助けが必要であることを受け入れましょう。上司や同僚にあなたの課題や限界を伝えてください。別の視点から問題を見ることで、見落としていた解決策が見つかることもあります。求職者も、多くの場所に応募し面接しても、くじけないでください。",
            workQuote: "違う角度から見ることを学べば、景色は一変する。",
            finance: "現在の財務状況を維持する以上のことは控える時期です。投資をしている方は、不測の事態で元本を失うかもしれません。損失を取り戻そうとさらに投資するのは過ちになりかねません。失ったものは受け入れ、気持ちの整理がついたら新しい稼ぎ方を探しましょう。時に立ち止まることで、より良いチャンスが見えてくることがあります。",
            financeQuote: "静寂の中にこそ、最も明確な道が姿を現す。",
            health: "健康に特別な注意が必要な時期です。一般的な病気から長期治療が必要な慢性疾患まで、体調を崩す可能性があります。糖尿病の方は、足首や脚周りの傷に注意してください。感染して悪化する恐れがあります。十分な休息をとり、厳密な健康管理を行い、異変を感じたらすぐに医師の診察を受けましょう。",
            healthQuote: "癒しには忍耐と、ただ静かにいる勇気が必要だ。"
        },
        ko: {
            love: "싱글이라면 파트너를 찾는 것에 지치고 낙담한 상태일 수 있습니다. 누군가와 대화 중이었다면 상대가 갑자기 연락을 끊고 모든 소통 채널을 차단할 수 있습니다.\n\n연인이 있는 분은 다툼이나 오해로 어떻게 관계를 이어가야 할지 고민하게 됩니다. 한쪽이 심각한 문제에 직면해 혼자만의 시간이 필요하며 아무에게도 공유하고 싶지 않을 수 있습니다.",
            loveQuote: "때로 사랑은 다시 일어서기 전에 먼저 내려놓기를 요구한다.",
            work: "감을 잃은 것 같은 시기입니다. 상사와 동료에게 비판을 받아 의욕을 잃고 번아웃 상태일 수 있습니다. 현재 문제에서 빠져나올 방법이 보이지 않습니다. 첫 번째 단계는 혼자서는 모든 것을 해결할 수 없으며 도움이 필요하다는 것을 받아들이는 것입니다. 상사와 동료에게 어려움과 한계를 알리세요. 때로는 다른 관점에서 문제를 보면 간과했던 해결책이 보입니다. 구직자는 낙담하지 마세요. 의료·웰빙·보험 분야에서 기회가 있습니다.",
            workQuote: "다른 각도에서 보는 법을 배우면 풍경이 완전히 달라진다.",
            finance: "현재 재정 상태를 유지하는 것 이상의 행동은 자제할 시기입니다. 투자한 분은 예상치 못한 상황으로 원금 손실이 있을 수 있습니다. 잃은 돈을 복구하려고 추가 투자하는 것은 실수일 수 있습니다. 잃은 것은 받아들이고, 마음의 정리가 된 후 새로운 수입 방법을 찾으세요. 가끔 잠시 멈추면 더 좋은 기회가 보입니다.",
            financeQuote: "고요함 속에서 가장 명확한 길이 드러난다.",
            health: "건강 관리에 특히 신경 써야 할 시기입니다. 일반적인 질환부터 장기 치료가 필요한 만성 질환까지 앓을 수 있습니다. 당뇨병 환자는 다리와 발목 주변의 상처가 감염되어 악화될 수 있으니 주의하세요. 충분히 쉬고, 철저히 건강을 관리하며, 이상이 느껴지면 즉시 병원에 가세요.",
            healthQuote: "치유에는 인내와 그저 가만히 있을 용기가 필요하다."
        }
    },
    "DEATH": {
        en: {
            love: "Singles who are talking to someone may receive news that forces an end to the budding relationship. For those who are truly single, the solo period continues for now. If an ex reaches back out, they may return with problems and complications.\n\nFor those in a relationship, beware of serious issues arising. If you and your partner don't have problems with each other, it may mean your partner is facing a crisis that is difficult to resolve, and that crisis may ripple into your life as well.",
            loveQuote: "From every ending, a truer love is waiting to be born.",
            work: "Your company is undergoing major changes in both budget and organizational structure. Some department heads and executives may resign, or there may be layoffs. Even if your company is stable and not restructuring, the project you're responsible for may stall and be temporarily suspended. You might be transferred to a role you're not skilled at, making you feel it's time to look for new opportunities. If a new job comes along, you're ready to resign immediately. However, if you're applying for jobs in healthcare such as doctor or nurse, or international roles such as pilot, you may receive good news.",
            workQuote: "What falls away was never truly yours; what remains will build you anew.",
            finance: "An unexpected event may force you to dip into a large portion of your savings. Creditors may come calling. If you've been short on cash for a while, you may receive legal documents from creditors. Those who have been evading taxes should watch out for a call from the revenue department. But don't worry too much, as every problem has a solution. Just stay calm and handle things one at a time.",
            financeQuote: "Even the deepest winter thaw eventually reveals solid ground.",
            health: "Health problems may coincide with other issues during this period. If there's an epidemic, you're at risk of infection. Those with chronic conditions may need hospitalization. Also beware of traffic accidents. Take extra care of your health, be cautious when traveling, and strictly follow your doctor's advice.",
            healthQuote: "Transformation begins the moment you choose to heal."
        },
        ja: {
            love: "独身で誰かと連絡を取り合っている方は、その芽生えたばかりの関係に終止符を打つ知らせが届くかもしれません。完全に独身の方は、しばらく一人の時期が続きます。もし元パートナーが戻ってきても、問題やトラブルを抱えて戻ってくるかもしれません。\n\n交際中の方は、深刻な問題の発生に注意してください。お互いに問題がなくても、パートナーが解決困難な危機に直面し、それがあなたの生活にも波及する可能性があります。",
            loveQuote: "すべての終わりから、より真実の愛が生まれるのを待っている。",
            work: "会社は予算面でも組織面でも大きな変革を迎えています。部門長や幹部が辞任したり、リストラがあるかもしれません。会社が安定していても、担当プロジェクトが行き詰まり一時停止になることも。得意でない部署に異動させられ、新しい機会を探す時だと感じるかもしれません。ただし、医療や国際的な職種に応募中なら良い知らせがあるかもしれません。",
            workQuote: "崩れ去ったものは本当のあなたのものではなかった。残るものがあなたを新しく作り上げる。",
            finance: "予期せぬ出来事で、貯蓄の大部分を使わざるを得なくなるかもしれません。債権者から連絡が来ることも。しばらく現金不足が続いているなら、法的書類が届く可能性があります。税務申告を怠っていた方は、税務署からの連絡に注意しましょう。ただし心配しすぎないでください。すべての問題には解決策があります。落ち着いて一つずつ対処しましょう。",
            financeQuote: "最も深い冬の氷も、やがて溶けて堅い大地を現す。",
            health: "この時期は健康問題と他の問題が同時に起こるかもしれません。感染症が流行していれば感染リスクがあります。持病のある方は入院が必要になることも。交通事故にも注意しましょう。健康に細心の注意を払い、移動時は慎重に、医師の指示を厳守してください。",
            healthQuote: "変容は、癒すと決意した瞬間から始まる。"
        },
        ko: {
            love: "싱글이 누군가와 대화 중이었다면, 싹트던 관계를 끝내야 하는 소식이 올 수 있습니다. 정말 혼자인 분은 아직 홀로인 시기가 계속됩니다. 전 연인이 다시 연락해온다면, 문제와 복잡한 상황을 안고 돌아올 수 있습니다.\n\n연인이 있는 분은 심각한 문제의 발생에 주의하세요. 당신과 파트너 사이에 직접적인 문제가 없다면, 파트너가 해결하기 어려운 위기를 겪고 있으며 그 영향이 당신에게까지 미칠 수 있습니다.",
            loveQuote: "모든 끝에서 더 진실한 사랑이 태어나기를 기다리고 있다.",
            work: "회사가 예산과 조직 구조 모두에서 대대적인 변화를 겪고 있습니다. 일부 임원이 사임하거나 구조조정이 있을 수 있습니다. 회사가 안정적이더라도 담당 프로젝트가 멈추고 일시 중단될 수 있습니다. 적성에 맞지 않는 직무로 전환되어 새로운 기회를 찾아야 할 때라고 느낄 수 있습니다. 하지만 의료·국제 분야에 지원 중이라면 좋은 소식을 받을 수 있습니다.",
            workQuote: "사라지는 것은 진정 당신의 것이 아니었다. 남는 것이 당신을 새로 세울 것이다.",
            finance: "예상치 못한 사건으로 저축의 상당 부분을 써야 할 수 있습니다. 채권자가 찾아올 수 있습니다. 자금이 부족한 상태가 오래됐다면 법적 서류를 받을 수 있습니다. 세금 회피를 해온 분은 국세청의 연락에 주의하세요. 하지만 너무 걱정하지 마세요. 모든 문제에는 해결책이 있습니다. 침착하게 하나씩 처리해나가세요.",
            financeQuote: "아무리 긴 겨울도 결국 녹아 단단한 땅이 드러난다.",
            health: "이 시기에는 건강 문제가 다른 문제와 동시에 올 수 있습니다. 전염병이 돌면 감염 위험이 있습니다. 만성 질환자는 입원이 필요할 수 있습니다. 교통사고에도 주의하세요. 건강 관리에 각별히 신경 쓰고, 이동 시 조심하며, 의사의 조언을 철저히 따르세요.",
            healthQuote: "변화는 치유를 선택하는 순간 시작된다."
        }
    },
    "TEMPERANCE": {
        en: {
            love: "Singles may meet someone from a different region or country, or find someone special while traveling. However, the relationship may be in an ambiguous, undefined state. The other person might be open and sociable, chatting with multiple people without hiding it.\n\nFor those in a relationship, there may be opportunities to travel abroad or to the countryside together. If you're in a long-distance relationship, you might get to meet halfway. But if living together, watch out for potential infidelity from either side.",
            loveQuote: "Love finds its rhythm when two souls learn the art of balance.",
            work: "Due to organizational changes, you're juggling multiple responsibilities simultaneously. The company may be merging departments or consolidating operations, and you'll be affected. If you're bored with the same old work, this could be a good opportunity to request a transfer. There might also be changes in seating or office buildings. Job seekers have a chance of finding interesting work that may involve international travel.",
            workQuote: "Balance is not standing still; it is moving gracefully between all things.",
            finance: "You have income from multiple sources, both your regular job and side business, yet no matter how much you earn, it never seems to grow. Your liquidity comes from shuffling money between your own accounts, like an endless cycle. For those without financial issues, expenses may relate to moving house or long-distance travel, including accommodation and plane tickets. Plan your spending carefully so it doesn't affect other savings.",
            financeQuote: "Moderation is the quiet art of making enough feel like plenty.",
            health: "Watch out for blood circulation issues. Avoid very sweet foods, carbonated drinks, and bubble tea, which can thicken the blood and increase acidity. Drink plenty of clean water, and beware of slip-and-fall accidents, especially on wet floors and in bathrooms. Adjust your eating habits, drink enough water, and be careful walking on slippery surfaces.",
            healthQuote: "Flow gently through life, and your body will thank you in kind."
        },
        ja: {
            love: "独身の方は、異なる地域や国の出身の人と出会ったり、旅行中に特別な人を見つけるかもしれません。ただし、関係は曖昧で定義しにくい状態かもしれません。相手は社交的でオープンな性格で、複数の人と同時にやり取りしていることを隠さないかもしれません。\n\n交際中の方は、海外旅行や地方旅行の機会があるかもしれません。遠距離恋愛中なら中間地点で会えるかもしれません。ただし同棲中の場合は、どちらか一方の浮気に注意が必要です。",
            loveQuote: "二つの魂がバランスの技を学ぶとき、愛はリズムを見つける。",
            work: "組織変更により、複数の業務を同時にこなしています。部署の統合や業務の集約が進んでおり、あなたもその影響を受けるでしょう。同じ仕事に飽きているなら、異動を願い出る良い機会かもしれません。席替えやオフィスの移転もあるかもしれません。求職者は、海外出張を伴う興味深い仕事を見つけられるかもしれません。",
            workQuote: "バランスとは立ち止まることではない。あらゆるものの間を優雅に動くことだ。",
            finance: "本業と副業の両方から収入がありますが、いくら稼いでも増えた実感がありません。資金の流動性は自分の口座間でお金をやりくりしているだけで、終わりのない循環のようです。財務に問題がない方の場合は、引っ越しや長距離旅行に関する出費、宿泊費や航空券などがかかるかもしれません。他の貯蓄に影響しないよう、支出を計画的に管理しましょう。",
            financeQuote: "節度とは、「足りている」を「満たされている」に変える静かな技だ。",
            health: "血液循環の問題に注意しましょう。非常に甘い食べ物、炭酸飲料、タピオカドリンクは血液をドロドロにし、酸性度を上げる原因になります。きれいな水をたっぷり飲みましょう。また、特に濡れた床やバスルームでの転倒事故にも注意してください。食習慣を改善し、十分な水分を摂り、滑りやすい場所では気をつけて歩きましょう。",
            healthQuote: "人生をゆるやかに流れれば、体はそれに感謝するだろう。"
        },
        ko: {
            love: "싱글이라면 다른 지역이나 나라에서 온 사람을 만나거나 여행 중에 특별한 인연을 찾을 수 있습니다. 하지만 관계가 모호하고 정의되지 않은 상태일 수 있습니다. 상대는 개방적이고 사교적이며, 여러 사람과 동시에 대화하는 것을 숨기지 않을 수 있습니다.\n\n연인이 있는 분은 해외 여행이나 지방 여행을 함께할 기회가 있습니다. 장거리 연애라면 중간 지점에서 만날 수 있습니다. 하지만 함께 살고 있다면 양쪽 모두의 외도 가능성에 주의하세요.",
            loveQuote: "두 영혼이 균형의 예술을 배울 때 사랑은 제 리듬을 찾는다.",
            work: "조직 변화로 여러 업무를 동시에 처리하고 있습니다. 부서 통합이나 사업부 합병의 영향을 받을 수 있습니다. 같은 업무에 지루해졌다면 부서 이동을 요청할 좋은 기회일 수 있습니다. 좌석이나 사무실 건물 변경이 있을 수도 있습니다. 구직자는 해외 출장이 포함된 흥미로운 업무를 찾을 기회가 있습니다.",
            workQuote: "균형은 가만히 있는 것이 아니라, 모든 것 사이를 우아하게 오가는 것이다.",
            finance: "정규 직장과 부업 등 여러 소득원이 있지만, 아무리 벌어도 돈이 늘지 않는 느낌입니다. 유동성은 자신의 여러 계좌 사이에서 돈을 돌리는 것에서 나옵니다. 끝없는 순환 같습니다. 재정 문제가 없는 분은 이사나 장거리 여행 관련 비용이 있을 수 있습니다. 지출을 신중하게 계획해 다른 저축에 영향이 없도록 하세요.",
            financeQuote: "절제는 충분함을 풍요로 느끼게 하는 조용한 예술이다.",
            health: "혈액 순환 문제에 주의하세요. 매우 단 음식·탄산음료·버블티를 피하세요. 혈액을 걸쭉하게 하고 산성도를 높일 수 있습니다. 깨끗한 물을 충분히 마시고, 미끄러운 바닥과 욕실에서의 낙상 사고를 조심하세요. 식습관을 조절하고, 물을 충분히 마시며, 미끄러운 표면에서 주의하세요.",
            healthQuote: "삶을 부드럽게 흘려보내면 몸이 그에 보답할 것이다."
        }
    },
    "THE DEVIL": {
        en: {
            love: "Singles may quickly develop a relationship with someone new, but it could come with hidden conditions such as business interests or imbalances in power and status. Be careful not to become a third party in someone else's relationship.\n\nFor those in a relationship, the bond may deepen through legal commitments such as marriage registration, joint contracts, or co-purchasing assets. However, watch out for affairs, as a third person may become involved.",
            loveQuote: "Desire is a chain that only the heart's honesty can break.",
            work: "There are opportunities to work with foreign companies. Job applicants will receive good news and sign contracts. For current employees, there may be a merger or change in management. Your new boss may be well-known in the industry, skilled in both work and people management, and adept at handling office politics. But working with them may be especially exhausting. You might be assigned a complex new project requiring coordination with difficult people both inside and outside the organization. You may need to expand your knowledge of documents, contracts, and legal matters, but ultimately you'll handle everything well.",
            workQuote: "Power is a tool; wield it wisely or it will wield you.",
            finance: "Windfalls or income may come from dubious sources, such as loans from loan sharks with harsh interest rates. It might look fine at first, but long-term it could affect your life, finances, and assets. Alternatively, this card may indicate signing contracts with business partners, with a chance of a large bonus, or receiving money freely from the opposite sex. Consider carefully whether it's worth what you'd have to give in return.",
            financeQuote: "Not all that glitters is gold; some treasures carry hidden tolls.",
            health: "If you don't have any existing conditions, beware of infections from those close to you, from common colds to sexually transmitted diseases. Those with chronic conditions may experience flare-ups, especially in the respiratory system and lungs. You may need to replace air filters. Maintain good hygiene, guard against infections, and keep your environment clean.",
            healthQuote: "Breaking free from harmful habits is the first act of true self-love."
        },
        ja: {
            love: "独身の方は、新しい相手と急速に関係が発展するかもしれませんが、ビジネス上の利害や力関係の不均衡など、隠された条件がある可能性があります。誰かの恋人になってしまわないよう注意しましょう。\n\n交際中の方は、婚姻届、共同契約、資産の共同購入など、法的な約束を通じて絆が深まるかもしれません。ただし、第三者の介入には警戒が必要です。",
            loveQuote: "欲望は鎖だ。心の誠実さだけがその鎖を断ち切ることができる。",
            work: "外国企業と仕事をする機会があります。求職者には良い知らせがあり、契約を結ぶことになるでしょう。現職者の場合、経営統合や管理層の交代があるかもしれません。新しい上司は業界で有名で、仕事も人脈づくりも巧みな人かもしれません。ただし、その下で働くのは特に大変かもしれません。組織内外の扱いにくい人々との調整が必要な複雑なプロジェクトを任されることも。",
            workQuote: "権力は道具だ。賢く使わなければ、権力に使われることになる。",
            finance: "臨時収入が怪しい出どころからもたらされるかもしれません。高利貸しからの借金など、最初は問題なく見えても長期的には生活や資産に影響を及ぼす可能性があります。あるいは、ビジネスパートナーとの契約締結を意味し、大きなボーナスのチャンスがあるかもしれません。見返りに何を差し出すことになるか、慎重に考えましょう。",
            financeQuote: "輝くものすべてが金とは限らない。隠された代償を持つ宝もある。",
            health: "持病がなくても、身近な人からの感染に注意しましょう。風邪から性感染症まで様々です。持病がある方は、特に呼吸器系や肺の症状が悪化するかもしれません。エアフィルターの交換が必要かもしれません。衛生管理を徹底し、感染予防に努め、生活環境を清潔に保ちましょう。",
            healthQuote: "有害な習慣から解放されることが、本当の自己愛の第一歩だ。"
        },
        ko: {
            love: "싱글이라면 새로운 사람과 빠르게 관계가 발전할 수 있지만, 사업적 이해관계나 권력·지위의 불균형 같은 숨겨진 조건이 있을 수 있습니다. 다른 사람의 관계에 제3자가 되지 않도록 주의하세요.\n\n연인이 있는 분은 혼인 신고·공동 계약·공동 자산 구매 등 법적 서약으로 유대가 깊어질 수 있습니다. 하지만 제3자가 관여할 수 있으니 외도에 주의하세요.",
            loveQuote: "욕망은 마음의 정직함만이 풀 수 있는 사슬이다.",
            work: "외국 기업과 함께 일할 기회가 있습니다. 지원자는 좋은 소식을 듣고 계약에 서명합니다. 현직자에게는 합병이나 경영진 교체가 있을 수 있습니다. 새 상사가 업계에서 유명하고 일과 사람 관리 모두에 능숙할 수 있지만, 그들과 일하는 것이 특히 피곤할 수 있습니다. 사내외의 까다로운 사람들과 조율이 필요한 복잡한 프로젝트를 맡을 수 있습니다.",
            workQuote: "권력은 도구이다. 현명하게 쓰지 않으면 그것이 당신을 지배한다.",
            finance: "뜻밖의 수입이 의심스러운 출처에서 올 수 있습니다. 고금리 사채 등이 해당됩니다. 처음에는 괜찮아 보여도 장기적으로 생활·재정·자산에 영향을 줄 수 있습니다. 또는 이 카드는 사업 파트너와의 계약 체결, 큰 보너스의 기회, 이성으로부터의 자유로운 금전 수수를 나타낼 수도 있습니다. 대가로 무엇을 포기해야 하는지 신중히 고려하세요.",
            financeQuote: "반짝인다고 다 금은 아니다. 어떤 보물에는 숨겨진 대가가 있다.",
            health: "기존 질환이 없다면 가까운 사람으로부터의 감염에 주의하세요. 일반 감기부터 성병까지 포함됩니다. 만성 질환자는 특히 호흡기와 폐 관련 증상 악화를 주의하세요. 에어 필터를 교체해야 할 수도 있습니다. 위생을 잘 관리하고, 감염을 예방하며, 환경을 깨끗하게 유지하세요.",
            healthQuote: "해로운 습관에서 벗어나는 것이 진정한 자기 사랑의 첫걸음이다."
        }
    },
    "THE TOWER": {
        en: {
            love: "Singles, if you've recently broken up, reconciliation is very unlikely in this period as the relationship has reached a breaking point. If the breakup wasn't made official yet, clarity is coming soon. New people entering your life may have just been through terrible experiences such as heartbreak, job loss, or an accident. If you're interested, you'll need to start by being a healer first.\n\nFor those in a relationship, if no unexpected events like accidents occur, watch out for severe arguments. If the relationship has been rocky for a long time, it may be time to make a decision about the future.",
            loveQuote: "From the rubble of what was, the strongest love is rebuilt.",
            work: "Your company may face sudden changes, with important people leaving unexpectedly, or you yourself may decide to resign and shock everyone around you. If you're not planning to change jobs, there might be office or desk relocations. Be careful with colleague relationships, as everyone's emotions may be volatile. Jokes that used to be fine might become sparks for conflict. This card could also indicate a fire evacuation drill at your workplace.",
            workQuote: "What crumbles was built on sand; what remains will rise stronger.",
            finance: "There may be a need to spend a large amount of money suddenly. Business owners may need to part ways with a partner, requiring funds to buy back shares or sell assets to divide money and close the business. Essential items may break down unexpectedly, requiring immediate replacement. It's advisable to have life and property insurance, as you may need to file claims. Watch out for health issues and accidents that could impact your finances. Keep an emergency fund ready.",
            financeQuote: "When the old structure falls, the wise already hold the blueprint for the new.",
            health: "Beware of accidents, especially from reckless driving or working at heights. Health-wise, watch out for heat and temperature effects on blood vessels in the brain. There may be issues with bronchial tubes, the digestive tract, or acid reflux. Drive carefully, avoid working at heights, and pay special attention to digestive system health.",
            healthQuote: "After the storm, the body rebuilds itself stronger than before."
        },
        ja: {
            love: "独身の方は、最近別れたばかりなら、この時期の復縁はほぼ不可能です。関係は限界点に達しています。まだ正式に別れていないなら、間もなくはっきりするでしょう。新しく現れる人は、失恋、失業、事故など辛い経験を経てきたばかりかもしれません。興味があるなら、まず癒し手になることから始める必要があります。\n\n交際中の方は、事故などの予期せぬ出来事がなければ、激しい口論に注意しましょう。長い間関係が不安定だったなら、将来について決断する時かもしれません。",
            loveQuote: "崩れ去ったものの瓦礫から、最も強い愛が再建される。",
            work: "会社に突然の変化が起こり、重要な人物が予告なく去るかもしれません。あるいは自分自身が辞職を決意し、周囲を驚かせることも。転職の予定がなくても、オフィスやデスクの移動があるかもしれません。同僚との関係に注意してください。みんなの感情が不安定になりやすく、以前は冗談で済んでいたことが衝突の火種になる可能性があります。",
            workQuote: "砂の上に建てられたものは崩れ、残ったものはより強く立ち上がる。",
            finance: "突然大きな金額を支出する必要が生じるかもしれません。経営者はパートナーとの関係を解消し、株式の買い戻しや資産売却が必要になることも。必需品が予期せず壊れ、即座に交換が必要になることもあります。生命保険や損害保険に加入しておくことをお勧めします。緊急資金を常に準備しておきましょう。",
            financeQuote: "古い構造が崩れ落ちるとき、賢者はすでに新しい設計図を手にしている。",
            health: "事故に注意しましょう。特に無謀な運転や高所作業は危険です。健康面では、熱や気温の変化による脳血管への影響に注意してください。気管支、消化管、逆流性食道炎の問題も起こりうります。安全運転を心がけ、高所作業を避け、消化器系の健康に特に気を配りましょう。",
            healthQuote: "嵐の後、体は以前より強く自らを再建する。"
        },
        ko: {
            love: "싱글이 최근 이별을 겪었다면, 이 시기에 재결합은 매우 어렵습니다. 관계가 한계점에 도달했습니다. 아직 공식적으로 이별하지 않았다면 곧 명확해질 것입니다. 새로 만나는 사람은 이별·실직·사고 등 끔찍한 경험을 겪은 사람일 수 있습니다. 관심이 있다면 먼저 치유자의 역할부터 시작해야 합니다.\n\n연인이 있는 분은 사고 같은 예상치 못한 사건이 없다면, 심한 다툼에 주의하세요. 관계가 오래 불안정했다면 미래에 대한 결정을 내려야 할 때일 수 있습니다.",
            loveQuote: "무너진 잔해 위에서 가장 강한 사랑이 다시 세워진다.",
            work: "회사에서 중요한 사람이 갑자기 떠나거나, 당신이 직접 사직을 결심해 주변을 놀라게 할 수 있습니다. 직장을 옮길 계획이 없다면 사무실이나 자리 이동이 있을 수 있습니다. 동료 관계에 주의하세요. 모두의 감정이 예민할 수 있습니다. 평소 괜찮았던 농담이 갈등의 불씨가 될 수 있습니다. 직장에서 화재 대피 훈련이 있을 수도 있습니다.",
            workQuote: "무너진 것은 모래 위에 세워진 것이었다. 남는 것이 더 강하게 일어선다.",
            finance: "갑자기 많은 돈을 써야 할 수 있습니다. 사업가는 파트너와 결별해야 해서 지분 매입이나 자산 매각이 필요할 수 있습니다. 필수품이 예고 없이 고장 나 즉시 교체해야 할 수 있습니다. 생명보험과 재산보험에 가입하는 것이 좋습니다. 건강 문제와 사고가 재정에 영향을 줄 수 있으니 비상 자금을 준비해두세요.",
            financeQuote: "낡은 구조물이 무너질 때, 현명한 자는 이미 새 설계도를 쥐고 있다.",
            health: "특히 난폭 운전이나 높은 곳에서의 작업으로 인한 사고에 주의하세요. 건강 면에서는 열과 온도가 뇌혈관에 미치는 영향을 조심하세요. 기관지·소화관·위산 역류 관련 문제가 있을 수 있습니다. 안전 운전을 하고, 고소 작업을 피하며, 소화기 건강에 특별히 신경 쓰세요.",
            healthQuote: "폭풍이 지나면 몸은 이전보다 더 강하게 재건된다."
        }
    },
    "THE STAR": {
        en: {
            love: "Singles, you're starting to take better care of yourself, from your hairstyle to your skin and wardrobe. While you're getting attention from others, it may not be from the person you have your eye on. The timing for love hasn't arrived yet; in the meantime, focus on loving yourself.\n\nFor those in a relationship, you feel the love has faded and wonder whether you've been the only one investing in this relationship. Feeling this imbalance, you've turned your attention to yourself, focusing more on your body, diet, and appearance.",
            loveQuote: "Before you find the love you seek, become the love you wish to receive.",
            work: "You've been pouring your heart into work and projects, but results may fall short of expectations. Perhaps you've spent too long building foundations, making it hard for others to see progress. Job seekers may land a role outside their expertise, requiring a long learning curve. This card also suggests you're starting to value your external image as important for career advancement. There may be company activities where you get to stand out and showcase your talents.",
            workQuote: "Even when the harvest is delayed, the seeds you planted still grow.",
            finance: "You may feel that your pay doesn't match your effort, but can't see how to earn more. Past investments feel like pouring water into desert sand; the principal is gone but you still hope for a return. For those who are attractive, there may be income opportunities from beauty pageants or personality-driven work. Those without financial problems may be in a generous phase, spending money on charity and good causes.",
            financeQuote: "Hope is the investment that never loses its value.",
            health: "For those who've recently had surgery, this is a recovery period. Give your body time to rest and heal. Watch out for falls affecting ankles and knees. Some may start focusing on their figure and visiting beauty clinics. Get adequate rest, follow physical therapy as prescribed, and be careful with movements during recovery.",
            healthQuote: "Healing is the gentle art of becoming whole again, one star at a time."
        },
        ja: {
            love: "独身の方は、髪型からスキンケア、ファッションまで、自分磨きを始めています。周囲から注目されていますが、あなたが気になっている人からとは限りません。恋愛のタイミングはまだ来ていません。今は自分を愛することに集中しましょう。\n\n交際中の方は、愛情が薄れたと感じ、自分だけがこの関係に投資してきたのではないかと疑問に思っています。このアンバランスを感じ、自分自身に目を向け、体型や食事、外見により注意を払うようになっています。",
            loveQuote: "求める愛を見つける前に、まず自分が受け取りたい愛そのものになろう。",
            work: "仕事やプロジェクトに心血を注いできましたが、結果は期待に届かないかもしれません。基盤づくりに時間をかけすぎて、他の人には進捗が見えにくくなっているのかもしれません。求職者は専門外の仕事に就き、長い学習期間が必要になることも。このカードは、キャリアアップのために外見の重要性を意識し始めていることも示しています。",
            workQuote: "収穫が遅れても、あなたが蒔いた種は育ち続けている。",
            finance: "努力に見合う報酬を得られていないと感じつつも、もっと稼ぐ方法が見えないかもしれません。過去の投資は砂漠に水を撒くようで、元本は消えたのにまだリターンを期待しています。魅力的な方は、コンテストやタレント性を活かした仕事で収入を得る機会があるかもしれません。経済的に問題がない方は、寛大な気持ちになり、慈善活動にお金を使う時期かもしれません。",
            financeQuote: "希望こそ、その価値を失うことのない投資だ。",
            health: "最近手術を受けた方は、回復期にあります。体を休ませ、癒す時間を与えましょう。足首や膝の転倒事故に注意してください。美容クリニックに通い始める方もいるかもしれません。十分な休息をとり、処方されたリハビリに従い、回復期間中は動作に気をつけましょう。",
            healthQuote: "癒しとは、一つずつ星を灯すように、再び完全になっていく優しい営みだ。"
        },
        ko: {
            love: "싱글인 당신은 헤어스타일부터 피부, 옷차림까지 자기 관리에 더 신경 쓰기 시작했습니다. 다른 사람들의 관심은 받고 있지만, 정작 마음에 두고 있는 사람에게서는 아닐 수 있습니다. 사랑의 타이밍이 아직 오지 않았으니, 그동안 자기 자신을 사랑하는 데 집중하세요.\n\n연인이 있는 분은 사랑이 식었다고 느끼며, 이 관계에서 혼자만 노력하고 있었는지 의문이 들 수 있습니다. 이런 불균형을 느끼며 몸매·식단·외모에 더 집중하기 시작했습니다.",
            loveQuote: "찾고 있는 사랑을 만나기 전에, 먼저 받고 싶은 사랑이 되어라.",
            work: "업무와 프로젝트에 마음을 다해 임했지만, 결과가 기대에 미치지 못할 수 있습니다. 기초를 쌓는 데 너무 오래 걸려 남들이 진척을 보기 어려울 수 있습니다. 구직자는 전문 분야 밖의 직무에 취업해 긴 학습 곡선이 필요할 수 있습니다. 회사 행사에서 재능을 뽐낼 기회가 있을 수 있습니다.",
            workQuote: "수확이 늦어져도 뿌린 씨앗은 여전히 자라고 있다.",
            finance: "노력에 비해 보상이 부족하다고 느끼지만, 어떻게 더 벌어야 할지 보이지 않을 수 있습니다. 과거 투자는 사막에 물 뿌린 것 같아 원금은 사라졌지만 아직 수익을 기대하고 있습니다. 외모가 뛰어난 분은 미인 대회나 인물 기반 업무에서 수입 기회가 있을 수 있습니다. 재정 문제가 없는 분은 자선 활동에 기부하는 관대한 시기일 수 있습니다.",
            financeQuote: "희망은 결코 가치를 잃지 않는 투자이다.",
            health: "최근 수술을 받은 분은 회복기입니다. 몸에 충분한 휴식을 주세요. 발목과 무릎 부상을 조심하세요. 외모에 관심을 갖기 시작해 미용 클리닉을 방문할 수 있습니다. 충분히 쉬고, 처방대로 물리치료를 따르며, 회복기에 움직임을 조심하세요.",
            healthQuote: "치유는 한 번에 하나의 별빛처럼, 다시 온전해지는 부드러운 여정이다."
        }
    },
    "THE MOON": {
        en: {
            love: "Singles may feel lonely and crave companionship. Going out at night might lead to meeting someone to ease the loneliness, but it would only be a temporary connection. For those talking to someone, that person may behave suspiciously, responding normally during the day but vanishing at night. Even if they say nothing's going on, your intuition warns you to be careful.\n\nFor those in a relationship, things are quite tense. Conversations often end in arguments, leaving unresolved issues lingering. Or it could simply be that you're on different schedules, making it hard to find time to talk.",
            loveQuote: "Not all shadows hide monsters; some conceal the path to deeper truth.",
            work: "Relationships with colleagues aren't smooth. There are negative rumors about you. Be careful of misunderstandings with your boss, as opinions may clash. You may feel you're not being treated fairly or given clarity. For those wanting to switch jobs, opportunities may be far from home and inconvenient to commute. Those on vacation may have worries keeping them up at night. If traveling abroad, you might have to wake up in the middle of the night for work calls due to time zone differences.",
            workQuote: "In the fog of uncertainty, trust the inner compass you carry.",
            finance: "Finances are rather bleak during this period. You may be tired of your current situation and wish for better, but can't find a way out. People who borrowed money give promises but don't pay back. If you need help, you get words but no action. Beware of scammers who ask you to transfer money upfront for products, or who pretend to be close acquaintances wanting to develop a relationship. Verify credibility thoroughly before any transactions.",
            financeQuote: "When the night is darkest, guard your treasures most carefully.",
            health: "Women may experience emotional sensitivity and anxiety from hormonal changes. Men may have insomnia from stress, especially relationship-related. Those who drive should watch out for drowsy driving. Find ways to relieve stress, get adequate rest, and keep snacks handy during long drives to prevent drowsiness.",
            healthQuote: "Even the restless tide finds peace when the moon gently guides it home."
        },
        ja: {
            love: "独身の方は、孤独を感じ、誰かのそばにいたいと切望しているかもしれません。夜の外出で寂しさを紛らわせる相手と出会うことはあっても、一時的なつながりに終わるでしょう。連絡を取り合っている人がいる場合、昼間は普通に返事をするのに夜になると音信不通になるなど、不審な行動をとるかもしれません。\n\n交際中の方は、かなり緊張した状態です。会話がしばしば口論に発展し、未解決の問題がくすぶっています。あるいは単純に生活リズムが合わず、話す時間が取れないだけかもしれません。",
            loveQuote: "すべての影が怪物を隠しているわけではない。より深い真実への道を隠しているものもある。",
            work: "同僚との関係がスムーズではありません。あなたに関する悪い噂が流れています。上司との誤解にも注意しましょう。意見の食い違いがあるかもしれません。公正に扱われていない、明確な情報が得られないと感じることも。転職を希望する方は、自宅から遠く通勤が不便な場所のオファーかもしれません。海外出張中の方は、時差のために深夜に仕事の電話で起こされることもあるでしょう。",
            workQuote: "不確実性の霧の中では、あなたが持つ内なる羅針盤を信じよう。",
            finance: "この時期の財務状況はかなり厳しいです。現状に疲れ、改善を望んでいますが、打開策が見つかりません。お金を貸した人は約束だけして返しません。助けを求めても、言葉だけで行動が伴いません。お金を先に振り込ませる詐欺師や、親しい知人を装って近づいてくる人にも注意しましょう。取引前に信頼性を十分に確認してください。",
            financeQuote: "夜が最も暗いとき、最も慎重に宝を守れ。",
            health: "女性はホルモンの変化による感情の敏感さや不安を感じるかもしれません。男性は特に恋愛関連のストレスで不眠に悩むことも。車を運転する方は、居眠り運転に注意してください。ストレス解消法を見つけ、十分な休息をとり、長距離運転時には眠気防止のための軽食を用意しましょう。",
            healthQuote: "落ち着きのない潮も、月が優しく導けば安らぎを見つける。"
        },
        ko: {
            love: "싱글이라면 외로움을 느끼고 누군가와 함께하고 싶을 수 있습니다. 밤에 외출하면 외로움을 달래줄 사람을 만날 수 있지만, 일시적인 인연에 그칠 것입니다. 누군가와 대화 중이라면, 그 사람이 수상하게 행동할 수 있습니다. 낮에는 정상적으로 답하다가 밤에는 사라집니다. 아무 일도 아니라고 해도 직감은 조심하라고 경고합니다.\n\n연인이 있는 분은 상당히 긴장된 상태입니다. 대화가 자주 다툼으로 끝나고 해결되지 않은 문제가 남습니다. 단순히 생활 패턴이 달라 대화할 시간을 찾기 어려운 것일 수도 있습니다.",
            loveQuote: "모든 그림자가 괴물을 숨기는 것은 아니다. 더 깊은 진실로의 길을 가리키는 것도 있다.",
            work: "동료 관계가 원활하지 않습니다. 당신에 대한 부정적인 소문이 있습니다. 상사와의 오해를 조심하세요. 공정하게 대우받지 못하거나 명확한 설명을 듣지 못한다고 느낄 수 있습니다. 이직을 원하는 분은 기회가 집에서 멀어 출퇴근이 불편할 수 있습니다. 휴가 중에도 걱정이 잠을 방해할 수 있습니다.",
            workQuote: "불확실성의 안개 속에서, 당신이 지닌 내면의 나침반을 믿어라.",
            finance: "이 시기 재정이 매우 어둡습니다. 현 상황에 지쳐 더 나은 것을 원하지만 탈출구를 찾지 못합니다. 돈을 빌려준 사람은 약속만 하고 갚지 않습니다. 도움을 요청해도 말만 있고 행동은 없습니다. 제품 구매를 위해 선입금을 요구하는 사기꾼이나, 친한 지인인 척하며 관계를 발전시키려는 사기꾼을 조심하세요. 거래 전에 신뢰성을 철저히 확인하세요.",
            financeQuote: "밤이 가장 어두울 때 보물을 가장 조심스럽게 지켜라.",
            health: "여성은 호르몬 변화로 감정적 민감함과 불안을 경험할 수 있습니다. 남성은 스트레스, 특히 연애 관련 스트레스로 불면증이 있을 수 있습니다. 운전하는 분은 졸음 운전에 주의하세요. 스트레스를 해소할 방법을 찾고, 충분히 쉬며, 장거리 운전 시 졸음 방지 간식을 준비하세요.",
            healthQuote: "불안한 파도도 달이 부드럽게 인도하면 결국 평화를 찾는다."
        }
    },
    "THE SUN": {
        en: {
            love: "Singles are entering a bright phase where charm is radiating. Many people are showing interest and paying special attention to you. If you've been undecided about love, you'll receive a clear answer soon. But beware of accidentally revealing romantic secrets.\n\nFor those in a relationship, your feelings and actions or those of your partner will be exposed for others to see. A hidden relationship may be revealed, or there may be a reason for a sudden trip together.",
            loveQuote: "Love shines brightest when it steps fearlessly into the light.",
            work: "A project you've been working on for a long time will finally be unveiled to the public. You may be in the final stretch of delivering work to a client. Just hitting send and it's done, bringing relief from the pressure of deadlines. Those bored with their current job will dare to resign. However, this card isn't great for those with secret workplace relationships, as secrets may be exposed. If you make mistakes, someone might publicize them. For those in energy, electricity, and solar power fields, work goes smoothly. Those in entertainment and fame-dependent careers may find their name trending on social media.",
            workQuote: "Step into the light and let the world see what you were born to do.",
            finance: "If you run your own business, newly launched products will generate strong sales. Those who rely on reputation for income will receive more bookings. For those with debt issues, you'll be able to pay off a significant amount, easing your anxiety. There are also signs of windfalls, possibly receiving a lump sum after going through a major life change. Set aside some of it for reinvestment.",
            financeQuote: "Clarity is the sunrise that reveals where true wealth has always been.",
            health: "If you've recently been hospitalized for a non-serious illness, your health will gradually improve and you'll be going home soon. Those with chronic conditions may receive health news, both good and bad. You may need X-rays, radiation therapy, or contrast dye procedures. Follow your doctor's advice strictly and prepare yourself mentally for possible test results.",
            healthQuote: "The sun heals what the darkness could not reach."
        },
        ja: {
            love: "独身の方は、魅力が輝く明るい時期に入ります。多くの人が興味を示し、特別な注目を寄せています。恋愛について迷っていた方は、まもなく明確な答えを得るでしょう。ただし、恋愛の秘密をうっかり漏らさないよう注意してください。\n\n交際中の方は、あなたやパートナーの気持ちや行動が周囲に明らかになるかもしれません。隠していた関係が露見したり、急遽一緒に旅行する理由ができたりするかもしれません。",
            loveQuote: "愛は、恐れなく光の中へ踏み出すとき、最も輝く。",
            work: "長い間取り組んできたプロジェクトがついに公開されます。クライアントへの最終納品の段階かもしれません。送信ボタンを押すだけで完了し、締め切りのプレッシャーから解放されます。今の仕事に飽きている方は思い切って辞める勇気が出るでしょう。ただし、職場の秘密の恋愛関係がある方には要注意です。ミスをすれば誰かに広められるかもしれません。エネルギー・電力・太陽光発電の分野では仕事が順調に進みます。",
            workQuote: "光の中へ踏み出し、世界にあなたの使命を見せよう。",
            finance: "自営業の方は、新商品の売れ行きが好調でしょう。知名度で収入を得ている方はより多くの依頼を受けるでしょう。借金がある方は、かなりの額を返済でき、不安が和らぎます。臨時収入の兆しもあり、大きな人生の変化を経てまとまった金額を受け取る可能性があります。再投資のために一部を取り分けておきましょう。",
            financeQuote: "明晰さは、真の富がどこにあったかを示す日の出だ。",
            health: "軽度の病気で最近入院していた方は、徐々に回復し、まもなく退院できるでしょう。持病のある方は、良い知らせも悪い知らせも含む健康情報を受け取るかもしれません。レントゲン、放射線治療、造影検査が必要になることも。医師のアドバイスを厳守し、検査結果に対して心の準備をしておきましょう。",
            healthQuote: "太陽は、闇が届かなかったところを癒す。"
        },
        ko: {
            love: "싱글은 매력이 빛나는 밝은 시기에 접어듭니다. 많은 사람이 관심을 보이며 특별한 관심을 줍니다. 사랑에 대해 결정을 못 내리고 있었다면 곧 명확한 답을 받게 될 것입니다. 하지만 연애 비밀을 실수로 드러내지 않도록 주의하세요.\n\n연인이 있는 분은 당신이나 상대의 감정과 행동이 다른 사람들에게 드러나게 됩니다. 비밀 연애가 밝혀지거나 갑자기 함께 여행을 가야 할 이유가 생길 수 있습니다.",
            loveQuote: "사랑은 두려움 없이 빛 속으로 나설 때 가장 환하게 빛난다.",
            work: "오랫동안 작업해온 프로젝트가 마침내 대중에게 공개됩니다. 클라이언트에게 작업물을 전달하는 마지막 단계에 있을 수 있습니다. 전송 버튼만 누르면 끝이며, 마감 압박에서 해방됩니다. 현재 직장에 지루해진 분은 과감히 사직할 것입니다. 하지만 직장 내 비밀 연애를 하고 있다면 비밀이 탄로날 수 있으니 주의하세요. 에너지·전기·태양광 분야는 순조롭습니다.",
            workQuote: "빛 속으로 나가 세상에 당신의 재능을 보여줘라.",
            finance: "자영업자라면 새로 출시한 제품이 높은 매출을 기록할 것입니다. 명성에 의존하는 분은 더 많은 예약을 받게 됩니다. 빚 문제가 있던 분은 상당 부분을 갚을 수 있어 불안감이 줄어듭니다. 뜻밖의 수입 징조도 있으며, 큰 인생 변화 후 목돈을 받을 수 있습니다. 일부는 재투자를 위해 남겨두세요.",
            financeQuote: "명확함은 진정한 부가 항상 어디에 있었는지를 드러내는 일출이다.",
            health: "최근 가벼운 질환으로 입원했다면 건강이 점차 호전되어 곧 퇴원할 수 있습니다. 만성 질환자는 좋은 소식과 나쁜 소식 모두를 받을 수 있습니다. 엑스레이·방사선 치료·조영제 시술이 필요할 수 있습니다. 의사의 조언을 철저히 따르고, 검사 결과에 대해 마음의 준비를 하세요.",
            healthQuote: "태양은 어둠이 닿지 못했던 곳을 치유한다."
        }
    },
    "JUDGEMENT": {
        en: {
            love: "Singles may hear from someone you were previously involved with. They may return seeking reconciliation or a second chance, asking you to reconsider the past relationship. Think carefully about whether to give them another opportunity.\n\nFor those in a relationship, there may be an important announcement affecting the relationship, such as a wedding, moving house, or pregnancy. Some couples may need to make a crucial decision about their shared future.",
            loveQuote: "The call of love returns to those brave enough to answer it twice.",
            work: "You may need to attend a major company meeting. There could be policy announcements from management or a new project requiring cross-department collaboration. This card may represent a monthly performance review with detailed numbers and statistics. Departments with poor results or those deemed unprofitable may face dissolution or project cancellation. There may also be upcoming company events or team-building trips. Or you might be secretly planning to take time off for a concert or festival you love.",
            workQuote: "Every ending is a trumpet calling you toward a greater beginning.",
            finance: "Most expenses will be social obligations, charity, or unavoidable social costs. For those with debt, you may receive payment demand notices and be called in to set up a repayment plan. If you've been behind on home or car payments for a long time, contact the bank to negotiate before it reaches legal proceedings. However, expenses might simply be routine, such as medical costs, international travel, or entertainment.",
            financeQuote: "Settle your debts with the past, and the future opens its vault.",
            health: "Old health issues may return, requiring another hospital visit. For those currently in treatment, the body will gradually recover and you'll regain normal mobility. Some may have appointments for health check-ups or blood donations. Continue taking care of your health, keep up with appointments, and don't ignore any unusual symptoms that arise.",
            healthQuote: "The body remembers, and through that memory, it knows how to heal."
        },
        ja: {
            love: "独身の方は、以前関わりのあった人から連絡があるかもしれません。復縁や二度目のチャンスを求めて戻ってくるかもしれません。もう一度チャンスを与えるかどうか、慎重に考えましょう。\n\n交際中の方は、結婚、引っ越し、妊娠など、関係に影響する重要な発表があるかもしれません。共に歩む将来について重大な決断を迫られるカップルもいるでしょう。",
            loveQuote: "愛の呼びかけは、二度目に応える勇気のある者のもとへ戻ってくる。",
            work: "会社の重要な会議に出席する必要があるかもしれません。経営陣からの方針発表や、部門横断的な新プロジェクトの話があるかもしれません。月次の業績評価で詳細な数字や統計が示されることも。成績が悪い部門やプロジェクトは解散や中止になる可能性があります。社内イベントやチームビルディングの旅行もあるかもしれません。",
            workQuote: "すべての終わりは、より大きな始まりへあなたを呼ぶトランペットだ。",
            finance: "支出のほとんどは社交的な義理、慈善活動、避けられない付き合いの費用でしょう。借金がある方は、支払い要求の通知を受け取り、返済計画を立てるよう求められるかもしれません。住宅ローンや車のローンが長期滞納している場合は、法的手続きに進む前に銀行に連絡して交渉しましょう。",
            financeQuote: "過去への負債を清算すれば、未来がその金庫を開く。",
            health: "以前の健康問題が再発し、再度の通院が必要になるかもしれません。現在治療中の方は、体が徐々に回復し、通常の活動に戻れるでしょう。健康診断や献血の予約がある方もいるかもしれません。健康管理を続け、通院を欠かさず、異常な症状を見逃さないようにしましょう。",
            healthQuote: "体は覚えている。そしてその記憶を通じて、癒し方を知っている。"
        },
        ko: {
            love: "싱글이라면 이전에 인연이 있었던 사람에게서 연락이 올 수 있습니다. 재결합이나 두 번째 기회를 구하며 과거 관계를 다시 생각해달라고 요청할 수 있습니다. 다시 기회를 줄지 신중히 생각하세요.\n\n연인이 있는 분은 결혼·이사·임신 등 관계에 영향을 미치는 중요한 발표가 있을 수 있습니다. 함께하는 미래에 대해 중대한 결정을 내려야 할 커플도 있습니다.",
            loveQuote: "사랑의 부름은 두 번째로 응답할 용기가 있는 자에게 돌아온다.",
            work: "회사 대규모 회의에 참석해야 할 수 있습니다. 경영진의 정책 발표나 부서 간 협업이 필요한 새 프로젝트가 있을 수 있습니다. 월간 실적 리뷰에서 상세한 수치와 통계가 제시될 수 있습니다. 성과가 부진한 부서는 해체되거나 프로젝트가 취소될 수 있습니다. 회사 행사나 워크숍이 예정되어 있을 수도 있습니다.",
            workQuote: "모든 끝은 더 큰 시작으로 부르는 나팔 소리이다.",
            finance: "대부분의 지출은 경조사비·기부금·피할 수 없는 사회적 비용입니다. 빚이 있는 분은 상환 요구 통지를 받고 상환 계획을 세우라는 연락이 올 수 있습니다. 주택이나 자동차 대출이 오래 연체되었다면 법적 절차가 되기 전에 은행과 협상하세요. 특별한 문제가 없다면 의료비·해외 여행·여가비 등 일상적 지출이 대부분일 것입니다.",
            financeQuote: "과거의 빚을 청산하면 미래의 금고가 열린다.",
            health: "오래된 건강 문제가 재발해 다시 병원을 찾아야 할 수 있습니다. 현재 치료 중인 분은 몸이 점차 회복되어 정상적인 활동이 가능해질 것입니다. 건강검진이나 헌혈 예약이 있을 수 있습니다. 꾸준히 건강을 관리하고, 진료 예약을 지키며, 이상 증상을 무시하지 마세요.",
            healthQuote: "몸은 기억한다. 그 기억을 통해 치유하는 법을 안다."
        }
    },
    "THE WORLD": {
        en: {
            love: "Singles, even though you try to maintain physical distance, people still keep reaching out through LINE, inbox, and email. If you run an online business, old customers may reconnect, and ex-partners may reach out too.\n\nFor those in a relationship, even though you want personal time, your partner seems to need extra attention and care from you, requiring you to balance time between work and love.",
            loveQuote: "The whole world is a mirror reflecting the love you carry within.",
            work: "You'll serve as a liaison coordinating between external and internal contacts, both domestic and international. Your responsibilities are all about communication and connecting with people. For those who don't do this kind of work, you may feel like an outsider, unable to fit in with colleagues. Your lifestyle and conversation topics may differ from everyone else's. Not only do you not understand them, but they don't quite understand you either.",
            workQuote: "Completion is not the end; it is the doorway to your next great chapter.",
            finance: "If you have financial problems, try converting old assets into cash. You don't necessarily have to sell outright; you can use them as collateral for a bank loan to improve liquidity. For those without problems, you're living above financial worries. While you may not have much cash, your assets provide a safety net. Windfalls may not come during this period, but if you want to try your luck, pray to the spirits.",
            financeQuote: "True wealth is knowing you have enough, even when the coffers seem quiet.",
            health: "Changing weather may trigger allergies, especially skin-related. Watch out for skin infections ranging from ordinary wound infections to shingles and psoriasis. Take extra care of your skin health, maintain cleanliness, and see a doctor promptly if you notice anything unusual.",
            healthQuote: "The body is a world unto itself; tend to every corner with care."
        },
        ja: {
            love: "独身の方は、物理的な距離を保とうとしても、LINE、メッセージ、メールを通じて人々が連絡してきます。オンラインビジネスをしている方は、昔のお客様が再び連絡してきたり、元パートナーから連絡が来ることもあります。\n\n交際中の方は、一人の時間が欲しいのに、パートナーがいつも以上にあなたの注目とケアを必要としているようで、仕事と恋愛の時間のバランスを取る必要があります。",
            loveQuote: "世界全体が、あなたの内なる愛を映し出す鏡だ。",
            work: "外部と内部、国内と海外の連絡役として調整業務に当たるでしょう。あなたの役割はコミュニケーションと人とのつながりがすべてです。このような仕事をしていない方は、同僚の中で浮いていると感じるかもしれません。ライフスタイルや話題が周りと異なり、あなたが彼らを理解できないだけでなく、彼らもあなたを完全には理解できていません。",
            workQuote: "完成は終わりではない。次の偉大な章への扉だ。",
            finance: "経済的な問題がある場合は、古い資産を現金化してみましょう。必ずしも売却する必要はなく、銀行ローンの担保にして流動性を改善する方法もあります。問題がない方は、経済的な心配を超えた暮らしをしています。現金は多くなくても、資産がセーフティネットになっています。この時期に臨時収入は期待しにくいですが、運試しがしたければ祈りを捧げてみてください。",
            financeQuote: "本当の豊かさとは、金庫が静かな時でも十分だと知っていることだ。",
            health: "天候の変化がアレルギー、特に皮膚のアレルギーを引き起こすかもしれません。通常の傷口感染から帯状疱疹、乾癬に至るまで、皮膚感染症に注意しましょう。肌の健康に特に気を配り、清潔を保ち、異変に気づいたらすぐに医師の診察を受けましょう。",
            healthQuote: "体はそれ自体が一つの世界。すべての隅々まで丁寧にケアしよう。"
        },
        ko: {
            love: "싱글이 물리적 거리를 유지하려 해도 사람들은 LINE·DM·이메일을 통해 계속 연락해옵니다. 온라인 사업을 하면 예전 고객이 다시 연결되고, 전 연인도 연락할 수 있습니다.\n\n연인이 있는 분은 개인적인 시간을 원하지만 상대가 당신의 관심과 보살핌을 더 필요로 하며, 일과 사랑 사이에서 시간 균형을 맞춰야 합니다.",
            loveQuote: "온 세상은 당신 안에 품고 있는 사랑을 비추는 거울이다.",
            work: "외부와 내부, 국내외 연락 담당자 사이를 조율하는 역할을 맡게 됩니다. 업무의 핵심이 소통과 인적 네트워크입니다. 이런 업무를 하지 않는 분은 아웃사이더처럼 느끼고 동료들과 어울리지 못할 수 있습니다. 생활 방식과 대화 주제가 모두와 다를 수 있습니다.",
            workQuote: "완성은 끝이 아니라, 다음 위대한 장으로 향하는 문이다.",
            finance: "재정 문제가 있다면 오래된 자산을 현금으로 전환해보세요. 반드시 팔 필요는 없고 은행 대출의 담보로 활용해 유동성을 개선할 수 있습니다. 문제가 없는 분은 재정적 걱정 없이 생활하고 있습니다. 현금은 많지 않아도 자산이 안전망이 됩니다. 뜻밖의 수입은 이 시기에 기대하기 어렵지만, 운을 시험해보고 싶다면 기도해보세요.",
            financeQuote: "진정한 부는 금고가 조용할 때에도 충분함을 아는 것이다.",
            health: "변덕스러운 날씨가 알레르기를 유발할 수 있으며, 특히 피부 관련 문제에 주의하세요. 일반적인 상처 감염부터 대상포진과 건선까지 피부 감염을 조심하세요. 피부 건강에 각별히 신경 쓰고, 청결을 유지하며, 이상이 있으면 즉시 병원에 가세요.",
            healthQuote: "몸은 그 자체로 하나의 세계이다. 구석구석 돌보아라."
        }
    },
    "PAGE OF WANDS": {
        en: {
            love: "Singles will receive good news about love. Someone may reach out through social media or be introduced by a friend. The person will have a bright, enthusiastic personality. Though they may seem young or inexperienced, they are genuine and eager to learn.\n\nFor those in a relationship, you may get interesting news about your partner, or receive sweet messages that make your heart swell. It's a time when love feels fresh and vibrant.",
            loveQuote: "Young love carries a message: dare to begin, and joy will follow.",
            work: "This is a good time to update your profile and look for new opportunities. If you've posted your resume on job sites, you may receive interesting offers that need further discussion. For current employees, the company may bring in interns or new hires for you to mentor. Though tiring, it will be worthwhile, as they'll eventually help with your paperwork.",
            workQuote: "Every master was once a student who dared to take the first step.",
            finance: "Financial liquidity is moderate, not outstanding but not difficult either. For those wanting extra income, there are opportunities for side work in communications, typing, or admin tasks. If you've applied for a credit card, the bank may contact you for additional information. Prepare your documents and check your credit bureau report. If there are issues, resolve them before applying.",
            financeQuote: "Small messages of opportunity grow into great fortunes when answered.",
            health: "Watch out for rashes, redness, and allergies that may flare up from weather or new products. Acne may break out at the worst possible time. Some may have appointments at a beauty clinic for procedures or laser treatments. Be cautious with new products and always do a patch test first.",
            healthQuote: "A youthful body still needs the patience to treat it kindly."
        }
    },
    "KNIGHT OF WANDS": {
        en: {
            love: "Singles may find love suddenly, meeting someone who makes your heart race during a trip or in an unexpected place. They'll enter your life quickly, making everything exciting and thrilling. But be careful not to rush things so fast that you scare the other person off.\n\nFor those in a relationship, there may be a spontaneous trip or unplanned activity together that adds color and excitement to the relationship.",
            loveQuote: "Passion rides fast, but the deepest love learns when to slow its gallop.",
            work: "You'll be assigned important work with tight deadlines. Expect frequent travel to meet clients, including trips to other provinces or countries. Business owners should focus on aggressive marketing and logistics. Job seekers may land a position far from home. Freelancers will be flooded with urgent work, and even when you try to decline, clients insist on hiring you. It's like a horse galloping forward without rest.",
            workQuote: "Speed is your ally when courage holds the reins.",
            finance: "You're eagerly taking on every side job that comes your way. You can charge premium rates thanks to client urgency. People are willing to pay if you're willing to deliver. On the expense side, you may be planning to buy a new car or spending on repairs and maintenance. Research well before purchasing, and budget for ongoing costs like insurance, fuel, and upkeep.",
            financeQuote: "Ride the wave of opportunity, but always know where the shore lies.",
            health: "Your body is functioning well. You may feel motivated to exercise more. Some may use dietary supplements for fat burning and muscle building. Watch out for driving accidents, especially delivery riders. Drive carefully, and research supplements thoroughly before using them.",
            healthQuote: "A swift body thrives longest when it also knows the art of rest."
        }
    },
    "QUEEN OF WANDS": {
        en: {
            love: "Singles will meet someone with powerful charm who attracts attention everywhere. But the relationship may be complicated because they have many admirers. If you're a woman with a male partner who has a close female friend, watch out for that friend; she may not view you as warmly as she appears.\n\nFor those in a relationship, there may be issues about self-expression. One partner may feel the other places too much importance on outward appearances.",
            loveQuote: "A queen of hearts knows her worth and never settles for less.",
            work: "Work coming your way will be familiar and within your expertise, likely involving documents, client coordination, and gathering feedback. For those seeking advancement, start looking for specialized skills or management training, perhaps short courses or expert-led workshops. Job seekers may receive good news, but it could be a lateral move rather than a promotion.",
            workQuote: "Mastery is quiet confidence; the world notices even when you don't announce it.",
            finance: "Your income is stable and has been for a while. It's not tight enough to be stressful, but not enough to be extravagant. If job hunting, the new salary may not differ much from your current one. Freelancers will have steady work but can't raise their rates just yet. Use this time to develop your skills and build a standout portfolio to unlock higher-paying opportunities in the future.",
            financeQuote: "The queen who invests in herself reaps the richest rewards.",
            health: "Allergies may flare up from weather or dust. Pet owners should watch out for scratches and skin diseases from pets, especially long-haired cats that may carry fungal infections. Keep your living space clean regularly and maintain your pets' hygiene.",
            healthQuote: "A radiant spirit begins with a body tended with care and attention."
        }
    },
    "KING OF WANDS": {
        en: {
            love: "Singles will meet someone with strong leadership qualities, broad vision, and high ambition. They may not care much about outward appearance, but their charm comes from confidence and competence. If you're a man, you'll attract interest for being talented and personable, even if you don't put much effort into your looks.\n\nFor those in a relationship, one partner may receive a career advancement opportunity, leaving less time for love. But the other will understand and be supportive.",
            loveQuote: "A heart that leads with vision inspires a love that endures.",
            work: "You'll be entrusted with an important long-term company project, or you may get a new boss who has both experience and capability. Working with them will be a great learning opportunity. This card may indicate deciding to pursue a master's degree for better qualifications and higher salary potential. Or you may be planning to start your own business and preparing company registration documents.",
            workQuote: "True authority is earned through wisdom, not merely worn as a title.",
            finance: "There are opportunities for promotion or a new, better job with a salary that could double. If you're tired of regular employment, you may spot profitable investment opportunities during this period. For those with financial problems, an older male figure will offer help. Use this chance to plan long-term finances, including income growth and investments. Don't forget to keep an emergency fund.",
            financeQuote: "The king builds his treasury with vision, patience, and bold decisions.",
            health: "Those without chronic conditions may be exhausted from overwork, experiencing office syndrome. Older men with existing conditions should be cautious of heat exposure, stroke risk, and partial numbness. Get adequate rest and avoid extreme heat during hot weather.",
            healthQuote: "Even kings must rest; a crown means nothing on an empty vessel."
        }
    },
    "PAGE OF CUPS": {
        en: {
            love: "For singles, someone will come into your life through shared interests, especially in art, literature, and food. If you connect online, there's a good chance of meeting in person. They're sincere and straightforward, with potential for the relationship to develop.\n\nFor those in a relationship, the bond will grow stronger. Your partner will pay special attention to you, perhaps with a fancy dinner or a surprise gift around a holiday or anniversary. Married couples trying for a child may receive good news.",
            loveQuote: "Love arrives like a gentle tide, carrying treasures from the deep.",
            work: "Good news is coming regarding work. A project you presented will receive praise. Those in literature and art will create impressive new work. Content curators will find quality material to develop further. For general workers, a new team member may join and cause a bit of a stir if they're attractive, distracting colleagues from their tasks.",
            workQuote: "Fresh inspiration pours in when you least expect it; keep your cup ready.",
            finance: "Lucky prospects are favorable. Those waiting for financial help will receive good news. Singles will have admirers giving valuable gifts. Life is smooth and happy overall. Married individuals may receive baby news, motivating them to work harder. For those in art and literature, there are opportunities to earn from copyrights. Leverage your work to generate income from multiple streams.",
            financeQuote: "Small blessings, received with gratitude, multiply into abundance.",
            health: "Those without diabetes are generally in good health. People watching their weight may feel envious seeing others enjoy delicious food. Watch out for food allergies, especially seafood. Always ask about ingredients before eating.",
            healthQuote: "Listen to what your body whispers before it has to shout."
        }
    },
    "KNIGHT OF CUPS": {
        en: {
            love: "For singles, a friend may introduce you to someone interesting, or a friend of a friend may connect through social media. They're initially attracted to your appearance but aren't in a rush for romance, still wanting to explore their interests. They may seem caring, but it doesn't necessarily mean they're serious.\n\nFor those in a relationship, you may take a short trip together. The relationship develops slowly but steadily. You'll get to know more of their inner circle, both friends and family. For long-distance couples, there's a chance to be together soon; they may come to you or send you a ticket.",
            loveQuote: "The sweetest romance unfolds at the pace of two hearts learning to trust.",
            work: "A new hire may unintentionally cause a stir at the office by being too attractive. For regular employees, projects will progress gradually. You may need to travel to meet clients in other provinces. While it won't boost sales directly, it helps maintain relationships. If someone new joins the team, those in relationships should be wary of flirtation, while singles might find workplace romance. Balance relationships and work carefully.",
            workQuote: "A steady hand on the reins guides the journey further than a galloping heart.",
            finance: "Your luck may not come as cash but through meeting a foreigner who brings gifts. If you're planning a long trip, someone may offer to join and cover expenses. For extra income, freelancing suits you better than starting a business. If someone offers to invest in you, don't trust blindly until you see actual money. Maintain good client relationships, as they may bring ongoing work.",
            financeQuote: "Fortune sometimes travels in disguise, arriving as a gift instead of gold.",
            health: "You may experience jet lag from long travels or a hangover from being invited out drinking. Get enough rest, adjust to new time zones gradually, and be careful with alcohol consumption.",
            healthQuote: "Rest is not idleness; it is the quiet repair of a life well lived."
        }
    },
    "QUEEN OF CUPS": {
        en: {
            love: "For singles, you're emotionally unstable and particularly self-conscious about your image. If you secretly admire someone, you watch from afar, too afraid to approach. For men, there may be a woman who secretly likes you without you realizing it. She may be close by, but you mistakenly think she's kind to everyone, when in fact she's only kind to you.\n\nFor those in a relationship, you're overly focused on romance, repeatedly asking your partner what they like about you. You may feel insecure, constantly monitoring their behavior. Open up and discuss your concerns directly. What you fear may just be overthinking.",
            loveQuote: "The heart that dares to speak its fears finds peace it never knew it needed.",
            work: "Your department may get a new supervisor who, while not the strongest decision-maker, provides excellent support and encouragement to the team. Or you may need to work with someone emotionally sensitive, requiring careful words and actions. If you clash with this personality type, work may stall. Performance-wise, things are stable but not growing. If you're content with routine work without challenges, the current job is a good fit.",
            workQuote: "Still waters run deep, and gentle leadership often holds the strongest teams together.",
            finance: "There are prospects for a large sum or windfall from a woman. Those applying for jobs will land a new position with better pay. Freelancers will see clients approve payments soon. Savings tend to go toward spending rather than investing, such as buying trendy designer items. Men may need to open their wallets to impress someone. Set aside some money for investment instead of spending it all on luxuries.",
            financeQuote: "Abundance means nothing if it flows through fingers that never learn to hold.",
            health: "Women may experience anxiety from hormonal changes, with back pain and cravings before menstruation. Men may need to be around someone with mood swings from PMS or menopause. Get adequate rest, manage your emotions, and understand your body's changes.",
            healthQuote: "Tenderness toward your own body is the first medicine for any ailment."
        }
    },
    "KING OF CUPS": {
        en: {
            love: "For singles, a charming person will grow close to you, making you feel special and falling in love. But they may not reserve their warmth for you alone. It's not necessarily that they're a player; they're simply friendly with everyone. If you decide to date them, you'll need to accept that they're kind to all.\n\nFor those in a relationship, your partner will be especially attentive. You'll have heart-to-heart conversations about the relationship, deepening mutual understanding. For long-distance couples, there's a strong chance of meeting up. If the relationship is going well, you may even discuss future plans together.",
            loveQuote: "A love worth keeping is one that sees your depths and stays to swim.",
            work: "You'll be liaising with external parties, both local and international. If there's a change in management, you may work closely with the new leader. If you're skilled in communication and languages, things will go smoothly. They're not difficult or demanding to work with. Job seekers have a good chance of joining a reputable foreign company.",
            workQuote: "The bridge between worlds is built by those who listen before they speak.",
            finance: "Although finances aren't fully stable, every time a problem arises, someone steps in to help. It could be a foreigner or an elder relative living far away. Those hoping for a windfall will be rewarded through spiritual blessings. For those planning to invest, a heavyset gentleman will offer valuable advice. Listen and consider it, but also do your own research.",
            financeQuote: "Wisdom pours from the cup of those who have weathered many tides.",
            health: "You may find an excellent specialist who inspires confidence in your treatment. If surgery is needed, you'll get a renowned surgeon. Those without illness should cut back on drinking. If you live with an elderly man, watch for signs of andropause. Trust your treatment plan and maintain regular health care.",
            healthQuote: "The right healer appears when the heart is ready to receive healing."
        }
    },
    "PAGE OF SWORDS": {
        en: {
            love: "For singles, the person coming into your life will be more annoying than impressive. At first they seem smart and curious, but as you get to know them, they come across as contrarian and overly critical. You have no intention of pursuing things further. You're only chatting to pass the time or to subtly let them know they're not as charming as they think.\n\nFor those in a relationship, you may bicker over minor annoyances. Or you're bothered by someone getting close to your partner. It could be a same-sex friend you see as a bad influence, or an opposite-sex junior who behaves rudely toward you.",
            loveQuote: "Sharp words may win arguments, but gentle ones win hearts.",
            work: "The company may have you sign important documents or contracts, or there may be paperwork issues to resolve. A new employee may join your department for a trial period. They're talented and smart but difficult to communicate with and stubborn. If you're a manager, a subordinate may cause problems or refuse to cooperate with your requests.",
            workQuote: "The sharpest new blade still needs a steady hand to guide it.",
            finance: "Beware of identity theft or account fraud. Business owners should verify every transfer slip. When canceling orders, refund to the same account that made the payment. Watch out for old friends asking to borrow money or younger family members requesting help. Even if reluctant, you may give in just to end the pestering. Practice saying no politely and with reason to protect both your money and relationships.",
            financeQuote: "A watchful eye on the ledger is worth more than a chest full of regret.",
            health: "Watch for injuries from sharp objects like thorns, pins, and nails. Those who cook should beware of knife cuts. Some may need injections or vaccines. Be careful when handling sharp items and keep wounds clean.",
            healthQuote: "Small cuts teach the hands to move with greater care and grace."
        }
    },
    "KNIGHT OF SWORDS": {
        en: {
            love: "For singles, someone may come into your life, but take time to evaluate their temperament, especially regarding emotional control. They may be connected to someone in uniform.\n\nFor those in a relationship, watch your emotions and expressions. Intellectual clashes and heated arguments are likely, with neither side backing down. If the relationship is still good, you might reunite after a long absence, or your partner may be considering buying a new high-performance car.",
            loveQuote: "Love that charges ahead without patience often outruns the heart it chases.",
            work: "If a project has stalled, it will pick up pace again now. You work better independently. You may receive an urgent assignment from your boss and prove that time is no obstacle. If it's civil service exam season, aspiring police officers or soldiers have good prospects.",
            workQuote: "Speed without direction is just turbulence; aim true and the wind becomes your ally.",
            finance: "This is a period of impulsive and careless spending, especially on online shopping that can drain your funds quickly. If you have travel plans, budget carefully for fuel, accommodation, and emergencies. Watch for speeding fines. Pause before spending and plan your finances thoughtfully.",
            financeQuote: "The fastest horse still needs a rider who knows when to pull the reins.",
            health: "Avoid being near hot-tempered people or getting into altercations. Watch for accidents while driving, especially motorcycles. Drive carefully and steer clear of situations that could lead to conflict.",
            healthQuote: "Slow down, for the body that rushes everywhere arrives nowhere whole."
        }
    },
    "QUEEN OF SWORDS": {
        en: {
            love: "For singles, you project a tough, no-nonsense image. Great for work, but it may intimidate potential partners. If you're talking to someone, avoid pressuring them about relationship status, as they may not be ready. Pushing the issue could push them away.\n\nFor those in a relationship, you're trying to make your partner see their mistakes. What you're saying isn't wrong, but it may be too harsh. The more you criticize, the deeper the rift grows. Calm down and discuss things rationally.",
            loveQuote: "The strongest heart knows when to lower its sword and speak with softness.",
            work: "Your responsibilities bring stress and pressure, especially when working with a senior female supervisor. Though she's experienced and capable, her strictness makes the team unhappy. You may be called in to explain progress in painstaking detail. Differing opinions make collaboration difficult. If you're the supervisor, you may be too rigid, causing resentment and non-cooperation. Soften your approach, show emotional understanding, and compromise when possible.",
            workQuote: "Authority tempered with empathy builds kingdoms that endure.",
            finance: "For men, a female partner or elder may scrutinize your finances. If you're hiding something, they may confront you with evidence. For women, finances are tight. You may need to use savings to handle debts that aren't even yours but belong to family members. Plan your finances more carefully.",
            financeQuote: "The sharpest accountant of the heart tallies both coins and kindness.",
            health: "Those with chronic conditions need to make lifestyle changes for better health. If you have upcoming surgery, you'll be in the care of a skilled specialist. Follow expert advice and prepare yourself well for any procedures.",
            healthQuote: "Discipline in health is the quiet blade that cuts away what harms you."
        }
    },
    "KING OF SWORDS": {
        en: {
            love: "For singles, you feel stuck in love. The relationship isn't progressing, and you sense you may not be their type. If completely single, you might meet someone older, but it doesn't mean a relationship will develop.\n\nFor those in a relationship, you're dissatisfied. Maybe it's the distance, or the relationship has grown stale after so long. While you see it as dull, your partner insists this is who they are and has no intention of changing.",
            loveQuote: "Love that demands perfection forgets that beauty lives in the imperfect.",
            work: "Your work requires clear structure and strict adherence to rules. It may feel monotonous and colorless. If that's not the case, your boss may call you in to critique your work and point out mistakes. You understand they mean no harm, but it still stings. If you're pitching new ideas, nothing has impressed leadership yet. Creative presentations may not be what they want; they prefer data and numbers.",
            workQuote: "The throne of logic stands firm, but even kings must learn to bend.",
            finance: "You may be so strict with money that people around you consider you stingy. You won't lend to anyone because past experiences taught you hard lessons. But if you're the one in financial trouble, those close to you can't help either. Debtors have vanished, and you're left solving things alone. Find a balance between caution and generosity to preserve both money and friendships.",
            financeQuote: "A fortress built of gold is cold comfort if no one shares its warmth.",
            health: "You may need to see a specialist. Those having surgery will receive good care. If you don't have physical issues, this card may point to life stress and poor mental health. Consider seeing a doctor or confiding in someone you trust to unburden your mind.",
            healthQuote: "The mind that carries the weight of the world forgets it too deserves a gentle hand."
        }
    },
    "PAGE OF PENTACLES": {
        en: {
            love: "For singles, the person approaching you may not have pure intentions, seeing financial benefit in you. They could be a friend of a friend. Watch out for being lured into investments or asked for loans. Or they might be someone smart and financially savvy, perhaps working in banking, who has calculated that you're worth dating. Sincerity will need to be proven over time.\n\nFor those in a relationship, if a birthday or anniversary is coming, expect an expensive gift you once mentioned wanting. Or your partner may win the lottery. Married couples may receive baby news.",
            loveQuote: "Young love that arrives bearing gifts must prove its heart is not for sale.",
            work: "An intern or new team member may join. You'll need to mentor them. Your investment won't be wasted, as they'll share your workload in the future. Freelancers will find past work generating buzz, bringing steady new commissions. Income will match your dedication.",
            workQuote: "The seed of knowledge planted in another grows into a forest that shelters you both.",
            finance: "There's a chance of receiving money from someone younger. Those who like to try their luck will be rewarded. Non-regular workers will be offered well-paying gigs. Middle-aged or older individuals may have expenses related to tuition or pets. A childhood friend may try to sell you insurance. Consider all offers carefully.",
            financeQuote: "The smallest investment in the right moment yields the greatest return.",
            health: "Wear a mask and watch for infections. Avoid close contact with those who may be ill. Watch for children in the household bringing colds home from school. Maintain good hygiene and practice preventive health care.",
            healthQuote: "Prevention is the quiet sentinel that guards the gates of lasting health."
        }
    },
    "KNIGHT OF PENTACLES": {
        en: {
            love: "For singles, you may find someone appealing at work, possibly a new hire or someone who started alongside you. The relationship will develop slowly, as they're careful, evaluating both emotional compatibility and practical suitability. This is still the testing phase to see if you have things in common.\n\nFor those in a relationship, things aren't exciting but they're stable. Your partner is focused on building their career or changing jobs right now. If you're worried about their new coworker, don't be. They're only interested in work.",
            loveQuote: "The love that grows slowly puts down the deepest roots.",
            work: "Career progress may not be dramatic, but it will be steady and secure. You may receive a mid-sized but important project, still in its early stages. You might be sent to pioneer a new department. Job seekers have good prospects for positive news.",
            workQuote: "The steady rider reaches destinations that the swift one gallops past.",
            finance: "You may land a new job with higher pay. Those who like to try their luck will find fortune. If you're short on cash, a young man may come to help. For those content with their current job and financially stable, you may have built up savings and are now looking for investment or business opportunities. Research thoroughly before deciding.",
            financeQuote: "Wealth built brick by brick outlasts the castle raised overnight.",
            health: "Health issues are general and treatable. Those on regular medication can live normally. If you've recently had your medication adjusted, wait for long-term results. Take medication as prescribed and monitor your treatment progress consistently.",
            healthQuote: "The patient body that follows its healing plan rebuilds stronger every day."
        }
    },
    "QUEEN OF PENTACLES": {
        en: {
            love: "For singles, you haven't let go of the past or a former relationship. No one new measures up. If you're open to love, someone who comes close may have a jealous guardian watching, not necessarily an ex but a current partner they've hidden. Verify their relationship status clearly for your heart's safety.\n\nFor those in a relationship, jealousy may be an issue. You don't trust your partner and want to monitor them closely. If you've recently weathered a rough patch, you still can't let go of what happened. If jealousy isn't the problem, you may receive a financial windfall from your partner, or they may consult you about money matters.",
            loveQuote: "The heart that clings to yesterday's roses misses the garden blooming today.",
            work: "You're meticulous and perform well, trusted with financial oversight and budgets. You may receive an important high-budget project with hopes of success. Or you may need to liaise with the accounting and finance department. If you've advanced company expenses, you'll be reimbursed. Job seekers have a good chance of landing a position and negotiating their desired salary.",
            workQuote: "The careful hand that counts every coin builds the castle that never crumbles.",
            finance: "There's a chance of handling a large sum, whether yours or someone close to you. If you're having financial trouble, seek help from an older woman. She may complain, but she'll help in the end. Or you may be the one with money and someone close asks to borrow. Consider carefully before lending, and make sure to document any loans properly.",
            financeQuote: "Generosity guided by wisdom protects both the gift and the giver.",
            health: "You may experience neck pain from looking up and down at work. Find activities to relax your muscles on days off. Try seeing a physical therapist or getting acupuncture. Adjust your work posture, stretch every hour, and find ways to release muscle tension.",
            healthQuote: "The queen who tends her garden must also tend the hands that do the planting."
        }
    },
    "KING OF PENTACLES": {
        en: {
            love: "For singles who are truly unattached, there's a chance to meet someone interesting, such as a new coworker or someone you collaborate with. If you're already talking to someone, this period brings you closer. They may offer to drive you places. The relationship develops slowly but on solid ground.\n\nFor those in a relationship, you may travel far together, or your partner will be your devoted driver everywhere. The relationship isn't flashy but it's rock-solid. Your partner may earn extra from side work or win the lottery. If they're job hunting, good news is likely.",
            loveQuote: "The king of hearts builds his throne not from passion, but from unwavering devotion.",
            work: "Frontline workers may encounter a boss with authority over budgets who personally oversees your project due to their detail-oriented nature. You'll need to explain every aspect thoroughly. Managers and above will receive major projects with full budgets. Business owners will secure expansion capital from seniors or banks. Salespeople may sign a significant client contract.",
            workQuote: "The kingdom prospers most when the king inspects every stone in the foundation.",
            finance: "There's potential for working on a large project with a generous share. Those waiting for a big payout are likely to be rewarded. If selling property or land, you'll find a buyer offering a good price. When facing difficult problems, someone will come to help. Use this opportunity for long-term financial planning, including investments and building stability. Don't forget to maintain an emergency reserve.",
            financeQuote: "The hand that builds an empire never forgets to plant the next field.",
            health: "Digestion may be sluggish from eating too much meat. Increase fiber intake. Be mindful of conditions requiring ongoing medication. A growth or lump may be discovered in the body. Adjust your diet, add more fruits and vegetables, and see a doctor when you notice anything abnormal.",
            healthQuote: "The body that feasts must also fast, for balance is the king of all remedies."
        }
    },
    "ACE OF WANDS": {
        en: {
            love: "Singles will meet someone who inspires you. It might be through work or a friend's introduction. They have a distinctive personality, full of energy and enthusiasm. You may pick up signals that they're flirting with you. If you're interested, respond, but if you're not ready, don't rush to refuse; give it time to get to know each other.\n\nFor those in a relationship, your partner may have fresh ideas or new plans to reinvigorate the relationship, or you may start new activities together.",
            loveQuote: "A single spark of courage can ignite a love story worth telling.",
            work: "Job applicants may receive good news, possibly being called for an interview and asked to start quickly. Those already employed will receive strong support from bosses and colleagues. You may get new equipment to boost your productivity. You might be assigned new projects that match your strengths, giving you a great opportunity to showcase your abilities.",
            workQuote: "Every great fire begins with a single, bold spark.",
            finance: "There are opportunities for a new job with higher pay. This is real financial hope, not lottery luck. Freelancers will have steady work with good income, though it comes with hard effort. If you're short on cash, you might seek help from a male admirer, but plan your finances long-term so you don't have to rely on others too often.",
            financeQuote: "New beginnings carry the seeds of prosperity; plant them wisely.",
            health: "Beware of accidents from extreme sports. You may need a splint or cast. Those who've recently had an accident will respond well to treatment and may start using crutches. Some may feel restless in the body after a long period without physical intimacy. Be cautious with risky activities and follow physical therapy as recommended by your doctor.",
            healthQuote: "A body ignited with passion still needs the wisdom to rest."
        }
    },
    "TWO OF WANDS": {
        en: {
            love: "Singles are wavering between their own feelings. You want to move forward but fear disappointment. You might be obsessively rereading old chats, waiting for their message instead of doing anything else. This unclear relationship may be wasting your time.\n\nFor those in a relationship, there may be decisions to make about your shared future, but you're unsure whether to push forward or pull back. If you have plans to meet, watch out for the other person canceling last minute.",
            loveQuote: "Hesitation is the heart's way of asking for clarity before it leaps.",
            work: "Your current work focuses more on planning and management than hands-on execution. There may be opportunities to speak with clients or hold meetings with overseas headquarters. Job seekers may find work near the sea or a river, perhaps in a tourist-famous province. For those running their own business, be cautious of legal issues that may arise.",
            workQuote: "Vision without action is a dream; action without vision is a gamble.",
            finance: "You have a lump sum in hand and are looking for investment opportunities. If you're already an investor, you may not be able to turn a profit or liquidate assets just yet; watch and wait for the right moment. If you need help, consider asking an older married man, perhaps a family elder, an admirer, or a foreigner. For those with legal matters, you may need to pay attorney fees and settle things financially.",
            financeQuote: "The one who plans from the hilltop sees the richest valley below.",
            health: "You may worry about health after reading information on social media, especially about serious diseases. You might decide to get health insurance. Some may discover a lump through an ultrasound that requires monitoring. Get your annual check-up, but don't let social media cause excessive anxiety. Consult a doctor directly for reliable information.",
            healthQuote: "Worry never heals; only wise action does."
        }
    },
    "THREE OF WANDS": {
        en: {
            love: "Singles, it's time to step out of your comfort zone and meet new people. Opening yourself to new experiences will lead you to exciting romance, especially through travel or working off-site. If you've recently broken up, today you'll be able to let go and move forward.\n\nFor those in a relationship, you may plan a trip together or start something new as a couple. The relationship will feel more vibrant and energetic.",
            loveQuote: "Beyond the familiar shore, love waits in places you've never dared to go.",
            work: "You've finally broken free from the stress and worries that have been building up, perhaps because a problematic project has just been wrapped up. This is a good time to take a vacation and travel abroad, or it could be the right moment to transfer teams, switch departments, or resign. Job seekers may find opportunities in a field completely different from what they've done before.",
            workQuote: "The horizon belongs to those who have the courage to set sail.",
            finance: "It may be time for a major career decision, such as switching industries or going abroad for better pay. Even if you're uncertain about success, sometimes you have to take risks. For those hoping for windfalls, luck may come from faraway places. Those with debts may receive a sum that relieves some pressure. Plan your spending carefully to avoid falling back into debt.",
            financeQuote: "Fortune favors the brave who venture beyond familiar waters.",
            health: "For those currently in treatment, this is a period of good recovery. Symptoms will ease and tend toward normalcy. If hospitalized, you may be going home soon, with your body gradually getting stronger.\n\nThose with chronic conditions may discover new, more effective treatment approaches. Treatment is heading in a positive direction. Though it may take time, the results will be satisfying. Some may find a specialist who can help precisely. Just maintain consistent healthcare, take prescribed medications, and do regular physical therapy. Your health will steadily improve.",
            healthQuote: "Recovery is the voyage home; every step brings you closer to yourself."
        }
    },
    "FOUR OF WANDS": {
        en: {
            love: "Singles may find love at a gathering or party among friends. You might meet someone with a lifestyle different from yours, yet you complement each other perfectly. Social events will bring impressive new connections.\n\nFor those in a relationship, you may visit each other's family homes or go out to eat together. It's a time of happiness and warmth.",
            loveQuote: "Celebration is love's favorite language; let your hearts dance together.",
            work: "Good news is on the way. High performers will be promoted. If you recently presented to a client, there's a strong chance of signing a contract. Job applicants will be called for interviews, and exam takers may pass and receive placement. Freelancers will have opportunities to showcase their work at festivals and receive praise. Business owners may expand, renovate, or open new branches, possibly through joint ventures with partners.",
            workQuote: "Success is sweetest when shared under a roof you built together.",
            finance: "There are opportunities for a raise or special bonus based on your year's performance. New hires will get the salary they hoped for. Family or loved ones will be supportive. Debts may be taken on willingly, such as a home mortgage or investment in a shop. Life is progressing steadily; it may not be flashy, but it's secure. Maintain a good balance between income and expenses.",
            financeQuote: "Stability is the foundation upon which all celebrations are built.",
            health: "For those who recently had an accident, joints and bones are healing well and life is returning to normal. Some may start paying attention to fitness and join a gym with friends. For those expecting, be aware of signs of premature labor. Continue physical therapy consistently, and for expectant mothers, get plenty of rest.",
            healthQuote: "A body that heals in joy recovers faster than one that heals alone."
        }
    },
    "FIVE OF WANDS": {
        en: {
            love: "Singles may find themselves with rivals in love. The person you're interested in may have several admirers, forcing you to try harder to stand out. But be careful that the competition doesn't make you lose sight of who you truly are.\n\nFor those in a relationship, you may disagree on many things, from lifestyle to relationship management. Patience and compromise will be needed to find common ground.",
            loveQuote: "Love worth fighting for teaches you who you really are.",
            work: "This is a period when the company is bringing in interns or junior staff. You've been tasked with mentoring and training them one by one. This card may reflect a team that isn't working smoothly together, with partners or members each having their own ideas and approaches. Though they share the same goal, their methods don't align. You may need to find a mentor or experienced advisor to unify the scattered ideas.",
            workQuote: "From creative friction, the brightest ideas are forged.",
            finance: "Money is being spent on supporting family members. Financial planning is lacking; unused online subscriptions still charge your account. It's time to get serious about finances and track income and expenses, even if it feels tedious, because small charges add up to a large sum by year's end. For investors, the business isn't losing money but isn't growing either, possibly due to too many partners or high staff costs.",
            financeQuote: "Scattered coins gather into fortunes when discipline draws them together.",
            health: "Watch out for joint and bone issues, especially small bones. Avoid extreme sports. Those who've recently had an accident may find that fractures haven't fully healed. Those who've had cosmetic surgery using their own tissue may need to return for a check-up. Be careful with movement and keep up with doctor appointments.",
            healthQuote: "A body stretched in too many directions needs the wisdom to pause and mend."
        }
    },
    "SIX OF WANDS": {
        en: {
            love: "Singles will reconnect with someone from the past. This reunion may lead to a deeper relationship. The person who appears may be successful in their career and well-respected in their field. Though they may not be strikingly handsome, they possess an irresistible charm.\n\nFor those in a relationship, your partner may receive good news such as a promotion or award. Their success will positively affect your relationship as a couple.",
            loveQuote: "Victory in love comes to those who return with a wiser heart.",
            work: "There's a chance to win presentations and secure projects from competitors. Others will see your dedication and accomplishments. Promotion opportunities are coming. Job seekers will land positions higher than before, or your team may gain talented new members. This is a period of victory and recognition, like a parade of success.",
            workQuote: "Raise your banner high; the world is ready to cheer your triumph.",
            finance: "There are signs of a promotion with a salary increase. Job changers will get the salary they want. If you've recently entered a competition, there's a chance of winning a prize. Those who like to try their luck will receive good news. For those involved in auctions, items acquired may be pricier than market value, so research well before committing.",
            financeQuote: "The spoils of victory belong to those who prepared when no one was watching.",
            health: "Health issues stem from sitting habits, especially for regular drivers. Get lumbar support equipment. Office workers should change their chair to a proper one before chronic back pain develops. Adjust your sitting posture and invest in equipment that supports comfort.",
            healthQuote: "A champion's body is maintained long before the race begins."
        }
    },
    "SEVEN OF WANDS": {
        en: {
            love: "Singles may need to fight for the love they believe in. Even if others disapprove, if you're confident, stand firm in your feelings. There may be chances to find love at events, concerts, or large gatherings.\n\nFor those in a relationship, you and your partner may be debating passionately, each holding your ground. Or this may be a time to defend your relationship from outsiders, proving your love to the other person's family or friends.",
            loveQuote: "Love that is worth your stand will never ask you to fall.",
            work: "Watch out for people who are unhappy with you at work. You'll need to navigate office politics. Some may think you're not fit for your position and constantly create problems for you. You may feel like you're working alone, with group projects becoming solo efforts. If you need to present on stage, prepare well, as you may face tough questioning.",
            workQuote: "Stand your ground, for the view from the top is earned, not given.",
            finance: "Expenses are so heavy you don't know how to manage them. Because of conflicts with those close to you, you're afraid to ask for help. If you've borrowed money before, it's time to repay. Compound interest keeps growing, and you're still overspending. For stock investors, holdings may be stuck at a loss. Clear old debts before taking on new ones.",
            financeQuote: "Defend what you have built, and no storm can take it from you.",
            health: "There may be health issues from standing too long. Those who work on their feet should get proper footwear for support. Others may be overworking their body through work or exercise. Find equipment to reduce impact and don't push your body beyond its limits.",
            healthQuote: "The strongest stance begins with feet planted on solid, caring ground."
        }
    },
    "EIGHT OF WANDS": {
        en: {
            love: "Singles will receive messages or contact from interested people rapidly and continuously. Communication will be lively, but be careful not to rush things and lose your judgment.\n\nFor those in a relationship, if things are good, you'll be in constant contact throughout the day. But if the relationship is stale, you'll feel lonely when you look back at old photos and conversations from happier times. Or it may simply mean your partner is so focused on work that they don't have much time for you.",
            loveQuote: "Love that arrives swiftly still deserves the patience to be understood.",
            work: "Expect frequent long-distance travel to meet clients across various locations. Online business owners will be swamped with orders and may need help answering messages. Office workers will be flooded with emails, spending half the day just responding. Your boss may send urgent tasks, and you might need to dispatch messengers multiple times. Everything moves fast, like arrows flying forward.",
            workQuote: "Momentum is the wind at your back; let it carry you to new heights.",
            finance: "Business is booming, with money flowing into accounts steadily. Those with inventory will sell it for cash. For those not in business, expenses may involve travel and ordering goods from overseas. For those hoping for windfalls, luck comes from afar. Use this opportunity to save some emergency funds.",
            financeQuote: "When abundance arrives in a rush, the wise capture it before it passes.",
            health: "This is a good time to get back into exercise and feel energized. You might start training for a run or plan a marathon. Some may sign up for running events in other provinces or countries. Men may feel their fitness isn't what it used to be. Start exercising gradually, don't overdo it, and plan a proper training schedule.",
            healthQuote: "A body in motion finds its own swift path to vitality."
        }
    },
    "NINE OF WANDS": {
        en: {
            love: "Singles may be suspicious and distrustful of anyone who approaches them. Past experiences have caused you to build walls too high. Even when someone good comes along, you tend to find reasons to push them away.\n\nFor those in a relationship, something has made you or your partner uncomfortable, widening the distance between you. Perhaps you've just been through an argument. If there's a secret, you'll try desperately to keep it hidden, but eventually the truth may come out.",
            loveQuote: "A wounded heart still beats; give it time and it will trust again.",
            work: "Relationships with colleagues are strained, and you're constantly watching your back. Your patience is nearly exhausted. If a new opportunity comes, you're ready to resign immediately. For those who still have good relationships with colleagues, this card may indicate an approaching deadline that requires you to rush to finish a project. If you can't deliver on time, you may need to request an extension.",
            workQuote: "The last stretch is always the hardest, but you have come too far to stop.",
            finance: "Even though money recently came in, you can't seem to hold on to it. You may need to postpone social plans and live simply at home, doing activities that don't cost money. For those with lingering debts, you may be anxious about creditors calling while you still can't pay them back. Negotiate with creditors for leniency, or consult an expert to create a debt management plan. You need to change spending habits and build savings discipline to break the cycle.",
            financeQuote: "Guard what remains, and from it, rebuild what was lost.",
            health: "Stress may affect your health, causing muscle aches, stiffness, and nerve issues. Watch out for muscle inflammation and accidents. You may need a back brace or crutches. Find ways to relieve stress, and pursue physical therapy if you have chronic pain.",
            healthQuote: "Even the most battle-weary body deserves a moment of gentle rest."
        }
    },
    "TEN OF WANDS": {
        en: {
            love: "Singles may feel exhausted by the prospect of starting a new relationship. The repetitive cycle of introductions, sharing life stories, and getting to know someone all over again leaves you discouraged. Some may decide to put love on hold for now.\n\nFor those in a relationship, heavy workloads may leave no time for each other. If you meet up, one of you may bring work along, preventing quality time together.",
            loveQuote: "Even love cannot bloom if the gardener carries the whole world on their back.",
            work: "You're carrying more than you can handle. It's time to talk to your boss about adding people to the team, because one person can't do it all. For those in management, you may be drowning in micromanagement without time to see the big picture. Find someone to share the burden. Newcomers may work hard to prove themselves but end up being taken advantage of and dumped with everyone else's work. Learn to say no and delegate. For business owners, there may be opportunities for new projects or factory expansion, but watch out for overcommitting.",
            workQuote: "The wisest leader knows when to set down one burden and share the rest.",
            finance: "You're carrying more debt than you can handle. Most of your time goes to earning money with no chance to explore new opportunities, just getting through each day. Windfalls are far from reality; you must rely solely on work income. For business owners, there may be a large sum to expand operations or invest in a factory. Plan spending carefully so expansion doesn't become a future burden. Find a trustworthy financial advisor.",
            financeQuote: "The heaviest load is the one carried without asking for help.",
            health: "Health problems stem from poor lifestyle habits. You need to adjust how you sit, sleep, stand, and walk. Young people may have back pain. Middle-aged individuals may develop posture issues from hunching. Adjust your lifestyle habits and find aids to help correct your posture.",
            healthQuote: "Lay down the weight you were never meant to carry alone."
        }
    },
    "ACE OF CUPS": {
        en: {
            love: "Singles have a chance of meeting someone who makes your heart race, with potential for a deep connection. You may go for coffee together. For those already talking to someone, there's a good chance of upgrading the relationship to an official couple.\n\nFor those in a relationship, your partner will shower you with extra care and attention. If a special date or anniversary is approaching, expect a gift you'll love. Married couples planning for children may receive good news.",
            loveQuote: "Love arrives like a cup overflowing, asking only that you dare to drink.",
            work: "You'll receive praise from colleagues. You may be nominated for an important position. Work submitted to competitions has a chance of winning awards. Even if new work doesn't generate huge income, it will boost your image and workplace relationships. Those in social media, TV, and online content may come up with new show ideas or receive products to review.",
            workQuote: "When the heart is full, creativity pours forth without limit.",
            finance: "Windfalls may come as valuable gifts. If you can part with them, they'll sell for a good price. You may start thinking about moving or buying a new condo. If you apply for a loan, the bank will approve it. For those short on cash, you may need to pawn a beloved item to get through. Plan your finances carefully, especially for housing, which is a long-term commitment.",
            financeQuote: "Abundance begins as a single drop of gratitude.",
            health: "Overall health is good, or if you've been ill, recovery is near. You may find effective medicine or get vitamin injections at a beauty clinic. Those planning to have children may receive good news after hormone adjustments. Continue taking care of your health and follow medical advice.",
            healthQuote: "A nourished body is a vessel ready to receive all of life's blessings."
        }
    },
    "TWO OF CUPS": {
        en: {
            love: "Singles will meet someone they like through social media and have the chance to meet in person. The relationship will develop so quickly that people around you will be surprised. There's a strong chance of finding happiness in love.\n\nFor those in a relationship, things are going well with good communication. If you've recently argued, you'll reach an understanding that makes the bond stronger. Long-distance couples may get to meet face to face.",
            loveQuote: "Two cups raised together hold more joy than either could alone.",
            work: "If you've had issues with your boss or colleagues before, you'll get to talk and clear the air, setting aside past grudges to pursue shared success. If there are no problems, this workplace suits you well with a good work-life balance, though the comfort may reduce your drive for self-improvement.",
            workQuote: "Harmony in the workplace is the silent partner of every success.",
            finance: "Windfalls will come through relationships. Someone will give out of affection; just express your needs and they'll provide. Income and expenses are balanced. Savings aren't a priority, possibly because your family is well-off. Even without work, you can live comfortably. But don't be complacent; build your own financial security for emergencies or times when you need to be self-reliant.",
            financeQuote: "Love gives freely, but wisdom teaches you to save what love provides.",
            health: "Someone close may remind you to take better care of your health. Drink more water, eat vegetables, fruits, and vitamins. Having some sweets occasionally is fine so your body doesn't crave sugar and get irritable. Adjust your eating habits gradually.",
            healthQuote: "The sweetest remedy is a life shared with those who care for you."
        }
    },
    "THREE OF CUPS": {
        en: {
            love: "Singles have a good chance of meeting someone at social events, parties, or friend gatherings. If you're talking to someone, verify that they're truly single, as there may already be someone else in their life.\n\nFor those in a relationship, you'll attend events together and introduce each other to your social circles. Longtime couples may discuss marriage or starting a family. But watch out for third-party interference.",
            loveQuote: "Joy multiplies when hearts gather to celebrate love together.",
            work: "The company may form a new department, and you and close friends will transfer there together. Familiarity speeds up the workflow. Those in events and entertainment will thrive. There may be a company party or festival, or a colleague's wedding that everyone is invited to. The atmosphere will be warm and fun.",
            workQuote: "Success tastes sweeter when celebrated with those who helped you earn it.",
            finance: "Social events are frequent during this period, with most spending going to socializing and wardrobe costs. You may start a new project and consider investing savings with close friends. This card doesn't indicate profit, but shows you'll receive support from those around you. Weigh the pros and cons carefully, as investing with friends can affect relationships. If you decide to partner up, make clear written agreements to prevent future problems.",
            financeQuote: "Shared feasts are wonderful, but shared debts can spoil the celebration.",
            health: "You may be indulging in food too much, especially at parties and gatherings with friends, neglecting dietary control. If you have conditions related to blood pressure, cholesterol, or diabetes, blood test results may not be great, and your doctor may need to adjust your medication.\n\nFor those without chronic conditions, you're enjoying eating and drinking so much that you've forgotten to control yourself. You may have gained 2-3 kilos without realizing it. Long-term, this could lead to diet-related diseases like diabetes, high cholesterol, or hypertension.",
            healthQuote: "Feast with joy, but let moderation be your honored guest."
        }
    },
    "FOUR OF CUPS": {
        en: {
            love: "You're open to love, but your homebody nature limits your chances of meeting someone special. If you want a relationship, you may need to step out of your comfort zone. Try starting by reaching out to someone you're interested in.\n\nFor those in a relationship, your partner admires and appreciates who you are. They feel they can rely on you for everything. This may also be a time when you get to know their family better.",
            loveQuote: "Love waits beyond the walls of comfort you've built around your heart.",
            work: "You do your job so well that you've become everyone's go-to person for help. If you work in an office, your career may not advance dramatically, but it's stable and secure. This card may represent a generous boss who's willing to help if you approach them with a bit of charm. Business owners will see plenty of customers. Job seekers may land a position at a large, well-equipped company. A female supervisor will be very supportive, while a male boss may delegate so much that you practically become the leader yourself.",
            workQuote: "Steady hands build lasting legacies even when the spotlight shines elsewhere.",
            finance: "Life is fairly abundant. You may receive a windfall or lump sum that can be invested in business or real estate. Salaried workers enjoy stability with good benefits, even if not much cash on hand. If you need financial help, you can borrow from an elder. Family members may ask for sudden loans, so budget wisely if you're the household's financial pillar.",
            financeQuote: "Abundance flows to those who share their harvest with an open hand.",
            health: "Watch out for overeating, especially sweets and carbs. Those trying to lose weight may experience intense cravings. Office workers should be mindful of back pain from poor sitting posture and avoid leaning too much to one side. Even without symptoms now, it could become a long-term issue. Control your diet, eat plenty of fruits and vegetables, drink lots of water, and adjust your sitting posture. Take regular stretch breaks if you must sit for long periods.",
            healthQuote: "Nourish your body with intention, for it carries you through every season."
        }
    },
    "FIVE OF CUPS": {
        en: {
            love: "For singles, this is a period of unfulfilled love. If you've recently broken up, the chances of reconciliation are slim. If you're starting fresh, the people coming into your life may still be grieving a past love and aren't ready to commit.\n\nFor those in a relationship, things are fragile right now. You may feel lonely even with a partner. Your loved one might keep hurting you over the same issues. If the relationship is otherwise fine, it could mean your partner is going through personal struggles or depression.",
            loveQuote: "Even spilled cups leave two still standing if you dare to turn around.",
            work: "A project you're responsible for is running into problems. Your ideas may get rejected by clients, or key elements get cut. Even when clients say they want something fresh, they end up choosing the safe, familiar option. You may feel disappointed about your position, feeling like no matter how hard you try, you can't reach your goals. Your performance isn't meeting targets, and you sense a loss of trust.",
            workQuote: "The seeds of tomorrow's success are hidden in today's disappointments.",
            finance: "Income doesn't match expenses. You may have to dip into savings unexpectedly. If a partner or close friend borrowed money, they might not return it or may vanish altogether. Business owners may see no profit, or customers leave unsatisfied. Avoid taking over an existing business right now, as you could be sold a failing venture. Hold onto cash and wait for a better opportunity.",
            financeQuote: "Guard your reserves through the storm, for calm waters always return.",
            health: "Watch out for depression. Be careful with excessive coffee and alcohol consumption. Those with chronic conditions should be mindful of gallbladder, liver, pancreas, and kidney issues. Drink plenty of water, reduce caffeine and alcohol, and seek professional help if you experience depressive symptoms.",
            healthQuote: "Healing begins when you allow yourself to feel without drowning in the feeling."
        }
    },
    "SIX OF CUPS": {
        en: {
            love: "For singles, you'll find yourself reminiscing about the past. An ex may reach out, and if you want to reconcile, the chances are good. Alternatively, someone younger may come along, making you feel like it's love at first sight, with the relationship developing quickly.\n\nFor couples, those who've been arguing will make up, and the sweetness will return even stronger than before, making others envious. Long-distance couples have a chance to meet. You might visit each other's families, strengthening the bond. But be cautious, as an ex returning could stir old feelings.",
            loveQuote: "Some hearts find their way home only after wandering through memory's garden.",
            work: "You may be recruited back by a former employer, with a close colleague sent to negotiate. Your current workplace feels like family, with mutual support rather than competition. If you value happiness over ambition, this is the right place for you. Freelancers may get work from old connections with steady, modest income.\n\nIf you're thinking about quitting, your next job might be a family business or working from home.",
            workQuote: "The roads we once traveled often lead us to where we truly belong.",
            finance: "There's a chance of getting money back from someone who borrowed long ago. They may reach out with well-wishes and return the debt with an apology. Better late than never. If you're having financial difficulties, you can ask close friends or family for help. Those you've helped before are ready to return the favor. To cut costs, you might need to move back in with family.",
            financeQuote: "Old debts repaid and old bonds renewed bring unexpected blessings.",
            health: "Watch out for allergies, especially from pollen. Take care of yourself during weather changes. You may need to visit elderly relatives in your hometown who are unwell.",
            healthQuote: "When the seasons shift, let your body rest in the arms of those who love you."
        }
    },
    "SEVEN OF CUPS": {
        en: {
            love: "For singles, many people will message you on social media, but none will catch your interest enough to pursue a relationship. Most are attracted only to your appearance, not seeking anything serious. If you're already talking to someone, they may not be ready to commit because they enjoy being unattached and have other options.\n\nFor those in a relationship, if a special occasion is coming up, your partner may be shopping for a gift based on what you've liked or mentioned on social media. Drop some hints now. But be cautious, as someone intriguing may enter your life and create hesitation in your relationship.",
            loveQuote: "Not every shimmering reflection in the water is a star worth reaching for.",
            work: "You're juggling multiple assignments at once, all seeming equally important. You need to stay focused and reprioritize. You have plenty of ideas but can't decide which to pursue. Keeping everything in your head makes it hard to see possibilities clearly. Write your plans out, make slides, and present them. Don't be afraid to set aside good ideas that don't fit the current project; save them for later.",
            workQuote: "Clarity comes not from choosing everything, but from choosing wisely.",
            finance: "You're a victim of marketing and a slave to promotions, spending money on things you don't need. When shopping online, verify the seller's credibility. Beware of greed leading you into scams; deals that seem too good to be true usually are. If you're hoping for a windfall, you might get clues from dreams, but use good judgment. Try tracking your expenses to see where your money is leaking.",
            financeQuote: "The wisest treasure hunter knows which chests to leave unopened.",
            health: "Watch out for allergies and respiratory issues caused by weather changes. You may experience stress and anxiety. Some people might feel dizzy or spaced out from accidentally consuming food containing cannabis. Be careful about what you eat, and avoid areas with air pollution.",
            healthQuote: "A clear mind breathes easier than one clouded by a thousand daydreams."
        }
    },
    "EIGHT OF CUPS": {
        en: {
            love: "For singles, if you've recently gone through a breakup, this may be a good time to travel and heal. Go to the countryside or abroad. If you're talking to someone in a different area, you may need to decide to end things, or conversely, you might travel to meet them.\n\nFor those in a relationship, if things are going well, you may get to travel far together, especially to an island or somewhere involving water travel. But if the relationship is troubled, it could lead to a breakup, distance, or one of you moving out if you live together.",
            loveQuote: "Sometimes the bravest love story begins with walking away from the wrong shore.",
            work: "You're feeling burnt out and thinking about quitting. You're not the only one feeling this way. If you don't submit your resignation, a close colleague or your boss might leave first. If work is going well, this card may simply mean traveling domestically or internationally for business or a vacation. For business owners, a dispute with a partner may lead to parting ways.",
            workQuote: "Letting go of what no longer serves you makes room for what will.",
            finance: "You can't maintain your current lifestyle because expenses are too high. You may need to relocate to an area with a lower cost of living. If your current job has problems, you might have to accept a position with lower pay but greater peace of mind. This card doesn't necessarily mean a financial crisis; it could just be unexpected travel expenses for accommodations and transport. Plan ahead and set aside emergency funds.",
            financeQuote: "The richest journeys begin when we leave behind what weighs us down.",
            health: "For heavy drinkers, it's time to cut back and take care of your liver and kidneys. Those using herbal remedies should watch for dizziness. People with mental health issues may need to adjust medication or change treatment approaches. Reduce drinking, be cautious with herbal products, and consult your doctor for any mental health concerns.",
            healthQuote: "Healing sometimes means choosing a new path before the old one runs dry."
        }
    },
    "NINE OF CUPS": {
        en: {
            love: "For singles, someone older may grow close to you, possibly someone who has been married before. If you're attracted to foreigners, you may meet someone appealing who's ready to support and help you.\n\nFor those in a relationship, if there's something you dislike about your partner, expecting them to change will be difficult. They are consistent; who they were at the start is who they'll continue to be. You may also need to interact with a senior male figure in their family, requiring extra effort to make a good impression.",
            loveQuote: "True contentment in love means embracing the whole person, not just the wish.",
            work: "The company is expanding. You may work with a new boss and receive directives from upper management. Although leadership sees your ability, you alone can't handle this much work. You'll need to manage demanding people with no personal time. Job seekers have a good chance of landing a position with a foreign or large multinational company.",
            workQuote: "Success that comes without rest is a throne built on shifting sand.",
            finance: "This is a period of comfortable living, ready to spend freely. Financial prospects and luck are favorable. Borrowing isn't difficult. If you want a new place, you'll have the funds to upgrade to somewhere more upscale. Loan applications will be approved with someone to vouch for you. If you're having financial trouble, seek help from a well-built older gentleman, but you'll need to approach him first; he won't offer on his own.",
            financeQuote: "When the cup overflows, remember to share before it spills.",
            health: "Watch for endocrine and hormonal issues. Medication side effects may cause body changes. Those without chronic conditions should be wary of fatty deposits clogging blood vessels. Control your diet, exercise regularly, and get annual health checkups.",
            healthQuote: "A body well cared for is the vessel that carries every wish to shore."
        }
    },
    "TEN OF CUPS": {
        en: {
            love: "For singles, be careful not to fall for someone who's already taken. Before pursuing anyone, verify their relationship status clearly, as they may already have a family.\n\nFor those in a relationship, this is a time of growing closeness. You'll have the chance to meet each other's families. For married couples, the relationship may not be thrilling, but it's steady and strong. Couples planning to have children may receive good news soon.",
            loveQuote: "The deepest love builds quietly, brick by brick, into a home for the heart.",
            work: "Recent graduates may end up working at the family business. Married individuals might help manage their spouse's business. For salaried workers, this job may not offer rapid advancement, but it provides work-life balance with no pressure and personal time. If that suits you, this is the right place. Job seekers may find opportunities with family-run businesses or in education and childcare.",
            workQuote: "Not every kingdom needs to conquer; some are built to shelter and nurture.",
            finance: "Finances aren't spectacular, but you're living comfortably. Salaried workers value benefits over high pay. The family is financially secure with assets to back things up. Family businesses can keep running but won't grow much due to family-style management. For growth, consider professionalizing operations and hiring outside experts.",
            financeQuote: "True wealth is measured not in coins, but in the warmth around your table.",
            health: "Overall health is good, but those trying to lose weight may struggle with tempting food everywhere. You could gain up to 10 kilograms. Maintain disciplined eating habits and find activities to replace the urge to snack.",
            healthQuote: "Moderation at the feast is the quiet guardian of lasting well-being."
        }
    },
    "ACE OF SWORDS": {
        en: {
            love: "For singles, if you've been stuck in an unclear relationship or clinging to an ex, clarity is coming. You may learn why they didn't continue with you, and regardless of the reason, it will help you let go and move forward. For those completely single, no meaningful love is arriving yet, but someone argumentative might show up.\n\nFor those in a relationship, if things are going well, your partner will help solve your problems, especially regarding documents, contracts, and legal matters. You may sign an agreement together. But if the relationship is fragile, beware of harsh words and aggressive attitudes that could deepen the cracks.",
            loveQuote: "Truth cuts before it heals, but the wound it leaves is always clean.",
            work: "There's a chance of signing an important contract. Those applying for jobs or taking civil service exams have a good chance of passing. If your workplace has legal matters, you may become involved as a witness, signing documents, or taking on special responsibilities. There could be intellectual competition at work. Civil service exam takers may pass or receive a promotion.",
            workQuote: "The sharpest minds carve new paths where others see only stone.",
            finance: "You may receive a debt collection notice. If left unaddressed, it could escalate into legal proceedings. You'll need to cut unnecessary expenses. You might have to renegotiate various contracts such as phone plans, health insurance, or request payment extensions from the bank. For those without financial problems, you may face a speeding fine. Contact creditors to negotiate before things escalate.",
            financeQuote: "A swift decision today prevents a thousand regrets tomorrow.",
            health: "Watch out for accidents and cuts from sharp objects. Those needing surgery will have it go successfully. Some may have plans to get vaccinated at the hospital. Be careful when handling sharp objects and follow your doctor's instructions closely.",
            healthQuote: "Precision in caring for your body is the blade that cuts away suffering."
        }
    },
    "TWO OF SWORDS": {
        en: {
            love: "For singles, your single status may be because you don't open up to people easily, dislike initiating conversations, and aren't comfortable in social settings. If you're talking to someone, the connection is fading. They reply inconsistently. If there's a misunderstanding, you might get blocked or cut off.\n\nFor those in a relationship, communication has decreased. When upset, you both go silent. Questions go unanswered. If you're sulking without explaining why, your partner can't figure out what's wrong. If you're in the wrong, they may shut you out completely, ignoring messages and calls. Face-to-face conversations may work better.",
            loveQuote: "Silence between lovers is a wall only honest words can break.",
            work: "You feel bored and burnt out at your current job, possibly because relationships with colleagues are strained and you see no improvement ahead. There are things on your mind you can't express. You must pretend not to see behaviors you dislike. You're torn between enduring a dead-end job or risking the search for a new one. Salespeople or client-facing roles may find contacts going silent and unresponsive.",
            workQuote: "Indecision is its own prison; even an imperfect choice sets you free.",
            finance: "Expenses don't match income and you can't see a way out. If you've applied for a loan, documents may get lost or the bank may reject your application. Creditors can't reach debtors; calls go unanswered and visits come up empty. Online shoppers must beware of scammers. You may face dental health issues that insurance doesn't fully cover. Find ways to increase income and cut unnecessary spending.",
            financeQuote: "When the path forward is hidden, stillness reveals what haste cannot.",
            health: "Watch for oral health problems including bad breath, cavities, impacted wisdom teeth, or root canal issues. Some may undergo facial cosmetic procedures or experience vertigo from uneven fluid in the ears. Maintain oral health and keep your dental appointments.",
            healthQuote: "Balance begins in the body; tend to the small aches before they speak louder."
        }
    },
    "THREE OF SWORDS": {
        en: {
            love: "For singles, heartbreak from a past love still lingers, making it hard to start fresh. If someone new appears, make sure they're truly single. Be careful of getting caught in a love triangle and suffering repeated heartbreak.\n\nFor those in a relationship, things are fragile. Your partner may have hurt you, and it's not the first time. Watch out for arguments and third-party interference. Alternatively, this could mean your partner is going through life difficulties or health problems.",
            loveQuote: "A heart pierced by truth heals stronger than one wrapped in beautiful lies.",
            work: "Be cautious of relationships with coworkers. There may be heated arguments from differing opinions. Like a broken glass that's hard to repair, everything feels fragile. Or it may not involve you directly; there could be infighting within the department, with people undermining each other. The company may face problems with major restructuring or executives clashing, leading to resignations.",
            workQuote: "From the shards of conflict, the wisest hands build something new.",
            finance: "Watch for health issues and accidents that could cost you money. Those without insurance should get coverage to protect against unplanned expenses. If someone close borrows money, you're unlikely to get it back, and it may damage the relationship unless you treat it as a gift. Emergency spending may arise from important items breaking down that need immediate replacement. Keep an emergency fund ready.",
            financeQuote: "The coin spent on prevention saves a fortune spent on repair.",
            health: "Be cautious of both chronic diseases and accidents, especially heart conditions, asthma, and respiratory problems. Those without chronic conditions may encounter minor issues like cuts or colds. Take extra care of your health and be mindful in daily activities.",
            healthQuote: "Guard the fragile vessel of your body, for it mends slower than the spirit."
        }
    },
    "FOUR OF SWORDS": {
        en: {
            love: "For singles, if you've recently broken up, they won't come back. Going back to how things were is nearly impossible. Focus on other areas like work or finances. If you're talking to someone, they may go quiet and distant, with a tendency toward ending things. Or perhaps they're simply unwell and need rest.\n\nFor those in a relationship, intimacy and closeness have diminished. There's growing distance and this is a fragile time. You need to talk and understand each other to heal. Sometimes arguing is better than giving each other the silent treatment. If there's no conflict, it may just mean sleeping in separate rooms, or one of you is ill.",
            loveQuote: "Even love must rest to remember why it chose to stay.",
            work: "The recent period has been rough, perhaps from overwork or betrayal. Though you're feeling better mentally, you still can't trust anyone and keep your distance. Or you might feel unable to work with the same people and need to request a department transfer. Personal issues such as heartbreak or hospital visits may be affecting your work performance.",
            workQuote: "The warrior who pauses to tend their wounds returns to battle twice as strong.",
            finance: "You've just survived a major financial crisis and are in recovery. Even though you're tired of your job, wait until your cash flow improves before making changes. For self-employed individuals, income will be sluggish. Watch that expenses don't exceed revenue. Additional investment may not pay off. Cut unnecessary costs and slowly explore new opportunities. Don't rush into major decisions.",
            financeQuote: "Patience in the lean season is the seed of the harvest to come.",
            health: "You may feel exhausted and in need of rest. Some may have mental health struggles and want to avoid people. Others may be ill enough to need surgery. Get sufficient rest and find someone to talk to when you're feeling down.",
            healthQuote: "Rest is not defeat; it is the quiet gathering of strength for what lies ahead."
        }
    },
    "FIVE OF SWORDS": {
        en: {
            love: "For singles, if you've recently broken up, reconciliation seems impossible. The parting was bitter. If you're talking to someone, you're realizing you're incompatible. No one who comes along feels right. Love isn't in the cards yet. People who approach may be nursing their own heartbreak or still attached to an ex.\n\nFor those in a relationship, your partner may break promises, and it's not the first time. Planned outings might get canceled last minute, or they go ahead without you. This is a fragile time. Talk of breaking up, separation, or frequent travel by your partner may leave you feeling abandoned.",
            loveQuote: "Not every battle in love is worth winning; sometimes peace lies in letting go.",
            work: "Watch out for team conflicts. If there's a major project, one or two key people may resign. There could be client problems, or you yourself may be planning to leave soon. Alternatively, too many teammates taking vacation at once could cause chaos. Job seekers should read terms carefully. You might encounter a rude interviewer, which could be a stress test or just their true personality.",
            workQuote: "When swords clash in the workplace, the wisest warrior knows when to sheathe theirs.",
            finance: "Beware of money disputes with close friends that end friendships. Investments with friends may need to be dissolved. A partner might pull their funds and secretly start a competing business. Watch for sophisticated scammers who may lure you into investments or threaten you with legal claims. Business owners should spread funds across multiple accounts. Verify credibility before any transactions.",
            financeQuote: "The sharpest losses teach the lessons that no profit ever could.",
            health: "Watch for injuries from physical altercations. There may be issues with the nervous system and nerve endings, as well as lungs and respiratory tract. Avoid conflicts and take careful care of your health.",
            healthQuote: "The body keeps score of every battle; choose your fights wisely."
        }
    },
    "SIX OF SWORDS": {
        en: {
            love: "For singles, you may be in a relationship without a label, stuck in limbo. You might stubbornly hold on even though the other person isn't keeping you there. If you're completely single, watch out for someone who's already taken. Verify their status clearly.\n\nFor those in a relationship, if things are going well, you may travel far together, especially to an island or by water. Married couples may receive pregnancy news. But if there are problems, even without arguments, both of you feel suffocated but too afraid to confront each other directly.",
            loveQuote: "Crossing troubled waters together reveals whether love can truly sail.",
            work: "You're facing problems that have gone unresolved for months, yet no one dares change course. Things continue the same way. Talented people are gradually quitting. You're burnt out, and someone keeps blocking your progress. If you had the authority, you'd have chosen a different path already. For now, all you can do is handle problems as they come and wait. Communicate constraints to your team. Sometimes waiting is better than forcing change.",
            workQuote: "The shore you seek appears only to those who keep rowing through the fog.",
            finance: "You're carrying many burdens, both your own and those of people you support. What you earn barely covers day-to-day expenses, with no way to increase income in sight. You need to hold steady for now. It may take about six months to pay off some debts. Married individuals have high expenses with only one earner, needing to make it stretch for the whole family. Business will break even at best. Wait for the right moment to improve or relocate.",
            financeQuote: "Even the smallest vessel reaches harbor if it keeps a steady course.",
            health: "You may experience motion sickness from cars, boats, or planes. Some may be interested in acupuncture. Pregnant women should watch for prenatal depression and complications. Prepare motion sickness medicine for travel and take good care of your mental health.",
            healthQuote: "Rough waters pass; steady your breath and trust the current to carry you through."
        }
    },
    "SEVEN OF SWORDS": {
        en: {
            love: "For singles, watch out for a skilled player who juggles multiple relationships. You know what they're like but can't stop talking to them. If you're completely single, a short trip might lead you to someone charming but untrustworthy. They may already have a partner but are hiding it.\n\nFor those in a relationship, you may find your heart wandering toward someone else. Even as you try to stay faithful, every encounter makes you waver. It doesn't have to be someone close; it could be a celebrity, artist, or foreign idol. Be aware that your partner might be experiencing the same temptation.",
            loveQuote: "A heart divided casts shadows where the light of trust once shone.",
            work: "You may need to travel for meetings with multiple clients or seek help from several departments. If you're tired of your current job, you might request a project transfer, department change, or sneak out for a job interview. If you're not planning to switch jobs, you might hear about a credible competitor. Be careful about sharing your ideas with others, as they could be stolen without credit.",
            workQuote: "Guard your brilliance carefully; not every ear that listens wishes you well.",
            finance: "Beware of online scammers. Buy only from reputable platforms. Don't trust suspicious messages or calls. If you're short on cash, you may need to convert valuables into money. Those without financial issues should be wary of someone close secretly mortgaging your assets. Salaried workers may be offered money to do something wrong, or this may indicate you're secretly moonlighting during work hours for extra income.",
            financeQuote: "Shortcuts with money always charge interest in trust.",
            health: "You may have attention and focus issues that affect your work. Watch for sprains and muscle strains from lifting heavy objects. Adjust your work environment for better focus and be careful when lifting.",
            healthQuote: "A scattered mind scatters the body's strength; gather your thoughts to gather your health."
        }
    },
    "EIGHT OF SWORDS": {
        en: {
            love: "For singles, you tend to isolate yourself and rarely meet new people. If you're talking to someone, the relationship isn't progressing. They're pulling away and communicating less, yet you keep waiting. Or if you like someone, they may not be ready to open their heart, still waiting for an ex to return.\n\nFor those in a relationship, you may be in a long-distance situation without meeting for a long time, or facing problems with no solution. Neither of you is willing to fix things or compromise. It feels impossible to continue, yet you still want to give it one more try.",
            loveQuote: "The prison of the heart has no lock that courage cannot open.",
            work: "You feel trapped in problems with no way out. You may face criticism from supervisors or coworkers. Projects have ongoing issues. You dread seeing anyone at the office. You're burnt out and can't see a solution. This card warns that you're so immersed in misery that you've forgotten to look at reality. If this isn't your place, find a new one. Or you may have health issues requiring sudden sick leave. Those wanting to change jobs might be held back by their boss.",
            workQuote: "The walls around you are not as high as they appear; look again with fresh eyes.",
            finance: "You've been dealing with financial problems for a long time. Debts feel like impossible knots. Looking around, no one can help. You keep hoping luck will turn and problems will resolve on their own. Watch for health and legal issues. Don't create enemies or post inflammatory comments online, especially when your wallet is empty. Seek expert advice to systematically manage your debt.",
            financeQuote: "Even the tightest knot begins to loosen when patient hands find the right thread.",
            health: "There may be mental health issues requiring help from a psychiatrist. Some may experience drowsiness from medication. For those already planning surgery, it may involve the midsection and abdominal area. Follow your doctor's instructions strictly.",
            healthQuote: "Asking for help is not weakness; it is the first step toward the light."
        }
    },
    "NINE OF SWORDS": {
        en: {
            love: "For singles, unclear status is causing you stress. You may face the same disappointments repeatedly, wondering why things never progress. But sometimes it's simply a matter of chemistry, not anyone's fault. For those completely single, you might meet someone attractive while out at night, but they'll bring more headaches than love.\n\nFor those in a relationship, you tend to worry excessively, tormenting yourself with negative thoughts. Your distrust may be born from your own imagination or overthinking. Or perhaps you've recently discovered a painful truth about your partner that you can't stop obsessing over.",
            loveQuote: "The darkest hour of worry ends the moment you choose to face the dawn.",
            work: "You frequently work overtime. You may get woken up by work calls in the middle of the night. If you work with international clients, you might have meetings at odd hours to match their time zone. This card also points to long-standing problems. You may be called in for a reprimand, or you've recently learned something that makes you want to quit. Or you're rushing to close a project with endless client revisions.",
            workQuote: "The night shift of the mind is hardest; daylight always brings perspective.",
            finance: "Past overspending catches up when the bills arrive, along with work stress. People who borrowed money have disappeared. Business owners may face cash flow problems, with projects behind schedule. Missing payment documents delay your income by another month. Organize your finances and paperwork. Track income and expenses to maintain control.",
            financeQuote: "The ledger of sleepless nights is balanced only by the courage to face the numbers.",
            health: "You may have insomnia from stress and pressure. Those who've recently returned from abroad may experience jet lag. Some may need hospitalization for surgery. If considering cosmetic surgery, carefully review the anesthesia details. Manage stress, get enough rest, and provide your doctor with a thorough medical history.",
            healthQuote: "Sleep is the gentle nurse that mends what worry has torn apart."
        }
    },
    "TEN OF SWORDS": {
        en: {
            love: "For singles, if you've just ended a relationship, this is the most painful period. You know it's over but can't move on. For those completely single, someone nursing a broken heart may talk to you, but it's more about seeking comfort than building a relationship.\n\nFor those in a relationship, things are fragile. Your partner may have done something you can't forgive. You're still drowning in pain. If there's no major problem, it may simply mean you rarely see each other. Even living in the same house, you sleep at different times. Or your partner may be going through a rough patch and needs to be cautious about health and accidents.",
            loveQuote: "Every ending carries within it the first breath of a new beginning.",
            work: "A long-running project you've been responsible for is finally wrapping up. You could take a vacation abroad for a while. If you're not closing a project, watch for work problems. Those in manufacturing must be careful with machinery and accidents. Beware of backstabbing from coworkers, or someone quitting and leaving you to clean up alone. You may need to coordinate with international offices across time zones, or you might feel so burnt out that you want to resign.",
            workQuote: "The final page of one chapter is always the first page of the next.",
            finance: "Watch for health-related expenses. Get insurance early to maintain financial stability. Investments during this period tend toward loss rather than gain. Be wary of accumulating losses. Business owners may have partner disputes. If losses have been ongoing, it may be time to close the business. Assess the situation honestly and don't let problems grow beyond repair.",
            financeQuote: "Sometimes the bravest financial move is knowing when to stop the bleeding.",
            health: "Be cautious of both health issues and accidents. You may need major surgery or catch a bad flu. Some may have back pain requiring physical therapy or acupuncture. Take extra care of your health and see a doctor promptly when something feels wrong.",
            healthQuote: "The body that has endured the most knows best the value of gentle care."
        }
    },
    "ACE OF PENTACLES": {
        en: {
            love: "For singles, you may invest in ending your single status, such as signing up for a premium dating app or getting cosmetic procedures for confidence. If you've recently changed jobs, you might invest in your appearance hoping to meet someone. If there's already someone interested, they'll accept your invitation to go out. Don't forget to bring a gift to make a good impression.\n\nFor those in a relationship, expect a high-value gift from your partner. If you've been arguing, the apology may come in cash. If you want to start a business, your partner will agree and help fund the initial investment.",
            loveQuote: "Love planted in fertile ground grows roots that no storm can uproot.",
            work: "Good news about work is coming. If you've presented a project, the client may agree and sign the contract. Job applicants are likely to be called for interviews and receive suitable offers. Those aiming to grow within their current company will be assigned important tasks, given budgets to manage, new equipment, or possibly bonuses and special gifts from the workplace.",
            workQuote: "When opportunity lays a golden coin in your palm, build with it wisely.",
            finance: "Job applicants will receive attractive financial offers. Business owners will find profitable locations. A long-awaited large sum is likely to come through. If you urgently need money, you can borrow from someone close. Use this opportunity for long-term financial planning: savings, investments, and building stability. Don't forget to maintain an emergency fund.",
            financeQuote: "The first coin earned with purpose becomes the cornerstone of a fortune.",
            health: "For those in good health, this card may remind you to take your daily supplements. Those who've recently had a checkup may discover a lump or growth. If you don't have health issues, someone may try to sell you health insurance or supplements. Those trying to conceive may be in their fertile window. Get regular checkups and research thoroughly before purchasing insurance or supplements.",
            healthQuote: "The seed of good health is planted in the small daily choices you make."
        }
    },
    "TWO OF PENTACLES": {
        en: {
            love: "For singles, beware of someone who's already taken, a serial dater, or a skilled player who toys with feelings. Or perhaps you're the one talking to multiple people. It's fine until they find out about each other. This card also represents long-distance relationships where you must struggle to align schedules.\n\nFor those in a relationship, your partner may have financial issues, splitting income two ways. If married, they may need to send money to their family. Or they may have debts you don't know about.",
            loveQuote: "A heart that juggles too many loves drops them all eventually.",
            work: "There may be a company split, department restructuring, or branch separation. You'll need to handle multiple responsibilities simultaneously. One project isn't finished when the next one starts, because there aren't enough people. Several coworkers may resign, leaving you to pick up their work. Job seekers may find positions far away, possibly near water. The role could involve management, import-export, or currency exchange. Expect to wear two hats, and salary negotiations will be tough.",
            workQuote: "The hands that learn to juggle many tasks build strength no single task could teach.",
            finance: "Though you have multiple income streams, there's no savings. You're skilled at shuffling money, making a modest income stretch far by borrowing from one account to cover another, or using remaining credit on one card to pay off another. For business owners or those receiving inheritance, the sum may need to be split in half. Restructure your finances for greater stability.",
            financeQuote: "The coin that spins between two hands belongs to neither until it lands.",
            health: "Women should watch for breast and uterine health, and get regular ultrasounds. Men should be careful with heavy lifting. Also watch for issues with paired organs like the lungs. Get annual checkups and maintain regular health care.",
            healthQuote: "Balance is not standing still; it is the art of moving without falling."
        }
    },
    "THREE OF PENTACLES": {
        en: {
            love: "People around you are trying to set you up, but no one has impressed you yet. A new person at work may seem interesting but doesn't quite click. If there's someone you like, you and your friends might devise a subtle plan to get acquainted, starting with work consultations or hiring them.\n\nFor those in a relationship, this is a time for open conversations about issues. A mediator may help resolve conflicts. If there's a third-party problem, all parties may be called in to clear the air. If things are fine, you might meet your partner's coworkers or plan a business venture together. Couples sharing a bank account should be careful that credit card statements don't become incriminating evidence.",
            loveQuote: "The best relationships are built the way cathedrals are, with patience, craft, and shared vision.",
            work: "Expect frequent meetings this week. Plans previously discussed verbally now need to be formalized into presentations for management. If there are workplace issues, executives may call you in. Job seekers are likely to get interview calls and can negotiate salary successfully. Contracts will be signed quickly.",
            workQuote: "Mastery reveals itself not in solitude, but in the harmony of many hands at work.",
            finance: "Financial opportunities come through work. Salaried workers may receive overtime pay or extra commissions. New hires can negotiate salary to some extent. Business owners and freelancers will land big projects but must work first and wait to bill later. Have reserve funds for the waiting period and plan finances carefully.",
            financeQuote: "Every coin earned through honest craft carries the weight of lasting value.",
            health: "Your company may organize annual health checkups or blood drives. Those with chronic conditions may discuss blood test results with their doctor. Some may hire a personal trainer to plan an exercise routine. Take this opportunity to care for your health and follow expert advice.",
            healthQuote: "The body, like any craft, improves with regular attention and skilled hands."
        }
    },
    "FOUR OF PENTACLES": {
        en: {
            love: "For singles, you're lonely but afraid to approach anyone. You want a partner but don't want to leave home, perhaps fearing the expense or needing too much personal space. Even with suitors, you're hard to reach.\n\nFor those in a relationship, there are unspoken grievances on both sides. What started as one issue has snowballed. The distance between you grows. You avoid physical contact and may even sleep in separate rooms.",
            loveQuote: "A heart held too tightly suffocates the love it tries to keep.",
            work: "You feel your position is unstable and are trying to protect your territory and importance. You interact less with colleagues, delegating minor tasks but hoarding important ones. Or you may simply be overwhelmed with work, seeing no one who could take over. Even when you delegate, new work piles up. Job seekers may find a job in the city center, but the high cost of living demands frugality.",
            workQuote: "Holding everything close builds walls; trusting others builds bridges.",
            finance: "You may live in a high-cost area, requiring you to tighten your belt elsewhere to save. If you've been spending lavishly, cut back on socializing and control spending. Those with bank debts tend to pay at the very last day to hold onto cash as long as possible. Organize your expenses systematically and practice better discipline with debt payments.",
            financeQuote: "The miser and the spendthrift share the same fear; only the wise find balance.",
            health: "Watch for digestive issues including cramping, bloating, and gas. Those who sit for long periods without moving may have intestinal problems. Eat high-fiber foods, get up and walk frequently, and maintain regular meal times.",
            healthQuote: "A body that moves freely digests both food and worry with greater ease."
        }
    },
    "FIVE OF PENTACLES": {
        en: {
            love: "For singles, you may be pursued relentlessly by someone you're not interested in. Their motto is 'persistence pays off'; the more you reject, the harder they try. Or you might be the one coming on too strong. Watch your approach, as the other person may not appreciate your methods.\n\nFor those in a relationship, you and your partner may not be as close as before, whether due to physical distance or emotional disconnect. One of you constantly checks up on the other. If your relationship is actually healthy, it may mean someone is persistently pursuing your partner.",
            loveQuote: "Love given in desperation feels like a storm, not a shelter.",
            work: "The company provides no support in terms of equipment or budget, making work difficult. You must follow your boss into a new project that lacks even a basic concept, building everything from scratch. Or you're so fed up that you're discussing a group exit with coworkers. Job seekers may find salary negotiation difficult, with jobs in inconvenient locations. If interested, reach out to friends or former bosses who once invited you.",
            workQuote: "The coldest winters forge the most resilient spirits.",
            finance: "You may be facing severe financial hardship, with no one able to help because everyone is in a similar situation. For those without money problems, this could mean overspending while traveling abroad, with a friend borrowing money during the trip, or shopping until broke and rushing back to work off the debt. Plan spending carefully and maintain an emergency fund.",
            financeQuote: "Even in scarcity, the hand that keeps one coin back plants tomorrow's hope.",
            health: "Watch out for colds with fever and chills. Those with chronic conditions should be alert for flare-ups. Travelers should check weather conditions and pack appropriate clothing. Take extra care of your health during seasonal changes.",
            healthQuote: "The body weakened by worry heals fastest when wrapped in warmth and rest."
        }
    },
    "SIX OF PENTACLES": {
        en: {
            love: "For singles, you'll meet someone kind and generous, ready to give you whatever you want. Just ask, and they'll provide. But the downside is their tendency to flirt, or they may not actually be single. If they truly are single, they might have heavy financial obligations, supporting family members or still providing for an ex-partner and children.\n\nFor those in a relationship, if you're having financial difficulties, you can ask your partner for help. Conversely, if things are fine for you, this may be a time when you need to support your partner. For married couples, household expenses are high this period. Be careful of friction caused by your partner's generous nature toward others.",
            loveQuote: "True generosity in love gives without keeping score.",
            work: "Your department has received a new project, and your boss is distributing tasks. Because they trust you the most, you get more work than anyone else. Managers should explain their reasoning for task assignments to reduce resentment and favoritism. Ensure everyone sees the big picture and works as a team. For business owners, the main challenge is financial management; sales are good but expenses are high.",
            workQuote: "The one who gives the most of themselves builds the strongest foundation for all.",
            finance: "If you need help, ask an older male figure, perhaps your father, an elder relative, or someone who has feelings for you. Conversely, if you're the elder, you may need to help someone younger out of fondness, possibly lending more than your own savings allow. Consider what's reasonable and set limits on how much you can give.",
            financeQuote: "The hand that gives wisely enriches both the giver and the receiver.",
            health: "You may try a new treatment method, or combine conventional medicine with alternative therapies. Some may need to look after the health of someone close to them or a pet.",
            healthQuote: "Healing comes in many forms; stay open to the remedy you least expect."
        }
    },
    "SEVEN OF PENTACLES": {
        en: {
            love: "For singles, you've fallen for someone unattainable. It could be someone you've been watching from afar, or a celebrity you pour money into supporting. If you're talking to someone, they may be waiting for someone else and can't give you serious attention.\n\nFor those in a relationship, you feel weary of the relationship, possibly from problems that have accumulated over time. Even though your partner has many good qualities, you only see the problems. Speak openly rather than keeping things bottled up inside.",
            loveQuote: "Patience with love's slow harvest rewards the heart that does not pluck too soon.",
            work: "There's a backlog of work to manage, perhaps from complacency. For new projects, delays may stem from clients or budget approvals. All you can do is what's within your control. Success may take seven weeks to seven months. Job seekers may have one or two contacts but nothing exciting yet. If you've already agreed to start a new position, it may get postponed.",
            workQuote: "The garden of ambition grows in its own time; trust the season you are in.",
            finance: "Those waiting to sell property will receive good news soon. If negotiations are underway, you'll receive a deposit. Loan applications will be approved. Those at large companies may receive a substantial bonus and attractive offers. Plan wisely for incoming funds, dividing them between spending, saving, and investing.",
            financeQuote: "The patient farmer who tends the field reaps what the restless one never will.",
            health: "Watch for digestive issues from eating too much meat. You may need something to help with elimination. Those with lumps or growths may need biopsies and monitoring. Adjust your diet, increase fruits and vegetables, and attend all scheduled medical appointments.",
            healthQuote: "What you feed your body today becomes the strength or struggle of tomorrow."
        }
    },
    "EIGHT OF PENTACLES": {
        en: {
            love: "For singles, your environment keeps you from meeting anyone. You go back and forth between home and work. If this lifestyle continues, so will the singlehood. If there's someone you like, they may be so focused on work or hobbies that they have no time for you. This isn't the right moment for them to open their heart.\n\nFor those in a relationship, your partner doesn't have much time for you, possibly due to work stress and financial concerns, or they're rushing to finish a project and continue working even at home. Or they might be glued to their phone or games, forgetting to pay attention to you.",
            loveQuote: "The hands busy with purpose must sometimes pause to hold the ones they love.",
            work: "This is a period of exceptional focus and dedication. You enjoy working independently on tasks that require skill. Salaried workers are gaining valuable experience, though tasks tend to be repetitive, making you faster but not necessarily growing. For development, seek freelance experience. Freelancers will have a steady stream of work. Showcase your portfolio actively and clients will keep coming.",
            workQuote: "Mastery is born in the quiet repetition of craft, one stroke at a time.",
            finance: "Salaried workers enjoy financial stability with income growing gradually. Freelancers attract ongoing work as their portfolio gains visibility, building savings over time. Those considering investment should choose low-risk options with steady returns and a long-term perspective. Keep developing your skills to increase earning potential.",
            financeQuote: "Steady hands at the workbench build a fortune that flashy schemes never can.",
            health: "You may have chronic back pain from poor work posture. Invest in a good desk and chair. Watch for wrist inflammation from keyboard use. Adjust your work environment ergonomically and stretch regularly throughout the day.",
            healthQuote: "The craftsperson who tends their tools must also tend the body that wields them."
        }
    },
    "NINE OF PENTACLES": {
        en: {
            love: "For singles, people will flirt with you, but status won't progress. You or they aren't clearly ready. Your charm tends to attract people who are already taken. If you're interested in someone, they may be looking at your assets, hoping to rely on you financially.\n\nFor those in a relationship, you're acting so independent that people wonder if you're single. Maybe you've suddenly started looking better, dressing up more, and changing your lifestyle. The relationship with your partner feels bland as you focus more on yourself. Married couples may be expecting a boy, or living apart while still receiving financial support.",
            loveQuote: "The garden you grow for yourself is the one that draws the truest admirers.",
            work: "You're a favorite of someone important at work, causing jealousy. Others assume you got there through connections, when in reality you're both attractive and talented. Your polished image makes people think you spend work time on appearance. Or you may work alongside someone like this. You acknowledge their skill, but despite equal effort, favoritism always tips their way.",
            workQuote: "Let your harvest speak louder than the envy of those who watch from the fence.",
            finance: "This is a fortunate period for windfalls and unexpected income. Past investments are ready to bear fruit. Business owners will receive dividends. Loan applications will be approved, though interest rates may be higher than expected. On the spending side, there's a tendency to splurge on designer goods. Control spending and allocate some money for investment.",
            financeQuote: "Abundance earned through patience tastes sweeter than any windfall of chance.",
            health: "Watch for skin rashes and allergy flare-ups. Those planning to have children may receive good news. Expectant mothers may be near their due date. Women should check hormonal balance. Care for your skin, get annual checkups, and prepare for your body's changes.",
            healthQuote: "A body in bloom deserves the same care as the garden that surrounds it."
        }
    },
    "TEN OF PENTACLES": {
        en: {
            love: "For singles, you may meet someone interesting at social events, weddings, seminars, or a new workplace. They could be an acquaintance of someone close to you. If you're already talking to someone, they may take you to events and introduce you to their circle. There could also be disagreements about things they value.\n\nFor those in a relationship, there are matters to discuss. If love is smooth, it may be about financial planning, marriage, or starting a family. But if there are problems, it could be about overspending, debts, or family relationships. The outcome depends on how you communicate.",
            loveQuote: "The love that builds a legacy begins with two hearts planning the same dream.",
            work: "Salaried workers may meet with senior executives about budget matters. Job seekers have good prospects in finance, the stock market, real estate, or large well-capitalized companies, gaining greater stability. Freelancers will land major projects, possibly needing to hire help. Long-time freelancers may register a company. Business owners will receive capital to expand operations.",
            workQuote: "The empire built on solid ground stands long after the builders have rested.",
            finance: "There's potential for a major windfall, from selling land or receiving an inheritance. Home buyers will get mortgage approval. Those wanting to expand a business will find financial backers. For family-run businesses, watch for disputes about budgets and profit-sharing. If the business isn't profitable, senior family members may send auditors. Manage everything transparently.",
            financeQuote: "Generational wealth is built not by one hand alone, but by many working in trust.",
            health: "Someone may offer you a high-coverage health insurance plan. Those with chronic conditions should watch for infections and spread. Cancer survivors should verify the disease hasn't returned. For those without chronic conditions, this may simply mean bloating and indigestion. Consider getting health insurance and maintain regular checkups.",
            healthQuote: "The legacy of good health is the greatest inheritance you can leave behind."
        }
    }
};
