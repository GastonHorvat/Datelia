import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://juhmwanicmpjvyakrjbg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1aG13YW5pY21wanZ5YWtyamJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDczNjIsImV4cCI6MjA2MTAyMzM2Mn0.-iuqpVhX_68RE0KdJh6Erbyfqvb-XS-4Rx_Qct9S1Dc'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  const { data, error } = await supabase.storage.from('blog-assets').list()
  console.log('Error:', error)
  if (data) {
    console.log('Files in blog-assets:')
    data.forEach(f => {
      console.log(`- ${f.name} (${f.metadata?.size || 0} bytes)`)
    })
  }
}

test()
