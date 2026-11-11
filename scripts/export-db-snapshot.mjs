import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SUPABASE_URL = 'https://tyspjymmurdtkblpghab.supabase.co'
const SUPABASE_KEY = 'sb_publishable_AhFSsBrNGQ154Ov5h3OprQ_bmgwc7pI'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function backupDatabase() {
  console.log('Exporting Supabase data snapshot...')
  const tables = ['packages', 'services', 'virtual_tours', 'journal_posts', 'site_settings', 'inquiries']
  const snapshot = {
    timestamp: new Date().toISOString(),
    project: 'Sarrin Holidays',
    supabaseUrl: SUPABASE_URL,
    data: {}
  }

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*')
      if (error) {
        console.warn(`Table ${table} export notice:`, error.message)
        snapshot.data[table] = []
      } else {
        snapshot.data[table] = data || []
        console.log(`Exported ${table}: ${snapshot.data[table].length} records`)
      }
    } catch (e) {
      console.warn(`Error on ${table}:`, e)
    }
  }

  const outDir = path.join(__dirname, '..', 'backups')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const outFile = path.join(outDir, 'supabase_data_snapshot_20261111.json')
  fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf8')
  console.log(`Database snapshot saved to: ${outFile}`)
}

backupDatabase()

