import { useEffect, useState } from "react";
import { getOwnerReviews } from "../../api/api";

function OwnerReviews() {

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchReviews();

  }, []);

  const fetchReviews = async () => {

    try {

      const res = await getOwnerReviews();

      setReviews(res.data.reviews || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="text-center py-10 text-xl">
        Loading Reviews...
      </div>
    );

  }

  return (

    <div className="max-w-5xl mx-auto py-8 px-4">

      <h1 className="text-3xl font-bold mb-8">
        Customer Reviews
      </h1>

      {reviews.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">

          <h2 className="text-2xl font-bold">
            No Reviews Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Customers haven't reviewed your restaurant yet.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {reviews.map((review) => (

            <div
              key={review._id}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-xl font-bold">
                    {review.customer?.fullName}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-yellow-500 text-xl">
                  {"⭐".repeat(review.rating)}
                </div>

              </div>

              <p className="mt-5 text-gray-700 leading-7">
                {review.comment}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default OwnerReviews;