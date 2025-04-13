import { TosClient, TosClientError, TosServerError } from "@volcengine/tos-sdk";
import fs from "fs";
import path from "path";

// 创建客户端
const client = new TosClient({
  accessKeyId: process.env.TOS_ACCESS_KEY,
  accessKeySecret: process.env.TOS_SECRET_KEY,
  region: "cn-shanghai", // 替换为实际区域
  endpoint: "tos-cn-shanghai.volces.com", // 替换为实际域名
});

// 错误处理函数
function handleError(error) {
  if (error instanceof TosClientError) {
    console.log("Client Err Msg:", error.message);
    console.log("Client Err Stack:", error.stack);
  } else if (error instanceof TosServerError) {
    console.log("Request ID:", error.requestId);
    console.log("Response Status Code:", error.statusCode);
    console.log("Response Header:", error.headers);
    console.log("Response Err Code:", error.code);
    console.log("Response Err Msg:", error.message);
  } else {
    console.log("Unexpected exception, message:", error);
  }
}

// 上传文件函数
async function uploadFile(localFilePath, bucketName, remoteFileKey) {
  const fileStream = fs.createReadStream(localFilePath);
  const params = {
    bucket: bucketName,
    key: remoteFileKey,
    body: fileStream,
  };

  try {
    const result = await client.putObject(params);
    if (result.statusCode == 200) {
      console.log(`文件上传成功: ${localFilePath}`);
    } else {
      console.log(`文件上传失败: ${result}`);
    }
  } catch (error) {
    handleError(error);
  }
}

// 递归上传文件夹中的所有文件
async function uploadFolder(
  localFolderPath,
  bucketName,
  remoteFolderPrefix = ""
) {
  const files = fs.readdirSync(localFolderPath);

  for (const file of files) {
    const localFilePath = path.join(localFolderPath, file);
    const remoteFileKey = path.join(remoteFolderPrefix, file);

    if (fs.statSync(localFilePath).isDirectory()) {
      // 如果是文件夹，递归调用上传
      await uploadFolder(localFilePath, bucketName, remoteFileKey);
    } else {
      // 否则是文件，上传文件
      await uploadFile(localFilePath, bucketName, remoteFileKey);
    }
  }
}

// 主函数执行上传操作
async function main() {
  try {
    const localFolderPath = "./.next/static"; // 替换为本地文件夹路径
    const bucketName = "lingyin"; // 替换为您的Bucket名称
    const remoteFileKey = "_next/static";
    await uploadFolder(localFolderPath, bucketName, remoteFileKey);
    console.log("文件夹上传完成");
  } catch (error) {
    handleError(error);
  }
}

main();
