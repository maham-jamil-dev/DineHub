import { useEffect, useState } from "react";
import {
  getAllReservations,
  deleteReservation,
} from "../../api/api";

function ManageReservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await getAllReservations();
      setReservations(res.data.reservations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const removeReservation = async (id) => {
    if (!window.confirm("Delete Reservation?")) return;

    try {
      await deleteReservation(id);
      fetchReservations();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="animate-fade-in">

      <h1 className="text-3xl font-bold mb-8">
        Reservations
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-primary text-white">

            <tr>

              <th className="p-4">Customer</th>

              <th>Restaurant</th>

              <th>Date</th>

              <th>Time</th>

              <th>Guests</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {reservations.map((item) => (

              <tr
                key={item._id}
                className="border-b"
              >

                <td className="p-4">
                  {item.customer?.fullName}
                </td>

                <td>
                  {item.restaurant?.name}
                </td>

                <td>
                  {item.reservationDate?.slice(0, 10)}
                </td>

                <td>
                  {item.reservationTime}
                </td>

                <td>
                  {item.guests}
                </td>

                <td>
                  {item.status}
                </td>

                <td>

                  <button
                    onClick={() =>
                      removeReservation(item._id)
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageReservations;