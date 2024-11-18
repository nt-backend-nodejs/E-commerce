import {
  getAllSocialFilesService,
  getOneSocialFilesByIdService,
  createSocialFilesService,
  updateSocialFilesService,
  deleteSocialFilesService,
} from "../service/index.js";

export const getAllSocialFiles = async (req, res, next) => {
  try {
    const allSocialFiles = await getAllSocialFilesService(
      "SELECT * FROM Social_profiles"
    );
    res.status(200).send({ status: "ok", data: allSocialFiles });
  } catch (error) {
    next(error);
  }
};

export const getOneSocialFilesById = async (req, res, next) => {
  try {
    const oneSocialFiles = await getOneSocialFilesByIdService(
      "SELECT * FROM Social_profiles WHERE id = $1",
      req.params.id
    );
    res.status(200).send({ status: "ok", data: oneSocialFiles });
  } catch (error) {
    next(error);
  }
};

export const createSocialFiles = async (req, res, next) => {
  try {
    const createSocialFiles = await createSocialFilesService(
      "INSERT INTO Social_profiles (user_id, platform, platform_user) VALUES ($1,$2,$3);",
      req.body
    );

    res.status(201).send({ status: "Created", data: createSocialFiles });
  } catch (error) {
    next(error);
  }
};

export const updateSocialFiles = async (req, res, next) => {
  try {
    const updatedata = await updateSocialFilesService(
      "UPDATE Social_profiles SET user_id = $1, platform = $2, platform_user = $3, WHERE id = $4",
      req.body,
      req.params.id
    );
    res.status(202).send({ status: "Updated", data: updatedata });
  } catch (error) {
    next(error);
  }
};

export const deleteSocialFiles = async (req, res, next) => {
  try {
    const deleteSocialFiles = await deleteSocialFilesService(
      "DELETE FROM Social_profiles WHERE id = $1",
      req.params.id
    );
    res.status(203).send({ status: "deleted", data: deleteSocialFiles });
  } catch (error) {
    next(error);
  }
};
