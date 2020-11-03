import { Telegraf, Context, Extra } from 'telegraf'
import { strings } from '@helpers/strings'
import { checkLock } from '@middlewares/checkLock'

export function setupDeleteEntryOnKick(bot: Telegraf<Context>) {
  bot.command('deleteEntryOnKick', checkLock, async (ctx) => {
    let chat = ctx.dbchat
    chat.deleteEntryOnKick = !chat.deleteEntryOnKick
    chat = await chat.save()
    ctx.replyWithMarkdown(
      strings(
        ctx.dbchat,
        chat.deleteEntryOnKick
          ? 'deleteEntryOnKick_true'
          : 'deleteEntryOnKick_false'
      ),
      Extra.inReplyTo(ctx.message.message_id)
    )
  })
}
