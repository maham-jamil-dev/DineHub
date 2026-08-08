import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createReservation } from "../../api/api";

function ReserveTable() {

  const { restaurantId } = useParams();

  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({

    restaurant: restaurantId,

    reservationDate: "",

    reservationTime: "",

    guests: 1,

    specialRequest: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const selected = new Date(formData.reservationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      toast.error("Reservation date must be today or a future date");
      return;
    }

    try {

      const res = await createReservation(formData);

      toast.success(res.data.message || "Reservation Request Sent");

      navigate("/customer/reservations");

    } catch (error) {

      toast.error(error.response?.data?.message || "Reservation Failed");

    }

  };

  return (

    <div className="max-w-xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">

        Reserve Your Table

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-8 rounded-xl shadow"
      >

        <div>

          <label className="block mb-2 font-medium">

            Reservation Date

          </label>

          <input
            type="date"
            name="reservationDate"
            min={todayStr}
            className="input-field w-full"
            value={formData.reservationDate}
            onChange={handleChange}
            required
          />

        </div>

        <div>

          <label className="block mb-2">

            Reservation Time

          </label>

          <input
            type="time"
            name="reservationTime"
            className="input-field w-full"
            value={formData.reservationTime}
            onChange={handleChange}
            required
          />

        </div>

        <div>

          <label className="block mb-2">

            Guests

          </label>

          <input
            type="number"
            min="1"
            max="20"
            name="guests"
            className="input-field w-full"
            value={formData.guests}
            onChange={handleChange}
            required
          />

        </div>

        <div>

          <label className="block mb-2">

            Special Request

          </label>

          <textarea
            rows="4"
            name="specialRequest"
            className="input-field w-full"
            value={formData.specialRequest}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          className="btn-primary w-full"
        >

          Reserve Table

        </button>

      </form>

    </div>

  );

}

export default ReserveTable;