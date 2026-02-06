// Valentine Tarot - Main Application Script

let tarotData = null;
let selectedCardElement = null;
let isAnimating = false;
let isPageReady = false;

// ========================================
// Internationalization (i18n)
// ========================================
let currentLang = 'th';

const translations = {
    th: {
        landing: {
            heading: "Who's Gonna Be My Next",
            mistake: "Mistake?",
            valentine: "Valentine!",
            loading: "กำลังโหลด...",
            instruction: "ใครจะเข้ามาในชีวิตคุณช่วงวาเลนไทน์?",
            clickToDraw: "แตะไพ่เพื่อเริ่มดูดวง"
        },
        main: {
            title: "ใครจะเข้ามาในชีวิตคุณช่วงวาเลนไทน์",
            instruction: "เลือกไพ่ 1 ใบ เพื่อดูคำทำนาย",
            loadingCards: "กำลังโหลดไพ่..."
        },
        ranking: {
            title: "ไพ่ยอดนิยม"
        },
        result: {
            saveImage: "เซฟรูป :",
            share: "บอกต่อ :",
            copy: "คัดลอก",
            acceptProphecy: "น้อมรับคำทำนาย",
            hideSection: "ซ่อน",
            view: "ส่อง",
            notSerious: "ยังไม่เอาจริง",
            drawAgain: "จับใหม่",
            wideImage: "รูปกว้าง",
            messenger: "ส่งทาง Messenger",
            line: "ส่งทาง LINE",
            copyLink: "คัดลอกลิงก์"
        },
        comment: {
            yourName: "ชื่อของคุณ",
            namePlaceholder: "ใส่ชื่อ (ไม่เกิน 15 ตัวอักษร)",
            label: "ความคิดเห็น",
            placeholder: "น้อมรับคำทำนายจากแม่หมอพิมพ์ฟ้า",
            submit: "ส่งความคิดเห็น",
            sending: "กำลังส่ง...",
            reply: "ตอบกลับ",
            replyPlaceholder: "เขียนข้อความตอบกลับ...",
            sendReply: "ส่ง"
        },
        comments: {
            title: "เรื่องเล่าจากวงไพ่ ✦",
            tabNew: "ล่าสุด",
            tabHot: "ยอดนิยม",
            tabMyCard: "ไพ่ฉัน",
            tabMine: "ของฉัน",
            empty: "ยังไม่มีความคิดเห็น",
            myComments: "ความคิดเห็นของฉัน",
            repliedTo: "ที่ฉันเคยตอบ",
            noComments: "ยังไม่ได้แสดงความคิดเห็น",
            goComment: "ไปแสดงความคิดเห็นบนไพ่ของคนอื่นกันเลย!",
            viewLatest: "ดูความคิดเห็นล่าสุด"
        },
        blessing: {
            wantMore: "อยากรู้เพิ่มเติม",
            restart: "เริ่มใหม่"
        },
        toast: {
            copied: "คัดลอกลิงก์แล้ว!",
            replySuccess: "ตอบกลับสำเร็จ",
            submitSuccess: "ส่งสำเร็จ!",
            error: "เกิดข้อผิดพลาด กรุณาลองใหม่",
            systemNotReady: "ระบบยังไม่พร้อม กรุณาลองใหม่"
        },
        common: {
            loading: "กำลังโหลด...",
            prophecy: "คำทำนาย",
            replies: "การตอบกลับ",
            beFirstReply: "✦ ตอบกลับคนแรก",
            otherComments: "ความคิดเห็นอื่นๆ บนไพ่ใบนี้",
            loadError: "ไม่สามารถโหลดความคิดเห็นได้",
            noHotComments: "ยังไม่มีความคิดเห็นยอดนิยม",
            tryReply: "ลองตอบกลับความคิดเห็นสิ!",
            replyCount: "ตอบกลับ"
        },
        time: {
            justNow: "เมื่อสักครู่",
            minutesAgo: "นาทีที่แล้ว",
            hoursAgo: "ชั่วโมงที่แล้ว",
            daysAgo: "วันที่แล้ว"
        },
        share: {
            gotCard: "ฉันจับได้ไพ่",
            letsRead: "มาดูดวงความรักวาเลนไทน์กัน!",
            title: "ดูดวงความรักวาเลนไทน์",
            copiedForMessenger: "คัดลอกข้อความแล้ว! วางใน Messenger ได้เลย",
            copiedText: "คัดลอกข้อความแล้ว!"
        },
        image: {
            selectFirst: "กรุณาเลือกไพ่ก่อน",
            creating: "กำลังสร้างรูป...",
            saved: "บันทึกรูปสำเร็จ!"
        },
        sections: {
            popular: "✦ ยอดนิยม",
            recent: "✦ ล่าสุด"
        },
        cta: {
            notAccepted: "ยังไม่ได้น้อมรับคำทำนาย",
            drawToReceive: "จับไพ่เพื่อรับคำทำนายจากแม่หมอพิมพ์ฟ้า",
            goDrawCard: "ไปจับไพ่กันเลย!",
            acceptFirst: "น้อมรับคำทำนายคนแรก",
            beFirstComment: "ยังไม่มีความคิดเห็น<br>เป็นคนแรกที่แสดงความคิดเห็นกันเถอะ!"
        },
        error: {
            cardLoadFailed: "ไม่สามารถโหลดข้อมูลไพ่ได้",
            cardNotFound: "ไม่พบข้อมูลไพ่",
            noInterpretation: "ไม่พบคำทำนายสำหรับไพ่ใบนี้"
        },
        cardview: {
            commentCount: "ความคิดเห็น",
            noCommentsOnCard: "ยังไม่มีใครแสดงความคิดเห็นบนไพ่ใบนี้",
            noOtherComments: "ยังไม่มีความคิดเห็นอื่นบนไพ่ใบนี้"
        }
    },
    en: {
        landing: {
            heading: "Who's Gonna Be My Next",
            mistake: "Mistake?",
            valentine: "Valentine!",
            loading: "Loading...",
            instruction: "Who will come into your life this Valentine's?",
            clickToDraw: "Tap card to draw"
        },
        main: {
            title: "Who will come into your life this Valentine's?",
            instruction: "Pick 1 card to see your fortune",
            loadingCards: "Loading cards..."
        },
        ranking: {
            title: "Popular Cards"
        },
        result: {
            saveImage: "Save Image:",
            share: "Share:",
            copy: "Copy",
            acceptProphecy: "Accept the Prophecy",
            hideSection: "Hide",
            view: "View",
            notSerious: "Just kidding",
            drawAgain: "Draw Again",
            wideImage: "Wide image",
            messenger: "Share via Messenger",
            line: "Share via LINE",
            copyLink: "Copy link"
        },
        comment: {
            yourName: "Your Name",
            namePlaceholder: "Enter name (max 15 chars)",
            label: "Comment",
            placeholder: "Accept the prophecy from fortune teller",
            submit: "Submit Comment",
            sending: "Sending...",
            reply: "Reply",
            replyPlaceholder: "Write a reply...",
            sendReply: "Send"
        },
        comments: {
            title: "Tales from the Cards ✦",
            tabNew: "Latest",
            tabHot: "Popular",
            tabMyCard: "My Card",
            tabMine: "Mine",
            empty: "No comments yet",
            myComments: "My Comments",
            repliedTo: "Replied To",
            noComments: "No comments yet",
            goComment: "Go comment on other's cards!",
            viewLatest: "View Latest Comments"
        },
        blessing: {
            wantMore: "Want to know more?",
            restart: "Start Over"
        },
        toast: {
            copied: "Link copied!",
            replySuccess: "Reply sent",
            submitSuccess: "Sent!",
            error: "An error occurred. Please try again",
            systemNotReady: "System not ready. Please try again"
        },
        common: {
            loading: "Loading...",
            prophecy: "Prophecy",
            replies: "Replies",
            beFirstReply: "✦ Be the first to reply",
            otherComments: "Other comments on this card",
            loadError: "Unable to load comments",
            noHotComments: "No popular comments yet",
            tryReply: "Try replying to a comment!",
            replyCount: "replies"
        },
        time: {
            justNow: "Just now",
            minutesAgo: "minutes ago",
            hoursAgo: "hours ago",
            daysAgo: "days ago"
        },
        share: {
            gotCard: "I got the card",
            letsRead: "Let's read Valentine love fortune!",
            title: "Valentine Love Fortune",
            copiedForMessenger: "Text copied! Paste in Messenger",
            copiedText: "Text copied!"
        },
        image: {
            selectFirst: "Please select a card first",
            creating: "Creating image...",
            saved: "Image saved!"
        },
        sections: {
            popular: "✦ Popular",
            recent: "✦ Recent"
        },
        cta: {
            notAccepted: "You haven't accepted the prophecy yet",
            drawToReceive: "Draw a card to receive your fortune",
            goDrawCard: "Let's draw a card!",
            acceptFirst: "Be the first to accept",
            beFirstComment: "No comments yet<br>Be the first to comment!"
        },
        error: {
            cardLoadFailed: "Unable to load card data",
            cardNotFound: "Card data not found",
            noInterpretation: "No interpretation found for this card"
        },
        cardview: {
            commentCount: "comments",
            noCommentsOnCard: "No one has commented on this card yet",
            noOtherComments: "No other comments on this card yet"
        }
    },
    "zh-CN": {
        landing: {
            heading: "Who's Gonna Be My Next",
            mistake: "Mistake?",
            valentine: "Valentine!",
            loading: "加载中...",
            instruction: "情人节谁会走进你的生活？",
            clickToDraw: "点击抽牌"
        },
        main: {
            title: "情人节谁会走进你的生活？",
            instruction: "选择1张牌看你的运势",
            loadingCards: "加载牌中..."
        },
        ranking: {
            title: "热门牌"
        },
        result: {
            saveImage: "保存图片：",
            share: "分享：",
            copy: "复制",
            acceptProphecy: "接受预言",
            hideSection: "隐藏",
            view: "查看",
            notSerious: "开玩笑的",
            drawAgain: "重新抽牌",
            wideImage: "宽图",
            messenger: "分享到Messenger",
            line: "分享到LINE",
            copyLink: "复制链接"
        },
        comment: {
            yourName: "你的名字",
            namePlaceholder: "输入名字（最多15字）",
            label: "评论",
            placeholder: "接受占卜师的预言",
            submit: "提交评论",
            sending: "发送中...",
            reply: "回复",
            replyPlaceholder: "写回复...",
            sendReply: "发送"
        },
        comments: {
            title: "牌桌故事 ✦",
            tabNew: "最新",
            tabHot: "热门",
            tabMyCard: "我的牌",
            tabMine: "我的",
            empty: "暂无评论",
            myComments: "我的评论",
            repliedTo: "我回复的",
            noComments: "暂无评论",
            goComment: "去给别人的牌评论吧！",
            viewLatest: "查看最新评论"
        },
        blessing: {
            wantMore: "想了解更多？",
            restart: "重新开始"
        },
        toast: {
            copied: "链接已复制！",
            replySuccess: "回复成功",
            submitSuccess: "发送成功！",
            error: "出错了，请重试",
            systemNotReady: "系统未准备好，请重试"
        },
        common: {
            loading: "加载中...",
            prophecy: "预言",
            replies: "回复",
            beFirstReply: "✦ 成为第一个回复",
            otherComments: "该牌的其他评论",
            loadError: "无法加载评论",
            noHotComments: "还没有热门评论",
            tryReply: "试着回复一条评论吧！",
            replyCount: "回复"
        },
        time: {
            justNow: "刚刚",
            minutesAgo: "分钟前",
            hoursAgo: "小时前",
            daysAgo: "天前"
        },
        share: {
            gotCard: "我抽到了",
            letsRead: "一起来看情人节爱情运势吧！",
            title: "情人节爱情运势",
            copiedForMessenger: "已复制文字！请粘贴到Messenger",
            copiedText: "已复制文字！"
        },
        image: {
            selectFirst: "请先选择一张牌",
            creating: "正在生成图片...",
            saved: "图片保存成功！"
        },
        sections: {
            popular: "✦ 热门",
            recent: "✦ 最新"
        },
        cta: {
            notAccepted: "你还没有接受预言",
            drawToReceive: "抽一张牌来获取你的运势",
            goDrawCard: "去抽牌吧！",
            acceptFirst: "成为第一个接受的人",
            beFirstComment: "暂无评论<br>来成为第一个评论的人吧！"
        },
        error: {
            cardLoadFailed: "无法加载牌数据",
            cardNotFound: "找不到牌数据",
            noInterpretation: "找不到这张牌的解读"
        },
        cardview: {
            commentCount: "条评论",
            noCommentsOnCard: "还没有人在这张牌上评论",
            noOtherComments: "这张牌上还没有其他评论"
        }
    },
    "zh-TW": {
        landing: {
            heading: "Who's Gonna Be My Next",
            mistake: "Mistake?",
            valentine: "Valentine!",
            loading: "載入中...",
            instruction: "情人節誰會走進你的生活？",
            clickToDraw: "點擊抽牌"
        },
        main: {
            title: "情人節誰會走進你的生活？",
            instruction: "選擇1張牌看你的運勢",
            loadingCards: "載入牌中..."
        },
        ranking: {
            title: "熱門牌"
        },
        result: {
            saveImage: "儲存圖片：",
            share: "分享：",
            copy: "複製",
            acceptProphecy: "接受預言",
            hideSection: "隱藏",
            view: "查看",
            notSerious: "開玩笑的",
            drawAgain: "重新抽牌",
            wideImage: "寬圖",
            messenger: "分享到Messenger",
            line: "分享到LINE",
            copyLink: "複製連結"
        },
        comment: {
            yourName: "你的名字",
            namePlaceholder: "輸入名字（最多15字）",
            label: "評論",
            placeholder: "接受占卜師的預言",
            submit: "提交評論",
            sending: "發送中...",
            reply: "回覆",
            replyPlaceholder: "寫回覆...",
            sendReply: "發送"
        },
        comments: {
            title: "牌桌故事 ✦",
            tabNew: "最新",
            tabHot: "熱門",
            tabMyCard: "我的牌",
            tabMine: "我的",
            empty: "暫無評論",
            myComments: "我的評論",
            repliedTo: "我回覆的",
            noComments: "暫無評論",
            goComment: "去給別人的牌評論吧！",
            viewLatest: "查看最新評論"
        },
        blessing: {
            wantMore: "想了解更多？",
            restart: "重新開始"
        },
        toast: {
            copied: "連結已複製！",
            replySuccess: "回覆成功",
            submitSuccess: "發送成功！",
            error: "出錯了，請重試",
            systemNotReady: "系統未準備好，請重試"
        },
        common: {
            loading: "載入中...",
            prophecy: "預言",
            replies: "回覆",
            beFirstReply: "✦ 成為第一個回覆",
            otherComments: "該牌的其他評論",
            loadError: "無法載入評論",
            noHotComments: "還沒有熱門評論",
            tryReply: "試著回覆一條評論吧！",
            replyCount: "回覆"
        },
        time: {
            justNow: "剛剛",
            minutesAgo: "分鐘前",
            hoursAgo: "小時前",
            daysAgo: "天前"
        },
        share: {
            gotCard: "我抽到了",
            letsRead: "一起來看情人節愛情運勢吧！",
            title: "情人節愛情運勢",
            copiedForMessenger: "已複製文字！請貼到Messenger",
            copiedText: "已複製文字！"
        },
        image: {
            selectFirst: "請先選擇一張牌",
            creating: "正在產生圖片...",
            saved: "圖片儲存成功！"
        },
        sections: {
            popular: "✦ 熱門",
            recent: "✦ 最新"
        },
        cta: {
            notAccepted: "你還沒有接受預言",
            drawToReceive: "抽一張牌來獲取你的運勢",
            goDrawCard: "去抽牌吧！",
            acceptFirst: "成為第一個接受的人",
            beFirstComment: "暫無評論<br>來成為第一個評論的人吧！"
        },
        error: {
            cardLoadFailed: "無法載入牌資料",
            cardNotFound: "找不到牌資料",
            noInterpretation: "找不到這張牌的解讀"
        },
        cardview: {
            commentCount: "則評論",
            noCommentsOnCard: "還沒有人在這張牌上評論",
            noOtherComments: "這張牌上還沒有其他評論"
        }
    },
    ko: {
        landing: {
            heading: "Who's Gonna Be My Next",
            mistake: "Mistake?",
            valentine: "Valentine!",
            loading: "로딩 중...",
            instruction: "발렌타인에 누가 당신의 삶에 들어올까요?",
            clickToDraw: "카드를 탭하여 뽑기"
        },
        main: {
            title: "발렌타인에 누가 당신의 삶에 들어올까요?",
            instruction: "운세를 보려면 카드 1장을 선택하세요",
            loadingCards: "카드 로딩 중..."
        },
        ranking: {
            title: "인기 카드"
        },
        result: {
            saveImage: "이미지 저장:",
            share: "공유:",
            copy: "복사",
            acceptProphecy: "예언 받아들이기",
            hideSection: "숨기기",
            view: "보기",
            notSerious: "농담이에요",
            drawAgain: "다시 뽑기",
            wideImage: "와이드 이미지",
            messenger: "메신저로 공유",
            line: "LINE으로 공유",
            copyLink: "링크 복사"
        },
        comment: {
            yourName: "이름",
            namePlaceholder: "이름 입력 (최대 15자)",
            label: "댓글",
            placeholder: "점술사의 예언을 받아들이세요",
            submit: "댓글 달기",
            sending: "전송 중...",
            reply: "답글",
            replyPlaceholder: "답글 작성...",
            sendReply: "전송"
        },
        comments: {
            title: "카드의 이야기 ✦",
            tabNew: "최신",
            tabHot: "인기",
            tabMyCard: "내 카드",
            tabMine: "내 것",
            empty: "댓글이 없습니다",
            myComments: "내 댓글",
            repliedTo: "내가 답글 단",
            noComments: "댓글이 없습니다",
            goComment: "다른 사람의 카드에 댓글을 달아보세요!",
            viewLatest: "최신 댓글 보기"
        },
        blessing: {
            wantMore: "더 알고 싶으세요?",
            restart: "다시 시작"
        },
        toast: {
            copied: "링크 복사됨!",
            replySuccess: "답글 완료",
            submitSuccess: "전송 완료!",
            error: "오류가 발생했습니다. 다시 시도해 주세요",
            systemNotReady: "시스템 준비 중입니다. 다시 시도해 주세요"
        },
        common: {
            loading: "로딩 중...",
            prophecy: "예언",
            replies: "답글",
            beFirstReply: "✦ 첫 번째 답글 달기",
            otherComments: "이 카드의 다른 댓글",
            loadError: "댓글을 불러올 수 없습니다",
            noHotComments: "인기 댓글이 아직 없습니다",
            tryReply: "댓글에 답글을 달아보세요!",
            replyCount: "답글"
        },
        time: {
            justNow: "방금 전",
            minutesAgo: "분 전",
            hoursAgo: "시간 전",
            daysAgo: "일 전"
        },
        share: {
            gotCard: "나는",
            letsRead: "발렌타인 사랑 운세를 함께 봐요!",
            title: "발렌타인 사랑 운세",
            copiedForMessenger: "텍스트 복사됨! 메신저에 붙여넣기",
            copiedText: "텍스트 복사됨!"
        },
        image: {
            selectFirst: "먼저 카드를 선택해주세요",
            creating: "이미지 생성 중...",
            saved: "이미지 저장 완료!"
        },
        sections: {
            popular: "✦ 인기",
            recent: "✦ 최신"
        },
        cta: {
            notAccepted: "아직 예언을 받지 않았어요",
            drawToReceive: "카드를 뽑아 운세를 받아보세요",
            goDrawCard: "카드 뽑으러 가기!",
            acceptFirst: "첫 번째로 받기",
            beFirstComment: "아직 댓글이 없어요<br>첫 번째 댓글을 남겨보세요!"
        },
        error: {
            cardLoadFailed: "카드 데이터를 불러올 수 없습니다",
            cardNotFound: "카드 데이터를 찾을 수 없습니다",
            noInterpretation: "이 카드의 해석을 찾을 수 없습니다"
        },
        cardview: {
            commentCount: "개의 댓글",
            noCommentsOnCard: "아직 이 카드에 댓글이 없습니다",
            noOtherComments: "이 카드에 다른 댓글이 없습니다"
        }
    },
    ja: {
        landing: {
            heading: "Who's Gonna Be My Next",
            mistake: "Mistake?",
            valentine: "Valentine!",
            loading: "読み込み中...",
            instruction: "バレンタインに誰があなたの人生に入ってくる？",
            clickToDraw: "カードをタップして引く"
        },
        main: {
            title: "バレンタインに誰があなたの人生に入ってくる？",
            instruction: "運勢を見るためにカードを1枚選んでください",
            loadingCards: "カードを読み込み中..."
        },
        ranking: {
            title: "人気カード"
        },
        result: {
            saveImage: "画像を保存：",
            share: "シェア：",
            copy: "コピー",
            acceptProphecy: "予言を受け入れる",
            hideSection: "隠す",
            view: "見る",
            notSerious: "冗談です",
            drawAgain: "もう一度引く",
            wideImage: "ワイド画像",
            messenger: "メッセンジャーでシェア",
            line: "LINEでシェア",
            copyLink: "リンクをコピー"
        },
        comment: {
            yourName: "名前",
            namePlaceholder: "名前を入力（最大15文字）",
            label: "コメント",
            placeholder: "占い師の予言を受け入れる",
            submit: "コメント送信",
            sending: "送信中...",
            reply: "返信",
            replyPlaceholder: "返信を書く...",
            sendReply: "送信"
        },
        comments: {
            title: "カードの物語 ✦",
            tabNew: "最新",
            tabHot: "人気",
            tabMyCard: "私のカード",
            tabMine: "私の",
            empty: "コメントはまだありません",
            myComments: "私のコメント",
            repliedTo: "返信した",
            noComments: "コメントはまだありません",
            goComment: "他の人のカードにコメントしよう！",
            viewLatest: "最新コメントを見る"
        },
        blessing: {
            wantMore: "もっと知りたい？",
            restart: "やり直す"
        },
        toast: {
            copied: "リンクをコピーしました！",
            replySuccess: "返信完了",
            submitSuccess: "送信完了！",
            error: "エラーが発生しました。もう一度お試しください",
            systemNotReady: "システムの準備ができていません。もう一度お試しください"
        },
        common: {
            loading: "読み込み中...",
            prophecy: "予言",
            replies: "返信",
            beFirstReply: "✦ 最初に返信する",
            otherComments: "このカードの他のコメント",
            loadError: "コメントを読み込めません",
            noHotComments: "人気コメントはまだありません",
            tryReply: "コメントに返信してみましょう！",
            replyCount: "返信"
        },
        time: {
            justNow: "たった今",
            minutesAgo: "分前",
            hoursAgo: "時間前",
            daysAgo: "日前"
        },
        share: {
            gotCard: "私のカードは",
            letsRead: "バレンタインの恋愛運を見てみよう！",
            title: "バレンタイン恋愛運",
            copiedForMessenger: "テキストをコピーしました！メッセンジャーに貼り付けてください",
            copiedText: "テキストをコピーしました！"
        },
        image: {
            selectFirst: "先にカードを選んでください",
            creating: "画像を作成中...",
            saved: "画像を保存しました！"
        },
        sections: {
            popular: "✦ 人気",
            recent: "✦ 最新"
        },
        cta: {
            notAccepted: "まだ予言を受け入れていません",
            drawToReceive: "カードを引いて運勢を見てください",
            goDrawCard: "カードを引きに行こう！",
            acceptFirst: "最初に受け入れる",
            beFirstComment: "コメントはまだありません<br>最初のコメントを書いてみましょう！"
        },
        error: {
            cardLoadFailed: "カードデータを読み込めません",
            cardNotFound: "カードデータが見つかりません",
            noInterpretation: "このカードの解釈が見つかりません"
        },
        cardview: {
            commentCount: "件のコメント",
            noCommentsOnCard: "まだこのカードにコメントがありません",
            noOtherComments: "このカードに他のコメントはありません"
        }
    }
};

// Card name translations (Major Arcana)
const cardNameTranslations = {
    "THE FOOL": { ja: "愚者", ko: "바보", "zh-CN": "愚人", "zh-TW": "愚人" },
    "THE MAGICIAN": { ja: "魔術師", ko: "마법사", "zh-CN": "魔术师", "zh-TW": "魔術師" },
    "THE HIGH PRIESTESS": { ja: "女教皇", ko: "여사제", "zh-CN": "女祭司", "zh-TW": "女祭司" },
    "THE EMPRESS": { ja: "女帝", ko: "여황제", "zh-CN": "女皇", "zh-TW": "女皇" },
    "THE EMPEROR": { ja: "皇帝", ko: "황제", "zh-CN": "皇帝", "zh-TW": "皇帝" },
    "THE HIEROPHANT": { ja: "教皇", ko: "교황", "zh-CN": "教皇", "zh-TW": "教皇" },
    "THE LOVERS": { ja: "恋人", ko: "연인", "zh-CN": "恋人", "zh-TW": "戀人" },
    "THE CHARIOT": { ja: "戦車", ko: "전차", "zh-CN": "战车", "zh-TW": "戰車" },
    "STRENGTH": { ja: "力", ko: "힘", "zh-CN": "力量", "zh-TW": "力量" },
    "THE HERMIT": { ja: "隠者", ko: "은둔자", "zh-CN": "隐士", "zh-TW": "隱士" },
    "WHEEL OF FORTUNE": { ja: "運命の輪", ko: "운명의 수레바퀴", "zh-CN": "命运之轮", "zh-TW": "命運之輪" },
    "JUSTICE": { ja: "正義", ko: "정의", "zh-CN": "正义", "zh-TW": "正義" },
    "THE HANGED MAN": { ja: "吊された男", ko: "매달린 남자", "zh-CN": "倒吊人", "zh-TW": "倒吊人" },
    "DEATH": { ja: "死神", ko: "죽음", "zh-CN": "死神", "zh-TW": "死神" },
    "TEMPERANCE": { ja: "節制", ko: "절제", "zh-CN": "节制", "zh-TW": "節制" },
    "THE DEVIL": { ja: "悪魔", ko: "악마", "zh-CN": "恶魔", "zh-TW": "惡魔" },
    "THE TOWER": { ja: "塔", ko: "탑", "zh-CN": "高塔", "zh-TW": "高塔" },
    "THE STAR": { ja: "星", ko: "별", "zh-CN": "星星", "zh-TW": "星星" },
    "THE MOON": { ja: "月", ko: "달", "zh-CN": "月亮", "zh-TW": "月亮" },
    "THE SUN": { ja: "太陽", ko: "태양", "zh-CN": "太阳", "zh-TW": "太陽" },
    "JUDGEMENT": { ja: "審判", ko: "심판", "zh-CN": "审判", "zh-TW": "審判" },
    "THE WORLD": { ja: "世界", ko: "세계", "zh-CN": "世界", "zh-TW": "世界" }
};

// Get translated card name
function getCardName(englishName) {
    if (currentLang === 'th' || currentLang === 'en') {
        return englishName;
    }
    const trans = cardNameTranslations[englishName];
    return trans && trans[currentLang] ? trans[currentLang] : englishName;
}

// Card interpretation translations (Major Arcana summary versions)
const cardInterpretations = {
    "THE FOOL": {
        en: {
            quote: "Someone who comes unexpectedly, not knowing what they truly want",
            interpretation: "Someone who isn't ready for a serious relationship. If they're willing to commit, they've likely just come out of a relationship. They may come unexpectedly, fun-loving but unsure of what they truly want. They often lack clear goals in relationships and seem to have no direction."
        },
        ja: {
            quote: "計画なしに来る人、自分が本当に何を望んでいるかわからない",
            interpretation: "真剣な関係の準備ができていない人です。もし彼らがコミットする意思があるなら、おそらく最近関係から抜け出したばかりです。計画なしに予期せず現れ、楽しいけれど本当に何を望んでいるかわからない人かもしれません。関係においても明確な目標がないことが多いです。"
        },
        ko: {
            quote: "계획 없이 오는 사람, 자신이 진정으로 원하는 것을 모름",
            interpretation: "진지한 관계를 맺을 준비가 되지 않은 사람입니다. 만약 그들이 헌신할 의향이 있다면, 최근에 관계에서 막 벗어났을 가능성이 높습니다. 계획 없이 예상치 못하게 나타나 재미있지만 진정으로 원하는 것이 무엇인지 모르는 사람일 수 있습니다. 관계에서 명확한 목표가 없어 보입니다."
        },
        "zh-CN": {
            quote: "没有计划就来的人，不知道自己真正想要什么",
            interpretation: "这是一个还没准备好认真恋爱的人。如果他们愿意承诺，可能刚从一段感情中走出来。他们可能会毫无计划地意外出现，虽然有趣但不确定自己真正想要什么。在感情中往往没有明确的目标。"
        },
        "zh-TW": {
            quote: "沒有計劃就來的人，不知道自己真正想要什麼",
            interpretation: "這是一個還沒準備好認真戀愛的人。如果他們願意承諾，可能剛從一段感情中走出來。他們可能會毫無計劃地意外出現，雖然有趣但不確定自己真正想要什麼。在感情中往往沒有明確的目標。"
        }
    },
    "THE MAGICIAN": {
        en: {
            quote: "A charming and talented person, desired by many",
            interpretation: "A charming, talented person who is well-known. They may work as a specialist or professional such as doctor, lawyer, engineer, designer, or expert in various fields. This person likely has many admirers, great communication skills, and knows how to win people over."
        },
        ja: {
            quote: "魅力的で才能のある人、多くの人に求められる",
            interpretation: "よく知られている魅力的で才能のある人です。医師、弁護士、エンジニア、デザイナーなど様々な分野の専門家として働いているかもしれません。この人は多くの崇拝者がいて、コミュニケーション能力が高く、人の心をつかむ方法を知っています。"
        },
        ko: {
            quote: "매력적이고 재능 있는 사람, 많은 사람들이 원하는",
            interpretation: "잘 알려진 매력적이고 재능 있는 사람입니다. 의사, 변호사, 엔지니어, 디자이너 등 다양한 분야의 전문가로 일할 수 있습니다. 이 사람은 많은 팬이 있고 의사소통 능력이 뛰어나며 사람들의 마음을 사로잡는 방법을 알고 있습니다."
        },
        "zh-CN": {
            quote: "有魅力且多才多艺的人，受到很多人的欢迎",
            interpretation: "一个有魅力、有才华、广为人知的人。他们可能是各种领域的专业人士，如医生、律师、工程师或设计师。这个人可能有很多仰慕者，沟通能力强，懂得如何赢得人心。"
        },
        "zh-TW": {
            quote: "有魅力且多才多藝的人，受到很多人的歡迎",
            interpretation: "一個有魅力、有才華、廣為人知的人。他們可能是各種領域的專業人士，如醫生、律師、工程師或設計師。這個人可能有很多仰慕者，溝通能力強，懂得如何贏得人心。"
        }
    },
    "THE LOVERS": {
        en: { quote: "Someone who clicks with you from the very first meeting", interpretation: "Someone who comes with a perfect connection. You'll have chemistry from the first meeting. They share similar values and interests with you. This is a balanced relationship where both understand each other well and can communicate openly." },
        ja: { quote: "最初の出会いからぴったり合う人", interpretation: "完璧なつながりを持って来る人です。最初の出会いから化学反応があります。似た価値観と興味を持っています。お互いをよく理解し、オープンに話し合える関係です。" },
        ko: { quote: "첫 만남부터 잘 맞는 사람", interpretation: "완벽한 연결을 가지고 오는 사람입니다. 첫 만남부터 케미가 있을 것입니다. 비슷한 가치관과 관심사를 공유합니다. 서로를 잘 이해하고 솔직하게 대화할 수 있는 균형 잡힌 관계입니다." },
        "zh-CN": { quote: "从第一次见面就很合拍的人", interpretation: "一个带着完美连接而来的人。你们从第一次见面就会有化学反应。你们有相似的价值观和兴趣。这是一段平衡的关系，双方都能很好地理解对方，坦诚沟通。" },
        "zh-TW": { quote: "從第一次見面就很合拍的人", interpretation: "一個帶著完美連結而來的人。你們從第一次見面就會有化學反應。你們有相似的價值觀和興趣。這是一段平衡的關係，雙方都能很好地理解對方，坦誠溝通。" }
    },
    "THE HIGH PRIESTESS": {
        en: { quote: "A mysterious person who may be hiding secrets", interpretation: "An introvert who works behind the scenes, such as a researcher, programmer, writer, or editor. They're specialized experts but hard to reach because they don't go out often. Warning: Beware of love triangles or relationships that can't be revealed. If you're a woman, the person you're talking to may be hiding something or have someone else in their life." },
        ja: { quote: "秘密を隠しているかもしれない神秘的な人", interpretation: "研究者、プログラマー、作家、編集者など裏方で働く内向的な人。専門家ですが、あまり外出しないので近づきにくいです。注意：三角関係や公にできない関係に気をつけて。女性の場合、話している相手が何かを隠しているか、他の人がいるかもしれません。" },
        ko: { quote: "비밀을 숨기고 있을 수 있는 신비로운 사람", interpretation: "연구원, 프로그래머, 작가, 편집자 등 뒤에서 일하는 내성적인 사람입니다. 전문가이지만 자주 외출하지 않아 접근하기 어렵습니다. 주의: 삼각관계나 공개할 수 없는 관계를 조심하세요. 여성이라면 대화 상대가 무언가를 숨기고 있거나 다른 사람이 있을 수 있습니다." },
        "zh-CN": { quote: "可能隐藏着秘密的神秘人", interpretation: "一个在幕后工作的内向者，如研究员、程序员、作家或编辑。是专家但因为不常外出所以很难接近。警告：小心三角恋或无法公开的关系。如果你是女性，你正在聊的人可能在隐瞒什么，或者他的生活中还有其他人。" },
        "zh-TW": { quote: "可能隱藏著秘密的神秘人", interpretation: "一個在幕後工作的內向者，如研究員、程序員、作家或編輯。是專家但因為不常外出所以很難接近。警告：小心三角戀或無法公開的關係。如果你是女性，你正在聊的人可能在隱瞞什麼，或者他的生活中還有其他人。" }
    },
    "THE EMPRESS": {
        en: { quote: "You're already complete, anyone who enters must enhance your life", interpretation: "You're already living a fulfilled life and not actively seeking love. Anyone who wants to pursue you must add value to your life rather than you having to go to them. Right now, if there's no one you're talking to, it's because you prefer staying home and are quite satisfied with yourself. You're deeply in love with yourself and no one has made you feel attracted yet. If someone does come, they must be stable and offer more than your comfortable single life - perhaps someone with financial stability who likes giving gifts and taking care of you." },
        ja: { quote: "あなたはすでに完璧、入ってくる人はあなたの人生を豊かにしなければ", interpretation: "あなたはすでに充実した生活を送っていて、積極的に恋を求めていません。あなたを追いかけたい人は、あなたの人生に価値を加えなければなりません。今、話している人がいないのは、家にいることを好み、自分自身に満足しているからです。自分自身に深く恋をしていて、まだ誰も惹かれる気持ちを起こさせていません。誰かが来るなら、安定していて、あなたの快適な独身生活以上のものを提供できる人でなければ - おそらく経済的に安定していてプレゼントや世話をするのが好きな人です。" },
        ko: { quote: "당신은 이미 완벽해요, 들어오는 사람은 당신의 삶을 향상시켜야 해요", interpretation: "이미 충만한 삶을 살고 있고 적극적으로 사랑을 찾지 않습니다. 당신을 추구하려는 사람은 당신이 그들에게 가는 것이 아니라 당신의 삶에 가치를 더해야 합니다. 지금 대화 상대가 없다면 집에 있는 것을 선호하고 자신에게 꽤 만족하기 때문입니다. 자신을 깊이 사랑하고 있고 아직 아무도 끌림을 느끼게 하지 못했습니다. 누군가 온다면 안정적이고 편안한 싱글 생활보다 더 많은 것을 제공해야 합니다 - 아마도 경제적으로 안정적이고 선물과 돌봄을 좋아하는 사람일 것입니다." },
        "zh-CN": { quote: "你已经很完美了，进入你生活的人必须让它更好", interpretation: "你已经过着充实的生活，不急于寻找爱情。想追求你的人必须为你的生活增添价值，而不是你去找他们。现在如果没有聊天对象，是因为你喜欢待在家里，对自己很满意。你深深爱着自己，还没有人让你心动。如果有人进来，他们必须稳定，能提供比你舒适的单身生活更多的东西——也许是经济稳定、喜欢送礼物和照顾你的人。" },
        "zh-TW": { quote: "你已經很完美了，進入你生活的人必須讓它更好", interpretation: "你已經過著充實的生活，不急於尋找愛情。想追求你的人必須為你的生活增添價值，而不是你去找他們。現在如果沒有聊天對象，是因為你喜歡待在家裡，對自己很滿意。你深深愛著自己，還沒有人讓你心動。如果有人進來，他們必須穩定，能提供比你舒適的單身生活更多的東西——也許是經濟穩定、喜歡送禮物和照顧你的人。" }
    },
    "THE EMPEROR": {
        en: { quote: "A powerful leader who provides stability", interpretation: "Someone with power and leadership. May hold a high position at work or have a stable life. They like rules, order, and being organized. They may seem strict but provide security and stability." },
        ja: { quote: "安定を与える力強いリーダー", interpretation: "権力とリーダーシップを持つ人です。仕事で高い地位にあるか、安定した生活を送っているかもしれません。規則、秩序、整理整頓を好みます。厳格に見えるかもしれませんが、安全と安定を与えます。" },
        ko: { quote: "안정을 주는 강력한 리더", interpretation: "권력과 리더십을 가진 사람입니다. 직장에서 높은 직위를 가지거나 안정적인 삶을 살고 있을 수 있습니다. 규칙, 질서, 정돈을 좋아합니다. 엄격해 보일 수 있지만 안전과 안정을 제공합니다." },
        "zh-CN": { quote: "提供稳定的强大领导者", interpretation: "有权力和领导力的人。可能在工作中担任高职或生活稳定。喜欢规则、秩序和条理。可能看起来严格，但能提供安全感和稳定。" },
        "zh-TW": { quote: "提供穩定的強大領導者", interpretation: "有權力和領導力的人。可能在工作中擔任高職或生活穩定。喜歡規則、秩序和條理。可能看起來嚴格，但能提供安全感和穩定。" }
    },
    "THE HIEROPHANT": {
        en: { quote: "A good advisor, but doesn't give you special attention", interpretation: "Someone who comes as a counselor but may act like a shared resource that gives kindness to everyone. They treat everyone the same and don't give you special treatment. Could be a teacher, mentor, or elder who gives advice." },
        ja: { quote: "良いアドバイザーだが、特別扱いはしない", interpretation: "アドバイザーとして来るが、みんなに優しさを分け与える共有リソースのような人かもしれません。みんなに平等に接し、特別扱いはしません。教師、メンター、またはアドバイスをくれる年長者かもしれません。" },
        ko: { quote: "좋은 조언자지만 특별한 관심은 주지 않아요", interpretation: "조언자로 오지만 모두에게 친절을 베푸는 공유 자원처럼 행동할 수 있는 사람입니다. 모두를 평등하게 대하고 특별 대우를 하지 않습니다. 선생님, 멘토 또는 조언을 주는 어른일 수 있습니다." },
        "zh-CN": { quote: "好顾问，但不会特别关注你", interpretation: "作为顾问出现但可能像对每个人都施予善意的公共资源。对每个人一视同仁，不会给你特殊待遇。可能是老师、导师或给予建议的长辈。" },
        "zh-TW": { quote: "好顧問，但不會特別關注你", interpretation: "作為顧問出現但可能像對每個人都施予善意的公共資源。對每個人一視同仁，不會給你特殊待遇。可能是老師、導師或給予建議的長輩。" }
    },
    "THE CHARIOT": {
        en: { quote: "A determined person who knows what they want", interpretation: "Someone with determination and enthusiasm who knows exactly what they want and will reach their goals. They may be successful, have leadership qualities, and high energy. Could be someone who travels frequently or is very mobile." },
        ja: { quote: "自分が何を望んでいるかを知っている決意のある人", interpretation: "自分が何を望んでいるかを正確に知っていて、目標に到達する決意と熱意を持つ人です。成功していて、リーダーシップがあり、エネルギッシュかもしれません。頻繁に旅行するか、とても機動力のある人かもしれません。" },
        ko: { quote: "자신이 원하는 것을 아는 결단력 있는 사람", interpretation: "정확히 자신이 원하는 것을 알고 목표에 도달할 결의와 열정을 가진 사람입니다. 성공했고 리더십이 있으며 에너지가 넘칠 수 있습니다. 자주 여행하거나 매우 기동성이 있는 사람일 수 있습니다." },
        "zh-CN": { quote: "知道自己想要什么的坚定的人", interpretation: "有决心和热情，确切知道自己想要什么并会达成目标的人。可能很成功，有领导力，精力充沛。可能是经常旅行或非常机动的人。" },
        "zh-TW": { quote: "知道自己想要什麼的堅定的人", interpretation: "有決心和熱情，確切知道自己想要什麼並會達成目標的人。可能很成功，有領導力，精力充沛。可能是經常旅行或非常機動的人。" }
    },
    "STRENGTH": {
        en: { quote: "Someone who needs your help and encouragement", interpretation: "Someone already in your life - perhaps a close friend or someone you'll need to help and take care of constantly. They may be going through problems and need emotional support. For singles: If someone comes into your life now, check if they already have a partner. They might be having relationship problems and coming to you for comfort." },
        ja: { quote: "あなたの助けと励ましを必要とする人", interpretation: "すでにあなたの人生にいる人かもしれません - おそらく親しい友人か、常に助けて世話をする必要がある人。問題を抱えていて、精神的なサポートが必要かもしれません。独身の方へ：今誰かがあなたの人生に入ってきたら、すでにパートナーがいるか確認してください。関係に問題があり、慰めを求めてあなたのところに来ているかもしれません。" },
        ko: { quote: "당신의 도움과 격려가 필요한 사람", interpretation: "이미 당신의 삶에 있는 사람일 수 있습니다 - 아마도 친한 친구이거나 계속 도와주고 돌봐야 하는 사람. 문제를 겪고 있고 정서적 지원이 필요할 수 있습니다. 싱글이라면: 지금 누군가 당신의 삶에 들어온다면 이미 파트너가 있는지 확인하세요. 관계에 문제가 있어 위로를 구하러 올 수 있습니다." },
        "zh-CN": { quote: "需要你帮助和鼓励的人", interpretation: "可能是已经在你生活中的人——也许是亲密的朋友或你需要不断帮助和照顾的人。他们可能正在经历问题，需要情感支持。对于单身者：如果现在有人进入你的生活，检查他们是否已经有伴侣。他们可能感情出了问题，来找你寻求安慰。" },
        "zh-TW": { quote: "需要你幫助和鼓勵的人", interpretation: "可能是已經在你生活中的人——也許是親密的朋友或你需要不斷幫助和照顧的人。他們可能正在經歷問題，需要情感支持。對於單身者：如果現在有人進入你的生活，檢查他們是否已經有伴侶。他們可能感情出了問題，來找你尋求安慰。" }
    },
    "THE HERMIT": {
        en: { quote: "Someone from your past with shared memories", interpretation: "The person who will enter your life is someone you still have feelings and memories with. Could be an ex, someone you used to talk to, or someone who was meaningful in your past." },
        ja: { quote: "共有の思い出を持つ過去の人", interpretation: "あなたの人生に入ってくる人は、まだ感情と思い出を共有している人です。元カレ・元カノ、以前話していた人、または過去に意味のあった人かもしれません。" },
        ko: { quote: "공유된 추억을 가진 과거의 사람", interpretation: "당신의 삶에 들어올 사람은 아직 감정과 추억을 공유하는 사람입니다. 전 애인, 예전에 대화하던 사람 또는 과거에 의미 있었던 사람일 수 있습니다." },
        "zh-CN": { quote: "有共同回忆的过去的人", interpretation: "将进入你生活的人是你仍然有感情和回忆的人。可能是前任、以前聊过的人或过去对你有意义的人。" },
        "zh-TW": { quote: "有共同回憶的過去的人", interpretation: "將進入你生活的人是你仍然有感情和回憶的人。可能是前任、以前聊過的人或過去對你有意義的人。" }
    },
    "WHEEL OF FORTUNE": {
        en: { quote: "Someone who comes unexpectedly, everything is still uncertain", interpretation: "Someone who comes unexpectedly or an ex returning. You might meet through dating apps, social media, or friend introductions. This is still an uncertain period - you may have just broken up and are in a transitional phase, not ready for anything serious. Everything is still fluctuating." },
        ja: { quote: "予期せず来る人、すべてはまだ不確定", interpretation: "予期せず来る人か、戻ってくる元カレ・元カノ。マッチングアプリ、ソーシャルメディア、または友達の紹介で出会うかもしれません。まだ不確定な時期です - 別れたばかりで移行期にあり、真剣なことには準備ができていないかもしれません。すべてがまだ変動しています。" },
        ko: { quote: "예상치 못하게 오는 사람, 모든 것이 아직 불확실", interpretation: "예상치 못하게 오는 사람이거나 돌아오는 전 애인입니다. 데이팅 앱, 소셜 미디어 또는 친구 소개로 만날 수 있습니다. 아직 불확실한 시기입니다 - 막 헤어지고 전환기에 있어 진지한 것에는 준비가 되지 않았을 수 있습니다. 모든 것이 아직 변동 중입니다." },
        "zh-CN": { quote: "意外出现的人，一切仍不确定", interpretation: "意外出现的人或回来的前任。可能通过约会app、社交媒体或朋友介绍认识。仍是不确定的时期——你可能刚分手，处于过渡期，还没准备好认真的事情。一切都还在变化中。" },
        "zh-TW": { quote: "意外出現的人，一切仍不確定", interpretation: "意外出現的人或回來的前任。可能通過約會app、社交媒體或朋友介紹認識。仍是不確定的時期——你可能剛分手，處於過渡期，還沒準備好認真的事情。一切都還在變化中。" }
    },
    "JUSTICE": {
        en: { quote: "A time of decision-making and weighing options", interpretation: "No one is coming in, but someone is distancing from you. The relationship is in a period of taking space and unsure which direction to go. This is a time of judgment and weighing options. If you have someone you're talking to, they may be in a phase of deciding whether to distance from or stay with their current partner, but can't find clarity yet. They're still hesitant and not ready to choose clearly." },
        ja: { quote: "決断と選択肢を比較する時", interpretation: "誰も入ってこないが、誰かがあなたから距離を置いている。関係は距離を置く期間にあり、どの方向に進むかわからない。これは判断と選択肢を比較する時期です。話している人がいる場合、彼らは現在のパートナーから距離を置くか一緒にいるかを決める段階にあるかもしれませんが、まだ明確さが見つかりません。まだ躊躇していて、はっきり選ぶ準備ができていません。" },
        ko: { quote: "결정과 선택을 저울질하는 시간", interpretation: "아무도 들어오지 않지만, 누군가가 거리를 두고 있습니다. 관계가 거리를 두는 기간에 있고 어느 방향으로 갈지 확실하지 않습니다. 이것은 판단과 선택을 저울질하는 시기입니다. 대화 상대가 있다면 현재 파트너와 거리를 둘지 함께할지 결정하는 단계에 있을 수 있지만 아직 명확하지 않습니다. 아직 망설이고 있고 명확하게 선택할 준비가 되지 않았습니다." },
        "zh-CN": { quote: "做决定和权衡的时期", interpretation: "没有人进来，但有人在疏远你。关系处于保持距离的时期，不确定会往哪个方向发展。这是判断和权衡的时期。如果你有聊天对象，他们可能正在决定是否与现任保持距离或继续在一起，但还找不到明确答案。他们仍在犹豫，还没准备好明确选择。" },
        "zh-TW": { quote: "做決定和權衡的時期", interpretation: "沒有人進來，但有人在疏遠你。關係處於保持距離的時期，不確定會往哪個方向發展。這是判斷和權衡的時期。如果你有聊天對象，他們可能正在決定是否與現任保持距離或繼續在一起，但還找不到明確答案。他們仍在猶豫，還沒準備好明確選擇。" }
    },
    "THE HANGED MAN": {
        en: { quote: "A period of waiting and obstacles", interpretation: "You're not ready to meet anyone. You may have just gone through disappointment, or you might be sick right now. If you've arranged a date, there may be unexpected circumstances that prevent you from meeting easily. This is a time of waiting and pausing. If someone comes: They may have just experienced sadness, have problems, or be stuck in a difficult situation. You might feel 'I can fix them' but be careful - you might end up having to 'fix yourself' in the end." },
        ja: { quote: "待機と障害の時期", interpretation: "誰にも会う準備ができていません。失望を経験したばかりか、今病気かもしれません。デートの約束をしても、簡単に会えない予期せぬ事情があるかもしれません。これは待つ時期です。誰かが来たら：悲しみを経験したばかりか、問題を抱えているか、困難な状況に閉じ込められているかもしれません。「私が直せる」と思うかもしれませんが、注意して - 結局「自分を直す」ことになるかもしれません。" },
        ko: { quote: "기다림과 장애물의 시기", interpretation: "누구도 만날 준비가 되어 있지 않습니다. 실망을 겪었거나 지금 아플 수 있습니다. 데이트를 잡았어도 쉽게 만나지 못하게 하는 예상치 못한 상황이 있을 수 있습니다. 이것은 기다리고 멈추는 시기입니다. 누군가 온다면: 슬픔을 겪었거나, 문제가 있거나, 어려운 상황에 갇혀 있을 수 있습니다. '내가 고칠 수 있어'라고 느낄 수 있지만 조심하세요 - 결국 '자신을 고치는' 것이 될 수 있습니다." },
        "zh-CN": { quote: "等待和障碍的时期", interpretation: "你还没准备好见任何人。可能刚经历过失望，或者现在正在生病。如果安排了约会，可能会有意外情况让你们不容易见面。这是等待和暂停的时期。如果有人来：他们可能刚经历悲伤、有问题或陷入困境。你可能会觉得'我能修复他们'，但要小心——最后可能是你要'修复自己'。" },
        "zh-TW": { quote: "等待和障礙的時期", interpretation: "你還沒準備好見任何人。可能剛經歷過失望，或者現在正在生病。如果安排了約會，可能會有意外情況讓你們不容易見面。這是等待和暫停的時期。如果有人來：他們可能剛經歷悲傷、有問題或陷入困境。你可能會覺得'我能修復他們'，但要小心——最後可能是你要'修復自己'。" }
    },
    "DEATH": {
        en: { quote: "A period of endings and transformation", interpretation: "This is a time of change and sadness, not suitable for new beginnings. You need to clear old things and let your heart completely finish first. This is a period of endings rather than beginnings. If someone comes: It's often an ex who doesn't make your life better, someone who might hurt you again. For some: It could mean meeting someone in medical profession (doctor, nurse, pharmacist) or a foreigner, especially British or European." },
        ja: { quote: "終わりと変容の時期", interpretation: "これは変化と悲しみの時期で、新しい始まりには向いていません。古いものを片付けて、心を完全に終わらせる必要があります。これは始まりではなく終わりの時期です。誰かが来たら：しばしばあなたの人生を良くしない元カレ・元カノで、また傷つけるかもしれない人です。一部の人にとって：医療関係者（医師、看護師、薬剤師）や外国人、特にイギリス人やヨーロッパ人と出会うことを意味するかもしれません。" },
        ko: { quote: "끝남과 변화의 시기", interpretation: "이것은 변화와 슬픔의 시기로, 새로운 시작에는 적합하지 않습니다. 오래된 것을 정리하고 마음을 완전히 끝내야 합니다. 이것은 시작이 아닌 끝의 시기입니다. 누군가 온다면: 종종 당신의 삶을 좋게 만들지 않는 전 애인이며, 다시 상처를 줄 수 있는 사람입니다. 일부에게는: 의료 전문가(의사, 간호사, 약사)나 외국인, 특히 영국인이나 유럽인을 만나는 것을 의미할 수 있습니다." },
        "zh-CN": { quote: "结束和转变的时期", interpretation: "这是变化和悲伤的时期，不适合新的开始。你需要先清理旧事物，让你的心完全结束。这是结束而非开始的时期。如果有人来：通常是不会让你生活变好的前任，可能会再次伤害你的人。对于一些人：可能意味着遇到医疗专业人员（医生、护士、药剂师）或外国人，尤其是英国人或欧洲人。" },
        "zh-TW": { quote: "結束和轉變的時期", interpretation: "這是變化和悲傷的時期，不適合新的開始。你需要先清理舊事物，讓你的心完全結束。這是結束而非開始的時期。如果有人來：通常是不會讓你生活變好的前任，可能會再次傷害你的人。對於一些人：可能意味著遇到醫療專業人員（醫生、護士、藥劑師）或外國人，尤其是英國人或歐洲人。" }
    },
    "TEMPERANCE": {
        en: { quote: "Many options, but can't decide yet", interpretation: "You might need to juggle multiple people. There are many options but you're not sure which to choose. You might have multiple dates in one day. If you know you're not the cheating type: Be careful that the other side might be juggling multiple people. Or you might meet someone great, but they can only stay with you briefly before rushing off to another date." },
        ja: { quote: "多くの選択肢があるが、まだ決められない", interpretation: "複数の人を同時に扱う必要があるかもしれません。選択肢は多いですが、どれを選ぶかわかりません。一日に複数のデートがあるかもしれません。自分が浮気するタイプじゃないとわかっているなら：相手が複数の人を掛け持ちしているかもしれないので注意。または素敵な人に会っても、すぐに別のデートに行かなければならないかもしれません。" },
        ko: { quote: "많은 선택지가 있지만 아직 결정할 수 없어요", interpretation: "여러 사람을 동시에 다뤄야 할 수도 있습니다. 선택지는 많지만 어떤 것을 선택할지 모릅니다. 하루에 여러 데이트가 있을 수 있습니다. 자신이 바람피는 타입이 아니라는 것을 안다면: 상대방이 여러 사람을 만나고 있을 수 있으니 조심하세요. 또는 멋진 사람을 만나도 금방 다른 데이트로 가야 할 수 있습니다." },
        "zh-CN": { quote: "很多选择，但还不能决定", interpretation: "你可能需要同时应对多个人。选择很多但不确定选哪个。可能一天有多个约会。如果你知道自己不是花心的人：要小心对方可能在周旋多人。或者你可能遇到很棒的人，但他们只能和你待一会儿就得赶去下一个约会。" },
        "zh-TW": { quote: "很多選擇，但還不能決定", interpretation: "你可能需要同時應對多個人。選擇很多但不確定選哪個。可能一天有多個約會。如果你知道自己不是花心的人：要小心對方可能在周旋多人。或者你可能遇到很棒的人，但他們只能和你待一會兒就得趕去下一個約會。" }
    },
    "THE DEVIL": {
        en: { quote: "Intense passion, but beware of someone taken", interpretation: "Someone will come and you'll be deeply attracted to each other. There's chemistry and strong physical attraction. This might be intense passion, but may not be good for your heart long-term. Warning: Be careful of someone who's already taken approaching you. They might be married, have a partner, or already in a relationship but showing special interest in you. There may be hidden conditions or limitations." },
        ja: { quote: "激しい情熱、でも既婚者に注意", interpretation: "誰かが来て、お互いに深く惹かれ合います。化学反応と強い身体的な魅力があります。激しい情熱かもしれませんが、長期的には心に良くないかもしれません。注意：すでにパートナーがいる人が近づいてくることに気をつけて。既婚者、パートナーがいる人、または関係にある人があなたに特別な関心を示しているかもしれません。隠された条件や制限があるかもしれません。" },
        ko: { quote: "강렬한 열정, 하지만 이미 있는 사람 조심", interpretation: "누군가 와서 서로 깊이 끌릴 것입니다. 케미와 강한 신체적 매력이 있습니다. 강렬한 열정일 수 있지만 장기적으로 마음에 좋지 않을 수 있습니다. 주의: 이미 파트너가 있는 사람이 접근하는 것을 조심하세요. 기혼자이거나, 파트너가 있거나, 이미 관계에 있지만 당신에게 특별한 관심을 보이는 사람일 수 있습니다. 숨겨진 조건이나 제한이 있을 수 있습니다." },
        "zh-CN": { quote: "强烈的激情，但小心有主的人", interpretation: "会有人来，你们会被深深吸引。有化学反应和强烈的身体吸引力。这可能是强烈的激情，但长期可能对你的心不好。警告：小心已经有对象的人接近你。可能是已婚、有伴侣或已经在恋爱中但对你表现出特别兴趣的人。可能有隐藏的条件或限制。" },
        "zh-TW": { quote: "強烈的激情，但小心有主的人", interpretation: "會有人來，你們會被深深吸引。有化學反應和強烈的身體吸引力。這可能是強烈的激情，但長期可能對你的心不好。警告：小心已經有對象的人接近你。可能是已婚、有伴侶或已經在戀愛中但對你表現出特別興趣的人。可能有隱藏的條件或限制。" }
    },
    "THE TOWER": {
        en: { quote: "A time for healing and rebuilding yourself", interpretation: "Better to rest your heart than let anyone in. You may have just broken up and need time to heal and rebuild yourself from the pain. For some: You might meet someone who just broke up with their partner. They're not ready, still have wounds, still healing. If you get involved now, you might have to deal with their emotions and problems too." },
        ja: { quote: "癒しと自分の再構築の時", interpretation: "誰かを入れるより心を休めた方がいいです。別れたばかりで、痛みから癒して自分を再構築する時間が必要かもしれません。一部の人にとって：パートナーと別れたばかりの人に会うかもしれません。彼らは準備ができておらず、まだ傷があり、まだ癒しの途中です。今関わると、彼らの感情や問題にも対処しなければならないかもしれません。" },
        ko: { quote: "치유하고 자신을 재건하는 시간", interpretation: "누군가를 들이는 것보다 마음을 쉬는 것이 좋습니다. 막 헤어져서 상처에서 치유하고 자신을 재건할 시간이 필요할 수 있습니다. 일부에게는: 파트너와 막 헤어진 사람을 만날 수 있습니다. 그들은 준비가 안 됐고, 아직 상처가 있고, 아직 치유 중입니다. 지금 관여하면 그들의 감정과 문제도 다뤄야 할 수 있습니다." },
        "zh-CN": { quote: "治愈和重建自己的时期", interpretation: "与其让人进入，不如让心休息。你可能刚分手，需要时间从痛苦中治愈并重建自己。对于一些人：你可能遇到刚和伴侣分手的人。他们还没准备好，还有伤口，还在愈合中。如果现在介入，你可能也要处理他们的情绪和问题。" },
        "zh-TW": { quote: "治癒和重建自己的時期", interpretation: "與其讓人進入，不如讓心休息。你可能剛分手，需要時間從痛苦中治癒並重建自己。對於一些人：你可能遇到剛和伴侶分手的人。他們還沒準備好，還有傷口，還在愈合中。如果現在介入，你可能也要處理他們的情緒和問題。" }
    },
    "THE STAR": {
        en: { quote: "Someone good-looking and famous", interpretation: "You're starting to take better care of yourself - exercising, dressing better, taking care of your skin. Someone is showing interest, but you haven't decided yet. Or it could mean someone famous, good-looking, or working in a profession that requires appearance - like an actor, model, influencer, MC, or any job requiring a public face." },
        ja: { quote: "見た目が良くて有名な人", interpretation: "自分のケアを始めています - 運動、服装、スキンケア。誰かが興味を示していますが、まだ決めていません。または、有名人、見た目が良い人、または外見が必要な職業の人かもしれません - 俳優、モデル、インフルエンサー、MC、または人前に出る仕事。" },
        ko: { quote: "잘생기고 유명한 사람", interpretation: "자신을 더 잘 돌보기 시작했습니다 - 운동, 옷, 피부 관리. 누군가 관심을 보이고 있지만 아직 결정하지 않았습니다. 또는 유명한 사람, 외모가 좋은 사람, 또는 외모가 필요한 직업의 사람일 수 있습니다 - 배우, 모델, 인플루언서, MC 또는 공개적인 얼굴이 필요한 직업." },
        "zh-CN": { quote: "好看又有名的人", interpretation: "你开始更好地照顾自己——运动、穿着、护肤。有人在表示兴趣，但你还没决定。或者可能是名人、长相好的人，或从事需要外貌的职业的人——如演员、模特、网红、主持人或任何需要公开露面的工作。" },
        "zh-TW": { quote: "好看又有名的人", interpretation: "你開始更好地照顧自己——運動、穿著、護膚。有人在表示興趣，但你還沒決定。或者可能是名人、長相好的人，或從事需要外貌的職業的人——如演員、模特、網紅、主持人或任何需要公開露面的工作。" }
    },
    "THE MOON": {
        en: { quote: "An unclear and confusing relationship", interpretation: "The person coming to you now isn't your type or doesn't meet all your requirements. No matter who you choose, they won't be the right one for you. This makes you feel confused and uncertain. Or it could mean: You're in an unclear relationship, long-distance love, or a relationship that can't progress. There are many obstacles. You're not sure about the other person's feelings." },
        ja: { quote: "不明確で混乱した関係", interpretation: "今来る人はあなたのタイプではないか、要件を満たしていません。誰を選んでもあなたにとって正しい人ではありません。これが混乱と不確かさを感じさせます。または：不明確な関係、遠距離恋愛、または進展できない関係にあるかもしれません。多くの障害があります。相手の気持ちがわかりません。" },
        ko: { quote: "불분명하고 혼란스러운 관계", interpretation: "지금 오는 사람은 당신의 타입이 아니거나 요구 사항을 충족하지 않습니다. 누구를 선택해도 당신에게 맞는 사람이 아닐 것입니다. 이것이 혼란과 불확실함을 느끼게 합니다. 또는: 불분명한 관계, 장거리 연애 또는 진전될 수 없는 관계에 있을 수 있습니다. 많은 장애물이 있습니다. 상대방의 감정을 확신할 수 없습니다." },
        "zh-CN": { quote: "不清楚和混乱的关系", interpretation: "现在来的人不是你的类型或不符合你的所有要求。无论选谁都不会是对的人。这让你感到困惑和不确定。或者可能意味着：你处于不清楚的关系、远距离恋爱或无法进展的关系中。有很多障碍。你不确定对方的感情。" },
        "zh-TW": { quote: "不清楚和混亂的關係", interpretation: "現在來的人不是你的類型或不符合你的所有要求。無論選誰都不會是對的人。這讓你感到困惑和不確定。或者可能意味著：你處於不清楚的關係、遠距離戀愛或無法進展的關係中。有很多障礙。你不確定對方的感情。" }
    },
    "THE SUN": {
        en: { quote: "A fresh and clear new beginning", interpretation: "You're suited for a new relationship, starting completely fresh. Someone you've been talking to may have just left your life, or you've recently learned a truth that made you close that chapter. This is a period of bright new beginnings. For complete singles: Someone who just got out of a relationship might enter your life and pursue you strongly, clearly, and directly. If you have similar energy and are ready to start anew, you can go on dates with them. Warning: For those with secret relationships, be careful of getting exposed - the truth may come out." },
        ja: { quote: "新鮮で明確な新しい始まり", interpretation: "新しい関係に向いています、完全に新しく始める。話していた人が最近あなたの人生から去ったか、真実を知ってその章を閉じたかもしれません。これは明るい新しい始まりの時期です。完全な独身者へ：関係から出たばかりの人があなたの人生に入ってきて、強く、はっきりと、直接的にアプローチするかもしれません。同じようなエネルギーがあり、新しく始める準備ができているなら、デートに行けます。注意：秘密の関係がある人は、バレることに気をつけて - 真実が明らかになるかもしれません。" },
        ko: { quote: "신선하고 명확한 새로운 시작", interpretation: "새로운 관계에 적합합니다, 완전히 새롭게 시작하세요. 대화하던 사람이 최근 당신의 삶에서 떠났거나, 진실을 알게 되어 그 장을 닫았을 수 있습니다. 이것은 밝은 새로운 시작의 시기입니다. 완전 싱글에게: 관계에서 막 벗어난 사람이 당신의 삶에 들어와 강하고, 명확하고, 직접적으로 추구할 수 있습니다. 비슷한 에너지가 있고 새로 시작할 준비가 되었다면 데이트할 수 있습니다. 주의: 비밀 관계가 있는 사람들은 들킬 것을 조심하세요 - 진실이 드러날 수 있습니다." },
        "zh-CN": { quote: "清新明确的新开始", interpretation: "你适合新的关系，完全重新开始。一直在聊的人可能刚离开你的生活，或者你最近知道了一个真相让你关闭了那一章。这是明亮新开始的时期。对于完全单身的人：刚从关系中走出来的人可能进入你的生活，强烈、明确、直接地追求你。如果你有相似的能量并准备好重新开始，可以和他们约会。警告：有秘密关系的人要小心被发现——真相可能会曝光。" },
        "zh-TW": { quote: "清新明確的新開始", interpretation: "你適合新的關係，完全重新開始。一直在聊的人可能剛離開你的生活，或者你最近知道了一個真相讓你關閉了那一章。這是明亮新開始的時期。對於完全單身的人：剛從關係中走出來的人可能進入你的生活，強烈、明確、直接地追求你。如果你有相似的能量並準備好重新開始，可以和他們約會。警告：有秘密關係的人要小心被發現——真相可能會曝光。" }
    },
    "JUDGEMENT": {
        en: { quote: "A time for closure and new beginnings", interpretation: "This is a time when you might decide to break up with someone rather than find love. A period of closure, ending old chapters rather than starting new ones. If you really want to find someone: You might want to go release old vows at a significant temple so that old things that haven't ended in your heart can be completely finished. After Valentine's, may you find someone new. For those without love issues: You might meet someone interesting at a temple, merit-making event, or hospital - an unexpected meeting place." },
        ja: { quote: "終結と新しい始まりの時", interpretation: "愛を見つけるより誰かと別れることを決める時期かもしれません。新しい章を始めるより古い章を終える時期です。本当に誰かを見つけたいなら：重要な寺院で古い誓いを解くといいかもしれません。心の中でまだ終わっていない古いことが完全に終わるように。バレンタインの後、新しい人に出会えますように。恋愛の問題がない人へ：寺院、功徳を積む行事、または病院で興味深い人に会うかもしれません - 予想外の出会いの場所です。" },
        ko: { quote: "마무리와 새로운 시작의 시간", interpretation: "사랑을 찾기보다 누군가와 헤어지기로 결정하는 시기일 수 있습니다. 새로운 장을 시작하기보다 오래된 장을 끝내는 시기입니다. 정말 누군가를 찾고 싶다면: 중요한 절에서 오래된 서약을 풀어야 할 수 있습니다. 마음속에서 아직 끝나지 않은 오래된 것들이 완전히 끝날 수 있도록. 발렌타인 이후에 새로운 사람을 만나길 바랍니다. 연애 문제가 없는 사람들에게: 절, 공덕 행사 또는 병원에서 흥미로운 사람을 만날 수 있습니다 - 예상치 못한 만남의 장소입니다." },
        "zh-CN": { quote: "结束和新开始的时期", interpretation: "这是你可能会决定和某人分手而不是寻找爱情的时期。是结束旧章节而不是开始新章节的时期。如果你真的想找人：可能需要去重要的寺庙解除旧誓愿，这样心中还没结束的旧事才能完全结束。情人节后愿你遇到新人。对于没有恋爱问题的人：你可能在寺庙、做功德的活动或医院遇到有趣的人——意想不到的相遇地点。" },
        "zh-TW": { quote: "結束和新開始的時期", interpretation: "這是你可能會決定和某人分手而不是尋找愛情的時期。是結束舊章節而不是開始新章節的時期。如果你真的想找人：可能需要去重要的寺廟解除舊誓願，這樣心中還沒結束的舊事才能完全結束。情人節後願你遇到新人。對於沒有戀愛問題的人：你可能在寺廟、做功德的活動或醫院遇到有趣的人——意想不到的相遇地點。" }
    },
    "THE WORLD": {
        en: { quote: "Complete in yourself, not seeking attachment", interpretation: "This is the best time to be alone. You're satisfied with your life and don't feel like you're missing anything. If someone reaches out: Unless they're truly exceptional (like a rare catch), it's usually just old connections you've maintained but you think 'better not' and don't want to develop anything further. On the flip side: You might be one of those old connections visiting them. They chat casually without attachment, keep distance from everyone, and don't want to be serious with anyone." },
        ja: { quote: "自分自身で完璧、執着を求めない", interpretation: "一人でいるのに最適な時期です。生活に満足していて、何かが足りないとは感じていません。誰かが連絡してきたら：本当に特別な人（珍しい逸材）でない限り、普通は保っていた古いつながりで「やめておこう」と思い、何も発展させたくありません。逆に：あなたが彼らを訪ねる古いつながりの一人かもしれません。彼らは執着なくカジュアルにチャットし、皆と距離を保ち、誰とも真剣になりたくありません。" },
        ko: { quote: "스스로 완벽하고 집착을 구하지 않음", interpretation: "혼자 있기에 가장 좋은 시기입니다. 삶에 만족하고 뭔가 부족하다고 느끼지 않습니다. 누군가 연락한다면: 정말 특별한 사람(희귀한 존재)이 아닌 한, 보통은 유지해온 오래된 인연이지만 '안 하는 게 낫겠다'고 생각하고 더 발전시키고 싶지 않습니다. 반대로: 당신이 그들을 방문하는 오래된 인연 중 하나일 수 있습니다. 그들은 집착 없이 캐주얼하게 대화하고, 모두와 거리를 유지하며, 누구와도 진지해지고 싶어하지 않습니다." },
        "zh-CN": { quote: "自己就很完整，不寻求依恋", interpretation: "这是最适合独处的时期。你对生活很满意，不觉得缺少什么。如果有人联系：除非他们真的很特别（像稀有的好对象），通常只是你保持的老联系，但你会想'还是算了'，不想再发展什么。反过来：你可能是去找他们的老联系之一。他们随意聊天不带依恋，与每个人保持距离，不想和任何人认真。" },
        "zh-TW": { quote: "自己就很完整，不尋求依戀", interpretation: "這是最適合獨處的時期。你對生活很滿意，不覺得缺少什麼。如果有人聯繫：除非他們真的很特別（像稀有的好對象），通常只是你保持的老聯繫，但你會想'還是算了'，不想再發展什麼。反過來：你可能是去找他們的老聯繫之一。他們隨意聊天不帶依戀，與每個人保持距離，不想和任何人認真。" }
    },
    "PAGE OF WANDS": {
        en: { quote: "An energetic person bringing new energy", interpretation: "A stranger younger than you with tanned or dark skin, full of energy and enthusiasm. Loves adventure. You'll likely meet them soon within three weeks at events, activities, or places you've never been before." },
        ja: { quote: "新しいエネルギーをもたらす活発な人", interpretation: "日焼けした肌または浅黒い肌を持つあなたより若い見知らぬ人で、エネルギーと熱意に満ちています。冒険が好きです。イベント、活動、または初めて行く場所で3週間以内に出会う可能性が高いです。" },
        ko: { quote: "새로운 에너지를 가져오는 활기찬 사람", interpretation: "햇볕에 탄 피부나 검은 피부를 가진 당신보다 어린 낯선 사람으로 에너지와 열정이 넘칩니다. 모험을 좋아합니다. 이벤트, 활동 또는 처음 가는 장소에서 3주 이내에 만날 가능성이 높습니다." },
        "zh-CN": { quote: "带来新能量的活力四射的人", interpretation: "一个皮肤黝黑的比你年轻的陌生人，充满活力和热情。喜欢冒险。你可能在三周内在活动、事件或从未去过的地方遇到他们。" },
        "zh-TW": { quote: "帶來新能量的活力四射的人", interpretation: "一個皮膚黝黑的比你年輕的陌生人，充滿活力和熱情。喜歡冒險。你可能在三週內在活動、事件或從未去過的地方遇到他們。" }
    },
    "KNIGHT OF WANDS": {
        en: { quote: "A freedom-lover who comes unexpectedly", interpretation: "A young adult to middle-aged person who isn't quite a mature adult yet, still searching for life's meaning and enjoying life. Loves driving fast and freedom. May have tanned skin, live in another province, or need some travel time to come see you. Might show up without advance notice." },
        ja: { quote: "予告なしに来る自由を愛する人", interpretation: "まだ完全に成熟した大人ではない若い大人から中年の人で、人生の意味を探しながら人生を楽しんでいます。スピードと自由が好きです。日焼けした肌、他県に住んでいる、または会いに来るのに時間がかかるかもしれません。予告なしに現れるかもしれません。" },
        ko: { quote: "예고 없이 오는 자유를 사랑하는 사람", interpretation: "아직 완전히 성숙한 어른이 아닌 젊은 성인부터 중년으로 삶의 의미를 찾으며 인생을 즐기고 있습니다. 빠른 운전과 자유를 좋아합니다. 햇볕에 탄 피부를 가지고 있거나, 다른 지방에 살거나, 만나러 오는데 시간이 걸릴 수 있습니다. 예고 없이 나타날 수 있습니다." },
        "zh-CN": { quote: "不期而至的自由爱好者", interpretation: "一个还没完全成熟的年轻人到中年人，还在寻找生活的意义并享受生活。喜欢开快车和自由。可能皮肤黝黑，住在另一个省份，或需要一些时间才能来看你。可能会不打招呼就出现。" },
        "zh-TW": { quote: "不期而至的自由愛好者", interpretation: "一個還沒完全成熟的年輕人到中年人，還在尋找生活的意義並享受生活。喜歡開快車和自由。可能皮膚黝黑，住在另一個省份，或需要一些時間才能來看你。可能會不打招呼就出現。" }
    },
    "QUEEN OF WANDS": {
        en: { quote: "A good relationship but no label, unclear", interpretation: "For women: You have a crush on a close friend or are waiting for someone who's already in your life. They treat you well like a partner but won't give you a relationship status. You're stuck in an unlabeled, unclear relationship. For men: A confident, charming, go-getter woman who's already in your life. She's great at work and self-assured, but she might still be waiting for an ex or someone else. The relationship won't progress no matter how hard you try - you still can't get clarity." },
        ja: { quote: "良い関係だがラベルなし、不明確", interpretation: "女性向け：親友に片思いしているか、すでにあなたの人生にいる誰かを待っています。彼らはパートナーのように良く扱いますが、関係のステータスをくれません。ラベルのない不明確な関係に閉じ込められています。男性向け：すでにあなたの人生にいる自信に満ちた魅力的な積極的な女性。仕事ができて自信があるが、まだ元カレや他の誰かを待っているかもしれません。どんなに頑張っても関係は進展せず、明確さを得られません。" },
        ko: { quote: "좋은 관계이지만 라벨 없이 불분명", interpretation: "여성분: 친한 친구에게 짝사랑하거나 이미 당신의 삶에 있는 누군가를 기다리고 있습니다. 그들은 파트너처럼 잘 대하지만 관계 지위를 주지 않습니다. 라벨 없는 불분명한 관계에 갇혀 있습니다. 남성분: 이미 당신의 삶에 있는 자신감 있고 매력적인 적극적인 여성입니다. 일을 잘하고 자신감이 있지만 아직 전 애인이나 다른 누군가를 기다리고 있을 수 있습니다. 아무리 노력해도 관계가 진전되지 않고 명확함을 얻을 수 없습니다." },
        "zh-CN": { quote: "关系好但没有名分，不清楚", interpretation: "女性：你暗恋好朋友或在等待已经在你生活中的某人。他们像伴侣一样对你好但不给你关系名分。你陷入了没有标签、不清楚的关系中。男性：已经在你生活中的一个自信、有魅力、积极进取的女人。她工作能力强、有自信，但可能还在等前任或其他人。不管你多努力关系都不会进展——你仍然得不到明确答案。" },
        "zh-TW": { quote: "關係好但沒有名分，不清楚", interpretation: "女性：你暗戀好朋友或在等待已經在你生活中的某人。他們像伴侶一樣對你好但不給你關係名分。你陷入了沒有標籤、不清楚的關係中。男性：已經在你生活中的一個自信、有魅力、積極進取的女人。她工作能力強、有自信，但可能還在等前任或其他人。不管你多努力關係都不會進展——你仍然得不到明確答案。" }
    },
    "KING OF WANDS": {
        en: { quote: "A visionary leader with experience", interpretation: "A man with experience and real-world knowledge from actual work. A leader with vision. May be a businessman, business owner, or executive. Has been through major projects and is recognized in his field. Confident and knows what he wants. Most likely a fire sign (Aries, Leo, Sagittarius)." },
        ja: { quote: "経験豊富なビジョナリーリーダー", interpretation: "実際の仕事から得た経験と実務知識を持つ男性。ビジョンを持つリーダー。ビジネスマン、経営者、または役員かもしれません。大きなプロジェクトを経験し、業界で認められています。自信があり、自分が何を望んでいるかを知っています。おそらく火の星座（牡羊座、獅子座、射手座）です。" },
        ko: { quote: "경험 많은 비전 있는 리더", interpretation: "실제 업무에서 얻은 경험과 실무 지식을 가진 남성입니다. 비전을 가진 리더입니다. 사업가, 사업주 또는 임원일 수 있습니다. 대규모 프로젝트를 경험했고 업계에서 인정받고 있습니다. 자신감이 있고 자신이 원하는 것을 알고 있습니다. 아마도 불의 별자리(양자리, 사자자리, 궁수자리)일 것입니다." },
        "zh-CN": { quote: "有远见和经验的领导者", interpretation: "一个有实际工作经验和实战知识的男人。有远见的领导者。可能是商人、企业主或高管。经历过大项目并在业界获得认可。自信且知道自己想要什么。很可能是火象星座（白羊座、狮子座、射手座）。" },
        "zh-TW": { quote: "有遠見和經驗的領導者", interpretation: "一個有實際工作經驗和實戰知識的男人。有遠見的領導者。可能是商人、企業主或高管。經歷過大項目並在業界獲得認可。自信且知道自己想要什麼。很可能是火象星座（白羊座、獅子座、射手座）。" }
    },
    "PAGE OF CUPS": {
        en: { quote: "A cute person with similar tastes", interpretation: "Someone younger than you with good looks, cute, who loves art. May study art, liberal arts, languages, or literature. Has good taste and is sensitive, enjoys creative work. The relationship can develop through having similar tastes and interests - like enjoying the same movies, music, or hobbies." },
        ja: { quote: "似た趣味を持つかわいい人", interpretation: "見た目が良くて可愛い、芸術を愛するあなたより若い人。美術、教養学部、言語、文学などを学んでいるかもしれません。センスが良くて繊細で、創造的な仕事が好きです。同じ趣味や興味を通じて関係が発展できます - 同じ映画、音楽、または趣味を楽しむなど。" },
        ko: { quote: "비슷한 취향을 가진 귀여운 사람", interpretation: "외모가 좋고 귀여운, 예술을 사랑하는 당신보다 어린 사람입니다. 미술, 교양학, 언어 또는 문학을 공부했을 수 있습니다. 취향이 좋고 섬세하며 창의적인 작업을 즐깁니다. 같은 취향과 관심사를 통해 관계가 발전할 수 있습니다 - 같은 영화, 음악 또는 취미를 즐기는 것처럼." },
        "zh-CN": { quote: "有相似品味的可爱的人", interpretation: "一个比你年轻、长相好、可爱、热爱艺术的人。可能学习艺术、文科、语言或文学。有品味、敏感，喜欢创意工作。关系可以通过相似的品味和兴趣发展——比如喜欢同样的电影、音乐或爱好。" },
        "zh-TW": { quote: "有相似品味的可愛的人", interpretation: "一個比你年輕、長相好、可愛、熱愛藝術的人。可能學習藝術、文科、語言或文學。有品味、敏感，喜歡創意工作。關係可以通過相似的品味和興趣發展——比如喜歡同樣的電影、音樂或愛好。" }
    },
    "KNIGHT OF CUPS": {
        en: { quote: "Romantic but no clear direction", interpretation: "A young or middle-aged person who's romantic, has just entered or is entering your life. Gets along with everyone easily, good at socializing, speaks sweetly. Knows how to make you feel special. But may not have clear life goals yet, still drifting, unsure which way to go. Likes expressing feelings but may not have long-term plans." },
        ja: { quote: "ロマンチックだが方向性が不明確", interpretation: "あなたの人生に入ってきた、または入ってきているロマンチックな若い人か中年の人。誰とでも簡単に仲良くなれ、社交的で、甘い言葉を話します。あなたを特別に感じさせる方法を知っています。でも明確な人生目標がまだなく、漂っていて、どの方向に行くかわかりません。感情を表現するのは好きですが、長期的な計画がないかもしれません。" },
        ko: { quote: "로맨틱하지만 방향이 불분명", interpretation: "당신의 삶에 들어왔거나 들어오고 있는 로맨틱한 젊은 사람이나 중년입니다. 누구와도 쉽게 어울리고 사교적이며 달콤하게 말합니다. 당신을 특별하게 느끼게 하는 방법을 알고 있습니다. 하지만 아직 명확한 인생 목표가 없고, 떠다니며, 어느 방향으로 갈지 모릅니다. 감정 표현을 좋아하지만 장기 계획이 없을 수 있습니다." },
        "zh-CN": { quote: "浪漫但没有明确的方向", interpretation: "一个刚进入或正在进入你生活的浪漫的年轻人或中年人。很容易和任何人相处，善于社交，说话甜蜜。知道如何让你感到特别。但可能还没有明确的人生目标，还在漂泊，不确定要往哪个方向走。喜欢表达感情但可能没有长期计划。" },
        "zh-TW": { quote: "浪漫但沒有明確的方向", interpretation: "一個剛進入或正在進入你生活的浪漫的年輕人或中年人。很容易和任何人相處，善於社交，說話甜蜜。知道如何讓你感到特別。但可能還沒有明確的人生目標，還在漂泊，不確定要往哪個方向走。喜歡表達感情但可能沒有長期計劃。" }
    },
    "QUEEN OF CUPS": {
        en: { quote: "Already has someone in heart, hard to open up to new people", interpretation: "For women: You have someone you're thinking about, someone you like and treasure in your heart. If you're single, this might be an ex you haven't forgotten or an ideal person you've created in your mind. You won't easily open your heart to anyone unless they match the person you have in mind. Or you might be obsessed with an idol, celebrity, or artist - spending time following them, watching content, buying merchandise. Where would you find time for a partner when your heart is already given to someone who doesn't know you? For men: A feminine, homebody woman with high sensitivity. She already has an image of her ideal relationship and has high expectations. You need to be romantic as a bare minimum - caring, attentive, and create a princess-like atmosphere for her." },
        ja: { quote: "すでに心に誰かがいて、新しい人に心を開きにくい", interpretation: "女性向け：心に思っている人、好きで大切にしている人がいます。独身なら、忘れられない元カレか、心の中で作り上げた理想の人かもしれません。心にいる人と合わない限り、誰にも簡単に心を開きません。またはアイドル、有名人、アーティストに夢中で、フォロー、コンテンツ視聴、グッズ購入に時間を費やしているかもしれません。あなたを知らない人に心を捧げているのに、パートナーを見つける時間がどこにありますか？男性向け：高い感受性を持つフェミニンな家庭的な女性。理想の関係のイメージがあり、期待が高いです。最低限ロマンチックでなければなりません - 思いやりがあり、気配りがあり、彼女にプリンセスのような雰囲気を作り出す必要があります。" },
        ko: { quote: "이미 마음에 누군가가 있어 새로운 사람에게 마음을 열기 어려움", interpretation: "여성분: 마음속에 생각하는 사람, 좋아하고 소중히 여기는 사람이 있습니다. 싱글이라면 잊지 못한 전 애인이거나 마음속에 만들어낸 이상형일 수 있습니다. 마음에 있는 사람과 맞지 않으면 쉽게 마음을 열지 않을 것입니다. 또는 아이돌, 유명인, 아티스트에게 빠져 팔로우하고, 콘텐츠를 보고, 굿즈를 사는 데 시간을 보내고 있을 수 있습니다. 당신을 모르는 사람에게 마음을 준 상태에서 파트너를 찾을 시간이 어디 있겠습니까? 남성분: 높은 감수성을 가진 여성스럽고 가정적인 여성입니다. 이미 이상적인 관계의 이미지가 있고 기대가 높습니다. 최소한 로맨틱해야 합니다 - 배려하고, 세심하고, 그녀를 위해 공주 같은 분위기를 만들어야 합니다." },
        "zh-CN": { quote: "心里已有人，很难对新人敞开心扉", interpretation: "女性：你心里有在想的人，有你喜欢和珍惜的人。如果你是单身，这可能是还没忘记的前任或你在心中创造的理想对象。除非符合你心中的人，否则你不会轻易向任何人敞开心扉。或者你可能迷恋偶像、明星或艺术家——花时间关注他们、看内容、买周边。当你的心已经给了一个不认识你的人，你哪有时间找对象？男性：一个敏感度高的女性化、顾家的女人。她已经有了理想关系的形象，期望很高。你至少要浪漫——关心、体贴，为她创造公主般的氛围。" },
        "zh-TW": { quote: "心裡已有人，很難對新人敞開心扉", interpretation: "女性：你心裡有在想的人，有你喜歡和珍惜的人。如果你是單身，這可能是還沒忘記的前任或你在心中創造的理想對象。除非符合你心中的人，否則你不會輕易向任何人敞開心扉。或者你可能迷戀偶像、明星或藝術家——花時間關注他們、看內容、買周邊。當你的心已經給了一個不認識你的人，你哪有時間找對象？男性：一個敏感度高的女性化、顧家的女人。她已經有了理想關係的形象，期望很高。你至少要浪漫——關心、體貼，為她創造公主般的氛圍。" }
    },
    "KING OF CUPS": {
        en: { quote: "Experienced person who may be talking to multiple people", interpretation: "For women: The person coming in has quite a lot of relationship experience. May have been married before or is a bit of a player with a long history of love. Be careful that while he's chatting with you, he might also be chatting with multiple others at the same time - not focused solely on you. For men: You have people you're casually talking to but are still looking for someone better than your current options. Not satisfied with the current choices, or looking for an ex in new people - trying to find someone similar to a past love." },
        ja: { quote: "複数の人と話しているかもしれない経験豊富な人", interpretation: "女性向け：入ってくる人は恋愛経験がかなり豊富です。結婚経験があるか、長い恋愛歴を持つ少しプレイボーイかもしれません。あなたとチャットしている間、同時に複数の人ともチャットしているかもしれないので注意 - あなただけに集中していません。男性向け：カジュアルに話している人はいますが、現在の選択肢より良い人をまだ探しています。現在の選択に満足していないか、新しい人の中で元カレ・元カノを探しています - 過去の恋人に似た人を見つけようとしています。" },
        ko: { quote: "여러 사람과 대화할 수 있는 경험 많은 사람", interpretation: "여성분: 들어오는 사람은 연애 경험이 꽤 많습니다. 결혼한 적이 있거나 긴 연애 역사를 가진 약간의 바람둥이일 수 있습니다. 당신과 채팅하는 동안 동시에 여러 명과 채팅하고 있을 수 있으니 주의하세요 - 당신에게만 집중하지 않습니다. 남성분: 캐주얼하게 대화하는 사람이 있지만 현재 선택지보다 더 나은 사람을 아직 찾고 있습니다. 현재 선택에 만족하지 않거나, 새로운 사람들 중에서 전 애인을 찾고 있습니다 - 과거의 연인과 비슷한 사람을 찾으려고 합니다." },
        "zh-CN": { quote: "经验丰富的人，可能同时和多人聊天", interpretation: "女性：进来的人有相当丰富的恋爱经验。可能结过婚或是有很长恋爱史的花心人。要小心他和你聊天的时候，可能同时也在和其他几个人聊——不是只专注于你。男性：你有在随便聊的人，但还在找比现有选项更好的人。对现有选择不满意，或者在新人中寻找前任——试图找到和过去恋人相似的人。" },
        "zh-TW": { quote: "經驗豐富的人，可能同時和多人聊天", interpretation: "女性：進來的人有相當豐富的戀愛經驗。可能結過婚或是有很長戀愛史的花心人。要小心他和你聊天的時候，可能同時也在和其他幾個人聊——不是只專注於你。男性：你有在隨便聊的人，但還在找比現有選項更好的人。對現有選擇不滿意，或者在新人中尋找前任——試圖找到和過去戀人相似的人。" }
    },
    "PAGE OF SWORDS": {
        en: { quote: "Someone who causes headaches more than being a lover", interpretation: "Someone younger who might come in a way that gives you headaches. Likes to tease, poke fun, or make you uncomfortable. Speaks directly without understanding social etiquette - says things without considering if it'll hurt others. Mostly: You won't meet someone you like from this card. You'll most likely encounter someone to argue with, have conflicts with, or fight with on social media. May be someone leaving bad comments or arguing in groups." },
        ja: { quote: "恋人というより頭痛の種になる人", interpretation: "頭痛を与えるような形で入ってくるかもしれない若い人。からかったり、いじったり、不快にさせるのが好きです。社会的なエチケットを理解せずに直接的に話します - 他人を傷つけるかどうか考えずに言います。ほとんどの場合：このカードで好きな人には出会えません。おそらく議論する人、対立する人、ソーシャルメディアで争う人に出会うでしょう。悪いコメントを残したり、グループで議論したりする人かもしれません。" },
        ko: { quote: "연인보다 두통을 일으키는 사람", interpretation: "두통을 주는 방식으로 들어올 수 있는 젊은 사람입니다. 놀리거나, 장난치거나, 불편하게 만드는 것을 좋아합니다. 사회적 예절을 이해하지 못하고 직접적으로 말합니다 - 다른 사람을 상처 입힐지 생각하지 않고 말합니다. 대부분: 이 카드에서 좋아하는 사람을 만나지 못할 것입니다. 아마 논쟁하거나, 갈등하거나, 소셜 미디어에서 싸울 사람을 만날 것입니다. 나쁜 댓글을 남기거나 그룹에서 논쟁하는 사람일 수 있습니다." },
        "zh-CN": { quote: "带来头痛而不是爱情的人", interpretation: "一个可能以让你头疼的方式进来的年轻人。喜欢取笑、戏弄或让你不舒服。不懂社交礼仪地直接说话——不考虑会不会伤害别人就说出口。大多数情况：你不会从这张牌遇到喜欢的人。你很可能会遇到要争论的人、有冲突的人或在社交媒体上吵架的人。可能是留下恶评或在群里争论的人。" },
        "zh-TW": { quote: "帶來頭痛而不是愛情的人", interpretation: "一個可能以讓你頭疼的方式進來的年輕人。喜歡取笑、戲弄或讓你不舒服。不懂社交禮儀地直接說話——不考慮會不會傷害別人就說出口。大多數情況：你不會從這張牌遇到喜歡的人。你很可能會遇到要爭論的人、有衝突的人或在社交媒體上吵架的人。可能是留下惡評或在群裡爭論的人。" }
    },
    "KNIGHT OF SWORDS": {
        en: { quote: "A straightforward person who moves fast", interpretation: "Someone confident and proactive who moves quickly. Makes decisions fast. May be a police officer, soldier, or someone whose job requires frequent travel - like sales, driver, or fieldwork. Goes straight toward their goals. Speaks directly, no beating around the bush." },
        ja: { quote: "素早く動く率直な人", interpretation: "自信を持って積極的に素早く動く人。決断が早い。警察官、軍人、または頻繁に旅行が必要な仕事の人かもしれません - 営業、ドライバー、現場作業など。目標に向かってまっすぐ進みます。遠回しではなく直接的に話します。" },
        ko: { quote: "빠르게 움직이는 솔직한 사람", interpretation: "자신감 있고 적극적으로 빠르게 움직이는 사람입니다. 결정을 빨리 내립니다. 경찰, 군인 또는 자주 여행해야 하는 직업의 사람일 수 있습니다 - 영업, 운전기사 또는 현장 업무 등. 목표를 향해 곧장 갑니다. 돌려 말하지 않고 직접적으로 말합니다." },
        "zh-CN": { quote: "行动迅速的直接的人", interpretation: "一个自信、积极、行动迅速的人。决策很快。可能是警察、军人或工作需要经常出差的人——如销售、司机或外勤工作。直奔目标。说话直接，不拐弯抹角。" },
        "zh-TW": { quote: "行動迅速的直接的人", interpretation: "一個自信、積極、行動迅速的人。決策很快。可能是警察、軍人或工作需要經常出差的人——如銷售、司機或外勤工作。直奔目標。說話直接，不拐彎抹角。" }
    },
    "QUEEN OF SWORDS": {
        en: { quote: "A strong person with high walls", interpretation: "For women: Anyone who comes near you these days, you scold them everywhere. If you're not satisfied, you ignore them, are dismissive, or speak harshly to them. If you're single on Valentine's, it's your own doing. Your personality is too harsh, your words aren't nice, making others afraid to approach. For men: You might like a tough, direct woman who speaks without considering anyone. Looks strong, has high walls. Someone who's been through a lot. May have been hurt by love before, so she acts cold and defensive." },
        ja: { quote: "高い壁を持つ強い人", interpretation: "女性向け：最近近づいてくる人を誰でも罵倒しています。不満なら無視したり、つれなくしたり、厳しく言ったりします。バレンタインに独身なら、それは自分のせいです。性格が厳しすぎて、言葉が良くなくて、他人が近づくのを恐れさせています。男性向け：誰も気にせず話す厳しい直接的な女性が好きかもしれません。強く見えて、壁が高い。多くを経験してきた人。以前愛に傷ついたことがあるかもしれないので、冷たく防御的に振る舞います。" },
        ko: { quote: "높은 벽을 가진 강한 사람", interpretation: "여성분: 요즘 가까이 오는 사람은 누구든 꾸짖습니다. 만족하지 않으면 무시하거나, 무관심하거나, 거칠게 말합니다. 발렌타인에 싱글이라면 그건 당신 탓입니다. 성격이 너무 까다롭고 말이 좋지 않아 다른 사람들이 다가가기를 두려워합니다. 남성분: 아무도 신경 쓰지 않고 말하는 터프하고 직접적인 여성을 좋아할 수 있습니다. 강해 보이고 벽이 높습니다. 많은 것을 겪어온 사람입니다. 전에 사랑에 상처받았을 수 있어서 차갑고 방어적으로 행동합니다." },
        "zh-CN": { quote: "有高墙的坚强的人", interpretation: "女性：最近谁靠近你，你都到处骂他们。不满意就无视、冷淡或说话难听。如果情人节还单身，那是你自己造成的。你的性格太硬，说话不好听，让别人不敢靠近。男性：你可能喜欢一个强硬、直接、说话不顾任何人的女人。看起来很强，有高墙。经历过很多的人。可能以前被爱伤害过，所以表现得冷漠和防备。" },
        "zh-TW": { quote: "有高牆的堅強的人", interpretation: "女性：最近誰靠近你，你都到處罵他們。不滿意就無視、冷淡或說話難聽。如果情人節還單身，那是你自己造成的。你的性格太硬，說話不好聽，讓別人不敢靠近。男性：你可能喜歡一個強硬、直接、說話不顧任何人的女人。看起來很強，有高牆。經歷過很多的人。可能以前被愛傷害過，所以表現得冷漠和防備。" }
    },
    "KING OF SWORDS": {
        en: { quote: "A cold person who doesn't show much emotion", interpretation: "If someone is chatting with you but responding slowly and not giving you much attention - when this card comes up, it means they don't really like you that much. Better to give up on this cold-hearted person. Don't waste your time. For some: This person may work in military, police, or management, but it's still not a romantic card worth pursuing. Cold, doesn't show emotions. For men: Have you been ignoring someone? Or if you don't have anyone, it means your own personality is stiff and cold, making others unable to understand what you're thinking. They don't know if you like them or not. Valentine's and you're still lonely, alone." },
        ja: { quote: "感情をあまり見せない冷たい人", interpretation: "誰かがチャットしてくるけど返信が遅くて、あまり注目してくれない場合 - このカードが出たら、彼らはそんなにあなたを好きじゃないということです。この冷たい人を諦めた方がいい。時間を無駄にしないで。一部の人にとって：この人は軍隊、警察、または管理職で働いているかもしれませんが、それでも追求する価値のあるロマンチックなカードではありません。冷たくて、感情を見せません。男性向け：誰かを無視していませんか？または誰もいないなら、あなた自身の性格が固くて冷たくて、他人があなたが何を考えているか理解できません。彼らはあなたが好きかどうかわかりません。バレンタインでまだ寂しく、一人です。" },
        ko: { quote: "감정을 잘 보여주지 않는 차가운 사람", interpretation: "누군가 채팅하지만 답장이 느리고 관심을 많이 주지 않는다면 - 이 카드가 나오면 그들은 당신을 그렇게 좋아하지 않는다는 뜻입니다. 이 냉정한 사람을 포기하는 게 낫습니다. 시간 낭비하지 마세요. 일부에게는: 이 사람은 군대, 경찰 또는 관리직에서 일할 수 있지만 여전히 추구할 가치가 있는 로맨틱한 카드가 아닙니다. 차갑고 감정을 보여주지 않습니다. 남성분: 누군가를 무시하고 있었나요? 또는 아무도 없다면, 당신 자신의 성격이 딱딱하고 차가워서 다른 사람들이 당신이 무슨 생각을 하는지 이해하지 못합니다. 그들은 당신이 좋아하는지 아닌지 모릅니다. 발렌타인인데 아직 외롭고 혼자입니다." },
        "zh-CN": { quote: "不太表露感情的冷淡的人", interpretation: "如果有人和你聊天但回复很慢，不太关注你——这张牌出现时，意味着他们其实不太喜欢你。最好放弃这个冷心的人。不要浪费时间。对于一些人：这个人可能在军队、警察或管理层工作，但仍然不是值得追求的浪漫牌。冷淡，不表露感情。男性：你有在无视谁吗？或者如果你没有人，那意味着你自己的性格又硬又冷，让别人无法理解你在想什么。他们不知道你喜不喜欢。情人节了你还孤单一人。" },
        "zh-TW": { quote: "不太表露感情的冷淡的人", interpretation: "如果有人和你聊天但回覆很慢，不太關注你——這張牌出現時，意味著他們其實不太喜歡你。最好放棄這個冷心的人。不要浪費時間。對於一些人：這個人可能在軍隊、警察或管理層工作，但仍然不是值得追求的浪漫牌。冷淡，不表露感情。男性：你有在無視誰嗎？或者如果你沒有人，那意味著你自己的性格又硬又冷，讓別人無法理解你在想什麼。他們不知道你喜不喜歡。情人節了你還孤單一人。" }
    },
    "PAGE OF PENTACLES": {
        en: { quote: "Beware of relationships with hidden interests", interpretation: "Someone younger than you, but the person coming might be a scammer - someone inviting you to invest, play crypto, do business, or could be a junior at work, a subordinate in your team. The nature of the relationship: This is a relationship that should have benefits involved, or when together you feel there's more than just love - like they want something from you, or you want something from them. It's not pure love." },
        ja: { quote: "隠れた利益のある関係に注意", interpretation: "あなたより若い人ですが、来る人は詐欺師かもしれません - 投資に誘ったり、暗号通貨をしたり、ビジネスをしたりする人、または職場の後輩、チームの部下かもしれません。関係の性質：これは利益が絡む関係であるべきか、一緒にいると愛以上のものがあると感じます - 彼らがあなたから何かを望んでいるか、あなたが彼らから何かを望んでいるように。純粋な愛ではありません。" },
        ko: { quote: "숨겨진 이익이 있는 관계 조심", interpretation: "당신보다 어린 사람이지만, 오는 사람은 사기꾼일 수 있습니다 - 투자, 암호화폐, 사업을 권유하는 사람이거나 직장 후배, 팀의 부하일 수 있습니다. 관계의 성격: 이것은 이익이 관련된 관계이거나, 함께 있을 때 사랑 이상의 것이 있다고 느낍니다 - 그들이 당신에게서 무언가를 원하거나, 당신이 그들에게서 무언가를 원하는 것처럼. 순수한 사랑이 아닙니다." },
        "zh-CN": { quote: "小心有隐藏利益的关系", interpretation: "比你年轻的人，但来的人可能是骗子——邀请你投资、玩加密货币、做生意的人，或者可能是职场后辈、团队里的下属。关系的性质：这是一段应该有利益的关系，或者在一起时你感觉有比爱更多的东西——比如他们想从你那里得到什么，或者你想从他们那里得到什么。不是纯粹的爱。" },
        "zh-TW": { quote: "小心有隱藏利益的關係", interpretation: "比你年輕的人，但來的人可能是騙子——邀請你投資、玩加密貨幣、做生意的人，或者可能是職場後輩、團隊裡的下屬。關係的性質：這是一段應該有利益的關係，或者在一起時你感覺有比愛更多的東西——比如他們想從你那裡得到什麼，或者你想從他們那裡得到什麼。不是純粹的愛。" }
    },
    "KNIGHT OF PENTACLES": {
        en: { quote: "A stable person but relationship may be slow", interpretation: "May be someone within your workplace, a colleague, or someone who just joined your department. Someone stable, reliable, works slowly but surely, not in a hurry. The nature of the relationship: Your relationship with them may progress very slowly, not much development, or more like a colleague relationship. Not very romantic. May not be ready for a relationship because they're focused on building their career or foundation." },
        ja: { quote: "安定した人だが関係は遅いかも", interpretation: "職場の誰か、同僚、または部門に入ったばかりの人かもしれません。安定していて、信頼でき、ゆっくりだが確実に働き、急いでいません。関係の性質：彼らとの関係は非常にゆっくり進むかもしれません、あまり発展がないか、同僚関係に近いです。あまりロマンチックではありません。キャリアや基盤を築くことに集中しているので、関係の準備ができていないかもしれません。" },
        ko: { quote: "안정적인 사람이지만 관계가 느릴 수 있음", interpretation: "직장 내 누군가, 동료 또는 부서에 막 들어온 사람일 수 있습니다. 안정적이고, 믿을 수 있고, 천천히 하지만 확실하게 일하며, 서두르지 않습니다. 관계의 성격: 그들과의 관계가 매우 천천히 진행될 수 있고, 발전이 많지 않거나, 동료 관계에 가깝습니다. 별로 로맨틱하지 않습니다. 커리어나 기반을 구축하는 데 집중하고 있어서 관계 준비가 안 됐을 수 있습니다." },
        "zh-CN": { quote: "稳定的人但关系可能很慢", interpretation: "可能是职场内的人、同事或刚加入你部门的人。稳定、可靠、做事慢但确实、不急躁。关系的性质：你和他们的关系可能发展很慢，没什么进展，或者更像同事关系。不太浪漫。可能还没准备好恋爱，因为专注于建立事业或基础。" },
        "zh-TW": { quote: "穩定的人但關係可能很慢", interpretation: "可能是職場內的人、同事或剛加入你部門的人。穩定、可靠、做事慢但確實、不急躁。關係的性質：你和他們的關係可能發展很慢，沒什麼進展，或者更像同事關係。不太浪漫。可能還沒準備好戀愛，因為專注於建立事業或基礎。" }
    },
    "QUEEN OF PENTACLES": {
        en: { quote: "Still stuck on an ex, not opening up to new people", interpretation: "For women: You already have someone you like. Anyone who comes, you don't even look up at them. Still thinking and worrying about someone from the past, still checking their stories frequently. That person already knows you're watching. But the truth you need to know: If they liked us, wouldn't they have reached out already? Look up a bit. That person doesn't like us. Don't waste time on someone who doesn't care about you. For men: An ex or someone from the past is thinking about you. Someone from the past may come back, or someone who knew you before is thinking about you now." },
        ja: { quote: "まだ元カレ・元カノに執着、新しい人に心を開かない", interpretation: "女性向け：すでに好きな人がいます。誰が来ても、見上げもしません。過去の誰かのことをまだ考えて心配しています、まだ頻繁にストーリーをチェックしています。その人はあなたが見ていることをすでに知っています。でも知るべき真実：もし彼らが私たちを好きなら、もう連絡してきたんじゃない？少し見上げて。その人は私たちを好きじゃないの。あなたのことを気にしない人に時間を無駄にしないで。男性向け：元カノか過去の誰かがあなたのことを考えています。過去の誰かが戻ってくるかもしれないし、以前あなたを知っていた誰かが今あなたのことを考えています。" },
        ko: { quote: "아직 전 애인에게 얽매여 새로운 사람에게 마음을 열지 않음", interpretation: "여성분: 이미 좋아하는 사람이 있습니다. 누가 와도 쳐다보지도 않습니다. 아직 과거의 누군가를 생각하고 걱정하며, 아직 자주 스토리를 확인합니다. 그 사람은 당신이 보고 있다는 것을 이미 알고 있습니다. 하지만 알아야 할 진실: 그들이 우리를 좋아했다면 이미 연락하지 않았을까요? 조금 고개를 들어요. 그 사람은 우리를 좋아하지 않아요. 당신에게 관심 없는 사람에게 시간 낭비하지 마세요. 남성분: 전 애인이나 과거의 누군가가 당신을 생각하고 있습니다. 과거의 누군가가 돌아올 수 있거나, 전에 당신을 알던 누군가가 지금 당신을 생각하고 있습니다." },
        "zh-CN": { quote: "还沉浸在前任中，不向新人敞开心扉", interpretation: "女性：你已经有喜欢的人了。谁来你都不抬头看。还在想着和担心过去的某人，还经常看他们的动态。那个人已经知道你在看了。但你需要知道的真相：如果他们喜欢我们，不是早就联系了吗？稍微抬起头。那个人不喜欢我们。不要在不在乎你的人身上浪费时间。男性：前任或过去的某人在想你。过去的某人可能会回来，或者以前认识你的人现在在想你。" },
        "zh-TW": { quote: "還沉浸在前任中，不向新人敞開心扉", interpretation: "女性：你已經有喜歡的人了。誰來你都不抬頭看。還在想著和擔心過去的某人，還經常看他們的動態。那個人已經知道你在看了。但你需要知道的真相：如果他們喜歡我們，不是早就聯繫了嗎？稍微抬起頭。那個人不喜歡我們。不要在不在乎你的人身上浪費時間。男性：前任或過去的某人在想你。過去的某人可能會回來，或者以前認識你的人現在在想你。" }
    },
    "KING OF PENTACLES": {
        en: { quote: "A wealthy person ready to spoil you", interpretation: "For women: A man who likes to spend money, very wealthy - we call them 'sugar daddy'! They're falling for you. If they're not super rich, they're still someone with money, from a good family, or working in finance-related fields - like businessman, banker, investor, business owner. For men: Right now if you like someone, you might need to spend money on gifts to develop the relationship. It's a relationship with some materialism - needs financial help. You have to take them to nice restaurants, buy expensive things for them." },
        ja: { quote: "あなたを甘やかす準備ができている裕福な人", interpretation: "女性向け：お金を使うのが好きな男性、とても裕福 - 「パパ活相手」と呼びます！彼らはあなたに夢中です。大金持ちじゃなくても、お金がある人、良い家柄、または金融関連の仕事をしている人 - ビジネスマン、銀行家、投資家、経営者など。男性向け：今誰かを好きなら、関係を発展させるためにプレゼントにお金を使う必要があるかもしれません。物質主義がある関係です - 経済的な助けが必要です。良いレストランに連れて行き、高価なものを買ってあげなければなりません。" },
        ko: { quote: "당신을 spoil할 준비가 된 부유한 사람", interpretation: "여성분: 돈 쓰는 것을 좋아하는 남성, 매우 부유합니다 - 우리는 그들을 '슈가대디'라고 부릅니다! 그들이 당신에게 반하고 있습니다. 엄청 부자가 아니더라도 돈이 있는 사람, 좋은 집안 출신이거나 금융 관련 분야에서 일하는 사람입니다 - 사업가, 은행가, 투자자, 사업주 등. 남성분: 지금 누군가를 좋아한다면 관계를 발전시키기 위해 선물에 돈을 써야 할 수 있습니다. 약간의 물질주의가 있는 관계입니다 - 경제적 도움이 필요합니다. 좋은 레스토랑에 데려가고 비싼 것을 사줘야 합니다." },
        "zh-CN": { quote: "准备宠你的有钱人", interpretation: "女性：一个喜欢花钱的男人，非常有钱——我们叫他们'土豪'！他们正在爱上你。如果不是超级有钱，也是有钱人，家境好，或者从事金融相关工作——如商人、银行家、投资者、企业主。男性：现在如果你喜欢谁，可能需要花钱买礼物来发展关系。这是一段有点物质主义的关系——需要金钱帮助。你得带他们去好餐厅，给他们买贵的东西。" },
        "zh-TW": { quote: "準備寵你的有錢人", interpretation: "女性：一個喜歡花錢的男人，非常有錢——我們叫他們'土豪'！他們正在愛上你。如果不是超級有錢，也是有錢人，家境好，或者從事金融相關工作——如商人、銀行家、投資者、企業主。男性：現在如果你喜歡誰，可能需要花錢買禮物來發展關係。這是一段有點物質主義的關係——需要金錢幫助。你得帶他們去好餐廳，給他們買貴的東西。" }
    },
    "ACE OF WANDS": {
        en: { quote: "An enthusiastic person who's clear about their intentions", interpretation: "Could be a male who's enthusiastic about pursuing you. Someone serious about relationships, makes their move strongly, clearly, and doesn't play games. Also gives importance to intimacy and has high physical desire. Comes with energy and confidence. If female: Could be someone charming, confident, sexy, and knows how to use her appeal." },
        ja: { quote: "意図が明確な熱心な人", interpretation: "あなたを積極的に追いかける男性かもしれません。関係に真剣で、強く、はっきりとアプローチし、駆け引きをしません。親密さを重視し、性的欲求が高いです。エネルギーと自信を持って来ます。女性の場合：魅力的で、自信があり、セクシーで、自分の魅力を使う方法を知っている人かもしれません。" },
        ko: { quote: "의도가 분명한 열정적인 사람", interpretation: "당신을 적극적으로 추구하는 남성일 수 있습니다. 관계에 진지하고, 강하고 명확하게 행동하며, 게임을 하지 않습니다. 친밀감을 중시하고 신체적 욕구가 높습니다. 에너지와 자신감을 가지고 옵니다. 여성이라면: 매력적이고, 자신감 있고, 섹시하며, 자신의 매력을 사용하는 방법을 아는 사람일 수 있습니다." },
        "zh-CN": { quote: "意图明确的热情的人", interpretation: "可能是一个热情追求你的男性。对关系认真，表态强烈、清楚，不玩游戏。也重视亲密关系，身体欲望高。带着能量和自信而来。如果是女性：可能是迷人、自信、性感、知道如何利用自己魅力的人。" },
        "zh-TW": { quote: "意圖明確的熱情的人", interpretation: "可能是一個熱情追求你的男性。對關係認真，表態強烈、清楚，不玩遊戲。也重視親密關係，身體慾望高。帶著能量和自信而來。如果是女性：可能是迷人、自信、性感、知道如何利用自己魅力的人。" }
    },
    "TWO OF WANDS": {
        en: { quote: "Still hesitant, hasn't moved on from the past", interpretation: "Could be a foreigner, someone from social media, someone from a coastal province, or someone far away. Warning: Be careful of someone who's about to break up with their ex but hasn't fully ended things yet. Decided to break up but hasn't actually said it. The relationship is dragging on, stuck, unclear. Or you might not meet anyone new because you're still checking on your ex, haven't truly moved on, still miss them, still hesitating whether to go back or not. Not ready to open your heart to someone new." },
        ja: { quote: "まだ迷っている、過去を乗り越えていない", interpretation: "外国人、ソーシャルメディアの人、沿岸の県の人、または遠くの人かもしれません。注意：元カレ・元カノと別れようとしているがまだ完全に終わっていない人に気をつけて。別れることを決めたがまだ言っていない。関係がだらだら続いて、行き詰まって、不明確。または元カレ・元カノをまだチェックしていて、本当に乗り越えていなくて、まだ恋しくて、戻るかどうかまだ迷っているので新しい人に会わないかもしれません。新しい人に心を開く準備ができていません。" },
        ko: { quote: "아직 망설이고 있고 과거를 극복하지 못함", interpretation: "외국인, 소셜 미디어의 사람, 해안 지역의 사람 또는 먼 곳의 사람일 수 있습니다. 주의: 전 애인과 헤어지려고 하지만 아직 완전히 끝내지 않은 사람을 조심하세요. 헤어지기로 결정했지만 아직 말하지 않았습니다. 관계가 질질 끌리고, 막혀있고, 불분명합니다. 또는 아직 전 애인을 확인하고 있고, 진정으로 극복하지 못했고, 아직 그리워하고, 돌아갈지 말지 아직 망설이고 있어서 새로운 사람을 만나지 못할 수 있습니다. 새로운 사람에게 마음을 열 준비가 되지 않았습니다." },
        "zh-CN": { quote: "还在犹豫，还没从过去走出来", interpretation: "可能是外国人、社交媒体上的人、沿海省份的人或远方的人。警告：小心快要和前任分手但还没完全结束的人。决定分手了但还没说。关系拖拖拉拉、卡住了、不清楚。或者你可能遇不到新人，因为你还在看前任动态、还没真正放下、还想念、还在犹豫要不要回去。还没准备好对新人敞开心扉。" },
        "zh-TW": { quote: "還在猶豫，還沒從過去走出來", interpretation: "可能是外國人、社交媒體上的人、沿海省份的人或遠方的人。警告：小心快要和前任分手但還沒完全結束的人。決定分手了但還沒說。關係拖拖拉拉、卡住了、不清楚。或者你可能遇不到新人，因為你還在看前任動態、還沒真正放下、還想念、還在猶豫要不要回去。還沒準備好對新人敞開心扉。" }
    },
    "THREE OF WANDS": {
        en: { quote: "Ready to start anew, waiting for opportunities", interpretation: "You've just fully moved on from someone old. You're ready to meet new people, open to new opportunities. Right now you haven't met anyone interesting yet, still waiting, still looking, but believe you'll find someone soon. If you have someone you've been talking to for a while: If they just got out of a relationship, they don't have lingering feelings for their ex. They're ready to start fresh." },
        ja: { quote: "新しく始める準備ができて、機会を待っている", interpretation: "古い人から完全に乗り越えたところです。新しい人に会う準備ができて、新しい機会に開かれています。今はまだ面白い人に会っていなくて、まだ待っていて、まだ探していますが、すぐに見つかると信じています。しばらく話している人がいる場合：彼らが関係から出たばかりなら、元カレ・元カノへの未練はありません。新しく始める準備ができています。" },
        ko: { quote: "새로 시작할 준비가 되어 기회를 기다림", interpretation: "오래된 사람으로부터 완전히 극복했습니다. 새로운 사람을 만날 준비가 되었고, 새로운 기회에 열려 있습니다. 지금은 아직 흥미로운 사람을 만나지 못했고, 아직 기다리고 있고, 아직 찾고 있지만 곧 찾을 것이라고 믿습니다. 한동안 대화해온 사람이 있다면: 그들이 관계에서 막 벗어났다면, 전 애인에 대한 미련이 없습니다. 새로 시작할 준비가 되었습니다." },
        "zh-CN": { quote: "准备重新开始，等待机会", interpretation: "你刚从旧人那里完全走出来。你准备好认识新人，对新机会持开放态度。现在还没遇到有趣的人，还在等待，还在寻找，但相信很快会遇到。如果你有聊了一段时间的人：如果他们刚从关系中走出来，他们对前任没有留恋。他们准备好重新开始了。" },
        "zh-TW": { quote: "準備重新開始，等待機會", interpretation: "你剛從舊人那裡完全走出來。你準備好認識新人，對新機會持開放態度。現在還沒遇到有趣的人，還在等待，還在尋找，但相信很快會遇到。如果你有聊了一段時間的人：如果他們剛從關係中走出來，他們對前任沒有留戀。他們準備好重新開始了。" }
    },
    "FOUR OF WANDS": {
        en: { quote: "Love from someone close by", interpretation: "You have a chance to find love with someone at work, a duo partner you work with, or someone you see in your daily life. Someone nearby, someone around you. For those with someone: It could mean going public with your relationship, announcing that you're together, telling people around you. But if your situation isn't good: It means the person you're talking to or like has gone public with someone else, has a new partner already." },
        ja: { quote: "身近な人からの愛", interpretation: "職場の人、一緒に働くデュオパートナー、または日常生活で見かける人と恋に落ちるチャンスがあります。近くにいる人、周りにいる人。誰かがいる人へ：関係を公にする、一緒だと発表する、周りの人に伝えることを意味するかもしれません。でもあなたの状況が良くないなら：話している人や好きな人が他の誰かと公になった、すでに新しいパートナーがいるということです。" },
        ko: { quote: "가까운 사람의 사랑", interpretation: "직장 동료, 함께 일하는 파트너 또는 일상에서 보는 사람과 사랑에 빠질 기회가 있습니다. 가까이 있는 사람, 주변에 있는 사람. 누군가 있는 사람에게는: 관계를 공개하거나, 함께라고 발표하거나, 주변 사람들에게 말하는 것을 의미할 수 있습니다. 하지만 상황이 좋지 않다면: 대화하거나 좋아하는 사람이 다른 누군가와 공개됐고, 이미 새 파트너가 있다는 뜻입니다." },
        "zh-CN": { quote: "来自身边人的爱", interpretation: "你有机会与职场的人、一起工作的搭档或日常生活中见到的人产生爱情。附近的人，身边的人。对于有对象的人：可能意味着公开关系、宣布在一起、告诉周围的人。但如果你的情况不好：意味着你在聊或喜欢的人和别人公开了，已经有新对象了。" },
        "zh-TW": { quote: "來自身邊人的愛", interpretation: "你有機會與職場的人、一起工作的搭檔或日常生活中見到的人產生愛情。附近的人，身邊的人。對於有對象的人：可能意味著公開關係、宣布在一起、告訴周圍的人。但如果你的情況不好：意味著你在聊或喜歡的人和別人公開了，已經有新對象了。" }
    },
    "FIVE OF WANDS": {
        en: { quote: "Someone in your team or friend group", interpretation: "Mostly someone in your team, close friends, or friend group, especially if you have a large friend group. Usually someone similar in age. You have a chance to get closer to someone in your team or someone you work with. The person you might date or develop a relationship with is someone close to you in the group." },
        ja: { quote: "チームや友達グループの誰か", interpretation: "主にチーム、親しい友人、またはグループの誰か、特に大きな友達グループがある場合。通常は同年代の人。チームの誰かや一緒に働く人と親しくなるチャンスがあります。デートしたり関係を発展させたりする人は、グループの中の身近な人です。" },
        ko: { quote: "팀이나 친구 그룹의 누군가", interpretation: "주로 팀, 친한 친구 또는 친구 그룹의 누군가, 특히 큰 친구 그룹이 있다면. 보통 비슷한 나이의 사람입니다. 팀의 누군가나 함께 일하는 사람과 더 가까워질 기회가 있습니다. 데이트하거나 관계를 발전시킬 사람은 그룹 내 가까운 사람입니다." },
        "zh-CN": { quote: "团队或朋友圈里的人", interpretation: "大多是团队里、亲密朋友或朋友圈里的人，尤其如果你有个大的朋友圈。通常是年龄相近的人。你有机会与团队里的人或一起工作的人变得更亲近。你可能约会或发展关系的人是圈子里亲近的人。" },
        "zh-TW": { quote: "團隊或朋友圈裡的人", interpretation: "大多是團隊裡、親密朋友或朋友圈裡的人，尤其如果你有個大的朋友圈。通常是年齡相近的人。你有機會與團隊裡的人或一起工作的人變得更親近。你可能約會或發展關係的人是圈子裡親近的人。" }
    },
    "SIX OF WANDS": {
        en: { quote: "An ex returning or someone successful", interpretation: "The person coming might be someone from the past - an old friend, someone who studied abroad and came back, or an ex version 2.0 who's upgraded. Someone you knew before reaching out again. If it's someone new, they might be a boss or someone recently promoted in your team or company. Or: You want to devote yourself entirely to being a fan. The person you'll 'date' is your idol, along with fandom friends - going to concerts, fan meets, buying merchandise." },
        ja: { quote: "戻ってくる元カレ・元カノか成功した人", interpretation: "来る人は過去の誰かかもしれません - 旧友、留学して戻ってきた人、またはアップグレードした元カレ・元カノ2.0。以前知っていた人がまた連絡してきます。新しい人なら、あなたのチームや会社のボスか最近昇進した人かもしれません。または：ファンに徹したい。「デート」する人はアイドルで、ファンダムの友達と一緒に - コンサート、ファンミート、グッズ購入。" },
        ko: { quote: "돌아오는 전 애인 또는 성공한 사람", interpretation: "오는 사람은 과거의 누군가일 수 있습니다 - 오랜 친구, 유학했다가 돌아온 사람, 또는 업그레이드된 전 애인 2.0. 전에 알던 사람이 다시 연락합니다. 새로운 사람이라면 팀이나 회사의 상사이거나 최근 승진한 사람일 수 있습니다. 또는: 팬질에 전념하고 싶습니다. '데이트'할 사람은 아이돌이고, 팬덤 친구들과 함께 - 콘서트, 팬미팅, 굿즈 구매." },
        "zh-CN": { quote: "回来的前任或成功的人", interpretation: "来的人可能是过去的某人——老朋友、留学回来的人或升级版前任2.0。以前认识的人再次联系。如果是新人，可能是你团队或公司的老板或最近升职的人。或者：你想全心投入当粉丝。你会'约会'的人是你的偶像，还有饭圈朋友——去演唱会、粉丝见面会、买周边。" },
        "zh-TW": { quote: "回來的前任或成功的人", interpretation: "來的人可能是過去的某人——老朋友、留學回來的人或升級版前任2.0。以前認識的人再次聯繫。如果是新人，可能是你團隊或公司的老闆或最近升職的人。或者：你想全心投入當粉絲。你會'約會'的人是你的偶像，還有飯圈朋友——去演唱會、粉絲見面會、買周邊。" }
    },
    "SEVEN OF WANDS": {
        en: { quote: "Must compete with rivals", interpretation: "You've shown yourself fully, announced that you're single, but no one good enough has come yet. Still waiting, still looking. Or if the person you like (who seems to have options) has announced they're single, you have quite a few competitors. You need to compete with others, prove yourself. For some: You might go to your favorite idol's concert on Valentine's Day, cheering them on." },
        ja: { quote: "ライバルと競争しなければならない", interpretation: "自分を十分に見せて、独身だと宣言しましたが、まだ十分に良い人が来ていません。まだ待っていて、まだ探しています。または好きな人（選択肢がありそうな人）が独身を宣言したなら、かなりの競争相手がいます。他の人と競争し、自分を証明する必要があります。一部の人にとって：バレンタインに好きなアイドルのコンサートに行って応援するかもしれません。" },
        ko: { quote: "경쟁자와 경쟁해야 함", interpretation: "자신을 충분히 보여주고 싱글이라고 발표했지만 아직 충분히 좋은 사람이 오지 않았습니다. 아직 기다리고 있고, 아직 찾고 있습니다. 또는 좋아하는 사람(선택지가 있어 보이는)이 싱글이라고 발표했다면 꽤 많은 경쟁자가 있습니다. 다른 사람들과 경쟁하고 자신을 증명해야 합니다. 일부에게는: 발렌타인에 좋아하는 아이돌의 콘서트에 가서 응원할 수 있습니다." },
        "zh-CN": { quote: "必须与竞争对手竞争", interpretation: "你已经充分展示自己，宣布单身了，但还没有足够好的人出现。还在等待，还在寻找。或者如果你喜欢的人（看起来有选择的）宣布单身，你有相当多的竞争者。你需要与别人竞争，证明自己。对于一些人：你可能在情人节去喜欢的偶像的演唱会，为他们加油。" },
        "zh-TW": { quote: "必須與競爭對手競爭", interpretation: "你已經充分展示自己，宣布單身了，但還沒有足夠好的人出現。還在等待，還在尋找。或者如果你喜歡的人（看起來有選擇的）宣布單身，你有相當多的競爭者。你需要與別人競爭，證明自己。對於一些人：你可能在情人節去喜歡的偶像的演唱會，為他們加油。" }
    },
    "EIGHT OF WANDS": {
        en: { quote: "Love from travel or dating apps", interpretation: "You have a chance to meet someone you like through travel or dating apps like Tinder, Bumble, Coffee Meets Bagel. This person might be far away, in another province or country, or you'd need to travel far to meet them. For those with someone: If you didn't arrange a Valentine's date, be careful they might disappear. You send long messages but they might be on a date with someone else, not choosing you." },
        ja: { quote: "旅行やマッチングアプリからの恋", interpretation: "旅行やTinder、Bumble、Coffee Meets Bagelなどのマッチングアプリで好きな人に出会うチャンスがあります。この人は遠くにいるかもしれません、他の県や国、または会うには遠くまで旅行する必要があるかもしれません。誰かがいる人へ：バレンタインデートを設定しなかったなら、彼らが消えるかもしれないので気をつけて。長いメッセージを送っても、彼らは他の誰かとデートしていて、あなたを選んでいないかもしれません。" },
        ko: { quote: "여행이나 데이팅 앱에서의 사랑", interpretation: "여행이나 Tinder, Bumble, Coffee Meets Bagel 같은 데이팅 앱을 통해 좋아하는 사람을 만날 기회가 있습니다. 이 사람은 멀리 있을 수 있습니다, 다른 지방이나 나라에, 또는 만나려면 멀리 여행해야 할 수 있습니다. 누군가 있는 사람에게: 발렌타인 데이트를 잡지 않았다면 그들이 사라질 수 있으니 조심하세요. 긴 메시지를 보내도 그들은 다른 사람과 데이트하고 있을 수 있고, 당신을 선택하지 않을 수 있습니다." },
        "zh-CN": { quote: "来自旅行或约会app的爱情", interpretation: "你有机会通过旅行或Tinder、Bumble、Coffee Meets Bagel等约会app遇到喜欢的人。这个人可能在远方，在另一个省份或国家，或者需要远行才能见面。对于有对象的人：如果没有安排情人节约会，要小心他们可能会消失。你发很长的消息但他们可能在和别人约会，没有选择你。" },
        "zh-TW": { quote: "來自旅行或約會app的愛情", interpretation: "你有機會通過旅行或Tinder、Bumble、Coffee Meets Bagel等約會app遇到喜歡的人。這個人可能在遠方，在另一個省份或國家，或者需要遠行才能見面。對於有對象的人：如果沒有安排情人節約會，要小心他們可能會消失。你發很長的消息但他們可能在和別人約會，沒有選擇你。" }
    },
    "NINE OF WANDS": {
        en: { quote: "High walls, not ready to open up", interpretation: "You won't meet anyone new because: You're an introvert, stay home, don't do social media, don't open up to anyone. Your walls are very high. Do you know what kind of creature is tall enough and has long legs to jump over high walls? A ghost. Or if you do meet someone now: You might meet someone who hasn't fully broken up with their partner yet. They're looking for someone to help them jump from one relationship to another. Some claim to have broken up, but it's not really over. Or someone with very high walls in relationships, not ready to open up to anyone, still has wounds. For those who want to reconnect with an ex: Some want to message their ex but got blocked. Try messaging them on True Money wallet or Spotify. There should be some way." },
        ja: { quote: "高い壁、心を開く準備ができていない", interpretation: "新しい人に会わないでしょう。なぜなら：あなたは内向的で、家にいて、ソーシャルメディアをせず、誰にも心を開きません。壁がとても高いです。高い壁を飛び越えられるほど背が高くて足が長い生き物は何か知っていますか？幽霊です。または今誰かに会ったら：まだパートナーと完全に別れていない人に会うかもしれません。彼らは一つの関係から別の関係にジャンプさせてくれる人を探しています。別れたと主張する人もいますが、本当には終わっていません。または関係で壁が非常に高い人、誰にも心を開く準備ができていない、まだ傷がある人。元カレ・元カノと再会したい人へ：メッセージを送りたいがブロックされた人もいます。True Moneyウォレットやスポティファイでメッセージを試してみて。何か方法があるはずです。" },
        ko: { quote: "높은 벽, 마음을 열 준비가 되지 않음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 당신은 내성적이고, 집에 있고, 소셜 미디어를 하지 않고, 누구에게도 마음을 열지 않습니다. 벽이 매우 높습니다. 높은 벽을 뛰어넘을 만큼 키가 크고 다리가 긴 생물이 뭔지 아세요? 귀신입니다. 또는 지금 누군가를 만난다면: 아직 파트너와 완전히 헤어지지 않은 사람을 만날 수 있습니다. 그들은 한 관계에서 다른 관계로 뛰어넘게 해줄 사람을 찾고 있습니다. 헤어졌다고 주장하지만 정말 끝나지 않은 사람도 있습니다. 또는 관계에서 벽이 매우 높은 사람, 누구에게도 마음을 열 준비가 되지 않은, 아직 상처가 있는 사람. 전 애인과 다시 연결하고 싶은 사람들에게: 전 애인에게 메시지를 보내고 싶지만 차단당한 사람도 있습니다. True Money 지갑이나 Spotify로 메시지를 보내보세요. 어떤 방법이 있을 것입니다." },
        "zh-CN": { quote: "高墙，还没准备好敞开心扉", interpretation: "你不会遇到新人因为：你是内向的人、待在家里、不玩社交媒体、不对任何人敞开心扉。你的墙很高。你知道什么生物够高、腿够长能跳过高墙吗？是鬼。或者如果你现在确实遇到了某人：你可能会遇到还没和伴侣完全分手的人。他们在找人帮他们从一段关系跳到另一段关系。有些人声称分手了但其实没完。或者在关系中有很高的墙的人，还没准备好对任何人敞开心扉，还有伤口。对于想和前任重新联系的人：有些人想给前任发消息但被拉黑了。试试通过真钱钱包或Spotify发消息。应该有办法的。" },
        "zh-TW": { quote: "高牆，還沒準備好敞開心扉", interpretation: "你不會遇到新人因為：你是內向的人、待在家裡、不玩社交媒體、不對任何人敞開心扉。你的牆很高。你知道什麼生物夠高、腿夠長能跳過高牆嗎？是鬼。或者如果你現在確實遇到了某人：你可能會遇到還沒和伴侶完全分手的人。他們在找人幫他們從一段關係跳到另一段關係。有些人聲稱分手了但其實沒完。或者在關係中有很高的牆的人，還沒準備好對任何人敞開心扉，還有傷口。對於想和前任重新聯繫的人：有些人想給前任發消息但被拉黑了。試試通過真錢錢包或Spotify發消息。應該有辦法的。" }
    },
    "TEN OF WANDS": {
        en: { quote: "Still holding onto an old love, won't let go", interpretation: "You won't meet anyone new because: You're trying to hold onto an old love, but their heart isn't there anymore. Even if they stay, you'll only have their body, not their heart. Let them go. You'll find someone new who's better. Or if you're completely single: You might meet someone who wants a partner but is stubbornly holding onto an impossible love. Still thinking of an ex, still not letting go. Let them go? Go find someone new instead." },
        ja: { quote: "まだ古い愛にしがみついて、手放さない", interpretation: "新しい人に会わないでしょう。なぜなら：古い愛にしがみつこうとしていますが、彼らの心はもうそこにありません。彼らが残っても、彼らの体だけで、心は得られません。手放しましょう。より良い新しい人が見つかります。または完全に独身なら：パートナーを望んでいるが、不可能な愛に頑固にしがみついている人に会うかもしれません。まだ元カレ・元カノのことを考えていて、まだ手放していません。手放しましょう？代わりに新しい人を見つけに行きましょう。" },
        ko: { quote: "아직 옛 사랑에 매달리고 놓지 않음", interpretation: "새로운 사람을 만나지 않을 것입니다. 왜냐하면: 옛 사랑을 붙잡으려 하지만 그들의 마음은 더 이상 거기에 없습니다. 그들이 남아있어도 그들의 몸만 가질 뿐 마음은 얻지 못합니다. 그들을 보내세요. 더 나은 새로운 사람을 찾을 것입니다. 또는 완전히 싱글이라면: 파트너를 원하지만 불가능한 사랑에 고집스럽게 매달리는 사람을 만날 수 있습니다. 아직 전 애인을 생각하고 있고, 아직 놓지 않고 있습니다. 그들을 보내세요? 대신 새로운 사람을 찾으러 가세요." },
        "zh-CN": { quote: "还抓着旧爱不放", interpretation: "你不会遇到新人因为：你在试图挽留旧爱，但他们的心已经不在了。即使他们留下，你也只能得到他们的身体，得不到他们的心。放他们走吧。你会找到更好的新人。或者如果你完全单身：你可能遇到想要伴侣但固执地抓着不可能的爱不放的人。还在想前任，还不放手。放他们走？去找新人吧。" },
        "zh-TW": { quote: "還抓著舊愛不放", interpretation: "你不會遇到新人因為：你在試圖挽留舊愛，但他們的心已經不在了。即使他們留下，你也只能得到他們的身體，得不到他們的心。放他們走吧。你會找到更好的新人。或者如果你完全單身：你可能遇到想要伴侶但固執地抓著不可能的愛不放的人。還在想前任，還不放手。放他們走？去找新人吧。" }
    },
    "ACE OF CUPS": {
        en: { quote: "A new love that comes naturally without effort", interpretation: "Who will come: Someone who enters your life naturally without you having to struggle. They'll message and ask you out on a date. Could be someone you've never met before. This is the beginning of a new love, new feelings, exciting, with potential to develop into something deep. You might go for coffee together or receive a gift you love. For those in relationships: Your partner will take extra special care of you. Near important dates or anniversaries, there's a chance to receive a gift you love. Married couples planning to have children might receive good news." },
        ja: { quote: "努力なしに自然に来る新しい愛", interpretation: "誰が来るか：苦労せずに自然にあなたの人生に入ってくる人。メッセージを送ってデートに誘います。会ったことのない人かもしれません。これは新しい愛の始まり、新しい感情、エキサイティングで、深いものに発展する可能性があります。一緒にコーヒーを飲みに行くか、好きなプレゼントをもらうかもしれません。関係にある人へ：パートナーが特別に大事にしてくれます。記念日が近づくと、好きなプレゼントをもらう可能性があります。子供を計画している夫婦には良い知らせがあるかもしれません。" },
        ko: { quote: "노력 없이 자연스럽게 오는 새로운 사랑", interpretation: "누가 올까: 당신이 노력하지 않아도 자연스럽게 당신의 삶에 들어오는 사람. 메시지를 보내고 데이트를 신청합니다. 만난 적 없는 사람일 수 있습니다. 이것은 새로운 사랑의 시작, 새로운 감정, 흥미진진하고, 깊은 것으로 발전할 가능성이 있습니다. 함께 커피를 마시러 가거나 좋아하는 선물을 받을 수 있습니다. 연인이 있는 사람에게: 파트너가 특별히 잘 돌봐줄 것입니다. 중요한 날이나 기념일 근처에 좋아하는 선물을 받을 가능성이 있습니다. 자녀를 계획하는 부부에게 좋은 소식이 있을 수 있습니다." },
        "zh-CN": { quote: "不费力自然到来的新爱情", interpretation: "谁会来：不用你努力就自然进入你生活的人。他们会发消息约你出去。可能是你从未见过的人。这是新爱情的开始，新的感觉，令人兴奋，有发展成深刻感情的潜力。你们可能一起去喝咖啡或收到你喜欢的礼物。对于有伴侣的人：你的伴侣会特别照顾你。在重要的日子或纪念日附近，有机会收到你喜欢的礼物。计划要孩子的夫妻可能会收到好消息。" },
        "zh-TW": { quote: "不費力自然到來的新愛情", interpretation: "誰會來：不用你努力就自然進入你生活的人。他們會發消息約你出去。可能是你從未見過的人。這是新愛情的開始，新的感覺，令人興奮，有發展成深刻感情的潛力。你們可能一起去喝咖啡或收到你喜歡的禮物。對於有伴侶的人：你的伴侶會特別照顧你。在重要的日子或紀念日附近，有機會收到你喜歡的禮物。計劃要孩子的夫妻可能會收到好消息。" }
    },
    "TWO OF CUPS": {
        en: { quote: "A balanced love where both give and receive equally", interpretation: "Who will come: The person you'll meet or date on Valentine's is someone you already know or have been talking to for a while. You get along well. The relationship will progress quickly. There's a chance to meet someone you like through social media, or long-distance couples will meet. This is a card of balanced love - feelings are equal on both sides. Both give and receive equally." },
        ja: { quote: "両方が平等に与え合うバランスの取れた愛", interpretation: "誰が来るか：バレンタインに会ったりデートしたりする人は、すでに知っている人かしばらく話している人です。仲が良いです。関係は急速に発展します。ソーシャルメディアで好きな人に出会うチャンスがあるか、遠距離カップルが会えます。これはバランスの取れた愛のカードです - 両方の感情が平等です。両方が平等に与え合います。" },
        ko: { quote: "둘 다 평등하게 주고받는 균형 잡힌 사랑", interpretation: "누가 올까: 발렌타인에 만나거나 데이트할 사람은 이미 알고 있거나 한동안 대화해온 사람입니다. 잘 맞습니다. 관계가 빠르게 발전할 것입니다. 소셜 미디어를 통해 좋아하는 사람을 만날 기회가 있거나, 장거리 커플이 만날 것입니다. 이것은 균형 잡힌 사랑의 카드입니다 - 양쪽의 감정이 평등합니다. 둘 다 평등하게 주고받습니다." },
        "zh-CN": { quote: "双方平等付出和接受的平衡的爱", interpretation: "谁会来：你在情人节会见或约会的人是你已经认识或聊了一段时间的人。你们聊得来。关系会快速发展。有机会通过社交媒体遇到喜欢的人，或者异地恋人会见面。这是平衡爱情的牌——双方的感情是平等的。双方平等地付出和接受。" },
        "zh-TW": { quote: "雙方平等付出和接受的平衡的愛", interpretation: "誰會來：你在情人節會見或約會的人是你已經認識或聊了一段時間的人。你們聊得來。關係會快速發展。有機會通過社交媒體遇到喜歡的人，或者異地戀人會見面。這是平衡愛情的牌——雙方的感情是平等的。雙方平等地付出和接受。" }
    },
    "THREE OF CUPS": {
        en: { quote: "Meet someone at social events, but beware of third parties", interpretation: "Who will come: You might meet someone you like at a party, wedding, or through friends of friends. Likely to find someone at social events, celebrations, or friend gatherings. For some: You might have a group dinner with close friends. Single but not lonely. For those who are a bit fancy, there might be an opportunity for a '1 2 3 not only you and me' type relationship. Warning: Make sure to check if they're really single, because there might be someone else in their life already. Watch out for third parties. This card emphasizes friendship more than romantic love." },
        ja: { quote: "社交イベントで出会う、でも第三者に注意", interpretation: "誰が来るか：パーティー、結婚式、または友達の友達を通じて好きな人に出会うかもしれません。社交イベント、お祝い、友達の集まりで誰かを見つける可能性が高いです。一部の人にとって：親しい友達とグループディナーがあるかもしれません。独身だけど寂しくない。ちょっとファンシーな人には「1 2 3 あなたと私だけじゃない」タイプの関係の機会があるかもしれません。注意：彼らが本当に独身か確認してください、すでに他の人がいるかもしれないから。第三者に注意。このカードはロマンチックな愛より友情を強調します。" },
        ko: { quote: "사교 행사에서 만나지만 제3자 조심", interpretation: "누가 올까: 파티, 결혼식 또는 친구의 친구를 통해 좋아하는 사람을 만날 수 있습니다. 사교 행사, 축하 모임 또는 친구 모임에서 누군가를 찾을 가능성이 높습니다. 일부에게는: 친한 친구들과 그룹 디너가 있을 수 있습니다. 싱글이지만 외롭지 않습니다. 약간 멋진 사람들에게는 '1 2 3 당신과 나만이 아닌' 유형의 관계 기회가 있을 수 있습니다. 주의: 그들이 정말 싱글인지 확인하세요, 이미 다른 사람이 있을 수 있으니까. 제3자를 조심하세요. 이 카드는 로맨틱한 사랑보다 우정을 강조합니다." },
        "zh-CN": { quote: "在社交活动中遇到人，但小心第三者", interpretation: "谁会来：你可能在派对、婚礼或通过朋友的朋友遇到喜欢的人。很可能在社交活动、庆祝会或朋友聚会中找到人。对于一些人：可能和亲密朋友吃团体晚餐。单身但不孤单。对于比较花心的人，可能有'1 2 3 不只是你和我'类型关系的机会。警告：确保检查他们是否真的单身，因为他们生活中可能已经有其他人了。小心第三者。这张牌强调友谊多于浪漫爱情。" },
        "zh-TW": { quote: "在社交活動中遇到人，但小心第三者", interpretation: "誰會來：你可能在派對、婚禮或通過朋友的朋友遇到喜歡的人。很可能在社交活動、慶祝會或朋友聚會中找到人。對於一些人：可能和親密朋友吃團體晚餐。單身但不孤單。對於比較花心的人，可能有'1 2 3 不只是你和我'類型關係的機會。警告：確保檢查他們是否真的單身，因為他們生活中可能已經有其他人了。小心第三者。這張牌強調友誼多於浪漫愛情。" }
    },
    "FOUR OF CUPS": {
        en: { quote: "Opportunities exist but you can't see them because you're stuck in dissatisfaction", interpretation: "You won't meet anyone new because: Someone already invited you out on Valentine's but they're not handsome, don't look good, not your type, what they say doesn't appeal to you, so you told them 'let me think about it'. Meanwhile the person you want to ask you out: Or when you asked them out, they don't read your messages, left you on read, or they've been 'taking a shower since last life' and still haven't finished. Must be a very long shower. This is a card of indifference and boredom. Opportunities are in front of you but you can't see them because you're drowning in dissatisfaction. For those in relationships: You might feel bored with the relationship, not satisfied with the love the other person gives. Even if they apologize after a fight, you still don't want to forgive easily." },
        ja: { quote: "機会はあるが不満に囚われて見えない", interpretation: "新しい人に会わないでしょう。なぜなら：誰かがバレンタインに誘ったがハンサムじゃない、見た目が良くない、タイプじゃない、言うことが響かないので「考えさせて」と言いました。一方、あなたが誘ってほしい人：または誘ったとき、メッセージを読まない、既読スルー、または「前世からシャワー中」でまだ終わっていない。とても長いシャワーに違いない。これは無関心と退屈のカードです。機会は目の前にあるが、不満に溺れているので見えません。関係にある人へ：関係に飽きているかもしれない、相手が与える愛に満足していない。喧嘩後に謝っても、簡単に許したくない。" },
        ko: { quote: "기회가 있지만 불만에 사로잡혀 보이지 않음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 누군가 발렌타인에 초대했지만 잘생기지 않고, 외모가 좋지 않고, 타입이 아니고, 말하는 것이 마음에 들지 않아서 '생각해볼게'라고 했습니다. 한편 당신이 초대해주길 원하는 사람: 또는 초대했을 때 메시지를 읽지 않거나, 읽고 답하지 않거나, '전생부터 샤워 중'이라 아직 안 끝났습니다. 아주 긴 샤워인 게 틀림없습니다. 이것은 무관심과 지루함의 카드입니다. 기회가 앞에 있지만 불만에 빠져서 보이지 않습니다. 연인이 있는 사람에게: 관계에 지루해하거나 상대방이 주는 사랑에 만족하지 못할 수 있습니다. 싸운 후 사과해도 쉽게 용서하고 싶지 않습니다." },
        "zh-CN": { quote: "机会存在但因为沉浸在不满中看不到", interpretation: "你不会遇到新人因为：有人已经邀请你情人节出去但他们不帅、长得不好看、不是你的类型、说的话不入耳，所以你告诉他们'让我想想'。同时你希望邀请你的人：或者当你邀请他们时，他们不读你的消息、已读不回、或者'从上辈子就在洗澡'还没洗完。一定是个很长的澡。这是冷漠和无聊的牌。机会就在眼前但你看不到因为你沉浸在不满中。对于有伴侣的人：你可能对关系感到厌倦，对对方给的爱不满意。即使吵架后他们道歉，你也不想轻易原谅。" },
        "zh-TW": { quote: "機會存在但因為沉浸在不滿中看不到", interpretation: "你不會遇到新人因為：有人已經邀請你情人節出去但他們不帥、長得不好看、不是你的類型、說的話不入耳，所以你告訴他們'讓我想想'。同時你希望邀請你的人：或者當你邀請他們時，他們不讀你的消息、已讀不回、或者'從上輩子就在洗澡'還沒洗完。一定是個很長的澡。這是冷漠和無聊的牌。機會就在眼前但你看不到因為你沉浸在不滿中。對於有伴侶的人：你可能對關係感到厭倦，對對方給的愛不滿意。即使吵架後他們道歉，你也不想輕易原諒。" }
    },
    "FIVE OF CUPS": {
        en: { quote: "Still drowning in sadness, only seeing what's lost", interpretation: "You won't meet anyone new because: You've been blocked by the person you wanted to ask you out, or one of you is far away, in another country, so this might not happen. For some, you may have just had heartbreak and are still drowning in sadness, unable to move on. But if you haven't had heartbreak: But just met someone, that person is the one who just had heartbreak - sad, disappointed, moving on in circles. Dating them would be a waste of time. This is a card of loss and disappointment. Only looking at what's been lost, not seeing what still remains." },
        ja: { quote: "まだ悲しみに溺れ、失ったものだけを見ている", interpretation: "新しい人に会わないでしょう。なぜなら：誘ってほしかった人にブロックされた、またはどちらかが遠くにいる、他の国にいるので、これは起こらないかもしれません。一部の人は、失恋したばかりで、まだ悲しみに溺れていて、前に進めません。でも失恋していないなら：でも誰かに会ったばかりなら、その人は失恋したばかりの人です - 悲しい、失望した、円を描くように前に進んでいる。彼らとデートするのは時間の無駄です。これは喪失と失望のカードです。失ったものだけを見て、まだ残っているものを見ていません。" },
        ko: { quote: "아직 슬픔에 빠져 잃은 것만 보고 있음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 초대해주길 원했던 사람에게 차단당했거나, 둘 중 하나가 멀리, 다른 나라에 있어서 이루어지지 않을 수 있습니다. 일부는 막 실연을 당해 아직 슬픔에 빠져 앞으로 나아가지 못합니다. 하지만 실연을 당하지 않았다면: 하지만 방금 누군가를 만났다면, 그 사람이 막 실연당한 사람입니다 - 슬프고, 실망하고, 원을 그리며 나아가고 있습니다. 그들과 데이트하는 것은 시간 낭비입니다. 이것은 상실과 실망의 카드입니다. 잃은 것만 보고, 아직 남아있는 것을 보지 않습니다." },
        "zh-CN": { quote: "还沉浸在悲伤中，只看到失去的", interpretation: "你不会遇到新人因为：你被想要邀请你的人拉黑了，或者你们中有一个在远方、在另一个国家，所以这可能不会发生。对于一些人，你可能刚心碎，还沉浸在悲伤中无法前进。但如果你没有心碎：但刚遇到某人，那个人就是刚心碎的人——伤心、失望、原地打转。和他们约会会浪费时间。这是失去和失望的牌。只看失去的，看不到还剩下的。" },
        "zh-TW": { quote: "還沉浸在悲傷中，只看到失去的", interpretation: "你不會遇到新人因為：你被想要邀請你的人拉黑了，或者你們中有一個在遠方、在另一個國家，所以這可能不會發生。對於一些人，你可能剛心碎，還沉浸在悲傷中無法前進。但如果你沒有心碎：但剛遇到某人，那個人就是剛心碎的人——傷心、失望、原地打轉。和他們約會會浪費時間。這是失去和失望的牌。只看失去的，看不到還剩下的。" }
    },
    "SIX OF CUPS": {
        en: { quote: "An ex returning, or a pure love like childhood", interpretation: "Who will come: In many words, it means ex. The person you'll date is an old flame, an ex, a childhood friend, or if not in these conditions, could be someone with a big age gap from you - either they're much older or you're much older than them. The atmosphere: Love feels romantic, dating at home, Netflix and chill. Couples who were upset will reconcile, sweetness will return even more than before. This is a card of memories, innocence, love as pure as childhood, simple and uncomplicated relationships." },
        ja: { quote: "戻ってくる元カレ・元カノ、または子供時代のような純粋な愛", interpretation: "誰が来るか：一言で言えば元カレ・元カノ。デートする人は旧友、元カレ・元カノ、幼なじみ、またはこれらの条件に当てはまらないなら、年の差がある人かもしれません - 彼らがずっと年上か、あなたが彼らよりずっと年上。雰囲気：愛はロマンチックで、家でデート、ネットフリックス・アンド・チル。怒っていたカップルは仲直りし、甘さは以前よりも戻ってきます。これは思い出、無邪気さ、子供時代のような純粋な愛、シンプルで複雑でない関係のカードです。" },
        ko: { quote: "돌아오는 전 애인 또는 어린 시절 같은 순수한 사랑", interpretation: "누가 올까: 한마디로 전 애인. 데이트할 사람은 옛 친구, 전 애인, 어린 시절 친구, 또는 이런 조건에 해당하지 않으면 나이 차이가 많은 사람일 수 있습니다 - 그들이 훨씬 나이가 많거나 당신이 그들보다 훨씬 나이가 많습니다. 분위기: 사랑은 로맨틱하게 느껴지고, 집에서 데이트, 넷플릭스 앤 칠. 화났던 커플은 화해하고, 달콤함이 전보다 더 돌아올 것입니다. 이것은 추억, 순진함, 어린 시절처럼 순수한 사랑, 단순하고 복잡하지 않은 관계의 카드입니다." },
        "zh-CN": { quote: "回来的前任，或像童年一样纯粹的爱", interpretation: "谁会来：一句话就是前任。你会约会的人是旧情人、前任、童年朋友，或者如果不符合这些条件，可能是和你年龄差很大的人——他们比你大很多或你比他们大很多。氛围：爱情感觉浪漫，在家约会，看Netflix。吵架的情侣会和好，甜蜜会比以前更多地回来。这是记忆、天真、像童年一样纯粹的爱、简单不复杂的关系的牌。" },
        "zh-TW": { quote: "回來的前任，或像童年一樣純粹的愛", interpretation: "誰會來：一句話就是前任。你會約會的人是舊情人、前任、童年朋友，或者如果不符合這些條件，可能是和你年齡差很大的人——他們比你大很多或你比他們大很多。氛圍：愛情感覺浪漫，在家約會，看Netflix。吵架的情侶會和好，甜蜜會比以前更多地回來。這是記憶、天真、像童年一樣純粹的愛、簡單不複雜的關係的牌。" }
    },
    "SEVEN OF CUPS": {
        en: { quote: "Lost in fantasy, not going out to meet people in the real world", interpretation: "You won't meet anyone new because: It's not that you won't meet anyone, but the person you meet is 'Mr. Gu', the eldest son of a wealthy family who's still unmarried even though he's past 30. He's searching for a woman he met 7 years ago, rumored to be carrying his twins. And you: You wake up in the body of that woman and discover the truth - you've been hiding yourself and your two children because of Mr. Gu's ex-fiancée who used your family as leverage. Of course: All of this is a novel you read last night and somehow entered that dimension. You're living in that world, not going out to meet people in the real world. For those who didn't meet Mr. Gu: You might meet General Song, Mr. Chao, Mr. Thee, hiding in some series on iQIYI, Netflix, Disney+, etc. This is a card of confusion, too many choices, imagination more than reality, not knowing what's real and what's just a dream." },
        ja: { quote: "ファンタジーに迷い、現実世界で人に会いに行かない", interpretation: "新しい人に会わないでしょう。なぜなら：誰にも会わないわけではないが、会う人は「顧さん」、30歳を過ぎてもまだ未婚の裕福な家の長男。7年前に出会った女性を探していて、双子を妊娠しているという噂。そしてあなた：その女性の体で目覚め、真実を発見します - 顧さんの元婚約者があなたの家族を交渉材料にしたため、あなたと二人の子供を隠していた。もちろん：これは昨夜読んだ小説で、どういうわけかその次元に入った。現実世界で人に会いに行かず、その世界に住んでいます。顧さんに会わなかった人へ：iQIYI、Netflix、Disney+などのシリーズに隠れているソン将軍、チャオさん、ティーさんに会うかもしれません。これは混乱、選択肢が多すぎる、現実より想像、何が本物で何が夢かわからないカードです。" },
        ko: { quote: "환상에 빠져 현실 세계에서 사람을 만나지 않음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 아무도 만나지 않는 게 아니라, 만나는 사람이 '구 씨', 30이 넘어도 아직 미혼인 부유한 집안의 장남입니다. 7년 전에 만난 여자를 찾고 있고, 쌍둥이를 임신했다는 소문이 있습니다. 그리고 당신: 그 여자의 몸에서 깨어나 진실을 발견합니다 - 구 씨의 전 약혼자가 당신의 가족을 협상 카드로 써서 당신과 두 아이를 숨기고 있었습니다. 물론: 이것은 어젯밤 읽은 소설이고 어쩐지 그 차원에 들어갔습니다. 현실 세계에서 사람을 만나지 않고 그 세계에 살고 있습니다. 구 씨를 만나지 않은 사람들에게: iQIYI, Netflix, Disney+ 등의 시리즈에 숨어있는 송 장군, 차오 씨, 티 씨를 만날 수 있습니다. 이것은 혼란, 너무 많은 선택, 현실보다 상상, 무엇이 진짜이고 무엇이 꿈인지 모르는 카드입니다." },
        "zh-CN": { quote: "沉迷幻想，不去现实世界遇见人", interpretation: "你不会遇到新人因为：不是你不会遇到任何人，但你遇到的人是'顾先生'，一个虽然过了30岁但仍未婚的富家长子。他在寻找7年前遇到的一个女人，据说怀了他的双胞胎。而你：你在那个女人的身体里醒来，发现真相——你一直隐藏自己和两个孩子，因为顾先生的前未婚妻用你的家人作为筹码。当然：这都是你昨晚读的小说，不知怎么穿越进去了。你住在那个世界里，不出来在现实世界遇见人。对于没有遇到顾先生的人：你可能会遇到宋将军、曹先生、提先生，藏在iQIYI、Netflix、Disney+等的某个剧里。这是困惑、选择太多、想象多于现实、不知道什么是真什么是梦的牌。" },
        "zh-TW": { quote: "沉迷幻想，不去現實世界遇見人", interpretation: "你不會遇到新人因為：不是你不會遇到任何人，但你遇到的人是'顧先生'，一個雖然過了30歲但仍未婚的富家長子。他在尋找7年前遇到的一個女人，據說懷了他的雙胞胎。而你：你在那個女人的身體裡醒來，發現真相——你一直隱藏自己和兩個孩子，因為顧先生的前未婚妻用你的家人作為籌碼。當然：這都是你昨晚讀的小說，不知怎麼穿越進去了。你住在那個世界裡，不出來在現實世界遇見人。對於沒有遇到顧先生的人：你可能會遇到宋將軍、曹先生、提先生，藏在iQIYI、Netflix、Disney+等的某個劇裡。這是困惑、選擇太多、想象多於現實、不知道什麼是真什麼是夢的牌。" }
    },
    "EIGHT OF CUPS": {
        en: { quote: "A time of letting go and starting a new path", interpretation: "You won't meet anyone new because: You might not meet anyone because you just got out of a relationship. This is the right time to go to the sea, soak in a salt bath to cleanse negative energy and bad luck from your ex. In February: Besides Valentine's, it's a time more suitable for finishing old books and starting new paths. For some, if you do meet someone, it might be a temporary relationship during travel - when the trip ends, the relationship ends too. Advice: Take a cleansing bath with bitter orange peel to remove negative energy, and release old vows at Suthat Temple. This is a card of walking away, letting go, searching for deeper meaning, not satisfied with what you have." },
        ja: { quote: "手放して新しい道を始める時", interpretation: "新しい人に会わないでしょう。なぜなら：関係から出たばかりなので誰にも会わないかもしれません。海に行って、塩風呂に浸かって元カレ・元カノからのネガティブなエネルギーと不運を浄化するのに適した時期です。2月：バレンタインの他に、古い本を終わらせて新しい道を始めるのにより適した時期です。一部の人は、誰かに会っても、旅行中の一時的な関係かもしれません - 旅行が終わると関係も終わります。アドバイス：苦いオレンジの皮でクレンジングバスをしてネガティブなエネルギーを取り除き、スタット寺院で古い誓いを解きましょう。これは立ち去る、手放す、より深い意味を探す、持っているものに満足しないカードです。" },
        ko: { quote: "놓아주고 새로운 길을 시작하는 시간", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 관계에서 막 벗어났기 때문에 아무도 만나지 못할 수 있습니다. 바다에 가서 소금 목욕에 몸을 담가 전 애인으로부터의 부정적인 에너지와 불운을 정화하기에 적합한 시기입니다. 2월에: 발렌타인 외에도 오래된 책을 끝내고 새로운 길을 시작하기에 더 적합한 시기입니다. 일부는 누군가를 만나도 여행 중 일시적인 관계일 수 있습니다 - 여행이 끝나면 관계도 끝납니다. 조언: 쓴 오렌지 껍질로 정화 목욕을 하여 부정적인 에너지를 제거하고, 수탓 사원에서 오래된 서약을 풀으세요. 이것은 떠나는, 놓아주는, 더 깊은 의미를 찾는, 가진 것에 만족하지 않는 카드입니다." },
        "zh-CN": { quote: "放手并开始新道路的时期", interpretation: "你不会遇到新人因为：你可能不会遇到任何人因为你刚从关系中走出来。这是去海边、泡盐浴来净化前任带来的负能量和霉运的好时机。在二月：除了情人节，更适合结束旧书和开始新道路。对于一些人，如果你确实遇到某人，可能是旅行中的临时关系——旅行结束关系也结束。建议：用苦橙皮洗澡净化负能量，去苏塔寺解除旧誓愿。这是走开、放手、寻找更深意义、对拥有的不满足的牌。" },
        "zh-TW": { quote: "放手並開始新道路的時期", interpretation: "你不會遇到新人因為：你可能不會遇到任何人因為你剛從關係中走出來。這是去海邊、泡鹽浴來淨化前任帶來的負能量和霉運的好時機。在二月：除了情人節，更適合結束舊書和開始新道路。對於一些人，如果你確實遇到某人，可能是旅行中的臨時關係——旅行結束關係也結束。建議：用苦橙皮洗澡淨化負能量，去蘇塔寺解除舊誓願。這是走開、放手、尋找更深意義、對擁有的不滿足的牌。" }
    },
    "NINE OF CUPS": {
        en: { quote: "Meet a dating expert with good financial status", interpretation: "Who will come: You'll meet someone who seems particularly skilled at dating. A chubby man or someone wealthy. Likely that this man was born under Pisces or has Pisces rising. Location: He might take you to a delicious restaurant he's taken others to before. Just kidding. But maybe not. For men: There's a tendency you'll have a date. What you need to worry about a bit is which person to date. Or maybe pretend to be sick, because whoever you go with, they might post it on social media and cause trouble - worse than a train crash is when the trains know each other." },
        ja: { quote: "経済的に余裕のあるデートの達人に会う", interpretation: "誰が来るか：特にデートが上手そうな人に会うでしょう。ぽっちゃりした男性か裕福な人。この男性は魚座生まれか魚座上昇の可能性が高いです。場所：彼は他の人を連れて行ったことのある美味しいレストランに連れて行くかもしれません。冗談です。でもそうかもしれません。男性向け：デートがある傾向があります。少し心配なのは誰とデートするかです。または仮病を使うかもしれません、誰と行っても彼らがソーシャルメディアに投稿して問題を起こすかもしれないから - 電車の衝突より悪いのは電車同士が知り合いの時です。" },
        ko: { quote: "경제적으로 여유 있는 데이트 전문가를 만남", interpretation: "누가 올까: 특히 데이트를 잘하는 것 같은 사람을 만날 것입니다. 통통한 남자이거나 부유한 사람입니다. 이 남자는 물고기자리 태생이거나 물고기자리 상승일 가능성이 높습니다. 장소: 그는 다른 사람을 데려갔던 맛있는 레스토랑에 데려갈 수 있습니다. 농담입니다. 하지만 아닐 수도 있습니다. 남성분에게: 데이트할 경향이 있습니다. 조금 걱정해야 할 것은 누구와 데이트할지입니다. 또는 아픈 척할 수도 있습니다, 누구와 가든 그들이 소셜 미디어에 올려서 문제가 될 수 있으니까 - 기차 충돌보다 나쁜 것은 기차들이 서로 아는 것입니다." },
        "zh-CN": { quote: "遇到经济状况好的约会专家", interpretation: "谁会来：你会遇到看起来特别擅长约会的人。一个微胖的男人或有钱人。这个男人很可能是双鱼座或双鱼座上升。地点：他可能带你去他带过别人的好吃餐厅。开玩笑的。但也许不是。对于男性：有约会的倾向。需要稍微担心的是和谁约会。或者干脆装病，因为和谁去他们都可能发到社交媒体上惹麻烦——比火车相撞更糟糕的是火车们互相认识。" },
        "zh-TW": { quote: "遇到經濟狀況好的約會專家", interpretation: "誰會來：你會遇到看起來特別擅長約會的人。一個微胖的男人或有錢人。這個男人很可能是雙魚座或雙魚座上升。地點：他可能帶你去他帶過別人的好吃餐廳。開玩笑的。但也許不是。對於男性：有約會的傾向。需要稍微擔心的是和誰約會。或者乾脆裝病，因為和誰去他們都可能發到社交媒體上惹麻煩——比火車相撞更糟糕的是火車們互相認識。" }
    },
    "TEN OF CUPS": {
        en: { quote: "Complete happiness, but beware of someone with a family", interpretation: "Who will come: If you meet someone, you'll meet them at events, group gatherings, university activities, school reunions. For some, it might be someone from company events. Mostly you'll already know their face. For some: You'll 'date' with your own family. Relationships will become closer, opportunity to get to know each other's families. Warning: Single women who just have someone starting to talk to them should be careful - this card can represent someone who already has a family. If someone approaches you during this time, check their background a bit. This is a card of complete happiness, warm family, lasting relationships." },
        ja: { quote: "完全な幸せ、でも家族持ちの人に注意", interpretation: "誰が来るか：誰かに会うなら、イベント、グループの集まり、大学の活動、同窓会で会うでしょう。一部の人は、会社のイベントの誰かかもしれません。ほとんどの場合、すでに顔を知っているでしょう。一部の人へ：自分の家族と「デート」します。関係がより親密になり、お互いの家族を知る機会があります。注意：最近話し始めた人がいる独身女性は気をつけて - このカードは既に家族がいる人を表すことがあります。この時期に誰かが近づいてきたら、彼らの背景を少しチェックしてください。これは完全な幸せ、暖かい家族、永続的な関係のカードです。" },
        ko: { quote: "완전한 행복, 하지만 가족이 있는 사람 조심", interpretation: "누가 올까: 누군가를 만난다면, 이벤트, 그룹 모임, 대학 활동, 동창회에서 만날 것입니다. 일부는 회사 이벤트의 누군가일 수 있습니다. 대부분 이미 얼굴을 알고 있을 것입니다. 일부에게는: 자신의 가족과 '데이트'합니다. 관계가 더 가까워지고, 서로의 가족을 알게 될 기회가 있습니다. 주의: 최근에 대화하기 시작한 사람이 있는 싱글 여성은 조심하세요 - 이 카드는 이미 가족이 있는 사람을 나타낼 수 있습니다. 이 시기에 누군가 접근하면 그들의 배경을 조금 확인하세요. 이것은 완전한 행복, 따뜻한 가족, 지속되는 관계의 카드입니다." },
        "zh-CN": { quote: "完整的幸福，但小心有家庭的人", interpretation: "谁会来：如果你遇到某人，你会在活动、团体聚会、大学活动、同学聚会上遇到他们。对于一些人，可能是公司活动的人。大多数情况你已经认识他们的脸了。对于一些人：你会和自己的家人'约会'。关系会变得更亲密，有机会认识彼此的家人。警告：刚有人开始聊的单身女性要小心——这张牌可以代表已经有家庭的人。如果这段时间有人接近你，稍微查查他们的背景。这是完整幸福、温暖家庭、持久关系的牌。" },
        "zh-TW": { quote: "完整的幸福，但小心有家庭的人", interpretation: "誰會來：如果你遇到某人，你會在活動、團體聚會、大學活動、同學聚會上遇到他們。對於一些人，可能是公司活動的人。大多數情況你已經認識他們的臉了。對於一些人：你會和自己的家人'約會'。關係會變得更親密，有機會認識彼此的家人。警告：剛有人開始聊的單身女性要小心——這張牌可以代表已經有家庭的人。如果這段時間有人接近你，稍微查查他們的背景。這是完整幸福、溫暖家庭、持久關係的牌。" }
    },
    "ACE OF SWORDS": {
        en: { quote: "Time to cut ties with old love, not start with someone new", interpretation: "You won't meet anyone new because: Opportunities to meet someone during this period are still few. But chances of arguing with people online are quite high. This is a time to decisively cut ties with an old love rather than start something new with anyone. However, if someone does come along: There's a possibility they could be a government official, soldier, or police officer. This is a card of clarity, decisions, and truths emerging. Sometimes the truth hurts, but it needs to be known." },
        ja: { quote: "古い愛と縁を切る時、新しい人と始める時ではない", interpretation: "新しい人に会わないでしょう。なぜなら：この期間中に誰かに会う機会はまだ少ないです。しかし、オンラインで人と議論する機会はかなり高いです。これは新しい人と何かを始めるというよりも、古い愛と決別する時期です。しかし、もし誰かが現れるなら：公務員、軍人、警察官の可能性があります。これは明確さ、決断、そして真実が明らかになるカードです。時に真実は痛いですが、知る必要があります。" },
        ko: { quote: "옛 사랑과 인연을 끊을 때, 새로운 사람과 시작할 때가 아님", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 이 기간 동안 누군가를 만날 기회가 아직 적습니다. 하지만 온라인에서 사람들과 논쟁할 확률은 꽤 높습니다. 이것은 새로운 사람과 무언가를 시작하기보다 옛 사랑과 단호히 인연을 끊을 때입니다. 하지만 누군가 나타난다면: 공무원, 군인, 경찰일 가능성이 있습니다. 이것은 명확성, 결단, 진실이 드러나는 카드입니다. 때때로 진실은 아프지만 알아야 합니다." },
        "zh-CN": { quote: "与旧爱断绝的时候，不是与新人开始的时候", interpretation: "你不会遇到新人因为：这段时间遇到人的机会还不多。但在网上与人争论的机会相当高。这是果断与旧爱断绝的时候，而不是与新人开始什么。但如果有人出现：可能是公务员、军人或警察。这是关于清晰、决断和真相浮现的牌。有时真相很痛，但需要知道。" },
        "zh-TW": { quote: "與舊愛斷絕的時候，不是與新人開始的時候", interpretation: "你不會遇到新人因為：這段時間遇到人的機會還不多。但在網上與人爭論的機會相當高。這是果斷與舊愛斷絕的時候，而不是與新人開始什麼。但如果有人出現：可能是公務員、軍人或警察。這是關於清晰、決斷和真相浮現的牌。有時真相很痛，但需要知道。" }
    },
    "TWO OF SWORDS": {
        en: { quote: "Exhausted, not wanting to go out and meet anyone", interpretation: "You won't meet anyone new because: This is a period when you're lying at home, exhausted, not wanting to go out and meet anyone. For some, the person you like and want to date has gone silent or blocked you. You're alone watching dramas in a paranoid state. If there's something special: It might mean you're going to the dentist, or someone approaching you is a dentist. If you secretly have a crush on your dentist, try messaging them. This is a card of closing your eyes, covering your ears, not wanting to face reality, unable to decide, in a state of standstill." },
        ja: { quote: "疲れ果てて、外出して誰かに会いたくない", interpretation: "新しい人に会わないでしょう。なぜなら：これは家で横になっていて、疲れ果てて、誰にも会いたくない時期です。一部の人は、好きでデートしたい人が沈黙したかブロックしたかもしれません。一人で猜疑心に満ちた状態でドラマを見ています。特別なことがあるなら：歯医者に行くか、近づいてくる人が歯医者かもしれません。歯医者に密かに恋しているなら、メッセージを送ってみてください。これは目を閉じ、耳を塞ぎ、現実に向き合いたくない、決められない、停滞状態のカードです。" },
        ko: { quote: "지쳐서 나가서 누구도 만나고 싶지 않음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 집에 누워서 지쳐서 아무도 만나고 싶지 않은 시기입니다. 일부는 좋아하고 데이트하고 싶은 사람이 연락이 끊기거나 차단했을 수 있습니다. 혼자서 편집증적인 상태로 드라마를 보고 있습니다. 특별한 것이 있다면: 치과에 가거나, 접근하는 사람이 치과의사일 수 있습니다. 치과의사에게 몰래 반했다면 메시지를 보내보세요. 이것은 눈을 감고, 귀를 막고, 현실을 직면하고 싶지 않고, 결정을 내릴 수 없는, 정지 상태의 카드입니다." },
        "zh-CN": { quote: "筋疲力尽，不想出门见任何人", interpretation: "你不会遇到新人因为：这是你躺在家里、筋疲力尽、不想出门见任何人的时期。对于一些人，你喜欢并想约会的人已经沉默或拉黑你了。你独自一人在偏执的状态下看剧。如果有特别的事：可能意味着你要去看牙医，或者接近你的人是牙医。如果你暗恋牙医，试着发消息给他们。这是闭上眼睛、捂住耳朵、不想面对现实、无法决定、停滞状态的牌。" },
        "zh-TW": { quote: "筋疲力盡，不想出門見任何人", interpretation: "你不會遇到新人因為：這是你躺在家裡、筋疲力盡、不想出門見任何人的時期。對於一些人，你喜歡並想約會的人已經沉默或拉黑你了。你獨自一人在偏執的狀態下看劇。如果有特別的事：可能意味著你要去看牙醫，或者接近你的人是牙醫。如果你暗戀牙醫，試著發消息給他們。這是閉上眼睛、捂住耳朵、不想面對現實、無法決定、停滯狀態的牌。" }
    },
    "THREE OF SWORDS": {
        en: { quote: "May see an ex with someone new", interpretation: "You won't meet anyone new because: This is a period where you need to beware of seeing couples together - it will stab at your heart. Or you might see your ex, the person you adored, going public in a big way with someone new. For some: If we want to give a comforting and hopeful interpretation, it might mean someone approaching you just went through heartbreak and you're there to comfort them. This is a card of pain, heartbreak, disappointment, truths you don't want to know - three swords piercing through the heart." },
        ja: { quote: "元カレ・元カノが誰かと一緒にいるのを見るかも", interpretation: "新しい人に会わないでしょう。なぜなら：これはカップルを見ることに注意が必要な時期です - 心を突き刺します。または、崇拝していた元カレ・元カノが誰か新しい人と大々的に公になるのを見るかもしれません。一部の人へ：慰めと希望を込めた解釈をするなら、近づいてくる人がちょうど失恋を経験したばかりで、あなたがそばで慰めているという意味かもしれません。これは痛み、失恋、失望、知りたくない真実のカードです - 3本の剣が心臓を貫いています。" },
        ko: { quote: "전 애인이 새 사람과 있는 것을 볼 수 있음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 커플을 보는 것을 조심해야 하는 시기입니다 - 마음을 찌릅니다. 또는 당신이 좋아했던 전 애인이 새로운 사람과 대대적으로 공개하는 것을 볼 수 있습니다. 일부에게: 위로와 희망을 주는 해석을 하자면, 접근하는 사람이 막 실연을 당해서 당신이 위로해주고 있다는 의미일 수 있습니다. 이것은 고통, 실연, 실망, 알고 싶지 않은 진실의 카드입니다 - 세 개의 검이 심장을 관통합니다." },
        "zh-CN": { quote: "可能看到前任和新人在一起", interpretation: "你不会遇到新人因为：这是需要小心看到情侣在一起的时期——会刺痛你的心。或者你可能会看到你崇拜的前任和新人大张旗鼓地公开。对于一些人：如果要给出安慰和希望的解释，可能意味着接近你的人刚经历心碎，你在那里安慰他们。这是关于痛苦、心碎、失望、不想知道的真相的牌——三把剑刺穿心脏。" },
        "zh-TW": { quote: "可能看到前任和新人在一起", interpretation: "你不會遇到新人因為：這是需要小心看到情侶在一起的時期——會刺痛你的心。或者你可能會看到你崇拜的前任和新人大張旗鼓地公開。對於一些人：如果要給出安慰和希望的解釋，可能意味著接近你的人剛經歷心碎，你在那裡安慰他們。這是關於痛苦、心碎、失望、不想知道的真相的牌——三把劍刺穿心臟。" }
    },
    "FOUR OF SWORDS": {
        en: { quote: "Time to rest and take care of your health", interpretation: "You won't meet anyone new because: The person you might meet isn't a date but might be a doctor. Take care of your health during this time. If you don't have insurance, try getting some in case you get sick again this year. Wait, or is this: A strategy because you want a doctor as a partner? But even if they're good-looking, they might be a vet. The only way you'd get treated by them is if your best friend goes back to their ex. For relationships: Stay away from old flames or former lovers during this time. Give yourself some time and then move on to the next person. This is a card of rest, temporary pause, needing time to recover, exhaustion, needing peace." },
        ja: { quote: "休息して健康に気をつける時", interpretation: "新しい人に会わないでしょう。なぜなら：会うかもしれない人はデート相手ではなく医者かもしれません。この時期は健康に気をつけてください。保険がないなら、今年また病気になるかもしれないので取得を試みてください。えっ、それとも：医者をパートナーにしたいからの戦略？でも見た目が良くても獣医かもしれません。その人に診てもらえる唯一の方法は、親友が元カレに戻ること。関係について：この時期は昔の恋人や元カレ・元カノから離れてください。自分に時間を与えてから次の人に進みましょう。これは休息、一時停止、回復に時間が必要、疲労、平和が必要なカードです。" },
        ko: { quote: "휴식하고 건강을 돌볼 시간", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 만날 수 있는 사람은 데이트 상대가 아니라 의사일 수 있습니다. 이 시기에는 건강을 돌보세요. 보험이 없다면 올해 또 아플 경우를 대비해 가입해 보세요. 잠깐, 아니면: 의사를 파트너로 원해서 전략인가요? 하지만 잘생겼어도 수의사일 수 있습니다. 그 사람에게 치료받을 수 있는 유일한 방법은 친한 친구가 전 애인에게 돌아가는 것입니다. 관계에 대해: 이 시기에는 옛 연인이나 전 애인으로부터 떨어져 있으세요. 스스로에게 시간을 준 다음 다음 사람에게 나아가세요. 이것은 휴식, 일시 정지, 회복 시간 필요, 피로, 평화 필요의 카드입니다." },
        "zh-CN": { quote: "休息和照顾健康的时候", interpretation: "你不会遇到新人因为：你可能遇到的人不是约会对象而是医生。这段时间照顾好健康。如果没有保险，试着买一个以防今年再生病。等等，还是说：这是想找医生当伴侣的策略？但即使他们长得好看，可能是兽医。你能让他们给你治病的唯一方法是你最好的朋友回到前任身边。关于感情：这段时间远离旧情人或前任。给自己一些时间然后走向下一个人。这是休息、暂停、需要恢复时间、疲惫、需要平静的牌。" },
        "zh-TW": { quote: "休息和照顧健康的時候", interpretation: "你不會遇到新人因為：你可能遇到的人不是約會對象而是醫生。這段時間照顧好健康。如果沒有保險，試著買一個以防今年再生病。等等，還是說：這是想找醫生當伴侶的策略？但即使他們長得好看，可能是獸醫。你能讓他們給你治病的唯一方法是你最好的朋友回到前任身邊。關於感情：這段時間遠離舊情人或前任。給自己一些時間然後走向下一個人。這是休息、暫停、需要恢復時間、疲憊、需要平靜的牌。" }
    },
    "FIVE OF SWORDS": {
        en: { quote: "May meet someone who just broke up", interpretation: "In the nice version: This is a period where you might get your date cancelled because the other person is meeting their ex or someone they like more. But if they're not that cruel, it might mean something else came up suddenly making them have to rush home or deal with those problems. In the mean version: The person you secretly like or have been talking to is likely to break up with their partner and choose you. You have a chance to date - they left the other person to choose you. For completely single people: Without anyone to talk to, you might meet someone who just broke up with their lover, possibly having broken up with multiple people last year. Whether you'll be their love or their 'next mistake' - let's wait and see. This is a card of conflict, winning and losing, one person gains while another loses, using dishonest strategies." },
        ja: { quote: "別れたばかりの人に会うかも", interpretation: "いい解釈では：これは相手が元カレ・元カノや彼らがもっと好きな人に会うためにデートがキャンセルされるかもしれない時期です。でも彼らがそこまで残酷でないなら、何か急に起こって家に帰るかそれらの問題に対処しなければならなくなったのかもしれません。意地悪な解釈では：密かに好きな人や話していた人がパートナーと別れてあなたを選ぶ可能性が高いです。デートのチャンスがあります - 彼らは相手を離れてあなたを選びました。完全に独身の人へ：話す相手がいない場合、恋人と別れたばかりの人に会うかもしれません、おそらく去年複数の人と別れています。あなたが彼らの愛になるか「次の失敗」になるか - 待って見ましょう。これは対立、勝ち負け、一人が得て他が失う、不正な戦略を使うカードです。" },
        ko: { quote: "막 헤어진 사람을 만날 수 있음", interpretation: "좋은 버전에서: 상대방이 전 애인이나 더 좋아하는 사람을 만나러 가서 데이트가 취소될 수 있는 시기입니다. 하지만 그들이 그렇게 잔인하지 않다면, 갑자기 다른 일이 생겨서 급히 집에 가거나 그 문제들을 처리해야 했을 수 있습니다. 나쁜 버전에서: 몰래 좋아하거나 얘기하던 사람이 파트너와 헤어지고 당신을 선택할 가능성이 높습니다. 데이트 기회가 있습니다 - 그들은 상대를 떠나 당신을 선택했습니다. 완전히 싱글인 사람들에게: 대화할 사람이 없다면, 방금 연인과 헤어진 사람을 만날 수 있습니다, 아마 작년에 여러 사람과 헤어졌을 것입니다. 당신이 그들의 사랑이 될지 '다음 실수'가 될지 - 기다려 봅시다. 이것은 갈등, 승패, 한 사람이 얻고 다른 사람이 잃는, 정직하지 않은 전략을 사용하는 카드입니다." },
        "zh-CN": { quote: "可能遇到刚分手的人", interpretation: "好的版本：这是对方可能因为去见前任或更喜欢的人而取消约会的时期。但如果他们没那么残忍，可能是突然发生了什么事让他们必须赶回家或处理那些问题。坏的版本：你暗恋或一直聊天的人可能会和伴侣分手并选择你。你有约会的机会——他们离开对方选择了你。对于完全单身的人：没有人聊天的话，你可能会遇到刚和恋人分手的人，可能去年和多人分手了。你会成为他们的爱还是他们的'下一个错误'——让我们拭目以待。这是关于冲突、输赢、一人得一人失、使用不诚实策略的牌。" },
        "zh-TW": { quote: "可能遇到剛分手的人", interpretation: "好的版本：這是對方可能因為去見前任或更喜歡的人而取消約會的時期。但如果他們沒那麼殘忍，可能是突然發生了什麼事讓他們必須趕回家或處理那些問題。壞的版本：你暗戀或一直聊天的人可能會和伴侶分手並選擇你。你有約會的機會——他們離開對方選擇了你。對於完全單身的人：沒有人聊天的話，你可能會遇到剛和戀人分手的人，可能去年和多人分手了。你會成為他們的愛還是他們的'下一個錯誤'——讓我們拭目以待。這是關於衝突、輸贏、一人得一人失、使用不誠實策略的牌。" }
    },
    "SIX OF SWORDS": {
        en: { quote: "May date at the beach or meet someone from far away", interpretation: "If you have a chance to date someone: That person might be from a distant country or place, somewhere with island geography. If you already have a partner, you might go on a date at the beach, a waterfront location, or on a Chao Phraya river cruise. For completely single people: The person you secretly like, who you've been chatting with a little, might smoothly avoid answering about Valentine's Day dates. Watch out - the relationship might not progress. Stay as you are. Better find someone new. This is a card of travel, movement, from one place to somewhere new, leaving problems behind, heading toward a better place." },
        ja: { quote: "ビーチでデートか遠くの人に会うかも", interpretation: "もし誰かとデートする機会があるなら：その人は遠い国や場所、島の地形がある場所の出身かもしれません。すでにパートナーがいるなら、ビーチ、水辺、チャオプラヤー川クルーズでデートするかもしれません。完全に独身の人へ：密かに好きで少しチャットしている人は、バレンタインのデートについてスムーズに避けるかもしれません。気をつけて - 関係が進展しないかもしれません。そのままでいて。新しい人を見つけた方がいいです。これは旅行、移動、ある場所から新しい場所へ、問題を後にして、より良い場所に向かうカードです。" },
        ko: { quote: "해변에서 데이트하거나 먼 곳의 사람을 만날 수 있음", interpretation: "누군가와 데이트할 기회가 있다면: 그 사람은 먼 나라나 장소, 섬 지형이 있는 곳 출신일 수 있습니다. 이미 파트너가 있다면 해변, 물가 장소, 또는 차오프라야 강 크루즈에서 데이트할 수 있습니다. 완전히 싱글인 사람들에게: 몰래 좋아하고 조금 채팅하던 사람이 발렌타인 데이트에 대해 능숙하게 피할 수 있습니다. 조심하세요 - 관계가 진전되지 않을 수 있습니다. 그대로 있으세요. 새로운 사람을 찾는 게 나을 것입니다. 이것은 여행, 이동, 한 곳에서 새로운 곳으로, 문제를 뒤로하고 더 나은 곳으로 향하는 카드입니다." },
        "zh-CN": { quote: "可能在海边约会或遇到远方的人", interpretation: "如果有机会和某人约会：那个人可能来自遥远的国家或地方，某个有岛屿地形的地方。如果已经有伴侣，你可能会在海边、水边或湄南河游船上约会。对于完全单身的人：你暗恋并聊了一点的人可能会巧妙地避开回答情人节约会的事。小心——关系可能不会进展。保持现状。找新人比较好。这是关于旅行、移动、从一个地方到新地方、把问题留在身后、走向更好地方的牌。" },
        "zh-TW": { quote: "可能在海邊約會或遇到遠方的人", interpretation: "如果有機會和某人約會：那個人可能來自遙遠的國家或地方，某個有島嶼地形的地方。如果已經有伴侶，你可能會在海邊、水邊或湄南河遊船上約會。對於完全單身的人：你暗戀並聊了一點的人可能會巧妙地避開回答情人節約會的事。小心——關係可能不會進展。保持現狀。找新人比較好。這是關於旅行、移動、從一個地方到新地方、把問題留在身後、走向更好地方的牌。" }
    },
    "SEVEN OF SWORDS": {
        en: { quote: "Beware of players who juggle multiple people", interpretation: "Beware of meeting players: Expert at juggling multiple people. In the morning they celebrate with one person, in the afternoon another, and you might be the evening shift. If it's not the other person who's a player, then it's you who's the player, switching tracks like a train without stopping. This is a card of deception, dishonesty, sneaking around, doing something behind the scenes, being cunning." },
        ja: { quote: "複数の人を同時に扱うプレイヤーに注意", interpretation: "プレイヤーに会うことに注意：複数の人をジャグリングするのが得意。朝は一人と祝い、午後は別の人、夜はあなたの番かもしれません。相手がプレイヤーでないなら、あなた自身がプレイヤーで、止まることなく電車のように路線を切り替えています。これは欺瞞、不誠実、こそこそ、裏で何かをする、狡猾なカードです。" },
        ko: { quote: "여러 사람을 동시에 만나는 바람둥이 조심", interpretation: "바람둥이를 만나는 것을 조심하세요: 여러 사람을 저글링하는 데 전문가입니다. 아침에는 한 사람과 축하하고, 오후에는 다른 사람, 저녁에는 당신 차례일 수 있습니다. 상대방이 바람둥이가 아니라면, 멈추지 않고 기차처럼 선로를 바꾸는 바람둥이는 당신입니다. 이것은 속임, 정직하지 않음, 몰래 다니기, 뒤에서 무언가 하기, 교활함의 카드입니다." },
        "zh-CN": { quote: "小心同时和多人约会的花心人", interpretation: "小心遇到花心人：擅长同时周旋多人。早上和一个人庆祝，下午另一个人，晚上可能轮到你。如果对方不是花心人，那花心人就是你自己，像火车一样不停地换轨道。这是关于欺骗、不诚实、偷偷摸摸、背地里做事、狡猾的牌。" },
        "zh-TW": { quote: "小心同時和多人約會的花心人", interpretation: "小心遇到花心人：擅長同時周旋多人。早上和一個人慶祝，下午另一個人，晚上可能輪到你。如果對方不是花心人，那花心人就是你自己，像火車一樣不停地換軌道。這是關於欺騙、不誠實、偷偷摸摸、背地裡做事、狡猾的牌。" }
    },
    "EIGHT OF SWORDS": {
        en: { quote: "Stuck in the past, can't move on", interpretation: "You won't meet anyone new because: You might be seeing a doctor. This is a time of poor health. Instead of sitting on a date with someone you like under the moonlight. If you're still healthy: You might still be thinking about your ex, still dreaming and imagining doing the activities you talked about when the relationship was good. But this won't happen anymore. Move on already. This is a card of being trapped, unable to move, feeling stuck, unable to see a way out." },
        ja: { quote: "過去に囚われて、前に進めない", interpretation: "新しい人に会わないでしょう。なぜなら：医者に会うかもしれません。これは健康が良くない時期です。月明かりの下で好きな人とデートする代わりに。まだ健康なら：まだ元カレ・元カノのことを考えていて、関係が良かった時に話した活動をすることをまだ夢見て想像しているかもしれません。でもこれはもう起こりません。もう前に進んでください。これは罠にはまっている、動けない、行き詰まっている、出口が見えないカードです。" },
        ko: { quote: "과거에 갇혀 앞으로 나아갈 수 없음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 의사를 만날 수 있습니다. 건강이 좋지 않은 시기입니다. 달빛 아래 좋아하는 사람과 데이트하는 대신. 아직 건강하다면: 아직 전 애인을 생각하고 있고, 관계가 좋았을 때 이야기했던 활동을 하는 것을 아직 꿈꾸고 상상하고 있을 수 있습니다. 하지만 이것은 더 이상 일어나지 않을 것입니다. 이제 앞으로 나아가세요. 이것은 갇혀있는, 움직일 수 없는, 막혀있는, 출구를 볼 수 없는 카드입니다." },
        "zh-CN": { quote: "困在过去，无法前进", interpretation: "你不会遇到新人因为：你可能要去看医生。这是健康不好的时期。不是在月光下和喜欢的人约会。如果你还健康：你可能还在想前任，还在梦想和想象做那些关系好时谈过的活动。但这不会再发生了。往前走吧。这是关于被困住、无法移动、感觉卡住、看不到出路的牌。" },
        "zh-TW": { quote: "困在過去，無法前進", interpretation: "你不會遇到新人因為：你可能要去看醫生。這是健康不好的時期。不是在月光下和喜歡的人約會。如果你還健康：你可能還在想前任，還在夢想和想象做那些關係好時談過的活動。但這不會再發生了。往前走吧。這是關於被困住、無法移動、感覺卡住、看不到出路的牌。" }
    },
    "NINE OF SWORDS": {
        en: { quote: "Resting period, the one you like may go with someone else", interpretation: "You won't meet anyone new because: This is a period where you might not go on any dates, focusing on rest. Just sleep first. Or if there's someone you're chatting with and like, they might go with someone else, not choosing you today. For some: Your lover might be far away, different timezones, so you have no time to talk or meet. This is a card of anxiety, insomnia, overthinking, nightmares, worrying about the future." },
        ja: { quote: "休息期間、好きな人が他の人と行くかも", interpretation: "新しい人に会わないでしょう。なぜなら：これはデートに行かないかもしれない時期で、休息に集中しています。まず寝てください。または、チャットしていて好きな人がいるなら、彼らは他の人と行くかもしれません、今日はあなたを選びません。一部の人へ：恋人が遠くにいるかもしれません、タイムゾーンが違うので、話したり会ったりする時間がありません。これは不安、不眠、考えすぎ、悪夢、将来を心配するカードです。" },
        ko: { quote: "휴식 기간, 좋아하는 사람이 다른 사람과 갈 수 있음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 데이트를 하지 않고 휴식에 집중하는 시기입니다. 일단 자세요. 또는 채팅하고 좋아하는 사람이 있다면, 그들은 다른 사람과 갈 수 있습니다, 오늘 당신을 선택하지 않습니다. 일부에게: 연인이 멀리 있을 수 있습니다, 시간대가 다르기 때문에 대화하거나 만날 시간이 없습니다. 이것은 불안, 불면, 과도한 생각, 악몽, 미래에 대한 걱정의 카드입니다." },
        "zh-CN": { quote: "休息期，你喜欢的人可能和别人去", interpretation: "你不会遇到新人因为：这是可能不会去约会的时期，专注于休息。先睡觉吧。或者如果有在聊天并喜欢的人，他们可能会和别人去，今天不选你。对于一些人：恋人可能在远方，时区不同，所以没有时间交谈或见面。这是关于焦虑、失眠、想太多、噩梦、担心未来的牌。" },
        "zh-TW": { quote: "休息期，你喜歡的人可能和別人去", interpretation: "你不會遇到新人因為：這是可能不會去約會的時期，專注於休息。先睡覺吧。或者如果有在聊天並喜歡的人，他們可能會和別人去，今天不選你。對於一些人：戀人可能在遠方，時區不同，所以沒有時間交談或見面。這是關於焦慮、失眠、想太多、噩夢、擔心未來的牌。" }
    },
    "TEN OF SWORDS": {
        en: { quote: "Just ended a relationship, can't move on yet", interpretation: "You won't meet anyone new because: You probably won't meet anyone during this time. You might have just ended a relationship with a lover or someone you were talking to. This time is still fresh and you can't move on. They were really cruel, dumping you near Valentine's Day. For those who might meet someone: Or managed to ask someone on a date, that person might have just broken up with their lover. Instead of a date, it becomes a mourning pavilion. This is a card of endings, rock bottom, maximum pain. But it also means it's over, ready to start anew." },
        ja: { quote: "関係が終わったばかり、まだ乗り越えられない", interpretation: "新しい人に会わないでしょう。なぜなら：この期間中に誰にも会わないでしょう。恋人や話していた人との関係が終わったばかりかもしれません。この時期はまだ新しく、前に進めません。彼らは本当に残酷でした、バレンタインの近くにあなたを振って。誰かに会うかもしれない人へ：または誰かをデートに誘えた場合、その人は恋人と別れたばかりかもしれません。デートの代わりに、悲しみの場になります。これは終わり、どん底、最大の痛みのカードです。しかしそれは終わったことも意味し、新しく始める準備ができています。" },
        ko: { quote: "관계가 막 끝났고 아직 극복할 수 없음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 이 기간 동안 아무도 만나지 못할 것입니다. 연인이나 대화하던 사람과의 관계가 막 끝났을 수 있습니다. 이 시간은 아직 생생하고 앞으로 나아갈 수 없습니다. 그들은 정말 잔인했습니다, 발렌타인 근처에 당신을 차버리다니. 누군가를 만날 수 있는 사람들에게: 또는 누군가에게 데이트를 신청했다면, 그 사람은 연인과 막 헤어졌을 수 있습니다. 데이트 대신 슬픔의 장소가 됩니다. 이것은 끝, 바닥, 최대의 고통의 카드입니다. 하지만 끝났다는 것도 의미하고, 새롭게 시작할 준비가 되었습니다." },
        "zh-CN": { quote: "刚结束一段关系，还无法走出来", interpretation: "你不会遇到新人因为：这段时间你可能不会遇到任何人。你可能刚和恋人或聊天对象结束关系。这段时间还太新鲜，无法往前走。他们真的很残忍，在情人节附近甩了你。对于可能遇到某人的人：或者成功约到某人约会，那个人可能刚和恋人分手。约会变成了悲伤的场所。这是关于结束、谷底、最大痛苦的牌。但也意味着结束了，准备重新开始。" },
        "zh-TW": { quote: "剛結束一段關係，還無法走出來", interpretation: "你不會遇到新人因為：這段時間你可能不會遇到任何人。你可能剛和戀人或聊天對象結束關係。這段時間還太新鮮，無法往前走。他們真的很殘忍，在情人節附近甩了你。對於可能遇到某人的人：或者成功約到某人約會，那個人可能剛和戀人分手。約會變成了悲傷的場所。這是關於結束、谷底、最大痛苦的牌。但也意味著結束了，準備重新開始。" }
    },
    "ACE OF PENTACLES": {
        en: { quote: "Beginning of a stable love", interpretation: "Who will come: The person entering your life will be someone financially stable, with a good job, or possibly someone preparing to start their own business. There's a tendency they'll take you on dates to nice restaurants or do things that require spending more money. This is the beginning of a stable relationship with opportunity to develop long-term. For those in relationships: Your lover might give you an expensive gift for Valentine's - could be a brand you've wanted for a long time, or something valuable showing commitment to the relationship. Married couples planning to buy a house or condo might get good news during this time." },
        ja: { quote: "安定した愛の始まり", interpretation: "誰が来るか：あなたの人生に入ってくる人は経済的に安定していて、良い仕事を持っているか、自分のビジネスを始める準備をしている人でしょう。彼らはあなたを素敵なレストランでのデートに連れて行ったり、もっとお金を使うことをする傾向があります。これは長期的に発展する可能性のある安定した関係の始まりです。カップルの方へ：恋人がバレンタインに高価なプレゼントをくれるかもしれません - 長い間欲しかったブランドや、関係へのコミットメントを示す価値のあるものかもしれません。家やコンドを買う計画をしている既婚カップルはこの時期に良いニュースを得るかもしれません。" },
        ko: { quote: "안정적인 사랑의 시작", interpretation: "누가 올까: 당신의 삶에 들어오는 사람은 경제적으로 안정되고, 좋은 직업을 가지고 있거나, 자신의 사업을 시작할 준비를 하는 사람일 것입니다. 그들은 좋은 레스토랑에서 데이트하거나 돈을 더 쓰는 일을 할 경향이 있습니다. 이것은 장기적으로 발전할 기회가 있는 안정적인 관계의 시작입니다. 연인이 있는 분들에게: 연인이 발렌타인에 비싼 선물을 줄 수 있습니다 - 오래 원했던 브랜드나 관계에 대한 헌신을 보여주는 가치 있는 것일 수 있습니다. 집이나 콘도를 살 계획인 기혼 커플은 이 시기에 좋은 소식을 들을 수 있습니다." },
        "zh-CN": { quote: "稳定爱情的开始", interpretation: "谁会来：进入你生活的人会是经济稳定、有好工作的人，或者可能是准备创业的人。他们倾向于带你去高档餐厅约会或做一些需要花更多钱的事情。这是稳定关系的开始，有长期发展的机会。对于有伴侣的人：恋人可能会在情人节送你昂贵的礼物——可能是你想要很久的品牌，或者表明对关系承诺的有价值的东西。计划买房或公寓的已婚夫妇可能会在这段时间收到好消息。" },
        "zh-TW": { quote: "穩定愛情的開始", interpretation: "誰會來：進入你生活的人會是經濟穩定、有好工作的人，或者可能是準備創業的人。他們傾向於帶你去高檔餐廳約會或做一些需要花更多錢的事情。這是穩定關係的開始，有長期發展的機會。對於有伴侶的人：戀人可能會在情人節送你昂貴的禮物——可能是你想要很久的品牌，或者表明對關係承諾的有價值的東西。計劃買房或公寓的已婚夫婦可能會在這段時間收到好消息。" }
    },
    "TWO OF PENTACLES": {
        en: { quote: "Juggling period, manage your time well", interpretation: "Who will come: This is a period where you'll need to juggle and keep up. You might have to schedule one person at one time and another person at another time. This Valentine's will be busy because you have to divide time for multiple people. For some: This date might not be with a lover but you need to hurry and manage time because you have work or other activities. For those who know they don't need to juggle - it might be the other person who needs to juggle. If your lover is in another province, this might be the day you have to drive or fly back to meet them. Today is a day where your calendar needs to be managed well. This is a card of managing many things at once, balancing, flexibility." },
        ja: { quote: "やりくり期間、時間を上手に管理して", interpretation: "誰が来るか：これはやりくりして追いつく必要がある時期です。一人を一つの時間にスケジュールし、別の人を別の時間にスケジュールする必要があるかもしれません。このバレンタインは複数の人に時間を分けなければならないので忙しくなります。一部の人へ：このデートは恋人とではないかもしれませんが、仕事や他の活動があるので急いで時間を管理する必要があります。やりくりする必要がないとわかっている人へ - やりくりが必要なのは相手かもしれません。恋人が他の県にいるなら、車や飛行機で会いに戻らなければならない日かもしれません。今日はカレンダーをうまく管理する必要がある日です。これは多くのことを同時に管理する、バランスをとる、柔軟性のカードです。" },
        ko: { quote: "저글링 기간, 시간을 잘 관리하세요", interpretation: "누가 올까: 저글링하고 따라잡아야 하는 시기입니다. 한 사람을 한 시간에, 다른 사람을 다른 시간에 스케줄해야 할 수 있습니다. 이 발렌타인은 여러 사람에게 시간을 나눠야 하기 때문에 바쁠 것입니다. 일부에게: 이 데이트는 연인과가 아닐 수 있지만 일이나 다른 활동이 있어서 서둘러 시간을 관리해야 합니다. 저글링할 필요가 없다고 아는 사람들에게 - 저글링이 필요한 건 상대방일 수 있습니다. 연인이 다른 지방에 있다면, 차를 몰거나 비행기를 타고 만나러 돌아가야 하는 날일 수 있습니다. 오늘은 일정을 잘 관리해야 하는 날입니다. 이것은 많은 것을 동시에 관리하는, 균형 잡는, 유연성의 카드입니다." },
        "zh-CN": { quote: "周旋期，管理好你的时间", interpretation: "谁会来：这是需要周旋和跟上的时期。你可能需要把一个人安排在一个时间，另一个人安排在另一个时间。今年情人节会很忙因为你要把时间分给多个人。对于一些人：这个约会可能不是和恋人，但你需要赶紧管理时间因为有工作或其他活动。对于知道自己不需要周旋的人——可能是对方需要周旋。如果恋人在另一个省份，这可能是你需要开车或坐飞机回去见面的日子。今天是日历需要管理好的一天。这是关于同时管理很多事情、平衡、灵活性的牌。" },
        "zh-TW": { quote: "周旋期，管理好你的時間", interpretation: "誰會來：這是需要周旋和跟上的時期。你可能需要把一個人安排在一個時間，另一個人安排在另一個時間。今年情人節會很忙因為你要把時間分給多個人。對於一些人：這個約會可能不是和戀人，但你需要趕緊管理時間因為有工作或其他活動。對於知道自己不需要周旋的人——可能是對方需要周旋。如果戀人在另一個省份，這可能是你需要開車或坐飛機回去見面的日子。今天是日曆需要管理好的一天。這是關於同時管理很多事情、平衡、靈活性的牌。" }
    },
    "THREE OF PENTACLES": {
        en: { quote: "Group date, no one-on-one", interpretation: "Who will come: This is a day you'll have to work. No romance whatsoever. Or if you do go on a date, you'll have to bring someone else along - no one-on-one dating. You might have to go with a group of coworkers, or attend a company party. For those with partners: You might meet with your partner's elderly relatives or have dinner at your lover's house. Your relationship will develop in a good direction, with introductions to family. This is a card of working together, capability, gaining recognition from people around you." },
        ja: { quote: "グループデート、二人きりなし", interpretation: "誰が来るか：これは仕事をしなければならない日です。ロマンチックなことは全くありません。または、デートに行くとしても、誰かを連れて行かなければなりません - 二人きりのデートはありません。同僚のグループと行くか、会社のパーティーに参加するかもしれません。パートナーがいる方へ：パートナーの年配の親戚に会ったり、恋人の家で夕食を取るかもしれません。関係は良い方向に発展し、家族に紹介されます。これは一緒に働く、能力、周りの人から認められるカードです。" },
        ko: { quote: "그룹 데이트, 둘만의 시간 없음", interpretation: "누가 올까: 일해야 하는 날입니다. 로맨틱한 것은 전혀 없습니다. 또는 데이트를 간다면 다른 사람을 데려가야 합니다 - 둘만의 데이트는 없습니다. 동료 그룹과 가거나 회사 파티에 참석해야 할 수 있습니다. 파트너가 있는 분들에게: 파트너의 어른 친척을 만나거나 연인의 집에서 저녁을 먹을 수 있습니다. 관계가 좋은 방향으로 발전하고, 가족에게 소개됩니다. 이것은 함께 일하는, 능력, 주변 사람들로부터 인정받는 카드입니다." },
        "zh-CN": { quote: "群体约会，没有单独相处", interpretation: "谁会来：这是你必须工作的一天。完全没有浪漫。或者如果你确实去约会，你必须带其他人一起——没有二人约会。你可能需要和同事一群人去，或参加公司聚会。对于有伴侣的人：你可能会见伴侣的长辈亲戚或在恋人家吃晚饭。关系会朝好的方向发展，被介绍给家人。这是关于一起工作、能力、获得周围人认可的牌。" },
        "zh-TW": { quote: "群體約會，沒有單獨相處", interpretation: "誰會來：這是你必須工作的一天。完全沒有浪漫。或者如果你確實去約會，你必須帶其他人一起——沒有二人約會。你可能需要和同事一群人去，或參加公司聚會。對於有伴侶的人：你可能會見伴侶的長輩親戚或在戀人家吃晚飯。關係會朝好的方向發展，被介紹給家人。這是關於一起工作、能力、獲得周圍人認可的牌。" }
    },
    "FOUR OF PENTACLES": {
        en: { quote: "Beware of stingy people who may send bills later", interpretation: "You won't meet anyone new because: If someone comes to ask you on a date, talk to them clearly about what will happen. The other person might be very calculative about spending money. If you don't intend to date them, they might send you a bill later. For some: You feel like saving money right now. Going on dates has costs and expenses. You want to stay home and save money. Going to nice restaurants costs money, going to movies costs money, buying gifts costs money. So staying home is better. For those in relationships: You might argue about money, or one side feels the other is too stingy." },
        ja: { quote: "後で請求書を送るかもしれないケチな人に注意", interpretation: "新しい人に会わないでしょう。なぜなら：誰かがデートに誘ってきたら、何が起こるか明確に話し合ってください。相手はお金を使うことについてとても計算高いかもしれません。彼らと付き合うつもりがないなら、後で請求書を送ってくるかもしれません。一部の人へ：今はお金を節約したい気分です。デートにはコストと費用がかかります。家にいてお金を節約したいです。素敵なレストランに行くのもお金がかかる、映画を見るのもお金がかかる、プレゼントを買うのもお金がかかる。だから家にいる方がいいです。カップルの方へ：お金のことで喧嘩するかもしれません、または片方が相手がケチすぎると感じています。" },
        ko: { quote: "나중에 청구서를 보낼 수 있는 인색한 사람 조심", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 누군가 데이트에 초대하면, 무슨 일이 일어날지 명확하게 이야기하세요. 상대방은 돈 쓰는 것에 대해 매우 계산적일 수 있습니다. 그들과 사귈 의도가 없다면, 나중에 청구서를 보낼 수 있습니다. 일부에게: 지금은 돈을 아끼고 싶은 기분입니다. 데이트에는 비용과 지출이 있습니다. 집에 있으면서 돈을 아끼고 싶습니다. 좋은 레스토랑 가면 돈 들고, 영화 보면 돈 들고, 선물 사면 돈 들어요. 그래서 집에 있는 게 낫습니다. 연인이 있는 분들에게: 돈 문제로 다툴 수 있거나, 한쪽이 상대방이 너무 인색하다고 느낄 수 있습니다." },
        "zh-CN": { quote: "小心可能事后算账的小气人", interpretation: "你不会遇到新人因为：如果有人来约你出去，和他们清楚地谈谈会发生什么。对方可能对花钱非常斤斤计较。如果你不打算和他们交往，他们可能事后给你发账单。对于一些人：你现在想省钱。约会有成本和开销。你想待在家里省钱。去高档餐厅要钱，看电影要钱，买礼物要钱。所以待在家里更好。对于有伴侣的人：你们可能会因为钱吵架，或者一方觉得另一方太小气了。" },
        "zh-TW": { quote: "小心可能事後算帳的小氣人", interpretation: "你不會遇到新人因為：如果有人來約你出去，和他們清楚地談談會發生什麼。對方可能對花錢非常斤斤計較。如果你不打算和他們交往，他們可能事後給你發帳單。對於一些人：你現在想省錢。約會有成本和開銷。你想待在家裡省錢。去高檔餐廳要錢，看電影要錢，買禮物要錢。所以待在家裡更好。對於有伴侶的人：你們可能會因為錢吵架，或者一方覺得另一方太小氣了。" }
    },
    "FIVE OF PENTACLES": {
        en: { quote: "Feeling not good enough, pursuing but failing", interpretation: "You won't meet anyone new because: You might have to reach out to someone you like to invite them on a date, but it might be difficult. You're the one doing the pursuing. You feel you're not good enough, not rich enough, not pretty enough, not handsome enough. If someone is pursuing you: You don't really like them. You feel they're not good enough, not worthy of you. They don't have a car, don't have a house, don't have status. Going to eat with them feels embarrassing. For those in relationships: You might feel unsupported by your partner, or both of you are facing financial problems together. This Valentine's might not be celebrated much." },
        ja: { quote: "十分ではないと感じて、追いかけても失敗", interpretation: "新しい人に会わないでしょう。なぜなら：好きな人にデートに誘うために連絡しなければならないかもしれませんが、難しいかもしれません。あなたが追いかける側です。十分ではない、十分なお金がない、十分に綺麗ではない、十分にハンサムではないと感じています。もし誰かがあなたを追いかけているなら：彼らをあまり好きではありません。彼らは十分ではない、あなたにふさわしくないと感じています。車がない、家がない、地位がない。彼らと食事に行くのは恥ずかしく感じます。カップルの方へ：パートナーからのサポートを感じないかもしれません、または二人とも一緒に財政的な問題に直面しています。このバレンタインはあまり祝われないかもしれません。" },
        ko: { quote: "충분하지 않다고 느끼며 추구하지만 실패", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 좋아하는 사람에게 연락해서 데이트에 초대해야 할 수 있지만, 어려울 수 있습니다. 당신이 추구하는 쪽입니다. 충분히 좋지 않다, 충분히 부유하지 않다, 충분히 예쁘지 않다, 충분히 잘생기지 않다고 느낍니다. 누군가 당신을 추구한다면: 그들을 별로 좋아하지 않습니다. 그들이 충분히 좋지 않다, 당신에게 어울리지 않는다고 느낍니다. 차가 없고, 집이 없고, 지위가 없습니다. 그들과 밥 먹으러 가면 창피합니다. 연인이 있는 분들에게: 파트너에게 지원받지 못한다고 느끼거나, 둘 다 함께 재정적 문제에 직면하고 있습니다. 이번 발렌타인은 많이 축하하지 않을 수 있습니다." },
        "zh-CN": { quote: "觉得自己不够好，追求但失败", interpretation: "你不会遇到新人因为：你可能需要联系你喜欢的人来约他们出去，但可能会很难。你是追求的那一方。你觉得自己不够好，不够有钱，不够漂亮，不够帅。如果有人在追求你：你不太喜欢他们。你觉得他们不够好，配不上你。他们没有车，没有房，没有地位。和他们吃饭觉得丢人。对于有伴侣的人：你可能觉得得不到伴侣的支持，或者你们都一起面临财务问题。今年情人节可能不会怎么庆祝。" },
        "zh-TW": { quote: "覺得自己不夠好，追求但失敗", interpretation: "你不會遇到新人因為：你可能需要聯繫你喜歡的人來約他們出去，但可能會很難。你是追求的那一方。你覺得自己不夠好，不夠有錢，不夠漂亮，不夠帥。如果有人在追求你：你不太喜歡他們。你覺得他們不夠好，配不上你。他們沒有車，沒有房，沒有地位。和他們吃飯覺得丟人。對於有伴侶的人：你可能覺得得不到伴侶的支持，或者你們都一起面臨財務問題。今年情人節可能不會怎麼慶祝。" }
    },
    "SIX OF PENTACLES": {
        en: { quote: "Meet a generous person who likes to spoil you", interpretation: "Who will come: Congratulations, you'll meet a generous spender. But are they spending only on you? Not sure. But point at Gucci, buy Chanel, point at Dior, buy Hermès - you decide what to do. The person you'll meet is someone who likes to give, likes to take care of others, is kind-hearted, financially better off than you, and has no problem taking care of you. For men: You won't be lonely on Valentine's, definitely have someone to date. In fact, you might need to buy two gifts, split between two people. You player. For those in relationships: The relationship will have more balance in giving and receiving. There might be financial support between you." },
        ja: { quote: "あなたを甘やかすのが好きな気前の良い人に会う", interpretation: "誰が来るか：おめでとう、気前の良い人に会います。でも彼らはあなただけにお金を使っているの？わかりません。でもグッチを指差せばシャネルを買い、ディオールを指差せばエルメスを買う - どうするかはあなた次第。会う人は与えることが好き、他の人を世話することが好き、親切、あなたより経済的に裕福で、あなたを世話することに問題がない人です。男性向け：バレンタインに寂しくなりません、絶対にデートする人がいます。実際、プレゼントを二つ買って、二人に分けなければならないかもしれません。このプレイヤー。カップルの方へ：関係には与えることと受け取ることのバランスがもっとできます。お互いの経済的なサポートがあるかもしれません。" },
        ko: { quote: "당신을 spoil하는 것을 좋아하는 관대한 사람을 만남", interpretation: "누가 올까: 축하합니다, 관대한 사람을 만날 것입니다. 하지만 그들이 당신에게만 돈을 쓰는지? 모르겠습니다. 하지만 구찌를 가리키면 샤넬을 사고, 디올을 가리키면 에르메스를 산다 - 어떻게 할지는 당신이 결정하세요. 만날 사람은 주는 것을 좋아하고, 다른 사람을 돌보는 것을 좋아하고, 친절하고, 당신보다 경제적으로 여유가 있고, 당신을 돌보는 데 문제가 없는 사람입니다. 남성분들에게: 발렌타인에 외롭지 않을 것입니다, 확실히 데이트할 사람이 있습니다. 사실, 선물을 두 개 사서 두 사람에게 나눠야 할 수도 있습니다. 이 바람둥이. 연인이 있는 분들에게: 관계에 주고받는 것의 균형이 더 생길 것입니다. 서로 간의 재정적 지원이 있을 수 있습니다." },
        "zh-CN": { quote: "遇到喜欢宠你的慷慨的人", interpretation: "谁会来：恭喜，你会遇到一个大方的人。但他们只给你花钱吗？不知道。但指着Gucci买Chanel，指着Dior买Hermès——你自己决定怎么办。你会遇到的人是喜欢给予、喜欢照顾别人、心地善良、比你经济条件好、照顾你没问题的人。对于男性：情人节不会寂寞，肯定有人约会。事实上，你可能需要买两份礼物，分给两个人。你这个花心人。对于有伴侣的人：关系会在给予和接受方面更加平衡。你们之间可能会有经济上的支持。" },
        "zh-TW": { quote: "遇到喜歡寵你的慷慨的人", interpretation: "誰會來：恭喜，你會遇到一個大方的人。但他們只給你花錢嗎？不知道。但指著Gucci買Chanel，指著Dior買Hermès——你自己決定怎麼辦。你會遇到的人是喜歡給予、喜歡照顧別人、心地善良、比你經濟條件好、照顧你沒問題的人。對於男性：情人節不會寂寞，肯定有人約會。事實上，你可能需要買兩份禮物，分給兩個人。你這個花心人。對於有伴侶的人：關係會在給予和接受方面更加平衡。你們之間可能會有經濟上的支持。" }
    },
    "SEVEN OF PENTACLES": {
        en: { quote: "Waiting for someone to ask you out, but no one does", interpretation: "You won't meet anyone new because: You're waiting for someone to message you to invite you on a date, but you keep waiting and no one has messaged. Try messaging them first. If they're good-looking, tell them you'll treat. You've invested time waiting but haven't seen results yet. For those with partners: Your lover might be preparing an expensive gift or a sum of money for you. It's a return for the love you've given. Both of your efforts will show results on Valentine's Day. This is a card of waiting, evaluation, considering whether what you've invested is worth it." },
        ja: { quote: "誰かに誘われるのを待っているが、誰もいない", interpretation: "新しい人に会わないでしょう。なぜなら：誰かがデートに誘ってくるのを待っていますが、待ち続けても誰もメッセージしてきません。先にメッセージしてみてください。彼らが見た目が良いなら、ご馳走すると言ってください。時間を投資して待っていますが、まだ結果が見えません。パートナーがいる方へ：恋人が高価なプレゼントやお金を準備しているかもしれません。あなたが与えた愛へのお返しです。二人の努力はバレンタインに結果を見せるでしょう。これは待つ、評価する、投資したものが価値があるかを考えるカードです。" },
        ko: { quote: "누군가 데이트 신청하기를 기다리지만 아무도 하지 않음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 누군가 연락해서 데이트에 초대해주길 기다리고 있지만, 계속 기다려도 아무도 연락이 없습니다. 먼저 메시지해 보세요. 그들이 잘생겼다면, 당신이 대접하겠다고 하세요. 시간을 투자해서 기다렸지만 아직 결과가 안 보입니다. 파트너가 있는 분들에게: 연인이 비싼 선물이나 목돈을 준비하고 있을 수 있습니다. 당신이 준 사랑에 대한 보답입니다. 둘의 노력은 발렌타인에 결과를 보여줄 것입니다. 이것은 기다림, 평가, 투자한 것이 가치가 있는지 고려하는 카드입니다." },
        "zh-CN": { quote: "等人约你出去，但没有人", interpretation: "你不会遇到新人因为：你在等人发消息约你出去，但等来等去没人发消息。试着先联系他们。如果他们长得好看，告诉他们你请客。你投入了时间等待但还没看到结果。对于有伴侣的人：恋人可能在准备贵重的礼物或一笔钱给你。这是对你给予的爱的回报。你们双方的努力会在情人节见到成果。这是关于等待、评估、考虑投资是否值得的牌。" },
        "zh-TW": { quote: "等人約你出去，但沒有人", interpretation: "你不會遇到新人因為：你在等人發消息約你出去，但等來等去沒人發消息。試著先聯繫他們。如果他們長得好看，告訴他們你請客。你投入了時間等待但還沒看到結果。對於有伴侶的人：戀人可能在準備貴重的禮物或一筆錢給你。這是對你給予的愛的回報。你們雙方的努力會在情人節見到成果。這是關於等待、評估、考慮投資是否值得的牌。" }
    },
    "EIGHT OF PENTACLES": {
        en: { quote: "Working alone, no dates", interpretation: "You won't meet anyone new because: No dates or meeting anyone at all. You're sitting at home working alone all day. Lots of things keeping you busy. If you're thinking of asking someone on a date: They might say they're busy with work. But wait, isn't Valentine's Day this year a holiday? Oh, they might just not want to go with you, so they say they have work. You're focused on working, studying, or self-improvement, not having time to think about love. For those in relationships: You or your lover might be focused on work or studying. This Valentine's might have to work all day, no time to celebrate." },
        ja: { quote: "一人で仕事、デートなし", interpretation: "新しい人に会わないでしょう。なぜなら：デートも誰かに会うことも全くありません。家で一日中一人で仕事をしています。忙しくさせることがたくさんあります。もし誰かをデートに誘おうとしているなら：彼らは仕事で忙しいと言うかもしれません。でも待って、今年のバレンタインは休日じゃないの？ああ、彼らはただあなたと行きたくないだけで、仕事があると言っているのかもしれません。あなたは仕事、勉強、自己改善に集中していて、恋愛を考える時間がありません。カップルの方へ：あなたか恋人が仕事や勉強に集中しているかもしれません。このバレンタインは一日中仕事しなければならないかも、お祝いする時間がありません。" },
        ko: { quote: "혼자 일하고 데이트 없음", interpretation: "새로운 사람을 만나지 못할 것입니다. 왜냐하면: 데이트도 누구를 만나는 것도 전혀 없습니다. 집에서 하루 종일 혼자 일하고 있습니다. 바쁘게 하는 일들이 많습니다. 누군가를 데이트에 초대하려고 한다면: 그들은 일이 바쁘다고 말할 수 있습니다. 하지만 잠깐, 올해 발렌타인은 휴일 아닌가요? 아, 그들은 그냥 당신과 가고 싶지 않아서 일이 있다고 하는 거일 수 있습니다. 당신은 일, 공부, 자기 개발에 집중하고 있어서 사랑을 생각할 시간이 없습니다. 연인이 있는 분들에게: 당신이나 연인이 일이나 공부에 집중하고 있을 수 있습니다. 이번 발렌타인은 하루 종일 일해야 해서 축하할 시간이 없을 수 있습니다." },
        "zh-CN": { quote: "一个人工作，没有约会", interpretation: "你不会遇到新人因为：完全没有约会或见任何人。你在家一个人工作一整天。有很多事情让你忙。如果你想约某人出去：他们可能说工作忙。但等等，今年情人节不是假日吗？哦，他们可能只是不想和你去，所以说有工作。你专注于工作、学习或自我提升，没时间想爱情。对于有伴侣的人：你或恋人可能专注于工作或学习。今年情人节可能要工作一整天，没时间庆祝。" },
        "zh-TW": { quote: "一個人工作，沒有約會", interpretation: "你不會遇到新人因為：完全沒有約會或見任何人。你在家一個人工作一整天。有很多事情讓你忙。如果你想約某人出去：他們可能說工作忙。但等等，今年情人節不是假日嗎？哦，他們可能只是不想和你去，所以說有工作。你專注於工作、學習或自我提升，沒時間想愛情。對於有伴侶的人：你或戀人可能專注於工作或學習。今年情人節可能要工作一整天，沒時間慶祝。" }
    },
    "NINE OF PENTACLES": {
        en: { quote: "Only dates in Thonglor, the ultimate diva", interpretation: "Who will come: If you're going on a date, it has to be in Thonglor area only. Your makeup and outfit cost a lot. The cost of going on a date is high because you have good taste. The ultimate mom, the queen. You already hire makeup artists. What you should watch out for: The person asking you on dates likes quiet dates, not on social media. Not sure if it's only you. You yourself are successful enough that you don't need anyone to take care of you. If someone comes, they must truly add value to your life. For men: Your beautiful one will definitely go on a date with you. But you have to choose an expensive restaurant, plan a nice date. Flowers and brand name gifts please. She has high taste, not cheap stuff." },
        ja: { quote: "高級エリアでのデートのみ、究極のディーバ", interpretation: "誰が来るか：デートに行くなら、トンローエリアだけでなければなりません。メイクとコーディネートにたくさんお金がかかります。デートに行くコストが高いのは、あなたの趣味が良いからです。究極のママ、クイーン。すでにメイクアップアーティストを雇っています。気をつけるべきこと：あなたをデートに誘う人は静かなデートが好きで、ソーシャルメディアには載せません。あなただけかどうかわかりません。あなた自身は誰にも世話をされる必要がないほど成功しています。誰かが来るなら、本当にあなたの人生に価値を加えなければなりません。男性向け：あなたの美しい人は絶対にあなたとデートします。でも高級レストランを選んで、素敵なデートを計画しなければなりません。花とブランドのプレゼントをお願いします。彼女は高い趣味を持っていて、安物はダメです。" },
        ko: { quote: "강남에서만 데이트, 궁극의 디바", interpretation: "누가 올까: 데이트를 간다면 통러 지역에서만 가야 합니다. 메이크업과 옷에 많은 돈이 듭니다. 데이트 비용이 높은 건 당신의 취향이 좋기 때문입니다. 궁극의 엄마, 여왕. 이미 메이크업 아티스트를 고용하고 있습니다. 주의해야 할 점: 당신을 데이트에 초대하는 사람은 조용한 데이트를 좋아하고, 소셜 미디어에 안 올립니다. 당신만인지 모르겠습니다. 당신 자신은 누구의 돌봄이 필요 없을 만큼 성공했습니다. 누군가 온다면, 정말로 당신의 삶에 가치를 더해야 합니다. 남성분들에게: 당신의 아름다운 사람은 확실히 당신과 데이트할 것입니다. 하지만 비싼 레스토랑을 선택하고, 좋은 데이트를 계획해야 합니다. 꽃과 브랜드 선물 부탁합니다. 그녀는 높은 취향이 있어서, 싼 것은 안 됩니다." },
        "zh-CN": { quote: "只在高档区约会，终极女王", interpretation: "谁会来：如果你要约会，必须在通罗区。你的妆容和服装花费不菲。约会成本高是因为你品味好。终极妈妈，女王。你已经请化妆师了。需要注意的是：约你出去的人喜欢安静的约会，不发社交媒体。不知道是不是只有你。你自己已经成功到不需要任何人照顾。如果有人来，他们必须真正为你的生活增添价值。对于男性：你的美人肯定会和你约会。但你必须选择高档餐厅，计划好的约会。请准备鲜花和名牌礼物。她品味高，不要便宜货。" },
        "zh-TW": { quote: "只在高檔區約會，終極女王", interpretation: "誰會來：如果你要約會，必須在通羅區。你的妝容和服裝花費不菲。約會成本高是因為你品味好。終極媽媽，女王。你已經請化妝師了。需要注意的是：約你出去的人喜歡安靜的約會，不發社交媒體。不知道是不是只有你。你自己已經成功到不需要任何人照顧。如果有人來，他們必須真正為你的生活增添價值。對於男性：你的美人肯定會和你約會。但你必須選擇高檔餐廳，計劃好的約會。請準備鮮花和名牌禮物。她品味高，不要便宜貨。" }
    },
    "TEN OF PENTACLES": {
        en: { quote: "Beware of someone taken, family may not approve", interpretation: "Who will come: Before going on a date together, make sure you've agreed on things. Don't argue or fight before inviting them to dinner. The person you'll meet is likely someone your family already knows - a child of your parents' friends, a cousin, or someone from a well-off family. For completely single people: Watch out for meeting someone who's taken or already married. Or you're in a relationship where people around you don't approve, wanting to interject their opinions. Their family might not be okay with you. For men: If you want to ask someone on a date, go ahead. But you have to choose a fancy restaurant, plan a nice date. The person you invite might be a Virgo, and everyone knows people of this sign are very picky and like to criticize. Be well prepared." },
        ja: { quote: "既婚者に注意、家族が承認しないかも", interpretation: "誰が来るか：一緒にデートに行く前に、物事について合意していることを確認してください。夕食に誘う前に議論したり喧嘩したりしないでください。会う人は家族がすでに知っている人の可能性が高いです - 両親の友人の子供、いとこ、または裕福な家族の出身の人。完全に独身の人へ：彼氏・彼女がいる人や既婚者に会うことに注意してください。または、周りの人が承認せず、意見を挟みたがる関係にいます。彼らの家族があなたを受け入れないかもしれません。男性向け：誰かをデートに誘いたいなら、どうぞ。でも高級レストランを選んで、素敵なデートを計画しなければなりません。招待する人は乙女座かもしれません、そしてこの星座の人はとても細かくて批判的なことは誰もが知っています。よく準備してください。" },
        ko: { quote: "이미 있는 사람 조심, 가족이 승인하지 않을 수 있음", interpretation: "누가 올까: 함께 데이트하기 전에 일들에 대해 합의했는지 확인하세요. 저녁에 초대하기 전에 다투거나 싸우지 마세요. 만날 사람은 가족이 이미 아는 사람일 가능성이 높습니다 - 부모님 친구의 자녀, 사촌, 또는 부유한 가정 출신. 완전히 싱글인 사람들에게: 이미 있거나 결혼한 사람을 만나는 것을 조심하세요. 또는 주변 사람들이 승인하지 않고 의견을 끼워넣고 싶어하는 관계에 있습니다. 그들의 가족이 당신을 괜찮게 여기지 않을 수 있습니다. 남성분들에게: 누군가를 데이트에 초대하고 싶다면, 그렇게 하세요. 하지만 고급 레스토랑을 선택하고, 좋은 데이트를 계획해야 합니다. 초대하는 사람은 처녀자리일 수 있고, 이 별자리 사람들이 매우 까다롭고 비판을 좋아한다는 건 누구나 알고 있습니다. 잘 준비하세요." },
        "zh-CN": { quote: "小心有主的人，家人可能不同意", interpretation: "谁会来：在一起约会之前，确保你们已经谈好事情。在邀请他们吃饭之前不要争论或吵架。你会遇到的人很可能是你家人已经认识的人——父母朋友的孩子，表亲，或者来自富裕家庭的人。对于完全单身的人：小心遇到有主或已婚的人。或者你处于一段周围人不认可、想要插嘴的关系中。他们的家人可能对你不满意。对于男性：如果你想约某人出去，就去吧。但你必须选择高档餐厅，计划好的约会。你邀请的人可能是处女座，大家都知道这个星座的人非常挑剔喜欢批评。好好准备。" },
        "zh-TW": { quote: "小心有主的人，家人可能不同意", interpretation: "誰會來：在一起約會之前，確保你們已經談好事情。在邀請他們吃飯之前不要爭論或吵架。你會遇到的人很可能是你家人已經認識的人——父母朋友的孩子，表親，或者來自富裕家庭的人。對於完全單身的人：小心遇到有主或已婚的人。或者你處於一段周圍人不認可、想要插嘴的關係中。他們的家人可能對你不滿意。對於男性：如果你想約某人出去，就去吧。但你必須選擇高檔餐廳，計劃好的約會。你邀請的人可能是處女座，大家都知道這個星座的人非常挑剔喜歡批評。好好準備。" }
    }
};

// Get translated quote
function getCardQuote(card) {
    if (currentLang === 'th') {
        return card.quote;
    }
    const trans = cardInterpretations[card.name];
    if (trans && trans[currentLang] && trans[currentLang].quote) {
        return trans[currentLang].quote;
    }
    // Fallback to English if available, otherwise Thai
    if (trans && trans.en && trans.en.quote) {
        return trans.en.quote;
    }
    return card.quote;
}

// Get translated interpretation
function getCardInterpretation(card) {
    if (currentLang === 'th') {
        return card.interpretation;
    }
    const trans = cardInterpretations[card.name];
    if (trans && trans[currentLang] && trans[currentLang].interpretation) {
        return trans[currentLang].interpretation;
    }
    // Fallback to English if available, otherwise Thai
    if (trans && trans.en && trans.en.interpretation) {
        return trans.en.interpretation;
    }
    return card.interpretation;
}

// Get translation by key path (e.g., "landing.instruction")
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            // Fallback to Thai
            value = translations['th'];
            for (const fk of keys) {
                if (value && value[fk] !== undefined) {
                    value = value[fk];
                } else {
                    return key;
                }
            }
            return value;
        }
    }
    return value;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key);
        if (translated && translated !== key) {
            el.textContent = translated;
        }
    });

    // Handle placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translated = t(key);
        if (translated && translated !== key) {
            el.placeholder = translated;
        }
    });

    // Handle title attributes (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const translated = t(key);
        if (translated && translated !== key) {
            el.title = translated;
        }
    });
}

// Set language and save to localStorage
function setLanguage(lang) {
    if (!translations[lang]) return;

    currentLang = lang;
    localStorage.setItem('tarot-lang', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-Hans' : lang === 'zh-TW' ? 'zh-Hant' : lang;

    // Apply translations
    applyTranslations();

    // Update language button display
    updateLangButton();

    // Update dynamic content that's already displayed
    refreshDynamicContent();
}

// Refresh dynamic content when language changes
function refreshDynamicContent() {
    // Update result panel if visible and has card data
    if (currentCardData) {
        const resultCardName = document.getElementById('resultCardName');
        const resultQuote = document.getElementById('resultQuote');
        const resultInterpretation = document.getElementById('resultInterpretation');

        if (resultCardName) {
            resultCardName.textContent = getCardName(currentCardData.name);
        }
        if (resultQuote) {
            resultQuote.textContent = `"${getCardQuote(currentCardData)}"`;
        }
        if (resultInterpretation) {
            resultInterpretation.textContent = getCardInterpretation(currentCardData);
        }

        // Re-check card comments to update button text
        checkCardComments(currentCardData.id);
    }

    // Refresh comments section dividers if on mycard tab
    if (currentCommentsTab === 'mycard') {
        loadMyCardComments();
    }

    // Refresh My Card tab text if visible
    const myCardTab = document.querySelector('[data-tab="mycard"]');
    if (myCardTab && myCardTab.style.display !== 'none') {
        myCardTab.textContent = t('comments.tabMyCard');
    }
}

// Update the language button to show current language
function updateLangButton() {
    const langBtn = document.getElementById('langBtn');
    if (!langBtn) return;

    const flags = {
        'th': '🇹🇭',
        'en': '🇬🇧',
        'zh-CN': '🇨🇳',
        'zh-TW': '🇹🇼',
        'ko': '🇰🇷',
        'ja': '🇯🇵'
    };

    const codes = {
        'th': 'TH',
        'en': 'EN',
        'zh-CN': '简',
        'zh-TW': '繁',
        'ko': 'KO',
        'ja': 'JA'
    };

    const flagEl = langBtn.querySelector('.lang-flag');
    const codeEl = langBtn.querySelector('.lang-code');

    if (flagEl) flagEl.textContent = flags[currentLang] || '🇹🇭';
    if (codeEl) codeEl.textContent = codes[currentLang] || 'TH';

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === currentLang);
    });
}

// Initialize language switcher
function initLanguageSwitcher() {
    const langSwitcher = document.getElementById('langSwitcher');
    const langBtn = document.getElementById('langBtn');

    if (!langSwitcher || !langBtn) return;

    // Load saved language
    const savedLang = localStorage.getItem('tarot-lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langSwitcher.classList.toggle('open');
    });

    // Handle language selection
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            setLanguage(lang);
            langSwitcher.classList.remove('open');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        langSwitcher.classList.remove('open');
    });

    // Initial setup
    updateLangButton();
    applyTranslations();
}

// ========================================
// Background Music Control
// ========================================
let isMuted = false;
let musicStarted = false;
let audioElement = null;

// ========================================
// Sound Effects
// ========================================
const soundEffects = {
    cardFlip: null,
    cardSpread: null,
    cardSelect: null
};

// Web Audio API context for amplification
let audioContext = null;

// Initialize sound effects
function initSoundEffects() {
    soundEffects.cardFlip = new Audio('audio/card_select.mp3');
    soundEffects.cardFlip.volume = 0.18;

    soundEffects.cardSpread = new Audio('audio/card_spread.mp3');
    soundEffects.cardSpread.volume = 1.0;
    soundEffects.cardSpread.gainBoost = 2.5; // Amplify 250%

    soundEffects.cardSelect = new Audio('audio/card_select.mp3');
    soundEffects.cardSelect.volume = 0.18;
}

// Play a sound effect with optional gain boost
function playSoundEffect(soundName) {
    if (isMuted) return;

    const sound = soundEffects[soundName];
    if (sound) {
        // If sound has gain boost, use Web Audio API
        if (sound.gainBoost && sound.gainBoost > 1) {
            playWithGainBoost(sound, sound.gainBoost);
        } else {
            sound.currentTime = 0;
            sound.play().catch(err => {
                console.log('Sound effect play failed:', err.message);
            });
        }
    }
}

// Play audio with amplification using Web Audio API
function playWithGainBoost(audioElement, gainValue) {
    try {
        // Create audio context if not exists
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Resume context if suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Clone the audio to allow overlapping plays
        const tempAudio = new Audio(audioElement.src);

        // Create media element source
        const source = audioContext.createMediaElementSource(tempAudio);

        // Create gain node for amplification
        const gainNode = audioContext.createGain();
        gainNode.gain.value = gainValue;

        // Connect: source -> gain -> destination
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Play
        tempAudio.play().catch(err => {
            console.log('Amplified sound play failed:', err.message);
        });
    } catch (err) {
        // Fallback to normal playback
        console.log('Web Audio API failed, using fallback:', err.message);
        audioElement.currentTime = 0;
        audioElement.play().catch(e => console.log('Fallback play failed:', e.message));
    }
}

// Initialize sound effects on load
initSoundEffects();

// Initialize audio element
function initAudioElement() {
    if (audioElement) return audioElement;

    audioElement = document.getElementById('bgMusic');
    if (audioElement) {
        // Set source directly on element for better compatibility
        audioElement.src = 'audio/background.mp3';
        audioElement.volume = 0.15;
        audioElement.loop = true;
        audioElement.load();
        console.log('Audio element initialized');
    }
    return audioElement;
}

// Update sound indicator visibility
function updateSoundIndicator(isPlaying) {
    const indicator = document.getElementById('soundIndicator');
    if (indicator) {
        if (isPlaying && !isMuted) {
            indicator.classList.add('playing');
        } else {
            indicator.classList.remove('playing');
        }
    }
}

// Try to play music - must be called from user interaction
function tryPlayMusic(muteOnFail = false) {
    const audio = initAudioElement();
    if (!audio) {
        console.log('Audio element not found');
        return;
    }

    if (musicStarted && !audio.paused) {
        console.log('Music already playing');
        updateSoundIndicator(true);
        return;
    }

    audio.volume = 0.15;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicStarted = true;
            console.log('Music started playing successfully');
            updateSoundIndicator(true);
        }).catch(err => {
            console.log('Audio play failed:', err.message);
            musicStarted = false;
            updateSoundIndicator(false);
            // If autoplay fails on initial load, mute the audio
            if (muteOnFail) {
                isMuted = true;
                audio.muted = true;
                const muteIconEl = document.getElementById('muteIcon');
                const unmuteIconEl = document.getElementById('unmuteIcon');
                if (muteIconEl && unmuteIconEl) {
                    muteIconEl.style.display = 'none';
                    unmuteIconEl.style.display = 'block';
                }
                console.log('Autoplay blocked - audio muted by default');
            }
        });
    }
}

// Toggle mute/unmute
function toggleMute(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const audio = initAudioElement();
    const muteIconEl = document.getElementById('muteIcon');
    const unmuteIconEl = document.getElementById('unmuteIcon');

    if (!audio) {
        console.log('Audio element not found');
        return;
    }

    isMuted = !isMuted;
    audio.muted = isMuted;

    // Track music toggle
    if (window.cardCounter) {
        window.cardCounter.trackMusicToggle(isMuted);
    }

    console.log('Mute toggled:', isMuted);

    if (muteIconEl && unmuteIconEl) {
        if (isMuted) {
            muteIconEl.style.display = 'none';
            unmuteIconEl.style.display = 'block';
            updateSoundIndicator(false);
        } else {
            muteIconEl.style.display = 'block';
            unmuteIconEl.style.display = 'none';
            // Try to play if paused
            if (audio.paused) {
                audio.play().then(() => {
                    musicStarted = true;
                    console.log('Music resumed');
                    updateSoundIndicator(true);
                }).catch(() => {
                    updateSoundIndicator(false);
                });
            } else {
                updateSoundIndicator(true);
            }
        }
    }
}

// Preload an image and return a promise
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(src); // Don't fail on error, just continue
        img.src = src;
    });
}

// Mark page as ready and enable card clicking with epic reveal
function markPageReady() {
    isPageReady = true;

    // Try to play background music (may be blocked by browser)
    // Show prompt if autoplay fails
    tryPlayMusic(true);

    // Reveal the header with epic animation
    const header = document.querySelector('.landing-heading');
    if (header) {
        header.classList.add('revealed');
    }

    // Add glow effect to card
    const cardContainer = document.getElementById('spinningCardContainer');
    if (cardContainer) {
        cardContainer.classList.add('ready-glow');
    }

    // Update hint text with ready animation (after header animation)
    setTimeout(() => {
        const hintText = document.querySelector('.card-click-hint');
        if (hintText) {
            hintText.textContent = t('landing.clickToDraw');
            hintText.setAttribute('data-i18n', 'landing.clickToDraw');
            hintText.classList.remove('loading-state');
            hintText.classList.add('ready-state');
        }

        // Reveal brand at bottom
        const brand = document.querySelector('.landing-brand');
        if (brand) {
            brand.classList.add('revealed');
        }

    }, 600);
}

// Wait for all resources to load
async function waitForResources() {
    // Start the card rotation animation immediately
    startCardRotation();
    createFloatingSparkles();

    // Load tarot data and essential images in parallel
    const essentialImages = [
        'images/card_back_red.png',
        ...spinningCardImages.slice(0, 3) // Only first 3 spinning images
    ];

    // Load data and essential images simultaneously
    await Promise.all([
        // Load tarot data
        (async () => {
            if (!tarotData) {
                try {
                    const response = await fetch('valentine_tarot.json');
                    tarotData = await response.json();
                } catch (error) {
                    console.error('Error loading tarot data:', error);
                }
            }
        })(),
        // Preload essential images only
        ...essentialImages.map(src => preloadImage(src))
    ]);

    // Render cards (they use card back image which is already loaded)
    renderCards();

    // Mark page as ready immediately - don't wait for all images
    markPageReady();

    // Load remaining images in background (non-blocking)
    loadRemainingImagesInBackground();
}

// Load remaining images in background after page is interactive
function loadRemainingImagesInBackground() {
    // Remaining spinning card images
    const remainingSpinning = spinningCardImages.slice(3);

    // All tarot card front images
    const tarotImages = (tarotData && tarotData.cards)
        ? tarotData.cards.map(card => `images/tarot/${card.image}`)
        : [];

    // Load in small batches to not block the main thread
    const allImages = [...remainingSpinning, ...tarotImages];
    let index = 0;
    const batchSize = 5;

    function loadBatch() {
        const batch = allImages.slice(index, index + batchSize);
        if (batch.length === 0) return;

        batch.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        index += batchSize;
        // Load next batch after a short delay
        if (index < allImages.length) {
            setTimeout(loadBatch, 100);
        }
    }

    // Start loading after a small delay to let the page settle
    setTimeout(loadBatch, 500);
}

// Card images for spinning display
const spinningCardImages = [
    'images/tarot/THE LOVERS.png',
    'images/tarot/THE STAR.png',
    'images/tarot/THE SUN.png',
    'images/tarot/THE MOON.png',
    'images/tarot/THE EMPRESS.png',
    'images/tarot/THE EMPEROR.png',
    'images/tarot/WHEEL OF FORTUNE.png',
    'images/tarot/THE MAGICIAN.png',
    'images/tarot/THE HIGH PRIESTRESS.png',
    'images/tarot/STRENGTH.png'
];

let currentSpinningCardIndex = 0;
let spinningCardInterval = null;

// Change the front card image during rotation
function startCardRotation() {
    const frontImg = document.getElementById('spinningCardFront');

    // Wait 1.5s (when back is facing) then change image every 3s (full rotation)
    // This ensures image changes when back is facing, not when front is visible
    setTimeout(() => {
        // First change at 1.5s (back facing)
        currentSpinningCardIndex = (currentSpinningCardIndex + 1) % spinningCardImages.length;
        frontImg.src = spinningCardImages[currentSpinningCardIndex];

        // Then change every 3s (one full rotation, always when back is facing)
        spinningCardInterval = setInterval(() => {
            currentSpinningCardIndex = (currentSpinningCardIndex + 1) % spinningCardImages.length;
            frontImg.src = spinningCardImages[currentSpinningCardIndex];
        }, 3000);
    }, 1500);
}

// Create floating sparkles around spinning card
let sparkleInterval = null;
function createFloatingSparkles() {
    const container = document.getElementById('spinningCardContainer');

    sparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';

        // Random position in a circle around the center
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 60;
        const x = 90 + Math.cos(angle) * radius;
        const y = 160 + Math.sin(angle) * radius;

        // Random movement direction
        const moveX = (Math.random() - 0.5) * 40;
        const moveY = -20 - Math.random() * 30; // Float upward
        const duration = 1.5 + Math.random() * 1;
        const size = 3 + Math.random() * 5;

        sparkle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            animation: sparkleRise ${duration}s ease-out forwards;
            --move-x: ${moveX}px;
            --move-y: ${moveY}px;
        `;

        container.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => sparkle.remove(), duration * 1000);
    }, 200);
}

function stopFloatingSparkles() {
    if (sparkleInterval) {
        clearInterval(sparkleInterval);
        sparkleInterval = null;
    }
}

// Create sparkles for card burst effect
function createBurstSparkles(centerX, centerY) {
    const container = document.getElementById('cardBurstContainer');

    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 250;
        const sx = Math.cos(angle) * distance;
        const sy = Math.sin(angle) * distance - 100;

        sparkle.style.cssText = `
            left: ${centerX}px;
            top: ${centerY}px;
            --sx: ${sx}px;
            --sy: ${sy}px;
            animation-delay: ${Math.random() * 300}ms;
            width: ${4 + Math.random() * 8}px;
            height: ${4 + Math.random() * 8}px;
        `;

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.classList.add('animate');
        }, Math.random() * 300);
    }
}

// Create flying cards burst effect
function createCardBurst() {
    const container = document.getElementById('cardBurstContainer');
    const flashOverlay = document.getElementById('flashOverlay');
    const cardRect = document.getElementById('spinningCardContainer').getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;

    // Trigger flash effect
    flashOverlay.classList.add('active');
    setTimeout(() => {
        flashOverlay.classList.remove('active');
    }, 600);

    // Create sparkles
    createBurstSparkles(centerX, centerY);

    // Create 14 flying cards
    for (let i = 0; i < 14; i++) {
        const card = document.createElement('div');
        card.className = 'flying-card';

        // Alternate between card back and front
        const imgSrc = i % 2 === 0 ? 'images/card_back_red.png' : spinningCardImages[i % spinningCardImages.length];
        card.innerHTML = `<img src="${imgSrc}" alt="Flying Card">`;

        // Random direction for burst effect
        const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = 180 + Math.random() * 120;
        const endDistance = 500 + Math.random() * 350;

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const txEnd = Math.cos(angle) * endDistance;
        const tyEnd = Math.sin(angle) * endDistance - 200;
        const rot = (Math.random() - 0.5) * 60;
        const rotEnd = rot + (Math.random() - 0.5) * 180;

        card.style.cssText = `
            left: ${centerX}px;
            top: ${centerY}px;
            --tx: ${tx}px;
            --ty: ${ty}px;
            --tx-end: ${txEnd}px;
            --ty-end: ${tyEnd}px;
            --rot: ${rot}deg;
            --rot-end: ${rotEnd}deg;
            animation-delay: ${i * 40}ms;
        `;

        container.appendChild(card);

        setTimeout(() => {
            card.classList.add('animate');
        }, 10 + i * 40);
    }

    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 2000);
}

// Start the experience (when card is clicked)
function startExperience() {
    // Don't allow starting if page is not ready yet
    if (!isPageReady) {
        return;
    }

    // Track journey step: landing to main
    if (window.cardCounter) {
        window.cardCounter.trackJourneyStep('landing');
        window.cardCounter.trackDeviceType();
    }

    // Play music on first user interaction (guaranteed to work)
    tryPlayMusic();

    // Play card select sound effect (magic sparkle)
    playSoundEffect('cardSelect');

    const spinningCard = document.getElementById('spinningCard');
    const spinningCardContainer = document.getElementById('spinningCardContainer');
    const spinningCardWrapper = spinningCardContainer.querySelector('.spinning-card-wrapper');
    const landingPage = document.getElementById('landingPage');
    const mainPage = document.getElementById('mainPage');
    const landingHeading = document.querySelector('.landing-heading');
    const cardGrid = document.getElementById('cardGrid');

    // Get stack card size for target shrink
    const { cardWidth, cardHeight } = getEllipseParams();

    // Stop the rotation interval and sparkles
    if (spinningCardInterval) {
        clearInterval(spinningCardInterval);
    }
    stopFloatingSparkles();

    // Step 1: Stop spinning and show back of card with smooth transition
    spinningCardWrapper.style.transition = 'transform 0.5s ease-out';
    spinningCardWrapper.style.animation = 'none';
    spinningCardWrapper.style.transform = 'rotateY(180deg)';

    // Step 2: Straighten the card (remove tilt)
    spinningCard.style.transition = 'transform 0.5s ease-out';
    spinningCard.style.transform = 'rotate(0deg)';

    // Hide hint text
    spinningCardContainer.querySelector('.card-click-hint').style.opacity = '0';

    // Fade out the original header smoothly
    // First, freeze current state by removing animation and setting explicit values
    landingHeading.style.animation = 'none';
    landingHeading.style.opacity = '1';
    landingHeading.style.transform = 'translateY(0) scale(1)';
    landingHeading.style.transition = 'opacity 0.6s ease';
    // Then fade out in next frame
    requestAnimationFrame(() => {
        landingHeading.style.opacity = '0';
    });

    // Hide other landing elements
    setTimeout(() => {
        document.querySelector('.landing-brand').style.opacity = '0';
        document.querySelector('.landing-instruction').style.opacity = '0';
    }, 200);

    // Prepare main page and card grid (hidden behind spinning card)
    setTimeout(() => {
        landingPage.style.pointerEvents = 'none';
        cardGrid.classList.add('stacked');
        // Don't add initial-hidden - cards will be behind the spinning card
        mainPage.classList.add('visible');
    }, 400);

    // Step 3: Shrink the card and move to stack center
    setTimeout(() => {
        // Calculate scale to match stack card size
        const currentWidth = spinningCardContainer.offsetWidth;
        const scale = cardWidth / currentWidth;

        // Clear the ready-glow animation first so transform can work
        spinningCardContainer.style.animation = 'none';
        spinningCardContainer.style.filter = 'none';

        // Calculate position difference to align with stack center
        const spinningRect = spinningCardContainer.getBoundingClientRect();
        const gridRect = cardGrid.getBoundingClientRect();

        // Calculate center of both elements
        const spinningCenterY = spinningRect.top + spinningRect.height / 2;
        const gridCenterY = gridRect.top + gridRect.height / 2;

        // Calculate how much to move
        const moveY = gridCenterY - spinningCenterY;

        // Apply shrink transition and transform with translate
        spinningCardContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        requestAnimationFrame(() => {
            spinningCardContainer.style.transform = `translateY(${moveY}px) scale(${scale})`;
        });

        // Also reduce shadow on the card face
        const cardFaces = spinningCardContainer.querySelectorAll('.spinning-card-face');
        cardFaces.forEach(face => {
            face.style.transition = 'box-shadow 0.6s ease';
            face.style.boxShadow = '0 2px 8px rgba(114, 47, 55, 0.15)';
        });
    }, 500);

    // Step 4: After shrink completes, hide spinning card instantly and spread the stack
    setTimeout(() => {
        // Hide spinning card instantly with NO transition - it should just disappear
        // The stack is already visible behind at the same position
        spinningCardContainer.style.transition = 'none';
        spinningCardContainer.style.opacity = '0';
        spinningCardContainer.style.visibility = 'hidden';

        // Small delay before spreading to make it feel like the top card is part of the stack
        setTimeout(() => {
            cardGrid.classList.remove('stacked');
            animateToEllipse();

            // Create mini header that fades in at center of ellipse after cards spread
            // 78 cards * 15ms stagger + 600ms animation = ~1800ms total
            setTimeout(() => {
                const miniHeader = document.createElement('div');
                miniHeader.className = 'mini-header';
                miniHeader.innerHTML = 'Who\'s Gonna Be<br>My Next <span class="strikethrough-word"><span class="mistake">Mistake?</span><span class="valentine">Valentine!</span></span>';
                document.body.appendChild(miniHeader);

                // Fade in after a brief moment
                requestAnimationFrame(() => {
                    miniHeader.classList.add('visible');
                });
            }, 1800);
        }, 50);

        // Hide landing page
        setTimeout(() => {
            landingPage.classList.add('hidden');
            // Hide comments button on card spread
            updateCommentsBtnVisibility();
        }, 300);
    }, 1100);
}

// Load tarot data
async function loadTarotData() {
    try {
        const response = await fetch('valentine_tarot.json');
        tarotData = await response.json();
        renderCards();
    } catch (error) {
        console.error('Error loading tarot data:', error);
        document.getElementById('cardGrid').innerHTML =
            '<p class="loading">' + t('error.cardLoadFailed') + '</p>';
    }
}

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Expand cards to 78 (or use all if already 78)
function expandCardsTo78(cards) {
    const targetCount = 78;
    const baseCount = cards.length; // 78 cards total (full tarot deck)
    const timesEach = Math.floor(targetCount / baseCount); // 1 (each card appears once)
    const remainder = targetCount % baseCount; // 0 (no duplicates needed)

    let expanded = [];

    // Add each card 'timesEach' times (3 times each = 66 cards)
    for (let i = 0; i < timesEach; i++) {
        expanded = expanded.concat(cards);
    }

    // Add 'remainder' more cards randomly (12 more to reach 78)
    const shuffledForExtra = shuffleArray([...cards]);
    for (let i = 0; i < remainder; i++) {
        expanded.push(shuffledForExtra[i]);
    }

    return expanded;
}

// Render cards
function renderCards() {
    const cardGrid = document.getElementById('cardGrid');
    const expandedCards = expandCardsTo78(tarotData.cards);
    const shuffledCards = shuffleArray(expandedCards);

    cardGrid.innerHTML = shuffledCards.map((card, index) => `
        <div class="card-container" data-card-id="${card.id}">
            <div class="card">
                <div class="card-face card-back">
                    <img src="images/card_back_red.png" alt="Card Back">
                </div>
                <div class="card-face card-front">
                    <img src="images/tarot/${card.image}" alt="${card.name}">
                </div>
            </div>
        </div>
    `).join('');

    // Add click listeners and hover effects
    document.querySelectorAll('.card-container').forEach((container, index) => {
        container.addEventListener('click', () => {
            const cardId = parseInt(container.dataset.cardId);
            selectCard(cardId, container);
        });

        // Store original transform for hover effects
        container.dataset.index = index;

        // No hover effects - card stays at original size and z-index
    });

    // Apply stacked layout initially (animation triggered later)
    applyStackedLayout();
}

// Apply stacked layout (initial state)
function applyStackedLayout() {
    const containers = document.querySelectorAll('.card-container');
    const { cardWidth, cardHeight } = getEllipseParams();

    containers.forEach((container, index) => {
        // Small random offset for natural stack look
        const offsetX = (Math.random() - 0.5) * 6;
        const offsetY = (Math.random() - 0.5) * 3;
        const rotation = (Math.random() - 0.5) * 8;

        container.classList.add('stacked');
        container.classList.remove('spread');
        container.style.width = `${cardWidth}px`;
        container.style.height = `${cardHeight}px`;
        container.style.left = `calc(50% - ${cardWidth/2}px + ${offsetX}px)`;
        container.style.top = `calc(50% - ${cardHeight/2}px + ${offsetY}px)`;
        container.style.transform = `rotate(${rotation}deg)`;
        container.style.zIndex = index;
        container.style.transition = 'none';
    });
}

// Animate cards from stack to ellipse
function animateToEllipse() {
    // Play card spread sound effect
    playSoundEffect('cardSpread');

    const containers = document.querySelectorAll('.card-container');
    const totalCards = containers.length;
    const { radiusX, radiusY, cardWidth, cardHeight, offsetY } = getEllipseParams();

    containers.forEach((container, index) => {
        // Stagger the animation
        const delay = index * 15;

        setTimeout(() => {
            container.classList.remove('stacked');
            container.classList.add('spread');
            container.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

            const anglePerCard = (2 * Math.PI) / totalCards;
            const angle = index * anglePerCard - Math.PI / 2;

            const x = radiusX * Math.cos(angle);
            const y = radiusY * Math.sin(angle) + offsetY;
            const rotationDeg = (angle * 180 / Math.PI) + 90;

            container.style.left = `calc(50% + ${x}px - ${cardWidth/2}px)`;
            container.style.top = `calc(50% + ${y}px - ${cardHeight/2}px)`;
            container.style.transform = `rotate(${rotationDeg}deg)`;
            container.style.zIndex = index;

            // Reset transition and add floating animation after spread completes
            setTimeout(() => {
                // Set up CSS variables for animation
                container.style.setProperty('--card-rotation', `rotate(${rotationDeg}deg)`);
                container.style.setProperty('--float-delay', `${(index % 10) * 0.3}s`);
                // Clear inline transform and add floating class in same frame
                container.style.transition = 'none';
                container.style.transform = '';
                requestAnimationFrame(() => {
                    container.classList.add('floating');
                });
            }, 600);
        }, delay);
    });
}

// Get responsive elliptical parameters
function getEllipseParams() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Account for footer height
    const availableHeight = height - 50;
    if (width <= 480) {
        // Mobile: tall ellipse along screen height
        return {
            radiusX: Math.min(width * 0.36, 140),   // Narrow horizontal
            radiusY: Math.min(availableHeight * 0.30, 200),  // Tall vertical, fit within screen
            cardWidth: 40,
            cardHeight: 71,
            offsetY: 0
        };
    } else if (width <= 768) {
        return {
            radiusX: 150,   // Narrow
            radiusY: Math.min(availableHeight * 0.35, 260),   // Fit within screen
            cardWidth: 50,
            cardHeight: 89,
            offsetY: 0
        };
    }
    return {
        radiusX: 180,   // Narrow
        radiusY: Math.min(availableHeight * 0.38, 340),   // Fit within screen
        cardWidth: 65,
        cardHeight: 116,
        offsetY: 0
    };
}

// Get card transform based on index for elliptical layout
function getCardTransform(index) {
    const totalCards = 78;
    const anglePerCard = (2 * Math.PI) / totalCards;
    const angle = index * anglePerCard - Math.PI / 2; // Start from top
    const rotationDeg = (angle * 180 / Math.PI) + 90; // Point outward
    return `rotate(${rotationDeg}deg)`;
}

// Apply elliptical layout
function applyCircularLayout() {
    const containers = document.querySelectorAll('.card-container');
    const totalCards = containers.length;
    const { radiusX, radiusY, cardWidth, cardHeight, offsetY } = getEllipseParams();

    containers.forEach((container, index) => {
        const anglePerCard = (2 * Math.PI) / totalCards;
        const angle = index * anglePerCard - Math.PI / 2; // Start from top

        // Calculate position on ellipse
        const x = radiusX * Math.cos(angle);
        const y = radiusY * Math.sin(angle) + offsetY;

        // Rotation to point outward from center
        const rotationDeg = (angle * 180 / Math.PI) + 90;

        container.style.width = `${cardWidth}px`;
        container.style.height = `${cardHeight}px`;
        container.style.left = `calc(50% + ${x}px - ${cardWidth/2}px)`;
        container.style.top = `calc(50% + ${y}px - ${cardHeight/2}px)`;
        container.style.transformOrigin = 'center center';
        container.style.transform = `rotate(${rotationDeg}deg)`;
        container.style.zIndex = index;
    });
}

// Create sparkle particles for card selection
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        // Random angle for each sparkle
        const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = 60 + Math.random() * 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        sparkle.style.left = `${centerX}px`;
        sparkle.style.top = `${centerY}px`;
        sparkle.style.setProperty('--sparkle-x', `${x}px`);
        sparkle.style.setProperty('--sparkle-y', `${y}px`);
        sparkle.style.animationDelay = `${Math.random() * 0.2}s`;
        sparkle.style.width = `${6 + Math.random() * 6}px`;
        sparkle.style.height = sparkle.style.width;

        document.body.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Select card
function selectCard(cardId, cardElement) {
    if (isAnimating) return;
    isAnimating = true;

    const card = tarotData.cards.find(c => c.id === cardId);
    if (!card) {
        isAnimating = false;
        return;
    }

    selectedCardElement = cardElement;

    // Play card flip sound effect when picking a card
    playSoundEffect('cardFlip');

    // Reset hover scale immediately to prevent visual jump
    const index = parseInt(cardElement.dataset.index);
    const originalTransform = getCardTransform(index);
    cardElement.style.transition = 'none';
    cardElement.style.transform = originalTransform;
    // Force reflow to apply the change immediately
    cardElement.offsetHeight;

    // Set center card image
    document.getElementById('centerCardImage').src = `images/tarot/${card.image}`;

    // Reset center card flip state
    document.getElementById('centerCardInner').classList.remove('flipped');

    // Get current rotation from CSS variable or computed style
    const currentRotation = cardElement.style.getPropertyValue('--card-rotation') ||
                           cardElement.style.transform || 'rotate(0deg)';
    const rotationMatch = currentRotation.match(/rotate\(([-\d.]+)deg\)/);
    const rotationDeg = rotationMatch ? parseFloat(rotationMatch[1]) : 0;

    // Track card pick journey and timing
    if (window.cardCounter) {
        window.cardCounter.trackJourneyStep('pick');
        window.cardCounter.trackTimeToFirstPick();
        // Track card position (convert rotation to angle on circle)
        const cardAngle = (rotationDeg - 90 + 360) % 360;
        window.cardCounter.trackCardPosition(cardAngle);
    }

    // Step 1: Add selecting class for golden glow
    cardElement.classList.add('selecting');

    // Create sparkle particles
    createSparkles(cardElement);

    // Calculate slide direction - move outward from ellipse center
    const slideDistance = 40;
    // The card's rotation is (angle + 90), so subtract 90 to get the radial angle
    const radialAngle = (rotationDeg - 90) * Math.PI / 180;
    // Slide outward along the radial direction (away from center)
    const slideX = Math.cos(radialAngle) * slideDistance;
    const slideY = Math.sin(radialAngle) * slideDistance;

    // Apply slide animation - card moves outward while keeping its rotation
    cardElement.style.transition = 'transform 0.4s ease-out, left 0.4s ease-out, top 0.4s ease-out';
    // Update position to slide outward
    const currentLeft = cardElement.style.left;
    const currentTop = cardElement.style.top;
    cardElement.style.left = `calc(${currentLeft} + ${slideX}px)`;
    cardElement.style.top = `calc(${currentTop} + ${slideY}px)`;

    // Disable other cards
    document.querySelectorAll('.card-container').forEach(c => {
        if (c !== cardElement) {
            c.classList.add('disabled');
        }
    });

    // Step 2: Fade out card and show overlay
    setTimeout(() => {
        cardElement.classList.add('slide-out');
    }, 300);

    // Step 3: Show overlay and center card slides down
    setTimeout(() => {
        document.getElementById('overlay').classList.add('active');
        document.getElementById('centerCard').classList.add('active');

        // Step 4: Flip center card
        setTimeout(() => {
            document.getElementById('centerCardInner').classList.add('flipped');

            // Step 5: Show result panel
            setTimeout(() => {
                currentCardData = card; // Store for save image
                document.getElementById('resultCardName').textContent = getCardName(card.name);
                document.getElementById('resultQuote').textContent = `"${getCardQuote(card)}"`;
                document.getElementById('resultInterpretation').textContent = getCardInterpretation(card);
                document.getElementById('resultPanel').classList.add('active');
                isAnimating = false;

                // Track card pick in Firebase
                if (window.cardCounter && window.cardCounter.increment) {
                    window.cardCounter.increment(card.id, card.name, getUserId());
                }

                // Track journey step: result
                if (window.cardCounter) {
                    window.cardCounter.trackJourneyStep('result');
                }

                // Check if this card has comments and update button visibility
                checkCardComments(card.id);

                // Show comments button now that result is visible
                updateCommentsBtnVisibility();
            }, 800);
        }, 500);
    }, 600);
}

// Close and reset
function closeResult() {
    if (isAnimating) return;
    isAnimating = true;

    // Track retry
    if (window.cardCounter) window.cardCounter.trackRetry();

    const cardGrid = document.getElementById('cardGrid');

    // Reset accept actions container and buttons
    const acceptActions = document.getElementById('acceptActions');
    const commentToggleBtn = document.getElementById('commentToggleBtn');
    const viewCommentsBtn = document.getElementById('viewCommentsBtn');
    if (acceptActions) acceptActions.style.display = 'none';
    if (commentToggleBtn) {
        commentToggleBtn.style.display = 'inline-flex';
        commentToggleBtn.classList.remove('active');
        commentToggleBtn.classList.remove('commented');
        commentToggleBtn.disabled = false;
        const btnText = commentToggleBtn.querySelector('span');
        if (btnText) btnText.textContent = t('result.acceptProphecy');
        // Restore original checkmark icon
        const svgIcon = commentToggleBtn.querySelector('svg');
        if (svgIcon) {
            svgIcon.innerHTML = '<path d="M20 6L9 17l-5-5"/>';
        }
    }
    // Reset view comments button
    if (viewCommentsBtn) {
        viewCommentsBtn.style.display = 'none';
    }
    if (typeof resetCommentForm === 'function') resetCommentForm();

    // Hide result panel
    document.getElementById('resultPanel').classList.remove('active');

    // Hide comments button when going back to card spread
    updateCommentsBtnVisibility();

    setTimeout(() => {
        // Hide center card
        document.getElementById('centerCard').classList.remove('active');

        // Hide overlay
        document.getElementById('overlay').classList.remove('active');

        // Reshuffle and re-render
        setTimeout(() => {
            cardGrid.classList.add('stacked');
            renderCards();
            selectedCardElement = null;
            isAnimating = false;

            // Animate cards from stack to fan
            setTimeout(() => {
                cardGrid.classList.remove('stacked');
                animateToEllipse();
            }, 100);
        }, 400);
    }, 300);
}

// Event listeners
document.getElementById('spinningCardContainer').addEventListener('click', startExperience);
document.getElementById('resultClose').addEventListener('click', closeResult);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeResult();
    }
    if (e.key === 'Enter' || e.key === ' ') {
        const landingPage = document.getElementById('landingPage');
        if (!landingPage.classList.contains('hidden')) {
            startExperience();
        }
    }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        applyCircularLayout();
    }, 100);
});

// Share Functions
const siteUrl = 'https://pimfahmaprod.github.io/love-tarot/';

function getShareText() {
    const cardName = document.getElementById('resultCardName').textContent;
    const quote = document.getElementById('resultQuote').textContent.replace(/[""]/g, '');
    return `${t('share.gotCard')} ${cardName}\n"${quote}"\n\n${t('share.letsRead')}`;
}

function showToast(message) {
    const toast = document.getElementById('copyToast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Try Web Share API first (best for mobile)
function tryWebShare() {
    if (navigator.share) {
        navigator.share({
            title: t('share.title'),
            text: getShareText(),
            url: siteUrl
        }).catch(() => {});
        return true;
    }
    return false;
}

function shareToFacebook() {
    // Track share
    if (window.cardCounter) window.cardCounter.trackShare('messenger');

    // Share to Facebook Messenger
    const text = getShareText() + '\n\n' + siteUrl;
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('share.copiedForMessenger'));
        setTimeout(() => {
            // Try Messenger deep link first (works on mobile), fallback to web
            const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(siteUrl)}&redirect_uri=${encodeURIComponent(siteUrl)}`;
            window.open(messengerUrl, '_blank', 'width=600,height=400');
        }, 500);
    });
}

function shareToLine() {
    // Track share
    if (window.cardCounter) window.cardCounter.trackShare('line');

    // LINE already opens chat/messaging
    const text = encodeURIComponent(getShareText() + '\n' + siteUrl);
    window.open(`https://line.me/R/share?text=${text}`, '_blank', 'width=600,height=400');
}

function copyLink() {
    // Track share
    if (window.cardCounter) window.cardCounter.trackShare('copylink');

    const text = getShareText() + '\n\n' + siteUrl;
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('share.copiedText'));
    });
}

// Comment Functions
const SAVED_NAME_KEY = 'tarot_user_name';
const USER_ID_KEY = 'tarot_user_id';

function generateUserId() {
    return 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
}

function getUserId() {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
}

function getSavedUserName() {
    return localStorage.getItem(SAVED_NAME_KEY) || '';
}

function saveUserName(name) {
    localStorage.setItem(SAVED_NAME_KEY, name.trim());
}

function toggleAcceptActions() {
    const acceptActions = document.getElementById('acceptActions');
    const btn = document.getElementById('commentToggleBtn');
    const nameGroup = document.getElementById('commentNameGroup');
    const savedName = getSavedUserName();

    // Show accept actions and hide the button
    acceptActions.style.display = 'block';
    btn.style.display = 'none';

    // Track accept action
    if (window.cardCounter) {
        window.cardCounter.trackCommentFormStart();
    }

    // Check if name is already saved
    if (savedName && nameGroup) {
        nameGroup.style.display = 'none';
    } else if (nameGroup) {
        nameGroup.style.display = 'block';
    }
}

// Legacy function alias
function toggleCommentForm() {
    toggleAcceptActions();
}

// Check if current card has comments and update button visibility
async function checkCardComments(cardId) {
    const viewCommentsBtn = document.getElementById('viewCommentsBtn');
    const commentToggleBtn = document.getElementById('commentToggleBtn');
    const commentToggleBtnText = document.getElementById('commentToggleBtnText');

    if (!viewCommentsBtn || !commentToggleBtn || !commentToggleBtnText) return;

    // Default state: hide view button, show normal text
    viewCommentsBtn.style.display = 'none';
    commentToggleBtnText.textContent = t('result.acceptProphecy');

    // Check if Firebase is available
    if (!window.cardCounter || !window.cardCounter.fetchCommentsByCardId) {
        return;
    }

    try {
        const comments = await window.cardCounter.fetchCommentsByCardId(cardId, null, 1);

        if (comments && comments.length > 0) {
            // Card has comments: show both buttons
            viewCommentsBtn.style.display = 'inline-flex';
            commentToggleBtnText.textContent = t('result.acceptProphecy');
        } else {
            // Card has no comments: hide view button, change text
            viewCommentsBtn.style.display = 'none';
            commentToggleBtnText.textContent = t('cta.acceptFirst');
        }
    } catch (error) {
        console.warn('Failed to check card comments:', error);
    }
}

// Store card data for cardview tab
let cardViewData = null;

// View comments for the current card (opens cardview tab)
async function viewCardComments() {
    if (!currentCardData) return;

    // Track view card comments (ส่อง button)
    if (window.cardCounter) {
        window.cardCounter.trackFeatureUsage('viewCardComments', 'click');
    }

    // Store card data for the cardview tab
    cardViewData = { ...currentCardData };

    // Open comments panel
    openCommentsPanel();

    // Switch to cardview tab
    setTimeout(() => {
        const commentsTabs = document.getElementById('commentsTabs');
        const cardviewTab = commentsTabs.querySelector('[data-tab="cardview"]');
        const tabPreview = cardviewTab.querySelector('.tab-card-preview');

        // Set the card image in tab
        tabPreview.src = `images/tarot/${cardViewData.image}`;
        tabPreview.alt = cardViewData.name;

        // Show and activate the cardview tab
        cardviewTab.style.display = '';

        // Update active tab
        commentsTabs.querySelectorAll('.comments-tab').forEach(t => t.classList.remove('active'));
        cardviewTab.classList.add('active');

        // Switch tab content
        currentCommentsTab = 'cardview';
        switchCommentsTab('cardview');
    }, 100);
}

function resetCommentForm() {
    const savedName = getSavedUserName();
    const nameInput = document.getElementById('commentName');
    const nameGroup = document.getElementById('commentNameGroup');

    if (!savedName && nameInput) {
        nameInput.value = '';
        document.getElementById('nameCharCount').textContent = '0';
    }
    if (nameGroup) {
        nameGroup.style.display = savedName ? 'none' : 'block';
    }

    document.getElementById('commentText').value = '';
    document.getElementById('commentCharCount').textContent = '0';
    document.getElementById('commentSubmitBtn').disabled = false;
    document.getElementById('commentSubmitBtn').classList.remove('success');
    document.getElementById('commentSubmitText').textContent = t('comment.submit');
}

// Character count listeners
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('commentName');
    const commentInput = document.getElementById('commentText');

    if (nameInput) {
        nameInput.addEventListener('input', () => {
            document.getElementById('nameCharCount').textContent = nameInput.value.length;
        });
    }

    if (commentInput) {
        commentInput.addEventListener('input', () => {
            document.getElementById('commentCharCount').textContent = commentInput.value.length;
        });
    }

    // Track interpretation scroll depth
    const resultPanel = document.getElementById('resultPanel');
    if (resultPanel) {
        let maxScrollTracked = 0;
        resultPanel.addEventListener('scroll', () => {
            const scrollTop = resultPanel.scrollTop;
            const scrollHeight = resultPanel.scrollHeight - resultPanel.clientHeight;
            if (scrollHeight > 0) {
                const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
                // Only track when reaching new milestones (25%, 50%, 75%, 100%)
                const milestones = [25, 50, 75, 100];
                for (const milestone of milestones) {
                    if (scrollPercent >= milestone && maxScrollTracked < milestone) {
                        maxScrollTracked = milestone;
                        if (window.cardCounter) {
                            window.cardCounter.trackInterpretationScroll(milestone);
                        }
                    }
                }
            }
        });
        // Reset max scroll when panel closes (detected by class change)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && !resultPanel.classList.contains('active')) {
                    maxScrollTracked = 0;
                }
            });
        });
        observer.observe(resultPanel, { attributes: true });
    }
});

async function submitComment() {
    const nameInput = document.getElementById('commentName');
    const commentInput = document.getElementById('commentText');
    const submitBtn = document.getElementById('commentSubmitBtn');
    const submitText = document.getElementById('commentSubmitText');

    // Use saved name or input value, default to "Anonymous"
    const savedName = getSavedUserName();
    const userName = savedName || nameInput.value.trim() || 'Anonymous';

    // Use input text or placeholder as default
    const defaultComment = t('comment.placeholder');
    const commentText = commentInput.value.trim() || defaultComment;

    if (!currentCardData) {
        showToast(t('toast.error'));
        return;
    }

    // Disable button and show loading
    submitBtn.disabled = true;
    submitText.textContent = t('comment.sending');

    // Submit to Firebase
    if (window.cardCounter && window.cardCounter.submitComment) {
        const userId = getUserId();
        const result = await window.cardCounter.submitComment(
            currentCardData.id,
            currentCardData.name,
            currentCardData.image,
            userId,
            userName,
            commentText
        );

        if (result.success) {
            // Track comment form submitted
            if (window.cardCounter) {
                window.cardCounter.trackCommentFormSubmit();
            }

            // Save name for future comments (only if not Anonymous)
            if (userName !== 'Anonymous') {
                saveUserName(userName);
            }

            // Show "ไพ่ฉัน" tab now that user has commented on their card
            checkMyCardTab();

            submitBtn.classList.add('success');
            submitText.textContent = t('toast.submitSuccess');

            // Show blessing celebration screen after short delay
            setTimeout(() => {
                showBlessingScreen(userName, commentText);
            }, 800);
        } else {
            submitBtn.disabled = false;
            submitText.textContent = t('comment.submit');
            showToast(t('toast.error'));
        }
    } else {
        submitBtn.disabled = false;
        submitText.textContent = t('comment.submit');
        showToast(t('toast.systemNotReady'));
    }
}

// ========================================
// Blessing Celebration Screen
// ========================================

let blessingSparkleInterval = null;

function showBlessingScreen(userName, comment) {
    const blessingScreen = document.getElementById('blessingScreen');
    const blessingCard = document.getElementById('blessingCard');
    const blessingName = document.getElementById('blessingName');
    const blessingComment = document.getElementById('blessingComment');

    if (!blessingScreen || !currentCardData) return;

    // Track blessing screen shown
    if (window.cardCounter) {
        window.cardCounter.trackFeatureUsage('blessingScreen', 'shown');
    }

    // Set card image
    blessingCard.src = `images/tarot/${currentCardData.image}`;

    // Set user name and comment
    blessingName.textContent = userName === 'Anonymous' ? '' : `— ${userName} —`;
    blessingComment.textContent = `"${comment}"`;

    // Hide other panels
    document.getElementById('resultPanel').classList.remove('active');
    document.getElementById('centerCard').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');

    // Show blessing screen
    blessingScreen.classList.add('active');

    // Start sparkle particles
    startBlessingSparkles();

    // Setup restart button
    const restartBtn = document.getElementById('blessingRestartBtn');
    if (restartBtn) {
        restartBtn.onclick = closeBlessingAndRestart;
    }
}

// Create floating sparkles for blessing card
function startBlessingSparkles() {
    const container = document.querySelector('.blessing-card-container');
    if (!container) return;

    // Clear any existing interval
    if (blessingSparkleInterval) {
        clearInterval(blessingSparkleInterval);
    }

    blessingSparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'blessing-sparkle';

        // Random position around the card
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 60;
        const startX = 100 + Math.cos(angle) * distance;
        const startY = 178 + Math.sin(angle) * distance;

        // Random movement direction
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = -30 - Math.random() * 60;
        const duration = 1.5 + Math.random() * 1;

        sparkle.style.cssText = `
            left: ${startX}px;
            top: ${startY}px;
            --move-x: ${moveX}px;
            --move-y: ${moveY}px;
            animation: blessingSparkleRise ${duration}s ease-out forwards;
        `;

        container.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => sparkle.remove(), duration * 1000);
    }, 150);
}

function stopBlessingSparkles() {
    if (blessingSparkleInterval) {
        clearInterval(blessingSparkleInterval);
        blessingSparkleInterval = null;
    }
    // Remove any remaining sparkles
    const container = document.querySelector('.blessing-card-container');
    if (container) {
        container.querySelectorAll('.blessing-sparkle').forEach(s => s.remove());
    }
}

function closeBlessingAndRestart() {
    const blessingScreen = document.getElementById('blessingScreen');

    // Stop sparkles
    stopBlessingSparkles();

    // Fade out blessing screen
    blessingScreen.style.animation = 'blessingFadeIn 0.5s ease reverse forwards';

    setTimeout(() => {
        blessingScreen.classList.remove('active');
        blessingScreen.style.animation = '';

        // Go back to landing page (not card selection)
        goToLandingPage();
    }, 500);
}

function goToLandingPage() {
    // Track restart to landing page
    if (window.cardCounter) {
        window.cardCounter.trackFeatureUsage('restart', 'toLanding');
    }

    const landingPage = document.getElementById('landingPage');
    const mainPage = document.getElementById('mainPage');
    const spinningCardContainer = document.getElementById('spinningCardContainer');
    const spinningCardWrapper = spinningCardContainer.querySelector('.spinning-card-wrapper');
    const spinningCard = document.getElementById('spinningCard');
    const landingHeading = document.querySelector('.landing-heading');
    const landingBrand = document.querySelector('.landing-brand');
    const landingInstruction = document.querySelector('.landing-instruction');
    const cardClickHint = spinningCardContainer.querySelector('.card-click-hint');
    const cardGrid = document.getElementById('cardGrid');
    const miniHeader = document.querySelector('.mini-header');

    // Reset accept actions and buttons
    const acceptActions = document.getElementById('acceptActions');
    const commentToggleBtn = document.getElementById('commentToggleBtn');
    const viewCommentsBtn = document.getElementById('viewCommentsBtn');
    if (acceptActions) acceptActions.style.display = 'none';
    if (commentToggleBtn) {
        commentToggleBtn.style.display = 'inline-flex';
        commentToggleBtn.classList.remove('active');
        commentToggleBtn.classList.remove('commented');
        commentToggleBtn.disabled = false;
        const btnText = commentToggleBtn.querySelector('span');
        if (btnText) btnText.textContent = t('result.acceptProphecy');
        const svgIcon = commentToggleBtn.querySelector('svg');
        if (svgIcon) {
            svgIcon.innerHTML = '<path d="M20 6L9 17l-5-5"/>';
        }
    }
    if (viewCommentsBtn) {
        viewCommentsBtn.style.display = 'none';
    }
    if (typeof resetCommentForm === 'function') resetCommentForm();

    // Step 1: Fade out main page smoothly
    mainPage.style.transition = 'opacity 0.4s ease';
    mainPage.style.opacity = '0';

    // Remove mini header with fade
    if (miniHeader) {
        miniHeader.style.transition = 'opacity 0.3s ease';
        miniHeader.style.opacity = '0';
        setTimeout(() => miniHeader.remove(), 300);
    }

    // Step 2: After fade out, prepare landing page
    setTimeout(() => {
        // Hide main page completely
        mainPage.classList.remove('visible');
        mainPage.style.opacity = '';
        mainPage.style.transition = '';

        // Reset all card containers - remove spread/floating classes
        const cardContainers = document.querySelectorAll('.card-container');
        cardContainers.forEach(container => {
            container.classList.remove('spread');
            container.classList.remove('floating');
            container.style.transition = 'none';
            container.style.transform = '';
            container.style.left = '';
            container.style.top = '';
        });

        // Re-render cards fresh (renderCards already shuffles)
        renderCards();

        // Reset card grid to stacked state
        cardGrid.classList.add('stacked');
        cardGrid.classList.remove('initial-hidden');

        // Reset spinning card container - start invisible for fade in
        spinningCardContainer.style.transition = 'none';
        spinningCardContainer.style.transform = '';
        spinningCardContainer.style.opacity = '0';
        spinningCardContainer.style.visibility = 'visible';
        spinningCardContainer.style.animation = '';
        spinningCardContainer.style.filter = '';

        // Reset card faces shadow
        const cardFaces = spinningCardContainer.querySelectorAll('.spinning-card-face');
        cardFaces.forEach(face => {
            face.style.transition = '';
            face.style.boxShadow = '';
        });

        // Reset spinning card wrapper - back to spinning animation
        spinningCardWrapper.style.transition = '';
        spinningCardWrapper.style.transform = '';
        spinningCardWrapper.style.animation = 'spinOnY 4s linear infinite';

        // Reset spinning card tilt
        spinningCard.style.transition = '';
        spinningCard.style.transform = 'rotate(-29.3deg)';

        // Show hint text
        if (cardClickHint) {
            cardClickHint.style.opacity = '1';
        }

        // Reset landing elements - start invisible
        landingHeading.style.animation = '';
        landingHeading.style.opacity = '0';
        landingHeading.style.transform = '';
        landingHeading.style.transition = '';

        if (landingBrand) {
            landingBrand.style.opacity = '0';
        }
        if (landingInstruction) {
            landingInstruction.style.opacity = '0';
        }

        // Show landing page
        landingPage.classList.remove('hidden');
        landingPage.style.pointerEvents = 'auto';

        // Show comments button on landing page
        updateCommentsBtnVisibility();

        // Scroll to top instantly
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Step 3: Fade in landing elements smoothly
        requestAnimationFrame(() => {
            // Fade in spinning card
            spinningCardContainer.style.transition = 'opacity 0.5s ease';
            spinningCardContainer.style.opacity = '1';

            // Fade in heading
            landingHeading.style.transition = 'opacity 0.5s ease';
            landingHeading.style.opacity = '1';

            // Fade in other elements with slight delays
            setTimeout(() => {
                if (landingBrand) {
                    landingBrand.style.transition = 'opacity 0.4s ease';
                    landingBrand.style.opacity = '1';
                }
            }, 150);

            setTimeout(() => {
                if (landingInstruction) {
                    landingInstruction.style.transition = 'opacity 0.4s ease';
                    landingInstruction.style.opacity = '1';
                }
            }, 300);
        });

        // Restart spinning card interval and sparkles
        startCardRotation();
        createFloatingSparkles();

        // Reset state
        isPaused = false;
        currentCardData = null;

        // Track retry
        if (window.cardCounter) window.cardCounter.trackRetry();
    }, 400);
}

function resetForNewPick() {
    // Reset accept actions container and buttons
    const acceptActions = document.getElementById('acceptActions');
    const commentToggleBtn = document.getElementById('commentToggleBtn');
    const viewCommentsBtn = document.getElementById('viewCommentsBtn');
    if (acceptActions) acceptActions.style.display = 'none';
    if (commentToggleBtn) {
        commentToggleBtn.style.display = 'inline-flex';
        commentToggleBtn.classList.remove('active');
        commentToggleBtn.classList.remove('commented');
        commentToggleBtn.disabled = false;
        const btnText = commentToggleBtn.querySelector('span');
        if (btnText) btnText.textContent = t('result.acceptProphecy');
        const svgIcon = commentToggleBtn.querySelector('svg');
        if (svgIcon) {
            svgIcon.innerHTML = '<path d="M20 6L9 17l-5-5"/>';
        }
    }
    if (viewCommentsBtn) {
        viewCommentsBtn.style.display = 'none';
    }
    if (typeof resetCommentForm === 'function') resetCommentForm();

    // Track retry
    if (window.cardCounter) window.cardCounter.trackRetry();

    // Re-render cards (renderCards already shuffles)
    renderCards();

    // Reset state
    isPaused = false;
    currentCardData = null;

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// Comments Panel
// ========================================
let commentsLastKey = null;
let commentsHasMore = true;
let isLoadingComments = false;
let currentCommentsTab = 'new'; // 'new', 'hot', 'me'

function initCommentsPanel() {
    const commentsBtn = document.getElementById('commentsBtn');
    const commentsPanel = document.getElementById('commentsPanel');
    const commentsOverlay = document.getElementById('commentsOverlay');
    const commentsPanelClose = document.getElementById('commentsPanelClose');
    const commentsList = document.getElementById('commentsList');
    const commentsTabs = document.getElementById('commentsTabs');

    if (commentsBtn) {
        commentsBtn.addEventListener('click', openCommentsPanel);
    }

    if (commentsPanelClose) {
        commentsPanelClose.addEventListener('click', closeCommentsPanel);
    }

    if (commentsOverlay) {
        commentsOverlay.addEventListener('click', closeCommentsPanel);
    }

    // Tab click handlers
    if (commentsTabs) {
        commentsTabs.addEventListener('click', (e) => {
            const tab = e.target.closest('.comments-tab');
            if (!tab) return;

            const tabName = tab.dataset.tab;
            if (tabName === currentCommentsTab) return;

            // Update active tab
            commentsTabs.querySelectorAll('.comments-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Track tab switch
            if (window.cardCounter) {
                window.cardCounter.trackCommentsPanel('tabSwitch_' + tabName);
            }

            // Switch tab content
            currentCommentsTab = tabName;
            switchCommentsTab(tabName);
        });
    }

    // Lazy loading on scroll DOWN (load older comments) - only for 'new' tab
    if (commentsList) {
        commentsList.addEventListener('scroll', () => {
            if (isLoadingComments || !commentsHasMore || currentCommentsTab !== 'new') return;

            // Load more when scrolling near bottom
            const { scrollTop, scrollHeight, clientHeight } = commentsList;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                loadMoreComments();
            }
        });
    }

    // Subscribe to comments count for badge
    setTimeout(() => {
        if (window.cardCounter && window.cardCounter.subscribeToCommentsCount) {
            window.cardCounter.subscribeToCommentsCount(updateCommentsCountBadge);
        }
    }, 1000);
}

// Update comments button visibility based on current page state
function updateCommentsBtnVisibility() {
    const commentsBtn = document.getElementById('commentsBtn');
    if (!commentsBtn) return;

    const mainPage = document.getElementById('mainPage');
    const resultPanel = document.getElementById('resultPanel');

    // Hide only on card spread (mainPage visible but result not active)
    if (mainPage && mainPage.classList.contains('visible')) {
        if (!resultPanel || !resultPanel.classList.contains('active')) {
            commentsBtn.style.display = 'none';
            return;
        }
    }

    // Show on result page
    commentsBtn.style.display = 'flex';
}

function switchCommentsTab(tabName) {
    // Reset state
    commentsLastKey = null;
    commentsHasMore = true;
    displayedCommentIds.clear();
    expandedCommentCard = null;
    navigatedCommentCard = null;

    // Unsubscribe from real-time updates
    if (window.cardCounter && window.cardCounter.unsubscribeFromNewComments) {
        window.cardCounter.unsubscribeFromNewComments();
    }

    // Hide cardview tab when switching to other tabs
    if (tabName !== 'cardview') {
        const cardviewTab = document.querySelector('[data-tab="cardview"]');
        if (cardviewTab) {
            cardviewTab.style.display = 'none';
        }
    }

    // Load content for the selected tab
    if (tabName === 'new') {
        newestCommentTimestamp = 0;
        loadComments(true);
    } else if (tabName === 'hot') {
        loadHotComments();
    } else if (tabName === 'mycard') {
        loadMyCardComments();
    } else if (tabName === 'me') {
        loadMyComments();
    } else if (tabName === 'cardview') {
        loadCardViewComments();
    }
}

function updateCommentsCountBadge(count) {
    const badge = document.getElementById('commentsCount');
    if (!badge) return;

    if (count > 0) {
        badge.textContent = count > 99 ? '99+' : count;
        badge.classList.add('show');
    } else {
        badge.classList.remove('show');
    }
}

// Track displayed comment IDs to avoid duplicates
let displayedCommentIds = new Set();

// Track the newest comment timestamp from initial load (to filter real-time updates)
let newestCommentTimestamp = 0;

// Track currently expanded comment card
let expandedCommentCard = null;
let navigatedCommentCard = null; // Track the card that was navigated from related comments

// Get or create loading element for comments list
function getOrCreateLoadingEl() {
    let loadingEl = document.getElementById('commentsLoading');
    if (!loadingEl) {
        loadingEl = document.createElement('div');
        loadingEl.className = 'comments-loading';
        loadingEl.id = 'commentsLoading';
        loadingEl.innerHTML = '<span>' + t('common.loading') + '</span>';
    }
    return loadingEl;
}

function openCommentsPanel() {
    const commentsPanel = document.getElementById('commentsPanel');
    const commentsOverlay = document.getElementById('commentsOverlay');
    const commentsTabs = document.getElementById('commentsTabs');

    commentsPanel.classList.add('show');
    commentsOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Push state for back button handling on mobile
    if (!window.commentsPanelHistoryPushed) {
        history.pushState({ commentsPanel: true }, '', '');
        window.commentsPanelHistoryPushed = true;
    }

    // Track comments panel opened
    if (window.cardCounter) {
        window.cardCounter.trackCommentsPanel('opened');
    }

    // Update user name display
    updateCommentsPanelUser();

    // Reset tab to "new"
    currentCommentsTab = 'new';
    if (commentsTabs) {
        commentsTabs.querySelectorAll('.comments-tab').forEach(t => t.classList.remove('active'));
        const newTab = commentsTabs.querySelector('[data-tab="new"]');
        if (newTab) newTab.classList.add('active');
    }

    // Check if user has comments and show/hide "ของฉัน" tab
    checkUserHasComments();

    // Check if user has picked a card and show/hide "ไพ่ฉัน" tab
    checkMyCardTab();

    // Reset and load comments (subscription happens after load completes)
    commentsLastKey = null;
    commentsHasMore = true;
    displayedCommentIds.clear();
    newestCommentTimestamp = 0;
    loadComments(true);
}

// Check if user has any comments and show/hide the "Me" tab
async function checkUserHasComments() {
    const commentsTabs = document.getElementById('commentsTabs');
    if (!commentsTabs) return;

    const meTab = commentsTabs.querySelector('[data-tab="me"]');
    if (!meTab) return;

    // Hide by default first
    meTab.style.display = 'none';

    // Check if user has a saved name - if not, don't show the tab
    const savedName = getSavedUserName();
    if (!savedName) {
        return;
    }

    // Check if Firebase is ready
    if (!window.cardCounter || !window.cardCounter.fetchCommentsByUserId) {
        return;
    }

    // Check if user has any comments
    const userId = getUserId();
    const userComments = await window.cardCounter.fetchCommentsByUserId(userId, 1);

    if (userComments.length > 0) {
        meTab.style.display = '';
    }
}

// Check if user has any comments and show/hide the "ไพ่ฉัน" tab
async function checkMyCardTab() {
    const commentsTabs = document.getElementById('commentsTabs');
    if (!commentsTabs) return;

    const myCardTab = commentsTabs.querySelector('[data-tab="mycard"]');
    if (!myCardTab) return;

    // Hide by default
    myCardTab.style.display = 'none';

    // Check if Firebase is ready
    if (!window.cardCounter || !window.cardCounter.fetchCommentsByUserId) {
        return;
    }

    // Check if user has any comments
    const userId = getUserId();
    const comments = await window.cardCounter.fetchCommentsByUserId(userId, 1);

    if (comments.length > 0) {
        myCardTab.style.display = '';
        myCardTab.textContent = t('comments.tabMyCard');
    }
}

function updateCommentsPanelUser() {
    const userElement = document.getElementById('commentsPanelUser');
    if (!userElement) return;

    const savedName = getSavedUserName();
    if (savedName) {
        userElement.textContent = savedName;
        userElement.classList.remove('anonymous');
    } else {
        userElement.textContent = 'Anonymous';
        userElement.classList.add('anonymous');
    }
}

// Navigate to draw card page from comments panel CTA
function goToDrawFromComments() {
    // Close comments panel first
    closeCommentsPanel();

    // If on result page, close result first
    const resultPanel = document.getElementById('resultPanel');
    if (resultPanel && resultPanel.classList.contains('active')) {
        closeResult();
        return;
    }

    // If on landing page, trigger the card to start
    const landingPage = document.getElementById('landingPage');
    if (landingPage && !landingPage.classList.contains('hidden')) {
        const spinningCard = document.getElementById('spinningCard');
        if (spinningCard) {
            spinningCard.click();
        }
    }
}

function closeCommentsPanel(fromBackButton = false) {
    const commentsPanel = document.getElementById('commentsPanel');
    const commentsOverlay = document.getElementById('commentsOverlay');

    // Only close if panel is actually open
    if (!commentsPanel.classList.contains('show')) return;

    commentsPanel.classList.remove('show');
    commentsOverlay.classList.remove('show');
    document.body.style.overflow = '';

    // Handle history state - go back if not triggered by back button
    if (window.commentsPanelHistoryPushed && !fromBackButton) {
        window.commentsPanelHistoryPushed = false;
        history.back();
    } else {
        window.commentsPanelHistoryPushed = false;
    }

    // Track comments panel closed
    if (window.cardCounter) {
        window.cardCounter.trackCommentsPanel('closed');
    }

    // Reset expanded card state
    expandedCommentCard = null;
    navigatedCommentCard = null;

    // Unsubscribe from real-time updates
    if (window.cardCounter && window.cardCounter.unsubscribeFromNewComments) {
        window.cardCounter.unsubscribeFromNewComments();
    }
}

// Handle browser back button for comments panel
window.addEventListener('popstate', () => {
    const commentsPanel = document.getElementById('commentsPanel');
    if (commentsPanel && commentsPanel.classList.contains('show')) {
        closeCommentsPanel(true);
    }
});

// Handle new comment from real-time listener
function handleNewComment(comment) {
    // Skip if already displayed
    if (displayedCommentIds.has(comment.id)) return;

    // Skip older comments that are coming from child_added for existing data
    // Only prepend comments that are truly new (timestamp > newestCommentTimestamp)
    const commentTimestamp = comment.timestamp || 0;
    if (commentTimestamp <= newestCommentTimestamp) return;

    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;

    // Remove empty message if exists
    const emptyMsg = commentsList.querySelector('.comments-empty');
    if (emptyMsg) {
        emptyMsg.remove();
    }

    // Create and prepend new comment card at the top
    const card = createCommentCard(comment);
    card.classList.add('new-comment');

    // Insert at top (after loading element if visible)
    const loadingEl = document.getElementById('commentsLoading');
    if (loadingEl && loadingEl.style.display !== 'none') {
        loadingEl.after(card);
    } else if (commentsList.firstChild) {
        commentsList.insertBefore(card, commentsList.firstChild);
    } else {
        commentsList.appendChild(card);
    }

    // Track this comment as displayed
    displayedCommentIds.add(comment.id);

    // Update newest timestamp
    newestCommentTimestamp = commentTimestamp;

    // Scroll to top to show new comment
    commentsList.scrollTop = 0;

    // Remove animation class after animation
    setTimeout(() => {
        card.classList.remove('new-comment');
    }, 500);
}

async function loadComments(reset = false) {
    if (isLoadingComments) return;
    isLoadingComments = true;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    if (reset) {
        commentsList.innerHTML = '';
        commentsList.appendChild(loadingEl);
        loadingEl.style.display = 'block';
        expandedCommentCard = null; // Reset expanded card state
        commentsLastKey = null;
    }

    if (!window.cardCounter || !window.cardCounter.fetchComments) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    // On first load, fetch top comments by replies first
    if (reset && window.cardCounter.fetchTopCommentsByReplies) {
        const topComments = await window.cardCounter.fetchTopCommentsByReplies(3);

        if (topComments.length > 0) {
            // Create top comments section header
            const topSection = document.createElement('div');
            topSection.className = 'comments-top-section';
            topSection.innerHTML = '<div class="comments-section-title">' + t('sections.popular') + '</div>';
            commentsList.appendChild(topSection);

            // Add top comments
            topComments.forEach(comment => {
                const card = createCommentCard(comment, true); // true = show reply count
                commentsList.appendChild(card);
                displayedCommentIds.add(comment.id);
            });

            // Add separator for recent comments
            const recentHeader = document.createElement('div');
            recentHeader.className = 'comments-section-title recent';
            recentHeader.innerHTML = t('sections.recent');
            commentsList.appendChild(recentHeader);
        }
    }

    const result = await window.cardCounter.fetchComments(commentsLastKey, 10);

    loadingEl.style.display = 'none';

    if (result.comments.length === 0 && reset && displayedCommentIds.size === 0) {
        // Set timestamp to current time so older existing comments won't be prepended
        newestCommentTimestamp = Date.now();

        commentsList.innerHTML = `
            <div class="comments-empty">
                <div class="comments-empty-icon">💬</div>
                <div class="comments-empty-text">${t('cta.beFirstComment')}</div>
            </div>
        `;
        isLoadingComments = false;

        // Subscribe to real-time updates even when empty
        if (window.cardCounter && window.cardCounter.subscribeToNewComments) {
            window.cardCounter.subscribeToNewComments(handleNewComment);
        }
        return;
    }

    // Track the newest comment timestamp for real-time filtering
    if (reset && result.comments.length > 0) {
        newestCommentTimestamp = result.comments[0].timestamp || Date.now();
    }

    // Show newest at top, oldest at bottom (default order from fetchComments)
    result.comments.forEach(comment => {
        // Skip if already displayed (from top section or real-time update)
        if (displayedCommentIds.has(comment.id)) return;

        const card = createCommentCard(comment);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    commentsLastKey = result.lastKey;
    commentsHasMore = result.hasMore;

    isLoadingComments = false;

    // Subscribe to real-time updates after initial load (only on reset/first load)
    if (reset && window.cardCounter && window.cardCounter.subscribeToNewComments) {
        window.cardCounter.subscribeToNewComments(handleNewComment);
    }
}

function loadMoreComments() {
    if (commentsHasMore && !isLoadingComments) {
        loadComments(false);
    }
}

// Load comments for Hot tab (sorted by most replies)
async function loadHotComments() {
    if (isLoadingComments) return;
    isLoadingComments = true;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    if (!window.cardCounter || !window.cardCounter.fetchHotComments) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    const comments = await window.cardCounter.fetchHotComments(30);

    loadingEl.style.display = 'none';

    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="comments-empty">
                <div class="comments-empty-icon">🔥</div>
                <div class="comments-empty-text">${t('common.noHotComments')}<br>${t('common.tryReply')}</div>
            </div>
        `;
        isLoadingComments = false;
        return;
    }

    // Display all hot comments with reply count badge
    comments.forEach(comment => {
        const card = createCommentCard(comment, true);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    isLoadingComments = false;
}

// Load comments for Me tab (user's own comments)
async function loadMyComments() {
    if (isLoadingComments) return;
    isLoadingComments = true;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    const userId = getUserId();

    if (!window.cardCounter || !window.cardCounter.fetchCommentsByUserId) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    const comments = await window.cardCounter.fetchCommentsByUserId(userId, 50);

    loadingEl.style.display = 'none';

    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="comments-empty comments-empty-cta">
                <div class="cta-sparkles">
                    <span class="sparkle s1">✦</span>
                    <span class="sparkle s2">✧</span>
                    <span class="sparkle s3">✦</span>
                </div>
                <div class="cta-card-icon">
                    <svg viewBox="0 0 60 80" fill="none">
                        <rect x="5" y="5" width="50" height="70" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
                        <path d="M30 25 L35 35 L45 37 L38 44 L40 55 L30 50 L20 55 L22 44 L15 37 L25 35 Z" fill="currentColor" opacity="0.3"/>
                        <circle cx="30" cy="40" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <text x="30" y="44" text-anchor="middle" font-size="10" fill="currentColor">?</text>
                    </svg>
                </div>
                <div class="comments-empty-text">${t('cta.notAccepted')}</div>
                <p class="cta-subtitle">${t('cta.drawToReceive')}</p>
                <button class="cta-draw-btn" onclick="goToDrawFromComments()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="7" height="10" rx="1" transform="rotate(-10 6.5 9)"/>
                        <rect x="14" y="4" width="7" height="10" rx="1" transform="rotate(10 17.5 9)"/>
                    </svg>
                    <span>${t('cta.goDrawCard')}</span>
                </button>
            </div>
        `;
        isLoadingComments = false;
        return;
    }

    // Display user's comments
    comments.forEach(comment => {
        const card = createCommentCard(comment);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    isLoadingComments = false;
}

// Load comments for My Card tab (comments on the card user picked)
async function loadMyCardComments() {
    if (isLoadingComments) return;
    isLoadingComments = true;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    const userId = getUserId();

    if (!window.cardCounter || !window.cardCounter.fetchCommentsByCardId) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    // Track feature usage
    if (window.cardCounter) {
        window.cardCounter.trackFeatureUsage('myCardTab', 'view');
    }

    // Fetch data in parallel
    const [myComments, repliedComments] = await Promise.all([
        window.cardCounter.fetchCommentsByUserId ? window.cardCounter.fetchCommentsByUserId(userId, 50) : [],
        window.cardCounter.fetchCommentsUserRepliedTo ? window.cardCounter.fetchCommentsUserRepliedTo(userId, 20) : []
    ]);

    loadingEl.style.display = 'none';

    // Check if both sections are empty
    const hasMyComments = myComments.length > 0;
    const hasRepliedComments = repliedComments.length > 0;

    if (!hasMyComments && !hasRepliedComments) {
        // No comments and no replies - show CTA
        commentsList.innerHTML = `
            <div class="comments-empty comments-empty-cta">
                <div class="cta-sparkles">
                    <span class="sparkle s1">✦</span>
                    <span class="sparkle s2">✧</span>
                    <span class="sparkle s3">✦</span>
                </div>
                <div class="cta-card-icon">
                    <svg viewBox="0 0 60 80" fill="none">
                        <rect x="5" y="5" width="50" height="70" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
                        <path d="M30 25 L35 35 L45 37 L38 44 L40 55 L30 50 L20 55 L22 44 L15 37 L25 35 Z" fill="currentColor" opacity="0.3"/>
                        <circle cx="30" cy="40" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <text x="30" y="44" text-anchor="middle" font-size="10" fill="currentColor">?</text>
                    </svg>
                </div>
                <div class="comments-empty-text">${t('comments.noComments')}</div>
                <p class="cta-subtitle">${t('comments.goComment')}</p>
                <button class="cta-draw-btn" onclick="switchCommentsTab('new')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    <span>${t('comments.viewLatest')}</span>
                </button>
            </div>
        `;
        isLoadingComments = false;
        return;
    }

    // ===== Section 1: My Comments =====
    if (hasMyComments) {
        const myCommentsSection = document.createElement('div');
        myCommentsSection.className = 'mycard-section';
        myCommentsSection.innerHTML = `
            <div class="section-divider">
                <span class="section-label">${t('comments.myComments')}</span>
                <span class="section-line"></span>
                <span class="section-count">${myComments.length}</span>
            </div>
        `;
        commentsList.appendChild(myCommentsSection);

        myComments.forEach(comment => {
            const card = createCommentCard(comment);
            commentsList.appendChild(card);
            displayedCommentIds.add(comment.id);
        });
    }

    // ===== Section 2: Comments I've Replied To =====
    if (hasRepliedComments) {
        const repliedSection = document.createElement('div');
        repliedSection.className = 'mycard-section mycard-section-replied';
        repliedSection.innerHTML = `
            <div class="section-divider">
                <span class="section-label">${t('comments.repliedTo')}</span>
                <span class="section-line"></span>
                <span class="section-count">${repliedComments.length}</span>
            </div>
        `;
        commentsList.appendChild(repliedSection);

        // Display replied comments using createCommentCard (same format as other tabs)
        repliedComments.forEach(comment => {
            const card = createCommentCard(comment);
            commentsList.appendChild(card);
            displayedCommentIds.add(comment.id);
        });
    }

    isLoadingComments = false;
}

// Load comments for cardview tab (viewing a specific card's comments from ส่อง button)
async function loadCardViewComments() {
    if (isLoadingComments) return;
    isLoadingComments = true;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    if (!cardViewData) {
        commentsList.innerHTML = `
            <div class="comments-empty">
                <div class="comments-empty-icon">🃏</div>
                <div class="comments-empty-text">${t('error.cardNotFound')}</div>
            </div>
        `;
        isLoadingComments = false;
        return;
    }

    if (!window.cardCounter || !window.cardCounter.fetchCommentsByCardId) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    const comments = await window.cardCounter.fetchCommentsByCardId(cardViewData.id, null, 50);

    loadingEl.style.display = 'none';

    // Add card image header (overflows from tab)
    const cardHeader = document.createElement('div');
    cardHeader.className = 'cardview-header';
    cardHeader.innerHTML = `
        <div class="cardview-card-wrapper">
            <img class="cardview-card-image" src="images/tarot/${cardViewData.image}" alt="${cardViewData.name}">
            <div class="cardview-card-glow"></div>
        </div>
        <div class="cardview-card-name">${cardViewData.name}</div>
        <div class="cardview-comment-count">${comments.length} ${t('cardview.commentCount')}</div>
    `;
    commentsList.appendChild(cardHeader);

    if (comments.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'comments-empty';
        emptyMsg.innerHTML = `
            <div class="comments-empty-icon">💭</div>
            <div class="comments-empty-text">${t('cardview.noCommentsOnCard')}</div>
        `;
        commentsList.appendChild(emptyMsg);
        isLoadingComments = false;
        return;
    }

    // Display comments for this card
    comments.forEach(comment => {
        const card = createCommentCard(comment);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    isLoadingComments = false;
}

function createCommentCard(comment, showReplyBadge = false) {
    const card = document.createElement('div');
    card.className = 'comment-card';

    // Add top-comment class if it has reply count
    if (showReplyBadge && comment.replyCount > 0) {
        card.classList.add('top-comment');
    }

    const date = comment.timestamp ? new Date(comment.timestamp) : new Date();
    const dateStr = formatCommentDate(date);

    // Get card image - use cardImage if available, otherwise construct from cardName
    let cardImagePath = '';
    if (comment.cardImage && comment.cardImage.length > 0) {
        cardImagePath = comment.cardImage;
    } else if (comment.cardName && comment.cardName.length > 0) {
        // Backward compatibility: construct image path from card name
        // Image files are named like "THE LOVERS.png", "THE STAR.png", etc.
        cardImagePath = comment.cardName + '.png';
    }

    const hasImage = cardImagePath.length > 0;
    const imageHtml = hasImage
        ? `<div class="comment-card-image"><img src="images/tarot/${escapeHtml(cardImagePath)}" alt="${escapeHtml(comment.cardName || 'Tarot')}" onerror="this.parentElement.style.display='none'"></div>`
        : '';

    // Reply count badge for top comments
    const replyBadgeHtml = (showReplyBadge && comment.replyCount > 0)
        ? `<div class="comment-reply-badge">💬 ${comment.replyCount} ${t('common.replyCount')}</div>`
        : '';

    card.innerHTML = `
        ${imageHtml}
        <div class="comment-card-content">
            <div class="comment-card-header">
                <span class="comment-card-name">${escapeHtml(comment.userName || 'Anonymous')}</span>
                ${replyBadgeHtml}
            </div>
            <div class="comment-card-text">${escapeHtml(comment.comment || '')}</div>
            <div class="comment-card-date">${dateStr}</div>

            <!-- Expanded content: Interpretation first -->
            <div class="comment-card-full">
                <div class="comment-card-full-title">
                    <span class="comment-card-tarot">${escapeHtml(comment.cardName || 'Tarot')}</span>
                    <span class="comment-card-full-label">${t('common.prophecy')}</span>
                </div>
                <div class="comment-card-full-interpretation"></div>
            </div>

            <!-- Replies section -->
            <div class="comment-card-replies-section">
                <div class="comment-card-replies-title">${t('common.replies')}</div>
                <div class="replies-list"></div>
                <button class="replies-empty-btn" style="display: none;">${t('common.beFirstReply')}</button>

                <!-- Reply button and form at bottom -->
                <div class="comment-card-actions">
                    <button class="reply-btn" data-comment-id="${comment.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                        <span>${t('comment.reply')}</span>
                        <span class="reply-count" style="display: none;">0</span>
                    </button>
                </div>
                <div class="reply-form">
                    <div class="reply-input-wrapper">
                        <input type="text" class="reply-input" placeholder="${t('comment.replyPlaceholder')}" maxlength="150">
                        <button class="reply-submit-btn" disabled>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Related comments at the end -->
            <div class="comment-card-related">
                <div class="comment-card-related-title">${t('common.otherComments')}</div>
                <div class="related-comments-list">
                    <div class="related-comment-loading">${t('common.loading')}</div>
                </div>
            </div>
        </div>
    `;

    // Add class for styling when image is present
    if (hasImage) {
        card.classList.add('with-image');
    }

    // Store comment data for expand functionality
    card.dataset.commentId = comment.id;
    card.dataset.cardId = comment.cardId;
    card.dataset.cardName = comment.cardName || '';

    // Setup reply functionality
    setupReplyFeature(card, comment);

    // Load reply count
    loadReplyCount(card, comment.id);

    // Add click handler for expand (no collapse on same card)
    card.addEventListener('click', (e) => {
        // Don't expand if clicking on interactive elements
        if (e.target.closest('.reply-btn') ||
            e.target.closest('.reply-form') ||
            e.target.closest('.replies-list') ||
            e.target.closest('.comment-card-replies-section') ||
            e.target.closest('.comment-card-related')) {
            return;
        }
        // Don't do anything if already expanded
        if (card.classList.contains('expanded')) {
            return;
        }
        e.stopPropagation();
        toggleCommentCardExpand(card, comment);
    });

    return card;
}

// Setup reply feature for a comment card
function setupReplyFeature(card, comment) {
    const replyBtn = card.querySelector('.reply-btn');
    const replyForm = card.querySelector('.reply-form');
    const replyInput = card.querySelector('.reply-input');
    const replySubmitBtn = card.querySelector('.reply-submit-btn');
    const repliesEmptyBtn = card.querySelector('.replies-empty-btn');

    // Toggle reply form
    replyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        replyForm.classList.toggle('show');
        if (replyForm.classList.contains('show')) {
            replyInput.focus();
        }
    });

    // "Reply first" button - same as reply button
    if (repliesEmptyBtn) {
        repliesEmptyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            replyForm.classList.add('show');
            replyInput.focus();
        });
    }

    // Enable/disable submit button based on input
    replyInput.addEventListener('input', () => {
        replySubmitBtn.disabled = replyInput.value.trim().length === 0;
    });

    // Submit reply
    replySubmitBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const text = replyInput.value.trim();
        if (!text) return;

        replySubmitBtn.disabled = true;
        replyInput.disabled = true;

        const userId = getUserId();
        const userName = getSavedUserName() || 'Anonymous';

        if (window.cardCounter && window.cardCounter.submitReply) {
            const result = await window.cardCounter.submitReply(comment.id, userId, userName, text);

            if (result.success) {
                // Track reply submitted
                if (window.cardCounter) {
                    window.cardCounter.trackFeatureUsage('reply', 'submitted');
                }

                // Clear input and hide form
                replyInput.value = '';
                replyForm.classList.remove('show');

                // Reload replies
                await loadReplies(card, comment.id);

                showToast(t('toast.replySuccess'));
            } else {
                showToast(t('toast.error'));
            }
        }

        replySubmitBtn.disabled = false;
        replyInput.disabled = false;
    });

    // Enter key to submit
    replyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !replySubmitBtn.disabled) {
            replySubmitBtn.click();
        }
    });
}

// Load reply count for a comment
async function loadReplyCount(card, commentId) {
    if (!window.cardCounter || !window.cardCounter.getReplyCount) return;

    const count = await window.cardCounter.getReplyCount(commentId);
    const replyCountEl = card.querySelector('.reply-count');

    if (count > 0) {
        replyCountEl.textContent = count;
        replyCountEl.style.display = 'inline';
    }
}

// Load replies for a comment
async function loadReplies(card, commentId) {
    if (!window.cardCounter || !window.cardCounter.fetchReplies) return;

    const repliesList = card.querySelector('.replies-list');
    const repliesEmptyBtn = card.querySelector('.replies-empty-btn');

    repliesList.innerHTML = '<div class="related-comment-loading">' + t('common.loading') + '</div>';
    if (repliesEmptyBtn) repliesEmptyBtn.style.display = 'none';

    const replies = await window.cardCounter.fetchReplies(commentId);

    if (replies.length > 0) {
        repliesList.innerHTML = replies.map(reply => {
            const replyDate = reply.timestamp ? new Date(reply.timestamp) : new Date();
            const replyDateStr = formatCommentDate(replyDate);
            return `
                <div class="reply-item">
                    <div class="reply-header">
                        <span class="reply-name">${escapeHtml(reply.userName || 'Anonymous')}</span>
                        <span class="reply-date">${replyDateStr}</span>
                    </div>
                    <div class="reply-text">${escapeHtml(reply.text || '')}</div>
                </div>
            `;
        }).join('');

        // Update count on reply button
        const replyCountEl = card.querySelector('.reply-count');
        if (replyCountEl) {
            replyCountEl.textContent = replies.length;
            replyCountEl.style.display = 'inline';
        }

        if (repliesEmptyBtn) repliesEmptyBtn.style.display = 'none';
    } else {
        repliesList.innerHTML = '';
        if (repliesEmptyBtn) repliesEmptyBtn.style.display = 'block';
    }
}

async function toggleCommentCardExpand(card, comment) {
    // If clicking the same card that's expanded, collapse it
    if (expandedCommentCard === card) {
        collapseCommentCard(card);
        expandedCommentCard = null;
        return;
    }

    // Collapse previously expanded card
    if (expandedCommentCard) {
        collapseCommentCard(expandedCommentCard);
    }

    // Expand the clicked card
    await expandCommentCard(card, comment);
    expandedCommentCard = card;

    // Scroll the card into view smoothly
    setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

async function expandCommentCard(card, comment) {
    card.classList.add('expanded');

    // Track comment card expanded
    if (window.cardCounter) {
        window.cardCounter.trackFeatureUsage('commentCard', 'expanded');
    }

    // Load full interpretation from tarotData
    const interpretationEl = card.querySelector('.comment-card-full-interpretation');
    if (interpretationEl) {
        if (tarotData && tarotData.cards) {
            const tarotCard = tarotData.cards.find(c => c.id === comment.cardId || c.name === comment.cardName);
            if (tarotCard) {
                interpretationEl.textContent = tarotCard.interpretation;
            } else {
                interpretationEl.textContent = t('error.noInterpretation');
            }
        } else {
            interpretationEl.textContent = t('common.loading');
        }
    }

    // Auto-load replies
    await loadReplies(card, comment.id);

    // Load related comments
    const relatedListEl = card.querySelector('.related-comments-list');
    if (!relatedListEl) {
        console.warn('relatedListEl not found in card');
        return;
    }
    relatedListEl.innerHTML = '<div class="related-comment-loading">' + t('common.loading') + '</div>';

    if (window.cardCounter && window.cardCounter.fetchCommentsByCardId) {
        const relatedComments = await window.cardCounter.fetchCommentsByCardId(
            comment.cardId,
            comment.id,
            5
        );

        if (relatedComments.length > 0) {
            // Fetch reply counts for all related comments
            const relatedWithReplyCounts = await Promise.all(
                relatedComments.map(async (rc) => {
                    let replyCount = 0;
                    if (window.cardCounter && window.cardCounter.getReplyCount) {
                        replyCount = await window.cardCounter.getReplyCount(rc.id);
                    }
                    return { ...rc, replyCount };
                })
            );

            relatedListEl.innerHTML = relatedWithReplyCounts.map(rc => {
                const rcDate = rc.timestamp ? new Date(rc.timestamp) : new Date();
                const rcDateStr = formatCommentDate(rcDate);
                const replyBadge = rc.replyCount > 0
                    ? `<span class="related-comment-replies">💬 ${rc.replyCount}</span>`
                    : '';
                // Store full comment data as JSON for direct use
                const commentDataJson = JSON.stringify({
                    id: rc.id,
                    cardId: rc.cardId,
                    cardName: rc.cardName,
                    cardImage: rc.cardImage || '',
                    userName: rc.userName || 'Anonymous',
                    comment: rc.comment || '',
                    timestamp: rc.timestamp
                });
                return `
                    <div class="related-comment" data-comment-id="${rc.id}" data-comment='${commentDataJson.replace(/'/g, "&#39;")}' style="cursor: pointer;">
                        <div class="related-comment-header">
                            <span class="related-comment-name">${escapeHtml(rc.userName || 'Anonymous')}</span>
                            ${replyBadge}
                            <span class="related-comment-date">${rcDateStr}</span>
                        </div>
                        <div class="related-comment-text">${escapeHtml(rc.comment || '')}</div>
                    </div>
                `;
            }).join('');

            // Add click handlers to navigate to related comments
            relatedListEl.querySelectorAll('.related-comment').forEach((el, index) => {
                const commentData = relatedWithReplyCounts[index];
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigateToRelatedComment(commentData);
                });
            });
        } else {
            relatedListEl.innerHTML = '<div class="related-comment-empty">' + t('cardview.noOtherComments') + '</div>';
        }
    } else {
        relatedListEl.innerHTML = '<div class="related-comment-empty">' + t('common.loadError') + '</div>';
    }
}

function collapseCommentCard(card) {
    card.classList.remove('expanded');

    // If this is a navigated card, fade it out and remove it
    if (card.classList.contains('navigated-card')) {
        card.classList.add('fading-out');
        setTimeout(() => {
            if (card.parentNode) card.remove();
        }, 300);
        if (navigatedCommentCard === card) {
            navigatedCommentCard = null;
        }
    }
}

async function navigateToRelatedComment(commentData) {
    // Track navigate to related comment
    if (window.cardCounter) {
        window.cardCounter.trackFeatureUsage('relatedComment', 'navigate');
    }

    try {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;

        // Collapse any currently expanded card first
        if (expandedCommentCard) {
            collapseCommentCard(expandedCommentCard);
            expandedCommentCard = null;
        }

        // Remove previous navigated card with fade animation (keep original cards intact)
        if (navigatedCommentCard && navigatedCommentCard.parentNode) {
            navigatedCommentCard.classList.add('fading-out');
            const oldCard = navigatedCommentCard;
            navigatedCommentCard = null;
            await new Promise(resolve => setTimeout(resolve, 300));
            if (oldCard.parentNode) oldCard.remove();
        }

        // Create a duplicated card (don't remove original) and insert at the TOP of the list
        const newCard = createCommentCard(commentData, false);
        newCard.classList.add('navigated-card'); // Mark as navigated

        // Always insert at the very top of the comments list
        const firstChild = commentsList.firstChild;
        if (firstChild) {
            commentsList.insertBefore(newCard, firstChild);
        } else {
            commentsList.appendChild(newCard);
        }

        // Track displayed ID and navigated card
        displayedCommentIds.add(commentData.id);
        navigatedCommentCard = newCard;

        // Scroll to the card
        newCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Wait for scroll, then expand
        await new Promise(resolve => setTimeout(resolve, 300));
        await expandCommentCard(newCard, commentData);
        expandedCommentCard = newCard;

    } catch (error) {
        console.error('Error navigating to related comment:', error);
        showToast(t('toast.error'));
    }
}

function formatCommentDate(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t('time.justNow');
    if (minutes < 60) return `${minutes} ${t('time.minutesAgo')}`;
    if (hours < 24) return `${hours} ${t('time.hoursAgo')}`;
    if (days < 7) return `${days} ${t('time.daysAgo')}`;

    // Use locale-appropriate date format
    const locale = currentLang === 'th' ? 'th-TH' :
                   currentLang === 'ja' ? 'ja-JP' :
                   currentLang === 'ko' ? 'ko-KR' :
                   currentLang === 'zh-CN' ? 'zh-CN' :
                   currentLang === 'zh-TW' ? 'zh-TW' : 'en-US';
    return date.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize comments panel on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initCommentsPanel();
    updateCommentsBtnVisibility();
});

// Save Image Functions
let currentCardData = null;

function saveImage(platform) {
    if (!currentCardData) {
        showToast(t('image.selectFirst'));
        return;
    }

    // Track save image
    if (window.cardCounter) window.cardCounter.trackSaveImage(platform);

    const sizes = {
        'ig-story': { width: 1080, height: 1920 },
        'square': { width: 1080, height: 1080 },
        'facebook': { width: 1200, height: 630 },
        'wide': { width: 1200, height: 630 }
    };

    const size = sizes[platform];
    if (!size) return;

    showToast(t('image.creating'));

    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d');

    // Load card image
    const cardImg = new Image();
    cardImg.crossOrigin = 'anonymous';
    cardImg.onload = () => {
        drawShareImage(ctx, cardImg, size, platform);

        // Download
        const link = document.createElement('a');
        link.download = `valentine-tarot-${currentCardData.name.toLowerCase().replace(/\s+/g, '-')}-${platform}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        showToast(t('image.saved'));
    };
    cardImg.onerror = () => {
        // Draw without card image
        drawShareImage(ctx, null, size, platform);

        const link = document.createElement('a');
        link.download = `valentine-tarot-${currentCardData.name.toLowerCase().replace(/\s+/g, '-')}-${platform}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        showToast(t('image.saved'));
    };
    cardImg.src = `images/tarot/${currentCardData.image}`;
}

function drawShareImage(ctx, cardImg, size, platform) {
    const { width, height } = size;
    const isVertical = height > width;
    const isWide = width > height;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#FDF8F3');
    gradient.addColorStop(0.5, '#FAF0E6');
    gradient.addColorStop(1, '#F5E6D3');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative border
    ctx.strokeStyle = '#722F37';
    ctx.lineWidth = isWide ? 6 : 8;
    const borderPadding = isWide ? 20 : 30;
    ctx.strokeRect(borderPadding, borderPadding, width - borderPadding * 2, height - borderPadding * 2);

    // Inner decorative line
    ctx.strokeStyle = 'rgba(114, 47, 55, 0.3)';
    ctx.lineWidth = 2;
    const innerPadding = borderPadding + 15;
    ctx.strokeRect(innerPadding, innerPadding, width - innerPadding * 2, height - innerPadding * 2);

    // Layout based on platform
    if (isVertical) {
        // Story layout (vertical)
        drawVerticalLayout(ctx, cardImg, width, height);
    } else if (isWide) {
        // Facebook layout (wide)
        drawWideLayout(ctx, cardImg, width, height);
    } else {
        // Square layout (IG post, LINE)
        drawSquareLayout(ctx, cardImg, width, height);
    }
}

// Draw social media icons (4 icons: IG, TikTok, FB, YouTube)
function drawSocialIcons(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.07;

    const gap = size * 1.4; // Gap between icons
    let currentX = x;
    const radius = size * 0.2;

    // Instagram icon
    ctx.beginPath();
    ctx.roundRect(currentX, y, size, size, radius);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(currentX + size/2, y + size/2, size * 0.28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(currentX + size * 0.75, y + size * 0.25, size * 0.07, 0, Math.PI * 2);
    ctx.fill();

    currentX += gap;

    // TikTok icon
    ctx.beginPath();
    ctx.roundRect(currentX, y, size, size, radius);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currentX + size * 0.58, y + size * 0.15);
    ctx.lineTo(currentX + size * 0.58, y + size * 0.65);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(currentX + size * 0.42, y + size * 0.7, size * 0.18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currentX + size * 0.58, y + size * 0.22);
    ctx.quadraticCurveTo(currentX + size * 0.85, y + size * 0.18, currentX + size * 0.85, y + size * 0.38);
    ctx.stroke();

    currentX += gap;

    // Facebook icon
    ctx.beginPath();
    ctx.roundRect(currentX, y, size, size, radius);
    ctx.stroke();
    ctx.font = `bold ${size * 0.65}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('f', currentX + size/2, y + size * 0.72);

    currentX += gap;

    // Youtube icon
    ctx.beginPath();
    ctx.roundRect(currentX, y, size, size, radius);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currentX + size * 0.38, y + size * 0.3);
    ctx.lineTo(currentX + size * 0.38, y + size * 0.7);
    ctx.lineTo(currentX + size * 0.72, y + size * 0.5);
    ctx.closePath();
    ctx.fill();

    return currentX + size;
}

// Draw LINE icon only
function drawLineIcon(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.07;
    const radius = size * 0.2;

    ctx.beginPath();
    ctx.roundRect(x, y, size, size, radius);
    ctx.stroke();
    ctx.font = `bold ${size * 0.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('L', x + size/2, y + size * 0.68);
}

function drawVerticalLayout(ctx, cardImg, width, height) {
    // Card image - large and centered at top
    let cardBottomY = 100;
    if (cardImg) {
        const cardWidth = 520;
        const cardHeight = cardWidth * (cardImg.height / cardImg.width);
        const cardX = (width - cardWidth) / 2;
        const cardY = 100;

        // Card shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 20;

        ctx.drawImage(cardImg, cardX, cardY, cardWidth, cardHeight);
        ctx.shadowColor = 'transparent';
        cardBottomY = cardY + cardHeight;
    }

    // Card name - right after card
    const nameY = cardBottomY + 80;
    ctx.fillStyle = '#722F37';
    ctx.font = 'bold 64px "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.fillText(currentCardData.name, width / 2, nameY);

    // Decorative line under name
    ctx.strokeStyle = 'rgba(114, 47, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 180, nameY + 25);
    ctx.lineTo(width / 2 + 180, nameY + 25);
    ctx.stroke();

    // Quote
    ctx.font = 'italic 36px "Cormorant Garamond", serif';
    ctx.fillStyle = 'rgba(114, 47, 55, 0.85)';
    const quote = `"${currentCardData.quote}"`;
    wrapText(ctx, quote, width / 2, nameY + 90, width - 160, 48);

    // Interpretation section
    const interpretY = nameY + 200;

    // Divider
    ctx.strokeStyle = 'rgba(114, 47, 55, 0.3)';
    ctx.beginPath();
    ctx.moveTo(120, interpretY);
    ctx.lineTo(width - 120, interpretY);
    ctx.stroke();

    // Interpretation label
    ctx.font = 'bold 28px "Prompt", sans-serif';
    ctx.fillStyle = '#722F37';
    ctx.fillText(t('common.prophecy'), width / 2, interpretY + 50);

    // Interpretation text - full text with bounds (preserve paragraph breaks)
    ctx.font = '26px "Prompt", sans-serif';
    ctx.fillStyle = '#722F37';
    const maxInterpretY = height - 180; // Leave space for footer
    wrapTextWithParagraphsCenter(ctx, currentCardData.interpretation, width / 2, interpretY + 110, width - 160, 38, maxInterpretY);

    // Footer - 2 columns layout with divider
    const iconSize = 26;
    const footerColor = 'rgba(114, 47, 55, 0.6)';
    const footerY = height - 120;

    // Calculate widths for centering
    const leftIconsWidth = iconSize * 1.4 * 3 + iconSize; // 4 icons
    const rightIconWidth = iconSize;
    const gap = 100; // Gap between two columns
    const totalWidth = leftIconsWidth + gap + rightIconWidth;
    const startX = (width - totalWidth) / 2;

    // Left column: 4 social icons + Pimfahmaprod
    drawSocialIcons(ctx, startX, footerY, iconSize, footerColor);
    ctx.textAlign = 'center';
    ctx.font = '20px "Prompt", sans-serif';
    ctx.fillStyle = footerColor;
    ctx.fillText('Pimfahmaprod', startX + leftIconsWidth / 2, footerY + iconSize + 28);

    // Right column: LINE icon + Line: @Pimfah
    const lineIconX = startX + leftIconsWidth + gap;
    drawLineIcon(ctx, lineIconX, footerY, iconSize, footerColor);
    ctx.textAlign = 'center';
    ctx.font = '20px "Prompt", sans-serif';
    ctx.fillStyle = footerColor;
    ctx.fillText('Line: @Pimfah', lineIconX + iconSize / 2, footerY + iconSize + 28);
}

function drawSquareLayout(ctx, cardImg, width, height) {
    // Border padding for safe area - generous margin from border
    const safePadding = 80;

    // Card image - left side, large and vertically centered
    let cardRightX = 450;
    if (cardImg) {
        const cardHeight = height - 200; // More vertical padding
        const cardWidth = cardHeight * (cardImg.width / cardImg.height);
        const cardX = safePadding + 10;
        const cardY = 100;

        // Card shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;

        ctx.drawImage(cardImg, cardX, cardY, cardWidth, cardHeight);
        ctx.shadowColor = 'transparent';
        cardRightX = cardX + cardWidth + 35;
    }

    // Right side - Text area with safe margins
    const textX = cardRightX;
    const textWidth = width - textX - safePadding - 10; // More right padding

    // Title small
    ctx.fillStyle = 'rgba(114, 47, 55, 0.6)';
    ctx.font = '22px "Cormorant Garamond", serif';
    ctx.textAlign = 'left';
    ctx.fillText('Valentine Tarot', textX, 140);

    // Card name - large (with dynamic sizing to fit)
    ctx.fillStyle = '#722F37';
    let nameFontSize = 48;
    ctx.font = `bold ${nameFontSize}px "Cormorant Garamond", serif`;
    let nameWidth = ctx.measureText(currentCardData.name).width;
    while (nameWidth > textWidth && nameFontSize > 26) {
        nameFontSize -= 2;
        ctx.font = `bold ${nameFontSize}px "Cormorant Garamond", serif`;
        nameWidth = ctx.measureText(currentCardData.name).width;
    }
    ctx.fillText(currentCardData.name, textX, 195);

    // Decorative line
    ctx.strokeStyle = 'rgba(114, 47, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(textX, 220);
    ctx.lineTo(textX + Math.min(180, textWidth - 20), 220);
    ctx.stroke();

    // Quote
    ctx.font = 'italic 22px "Cormorant Garamond", serif';
    ctx.fillStyle = 'rgba(114, 47, 55, 0.85)';
    const quote = `"${currentCardData.quote}"`;
    wrapTextLeft(ctx, quote, textX, 265, textWidth, 30);

    // Interpretation - full text with bounds (preserve paragraph breaks)
    ctx.font = '17px "Prompt", sans-serif';
    ctx.fillStyle = '#722F37';
    const maxInterpretY = height - safePadding - 100; // Leave space for footer within safe area
    wrapTextWithParagraphs(ctx, currentCardData.interpretation, textX, 360, textWidth, 25, maxInterpretY);

    // Footer - 2 columns layout with divider
    const iconSize = 18;
    const footerColor = 'rgba(114, 47, 55, 0.55)';
    const footerY = height - safePadding - 40;
    const gap = 50;

    // Left column: 4 social icons + Pimfahmaprod
    drawSocialIcons(ctx, textX, footerY, iconSize, footerColor);
    const leftIconsWidth = iconSize * 1.4 * 3 + iconSize;
    ctx.textAlign = 'center';
    ctx.font = '14px "Prompt", sans-serif';
    ctx.fillStyle = footerColor;
    ctx.fillText('Pimfahmaprod', textX + leftIconsWidth / 2, footerY + iconSize + 20);

    // Right column: LINE icon + Line: @Pimfah
    const lineIconX = textX + leftIconsWidth + gap;
    drawLineIcon(ctx, lineIconX, footerY, iconSize, footerColor);
    ctx.textAlign = 'center';
    ctx.font = '14px "Prompt", sans-serif';
    ctx.fillStyle = footerColor;
    ctx.fillText('Line: @Pimfah', lineIconX + iconSize / 2, footerY + iconSize + 20);
}

function drawWideLayout(ctx, cardImg, width, height) {
    // Left side: Card image - fill height
    let cardRightX = 350;
    if (cardImg) {
        const cardHeight = height - 100;
        const cardWidth = cardHeight * (cardImg.width / cardImg.height);
        const cardX = 50;
        const cardY = 50;

        // Card shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 12;

        ctx.drawImage(cardImg, cardX, cardY, cardWidth, cardHeight);
        ctx.shadowColor = 'transparent';
        cardRightX = cardX + cardWidth + 50;
    }

    // Right side: Text - starts after card
    const textX = cardRightX;
    const textWidth = width - textX - 60;

    // Title small
    ctx.fillStyle = 'rgba(114, 47, 55, 0.6)';
    ctx.font = '20px "Cormorant Garamond", serif';
    ctx.textAlign = 'left';
    ctx.fillText('Valentine Tarot', textX, 80);

    // Card name - prominent (with dynamic sizing to fit)
    ctx.fillStyle = '#722F37';
    let nameFontSize = 42;
    ctx.font = `bold ${nameFontSize}px "Cormorant Garamond", serif`;
    let nameWidth = ctx.measureText(currentCardData.name).width;
    while (nameWidth > textWidth && nameFontSize > 24) {
        nameFontSize -= 2;
        ctx.font = `bold ${nameFontSize}px "Cormorant Garamond", serif`;
        nameWidth = ctx.measureText(currentCardData.name).width;
    }
    ctx.fillText(currentCardData.name, textX, 125);

    // Decorative line
    ctx.strokeStyle = 'rgba(114, 47, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(textX, 145);
    ctx.lineTo(textX + 200, 145);
    ctx.stroke();

    // Quote
    ctx.font = 'italic 20px "Cormorant Garamond", serif';
    ctx.fillStyle = 'rgba(114, 47, 55, 0.9)';
    const quote = `"${currentCardData.quote}"`;
    wrapTextLeft(ctx, quote, textX, 180, textWidth, 26);

    // Interpretation - full text with bounds (preserve paragraph breaks)
    ctx.font = '16px "Prompt", sans-serif';
    ctx.fillStyle = '#722F37';
    const maxInterpretY = height - 90; // Leave space for footer
    wrapTextWithParagraphs(ctx, currentCardData.interpretation, textX, 260, textWidth, 22, maxInterpretY);

    // Footer - 2 columns layout with divider
    const iconSize = 14;
    const footerColor = 'rgba(114, 47, 55, 0.55)';
    const footerY = height - 62;
    const gap = 40;

    // Left column: 4 social icons + Pimfahmaprod
    drawSocialIcons(ctx, textX, footerY, iconSize, footerColor);
    const leftIconsWidth = iconSize * 1.4 * 3 + iconSize;
    ctx.textAlign = 'center';
    ctx.font = '12px "Prompt", sans-serif';
    ctx.fillStyle = footerColor;
    ctx.fillText('Pimfahmaprod', textX + leftIconsWidth / 2, footerY + iconSize + 16);

    // Right column: LINE icon + Line: @Pimfah
    const lineIconX = textX + leftIconsWidth + gap;
    drawLineIcon(ctx, lineIconX, footerY, iconSize, footerColor);
    ctx.textAlign = 'center';
    ctx.font = '12px "Prompt", sans-serif';
    ctx.fillStyle = footerColor;
    ctx.fillText('Line: @Pimfah', lineIconX + iconSize / 2, footerY + iconSize + 16);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    const words = text.split(' ');
    let line = '';
    let testLine = '';

    for (let i = 0; i < words.length; i++) {
        testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
            if (y > maxY) {
                // Add ellipsis to last visible line
                ctx.fillText(line.trim() + '...', x, y - lineHeight);
                return y;
            }
            ctx.fillText(line.trim(), x, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    if (y <= maxY + lineHeight) {
        ctx.fillText(line.trim(), x, y);
    }
    return y;
}

// Text wrapping with paragraph support (centered) - for Story layout
function wrapTextWithParagraphsCenter(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    ctx.textAlign = 'center';
    const paragraphs = text.split('\n\n');
    const paragraphGap = lineHeight * 0.5;

    for (let p = 0; p < paragraphs.length; p++) {
        const paragraph = paragraphs[p].replace(/\n/g, ' ').trim();
        if (!paragraph) continue;

        const words = paragraph.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth) {
                if (line.length > 0) {
                    if (y + lineHeight > maxY) {
                        ctx.fillText(line.trim() + '...', x, y);
                        return y;
                    }
                    ctx.fillText(line.trim(), x, y);
                    y += lineHeight;
                    line = '';
                }

                // Handle long words
                if (ctx.measureText(word).width > maxWidth) {
                    let charLine = '';
                    for (let j = 0; j < word.length; j++) {
                        const testCharLine = charLine + word[j];
                        if (ctx.measureText(testCharLine).width > maxWidth && charLine.length > 0) {
                            if (y + lineHeight > maxY) {
                                ctx.fillText(charLine + '...', x, y);
                                return y;
                            }
                            ctx.fillText(charLine, x, y);
                            y += lineHeight;
                            charLine = word[j];
                        } else {
                            charLine = testCharLine;
                        }
                    }
                    line = charLine + ' ';
                } else {
                    line = word + ' ';
                }
            } else {
                line = testLine;
            }
        }

        // Draw remaining text of this paragraph
        if (line.trim().length > 0 && y <= maxY) {
            ctx.fillText(line.trim(), x, y);
            y += lineHeight;
        }

        // Add paragraph gap
        if (p < paragraphs.length - 1 && y <= maxY) {
            y += paragraphGap;
        }
    }
    return y;
}

// Text wrapping with paragraph support - adds extra space for \n\n
function wrapTextWithParagraphs(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    ctx.textAlign = 'left';
    const paragraphs = text.split('\n\n');
    const paragraphGap = lineHeight * 0.5; // Extra space between paragraphs

    for (let p = 0; p < paragraphs.length; p++) {
        const paragraph = paragraphs[p].replace(/\n/g, ' ').trim();
        if (!paragraph) continue;

        const words = paragraph.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth) {
                if (line.length > 0) {
                    // Check boundary before drawing
                    if (y + lineHeight > maxY) {
                        ctx.fillText(line.trim() + '...', x, y);
                        return y;
                    }
                    ctx.fillText(line.trim(), x, y);
                    y += lineHeight;
                    line = '';
                }

                // Handle long words by breaking at character level
                if (ctx.measureText(word).width > maxWidth) {
                    let charLine = '';
                    for (let j = 0; j < word.length; j++) {
                        const testCharLine = charLine + word[j];
                        if (ctx.measureText(testCharLine).width > maxWidth && charLine.length > 0) {
                            if (y + lineHeight > maxY) {
                                ctx.fillText(charLine + '...', x, y);
                                return y;
                            }
                            ctx.fillText(charLine, x, y);
                            y += lineHeight;
                            charLine = word[j];
                        } else {
                            charLine = testCharLine;
                        }
                    }
                    line = charLine + ' ';
                } else {
                    line = word + ' ';
                }
            } else {
                line = testLine;
            }
        }

        // Draw remaining text of this paragraph
        if (line.trim().length > 0 && y <= maxY) {
            ctx.fillText(line.trim(), x, y);
            y += lineHeight;
        }

        // Add paragraph gap (except for last paragraph)
        if (p < paragraphs.length - 1 && y <= maxY) {
            y += paragraphGap;
        }
    }
    return y;
}

// Thai-aware text wrapping - handles long Thai words by breaking at character level
function wrapTextThaiAware(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    ctx.textAlign = 'left';
    const words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth) {
            if (line.length > 0) {
                // Check if next line would exceed boundary
                if (y + lineHeight > maxY) {
                    ctx.fillText(line.trim() + '...', x, y);
                    return y;
                }
                ctx.fillText(line.trim(), x, y);
                y += lineHeight;
                line = '';
            }

            // If single word is too long, break it character by character
            if (ctx.measureText(word).width > maxWidth) {
                let charLine = '';
                for (let j = 0; j < word.length; j++) {
                    const testCharLine = charLine + word[j];
                    if (ctx.measureText(testCharLine).width > maxWidth && charLine.length > 0) {
                        if (y + lineHeight > maxY) {
                            ctx.fillText(charLine + '...', x, y);
                            return y;
                        }
                        ctx.fillText(charLine, x, y);
                        y += lineHeight;
                        charLine = word[j];
                    } else {
                        charLine = testCharLine;
                    }
                }
                line = charLine + ' ';
            } else {
                line = word + ' ';
            }
        } else {
            line = testLine;
        }
    }

    // Draw remaining text only if within bounds
    if (line.trim().length > 0 && y <= maxY) {
        ctx.fillText(line.trim(), x, y);
    }
    return y;
}

function wrapTextLeft(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    ctx.textAlign = 'left';
    const words = text.split(' ');
    let line = '';
    let testLine = '';

    for (let i = 0; i < words.length; i++) {
        testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
            // Check if next line would exceed boundary
            if (y + lineHeight > maxY) {
                ctx.fillText(line.trim() + '...', x, y);
                return y;
            }
            ctx.fillText(line.trim(), x, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    // Draw remaining text only if within bounds
    if (y <= maxY) {
        ctx.fillText(line.trim(), x, y);
    }
    return y;
}

// Initialize - wait for all resources before showing the page
waitForResources();

// ========================================
// Setup mute button and audio (runs immediately since script is at end of body)
// ========================================
(function setupAudioControls() {
    // Initialize audio element
    const audio = initAudioElement();

    const muteBtn = document.getElementById('muteBtn');

    if (muteBtn) {
        // Handle both click and touch
        function handleMuteClick(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMute(e);
        }

        muteBtn.addEventListener('click', handleMuteClick);
        muteBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            handleMuteClick(e);
        });

        console.log('Mute button initialized');
    }

    // Add audio event listeners for indicator
    if (audio) {
        audio.addEventListener('play', () => {
            console.log('Audio play event');
            updateSoundIndicator(true);
        });
        audio.addEventListener('pause', () => {
            console.log('Audio pause event');
            updateSoundIndicator(false);
        });
        audio.addEventListener('ended', () => {
            console.log('Audio ended event');
            updateSoundIndicator(false);
        });
        audio.addEventListener('error', (e) => {
            console.log('Audio error:', e);
            updateSoundIndicator(false);
        });
    }

    // Add one-time listener to start music on first user interaction
    function startMusicOnInteraction() {
        tryPlayMusic();
        // Remove listeners after first interaction
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
    }

    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('touchstart', startMusicOnInteraction);

    console.log('Audio setup complete - waiting for user interaction');
})();

// =============================================
// Ranking Panel
// =============================================
(function initRankingPanel() {
    const totalCounter = document.getElementById('totalCounter');
    const rankingPanel = document.getElementById('rankingPanel');
    const rankingOverlay = document.getElementById('rankingOverlay');
    const rankingList = document.getElementById('rankingList');

    if (!totalCounter || !rankingPanel || !rankingOverlay) return;

    // Trophy icons for each rank
    const trophyIcons = ['🥇', '🥈', '🥉', '🏅', '🎖️'];

    // Open ranking panel
    totalCounter.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!totalCounter.classList.contains('show')) return;

        rankingPanel.classList.add('show');
        rankingOverlay.classList.add('show');

        // Track ranking panel opened
        if (window.cardCounter) {
            window.cardCounter.trackRankingPanel('opened');
        }

        await loadRankings();
    });

    // Close ranking panel
    rankingOverlay.addEventListener('click', closeRankingPanel);

    function closeRankingPanel() {
        rankingPanel.classList.remove('show');
        rankingOverlay.classList.remove('show');

        // Track ranking panel closed
        if (window.cardCounter) {
            window.cardCounter.trackRankingPanel('closed');
        }
    }

    // Load and display rankings
    async function loadRankings() {
        if (!window.cardCounter || !window.cardCounter.fetchCardRankings) {
            rankingList.innerHTML = '<div class="ranking-loading">ไม่สามารถโหลดข้อมูลได้</div>';
            return;
        }

        rankingList.innerHTML = '<div class="ranking-loading">' + t('common.loading') + '</div>';

        try {
            const rankings = await window.cardCounter.fetchCardRankings(5);

            if (rankings.length === 0) {
                rankingList.innerHTML = '<div class="ranking-loading">ยังไม่มีข้อมูล</div>';
                return;
            }

            // Get total picks for percentage calculation
            const totalPicks = await window.cardCounter.getTotal();
            const totalCount = totalPicks || rankings.reduce((sum, r) => sum + r.count, 0);

            // Get card data from tarotData
            const rankingHTML = rankings.map((rank, index) => {
                const cardData = (tarotData && tarotData.cards) ? tarotData.cards.find(c => c.id == rank.cardId) : null;
                const cardNameRaw = cardData ? cardData.name : `Card ${rank.cardId}`;
                const cardNameDisplay = getCardName(cardNameRaw);
                const cardImage = cardData ? `images/tarot/${cardData.image}` : '';
                const percentage = totalCount > 0 ? ((rank.count / totalCount) * 100).toFixed(1) : 0;

                return `
                    <div class="ranking-item">
                        <span class="ranking-trophy">${trophyIcons[index] || '🎖️'}</span>
                        ${cardImage ? `<img src="${cardImage}" alt="${cardNameDisplay}" class="ranking-card-image">` : ''}
                        <span class="ranking-card-name">${escapeHtml(cardNameDisplay)}</span>
                        <span class="ranking-count">${percentage}%</span>
                    </div>
                `;
            }).join('');

            rankingList.innerHTML = rankingHTML;
        } catch (error) {
            console.error('Error loading rankings:', error);
            rankingList.innerHTML = '<div class="ranking-loading">เกิดข้อผิดพลาด</div>';
        }
    }
})();

// ========================================
// Analytics Page - Secret Access
// ========================================
(function() {
    let brandClickCount = 0;
    let lastClickTime = 0;
    const REQUIRED_CLICKS = 10;
    const CLICK_TIMEOUT = 3000; // Reset if no click within 3 seconds

    // Initialize analytics secret access
    function initAnalyticsAccess() {
        const landingBrand = document.querySelector('.landing-brand');
        if (!landingBrand) return;

        landingBrand.style.cursor = 'pointer';
        landingBrand.addEventListener('click', handleBrandClick);
    }

    function handleBrandClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const now = Date.now();

        // Reset count if too much time passed
        if (now - lastClickTime > CLICK_TIMEOUT) {
            brandClickCount = 0;
        }

        lastClickTime = now;
        brandClickCount++;

        // Subtle feedback
        if (brandClickCount >= 5 && brandClickCount < REQUIRED_CLICKS) {
            e.target.style.transform = `scale(${1 + (brandClickCount * 0.02)})`;
            setTimeout(() => {
                e.target.style.transform = '';
            }, 100);
        }

        // Open analytics when reached
        if (brandClickCount >= REQUIRED_CLICKS) {
            brandClickCount = 0;
            openAnalytics();
        }
    }

    // Open analytics page
    window.openAnalytics = async function() {
        const analyticsPage = document.getElementById('analyticsPage');
        if (!analyticsPage) return;

        // Pause background music
        if (audioElement && !audioElement.paused) {
            audioElement.pause();
        }

        analyticsPage.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Load analytics data
        await loadAnalyticsData();
    };

    // Close analytics page
    window.closeAnalytics = function() {
        const analyticsPage = document.getElementById('analyticsPage');
        if (!analyticsPage) return;

        analyticsPage.classList.remove('show');
        document.body.style.overflow = '';

        // Resume music if was playing
        if (audioElement && !isMuted && musicStarted) {
            audioElement.play().catch(() => {});
        }
    };

    // Load all analytics data
    async function loadAnalyticsData() {
        if (!window.cardCounter || !window.cardCounter.isEnabled()) {
            showAnalyticsError('Firebase ยังไม่ได้เชื่อมต่อ');
            return;
        }

        // Load all data in parallel
        await Promise.all([
            loadOverviewStats(),
            loadTopCards(),
            loadSaveFormatStats(),
            loadShareStats(),
            loadSocialStats(),
            loadJourneyFunnel(),
            loadTimeToPickStats(),
            loadDeviceStats(),
            loadFeatureUsageStats(),
            loadPositionHeatmap(),
            loadScrollDepthStats(),
            loadHotComments()
        ]);
    }

    // Load overview statistics
    async function loadOverviewStats() {
        try {
            const database = firebase.database();

            // Total card picks
            const totalPicks = await window.cardCounter.getTotal();
            document.getElementById('statTotalPicks').textContent =
                totalPicks ? totalPicks.toLocaleString('th-TH') : '0';

            // Total comments
            const commentsCount = await window.cardCounter.getCommentsCount();
            document.getElementById('statTotalComments').textContent =
                commentsCount ? commentsCount.toLocaleString('th-TH') : '0';

            // Total replies
            const repliesSnapshot = await database.ref('replies').once('value');
            let totalReplies = 0;
            if (repliesSnapshot.exists()) {
                repliesSnapshot.forEach(commentReplies => {
                    totalReplies += commentReplies.numChildren();
                });
            }
            document.getElementById('statTotalReplies').textContent =
                totalReplies.toLocaleString('th-TH');

            // Total saves
            const savesSnapshot = await database.ref('buttonClicks/save').once('value');
            let totalSaves = 0;
            if (savesSnapshot.exists()) {
                savesSnapshot.forEach(format => {
                    totalSaves += format.val() || 0;
                });
            }
            document.getElementById('statTotalSaves').textContent =
                totalSaves.toLocaleString('th-TH');

        } catch (error) {
            console.error('Error loading overview stats:', error);
        }
    }

    // Load all 78 cards grid
    async function loadTopCards() {
        const container = document.getElementById('allCardsGrid');
        if (!container) return;

        try {
            const database = firebase.database();
            const snapshot = await database.ref('cardPicks').once('value');
            const data = snapshot.val() || {};

            // Build pick count map
            const pickCounts = {};
            Object.entries(data).forEach(([key, count]) => {
                const cardId = key.replace('card_', '');
                pickCounts[cardId] = count || 0;
            });

            // Get all 78 cards from tarotData
            if (!tarotData || !tarotData.cards) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่โหลดข้อมูลไพ่</div>';
                return;
            }

            // Sort cards by pick count (descending)
            const sortedCards = [...tarotData.cards].sort((a, b) => {
                const countA = pickCounts[a.id] || 0;
                const countB = pickCounts[b.id] || 0;
                return countB - countA;
            });

            let html = '';
            sortedCards.forEach((card, index) => {
                const count = pickCounts[card.id] || 0;
                const cardImage = `images/tarot/${card.image}`;

                // Rank styling for top 3
                let rankBadge = '';
                if (index === 0) rankBadge = '<span class="card-grid-rank gold">1</span>';
                else if (index === 1) rankBadge = '<span class="card-grid-rank silver">2</span>';
                else if (index === 2) rankBadge = '<span class="card-grid-rank bronze">3</span>';

                html += `
                    <div class="card-grid-item" title="${card.name}">
                        ${rankBadge}
                        <img src="${cardImage}" alt="${card.name}" class="card-grid-image">
                        <div class="card-grid-count">${count}</div>
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading all cards:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load save format statistics
    async function loadSaveFormatStats() {
        const container = document.getElementById('saveFormatChart');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('buttonClicks/save').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const formats = [
                { key: 'ig-story', label: 'IG Story', class: 'ig-story' },
                { key: 'square', label: 'IG Post', class: 'square' },
                { key: 'facebook', label: 'Facebook', class: 'facebook' },
                { key: 'wide', label: 'Wide', class: 'wide' }
            ];

            const maxValue = Math.max(...formats.map(f => data[f.key] || 0), 1);

            let html = '<div class="chart-bar-container">';
            formats.forEach(format => {
                const value = data[format.key] || 0;
                const percentage = ((value / maxValue) * 100).toFixed(0);

                html += `
                    <div class="chart-bar-item">
                        <span class="chart-bar-label">${format.label}</span>
                        <div class="chart-bar-track">
                            <div class="chart-bar-fill ${format.class}" style="width: ${percentage}%">
                                <span class="chart-bar-value">${value.toLocaleString('th-TH')}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading save format stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load share platform statistics
    async function loadShareStats() {
        const container = document.getElementById('sharePlatformChart');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('buttonClicks/share').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const platforms = [
                { key: 'messenger', label: 'Messenger', class: 'messenger' },
                { key: 'line', label: 'LINE', class: 'line' },
                { key: 'copy', label: 'Copy Link', class: 'copy' }
            ];

            const maxValue = Math.max(...platforms.map(p => data[p.key] || 0), 1);

            let html = '<div class="chart-bar-container">';
            platforms.forEach(platform => {
                const value = data[platform.key] || 0;
                const percentage = ((value / maxValue) * 100).toFixed(0);

                html += `
                    <div class="chart-bar-item">
                        <span class="chart-bar-label">${platform.label}</span>
                        <div class="chart-bar-track">
                            <div class="chart-bar-fill ${platform.class}" style="width: ${percentage}%">
                                <span class="chart-bar-value">${value.toLocaleString('th-TH')}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading share stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load social link click statistics
    async function loadSocialStats() {
        const container = document.getElementById('socialStatsGrid');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('buttonClicks/social').once('value');
            const data = snapshot.val() || {};

            const igIcon = '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
            const ttIcon = '<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>';
            const fbIcon = '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
            const ytIcon = '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>';
            const lineIcon = '<svg viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>';

            const socials = [
                { key: 'instagram', bkey: 'blessing_instagram', label: 'Instagram', class: 'instagram', icon: igIcon },
                { key: 'tiktok', bkey: 'blessing_tiktok', label: 'TikTok', class: 'tiktok', icon: ttIcon },
                { key: 'facebook', bkey: 'blessing_facebook', label: 'Facebook', class: 'facebook', icon: fbIcon },
                { key: 'youtube', bkey: null, label: 'YouTube', class: 'youtube', icon: ytIcon },
                { key: null, bkey: 'blessing_line', label: 'LINE (Blessing)', class: 'line', icon: lineIcon }
            ];

            let html = '';
            socials.forEach(social => {
                const footerValue = social.key ? (data[social.key] || 0) : 0;
                const blessingValue = social.bkey ? (data[social.bkey] || 0) : 0;
                const totalValue = footerValue + blessingValue;
                const breakdown = social.bkey && social.key ?
                    `<div class="social-breakdown">Footer: ${footerValue} / Blessing: ${blessingValue}</div>` :
                    '';
                html += `
                    <div class="social-stat-card ${social.class}">
                        <div class="social-stat-icon">${social.icon}</div>
                        <div class="social-stat-value">${totalValue.toLocaleString('th-TH')}</div>
                        <div class="social-stat-label">${social.label}</div>
                        ${breakdown}
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading social stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load hot comments
    async function loadHotComments() {
        const container = document.getElementById('hotCommentsList');

        try {
            const hotComments = await window.cardCounter.fetchHotComments(5);

            if (!hotComments || hotComments.length === 0) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีความคิดเห็น</div>';
                return;
            }

            let html = '';
            hotComments.forEach(comment => {
                html += `
                    <div class="hot-comment-card">
                        <div class="hot-comment-header">
                            <span class="hot-comment-user">${escapeHtml(comment.userName || 'Anonymous')}</span>
                            <span class="hot-comment-replies">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 15a4 4 0 0 0 4 4h9a5 5 0 0 0 0-10H9a3 3 0 0 0 0 6h9"/>
                                </svg>
                                ${comment.replyCount || 0} replies
                            </span>
                        </div>
                        <div class="hot-comment-card-name">${escapeHtml(comment.cardName || '')}</div>
                        <div class="hot-comment-text">${escapeHtml(comment.comment || '')}</div>
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading hot comments:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load user journey funnel
    async function loadJourneyFunnel() {
        const container = document.getElementById('journeyFunnel');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/journey').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const steps = [
                { key: 'landing', label: 'Landing Page' },
                { key: 'pick', label: 'Card Pick' },
                { key: 'result', label: 'View Result' }
            ];

            const landingCount = data.landing || 0;

            let html = '';
            steps.forEach(step => {
                const value = data[step.key] || 0;
                const percentage = landingCount > 0 ? ((value / landingCount) * 100).toFixed(1) : 0;
                const barWidth = landingCount > 0 ? (value / landingCount) * 100 : 0;

                html += `
                    <div class="funnel-step" style="--bar-width: ${barWidth}%">
                        <span class="funnel-step-label">${step.label}</span>
                        <span class="funnel-step-value">${value.toLocaleString('th-TH')}</span>
                        <span class="funnel-step-percent">${percentage}%</span>
                    </div>
                `;
            });

            container.innerHTML = html;

            // Apply bar widths after render
            setTimeout(() => {
                container.querySelectorAll('.funnel-step').forEach(el => {
                    const width = el.style.getPropertyValue('--bar-width');
                    el.style.setProperty('--bar-width', width);
                    el.querySelector('::before')?.style?.setProperty('width', width);
                });
            }, 100);

        } catch (error) {
            console.error('Error loading journey funnel:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load time to first pick statistics
    async function loadTimeToPickStats() {
        const container = document.getElementById('timeToPickChart');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/timeToFirstPick').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const buckets = [
                { key: 'instant', label: '< 5s', class: 'instant' },
                { key: 'quick', label: '5-9s', class: 'quick' },
                { key: 'normal', label: '10-29s', class: 'normal' },
                { key: 'medium', label: '30-59s', class: 'medium' },
                { key: 'slow', label: '60s+', class: 'slow' }
            ];

            const maxValue = Math.max(...buckets.map(b => data[b.key] || 0), 1);

            let html = '<div class="chart-bar-container">';
            buckets.forEach(bucket => {
                const value = data[bucket.key] || 0;
                const percentage = ((value / maxValue) * 100).toFixed(0);

                html += `
                    <div class="chart-bar-item">
                        <div class="chart-bar-label">${bucket.label}</div>
                        <div class="chart-bar">
                            <div class="chart-bar-fill ${bucket.class}" style="width: ${percentage}%"></div>
                        </div>
                        <div class="chart-bar-value">${value.toLocaleString('th-TH')}</div>
                    </div>
                `;
            });
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading time to pick stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load device breakdown statistics
    async function loadDeviceStats() {
        const container = document.getElementById('deviceStatsGrid');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/devices').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const devices = [
                {
                    key: 'mobile',
                    label: 'Mobile',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
                },
                {
                    key: 'tablet',
                    label: 'Tablet',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
                },
                {
                    key: 'desktop',
                    label: 'Desktop',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
                }
            ];

            const total = devices.reduce((sum, d) => sum + (data[d.key] || 0), 0);

            let html = '';
            devices.forEach(device => {
                const value = data[device.key] || 0;
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

                html += `
                    <div class="device-stat">
                        <div class="device-icon">${device.icon}</div>
                        <div class="device-name">${device.label}</div>
                        <div class="device-value">${value.toLocaleString('th-TH')}</div>
                        <div class="device-percent">${percentage}%</div>
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading device stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load feature usage statistics
    async function loadFeatureUsageStats() {
        const container = document.getElementById('featureUsageGrid');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/features').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const features = [
                {
                    key: 'music',
                    label: 'Music Control',
                    actions: ['muted', 'unmuted']
                },
                {
                    key: 'commentsPanel',
                    label: 'Comments Panel',
                    actions: ['opened', 'closed', 'tabSwitch_new', 'tabSwitch_hot', 'tabSwitch_mycard', 'tabSwitch_me']
                },
                {
                    key: 'rankingPanel',
                    label: 'Ranking Panel',
                    actions: ['opened', 'closed']
                },
                {
                    key: 'commentForm',
                    label: 'Comment Form',
                    actions: ['started', 'submitted', 'abandoned']
                },
                {
                    key: 'viewCardComments',
                    label: 'View Card Comments (ส่อง)',
                    actions: ['click']
                },
                {
                    key: 'restart',
                    label: 'Restart',
                    actions: ['toLanding']
                },
                {
                    key: 'blessingScreen',
                    label: 'Blessing Screen',
                    actions: ['shown']
                },
                {
                    key: 'reply',
                    label: 'Reply to Comment',
                    actions: ['submitted']
                },
                {
                    key: 'commentCard',
                    label: 'Comment Card',
                    actions: ['expanded']
                },
                {
                    key: 'relatedComment',
                    label: 'Related Comment',
                    actions: ['navigate']
                },
                {
                    key: 'myCardTab',
                    label: 'My Card Tab (ไพ่ฉัน)',
                    actions: ['view']
                }
            ];

            let html = '';
            features.forEach(feature => {
                const featureData = data[feature.key] || {};
                const total = Object.values(featureData).reduce((sum, v) => sum + (v || 0), 0);

                let actionsHtml = '';
                feature.actions.forEach(action => {
                    const value = featureData[action] || 0;
                    actionsHtml += `
                        <div class="feature-action">
                            <span>${action}</span>
                            <span>${value.toLocaleString('th-TH')}</span>
                        </div>
                    `;
                });

                html += `
                    <div class="feature-item">
                        <div class="feature-header">
                            <span class="feature-name">${feature.label}</span>
                            <span class="feature-total">${total.toLocaleString('th-TH')} total</span>
                        </div>
                        <div class="feature-breakdown">
                            ${actionsHtml}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading feature usage stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load position heatmap
    async function loadPositionHeatmap() {
        const container = document.getElementById('positionHeatmap');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/cardPositions').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const positions = [
                { key: 'top', label: 'Top', x: 95, y: 0 },
                { key: 'top-right', label: 'TR', x: 165, y: 30 },
                { key: 'right', label: 'Right', x: 190, y: 95 },
                { key: 'bottom-right', label: 'BR', x: 165, y: 160 },
                { key: 'bottom', label: 'Bottom', x: 95, y: 190 },
                { key: 'bottom-left', label: 'BL', x: 25, y: 160 },
                { key: 'left', label: 'Left', x: 0, y: 95 },
                { key: 'top-left', label: 'TL', x: 25, y: 30 }
            ];

            const total = Object.values(data).reduce((sum, v) => sum + (v || 0), 0);
            const maxValue = Math.max(...Object.values(data), 1);

            let html = '<div class="heatmap-circle">';

            positions.forEach(pos => {
                const value = data[pos.key] || 0;
                const intensity = value / maxValue;
                let heatClass = 'cool';
                if (intensity > 0.7) heatClass = 'hot';
                else if (intensity > 0.4) heatClass = 'warm';

                html += `
                    <div class="heatmap-section ${heatClass}" style="left: ${pos.x}px; top: ${pos.y}px;">
                        <span class="heatmap-section-label">${pos.label}</span>
                        <span class="heatmap-section-value">${value}</span>
                    </div>
                `;
            });

            html += `
                <div class="heatmap-center">
                    <span class="heatmap-center-label">Total</span>
                    <span class="heatmap-center-value">${total.toLocaleString('th-TH')}</span>
                </div>
            `;
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading position heatmap:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load scroll depth statistics
    async function loadScrollDepthStats() {
        const container = document.getElementById('scrollDepthChart');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/interpretationScroll').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const buckets = [
                { key: '0-25', label: '0-25%', class: 'scroll-low' },
                { key: '25-50', label: '25-50%', class: 'scroll-med' },
                { key: '50-75', label: '50-75%', class: 'scroll-high' },
                { key: '75-100', label: '75-100%', class: 'scroll-complete' }
            ];

            const maxValue = Math.max(...buckets.map(b => data[b.key] || 0), 1);

            let html = '<div class="chart-bar-container">';
            buckets.forEach(bucket => {
                const value = data[bucket.key] || 0;
                const percentage = ((value / maxValue) * 100).toFixed(0);

                html += `
                    <div class="chart-bar-item">
                        <div class="chart-bar-label">${bucket.label}</div>
                        <div class="chart-bar">
                            <div class="chart-bar-fill ${bucket.class}" style="width: ${percentage}%"></div>
                        </div>
                        <div class="chart-bar-value">${value.toLocaleString('th-TH')}</div>
                    </div>
                `;
            });
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading scroll depth stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    function showAnalyticsError(message) {
        const content = document.getElementById('analyticsContent');
        if (content) {
            content.innerHTML = `<div class="analytics-empty" style="margin-top: 100px;">${message}</div>`;
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnalyticsAccess);
    } else {
        initAnalyticsAccess();
    }
})();
