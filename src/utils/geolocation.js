export const detectarUbicacion = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no disponible en este dispositivo'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=es`,
            {
              headers: {
                'User-Agent': 'MijarepasApp/1.0 (pedidos@mijarepas.co)',
              },
            }
          )
          if (!res.ok) throw new Error('Error en Nominatim')
          const data = await res.json()
          const addr = data.address || {}
          const partes = [
            addr.road,
            addr.house_number,
            addr.neighbourhood,
            addr.suburb,
            addr.city || addr.town || addr.village,
          ].filter(Boolean)
          resolve(partes.join(', ') || data.display_name || '')
        } catch {
          reject(new Error('No se pudo obtener la dirección'))
        }
      },
      (err) => {
        if (err.code === 1) {
          reject(new Error('Permiso de ubicación denegado'))
        } else if (err.code === 2) {
          reject(new Error('Ubicación no disponible'))
        } else {
          reject(new Error('Tiempo de espera agotado'))
        }
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    )
  })
