/**
 * Card of the Day - Translations Data
 *
 * @description UI text translations for 6 languages
 * @version 1.1.0
 *
 * EXPORTS:
 * - translations: Object with UI strings for each language
 * - cardNameTranslations: Object (empty - card names kept in English)
 *
 * SUPPORTED LANGUAGES:
 * - th: Thai (default)
 * - en: English
 * - zh-CN: Simplified Chinese
 * - zh-TW: Traditional Chinese
 * - ko: Korean
 * - ja: Japanese
 * - fr: French
 *
 * TRANSLATION STRUCTURE:
 * translations[lang].section.key
 *
 * SECTIONS: landing, main, ranking, result, comment, comments,
 *           blessing, toast, common
 *
 * USAGE IN HTML:
 * <span data-i18n="result.drawAgain">จับใหม่</span>
 *
 * USAGE IN JS:
 * translations[currentLang].result.drawAgain
 */

// ========================================
// UI Translations
// ========================================
const translations = {
    th: {
        landing: {
            heading: "Card of the Day",
            tagline: "วันนี้ไพ่มีอะไรจะบอกคุณ",
            loading: "กำลังโหลด...",
            instruction: "จับไพ่ทาโรต์ 1 ใบเพื่อดูดวงประจำวัน",
            clickToDraw: "แตะไพ่เพื่อเริ่มดูดวง",
            heading3: "Past · Present · Future",
            clickToDraw3: "แตะไพ่เพื่อเริ่มจับ 3 ใบ",
            heading4: "Past · Present · Future · Outcome",
            clickToDraw4: "แตะไพ่เพื่อเริ่มจับ 4 ใบ",
            heading10: "จับไพ่ 10 ใบ",
            clickToDraw10: "แตะไพ่เพื่อเริ่มจับ 10 ใบ",
            heading12: "จับไพ่ 12 ใบ",
            clickToDraw12: "แตะไพ่เพื่อเริ่มจับ 12 ใบ",
            comingSoon: "เร็วๆ นี้",
            comingSoonDesc: "อยู่ระหว่างพัฒนา",
            totalDrawsPrefix: "ทำนายแล้ว",
            totalDrawsSuffix: "ครั้ง",
            past: "อดีต",
            present: "ปัจจุบัน",
            future: "อนาคต",
            outcome: "สรุป"
        },
        main: {
            title: "เลือกไพ่ 1 ใบเพื่อรับข้อความประจำวัน",
            instruction: "เลือกไพ่ 1 ใบ เพื่อดูคำทำนาย",
            loadingCards: "กำลังโหลดไพ่..."
        },
        result: {
            saveImage: "เซฟรูป :",
            share: "บอกต่อ :",
            copy: "คัดลอก",
            acceptProphecy: "น้อมรับคำทำนาย",
            prophecyTitle: "คำทำนาย",
            hideSection: "ซ่อน",
            view: "ส่อง",
            notSerious: "ยังไม่เอาจริง",
            drawAgain: "จับใหม่",
            wideImage: "รูปกว้าง",
            messenger: "ส่งทาง Messenger",
            line: "ส่งทาง LINE",
            copyLink: "คัดลอกลิงก์",
            tapToContinue: "แตะเพื่อดูคำทำนาย"
        },
        comment: {
            yourName: "ชื่อของคุณ",
            namePlaceholder: "ใส่ชื่อ (ไม่เกิน 15 ตัวอักษร)",
            label: "ความคิดเห็น",
            placeholder: "น้อมรับคำทำนายจากแม่หมอพิมพ์ฟ้า",
            submit: "น้อมรับคำทำนาย",
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
            tabDraws: "ไพ่ที่จับ",
            tabFeed: "วงไพ่",
            tabActivity: "กิจกรรม",
            tabFriends: "เพื่อน",
            empty: "ยังไม่มีความคิดเห็น",
            myComments: "ความคิดเห็นของฉัน",
            repliedTo: "ที่ฉันเคยตอบ",
            noComments: "ยังไม่ได้แสดงความคิดเห็น",
            goComment: "ไปแสดงความคิดเห็นบนไพ่ของคนอื่นกันเลย!",
            viewLatest: "ดูความคิดเห็นล่าสุด"
        },
        blessing: {
            wantMore: "อยากรู้เพิ่มเติม",
            horoscopeCheck: "ตรวจลัคนาราศี",
            addLine: "แอดไลน์ @Pimfah",
            freeBadge: "ฟรี",
            restart: "เริ่มใหม่",
            seeWhatFriendsDraw: "ดูว่าเพื่อนจับไพ่อะไร",
            loginToSee: "ล็อกอินเพื่อดูไพ่ของเพื่อนและบันทึกประวัติ"
        },
        login: {
            required: "ล็อกอิน Facebook เพื่อใช้ฟีเจอร์นี้",
            loginBtn: "เข้าสู่ระบบด้วย Facebook",
            saveDraws: "เข้าสู่ระบบเพื่อบันทึกไพ่ที่จับได้",
            saveDrawsSub: "ไพ่ทุกใบจะถูกบันทึกไว้ให้คุณย้อนดูได้เสมอ"
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
            replyCount: "ตอบกลับ",
            social: "โซเชียล"
        },
        time: {
            justNow: "เมื่อสักครู่",
            minutesAgo: "นาทีที่แล้ว",
            hoursAgo: "ชั่วโมงที่แล้ว",
            daysAgo: "วันที่แล้ว"
        },
        share: {
            gotCard: "ฉันจับได้ไพ่",
            letsRead: "มาจับไพ่ทาโรต์รายวันกัน!",
            title: "ไพ่ทาโรต์รายวัน",
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
            noDrawsYet: "ยังไม่ได้จับไพ่ในวันนี้",
            goDrawSub: "มาดูกันว่าดวงวันนี้จะเป็นอย่างไร",
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
        },
        profile: {
            editName: "เปลี่ยนชื่อ",
            editNamePrompt: "ใส่ชื่อใหม่:",
            drawHistory: "ประวัติการจับไพ่",
            logout: "ออกจากระบบ"
        },
        draws: {
            empty: "ยังไม่ได้จับไพ่",
            emptyHint: "จับไพ่เพื่อบันทึกประวัติ"
        },
        feed: {
            drewCard: "จับไพ่",
            empty: "ยังไม่มีเรื่องเล่าจากวงไพ่"
        },
        activity: {
            drewCard: "จับไพ่",
            commented: "แสดงความคิดเห็นบนไพ่",
            repliedTo: "ตอบกลับ",
            empty: "ยังไม่มีกิจกรรม",
            emptyHint: "จับไพ่เพื่อเริ่มบันทึกกิจกรรม"
        },
        friends: {
            empty: "ยังไม่มีเพื่อนที่ใช้แอพนี้",
            emptyHint: "ชวนเพื่อนมาจับไพ่ด้วยกัน!",
            inviteBtn: "ชวนเพื่อนมาดูดวง",
            inviteMsg: "มาจับไพ่ทาโรต์รายวันกัน! ดูดวงความรักและรับข้อความจากจักรวาล ✨🔮",
            reconnect: "เซสชัน Facebook หมดอายุ",
            reconnectHint: "กรุณาเชื่อมต่อใหม่เพื่อดูการ์ดของเพื่อน",
            reconnectBtn: "เชื่อมต่อ Facebook อีกครั้ง",
            newCards: "เพื่อนจับไพ่ใหม่",
            markAllRead: "อ่านทั้งหมดแล้ว",
            newBadge: "NEW"
        },
        category: {
            title: "เลือกหมวดที่ต้องการดูดวง",
            subtitle: "เลือก 1 หมวดเพื่อรับคำทำนายเฉพาะด้าน",
            love: "ความรัก",
            loveDesc: "ความสัมพันธ์ คนรัก คู่ครอง",
            work: "การงาน",
            workDesc: "หน้าที่ อาชีพ ความก้าวหน้า",
            finance: "การเงิน",
            financeDesc: "รายได้ ทรัพย์สิน โชคลาภ",
            back: "กลับ"
        },
        reveal: {
            tapToReveal: "แตะเพื่อเปิดไพ่",
            tapToContinue: "แตะเพื่อดูคำทำนาย",
            skip: "ข้าม ›"
        }
    },
    en: {
        landing: {
            heading: "Card of the Day",
            tagline: "The universe has a message for you",
            loading: "Loading...",
            instruction: "Draw a tarot card to reveal today's message",
            clickToDraw: "Tap card to draw",
            heading3: "Past · Present · Future",
            clickToDraw3: "Tap to draw 3 cards",
            heading4: "Past · Present · Future · Outcome",
            clickToDraw4: "Tap to draw 4 cards",
            heading10: "10-Card Draw",
            clickToDraw10: "Tap to draw 10 cards",
            heading12: "12-Card Draw",
            clickToDraw12: "Tap to draw 12 cards",
            comingSoon: "Coming Soon",
            comingSoonDesc: "Under development",
            totalDrawsPrefix: "",
            totalDrawsSuffix: "readings so far",
            past: "Past",
            present: "Present",
            future: "Future",
            outcome: "Outcome"
        },
        main: {
            title: "Pick a card to reveal today's message",
            instruction: "Pick 1 card to see your fortune",
            loadingCards: "Loading cards..."
        },
        result: {
            saveImage: "Save Image:",
            share: "Share:",
            copy: "Copy",
            acceptProphecy: "Accept the Prophecy",
            prophecyTitle: "Prophecy",
            hideSection: "Hide",
            view: "View",
            notSerious: "I drew it by accident",
            drawAgain: "Draw Again",
            wideImage: "Wide image",
            messenger: "Share via Messenger",
            line: "Share via LINE",
            copyLink: "Copy link",
            tapToContinue: "Tap to see your reading"
        },
        comment: {
            yourName: "Your Name",
            namePlaceholder: "Enter name (max 15 chars)",
            label: "Comment",
            placeholder: "Accept the prophecy from fortune teller",
            submit: "Accept the Prophecy",
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
            tabDraws: "My Draws",
            tabFeed: "Feed",
            tabActivity: "Activity",
            tabFriends: "Friends",
            empty: "No comments yet",
            myComments: "My Comments",
            repliedTo: "Replied To",
            noComments: "No comments yet",
            goComment: "Go comment on other's cards!",
            viewLatest: "View Latest Comments"
        },
        blessing: {
            wantMore: "Want to know more?",
            horoscopeCheck: "Check Your Horoscope",
            addLine: "Add LINE @Pimfah",
            freeBadge: "FREE",
            restart: "Start Over",
            seeWhatFriendsDraw: "See what your friends draw",
            loginToSee: "Login to see your friends' cards and save your history"
        },
        login: {
            required: "Login with Facebook to use this feature",
            loginBtn: "Login with Facebook",
            saveDraws: "Login to save your card draws",
            saveDrawsSub: "Every card you draw will be saved for you to revisit anytime"
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
            replyCount: "replies",
            social: "Social"
        },
        time: {
            justNow: "Just now",
            minutesAgo: "minutes ago",
            hoursAgo: "hours ago",
            daysAgo: "days ago"
        },
        share: {
            gotCard: "I got the card",
            letsRead: "Draw your daily tarot card!",
            title: "Card of the Day - Daily Tarot",
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
            noDrawsYet: "You haven't drawn a card today",
            goDrawSub: "Let's see what fortune awaits you",
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
        },
        profile: {
            editName: "Change Name",
            editNamePrompt: "Enter new display name:",
            drawHistory: "Draw History",
            logout: "Logout"
        },
        draws: {
            empty: "No cards drawn yet",
            emptyHint: "Draw a card to start your history"
        },
        feed: {
            drewCard: "drew",
            empty: "No stories from the card circle yet"
        },
        activity: {
            drewCard: "Drew a card",
            commented: "Commented on",
            repliedTo: "Replied to",
            empty: "No activity yet",
            emptyHint: "Draw a card to start recording activity"
        },
        friends: {
            empty: "None of your friends are using this app yet",
            emptyHint: "Invite friends to draw cards together!",
            inviteBtn: "Invite Friends",
            inviteMsg: "Draw your daily tarot card! Discover love predictions and receive messages from the universe ✨🔮",
            reconnect: "Facebook session expired",
            reconnectHint: "Please reconnect to see your friends' cards",
            reconnectBtn: "Reconnect Facebook",
            newCards: "Friends drew new cards",
            markAllRead: "Mark all read",
            newBadge: "NEW"
        },
        category: {
            title: "Choose your reading category",
            subtitle: "Select a focus area for your fortune",
            love: "Love",
            loveDesc: "Romance, relationships & soulmates",
            work: "Work",
            workDesc: "Career, ambition & growth",
            finance: "Finance",
            financeDesc: "Wealth, fortune & prosperity",
            back: "Back"
        },
        reveal: {
            tapToReveal: "Tap to reveal",
            tapToContinue: "Tap to see your reading",
            skip: "Skip ›"
        }
    },
    "zh-CN": {
        landing: {
            heading: "Card of the Day",
            tagline: "今天的牌 有话对你说",
            loading: "加载中...",
            instruction: "抽一张塔罗牌，揭示今日讯息",
            clickToDraw: "点击抽牌",
            heading3: "Past · Present · Future",
            clickToDraw3: "点击抽取3张牌",
            heading4: "Past · Present · Future · Outcome",
            clickToDraw4: "点击抽取4张牌",
            heading10: "十牌占卜",
            clickToDraw10: "点击抽取10张牌",
            heading12: "十二牌占卜",
            clickToDraw12: "点击抽取12张牌",
            comingSoon: "即将推出",
            comingSoonDesc: "开发中",
            totalDrawsPrefix: "已占卜",
            totalDrawsSuffix: "次",
            past: "过去",
            present: "现在",
            future: "未来",
            outcome: "结果"
        },
        main: {
            title: "选一张牌揭示今日讯息",
            instruction: "选择1张牌看你的运势",
            loadingCards: "加载牌中..."
        },
        result: {
            saveImage: "保存图片：",
            share: "分享：",
            copy: "复制",
            acceptProphecy: "接受预言",
            prophecyTitle: "预言",
            hideSection: "隐藏",
            view: "查看",
            notSerious: "手滑了啦~",
            drawAgain: "重新抽牌",
            wideImage: "宽图",
            messenger: "分享到Messenger",
            line: "分享到LINE",
            copyLink: "复制链接",
            tapToContinue: "点击查看解读"
        },
        comment: {
            yourName: "你的名字",
            namePlaceholder: "输入名字（最多15字）",
            label: "评论",
            placeholder: "接受占卜师的预言",
            submit: "接受预言",
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
            tabDraws: "抽牌记录",
            tabFeed: "牌圈",
            tabActivity: "动态",
            tabFriends: "好友",
            empty: "暂无评论",
            myComments: "我的评论",
            repliedTo: "我回复的",
            noComments: "暂无评论",
            goComment: "去给别人的牌评论吧！",
            viewLatest: "查看最新评论"
        },
        blessing: {
            wantMore: "想了解更多？",
            horoscopeCheck: "查看星座运势",
            addLine: "加LINE @Pimfah",
            freeBadge: "免费",
            restart: "重新开始",
            seeWhatFriendsDraw: "看看朋友抽到了什么牌",
            loginToSee: "登录查看朋友的牌并保存历史记录"
        },
        login: {
            required: "请登录Facebook使用此功能",
            loginBtn: "用Facebook登录",
            saveDraws: "登录以保存您抽到的牌",
            saveDrawsSub: "每一张牌都会被保存，随时可以回顾"
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
            replyCount: "回复",
            social: "社交"
        },
        time: {
            justNow: "刚刚",
            minutesAgo: "分钟前",
            hoursAgo: "小时前",
            daysAgo: "天前"
        },
        share: {
            gotCard: "我抽到了",
            letsRead: "一起来抽每日塔罗牌吧！",
            title: "每日塔罗牌",
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
            noDrawsYet: "今天还没有抽牌",
            goDrawSub: "来看看今天的运势如何",
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
        },
        profile: {
            editName: "更改名字",
            editNamePrompt: "输入新名字：",
            drawHistory: "抽牌记录",
            logout: "退出登录"
        },
        draws: {
            empty: "还没有抽过牌",
            emptyHint: "抽一张牌开始记录"
        },
        feed: {
            drewCard: "抽了",
            empty: "牌圈还没有故事"
        },
        activity: {
            drewCard: "抽了一张牌",
            commented: "评论了",
            repliedTo: "回复了",
            empty: "还没有动态",
            emptyHint: "抽一张牌开始记录动态"
        },
        friends: {
            empty: "还没有好友在使用这个应用",
            emptyHint: "邀请好友一起来抽牌吧！",
            inviteBtn: "邀请好友",
            inviteMsg: "一起来抽每日塔罗牌吧！探索爱情运势，接收来自宇宙的讯息 ✨🔮",
            reconnect: "Facebook会话已过期",
            reconnectHint: "请重新连接以查看好友的卡牌",
            reconnectBtn: "重新连接Facebook",
            newCards: "好友抽了新牌",
            markAllRead: "全部已读",
            newBadge: "NEW"
        },
        category: {
            title: "选择您的占卜类别",
            subtitle: "选择一个方面来获取预言",
            love: "爱情",
            loveDesc: "恋爱、缘分、伴侣关系",
            work: "事业",
            workDesc: "职业、前途、发展方向",
            finance: "财运",
            financeDesc: "收入、财富、好运降临",
            back: "返回"
        },
        reveal: {
            tapToReveal: "点击翻牌",
            tapToContinue: "点击查看解读",
            skip: "跳过 ›"
        }
    },
    "zh-TW": {
        landing: {
            heading: "Card of the Day",
            tagline: "今天的牌 有話對你說",
            loading: "載入中...",
            instruction: "抽一張塔羅牌，揭示今日訊息",
            clickToDraw: "點擊抽牌",
            heading3: "Past · Present · Future",
            clickToDraw3: "點擊抽取3張牌",
            heading4: "Past · Present · Future · Outcome",
            clickToDraw4: "點擊抽取4張牌",
            heading10: "十牌占卜",
            clickToDraw10: "點擊抽取10張牌",
            heading12: "十二牌占卜",
            clickToDraw12: "點擊抽取12張牌",
            comingSoon: "即將推出",
            comingSoonDesc: "開發中",
            totalDrawsPrefix: "已占卜",
            totalDrawsSuffix: "次",
            past: "過去",
            present: "現在",
            future: "未來",
            outcome: "結果"
        },
        main: {
            title: "選一張牌揭示今日訊息",
            instruction: "選擇1張牌看你的運勢",
            loadingCards: "載入牌中..."
        },
        result: {
            saveImage: "儲存圖片：",
            share: "分享：",
            copy: "複製",
            acceptProphecy: "接受預言",
            prophecyTitle: "預言",
            hideSection: "隱藏",
            view: "查看",
            notSerious: "手滑了啦~",
            drawAgain: "重新抽牌",
            wideImage: "寬圖",
            messenger: "分享到Messenger",
            line: "分享到LINE",
            copyLink: "複製連結",
            tapToContinue: "點擊查看解讀"
        },
        comment: {
            yourName: "你的名字",
            namePlaceholder: "輸入名字（最多15字）",
            label: "評論",
            placeholder: "接受占卜師的預言",
            submit: "接受預言",
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
            tabDraws: "抽牌紀錄",
            tabFeed: "牌圈",
            tabActivity: "動態",
            tabFriends: "好友",
            empty: "暫無評論",
            myComments: "我的評論",
            repliedTo: "我回覆的",
            noComments: "暫無評論",
            goComment: "去給別人的牌評論吧！",
            viewLatest: "查看最新評論"
        },
        blessing: {
            wantMore: "想了解更多？",
            horoscopeCheck: "查看星座運勢",
            addLine: "加LINE @Pimfah",
            freeBadge: "免費",
            restart: "重新開始",
            seeWhatFriendsDraw: "看看朋友抽到了什麼牌",
            loginToSee: "登入查看朋友的牌並儲存歷史記錄"
        },
        login: {
            required: "請登入Facebook使用此功能",
            loginBtn: "用Facebook登入",
            saveDraws: "登入以儲存您抽到的牌",
            saveDrawsSub: "每一張牌都會被儲存，隨時可以回顧"
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
            replyCount: "回覆",
            social: "社交"
        },
        time: {
            justNow: "剛剛",
            minutesAgo: "分鐘前",
            hoursAgo: "小時前",
            daysAgo: "天前"
        },
        share: {
            gotCard: "我抽到了",
            letsRead: "一起來抽每日塔羅牌吧！",
            title: "每日塔羅牌",
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
            noDrawsYet: "今天還沒有抽牌",
            goDrawSub: "來看看今天的運勢如何",
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
        },
        profile: {
            editName: "更改名字",
            editNamePrompt: "輸入新名字：",
            drawHistory: "抽牌紀錄",
            logout: "登出"
        },
        draws: {
            empty: "還沒有抽過牌",
            emptyHint: "抽一張牌開始紀錄"
        },
        feed: {
            drewCard: "抽了",
            empty: "牌圈還沒有故事"
        },
        activity: {
            drewCard: "抽了一張牌",
            commented: "評論了",
            repliedTo: "回覆了",
            empty: "還沒有動態",
            emptyHint: "抽一張牌開始紀錄動態"
        },
        friends: {
            empty: "還沒有好友在使用這個應用",
            emptyHint: "邀請好友一起來抽牌吧！",
            inviteBtn: "邀請好友",
            inviteMsg: "一起來抽每日塔羅牌吧！探索愛情運勢，接收來自宇宙的訊息 ✨🔮",
            reconnect: "Facebook會話已過期",
            reconnectHint: "請重新連接以查看好友的卡牌",
            reconnectBtn: "重新連接Facebook",
            newCards: "好友抽了新牌",
            markAllRead: "全部已讀",
            newBadge: "NEW"
        },
        category: {
            title: "選擇您的占卜類別",
            subtitle: "選擇一個方面來獲取預言",
            love: "愛情",
            loveDesc: "戀愛、緣分、伴侶關係",
            work: "事業",
            workDesc: "職業、前途、發展方向",
            finance: "財運",
            financeDesc: "收入、財富、好運降臨",
            back: "返回"
        },
        reveal: {
            tapToReveal: "點擊翻牌",
            tapToContinue: "點擊查看解讀",
            skip: "跳過 ›"
        }
    },
    ko: {
        landing: {
            heading: "Card of the Day",
            tagline: "오늘의 카드가 당신에게 전하는 이야기",
            loading: "로딩 중...",
            instruction: "타로 카드를 뽑아 오늘의 메시지를 확인하세요",
            clickToDraw: "카드를 탭하여 뽑기",
            heading3: "Past · Present · Future",
            clickToDraw3: "탭하여 3장 뽑기",
            heading4: "Past · Present · Future · Outcome",
            clickToDraw4: "탭하여 4장 뽑기",
            heading10: "10카드 드로우",
            clickToDraw10: "탭하여 10장 뽑기",
            heading12: "12카드 드로우",
            clickToDraw12: "탭하여 12장 뽑기",
            comingSoon: "곧 출시",
            comingSoonDesc: "개발 중",
            totalDrawsPrefix: "",
            totalDrawsSuffix: "회 리딩 완료",
            past: "과거",
            present: "현재",
            future: "미래",
            outcome: "결과"
        },
        main: {
            title: "카드를 선택하여 오늘의 메시지를 확인하세요",
            instruction: "운세를 보려면 카드 1장을 선택하세요",
            loadingCards: "카드 로딩 중..."
        },
        result: {
            saveImage: "이미지 저장:",
            share: "공유:",
            copy: "복사",
            acceptProphecy: "예언 받아들이기",
            prophecyTitle: "예언",
            hideSection: "숨기기",
            view: "보기",
            notSerious: "실수로 뽑았어요~",
            drawAgain: "다시 뽑기",
            wideImage: "와이드 이미지",
            messenger: "메신저로 공유",
            line: "LINE으로 공유",
            copyLink: "링크 복사",
            tapToContinue: "탭하여 해석 보기"
        },
        comment: {
            yourName: "이름",
            namePlaceholder: "이름 입력 (최대 15자)",
            label: "댓글",
            placeholder: "점술사의 예언을 받아들이세요",
            submit: "예언 받아들이기",
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
            tabDraws: "뽑은 카드",
            tabFeed: "피드",
            tabActivity: "활동",
            tabFriends: "친구",
            empty: "댓글이 없습니다",
            myComments: "내 댓글",
            repliedTo: "내가 답글 단",
            noComments: "댓글이 없습니다",
            goComment: "다른 사람의 카드에 댓글을 달아보세요!",
            viewLatest: "최신 댓글 보기"
        },
        blessing: {
            wantMore: "더 알고 싶으세요?",
            horoscopeCheck: "별자리 운세 확인",
            addLine: "LINE @Pimfah 추가",
            freeBadge: "무료",
            restart: "다시 시작",
            seeWhatFriendsDraw: "친구들이 어떤 카드를 뽑았는지 확인하세요",
            loginToSee: "로그인하여 친구의 카드를 보고 기록을 저장하세요"
        },
        login: {
            required: "이 기능을 사용하려면 Facebook으로 로그인하세요",
            loginBtn: "Facebook으로 로그인",
            saveDraws: "카드 기록을 저장하려면 로그인하세요",
            saveDrawsSub: "뽑은 카드가 모두 저장되어 언제든 다시 볼 수 있어요"
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
            replyCount: "답글",
            social: "소셜"
        },
        time: {
            justNow: "방금 전",
            minutesAgo: "분 전",
            hoursAgo: "시간 전",
            daysAgo: "일 전"
        },
        share: {
            gotCard: "나는",
            letsRead: "오늘의 타로 카드를 뽑아보세요!",
            title: "오늘의 타로 카드",
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
            noDrawsYet: "오늘 아직 카드를 뽑지 않았어요",
            goDrawSub: "오늘의 운세를 확인해 보세요",
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
        },
        profile: {
            editName: "이름 변경",
            editNamePrompt: "새 이름을 입력하세요:",
            drawHistory: "뽑은 카드 기록",
            logout: "로그아웃"
        },
        draws: {
            empty: "아직 카드를 뽑지 않았습니다",
            emptyHint: "카드를 뽑아 기록을 시작하세요"
        },
        feed: {
            drewCard: "뽑았어요",
            empty: "아직 카드 이야기가 없습니다"
        },
        activity: {
            drewCard: "카드를 뽑았습니다",
            commented: "댓글을 남겼습니다",
            repliedTo: "답글을 남겼습니다",
            empty: "아직 활동이 없습니다",
            emptyHint: "카드를 뽑아 활동을 시작하세요"
        },
        friends: {
            empty: "아직 이 앱을 사용하는 친구가 없습니다",
            emptyHint: "친구를 초대해서 함께 카드를 뽑아보세요!",
            inviteBtn: "친구 초대하기",
            inviteMsg: "매일 타로 카드를 뽑아보세요! 사랑 운세를 알아보고 우주의 메시지를 받아보세요 ✨🔮",
            reconnect: "Facebook 세션이 만료되었습니다",
            reconnectHint: "친구의 카드를 보려면 다시 연결해주세요",
            reconnectBtn: "Facebook 다시 연결",
            newCards: "친구가 새 카드를 뽑았어요",
            markAllRead: "모두 읽음",
            newBadge: "NEW"
        },
        category: {
            title: "운세 카테고리를 선택하세요",
            subtitle: "하나의 영역을 선택하여 운세를 받으세요",
            love: "연애",
            loveDesc: "사랑, 인연, 소울메이트",
            work: "직장",
            workDesc: "커리어, 성장, 목표 달성",
            finance: "재물",
            financeDesc: "수입, 재산, 행운의 기회",
            back: "뒤로"
        },
        reveal: {
            tapToReveal: "탭하여 카드 공개",
            tapToContinue: "탭하여 해석 보기",
            skip: "건너뛰기 ›"
        }
    },
    ja: {
        landing: {
            heading: "Card of the Day",
            tagline: "今日のカードがあなたに届けるメッセージ",
            loading: "読み込み中...",
            instruction: "タロットカードを引いて今日のメッセージを受け取りましょう",
            clickToDraw: "カードをタップして引く",
            heading3: "Past · Present · Future",
            clickToDraw3: "タップして3枚引く",
            heading4: "Past · Present · Future · Outcome",
            clickToDraw4: "タップして4枚引く",
            heading10: "10カードドロー",
            clickToDraw10: "タップして10枚引く",
            heading12: "12カードドロー",
            clickToDraw12: "タップして12枚引く",
            comingSoon: "近日公開",
            comingSoonDesc: "開発中",
            totalDrawsPrefix: "",
            totalDrawsSuffix: "回の鑑定済み",
            past: "過去",
            present: "現在",
            future: "未来",
            outcome: "結果"
        },
        main: {
            title: "カードを選んで今日のメッセージを受け取る",
            instruction: "運勢を見るためにカードを1枚選んでください",
            loadingCards: "カードを読み込み中..."
        },
        result: {
            saveImage: "画像を保存：",
            share: "シェア：",
            copy: "コピー",
            acceptProphecy: "予言を受け入れる",
            prophecyTitle: "予言",
            hideSection: "隠す",
            view: "見る",
            notSerious: "手が滑った~",
            drawAgain: "もう一度引く",
            wideImage: "ワイド画像",
            messenger: "メッセンジャーでシェア",
            line: "LINEでシェア",
            copyLink: "リンクをコピー",
            tapToContinue: "タップして占い結果を見る"
        },
        comment: {
            yourName: "名前",
            namePlaceholder: "名前を入力（最大15文字）",
            label: "コメント",
            placeholder: "占い師の予言を受け入れる",
            submit: "予言を受け入れる",
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
            tabDraws: "引いたカード",
            tabFeed: "フィード",
            tabActivity: "アクティビティ",
            tabFriends: "友達",
            empty: "コメントはまだありません",
            myComments: "私のコメント",
            repliedTo: "返信した",
            noComments: "コメントはまだありません",
            goComment: "他の人のカードにコメントしよう！",
            viewLatest: "最新コメントを見る"
        },
        blessing: {
            wantMore: "もっと知りたい？",
            horoscopeCheck: "星座占いをチェック",
            addLine: "LINE @Pimfah を追加",
            freeBadge: "無料",
            restart: "やり直す",
            seeWhatFriendsDraw: "友達が何のカードを引いたか見てみよう",
            loginToSee: "ログインして友達のカードを見たり履歴を保存しよう"
        },
        login: {
            required: "この機能を使うにはFacebookでログインしてください",
            loginBtn: "Facebookでログイン",
            saveDraws: "カードの記録を保存するにはログイン",
            saveDrawsSub: "引いたカードはすべて保存され、いつでも振り返れます"
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
            replyCount: "返信",
            social: "ソーシャル"
        },
        time: {
            justNow: "たった今",
            minutesAgo: "分前",
            hoursAgo: "時間前",
            daysAgo: "日前"
        },
        share: {
            gotCard: "私のカードは",
            letsRead: "今日のタロットカードを引いてみよう！",
            title: "今日のタロットカード",
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
            noDrawsYet: "今日はまだカードを引いていません",
            goDrawSub: "今日の運勢を見てみましょう",
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
        },
        profile: {
            editName: "名前を変更",
            editNamePrompt: "新しい名前を入力：",
            drawHistory: "引いたカードの記録",
            logout: "ログアウト"
        },
        draws: {
            empty: "まだカードを引いていません",
            emptyHint: "カードを引いて記録を始めましょう"
        },
        feed: {
            drewCard: "を引きました",
            empty: "まだカードの物語がありません"
        },
        activity: {
            drewCard: "カードを引きました",
            commented: "コメントしました",
            repliedTo: "返信しました",
            empty: "まだアクティビティがありません",
            emptyHint: "カードを引いてアクティビティを始めましょう"
        },
        friends: {
            empty: "まだこのアプリを使っている友達がいません",
            emptyHint: "友達を招待して一緒にカードを引きましょう！",
            inviteBtn: "友達を招待",
            inviteMsg: "毎日タロットカードを引いてみよう！恋愛運を占って、宇宙からのメッセージを受け取ろう ✨🔮",
            reconnect: "Facebookセッションが期限切れです",
            reconnectHint: "友達のカードを見るには再接続してください",
            reconnectBtn: "Facebookに再接続",
            newCards: "友達が新しいカードを引きました",
            markAllRead: "すべて既読",
            newBadge: "NEW"
        },
        category: {
            title: "占いのカテゴリーを選択",
            subtitle: "1つの分野を選んで運勢を見る",
            love: "恋愛",
            loveDesc: "恋、縁結び、パートナー",
            work: "仕事",
            workDesc: "キャリア、成長、目標達成",
            finance: "金運",
            financeDesc: "収入、財産、幸運の到来",
            back: "戻る"
        },
        reveal: {
            tapToReveal: "タップしてカードを開く",
            tapToContinue: "タップして占い結果を見る",
            skip: "スキップ ›"
        }
    },
    fr: {
        landing: {
            heading: "Card of the Day",
            tagline: "L'univers a un message pour vous",
            loading: "Chargement...",
            instruction: "Tirez une carte de tarot pour découvrir le message du jour",
            clickToDraw: "Touchez la carte pour tirer",
            heading3: "Past · Present · Future",
            clickToDraw3: "Touchez pour tirer 3 cartes",
            heading4: "Past · Present · Future · Outcome",
            clickToDraw4: "Touchez pour tirer 4 cartes",
            heading10: "Tirage 10 Cartes",
            clickToDraw10: "Touchez pour tirer 10 cartes",
            heading12: "Tirage 12 Cartes",
            clickToDraw12: "Touchez pour tirer 12 cartes",
            comingSoon: "Bientôt",
            comingSoonDesc: "En développement",
            totalDrawsPrefix: "",
            totalDrawsSuffix: "tirages effectués",
            past: "Passé",
            present: "Présent",
            future: "Futur",
            outcome: "Issue"
        },
        main: {
            title: "Choisissez une carte pour le message du jour",
            instruction: "Choisissez 1 carte pour voir votre prédiction",
            loadingCards: "Chargement des cartes..."
        },
        result: {
            saveImage: "Enregistrer :",
            share: "Partager :",
            copy: "Copier",
            acceptProphecy: "Accepter la prophétie",
            prophecyTitle: "Prophétie",
            hideSection: "Masquer",
            view: "Voir",
            notSerious: "Oups, main glissée~",
            drawAgain: "Retirer",
            wideImage: "Image large",
            messenger: "Partager via Messenger",
            line: "Partager via LINE",
            copyLink: "Copier le lien",
            tapToContinue: "Appuyez pour voir votre tirage"
        },
        comment: {
            yourName: "Votre nom",
            namePlaceholder: "Entrez votre nom (max 15 caractères)",
            label: "Commentaire",
            placeholder: "Acceptez la prophétie de la voyante Pimfah",
            submit: "Accepter la prophétie",
            sending: "Envoi en cours...",
            reply: "Répondre",
            replyPlaceholder: "Écrivez votre réponse...",
            sendReply: "Envoyer"
        },
        comments: {
            title: "Histoires du cercle de tarot ✦",
            tabNew: "Récent",
            tabHot: "Populaire",
            tabMyCard: "Ma carte",
            tabMine: "Mes posts",
            tabDraws: "Mes tirages",
            tabFeed: "Fil",
            tabActivity: "Activité",
            tabFriends: "Amis",
            empty: "Pas encore de commentaires",
            myComments: "Mes commentaires",
            repliedTo: "Commentaires auxquels j'ai répondu",
            noComments: "Vous n'avez pas encore commenté",
            goComment: "Allez commenter les cartes des autres !",
            viewLatest: "Voir les derniers commentaires"
        },
        blessing: {
            wantMore: "En savoir plus",
            horoscopeCheck: "Vérifiez votre horoscope",
            addLine: "Ajoutez LINE @Pimfah",
            freeBadge: "GRATUIT",
            restart: "Recommencer",
            seeWhatFriendsDraw: "Voyez ce que vos amis ont tiré",
            loginToSee: "Connectez-vous pour voir les cartes de vos amis et sauvegarder votre historique"
        },
        login: {
            required: "Connectez-vous avec Facebook pour utiliser cette fonctionnalité",
            loginBtn: "Se connecter avec Facebook",
            saveDraws: "Connectez-vous pour sauvegarder vos tirages",
            saveDrawsSub: "Chaque carte tirée sera conservée pour que vous puissiez la revisiter"
        },
        toast: {
            copied: "Lien copié !",
            replySuccess: "Réponse envoyée",
            submitSuccess: "Envoyé avec succès !",
            error: "Erreur, veuillez réessayer",
            systemNotReady: "Système pas prêt, réessayez"
        },
        common: {
            loading: "Chargement...",
            prophecy: "Prophétie",
            replies: "Réponses",
            beFirstReply: "✦ Soyez le premier à répondre",
            otherComments: "Autres commentaires sur cette carte",
            loadError: "Impossible de charger les commentaires",
            noHotComments: "Pas encore de commentaires populaires",
            tryReply: "Essayez de répondre à un commentaire !",
            replyCount: "réponses",
            social: "Social"
        },
        time: {
            justNow: "À l'instant",
            minutesAgo: "minutes",
            hoursAgo: "heures",
            daysAgo: "jours"
        },
        share: {
            gotCard: "J'ai tiré la carte",
            letsRead: "Tirez votre carte du jour !",
            title: "Carte du Jour - Tarot quotidien",
            copiedForMessenger: "Texte copié ! Collez dans Messenger",
            copiedText: "Texte copié !"
        },
        image: {
            selectFirst: "Veuillez d'abord choisir une carte",
            creating: "Création de l'image...",
            saved: "Image enregistrée !"
        },
        sections: {
            popular: "✦ Populaire",
            recent: "✦ Récent"
        },
        cta: {
            notAccepted: "Prophétie pas encore acceptée",
            drawToReceive: "Tirez une carte pour recevoir la prédiction de la voyante Pimfah",
            goDrawCard: "Allons tirer une carte !",
            noDrawsYet: "Vous n'avez pas encore tiré de carte aujourd'hui",
            goDrawSub: "Voyons ce que le destin vous réserve",
            acceptFirst: "Soyez le premier à accepter",
            beFirstComment: "Pas encore de commentaires<br>Soyez le premier à commenter !"
        },
        error: {
            cardLoadFailed: "Impossible de charger les données",
            cardNotFound: "Carte introuvable",
            noInterpretation: "Interprétation non trouvée"
        },
        cardview: {
            commentCount: "commentaires",
            noCommentsOnCard: "Pas encore de commentaires sur cette carte",
            noOtherComments: "Pas d'autres commentaires sur cette carte"
        },
        profile: {
            editName: "Changer le nom",
            editNamePrompt: "Entrez un nouveau nom :",
            drawHistory: "Historique des tirages",
            logout: "Déconnexion"
        },
        draws: {
            empty: "Aucune carte tirée",
            emptyHint: "Tirez une carte pour commencer"
        },
        feed: {
            drewCard: "a tiré",
            empty: "Pas encore d'histoires du cercle de tarot"
        },
        activity: {
            drewCard: "A tiré une carte",
            commented: "A commenté sur",
            repliedTo: "A répondu à",
            empty: "Pas encore d'activité",
            emptyHint: "Tirez une carte pour commencer"
        },
        friends: {
            empty: "Aucun ami n'utilise cette application pour le moment",
            emptyHint: "Invitez vos amis à tirer les cartes ensemble !",
            inviteBtn: "Inviter des amis",
            inviteMsg: "Tirez votre carte de tarot quotidienne ! Découvrez les prédictions d'amour et recevez des messages de l'univers ✨🔮",
            reconnect: "Session Facebook expirée",
            reconnectHint: "Veuillez vous reconnecter pour voir les cartes de vos amis",
            reconnectBtn: "Reconnecter Facebook",
            newCards: "Vos amis ont tiré de nouvelles cartes",
            markAllRead: "Tout marquer comme lu",
            newBadge: "NEW"
        },
        category: {
            title: "Choisissez votre domaine",
            subtitle: "Sélectionnez un domaine pour votre prédiction",
            love: "Amour",
            loveDesc: "Romance, relations & âme sœur",
            work: "Travail",
            workDesc: "Carrière, ambition & évolution",
            finance: "Finances",
            financeDesc: "Richesse, fortune & prospérité",
            back: "Retour"
        },
        reveal: {
            tapToReveal: "Appuyez pour révéler",
            tapToContinue: "Appuyez pour voir la lecture",
            skip: "Passer ›"
        }
    }
};

// ========================================
// Card Name Translations (Major Arcana)
// ========================================
// Card names are kept in English for all languages
const cardNameTranslations = {};

// ========================================
// Card Interpretations (All 78 Cards)
// Card interpretations are loaded from a separate file
// to keep this file manageable
// ========================================
// Note: cardInterpretations is defined in js/card-interpretations.js
