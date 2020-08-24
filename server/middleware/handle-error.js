export default function handleError(error, request) {
  const { statusCode } = error;

  if (statusCode && statusCode >= 400 && statusCode < 500) {
    request.log.info(error);
  } else {
    request.log.error(error);
  }
}
