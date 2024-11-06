import { NextResponse } from 'next/server';
import {
  BadRequestError,
  ConflictRequestError,
  NotFoundError,
  AuthFailureError,
  ForbiddenError,
} from '@/core/error.response';

export const handleError = (error) => {
  if (error instanceof BadRequestError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
  if (error instanceof ConflictRequestError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
  if (error instanceof NotFoundError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
  if (error instanceof AuthFailureError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
  if (error instanceof ForbiddenError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  // Xử lý lỗi không xác định
  return NextResponse.json(
    { message: 'An unexpected error occurred' },
    { status: 500 }
  );
};
