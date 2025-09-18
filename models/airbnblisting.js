// const mongoose = require('mongoose');

const connection = require("../db");
var mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
    thumbnail_url: { type: String },
    medium_url: { type: String },
    picture_url: { type: String },
    xl_picture_url: { type: String }
}, { _id: false });

const HostSchema = new Schema({
    host_id: { type: String, required: true },
    host_url: { type: String },
    host_name: { type: String },
    host_location: { type: String },
    host_about: { type: String },
    host_response_time: { type: String },
    host_thumbnail_url: { type: String },
    host_picture_url: { type: String },
    host_neighbourhood: { type: String },
    host_response_rate: { type: Number },
    host_is_superhost: { type: Boolean },
    host_has_profile_pic: { type: Boolean },
    host_identity_verified: { type: Boolean },
    host_listings_count: { type: Number },
    host_total_listings_count: { type: Number },
    host_verifications: [{ type: String }]
}, { _id: false });

const AddressSchema = new Schema({
    street: { type: String },
    suburb: { type: String },
    government_area: { type: String },
    market: { type: String },
    country: { type: String },
    country_code: { type: String }
}, { _id: false });

const LocationSchema = new Schema({}, { strict: false, _id: false }); // Flexible schema

const AvailabilitySchema = new Schema({
    availability_30: { type: Number },
    availability_60: { type: Number },
    availability_90: { type: Number },
    availability_365: { type: Number }
}, { _id: false });

const ReviewScoreSchema = new Schema({
    review_scores_accuracy: { type: Number },
    review_scores_cleanliness: { type: Number },
    review_scores_checkin: { type: Number },
    review_scores_communication: { type: Number },
    review_scores_location: { type: Number },
    review_scores_value: { type: Number },
    review_scores_rating: { type: Number }
}, { _id: false });

const ReviewSchema = new Schema({
    _id: { type: String },
    date: { type: Number },
    listing_id: { type: String },
    reviewer_id: { type: String },
    reviewer_name: { type: String },
    comments: { type: String }
}, { _id: false });

const AirbnbListingSchema = new Schema({
    _id: { type: String, required: true },
    listing_url: { type: String },
    name: { type: String },
    summary: { type: String },
    space: { type: String },
    description: { type: String },
    neighborhood_overview: { type: String },
    notes: { type: String },
    transit: { type: String },
    access: { type: String },
    interaction: { type: String },
    house_rules: { type: String },
    property_type: { type: String },
    room_type: { type: String },
    bed_type: { type: String },
    minimum_nights: { type: String },
    maximum_nights: { type: String },
    cancellation_policy: { type: String },
    last_scraped: { type: Number },
    calendar_last_scraped: { type: Number },
    first_review: { type: Number },
    last_review: { type: Number },
    accommodates: { type: Number },
    bedrooms: { type: Number },
    beds: { type: Number },
    number_of_reviews: { type: Number },
    bathrooms: { type: Number },
    amenities: [{ type: String }],
    price: { type: Number },
    security_deposit: { type: Number },
    cleaning_fee: { type: Number },
    extra_people: { type: Number },
    guests_included: { type: Number },
    images: ImageSchema,
    host: HostSchema,
    address: AddressSchema,
    location: LocationSchema,
    availability: AvailabilitySchema,
    review_scores: ReviewScoreSchema,
    reviews: [ReviewSchema]
});

// module.exports = mongoose.model('airbnblisting', AirbnbListingSchema);

const airbnblistingModel = connection.model("airbnblisting", AirbnbListingSchema);
// Export model
module.exports = airbnblistingModel;
