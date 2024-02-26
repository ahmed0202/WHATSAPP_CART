class StringUtils {
  convertISO8601toDateTime = (timestamp) => {
    if (!timestamp) throw Error("timestamp is null");
    if (!timestamp.includes("T") && !timestamp.includes("Z")) return timestamp;
    return timestamp.replace("T", " ").replace("Z", "");
  };
  convertTextToJson = (text) => {
    try {
      if (!text) {
        return;
      }

      const cleanedText = text.replace("'", "").replace(/'$/, "");

      const parsedToJson = JSON.parse(cleanedText);

      return parsedToJson;
    } catch (error) {
      return error;
    }
  };
}
module.exports = new StringUtils();
