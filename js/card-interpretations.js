/**
 * Card of the Day - Card Interpretations Data
 * @version 2.0.0
 * NOTE: Thai (th) interpretations are loaded from tarot_cards.json (card_of_the_day)
 */

const cardInterpretations = {
    "THE FOOL": {
        en: {
            quote: "Someone who comes unexpectedly, not knowing what they truly want",
            interpretation: "Your plans may suddenly change today — a friend might invite you somewhere new, you could try a restaurant you've never been to, or you may need to travel an unfamiliar route. Be especially careful about carelessness today: sending an email to the wrong person, forgetting to attach a file, or dressing off-theme. Don't forget to double-check your documents and outfit before leaving the house, because small mistakes could cause chaos for the entire day."
        },
        ja: {
            quote: "計画なしに来る人、自分が本当に何を望んでいるかわからない",
            interpretation: "今日は予定が急に変わるかもしれません。友達が新しい場所に誘ってきたり、行ったことのないレストランを試したり、慣れない道を通ることになるかもしれません。今日は特にうっかりミスに注意してください。メールを間違った相手に送ったり、ファイルの添付を忘れたり、テーマに合わない服装をしてしまったり。家を出る前に書類と服装をしっかり確認しましょう。小さなミスが一日中混乱を引き起こす可能性があります。"
        },
        ko: {
            quote: "계획 없이 오는 사람, 자신이 진정으로 원하는 것을 모름",
            interpretation: "오늘은 계획이 갑자기 바뀔 수 있습니다. 친구가 새로운 곳에 놀러 가자고 하거나, 가본 적 없는 식당을 시도하거나, 익숙하지 않은 길로 이동해야 할 수도 있습니다. 오늘은 특히 부주의에 조심하세요. 이메일을 잘못된 사람에게 보내거나, 파일 첨부를 잊거나, 테마에 맞지 않는 옷을 입는 실수가 생길 수 있습니다. 집을 나서기 전에 서류와 복장을 꼭 확인하세요. 작은 실수가 하루 종일 혼란을 일으킬 수 있습니다."
        },
        "zh-CN": {
            quote: "没有计划就来的人，不知道自己真正想要什么",
            interpretation: "今天的计划可能会突然改变——朋友可能邀你去新地方、尝试没去过的餐厅，或者你需要走一条不熟悉的路线。今天要特别注意粗心大意：比如把邮件发错人、忘记附件、或者穿错主题的衣服。出门前别忘了检查文件和穿着，因为小失误可能让你一整天都手忙脚乱。"
        },
        "zh-TW": {
            quote: "沒有計劃就來的人，不知道自己真正想要什麼",
            interpretation: "今天的計劃可能會突然改變——朋友可能邀你去新地方、嘗試沒去過的餐廳，或者你需要走一條不熟悉的路線。今天要特別注意粗心大意：比如把郵件發錯人、忘記附件、或者穿錯主題的衣服。出門前別忘了檢查文件和穿著，因為小失誤可能讓你一整天都手忙腳亂。"
        },
        fr: { quote: "Quelqu'un qui arrive sans prévenir, ne sachant pas ce qu'il veut vraiment", interpretation: "Vos plans pourraient changer brusquement aujourd'hui — un ami pourrait vous inviter dans un endroit nouveau, vous pourriez essayer un restaurant inconnu, ou vous devrez peut-être emprunter un itinéraire inhabituel. Soyez particulièrement vigilant(e) contre les étourderies : envoyer un e-mail à la mauvaise personne, oublier une pièce jointe ou vous habiller hors thème. N'oubliez pas de vérifier vos documents et votre tenue avant de partir, car une petite erreur pourrait semer le chaos toute la journée." }
    },
    "THE MAGICIAN": {
        en: {
            quote: "A charming and talented person, desired by many",
            interpretation: "Today is a day when work will make real progress — even tasks that were stuck will start moving forward. If you have a meeting or presentation, everything will go smoothly. Your colleagues are ready to cooperate. Today is perfect for organizing your desk, updating documents, or clearing out the backlog of old tasks. If you want to start something new, today is the day to do it, because you'll have more drive and energy than usual."
        },
        ja: {
            quote: "魅力的で才能のある人、多くの人に求められる",
            interpretation: "今日は仕事が確実に進む日です。停滞していた仕事でさえ動き始めます。会議やプレゼンがあれば、すべてうまくいくでしょう。同僚も協力的です。今日はデスクの整理、書類の更新、溜まっていた古い仕事の片付けに最適です。何か新しいことを始めたいなら、今日がその日です。いつもより気合いとエネルギーに満ちているはずです。"
        },
        ko: {
            quote: "매력적이고 재능 있는 사람, 많은 사람들이 원하는",
            interpretation: "오늘은 업무가 실질적으로 진전되는 날입니다. 막혀 있던 일도 움직이기 시작할 것입니다. 회의나 프레젠테이션이 있다면 모든 것이 순조롭게 진행됩니다. 동료들도 기꺼이 협력할 것입니다. 오늘은 책상 정리, 서류 업데이트, 밀린 업무 처리에 딱 좋은 날입니다. 새로운 것을 시작하고 싶다면 오늘 시작하세요. 평소보다 의욕과 에너지가 넘칠 것입니다."
        },
        "zh-CN": {
            quote: "有魅力且多才多艺的人，受到很多人的欢迎",
            interpretation: "今天工作会有实质进展，即使之前卡住的事情也会开始推进。如果有会议或汇报，一切都会顺利进行，同事们也愿意配合。今天很适合整理办公桌、更新文件、或清理积压已久的旧任务。如果想开始做点新事情，就从今天开始吧，因为你会比平时更有干劲和精力。"
        },
        "zh-TW": {
            quote: "有魅力且多才多藝的人，受到很多人的歡迎",
            interpretation: "今天工作會有實質進展，即使之前卡住的事情也會開始推進。如果有會議或簡報，一切都會順利進行，同事們也願意配合。今天很適合整理辦公桌、更新文件、或清理積壓已久的舊任務。如果想開始做點新事情，就從今天開始吧，因為你會比平時更有幹勁和精力。"
        },
        fr: { quote: "Une personne charmante et talentueuse, désirée par beaucoup", interpretation: "Aujourd'hui, le travail avancera bien — même les tâches bloquées commenceront à bouger. Si vous avez une réunion ou une présentation, tout se passera sans accroc. Vos collègues seront prêts à coopérer. C'est la journée idéale pour ranger votre bureau, mettre à jour vos documents ou liquider les anciennes tâches en retard. Si vous voulez lancer quelque chose de nouveau, faites-le aujourd'hui : vous aurez plus de motivation et d'énergie que d'habitude." }
    },
    "THE HIGH PRIESTESS": {
        en: {
            quote: "A mysterious person who may be hiding secrets",
            interpretation: "Today you'll receive important information or documents — it could be an email, a letter, or a notification that needs to be kept confidential. Your work will focus on document management, data verification, or tasks requiring meticulous attention to detail. On another note, you may need to play the role of a good listener today. Someone will come to you for advice, and you may be the only person who can give them the guidance they need. If it's a personal matter, it's as if you'll be sitting right inside their heart."
        },
        ja: {
            quote: "秘密を隠しているかもしれない神秘的な人",
            interpretation: "今日は重要な情報や書類を受け取るでしょう。メール、手紙、または機密扱いが必要な通知かもしれません。仕事は書類管理、データ確認、または細心の注意を要する作業が中心になります。もう一つの意味として、今日は良い聞き役になる必要があるかもしれません。誰かが相談に来て、あなただけがその人に必要なアドバイスを与えられる存在になるでしょう。プライベートな話なら、まるであなたがその人の心の中に座っているかのようです。"
        },
        ko: {
            quote: "비밀을 숨기고 있을 수 있는 신비로운 사람",
            interpretation: "오늘은 중요한 정보나 서류를 받게 될 것입니다. 이메일, 편지, 또는 비밀로 유지해야 할 알림일 수 있습니다. 업무는 문서 관리, 데이터 검증, 또는 꼼꼼한 주의가 필요한 작업에 집중될 것입니다. 한편으로는, 오늘 좋은 경청자 역할을 해야 할 수도 있습니다. 누군가가 고민 상담을 하러 올 텐데, 그 사람에게 필요한 조언을 줄 수 있는 유일한 사람이 바로 당신일 것입니다. 개인적인 일이라면, 마치 그 사람의 마음속에 들어가 앉아 있는 것처럼 느껴질 것입니다."
        },
        "zh-CN": {
            quote: "可能隐藏着秘密的神秘人",
            interpretation: "今天你会收到重要的信息或文件，可能是电子邮件、信件或需要保密的通知。工作重心会放在文件管理、数据核查或需要细致入微的任务上。另一方面，今天你可能需要扮演一个好的倾听者。有人会来找你商量问题，而你可能是唯一能给出他们所需建议的人。如果是私事，你就像是走进了他们的内心深处。"
        },
        "zh-TW": {
            quote: "可能隱藏著秘密的神秘人",
            interpretation: "今天你會收到重要的資訊或文件，可能是電子郵件、信件或需要保密的通知。工作重心會放在文件管理、資料核查或需要細緻入微的任務上。另一方面，今天你可能需要扮演一個好的傾聽者。有人會來找你商量問題，而你可能是唯一能給出他們所需建議的人。如果是私事，你就像是走進了他們的內心深處。"
        },
        fr: { quote: "Une personne mystérieuse qui cache peut-être des secrets", interpretation: "Aujourd'hui, vous recevrez des informations ou des documents importants — un e-mail, une lettre ou une notification confidentielle. Votre travail sera axé sur la gestion de documents, la vérification de données ou des tâches exigeant une grande minutie. Par ailleurs, vous devrez peut-être jouer le rôle du bon auditeur aujourd'hui. Quelqu'un viendra vous demander conseil, et vous serez peut-être la seule personne capable de lui donner les orientations dont il a besoin. S'il s'agit d'une affaire personnelle, c'est comme si vous étiez assis(e) au plus profond de son cœur." }
    },
    "THE EMPRESS": {
        en: {
            quote: "You're already complete, anyone who enters must enhance your life",
            interpretation: "Today you might end up being the \"walking bank\" for your friends or coworkers. Anyone with money troubles or needing to borrow something will turn to you. You might be the only one carrying cash or have the supplies everyone needs. Don't forget to keep track of who borrowed what. During the day, make sure to get up and walk around — don't sit working for too long, as you may have issues with your back or from prolonged sitting."
        },
        ja: {
            quote: "あなたはすでに完璧、入ってくる人はあなたの人生を豊かにしなければ",
            interpretation: "今日はあなたが友人や同僚の「移動銀行」になるかもしれません。お金のトラブルや何かを借りたい人がみんなあなたを頼ってきます。現金を持っているのはあなただけかもしれませんし、みんなが必要な備品を持っているのもあなただけかもしれません。誰が何を借りたかメモしておくのを忘れずに。日中は立ち上がって歩き回りましょう。長時間座りっぱなしで仕事をしないでください。腰の問題や長時間の座位による不調が出るかもしれません。"
        },
        ko: {
            quote: "당신은 이미 완벽해요, 들어오는 사람은 당신의 삶을 향상시켜야 해요",
            interpretation: "오늘은 친구나 동료들에게 \"이동식 은행\" 역할을 하게 될 수 있습니다. 돈 문제가 있거나 뭔가를 빌려야 하는 사람들이 모두 당신에게 의지할 것입니다. 현금을 가지고 있는 사람이 당신뿐이거나, 모두가 필요한 물건을 가진 사람이 당신일 수 있습니다. 누가 무엇을 빌려갔는지 꼭 기록해 두세요. 낮에는 틈틈이 일어나서 걸어 다니세요. 너무 오래 앉아서 일하지 마세요. 허리 문제나 오래 앉아 있는 것으로 인한 문제가 생길 수 있습니다."
        },
        "zh-CN": {
            quote: "你已经很完美了，进入你生活的人必须让它更好",
            interpretation: "今天你可能会成为朋友或同事的“移动银行”。谁有钱的问题或需要借东西，都会来找你。你可能是唯一带现金的人，或者拥有大家都需要的物品。别忘了记下谁借了什么。白天记得起来走走，不要久坐工作，因为可能会出现腰部不适或久坐引起的问题。"
        },
        "zh-TW": {
            quote: "你已經很完美了，進入你生活的人必須讓它更好",
            interpretation: "今天你可能會成為朋友或同事的「移動銀行」。誰有錢的問題或需要借東西，都會來找你。你可能是唯一帶現金的人，或者擁有大家都需要的物品。別忘了記下誰借了什麼。白天記得起來走走，不要久坐工作，因為可能會出現腰部不適或久坐引起的問題。"
        },
        fr: { quote: "Vous êtes déjà complète, celui qui entre doit enrichir votre vie", interpretation: "Aujourd'hui, vous pourriez finir par être la « banque ambulante » de vos amis ou collègues. Quiconque a des soucis d'argent ou besoin d'emprunter quelque chose se tournera vers vous. Vous serez peut-être la seule personne à avoir du liquide ou le matériel dont tout le monde a besoin. N'oubliez pas de noter qui a emprunté quoi. Dans la journée, pensez à vous lever et à marcher — ne restez pas assis(e) trop longtemps, car vous pourriez avoir des problèmes de dos ou liés à une position assise prolongée." }
    },
    "THE EMPEROR": {
        en: {
            quote: "A powerful leader who provides stability",
            interpretation: "Today you'll be dealing with rules, regulations, or official procedures. You may need to check terms and conditions, review regulations, or visit a government office. If you work in an office, there might be a meeting with your boss or senior management. Prepare your data and documents in advance, and dress neatly — presenting yourself well will help things go smoothly. If you need to sign important documents, read the details carefully before signing."
        },
        ja: {
            quote: "安定を与える力強いリーダー",
            interpretation: "今日は規則や公的手続きに関わることになります。条件や規定を確認したり、役所に行く必要があるかもしれません。オフィスで働いているなら、上司や組織の上層部との会議があるかもしれません。データと書類を事前に準備し、きちんとした服装をしましょう。身だしなみを整えることで、やり取りがスムーズになります。重要な書類に署名する必要がある場合は、署名前に詳細をよく読んでください。"
        },
        ko: {
            quote: "안정을 주는 강력한 리더",
            interpretation: "오늘은 규칙, 규정 또는 공식 절차를 다루게 됩니다. 조건을 확인하거나, 규정을 검토하거나, 관공서를 방문해야 할 수 있습니다. 사무실에서 일한다면 상사나 고위 경영진과 회의가 있을 수 있습니다. 자료와 서류를 미리 준비하고 깔끔하게 옷을 입으세요. 좋은 인상이 업무 협조를 원활하게 만들어 줍니다. 중요한 서류에 서명해야 한다면 서명 전에 세부 사항을 꼼꼼히 읽으세요."
        },
        "zh-CN": {
            quote: "提供稳定的强大领导者",
            interpretation: "今天你会涉及规章制度或正式流程。可能需要核实条款、查看规定，或前往政府机关办事。如果在办公室工作，可能会与领导或高层开会。提前准备好数据和文件，穿戴整齐，因为良好的仪表会让沟通协调更加顺利。如果需要签署重要文件，签名前务必仔细阅读细节。"
        },
        "zh-TW": {
            quote: "提供穩定的強大領導者",
            interpretation: "今天你會涉及規章制度或正式流程。可能需要核實條款、查看規定，或前往政府機關辦事。如果在辦公室工作，可能會與主管或高層開會。提前準備好資料和文件，穿戴整齊，因為良好的儀表會讓溝通協調更加順利。如果需要簽署重要文件，簽名前務必仔細閱讀細節。"
        },
        fr: { quote: "Un leader qui a du pouvoir et offre la stabilité", interpretation: "Aujourd'hui, vous aurez affaire à des règles, des réglementations ou des procédures officielles. Vous devrez peut-être vérifier des conditions, consulter des règlements ou vous rendre dans une administration. Si vous travaillez dans un bureau, une réunion avec votre supérieur ou la direction est possible. Préparez vos données et documents à l'avance, et soignez votre tenue — une bonne présentation facilitera les échanges. Si vous devez signer des documents importants, lisez attentivement les détails avant de signer." }
    },
    "THE HIEROPHANT": {
        en: {
            quote: "A good advisor, but doesn't give you special attention",
            interpretation: "You'll have meetings or encounters with several senior figures today. You may need to visit a school, university, or government building. Someone might come to you for advice about a workplace conflict. You may need to act as a mediator — listening to both sides and helping bridge understanding. Even if you can't solve everything, you can help improve the situation. As for dress code, choose something polite and appropriate for the occasion.\n\nHealth-wise, it may be time for a scheduled doctor's appointment, or you may have reason to visit the hospital."
        },
        ja: {
            quote: "良いアドバイザーだが、特別扱いはしない",
            interpretation: "今日は目上の人と会議や面会がいくつかあります。学校、大学、または官公庁に行く必要があるかもしれません。職場の対立について相談しに来る人がいるかもしれません。仲裁役を務め、双方の話を聞いて理解を橋渡しする必要があるかもしれません。すべてを解決できなくても、状況を改善する手助けはできます。服装は、場にふさわしい丁寧なものを選びましょう。\n\n健康面では、予約していた診察の時期かもしれませんし、病院に行く用事があるかもしれません。"
        },
        ko: {
            quote: "좋은 조언자지만 특별한 관심은 주지 않아요",
            interpretation: "오늘은 여러 어른들과 회의나 만남이 있을 것입니다. 학교, 대학교 또는 관공서를 방문해야 할 수도 있습니다. 직장 내 갈등에 대해 조언을 구하러 오는 사람이 있을 수 있습니다. 중재자 역할을 해야 할 수도 있습니다 — 양쪽의 이야기를 듣고 이해를 도와주는 것입니다. 모든 것을 해결할 수는 없더라도 상황을 개선하는 데 도움이 될 것입니다. 복장은 격식 있고 장소에 적합한 것을 선택하세요.\n\n건강 면에서는 예약된 진료가 있을 때이거나, 병원에 갈 일이 생길 수 있습니다."
        },
        "zh-CN": {
            quote: "好顾问，但不会特别关注你",
            interpretation: "今天你会与多位长辈或上级开会或会面。可能需要去学校、大学或政府机构。有人可能会来找你咨询职场冲突的问题。你可能需要充当调解人——倾听双方意见，帮助沟通理解。即使不能解决所有问题，也能帮助改善局面。穿着方面，选择得体且适合场合的服装。\n\n健康方面，可能是该去复诊的时候了，或者你有事需要跑一趟医院。"
        },
        "zh-TW": {
            quote: "好顧問，但不會特別關注你",
            interpretation: "今天你會與多位長輩或上級開會或會面。可能需要去學校、大學或政府機構。有人可能會來找你諮詢職場衝突的問題。你可能需要充當調解人——傾聽雙方意見，幫助溝通理解。即使不能解決所有問題，也能幫助改善局面。穿著方面，選擇得體且適合場合的服裝。\n\n健康方面，可能是該去複診的時候了，或者你有事需要跑一趟醫院。"
        },
        fr: { quote: "Un bon conseiller, mais ne vous accorde pas d'attention particulière", interpretation: "Aujourd'hui, vous aurez des réunions ou des rencontres avec plusieurs personnes d'autorité. Vous devrez peut-être vous rendre dans une école, une université ou un bâtiment administratif. Quelqu'un pourrait venir vous demander conseil sur un conflit au travail. Vous devrez peut-être jouer le rôle de médiateur — écouter les deux parties et aider à rétablir la compréhension. Même si vous ne pouvez pas tout résoudre, vous contribuerez à améliorer la situation. Côté vestimentaire, optez pour une tenue soignée et adaptée à l'occasion.\n\nCôté santé, il est peut-être temps d'aller à un rendez-vous médical prévu, ou vous pourriez avoir une raison de passer à l'hôpital." }
    },
    "THE LOVERS": {
        en: {
            quote: "Someone who clicks with you from the very first meeting",
            interpretation: "Today a new member may join your team, or your company might organize a team-building activity. Meetings will go smoothly — everyone is on the same page and can easily reach a consensus. Any agreements made may not involve formal contracts, but everyone will willingly follow through out of mutual goodwill. If it's a day off, you might visit a newly opened mall or attend a beautifully decorated event. You may even run into a celebrity, idol, or someone you secretly admire."
        },
        ja: {
            quote: "最初の出会いからぴったり合う人",
            interpretation: "今日はチームに新しいメンバーが加わるかもしれませんし、会社がチームビルディング活動を企画するかもしれません。会議はスムーズに進み、全員が同じ方向を向いていて、簡単に合意に達することができます。合意事項は正式な契約書にはならないかもしれませんが、お互いの信頼関係から全員が快く従います。休日なら、新しくオープンしたモールに行ったり、美しく装飾されたイベントに参加したりするかもしれません。芸能人、アイドル、またはひそかに憧れている人に偶然会うこともあるかもしれません。"
        },
        ko: {
            quote: "첫 만남부터 잘 맞는 사람",
            interpretation: "오늘 팀에 새로운 멤버가 합류하거나, 회사에서 팀빌딩 활동을 기획할 수 있습니다. 회의는 순조롭게 진행되고, 모두가 같은 생각으로 쉽게 합의에 도달할 것입니다. 합의된 사항은 공식 계약서 없이도 서로의 친밀함으로 기꺼이 따를 것입니다. 휴일이라면 새로 오픈한 쇼핑몰에 가거나 아름답게 꾸며진 이벤트에 참석할 수 있습니다. 연예인, 아이돌, 또는 몰래 좋아하는 사람을 우연히 만날 수도 있습니다."
        },
        "zh-CN": {
            quote: "从第一次见面就很合拍的人",
            interpretation: "今天可能有新成员加入团队，或者公司会组织团建活动。会议会很顺利，大家意见一致，很容易达成共识。达成的协议可能没有正式签合同，但大家都会因为彼此的默契而乐意遵守。如果是休息日，你可能会去逛新开的商场，或参加一个布置精美的活动。你可能会遇到明星、偶像，或者你暗自欣赏的人。"
        },
        "zh-TW": {
            quote: "從第一次見面就很合拍的人",
            interpretation: "今天可能有新成員加入團隊，或者公司會組織團建活動。會議會很順利，大家意見一致，很容易達成共識。達成的協議可能沒有正式簽合約，但大家都會因為彼此的默契而樂意遵守。如果是休息日，你可能會去逛新開的商場，或參加一個佈置精美的活動。你可能會遇到明星、偶像，或者你暗自欣賞的人。"
        },
        fr: { quote: "Quelqu'un avec qui ça clique dès la première rencontre", interpretation: "Aujourd'hui, un nouveau membre pourrait rejoindre votre équipe, ou votre entreprise pourrait organiser une activité de cohésion. Les réunions se dérouleront sans accroc — tout le monde sera sur la même longueur d'onde et trouvera facilement un terrain d'entente. Les accords conclus ne seront peut-être pas formalisés par un contrat, mais chacun les respectera de bonne grâce. Si c'est un jour de congé, vous pourriez visiter un centre commercial récemment ouvert ou assister à un événement joliment décoré. Vous pourriez même croiser une célébrité, un idol ou quelqu'un que vous admirez en secret." }
    },
    "THE CHARIOT": {
        en: {
            quote: "A determined person who knows what they want",
            interpretation: "Work will move forward well today because your superiors trust you to make decisions on your own. Your teammates and subordinates are ready to support you. If you've just joined a new team, you'll be working with people who are strong leaders and full of enthusiasm. Be prepared, because the pace will be quite intense.\n\nIf it's a day off, there will be a pre-planned trip — not a spontaneous outing, but a journey with a clear destination and a well-thought-out itinerary."
        },
        ja: {
            quote: "自分が何を望んでいるかを知っている決意のある人",
            interpretation: "今日は上司があなたに判断を任せてくれるので、仕事が順調に進みます。チームメイトや部下もサポートする準備ができています。新しいチームに入ったばかりなら、リーダーシップがあり意欲的な人たちと一緒に仕事をすることになります。ペースがかなり激しいので覚悟してください。\n\n休日であれば、事前に計画された旅行があるでしょう。突発的な外出ではなく、目的地と計画がはっきりしたトリップです。"
        },
        ko: {
            quote: "자신이 원하는 것을 아는 결단력 있는 사람",
            interpretation: "오늘은 윗사람이 당신에게 스스로 결정할 수 있도록 믿고 맡겨주기 때문에 업무가 잘 진행됩니다. 팀원과 부하 직원들도 지원할 준비가 되어 있습니다. 새 팀에 막 합류했다면, 리더십이 강하고 열정적인 사람들과 함께 일하게 될 것입니다. 업무 강도가 꽤 높을 테니 마음의 준비를 하세요.\n\n휴일이라면, 미리 계획된 여행이 있을 것입니다. 갑작스러운 외출이 아니라 목적지와 일정이 명확한 여행입니다."
        },
        "zh-CN": {
            quote: "知道自己想要什么的坚定的人",
            interpretation: "今天工作会进展顺利，因为上级信任你，让你自己做决定。团队成员和下属也准备好支持你。如果你刚加入新团队，将会和有领导力、充满干劲的人一起共事。做好准备，因为工作节奏会相当紧凑。\n\n如果是休息日，会有一趟事先规划好的出行——不是临时起意，而是有明确目的地和详细计划的旅程。"
        },
        "zh-TW": {
            quote: "知道自己想要什麼的堅定的人",
            interpretation: "今天工作會進展順利，因為上級信任你，讓你自己做決定。團隊成員和下屬也準備好支持你。如果你剛加入新團隊，將會和有領導力、充滿幹勁的人一起共事。做好準備，因為工作節奏會相當緊湊。\n\n如果是休息日，會有一趟事先規劃好的出行——不是臨時起意，而是有明確目的地和詳細計畫的旅程。"
        },
        fr: { quote: "Une personne déterminée qui sait ce qu'elle veut", interpretation: "Le travail avancera bien aujourd'hui, car vos supérieurs vous font confiance pour prendre vos propres décisions. Vos coéquipiers et subordonnés sont prêts à vous soutenir. Si vous venez d'intégrer une nouvelle équipe, vous travaillerez avec des personnes qui ont du leadership et beaucoup d'enthousiasme. Préparez-vous, car le rythme sera assez soutenu.\n\nSi c'est un jour de congé, un voyage planifié à l'avance est prévu — pas une sortie spontanée, mais un déplacement avec une destination claire et un itinéraire bien défini." }
    },
    "STRENGTH": {
        en: {
            quote: "Someone who needs your help and encouragement",
            interpretation: "If it's a workday, your boss may be keeping a particularly close eye on you — hovering nearby or standing behind you while you work, making sure you're giving your best. You may need to be upfront with them about your natural working style.\n\nIf it's a day off, you might be spending time with an elderly relative or your partner, and you'll be the one managing everything — choosing restaurants, planning meals, and organizing activities. Or it could mean taking a trip to the zoo or a dog-and-cat café."
        },
        ja: {
            quote: "あなたの助けと励ましを必要とする人",
            interpretation: "仕事の日であれば、上司が特にあなたを注視しているかもしれません。仕事中にそばに張り付いたり、後ろに立っていたりして、全力で取り組んでいるか確認しています。自分の自然な仕事のスタイルについて率直に伝える必要があるかもしれません。\n\n休日であれば、年配の親戚や恋人と過ごすことになり、食事の手配やレストラン選び、合間の活動の計画など、すべてを仕切る役になるかもしれません。あるいは、動物園や犬猫カフェへのお出かけを意味するかもしれません。"
        },
        ko: {
            quote: "당신의 도움과 격려가 필요한 사람",
            interpretation: "근무일이라면 상사가 특별히 당신을 주시할 수 있습니다 — 옆에 붙어 있거나 일하는 동안 뒤에 서서 당신이 최선을 다하는지 확인합니다. 상사에게 자신의 자연스러운 업무 스타일에 대해 솔직하게 말해야 할 수도 있습니다.\n\n휴일이라면 어르신 친척이나 연인과 시간을 보내게 되는데, 식사 관리, 식당 선택, 활동 계획 등 모든 것을 당신이 맡아야 할 수 있습니다. 아니면 동물원이나 강아지·고양이 카페에 가는 것을 의미할 수도 있습니다."
        },
        "zh-CN": {
            quote: "需要你帮助和鼓励的人",
            interpretation: "如果是工作日，老板可能会特别盯着你——在你工作时守在旁边或站在身后，确保你全力以赴。你可能需要直接告诉对方你自然的工作方式是什么样的。\n\n如果是休息日，你可能要陪年长的亲戚或伴侣，需要你来安排一切——选餐厅、规划用餐和期间的活动。或者也可能意味着去动物园或猫狗咖啡馆。"
        },
        "zh-TW": {
            quote: "需要你幫助和鼓勵的人",
            interpretation: "如果是工作日，老闆可能會特別盯著你——在你工作時守在旁邊或站在身後，確保你全力以赴。你可能需要直接告訴對方你自然的工作方式是什麼樣的。\n\n如果是休息日，你可能要陪年長的親戚或伴侶，需要你來安排一切——選餐廳、規劃用餐和期間的活動。或者也可能意味著去動物園或貓狗咖啡廳。"
        },
        fr: { quote: "Quelqu'un qui a besoin de votre aide et de vos encouragements", interpretation: "Si c'est un jour de travail, votre patron pourrait vous surveiller de près — restant à proximité ou se tenant derrière vous pendant que vous travaillez pour s'assurer que vous donnez le meilleur de vous-même. Vous devrez peut-être lui expliquer franchement votre façon naturelle de travailler.\n\nSi c'est un jour de congé, vous passerez peut-être du temps avec un parent âgé ou votre partenaire, et c'est vous qui gérerez tout — choisir le restaurant, planifier les repas et organiser les activités. Cela pourrait aussi signifier une sortie au zoo ou dans un café à chiens et chats." }
    },
    "THE HERMIT": {
        en: {
            quote: "Someone from your past with shared memories",
            interpretation: "You'll meet someone skilled, capable, and deeply knowledgeable in a specialized field. Their meticulousness might slow down the work's progress. If your working styles are very different, you may easily feel irritated. If you're a man, today you'll be able to focus on work exceptionally well, and can look up additional knowledge or information you need.\n\nOr if today is a day off, it might mean you have a photo shoot scheduled with your regular photographer."
        },
        ja: {
            quote: "共有の思い出を持つ過去の人",
            interpretation: "専門分野に精通した、スキルのある有能な人に出会うでしょう。その人の細かさが仕事の進行を遅らせるかもしれません。仕事のスタイルがかなり異なる場合、イライラしやすいかもしれません。男性であれば、今日は非常に集中して仕事ができ、必要な知識や情報を追加で調べることができます。\n\nまたは休日であれば、いつものカメラマンとの撮影の予定があるかもしれません。"
        },
        ko: {
            quote: "공유된 추억을 가진 과거의 사람",
            interpretation: "전문 분야에 깊은 지식을 가진 실력 있고 유능한 사람을 만나게 됩니다. 그 사람의 꼼꼼함이 업무 진행을 늦출 수 있습니다. 업무 스타일이 많이 다르면 쉽게 짜증을 느낄 수 있습니다. 남성이라면 오늘 업무에 매우 잘 집중할 수 있으며, 필요한 추가 지식이나 정보를 찾을 수 있습니다.\n\n휴일이라면, 단골 사진작가와 촬영 약속이 있을 수 있습니다."
        },
        "zh-CN": {
            quote: "有共同回忆的过去的人",
            interpretation: "你会遇到一个有能力、在专业领域有深厚知识的人。他的细致可能会让工作进展变慢。如果你们的工作风格差异很大，你可能容易感到烦躁。如果你是男性，今天你会特别专注于工作，能够查找所需的额外知识或资料。\n\n如果今天是休息日，可能意味着你和熟悉的摄影师有一场拍照的约。"
        },
        "zh-TW": {
            quote: "有共同回憶的過去的人",
            interpretation: "你會遇到一個有能力、在專業領域有深厚知識的人。他的細緻可能會讓工作進展變慢。如果你們的工作風格差異很大，你可能容易感到煩躁。如果你是男性，今天你會特別專注於工作，能夠查找所需的額外知識或資料。\n\n如果今天是休息日，可能意味著你和熟悉的攝影師有一場拍照的約。"
        },
        fr: { quote: "Quelqu'un du passé avec qui vous partagez des souvenirs", interpretation: "Vous rencontrerez quelqu'un de compétent, capable et profondément spécialisé dans un domaine précis. Sa minutie pourrait ralentir l'avancement du travail. Si vos styles de travail sont très différents, vous pourriez facilement vous sentir agacé(e). Si vous êtes un homme, vous pourrez vous concentrer exceptionnellement bien sur votre travail aujourd'hui et rechercher les connaissances ou informations supplémentaires dont vous avez besoin.\n\nOu si c'est un jour de congé, cela pourrait signifier que vous avez une séance photo prévue avec votre photographe habituel." }
    },
    "WHEEL OF FORTUNE": {
        en: {
            quote: "Someone who comes unexpectedly, everything is still uncertain",
            interpretation: "Plans you've made may suddenly need to change, or at the very least the meeting place will shift. The new location will be somewhere bustling with people constantly coming and going — like a shopping mall or a popular restaurant. If it's a workday, there may be a meeting about organizational or team restructuring. Or if you're feeling bored today, you might invite friends to go eat at a buffet, Korean BBQ, or shabu-shabu to change up the mood."
        },
        ja: {
            quote: "予期せず来る人、すべてはまだ不確定",
            interpretation: "立てていた予定が急に変更になったり、少なくとも待ち合わせ場所が変わるかもしれません。新しい場所は人が絶えず出入りするにぎやかな場所、ショッピングモールや人気レストランのようなところでしょう。仕事の日であれば、組織やチームの再編についての会議があるかもしれません。あるいは、今日退屈だなと感じたら、友達を誘ってビュッフェや焼肉、しゃぶしゃぶに行って気分転換するのもいいでしょう。"
        },
        ko: {
            quote: "예상치 못하게 오는 사람, 모든 것이 아직 불확실",
            interpretation: "세워둔 계획이 갑자기 변경되거나, 최소한 만남 장소가 바뀔 수 있습니다. 새로운 장소는 사람들이 끊임없이 드나드는 북적이는 곳 — 쇼핑몰이나 유명 식당 같은 곳이 될 것입니다. 근무일이라면 조직이나 팀 구조조정에 관한 회의가 있을 수 있습니다. 오늘 지루하다면, 친구들을 불러서 뷔페, 삼겹살 구이, 또는 샤부샤부를 먹으러 가서 분위기를 전환해 보세요."
        },
        "zh-CN": {
            quote: "意外出现的人，一切仍不确定",
            interpretation: "原定的计划可能会突然改变，或者至少见面地点会换。新地点会是一个人来人往很热闹的地方，比如商场或热门餐厅。如果是工作日，可能会有关于组织架构或团队调整的会议。如果今天觉得无聊，不妨约朋友去吃自助餐、烤肉或火锅，换换心情。"
        },
        "zh-TW": {
            quote: "意外出現的人，一切仍不確定",
            interpretation: "原定的計劃可能會突然改變，或者至少見面地點會換。新地點會是一個人來人往很熱鬧的地方，比如百貨公司或熱門餐廳。如果是工作日，可能會有關於組織架構或團隊調整的會議。如果今天覺得無聊，不妨約朋友去吃自助餐、烤肉或火鍋，換換心情。"
        },
        fr: { quote: "Quelqu'un qui arrive de façon inattendue, tout est encore instable", interpretation: "Les plans que vous aviez faits pourraient changer brusquement, ou au minimum le lieu de rendez-vous sera modifié. Le nouvel endroit sera un lieu animé avec un flux constant de gens — comme un centre commercial ou un restaurant populaire. Si c'est un jour de travail, il pourrait y avoir une réunion sur une restructuration de l'organisation ou de l'équipe. Ou si vous vous ennuyez aujourd'hui, vous pourriez inviter des amis à aller manger un buffet, un barbecue coréen ou un shabu-shabu pour changer d'ambiance." }
    },
    "JUSTICE": {
        en: {
            quote: "A time of decision-making and weighing options",
            interpretation: "You know very well what's right and what's wrong — whether at work or in relationships — but you may not be ready to speak up yet. At work, you're quietly fixing the structure and content before bringing it up with the decision-maker again. If there's a submission or meeting today, your work might not get approved and you may need to redo almost everything. In relationships, you're unhappy with the other person but choosing to stay silent instead of talking it out, creating a tense atmosphere. Or it could be the other person treating you the same way."
        },
        ja: {
            quote: "決断と選択肢を比較する時",
            interpretation: "仕事でも人間関係でも、何が正しくて何が間違っているかよくわかっています。でもまだ声に出す準備ができていないかもしれません。仕事では、決定権のある人にもう一度話す前に、こっそり構成や内容を修正しています。今日提出や会議があれば、あなたの仕事は承認されず、ほぼ全部やり直しになるかもしれません。人間関係では、相手に不満がありながらも話し合う代わりに沈黙を選んでいて、雰囲気がピリピリしています。あるいは、相手があなたに同じことをしているのかもしれません。"
        },
        ko: {
            quote: "결정과 선택을 저울질하는 시간",
            interpretation: "일이든 관계든 무엇이 옳고 무엇이 그른지 잘 알고 있지만, 아직 말할 준비가 되지 않았을 수 있습니다. 업무에서는 결정권자에게 다시 이야기하기 전에 조용히 구조와 내용을 수정하고 있습니다. 오늘 제출이나 회의가 있다면, 당신의 업무가 승인되지 않아 거의 전부를 다시 해야 할 수 있습니다. 관계에서는 상대방에게 불만이 있지만 대화 대신 침묵을 선택하여 분위기가 긴장되어 있습니다. 아니면 상대방이 당신에게 같은 방식으로 대하고 있을 수도 있습니다."
        },
        "zh-CN": {
            quote: "做决定和权衡的时期",
            interpretation: "无论是工作还是人际关系，你很清楚什么是对什么是错，但可能还没准备好说出来。工作上，你在默默修改结构和内容，等改好了再去找决策者沟通。如果今天有提交或开会，你的工作可能不会被批准，甚至需要推翻重来。感情方面，你对对方有不满，但选择沉默而不是沟通，导致气氛紧张。也可能是对方在用同样的方式对待你。"
        },
        "zh-TW": {
            quote: "做決定和權衡的時期",
            interpretation: "無論是工作還是人際關係，你很清楚什麼是對什麼是錯，但可能還沒準備好說出來。工作上，你在默默修改結構和內容，等改好了再去找決策者溝通。如果今天有提交或開會，你的工作可能不會被批准，甚至需要推翻重來。感情方面，你對對方有不滿，但選擇沉默而不是溝通，導致氣氛緊張。也可能是對方在用同樣的方式對待你。"
        },
        fr: { quote: "Période de décision et de réflexion", interpretation: "Vous savez très bien ce qui est juste et ce qui ne l'est pas — que ce soit au travail ou dans vos relations — mais vous n'êtes peut-être pas encore prêt(e) à en parler. Au travail, vous corrigez discrètement la structure et le contenu avant de les représenter au décideur. S'il y a une remise de travail ou une réunion aujourd'hui, votre projet pourrait ne pas être approuvé et vous devrez peut-être presque tout refaire. En ce qui concerne les relations, vous êtes mécontent(e) de l'autre personne mais choisissez de vous taire au lieu d'en discuter, ce qui crée une atmosphère tendue. Ou c'est peut-être l'autre personne qui vous traite de cette façon." }
    },
    "THE HANGED MAN": {
        en: {
            quote: "A period of waiting and obstacles",
            interpretation: "You don't feel like going to work because you're feeling hungover from last night. But if you haven't been drinking, you may simply be running low on motivation lately. This could stem from your own mental state or an unsupportive work environment. If it's a day off, you might decide to stay home and not leave the bedroom all day. If you do go out, a hospital or temple is likely where you'll end up."
        },
        ja: {
            quote: "待機と障害の時期",
            interpretation: "昨夜の二日酔いで仕事に行きたくない気分です。でもお酒を飲んでいなかったとしたら、最近仕事へのモチベーションが下がっているのかもしれません。これは自分自身の精神状態から来ている場合もあれば、職場環境が良くないことが原因の場合もあります。休日であれば、家で過ごすことを選び、一日中寝室から出ないかもしれません。もし外出するなら、病院かお寺に行くことになりそうです。"
        },
        ko: {
            quote: "기다림과 장애물의 시기",
            interpretation: "어젯밤 숙취 때문에 출근하기 싫은 기분입니다. 하지만 술을 마시지 않았다면, 최근 일에 대한 의욕이 떨어진 것일 수 있습니다. 이는 본인의 심리 상태에서 비롯될 수도 있고, 직장 환경이 좋지 않아서일 수도 있습니다. 휴일이라면 집에서 쉬기로 하고 하루 종일 침실에서 나오지 않을 수 있습니다. 외출한다면 병원이나 절에 가게 될 것입니다."
        },
        "zh-CN": {
            quote: "等待和障碍的时期",
            interpretation: "你因为昨晚宿醉而不想去上班。但如果你并没有喝酒，那可能是最近工作动力不足。这可能源于你自身的心理状态，也可能是工作环境不太理想。如果是休息日，你可能会决定待在家里，一整天都不出卧室。如果你出门的话，医院或寺庙大概是你会去的地方。"
        },
        "zh-TW": {
            quote: "等待和障礙的時期",
            interpretation: "你因為昨晚宿醉而不想去上班。但如果你並沒有喝酒，那可能是最近工作動力不足。這可能源於你自身的心理狀態，也可能是工作環境不太理想。如果是休息日，你可能會決定待在家裡，一整天都不出臥室。如果你出門的話，醫院或寺廟大概是你會去的地方。"
        },
        fr: { quote: "Période d'attente et de blocage", interpretation: "Vous n'avez pas envie d'aller travailler parce que vous vous sentez patraque depuis hier soir. Mais si vous n'avez pas bu, c'est peut-être simplement un manque de motivation au travail ces derniers temps. Cela peut venir de votre propre état d'esprit ou d'un environnement professionnel peu favorable. Si c'est un jour de repos, vous risquez de décider de rester chez vous sans quitter votre chambre de la journée. Si vous sortez, c'est probablement à l'hôpital ou au temple que vous vous rendrez." }
    },
    "DEATH": {
        en: {
            quote: "A period of endings and transformation",
            interpretation: "Your plans have been completely changed. This problem usually comes from other people rather than yourself. If there's a work meeting, your boss or a reviewer may criticize or request changes in areas you thought were unnecessary. Or it could mean that today you'll run into someone you didn't want to see, and have to do things you didn't want to do -- things that are not only against your will but also weigh heavily on your mind. Try to keep your emotions in check. Don't be impatient or say harsh things to anyone, because today arguments can break out easily."
        },
        ja: {
            quote: "終わりと変容の時期",
            interpretation: "立てていた計画がすべて変更になります。この問題は自分自身よりも外部の人から来ることが多いです。仕事の会議があれば、上司や検査担当者が、あなたが不要だと思っていた部分について指摘や修正を求めるかもしれません。あるいは、今日は会いたくない人に会ったり、やりたくないことをしなければならないかもしれません。それは気が進まないだけでなく、精神的にも圧迫されるものです。感情をコントロールするように心がけましょう。焦ったり誰かにきつい言葉を言わないように。今日は口論になりやすい日です。"
        },
        ko: {
            quote: "끝남과 변화의 시기",
            interpretation: "세워둔 계획이 완전히 바뀝니다. 이 문제는 대개 본인보다 외부 사람들로부터 옵니다. 업무 회의가 있다면 상사나 검토자가 불필요하다고 생각했던 부분에 대해 지적하거나 수정을 요청할 수 있습니다. 혹은 오늘 만나고 싶지 않은 사람을 만나거나, 하고 싶지 않은 일을 해야 할 수도 있습니다. 그것은 억지로 하는 것일 뿐만 아니라 마음까지 힘들게 합니다. 감정을 잘 다스리세요. 조급해하거나 누구에게 거친 말을 하지 마세요. 오늘은 말다툼이 쉽게 일어날 수 있는 날입니다."
        },
        "zh-CN": {
            quote: "结束和转变的时期",
            interpretation: "你制定的计划被全盘打乱了。这个问题通常来自外部的人而非你自己。如果有工作会议，上司或审查者可能会在你认为不必要的地方提出批评或要求修改。或者今天你可能会碰到不想见的人，不得不做不想做的事情——这些事不仅违背你的意愿，还会给你带来心理压力。尽量控制好情绪，不要急躁，也不要对任何人说重话，因为今天很容易与人发生口角。"
        },
        "zh-TW": {
            quote: "結束和轉變的時期",
            interpretation: "你制定的計畫被全盤打亂了。這個問題通常來自外部的人而非你自己。如果有工作會議，上司或審查者可能會在你認為不必要的地方提出批評或要求修改。或者今天你可能會碰到不想見的人，不得不做不想做的事情——這些事不僅違背你的意願，還會給你帶來心理壓力。盡量控制好情緒，不要急躁，也不要對任何人說重話，因為今天很容易與人發生口角。"
        },
        fr: { quote: "Période de fin et de transformation", interpretation: "Vos plans ont été complètement chamboulés. Ce problème vient généralement des autres plutôt que de vous-même. S'il y a une réunion de travail, votre supérieur ou un évaluateur pourrait critiquer ou demander des modifications sur des points que vous pensiez inutiles. Ou bien, aujourd'hui vous risquez de croiser quelqu'un que vous ne vouliez pas voir et de devoir faire des choses que vous ne vouliez pas faire -- des choses non seulement contrariantes mais aussi pesantes pour votre moral. Essayez de garder votre calme. Ne soyez pas impatient(e) et ne dites rien de blessant à qui que ce soit, car les disputes peuvent éclater facilement aujourd'hui." }
    },
    "TEMPERANCE": {
        en: {
            quote: "Many options, but can't decide yet",
            interpretation: "Today you may have to change work locations frequently -- going between floors or attending meetings at multiple places. You'll have several tasks to handle simultaneously, wrapping up old projects while preparing to launch new ones. If it's a day off, you might have appointments at several places in a single day, with multiple friend groups to meet. If schedules overlap, you might solve the problem by inviting both groups to meet up together, turning it into a fun get-together for everyone."
        },
        ja: {
            quote: "多くの選択肢があるが、まだ決められない",
            interpretation: "今日は作業場所を頻繁に変える必要があるかもしれません。フロア間を行き来したり、複数の場所で会議に参加したり。古いプロジェクトを締めくくりながら新しいプロジェクトの準備もするなど、同時に複数の仕事をこなすことになります。休日であれば、一日のうちに複数の場所で予定があり、何グループもの友人と会わなければならないかもしれません。予定が重なったら、両方のグループを一緒に会わせることで解決し、みんなで楽しく過ごせるかもしれません。"
        },
        ko: {
            quote: "많은 선택지가 있지만 아직 결정할 수 없어요",
            interpretation: "오늘은 작업 장소를 자주 바꿔야 할 수 있습니다. 층간을 오가거나 여러 곳에서 회의에 참석해야 합니다. 오래된 프로젝트를 마무리하면서 새 프로젝트를 준비하는 등 여러 업무를 동시에 처리해야 합니다. 휴일이라면 하루에 여러 곳에서 약속이 있고, 여러 친구 그룹을 만나야 할 수 있습니다. 약속이 겹치면 두 그룹을 함께 만나게 하는 방법으로 해결하여 모두가 즐겁게 어울릴 수 있습니다."
        },
        "zh-CN": {
            quote: "很多选择，但还不能决定",
            interpretation: "今天你可能需要频繁更换工作地点，比如在楼层间来回跑，或者去好几个地方开会。你会有好几件事要同时处理，一边收尾旧项目一边准备启动新项目。如果是休息日，你可能一天之内有好几个地方要赴约，有好几群朋友要见面。如果时间撞了，你可能会把两群朋友约到一起，让大家一起热闹地聚一聚。"
        },
        "zh-TW": {
            quote: "很多選擇，但還不能決定",
            interpretation: "今天你可能需要頻繁更換工作地點，比如在樓層間來回跑，或者去好幾個地方開會。你會有好幾件事要同時處理，一邊收尾舊專案一邊準備啟動新專案。如果是休息日，你可能一天之內有好幾個地方要赴約，有好幾群朋友要見面。如果時間撞了，你可能會把兩群朋友約到一起，讓大家一起熱鬧地聚一聚。"
        },
        fr: { quote: "Plusieurs options, mais pas encore capable de choisir", interpretation: "Aujourd'hui, vous devrez peut-être changer fréquemment de lieu de travail -- monter et descendre entre les étages ou assister à des réunions dans plusieurs endroits. Vous aurez plusieurs tâches à gérer en même temps : boucler d'anciens projets tout en préparant le lancement de nouveaux. Si c'est un jour de repos, vous pourriez avoir des rendez-vous dans plusieurs endroits en une seule journée, avec différents groupes d'amis à voir. Si les emplois du temps se chevauchent, vous pourriez résoudre le problème en réunissant les deux groupes ensemble, transformant le tout en une joyeuse rencontre pour tout le monde." }
    },
    "THE DEVIL": {
        en: {
            quote: "Intense passion, but beware of someone taken",
            interpretation: "Today you'll have to deal with someone who holds power over you -- perhaps a big boss or an important client. They'll be demanding and impose rules that make you uncomfortable, but ultimately you'll have to accept their terms because you have no other choice. In relationships, your partner might ask for some kind of commitment, but there are often hidden conditions attached. If you're single, watch out for someone who's already taken. But if you're in a couple, today the relationship will feel especially deep and intimate."
        },
        ja: {
            quote: "激しい情熱、でも既婚者に注意",
            interpretation: "今日はあなたより権力のある人と対処しなければなりません。大きなボスや重要なクライアントかもしれません。相手はわがままで、あなたを窮屈にさせるルールを課してきますが、他に選択肢がないため最終的にはその条件を受け入れざるを得ません。恋愛面では、パートナーが何かの約束を求めてくるかもしれませんが、隠された条件が付いていることが多いです。独身なら、すでにパートナーがいる人に気をつけてください。ただし、カップルの場合は、今日の関係は特に深く親密なものになるでしょう。"
        },
        ko: {
            quote: "강렬한 열정, 하지만 이미 있는 사람 조심",
            interpretation: "오늘은 당신보다 권력이 있는 사람을 상대해야 합니다. 큰 상사이거나 중요한 고객일 수 있습니다. 그 사람은 까다롭고 답답한 규칙을 부과하지만, 다른 선택지가 없기 때문에 결국 그 조건을 받아들여야 합니다. 연애 면에서는 연인이 어떤 약속을 요구할 수 있지만 숨겨진 조건이 있는 경우가 많습니다. 싱글이라면 이미 주인 있는 사람을 조심하세요. 하지만 커플이라면 오늘 관계가 특히 깊고 친밀해질 것입니다."
        },
        "zh-CN": {
            quote: "强烈的激情，但小心有主的人",
            interpretation: "今天你需要面对一个比你更有权势的人，可能是大老板或重要客户。对方会很强势，设下让你感到压迫的规矩，但最终你不得不接受他们的条件，因为没有其他选择。感情方面，恋人可能会要求某种承诺，但往往附带隐藏的条件。如果你是单身，小心遇到已经名花有主的人。但如果你有伴侣，今天的感情会格外深厚亲密。"
        },
        "zh-TW": {
            quote: "強烈的激情，但小心有主的人",
            interpretation: "今天你需要面對一個比你更有權勢的人，可能是大老闆或重要客戶。對方會很強勢，設下讓你感到壓迫的規矩，但最終你不得不接受他們的條件，因為沒有其他選擇。感情方面，戀人可能會要求某種承諾，但往往附帶隱藏的條件。如果你是單身，小心遇到已經名花有主的人。但如果你有伴侶，今天的感情會格外深厚親密。"
        },
        fr: { quote: "Une passion intense, mais attention aux personnes déjà prises", interpretation: "Aujourd'hui, vous devrez composer avec quelqu'un qui a plus de pouvoir que vous -- peut-être un grand patron ou un client important. Cette personne sera exigeante et imposera des règles qui vous mettront mal à l'aise, mais vous devrez finalement accepter ses conditions car vous n'aurez pas d'autre choix. Côté relations, votre partenaire pourrait vous demander une sorte d'engagement, mais il y a souvent des conditions cachées. Si vous êtes célibataire, méfiez-vous de quelqu'un qui est déjà pris(e). Mais si vous êtes en couple, la relation sera particulièrement profonde et intime aujourd'hui." }
    },
    "THE TOWER": {
        en: {
            quote: "A time for healing and rebuilding yourself",
            interpretation: "If your mind has felt foggy and you've been short on ideas for a while, try going for a run or exercising -- it might help you think of something. As for work that's been stuck for a long time, today you'll finally be able to close it out, even if the result isn't as perfect as you intended. If you're in the middle of a project, there may be a sudden order to stop or change the work plan. For those with appointments, watch out for emergencies that could lead to cancellations. Try to keep your emotions under control, because today it's easy to get into verbal clashes with people around you."
        },
        ja: {
            quote: "癒しと自分の再構築の時",
            interpretation: "頭がぼんやりしてアイデアが浮かばない状態が続いているなら、ランニングや運動に出かけてみてください。何か思いつくかもしれません。長い間滞っていた仕事については、今日ようやく片付けることができるでしょう。ただし、意図したほど完璧な仕上がりにはならないかもしれません。プロジェクトの途中であれば、突然中止や計画変更の指示が出る可能性があります。予定がある人は、緊急事態によるキャンセルに注意してください。感情のコントロールを心がけましょう。今日は周囲の人と口論になりやすい日です。"
        },
        ko: {
            quote: "치유하고 자신을 재건하는 시간",
            interpretation: "머리가 멍하고 한동안 아이디어가 떠오르지 않았다면, 달리기나 운동을 해보세요. 뭔가 생각이 날 수도 있습니다. 오래 밀려있던 업무는 오늘 드디어 마무리할 수 있을 것입니다. 비록 의도했던 것만큼 완벽하지는 않더라도요. 프로젝트 진행 중이라면 갑자기 중단하거나 계획을 변경하라는 지시가 내려올 수 있습니다. 약속이 있는 분은 긴급 상황으로 약속이 취소될 수 있으니 주의하세요. 감정을 잘 조절하세요. 오늘은 주변 사람들과 말다툼이 벌어지기 쉬운 날입니다."
        },
        "zh-CN": {
            quote: "治愈和重建自己的时期",
            interpretation: "如果你的脑子一直昏昏沉沉、好一阵子没有灵感了，试试出去跑步或运动，也许能帮你想出点什么。至于搁置已久的工作，今天你终于可以收尾了，尽管成果可能没有预期中那么完美。如果你正在做项目，可能会突然接到停工或更改计划的指令。有约的人要注意突发状况可能导致约会取消。尽量控制好情绪，因为今天很容易和身边的人发生口角。"
        },
        "zh-TW": {
            quote: "治癒和重建自己的時期",
            interpretation: "如果你的腦子一直昏昏沉沉、好一陣子沒有靈感了，試試出去跑步或運動，也許能幫你想出點什麼。至於擱置已久的工作，今天你終於可以收尾了，儘管成果可能沒有預期中那麼完美。如果你正在做專案，可能會突然接到停工或更改計畫的指令。有約的人要注意突發狀況可能導致約會取消。盡量控制好情緒，因為今天很容易和身邊的人發生口角。"
        },
        fr: { quote: "Période de guérison et de reconstruction", interpretation: "Si votre esprit est embrumé et que vous manquez d'idées depuis un moment, essayez d'aller courir ou de faire du sport -- cela pourrait vous aider à débloquer quelque chose. Quant au travail en suspens depuis longtemps, vous pourrez enfin le boucler aujourd'hui, même si le résultat n'est pas aussi parfait que vous l'espériez. Si vous êtes en plein projet, un ordre soudain d'arrêt ou de changement de plan pourrait tomber. Pour ceux qui ont des rendez-vous, attention aux urgences qui pourraient entraîner des annulations. Essayez de garder votre calme, car aujourd'hui les accrochages verbaux avec votre entourage sont faciles." }
    },
    "THE STAR": {
        en: {
            quote: "Someone good-looking and famous",
            interpretation: "An idea or piece of work you presented may not end up being used. If you're responsible for a particular task, you might have to hand it off to someone else, or your boss may have a colleague take it over -- even though you don't feel ready to let go. Today you may need to encourage yourself and let go of what has happened. Although it may feel disappointing, sometimes it could be an opportunity for you to start something new and even more interesting than before."
        },
        ja: {
            quote: "見た目が良くて有名な人",
            interpretation: "あなたが提案したアイデアや仕事が採用されないかもしれません。担当している業務があれば、他の人に引き継がなければならなかったり、上司が同僚にその仕事を引き取らせたりするかもしれません。まだ手放す準備ができていないと感じていても。今日は自分自身を励まし、起きたことを受け入れる必要があるかもしれません。失望を感じるかもしれませんが、時にはそれが以前よりもっと面白い新しいことを始めるチャンスになることもあります。"
        },
        ko: {
            quote: "잘생기고 유명한 사람",
            interpretation: "당신이 제안한 아이디어나 작업물이 채택되지 않을 수 있습니다. 맡고 있는 업무가 있다면 다른 사람에게 넘겨야 하거나, 상사가 동료에게 그 일을 맡길 수 있습니다. 아직 손을 놓을 준비가 안 됐다고 느끼더라도요. 오늘은 스스로를 격려하고 일어난 일을 받아들여야 할 수 있습니다. 실망스럽겠지만, 때로는 이것이 이전보다 더 흥미로운 새로운 일을 시작할 기회가 될 수 있습니다."
        },
        "zh-CN": {
            quote: "好看又有名的人",
            interpretation: "你提出的点子或交上去的工作可能不会被采用。如果你负责某项任务，可能需要交给别人来做，或者上司让同事把这件事接手了——尽管你还觉得自己没准备好放手。今天你可能需要给自己打打气，对已经发生的事情释怀。虽然会感到有些失望，但有时候这恰恰是一个机会，让你去开始做一些比之前更有意思的新事情。"
        },
        "zh-TW": {
            quote: "好看又有名的人",
            interpretation: "你提出的點子或交上去的工作可能不會被採用。如果你負責某項任務，可能需要交給別人來做，或者上司讓同事把這件事接手了——儘管你還覺得自己沒準備好放手。今天你可能需要給自己打打氣，對已經發生的事情釋懷。雖然會感到有些失望，但有時候這恰恰是一個機會，讓你去開始做一些比之前更有意思的新事情。"
        },
        fr: { quote: "Quelqu'un d'attirant et célèbre", interpretation: "Une idée ou un travail que vous avez présenté pourrait ne pas être retenu. Si vous êtes responsable d'une tâche particulière, vous devrez peut-être la confier à quelqu'un d'autre, ou votre supérieur pourrait charger un collègue de la reprendre -- même si vous ne vous sentez pas prêt(e) à lâcher prise. Aujourd'hui, vous aurez peut-être besoin de vous encourager et d'accepter ce qui s'est passé. Même si c'est décevant, parfois cela peut être l'occasion de commencer quelque chose de nouveau et d'encore plus intéressant qu'avant." }
    },
    "THE MOON": {
        en: {
            quote: "An unclear and confusing relationship",
            interpretation: "Travel may not go smoothly today. Your usual route might be under repair, forcing you to take a detour. Or you might find yourself caught in the middle of a conflict between two groups of people. If you receive two sets of information, they're likely to contradict each other, leaving you confused about who to believe. There may also be a disagreement with an important woman in your life -- such as your mother, a close female friend, or your boss. Stay calm and wait for emotions to cool down before talking things through."
        },
        ja: {
            quote: "不明確で混乱した関係",
            interpretation: "今日は移動がスムーズにいかないかもしれません。いつも使っている道が工事中で迂回しなければならないかもしれません。または、二つのグループの対立の間に挟まれてしまうかもしれません。二つの情報を受け取った場合、矛盾している可能性が高く、誰を信じるべきか迷うことになるでしょう。人生で重要な女性との意見の食い違いがあるかもしれません。お母さん、親しい女性の友人、または上司など。冷静に、感情が落ち着くのを待ってから話し合いましょう。"
        },
        ko: {
            quote: "불분명하고 혼란스러운 관계",
            interpretation: "오늘은 이동이 순탄하지 않을 수 있습니다. 평소 다니던 길이 공사 중이라 우회해야 할 수 있습니다. 혹은 두 그룹 간의 갈등 한가운데 끼게 될 수도 있습니다. 두 가지 정보를 받으면 서로 모순될 가능성이 높아 누구를 믿어야 할지 혼란스러울 것입니다. 인생에서 중요한 여성과 갈등이 생길 수도 있습니다. 어머니, 친한 여자 친구, 또는 상사 등. 침착하게 감정이 가라앉기를 기다린 후 이야기하세요."
        },
        "zh-CN": {
            quote: "不清楚和混乱的关系",
            interpretation: "今天出行可能不太顺利。你常走的路线可能在维修，需要绕道而行。或者你可能被卷入两群人之间的矛盾中。如果收到两份信息，很可能互相矛盾，让你不知道该相信谁。你也可能和生活中重要的女性发生分歧——比如妈妈、闺蜜或上司。保持冷静，等情绪平复后再沟通。"
        },
        "zh-TW": {
            quote: "不清楚和混亂的關係",
            interpretation: "今天出行可能不太順利。你常走的路線可能在維修，需要繞道而行。或者你可能被捲入兩群人之間的矛盾中。如果收到兩份資訊，很可能互相矛盾，讓你不知道該相信誰。你也可能和生活中重要的女性發生分歧——比如媽媽、閨蜜或上司。保持冷靜，等情緒平復後再溝通。"
        },
        fr: { quote: "Une relation floue et confuse", interpretation: "Les déplacements risquent de ne pas bien se passer aujourd'hui. Votre trajet habituel est peut-être en travaux, vous obligeant à faire un détour. Ou vous pourriez vous retrouver pris(e) entre deux groupes en conflit. Si vous recevez deux sources d'information, elles risquent de se contredire, vous laissant perplexe sur qui croire. Il pourrait aussi y avoir un désaccord avec une femme importante dans votre vie -- votre mère, une amie proche ou votre patronne. Restez calme et attendez que les émotions retombent avant de discuter." }
    },
    "THE SUN": {
        en: {
            quote: "A fresh and clear new beginning",
            interpretation: "Today you'll receive a clearer answer about something you've been hesitating on. The answer might be good or bad, but at least you'll know what to do next. If you have a secret you've been hiding, be careful not to accidentally reveal it -- such as sending a message to the wrong group chat, saying something you shouldn't in a meeting, or posting something unintentionally on social media. You may also have to travel somewhere unexpectedly on short notice, so keep a bag or essentials ready just in case."
        },
        ja: {
            quote: "新鮮で明確な新しい始まり",
            interpretation: "今日はずっと迷っていたことについて、より明確な答えが得られるでしょう。良い答えか悪い答えかはわかりませんが、少なくとも次に何をすべきかがわかります。隠している秘密がある場合、うっかりバレないように注意してください。間違ったグループチャットにメッセージを送ったり、会議で言ってはいけないことを言ったり、SNSにうっかり何かを投稿してしまったり。急に予定外の場所に出かけなければならなくなることもあるので、バッグや必需品を準備しておきましょう。"
        },
        ko: {
            quote: "신선하고 명확한 새로운 시작",
            interpretation: "오늘은 망설이던 일에 대해 더 명확한 답을 얻게 될 것입니다. 좋은 답일 수도, 나쁜 답일 수도 있지만 적어도 다음에 어떻게 해야 할지 알게 됩니다. 숨기고 있는 비밀이 있다면 실수로 드러나지 않도록 조심하세요. 잘못된 단체 채팅방에 메시지를 보내거나, 회의에서 말실수를 하거나, 소셜 미디어에 의도치 않게 무언가를 올리는 일이 생길 수 있습니다. 갑자기 어딘가로 출발해야 할 수도 있으니 가방이나 필수품을 미리 준비해 두세요."
        },
        "zh-CN": {
            quote: "清新明确的新开始",
            interpretation: "今天你会对一直犹豫不决的事情得到更明确的答案。答案可能是好的也可能是坏的，但至少你会知道接下来该怎么做。如果你有隐瞒的秘密，小心不要不小心泄露出去——比如把消息发错群、在会议上说漏嘴，或者在社交媒体上无意中发了什么。你也可能临时需要外出，所以提前准备好随身包或必需品以备不时之需。"
        },
        "zh-TW": {
            quote: "清新明確的新開始",
            interpretation: "今天你會對一直猶豫不決的事情得到更明確的答案。答案可能是好的也可能是壞的，但至少你會知道接下來該怎麼做。如果你有隱瞞的秘密，小心不要不小心洩露出去——比如把訊息發錯群、在會議上說漏嘴，或者在社群媒體上無意中發了什麼。你也可能臨時需要外出，所以提前準備好隨身包或必需品以備不時之需。"
        },
        fr: { quote: "Un nouveau départ lumineux et clair", interpretation: "Aujourd'hui, vous obtiendrez une réponse plus claire sur quelque chose qui vous faisait hésiter. La réponse peut être bonne ou mauvaise, mais au moins vous saurez quoi faire ensuite. Si vous avez un secret que vous cachez, faites attention à ne pas le révéler par accident -- comme envoyer un message dans le mauvais groupe, laisser échapper quelque chose en réunion, ou publier quelque chose involontairement sur les réseaux sociaux. Vous pourriez aussi devoir partir quelque part de manière imprévue et à la dernière minute, alors gardez un sac ou vos affaires essentielles prêts au cas où." }
    },
    "JUDGEMENT": {
        en: {
            quote: "A time for closure and new beginnings",
            interpretation: "Today you might have to wake up earlier than usual. Even if it's a day off, a phone ringing, a notification sound, or an alarm you forgot to turn off will disturb your sleep. Or someone might turn on the TV so loud that you can't sleep any longer. If it's a workday, there may be an important announcement or meeting, and the content will be about ending a certain activity or project. You might feel regretful that the work didn't receive enough support to continue, but there's nothing you can do to change it. Alternatively, you might attend a concert, watch a live music performance, or have to go to the hospital for a health checkup."
        },
        ja: {
            quote: "終結と新しい始まりの時",
            interpretation: "今日はいつもより早く起きなければならないかもしれません。休日でも、電話の着信音、通知音、消し忘れた目覚まし時計があなたの眠りを妨げるでしょう。または誰かがテレビの音量を大きくして、もう眠れなくなるかもしれません。仕事の日であれば、重要な発表や会議があり、その内容はある活動やプロジェクトの終了についてでしょう。その仕事が継続の支援を受けられなかったことを残念に思うかもしれませんが、変えることはできません。あるいは、コンサートに行ったり、ライブ演奏を観たり、病院で健康診断を受けたりすることになるかもしれません。"
        },
        ko: {
            quote: "마무리와 새로운 시작의 시간",
            interpretation: "오늘은 평소보다 일찍 일어나야 할 수 있습니다. 휴일이라도 전화벨, 알림 소리, 끄지 않은 알람이 수면을 방해할 것입니다. 누군가 TV를 크게 틀어서 더 이상 잠을 잘 수 없을 수도 있습니다. 근무일이라면 중요한 공지나 회의가 있을 수 있고, 내용은 특정 활동이나 프로젝트의 종료에 관한 것일 것입니다. 그 업무가 계속할 지원을 받지 못한 것이 아쉬울 수 있지만 바꿀 수 있는 것은 없습니다. 또는 콘서트에 가거나, 라이브 음악 공연을 보거나, 건강 검진을 위해 병원에 가야 할 수도 있습니다."
        },
        "zh-CN": {
            quote: "结束和新开始的时期",
            interpretation: "今天你可能要比平时起得更早。即使是休息日，电话铃声、提示音或忘记关掉的闹钟也会打扰你的睡眠。或者有人把电视开得很大声，让你再也睡不着。如果是工作日，可能有重要的公告或会议，内容是关于终止某项活动或项目。你可能会觉得遗憾，这项工作没能得到继续推进的支持，但你无力改变什么。或者你可能会去看演唱会、观看现场音乐演出，或者去医院做健康检查。"
        },
        "zh-TW": {
            quote: "結束和新開始的時期",
            interpretation: "今天你可能要比平時起得更早。即使是休息日，電話鈴聲、提示音或忘記關掉的鬧鐘也會打擾你的睡眠。或者有人把電視開得很大聲，讓你再也睡不著。如果是工作日，可能有重要的公告或會議，內容是關於終止某項活動或專案。你可能會覺得遺憾，這項工作沒能得到繼續推進的支持，但你無力改變什麼。或者你可能會去看演唱會、觀看現場音樂演出，或者去醫院做健康檢查。"
        },
        fr: { quote: "Temps de clôture et de nouveau départ", interpretation: "Aujourd'hui, vous devrez peut-être vous lever plus tôt que d'habitude. Même si c'est un jour de repos, une sonnerie de téléphone, un son de notification ou un réveil oublié viendra perturber votre sommeil. Ou quelqu'un pourrait mettre la télé si fort que vous ne pourrez plus dormir. Si c'est un jour de travail, il y aura peut-être une annonce ou une réunion importante dont le sujet sera l'arrêt d'une activité ou d'un projet. Vous pourriez regretter que ce travail n'ait pas reçu assez de soutien pour continuer, mais vous n'y pouvez rien. Sinon, vous pourriez assister à un concert, voir un spectacle musical, ou devoir aller à l'hôpital pour un bilan de santé." }
    },
    "THE WORLD": {
        en: {
            quote: "Complete in yourself, not seeking attachment",
            interpretation: "Even though you're trying to distance yourself and keep away from people, today everyone will reach out to you -- through your inbox, email, or chat. You'll be busy coordinating between organizations and people. Whenever there's a problem, everyone thinks of you first. Even though you'd rather not get involved, your responsibilities make it unavoidable. Today might also be a day when an ex, a former partner, or someone you used to talk to reaches out. If you're in business, today is a good day to message old clients. For creative workers, try recycling old ideas you once had -- they might work well now."
        },
        ja: {
            quote: "自分自身で完璧、執着を求めない",
            interpretation: "距離を置いて人から離れようとしても、今日はみんなから連絡が来ます。受信箱、メール、チャットから。組織間や人々の間の調整で忙しくなるでしょう。問題があれば、誰もがまずあなたのことを思い浮かべます。あまり関わりたくなくても、役割上避けることはできません。今日は元カレ・元カノ、昔の恋人、かつてやり取りしていた人が連絡してくる日かもしれません。商売をしている人は、今日は昔のお客さんにメッセージを送るのに良い日です。クリエイティブな仕事をしている人は、かつて考えた古いアイデアをリサイクルしてみてください。今ならうまくいくかもしれません。"
        },
        ko: {
            quote: "스스로 완벽하고 집착을 구하지 않음",
            interpretation: "거리를 두고 사람들로부터 떨어지려 해도 오늘은 모두가 연락해 올 것입니다. 메시지함, 이메일, 채팅을 통해서요. 조직과 사람들 사이에서 조율하느라 바쁠 것입니다. 문제가 생기면 모두가 당신을 가장 먼저 떠올립니다. 관여하고 싶지 않더라도 맡은 역할 때문에 피할 수 없습니다. 오늘은 전 애인, 옛 연인, 예전에 대화하던 사람이 연락해 오는 날일 수도 있습니다. 사업을 하고 있다면 오늘은 예전 고객에게 메시지를 보내기 좋은 날입니다. 크리에이티브 업종이라면 예전에 생각해 둔 아이디어를 재활용해 보세요. 지금이라면 잘 될 수 있습니다."
        },
        "zh-CN": {
            quote: "自己就很完整，不寻求依恋",
            interpretation: "尽管你想抽身保持距离，但今天所有人都会来找你——通过私信、邮件或聊天。你会忙于在组织和人群之间协调沟通。一有问题，大家第一个想到的就是你。即使你不太想掺和，职责所在也避不开。今天也可能是前任、旧情人或以前聊过的人来联系你的日子。如果你做生意，今天适合给老客户发消息。做创意工作的人，可以把以前想过的旧点子翻出来重新利用，说不定现在正好能派上用场。"
        },
        "zh-TW": {
            quote: "自己就很完整，不尋求依戀",
            interpretation: "儘管你想抽身保持距離，但今天所有人都會來找你——通過私訊、郵件或聊天。你會忙於在組織和人群之間協調溝通。一有問題，大家第一個想到的就是你。即使你不太想摻和，職責所在也避不開。今天也可能是前任、舊情人或以前聊過的人來聯繫你的日子。如果你做生意，今天適合給老客戶發訊息。做創意工作的人，可以把以前想過的舊點子翻出來重新利用，說不定現在正好能派上用場。"
        },
        fr: { quote: "Complet(e) en soi, pas besoin d'attachement", interpretation: "Même si vous essayez de prendre vos distances et de vous éloigner des gens, aujourd'hui tout le monde viendra vers vous -- par messagerie, e-mail ou chat. Vous serez occupé(e) à coordonner entre organisations et personnes. Dès qu'il y a un problème, tout le monde pense à vous en premier. Même si vous préféreriez ne pas vous en mêler, vos responsabilités rendent cela inévitable. Aujourd'hui pourrait aussi être le jour où un(e) ex, un ancien partenaire ou quelqu'un avec qui vous échangiez autrefois reprend contact. Si vous êtes dans le commerce, c'est un bon jour pour envoyer un message à d'anciens clients. Pour les créatifs, essayez de recycler d'anciennes idées que vous aviez eues -- elles pourraient bien fonctionner maintenant." }
    },
    "ACE OF WANDS": {
        en: {
            quote: "An enthusiastic person who's clear about their intentions",
            interpretation: "Today someone will come along and guide you on how to approach your work, and their advice will help you see the direction and goals of the project more clearly. You may also be assigned new responsibilities that come with tools or equipment to make your work easier. On the relationship front, you might meet someone interesting today. There may be a line or message that makes you feel like you're being flirted with. If you like them, don't forget to send a signal back. Or it could be you who's sent a flirty message to someone and is waiting for a reply."
        },
        ja: {
            quote: "意図が明確な熱心な人",
            interpretation: "今日は仕事のやり方についてアドバイスしてくれる人が現れるでしょう。その人の助言のおかげで、プロジェクトの方向性や目標がより明確に見えてきます。また、仕事を効率化するツールや機材とともに、新しい役割を任されるかもしれません。人間関係については、今日は気になる人に出会えるかもしれません。思わせぶりな言葉やメッセージを受け取って、アプローチされていると感じることがありそうです。もしその人が気に入ったなら、反応を返すのを忘れずに。あるいは、あなた自身が誰かにアプローチのメッセージを送って、返事を待っている状況かもしれません。"
        },
        ko: {
            quote: "의도가 분명한 열정적인 사람",
            interpretation: "오늘은 누군가 일하는 방법에 대해 조언해줄 것입니다. 그 조언 덕분에 프로젝트의 방향과 목표가 더 명확해질 것입니다. 또한 업무를 더 편리하게 해줄 장비와 함께 새로운 임무를 맡게 될 수도 있습니다. 인간관계 면에서는 오늘 흥미로운 사람을 만날 수 있습니다. 누군가에게 호감을 받고 있다고 느끼게 하는 말이나 메시지가 있을 수 있습니다. 그 사람이 마음에 든다면 신호를 보내는 것을 잊지 마세요. 혹은 당신이 누군가에게 관심을 표현하는 메시지를 보내고 답장을 기다리고 있는 상황일 수도 있습니다."
        },
        "zh-CN": {
            quote: "意图明确的热情的人",
            interpretation: "今天会有人来指导你的工作方法，他的建议会让你更清楚地看到项目的方向和目标。你也可能被分配新的职责，并获得让工作更便利的工具或设备。在人际关系方面，今天你可能会遇到一个有趣的人。可能会有某句话或某条消息让你觉得有人在向你示好。如果你喜欢对方，别忘了回应一下。又或者是你自己发了暧昧的消息给某人，正在等待对方的回复。"
        },
        "zh-TW": {
            quote: "意圖明確的熱情的人",
            interpretation: "今天會有人來指導你的工作方法，他的建議會讓你更清楚地看到專案的方向和目標。你也可能被分配新的職責，並獲得讓工作更便利的工具或設備。在人際關係方面，今天你可能會遇到一個有趣的人。可能會有某句話或某條訊息讓你覺得有人在向你示好。如果你喜歡對方，別忘了回應一下。又或者是你自己發了曖昧的訊息給某人，正在等待對方的回覆。"
        },
        fr: { quote: "Un nouveau début passionné et excitant", interpretation: "Aujourd'hui, quelqu'un viendra vous guider dans votre façon de travailler, et ses conseils vous aideront à mieux comprendre la direction et les objectifs du projet. Vous pourriez aussi recevoir de nouvelles responsabilités accompagnées d'outils facilitant votre travail. Côté relations, vous pourriez rencontrer quelqu'un d'intéressant aujourd'hui. Il y aura peut-être une phrase ou un message qui vous donnera l'impression qu'on vous drague. Si cette personne vous plaît, n'oubliez pas de lui envoyer un signal en retour. Ou peut-être est-ce vous qui avez envoyé un message de séduction à quelqu'un et attendez une réponse." }
    },
    "TWO OF WANDS": {
        en: {
            quote: "Still hesitant, hasn't moved on from the past",
            interpretation: "You have something on your mind that's been worrying you, and today you've picked it up to reconsider. Part of you wants to move forward, but something is holding you back, leaving everything unfinished. If it's about work, you feel more drawn to a new project idea than the one you're currently working on. Or you might go back to revisiting the original purpose of the project from the very beginning, but you keep going back and forth without actually getting anything done. Regarding relationships, you might be rereading old chat messages, checking your phone and sighing while waiting for a reply. If you have plans to meet someone, there's a good chance the other person will agree but end up not showing."
        },
        ja: {
            quote: "まだ迷っている、過去を乗り越えていない",
            interpretation: "気がかりなことがあり、今日はそれを改めて見直そうとしています。前に進みたい気持ちはあるのに、何かが足を引っ張って、どれも中途半端になりがちです。仕事に関しては、今取り組んでいるものより新しいプロジェクトのアイデアに心が惹かれています。あるいは、最初からプロジェクトの目的を振り返ろうとしているものの、考え直すばかりで実際に手をつけられない状態です。人間関係については、昔のチャットを読み返したり、スマホを見てため息をつきながら返事を待っているかもしれません。誰かと会う約束がある場合、相手は承諾するものの、最終的には来ない可能性があります。"
        },
        ko: {
            quote: "아직 망설이고 있고 과거를 극복하지 못함",
            interpretation: "마음에 걸리는 일이 있어서 오늘 다시 꺼내어 되짚어보고 있습니다. 한편으로는 앞으로 나아가고 싶지만 무언가가 발목을 잡아서 뭘 해도 끝까지 마무리하지 못하고 있습니다. 업무에 관해서는, 현재 하고 있는 일보다 새로운 프로젝트 아이디어에 더 마음이 끌립니다. 혹은 처음부터 프로젝트의 목적을 다시 검토하려 하지만 계속 왔다 갔다만 하고 실행에 옮기지 못하고 있습니다. 인간관계에서는 옛날 채팅을 다시 읽거나, 핸드폰을 확인하며 한숨을 쉬면서 답장을 기다리고 있을 수 있습니다. 누군가와 만날 약속이 있다면, 상대가 약속은 하지만 결국 나오지 않을 가능성이 높습니다."
        },
        "zh-CN": {
            quote: "还在犹豫，还没从过去走出来",
            interpretation: "你心里有件事一直放不下，今天你把它拿出来重新审视。一方面想往前走，但总有什么拉住你，导致什么事都做不彻底。如果是工作方面，你觉得新项目的想法比手头正在做的更有吸引力。或者你可能在从头回顾项目最初的目标，但反反复复想了又想，就是迟迟没动手。感情方面，你可能在翻看旧聊天记录，盯着手机叹气等回复。如果你跟谁有约，对方很可能会答应，但最后却不来赴约。"
        },
        "zh-TW": {
            quote: "還在猶豫，還沒從過去走出來",
            interpretation: "你心裡有件事一直放不下，今天你把它拿出來重新審視。一方面想往前走，但總有什麼拉住你，導致什麼事都做不徹底。如果是工作方面，你覺得新專案的想法比手頭正在做的更有吸引力。或者你可能在從頭回顧專案最初的目標，但反反覆覆想了又想，就是遲遲沒動手。感情方面，你可能在翻看舊聊天紀錄，盯著手機嘆氣等回覆。如果你跟誰有約，對方很可能會答應，但最後卻不來赴約。"
        },
        fr: { quote: "Planifier l'avenir de la relation", interpretation: "Vous avez un sujet qui vous préoccupe et aujourd'hui vous l'avez ressorti pour le réexaminer. D'un côté vous voulez avancer, mais quelque chose vous retient, si bien que rien n'aboutit vraiment. Côté travail, l'idée d'un nouveau projet vous attire davantage que celui sur lequel vous travaillez actuellement. Ou vous revenez sans cesse sur les objectifs initiaux du projet sans jamais passer à l'action. Côté relations, vous relisez peut-être d'anciens messages, consultez votre téléphone en soupirant dans l'attente d'une réponse. Si vous avez rendez-vous avec quelqu'un, il y a de fortes chances que l'autre accepte mais ne vienne finalement pas." }
    },
    "THREE OF WANDS": {
        en: {
            quote: "Ready to start anew, waiting for opportunities",
            interpretation: "Today you'll step out of your comfort zone and experience something new. It could be working off-site or meeting new people. Talking with strangers may lead to interesting opportunities. For those wrapping up a project, today you'll finally be able to close it out. The result may not be perfect, but it's good enough. This is a great day for starting something new or planning a trip."
        },
        ja: {
            quote: "新しく始める準備ができて、機会を待っている",
            interpretation: "今日はコンフォートゾーンを抜け出して、新しい経験をすることになるでしょう。外での仕事や、新しい人々との出会いがあるかもしれません。見知らぬ人との会話が、思わぬチャンスにつながることも。プロジェクトを締めくくろうとしている人は、今日ようやく完了させることができそうです。完璧な結果ではないかもしれませんが、十分うまくいくでしょう。新しいことを始めたり、旅行の計画を立てるのにぴったりの一日です。"
        },
        ko: {
            quote: "새로 시작할 준비가 되어 기회를 기다림",
            interpretation: "오늘은 안전지대를 벗어나 새로운 경험을 하게 될 것입니다. 외부에서 일하거나 새로운 사람들을 만나게 될 수 있습니다. 낯선 사람과의 대화가 흥미로운 기회로 이어질 수 있습니다. 프로젝트를 마무리 중인 분들은 오늘 드디어 끝낼 수 있을 것입니다. 결과가 완벽하지는 않겠지만 충분히 잘 마무리될 것입니다. 새로운 것을 시작하거나 여행을 계획하기에 좋은 날입니다."
        },
        "zh-CN": {
            quote: "准备重新开始，等待机会",
            interpretation: "今天你将走出舒适区，体验新事物。可能是外出工作，也可能是认识新朋友。与陌生人交谈可能会带来有趣的机会。对于正在收尾项目的人来说，今天终于可以把它结束了。结果虽然不完美，但也算顺利过关。这是一个适合开始新事物或规划旅行的好日子。"
        },
        "zh-TW": {
            quote: "準備重新開始，等待機會",
            interpretation: "今天你將走出舒適圈，體驗新事物。可能是外出工作，也可能是認識新朋友。與陌生人交談可能會帶來有趣的機會。對於正在收尾專案的人來說，今天終於可以把它結束了。結果雖然不完美，但也算順利過關。這是一個適合開始新事物或規劃旅行的好日子。"
        },
        fr: { quote: "Attendre que quelqu'un revienne ou arrive de loin", interpretation: "Aujourd'hui, vous allez sortir de votre zone de confort et vivre de nouvelles expériences. Cela peut être un travail hors site ou des rencontres avec de nouvelles personnes. Discuter avec des inconnus pourrait mener à des opportunités intéressantes. Pour ceux qui bouclent un projet, vous pourrez enfin le terminer aujourd'hui. Le résultat ne sera peut-être pas parfait, mais il sera satisfaisant. C'est une excellente journée pour démarrer quelque chose de nouveau ou planifier un voyage." }
    },
    "FOUR OF WANDS": {
        en: {
            quote: "Love from someone close by",
            interpretation: "You'll be assigned a new task that requires working with a colleague whose work style differs from yours. You might be the one who joined later and has less bargaining power. But if you need to present work together, the results are likely to turn out well. If it's a day off, someone might visit your home, or you might visit someone else's place, or go out to eat together. The atmosphere will be warm and relaxed."
        },
        ja: {
            quote: "身近な人からの愛",
            interpretation: "自分とは仕事のスタイルが異なる同僚と一緒に取り組む新しい仕事を任されるでしょう。あなたは後から参加した立場で、交渉力が弱いかもしれません。しかし一緒にプレゼンをすることになれば、良い結果が出そうです。休日であれば、誰かが家に遊びに来たり、あなたが他の人の家を訪ねたり、一緒に外食したりするかもしれません。雰囲気は温かくてリラックスしたものになるでしょう。"
        },
        ko: {
            quote: "가까운 사람의 사랑",
            interpretation: "당신과 업무 스타일이 다른 동료와 함께 해야 하는 새로운 업무를 맡게 될 것입니다. 나중에 합류한 사람으로서 협상력이 적을 수 있습니다. 하지만 함께 프레젠테이션을 해야 한다면 결과는 좋게 나올 가능성이 높습니다. 휴일이라면 누군가 집에 방문하거나, 다른 사람의 집에 놀러 가거나, 함께 외식을 할 수 있습니다. 분위기는 따뜻하고 편안할 것입니다."
        },
        "zh-CN": {
            quote: "来自身边人的爱",
            interpretation: "你会被分配一项需要与工作风格不同的同事合作的新任务。你可能是后来加入、话语权较少的那个人。但如果需要一起做汇报，结果很可能会不错。如果是休息日，可能会有人来你家做客，或者你去别人家串门，又或者一起出去吃饭。氛围会很温馨轻松。"
        },
        "zh-TW": {
            quote: "來自身邊人的愛",
            interpretation: "你會被分配一項需要與工作風格不同的同事合作的新任務。你可能是後來加入、話語權較少的那個人。但如果需要一起做簡報，結果很可能會不錯。如果是休息日，可能會有人來你家做客，或者你去別人家串門，又或者一起出去吃飯。氛圍會很溫馨輕鬆。"
        },
        fr: { quote: "Célébration et stabilité dans la relation", interpretation: "On vous confiera une nouvelle tâche nécessitant de travailler avec un collègue dont le style de travail diffère du vôtre. Vous êtes peut-être celui ou celle qui est arrivé(e) en dernier avec moins de pouvoir de négociation. Mais si vous devez présenter ensemble, les résultats seront probablement bons. Si c'est un jour de repos, quelqu'un pourrait passer chez vous, ou vous pourriez aller chez quelqu'un d'autre, ou sortir manger ensemble. L'ambiance sera chaleureuse et détendue." }
    },
    "FIVE OF WANDS": {
        en: {
            quote: "Someone in your team or friend group",
            interpretation: "Today you'll encounter many people, both strangers and acquaintances. Everyone is enthusiastic about their work, but you may all be heading in different directions and not quite on the same page.\n\nYou and your team may need to realign your understanding and piece together work from various parts, or you may need to compile files from multiple people into one. If it's a day off, you might take a short course and exchange ideas with new people, or go out with a large group of friends."
        },
        ja: {
            quote: "チームや友達グループの誰か",
            interpretation: "今日は見知らぬ人も知り合いも含め、多くの人に会うことになるでしょう。みんな仕事に対して意欲的ですが、それぞれの方向がバラバラで、なかなかまとまらないかもしれません。\n\nチームで認識を合わせ直し、各所からの作業を組み合わせる必要があるかもしれません。あるいは、複数の人からのファイルを一つにまとめる作業が発生するかもしれません。休日であれば、短期講座に参加して新しい人と意見交換をしたり、大人数の友人グループで出かけたりすることがありそうです。"
        },
        ko: {
            quote: "팀이나 친구 그룹의 누군가",
            interpretation: "오늘은 낯선 사람과 아는 사람을 포함해 많은 사람들을 만나게 될 것입니다. 모두 일에 대한 열정은 있지만, 각자 다른 방향을 향하고 있어 하나로 합치기 어려울 수 있습니다.\n\n팀과 함께 이해를 재조정하고 여러 부분의 작업을 조합해야 할 수 있습니다. 또는 여러 사람의 파일을 하나로 통합해야 할 수도 있습니다. 휴일이라면 짧은 강좌를 듣고 새로운 사람들과 의견을 교환하거나, 큰 친구 그룹과 함께 나갈 수 있습니다."
        },
        "zh-CN": {
            quote: "团队或朋友圈里的人",
            interpretation: "今天你会遇到很多人，包括陌生人和熟人。大家都对工作充满热情，但可能各走各的方向，无法统一步调。\n\n你和团队可能需要重新对齐认知，把各方的工作拼凑到一起，或者需要把多个人的文件合并成一个。如果是休息日，你可能去上个短期课程，和新朋友交流想法，或者和一大群朋友一起出去玩。"
        },
        "zh-TW": {
            quote: "團隊或朋友圈裡的人",
            interpretation: "今天你會遇到很多人，包括陌生人和熟人。大家都對工作充滿熱情，但可能各走各的方向，無法統一步調。\n\n你和團隊可能需要重新對齊認知，把各方的工作拼湊到一起，或者需要把多個人的檔案合併成一個。如果是休息日，你可能去上個短期課程，和新朋友交流想法，或者和一大群朋友一起出去玩。"
        },
        fr: { quote: "Compétition et conflits en amour", interpretation: "Aujourd'hui vous rencontrerez beaucoup de monde, tant des inconnus que des connaissances. Tout le monde est enthousiaste au travail, mais chacun risque de partir dans une direction différente sans être sur la même longueur d'onde.\n\nVotre équipe et vous devrez peut-être réaligner vos visions et assembler le travail de chaque partie, ou compiler les fichiers de plusieurs personnes en un seul. Si c'est un jour de repos, vous pourriez suivre un cours court et échanger des idées avec de nouvelles personnes, ou sortir avec un grand groupe d'amis." }
    },
    "SIX OF WANDS": {
        en: {
            quote: "An ex returning or someone successful",
            interpretation: "You'll get to reconnect with old friends, familiar faces, or visit family. If it's a work day, things will move forward. You'll meet talented people or experienced professionals in the field, perhaps for a meeting or as someone who joins your team or offers advice. If you have a presentation, you'll receive praise from your boss or clients. For K-pop fans or fandom enthusiasts, your favorite artist might announce a comeback or win an award to make your day."
        },
        ja: {
            quote: "戻ってくる元カレ・元カノか成功した人",
            interpretation: "今日は旧友や懐かしい顔ぶれに再会したり、家族のもとを訪ねたりすることになるでしょう。仕事の日であれば、物事が前に進みます。その分野で才能のある人や経験豊富なプロに出会うでしょう。打ち合わせの場であったり、チームに加わったり、アドバイスをくれたりする人かもしれません。プレゼンがあれば、上司やクライアントから褒められるでしょう。推し活をしている方は、お気に入りのアーティストがカムバックを発表したり、賞を受賞したりして嬉しいニュースがあるかもしれません。"
        },
        ko: {
            quote: "돌아오는 전 애인 또는 성공한 사람",
            interpretation: "오래된 친구, 익숙한 얼굴들과 다시 만나거나 가족을 방문하게 될 것입니다. 근무일이라면 일이 앞으로 나아갈 것입니다. 업계의 실력 있는 사람이나 경험 많은 전문가를 만나게 되는데, 미팅이거나 팀에 합류하거나 조언을 해주는 분일 수 있습니다. 발표가 있다면 상사나 고객으로부터 칭찬을 받을 것입니다. 덕질하는 분들은 좋아하는 아티스트의 컴백 소식이나 수상 소식이 있어 기분 좋은 하루가 될 수 있습니다."
        },
        "zh-CN": {
            quote: "回来的前任或成功的人",
            interpretation: "你会与老朋友、熟悉的面孔重聚，或回家探望家人。如果是工作日，事情会有进展。你会遇到业内有才华或经验丰富的专业人士，可能是来开会、加入团队或提供建议的。如果你有汇报，会得到老板或客户的夸奖。追星的朋友们，你喜欢的艺人可能会宣布回归或获奖，让你开心不已。"
        },
        "zh-TW": {
            quote: "回來的前任或成功的人",
            interpretation: "你會與老朋友、熟悉的面孔重聚，或回家探望家人。如果是工作日，事情會有進展。你會遇到業內有才華或經驗豐富的專業人士，可能是來開會、加入團隊或提供建議的。如果你有簡報，會得到老闆或客戶的誇獎。追星的朋友們，你喜歡的藝人可能會宣布回歸或獲獎，讓你開心不已。"
        },
        fr: { quote: "Victoire et reconnaissance en amour", interpretation: "Vous retrouverez de vieux amis, des visages familiers, ou vous rendrez visite à votre famille. Si c'est un jour de travail, les choses avanceront. Vous rencontrerez des personnes talentueuses ou des professionnels expérimentés du domaine, peut-être lors d'une réunion, ou quelqu'un qui rejoint votre équipe ou vous donne des conseils. Si vous avez une présentation, vous recevrez des éloges de votre patron ou de vos clients. Pour les fans, votre artiste préféré pourrait annoncer un comeback ou recevoir un prix pour vous réjouir." }
    },
    "SEVEN OF WANDS": {
        en: {
            quote: "Must compete with rivals",
            interpretation: "Today is a day when you'll need to express your beliefs and stand your ground. It could be pitching an idea to colleagues and having to answer questions about the feasibility, pros, and cons of what you're presenting. If you're a student, you may need to present in front of the class, do an oral exam, or have a job interview. Or it could mean you'll attend a concert, event, or live stage performance."
        },
        ja: {
            quote: "ライバルと競争しなければならない",
            interpretation: "今日は自分の信念と立場を示す必要がある日です。同僚にアイデアを提案し、その実現可能性やメリット・デメリットについての質問に答えなければならないかもしれません。学生であれば、教室の前でプレゼン、口頭試験、面接が必要になるかもしれません。あるいは、コンサート、イベント、ステージパフォーマンスを観に行くことを意味している可能性もあります。"
        },
        ko: {
            quote: "경쟁자와 경쟁해야 함",
            interpretation: "오늘은 자신의 신념과 입장을 표현해야 하는 날입니다. 동료에게 아이디어를 제안하고 발표 내용의 실현 가능성, 장단점에 대한 질문에 답해야 할 수 있습니다. 학생이라면 교실 앞에서 발표하거나, 구술시험을 보거나, 면접을 볼 수도 있습니다. 혹은 콘서트, 이벤트, 또는 무대 공연을 관람하러 갈 수도 있습니다."
        },
        "zh-CN": {
            quote: "必须与竞争对手竞争",
            interpretation: "今天是你需要表达自己信念和立场的一天。可能是向同事提出想法，然后回答关于可行性、优缺点的问题。如果你是学生，今天可能需要上台做报告、进行口试或参加面试。又或者意味着你会去看演唱会、活动或现场舞台表演。"
        },
        "zh-TW": {
            quote: "必須與競爭對手競爭",
            interpretation: "今天是你需要表達自己信念和立場的一天。可能是向同事提出想法，然後回答關於可行性、優缺點的問題。如果你是學生，今天可能需要上台做報告、進行口試或參加面試。又或者意味著你會去看演唱會、活動或現場舞台表演。"
        },
        fr: { quote: "Défendre votre relation ou votre position", interpretation: "Aujourd'hui, vous devrez exprimer vos convictions et défendre votre position. Cela pourrait être en présentant une idée à vos collègues et en répondant aux questions sur la faisabilité, les avantages et les inconvénients de votre proposition. Si vous êtes étudiant(e), vous pourriez devoir faire une présentation devant la classe, passer un examen oral ou un entretien d'embauche. Ou cela pourrait signifier que vous irez à un concert, un événement ou une représentation sur scène." }
    },
    "EIGHT OF WANDS": {
        en: {
            quote: "Love from travel or dating apps",
            interpretation: "You'll have reason to leave the house or head out from the office during the day. You might want to have a backup transportation plan because things may not go as expected. If you already have errands to run, extra stops might come up along the way. Or today could be a day when you receive a flood of messages or emails. If you run a business or work in social media, get ready to handle customer inquiries after broadcasting a message — people will flood in faster than you can reply. Regarding relationships, if things are going well, your partner or the person you're talking to might be busy today. Communication will be more like leaving messages for each other. For those in rocky relationships, beware of one-sided conversations where it feels like you're the only one making an effort."
        },
        ja: {
            quote: "旅行やマッチングアプリからの恋",
            interpretation: "日中に外出したり、職場から出かけたりする用事ができるでしょう。予定通りにいかないこともあるので、移動手段のバックアッププランを用意しておくといいかもしれません。すでに用事がある場合、途中で立ち寄る場所が増えることもあります。あるいは今日はメッセージやメールが大量に届く日かもしれません。商売をしていたりSNS関連の仕事をしていたりする場合、一斉送信の後に押し寄せるお客様からの問い合わせに対応する準備をしておきましょう。返信が追いつかないほど連絡が来るかもしれません。人間関係については、良好な関係の場合、恋人やお相手は今日忙しいかもしれません。メッセージを残し合うようなやりとりになりそうです。関係があまり良くない場合、一方的な会話になりがちなので要注意です。"
        },
        ko: {
            quote: "여행이나 데이팅 앱에서의 사랑",
            interpretation: "낮 동안 외출하거나 사무실을 나가야 할 일이 생길 것입니다. 계획대로 되지 않을 수 있으니 이동 수단의 백업 플랜을 준비해두는 것이 좋습니다. 이미 볼일이 있다면 중간에 추가로 들러야 할 곳이 생길 수 있습니다. 혹은 오늘 메시지나 이메일이 쏟아지는 날이 될 수도 있습니다. 사업을 하거나 소셜 미디어 업무를 한다면, 메시지를 발송한 후 밀려오는 고객 문의에 대비하세요 — 답장이 따라가지 못할 정도로 사람들이 몰려올 것입니다. 인간관계에서는, 관계가 좋다면 연인이나 대화 상대가 오늘 바쁠 수 있습니다. 서로 메시지를 남겨두는 식의 소통이 될 것입니다. 관계가 좋지 않은 분들은 마치 인터뷰하듯 혼자만 노력하는 대화가 되지 않도록 주의하세요."
        },
        "zh-CN": {
            quote: "来自旅行或约会app的爱情",
            interpretation: "白天你会有事需要出门或离开办公室。最好准备个备用出行方案，因为事情可能不会按计划进行。如果已经有事要办，途中可能会多出额外的地方要去。或者今天可能是收到大量消息和邮件的一天。如果你做生意或从事社交媒体工作，做好群发消息后应对客户咨询的准备——来的人多到你回复不过来。感情方面，如果关系不错，你的伴侣或聊天对象今天可能比较忙。沟通会是互相留言的模式。关系不太好的人要注意，小心变成你单方面在聊，像在采访对方一样。"
        },
        "zh-TW": {
            quote: "來自旅行或約會app的愛情",
            interpretation: "白天你會有事需要出門或離開辦公室。最好準備個備用出行方案，因為事情可能不會按計劃進行。如果已經有事要辦，途中可能會多出額外的地方要去。或者今天可能是收到大量訊息和郵件的一天。如果你做生意或從事社群媒體工作，做好群發訊息後應對客戶諮詢的準備——來的人多到你回覆不過來。感情方面，如果關係不錯，你的伴侶或聊天對象今天可能比較忙。溝通會是互相留言的模式。關係不太好的人要注意，小心變成你單方面在聊，像在採訪對方一樣。"
        },
        fr: { quote: "Communication rapide et développement soudain", interpretation: "Vous aurez des raisons de sortir de chez vous ou de quitter le bureau dans la journée. Prévoyez un plan de transport de secours car les choses pourraient ne pas se passer comme prévu. Si vous avez déjà des courses à faire, des arrêts supplémentaires pourraient s'ajouter en chemin. Ou bien aujourd'hui pourrait être un jour où vous recevez un afflux de messages ou d'e-mails. Si vous êtes commerçant(e) ou travaillez dans les réseaux sociaux, préparez-vous à répondre aux demandes des clients après un envoi en masse — les gens afflueront plus vite que vous ne pourrez répondre. Côté relations, si tout va bien, votre partenaire ou la personne avec qui vous discutez sera peut-être occupé(e) aujourd'hui. La communication sera plutôt du type se laisser des messages. Pour ceux dont la relation bat de l'aile, attention aux conversations à sens unique où vous êtes le/la seul(e) à faire des efforts." }
    },
    "NINE OF WANDS": {
        en: {
            quote: "High walls, not ready to open up",
            interpretation: "Today you're trying to avoid meeting people because you've just been through an uncomfortable situation. You may have recently had a problem with a coworker, been scolded, or had a conflict with someone around you, leaving you feeling wary and wanting time alone. This is a period when you may need to rush to finish pending work because you're afraid of being nagged or criticized again. If you're in the final stages of a project, today you're determined to close it out, even if it's not perfect yet. On the relationship front, you may not be ready to open up to anyone. Or if you've recently made a mistake with your partner, today you'll be extra cautious."
        },
        ja: {
            quote: "高い壁、心を開く準備ができていない",
            interpretation: "今日は人に会うのを避けたい気分です。最近居心地の悪い状況を経験したばかりだからです。同僚とトラブルがあったり、叱られたり、周囲の人と衝突したりして、まだ警戒心があり、一人の時間が必要だと感じています。また催促されたり注意されたりするのが怖くて、溜まっている仕事を急いで片付けなければならない時期かもしれません。プロジェクトの最終段階にいるなら、今日はまだ完璧でなくても終わらせるつもりです。人間関係については、まだ誰にも心を開く準備ができていないかもしれません。あるいは最近恋人に対して失敗をしてしまった場合、今日は特に慎重に行動するでしょう。"
        },
        ko: {
            quote: "높은 벽, 마음을 열 준비가 되지 않음",
            interpretation: "오늘은 사람들을 만나는 것을 피하려 합니다. 최근 불편한 상황을 겪었기 때문입니다. 동료와 문제가 있었거나, 꾸중을 들었거나, 주변 사람과 갈등이 있어서 아직 경계심이 있고 혼자만의 시간이 필요합니다. 다시 재촉당하거나 비난받을까 봐 밀린 일을 서둘러 끝내야 하는 시기이기도 합니다. 프로젝트 마무리 단계라면 오늘 완벽하지 않더라도 끝내겠다고 결심하고 있습니다. 인간관계 면에서는 아직 누구에게도 마음을 열 준비가 되지 않았을 수 있습니다. 혹은 최근 연인에게 실수를 했다면 오늘은 특별히 조심할 것입니다."
        },
        "zh-CN": {
            quote: "高墙，还没准备好敞开心扉",
            interpretation: "今天你尽量避免见人，因为你刚经历了一些让你不舒服的事情。可能最近跟同事发生了矛盾、被批评了，或者跟身边的人有了冲突，让你还心有余悸，想要独处。现在可能是你需要赶紧完成积压工作的时候，因为怕再被催促或批评。如果正处于项目收尾阶段，今天你下定决心要把它了结，即使还不够完美。感情方面，你可能还没准备好对谁敞开心扉。又或者如果你最近对伴侣犯了什么错，今天会格外小心翼翼。"
        },
        "zh-TW": {
            quote: "高牆，還沒準備好敞開心扉",
            interpretation: "今天你盡量避免見人，因為你剛經歷了一些讓你不舒服的事情。可能最近跟同事發生了矛盾、被批評了，或者跟身邊的人有了衝突，讓你還心有餘悸，想要獨處。現在可能是你需要趕緊完成積壓工作的時候，因為怕再被催促或批評。如果正處於專案收尾階段，今天你下定決心要把它了結，即使還不夠完美。感情方面，你可能還沒準備好對誰敞開心扉。又或者如果你最近對伴侶犯了什麼錯，今天會格外小心翼翼。"
        },
        fr: { quote: "Persévérance malgré les difficultés passées", interpretation: "Aujourd'hui, vous essayez d'éviter les gens car vous venez de traverser une situation inconfortable. Vous avez peut-être eu un problème avec un collègue, subi des reproches ou eu un conflit avec quelqu'un de votre entourage, ce qui vous laisse sur vos gardes et vous donne envie d'être seul(e). C'est une période où vous devez peut-être vous dépêcher de finir le travail en retard de peur d'être relancé(e) ou critiqué(e) à nouveau. Si vous êtes dans la phase finale d'un projet, vous êtes déterminé(e) à le boucler aujourd'hui, même s'il n'est pas encore parfait. Côté relations, vous n'êtes peut-être pas prêt(e) à vous ouvrir à qui que ce soit. Ou si vous avez récemment fait une erreur avec votre partenaire, vous serez particulièrement prudent(e) aujourd'hui." }
    },
    "TEN OF WANDS": {
        en: {
            quote: "Still holding onto an old love, won't let go",
            interpretation: "You're carrying too heavy a workload, possibly because of your ambition to expand a project beyond what you can handle alone. If you're looking for new opportunities, you may need to travel to check out a new workplace, factory, warehouse, or storage facility. Today's work will be heavy and exhausting, but it will be worth it because you're building a solid foundation for the future. If you have plans to meet someone, you may need to postpone or cancel because there are urgent matters to deal with first."
        },
        ja: {
            quote: "まだ古い愛にしがみついて、手放さない",
            interpretation: "仕事の負担を抱えすぎています。プロジェクトを大きくしたいという野心のあまり、一人では手に負えない量になっているのかもしれません。新しいチャンスを探しているなら、新しい職場、工場、倉庫、保管施設を見に行く必要があるかもしれません。今日の仕事はハードで疲れますが、将来のためにしっかりとした基盤を作っているので、その疲れには価値があります。誰かと会う予定がある場合は、先に対処すべき緊急の用事があるため、延期やキャンセルが必要になるかもしれません。"
        },
        ko: {
            quote: "아직 옛 사랑에 매달리고 놓지 않음",
            interpretation: "업무량을 너무 많이 떠안고 있습니다. 프로젝트를 키우려는 야망 때문에 혼자 감당할 수 있는 범위를 넘어선 것일 수 있습니다. 새로운 기회를 찾고 있다면 새 직장, 공장, 창고, 보관 시설을 확인하러 가야 할 수도 있습니다. 오늘 업무는 힘들고 피곤하겠지만, 미래를 위한 탄탄한 기반을 쌓고 있기에 그만한 가치가 있을 것입니다. 누군가와 만날 약속이 있다면 먼저 처리해야 할 급한 일이 있어 연기하거나 취소해야 할 수 있습니다."
        },
        "zh-CN": {
            quote: "还抓着旧爱不放",
            interpretation: "你承担了太多的工作量，可能是因为想把项目做大的野心，超出了一个人能应对的范围。如果你在寻找新机会，可能需要出差去看新的工作场所、工厂、仓库或存储设施。今天的工作会很重很累，但这种累是值得的，因为你正在为未来打下坚实的基础。如果你和谁有约，可能需要推迟或取消，因为有紧急的事情需要先处理。"
        },
        "zh-TW": {
            quote: "還抓著舊愛不放",
            interpretation: "你承擔了太多的工作量，可能是因為想把專案做大的野心，超出了一個人能應對的範圍。如果你在尋找新機會，可能需要出差去看新的工作場所、工廠、倉庫或儲存設施。今天的工作會很重很累，但這種累是值得的，因為你正在為未來打下堅實的基礎。如果你和誰有約，可能需要推遲或取消，因為有緊急的事情需要先處理。"
        },
        fr: { quote: "Porter le poids de la relation", interpretation: "Vous portez une charge de travail trop lourde, peut-être à cause de votre ambition de développer un projet au-delà de ce que vous pouvez gérer seul(e). Si vous cherchez de nouvelles opportunités, vous devrez peut-être vous déplacer pour visiter un nouveau lieu de travail, une usine, un entrepôt ou un espace de stockage. Le travail d'aujourd'hui sera lourd et épuisant, mais cela en vaudra la peine car vous construisez une base solide pour l'avenir. Si vous avez prévu de voir quelqu'un, vous devrez peut-être reporter ou annuler car des affaires urgentes doivent être réglées d'abord." }
    },
    "PAGE OF WANDS": {
        en: {
            quote: "An energetic person bringing new energy",
            interpretation: "Today you'll receive a message or good news. It could be a work-related contact or a package you've been waiting for. If you don't have any pending orders, today might be a day when you learn something new or meet someone who is enthusiastic, agile, and full of creative energy — though they may still lack some experience. You might join a specialized learning group and introduce yourself to new members, or receive some information about a close friend or someone in your circle."
        },
        ja: {
            quote: "新しいエネルギーをもたらす活発な人",
            interpretation: "今日はメッセージや嬉しい知らせが届くでしょう。仕事関係の連絡や、待っていた荷物かもしれません。保留中の注文がなければ、今日は何か新しいことを学んだり、熱心で機敏、クリエイティブなエネルギーに満ちた人に出会う日になりそうです。ただし、その人はまだ経験が浅いかもしれません。専門的な学習グループに参加して新メンバーに自己紹介したり、親しい友人や身近な人についての情報を得たりするかもしれません。"
        },
        ko: {
            quote: "새로운 에너지를 가져오는 활기찬 사람",
            interpretation: "오늘은 메시지나 좋은 소식을 받게 될 것입니다. 업무 관련 연락이거나 기다리던 택배일 수 있습니다. 대기 중인 주문이 없다면, 오늘은 새로운 것을 배우거나 열정적이고 민첩하며 창의적 에너지가 넘치는 사람을 만나는 날이 될 수 있습니다. 다만 그 사람은 아직 경험이 부족할 수 있습니다. 전문 학습 그룹에 참여해 새 멤버들에게 자기소개를 하거나, 친한 친구나 가까운 사람에 대한 정보를 얻을 수도 있습니다."
        },
        "zh-CN": {
            quote: "带来新能量的活力四射的人",
            interpretation: "今天你会收到消息或好消息。可能是工作上的联系，也可能是等待已久的快递。如果没有待收的包裹，今天可能是你学到新东西的日子，或者遇到一个充满热情、行动敏捷、创意满满的人，不过他可能还缺乏一些经验。你可能会加入一个专业学习小组，向新成员介绍自己，或者收到关于好朋友或身边人的某些消息。"
        },
        "zh-TW": {
            quote: "帶來新能量的活力四射的人",
            interpretation: "今天你會收到訊息或好消息。可能是工作上的聯繫，也可能是等待已久的包裹。如果沒有待收的包裹，今天可能是你學到新東西的日子，或者遇到一個充滿熱情、行動敏捷、創意滿滿的人，不過他可能還缺乏一些經驗。你可能會加入一個專業學習小組，向新成員介紹自己，或者收到關於好朋友或身邊人的某些消息。"
        },
        fr: { quote: "Quelqu'un d'enthousiaste qui apporte une nouvelle énergie", interpretation: "Aujourd'hui, vous recevrez un message ou une bonne nouvelle. Il pourrait s'agir d'un contact professionnel ou d'un colis que vous attendiez. Si vous n'avez pas de commande en cours, aujourd'hui pourrait être un jour où vous apprenez quelque chose de nouveau ou rencontrez quelqu'un d'enthousiaste, agile et plein d'énergie créative, bien qu'il puisse encore manquer d'expérience. Vous pourriez rejoindre un groupe d'apprentissage spécialisé et vous présenter aux nouveaux membres, ou recevoir des informations sur un ami proche ou quelqu'un de votre entourage." }
    },
    "KNIGHT OF WANDS": {
        en: {
            quote: "A freedom-lover who comes unexpectedly",
            interpretation: "Your feet are itching to go! You may suddenly need to travel without much notice. Even if it's not a long trip — just a day trip — it'll make your day feel especially lively. If you're staying home, someone might show up at your door unannounced. On the romance front, be careful about coming on too strong or messaging someone so quickly that you catch them off guard. Try dimming the lights a little before they get scared and run away."
        },
        ja: {
            quote: "予告なしに来る自由を愛する人",
            interpretation: "じっとしていられない日です！突然の予定で移動が必要になるかもしれません。遠出ではなく日帰り程度でも、いつもよりワクワクする一日になるでしょう。家にいる場合は、アポなしで誰かが訪ねてくるかもしれません。恋愛面では、アプローチが強すぎたり、メッセージを送るスピードが速すぎて相手がびっくりしてしまわないように注意。相手が逃げ出す前に、少しトーンを落としてみましょう。"
        },
        ko: {
            quote: "예고 없이 오는 자유를 사랑하는 사람",
            interpretation: "발이 근질근질한 날입니다! 갑자기 예고 없이 이동해야 할 수 있습니다. 먼 여행이 아니라 당일치기 정도라도 오늘 하루가 특별히 활기차게 느껴질 것입니다. 집에 있는 분이라면 예고 없이 누군가 찾아올 수 있습니다. 연애 면에서는 너무 적극적으로 다가가거나 상대가 준비되기도 전에 메시지를 보내는 것에 주의하세요. 상대가 놀라서 도망가기 전에 조금 톤을 낮춰보세요."
        },
        "zh-CN": {
            quote: "不期而至的自由爱好者",
            interpretation: "今天闲不住！你可能突然需要出门，毫无预兆。虽然不是长途旅行，也许只是当天来回，但也会让这一天格外热闹。如果你待在家，可能有人不请自来地登门拜访。感情方面，注意不要用力过猛，或者消息发得太快让对方措手不及。在对方被吓跑之前，试着把火力调小一点。"
        },
        "zh-TW": {
            quote: "不期而至的自由愛好者",
            interpretation: "今天閒不住！你可能突然需要出門，毫無預兆。雖然不是長途旅行，也許只是當天來回，但也會讓這一天格外熱鬧。如果你待在家，可能有人不請自來地登門拜訪。感情方面，注意不要用力過猛，或者訊息發得太快讓對方措手不及。在對方被嚇跑之前，試著把火力調小一點。"
        },
        fr: { quote: "Quelqu'un d'indépendant qui arrive sans prévenir", interpretation: "Vous avez la bougeotte ! Vous pourriez devoir vous déplacer sans prévenir. Même si ce n'est pas un long voyage — juste un aller-retour dans la journée — cela rendra votre journée particulièrement animée. Si vous restez à la maison, quelqu'un pourrait débarquer chez vous sans prévenir. Côté amour, attention à ne pas foncer trop fort ou envoyer des messages si vite que vous prenez l'autre au dépourvu. Essayez de modérer votre ardeur avant que l'autre ne prenne peur et ne s'enfuie." }
    },
    "QUEEN OF WANDS": {
        en: {
            quote: "A good relationship but no label, unclear",
            interpretation: "You'll meet a woman who is very capable at work, but whose work style might not align with your taste. You wish she would pay attention to things beyond work, like her personal image or the visual appeal of her work (not just the content). Or this might be how your coworkers feel about you — that you're very talented but don't pay attention to how you dress or your external appearance. If you're a woman with a partner, and your partner has a close female friend, keep an eye on that friend. Your instinct telling you she can't be trusted might actually be right."
        },
        ja: {
            quote: "良い関係だがラベルなし、不明確",
            interpretation: "仕事がとてもできる女性に出会うでしょう。ただ、その人の仕事のスタイルはあなたの好みに合わないかもしれません。仕事以外のこと、例えば自分のイメージや仕事の見た目の美しさ（内容だけでなく）にもっと気を配ってほしいと感じるでしょう。あるいは、これは同僚があなたに対して感じていることかもしれません。あなたはとても優秀だけど、服装や外見に無頓着だと。もしあなたがパートナーのいる女性で、パートナーに親しい女友達がいるなら、その友達には注意しておきましょう。信用できないという直感は、実は正しいかもしれません。"
        },
        ko: {
            quote: "좋은 관계이지만 라벨 없이 불분명",
            interpretation: "일을 매우 잘하는 여성을 만나게 될 것입니다. 하지만 그녀의 업무 스타일이 당신의 취향과 맞지 않을 수 있습니다. 일 외에 자신의 이미지나 결과물의 시각적 완성도(내용만이 아니라)에도 신경 써주었으면 하는 마음이 들 것입니다. 혹은 이것이 동료들이 당신에게 느끼는 것일 수도 있습니다 — 실력은 뛰어나지만 옷차림이나 외적 이미지에 신경을 쓰지 않는다고. 파트너가 있는 여성이라면, 파트너에게 친한 여자 친구가 있을 경우 그 친구를 주의 깊게 살피세요. 그녀를 믿을 수 없다는 직감이 사실일 수 있습니다."
        },
        "zh-CN": {
            quote: "关系好但没有名分，不清楚",
            interpretation: "你会遇到一位工作能力很强的女性，但她的工作风格可能不太对你的胃口。你希望她能关注工作以外的事情，比如个人形象或作品的视觉美感（而不仅仅是内容）。又或者这其实是同事对你的感觉——觉得你很厉害，但完全不注意穿着打扮和外在形象。如果你是有伴侣的女性，而伴侣有一个关系亲密的女性朋友，要留心那个朋友。你觉得她不可信的直觉可能是对的。"
        },
        "zh-TW": {
            quote: "關係好但沒有名分，不清楚",
            interpretation: "你會遇到一位工作能力很強的女性，但她的工作風格可能不太對你的胃口。你希望她能關注工作以外的事情，比如個人形象或作品的視覺美感（而不僅僅是內容）。又或者這其實是同事對你的感覺——覺得你很厲害，但完全不注意穿著打扮和外在形象。如果你是有伴侶的女性，而伴侶有一個關係親密的女性朋友，要留心那個朋友。你覺得她不可信的直覺可能是對的。"
        },
        fr: { quote: "Une bonne relation mais sans étiquette, pas claire", interpretation: "Vous rencontrerez une femme très compétente au travail, mais dont le style de travail pourrait ne pas correspondre à vos goûts. Vous aimeriez qu'elle prête attention à d'autres choses que le travail, comme son image personnelle ou l'aspect visuel de son travail (pas seulement le contenu). Ou bien c'est peut-être ce que vos collègues pensent de vous — que vous êtes très talentueux(se) mais ne faites pas attention à votre apparence ou votre style vestimentaire. Si vous êtes une femme en couple et que votre partenaire a une amie proche, gardez un œil sur cette amie. Votre instinct vous disant qu'elle n'est pas digne de confiance pourrait bien être fondé." }
    },
    "KING OF WANDS": {
        en: {
            quote: "A visionary leader with experience",
            interpretation: "Today you'll meet someone talented with knowledge gained from real experience, not just theory. They may be a new member joining your team who has been through major projects before and is recognized in their field. On the relationship front, you'll meet someone interesting. They have big dreams and ambitions but may not pay much attention to how they dress. They have charm, but it doesn't come in a polished gentleman package. If you're a man, the other person will see you as someone talented with good people skills and interesting to be around, but you might want to pay a bit more attention to how you dress."
        },
        ja: {
            quote: "経験豊富なビジョナリーリーダー",
            interpretation: "今日は理論だけでなく、実際の経験から得た知識を持つ優秀な人に出会うでしょう。大きなプロジェクトを経験し、業界で認められている、チームに新しく加わるメンバーかもしれません。人間関係では、興味深い人に出会います。大きな夢と野心がありますが、服装にはあまり気を使わないタイプかもしれません。魅力はありますが、洗練された紳士というわけではありません。もしあなたが男性なら、相手はあなたを有能で人付き合いが上手く、一緒にいて面白い人だと見ていますが、もう少し服装に気を配った方がいいかもしれません。"
        },
        ko: {
            quote: "경험 많은 비전 있는 리더",
            interpretation: "오늘은 이론이 아닌 실제 경험에서 얻은 지식을 가진 실력자를 만나게 될 것입니다. 대규모 프로젝트를 경험했고 업계에서 인정받는 팀의 새 멤버일 수 있습니다. 인간관계 면에서는 흥미로운 사람을 만나게 됩니다. 큰 꿈과 야망이 있지만 옷차림에는 별로 신경 쓰지 않을 수 있습니다. 매력은 있지만 세련된 신사 스타일은 아닙니다. 남성이라면, 상대방은 당신을 실력 있고 대인관계가 좋으며 흥미로운 사람으로 볼 것이지만, 옷차림에 좀 더 신경을 쓰면 좋겠다고 생각할 수 있습니다."
        },
        "zh-CN": {
            quote: "有远见和经验的领导者",
            interpretation: "今天你会遇到一个有真才实学的人，他的知识来自实际经验而非纯理论。可能是一位新加入团队的成员，曾经历过大型项目，在业内有口碑。感情方面，你会遇到一个有趣的人。他有远大的梦想和抱负，但可能不太注重穿着打扮。虽然有魅力，但不是那种精致绅士的类型。如果你是男性，对方会觉得你是个有能力、人缘好、有意思的人，但可能觉得你应该更注意穿着。"
        },
        "zh-TW": {
            quote: "有遠見和經驗的領導者",
            interpretation: "今天你會遇到一個有真才實學的人，他的知識來自實際經驗而非純理論。可能是一位新加入團隊的成員，曾經歷過大型專案，在業內有口碑。感情方面，你會遇到一個有趣的人。他有遠大的夢想和抱負，但可能不太注重穿著打扮。雖然有魅力，但不是那種精緻紳士的類型。如果你是男性，對方會覺得你是個有能力、人緣好、有意思的人，但可能覺得你應該更注意穿著。"
        },
        fr: { quote: "Un leader avec vision et expérience", interpretation: "Aujourd'hui, vous rencontrerez quelqu'un de talentueux dont les connaissances viennent de l'expérience réelle, pas seulement de la théorie. Il pourrait s'agir d'un nouveau membre rejoignant votre équipe, ayant déjà traversé de grands projets et étant reconnu dans son domaine. Côté relations, vous rencontrerez quelqu'un d'intéressant. Cette personne a de grands rêves et des ambitions, mais ne prête peut-être pas beaucoup d'attention à sa façon de s'habiller. Elle a du charme, mais pas dans un style de gentleman raffiné. Si vous êtes un homme, l'autre personne vous verra comme quelqu'un de talentueux avec de bonnes relations humaines et agréable à côtoyer, mais vous devriez peut-être faire un peu plus attention à votre apparence." }
    },
    "ACE OF CUPS": {
        en: {
            quote: "A new love that comes naturally without effort",
            interpretation: "If you're starting a new project, everything will go smoothly. Someone will offer you kindness or volunteer to help. If you're lacking anything, just ask and someone will step in to fill the gaps for you. On a day off, you might spend time shopping for something you've wanted for a long time, or book a room in the countryside to escape the city chaos. It's a great day to reward yourself and do things that bring happiness to your life."
        },
        ja: {
            quote: "努力なしに自然に来る新しい愛",
            interpretation: "新しいプロジェクトを始めるなら、すべてが順調に進むでしょう。誰かが親切心を差し伸べたり、手伝いを申し出てくれたりします。何か足りないものがあれば、口に出すだけで誰かがその不足を埋めてくれます。休日なら、ずっと欲しかったものを買い物に行ったり、都会の喧騒から逃れるために地方の宿を予約したりするかもしれません。自分にご褒美をあげ、人生に幸せをもたらすことをするのにぴったりの日です。"
        },
        ko: {
            quote: "노력 없이 자연스럽게 오는 새로운 사랑",
            interpretation: "새로운 프로젝트를 시작하려 한다면, 모든 것이 순조롭게 진행될 것입니다. 누군가 호의를 베풀거나 자발적으로 도와주겠다고 나설 것입니다. 부족한 것이 있다면, 말만 하면 누군가 그 빈자리를 채워줄 것입니다. 휴일이라면, 오랫동안 갖고 싶었던 것을 쇼핑하거나 도시의 번잡함을 피해 지방에 숙소를 예약할 수도 있습니다. 자신에게 보상을 주고 삶에 행복을 가져다주는 일을 하기에 좋은 날입니다."
        },
        "zh-CN": {
            quote: "不费力自然到来的新爱情",
            interpretation: "如果你正在开始一个新项目，一切都会顺利进行。会有人主动向你伸出援手或自愿帮助你。如果你缺少什么，只要开口就会有人来填补不足。如果是休息日，你可能会花时间去购买一直想要的东西，或者预订一间乡下的房间来逃离城市的喧嚣。这是一个适合犒赏自己、做能为生活带来幸福的事情的好日子。"
        },
        "zh-TW": {
            quote: "不費力自然到來的新愛情",
            interpretation: "如果你正在開始一個新項目，一切都會順利進行。會有人主動向你伸出援手或自願幫助你。如果你缺少什麼，只要開口就會有人來填補不足。如果是休息日，你可能會花時間去購買一直想要的東西，或者預訂一間鄉下的房間來逃離城市的喧囂。這是一個適合犒賞自己、做能為生活帶來幸福的事情的好日子。"
        },
        fr: { quote: "Un nouveau début émotionnel et amoureux", interpretation: "Si vous démarrez un nouveau projet, tout se passera bien. Quelqu'un vous offrira sa gentillesse ou se portera volontaire pour vous aider. S'il vous manque quoi que ce soit, il suffit de demander et quelqu'un comblera les lacunes pour vous. Un jour de repos, vous pourriez passer du temps à faire du shopping pour quelque chose que vous désirez depuis longtemps, ou réserver une chambre à la campagne pour échapper au chaos de la ville. C'est une journée idéale pour vous récompenser et faire des choses qui apportent du bonheur à votre vie." }
    },
    "TWO OF CUPS": {
        en: {
            quote: "A balanced love where both give and receive equally",
            interpretation: "Today you'll exchange ideas with someone you really click with. It could be someone you just met today or someone you already know. If you have a work meeting, you'll find a balanced solution where both you and the other party get exactly what they want. If you have a date, you'll meet someone impressive, and the atmosphere will be relaxed and natural. For those with a partner, if you haven't been together lately, today there's a good chance you'll get to see each other."
        },
        ja: {
            quote: "両方が平等に与え合うバランスの取れた愛",
            interpretation: "今日は気の合う人と意見交換ができる日です。今日初めて会う人かもしれませんし、すでに知っている人かもしれません。仕事の打ち合わせがあれば、あなたと相手の双方が望むものをちょうどよく得られるバランスの取れた解決策が見つかるでしょう。デートの予定があれば、印象的な人に出会い、リラックスした自然な雰囲気になるでしょう。パートナーがいる方で、最近一緒にいられなかった場合、今日は会えるチャンスがあります。"
        },
        ko: {
            quote: "둘 다 평등하게 주고받는 균형 잡힌 사랑",
            interpretation: "오늘은 마음이 맞는 사람과 의견을 나누게 될 것입니다. 오늘 처음 만난 사람일 수도 있고, 이미 아는 사람일 수도 있습니다. 업무 미팅이 있다면, 당신과 상대방 모두가 원하는 것을 완벽하게 얻을 수 있는 균형 잡힌 해결책을 찾게 될 것입니다. 데이트가 있다면, 인상적인 사람을 만나게 되고 분위기는 편안하고 자연스러울 것입니다. 연인이 있는 분들 중 최근 함께하지 못했다면, 오늘 만날 수 있는 기회가 있습니다."
        },
        "zh-CN": {
            quote: "双方平等付出和接受的平衡的爱",
            interpretation: "今天你会和一个聊得来的人交流想法。可能是今天刚认识的人，也可能是已经认识的人。如果有工作会议，你们会找到一个平衡点，双方都能恰到好处地得到自己想要的。如果有约会，你会遇到一个令人印象深刻的人，氛围会很轻松自然。对于有伴侣的人，如果最近没能在一起，今天有机会见面。"
        },
        "zh-TW": {
            quote: "雙方平等付出和接受的平衡的愛",
            interpretation: "今天你會和一個聊得來的人交流想法。可能是今天剛認識的人，也可能是已經認識的人。如果有工作會議，你們會找到一個平衡點，雙方都能恰到好處地得到自己想要的。如果有約會，你會遇到一個令人印象深刻的人，氛圍會很輕鬆自然。對於有伴侶的人，如果最近沒能在一起，今天有機會見面。"
        },
        fr: { quote: "Une connexion mutuelle et équilibrée", interpretation: "Aujourd'hui, vous échangerez des idées avec quelqu'un avec qui vous vous entendez vraiment bien. Ce pourrait être une personne que vous venez de rencontrer ou quelqu'un que vous connaissez déjà. Si vous avez une réunion de travail, vous trouverez un compromis équilibré où les deux parties obtiennent exactement ce qu'elles veulent. Si vous avez un rendez-vous, vous rencontrerez quelqu'un d'impressionnant et l'atmosphère sera détendue et naturelle. Pour ceux qui ont un partenaire mais ne se sont pas vus récemment, aujourd'hui offre une bonne chance de vous retrouver." }
    },
    "THREE OF CUPS": {
        en: {
            quote: "Meet someone at social events, but beware of third parties",
            interpretation: "Today you may have meetings or encounter a variety of people, but the atmosphere will be fun and everyone will cooperate willingly. Or you might attend a gathering full of food and drinks -- perhaps a small office party or a dinner at a friend's house. If you have a date or plans to meet your partner, they're likely to bring a friend along or invite you to join their friend group, rather than having time alone together as a couple."
        },
        ja: {
            quote: "社交イベントで出会う、でも第三者に注意",
            interpretation: "今日は会議があったり、さまざまな人と出会ったりするかもしれませんが、雰囲気は楽しく、みんなが快く協力してくれるでしょう。または食べ物や飲み物がたくさんある集まりに参加するかもしれません。オフィスの小さなパーティーや友人の家でのディナーなど。デートや恋人と会う予定がある場合、相手が友達を連れてきたり、友達のグループに合流するよう誘ったりする可能性があり、二人きりの時間は持てないかもしれません。"
        },
        ko: {
            quote: "사교 행사에서 만나지만 제3자 조심",
            interpretation: "오늘은 회의가 있거나 다양한 사람들을 만나게 될 수 있지만, 분위기는 즐겁고 모두가 기꺼이 협력할 것입니다. 또는 음식과 음료가 가득한 모임에 참석할 수도 있습니다 -- 사무실의 작은 파티나 친구 집에서의 저녁 식사 등. 데이트나 연인을 만날 계획이 있다면, 상대방이 친구를 데려오거나 친구 그룹에 합류하자고 초대할 가능성이 높아, 둘만의 시간을 갖기는 어려울 수 있습니다."
        },
        "zh-CN": {
            quote: "在社交活动中遇到人，但小心第三者",
            interpretation: "今天你可能要开会或遇到各种各样的人，但氛围会很愉快，大家都愿意配合。或者你可能参加一个满是美食和饮品的聚会——可能是办公室的小型派对或朋友家的晚餐。如果你有约会或和另一半见面的计划，对方很可能会带朋友一起来，或邀请你加入他们的朋友圈，而不是两个人单独相处。"
        },
        "zh-TW": {
            quote: "在社交活動中遇到人，但小心第三者",
            interpretation: "今天你可能要開會或遇到各種各樣的人，但氛圍會很愉快，大家都願意配合。或者你可能參加一個滿是美食和飲品的聚會——可能是辦公室的小型派對或朋友家的晚餐。如果你有約會或和另一半見面的計劃，對方很可能會帶朋友一起來，或邀請你加入他們的朋友圈，而不是兩個人單獨相處。"
        },
        fr: { quote: "Célébration et amitié menant à l'amour", interpretation: "Aujourd'hui, vous pourriez avoir des réunions ou rencontrer toutes sortes de personnes, mais l'ambiance sera festive et tout le monde coopérera de bon cœur. Vous pourriez aussi participer à un rassemblement rempli de nourriture et de boissons -- peut-être une petite fête au bureau ou un dîner chez un ami. Si vous avez un rendez-vous ou prévoyez de voir votre partenaire, il ou elle risque d'amener un(e) ami(e) ou de vous inviter à rejoindre son groupe d'amis, plutôt que de passer du temps en tête-à-tête." }
    },
    "FOUR OF CUPS": {
        en: {
            quote: "Opportunities exist but you can't see them because you're stuck in dissatisfaction",
            interpretation: "Your boss keeps piling more and more work on you. You don't want to accept it but don't dare refuse. Most of it is quantity-focused rather than challenging, leaving you feeling bored and unmotivated. For those in communication or customer service roles, the other party may ignore you, not reply, or not answer your calls today. In relationships, if you have a partner, they might be sulking and won't pick up the phone. For singles who are obsessing over someone, it's best to stop messaging them before it becomes annoying. That's enough for today -- if tomorrow's card is better, try reaching out again then."
        },
        ja: {
            quote: "機会はあるが不満に囚われて見えない",
            interpretation: "上司がどんどん仕事を増やしてきます。受けたくないけど断る勇気もない。ほとんどがやりがいよりも量重視の仕事で、退屈でやる気が出ません。コミュニケーションや顧客対応の仕事をしている人は、今日は相手に無視されたり、返信が来なかったり、電話に出てもらえないかもしれません。恋愛面では、パートナーがいる人は相手が拗ねていて電話に出ないかもしれません。誰かに夢中のシングルの方は、迷惑になる前にメッセージを送るのをやめた方がいいでしょう。今日はここまでにして、明日良いカードが出たらまた連絡しましょう。"
        },
        ko: {
            quote: "기회가 있지만 불만에 사로잡혀 보이지 않음",
            interpretation: "상사가 계속해서 업무를 쌓아올립니다. 받고 싶지 않지만 거절할 용기도 없습니다. 대부분 도전적이기보다는 양 위주의 일이라 지루하고 동기부여가 되지 않습니다. 커뮤니케이션이나 고객 서비스 업무를 하는 분들은 오늘 상대방이 무시하거나 답장을 하지 않거나 전화를 받지 않을 수 있습니다. 연애에서는 연인이 있는 경우 상대가 삐져서 전화를 안 받을 수 있습니다. 누군가에게 빠져 있는 싱글분들은 귀찮게 되기 전에 메시지 보내는 것을 멈추는 게 좋겠습니다. 오늘은 여기까지 -- 내일 카드가 좋으면 그때 다시 연락해보세요."
        },
        "zh-CN": {
            quote: "机会存在但因为沉浸在不满中看不到",
            interpretation: "老板不断给你堆积越来越多的工作。你不想接但又不敢拒绝。大部分工作重量不重质，让你感到无聊和缺乏动力。对于从事沟通或客户服务工作的人，今天对方可能会无视你、不回复或不接电话。感情方面，如果你有伴侣，对方可能在闹脾气不接电话。对于正在迷恋某人的单身者，建议停止给对方发消息，免得变成骚扰。今天就到这里吧——如果明天抽到好牌再联系对方。"
        },
        "zh-TW": {
            quote: "機會存在但因為沉浸在不滿中看不到",
            interpretation: "老闆不斷給你堆積越來越多的工作。你不想接但又不敢拒絕。大部分工作重量不重質，讓你感到無聊和缺乏動力。對於從事溝通或客戶服務工作的人，今天對方可能會無視你、不回覆或不接電話。感情方面，如果你有伴侶，對方可能在鬧脾氣不接電話。對於正在迷戀某人的單身者，建議停止給對方發訊息，免得變成騷擾。今天就到這裡吧——如果明天抽到好牌再聯繫對方。"
        },
        fr: { quote: "Apathie ou occasion manquée en amour", interpretation: "Votre patron continue d'empiler de plus en plus de travail sur vous. Vous ne voulez pas l'accepter mais n'osez pas refuser. La plupart sont des tâches axées sur la quantité plutôt que stimulantes, ce qui vous laisse un sentiment d'ennui et de démotivation. Pour ceux qui travaillent dans la communication ou le service client, l'autre partie pourrait vous ignorer, ne pas répondre ou ne pas décrocher aujourd'hui. En amour, si vous avez un partenaire, il ou elle pourrait bouder et ne pas répondre au téléphone. Pour les célibataires qui sont obsédés par quelqu'un, mieux vaut arrêter de lui envoyer des messages avant que cela ne devienne agaçant. C'est assez pour aujourd'hui -- si la carte de demain est meilleure, réessayez à ce moment-là." }
    },
    "FIVE OF CUPS": {
        en: {
            quote: "Still drowning in sadness, only seeing what's lost",
            interpretation: "Today you may face disappointment. An idea you were proud of gets rejected without mercy, or a meeting is scheduled without anyone notifying you in advance -- by the time you find out, it's already half over. On a day off, you might not get out of bed until late afternoon, come downstairs and find no one around. People close to you may forget an appointment or an important date of yours. But this card could be good news for those on a diet -- step on the scale and you might see the numbers have gone down."
        },
        ja: {
            quote: "まだ悲しみに溺れ、失ったものだけを見ている",
            interpretation: "今日は失望に直面するかもしれません。自慢のアイデアが容赦なく却下されたり、事前の通知なしに会議が予定されていて、気づいた時にはもう半分終わっていたり。休日なら、午後遅くまでベッドから出られず、階下に降りても誰もいないかもしれません。身近な人があなたとの約束や大切な日を忘れるかもしれません。しかし、ダイエット中の方にはこのカードは朗報かもしれません。体重計に乗ってみてください、数字が減っているかもしれませんよ。"
        },
        ko: {
            quote: "아직 슬픔에 빠져 잃은 것만 보고 있음",
            interpretation: "오늘은 실망스러운 일을 겪을 수 있습니다. 자랑스러워했던 아이디어가 가차 없이 거절당하거나, 사전 통보 없이 회의가 잡혀서 알아차렸을 때는 이미 절반이 지나 있을 수 있습니다. 휴일이라면 오후 늦게까지 침대에서 나오지 못하고, 아래층에 내려가도 아무도 없을 수 있습니다. 가까운 사람이 당신과의 약속이나 중요한 날을 잊어버릴 수도 있습니다. 하지만 다이어트 중인 분들에게는 좋은 소식일 수 있습니다 -- 체중계에 올라가 보세요, 숫자가 줄어들었을지도 모릅니다."
        },
        "zh-CN": {
            quote: "还沉浸在悲伤中，只看到失去的",
            interpretation: "今天你可能会遇到令人失望的事。你引以为豪的想法被毫不留情地否决，或者有人安排了会议却没有提前通知你——等你发现时已经进行了一半。如果是休息日，你可能到下午才起床，下楼发现周围一个人也没有。身边的人可能会忘记和你的约定或你的重要日子。但对于正在减肥的人来说，这张牌可能是好消息——上秤看看，体重数字可能已经下降了。"
        },
        "zh-TW": {
            quote: "還沉浸在悲傷中，只看到失去的",
            interpretation: "今天你可能會遇到令人失望的事。你引以為豪的想法被毫不留情地否決，或者有人安排了會議卻沒有提前通知你——等你發現時已經進行了一半。如果是休息日，你可能到下午才起床，下樓發現周圍一個人也沒有。身邊的人可能會忘記和你的約定或你的重要日子。但對於正在減肥的人來說，這張牌可能是好消息——上秤看看，體重數字可能已經下降了。"
        },
        fr: { quote: "Chagrin et regret, mais espoir reste", interpretation: "Aujourd'hui, vous pourriez faire face à une déception. Une idée dont vous étiez fier(e) est rejetée sans ménagement, ou une réunion est programmée sans que vous en soyez informé(e) à l'avance -- quand vous le découvrez, elle est déjà à moitié terminée. Un jour de repos, vous pourriez ne pas sortir du lit avant la fin d'après-midi, descendre et ne trouver personne. Vos proches pourraient oublier un rendez-vous ou une date importante pour vous. Mais cette carte pourrait être une bonne nouvelle pour ceux qui font un régime -- montez sur la balance, les chiffres ont peut-être baissé." }
    },
    "SIX OF CUPS": {
        en: {
            quote: "An ex returning, or a pure love like childhood",
            interpretation: "Someone who's been out of touch for a long time will reach out again, but it might not be the person you've been thinking of. They could be someone from even further back -- like an old client who disappeared long ago. In daily life, if it's a workday, you'll receive great help from those around you and they'll follow your lead perfectly. If there's a meeting or presentation, the other party will be impressed with what you present. On a day off, someone may drop by your home unannounced. And if you have a date today, the atmosphere will be favorable for both of you to start seeing each other. For those with a partner who haven't met in a while, today you'll finally get to see each other."
        },
        ja: {
            quote: "戻ってくる元カレ・元カノ、または子供時代のような純粋な愛",
            interpretation: "長い間連絡が途絶えていた人から再び連絡が来ます。ただし、あなたが思っている人ではないかもしれません。もっと昔の人、例えば長い間姿を消していた昔のクライアントかもしれません。日常生活では、仕事の日なら周りの人からしっかりサポートしてもらえ、あなたの指示通りに動いてくれるでしょう。会議やプレゼンがあれば、相手はあなたの発表に感銘を受けるでしょう。休日なら、予告なしに誰かが家を訪ねてくるかもしれません。そして今日デートの予定があれば、二人が付き合い始めるのに良い雰囲気になるでしょう。しばらく会えていなかったパートナーがいる方は、今日ようやく会えるでしょう。"
        },
        ko: {
            quote: "돌아오는 전 애인 또는 어린 시절 같은 순수한 사랑",
            interpretation: "오랫동안 연락이 끊겼던 사람이 다시 연락해 올 것입니다. 다만 당신이 생각하고 있던 그 사람은 아닐 수 있습니다. 더 오래전 사람일 수도 있습니다 -- 예를 들어 오랫동안 사라졌던 옛 고객처럼. 일상생활에서, 근무일이라면 주변 사람들로부터 훌륭한 도움을 받고, 당신의 지시를 완벽하게 따라줄 것입니다. 회의나 발표가 있다면 상대방이 당신의 발표에 감명받을 것입니다. 휴일이라면 누군가 예고 없이 집에 찾아올 수 있습니다. 그리고 오늘 데이트가 있다면, 둘이 사귀기 시작하기에 좋은 분위기가 될 것입니다. 한동안 만나지 못한 연인이 있는 분들은, 오늘 드디어 만나게 될 것입니다."
        },
        "zh-CN": {
            quote: "回来的前任，或像童年一样纯粹的爱",
            interpretation: "一个很久没联系的人会重新联络你，但可能不是你正在想念的那个人。他们可能是更早以前的人——比如一个消失很久的老客户。在日常生活中，如果是工作日，你会得到周围人的大力帮助，他们会完美地配合你的指示。如果有会议或汇报，对方会对你的展示印象深刻。如果是休息日，可能有人不请自来地到你家拜访。如果今天有约会，氛围会很有利于你们开始交往。对于有伴侣但好一阵子没见面的人，今天终于能见面了。"
        },
        "zh-TW": {
            quote: "回來的前任，或像童年一樣純粹的愛",
            interpretation: "一個很久沒聯繫的人會重新聯絡你，但可能不是你正在想念的那個人。他們可能是更早以前的人——比如一個消失很久的老客戶。在日常生活中，如果是工作日，你會得到周圍人的大力幫助，他們會完美地配合你的指示。如果有會議或匯報，對方會對你的展示印象深刻。如果是休息日，可能有人不請自來地到你家拜訪。如果今天有約會，氛圍會很有利於你們開始交往。對於有伴侶但好一陣子沒見面的人，今天終於能見面了。"
        },
        fr: { quote: "Nostalgie et retour d'un amour du passé", interpretation: "Quelqu'un qui n'a pas donné de nouvelles depuis longtemps va reprendre contact, mais ce n'est peut-être pas la personne à laquelle vous pensez. Il pourrait s'agir de quelqu'un d'encore plus ancien -- comme un ancien client disparu depuis longtemps. Au quotidien, si c'est un jour de travail, vous recevrez une aide précieuse de votre entourage et ils suivront vos directives à la lettre. S'il y a une réunion ou une présentation, l'autre partie sera impressionnée par ce que vous présentez. Un jour de repos, quelqu'un pourrait passer chez vous à l'improviste. Et si vous avez un rendez-vous aujourd'hui, l'atmosphère sera propice pour commencer à vous fréquenter. Pour ceux qui ont un partenaire mais ne se sont pas vus depuis un moment, aujourd'hui vous vous retrouverez enfin." }
    },
    "SEVEN OF CUPS": {
        en: {
            quote: "Lost in fantasy, not going out to meet people in the real world",
            interpretation: "You have tons of ideas and things you want to do, but everything looks scattered and disorganized. You can't prioritize what to start first or which task to tackle. A to-do list might make your life easier. If this card appears, be very careful about online shopping -- you might mindlessly like and share things, and before you know it, half your bank balance is gone."
        },
        ja: {
            quote: "ファンタジーに迷い、現実世界で人に会いに行かない",
            interpretation: "やりたいことやアイデアが山ほどありますが、すべてが散らかっていてまとまりがありません。何から始めるべきか、どのタスクを先に片付けるべきか、優先順位がつけられません。To Doリストを作ると生活が楽になるかもしれません。このカードが出たら、オンラインショッピングには十分注意してください。つい「いいね」やシェアを連打してしまい、気がついたら口座残高が半分になっているかもしれません。"
        },
        ko: {
            quote: "환상에 빠져 현실 세계에서 사람을 만나지 않음",
            interpretation: "하고 싶은 것과 아이디어가 산더미처럼 있지만, 모든 것이 흩어져 있고 정리되지 않습니다. 무엇을 먼저 시작해야 할지, 어떤 일을 먼저 처리해야 할지 우선순위를 정할 수 없습니다. 할 일 목록을 만들면 생활이 편해질 수 있습니다. 이 카드가 나타나면, 온라인 쇼핑을 매우 조심하세요 -- 무심코 좋아요와 공유를 연타하다가 정신 차려보면 계좌 잔고가 반으로 줄어 있을 수 있습니다."
        },
        "zh-CN": {
            quote: "沉迷幻想，不去现实世界遇见人",
            interpretation: "你有一大堆想法和想做的事，但一切看起来杂乱无章。你无法判断应该先从哪里开始，或者先处理哪项任务。制作一个待办清单可能会让你的生活轻松很多。如果出现这张牌，务必小心网上购物——你可能会不自觉地疯狂点赞和分享，等你回过神来，银行账户余额已经少了一半。"
        },
        "zh-TW": {
            quote: "沉迷幻想，不去現實世界遇見人",
            interpretation: "你有一大堆想法和想做的事，但一切看起來雜亂無章。你無法判斷應該先從哪裡開始，或者先處理哪項任務。製作一個待辦清單可能會讓你的生活輕鬆很多。如果出現這張牌，務必小心網上購物——你可能會不自覺地瘋狂按讚和分享，等你回過神來，銀行帳戶餘額已經少了一半。"
        },
        fr: { quote: "Trop de choix, difficulté à décider", interpretation: "Vous avez une tonne d'idées et de choses que vous voulez faire, mais tout semble éparpillé et désorganisé. Vous n'arrivez pas à prioriser par où commencer ni quelle tâche attaquer en premier. Une liste de tâches pourrait vous simplifier la vie. Si cette carte apparaît, faites très attention au shopping en ligne -- vous pourriez liker et partager sans réfléchir, et avant de vous en rendre compte, la moitié de votre solde bancaire aura disparu." }
    },
    "EIGHT OF CUPS": {
        en: {
            quote: "A time of letting go and starting a new path",
            interpretation: "Today you need to travel outside your usual location. On a day off, a beach trip or out-of-town plan might come up suddenly, or at the very least, there will be a reason for you to leave the house. On a workday, you might need to go meet clients outside, or the company has a social gathering that keeps you out late. Work-wise, a project you're responsible for may hit problems, forcing you to leave that project and start a new one. If you've been planning to resign, today is a good day to submit your resignation. In relationships, if you don't have plans, someone you've been talking to might invite you out late at night. But if you already have plans, be warned that the other party may be too busy to show up."
        },
        ja: {
            quote: "手放して新しい道を始める時",
            interpretation: "今日はいつもの場所から外出する必要があります。休日なら、海旅行や地方への計画が急に持ち上がるかもしれません。少なくとも家を出る理由ができるでしょう。仕事の日なら、外でクライアントと会う必要があったり、会社の懇親会で帰りが遅くなったりするかもしれません。仕事面では、担当しているプロジェクトに問題が生じ、そのプロジェクトから離れて新しいものを始めることになるかもしれません。退職を考えている方は、今日が退職届を出すのに良い日です。恋愛面では、予定がなければ、やり取りしている人から夜遅くに誘われるかもしれません。ただし、すでに予定がある場合は、相手が忙しすぎて来られない可能性があるので注意してください。"
        },
        ko: {
            quote: "놓아주고 새로운 길을 시작하는 시간",
            interpretation: "오늘은 평소 장소를 벗어나 이동해야 합니다. 휴일이라면, 바다 여행이나 지방 계획이 갑자기 생길 수 있고, 최소한 집을 나갈 이유가 생길 것입니다. 근무일이라면, 밖에서 고객을 만나야 하거나 회사 회식 때문에 늦게까지 밖에 있어야 할 수 있습니다. 업무 면에서는 담당하고 있는 프로젝트에 문제가 생겨, 그 프로젝트를 떠나 새로운 것을 시작해야 할 수 있습니다. 퇴사를 계획 중이라면, 오늘이 사직서를 제출하기 좋은 날입니다. 연애에서는 약속이 없다면, 대화하던 사람이 밤늦게 나오자고 할 수 있습니다. 하지만 이미 약속이 있다면, 상대방이 너무 바빠서 나타나지 못할 수 있으니 주의하세요."
        },
        "zh-CN": {
            quote: "放手并开始新道路的时期",
            interpretation: "今天你需要外出到平时活动范围以外的地方。如果是休息日，可能突然出现去海边或外地的计划，至少也会有让你出门的理由。如果是工作日，你可能需要外出见客户，或者公司有聚会让你很晚才回家。工作方面，你负责的项目可能遇到问题，迫使你离开原来的项目去开始新的。如果你一直在计划辞职，今天是提交辞呈的好日子。感情方面，如果你没有安排，聊天的对象可能会约你深夜出去。但如果你已经有安排了，要小心对方可能太忙而无法赴约。"
        },
        "zh-TW": {
            quote: "放手並開始新道路的時期",
            interpretation: "今天你需要外出到平時活動範圍以外的地方。如果是休息日，可能突然出現去海邊或外地的計劃，至少也會有讓你出門的理由。如果是工作日，你可能需要外出見客戶，或者公司有聚會讓你很晚才回家。工作方面，你負責的項目可能遇到問題，迫使你離開原來的項目去開始新的。如果你一直在計劃辭職，今天是提交辭呈的好日子。感情方面，如果你沒有安排，聊天的對象可能會約你深夜出去。但如果你已經有安排了，要小心對方可能太忙而無法赴約。"
        },
        fr: { quote: "S'éloigner pour chercher quelque chose de plus profond", interpretation: "Aujourd'hui, vous devez vous déplacer en dehors de votre lieu habituel. Un jour de repos, un voyage à la plage ou un plan en dehors de la ville pourrait se présenter soudainement, ou au minimum, il y aura une raison de sortir de chez vous. Un jour de travail, vous pourriez devoir aller voir des clients à l'extérieur, ou l'entreprise organise un événement social qui vous retiendra tard. Côté travail, un projet dont vous êtes responsable pourrait rencontrer des problèmes, vous obligeant à le quitter pour en commencer un nouveau. Si vous prévoyez de démissionner, aujourd'hui est un bon jour pour soumettre votre démission. Côté relations, si vous n'avez pas de plans, quelqu'un avec qui vous discutez pourrait vous inviter à sortir tard le soir. Mais si vous avez déjà des plans, attention : l'autre personne pourrait être trop occupée pour venir." }
    },
    "NINE OF CUPS": {
        en: {
            quote: "Meet a dating expert with good financial status",
            interpretation: "Today you'll encounter a self-centered and highly confident person. They might be a boss or client who thinks they have it all -- money and power. They'll expect everything to go exactly as they want, even when it's beyond what's possible. Work-wise, your work will get attention and praise, but no one may genuinely celebrate with you -- it's a somewhat lonely success. Or this card could mean you're looking for a new place to stay, such as a condo, rental room, or commercial space."
        },
        ja: {
            quote: "経済的に余裕のあるデートの達人に会う",
            interpretation: "今日はわがままで自信たっぷりな人に出会うでしょう。お金も権力もすべて持っていると思い込んでいる上司やクライアントかもしれません。たとえ実現不可能なことでも、すべてを自分の思い通りにすることを期待するでしょう。仕事面では、あなたの成果は注目と賞賛を受けますが、心から一緒に喜んでくれる人はいないかもしれません。少し孤独な成功です。あるいは、このカードはコンドミニアム、賃貸部屋、商業スペースなど、新しい住まいや場所を探していることを意味するかもしれません。"
        },
        ko: {
            quote: "경제적으로 여유 있는 데이트 전문가를 만남",
            interpretation: "오늘은 자기중심적이고 자신감이 높은 사람을 만나게 될 것입니다. 돈과 권력 등 모든 것을 갖추고 있다고 생각하는 상사나 고객일 수 있습니다. 불가능한 일이라도 모든 것이 자기 뜻대로 되기를 기대할 것입니다. 업무 면에서는 당신의 성과가 주목과 칭찬을 받겠지만, 진심으로 함께 기뻐해주는 사람은 없을 수 있습니다 -- 다소 외로운 성공입니다. 또는 이 카드는 콘도, 임대 방, 상업 공간 등 새로운 거처를 찾고 있다는 의미일 수 있습니다."
        },
        "zh-CN": {
            quote: "遇到经济状况好的约会专家",
            interpretation: "今天你会遇到一个自我中心且极度自信的人。可能是觉得自己什么都有的老板或客户——不管是钱还是权力。他们会期望一切按照自己的意愿进行，即使有些事情根本不可能实现。工作方面，你的成果会受到关注和称赞，但可能没有人真心为你庆祝——这是一种有些孤独的成功。或者这张牌也可能意味着你正在寻找新的住所，比如公寓、出租房或商业空间。"
        },
        "zh-TW": {
            quote: "遇到經濟狀況好的約會專家",
            interpretation: "今天你會遇到一個自我中心且極度自信的人。可能是覺得自己什麼都有的老闆或客戶——不管是錢還是權力。他們會期望一切按照自己的意願進行，即使有些事情根本不可能實現。工作方面，你的成果會受到關注和稱讚，但可能沒有人真心為你慶祝——這是一種有些孤獨的成功。或者這張牌也可能意味著你正在尋找新的住所，比如公寓、出租房或商業空間。"
        },
        fr: { quote: "Satisfaction et souhaits amoureux exaucés", interpretation: "Aujourd'hui, vous rencontrerez une personne égocentrique et très sûre d'elle. Il pourrait s'agir d'un patron ou d'un client qui pense tout avoir -- argent et pouvoir. Cette personne s'attendra à ce que tout se passe exactement comme elle le souhaite, même quand c'est irréalisable. Côté travail, vos réalisations attireront l'attention et les éloges, mais personne ne se réjouira sincèrement avec vous -- c'est un succès quelque peu solitaire. Ou bien cette carte pourrait signifier que vous cherchez un nouveau lieu de résidence, comme un appartement, une chambre en location ou un espace commercial." }
    },
    "TEN OF CUPS": {
        en: {
            quote: "Complete happiness, but beware of someone with a family",
            interpretation: "Today you need to focus on people -- whether it's household members, group members, page followers, clubs, or your team. There will be activities that bring everyone together for fun, exchanging ideas, and strengthening relationships. Or you might need to go somewhere with an event where many people gather. Today is a good day for building relationships and understanding between people."
        },
        ja: {
            quote: "完全な幸せ、でも家族持ちの人に注意",
            interpretation: "今日は人に焦点を当てる必要があります。家族、グループのメンバー、フォロワー、サークル、またはチームなど。みんなで一緒に楽しみ、意見を交換し、関係を深めるアクティビティがあるでしょう。または、多くの人が集まるイベントがある場所に行く必要があるかもしれません。今日は人と人との関係構築や相互理解を深めるのに良い日です。"
        },
        ko: {
            quote: "완전한 행복, 하지만 가족이 있는 사람 조심",
            interpretation: "오늘은 사람들에게 집중해야 합니다 -- 가족 구성원이든, 그룹 멤버든, 팔로워든, 동아리든, 팀이든. 모두가 함께 즐기고, 의견을 교환하며, 관계를 강화하는 활동이 있을 것입니다. 또는 많은 사람이 모이는 이벤트가 있는 곳에 가야 할 수도 있습니다. 오늘은 사람들 사이의 관계 구축과 상호 이해를 위한 좋은 날입니다."
        },
        "zh-CN": {
            quote: "完整的幸福，但小心有家庭的人",
            interpretation: "今天你需要把重心放在人际关系上——无论是家人、群组成员、粉丝、社团还是你的团队。会有活动让大家聚在一起开心交流、增进感情。或者你可能需要去一个有很多人聚集的活动场所。今天是建立人际关系和增进彼此了解的好日子。"
        },
        "zh-TW": {
            quote: "完整的幸福，但小心有家庭的人",
            interpretation: "今天你需要把重心放在人際關係上——無論是家人、群組成員、粉絲、社團還是你的團隊。會有活動讓大家聚在一起開心交流、增進感情。或者你可能需要去一個有很多人聚集的活動場所。今天是建立人際關係和增進彼此了解的好日子。"
        },
        fr: { quote: "Bonheur familial et amour accompli", interpretation: "Aujourd'hui, vous devez vous concentrer sur les gens -- que ce soit les membres de votre foyer, les membres d'un groupe, les abonnés de votre page, un club ou votre équipe. Il y aura des activités qui rassembleront tout le monde pour s'amuser, échanger des idées et renforcer les liens. Ou vous pourriez devoir vous rendre à un endroit où se tient un événement avec beaucoup de monde. Aujourd'hui est une bonne journée pour construire des relations et favoriser la compréhension mutuelle." }
    },
    "PAGE OF CUPS": {
        en: {
            quote: "A cute person with similar tastes",
            interpretation: "You'll meet a lovely person. They might be a Cancer, Scorpio, or Pisces. There's a good chance you could develop a relationship with them in the future, whether as a good friend or something more. Work-wise, a new junior will join the team -- they might be a bit slow but have good taste. Pink and blue will be important colors for today. On a day off, you might make plans with friends to have desserts, bubble tea, or seafood. For the spiritually inclined, if you're planning to release fish with friends today, remember to check the species and avoid disrupting the ecosystem."
        },
        ja: {
            quote: "似た趣味を持つかわいい人",
            interpretation: "素敵な人に出会うでしょう。蟹座、蠍座、または魚座の人かもしれません。将来、良い友人や恋人として関係を発展させられる可能性が高いです。仕事面では、新しい後輩がチームに加わります。少し仕事が遅いかもしれませんが、センスが良いです。ピンクとブルーが今日の重要な色になります。休日なら、友達とデザートやタピオカミルクティー、シーフードを食べに行く約束をするかもしれません。スピリチュアル志向の方は、今日友人と放生を計画しているなら、魚の種類を確認して生態系を壊さないようにしましょう。"
        },
        ko: {
            quote: "비슷한 취향을 가진 귀여운 사람",
            interpretation: "사랑스러운 사람을 만나게 될 것입니다. 게자리, 전갈자리, 또는 물고기자리일 수 있습니다. 앞으로 좋은 친구든 연인이든 관계를 발전시킬 가능성이 높습니다. 업무 면에서는 새로운 후배가 팀에 합류합니다 -- 조금 느릴 수 있지만 감각이 좋습니다. 분홍색과 파란색이 오늘의 중요한 색이 될 것입니다. 휴일이라면, 친구들과 디저트, 버블티, 또는 해산물을 먹으러 갈 약속을 잡을 수 있습니다. 영적인 것에 관심이 있는 분들은 오늘 친구들과 방생을 계획하고 있다면, 어종을 확인하고 생태계를 해치지 않도록 주의하세요."
        },
        "zh-CN": {
            quote: "有相似品味的可爱的人",
            interpretation: "你会遇到一个可爱的人。他们可能是巨蟹座、天蝎座或双鱼座。未来很有可能和他们发展关系，无论是好朋友还是恋人。工作方面，会有新人加入团队——他们可能做事慢一点，但品味很好。粉色和蓝色将是今天的重要颜色。如果是休息日，你可能会和朋友约着去吃甜点、珍珠奶茶或海鲜。对于有宗教信仰的人，如果今天计划和朋友一起放生，记得查看鱼的品种，避免破坏生态系统。"
        },
        "zh-TW": {
            quote: "有相似品味的可愛的人",
            interpretation: "你會遇到一個可愛的人。他們可能是巨蟹座、天蠍座或雙魚座。未來很有可能和他們發展關係，無論是好朋友還是戀人。工作方面，會有新人加入團隊——他們可能做事慢一點，但品味很好。粉色和藍色將是今天的重要顏色。如果是休息日，你可能會和朋友約著去吃甜點、珍珠奶茶或海鮮。對於有宗教信仰的人，如果今天計劃和朋友一起放生，記得查看魚的品種，避免破壞生態系統。"
        },
        fr: { quote: "Quelqu'un de mignon qui partage vos goûts", interpretation: "Vous rencontrerez une personne charmante. Elle pourrait être Cancer, Scorpion ou Poissons. Il y a de bonnes chances que vous développiez une relation avec elle à l'avenir, que ce soit comme bon ami ou quelque chose de plus. Côté travail, un nouveau junior rejoindra l'équipe -- il sera peut-être un peu lent mais aura bon goût. Le rose et le bleu seront des couleurs importantes aujourd'hui. Un jour de repos, vous pourriez prévoir avec des amis d'aller manger des desserts, du bubble tea ou des fruits de mer. Pour les personnes spirituelles, si vous prévoyez de libérer des poissons avec des amis aujourd'hui, n'oubliez pas de vérifier les espèces et d'éviter de perturber l'écosystème." }
    },
    "KNIGHT OF CUPS": {
        en: {
            quote: "Romantic but no clear direction",
            interpretation: "Today someone will come to visit you. The other person may have been missing you or intended to visit all along. For those without plans, today is a chill day -- treat yourself to desserts or bubble tea, go out for fresh air outside the city, take nice photos for social media. You might run into someone good-looking or a celebrity you admire. On a workday, an outside visitor may come to tour or visit the company, and you may need to welcome them, chat, or provide assistance."
        },
        ja: {
            quote: "ロマンチックだが方向性が不明確",
            interpretation: "今日は誰かがあなたを訪ねてきます。相手はあなたを恋しく思っていたか、前から訪問するつもりだったのかもしれません。予定がない方にとっては、今日はのんびりした日です。デザートやタピオカミルクティーで自分にご褒美をあげたり、郊外に出て新鮮な空気を吸ったり、SNS用の素敵な写真を撮ったり。イケメンや好きな有名人に偶然会えるかもしれません。仕事の日なら、外部の方が会社見学や訪問に来て、あなたが出迎えたり、対応したり、手助けしたりする必要があるかもしれません。"
        },
        ko: {
            quote: "로맨틱하지만 방향이 불분명",
            interpretation: "오늘은 누군가가 당신을 찾아올 것입니다. 상대방이 당신을 그리워했거나 원래부터 방문할 생각이었을 수 있습니다. 약속이 없는 분들에게 오늘은 여유로운 날입니다 -- 디저트나 버블티로 자신에게 보상을 주고, 도시 밖으로 나가 신선한 공기를 마시고, SNS에 올릴 예쁜 사진을 찍어보세요. 잘생긴 사람이나 좋아하는 연예인을 우연히 마주칠 수도 있습니다. 근무일이라면, 외부 방문객이 회사를 견학하거나 방문할 수 있어, 환영하고 대화하거나 도움을 제공해야 할 수 있습니다."
        },
        "zh-CN": {
            quote: "浪漫但没有明确的方向",
            interpretation: "今天会有人来找你。对方可能一直在想念你或本来就打算来看你。对于没有安排的人来说，今天是悠闲的一天——用甜点或珍珠奶茶犒赏自己，出城呼吸新鲜空气，拍好看的照片发社交媒体。你可能会偶遇帅哥美女或你喜欢的明星。如果是工作日，可能有外部人员来参观或拜访公司，你需要出面接待、交谈或提供帮助。"
        },
        "zh-TW": {
            quote: "浪漫但沒有明確的方向",
            interpretation: "今天會有人來找你。對方可能一直在想念你或本來就打算來看你。對於沒有安排的人來說，今天是悠閒的一天——用甜點或珍珠奶茶犒賞自己，出城呼吸新鮮空氣，拍好看的照片發社群媒體。你可能會偶遇帥哥美女或你喜歡的明星。如果是工作日，可能有外部人員來參觀或拜訪公司，你需要出面接待、交談或提供幫助。"
        },
        fr: { quote: "Quelqu'un de romantique mais sans direction claire", interpretation: "Aujourd'hui, quelqu'un viendra vous rendre visite. Cette personne vous manquait peut-être ou avait l'intention de venir depuis un moment. Pour ceux qui n'ont pas de plans, c'est une journée tranquille -- offrez-vous des desserts ou du bubble tea, sortez prendre l'air frais en dehors de la ville, prenez de belles photos pour les réseaux sociaux. Vous pourriez croiser quelqu'un de séduisant ou une célébrité que vous admirez. Un jour de travail, un visiteur extérieur pourrait venir pour une visite de l'entreprise, et vous devrez peut-être l'accueillir, discuter ou l'assister." }
    },
    "QUEEN OF CUPS": {
        en: {
            quote: "Already has someone in heart, hard to open up to new people",
            interpretation: "Today you want emotional support. You want someone to come comfort you without blaming you for what you've done, even if it wasn't the smartest move. If you're sure you're not in an emotional mood and your personality is definitely not the Queen of Cups type, then be careful -- a gentle, sweet woman who's a good listener may come to have influence over your partner. That woman doesn't have to be a mistress; she could be a close friend or even his mother."
        },
        ja: {
            quote: "すでに心に誰かがいて、新しい人に心を開きにくい",
            interpretation: "今日は精神的なサポートが欲しい日です。自分がしたことを責めずに慰めてくれる人がいてほしいと感じます。たとえそれが賢い判断ではなかったとしても。もしあなたが感情的な気分ではなく、自分の性格がクイーン・オブ・カップスタイプでは絶対にないと確信しているなら、注意してください。優しくて聞き上手な女性が、あなたのパートナーに影響力を持つようになるかもしれません。その女性は愛人とは限りません。親友や彼の母親かもしれません。"
        },
        ko: {
            quote: "이미 마음에 누군가가 있어 새로운 사람에게 마음을 열기 어려움",
            interpretation: "오늘은 정서적 지지가 필요한 날입니다. 당신이 한 일에 대해 비난하지 않고 위로해줄 누군가가 있었으면 합니다, 비록 그것이 현명한 선택이 아니었더라도. 만약 당신이 감정적인 상태가 아니며, 당신의 성격이 확실히 컵의 여왕 타입이 아니라면 조심하세요 -- 다정하고 상냥하며 경청을 잘하는 여성이 당신의 연인에게 영향력을 갖게 될 수 있습니다. 그 여성이 반드시 내연녀일 필요는 없습니다. 친한 친구이거나 그의 어머니일 수도 있습니다."
        },
        "zh-CN": {
            quote: "心里已有人，很难对新人敞开心扉",
            interpretation: "今天你渴望情感上的支持。你希望有人来安慰你，不指责你做过的事，即使那件事并不怎么明智。如果你确定自己没有处于情绪化的状态，而且你的性格绝对不是圣杯皇后类型，那就要当心——一个温柔体贴、善于倾听的女性可能会对你的伴侣产生影响。那个女人不一定是小三，也可能是亲密的朋友或他的母亲。"
        },
        "zh-TW": {
            quote: "心裡已有人，很難對新人敞開心扉",
            interpretation: "今天你渴望情感上的支持。你希望有人來安慰你，不指責你做過的事，即使那件事並不怎麼明智。如果你確定自己沒有處於情緒化的狀態，而且你的性格絕對不是聖杯皇后類型，那就要當心——一個溫柔體貼、善於傾聽的女性可能會對你的伴侶產生影響。那個女人不一定是小三，也可能是親密的朋友或他的母親。"
        },
        fr: { quote: "Quelqu'un d'émotionnellement intelligent qui comprend vos sentiments", interpretation: "Aujourd'hui, vous avez besoin de soutien émotionnel. Vous aimeriez que quelqu'un vienne vous réconforter sans vous blâmer pour ce que vous avez fait, même si ce n'était pas la décision la plus judicieuse. Si vous êtes sûr(e) de ne pas être d'humeur émotive et que votre personnalité n'est absolument pas du type Reine de Coupes, alors soyez prudent(e) -- une femme douce, attentionnée et à l'écoute pourrait gagner de l'influence sur votre partenaire. Cette femme n'est pas forcément une maîtresse ; ce pourrait être une amie proche ou même sa mère." }
    },
    "KING OF CUPS": {
        en: {
            quote: "Experienced person who may be talking to multiple people",
            interpretation: "You'll meet a \"daddy\" -- and not in the literal sense. He might come in the form of a colleague, senior, or boss. You'll be charmed by him, even though he isn't trying to charm you on purpose. Or it could mean you meet someone who's a great listener, ready to understand, listen, and give advice. This person might be an ex who's been absent for a long time. Their return may not mean anything more than concern. Guard your heart carefully. On a day off, you might meet a charming man at a bar or pub. Drinks and a good atmosphere might make you let your guard down. Don't fall for this person -- they're not as simple as they seem."
        },
        ja: {
            quote: "複数の人と話しているかもしれない経験豊富な人",
            interpretation: "「ダディ」に出会うでしょう。文字通りの意味ではありません。同僚、先輩、上司の形で現れるかもしれません。彼が意図的に魅力を振りまいているわけではないのに、あなたは彼の魅力にハマるでしょう。あるいは、理解し、聞き、アドバイスをくれる聞き上手な人に出会うという意味かもしれません。この人は長い間離れていた元恋人かもしれません。彼の復帰は心配以上の意味はないかもしれません。自分の心をしっかり守ってください。休日なら、バーやパブで魅力的な男性に出会うかもしれません。お酒と良い雰囲気で油断してしまうかもしれません。この人に惚れないでください。見た目ほど単純な人ではありません。"
        },
        ko: {
            quote: "여러 사람과 대화할 수 있는 경험 많은 사람",
            interpretation: "\"대디\"를 만나게 될 것입니다 -- 글자 그대로의 의미는 아닙니다. 동료, 선배, 상사의 형태로 나타날 수 있습니다. 그가 일부러 매력을 뿌리는 것은 아닌데도 당신은 그의 매력에 빠질 것입니다. 또는 이해하고 들어주며 조언해줄 준비가 된 훌륭한 경청자를 만난다는 의미일 수 있습니다. 이 사람은 오랫동안 떠나 있었던 전 애인일 수 있습니다. 그의 복귀는 걱정 이상의 의미가 없을 수 있습니다. 마음을 잘 지키세요. 휴일이라면, 바나 펍에서 매력적인 남성을 만날 수 있습니다. 술과 좋은 분위기가 당신의 경계심을 풀게 할 수 있습니다. 이 사람에게 빠지지 마세요 -- 보이는 것만큼 단순한 사람이 아닙니다."
        },
        "zh-CN": {
            quote: "经验丰富的人，可能同时和多人聊天",
            interpretation: "你会遇到一个\"daddy\"——不是字面上的意思。他可能以同事、前辈或老板的身份出现。即使他并不是故意施展魅力，你也会被他迷住。或者这可能意味着你遇到了一个善于倾听的人，愿意理解你、聆听你并给出建议。这个人可能是一个消失很久的前任。他的回归可能只是出于关心，没有其他深意。好好守护自己的心。如果是休息日，你可能会在酒吧遇到一个迷人的男人。美酒和好氛围可能让你放下戒备。别爱上这个人——他没有看起来那么简单。"
        },
        "zh-TW": {
            quote: "經驗豐富的人，可能同時和多人聊天",
            interpretation: "你會遇到一個\"daddy\"——不是字面上的意思。他可能以同事、前輩或老闆的身份出現。即使他並不是故意施展魅力，你也會被他迷住。或者這可能意味著你遇到了一個善於傾聽的人，願意理解你、聆聽你並給出建議。這個人可能是一個消失很久的前任。他的回歸可能只是出於關心，沒有其他深意。好好守護自己的心。如果是休息日，你可能會在酒吧遇到一個迷人的男人。美酒和好氛圍可能讓你放下戒備。別愛上這個人——他沒有看起來那麼簡單。"
        },
        fr: { quote: "Quelqu'un de mature émotionnellement et digne de confiance", interpretation: "Vous allez rencontrer un « daddy » -- pas au sens littéral. Il pourrait se présenter sous la forme d'un collègue, d'un aîné ou d'un patron. Vous serez charmé(e) par lui, même s'il n'essaie pas de vous séduire volontairement. Ou cela pourrait signifier que vous rencontrez quelqu'un qui sait écouter, prêt à comprendre, écouter et conseiller. Cette personne pourrait être un ex disparu depuis longtemps. Son retour ne signifie peut-être rien de plus que de l'inquiétude. Protégez bien votre cœur. Un jour de repos, vous pourriez rencontrer un homme charmant dans un bar ou un pub. Les boissons et la bonne ambiance pourraient vous faire baisser la garde. Ne tombez pas amoureux de cette personne -- elle n'est pas aussi simple qu'elle en a l'air." }
    },
    "ACE OF SWORDS": {
        en: {
            quote: "Time to cut ties with old love, not start with someone new",
            interpretation: "If you've been dealing with a problem that felt impossible to manage, today someone will step forward to help you resolve it. Alternatively, you yourself may receive a document or an appointment assigning you responsibility for a certain task. This appointment will give you enough authority to go and fix those lingering problems.\n\nIf it's not work-related, you might receive a notification from an app on your phone. It could be a debt payment reminder, exam results, a job application outcome, a warning, or a legal document. The notification you receive could be either good news or bad news."
        },
        ja: {
            quote: "古い愛と縁を切る時、新しい人と始める時ではない",
            interpretation: "最近、手に負えない問題を抱えていたなら、今日は誰かが解決を手伝いに名乗り出てくれるでしょう。あるいは、あなた自身が書類を受け取ったり、何らかの業務を担当する任命を受けるかもしれません。この任命により、それらの問題を解決するのに十分な権限が与えられます。\n\n仕事に関係ない場合は、スマートフォンのアプリから通知が届くかもしれません。借金の支払いリマインダー、試験結果、求職の結果、警告、法的書類などが考えられます。届く通知は良い知らせかもしれませんし、悪い知らせかもしれません。"
        },
        ko: {
            quote: "옛 사랑과 인연을 끊을 때, 새로운 사람과 시작할 때가 아님",
            interpretation: "최근 감당하기 어려운 문제에 직면해 있었다면, 오늘은 누군가가 나서서 문제 해결을 도와줄 것입니다. 또는 당신 스스로 서류를 받거나 특정 업무를 맡는 임명을 받을 수 있습니다. 이번 임명은 그 문제들을 해결하기에 충분한 권한을 부여할 것입니다.\n\n업무와 관련이 없다면, 스마트폰 앱에서 알림을 받을 수 있습니다. 채무 상환 알림, 시험 결과, 취업 지원 결과, 경고 또는 법적 서류일 수 있습니다. 받는 알림은 좋은 소식일 수도 있고 나쁜 소식일 수도 있습니다."
        },
        "zh-CN": {
            quote: "与旧爱断绝的时候，不是与新人开始的时候",
            interpretation: "如果你最近遇到了难以处理的问题，今天会有人主动帮你解决。或者你自己会收到文件或任命，让你负责某项任务。这次任命将赋予你足够的权力去解决那些悬而未决的问题。\n\n如果不是工作方面的事，你可能会收到手机应用的通知。可能是还款提醒、考试成绩、求职结果、警告或法律文件。收到的通知可能是好消息，也可能是坏消息。"
        },
        "zh-TW": {
            quote: "與舊愛斷絕的時候，不是與新人開始的時候",
            interpretation: "如果你最近遇到了難以處理的問題，今天會有人主動幫你解決。或者你自己會收到文件或任命，讓你負責某項任務。這次任命將賦予你足夠的權力去解決那些懸而未決的問題。\n\n如果不是工作方面的事，你可能會收到手機應用程式的通知。可能是還款提醒、考試成績、求職結果、警告或法律文件。收到的通知可能是好消息，也可能是壞消息。"
        },
        fr: { quote: "Clarté mentale et nouveau départ décisif", interpretation: "Si vous avez récemment fait face à un problème qui semblait impossible à gérer, quelqu'un se proposera aujourd'hui pour vous aider à le résoudre. Sinon, vous pourriez vous-même recevoir un document ou une nomination vous confiant la responsabilité d'une certaine tâche. Cette nomination vous donnera suffisamment d'autorité pour régler ces problèmes en suspens.\n\nS'il ne s'agit pas du travail, vous pourriez recevoir une notification d'une application sur votre téléphone. Cela pourrait être un rappel de paiement, des résultats d'examen, une réponse à une candidature, un avertissement ou un document juridique. La notification reçue peut être une bonne ou une mauvaise nouvelle." }
    },
    "TWO OF SWORDS": {
        en: {
            quote: "Exhausted, not wanting to go out and meet anyone",
            interpretation: "Your main issue today will be communication problems. Your phone might run out of battery at a critical moment, or you may not be able to reach a business partner, a contract party, or someone you urgently need to contact today.\n\nIn relationships, you won't be able to reach your partner or the person you've been talking to. They'll go silent during the day, leaving you feeling anxious. If you're going through a rough patch, watch out for getting blocked on messaging apps today. It could also mean you've lost your retainer or glasses, or you have a dentist appointment."
        },
        ja: {
            quote: "疲れ果てて、外出して誰かに会いたくない",
            interpretation: "今日の主な問題はコミュニケーションに関することです。大事な場面でスマートフォンの充電が切れるかもしれませんし、取引先や契約相手、今日中に連絡を取る必要がある人と連絡が取れないかもしれません。\n\n恋愛面では、恋人や気になる相手と連絡が取れなくなります。日中ずっと音信不通になり、あなたは気が気でなくなるでしょう。関係がぎくしゃくしている人は、今日メッセージアプリでブロックされないよう注意してください。あるいは、リテーナーやメガネを紛失したり、歯医者の予約があるという意味かもしれません。"
        },
        ko: {
            quote: "지쳐서 나가서 누구도 만나고 싶지 않음",
            interpretation: "오늘 당신이 직면할 주요 문제는 소통과 관련된 것입니다. 중요한 순간에 휴대폰 배터리가 다 될 수 있고, 거래처나 계약 상대방, 오늘 반드시 연락해야 하는 사람과 연락이 닿지 않을 수 있습니다.\n\n관계에서는 연인이나 대화 중인 상대와 연락이 되지 않을 것입니다. 상대방이 낮 동안 연락이 끊겨 당신을 초조하게 만들 것입니다. 사이가 좋지 않은 시기라면 오늘 메신저에서 차단당하지 않도록 조심하세요. 또는 리테이너나 안경을 잃어버리거나 치과 예약이 있다는 의미일 수도 있습니다."
        },
        "zh-CN": {
            quote: "筋疲力尽，不想出门见任何人",
            interpretation: "你今天面临的主要问题是沟通方面的。你的手机可能在关键时刻没电，或者你无法联系到合作伙伴、签约方或今天必须联系的人。\n\n感情方面，你将无法联系到恋人或正在聊天的对象。对方白天会突然失联，让你感到焦虑不安。如果你们正处于关系紧张期，今天要小心被对方在通讯软件上拉黑。也可能意味着你弄丢了牙套或眼镜，或者有牙医预约。"
        },
        "zh-TW": {
            quote: "筋疲力盡，不想出門見任何人",
            interpretation: "你今天面臨的主要問題是溝通方面的。你的手機可能在關鍵時刻沒電，或者你無法聯繫到合作夥伴、簽約方或今天必須聯繫的人。\n\n感情方面，你將無法聯繫到戀人或正在聊天的對象。對方白天會突然失聯，讓你感到焦慮不安。如果你們正處於關係緊張期，今天要小心被對方在通訊軟體上封鎖。也可能意味著你弄丟了牙套或眼鏡，或者有牙醫預約。"
        },
        fr: { quote: "Indécision et choix difficile à faire", interpretation: "Votre principal problème aujourd'hui sera lié à la communication. Votre téléphone pourrait tomber en panne de batterie à un moment critique, ou vous pourriez ne pas réussir à joindre un partenaire commercial, un contractant ou quelqu'un que vous devez absolument contacter aujourd'hui.\n\nCôté relations, vous ne pourrez pas joindre votre partenaire ou la personne avec qui vous discutez. Cette personne restera silencieuse pendant la journée, vous laissant anxieux(se). Si vous traversez une période tendue, attention à ne pas vous faire bloquer sur les messageries aujourd'hui. Cela pourrait aussi signifier que vous avez perdu votre appareil dentaire ou vos lunettes, ou que vous avez un rendez-vous chez le dentiste." }
    },
    "THREE OF SWORDS": {
        en: {
            quote: "May see an ex with someone new",
            interpretation: "Today you should watch out for heavy rain or going to a place where the environment doesn't match your outfit. At work, be careful about having conflicts with senior colleagues. The problem may stem from incompatible working styles between you and them, or a strained relationship with coworkers.\n\nIn relationships, your partner or crush may be feeling unwell and dealing with problems, or you yourself might be having issues with them. Today requires extra caution with communication, because words spoken carelessly can hurt the other person's feelings, and you can never take them back."
        },
        ja: {
            quote: "元カレ・元カノが誰かと一緒にいるのを見るかも",
            interpretation: "今日は大雨に注意が必要です。また、服装にそぐわない場所に行くことにも気をつけてください。仕事面では、上司や年上の同僚との対立に注意が必要です。問題はあなたと相手の仕事のやり方が合わないことや、同僚との関係がうまくいっていないことが原因かもしれません。\n\n恋愛面では、恋人や好きな人が体調を崩して問題を抱えているか、あなた自身が相手との間に問題を抱えているかもしれません。今日はコミュニケーションに特に注意が必要です。不用意に発した言葉は相手の心を傷つけ、一度口にした言葉は取り消すことができないからです。"
        },
        ko: {
            quote: "전 애인이 새 사람과 있는 것을 볼 수 있음",
            interpretation: "오늘은 폭우를 조심하거나, 복장에 맞지 않는 환경의 장소에 가는 것을 주의해야 합니다. 업무에서는 윗사람과의 갈등에 주의하세요. 문제는 당신과 그들 사이의 업무 방식 차이에서 비롯되거나, 동료와의 좋지 않은 관계 때문일 수 있습니다.\n\n관계에서는 연인이나 좋아하는 사람이 아프거나 문제에 직면해 있을 수 있고, 아니면 당신 자신이 그 사람과 문제가 있을 수 있습니다. 오늘은 소통에 각별히 주의해야 합니다. 무심코 내뱉은 말이 상대방의 마음을 다치게 할 수 있고, 한번 뱉은 말은 주워 담을 수 없기 때문입니다."
        },
        "zh-CN": {
            quote: "可能看到前任和新人在一起",
            interpretation: "今天要注意大雨，或者去到与你穿着不相称的场所。工作上要小心与上级发生冲突。问题可能源于你和对方工作方式不合拍，或者你与同事之间关系不太好。\n\n感情方面，你的恋人或暗恋对象可能身体不适正在面对困难，或者是你自己和对方之间出了问题。今天需要格外注意沟通，因为说出去的话可能会伤害对方的心，而且覆水难收。"
        },
        "zh-TW": {
            quote: "可能看到前任和新人在一起",
            interpretation: "今天要注意大雨，或者去到與你穿著不相稱的場所。工作上要小心與上級發生衝突。問題可能源於你和對方工作方式不合拍，或者你與同事之間關係不太好。\n\n感情方面，你的戀人或暗戀對象可能身體不適正在面對困難，或者是你自己和對方之間出了問題。今天需要格外注意溝通，因為說出去的話可能會傷害對方的心，而且覆水難收。"
        },
        fr: { quote: "Chagrin d'amour et douleur émotionnelle", interpretation: "Aujourd'hui, méfiez-vous de la pluie battante ou des endroits dont l'environnement ne correspond pas à votre tenue. Au travail, soyez prudent(e) face aux conflits avec vos supérieurs. Le problème peut venir de méthodes de travail incompatibles entre vous et eux, ou d'une relation tendue avec vos collègues.\n\nCôté relations, votre partenaire ou la personne qui vous plaît pourrait être malade et faire face à des difficultés, ou c'est vous-même qui avez un problème avec cette personne. Aujourd'hui, la prudence est de mise en matière de communication, car les mots prononcés à la légère peuvent blesser l'autre, et on ne peut jamais les reprendre." }
    },
    "FOUR OF SWORDS": {
        en: {
            quote: "Time to rest and take care of your health",
            interpretation: "In general, you need to be careful about oversleeping today, and watch out for health issues. You may have just recovered from an illness. At work, you're feeling disheartened about your current job, partly because of coworkers, or you may need to switch to a new team.\n\nIn relationships, your partner or the person you've been talking to might go silent all day, possibly because their phone died or they put it on silent while sleeping."
        },
        ja: {
            quote: "休息して健康に気をつける時",
            interpretation: "一般的な事として、今日は寝坊に注意が必要です。健康面にも気をつけてください。病気から回復したばかりかもしれません。仕事面では、今の仕事に対してやる気を失っています。一部は同僚が原因かもしれませんし、新しいチームに異動する必要があるかもしれません。\n\n恋愛面では、恋人や気になる相手が一日中音信不通になるかもしれません。バッテリーが切れたか、寝ている間にサイレントモードにしているのかもしれません。"
        },
        ko: {
            quote: "휴식하고 건강을 돌볼 시간",
            interpretation: "일반적으로 오늘은 늦잠을 자지 않도록 주의해야 하며, 건강 문제에도 신경 써야 합니다. 아픈 후 막 회복한 상태일 수 있습니다. 업무에서는 현재 하고 있는 일에 의욕을 잃은 상태입니다. 부분적으로는 동료 때문이거나, 새로운 팀으로 옮겨야 할 수도 있습니다.\n\n관계에서는 연인이나 대화 중인 상대가 하루 종일 연락이 없을 수 있습니다. 배터리가 다 됐거나 자는 동안 무음으로 해놓았기 때문일 수 있습니다."
        },
        "zh-CN": {
            quote: "休息和照顾健康的时候",
            interpretation: "总体来说，今天要注意别睡过头，也要注意健康问题。你可能刚从一场病中恢复过来。工作方面，你对目前的工作感到心灰意冷，部分原因可能来自同事，或者你可能需要换到新的团队。\n\n感情方面，你的恋人或聊天对象可能一整天都失联，可能是因为手机没电了，或者睡觉时开了静音。"
        },
        "zh-TW": {
            quote: "休息和照顧健康的時候",
            interpretation: "總體來說，今天要注意別睡過頭，也要注意健康問題。你可能剛從一場病中恢復過來。工作方面，你對目前的工作感到心灰意冷，部分原因可能來自同事，或者你可能需要換到新的團隊。\n\n感情方面，你的戀人或聊天對象可能一整天都失聯，可能是因為手機沒電了，或者睡覺時開了靜音。"
        },
        fr: { quote: "Repos et récupération après une période difficile", interpretation: "De manière générale, attention à ne pas dormir trop tard aujourd'hui, et surveillez votre santé. Vous venez peut-être tout juste de vous remettre d'une maladie. Au travail, vous vous sentez découragé(e) par votre poste actuel, en partie à cause de vos collègues, ou vous devrez peut-être changer d'équipe.\n\nCôté relations, votre partenaire ou la personne avec qui vous discutez pourrait rester silencieux(se) toute la journée, peut-être parce que son téléphone est déchargé ou en mode silencieux pendant son sommeil." }
    },
    "FIVE OF SWORDS": {
        en: {
            quote: "May meet someone who just broke up",
            interpretation: "If you have plans with someone today, there's a good chance the other person will cancel due to unforeseen circumstances. They might call to cancel shortly before the scheduled time. But even after they cancel on you, you still intend to carry on with your original plans by inviting someone who just happens to be available as a companion.\n\nAt work, team members may have disagreements. Some people might not show up for a meeting, or unexpected circumstances may prevent you or your teammates from staying through the entire meeting."
        },
        ja: {
            quote: "別れたばかりの人に会うかも",
            interpretation: "今日誰かと予定があるなら、相手がやむを得ない事情でキャンセルする可能性が高いです。予定時間の直前に電話でキャンセルしてくるかもしれません。しかし、キャンセルされても、あなたは元の計画通りに過ごすつもりで、たまたま暇にしている誰かを誘って一緒に過ごすでしょう。\n\n仕事面では、チームメンバー間で意見の食い違いがあるかもしれません。会議に出席しない人がいたり、予期せぬ事態であなたやチームメイトが会議に最後までいられなくなるかもしれません。"
        },
        ko: {
            quote: "막 헤어진 사람을 만날 수 있음",
            interpretation: "오늘 누군가와 약속이 있다면, 상대방이 불가피한 사정으로 약속을 취소할 가능성이 높습니다. 약속 시간 직전에 전화로 취소할 수도 있습니다. 하지만 상대가 약속을 취소하더라도 당신은 원래 계획대로 진행하면서, 우연히 시간이 되는 누군가를 동행으로 초대할 것입니다.\n\n업무에서는 팀원들 간에 의견 충돌이 있을 수 있습니다. 회의에 참석하지 않는 사람이 있거나, 예상치 못한 상황으로 당신이나 팀원이 회의에 끝까지 참석하지 못할 수 있습니다."
        },
        "zh-CN": {
            quote: "可能遇到刚分手的人",
            interpretation: "如果你今天和人有约，对方很可能会因为不可抗力的原因爽约。他们可能在约定时间前不久打电话取消。但即使被放了鸽子，你仍然打算按原计划行动，顺便拉上一个刚好有空的人一起。\n\n工作方面，团队成员可能意见不一致。有人可能不会出席会议，或者突发状况导致你或团队成员无法坚持参加完整场会议。"
        },
        "zh-TW": {
            quote: "可能遇到剛分手的人",
            interpretation: "如果你今天和人有約，對方很可能會因為不可抗力的原因爽約。他們可能在約定時間前不久打電話取消。但即使被放了鴿子，你仍然打算按原計劃行動，順便拉上一個剛好有空的人一起。\n\n工作方面，團隊成員可能意見不一致。有人可能不會出席會議，或者突發狀況導致你或團隊成員無法堅持參加完整場會議。"
        },
        fr: { quote: "Conflit et victoire amère en amour", interpretation: "Si vous avez des plans avec quelqu'un aujourd'hui, il y a de fortes chances que l'autre personne annule pour des raisons imprévues. Elle pourrait appeler pour annuler peu avant l'heure prévue. Mais même après cette annulation, vous avez l'intention de poursuivre vos plans initiaux en invitant quelqu'un qui se trouve être disponible.\n\nAu travail, les membres de l'équipe pourraient avoir des désaccords. Certains pourraient ne pas se présenter à une réunion, ou des circonstances imprévues pourraient vous empêcher, vous ou vos coéquipiers, de rester jusqu'à la fin de la réunion." }
    },
    "SIX OF SWORDS": {
        en: {
            quote: "May date at the beach or meet someone from far away",
            interpretation: "Today you'll have transportation issues starting from the morning. Watch out for rain, traffic jams, or flooding at the end of your street that prevents you from getting to work. There might be a trip by water today, or a coworker may ask for a ride home with you.\n\nAt work, there's a selfish person in the office. They might be taking advantage of others, creating problems that you and your team can't solve. You're starting to feel frustrated with working without a clear direction, constantly fixing things as you go. You feel like you're carrying the whole team. You keep telling yourself every minute to just let this project end, and after this you'll start looking for a new job."
        },
        ja: {
            quote: "ビーチでデートか遠くの人に会うかも",
            interpretation: "今日は朝から交通に関する問題が発生します。雨、渋滞、路地の入り口の浸水で出勤できなくなることに注意してください。今日は水上移動があるかもしれませんし、同僚が一緒に車で帰ることをお願いしてくるかもしれません。\n\n仕事面では、職場に自分勝手な人がいます。他人を利用して、あなたとチームが解決できない問題を作り出しているかもしれません。明確な方向性もないまま、問題を見つけてはその都度修正する仕事のやり方にイライラし始めています。自分一人でチームを支えている気がしています。毎分「この仕事が早く終わればいい」と自分に言い聞かせ、この後は新しい仕事を探し始めるつもりです。"
        },
        ko: {
            quote: "해변에서 데이트하거나 먼 곳의 사람을 만날 수 있음",
            interpretation: "오늘은 아침부터 교통 문제가 있을 것입니다. 비, 교통 체증, 골목 입구 침수로 출근이 어려울 수 있으니 조심하세요. 오늘 수상 이동이 있거나, 동료가 함께 차를 태워달라고 부탁할 수 있습니다.\n\n업무에서는 직장에 이기적인 사람이 있습니다. 남의 노력을 착취하며 당신과 팀이 해결할 수 없는 문제를 만들고 있을 수 있습니다. 명확한 방향 없이 일하면서 그때그때 문제를 고치는 것에 짜증이 나기 시작했습니다. 혼자서 팀을 떠받치고 있다는 느낌이 듭니다. 매 순간 '이 프로젝트가 빨리 끝났으면' 하고 되뇌이며, 이 후에는 새 직장을 찾기 시작할 것입니다."
        },
        "zh-CN": {
            quote: "可能在海边约会或遇到远方的人",
            interpretation: "今天从早上开始就会有交通问题。注意下雨、堵车或巷口积水导致无法上班。今天可能会有水上出行，或者同事会请求搭你的车回家。\n\n工作方面，办公室里有个自私的人。他们可能在占别人便宜，制造出你和团队无法解决的问题。你开始对没有明确方向、边做边修的工作方式感到烦躁。你觉得自己在扛着整个团队。你每分钟都在心里念叨着让这个项目赶紧结束吧，之后就要开始找新工作了。"
        },
        "zh-TW": {
            quote: "可能在海邊約會或遇到遠方的人",
            interpretation: "今天從早上開始就會有交通問題。注意下雨、塞車或巷口積水導致無法上班。今天可能會有水上出行，或者同事會請求搭你的車回家。\n\n工作方面，辦公室裡有個自私的人。他們可能在佔別人便宜，製造出你和團隊無法解決的問題。你開始對沒有明確方向、邊做邊修的工作方式感到煩躁。你覺得自己在扛著整個團隊。你每分鐘都在心裡念叨著讓這個專案趕快結束吧，之後就要開始找新工作了。"
        },
        fr: { quote: "Transition vers des eaux plus calmes", interpretation: "Aujourd'hui, vous aurez des problèmes de transport dès le matin. Attention à la pluie, aux embouteillages ou aux inondations au bout de votre rue qui pourraient vous empêcher d'aller travailler. Il pourrait y avoir un trajet par voie d'eau aujourd'hui, ou un collègue pourrait vous demander de le raccompagner.\n\nAu travail, il y a une personne égoïste au bureau. Elle pourrait exploiter les autres et créer des problèmes que vous et votre équipe n'arrivez pas à résoudre. Vous commencez à être frustré(e) de travailler sans direction claire, à réparer les choses au fur et à mesure. Vous avez l'impression de porter toute l'équipe. Vous vous répétez chaque minute que ce projet doit se terminer, et qu'après cela vous commencerez à chercher un nouveau travail." }
    },
    "SEVEN OF SWORDS": {
        en: {
            quote: "Beware of players who juggle multiple people",
            interpretation: "Today you may have a task that needs to be done quietly, such as going to a job interview at a new company or exploring new opportunities while your current work isn't finished yet. Sometimes circumstances force you to start a new project while the old one isn't wrapped up, requiring you to secretly split your time and attention between both.\n\nIf you brought work home the night before, today some important documents may have been left behind, causing your work to stall or forcing you to make a trip back to get them."
        },
        ja: {
            quote: "複数の人を同時に扱うプレイヤーに注意",
            interpretation: "今日はこっそりとこなさなければならない任務があるかもしれません。例えば、新しい会社の面接に行ったり、現在の仕事がまだ終わっていないのに新しい機会を探したりすることです。時には状況が、古いプロジェクトが片付いていないのに新しいプロジェクトを始めざるを得なくし、こっそりと両方に時間と注意を分ける必要があります。\n\n前の晩に仕事を家に持ち帰っていた場合、今日は重要な書類の一部を忘れてきてしまい、仕事が行き詰まったり、取りに戻るために時間を費やさなければならないかもしれません。"
        },
        ko: {
            quote: "여러 사람을 동시에 만나는 바람둥이 조심",
            interpretation: "오늘은 조용히 처리해야 할 일이 있을 수 있습니다. 예를 들어 새 회사의 면접을 보러 가거나, 현재 업무가 아직 끝나지 않은 상태에서 새로운 기회를 모색하는 것입니다. 때로는 상황이 이전 프로젝트가 마무리되지 않은 상태에서 새 프로젝트를 시작하도록 압박하여, 두 가지 일 사이에서 몰래 시간과 주의를 나눠야 합니다.\n\n전날 밤 일을 집에 가져갔다면, 오늘 중요한 서류 일부를 두고 와서 업무가 차질을 빚거나 다시 가져오러 돌아가야 할 수 있습니다."
        },
        "zh-CN": {
            quote: "小心同时和多人约会的花心人",
            interpretation: "今天你可能有需要悄悄进行的任务，比如去新公司面试，或者在当前工作还没完成的情况下寻找新机会。有时候情况会迫使你在旧项目还没收尾的时候就开始新项目，需要暗中在两者之间分配时间和精力。\n\n如果你前天晚上把工作带回了家，今天可能有些重要文件被遗忘了，导致工作受阻或者不得不花时间回去拿。"
        },
        "zh-TW": {
            quote: "小心同時和多人約會的花心人",
            interpretation: "今天你可能有需要悄悄進行的任務，比如去新公司面試，或者在目前工作還沒完成的情況下尋找新機會。有時候情況會迫使你在舊專案還沒收尾的時候就開始新專案，需要暗中在兩者之間分配時間和精力。\n\n如果你前天晚上把工作帶回了家，今天可能有些重要文件被遺忘了，導致工作受阻或者不得不花時間回去拿。"
        },
        fr: { quote: "Tromperie ou secrets en amour", interpretation: "Aujourd'hui, vous pourriez avoir une mission à accomplir discrètement, comme aller passer un entretien d'embauche dans une nouvelle entreprise ou explorer de nouvelles opportunités alors que votre travail actuel n'est pas encore terminé. Parfois, les circonstances vous obligent à démarrer un nouveau projet alors que l'ancien n'est pas bouclé, vous forçant à partager secrètement votre temps et votre attention entre les deux.\n\nSi vous avez ramené du travail à la maison la veille, aujourd'hui certains documents importants pourraient avoir été oubliés, bloquant votre travail ou vous obligeant à faire un aller-retour pour les récupérer." }
    },
    "EIGHT OF SWORDS": {
        en: {
            quote: "Stuck in the past, can't move on",
            interpretation: "Today you may feel like you're facing a problem with no way out. Even though you can see possible solutions, you might not be ready to make changes, because the familiarity of your current situation feels safer. On a day like this, asking others for help may be a better option than carrying the burden alone.\n\nHealth-wise, you may feel fatigued, have a headache, or feel unprepared to face the work waiting for you. If possible, tackle important tasks while your body and mind are still fresh. Don't let yourself end up working late into the night."
        },
        ja: {
            quote: "過去に囚われて、前に進めない",
            interpretation: "今日は出口のない問題に直面しているように感じるかもしれません。解決策が見えていても、現状に慣れている安心感から、変化を起こす準備ができていないかもしれません。こんな日は、一人で問題を抱え込むよりも、他の人に助けを求める方が良い選択かもしれません。\n\n健康面では、疲労感、頭痛を感じたり、待っている仕事に向き合う準備ができていないと感じるかもしれません。できるだけ体と心がまだ元気なうちに重要な仕事に取り組みましょう。深夜まで働くことにならないようにしてください。"
        },
        ko: {
            quote: "과거에 갇혀 앞으로 나아갈 수 없음",
            interpretation: "오늘은 해결책이 없는 문제에 직면한 것 같은 느낌이 들 수 있습니다. 해결 방법이 보이더라도 현재 상황의 익숙함이 더 안전하게 느껴져 변화를 줄 준비가 안 되어 있을 수 있습니다. 이런 날에는 혼자 짐을 지는 것보다 다른 사람에게 도움을 구하는 것이 더 나은 선택일 수 있습니다.\n\n건강 면에서는 피로감, 두통을 느끼거나 기다리고 있는 업무를 마주할 준비가 안 될 수 있습니다. 가능하다면 몸과 마음이 아직 상쾌할 때 중요한 일을 처리하세요. 밤늦게까지 일하는 상황이 되지 않도록 하세요."
        },
        "zh-CN": {
            quote: "困在过去，无法前进",
            interpretation: "今天你可能觉得自己正面对一个无路可走的问题。虽然能看到解决办法，但可能还没准备好做出改变，因为对现状的熟悉感让你觉得更安全。在这样的日子里，向别人寻求帮助可能比独自承受问题更好。\n\n健康方面，你可能感到疲惫、头痛，或者没有准备好面对等待你的工作。如果可以的话，趁身体和精神还清醒的时候处理重要的事情。不要让自己陷入熬夜加班的境地。"
        },
        "zh-TW": {
            quote: "困在過去，無法前進",
            interpretation: "今天你可能覺得自己正面對一個無路可走的問題。雖然能看到解決辦法，但可能還沒準備好做出改變，因為對現狀的熟悉感讓你覺得更安全。在這樣的日子裡，向別人尋求幫助可能比獨自承受問題更好。\n\n健康方面，你可能感到疲憊、頭痛，或者沒有準備好面對等待你的工作。如果可以的話，趁身體和精神還清醒的時候處理重要的事情。不要讓自己陷入熬夜加班的境地。"
        },
        fr: { quote: "Se sentir piégé(e) mais les limites sont auto-imposées", interpretation: "Aujourd'hui, vous pourriez avoir l'impression de faire face à un problème sans issue. Même si vous voyez des solutions possibles, vous n'êtes peut-être pas prêt(e) à changer, car la familiarité de votre situation actuelle vous semble plus sécurisante. Un jour comme celui-ci, demander de l'aide aux autres peut être un meilleur choix que de porter le fardeau seul(e).\n\nCôté santé, vous pourriez ressentir de la fatigue, des maux de tête, ou ne pas vous sentir prêt(e) à affronter le travail qui vous attend. Si possible, occupez-vous des tâches importantes tant que votre corps et votre esprit sont encore frais. Ne vous laissez pas travailler jusqu'à tard dans la nuit." }
    },
    "NINE OF SWORDS": {
        en: {
            quote: "Resting period, the one you like may go with someone else",
            interpretation: "Because you stayed up late the night before, today you'll lack focus and may make mistakes at work, such as preparing the wrong presentation file or grabbing the wrong document. Be sure to double-check your work and files carefully, especially file names and the latest revision versions before sending them to clients.\n\nIf you have an exam or important appointment, watch out for oversleeping or making preparation errors, like studying the wrong chapter. In relationships, the other person may have an active nightlife, making communication difficult. Suspicions may arise and old issues may resurface, turning into arguments."
        },
        ja: {
            quote: "休息期間、好きな人が他の人と行くかも",
            interpretation: "前の晩の夜更かしのせいで、今日は集中力が欠けて仕事でミスが起きるかもしれません。例えば、プレゼン資料を間違えて準備したり、違う書類を取ったりすることです。仕事やファイルを入念にチェックしてください。特にクライアントに送る前に、ファイル名と最新の修正バージョンを確認しましょう。\n\n試験や重要な予定がある場合は、寝坊や準備ミスに注意してください。間違った章を勉強してしまうなどのミスも考えられます。恋愛面では、相手が夜型の生活をしていて、連絡がスムーズにいかないかもしれません。疑念が生まれ、昔の問題を蒸し返して喧嘩に発展する可能性があります。"
        },
        ko: {
            quote: "휴식 기간, 좋아하는 사람이 다른 사람과 갈 수 있음",
            interpretation: "전날 밤 늦게까지 깨어 있었기 때문에 오늘은 집중력이 부족하고 업무에서 실수가 생길 수 있습니다. 예를 들어 잘못된 프레젠테이션 파일을 준비하거나 다른 서류를 가져오는 등의 실수입니다. 특히 클라이언트에게 보내기 전에 파일명과 최신 수정 버전을 꼼꼼히 확인하세요.\n\n시험이나 중요한 약속이 있다면 늦잠이나 준비 실수를 조심하세요. 잘못된 단원을 공부하는 등의 실수가 있을 수 있습니다. 관계에서는 상대방이 밤 생활을 즐겨 소통이 원활하지 않을 수 있습니다. 의심이 생기고 과거 문제가 다시 불거져 다툼으로 번질 수 있습니다."
        },
        "zh-CN": {
            quote: "休息期，你喜欢的人可能和别人去",
            interpretation: "因为前一天晚上熬夜，今天你会缺乏专注力，工作中可能会犯错，比如准备错了演示文件或拿错了文档。一定要仔细检查你的工作和文件，特别是在发送给客户之前确认文件名和最新修改版本。\n\n如果有考试或重要约会，要注意别睡过头或准备出错，比如复习错了章节。感情方面，对方可能过着夜生活，导致沟通不顺畅。可能会产生猜疑，旧事重提演变成争吵。"
        },
        "zh-TW": {
            quote: "休息期，你喜歡的人可能和別人去",
            interpretation: "因為前一天晚上熬夜，今天你會缺乏專注力，工作中可能會犯錯，比如準備錯了簡報檔案或拿錯了文件。一定要仔細檢查你的工作和檔案，特別是在寄給客戶之前確認檔名和最新修改版本。\n\n如果有考試或重要約會，要注意別睡過頭或準備出錯，比如讀錯了章節。感情方面，對方可能過著夜生活，導致溝通不順暢。可能會產生猜疑，舊事重提演變成爭吵。"
        },
        fr: { quote: "Anxiété et inquiétudes nocturnes sur l'amour", interpretation: "Parce que vous vous êtes couché(e) tard la veille, aujourd'hui vous manquerez de concentration et pourriez commettre des erreurs au travail, comme préparer le mauvais fichier de présentation ou prendre le mauvais document. Vérifiez bien votre travail et vos fichiers, en particulier les noms de fichiers et les dernières versions avant de les envoyer aux clients.\n\nSi vous avez un examen ou un rendez-vous important, attention à ne pas dormir trop tard ou à faire des erreurs de préparation, comme réviser le mauvais chapitre. Côté relations, l'autre personne pourrait mener une vie nocturne active, rendant la communication difficile. Des soupçons pourraient naître et d'anciens problèmes pourraient resurgir, se transformant en disputes." }
    },
    "TEN OF SWORDS": {
        en: {
            quote: "Just ended a relationship, can't move on yet",
            interpretation: "Today you may feel exhausted from lack of sleep and need to rely on caffeine to get through the day. If you're in the middle of wrapping up a project, you'll manage to submit the work on time, but at the cost of extreme fatigue. After this project ends, your body will need a fair amount of recovery time.\n\nTake care of your health by getting a massage, acupuncture, or treatment for aches and pains. Watch out for office syndrome symptoms that may follow. In relationships, you and your partner may be living on different schedules. Even though you're in the same country, it's hard to stay in touch. If you call and no one answers, it might just be because the other person is resting."
        },
        ja: {
            quote: "関係が終わったばかり、まだ乗り越えられない",
            interpretation: "今日は睡眠不足で疲労困憊かもしれません。一日を乗り切るためにカフェインに頼る必要があるでしょう。プロジェクトの締め切りが迫っているなら、期限通りに提出できますが、極度の疲労と引き換えです。このプロジェクトが終わった後、体にはかなりの回復期間が必要です。\n\nマッサージ、鍼、痛みの治療などで健康をケアしてください。オフィス症候群の症状にも注意しましょう。恋愛面では、あなたとパートナーは異なるスケジュールで生活しているかもしれません。同じ国にいるのに、連絡を取り合うのが難しい状態です。電話をかけて出なくても、相手が休んでいるだけかもしれません。"
        },
        ko: {
            quote: "관계가 막 끝났고 아직 극복할 수 없음",
            interpretation: "오늘은 수면 부족으로 지칠 수 있으며 하루를 버티기 위해 카페인에 의존해야 할 수도 있습니다. 프로젝트 마감 중이라면 기한 내에 제출할 수 있지만, 극심한 피로를 대가로 치러야 합니다. 이 프로젝트가 끝난 후 몸은 상당한 회복 시간이 필요할 것입니다.\n\n마사지, 침술, 통증 치료 등으로 건강을 돌보세요. 이어질 수 있는 오피스 신드롬 증상에 주의하세요. 관계에서는 당신과 상대방이 서로 다른 시간대로 생활하고 있을 수 있습니다. 같은 나라에 있어도 연락이 어렵습니다. 전화했는데 받지 않는다면, 상대가 쉬고 있기 때문일 수 있습니다."
        },
        "zh-CN": {
            quote: "刚结束一段关系，还无法走出来",
            interpretation: "今天你可能因为缺乏睡眠而感到疲惫不堪，需要靠咖啡因撑过一天。如果你正在赶项目收尾，你能按时提交工作，但代价是极度的疲惫。这个项目结束后，你的身体需要相当长的恢复时间。\n\n通过按摩、针灸或治疗酸痛来照顾好自己的健康。小心可能随之而来的办公室综合症。感情方面，你和对方可能生活作息完全不同。即使在同一个国家，也很难保持联系。如果打电话没人接，可能只是对方在休息。"
        },
        "zh-TW": {
            quote: "剛結束一段關係，還無法走出來",
            interpretation: "今天你可能因為缺乏睡眠而感到疲憊不堪，需要靠咖啡因撐過一天。如果你正在趕專案收尾，你能按時提交工作，但代價是極度的疲憊。這個專案結束後，你的身體需要相當長的恢復時間。\n\n透過按摩、針灸或治療痠痛來照顧好自己的健康。小心可能隨之而來的辦公室症候群。感情方面，你和對方可能生活作息完全不同。即使在同一個國家，也很難保持聯繫。如果打電話沒人接，可能只是對方在休息。"
        },
        fr: { quote: "Fin douloureuse mais aussi nouveau départ", interpretation: "Aujourd'hui, vous pourriez vous sentir épuisé(e) par le manque de sommeil et avoir besoin de caféine pour tenir la journée. Si vous êtes en train de boucler un projet, vous réussirez à rendre le travail à temps, mais au prix d'une fatigue extrême. Après la fin de ce projet, votre corps aura besoin d'un temps de récupération considérable.\n\nPrenez soin de votre santé en vous offrant un massage, de l'acupuncture ou un traitement contre les douleurs. Attention aux symptômes du syndrome de bureau qui pourraient suivre. Côté relations, vous et votre partenaire pourriez vivre sur des horaires différents. Même si vous êtes dans le même pays, il est difficile de rester en contact. Si vous appelez et que personne ne répond, c'est peut-être simplement parce que l'autre personne se repose." }
    },
    "PAGE OF SWORDS": {
        en: {
            quote: "Someone who causes headaches more than being a lover",
            interpretation: "Today you need to pay close attention to the details of paperwork, replying to emails, and all forms of communication. Watch out for losing stationery or tools you use daily, as this could affect your mood and work efficiency.\n\nIn terms of people, you may work with interns, document couriers, or have conversations with writers and illustrators. If you're using social media, be careful about posting comments that could lead to unnecessary arguments."
        },
        ja: {
            quote: "恋人というより頭痛の種になる人",
            interpretation: "今日は書類作業の詳細、メールの返信、あらゆるコミュニケーションに細心の注意を払う必要があります。普段使っている文房具や道具を紛失しないよう注意してください。気分や仕事の効率に影響する可能性があります。\n\n人物面では、インターン生や書類配達員と一緒に仕事をしたり、ライターやイラストレーターと話をする機会があるかもしれません。SNSを使う場合は、不必要な口論につながりかねないコメントを投稿しないよう注意してください。"
        },
        ko: {
            quote: "연인보다 두통을 일으키는 사람",
            interpretation: "오늘은 서류 작업의 세부 사항, 이메일 회신, 모든 형태의 소통에 세심한 주의를 기울여야 합니다. 매일 사용하는 문구류나 도구를 잃어버리지 않도록 주의하세요. 기분과 업무 효율에 영향을 줄 수 있습니다.\n\n사람과 관련해서는 인턴, 서류 배달원과 함께 일하거나, 작가나 일러스트레이터와 대화할 수 있습니다. 소셜 미디어를 사용한다면, 불필요한 논쟁으로 이어질 수 있는 댓글을 달지 않도록 조심하세요."
        },
        "zh-CN": {
            quote: "带来头痛而不是爱情的人",
            interpretation: "今天你需要特别注意文书工作的细节、回复邮件以及各种形式的沟通。小心弄丢日常使用的文具或工具，因为这可能影响你的心情和工作效率。\n\n在人物方面，你可能会和实习生、文件快递员共事，或者与作家和插画师交谈。如果你在使用社交媒体，要注意不要发表可能引发不必要争论的评论。"
        },
        "zh-TW": {
            quote: "帶來頭痛而不是愛情的人",
            interpretation: "今天你需要特別注意文書工作的細節、回覆郵件以及各種形式的溝通。小心弄丟日常使用的文具或工具，因為這可能影響你的心情和工作效率。\n\n在人物方面，你可能會和實習生、文件快遞員共事，或者與作家和插畫師交談。如果你在使用社群媒體，要注意不要發表可能引發不必要爭論的評論。"
        },
        fr: { quote: "Quelqu'un de curieux mais peut-être trop bavard", interpretation: "Aujourd'hui, vous devez porter une attention particulière aux détails de la paperasse, aux réponses aux e-mails et à toutes les formes de communication. Attention à ne pas perdre les fournitures de bureau ou outils que vous utilisez quotidiennement, car cela pourrait affecter votre humeur et votre efficacité au travail.\n\nCôté personnes, vous pourriez travailler avec des stagiaires, des coursiers, ou discuter avec des écrivains et des illustrateurs. Si vous utilisez les réseaux sociaux, faites attention aux commentaires qui pourraient mener à des disputes inutiles." }
    },
    "KNIGHT OF SWORDS": {
        en: {
            quote: "A straightforward person who moves fast",
            interpretation: "Today, focus on speed and efficiency. You may need to use express delivery services or call a ride during rush hour, services you might not normally use. At work, you'll be laser-focused on your goals and want everything done by the end of the day.\n\nYou're ready to push through any obstacles in your way, but be careful about getting into verbal clashes with colleagues. Today you may be short-tempered and prone to showing irritation easily."
        },
        ja: {
            quote: "素早く動く率直な人",
            interpretation: "今日はスピードと効率に集中してください。普段は使わないかもしれない急行便や、ラッシュアワーの配車サービスを利用する必要があるかもしれません。仕事では、目標に一点集中して、すべてを今日中に終わらせたいと思うでしょう。\n\n立ちはだかるあらゆる障害を突破する準備はできていますが、同僚との口論には注意してください。今日は短気になりやすく、イライラを表に出しやすい日です。"
        },
        ko: {
            quote: "빠르게 움직이는 솔직한 사람",
            interpretation: "오늘은 속도와 효율성에 집중하세요. 평소에는 사용하지 않던 퀵 서비스나 러시아워에 택시를 부르는 일이 있을 수 있습니다. 업무에서는 목표에 레이저처럼 집중하며 모든 것을 오늘 안에 끝내고 싶어할 것입니다.\n\n앞을 가로막는 장애물을 뚫고 나갈 준비가 되어 있지만, 동료와의 말다툼에 주의하세요. 오늘은 성격이 급해지고 짜증을 쉽게 드러낼 수 있습니다."
        },
        "zh-CN": {
            quote: "行动迅速的直接的人",
            interpretation: "今天要注重速度和效率。你可能需要使用快递服务或在高峰时段叫车，这些可能是你平时不常用的服务。工作上，你会全神贯注于目标，希望所有事情在今天之内完成。\n\n你准备好冲破前方的一切障碍，但要小心和同事发生口角。今天你可能会比较急躁，容易表现出不耐烦。"
        },
        "zh-TW": {
            quote: "行動迅速的直接的人",
            interpretation: "今天要注重速度和效率。你可能需要使用快遞服務或在尖峰時段叫車，這些可能是你平時不常用的服務。工作上，你會全神貫注於目標，希望所有事情在今天之內完成。\n\n你準備好衝破前方的一切障礙，但要小心和同事發生口角。今天你可能會比較急躁，容易表現出不耐煩。"
        },
        fr: { quote: "Quelqu'un d'impulsif qui agit vite", interpretation: "Aujourd'hui, misez sur la rapidité et l'efficacité. Vous pourriez avoir besoin d'utiliser des services de livraison express ou d'appeler un VTC aux heures de pointe, des services que vous n'utilisez peut-être pas habituellement. Au travail, vous serez ultra-concentré(e) sur vos objectifs et voudrez tout terminer d'ici la fin de la journée.\n\nVous êtes prêt(e) à surmonter tous les obstacles sur votre chemin, mais attention aux accrochages verbaux avec vos collègues. Aujourd'hui, vous pourriez être irritable et enclin(e) à montrer votre agacement facilement." }
    },
    "QUEEN OF SWORDS": {
        en: {
            quote: "A strong person with high walls",
            interpretation: "Today you may be involved in a situation where someone is being pressured into making a decision. It could be you pressuring someone else, or someone else pressuring you. Whichever side you're on, the outcome of this action is likely to be negative.\n\nIf you're the one doing the pressuring, try to ease up on the strictness and pressure. Put your own reasoning aside for a moment and listen to the other person's perspective."
        },
        ja: {
            quote: "高い壁を持つ強い人",
            interpretation: "今日は誰かが決断を迫られる状況に関わるかもしれません。あなたが誰かに圧力をかけているか、誰かがあなたに圧力をかけているかです。どちら側であっても、その行動の結果はネガティブなものになる可能性が高いです。\n\nもしあなたが圧力をかけている側なら、厳しさやプレッシャーを和らげてみてください。自分の理屈をいったん脇に置いて、相手の意見に耳を傾けましょう。"
        },
        ko: {
            quote: "높은 벽을 가진 강한 사람",
            interpretation: "오늘은 누군가에게 결정을 강요하는 상황에 관련될 수 있습니다. 당신이 다른 사람에게 압박을 가하고 있거나, 다른 사람이 당신에게 압박을 가하고 있을 수 있습니다. 어느 쪽이든 그 행동의 결과는 부정적일 가능성이 높습니다.\n\n만약 당신이 압박하는 쪽이라면, 엄격함과 압박을 줄여보세요. 자신의 논리를 잠시 내려놓고 상대방의 의견을 들어보세요."
        },
        "zh-CN": {
            quote: "有高墙的坚强的人",
            interpretation: "今天你可能会涉及到被迫做决定的局面。可能是你在逼迫别人，也可能是别人在逼迫你。无论你是哪一方，这种行为的结果很可能是负面的。\n\n如果你是施压的一方，试着放松一下严厉和压力。暂时放下自己的道理，倾听对方的想法。"
        },
        "zh-TW": {
            quote: "有高牆的堅強的人",
            interpretation: "今天你可能會涉及到被迫做決定的局面。可能是你在逼迫別人，也可能是別人在逼迫你。無論你是哪一方，這種行為的結果很可能是負面的。\n\n如果你是施壓的一方，試著放鬆一下嚴厲和壓力。暫時放下自己的道理，傾聽對方的想法。"
        },
        fr: { quote: "Quelqu'un d'intelligent et indépendant, peut-être distant", interpretation: "Aujourd'hui, vous pourriez être impliqué(e) dans une situation où quelqu'un est poussé à prendre une décision. C'est peut-être vous qui exercez la pression sur quelqu'un d'autre, ou quelqu'un d'autre qui vous met la pression. Quel que soit votre rôle, le résultat de cette action sera probablement négatif.\n\nSi c'est vous qui exercez la pression, essayez d'assouplir votre rigueur et de relâcher la pression. Mettez vos propres arguments de côté un instant et écoutez le point de vue de l'autre." }
    },
    "KING OF SWORDS": {
        en: {
            quote: "A cold person who doesn't show much emotion",
            interpretation: "Today you need to deal with a man in a position of authority. It could be your boss or someone influential at work. If you've come to persuade or get approval, he'll stick firmly to his own views and won't care about your reasoning. Change won't come from him -- you're the one who needs to adapt.\n\nIf you need to negotiate on important matters, you may have to go over his head and speak to someone with higher authority. In relationships, the other person will be serious and reserved. Conversations will be tense, possibly because you touched on something they can't forgive, or because of clashing attitudes."
        },
        ja: {
            quote: "感情をあまり見せない冷たい人",
            interpretation: "今日は権力のある男性と対応する必要があります。上司や職場で影響力のある人かもしれません。説得したり承認を得るために来たなら、彼は自分の考えに固執し、あなたの理由には興味を示しません。変化は彼からは起きません — 適応しなければならないのはあなたの方です。\n\n重要な事項について交渉する必要がある場合、彼の上を飛び越えてより高い権限を持つ人と話す必要があるかもしれません。恋愛面では、相手は堅苦しく無口でしょう。会話は緊張したものになり、あなたが相手の許せない何かに触れてしまったか、態度が合わないことが原因かもしれません。"
        },
        ko: {
            quote: "감정을 잘 보여주지 않는 차가운 사람",
            interpretation: "오늘은 권력 있는 남성을 상대해야 합니다. 상사이거나 직장에서 영향력 있는 사람일 수 있습니다. 설득하거나 승인을 받으러 갔다면, 그는 자기 생각을 고수하며 당신의 이유에는 관심이 없을 것입니다. 변화는 그에게서 일어나지 않습니다 -- 적응해야 하는 쪽은 당신입니다.\n\n중요한 사안을 협상해야 한다면, 그 사람을 건너뛰고 더 높은 권한을 가진 사람과 이야기해야 할 수 있습니다. 관계에서는 상대방이 근엄하고 과묵할 것입니다. 대화가 긴장될 것이며, 당신이 그가 용서할 수 없는 부분을 건드렸거나 서로 맞지 않는 태도 때문일 수 있습니다."
        },
        "zh-CN": {
            quote: "不太表露感情的冷淡的人",
            interpretation: "今天你需要应对一位有权威的男性。可能是你的上司或工作中有影响力的人。如果你来说服他或寻求批准，他会坚持自己的想法，不会在意你的理由。改变不会发生在他身上——需要调整的是你。\n\n如果需要就重要事项进行谈判，你可能不得不越过他，直接找更高权限的人沟通。感情方面，对方会表现得严肃且沉默寡言。对话会很紧张，可能是因为你触碰到了他无法原谅的事情，或者是某些观念上的分歧。"
        },
        "zh-TW": {
            quote: "不太表露感情的冷淡的人",
            interpretation: "今天你需要應對一位有權威的男性。可能是你的上司或工作中有影響力的人。如果你來說服他或尋求批准，他會堅持自己的想法，不會在意你的理由。改變不會發生在他身上——需要調整的是你。\n\n如果需要就重要事項進行談判，你可能不得不越過他，直接找更高權限的人溝通。感情方面，對方會表現得嚴肅且沉默寡言。對話會很緊張，可能是因為你觸碰到了他無法原諒的事情，或者是某些觀念上的分歧。"
        },
        fr: { quote: "Quelqu'un de logique et autoritaire", interpretation: "Aujourd'hui, vous devez faire face à un homme en position d'autorité. Il pourrait s'agir de votre patron ou d'une personne influente au travail. Si vous êtes venu(e) le convaincre ou obtenir son approbation, il s'en tiendra fermement à ses propres idées et ne se souciera pas de vos arguments. Le changement ne viendra pas de lui -- c'est à vous de vous adapter.\n\nSi vous devez négocier sur des sujets importants, vous devrez peut-être passer au-dessus de lui et vous adresser à quelqu'un de plus haut placé. Côté relations, l'autre personne sera sérieuse et réservée. Les conversations seront tendues, peut-être parce que vous avez touché à quelque chose qu'elle ne peut pas pardonner, ou à cause d'attitudes incompatibles." }
    },
    "ACE OF PENTACLES": {
        en: {
            quote: "Beginning of a stable love",
            interpretation: "Today, someone will offer you an opportunity or lend you a helping hand. If you have a work presentation or are selling something today, you are likely to succeed and earn substantial profits. But if today is not a day for reaping rewards, someone will hand you a tool or piece of equipment that makes your work or daily life more convenient. At the very least, they may share knowledge or ideas that you can put to use immediately. If you need to leave the house, don't forget to check your bag to make sure you haven't forgotten any medication you take regularly."
        },
        ja: {
            quote: "安定した愛の始まり",
            interpretation: "今日は、誰かがあなたにチャンスを差し出したり、手助けをしてくれるでしょう。今日プレゼンや商品の販売がある場合、成功してかなりの利益を得られる可能性が高いです。しかし、収穫の日でなくても、仕事や生活をより便利にしてくれる道具や機材を誰かが手渡してくれるでしょう。少なくとも、すぐに活用できる知識やアイデアを共有してくれるかもしれません。外出する際は、常備薬を忘れていないか、カバンの中を確認することを忘れずに。"
        },
        ko: {
            quote: "안정적인 사랑의 시작",
            interpretation: "오늘은 누군가가 당신에게 기회를 제공하거나 도움의 손길을 내밀 것입니다. 오늘 프레젠테이션이나 판매가 있다면 성공하여 상당한 수익을 올릴 가능성이 높습니다. 하지만 오늘이 수확의 날이 아니더라도, 누군가가 당신의 업무나 일상생활을 더 편리하게 해줄 도구나 장비를 건네줄 것입니다. 최소한 즉시 활용할 수 있는 지식이나 아이디어를 나눠줄 수도 있습니다. 외출해야 한다면 가방을 확인하여 정기적으로 복용하는 약을 빠뜨리지 않았는지 꼭 챙기세요."
        },
        "zh-CN": {
            quote: "稳定爱情的开始",
            interpretation: "今天会有人主动向你伸出援手或提供机会。如果今天有工作汇报或销售任务，你很可能会取得成功，收获丰厚的利润。即使今天不是收获的日子，也会有人递给你一件工具或设备，让你的工作或生活变得更加便利。至少，对方可能会分享一些你可以立即运用的知识或点子。如果需要出门，别忘了检查一下包，确保没有忘带需要定期服用的药物。"
        },
        "zh-TW": {
            quote: "穩定愛情的開始",
            interpretation: "今天會有人主動向你伸出援手或提供機會。如果今天有工作簡報或銷售任務，你很可能會取得成功，收穫豐厚的利潤。即使今天不是收穫的日子，也會有人遞給你一件工具或設備，讓你的工作或生活變得更加便利。至少，對方可能會分享一些你可以立即運用的知識或點子。如果需要出門，別忘了檢查一下包，確保沒有忘帶需要定期服用的藥物。"
        },
        fr: { quote: "Nouvelle opportunité pour une relation stable", interpretation: "Aujourd'hui, quelqu'un vous offrira une opportunité ou vous tendra la main. Si vous avez une présentation ou une vente prévue aujourd'hui, vous avez de grandes chances de réussir et de réaliser des bénéfices conséquents. Même si ce n'est pas un jour de récolte, quelqu'un vous remettra un outil ou un équipement qui facilitera votre travail ou votre quotidien. Au minimum, cette personne pourrait partager des connaissances ou des idées que vous pourrez mettre en pratique immédiatement. Si vous devez sortir, n'oubliez pas de vérifier votre sac pour vous assurer de ne pas avoir oublié vos médicaments habituels." }
    },
    "TWO OF PENTACLES": {
        en: {
            quote: "Juggling period, manage your time well",
            interpretation: "Today you will have to handle multiple tasks at once. The first is something you are already responsible for and is due today. The other is an unexpected task that suddenly lands on your plate, perhaps because a colleague called in sick without notice. Even though you may not be thrilled about taking on extra work, you will manage it well and get through the day by the skin of your teeth. Regarding finances, you may need to temporarily borrow from one account to cover expenses, but you will be able to return the money within one to two days."
        },
        ja: {
            quote: "やりくり期間、時間を上手に管理して",
            interpretation: "今日は複数の仕事を同時にこなさなければなりません。一つ目はすでに担当していて今日が締め切りの仕事。もう一つは突然割り込んできた仕事で、同僚が無断欠勤したことが原因かもしれません。あまり乗り気ではないかもしれませんが、うまくやりくりして、ギリギリで一日を乗り切ることができるでしょう。お金の面では、一時的に別の口座からお金を借りて使う必要があるかもしれませんが、1〜2日以内にその口座にお金を戻すことができるでしょう。"
        },
        ko: {
            quote: "저글링 기간, 시간을 잘 관리하세요",
            interpretation: "오늘은 여러 가지 일을 동시에 처리해야 합니다. 첫 번째는 이미 담당하고 있으며 오늘이 마감인 업무입니다. 다른 하나는 갑자기 끼어든 업무로, 동료가 사전 통보 없이 결근했기 때문일 수 있습니다. 추가 업무를 맡는 것이 내키지 않더라도 잘 처리해낼 수 있으며, 아슬아슬하게 하루를 마무리할 것입니다. 재정적으로는 한 계좌에서 임시로 돈을 빌려 써야 할 수 있지만, 1~2일 이내에 다시 돌려놓을 수 있을 것입니다."
        },
        "zh-CN": {
            quote: "周旋期，管理好你的时间",
            interpretation: "今天你需要同时处理多项任务。第一项是你本来就负责的工作，今天到了截止日期。另一项是突然插进来的任务，可能是因为同事临时请假没有提前通知。虽然你不太情愿接手额外的工作，但你会处理得很好，勉强撑过这一天。在财务方面，你可能需要临时从一个账户借钱应急，但一两天之内就能把钱还回去。"
        },
        "zh-TW": {
            quote: "周旋期，管理好你的時間",
            interpretation: "今天你需要同時處理多項任務。第一項是你本來就負責的工作，今天到了截止日期。另一項是突然插進來的任務，可能是因為同事臨時請假沒有提前通知。雖然你不太情願接手額外的工作，但你會處理得很好，勉強撐過這一天。在財務方面，你可能需要臨時從一個帳戶借錢應急，但一兩天之內就能把錢還回去。"
        },
        fr: { quote: "Équilibrer l'amour avec d'autres responsabilités", interpretation: "Aujourd'hui, vous devrez gérer plusieurs tâches en même temps. La première est une responsabilité existante dont l'échéance tombe aujourd'hui. L'autre est une tâche imprévue qui s'impose soudainement, peut-être parce qu'un collègue s'est absenté sans prévenir. Même si vous n'êtes pas ravi(e) de prendre en charge ce travail supplémentaire, vous vous en sortirez bien et finirez la journée de justesse. Côté finances, vous pourriez avoir besoin d'emprunter temporairement sur un compte pour couvrir des dépenses, mais vous pourrez rembourser sous un à deux jours." }
    },
    "THREE OF PENTACLES": {
        en: {
            quote: "Group date, no one-on-one",
            interpretation: "There will be a meeting or discussion to define each person's roles and responsibilities before everyone goes their separate ways to work. If there is no scheduled meeting, you may be called in for a private conversation with your boss or a senior figure in the organization. The reason may be related to a decline in your work performance recently. The talk will be aimed at helping resolve lingering issues and getting you back on track. Although the conversation may feel somewhat embarrassing, everything will make sense. Alternatively, it could be a day when you need to finalize work agreements with a client, or discuss venue decoration or space rental."
        },
        ja: {
            quote: "グループデート、二人きりなし",
            interpretation: "今日は会議があり、各自の役割と責任を確認してからそれぞれの仕事に取り掛かるでしょう。会議の予定がない場合は、上司や組織の上層部から個別に呼び出されるかもしれません。原因は最近の業務パフォーマンスの低下にあるかもしれません。話し合いは、未解決の問題を解決し、あなたが本来の調子を取り戻すためのものです。会話は少し気まずく感じるかもしれませんが、すべて納得のいく内容でしょう。あるいは、クライアントとの仕事の取り決めをまとめたり、会場の装飾やスペースの賃貸について話し合う日かもしれません。"
        },
        ko: {
            quote: "그룹 데이트, 둘만의 시간 없음",
            interpretation: "각자의 역할과 책임을 논의하는 회의가 있은 후 각자 업무를 수행하러 흩어질 것입니다. 예정된 회의가 없다면 상사나 조직의 윗분이 개인적으로 면담을 요청할 수 있습니다. 최근 업무 성과가 저하된 것이 원인일 수 있습니다. 대화는 미해결 문제를 해결하고 당신이 다시 제대로 일할 수 있도록 돕기 위한 것입니다. 대화가 다소 체면이 깎이는 느낌일 수 있지만, 모든 것이 이해할 수 있는 이유가 있을 것입니다. 혹은 고객과 업무 계약을 확정하거나, 인테리어나 공간 임대에 대해 논의하는 날이 될 수도 있습니다."
        },
        "zh-CN": {
            quote: "群体约会，没有单独相处",
            interpretation: "今天会有一场会议，讨论并确定每个人的角色和职责，之后各自去完成各自的工作。如果没有预定的会议，你可能会被老板或组织中的前辈私下叫去谈话。原因可能是你最近的工作表现有所下滑。谈话的目的是帮助解决遗留问题，让你恢复良好的工作状态。虽然谈话可能会让你觉得有些丢面子，但一切都是有道理的。又或者，今天你需要和客户敲定工作协议，或者讨论场地装修和租赁事宜。"
        },
        "zh-TW": {
            quote: "群體約會，沒有單獨相處",
            interpretation: "今天會有一場會議，討論並確定每個人的角色和職責，之後各自去完成各自的工作。如果沒有預定的會議，你可能會被老闆或組織中的前輩私下叫去談話。原因可能是你最近的工作表現有所下滑。談話的目的是幫助解決遺留問題，讓你恢復良好的工作狀態。雖然談話可能會讓你覺得有些丟面子，但一切都是有道理的。又或者，今天你需要和客戶敲定工作協議，或者討論場地裝修和租賃事宜。"
        },
        fr: { quote: "Construire une relation ensemble avec effort", interpretation: "Il y aura une réunion ou une discussion pour définir les rôles et responsabilités de chacun avant que tout le monde parte travailler de son côté. S'il n'y a pas de réunion prévue, vous pourriez être convoqué(e) pour un entretien privé avec votre supérieur ou un cadre de l'organisation. La raison pourrait être liée à une baisse de vos performances récentes. La discussion visera à résoudre les problèmes en suspens et à vous remettre sur les rails. Bien que la conversation puisse être un peu gênante, tout aura du sens. Il pourrait aussi s'agir d'une journée consacrée à finaliser des accords avec un client ou à discuter de la décoration d'un lieu ou de la location d'un espace." }
    },
    "FOUR OF PENTACLES": {
        en: {
            quote: "Beware of stingy people who may send bills later",
            interpretation: "A feeling of distrust toward your colleagues and the people around you causes all the work to pile up on your desk instead of being delegated to others. Even though you know this is not ideal, you figure it is better to do everything yourself from the start than to have to fix other people's work later. If you have a work meeting with someone today, you will position yourself mostly as a good listener, gathering information, because you are afraid that if you say too much, you might accidentally reveal important details to the other party for free."
        },
        ja: {
            quote: "後で請求書を送るかもしれないケチな人に注意",
            interpretation: "同僚や周囲の人に対する不信感から、仕事が他の人に分配されるのではなく、すべてあなたのところに積み上がっています。これが良くないことだとわかっていても、後から他人の仕事を修正するよりも、最初から全部自分でやった方がましだと考えています。今日誰かと仕事の打ち合わせがある場合、あなたは主に聞き役に徹し、情報収集をするでしょう。うっかり重要な情報を相手にタダで漏らしてしまうのが怖いからです。"
        },
        ko: {
            quote: "나중에 청구서를 보낼 수 있는 인색한 사람 조심",
            interpretation: "동료와 주변 사람들에 대한 불신감 때문에 업무가 다른 사람에게 분배되지 않고 모두 당신에게 쌓이고 있습니다. 이것이 좋지 않다는 것을 알면서도, 나중에 다른 사람의 일을 수정하느라 고생하는 것보다 처음부터 전부 직접 하는 편이 낫다고 생각합니다. 오늘 누군가와 업무 미팅이 있다면, 주로 경청하며 정보를 수집하는 역할을 할 것입니다. 무심코 중요한 정보를 상대방에게 공짜로 흘려보낼까 봐 걱정되기 때문입니다."
        },
        "zh-CN": {
            quote: "小心可能事后算账的小气人",
            interpretation: "对同事和身边的人缺乏信任，导致所有工作都堆在你一个人身上，而不是分配给别人。虽然你知道这样做不好，但你觉得从一开始就自己全部做完，总比后面再去帮别人返工要强。如果今天有和别人的工作会议，你会以倾听者的姿态为主，尽量多收集信息，因为你担心自己说多了，可能会不小心把重要信息白白透露给对方。"
        },
        "zh-TW": {
            quote: "小心可能事後算帳的小氣人",
            interpretation: "對同事和身邊的人缺乏信任，導致所有工作都堆在你一個人身上，而不是分配給別人。雖然你知道這樣做不好，但你覺得從一開始就自己全部做完，總比後面再去幫別人返工要強。如果今天有和別人的工作會議，你會以傾聽者的姿態為主，盡量多收集資訊，因為你擔心自己說多了，可能會不小心把重要資訊白白透露給對方。"
        },
        fr: { quote: "Retenir l'amour par peur de perdre", interpretation: "Un sentiment de méfiance envers vos collègues et votre entourage fait que tout le travail s'accumule sur votre bureau au lieu d'être délégué. Même si vous savez que ce n'est pas idéal, vous estimez qu'il vaut mieux tout faire vous-même dès le départ plutôt que de devoir corriger le travail des autres par la suite. Si vous avez une réunion professionnelle aujourd'hui, vous vous positionnerez principalement comme un bon auditeur, recueillant des informations, car vous craignez de révéler accidentellement des détails importants à l'autre partie gratuitement." }
    },
    "FIVE OF PENTACLES": {
        en: {
            quote: "Feeling not good enough, pursuing but failing",
            interpretation: "If you have been sitting on tasks for weeks or have already missed a deadline, today your boss or client will come chasing you for the work first thing in the morning. If you have owed someone money recently, your creditor will message you today to collect. Alternatively, this could mean you are starting a project from scratch with a close friend, building everything from zero. Although it looks difficult, it is an opportunity to create something new together."
        },
        ja: {
            quote: "十分ではないと感じて、追いかけても失敗",
            interpretation: "もし数週間タスクを放置していたり、すでに締め切りを過ぎていたりするなら、今日は朝から上司やクライアントに仕事の催促をされるでしょう。最近誰かにお金を借りていたなら、今日は債権者から取り立てのメッセージが届くでしょう。あるいは、親しい友人と一緒にゼロからプロジェクトを始めることを意味しているかもしれません。困難に見えても、一緒に何か新しいものを作り上げるチャンスです。"
        },
        ko: {
            quote: "충분하지 않다고 느끼며 추구하지만 실패",
            interpretation: "만약 몇 주째 업무를 방치하고 있거나 이미 마감 기한을 넘겼다면, 오늘 아침부터 상사나 고객이 업무 독촉을 해올 것입니다. 최근 누군가에게 돈을 빌린 적이 있다면, 오늘 채권자가 메시지를 보내 돈을 독촉할 것입니다. 혹은 이것은 친한 친구와 함께 모든 것을 처음부터 시작하는 프로젝트를 의미할 수도 있습니다. 어려워 보이지만, 함께 새로운 것을 만들어갈 기회입니다."
        },
        "zh-CN": {
            quote: "觉得自己不够好，追求但失败",
            interpretation: "如果你已经拖了好几周的工作，或者已经过了截止日期，今天一大早老板或客户就会来催你交差。如果你最近欠了谁的钱，今天债主会发消息来催债。又或者，这意味着你正在和一个好朋友从零开始一个项目，一切从头来过。虽然看起来很艰难，但这也是一个一起创造新事物的机会。"
        },
        "zh-TW": {
            quote: "覺得自己不夠好，追求但失敗",
            interpretation: "如果你已經拖了好幾週的工作，或者已經過了截止日期，今天一大早老闆或客戶就會來催你交差。如果你最近欠了誰的錢，今天債主會發訊息來催債。又或者，這意味著你正在和一個好朋友從零開始一個專案，一切從頭來過。雖然看起來很艱難，但這也是一個一起創造新事物的機會。"
        },
        fr: { quote: "Se sentir exclu(e) ou abandonné(e) en amour", interpretation: "Si vous avez laissé des tâches en attente depuis des semaines ou si vous avez déjà dépassé une échéance, aujourd'hui votre supérieur ou votre client viendra vous réclamer le travail dès le matin. Si vous avez récemment emprunté de l'argent à quelqu'un, votre créancier vous contactera aujourd'hui pour récupérer son dû. Cela pourrait aussi signifier que vous démarrez un projet de zéro avec un ami proche, en construisant tout depuis le début. Bien que cela semble difficile, c'est une opportunité de créer quelque chose de nouveau ensemble." }
    },
    "SIX OF PENTACLES": {
        en: {
            quote: "Meet a generous person who likes to spoil you",
            interpretation: "Today you will meet a senior or elder figure who is particularly fond of you. Because of their confidence in you, they will assign you more work than others. Given the other person's higher status, you will not dare refuse. If you receive a sum of money today, you will have to share it with others, leaving only a small amount for yourself. But it is also a form of helping others that makes you feel good."
        },
        ja: {
            quote: "あなたを甘やかすのが好きな気前の良い人に会う",
            interpretation: "今日は、あなたを特にかわいがっている目上の人や年長者に会うでしょう。あなたへの信頼があるからこそ、他の人よりも多くの仕事を回してきます。相手の方が立場が上であるため、断ることはできないでしょう。今日お金が入ってきた場合、そのお金を他の人と分け合わなければならず、自分の手元にはわずかしか残りません。しかし、それは人を助けるという形であなた自身も気持ちよくなれることです。"
        },
        ko: {
            quote: "당신을 spoil하는 것을 좋아하는 관대한 사람을 만남",
            interpretation: "오늘은 당신을 특별히 아끼는 윗사람이나 어른을 만나게 될 것입니다. 당신에 대한 신뢰 덕분에 다른 사람들보다 더 많은 일을 맡기게 됩니다. 상대방의 지위가 높기 때문에 감히 거절하기 어렵습니다. 오늘 목돈이 들어오면 다른 사람들과 나눠야 하고, 자신에게 남는 금액은 적을 것입니다. 하지만 그것은 당신 자신도 뿌듯함을 느끼게 하는 도움의 형태입니다."
        },
        "zh-CN": {
            quote: "遇到喜欢宠你的慷慨的人",
            interpretation: "今天你会遇到一位特别疼爱你的长辈。因为对你的信任，他会把比其他人更多的工作分配给你。由于对方的地位比你高，你不敢拒绝。如果今天你收到了一笔钱，你需要把其中一部分分给别人，留给自己的只有很少一点。但这种帮助别人的行为也会让你感到心情不错。"
        },
        "zh-TW": {
            quote: "遇到喜歡寵你的慷慨的人",
            interpretation: "今天你會遇到一位特別疼愛你的長輩。因為對你的信任，他會把比其他人更多的工作分配給你。由於對方的地位比你高，你不敢拒絕。如果今天你收到了一筆錢，你需要把其中一部分分給別人，留給自己的只有很少一點。但這種幫助別人的行為也會讓你感到心情不錯。"
        },
        fr: { quote: "Donner et recevoir dans une relation équilibrée", interpretation: "Aujourd'hui, vous rencontrerez une figure d'autorité ou un aîné qui vous apprécie particulièrement. En raison de sa confiance en vous, cette personne vous confiera plus de travail qu'aux autres. Étant donné son statut supérieur, vous n'oserez pas refuser. Si vous recevez une somme d'argent aujourd'hui, vous devrez la partager avec d'autres, ne gardant qu'une petite part pour vous. Mais c'est aussi une forme d'entraide qui vous procurera un sentiment de satisfaction." }
    },
    "SEVEN OF PENTACLES": {
        en: {
            quote: "Waiting for someone to ask you out, but no one does",
            interpretation: "You are finding all kinds of excuses to avoid starting the work you should be doing. At first, you might claim your tools are not ready, that you have no ideas yet, or that you have not had your coffee. But even when everything is ready, you still do not get started. Do not blame yourself just yet. What you are facing may not be laziness but rather a lack of clear goals or direction. This could come from within yourself or from a boss who has left you adrift. Try going back to review the purpose of the work once more. Write it out step by step. If you still cannot figure it out, try stepping away from the task at hand and do something else temporarily."
        },
        ja: {
            quote: "誰かに誘われるのを待っているが、誰もいない",
            interpretation: "やるべき仕事に取りかからないために、あれこれと言い訳を見つけています。最初は「道具がまだ揃っていない」「アイデアが浮かばない」「まだコーヒーを飲んでいない」と言い訳をするかもしれません。しかし、すべてが整っても、まだ手をつけません。自分を責めるのはまだ早いです。あなたが直面しているのは怠惰ではなく、明確な目標や仕事の方向性が見えていないことかもしれません。これはあなた自身から来ているのか、あるいはあなたを放置している上司のせいかもしれません。もう一度仕事の目的を見直してみましょう。手順を書き出してみてください。それでもわからなければ、目の前の仕事から一度離れて、一時的に別のことをしてみましょう。"
        },
        ko: {
            quote: "누군가 데이트 신청하기를 기다리지만 아무도 하지 않음",
            interpretation: "해야 할 일을 시작하지 않기 위해 온갖 핑계를 대고 있습니다. 처음에는 장비가 준비되지 않았다, 아이디어가 아직 없다, 커피를 안 마셨다고 변명할 수 있습니다. 하지만 모든 것이 준비되어도 여전히 시작하지 않습니다. 자신을 너무 탓하지 마세요. 당신이 겪고 있는 것은 게으름이 아니라 명확한 목표나 방향이 없기 때문일 수 있습니다. 이것은 당신 스스로에게서 오는 것일 수도 있고, 당신을 방치하고 있는 상사 때문일 수도 있습니다. 업무의 목적을 다시 한번 되짚어 보세요. 단계별로 적어보세요. 그래도 생각이 나지 않으면, 눈앞의 일에서 잠시 벗어나 다른 활동을 해보세요."
        },
        "zh-CN": {
            quote: "等人约你出去，但没有人",
            interpretation: "你正在找各种借口来逃避应该做的工作。一开始可能会说工具还没准备好、还没有灵感、或者还没喝咖啡。但当一切都准备好了，你还是迟迟不动手。先不要责怪自己，你面对的可能不是懒惰，而是缺乏明确的目标或工作方向。这可能来自你自己，也可能是老板把你晾在一边导致的。试着重新回顾一下这项工作的目的，把步骤写出来。如果还是想不通，就暂时放下手头的工作，先去做点别的事情。"
        },
        "zh-TW": {
            quote: "等人約你出去，但沒有人",
            interpretation: "你正在找各種藉口來逃避應該做的工作。一開始可能會說工具還沒準備好、還沒有靈感、或者還沒喝咖啡。但當一切都準備好了，你還是遲遲不動手。先不要責怪自己，你面對的可能不是懶惰，而是缺乏明確的目標或工作方向。這可能來自你自己，也可能是老闆把你晾在一邊導致的。試著重新回顧一下這項工作的目的，把步驟寫出來。如果還是想不通，就暫時放下手頭的工作，先去做點別的事情。"
        },
        fr: { quote: "Patience nécessaire, les résultats viendront", interpretation: "Vous trouvez toutes sortes d'excuses pour ne pas commencer le travail que vous devriez faire. Au début, vous prétendez peut-être que vos outils ne sont pas prêts, que vous n'avez pas d'idées ou que vous n'avez pas encore pris votre café. Mais même quand tout est prêt, vous ne vous y mettez toujours pas. Ne vous blâmez pas tout de suite. Ce que vous vivez n'est peut-être pas de la paresse mais plutôt un manque d'objectifs ou de direction claire. Cela peut venir de vous-même ou d'un supérieur qui vous a laissé(e) sans repères. Essayez de revoir l'objectif du travail une fois de plus. Écrivez les étapes. Si vous n'y arrivez toujours pas, éloignez-vous temporairement de la tâche et faites autre chose." }
    },
    "EIGHT OF PENTACLES": {
        en: {
            quote: "Working alone, no dates",
            interpretation: "Today you will be absorbed in the work right in front of you rather than listening to the noise around you, especially tasks that require concentration and skill. If you need to meet someone today, you may unintentionally come across as rude, for example, staring at your phone to reply to messages from clients or your boss, or picking up work without paying attention to the person you are talking to. If it is a day off, you might pick up a book, clean old collectibles, reorganize your playlist, tidy up files on your computer, or take on freelance work that requires specialized skills. As for love, you would have to answer like a celebrity: \"Right now I am focused on work.\""
        },
        ja: {
            quote: "一人で仕事、デートなし",
            interpretation: "今日は周囲の声よりも目の前の仕事に没頭するでしょう。特に集中力と技術を必要とする仕事です。今日誰かに会う予定がある場合、無意識のうちに失礼な態度をとってしまうかもしれません。例えば、クライアントや上司からのメッセージに返信するためにスマホをずっと見つめていたり、会話相手を無視して仕事を始めてしまったり。休日であれば、本を読んだり、古いコレクションを手入れしたり、プレイリストを整理したり、パソコン内のファイルを整頓したり、専門的なスキルが必要な副業を引き受けたりするかもしれません。恋愛に関しては、芸能人のように答えるしかないでしょう…「今は仕事に集中しています」。"
        },
        ko: {
            quote: "혼자 일하고 데이트 없음",
            interpretation: "오늘은 주변의 소리보다 눈앞의 업무에 몰두할 것입니다. 특히 집중력과 기술이 필요한 작업에 빠져들 것입니다. 오늘 누군가를 만나야 한다면, 의도치 않게 무례하게 행동할 수 있습니다. 예를 들어 고객이나 상사의 메시지에 답장하느라 폰만 쳐다보거나, 대화 상대를 신경 쓰지 않고 일을 하는 것입니다. 휴일이라면 책을 읽거나, 오래된 수집품을 정리하거나, 플레이리스트를 재구성하거나, 컴퓨터의 파일을 정리하거나, 전문 기술이 필요한 부업을 맡을 수 있습니다. 연애에 대해서는 연예인처럼 대답할 수밖에 없겠죠: \"요즘은 일에만 집중하고 있어요.\""
        },
        "zh-CN": {
            quote: "一个人工作，没有约会",
            interpretation: "今天你会沉浸在眼前的工作中，而不是去听周围的声音，尤其是那些需要专注和技术的任务。如果今天需要见人，你可能会无意中表现得不太礼貌，比如一直盯着手机回复客户或老板的消息，或者不顾对方自顾自地处理工作。如果是休息日，你可能会拿起一本书、整理旧的收藏品、重新编排播放列表、整理电脑里的文件，或者接一些需要专业技能的兼职。至于感情嘛，只能像明星一样回答了：\"最近专注于工作。\""
        },
        "zh-TW": {
            quote: "一個人工作，沒有約會",
            interpretation: "今天你會沉浸在眼前的工作中，而不是去聽周圍的聲音，尤其是那些需要專注和技術的任務。如果今天需要見人，你可能會無意中表現得不太禮貌，比如一直盯著手機回覆客戶或老闆的訊息，或者不顧對方自顧自地處理工作。如果是休息日，你可能會拿起一本書、整理舊的收藏品、重新編排播放清單、整理電腦裡的檔案，或者接一些需要專業技能的兼職。至於感情嘛，只能像明星一樣回答了：「最近專注於工作。」"
        },
        fr: { quote: "Travailler sur soi et sur la relation", interpretation: "Aujourd'hui, vous serez absorbé(e) par le travail devant vous plutôt que par le bruit environnant, en particulier les tâches nécessitant concentration et savoir-faire. Si vous devez rencontrer quelqu'un aujourd'hui, vous pourriez involontairement paraître impoli(e) — par exemple en fixant votre téléphone pour répondre aux messages de clients ou de votre supérieur, ou en reprenant votre travail sans prêter attention à votre interlocuteur. Si c'est un jour de repos, vous pourriez lire un livre, nettoyer de vieilles collections, réorganiser votre playlist, ranger les fichiers de votre ordinateur ou accepter un travail freelance nécessitant des compétences spécialisées. Quant à l'amour, vous devrez répondre comme une star : « En ce moment, je me concentre sur le travail. »" }
    },
    "NINE OF PENTACLES": {
        en: {
            quote: "Only dates in Thonglor, the ultimate diva",
            interpretation: "Today you may need to pay more attention to your appearance than usual. You might have a date in an upscale lifestyle district or need to present a project whose selling point is premium quality. Even though others may focus more on your looks than on your actual work, you do not see that as a bad thing. You view image as the first door, while the second door is skill and ability. In addition, there are good signs that you will receive a windfall or a nice gift."
        },
        ja: {
            quote: "高級エリアでのデートのみ、究極のディーバ",
            interpretation: "今日はいつもより外見に気を配る必要があるかもしれません。高級なライフスタイルエリアでデートがあったり、プレミアム感が売りのプロジェクトのプレゼンをしなければならないかもしれません。他の人があなたの実績よりも外見に注目するとしても、それを悪いことだとは思いません。あなたはイメージを最初の扉、そして腕前と能力を二番目の扉と捉えています。さらに、臨時収入や素敵なプレゼントを受け取る良い兆しもあります。"
        },
        ko: {
            quote: "강남에서만 데이트, 궁극의 디바",
            interpretation: "오늘은 평소보다 외모에 더 신경 써야 할 수 있습니다. 고급 라이프스타일 지역에서 데이트가 있거나, 프리미엄이 핵심 포인트인 프로젝트를 발표해야 할 수 있습니다. 다른 사람들이 당신의 실력보다 외모에 더 관심을 가져도, 당신은 그것을 나쁘게 생각하지 않습니다. 이미지는 첫 번째 문이고, 실력과 능력은 두 번째 문이라고 생각합니다. 그 외에도 횡재나 좋은 선물을 받을 좋은 징조가 있습니다."
        },
        "zh-CN": {
            quote: "只在高档区约会，终极女王",
            interpretation: "今天你可能需要比平时更注重自己的外在形象。你可能会在高档生活区有一个约会，或者需要做一个卖点是高端品质的工作汇报。即使别人更关注你的外貌而不是你的实际工作，你也不觉得这是坏事。你认为形象是第一道门，而技术和能力是第二道门。此外，你还有获得意外之财或收到不错礼物的好兆头。"
        },
        "zh-TW": {
            quote: "只在高檔區約會，終極女王",
            interpretation: "今天你可能需要比平時更注重自己的外在形象。你可能會在高檔生活區有一個約會，或者需要做一個賣點是高端品質的工作簡報。即使別人更關注你的外貌而不是你的實際工作，你也不覺得這是壞事。你認為形象是第一道門，而技術和能力是第二道門。此外，你還有獲得意外之財或收到不錯禮物的好兆頭。"
        },
        fr: { quote: "Indépendance et autosuffisance avant l'amour", interpretation: "Aujourd'hui, vous devrez peut-être soigner votre apparence plus que d'habitude. Vous pourriez avoir un rendez-vous dans un quartier huppé ou devoir présenter un projet dont le point fort est la qualité premium. Même si les autres s'intéressent davantage à votre apparence qu'à votre travail, vous ne voyez pas cela comme un problème. Vous considérez l'image comme la première porte, tandis que la deuxième est le talent et la compétence. De plus, il y a de bonnes chances que vous receviez une aubaine ou un beau cadeau." }
    },
    "TEN OF PENTACLES": {
        en: {
            quote: "Beware of someone taken, family may not approve",
            interpretation: "Today you may need to attend an important meeting related to finances and budgets. If you are in a management position, there could be a debate with senior figures over conflicting visions and approaches. The meeting may drain a considerable amount of your energy. Alternatively, you may need to travel to a busy place such as a shopping mall, a bank, or even the finance department at work, where you could face drawn-out discussions about disbursements. For those at home, there may be a disagreement with an elder regarding the management of household assets or belongings."
        },
        ja: {
            quote: "既婚者に注意、家族が承認しないかも",
            interpretation: "今日は財務や予算に関する重要な会議に出席する必要があるかもしれません。管理職の立場であれば、ビジョンや仕事の進め方について目上の人と意見が対立する可能性があります。会議はかなりのエネルギーを消耗させるかもしれません。あるいは、ショッピングモール、銀行、あるいは職場の経理部門など人の多い場所に行く必要があるかもしれません。そこでは経費の精算について長引く話し合いになるかもしれません。家にいる人は、家庭内の財産や持ち物の管理について目上の人と意見が食い違うことがあるかもしれません。"
        },
        ko: {
            quote: "이미 있는 사람 조심, 가족이 승인하지 않을 수 있음",
            interpretation: "오늘은 재정 및 예산과 관련된 중요한 회의에 참석해야 할 수 있습니다. 관리직이라면 비전과 업무 방향에 대해 윗분들과 의견 충돌이 있을 수 있습니다. 회의에 상당한 에너지가 소모될 수 있습니다. 또는 쇼핑몰, 은행, 심지어 직장의 재무 부서 등 사람이 많은 곳에 가야 할 수도 있으며, 비용 집행에 대한 긴 논의가 이어질 수 있습니다. 집에 있는 분들은 가정 내 재산이나 물건 관리 문제로 어른과 의견 충돌이 있을 수 있습니다."
        },
        "zh-CN": {
            quote: "小心有主的人，家人可能不同意",
            interpretation: "今天你可能需要参加一场与财务和预算相关的重要会议。如果你是管理层，可能会与长辈就愿景和工作方向产生分歧。这场会议可能会消耗你不少精力。又或者，你可能需要前往人流密集的地方，比如商场、银行，甚至是公司的财务部门，可能会面临冗长的费用报销讨论。对于在家的人，可能会因为家庭资产或家中物品的管理与长辈发生争执。"
        },
        "zh-TW": {
            quote: "小心有主的人，家人可能不同意",
            interpretation: "今天你可能需要參加一場與財務和預算相關的重要會議。如果你是管理層，可能會與長輩就願景和工作方向產生分歧。這場會議可能會消耗你不少精力。又或者，你可能需要前往人流密集的地方，比如商場、銀行，甚至是公司的財務部門，可能會面臨冗長的費用核銷討論。對於在家的人，可能會因為家庭資產或家中物品的管理與長輩發生爭執。"
        },
        fr: { quote: "Amour durable et sécurité à long terme", interpretation: "Aujourd'hui, vous pourriez devoir assister à une réunion importante portant sur les finances et le budget. Si vous occupez un poste de direction, il pourrait y avoir un débat avec des figures d'autorité sur des visions et des approches divergentes. La réunion risque de vous demander beaucoup d'énergie. Sinon, vous pourriez devoir vous rendre dans un endroit fréquenté comme un centre commercial, une banque ou le service financier de votre entreprise, où des discussions interminables sur les remboursements pourraient avoir lieu. Pour ceux qui restent à la maison, il pourrait y avoir un désaccord avec un aîné concernant la gestion des biens ou des affaires du foyer." }
    },
    "PAGE OF PENTACLES": {
        en: {
            quote: "Beware of relationships with hidden interests",
            interpretation: "Today you will meet a young person with exceptional wit and resourcefulness. Although they still lack experience, they have the ability to learn very quickly. If they join your team, they will become a valuable mind that helps drive progress, even if they may sometimes seem slow due to their meticulousness and desire for perfection. Additionally, this could mean receiving interesting news. Even if it does not directly concern you, it may be about someone close to you and could affect you indirectly."
        },
        ja: {
            quote: "隠れた利益のある関係に注意",
            interpretation: "今日は、抜群の機転と才知を持つ若い人に出会うでしょう。まだ経験は浅いものの、非常に速く学ぶ力を持っています。もしチームに加わったら、仕事を前進させてくれる貴重な頭脳になるでしょう。ただし、細部へのこだわりと完璧を求める姿勢から、時折動きが遅く見えることもあるかもしれません。また、興味深いニュースを受け取ることも意味しています。あなたに直接関係がなくても、身近な人の話であり、間接的にあなたに影響を与える可能性があります。"
        },
        ko: {
            quote: "숨겨진 이익이 있는 관계 조심",
            interpretation: "오늘은 뛰어난 재치와 순발력을 갖춘 젊은 사람을 만나게 될 것입니다. 아직 경험은 부족하지만 매우 빠르게 배우는 능력을 갖추고 있습니다. 팀에 합류하면 업무를 추진하는 데 소중한 두뇌가 될 것입니다. 다만 꼼꼼함과 완벽을 추구하는 성격 때문에 때때로 느려 보일 수 있습니다. 또한, 흥미로운 소식을 접하게 될 수도 있습니다. 직접적으로 관련은 없더라도 가까운 사람의 이야기일 수 있으며, 간접적으로 당신에게 영향을 미칠 수 있습니다."
        },
        "zh-CN": {
            quote: "小心有隐藏利益的关系",
            interpretation: "今天你会遇到一个才思敏捷的年轻人。虽然他还缺乏经验，但学习能力极强。如果他加入你的团队，将成为推动工作进展的宝贵智囊，尽管有时因为追求完美和注重细节而显得有些慢。此外，你还可能收到一些有趣的消息。虽然不一定与你直接相关，但可能是身边人的事情，会对你产生间接影响。"
        },
        "zh-TW": {
            quote: "小心有隱藏利益的關係",
            interpretation: "今天你會遇到一個才思敏捷的年輕人。雖然他還缺乏經驗，但學習能力極強。如果他加入你的團隊，將成為推動工作進展的寶貴智囊，儘管有時因為追求完美和注重細節而顯得有些慢。此外，你還可能收到一些有趣的消息。雖然不一定與你直接相關，但可能是身邊人的事情，會對你產生間接影響。"
        },
        fr: { quote: "Quelqu'un de jeune avec des ambitions pratiques", interpretation: "Aujourd'hui, vous rencontrerez une jeune personne dotée d'un esprit vif et d'une grande débrouillardise. Bien qu'elle manque encore d'expérience, elle a une capacité d'apprentissage remarquable. Si elle rejoint votre équipe, elle deviendra un atout précieux qui contribuera à faire avancer les choses, même si elle peut parfois sembler lente en raison de sa méticulosité et de son désir de perfection. De plus, cela pourrait signifier recevoir des nouvelles intéressantes. Même si elles ne vous concernent pas directement, il pourrait s'agir de quelqu'un de proche et cela pourrait vous affecter indirectement." }
    },
    "KNIGHT OF PENTACLES": {
        en: {
            quote: "A stable person but relationship may be slow",
            interpretation: "Although you have an excellent idea, circumstances and your environment may not yet be favorable for taking action right now. It is like having good seeds in your hand, but the soil is still dry and the planting season has not arrived. Be patient and do what you can for now, because everything has its right timing.\n\nAlternatively, today you may work alongside someone who has outstanding analytical skills and values tangible results. They will only be interested in things that are concrete and produce immediate outcomes. If you need to make a presentation, focus on results and clear figures."
        },
        ja: {
            quote: "安定した人だが関係は遅いかも",
            interpretation: "素晴らしいアイデアがあっても、状況や環境がまだ行動に適していないかもしれません。良い種を手に持っているのに、土がまだ乾いていて、種まきの時期が来ていないようなものです。今できることをしながら辛抱強く待ちましょう。すべてのことにはふさわしいタイミングがあるのですから。\n\nあるいは、今日は分析力に優れ、具体的な結果を重視する人と一緒に仕事をするかもしれません。その人は、形あるもの、すぐに成果が出るものにしか興味を示しません。プレゼンをする場合は、結果と明確な数字に焦点を当てましょう。"
        },
        ko: {
            quote: "안정적인 사람이지만 관계가 느릴 수 있음",
            interpretation: "훌륭한 아이디어가 있지만, 상황과 환경이 아직 행동에 옮기기에 유리하지 않을 수 있습니다. 좋은 씨앗을 손에 들고 있지만 흙이 아직 메마르고 파종 시기가 오지 않은 것과 같습니다. 인내심을 가지고 지금 할 수 있는 일을 하세요. 모든 것에는 적절한 타이밍이 있으니까요.\n\n혹은 오늘 뛰어난 분석 능력을 갖추고 구체적인 결과를 중시하는 사람과 함께 일하게 될 수도 있습니다. 그 사람은 눈에 보이고 즉각적인 성과가 나오는 것에만 관심을 가질 것입니다. 발표를 해야 한다면 결과와 명확한 수치에 초점을 맞추세요."
        },
        "zh-CN": {
            quote: "稳定的人但关系可能很慢",
            interpretation: "虽然你有一个很好的想法，但目前的形势和环境可能还不允许你付诸行动。就像手里握着好的种子，但土壤还很干旱，播种的季节还没到。耐心一些，先做好能做的事，因为万事皆有其时。\n\n又或者，今天你可能会和一个分析能力出众、注重实际成果的人共事。他只对看得见、摸得着、能立即见效的东西感兴趣。如果需要做汇报，重点放在成果和清晰的数据上。"
        },
        "zh-TW": {
            quote: "穩定的人但關係可能很慢",
            interpretation: "雖然你有一個很好的想法，但目前的形勢和環境可能還不允許你付諸行動。就像手裡握著好的種子，但土壤還很乾旱，播種的季節還沒到。耐心一些，先做好能做的事，因為萬事皆有其時。\n\n又或者，今天你可能會和一個分析能力出眾、注重實際成果的人共事。他只對看得見、摸得著、能立即見效的東西感興趣。如果需要做簡報，重點放在成果和清晰的數據上。"
        },
        fr: { quote: "Quelqu'un de fiable mais peut-être ennuyeux", interpretation: "Bien que vous ayez une excellente idée, les circonstances et votre environnement ne sont peut-être pas encore favorables pour agir maintenant. C'est comme avoir de bonnes graines en main, mais le sol est encore sec et la saison des semis n'est pas arrivée. Soyez patient(e) et faites ce que vous pouvez pour l'instant, car chaque chose vient en son temps.\n\nSinon, vous pourriez aujourd'hui travailler aux côtés de quelqu'un doté de compétences analytiques remarquables et qui accorde de l'importance aux résultats concrets. Cette personne ne s'intéressera qu'aux choses tangibles et aux résultats immédiats. Si vous devez faire une présentation, concentrez-vous sur les résultats et les chiffres clairs." }
    },
    "QUEEN OF PENTACLES": {
        en: {
            quote: "Still stuck on an ex, not opening up to new people",
            interpretation: "Today you may be extra attentive to the details of your work, to the point of reviewing it over and over again looking for flaws. Even when it is time to submit, you will wait until the last minute to make sure everything is perfect. In group work, you may gather all the tasks onto yourself because you do not trust others. But sometimes you need to let go, because small imperfections can be a charm of their own. In relationships, be careful that the other person may feel suffocated by your excessive worry and possessiveness, causing the relationship to lose its naturalness."
        },
        ja: {
            quote: "まだ元カレ・元カノに執着、新しい人に心を開かない",
            interpretation: "今日は仕事の細部にいつも以上にこだわるかもしれません。欠点を探して何度も見直すほどです。提出の時間になっても、すべてが完璧であることを確認するために最後の最後まで待つでしょう。グループワークでは、他の人を信用できないために、すべてのタスクを自分に集めてしまうかもしれません。しかし、時には手放すことも必要です。小さな不完全さはそれ自体がひとつの魅力になり得るからです。人間関係においては、あなたの過度な心配と独占欲が相手を息苦しくさせ、関係が不自然になってしまうことに注意してください。"
        },
        ko: {
            quote: "아직 전 애인에게 얽매여 새로운 사람에게 마음을 열지 않음",
            interpretation: "오늘은 업무의 세부 사항에 유독 더 신경을 쓸 수 있습니다. 결함을 찾기 위해 몇 번이고 반복해서 검토할 정도입니다. 제출 시간이 되어도 모든 것이 완벽한지 확인하기 위해 마지막 순간까지 기다릴 것입니다. 그룹 작업에서는 다른 사람을 신뢰하지 못해 모든 업무를 자신에게 모을 수 있습니다. 하지만 때로는 놓아줄 줄도 알아야 합니다. 작은 불완전함도 하나의 매력이 될 수 있으니까요. 관계에서는 상대방이 당신의 지나친 걱정과 집착에 답답함을 느낄 수 있으니, 관계가 자연스러움을 잃지 않도록 주의하세요."
        },
        "zh-CN": {
            quote: "还沉浸在前任中，不向新人敞开心扉",
            interpretation: "今天你可能会对工作的细节格外上心，反反复复地检查寻找瑕疵。即使到了交稿时间，你也会等到最后一刻才提交，确保一切完美无缺。在团队合作中，你可能因为不信任别人而把所有任务都揽到自己身上。但有时候你也需要学会放手，因为小小的不完美也可以是一种魅力。在感情方面，要小心对方可能会被你过度的担忧和占有欲弄得喘不过气来，导致关系失去自然和轻松。"
        },
        "zh-TW": {
            quote: "還沉浸在前任中，不向新人敞開心扉",
            interpretation: "今天你可能會對工作的細節格外上心，反反覆覆地檢查尋找瑕疵。即使到了交稿時間，你也會等到最後一刻才提交，確保一切完美無缺。在團隊合作中，你可能因為不信任別人而把所有任務都攬到自己身上。但有時候你也需要學會放手，因為小小的不完美也可以是一種魅力。在感情方面，要小心對方可能會被你過度的擔憂和佔有慾弄得喘不過氣來，導致關係失去自然和輕鬆。"
        },
        fr: { quote: "Quelqu'un de nourrissant et pratique", interpretation: "Aujourd'hui, vous pourriez accorder une attention particulière aux détails de votre travail, au point de le relire encore et encore à la recherche de défauts. Même lorsque c'est l'heure de rendre, vous attendrez la dernière minute pour vous assurer que tout est parfait. Dans le travail d'équipe, vous pourriez rassembler toutes les tâches sur vous-même par manque de confiance envers les autres. Mais parfois, il faut savoir lâcher prise, car les petites imperfections peuvent avoir leur charme. Dans vos relations, attention : l'autre personne pourrait se sentir étouffée par vos inquiétudes et votre possessivité excessives, ce qui pourrait rendre la relation moins naturelle." }
    },
    "KING OF PENTACLES": {
        en: {
            quote: "A wealthy person ready to spoil you",
            interpretation: "Today you are likely to meet a senior person full of experience. It could be your father, a professor, or your supervisor. The conversation will revolve around performance reviews, numbers, and statistics. If your results have not met the targets they set, you will need to explain the factors and reasons behind the shortfall. Additionally, this could mean you have an important appointment related to finances and assets, such as meeting with a tax officer, an accountant, a banker, or an insurance agent.\n\nOn a day off, it could be a day when you treat yourself to a special meal at a quality steakhouse or a restaurant with premium ingredients, rewarding yourself after a hard week of work.\n\nFor those eagerly awaiting a large sum of money, whether from a client, a loan, or a gamble, there are good signs that you will receive positive news."
        },
        ja: {
            quote: "あなたを甘やかす準備ができている裕福な人",
            interpretation: "今日は経験豊富な目上の人に会う可能性が高いです。お父さん、教授、あるいは上司かもしれません。会話は業績評価、数字、統計に関する話が中心になるでしょう。もし成果が相手の設定した目標に達していなければ、その要因と理由を説明する必要があります。また、税務署の職員、会計士、銀行員、保険の担当者との面談など、財務や資産に関する重要な予定があることを意味するかもしれません。\n\n休日であれば、良質なステーキハウスやプレミアム食材を使ったレストランで特別な食事を楽しむ日かもしれません。一週間頑張った自分へのご褒美です。\n\n大きなお金を待っている人、それがクライアントからの入金、融資、あるいは運試しであっても、良い知らせを受け取る兆しがあります。"
        },
        ko: {
            quote: "당신을 spoil할 준비가 된 부유한 사람",
            interpretation: "오늘은 경험이 풍부한 윗분을 만날 가능성이 높습니다. 아버지, 교수님 또는 상사일 수 있습니다. 대화는 업무 평가, 숫자, 통계를 중심으로 이루어질 것입니다. 성과가 상대방이 설정한 목표에 미치지 못한다면 그 요인과 원인을 설명해야 합니다. 또한 세무서 직원, 회계사, 은행원, 보험 설계사 등을 만나는 등 재정 및 자산과 관련된 중요한 약속이 있을 수도 있습니다.\n\n휴일이라면 고급 스테이크 하우스나 프리미엄 재료를 사용한 레스토랑에서 특별한 식사를 하며 힘든 한 주를 보낸 자신에게 보상하는 날이 될 수 있습니다.\n\n고객, 대출, 투자 등에서 큰 금액을 기다리고 있는 분들에게는 좋은 소식을 받을 좋은 징조가 있습니다."
        },
        "zh-CN": {
            quote: "准备宠你的有钱人",
            interpretation: "今天你很可能会见到一位经验丰富的长辈。可能是你的父亲、教授或上司。谈话内容会围绕绩效评估、数字和统计数据展开。如果你的业绩没有达到对方设定的目标，你需要解释造成差距的因素和原因。此外，这也可能意味着你有一个与财务和资产相关的重要会面，比如见税务人员、会计师、银行职员或保险代理人。\n\n如果是休息日，这可能是你用一顿高品质牛排或使用顶级食材的餐厅来犒劳自己的日子，奖励自己辛苦工作了一整周。\n\n对于那些在期待一笔大额资金的人，无论是来自客户、贷款还是博彩，都有收到好消息的好兆头。"
        },
        "zh-TW": {
            quote: "準備寵你的有錢人",
            interpretation: "今天你很可能會見到一位經驗豐富的長輩。可能是你的父親、教授或上司。談話內容會圍繞績效評估、數字和統計數據展開。如果你的業績沒有達到對方設定的目標，你需要解釋造成差距的因素和原因。此外，這也可能意味著你有一個與財務和資產相關的重要會面，比如見稅務人員、會計師、銀行職員或保險代理人。\n\n如果是休息日，這可能是你用一頓高品質牛排或使用頂級食材的餐廳來犒勞自己的日子，獎勵自己辛苦工作了一整週。\n\n對於那些在期待一筆大額資金的人，無論是來自客戶、貸款還是博彩，都有收到好消息的好兆頭。"
        },
        fr: { quote: "Quelqu'un de prospère et généreux", interpretation: "Aujourd'hui, vous êtes susceptible de rencontrer une personne d'expérience occupant un poste d'autorité. Il pourrait s'agir de votre père, d'un professeur ou de votre supérieur hiérarchique. La conversation tournera autour des évaluations de performance, des chiffres et des statistiques. Si vos résultats n'ont pas atteint les objectifs fixés, vous devrez expliquer les facteurs et les raisons de cet écart. De plus, cela pourrait signifier un rendez-vous important lié aux finances et aux actifs, comme une rencontre avec un agent des impôts, un comptable, un banquier ou un agent d'assurance.\n\nUn jour de repos, ce pourrait être l'occasion de vous offrir un repas spécial dans un bon steakhouse ou un restaurant aux ingrédients premium, pour vous récompenser après une semaine de travail intense.\n\nPour ceux qui attendent avec impatience une somme importante — qu'elle provienne d'un client, d'un prêt ou d'un coup de chance — les signes sont favorables pour recevoir de bonnes nouvelles." }
    }
};
