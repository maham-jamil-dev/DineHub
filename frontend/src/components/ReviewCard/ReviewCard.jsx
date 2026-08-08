import { Star, ThumbsUp } from 'lucide-react'

function ReviewCard({ review }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-3">
        <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover border-2 border-primary/20" />
        <div>
          <h4 className="font-medium text-dark text-sm">{review.name}</h4>
          <p className="text-gray-400 text-xs">{review.date}</p>
        </div>
        <div className="ml-auto flex items-center gap-1 bg-gold/10 px-2 py-1 rounded-lg">
          <Star className="h-3.5 w-3.5 text-gold fill-gold" />
          <span className="text-sm font-bold text-gold-dark">{review.rating}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
      <div className="mt-3 flex items-center gap-4">
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary text-xs transition-colors">
          <ThumbsUp className="h-3.5 w-3.5" />
          Helpful ({review.likes})
        </button>
      </div>
    </div>
  )
}

export default ReviewCard