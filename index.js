import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { marked } from 'marked'
import puppeteer from 'puppeteer'
import { computeSystemExecutablePath } from '@puppeteer/browsers'
import fs from 'fs/promises'
import path from 'path'

const app = new Hono()
const port = 3000

async function getStyles() {
  try {
    const cssPath = path.join(process.cwd(), 'styles', 'print.css')
    return await fs.readFile(cssPath, 'utf8')
  } catch (err) {
    console.warn('CSS file not found:', err)
    return ''
  }
}

app.post('/convert', async c => {
  const body = await c.req.json()
  const markdown = body.markdown || ''
  const styles = await getStyles()
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${styles}</style></head><body>${marked(markdown)}</body></html>`

  const browser = await puppeteer.launch({
    executablePath: computeSystemExecutablePath('chromium'),
    headless: 'new'
  })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })
  await browser.close()

  c.header('Content-Type', 'application/pdf')
  return c.body(pdfBuffer)
})

serve({ fetch: app.fetch, port })
