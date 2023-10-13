import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError
} from "@prisma/client/runtime/library";
import {TCustomErrorResponse} from "@/Utils/types/response.type";

export const processPrismaError = (
    err: PrismaClientKnownRequestError | PrismaClientUnknownRequestError | PrismaClientRustPanicError | PrismaClientInitializationError | PrismaClientValidationError
): TCustomErrorResponse => {
    return {
        statusCode: 400,
        message: err.message
    }
}

function formatMessage(message:string, details:any) {
    // Replace each placeholder in the message with its corresponding value
    for (const [placeholder, value] of Object.entries(details.meta)) {
      const placeholderRegex = new RegExp(`{${placeholder}}`, 'g');
      message = message.replace(placeholderRegex, value as any);
    }
    return message;
  }
  
  const details = {
    meta: { errors: 'book_categoryId_fkey (index)' }
  };
  
  const message = `
  "Your Prisma schema is using features that are not supported for the version of the database.
Database version: {database_version}
Errors:
{errors}"
  `
  
  const formattedMessage = formatMessage(message, details);
  console.log(formattedMessage);
