import ActivityLog from "../models/activity.model.js";

const recordActivity = async ( userId, action, resourceType, resourceId, details ) => {
  try {
    await ActivityLog.create({ user: userId, action, resourceType, resourceId, details });
    return { message: "Activity Log Created Successfully" };
  }
  catch (error) {
    console.log(error);
  }
};

export { recordActivity };