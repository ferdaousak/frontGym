import http from "../http-common";
import authHeader from "./auth-header";

class UploadFilesService {
  upload(file, onUploadProgress,gymid)
  {
    const reqiest = {
      file: file,
      gymid: gymid
    }

    return http.post("/upload", reqiest, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/download");
  }

  getFile(filename)
  {

    return http.post("/download/file/",{filename: filename},{ headers: authHeader()})
  }
}

export default new UploadFilesService();
