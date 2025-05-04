import { translations } from "./translations";

export type Language = "ko" | "en";
export type TranslationKey = string;

export const getTranslation = (key: TranslationKey, lang: Language, params?: Record<string, string>) => {
  // Split the key by dots to traverse the nested translation object
  const keys = key.split(".");
  let currentObj: any = translations[lang];

  // Traverse the object using the key parts
  for (const k of keys) {
    if (currentObj && currentObj[k] !== undefined) {
      currentObj = currentObj[k];
    } else {
      console.warn(`Translation key not found: ${key} for language: ${lang}`);
      return key; // Return the key itself as fallback
    }
  }

  // If we found a string, return it with replaced parameters
  if (typeof currentObj === "string" && params) {
    let result = currentObj;
    
    // Replace all parameters in the string
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value);
    }
    
    return result;
  }

  return currentObj || key;
};
