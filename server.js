const Koa = require('koa');
const Static = require('koa-static');
const {
  createBundleRenderer
} = require('vue-server-renderer');
const createDevServer = require('./build/dev-server');
const template = require('fs').readFileSync('./dist/index.ssr.html', 'utf-8');
const isProd = process.env.NODE_ENV === 'production';
const csrFiles = require('fs').readFileSync('./dist/index.csr.html');

let renderer;
let ready;
const app = new Koa();

if (isProd) {
  renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
    template,
    clientManifest: require('./dist/vue-ssr-client-manifest.json'),
    runInNewContext: false
  });
} else {
  ready = createDevServer(app, (bundle, clientManifest) => {
    renderer = createBundleRenderer(bundle, {
      clientManifest,
      template,
      runInNewContext: false
    });
  });
}

async function render(ctx) {
  const context = {
    url: ctx.url
  };
  try {
    const html = await renderer.renderToString(context);
    ctx.body = html;
  } catch (err) {
    if (err.code === 404) {
      ctx.body = '404 Not found';
    } else {
      ctx.type = 'text/html';
      ctx.body = csrFiles;
    }
  }
}

app.use(Static('./dist'));

app.use(async (ctx, next) => {
  if (/favicon\.ico/.test(ctx.url)) {
    return 'not found';
  }
  await next();
});

app.use(async (ctx, next) => {
  if (isProd) {
    await render(ctx);
  } else {
    await ready;
    await render(ctx);
  }
});

app.listen(4000);