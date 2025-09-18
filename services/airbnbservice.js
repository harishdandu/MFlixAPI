const airbnblisting = require("../models/airbnblisting");

async function fcnGetAllListings(data) {
    try {
        console.log("Fetching Airbnb listings for infinite scroll...", data.priceRange, data.minimumRating);

        // For infinite scroll, we use skip parameter instead of pageNo
        const skip = data.skip || 0;
        const limit = 20; // Reduced batch size for better performance
        const searchText = data.searchText || "";
        const priceRange = data.priceRange || "";

        const skipNumber = parseInt(skip, 10);
        console.log("skipNumber", skipNumber);
        console.log("limit", limit);
        console.log("searchText", searchText);
        console.log("priceRange", priceRange);
        
        // Parse price range
        let minPrice = null;
        let maxPrice = null;
        if (priceRange && priceRange.trim() !== "") {
            const priceParts = priceRange.split(",");
            if (priceParts.length === 2) {
                minPrice = parseFloat(priceParts[0].trim());
                maxPrice = parseFloat(priceParts[1].trim());
                console.log("minPrice", minPrice, "maxPrice", maxPrice);
            }
        }
        
        // Parse minimum rating
        let minimumRating = null;
        if (data.minimumRating) {
            minimumRating = parseFloat(data.minimumRating);
            console.log("minimumRating", minimumRating);
        }
        // Build query conditions
        const queryConditions = [
            { "images": { $exists: true } },
            { "images": { $ne: null } },
            {
                $or: [
                    { "images.thumbnail_url": { $ne: "", $ne: null } },
                    { "images.medium_url": { $ne: "", $ne: null } },
                    { "images.picture_url": { $ne: "", $ne: null } },
                    { "images.xl_picture_url": { $ne: "", $ne: null } }
                ]
            }
        ];

        // Add search text filter if provided
        if (searchText && searchText.trim() !== "") {
            queryConditions.push({
                $or: [
                    { "name": { $regex: searchText, $options: "i" } }
                ]
            });
        }

        // Add price range filter if provided
        if (minPrice !== null && maxPrice !== null) {
            queryConditions.push({
                "price": {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            });
        }

        // Add minimum rating filter if provided
        if (minimumRating !== null) {
            queryConditions.push({
                "review_scores.review_scores_rating": {
                    $gte: ( minimumRating * 20 )
                }
            });
        }

        // Optimized query - simplified conditions for better performance
        const query = {
            $and: queryConditions
        };
        
        // Optimized query with projection to fetch only essential fields
        const projection = {
            _id: 1,
            name: 1,
            summary: 1,
            property_type: 1,
            room_type: 1,
            price: 1,
            images: 1,
            host: {
                host_name: 1,
                host_is_superhost: 1
            },
            address: {
                suburb: 1,
                government_area: 1,
                country: 1
            },
            review_scores: {
                review_scores_rating: 1
            },
            number_of_reviews: 1,
            accommodates: 1,
            bedrooms: 1,
            bathrooms: 1
        };
        
        // Fetch listings with optimized query and projection
        const listingsData = await airbnblisting.find(query, projection)
            .skip(skipNumber)
            .limit(limit)
            .sort({ last_scraped: -1 })
            .lean(); // Use lean() for better performance
        
        console.log("Listings fetched:", listingsData.length); 
        
        // Only get total count if it's the first request (skip = 0) to optimize performance
        let totalCount = null;
        if (skipNumber === 0) {
            totalCount = await airbnblisting.countDocuments(query);
            console.log("totalCount", totalCount);
        }
        
        // Calculate if there are more records available
        const hasMore = listingsData.length === limit;
        
        return {
            statusCode: "S",
            listings: listingsData,
            totalCount: totalCount,
            skip: skipNumber,
            limit: limit,
            hasMore: hasMore,
            nextSkip: hasMore ? skipNumber + limit : null
        };
    } catch (err) {
        console.error("Error: " + err);
        throw err;
    }
}

exports.airbnbService = {
    fcnGetAllListings: fcnGetAllListings
}