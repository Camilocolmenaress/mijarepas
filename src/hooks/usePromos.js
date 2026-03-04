import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function usePromos() {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fetchPromos = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]
        const { data, error } = await supabase
          .from('promociones')
          .select('*')
          .eq('activa', true)
          .or(`fecha_inicio.is.null,fecha_inicio.lte.${today}`)
          .or(`fecha_fin.is.null,fecha_fin.gte.${today}`)
          .order('created_at', { ascending: false })

        if (!cancelled && !error) {
          setPromos(data || [])
        }
      } catch (err) {
        console.error('Error fetching promos:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPromos()
    return () => { cancelled = true }
  }, [])

  return { promos, loading }
}
