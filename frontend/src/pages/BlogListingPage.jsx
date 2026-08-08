import { useState } from 'react'
import { Search } from 'lucide-react'

const categories = ['All', 'Food Guide', 'Recipes', 'Dining Tips', 'Restaurant Reviews', 'Health']

const blogPosts = [
  { id: 1, title: 'Top 10 Biryani Spots in Lahore You Must Try', excerpt: 'From traditional handi biryani to modern fusion styles, discover the most flavorful biryani places in the city of gardens...', category: 'Food Guide', author: 'Ahmed Khan', readTime: '5 min', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400' },
  { id: 2, title: 'How to Make Perfect Chicken Karahi at Home', excerpt: 'Master the art of Pakistani karahi with our step-by-step guide using authentic spices and techniques...', category: 'Recipes', author: 'Fatima Ali', readTime: '8 min', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400' },
  { id: 3, title: '5 Fine Dining Etiquette Tips Everyone Should Know', excerpt: 'Whether it is a business dinner or a romantic date, these dining etiquette tips will make you stand out...', category: 'Dining Tips', author: 'Sara Ahmad', readTime: '4 min', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400' },
  { id: 4, title: 'Monal Restaurant: A Complete Review', excerpt: 'We visited the iconic Monal Restaurant in Islamabad and here is our honest review of the food, ambiance, and service...', category: 'Restaurant Reviews', author: 'Usman Tariq', readTime: '6 min', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400' },
  { id: 5, title: 'Healthy Eating: Pakistani Edition', excerpt: 'Can Pakistani food be healthy? Absolutely! Here are some nutritious alternatives to your favorite dishes...', category: 'Health', author: 'Ayesha Malik', readTime: '7 min', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
  { id: 6, title: 'Street Food Guide: Karachi Edition', excerpt: 'From bun kebab to chaat, explore the vibrant street food scene of Karachi with our ultimate guide...', category: 'Food Guide', author: 'Kamran Khan', readTime: '5 min', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
]

function BlogListingPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = blogPosts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'All' || post.category === activeCategory
    return matchSearch && matchCategory
  })

  const featuredPost = blogPosts[0]

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-dark mb-3">Dine Hub Blog</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Stories, recipes, and guides from Pakistan's food community</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default BlogListingPage