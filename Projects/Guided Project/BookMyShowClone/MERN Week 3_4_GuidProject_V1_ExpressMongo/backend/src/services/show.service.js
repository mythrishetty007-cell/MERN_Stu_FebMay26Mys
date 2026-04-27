const Show = require("../models/Show");
const Movie = require("../models/Movie");
const CustomError = require("../utils/customError");
/*
GENERATE SEATS
*/
const generateSeats = (totalSeats) => {
const seats = [];
const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
let seatCount = 0;
for (let row of rows) {
for (let i = 1; i <= 10; i++) {
if (seatCount >= totalSeats) break;
seats.push({
seatNumber: `${row}${i}`,
isBooked: false,
});
seatCount++;
}
}
return seats;
};
/*
CREATE SHOW
*/
exports.createShow = async ({ movieId, date, time, totalSeats }) => {
// Check if movie exists
const movie = await Movie.findById(movieId);
if (!movie) throw new CustomError("Movie not found",404);
// Generate seats
const seats = generateSeats(totalSeats);
const show = await Show.create({
movieId,

date,
time,
totalSeats,
availableSeats: totalSeats,
seats,
});
return show;
};
/*
GET SHOWS
*/
exports.getShows = async ({ movieId, date }) => {
const filter = { isActive: true };
if (movieId) filter.movieId = movieId;
if (date) filter.date = new Date(date);
const shows = await Show.find(filter)
.populate("movieId")
.sort({ date: 1 });
return shows;
};
/*
GET SHOW BY ID
*/
exports.getShowById = async (id) => {
const show = await Show.findById(id).populate("movieId");
if (!show) throw new CustomError("Show not found",404);
return show;
};
/*
UPDATE SHOW
*/
exports.updateShow = async (id, data) => {
const show = await Show.findByIdAndUpdate(id, data, {

returnDocument: "after",
runValidators: true,
});
if (!show) throw new CustomError("Show not found",404);
return show;
};
/*
DELETE SHOW (SOFT DELETE)
*/
exports.deleteShow = async (id) => {
const show = await Show.findByIdAndUpdate(id, {
isActive: false,
});
if (!show) throw new CustomError("Show not found",404);
};