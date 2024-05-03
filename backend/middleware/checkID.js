import { isValidObjectId } from "mongoose";
function checkID(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error(`Invalid Object ID ${req.params.id}`);
  }
  next();
}
export default checkID;
