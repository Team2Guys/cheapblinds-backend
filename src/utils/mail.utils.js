import { readFile } from "fs/promises";
import createError from "http-errors";
import { join } from "path";

import { env, transporter } from "#config/index.js";
import { VIEWS_DIRECTORY } from "#constants/index.js";

const { USER_EMAIL } = env;

const templateCache = new Map();

const getEmailTemplate = async (folder, filename) => {
  const cacheKey = `${folder}/${filename}`;

  if (templateCache.has(cacheKey)) {
    return templateCache.get(cacheKey);
  }

  try {
    const filePath = join(VIEWS_DIRECTORY, folder, filename);
    const template = await readFile(filePath, "utf-8");

    // Cache template for future use
    templateCache.set(cacheKey, template);
    return template;
  } catch (error) {
    throw createError(500, `Failed to read email template: ${error.message}`);
  }
};

const processTemplate = (template, variables) => {
  return Object.entries(variables).reduce(
    (processed, [key, value]) => processed.replace(new RegExp(`\\$\\{${key}\\}`, "g"), value),
    template,
  );
};

const sendMail = async (mailOptions) => {
  try {
    return await transporter.sendMail({
      from: USER_EMAIL,
      ...mailOptions,
    });
  } catch (error) {
    throw createError(500, `Failed to send email: ${error.message}`);
  }
};

export const sendEmail = async (type, options) => {
  console.log("options:", options);
  const { email, subject, ...rest } = options;
  const template = await getEmailTemplate(type, "index.html");
  const html = processTemplate(template, { ...rest, email });

  const supportedTypes = ["otp-email", "verification-email", "reset-password"];

  if (!supportedTypes.includes(type)) {
    throw createError(400, "Invalid email type.");
  }

  return sendMail({
    to: email,
    subject,
    html,
  });
};
