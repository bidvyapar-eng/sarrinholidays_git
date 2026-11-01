import fs from 'fs'
import path from 'path'

const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}]/gu

function scanDir(dir) {
  if (!fs.existsSync(dir)) return
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        scanDir(fullPath)
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.mjs')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      const lines = content.split('\n')
      lines.forEach((line, index) => {
        const matches = line.match(emojiRegex)
        if (matches) {
          console.log(`${fullPath}:${index + 1} -> ${matches.join(' ')} | ${line.trim()}`)
        }
      })
    }
  }
}

scanDir('c:/Projects/sarrinholidays/app')
scanDir('c:/Projects/sarrinholidays/components')
scanDir('c:/Projects/sarrinholidays/lib')
