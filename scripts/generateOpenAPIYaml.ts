import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import { swaggerSpec } from "../src/config/swagger";

// Generate OpenAPI YAML
const generateYaml = () => {
  try {
    // Convert JSON spec to YAML
    const yamlString = yaml.dump(swaggerSpec as any, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      skipInvalid: true,
    });

    // Ensure output directory exists
    const outputDir = path.join(__dirname, "..");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write YAML file
    const outputPath = path.join(outputDir, "openapi.yaml");
    fs.writeFileSync(outputPath, yamlString, "utf8");

    // Also generate JSON version
    const jsonPath = path.join(outputDir, "openapi.json");
    fs.writeFileSync(jsonPath, JSON.stringify(swaggerSpec, null, 2), "utf8");

    console.log("✅ OpenAPI YAML generated successfully at:", outputPath);
    console.log("✅ OpenAPI JSON generated successfully at:", jsonPath);
    console.log(
      "\n📚 You can now use these files to generate SDKs using tools like:"
    );
    console.log("   - openapi-generator-cli");
    console.log("   - swagger-codegen");
    console.log("   - Postman (Import collection)");
    console.log("   - Insomnia");
    console.log("   - Swagger UI (load from file)");

    return { yamlPath: outputPath, jsonPath };
  } catch (error) {
    console.error("❌ Error generating OpenAPI YAML:", error);
    process.exit(1);
  }
};

// Run if executed directly
if (require.main === module) {
  generateYaml();
}

export default generateYaml;
