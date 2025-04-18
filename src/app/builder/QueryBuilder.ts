import { FilterQuery, Query, Types } from "mongoose";
import {
  ListingCategory,
  ListingCondition,
  ListingLocation,
  ListingStatus,
} from "../modules/listing/listing.interface";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter(): this {
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields", "minPrice", "maxPrice"];
    excludeFields.forEach((el) => delete queryObj[el]);

    const filters: FilterQuery<T> = {
      isDeleted: false,
    } as FilterQuery<T>;

    // Price range filtering
    const priceFilter: Record<string, number> = {};
    if (this.query.minPrice) {
      priceFilter["$gte"] = Number(this.query.minPrice);
    }
    if (this.query.maxPrice) {
      priceFilter["$lte"] = Number(this.query.maxPrice);
    }
    if (Object.keys(priceFilter).length > 0) {
      (filters as Record<string, unknown>).price = priceFilter;
    }

    // Existing category/location/condition filters
    if (
      queryObj.category &&
      Object.values(ListingCategory).includes(queryObj.category as ListingCategory)
    ) {
      (filters as Record<string, unknown>).category = queryObj.category as ListingCategory;
    }

    if (queryObj.location) {
      if (queryObj.location === ListingLocation.OTHER) {
        (filters as Record<string, unknown>).customLocation = { $exists: true, $ne: "" };
      } else if (Object.values(ListingLocation).includes(queryObj.location as ListingLocation)) {
        (filters as Record<string, unknown>).location = queryObj.location as ListingLocation;
      }
    }

    if (
      queryObj.condition &&
      Object.values(ListingCondition).includes(queryObj.condition as ListingCondition)
    ) {
      (filters as Record<string, unknown>).condition = queryObj.condition as ListingCondition;
    }
    // Make status filter OPTIONAL
    if (
      queryObj.status &&
      Object.values(ListingStatus).includes(queryObj.status as ListingStatus)
    ) {
      (filters as Record<string, unknown>).status = queryObj.status as ListingStatus;
    }

    this.modelQuery = this.modelQuery.find(filters);
    return this;
  }

  sort() {
    const sort = (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields = (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
