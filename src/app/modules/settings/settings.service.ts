import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ISettings, IUploadedFiles
} from './settings.inerface';
import { Settings } from './settings.model';

const createSettings = async (
  payload: ISettings,
  images: IUploadedFiles,
): Promise<ISettings | null> => {


  const hasAlreadyMain = await Settings.find();
  if (hasAlreadyMain.length > 0) {
    throw new ApiError(httpStatus.FORBIDDEN, "Already have a setting. Now you can updated only!")
  }
  if (images.whiteLogo?.[0].filename) payload.whiteLogo = images.whiteLogo[0].filename;
  if (images.blackLogo?.[0].filename) payload.blackLogo = images.blackLogo[0].filename;
  if (images.smallLogo?.[0].filename) payload.smallLogo = images.smallLogo[0].filename;
  if (images.favIcon?.[0].filename) payload.favIcon = images.favIcon[0].filename;
  const result = await Settings.create(payload);
  return result;

};



const getAllSettings = async (): Promise<ISettings | null> => {
  const result = await Settings.findOne();

  return result;
};

const updateSettings = async (
  id: string,
  payload: Partial<ISettings>,
  images: IUploadedFiles,
): Promise<ISettings | null> => {
  console.log(images)
  if (images?.whiteLogo?.[0]?.filename) payload.whiteLogo = images.whiteLogo[0].filename;
  if (images?.blackLogo?.[0]?.filename) payload.blackLogo = images.blackLogo[0].filename;
  if (images?.smallLogo?.[0]?.filename) payload.smallLogo = images.smallLogo[0].filename;
  if (images?.favIcon?.[0]?.filename) payload.favIcon = images.favIcon[0].filename;

  const result = await Settings.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteSettings = async (
  id: string
): Promise<ISettings | null> => {
  const result = await Settings.findByIdAndDelete(id);
  return result;
};

export const SettingsService = {
  createSettings,
  getAllSettings,
  updateSettings,
  deleteSettings,
};
