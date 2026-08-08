import { Search, SlidersHorizontal } from 'lucide-react'

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-12 pr-12 py-3.5"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary transition-colors">
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </div>
  )
}

export default SearchBar