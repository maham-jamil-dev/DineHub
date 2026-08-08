import { useEffect, useState } from "react";
import {
  getMyReservations,
} from "../../api/api";

function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await getMyReservations();
      setReservations(res.data.reservations);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="animate-fade-in">

      <h1 className="text-3xl font-bold mb-2">
        My Reservations
      </h1>

      <p className="text-gray-500 mb-8">
        View your reserved tables
      </p>

      {reservations.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          No Reservation Found

        </div>

      ) : (

        <div className="space-y-5">

          {reservations.map((reservation) => (

            <div
              key={reservation._id}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold">

                    {reservation.restaurant?.name}

                  </h2>

                  <p className="text-gray-500">

                    {reservation.restaurant?.location}

                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    reservation.status === "Approved"
                      ? "bg-green-500"
                      : reservation.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {reservation.status}
                </span>

              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-5">

                <div>

                  <p className="text-gray-500">
                    Date
                  </p>

                  <h3>
                    {reservation.reservationDate?.slice(0,10)}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">
                    Time
                  </p>

                  <h3>
                    {reservation.reservationTime}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">
                    Guests
                  </p>

                  <h3>
                    {reservation.guests}
                  </h3>

                </div>
<div>
  <p className="text-gray-500">
    Table Number
  </p>

  <h3>
    {reservation.tableNumber || "Not Assigned"}
  </h3>
</div>
              </div>

              {reservation.specialRequest && (

                <div className="mt-5">

                  <p className="text-gray-500">
                    Special Request
                  </p>

                  <p>
                    {reservation.specialRequest}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyReservations;