const { notarize } = require("@electron/notarize");
const  build  = require("../electron-builder.json");

exports.default = async function notarizing(context) {

  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    return;
  }

  if (process.env.CI !== "true") {
    console.warn("Skipping notarizing step. Packaging is not running in CI");
    return;
  }

  if (
    !(
      "APPLE_ID" in process.env &&
      "APPLE_APP_SPECIFIC_PASSWORD" in process.env &&
      "APPLE_TEAM_ID" in process.env
    )
  ) {
    console.warn(
      "Skipping notarizing step. APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD, and APPLE_TEAM_ID env variables must be set"
    );
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;

  try {
    const result = await notarize({
      tool: "notarytool",
      appBundleId: build.appId,
      appPath,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID,
    });

    console.log("[Notarization] Success");
    if (result && result.uuid) {
      console.log(`[Notarization] Submission ID: ${result.uuid}`);
    }
  } catch (error) {
    console.error("[Notarization] Failed:", error.message || error);
    if (error.result && error.result.uuid) {
      console.error(`[Notarization] Submission ID: ${error.result.uuid}`);
    }
    throw error;
  }
};
