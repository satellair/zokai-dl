import fs from "fs";

const fetchVideo = async (url: URL) => {
  return await fetch(url).then(r => {
    if (r.status === 200) {
      return r.blob()
    } else {
      throw new Error(`😡fetch ${url} failed: ${r.status} ${r.statusText}`)
    }
  })
}

const dl = async (baseUrl: URL, saveLocation: string, startPart: number, lastPart: number) => {
  let fileDownloaded = 0
  console.log(`🧐start downloading`)
  fs.mkdirSync(saveLocation, { recursive: true });
  try {
    for (let part = startPart; part <= lastPart; part++) {
      const url = new URL(baseUrl + `index_4_${part}.ts`)
      const video = await fetchVideo(url)
      const fileName = `${saveLocation}/index_4_${part}.ts`
      if (await Bun.file(fileName).exists()) {
        console.log(`✅${fileName} already exists, skipped`)
        continue;
      } else {
        await Bun.write(fileName, video)
        console.log(`📝create file at ${fileName}`)
        fileDownloaded++
      }
    }
    console.log(`🎉finish downloaded, total ${fileDownloaded} part${fileDownloaded > 1 ? "s" : ""} created`)
  } catch (e) {
    console.error(e)
    console.log(`🛑stopped downloaded, total ${fileDownloaded} part${fileDownloaded > 1 ? "s" : ""} created`)
  }
}

const checkArgs = () => {
  let haveEndFlag = false
  for (const arg of argv) {
    if (arg === '--testFlag') {
      console.log('📈run arguments test')
      console.log('List arguments:', argv.slice(2))
      action_dl = false
    } else if (arg === '-s' || arg === '--start') {
      const s = parseInt(argv[argv.indexOf(arg) + 1])
      console.log('start:', s)
      if (isNaN(s)) {
        console.error('😡 no --start value')
        action_dl && process.exit(0)
      } else {
        startPart = s
      }
    } else if (arg === '-e' || arg === '--end') {
      const e = parseInt(argv[argv.indexOf(arg) + 1])
      console.log('end:', e)
      if (isNaN(e)) {
        console.error('😡 no --end value')
        action_dl && process.exit(0)
      } else {
        haveEndFlag = true
        lastPart = e
      }
    }
  }
  if (!haveEndFlag) {
    console.log('❗️No end argument found, use default value instead')
    lastPart = startPart + parseInt(Bun.env.DEFAULT_DL_AMT) - 1
  }
  if (lastPart < startPart) {
    console.error('😡 end part must be greater than start part')
    process.exit(0)
  }
}

const baseUrl = new URL(Bun.env.BASE_URL)
const saveLocation = './videoes'

let startPart = 0
let lastPart = 0
// const lastPart = 16259
let action_dl = true
const argv = Bun.argv


checkArgs()
if (action_dl) {
  dl(baseUrl, saveLocation, startPart, lastPart)
} else {
  console.log('startPackage:', startPart, 'lastPackage:', lastPart)
}
