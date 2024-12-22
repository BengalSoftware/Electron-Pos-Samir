import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ISettings, IUploadedFiles } from './settings.inerface';
import { SettingsService } from './settings.service';


const createSettings = catchAsync(async (req: Request, res: Response) => {
  const { ...SettingsData } = req.body;

  // Check if images is defined and of the expected type
  const images: IUploadedFiles = req.files as IUploadedFiles;
  const result = await SettingsService.createSettings(
    SettingsData,
    images,
  );

  sendResponse<ISettings>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Settings created successfully',
    data: result,
  });
});

const getAllSettings = catchAsync(async (req: Request, res: Response) => {

  const result = await SettingsService.getAllSettings();
  sendResponse<ISettings>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Settings fetched successfully',
    data: result,
  });
});



const updateSettings = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const images: IUploadedFiles = req.files as IUploadedFiles;

    const result = await SettingsService.updateSettings(
      id,
      updatedData,
      images,

    );

    sendResponse<ISettings>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Settings updated successfully',
      data: result,
    });
  })
);

const deleteSettings = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SettingsService.deleteSettings(id);

  sendResponse<ISettings>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Settings deleted successfully',
    data: result,
  });
});

const imageUpload = catchAsync(async (req: Request, res: Response) => {
  console.log(req.file)
  console.log(req.files)
  // console.log(req.body)

  sendResponse<ISettings>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image upload',
    data: null,
  });
});

export const SettingsController = {
  createSettings,
  getAllSettings,
  updateSettings,
  deleteSettings,
  imageUpload
};
