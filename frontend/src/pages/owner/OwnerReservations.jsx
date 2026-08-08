import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getRestaurantReservations,
  updateReservationStatus,
} from "../../api/api";

function OwnerReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableNumbers, setTableNumbers] = useState({});

  // ==========================
  // Fetch Reservations
  // ==========================

  const fetchReservations = async () => {
    try {
      const res = await getRestaurantReservations();

      setReservations(res.data.reservations || []);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to load reservations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // ==========================
  // Update Status
  // ==========================

const handleStatusChange = async (id, status) => {
  try {
    await updateReservationStatus(id, {
      status,
      tableNumber: tableNumbers[id] || null,
    });

    toast.success("Reservation Updated Successfully");

    fetchReservations();
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
        "Failed To Update Reservation"
    );
  }
};

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Reservations...
      </div>
    );
  }

  return (
    <div className="animate-fade-in">

      <h1 className="text-3xl font-bold mb-2">
        Reservations
      </h1>

      <p className="text-gray-500 mb-8">
        Manage customer table reservations
      </p>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          No Reservations Found
        </div>
      ) : (
        <div className="space-y-5">

          {reservations.map((reservation) => (

            <div
              key={reservation._id}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="flex justify-between items-start">

  <div>

    <h2 className="text-xl font-bold">
      {reservation.customer?.fullName}
    </h2>

    <p className="text-gray-500">
      {reservation.customer?.email}
    </p>

  </div>

  <div className="flex flex-col gap-2">

   {reservation.status === "Pending" ? (
  <input
    type="number"
    placeholder="Table No"
    value={tableNumbers[reservation._id] || ""}
    onChange={(e) =>
      setTableNumbers({
        ...tableNumbers,
        [reservation._id]: e.target.value,
      })
    }
    className="border rounded-lg px-3 py-2 w-28"
  />
) : (
  <div className="border rounded-lg px-3 py-2 w-28 bg-gray-100 text-center font-semibold">
    Table {reservation.tableNumber}
  </div>
)}

 {reservation.status === "Pending" ? (
  <select
    value={reservation.status}
    onChange={(e) =>
      handleStatusChange(reservation._id, e.target.value)
    }
    className="border rounded-lg px-4 py-2"
  >
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Cancelled">Cancelled</option>
    <option value="Completed">Completed</option>
  </select>
) : (
  <div className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium text-center">
    {reservation.status}
  </div>
)}

  </div>

</div>

              <div className="grid md:grid-cols-4 gap-5 mt-6">

                <div>

                  <p className="text-gray-500">
                    Date
                  </p>

                  <h3>
                    {reservation.reservationDate?.slice(
                      0,
                      10
                    )}
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
                    Status
                  </p>

                  <h3 className="font-semibold">
                    {reservation.status}
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

export default OwnerReservations;