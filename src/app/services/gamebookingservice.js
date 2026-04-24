import axiosInstance from "./axiosinstance";

export async function getGames(locationId) {
    const url = locationId
        ? `/nucleus_api/get_games.php?location_id=${locationId}`
        : `/nucleus_api/get_games.php`;

    const { data } = await axiosInstance.get(url);

    const raw = Array.isArray(data) ? data : data.Data ?? data.data ?? data.games ?? [];

    return raw
        .filter((g) => g.game_name && g.game_name.trim() !== "")
        .filter((g) => locationId ? g.location_id === Number(locationId) : true)
        .map((g) => ({
            value: String(g.id),
            label: g.frontend_display_title?.trim() || g.game_name, // fallback to game_name
            maxGuests: g.number_of_guests_allowed,
            minGuests: g.no_minimum_guest,
        }));
}
/**
 * Submit a game booking.
 * @param {object} booking  - { game, date, guests, timeSlot }
 * @param {object} personal - { name, phone, email, acceptedTerms }
 * @returns {Promise<object>} API response data
 */
export async function submitBooking(booking, personal) {
    const { data } = await axiosInstance.post("/api/game-booking", {
        ...booking,
        ...personal,
    });
    return data;
}