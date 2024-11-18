import { logger } from "../utils/index.js";
import {
  createSocProfileService,
  deleteSocProfileService,
  getSocProfileByIdService,
  getAllSocProfilesService,
  updateSocProfileService,
} from "../services/index.js";

export async function getAllSocProfilesCon(req, res, next) {
  try {
    const allSocProfiles = await getAllSocProfilesService();

    res.send(allSocProfiles);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function getOneSocProfileByIdCon(req, res, next) {
  try {
    const id = req.params.id;

    const socProfile = await getSocProfileByIdService(id);

    if (socProfile instanceof String || typeof socProfile === "string")
      return res.status(404).send(socProfile);

    res.send(socProfile);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function createSocProfileCon(req, res, next) {
  try {
    const socProfile = req.body;

    const data = await createSocProfileService({
      user_id: socProfile.user_id,
      platform: socProfile.platform,
      platform_user: socProfile.platform_user,
    });

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function updateSocProfileCon(req, res, next) {
  try {
    const socProfileData = req.body;

    const data = await updateSocProfileService(req.params?.id, {
      user_id: socProfileData?.user_id,
      platform: socProfileData?.platform,
      platform_user: socProfileData?.platform_user,
    });

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function deleteSocProfileCon(req, res, next) {
  try {
    const data = await deleteSocProfileService(req.params?.id);

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
