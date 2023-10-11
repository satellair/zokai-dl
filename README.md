# zokai-dl

script for download streming video from website (now is for zaiko.io only)

## Installation:
1. Install [Bun](https://bun.sh)
2. Clone this repository
3. `bun install`
4. create `.env` file and fill variable (see `.env.template`)
5. find "download url" and add it into `.env` (what url? [how to find url](#finding-url))

## Usage:

```bash
bun dl [ -s | --start ] [first_package] [ -e | --end ] [last_package]
```

### Example:

```bash
bun dl -s 1 -e 10
```

It will download `index_4_1.ts` to `index_4_10.ts` to `./videoes`

`.ts` files aren't TypeScript files. It's an **"Transport Stream"** file. You can read more about it [here](https://en.wikipedia.org/wiki/MPEG_transport_stream)

## Finding url:
(For zaiko.io)
1. Open video steaming page
2. Go to network tab in devtools
3. Find request with `index_{number}_{number}.ts` in name
4. Copy url from request and paste it to `.env` (you need to remove `index_{number}_{number}.ts` from url but **don't remove last `/` before** `index_{number}_{number}`)

## Note:
- It only download `.ts` file. You need to merge it by yourself. I recommend [FFmpeg](https://ffmpeg.org)
- This project is for **educational purpose only**. I do not recommend to distributed the download stream to other website.

## Checklist:
- [x] Download video from zaiko.io
- [ ] Download video from other website
- [ ] `.mp4` output
- [ ] custom url through cli
- [ ] More cli arguments command

## License:

[MIT](./LICENSE)


*made with ❤️ by [me](https://github.com/satellair)*