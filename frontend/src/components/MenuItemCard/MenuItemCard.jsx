import { useState } from "react";
import { Plus, Minus, Flame } from "lucide-react";

function MenuItemCard({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(item, newQuantity);
  };

  const handleRemove = () => {
    if (quantity === 0) return;

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onAddToCart(item, newQuantity);
  };

  return (
    <div className="card p-4 group">

      <div className="relative h-40 rounded-xl overflow-hidden mb-3">

        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/logo.png";
          }}
        />

        {item.isPopular && (
          <div className="absolute top-2 left-2 bg-gold text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Flame className="h-3 w-3" />
            Popular
          </div>
        )}

      </div>

      <div className="flex justify-between items-start mb-2">

        <div>

          <h4 className="font-bold text-dark">
            {item.name}
          </h4>

          <p className="text-gray-500 text-xs mt-1">
            {item.description}
          </p>

        </div>

        <span className="text-primary font-bold text-lg">
          Rs. {item.price}
        </span>

      </div>

      <div className="flex items-center justify-between mt-3">

        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
          {item.category}
        </span>

        <div className="flex items-center gap-2">

          {quantity > 0 && (
            <>
              <button
                onClick={handleRemove}
                className="p-2 rounded-lg bg-gray-100 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="font-bold w-6 text-center">
                {quantity}
              </span>
            </>
          )}

          <button
            onClick={handleAdd}
            className="p-2 rounded-lg bg-primary hover:bg-primary-dark text-white"
          >
            <Plus className="h-4 w-4" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default MenuItemCard;