const { notarize } = require("@electron/notarize");
const { build } = require("./package.json");

console.log("notarize.js has been loaded");

exports.default = async function notarizing(context) {
  console.log("Starting notarization test");

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
      "APPLE_ID_PASS" in process.env &&
      "APPLE_TEAM_ID" in process.env
    )
  ) {
    console.warn(
      "Skipping notarizing step. APPLE_ID, APPLE_ID_PASS, and APPLE_TEAM_ID env variables must be set"
    );
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;

  console.log(`Notarizing starting `);

  try {
    console.log(`[Notarizing] Submitting: ${appPath}`);
    const result = await notarize({
      tool: "notarytool",
      appBundleId: build.appId,
      appPath,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASS,
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
