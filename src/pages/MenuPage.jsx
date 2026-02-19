import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import BannerCarousel from '../components/BannerCarousel'
import CategoryTabs from '../components/CategoryTabs'
import ProductGrid from '../components/ProductGrid'

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'clasicas'
  const searchQuery = searchParams.get('search') || ''

  const handleCategorySelect = (catId) => {
    setSearchParams(prev => {
      prev.set('cat', catId)
      prev.delete('search')
      return prev
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Banners and category tabs hidden during search */}
      {!searchQuery && <BannerCarousel />}

      {!searchQuery && (
        <CategoryTabs
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />
      )}

      <ProductGrid
        activeCategory={activeCategory}
        searchQuery={searchQuery}
      />
    </motion.div>
  )
}
