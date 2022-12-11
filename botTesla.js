////////////////////////////////////////
// Başka github hesabına yükləməy olmaz
// Reponu öz adına çıxaran peysərdi...!!: 'HTML'
            })


${top.sort((a, b) => b.score - a.score).slice(0, 20).map((member, index) => `${["","",""][index] || ""} ${index + 1}) *${member.firstName}*: ${member.score} ${HusnuEhedov(member.score, "puan🎁", "puan🎁", "puan🎁")}`).join("\n")}
				`))
			}
			else {
				ctx.reply("🆘 Bu əmr qruplar üçün etibarlıdır \n\n 📣 Kanalımıza gözləyirik @CrazyMMC")
			}
		}
		else {
			ctx.reply("🆘 Bu əmr qruplar üçün etibarlıdır \n\n 📣 Kanalımıza gözləyirik @CrazyMMC")
		}
	}
	else {
		ctx.reply("🆘 Bu əmr qruplar üçün etibarlıdır \n\n 📣 Kanalımıza gözləyirik @CrazyMMC")
	}
})
/// /// /// /// /// /// ///  <!-- GRUB KULLANICI RATING SON --> /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 





/// /// /// /// /// /// ///  <!-- GLOBAL KULLANICI RATING --> /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 
bot.command("global", (ctx) => {
    fs.readFile(dbfile, 'utf8', async function(err, doc) {
        var comments = doc.match(/-100\d+/g)
        let top = []
        if (comments && comments.length > 0) {
            for (let i in comments) {
                let chatId = comments[i]
                let chat = getChat(chatId)
                NesneYenileHusnuEhedov(chat.members, (memberId, member, memberIndex) => {
                    top.push({
                        firstName: member.firstName,
                        score: member.totalScore
                    })

                    Object.assign(member, {
                        answer: null,
                        isPlaying: true,
                        gameScore: 0
                    })
                })
            }
            if (top.length > 0) {
                ctx.replyWithHTML(Degisken(`
     <b>🎖Global Üzrə En Yaxşı Oyunçular</b>\n
${(top).sort((a, b) => b.score - a.score).slice(0, 20).map((member, index) => `${["🥇","🥈","🥉"][index] || "🎲"} ${index + 1}) <b><i>${member.firstName} → ${member.score} ${HusnuEhedov(member.score, "puan", "puan", "puan")}</i></b>`).join("\n")}
                `))
            }
        }
    })
})
/// /// /// /// /// /// ///  <!-- GLOBAL KULLANICI RATING SON --> /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 



bot.command("help", (ctx) => {
    return ctx.replyWithMarkdown(Degisken(`
        *Salam! "Təxmin" oyunu ücün\n Yaranmış bir botam🤖*\n🆘*Bot Sadəcə gruplar üçün hazırlanmışdır!* \n\n _ℹ️Əmirlər Bunlardı_ : \n\n Mən sizə bir şəkil göndərdiyim zaman kateqoriyaya uyğun rəqəmlərlə təxmin edəcəksiniz, bu qədər asandır.🕵🏼‍♂, \n\n ❕ Əvvəlcə məni bir qrupa əlavə edin və sonra /crazygame əmrini işə salın. \n\n 🎯(Qrupun media icazəsi açıq olmasını unutmayın.)🗣 \n _Sonra Əmirlər ilə oyunu başladın_🎯 \n
          *Əmirlərik Bunlardı* \n\n 🎲 /crazygame - _Oyunu Başlat_ \n ⛔️ /stop - _Oyunu diyandırmaq_ \n 📊 /trating - _Oyunçuların xalın göstərir_ \n _🌍 /global - Global Xallar_ \n ℹ️ /help - _Sizə kömək dəcək_ \n 👤 /kullanici - Sizin hakkında məlumat_ \n 🆔 /id - _Grup infosu_`))
})

bot.command("kullanici", async (ctx) => {
    const Id = ctx.message.reply_to_message ? ctx.message.reply_to_message.from.id : ctx.message.from.id;
    const messageId = ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null;
    const photoInfo = await ctx.telegram.getUserProfilePhotos(Id);
    const photoId = photoInfo.photos[0]?.[0]?.file_id;
    const getUserInfo = await ctx.telegram.getChat(Id);
    const getUser = [getUserInfo].map(kullaniciProfil).join(', ')
    if (photoId) {
        return ctx.replyWithPhoto(photoId, { caption: getUser, parse_mode: 'HTML', reply_to_message_id: messageId  })
    } else {
        return ctx.replyWithHTML(getUser,  { reply_to_message_id: messageId })
    }
});

bot.command('id', async (ctx, next) => {
	if (ctx.chat.type !== "supergroup") return null;
    const chatBio = ctx.chat.description
    await ctx.telegram.sendMessage(ctx.chat.id, `<b>Grup</b>\n🆔:<code>${ctx.chat.id}</code>\nİsim: <code>${ctx.chat.title}</code>`, { parse_mode: 'HTML' }) 
    return next();
});



/// /// /// /// /// /// ///  <!-- BOT START MENÜ --> /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

bot.start(async (ctx) => {
    await ctx.replyWithMarkdown(ozelMesaj(ctx.update.message.chat.id < 0),{
        reply_markup:{
            inline_keyboard:[
                [{text:'Botu Grupa Ekle ✅', url:`http://t.me/azoyunbot?startgroup=true`}],
                [{text:'Resmi Kanalımız 📣', url:`t.me/VusalinBlogu`},{text:'VİP Gruplar 💎', callback_data:'vip'}]
            ]
        }
    })
})

