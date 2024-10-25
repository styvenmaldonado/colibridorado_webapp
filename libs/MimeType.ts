import mime from 'mime/lite';

export const MimeTypeToExtention = (mimeType:string ) => {
	return mime.getExtension(mimeType)  
}

