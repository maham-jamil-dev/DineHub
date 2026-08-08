import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({
  title,
  value,
  change = null,
  icon: Icon,
  color,
}) {
  return (
    <div className="card p-6 hover:shadow-xl transition-all duration-300">

      <div className="flex items-start justify-between mb-4">

        <div className={`p-3 rounded-xl ${color} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>

        {change !== null && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              change >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {change >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}

            {Math.abs(change)}%
          </div>
        )}

      </div>

      <h3 className="text-gray-500 text-sm font-medium">
        {title}
      </h3>

      <p className="text-2xl font-display font-bold text-dark mt-1">
        {value}
      </p>

    </div>
  );
}

export default StatCard;