bot.action('start', ctx=>{
    ctx.deleteMessage()
    ctx.replyWithMarkdown(`*Salam👋🏻 \n 𝙲𝚁𝙰𝚉𝚈 𝚃𝙴𝚇𝙼𝙸𝙽 𝙶𝙰𝙼𝙴 Təxmin Oyunu Vaxtınızı Əyləncəli hala gətirimək üçün\nTelegram oyun botuyum🤖* \n *Əmirlərimə Bax /help*"*
        `,{
        reply_markup:{
            inline_keyboard:[
                [{text:'Botu Grupa Ekle ✅', url:`http://t.me/CrazyTexminGameBot?startgroup=true`}],
                [{text:'Rəsmi Kanalımız 📣', url:`https://t.me/crazy_resmi`},{text:'VİP Gruplar 💎', callback_data:'vip'}]
            ]
        }
    })
})



bot.action('vip', ctx=>{
    ctx.deleteMessage()
    ctx.replyWithMarkdown(`*🌍 Ölkələr*`,{
        reply_markup:{
            inline_keyboard:[
                [{text:'🇦🇿 Azərbaycan', callback_data:'AZ'}],
                [{text:'🇹🇷 Türkiye', callback_data:'TR'}],
                [{text:'🔙 Geri', callback_data:'start'}]
            ]
        }
    })
})

// AZƏRBAYCAN GRUP DÜYMƏLƏRİ
bot.action('AZ', ctx=>{
    ctx.deleteMessage()
    ctx.replyWithMarkdown(`*🇦🇿 VİP Gruplar 🏆*`,{
        reply_markup:{
            inline_keyboard:[
                [{text:'1) Qrup ', url:'https://t.me/CrazyTeam_s'}],
                [{text:'2) Qrup ', url:'https://t.me/Crazymmc'}],
                [{text:'🔙 Geri', callback_data:'vip'}]
            ]
        }
    })
})

// TÜRK GRUP DÜYMƏLƏRİ
bot.action('TR', ctx=>{
    ctx.deleteMessage()
    ctx.replyWithMarkdown(`
*🇹🇷 VİP Gruplar 🏆*
        `,{
        reply_markup:{
            inline_keyboard:[
                [{text:'1) Grub', url:'https://t.me/CrazyTeam_s'}],
                [{text:'2) Grub', url:'https://t.me/Crazymmc'}],
                [{text:'🔙 Geri', callback_data:'vip'}]
            ]
        }
    })
})

/// /// /// /// /// /// ///  <!-- BOT START MENÜ SON --> /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 





bot.on("message", async (ctx) => {
	let message = ctx.update.message
	if (message.chat.id < 0) {
		let chatId = message.chat.id
		let fromId = message.from.id
		let chat = getChat(chatId)
		if (
			chat && 
			chat.isPlaying && 
			(chat.members[fromId] === undefined || chat.members[fromId].answer === null) && 
			oyunDurumuHusnuEhedov && 
			/^-?\d+$/.test(message.text)
		) {
			let firstName = message.from.first_name
			let answer = Number(message.text)
			if (answer <= 0 || answer > 100) {
				return ctx.reply(
					"Cevap Sınırı (1 - 100)",
					{
						reply_to_message_id: ctx.message.message_id,
					}
				)
			}
			if (!chat.members[fromId]) { 
				chat.members[fromId] = dbUserAlHusnuEhedov(firstName)
			}
			Object.assign(chat.members[fromId], {
				isPlaying: true,
				answer: answer,
				firstName: firstName
			})
			oyunDurumuHusnuEhedov[chatId].answersOrder.push(fromId)

			db.update(chatId, ch => chat)

			telegram.editMessageCaption(
				chatId,
				oyunDurumuHusnuEhedov[chatId].guessMessageId,
				null,
				RaundMesajHusnuEhedov(chatId, oyunDurumuHusnuEhedov[chatId].currentRound, oyunDurumuHusnuEhedov[chatId].currentTime),
				{
					parse_mode: "Markdown"
				}
			)
		}
		else if (message.new_chat_member && message.new_chat_member.id === process.env.ID_BOT) { /// Bot Yeni Qruba Eklendi Mesaj
			ctx.replyWithMarkdown(ozelMesaj(true))
		}
	}
})


// Olumsuz Hata versede çalışmaya devam eder
bot.catch((err) => {
    console.log('Error: ', err)
})

// Botun nickname alan kod
bot.telegram.getMe().then(botInfo => {
    bot.options.username = botInfo.username
    console.log(`Sistem Aktifleşti => ${bot.options.username}`)
})

bot.launch();
