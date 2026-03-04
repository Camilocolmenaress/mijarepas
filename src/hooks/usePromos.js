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
          .order('created_at', { ascending: false })

        // Filter fecha_fin in JS because PostgREST overwrites
        // the first .or() when chaining a second one
        const filtered = (data || []).filter(p => {
          if (!p.fecha_fin) return true
          return p.fecha_fin >= today
        })

        if (!cancelled && !error) {
          setPromos(filtered)
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
