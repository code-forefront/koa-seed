import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import storage from 'node-persist'

const app = new Koa()
const router = new Router()

storage.init()

router.post('/voitures', async function (ctx: any) {
  const voitures = await storage.getItem('voitures') || []
	voitures.push(ctx.request.body)
  await storage.setItem('voitures', voitures);
  ctx.body = ctx.request.body
})

router.get('/voitures', async function (ctx: any) {
  const voitures = await storage.getItem('voitures') || []
  ctx.body = voitures
})

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  
app.listen(3000)
