const sharp = require('sharp')
const Koa = require('koa');
const router = require('koa-router')()

const img_name = './images/1.jpg'
const max = 90;
const min = 270;
const app = new Koa();
let random = 0

app.use(router.routes())
router.get('/', async (ctx) => {
    ctx.body = "hello!"
})

router.get('/getImg', async (ctx) => {
    random = Math.ceil(Math.random() * (max - min) + min);
    await sharp(img_name)
        .resize(400, 400)
        .rotate(random)
        .toBuffer()
        .then(bitmap => {
            const base64str = Buffer.from(bitmap, 'binary').toString('base64'); // base64编码
            ctx.body = {
                base64str: `data:image/png;base64,${base64str}`
            }
        })
})

router.get('/validation', async (ctx) => {
    const rotate = ctx.request.query.rotate;
    console.log(Math.abs(360 - rotate - random));
    if (Math.abs(360 - rotate - random) <= 10) {
        ctx.body = {
            flag: true
        }
        return;
    }
    ctx.body = {
        flag: false
    }
})


app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
});