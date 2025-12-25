import mongoose, { Model } from "mongoose";

export async function validateIdsExist<T>(
  model: Model<T>,
  ids: string[],
  entityName: string,
  mandatory: boolean = true
): Promise<void> {
  // 1. Validate ObjectId format
  if (ids === undefined) {
    throw new Error(`Please provide ${entityName} details`);
  }
  if (mandatory && ids?.length === 0) {
    throw new Error(`Please provide ${entityName} ID format`);
  }
  const invalidIds = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
  if (invalidIds.length > 0) {
    throw new Error(`Invalid ${entityName} ID format.`);
  }

  // 2. Fetch only _id for efficiency
  const docs = await model.find({ _id: { $in: ids } }, { _id: 1 });

  // 3. Count check
  if (docs.length !== ids.length) {
    throw new Error(`One or more ${entityName}s are invalid`);
  }
}

type IEmptyProps = {
  propertyname: string;
  value: string;
};
export const checkEmpty = async (props: IEmptyProps[]) => {
  props?.map((x) => {
    if (!x.value) throw new Error(`Invalid ${x.propertyname}`);
  });
};
