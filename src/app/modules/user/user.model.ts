/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0, //use for not send on frontend
    },

    passwordChangedAt: {
      type: Date,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },

    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne(
    { email: email },
    { email: 1, password: 1, role: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.methods.changedPasswordAfterJwtIssued = function (
  jwtTimestamp: number
) {
  console.log({ jwtTimestamp }, 'hi');
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );

  // if (!user.needsPasswordChange) {
  //   user.passwordChangedAt = new Date();
  // }

  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);