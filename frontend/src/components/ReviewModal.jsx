import { useState } from "react";

function ReviewModal({
  order,
  restaurantId,
  onClose,
  onSubmit,
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
  console.log(order);

  onSubmit({
    restaurant: restaurantId,
    order: order._id,
    rating,
    comment,
  });
};

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-96">

        <h2 className="text-2xl font-bold mb-4">
          Write Review
        </h2>

        <label className="block mb-2">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          rows={5}
          placeholder="Write your review..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        />

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-5 py-2 rounded-lg"
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReviewModal;