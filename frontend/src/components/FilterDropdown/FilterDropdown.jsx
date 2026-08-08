import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

function FilterDropdown({ options, value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-primary transition-colors text-sm font-medium text-gray-700"
      >
        {label}: <span className="text-primary">{value}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-fade-in">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false) }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gold/10 hover:text-primary-dark transition-colors ${value === opt ? 'text-primary font-medium' : 'text-gray-600'}`}
            >
              {opt}
              {value === opt && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown